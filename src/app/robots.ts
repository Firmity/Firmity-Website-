import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/login',
        '/surveys',
        '/admin/',
        '/api/',
        '/dashboard/',
      ],
    },
    sitemap: 'https://www.firmity.in/sitemap.xml',
  }
}