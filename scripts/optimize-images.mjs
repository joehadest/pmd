/**
 * Gera as imagens otimizadas (WebP) usadas pelo site a partir dos originais.
 *
 *   assets/source/<pasta>/<arquivo>  →  public/img/<pasta>/<slug>[-<largura>].webp
 *
 * Rode sempre que adicionar ou trocar uma imagem:  npm run images
 */
import { readdir, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets/source';
const OUT = 'public/img';

const slugify = (name) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/^logos?\s+/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Configuração por pasta: larguras geradas e qualidade. */
const presets = {
  lineup: { widths: [480, 800], quality: 78 },
  estrutura: { widths: [800, 1600], quality: 76 },
  openbar: { widths: [720, 1080], quality: 80 },
  // Logos: recorta a área transparente para todas ficarem com o mesmo "peso" visual.
  patrocinadores: { height: 160, quality: 90, trim: true },
  brand: { widths: [320, 640], quality: 90 },
};

const isImage = (f) => /\.(png|jpe?g|webp)$/i.test(f);

async function processFolder(folder) {
  const preset = presets[folder];
  if (!preset) return;

  const files = (await readdir(path.join(SRC, folder))).filter(isImage);
  const outDir = path.join(OUT, folder);
  await mkdir(outDir, { recursive: true });

  for (const file of files) {
    const input = path.join(SRC, folder, file);
    const slug = slugify(path.parse(file).name);

    if (preset.height) {
      let img = sharp(input);
      if (preset.trim) img = sharp(await img.trim({ threshold: 1 }).toBuffer());
      await img
        .resize({ height: preset.height, withoutEnlargement: true })
        .webp({ quality: preset.quality, alphaQuality: 100 })
        .toFile(path.join(outDir, `${slug}.webp`));
      console.log(`✓ ${folder}/${slug}.webp`);
      continue;
    }

    for (const width of preset.widths) {
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: preset.quality })
        .toFile(path.join(outDir, `${slug}-${width}.webp`));
    }
    console.log(`✓ ${folder}/${slug} (${preset.widths.join(', ')})`);
  }
}

/** Imagem de compartilhamento (WhatsApp, Instagram, Facebook…) 1200×630. */
async function buildOgImage() {
  const selo = await sharp(path.join(SRC, 'brand/selo-pmd-2026.png'))
    .resize({ height: 540 })
    .toBuffer();

  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: '#0b1f63' },
  })
    .composite([{ input: selo, gravity: 'center' }])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile('public/og-image.jpg');
  console.log('✓ og-image.jpg');
}

await rm(OUT, { recursive: true, force: true });
for (const folder of await readdir(SRC)) await processFolder(folder);
await buildOgImage();
