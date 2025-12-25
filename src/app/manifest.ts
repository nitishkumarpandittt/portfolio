import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nitish - Software Engineer',
    short_name: 'Nitish Portfolio',
    description: 'Full-stack developer specializing in React, Next.js, Node.js, and modern web technologies',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}