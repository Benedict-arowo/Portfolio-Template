// validators/siteContentSchemas.ts
import Joi from 'joi';

/**
 * Schema for the General section.
 */
export const generalSchema = Joi.object({
  siteName: Joi.string().required(),
  siteDescription: Joi.string().required(),
  logoText: Joi.string().required(),
  faviconUrl: Joi.string().uri().required(),
});

/**
 * Schema for the Hero section.
 */
export const heroSchema = Joi.object({
  name: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  primaryButtonText: Joi.string().required(),
  primaryButtonLink: Joi.string().uri().required(),
  secondaryButtonText: Joi.string().required(),
  secondaryButtonLink: Joi.string().uri().required(),
});

/**
 * Schema for the About section.
 */
export const aboutSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

/**
 * Schema for the Skills array.
 */
export const skillsSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().optional(), // during creation, id might not be provided
    title: Joi.string().required(),
    description: Joi.string().required(),
  })
);

/**
 * Schema for the Projects array.
 */
export const projectsSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().optional(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    tags: Joi.array().items(Joi.string()).required(),
    slug: Joi.string().required(),
  })
);

/**
 * Schema for the Navigation array.
 */
export const navigationSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().optional(),
    label: Joi.string().required(),
    url: Joi.string().uri().required(),
  })
);

/**
 * Schema for the Contact section.
 */
export const contactSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  email: Joi.string().email().required(),
});

/**
 * Schema for the Social section.
 */
export const socialSchema = Joi.object({
  github: Joi.string().uri().required(),
  twitter: Joi.string().uri().required(),
  linkedin: Joi.string().uri().required(),
});

/**
 * Schema for the Footer section.
 */
export const footerSchema = Joi.object({
  copyright: Joi.string().required(),
});
