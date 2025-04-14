// services/SiteContentService.ts
import prisma from '../prisma/db'; // Adjust path as necessary

class SiteContentService {
  /**
   * Gets (or creates if not present) the singleton SiteContent record.
   */
  static async getSiteContentRecord() {
    // Try to get an existing site content record along with all relations.
    let record = await prisma.siteContent.findFirst({
      include: {
        general: true,
        hero: true,
        about: true,
        contact: true,
        social: true,
        footer: true,
        skills: true,
        projects: true,
        navigation: true,
      },
    });

    // If not found, create a new default site content record with empty sections.
    if (!record) {
      record = await prisma.siteContent.create({
        data: {
          general: { create: { siteName: '', siteDescription: '', logoText: '', faviconUrl: '' } },
          hero: {
            create: {
              name: '',
              title: '',
              description: '',
              primaryButtonText: '',
              primaryButtonLink: '',
              secondaryButtonText: '',
              secondaryButtonLink: '',
            },
          },
          about: { create: { title: '', description: '' } },
          contact: { create: { title: '', description: '', email: '' } },
          social: { create: { github: '', twitter: '', linkedin: '' } },
          footer: { create: { copyright: '' } },
          // For arrays, they default to empty collections.
        },
        include: {
          general: true,
          hero: true,
          about: true,
          contact: true,
          social: true,
          footer: true,
          skills: true,
          projects: true,
          navigation: true,
        },
      });
    }
    return record;
  }

  // Fetch the entire site content.
  static async getAllContents() {
    return await this.getSiteContentRecord();
  }

  // Update the General section.
  static async updateGeneral(data: {
    siteName: string;
    siteDescription: string;
    logoText: string;
    faviconUrl: string;
  }) {
    const content = await this.getSiteContentRecord();
    const updated = await prisma.general.update({
      where: { siteContentId: content.id },
      data,
    });
    return updated;
  }

  // Update the Hero section.
  static async updateHero(data: {
    name: string;
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  }) {
    const content = await this.getSiteContentRecord();
    const updated = await prisma.hero.update({
      where: { siteContentId: content.id },
      data,
    });
    return updated;
  }

  // Update the About section.
  static async updateAbout(data: { title: string; description: string }) {
    const content = await this.getSiteContentRecord();
    const updated = await prisma.about.update({
      where: { siteContentId: content.id },
      data,
    });
    return updated;
  }

  // Update the Contact section.
  static async updateContact(data: { title: string; description: string; email: string }) {
    const content = await this.getSiteContentRecord();
    const updated = await prisma.contact.update({
      where: { siteContentId: content.id },
      data,
    });
    return updated;
  }

  // Update the Social section.
  static async updateSocial(data: { github: string; twitter: string; linkedin: string }) {
    const content = await this.getSiteContentRecord();
    const updated = await prisma.social.update({
      where: { siteContentId: content.id },
      data,
    });
    return updated;
  }

  // Update the Footer section.
  static async updateFooter(data: { copyright: string }) {
    const content = await this.getSiteContentRecord();
    const updated = await prisma.footer.update({
      where: { siteContentId: content.id },
      data,
    });
    return updated;
  }

  // Update the Skills array.
  static async updateSkills(skillsData: Array<{ id?: string; title: string; description: string }>) {
    const content = await this.getSiteContentRecord();
    // Delete existing skills for this SiteContent.
    await prisma.skill.deleteMany({ where: { siteContentId: content.id } });

    // Create new skills if there are any.
    if (skillsData.length) {
      await prisma.skill.createMany({
        data: skillsData.map((skill) => ({
          title: skill.title,
          description: skill.description,
          siteContentId: content.id,
        })),
      });
    }
    return await prisma.skill.findMany({
      where: { siteContentId: content.id },
    });
  }

  // Update the Projects array.
  static async updateProjects(
    projectsData: Array<{
      id?: string;
      title: string;
      description: string;
      image: string;
      tags: string[];
      slug: string;
    }>
  ) {
    const content = await this.getSiteContentRecord();
    await prisma.project.deleteMany({ where: { siteContentId: content.id } });

    if (projectsData.length) {
      await prisma.project.createMany({
        data: projectsData.map((project) => ({
          title: project.title,
          description: project.description,
          image: project.image,
          tags: project.tags,
          slug: project.slug,
          siteContentId: content.id,
        })),
      });
    }
    return await prisma.project.findMany({
      where: { siteContentId: content.id },
    });
  }

  // Update the Navigation array.
  static async updateNavigation(
    navigationData: Array<{ id?: string; label: string; url: string }>
  ) {
    const content = await this.getSiteContentRecord();
    await prisma.navigation.deleteMany({ where: { siteContentId: content.id } });

    if (navigationData.length) {
      await prisma.navigation.createMany({
        data: navigationData.map((navItem) => ({
          label: navItem.label,
          url: navItem.url,
          siteContentId: content.id,
        })),
      });
    }
    
    return await prisma.navigation.findMany({
      where: { siteContentId: content.id },
    });
  }
}

export default SiteContentService;
