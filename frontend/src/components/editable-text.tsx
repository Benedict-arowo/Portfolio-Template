"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Edit } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface EditableTextProps {
  id: string
  value: string
  onChange: (value: string) => void
  editMode: boolean
  className?: string
  multiline?: boolean
}

export function EditableText({ id, value, onChange, editMode, className, multiline = false }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    setText(value)
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleClick = () => {
    if (editMode) {
      setIsEditing(true)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
    onChange(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      setIsEditing(false)
      onChange(text)
    }
    if (e.key === "Escape") {
      setIsEditing(false)
      setText(value)
    }
  }

  if (isEditing && editMode) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className,
          )}
          rows={3}
        />
      )
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
      />
    )
  }

  return (
    <TooltipProvider>
      <div
        className={cn(
          "group relative cursor-text",
          editMode &&
            "hover:bg-muted/30 hover:outline hover:outline-1 hover:outline-dashed hover:outline-muted-foreground",
        )}
        onClick={handleClick}
      >
        <div className={cn("whitespace-pre-wrap", className)}>{text || "Click to edit text"}</div>
        {editMode && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="absolute right-0 top-0 hidden rounded-full bg-primary p-1 text-primary-foreground group-hover:block"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsEditing(true)
                }}
              >
                <Edit className="h-3 w-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Edit text</TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  )
}
