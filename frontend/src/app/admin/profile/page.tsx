"use client";

import type React from "react";
import { useState } from "react";
import { Save } from "lucide-react";

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

export default function ProfilePage() {
	const { content, updateSection } = useContent();

	// Combine properties from `content` to form the profile
	const [profile, setProfile] = useState({
		name: content.hero.name,
		title: content.hero.title,
		description: content.hero.description,
		email: content.contact.email,
		location: content.general.siteDescription,
		avatar: content.general.faviconUrl,
		github: content.social.github,
		twitter: content.social.twitter,
		linkedin: content.social.linkedin,
	});

	// Track changes to determine which sections to update
	const [modifiedSections, setModifiedSections] = useState<Set<string>>(
		new Set()
	);

	const handleChange = (field: string, value: string) => {
		setProfile({
			...profile,
			[field]: value,
		});

		// Mark the corresponding section as modified
		if (["name", "title", "description"].includes(field)) {
			setModifiedSections((prev) => new Set(prev).add("hero"));
		} else if (field === "email") {
			setModifiedSections((prev) => new Set(prev).add("contact"));
		} else if (["location", "avatar"].includes(field)) {
			setModifiedSections((prev) => new Set(prev).add("general"));
		} else if (["github", "twitter", "linkedin"].includes(field)) {
			setModifiedSections((prev) => new Set(prev).add("social"));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			// Send PATCH requests only for modified sections
			const requests = [];

			if (modifiedSections.has("hero")) {
				requests.push(
					fetch(`http://localhost:5000/api/site-content/hero`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							name: profile.name,
							title: profile.title,
							description: profile.description,
						}),
					})
				);
			}

			if (modifiedSections.has("contact")) {
				requests.push(
					fetch(`http://localhost:5000/api/site-content/contact`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: profile.email,
						}),
					})
				);
			}

			if (modifiedSections.has("general")) {
				requests.push(
					fetch(`http://localhost:5000/api/site-content/general`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							siteDescription: profile.location,
							faviconUrl: profile.avatar,
						}),
					})
				);
			}

			if (modifiedSections.has("social")) {
				requests.push(
					fetch(`http://localhost:5000/api/site-content/social`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							github: profile.github,
							twitter: profile.twitter,
							linkedin: profile.linkedin,
						}),
					})
				);
			}

			await Promise.all(requests);

			// Update the content context
			if (modifiedSections.has("hero")) {
				updateSection("hero", {
					name: profile.name,
					title: profile.title,
					description: profile.description,
				});
			}
			if (modifiedSections.has("contact")) {
				updateSection("contact", {
					email: profile.email,
				});
			}
			if (modifiedSections.has("general")) {
				updateSection("general", {
					siteDescription: profile.location,
					faviconUrl: profile.avatar,
				});
			}
			if (modifiedSections.has("social")) {
				updateSection("social", {
					github: profile.github,
					twitter: profile.twitter,
					linkedin: profile.linkedin,
				});
			}

			alert("Profile updated successfully!");
			setModifiedSections(new Set()); // Reset modified sections
		} catch (error) {
			console.error("Error updating profile:", error);
			alert("Failed to update profile.");
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Profile</h1>
				<p className="text-muted-foreground">
					Manage your personal information
				</p>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="grid gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Personal Information</CardTitle>
							<CardDescription>
								Your basic information displayed on the website
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Full Name</Label>
								<Input
									id="name"
									value={profile.name}
									onChange={(e) =>
										handleChange("name", e.target.value)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="title">
									Professional Title
								</Label>
								<Input
									id="title"
									value={profile.title}
									onChange={(e) =>
										handleChange("title", e.target.value)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									value={profile.description}
									onChange={(e) =>
										handleChange(
											"description",
											e.target.value
										)
									}
									rows={4}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email Address</Label>
								<Input
									id="email"
									type="email"
									value={profile.email}
									onChange={(e) =>
										handleChange("email", e.target.value)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="location">Location</Label>
								<Input
									id="location"
									value={profile.location}
									onChange={(e) =>
										handleChange("location", e.target.value)
									}
								/>
							</div>
						</CardContent>
					</Card>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Media & Links</CardTitle>
								<CardDescription>
									Your profile picture and social links
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="avatar">Avatar URL</Label>
									<Input
										id="avatar"
										value={profile.avatar}
										onChange={(e) =>
											handleChange(
												"avatar",
												e.target.value
											)
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="github">GitHub URL</Label>
									<Input
										id="github"
										value={profile.github}
										onChange={(e) =>
											handleChange(
												"github",
												e.target.value
											)
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="twitter">Twitter URL</Label>
									<Input
										id="twitter"
										value={profile.twitter}
										onChange={(e) =>
											handleChange(
												"twitter",
												e.target.value
											)
										}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="linkedin">
										LinkedIn URL
									</Label>
									<Input
										id="linkedin"
										value={profile.linkedin}
										onChange={(e) =>
											handleChange(
												"linkedin",
												e.target.value
											)
										}
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="mt-6 flex justify-end">
					<Button type="submit">
						<Save className="mr-2 h-4 w-4" />
						Save Profile
					</Button>
				</div>
			</form>
		</div>
	);
}
