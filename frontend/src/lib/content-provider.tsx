"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define the content structure
type SiteContent = {
	general: {
		siteName: string;
		siteDescription: string;
		logoText: string;
		faviconUrl: string;
	};
	hero: {
		name: string;
		title: string;
		description: string;
		primaryButtonText: string;
		primaryButtonLink: string;
		secondaryButtonText: string;
		secondaryButtonLink: string;
	};
	about: {
		title: string;
		description: string;
	};
	skills: Array<{
		id: string;
		title: string;
		description: string;
	}>;
	projects: Array<{
		id: string;
		title: string;
		description: string;
		image: string;
		tags: string[];
		slug: string;
	}>;
	navigation: Array<{
		id: string;
		label: string;
		url: string;
	}>;
	contact: {
		title: string;
		description: string;
		email: string;
	};
	social: {
		github: string;
		twitter: string;
		linkedin: string;
	};
	footer: {
		copyright: string;
	};
};

const initialContent: SiteContent = {
	general: {
		siteName: "DevPortfolio",
		siteDescription:
			"Personal portfolio website for John Doe, Full Stack Developer",
		logoText: "DevPortfolio",
		faviconUrl: "/favicon.ico",
	},
	hero: {
		name: "John Doe",
		title: "Full Stack Developer",
		description:
			"I build innovative web applications with modern technologies. Focused on creating responsive, accessible, and performant user experiences.",
		primaryButtonText: "View Projects",
		primaryButtonLink: "#projects",
		secondaryButtonText: "Contact Me",
		secondaryButtonLink: "#contact",
	},
	about: {
		title: "About Me",
		description:
			"I'm a passionate full-stack developer with over 5 years of experience building web applications. I specialize in React, Next.js, Node.js, and modern web technologies.",
	},
	skills: [],
	projects: [],
	navigation: [
		// {
		// 	id: "1",
		// 	label: "About",
		// 	url: "#about",
		// },
		// {
		// 	id: "2",
		// 	label: "Projects",
		// 	url: "#projects",
		// },
		// {
		// 	id: "3",
		// 	label: "Contact",
		// 	url: "#contact",
		// },
	],
	contact: {
		title: "Contact Me",
		description: "Interested in working together? Let's connect!",
		email: "john.doe@example.com",
	},
	social: {
		github: "https://github.com",
		twitter: "https://twitter.com",
		linkedin: "https://linkedin.com",
	},
	footer: {
		copyright: "© 2025 John Doe. All rights reserved.",
	},
};

// Create context
type ContentContextType = {
	content: SiteContent;
	updateContent: (newContent: Partial<SiteContent>) => void;
	updateSection: <K extends keyof SiteContent>(
		section: K,
		data: Partial<SiteContent[K]>
	) => void;
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
	const [content, setContent] = useState<SiteContent>(initialContent);
	const [isContentFetched, setIsContentFetched] = useState(false); // Add a flag

	// Fetch content from backend on mount
	useEffect(() => {
		async function fetchContent() {
			try {
				const response = await fetch(
					"http://localhost:5000/api/site-content"
				);
				if (!response.ok) {
					throw new Error(
						"Failed to fetch site content from the backend."
					);
				}
				const data: SiteContent = await response.json();
				setContent(data);
				setIsContentFetched(true); // Mark content as fetched
			} catch (error) {
				console.error("Error fetching site content:", error);
				// Optionally, you can fall back to localStorage or keep the initial content.
				const savedContent = localStorage.getItem("site-content");
				if (savedContent) {
					try {
						setContent(JSON.parse(savedContent));
					} catch (e) {
						console.error("Failed to parse saved content:", e);
					}
					setIsContentFetched(true); // Mark content as fetched even if fallback is used
				}
			}
		}
		fetchContent();
	}, []);

	// Save content to localStorage when it changes
	useEffect(() => {
		if (isContentFetched) {
			localStorage.setItem("site-content", JSON.stringify(content));
		}
	}, [content, isContentFetched]);

	const updateContent = (newContent: Partial<SiteContent>) => {
		console.log("Updating content", newContent);
		setContent((prev) => {
			return { ...prev, ...newContent };
		});
	};

	const updateSection = <K extends keyof SiteContent>(
		section: K,
		data: Partial<SiteContent[K]>
	) => {
		setContent((prev) => {
			return section === "skills"
				? {
						...prev,
						[section]: [...prev[section], ...data],
				  }
				: {
						...prev,
						[section]: {
							...prev[section],
							...data,
						},
				  };
		});
	};

	return (
		<ContentContext.Provider
			value={{ content, updateContent, updateSection }}>
			{children}
		</ContentContext.Provider>
	);
}

export function useContent() {
	const context = useContext(ContentContext);
	if (context === undefined) {
		throw new Error("useContent must be used within a ContentProvider");
	}
	return context;
}
