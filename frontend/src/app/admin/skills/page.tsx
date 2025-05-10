"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Plus, Save, Trash } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";

export default function SkillsPage() {
	const { content, updateSection } = useContent();
	const [skills, setSkills] = useState(content.skills);

	// Update local state when content changes
	useEffect(() => {
		setSkills(content.skills);
	}, [content.skills]);

	const handleAddSkill = () => {
		const newSkill = {
			id: `skill-${Date.now()}`,
			title: "New Skill",
			description: "Skill description",
		};
		setSkills([...skills, newSkill]);
	};

	const handleRemoveSkill = async (id: string) => {
		try {
			// Send DELETE request to the backend
			const res = await fetch(
				`http://localhost:5000/api/site-content/skill/${id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ id }),
				}
			);

			if (!res.ok) throw new Error("Failed to delete skill");

			// Update local state
			setSkills(skills.filter((skill) => skill.id !== id));
			alert("Skill deleted successfully!");
		} catch (error) {
			console.error("Error deleting skill:", error);
			alert("Failed to delete skill.");
		}
	};

	const handleChangeSkill = (id: string, field: string, value: string) => {
		setSkills(
			skills.map((skill) =>
				skill.id === id ? { ...skill, [field]: value } : skill
			)
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			// Send PATCH request to the backend
			const res = await fetch(
				`http://localhost:5000/api/site-content/skills`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(skills),
				}
			);

			if (!res.ok) throw new Error("Failed to update skills");

			// Update the content context
			updateSection("skills", skills);
			alert("Skills saved successfully!");
		} catch (error) {
			console.error("Error updating skills:", error);
			alert("Failed to save skills.");
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Skills
					</h1>
					<p className="text-muted-foreground">
						Manage your skills and expertise
					</p>
				</div>
				<Button onClick={handleAddSkill}>
					<Plus className="mr-2 h-4 w-4" />
					Add Skill
				</Button>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="space-y-4">
					{skills.map((skill) => (
						<Card key={skill.id}>
							<CardHeader className="pb-3">
								<div className="flex items-center justify-between">
									<CardTitle>Skill</CardTitle>
									<Button
										variant="ghost"
										size="icon"
										type="button"
										onClick={() =>
											handleRemoveSkill(skill.id)
										}>
										<Trash className="h-4 w-4 text-destructive" />
										<span className="sr-only">
											Remove skill
										</span>
									</Button>
								</div>
								<CardDescription>
									Add details about your skill
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor={`title-${skill.id}`}>
										Skill Title
									</Label>
									<Input
										id={`title-${skill.id}`}
										value={skill.title}
										onChange={(e) =>
											handleChangeSkill(
												skill.id,
												"title",
												e.target.value
											)
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor={`description-${skill.id}`}>
										Skill Description
									</Label>
									<Textarea
										id={`description-${skill.id}`}
										value={skill.description}
										onChange={(e) =>
											handleChangeSkill(
												skill.id,
												"description",
												e.target.value
											)
										}
										rows={2}
									/>
									<p className="text-xs text-muted-foreground">
										List technologies or tools, separated by
										commas
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="mt-6 flex justify-end">
					<Button type="submit">
						<Save className="mr-2 h-4 w-4" />
						Save Skills
					</Button>
				</div>
			</form>
		</div>
	);
}
