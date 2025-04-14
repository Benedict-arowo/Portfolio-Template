// controllers/SiteContentController.ts
import { Request, Response } from 'express';
import SiteContentService from '../services/siteContentService';

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
