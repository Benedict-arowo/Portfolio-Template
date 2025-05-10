"use client";

import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import { useContent } from "@/lib/content-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type Settings = {
  general: {
    siteName: string;
    siteDescription: string;
    logoText: string;
    faviconUrl: string;
  };
  hero: {
    name: string;
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
  about: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    description: string;
    email: string;
  };
  social: {
    github: string;
    twitter: string;
    linkedin: string;
  };
  footer: {
    copyright: string;
  };
};

export default function SettingsPage() {
  const { content, updateSection } = useContent();
  const [settings, setSettings] = useState<Settings>({
    general: content.general,
    hero: content.hero,
    about: content.about,
    contact: content.contact,
    social: content.social,
    footer: content.footer,
  });

  useEffect(() => {
    setSettings({
      general: content.general,
      hero: content.hero,
      about: content.about,
      contact: content.contact,
      social: content.social,
      footer: content.footer,
    });
  }, [content]);

  const handleChange = (section: keyof Settings, field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Map section keys to their backend endpoints.
  const updateEndpoints: Record<keyof Settings, string> = {
    general: "/api/site-content/general",
    hero: "/api/site-content/hero",
    about: "/api/site-content/about",
    contact: "/api/site-content/contact",
    social: "/api/site-content/social",
    footer: "/api/site-content/footer",
  };

  // Check if the section has been modified by comparing JSON.
  const isSectionModified = (sectionKey: keyof Settings) =>
    JSON.stringify(content[sectionKey]) !== JSON.stringify(settings[sectionKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const modifiedSections = (Object.keys(settings) as (keyof Settings)[]).filter(
      (sectionKey) => isSectionModified(sectionKey)
    );

    if (modifiedSections.length === 0) {
      toast("No changes detected.", { icon: "ℹ️", style: { background: "#323232", color: "#fff" } });
      return;
    }

    try {
      await Promise.all(
        modifiedSections.map(async (sectionKey) => {
          const endpoint = updateEndpoints[sectionKey];
          const response = await fetch(`http://localhost:5000${endpoint}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(settings[sectionKey]),
          });
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update ${sectionKey}: ${errorText}`);
          }
          const updatedSection = await response.json();
          updateSection(sectionKey, updatedSection);
        })
      );
      toast.success("Changes saved successfully!", {
        style: { background: "#22c55e", color: "#fff" },
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Error saving settings", {
        style: { background: "#dc2626", color: "#fff" },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast container */}
      <Toaster position="top-center" />

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-muted-foreground">Manage your website content and settings</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="about">About Section</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic information about your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) => handleChange("general", "siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.general.siteDescription}
                    onChange={(e) => handleChange("general", "siteDescription", e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">Used for SEO and meta tags</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logoText">Logo Text</Label>
                  <Input
                    id="logoText"
                    value={settings.general.logoText}
                    onChange={(e) => handleChange("general", "logoText", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faviconUrl">Favicon URL</Label>
                  <Input
                    id="faviconUrl"
                    value={settings.general.faviconUrl}
                    onChange={(e) => handleChange("general", "faviconUrl", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hero" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>The main section visitors see first</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heroName">Your Name</Label>
                  <Input
                    id="heroName"
                    value={settings.hero.name}
                    onChange={(e) => handleChange("hero", "name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Your Title</Label>
                  <Input
                    id="heroTitle"
                    value={settings.hero.title}
                    onChange={(e) => handleChange("hero", "title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroDescription">Description</Label>
                  <Textarea
                    id="heroDescription"
                    value={settings.hero.description}
                    onChange={(e) => handleChange("hero", "description", e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primaryButtonText">Primary Button Text</Label>
                    <Input
                      id="primaryButtonText"
                      value={settings.hero.primaryButtonText}
                      onChange={(e) => handleChange("hero", "primaryButtonText", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primaryButtonLink">Primary Button Link</Label>
                    <Input
                      id="primaryButtonLink"
                      value={settings.hero.primaryButtonLink}
                      onChange={(e) => handleChange("hero", "primaryButtonLink", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="secondaryButtonText">Secondary Button Text</Label>
                    <Input
                      id="secondaryButtonText"
                      value={settings.hero.secondaryButtonText}
                      onChange={(e) =>
                        handleChange("hero", "secondaryButtonText", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryButtonLink">Secondary Button Link</Label>
                    <Input
                      id="secondaryButtonLink"
                      value={settings.hero.secondaryButtonLink}
                      onChange={(e) =>
                        handleChange("hero", "secondaryButtonLink", e.target.value)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
                <CardDescription>Information about you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="aboutTitle">Section Title</Label>
                  <Input
                    id="aboutTitle"
                    value={settings.about.title}
                    onChange={(e) =>
                      handleChange("about", "title", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aboutDescription">Description</Label>
                  <Textarea
                    id="aboutDescription"
                    value={settings.about.description}
                    onChange={(e) =>
                      handleChange("about", "description", e.target.value)
                    }
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Section</CardTitle>
                <CardDescription>How people can get in touch with you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactTitle">Section Title</Label>
                  <Input
                    id="contactTitle"
                    value={settings.contact.title}
                    onChange={(e) =>
                      handleChange("contact", "title", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactDescription">Description</Label>
                  <Textarea
                    id="contactDescription"
                    value={settings.contact.description}
                    onChange={(e) =>
                      handleChange("contact", "description", e.target.value)
                    }
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email Address</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contact.email}
                    onChange={(e) =>
                      handleChange("contact", "email", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
                <CardDescription>Your social media profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input
                    id="github"
                    value={settings.social.github}
                    onChange={(e) =>
                      handleChange("social", "github", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input
                    id="twitter"
                    value={settings.social.twitter}
                    onChange={(e) =>
                      handleChange("social", "twitter", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    value={settings.social.linkedin}
                    onChange={(e) =>
                      handleChange("social", "linkedin", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="footer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Footer</CardTitle>
                <CardDescription>Footer content and links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="copyright">Copyright Text</Label>
                  <Input
                    id="copyright"
                    value={settings.footer.copyright}
                    onChange={(e) =>
                      handleChange("footer", "copyright", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
