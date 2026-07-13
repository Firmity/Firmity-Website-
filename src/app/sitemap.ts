import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.firmity.in'
  const lastModified = new Date()

  const routes = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/facility-survey', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/facility-survey/book', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/features', changeFrequency: 'monthly' as const, priority: 0.9 },
    // /pricing currently 307-redirects to / (page not built yet) — omit from the
    // sitemap until it's a real page, so we don't advertise a redirecting URL.
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/resources', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/blog/spreadsheets-to-cmms', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/blog/predictive-maintenance-ai', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/blog/mobile-first-technician-adoption', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/blog/cloud-vs-onprem-multisite', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/industries/manufacturing', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/industries/educational', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/industries/residential', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/preventive-maintenance', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/asset-management', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/complaint-management', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/inventory-management', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/facility-records', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/visitor-management', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/staff-attendance', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}