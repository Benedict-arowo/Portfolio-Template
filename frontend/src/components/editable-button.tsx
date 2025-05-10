"use client";

import { useState } from "react";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "@/components/ui/tooltip";

interface EditableButtonProps {
	id: string;
	text: string;
	link: string;
	onTextChange: (value: string) => void;
	onLinkChange: (value: string) => void;
	editMode: boolean;
	variant?:
		| "default"
		| "outline"
		| "secondary"
		| "ghost"
		| "link"
		| "destructive";
}

export function EditableButton({
	text,
	link,
	onTextChange,
	onLinkChange,
	editMode,
	variant = "default",
}: EditableButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [buttonText, setButtonText] = useState(text);
	const [buttonLink, setButtonLink] = useState(link);

	const handleSave = () => {
		onTextChange(buttonText);
		onLinkChange(buttonLink);
		setIsOpen(false);
	};

	if (!editMode) {
		return (
			<Button variant={variant} asChild>
				<a href={link}>{text}</a>
			</Button>
		);
	}

	return (
		<div className="group relative">
			<Button
				variant={variant}
				onClick={(e) => editMode && e.preventDefault()}>
				{text}
			</Button>

			{editMode && (
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									className="absolute -right-2 -top-2 rounded-full bg-primary p-1 text-primary-foreground opacity-0 group-hover:opacity-100"
									onClick={() => setIsOpen(true)}>
									<Edit className="h-3 w-3" />
								</button>
							</TooltipTrigger>
							<TooltipContent>Edit button</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit Button</DialogTitle>
							<DialogDescription>
								Change the button text and link
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="button-text">Button Text</Label>
								<Input
									id="button-text"
									value={buttonText}
									onChange={(e) =>
										setButtonText(e.target.value)
									}
									placeholder="Enter button text"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="button-link">Button Link</Label>
								<Input
									id="button-link"
									value={buttonLink}
									onChange={(e) =>
										setButtonLink(e.target.value)
									}
									placeholder="Enter URL or #section"
								/>
							</div>
						</div>
						<DialogFooter>
							<Button onClick={handleSave}>Save Changes</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
