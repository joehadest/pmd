# Instruções para Adicionar Imagens e Vídeos

Esta pasta é destinada às imagens e vídeos da landing page do Camarote PMD 2026.

## Imagens Necessárias

### 1. Logo PMD
- **Nome do arquivo:** `logo-pmd.png` ou `logo-pmd.svg`
- **Dimensões recomendadas:** 200x80px (ou proporção similar)
- **Formato:** PNG com transparência ou SVG
- **Localização no código:** `src/components/Header.jsx`

### 2. Imagem de Fundo Hero (Opcional)
- **Nome do arquivo:** `hero-background.jpg`
- **Dimensões recomendadas:** 1920x1080px
- **Formato:** JPG ou PNG
- **Localização no código:** `src/components/HeroSection.jsx`

### 3. Galeria de Fotos (6-8 imagens)
- **Nome dos arquivos:** `gallery-1.jpg`, `gallery-2.jpg`, etc.
- **Dimensões recomendadas:** 800x600px cada
- **Formato:** JPG
- **Localização no código:** `src/components/GallerySection.jsx`
- **Sugestões de conteúdo:**
  - Fotos de edições anteriores do Bloco PMD
  - Foliões aproveitando o carnaval
  - Vista dos trios elétricos
  - Estrutura do camarote (se disponível)
  - Público animado
  - Momentos marcantes do Alto Folia

### 4. Thumbnail do Vídeo (Opcional)
- **Nome do arquivo:** `video-thumbnail.jpg`
- **Dimensões recomendadas:** 1920x1080px
- **Formato:** JPG
- **Localização no código:** `src/components/VideoSection.jsx`
- **Uso:** Imagem de poster/preview do vídeo antes de reproduzir

### 5. Fotos do Line-Up (6+ imagens)
- **Nome dos arquivos:** `lineup-1.jpg`, `lineup-2.jpg`, etc.
- **Dimensões recomendadas:** 400x400px cada
- **Formato:** JPG
- **Localização no código:** `src/components/LineUpSection.jsx`
- **Sugestões de conteúdo:**
  - Fotos dos artistas/atrações confirmadas
  - Imagens promocionais dos shows
  - Logo das bandas/artistas

## Vídeos

### Vídeo Promocional
- **Localização:** `public/videos/pmd-video.mp4` (criar pasta `videos`)
- **Dimensões recomendadas:** 1920x1080px (Full HD)
- **Formato:** MP4 (H.264)
- **Proporção:** 16:9
- **Duração sugerida:** 1-3 minutos
- **Tamanho máximo:** 50MB (comprimir se necessário)
- **Localização no código:** `src/components/VideoSection.jsx`

**Alternativas ao vídeo local:**
- YouTube: Use o link embed do YouTube
- Vimeo: Use o link embed do Vimeo
- Instruções detalhadas estão no código do componente

## Como Adicionar as Imagens

1. Coloque os arquivos de imagem nesta pasta (`public/images/`)
2. As imagens estarão disponíveis no código através do caminho `/images/nome-do-arquivo.ext`
3. Não é necessário modificar o código se você mantiver os nomes de arquivo recomendados
4. Se usar nomes diferentes, atualize os caminhos nos componentes correspondentes

## Otimização Recomendada

Para melhor performance:
- Comprima as imagens antes de adicionar (use TinyPNG, ImageOptim, etc.)
- JPG para fotos (qualidade 80-90%)
- PNG para logos e imagens com transparência
- WebP como alternativa moderna (suportado pela maioria dos navegadores)

## Formato Alternativo WebP

Se desejar usar WebP para melhor performance:
- Converta as imagens para `.webp`
- Atualize as extensões no código dos componentes

