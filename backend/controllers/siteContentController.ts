// controllers/SiteContentController.ts
import { Request, Response } from "express";
import SiteContentService from "../services/siteContentService";

class SiteContentController {
	static async getAll(req: Request, res: Response) {
		try {
			const content = await SiteContentService.getAllContents();
			res.json(content);
		} catch (error) {
			console.error("Error fetching site content:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}

	static async updateGeneral(req: Request, res: Response) {
		try {
			const updated = await SiteContentService.updateGeneral(req.body);
			res.json(updated);
		} catch (error) {
			console.error("Error updating general section:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}

	static async updateHero(req: Request, res: Response) {
		try {
			const updated = await SiteContentService.updateHero(req.body);
			res.json(updated);
		} catch (error) {
			console.error("Error updating hero section:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}

	static async updateAbout(req: Request, res: Response) {
		try {
			const updated = await SiteContentService.updateAbout(req.body);
			res.json(updated);
		} catch (error) {
			console.error("Error updating about section:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}

	static async updateSkills(req: Request, res: Response) {
		try {
			const updated = await SiteContentService.updateSkills(req.body);
			res.json(updated);
		} catch (error) {
			console.error("Error updating skills:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}

	static async updateProjects(req: Request, res: Response) {
		try {
			const updated = await SiteContentService.updateProjects(req.body);
			res.json(updated);
		} catch (error) {
			console.error("Error updating projects:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}

	static async createProject(req: Request, res: Response) {
		try {
			const newProject = await SiteContentService.createProject(req.body);
			res.status(201).json(newProject);
		} catch (error) {
			console.error("Error creating project:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}

	static async deleteSkill(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await SiteContentService.deleteSkill(id);
			res.status(200).json({ message: "Skill deleted successfully" });
		} catch (error) {
			console.error("Error deleting skill:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}

	static async deleteProject(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await SiteContentService.deleteProject(id);
			res.status(200).json({ message: "Project deleted successfully" });
		} catch (error) {
			console.error("Error deleting project:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}

	static async updateNavigation(req: Request, res: Response) {
		try {
			const updated = await SiteContentService.updateNavigation(req.body);
			res.json(updated);
		} catch (error) {
			console.error("Error updating navigation:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}

	static async updateContact(req: Request, res: Response) {
		try {
			const updated = await SiteContentService.updateContact(req.body);
			res.json(updated);
		} catch (error) {
			console.error("Error updating contact section:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}

	static async updateSocial(req: Request, res: Response) {
		try {
			const updated = await SiteContentService.updateSocial(req.body);
			res.json(updated);
		} catch (error) {
			console.error("Error updating social section:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}

	static async updateFooter(req: Request, res: Response) {
		try {
			const updated = await SiteContentService.updateFooter(req.body);
			res.json(updated);
		} catch (error) {
			console.error("Error updating footer section:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
}

export default SiteContentController;
