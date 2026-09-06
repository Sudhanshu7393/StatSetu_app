import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StaySetu — Smart Gated Community & Society Super-App',
    short_name: 'StaySetu',
    description: 'The intelligent operating system for smart gated societies, wrong parking resolution, live helper radar, FastTag gate passes, and RWA management.',
    start_url: '/',
    id: 'com.staysetu.app',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F8FAFC',
    theme_color: '#0F172A',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['lifestyle', 'business', 'utilities', 'productivity'],
    screenshots: [
      {
        src: '/images/society-hero.jpg',
        sizes: '1200x630',
        type: 'image/jpeg',
      },
    ],
  };
}
