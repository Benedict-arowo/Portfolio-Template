"use client"

import { PageEditor } from "@/components/page-editor"


export default function PageBuilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Page Builder</h1>
        <p className="text-muted-foreground">Visually edit your portfolio page with drag-and-drop and live editing</p>
      </div>

      <PageEditor />
    </div>
  )
}
