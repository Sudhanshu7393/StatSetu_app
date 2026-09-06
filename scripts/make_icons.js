const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(process.cwd(), 'public', 'icons');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const svg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" fill="#0F172A" />
  <rect x="12" y="12" width="488" height="488" rx="100" stroke="#1E293B" stroke-width="4" />
  <circle cx="256" cy="240" r="180" fill="url(#emeraldGlow)" opacity="0.3" />
  <g transform="translate(106, 80) scale(3.0)">
    <path d="M 50 10 L 86 38 C 88 39.5, 88.5 42.5, 87 44.5 L 83 48.5 C 81.5 50, 78.5 50.5, 76.5 49 L 76 48.5 V 60 C 76 74, 50 96, 50 96 C 50 96, 24 74, 24 60 V 48.5 L 23.5 49 C 21.5 50.5, 18.5 50, 17 48.5 L 13 44.5 C 11.5 42.5, 12 39.5, 14 38 Z" fill="#FFFFFF" />
    <path d="M 68 24 V 16 C 68 14.5, 69.5 13, 71 13 H 75 C 76.5 13, 78 14.5, 78 16 V 32 L 68 24 Z" fill="#FFFFFF" />
    <rect x="39" y="44" width="9.5" height="9.5" rx="2.5" fill="#38BDF8" />
    <rect x="51.5" y="44" width="9.5" height="9.5" rx="2.5" fill="#38BDF8" />
    <rect x="39" y="56.5" width="9.5" height="9.5" rx="2.5" fill="#38BDF8" />
    <rect x="51.5" y="56.5" width="9.5" height="9.5" rx="2.5" fill="#38BDF8" />
  </g>
  <defs>
    <radialGradient id="emeraldGlow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
      <stop offset="0%" stop-color="#10B981" />
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0" />
    </radialGradient>
  </defs>
</svg>`;

async function main() {
  const buf = Buffer.from(svg);
  await sharp(buf).resize(512, 512).png().toFile(path.join(dir, 'icon-512x512.png'));
  await sharp(buf).resize(192, 192).png().toFile(path.join(dir, 'icon-192x192.png'));
  await sharp(buf).resize(180, 180).png().toFile(path.join(dir, 'apple-touch-icon.png'));
  await sharp(buf).resize(512, 512).png().toFile(path.join(dir, 'icon-maskable.png'));
  await sharp(buf).resize(48, 48).png().toFile(path.join(process.cwd(), 'public', 'favicon.png'));
  console.log('ALL_PLAYSTORE_ICONS_SUCCESS');
}

main().catch(console.error);
