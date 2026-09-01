import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StaySetu — Smart Gated Community Super-App',
    short_name: 'StaySetu',
    description: 'The intelligent operating system for smart gated societies, wrong parking resolution, live helper radar, and RWA management.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAFC',
    theme_color: '#0F172A',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    categories: ['lifestyle', 'business', 'utilities', 'productivity'],
  };
}
