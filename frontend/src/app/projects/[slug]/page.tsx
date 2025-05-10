"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Github, Globe } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/content-provider";
import { use } from "react";

export default function ProjectPage({ params }: { params: { slug: string } }) {
	const {
		content: { projects },
	} = useContent();
	const { slug } = use(params);
	const project = projects.find((p) => p.slug === slug);
	console.log(project);

	if (!project) {
		return <div>Project not found</div>;
	}

	return (
		<div className="flex min-h-screen flex-col bg-background">
			<header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
					<div className="flex gap-6 md:gap-10">
						<Link href="/" className="flex items-center space-x-2">
							<span className="inline-block font-bold">
								DevPortfolio
							</span>
						</Link>
					</div>
					<div className="flex flex-1 items-center justify-end space-x-4">
						<Button variant="ghost" size="sm" asChild>
							<Link href="/#projects">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to Projects
							</Link>
						</Button>
					</div>
				</div>
			</header>
			<main className="flex-1">
				<div className="container py-8 md:py-12">
					<div className="relative aspect-video overflow-hidden rounded-lg border">
						<Image
							src={project.image || "/placeholder.svg"}
							alt={project.title}
							fill
							className="object-cover"
							priority
						/>
					</div>
					<div className="mt-8 grid gap-8 md:grid-cols-3">
						<div className="md:col-span-2">
							<h1 className="text-3xl font-bold tracking-tight md:text-4xl">
								{project.title}
							</h1>
							<p className="mt-4 text-lg text-muted-foreground">
								{project.longDescription}
							</p>
							{/* <div className="mt-8">
								<h2 className="text-xl font-semibold">
									Features
								</h2>
								<ul className="mt-4 grid gap-2 md:grid-cols-2">
									{project.features.map((feature) => (
										<li
											key={feature}
											className="flex items-center">
											<span className="mr-2 text-green-500">
												✓
											</span>
											{feature}
										</li>
									))}
								</ul>
							</div>
							<div className="mt-8">
								<h2 className="text-xl font-semibold">
									Technologies Used
								</h2>
								<ul className="mt-4 grid gap-2 md:grid-cols-2">
									{project.technologies.map((tech) => (
										<li
											key={tech}
											className="flex items-center">
											<span className="mr-2 text-purple-500">
												•
											</span>
											{tech}
										</li>
									))}
								</ul>
							</div> */}
						</div>
						<div>
							<div className="rounded-lg border p-6">
								<h2 className="text-xl font-semibold">
									Project Details
								</h2>
								<div className="mt-4 space-y-4">
									<div className="flex flex-wrap gap-2">
										{project.tags.map((tag) => (
											<Badge
												key={tag}
												variant="secondary">
												{tag}
											</Badge>
										))}
									</div>
									<div className="space-y-2">
										{project.liveUrl && (
											<Button className="w-full" asChild>
												<Link
													href={project.liveUrl}
													target="_blank"
													rel="noreferrer">
													<Globe className="mr-2 h-4 w-4" />
													View Live Site
												</Link>
											</Button>
										)}{" "}
										{project.githubUrl && (
											<Button
												variant="outline"
												className="w-full"
												asChild>
												<Link
													href={project.githubUrl}
													target="_blank"
													rel="noreferrer">
													<Github className="mr-2 h-4 w-4" />
													View Source Code
												</Link>
											</Button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<footer className="border-t py-6 md:py-0">
				<div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
					<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
						© 2025 John Doe. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
