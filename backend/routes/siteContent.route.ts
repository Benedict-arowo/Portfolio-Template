import { Router } from 'express';
import SiteContentController from '../controllers/siteContentController';
import Wrapper from '../middlewears/Wrapper';

const router = Router();

router.get('/', Wrapper(SiteContentController.getAll));
router.patch('/general', Wrapper(SiteContentController.updateGeneral));
router.patch('/hero', Wrapper(SiteContentController.updateHero));
router.patch('/about', Wrapper(SiteContentController.updateAbout));
router.patch('/skills', Wrapper(SiteContentController.updateSkills));
router.patch('/projects', Wrapper(SiteContentController.updateProjects));
router.patch('/navigation', Wrapper(SiteContentController.updateNavigation));
router.patch('/contact', Wrapper(SiteContentController.updateContact));
router.patch('/social', Wrapper(SiteContentController.updateSocial));
router.patch('/footer', Wrapper(SiteContentController.updateFooter));

export default {
    Router: router,
    routeUrl: "site-content",
}
