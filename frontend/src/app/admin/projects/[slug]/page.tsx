"use client";

import type React from "react";
import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash } from "lucide-react";

import { useContent } from "@/lib/content-provider";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function EditProjectPage({
	params,
}: {
	params: { slug: string };
}) {
	const { content, updateContent } = useContent();
	const { slug } = use(params);
	const router = useRouter();

	// Find the project from the content context
	const project = content.projects.find((p) => p.slug === slug) || {
		slug: "",
		title: "",
		description: "",
		longDescription: "",
		tags: [],
		image: "",
		liveUrl: "",
		githubUrl: "",
		status: "Draft",
		features: [""],
		technologies: [""],
	};

	console.log(project);

	const [formData, setFormData] = useState(project);
	const [features, setFeatures] = useState(project.tags.join("\n"));
	const [technologies, setTechnologies] = useState(project.tags.join("\n"));

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent, isNew: boolean) => {
		e.preventDefault();

		const project = {
			...formData,
			features: features.split("\n").filter(Boolean),
			technologies: technologies.split("\n").filter(Boolean),
		};

		try {
			let res: Response;
			if (isNew) {
				res = await fetch(
					`http://localhost:5000/api/site-content/project`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(project),
					}
				);
			} else {
				res = await fetch(
					`http://localhost:5000/api/site-content/projects`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(project),
					}
				);
			}

			if (!res.ok)
				throw new Error(
					isNew
						? "Failed to create project."
						: "Failed to update project."
				);

			router.prefetch("../projects");
		} catch (error) {
			console.error("Error updating project:", error);
			alert("Failed to update project.");
		}
	};

	const handleDelete = async () => {
		try {
			// Send a DELETE request to the backend
			const res = await fetch(
				`http://localhost:5000/api/site-content/projects`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ slug }),
				}
			);

			if (!res.ok) throw new Error("Failed to delete project");

			// Remove the project from the content context
			const updatedProjects = content.projects.filter(
				(p) => p.slug !== slug
			);
			updateContent({ projects: updatedProjects });

			alert("Project deleted successfully!");
		} catch (error) {
			console.error("Error deleting project:", error);
			alert("Failed to delete project.");
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Button variant="ghost" size="icon" asChild>
						<Link href="/admin/projects">
							<ArrowLeft className="h-4 w-4" />
							<span className="sr-only">Back</span>
						</Link>
					</Button>
					<h1 className="text-3xl font-bold tracking-tight">
						{slug === "new"
							? "Add New Project"
							: `Edit Project: ${formData.title}`}
					</h1>
				</div>
				{slug !== "new" && (
					<Button variant="destructive" onClick={handleDelete}>
						<Trash className="mr-2 h-4 w-4" />
						Delete Project
					</Button>
				)}
			</div>
			<form onSubmit={(e) => handleSubmit(e, slug === "new")}>
				<div className="grid gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Basic Information</CardTitle>
							<CardDescription>
								The main details about your project
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="title">Project Title</Label>
								<Input
									id="title"
									name="title"
									value={formData.title}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="slug">URL Slug</Label>
								<Input
									id="slug"
									name="slug"
									value={formData.slug}
									onChange={handleChange}
									required
								/>
								<p className="text-xs text-muted-foreground">
									This will be used in the URL:
									/projects/your-slug
								</p>
							</div>
							<div className="space-y-2">
								<Label htmlFor="description">
									Short Description
								</Label>
								<Textarea
									id="description"
									name="description"
									value={formData.description}
									onChange={handleChange}
									rows={2}
									required
								/>
								<p className="text-xs text-muted-foreground">
									A brief summary that appears in project
									cards
								</p>
							</div>
							<div className="space-y-2">
								<Label htmlFor="longDescription">
									Full Description
								</Label>
								<Textarea
									id="longDescription"
									name="longDescription"
									value={formData.longDescription}
									onChange={handleChange}
									rows={5}
									required
								/>
								<p className="text-xs text-muted-foreground">
									Detailed description for the project page
								</p>
							</div>
							<div className="space-y-2">
								<Label htmlFor="status">Status</Label>
								<Select
									name="status"
									defaultValue={formData.status}
									onValueChange={(value) =>
										setFormData({
											...formData,
											status: value,
										})
									}>
									<SelectTrigger>
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Draft">
											Draft
										</SelectItem>
										<SelectItem value="Published">
											Published
										</SelectItem>
										<SelectItem value="Archived">
											Archived
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Media & Links</CardTitle>
								<CardDescription>
									Project image and external links
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="image">Image URL</Label>
									<Input
										id="image"
										name="image"
										value={formData.image}
										onChange={handleChange}
										required
									/>
									<p className="text-xs text-muted-foreground">
										URL to the main project image
									</p>
								</div>
								<div className="space-y-2">
									<Label htmlFor="liveUrl">
										Live Site URL
									</Label>
									<Input
										id="liveUrl"
										name="liveUrl"
										value={formData.liveUrl}
										onChange={handleChange}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="githubUrl">
										GitHub URL
									</Label>
									<Input
										id="githubUrl"
										name="githubUrl"
										value={formData.githubUrl}
										onChange={handleChange}
									/>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Tags & Details</CardTitle>
								<CardDescription>
									Technologies and features
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="tags">
										Tags (comma separated)
									</Label>
									<Input
										id="tags"
										name="tags"
										value={formData.tags.join(", ")}
										onChange={(e) =>
											setFormData({
												...formData,
												tags: e.target.value
													.split(",")
													.map((tag) => tag.trim()),
											})
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="features">
										Features (one per line)
									</Label>
									<Textarea
										id="features"
										value={features}
										onChange={(e) =>
											setFeatures(e.target.value)
										}
										rows={4}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="technologies">
										Technologies (one per line)
									</Label>
									<Textarea
										id="technologies"
										value={technologies}
										onChange={(e) =>
											setTechnologies(e.target.value)
										}
										rows={4}
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
				<div className="mt-6 flex justify-end">
					<Button type="submit">
						<Save className="mr-2 h-4 w-4" />
						Save Project
					</Button>
				</div>
			</form>
		</div>
	);
}
