import type { MetadataRoute } from 'next';
import { CONFIG } from '../lib/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://richardpu.ca';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = CONFIG.PROJECTS.filter((p) => p.slug && p.caseStudy).map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectRoutes,
  ];
}