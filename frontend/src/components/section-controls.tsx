"use client"

import { Eye, EyeOff, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface SectionControlsProps {
  visible: boolean
  onToggleVisibility: () => void
}

export function SectionControls({ visible, onToggleVisibility }: SectionControlsProps) {
  return (
    <TooltipProvider>
      <div className="flex space-x-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggleVisibility}>
              {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{visible ? "Hide section" : "Show section"}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Section settings</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
