"use client"

import type { ReactNode } from "react"
import { Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface EditableSectionProps {
  id: string
  children: ReactNode
  className?: string
  editMode: boolean
  sectionName: string
}

export function EditableSection({ id, children, className, editMode, sectionName }: EditableSectionProps) {
  return (
    <section
      id={id}
      className={cn("relative", editMode && "outline outline-1 outline-dashed outline-muted-foreground/20", className)}
    >
      {editMode && (
        <div className="absolute -top-3 left-4 bg-background px-2 text-xs text-muted-foreground">{sectionName}</div>
      )}
      {editMode && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="absolute right-2 top-2 rounded-full bg-muted p-1 text-muted-foreground hover:bg-muted/80">
                <Settings className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Section settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {children}
    </section>
  )
}
