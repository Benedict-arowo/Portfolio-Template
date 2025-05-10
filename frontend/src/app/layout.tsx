import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AuthProvider } from "@/lib/auth-context";
import { ContentProvider } from "@/lib/content-provider";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "DevPortfolio - Web Developer Portfolio",
	description: "A showcase of web development projects and skills",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} dark`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem>
					<AuthProvider>
						<ContentProvider>{children}</ContentProvider>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
