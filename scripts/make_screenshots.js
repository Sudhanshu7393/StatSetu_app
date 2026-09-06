const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(process.cwd(), 'public', 'screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function main() {
  const sourceImage = path.join(process.cwd(), 'public', 'images', 'society-hero-mobile.png');

  // 1. Mobile Portrait Screenshot 1080x1920
  await sharp(sourceImage)
    .resize(1080, 1920, { fit: 'cover' })
    .png()
    .toFile(path.join(dir, 'mobile-screen.png'));

  // 2. Desktop Landscape Screenshot 1920x1080
  await sharp(sourceImage)
    .resize(1920, 1080, { fit: 'cover' })
    .png()
    .toFile(path.join(dir, 'desktop-screen.png'));

  console.log('SCREENSHOTS_GENERATED_SUCCESSFULLY');
}

main().catch(console.error);
