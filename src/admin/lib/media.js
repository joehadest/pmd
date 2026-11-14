import { supabase, MEDIA_BUCKET } from '../../lib/supabase';

/**
 * Perfis de otimização: toda imagem enviada pelo painel é redimensionada e
 * convertida para WebP no próprio navegador antes do upload.
 */
export const PRESETS = {
  poster: { maxWidth: 900, maxHeight: 1600, quality: 0.82 }, // cartazes do line-up
  photo: { maxWidth: 1600, maxHeight: 1600, quality: 0.8 }, // fotos da estrutura
  flyer: { maxWidth: 1080, maxHeight: 1920, quality: 0.85 }, // cartaz do open bar
  logo: { maxWidth: 800, maxHeight: 240, quality: 0.9, trim: true }, // logos (fundo transparente)
  avatar: { maxWidth: 320, maxHeight: 320, quality: 0.85, square: true }, // foto de perfil
};

/** Recorta o centro da imagem em um quadrado (fotos de perfil). */
function cropSquare(canvas) {
  const side = Math.min(canvas.width, canvas.height);
  const out = document.createElement('canvas');
  out.width = side;
  out.height = side;
  out
    .getContext('2d')
    .drawImage(canvas, (canvas.width - side) / 2, (canvas.height - side) / 2, side, side, 0, 0, side, side);
  return out;
}

const slug = (name) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50) || 'imagem';

/** Recorta bordas transparentes (logos), como o script de imagens do projeto faz. */
function trimTransparent(canvas) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const { width, height } = canvas;
  const { data } = ctx.getImageData(0, 0, width, height);
  let top = height, left = width, right = -1, bottom = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 8) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }
  if (right < 0) return canvas; // imagem totalmente transparente
  const out = document.createElement('canvas');
  out.width = right - left + 1;
  out.height = bottom - top + 1;
  out.getContext('2d').drawImage(canvas, left, top, out.width, out.height, 0, 0, out.width, out.height);
  return out;
}

const toBlob = (canvas, type, quality) => new Promise((resolve) => canvas.toBlob(resolve, type, quality));

/** Redimensiona e converte para WebP. SVG e vídeo passam direto. */
export async function prepareImage(file, presetName = 'photo') {
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') return file;
  const preset = PRESETS[presetName] || PRESETS.photo;

  const bitmap = await createImageBitmap(file);
  let source = document.createElement('canvas');
  source.width = bitmap.width;
  source.height = bitmap.height;
  source.getContext('2d').drawImage(bitmap, 0, 0);
  bitmap.close?.();

  if (preset.trim) source = trimTransparent(source);
  if (preset.square) source = cropSquare(source);

  const scale = Math.min(1, preset.maxWidth / source.width, preset.maxHeight / source.height);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(source.width * scale);
  canvas.height = Math.round(source.height * scale);
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

  // Safari antigo não gera WebP: cai para PNG (logos) ou JPEG (fotos)
  let blob = await toBlob(canvas, 'image/webp', preset.quality);
  if (!blob || blob.type !== 'image/webp') {
    blob = await toBlob(canvas, preset.trim ? 'image/png' : 'image/jpeg', preset.quality);
  }
  const ext = blob.type.split('/')[1];
  return new File([blob], `${slug(file.name)}.${ext}`, { type: blob.type });
}

/** Otimiza e envia para o bucket; devolve a URL pública. */
export async function uploadImage(file, { folder = 'geral', preset = 'photo' } = {}) {
  const prepared = await prepareImage(file, preset);
  const ext = (prepared.name.match(/\.([a-z0-9]+)$/i)?.[1] || prepared.type.split('/')[1] || 'bin').toLowerCase();
  const path = `${folder}/${Date.now().toString(36)}-${slug(prepared.name)}.${ext}`;
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, prepared, { cacheControl: '31536000', contentType: prepared.type, upsert: false });
  if (error) throw error;
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

const marker = `/storage/v1/object/public/${MEDIA_BUCKET}/`;

/** true se a URL aponta para um arquivo enviado pelo painel (e não uma imagem do próprio site). */
export const isUploaded = (url) => typeof url === 'string' && url.includes(marker);

/** Apaga do bucket uma imagem enviada pelo painel (ignora imagens locais do site). */
export async function removeImage(url) {
  if (!isUploaded(url)) return;
  const path = decodeURIComponent(url.split(marker)[1]);
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path]);
  if (error) console.warn('[mídia] não foi possível apagar', path, error.message);
}
