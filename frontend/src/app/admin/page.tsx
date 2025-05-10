"use client"

import Link from "next/link"
import { ArrowUpRight, FileText, PanelLeft, Settings, User } from "lucide-react"

import { useContent } from "@/lib/content-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  const { content } = useContent()

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your portfolio.</p>
        </div>
        <Button asChild>
          <Link href="/admin/page-builder">
            <PanelLeft className="mr-2 h-4 w-4" />
            Open Page Builder
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.projects.length}</div>
            <p className="text-xs text-muted-foreground">Manage your portfolio projects</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/admin/projects">
                View All Projects
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.skills.length}</div>
            <p className="text-xs text-muted-foreground">Manage your expertise</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/admin/skills">
                Edit Skills
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Builder</CardTitle>
            <PanelLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Visual Editor</div>
            <p className="text-xs text-muted-foreground">Edit your site visually</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/admin/page-builder">
                Open Page Builder
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" asChild>
              <Link href="/admin/page-builder">
                <PanelLeft className="mr-2 h-4 w-4" />
                Edit Page Visually
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/projects/new">
                <FileText className="mr-2 h-4 w-4" />
                Add New Project
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/profile">
                <User className="mr-2 h-4 w-4" />
                Update Profile
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Edit Site Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Site Overview</CardTitle>
            <CardDescription>Current site configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Site Name</p>
                  <p className="text-sm text-muted-foreground">{content.general.siteName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Navigation Items</p>
                  <p className="text-sm text-muted-foreground">{content.navigation.length} items</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Contact Email</p>
                  <p className="text-sm text-muted-foreground">{content.contact.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Social Links</p>
                  <p className="text-sm text-muted-foreground">3 platforms</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/admin/settings">Edit Site Settings</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
