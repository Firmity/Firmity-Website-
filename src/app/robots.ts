import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/login',
        '/staff-login',
        '/surveys',
        '/my-surveys',
        '/survey/',
        '/awards',
        '/settings',
        '/profile',
        '/admin/',
        '/api/',
        '/dashboard/',
        '/r/',
      ],
    },
    sitemap: 'https://www.firmity.in/sitemap.xml',
  }
}