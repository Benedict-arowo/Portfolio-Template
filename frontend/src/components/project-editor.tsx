"use client"

import { useState } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { Edit, Grip, Plus, Save, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  slug: string
}

interface ProjectEditorProps {
  projects: Project[]
  onProjectsChange: (projects: Project[]) => void
}

export function ProjectEditor({ projects, onProjectsChange }: ProjectEditorProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(projects)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onProjectsChange(items)
  }

  const handleAddProject = () => {
    const newProject = {
      id: `project-${Date.now()}`,
      title: "New Project",
      description: "Project description",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Tag 1", "Tag 2"],
      slug: `new-project-${Date.now()}`,
    }
    setEditingProject(newProject)
    setIsDialogOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject({ ...project })
    setIsDialogOpen(true)
  }

  const handleDeleteProject = (id: string) => {
    onProjectsChange(projects.filter((project) => project.id !== id))
  }

  const handleSaveProject = () => {
    if (!editingProject) return

    const isNewProject = !projects.find((p) => p.id === editingProject.id)

    if (isNewProject) {
      onProjectsChange([...projects, editingProject])
    } else {
      onProjectsChange(projects.map((project) => (project.id === editingProject.id ? editingProject : project)))
    }

    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Projects</h3>
        <Button onClick={handleAddProject} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {projects.map((project, index) => (
                <Draggable key={project.id} draggableId={project.id} index={index}>
                  {(provided) => (
                    <Card ref={provided.innerRef} {...provided.draggableProps} className="relative overflow-hidden">
                      <div
                        {...provided.dragHandleProps}
                        className="absolute left-2 top-3 cursor-move text-muted-foreground"
                      >
                        <Grip className="h-5 w-5" />
                      </div>
                      <CardHeader className="pl-10">
                        <CardTitle className="flex items-center justify-between">
                          <span>{project.title}</span>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditProject(project)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)}>
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingProject?.id.includes("new") ? "Add Project" : "Edit Project"}</DialogTitle>
          </DialogHeader>
          {editingProject && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={editingProject.image}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={editingProject.tags.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      tags: e.target.value.split(",").map((tag) => tag.trim()),
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={editingProject.slug}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Used in the URL: /projects/your-slug</p>
              </div>
              <Button onClick={handleSaveProject} className="mt-4">
                <Save className="mr-2 h-4 w-4" />
                Save Project
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
