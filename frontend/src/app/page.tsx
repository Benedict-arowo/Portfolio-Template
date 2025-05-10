"use client";

import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react";

import { useContent } from "@/lib/content-provider";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import Head from "next/head";

export default function Home() {
	const { content } = useContent();
	const {
		general,
		hero,
		projects,
		about,
		skills,
		navigation,
		contact,
		social,
		footer,
	} = content;

	return (
		<div className="flex min-h-screen flex-col bg-background">
			<Head>
				<title>{general.siteName}</title>
				<meta name="description" content={general.siteDescription} />
				<link rel="icon" href={general.faviconUrl} />
			</Head>
			<header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 max-w-[85%] mx-auto">
				<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 w-full">
					<div className="flex gap-6 md:gap-10">
						<Link href="/" className="flex items-center space-x-2">
							<span className="inline-block font-bold">
								{general.logoText}
							</span>
						</Link>
						<nav className="hidden gap-6 md:flex">
							{navigation.map((item) => (
								<Link
									key={item.id}
									href={item.url}
									className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
									{item.label}
								</Link>
							))}
						</nav>
					</div>
					<div className="flex flex-1 items-center justify-end space-x-4">
						<nav className="flex items-center space-x-1">
							<Button variant="ghost" size="icon" asChild>
								<Link
									href={social.github}
									target="_blank"
									rel="noreferrer">
									<Github className="h-5 w-5" />
									<span className="sr-only">GitHub</span>
								</Link>
							</Button>
							<Button variant="ghost" size="icon" asChild>
								<Link
									href={social.twitter}
									target="_blank"
									rel="noreferrer">
									<Twitter className="h-5 w-5" />
									<span className="sr-only">Twitter</span>
								</Link>
							</Button>
							<Button variant="ghost" size="icon" asChild>
								<Link
									href={social.linkedin}
									target="_blank"
									rel="noreferrer">
									<Linkedin className="h-5 w-5" />
									<span className="sr-only">LinkedIn</span>
								</Link>
							</Button>
						</nav>
					</div>
				</div>
			</header>
			<main className="flex-1 mx-auto">
				<section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
					<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center w-full">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
							<span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
								{hero.name}
							</span>
							<br />
							{hero.title}
						</h1>
						<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
							{hero.description}
						</p>
						<div className="flex gap-4">
							<Button asChild>
								<Link href={hero.primaryButtonLink}>
									{hero.primaryButtonText}{" "}
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link href={hero.secondaryButtonLink}>
									{hero.secondaryButtonText}
								</Link>
							</Button>
						</div>
					</div>
				</section>
				<section
					id="about"
					className="container space-y-6 bg-slate-950 py-8 dark:bg-transparent md:py-12 lg:py-24">
					<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
						<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
							{about.title}
						</h2>
						<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
							{about.description}
						</p>
					</div>
					<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
						{skills.map((skill) => (
							<div
								key={skill.id}
								className="relative overflow-hidden rounded-lg border bg-background p-2">
								<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
									<div className="space-y-2">
										<h3 className="font-bold">
											{skill.title}
										</h3>
										<p className="text-sm text-muted-foreground">
											{skill.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
				<section
					id="projects"
					className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24">
					<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
						<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
							Projects
						</h2>
						<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
							Check out some of my recent work
						</p>
					</div>
					<div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3">
						{projects.map((p) => {
							return (
								<ProjectCard
									key={p.id}
									title={p.title}
									description={p.description}
									image={p.image}
									tags={p.tags}
									slug={p.slug}
								/>
							);
						})}
					</div>
				</section>
				<section
					id="contact"
					className="container space-y-6 bg-slate-950 py-8 dark:bg-transparent md:py-12 lg:py-24">
					<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
						<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
							{contact.title}
						</h2>
						<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
							{contact.description}
						</p>
					</div>
					<div className="mx-auto grid max-w-3xl gap-6 py-8">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="flex items-center space-x-4">
								<Mail className="h-6 w-6 text-muted-foreground" />
								<p className="text-lg">{contact.email}</p>
							</div>
							<div className="flex space-x-4">
								<Button asChild>
									<Link
										href={social.github}
										target="_blank"
										rel="noreferrer">
										<Github className="mr-2 h-4 w-4" />
										GitHub
									</Link>
								</Button>
								<Button asChild>
									<Link
										href={social.linkedin}
										target="_blank"
										rel="noreferrer">
										<Linkedin className="mr-2 h-4 w-4" />
										LinkedIn
									</Link>
								</Button>
								<Button asChild>
									<Link
										href={social.twitter}
										target="_blank"
										rel="noreferrer">
										<Twitter className="mr-2 h-4 w-4" />
										Twitter
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="border-t py-6 md:py-0 max-w-[85%] w-full mx-auto">
				<div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
					<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
						{footer.copyright}
					</p>
					<div className="flex items-center space-x-1">
						<Button variant="ghost" size="icon" asChild>
							<Link
								href={social.github}
								target="_blank"
								rel="noreferrer">
								<Github className="h-4 w-4" />
								<span className="sr-only">GitHub</span>
							</Link>
						</Button>
						<Button variant="ghost" size="icon" asChild>
							<Link
								href={social.twitter}
								target="_blank"
								rel="noreferrer">
								<Twitter className="h-4 w-4" />
								<span className="sr-only">Twitter</span>
							</Link>
						</Button>
						<Button variant="ghost" size="icon" asChild>
							<Link
								href={social.linkedin}
								target="_blank"
								rel="noreferrer">
								<Linkedin className="h-4 w-4" />
								<span className="sr-only">LinkedIn</span>
							</Link>
						</Button>
					</div>
				</div>
			</footer>
		</div>
	);
}
