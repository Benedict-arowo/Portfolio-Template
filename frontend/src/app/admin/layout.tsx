"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	FileText,
	Home,
	LayoutDashboard,
	LogOut,
	PanelLeft,
	Settings,
	User,
	Wrench,
} from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/protected-route";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const { logout } = useAuth();

	return (
		<ProtectedRoute requiredRole="admin">
			<SidebarProvider>
				<div className="flex min-h-screen bg-background w-full">
					<Sidebar>
						<SidebarHeader className="flex h-14 items-center border-b px-4">
							<Link
								href="/admin"
								className="flex items-center gap-2 font-semibold">
								<LayoutDashboard className="h-5 w-5" />
								<span>Admin Dashboard</span>
							</Link>
						</SidebarHeader>
						<SidebarContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton
										asChild
										isActive={pathname === "/admin"}>
										<Link
											href="/admin"
											className="flex items-center">
											<Home className="mr-2 h-5 w-5" />
											<span>Dashboard</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton
										asChild
										isActive={
											pathname === "/admin/page-builder"
										}>
										<Link
											href="/admin/page-builder"
											className="flex items-center">
											<PanelLeft className="mr-2 h-5 w-5" />
											<span>Page Builder</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton
										asChild
										isActive={
											pathname === "/admin/projects" ||
											pathname.startsWith(
												"/admin/projects/"
											)
										}>
										<Link
											href="/admin/projects"
											className="flex items-center">
											<FileText className="mr-2 h-5 w-5" />
											<span>Projects</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton
										asChild
										isActive={pathname === "/admin/skills"}>
										<Link
											href="/admin/skills"
											className="flex items-center">
											<Wrench className="mr-2 h-5 w-5" />
											<span>Skills</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>

								<SidebarMenuItem>
									<SidebarMenuButton
										asChild
										isActive={
											pathname === "/admin/profile"
										}>
										<Link
											href="/admin/profile"
											className="flex items-center">
											<User className="mr-2 h-5 w-5" />
											<span>Profile</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>

								<SidebarMenuItem>
									<SidebarMenuButton
										asChild
										isActive={
											pathname === "/admin/settings"
										}>
										<Link
											href="/admin/settings"
											className="flex items-center">
											<Settings className="mr-2 h-5 w-5" />
											<span>Settings</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarContent>
						<SidebarFooter className="border-t p-4">
							<Button
								variant="outline"
								className="w-full justify-start"
								onClick={logout}>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Logout</span>
							</Button>
						</SidebarFooter>
					</Sidebar>
					<div className="flex flex-1 flex-col">
						<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
							<SidebarTrigger />
							<div className="ml-auto flex items-center gap-2">
								<Button variant="ghost" size="sm" asChild>
									<Link href="/" target="_blank">
										Preview Site
									</Link>
								</Button>
								<Button size="sm">Publish Changes</Button>
							</div>
						</header>
						<main className="flex-1 p-4 md:p-6 w-full">
							{children}
						</main>
					</div>
				</div>
			</SidebarProvider>
		</ProtectedRoute>
	);
}
