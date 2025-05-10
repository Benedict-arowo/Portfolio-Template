"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit, Upload } from "lucide-react";

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
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";

interface EditableImageProps {
	id: string;
	src: string;
	alt: string;
	onSrcChange: (value: string) => void;
	onAltChange: (value: string) => void;
	editMode: boolean;
	width?: number;
	height?: number;
	className?: string;
}

export function EditableImage({
	src,
	alt,
	onSrcChange,
	onAltChange,
	editMode,
	width = 300,
	height = 200,
	className,
}: EditableImageProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [imageSrc, setImageSrc] = useState(src);
	const [imageAlt, setImageAlt] = useState(alt);

	const handleSave = () => {
		onSrcChange(imageSrc);
		onAltChange(imageAlt);
		setIsOpen(false);
	};

	return (
		<div className="group relative">
			<div className="relative overflow-hidden">
				<Image
					src={src || "/placeholder.svg"}
					alt={alt}
					width={width}
					height={height}
					className={className}
				/>

				{editMode && (
					<Dialog open={isOpen} onOpenChange={setIsOpen}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/80 p-2 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100"
										onClick={() => setIsOpen(true)}>
										<Edit className="h-5 w-5" />
									</button>
								</TooltipTrigger>
								<TooltipContent>Edit image</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<DialogContent>
							<DialogHeader>
								<DialogTitle>Edit Image</DialogTitle>
								<DialogDescription>
									Change the image source and alt text
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid gap-2">
									<Label htmlFor="image-src">Image URL</Label>
									<Input
										id="image-src"
										value={imageSrc}
										onChange={(e) =>
											setImageSrc(e.target.value)
										}
										placeholder="Enter image URL"
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="image-alt">Alt Text</Label>
									<Input
										id="image-alt"
										value={imageAlt}
										onChange={(e) =>
											setImageAlt(e.target.value)
										}
										placeholder="Describe the image"
									/>
								</div>
								<div className="flex items-center justify-center">
									<Button
										variant="outline"
										className="w-full">
										<Upload className="mr-2 h-4 w-4" />
										Upload Image
									</Button>
								</div>
							</div>
							<DialogFooter>
								<Button onClick={handleSave}>
									Save Changes
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				)}
			</div>
		</div>
	);
}
