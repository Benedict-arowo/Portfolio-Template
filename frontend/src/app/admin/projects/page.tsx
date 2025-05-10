"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Edit, MoreHorizontal, Plus, Trash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useContent } from "@/lib/content-provider";

export default function ProjectsPage() {
	const {
		content: { projects },
		updateContent,
	} = useContent();
	const [search, setSearch] = useState("");

	const setProjects = (projects: any) => {
		updateContent({
			projects: projects,
		});
	};

	// Filter projects based on the search input
	const filteredProjects = projects.filter((project) =>
		project.title.toLowerCase().includes(search.toLowerCase())
	);

	// Handle project deletion
	const handleDelete = async (id: string) => {
		try {
			const res = await fetch(
				`http://localhost:5000/api/site-content/project/${id}`,
				{
					method: "DELETE",
				}
			);
			if (!res.ok) throw new Error("Failed to delete project");
			setProjects(projects.filter((project) => project.id !== id));
		} catch (error) {
			alert("Failed to delete project.");
			console.error("Error deleting project:", error);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Projects
					</h1>
					<p className="text-muted-foreground">
						Manage your portfolio projects
					</p>
				</div>
				<Button asChild>
					<Link href="/admin/projects/new">
						<Plus className="mr-2 h-4 w-4" />
						Add New Project
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>All Projects</CardTitle>
					<CardDescription>
						A list of all your portfolio projects
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="mb-4">
						<Input
							placeholder="Search projects..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="max-w-sm"
						/>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[300px]">
									<Button
										variant="ghost"
										className="p-0 font-medium">
										Title
										<ArrowUpDown className="ml-2 h-4 w-4" />
									</Button>
								</TableHead>
								<TableHead>Tags</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>
									<Button
										variant="ghost"
										className="p-0 font-medium">
										Date
										<ArrowUpDown className="ml-2 h-4 w-4" />
									</Button>
								</TableHead>
								<TableHead className="text-right">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredProjects.map((project) => (
								<TableRow key={project.id}>
									<TableCell className="font-medium">
										{project.title}
									</TableCell>
									<TableCell>
										<div className="flex flex-wrap gap-1">
											{project.tags.map((tag) => (
												<Badge
													key={tag}
													variant="secondary">
													{tag}
												</Badge>
											))}
										</div>
									</TableCell>
									<TableCell>
										<Badge variant="outline">
											{project.status}
										</Badge>
									</TableCell>
									<TableCell>{project.date}</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													size="icon">
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem asChild>
													<Link
														href={`/admin/projects/${project.slug}`}>
														<Edit className="mr-2 h-4 w-4" />
														Edit
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link
														href={`/projects/${project.slug}`}
														target="_blank">
														<ArrowUpDown className="mr-2 h-4 w-4" />
														View
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem
													className="text-destructive focus:text-destructive"
													onClick={() =>
														handleDelete(project.id)
													}>
													<Trash className="mr-2 h-4 w-4" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
