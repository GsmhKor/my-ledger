import sharp from 'sharp'

const icons = [
  ['public/app-icon.svg', 'public/apple-touch-icon.png', 180],
  ['public/app-icon.svg', 'public/pwa-192x192.png', 192],
  ['public/app-icon.svg', 'public/pwa-512x512.png', 512],
  ['public/app-icon-maskable.svg', 'public/maskable-512x512.png', 512],
]

await Promise.all(icons.map(([input, output, size]) => sharp(input).resize(size, size).png().toFile(output)))
console.log('PWA icons generated.')
