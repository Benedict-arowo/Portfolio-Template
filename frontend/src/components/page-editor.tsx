"use client";

import { useState, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Edit, Eye, Grip, Plus, Save } from "lucide-react";

import { useContent } from "@/lib/content-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { SectionControls } from "./section-controls";
import { ProjectEditor } from "./project-editor";
import { EditableSection } from "./editable-section";
import { EditableText } from "./editable-text";
import { EditableButton } from "./editable-button";
import { ProjectCard } from "@/components/project-card";
import { Trash } from "lucide-react";

export function PageEditor() {
	const { content, updateContent, updateSection } = useContent();
	const [editMode, setEditMode] = useState(true);
	const [isPublishing, setIsPublishing] = useState(false);

	// Keep a reference to original content to detect what changed
	const originalContentRef = useRef(structuredClone(content));

	const [sections, setSections] = useState([
		{ id: "hero", name: "Hero", visible: true },
		{ id: "about", name: "About", visible: true },
		{ id: "skills", name: "Skills", visible: true },
		{ id: "projects", name: "Projects", visible: true },
		{ id: "contact", name: "Contact", visible: true },
	]);

	const handleDragEnd = (result: any) => {
		if (!result.destination) return;
		const reordered = [...sections];
		const [moved] = reordered.splice(result.source.index, 1);
		reordered.splice(result.destination.index, 0, moved);
		setSections(reordered);
	};

	const toggleSectionVisibility = (id: string) => {
		setSections((prev) =>
			prev.map((section) =>
				section.id === id
					? { ...section, visible: !section.visible }
					: section
			)
		);
	};

	const isSectionChanged = (key: keyof typeof content) => {
		return (
			JSON.stringify(content[key]) !==
			JSON.stringify(originalContentRef.current[key])
		);
	};

	const publishChanges = async () => {
		console.log("Publishing");
		setIsPublishing(true);
		const sectionKeys = Object.keys(content) as (keyof typeof content)[];
		const changedKeys = sectionKeys.filter((key) => isSectionChanged(key));

		console.log("Changed sections:", changedKeys);

		try {
			await Promise.all(
				changedKeys.map(async (section) => {
					const endpoint = `/api/site-content/${section}`;
					const response = await fetch(
						`http://localhost:5000${endpoint}`,
						{
							method: "PATCH",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(content[section]),
						}
					);

					if (!response.ok) {
						const errorText = await response.text();
						throw new Error(
							`Failed to update ${section}: ${errorText}`
						);
					}

					const updatedSection = await response.json();
					updateSection(section, updatedSection);
				})
			);

			alert("Changes published successfully!");
			// Update original reference
			originalContentRef.current = structuredClone(content);
		} catch (err) {
			console.error("Error publishing changes:", err);
			alert("Failed to publish changes.");
		} finally {
			setIsPublishing(false);
		}
	};

	return (
		<div className="flex flex-col space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Page Builder</h1>
				<div className="flex items-center space-x-2">
					<Tabs
						value={editMode ? "edit" : "preview"}
						onValueChange={(v) => setEditMode(v === "edit")}>
						<TabsList>
							<TabsTrigger value="edit">
								<Edit className="mr-2 h-4 w-4" />
								Edit
							</TabsTrigger>
							<TabsTrigger value="preview">
								<Eye className="mr-2 h-4 w-4" />
								Preview
							</TabsTrigger>
						</TabsList>
					</Tabs>
					<Button
						onClick={() => publishChanges()}
						disabled={isPublishing}>
						<Save className="mr-2 h-4 w-4" />
						{isPublishing ? "Publishing..." : "Publish Changes"}
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
				{/* Section List Sidebar */}
				<Card className="p-4 lg:col-span-1">
					<h2 className="mb-4 text-xl font-semibold">
						Page Sections
					</h2>
					<p className="mb-4 text-sm text-muted-foreground">
						Drag to reorder sections or toggle visibility
					</p>

					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable droppableId="sections">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className="space-y-2">
									{sections.map((section, index) => (
										<Draggable
											key={section.id}
											draggableId={section.id}
											index={index}>
											{(provided) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													className={`flex items-center justify-between rounded-md border p-3 ${
														!section.visible
															? "opacity-50"
															: ""
													}`}>
													<div className="flex items-center">
														<span
															{...provided.dragHandleProps}
															className="mr-3 cursor-move">
															<Grip className="h-4 w-4 text-muted-foreground" />
														</span>
														<span>
															{section.name}
														</span>
													</div>
													<SectionControls
														visible={
															section.visible
														}
														onToggleVisibility={() =>
															toggleSectionVisibility(
																section.id
															)
														}
													/>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>

					<div className="mt-4">
						<Button variant="outline" className="w-full">
							<Plus className="mr-2 h-4 w-4" />
							Add Custom Section
						</Button>
					</div>

					{sections.find((s) => s.id === "projects")?.visible && (
						<div className="mt-6">
							<ProjectEditor
								projects={content.projects}
								onProjectsChange={(projects) =>
									updateContent({ projects })
								}
							/>
						</div>
					)}
				</Card>

				{/* Page Preview & Editor */}
				<div className="rounded-lg border lg:col-span-3">
					<div className="p-4">
						<h2 className="text-xl font-semibold">
							{editMode ? "Visual Editor" : "Preview"}
						</h2>
						<p className="text-sm text-muted-foreground">
							{editMode
								? "Click on any element to edit its content"
								: "Preview how your page will look"}
						</p>
					</div>

					<div className="relative rounded-b-lg bg-slate-950 p-4">
						<div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-background">
							<TooltipProvider>
								{/* Hero Section */}
								{sections.find((s) => s.id === "hero")
									?.visible && (
									<EditableSection
										id="hero"
										className="space-y-6 p-8 text-center"
										editMode={editMode}
										sectionName="Hero Section">
										<EditableText
											id="hero-name"
											value={content.hero.name}
											onChange={(v) =>
												updateContent({
													hero: {
														...content.hero,
														name: v,
													},
												})
											}
											editMode={editMode}
											className="text-3xl font-bold text-purple-500"
										/>
										<EditableText
											id="hero-title"
											value={content.hero.title}
											onChange={(v) =>
												updateContent({
													hero: {
														...content.hero,
														title: v,
													},
												})
											}
											editMode={editMode}
											className="text-2xl font-semibold"
										/>
										<EditableText
											id="hero-description"
											value={content.hero.description}
											onChange={(v) =>
												updateContent({
													hero: {
														...content.hero,
														description: v,
													},
												})
											}
											editMode={editMode}
											className="text-muted-foreground"
											multiline
										/>
										<div className="flex justify-center space-x-4">
											<EditableButton
												id="primary-button"
												text={
													content.hero
														.primaryButtonText
												}
												link={
													content.hero
														.primaryButtonLink
												}
												onTextChange={(v) =>
													updateContent({
														hero: {
															...content.hero,
															primaryButtonText:
																v,
														},
													})
												}
												onLinkChange={(v) =>
													updateContent({
														hero: {
															...content.hero,
															primaryButtonLink:
																v,
														},
													})
												}
												editMode={editMode}
												variant="default"
											/>
											<EditableButton
												id="secondary-button"
												text={
													content.hero
														.secondaryButtonText
												}
												link={
													content.hero
														.secondaryButtonLink
												}
												onTextChange={(v) =>
													updateContent({
														hero: {
															...content.hero,
															secondaryButtonText:
																v,
														},
													})
												}
												onLinkChange={(v) =>
													updateContent({
														hero: {
															...content.hero,
															secondaryButtonLink:
																v,
														},
													})
												}
												editMode={editMode}
												variant="outline"
											/>
										</div>
									</EditableSection>
								)}

								{/* About Section */}
								{sections.find((s) => s.id === "about")
									?.visible && (
									<EditableSection
										id="about"
										className="space-y-6 p-8"
										editMode={editMode}
										sectionName="About Section">
										<EditableText
											id="about-title"
											value={content.about.title}
											onChange={(value) =>
												updateContent({
													about: {
														...content.about,
														title: value,
													},
												})
											}
											editMode={editMode}
											className="text-2xl font-bold text-center"
										/>
										<EditableText
											id="about-description"
											value={content.about.description}
											onChange={(value) =>
												updateContent({
													about: {
														...content.about,
														description: value,
													},
												})
											}
											editMode={editMode}
											className="text-muted-foreground text-center"
											multiline
										/>
										<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
											{content.skills.map(
												(skill, index) => (
													<div
														key={skill.id}
														className="rounded-lg border p-4">
														<EditableText
															id={`skill-title-${skill.id}`}
															value={skill.title}
															onChange={(
																value
															) => {
																const updatedSkills =
																	[
																		...content.skills,
																	];
																updatedSkills[
																	index
																] = {
																	...skill,
																	title: value,
																};
																updateContent({
																	skills: updatedSkills,
																});
															}}
															editMode={editMode}
															className="font-semibold"
														/>
														<EditableText
															id={`skill-desc-${skill.id}`}
															value={
																skill.description
															}
															onChange={(
																value
															) => {
																const updatedSkills =
																	[
																		...content.skills,
																	];
																updatedSkills[
																	index
																] = {
																	...skill,
																	description:
																		value,
																};
																updateContent({
																	skills: updatedSkills,
																});
															}}
															editMode={editMode}
															className="text-sm text-muted-foreground"
														/>
														{editMode && (
															<Tooltip>
																<TooltipTrigger
																	asChild>
																	<Button
																		variant="ghost"
																		size="icon"
																		className="absolute right-2 top-2 h-6 w-6 opacity-50 hover:opacity-100">
																		<Trash className="h-4 w-4" />
																	</Button>
																</TooltipTrigger>
																<TooltipContent>
																	Remove skill
																</TooltipContent>
															</Tooltip>
														)}
													</div>
												)
											)}
											{editMode && (
												<Button
													variant="outline"
													className="flex h-full min-h-[100px] items-center justify-center border-dashed">
													<Plus className="mr-2 h-4 w-4" />
													<span>Add Skill</span>
												</Button>
											)}
										</div>
									</EditableSection>
								)}

								{/* Projects Section */}
								{sections.find((s) => s.id === "projects")
									?.visible && (
									<EditableSection
										id="projects"
										className="space-y-6 p-8"
										editMode={editMode}
										sectionName="Projects Section">
										<EditableText
											id="projects-title"
											value="Projects"
											onChange={() => {}}
											editMode={editMode}
											className="text-2xl font-bold text-center"
										/>
										<EditableText
											id="projects-description"
											value="Check out some of my recent work"
											onChange={() => {}}
											editMode={editMode}
											className="text-muted-foreground text-center"
											multiline
										/>
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
											{content.projects
												.slice(0, 4)
												.map((project) => (
													<div
														key={project.id}
														className="relative">
														{editMode && (
															<Tooltip>
																<TooltipTrigger
																	asChild>
																	<Button
																		variant="ghost"
																		size="icon"
																		className="absolute right-2 top-2 z-10 h-6 w-6 bg-background/80 opacity-50 hover:opacity-100"
																		onClick={() => {}}>
																		<Edit className="h-4 w-4" />
																	</Button>
																</TooltipTrigger>
																<TooltipContent>
																	Edit project
																</TooltipContent>
															</Tooltip>
														)}
														<ProjectCard
															title={
																project.title
															}
															description={
																project.description
															}
															tags={project.tags}
															image={
																project.image
															}
															slug={project.slug}
														/>
													</div>
												))}
										</div>
									</EditableSection>
								)}

								{/* Contact Section */}
								{sections.find((s) => s.id === "contact")
									?.visible && (
									<EditableSection
										id="contact"
										className="space-y-6 p-8"
										editMode={editMode}
										sectionName="Contact Section">
										<EditableText
											id="contact-title"
											value={content.contact.title}
											onChange={(value) =>
												updateContent({
													contact: {
														...content.contact,
														title: value,
													},
												})
											}
											editMode={editMode}
											className="text-2xl font-bold text-center"
										/>
										<EditableText
											id="contact-description"
											value={content.contact.description}
											onChange={(value) =>
												updateContent({
													contact: {
														...content.contact,
														description: value,
													},
												})
											}
											editMode={editMode}
											className="text-muted-foreground text-center"
											multiline
										/>
										<div className="flex justify-center">
											<EditableText
												id="contact-email"
												value={content.contact.email}
												onChange={(value) =>
													updateContent({
														contact: {
															...content.contact,
															email: value,
														},
													})
												}
												editMode={editMode}
												className="text-lg"
											/>
										</div>
										<div className="flex justify-center space-x-4">
											<EditableButton
												id="github-button"
												text="GitHub"
												link={content.social.github}
												onTextChange={() => {}}
												onLinkChange={(value) =>
													updateContent({
														social: {
															...content.social,
															github: value,
														},
													})
												}
												editMode={editMode}
												variant="default"
											/>
											<EditableButton
												id="linkedin-button"
												text="LinkedIn"
												link={content.social.linkedin}
												onTextChange={() => {}}
												onLinkChange={(value) =>
													updateContent({
														social: {
															...content.social,
															linkedin: value,
														},
													})
												}
												editMode={editMode}
												variant="default"
											/>
											<EditableButton
												id="twitter-button"
												text="Twitter"
												link={content.social.twitter}
												onTextChange={() => {}}
												onLinkChange={(value) =>
													updateContent({
														social: {
															...content.social,
															twitter: value,
														},
													})
												}
												editMode={editMode}
												variant="default"
											/>
										</div>
									</EditableSection>
								)}
							</TooltipProvider>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
