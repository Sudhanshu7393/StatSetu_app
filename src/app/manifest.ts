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
        src: '/screenshots/mobile-screen.png',
        sizes: '1080x1920',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'StaySetu Mobile Dashboard',
      },
      {
        src: '/screenshots/desktop-screen.png',
        sizes: '1920x1080',
        type: 'image/png',
        form_factor: 'wide',
        label: 'StaySetu Society Portal',
      },
    ],
  };
}
