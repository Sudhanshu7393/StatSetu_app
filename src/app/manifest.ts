import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StaySetu — Smart Gated Societies & Rent Dream Homes',
    short_name: 'StaySetu',
    description: 'India\'s #1 Super-App for Smart Gated Society Management, Voice Gate Passes, Live Maid Attendance Radar, and Verified Rental Homes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#1E1B4B',
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
