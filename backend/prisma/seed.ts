// seed.ts

import { PrismaClient } from '@prisma/client';
// If you generate your Prisma Client into a custom folder (e.g., "./generated/prisma"), adjust the import:
// import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

// Define your initial content data.
const initialContent = {
  general: {
    siteName: "DevPortfolio",
    siteDescription: "Personal portfolio website for John Doe, Full Stack Developer",
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
  skills: [
    {
      id: "1",
      title: "Frontend Development",
      description: "React, Next.js, TypeScript, Tailwind CSS",
    },
    {
      id: "2",
      title: "Backend Development",
      description: "Node.js, Express, PostgreSQL, MongoDB",
    },
    {
      id: "3",
      title: "DevOps & Tools",
      description: "Docker, AWS, CI/CD, Git, GitHub",
    },
  ],
  projects: [
    {
      id: "1",
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce platform built with Next.js, Stripe, and a headless CMS.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "Stripe", "Tailwind CSS"],
      slug: "ecommerce-platform",
    },
    {
      id: "2",
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team features.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Firebase", "TypeScript"],
      slug: "task-management",
    },
    {
      id: "3",
      title: "Portfolio Website",
      description:
        "A customizable portfolio template for developers and designers.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      slug: "portfolio-website",
    },
    {
      id: "4",
      title: "Social Media Dashboard",
      description:
        "An analytics dashboard for social media managers with data visualization.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "D3.js", "Node.js"],
      slug: "social-dashboard",
    },
    {
      id: "5",
      title: "AI Content Generator",
      description:
        "A tool that uses AI to generate marketing content and social media posts.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "OpenAI API", "MongoDB"],
      slug: "ai-content-generator",
    },
    {
      id: "6",
      title: "Real Estate Marketplace",
      description:
        "A platform for listing and searching properties with virtual tours.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Express", "PostgreSQL"],
      slug: "real-estate-marketplace",
    },
  ],
  navigation: [
    {
      id: "1",
      label: "About",
      url: "#about",
    },
    {
      id: "2",
      label: "Projects",
      url: "#projects",
    },
    {
      id: "3",
      label: "Contact",
      url: "#contact",
    },
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

async function main() {
    await prisma.siteContent.deleteMany(); 

  // Create the SiteContent record with nested writes.
  const siteContent = await prisma.siteContent.create({
    data: {
      // One-to-one relations
      general: { create: { ...initialContent.general } },
      hero: { create: { ...initialContent.hero } },
      about: { create: { ...initialContent.about } },
      contact: { create: { ...initialContent.contact } },
      social: { create: { ...initialContent.social } },
      footer: { create: { ...initialContent.footer } },
      // One-to-many relations
      skills: {
        create: initialContent.skills.map((skill) => ({
          title: skill.title,
          description: skill.description,
        })),
      },
      projects: {
        create: initialContent.projects.map((project) => ({
          title: project.title,
          description: project.description,
          image: project.image,
          tags: project.tags,
          slug: project.slug,
        })),
      },
      navigation: {
        create: initialContent.navigation.map((navItem) => ({
          label: navItem.label,
          url: navItem.url,
        })),
      },
    },
    include: {
      general: true,
      hero: true,
      about: true,
      contact: true,
      social: true,
      footer: true,
      skills: true,
      projects: true,
      navigation: true,
    },
  });

  console.log("Inserted SiteContent:", siteContent);
}

main()
  .catch((error) => {
    console.error("Error seeding data:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
