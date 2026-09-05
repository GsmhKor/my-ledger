import sharp from 'sharp'

async function removeConnectedLightBackground(input, output) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const visited = new Uint8Array(width * height)
  const queue = new Int32Array(width * height)
  let head = 0
  let tail = 0

  const isBackground = (pixel) => {
    const offset = pixel * channels
    const red = data[offset]
    const green = data[offset + 1]
    const blue = data[offset + 2]
    return Math.min(red, green, blue) > 215 && Math.max(red, green, blue) - Math.min(red, green, blue) < 20
  }
  const enqueue = (pixel) => {
    if (pixel < 0 || pixel >= width * height || visited[pixel] || !isBackground(pixel)) return
    visited[pixel] = 1
    queue[tail++] = pixel
  }

  for (let x = 0; x < width; x++) {
    enqueue(x)
    enqueue((height - 1) * width + x)
  }
  for (let y = 0; y < height; y++) {
    enqueue(y * width)
    enqueue(y * width + width - 1)
  }
  while (head < tail) {
    const pixel = queue[head++]
    const x = pixel % width
    const y = Math.floor(pixel / width)
    data[pixel * channels + 3] = 0
    if (x > 0) enqueue(pixel - 1)
    if (x < width - 1) enqueue(pixel + 1)
    if (y > 0) enqueue(pixel - width)
    if (y < height - 1) enqueue(pixel + width)
  }

  await sharp(data, { raw: { width, height, channels } })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 3 })
    .resize({ width: 560, height: 320, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 86, alphaQuality: 95 })
    .toFile(output)
}

const icons = [
  ['design/generated/cat-pet-master.png', 'src/assets/cat-pet.png', 192],
  ['design/generated/app-icon-master.png', 'public/apple-touch-icon.png', 180],
  ['design/generated/app-icon-master.png', 'public/pwa-192x192.png', 192],
  ['design/generated/app-icon-master.png', 'public/pwa-512x512.png', 512],
  ['design/generated/app-icon-master.png', 'public/maskable-512x512.png', 512],
]

await Promise.all(icons.map(([input, output, size]) => sharp(input)
  .resize(size, size)
  .png({ compressionLevel: 9, palette: true, colours: 256, dither: 0.8 })
  .toFile(output)))
await Promise.all([
  removeConnectedLightBackground('design/generated/cat-sleeping-master.png', 'src/assets/cat-sleeping.webp'),
  removeConnectedLightBackground('design/generated/cat-laptop-master.png', 'src/assets/cat-laptop.webp'),
])
console.log('PWA icons and illustrations generated.')
