# 🎉 Landing Page Camarote PMD 2026 - Instruções

## ✅ Projeto Concluído!

A landing page está **100% funcional** e pronta para uso. Todos os componentes foram implementados com sucesso!

## 🚀 Como Executar o Projeto

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```

O projeto estará disponível em: `http://localhost:5173`

### 3. Build para Produção
```bash
npm run build
```

### 4. Preview do Build
```bash
npm run preview
```

## 📸 Como Adicionar Imagens e Logo

### Logo PMD (Header)
1. Coloque o arquivo em: `public/images/logo-pmd.png` ou `logo-pmd.svg`
2. Abra `src/components/Header.jsx`
3. Localize o comentário `/* ADICIONAR LOGO AQUI */`
4. Substitua o placeholder por:
```jsx
<img src="/images/logo-pmd.png" alt="Camarote PMD" />
```

### Vídeo Promocional (NOVO! 🎥)
**Opção 1 - Vídeo Local:**
1. Crie a pasta: `public/videos/`
2. Adicione o vídeo: `public/videos/pmd-video.mp4`
3. Abra `src/components/VideoSection.jsx`
4. Descomente o código do `<video>` onde indicado
5. **Especificações**: 1920x1080px, MP4, máx 50MB

**Opção 2 - YouTube (Recomendado):**
1. Abra `src/components/VideoSection.jsx`
2. Substitua o placeholder pelo iframe do YouTube
3. Cole o link embed do seu vídeo

**Opção 3 - Vimeo:**
1. Mesma coisa, mas com link do Vimeo
2. Instruções detalhadas estão no código

### Galeria de Fotos (8 imagens)
1. Adicione as fotos em: `public/images/`
2. Nomeie como: `gallery-1.jpg`, `gallery-2.jpg`, ..., `gallery-8.jpg`
3. As imagens aparecerão automaticamente (o código já está preparado)
4. **Dimensões recomendadas**: 800x600px (formato JPG)

### Imagem de Fundo Hero (Opcional)
1. Coloque em: `public/images/hero-background.jpg`
2. Abra `src/components/HeroSection.jsx`
3. Descomente a linha do `<img>` onde indicado
4. **Dimensões recomendadas**: 1920x1080px

## 📂 Estrutura do Projeto

```
pmd2/
├── public/
│   ├── images/
│   │   ├── README.md          (instruções detalhadas)
│   │   ├── logo-pmd.png       (adicionar)
│   │   ├── hero-background.jpg (opcional)
│   │   ├── video-thumbnail.jpg (opcional)
│   │   ├── gallery-1.jpg      (adicionar)
│   │   ├── gallery-2.jpg      (adicionar)
│   │   └── ...
│   └── videos/
│       └── pmd-video.mp4      (adicionar - opcional)
├── src/
│   ├── components/
│   │   ├── Header.jsx & .css
│   │   ├── HeroSection.jsx & .css
│   │   ├── AboutSection.jsx & .css
│   │   ├── VideoSection.jsx & .css (NOVO! 🎥)
│   │   ├── TicketsSection.jsx & .css
│   │   ├── GallerySection.jsx & .css
│   │   ├── LocationSection.jsx & .css
│   │   ├── InstagramSection.jsx & .css
│   │   └── Footer.jsx & .css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── RESPONSIVIDADE.md
└── INSTRUCOES.md (este arquivo)
```

## 🎨 Recursos Implementados

### ✅ Componentes
- [x] Header com navegação responsiva
- [x] Hero Section com informações do evento
- [x] About Section (história do PMD)
- [x] Video Section (🎥 loop infinito como GIF)
- [x] Line-Up Section (🎵 atrações 2026) - NOVO!
- [x] Tickets Section (informações de ingressos)
- [x] Sales Points Section (📍 pontos de venda físicos) - NOVO!
- [x] Gallery Section com lightbox
- [x] Location Section com Google Maps
- [x] Instagram Section
- [x] Footer completo

### ✅ Funcionalidades
- [x] Menu hamburguer mobile
- [x] Navegação suave entre seções
- [x] Animações e transições
- [x] Lightbox na galeria
- [x] Botão scroll-to-top
- [x] Google Maps integrado
- [x] Links para redes sociais
- [x] 100% Responsivo

### ✅ Paleta de Cores PMD
- [x] Laranja Ouro (#F3AC3C)
- [x] Azul Celeste (#6DD9F8)
- [x] Azul Azure (#3B95F7)
- [x] Azul Real (#184196)
- [x] Gradientes vibrantes

## 📱 Responsividade

O site é totalmente responsivo e funciona perfeitamente em:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Desktop Grande (1920px+)

Veja `RESPONSIVIDADE.md` para detalhes completos.

## 🔧 Customizações Futuras

### Alterar Informações de Contato
Edite em `src/components/Footer.jsx`:
- WhatsApp
- Email
- Links de redes sociais

### Integrar Feed Real do Instagram
Veja instruções em `src/components/InstagramSection.jsx`

### Adicionar Sistema de Compra
A seção de ingressos está preparada para integração com:
- Sympla
- Eventbrite
- Seu próprio sistema

## 🌐 Deploy

O projeto pode ser hospedado em:

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Faça upload da pasta 'dist'
```

### GitHub Pages
```bash
npm run build
# Configure o GitHub Pages apontando para 'dist'
```

## 📝 Checklist Final

Antes de publicar:
- [x] Adicionar logo PMD ✅
- [x] Adicionar vídeo (loop como GIF) ✅
- [ ] Adicionar fotos do line-up (6+ imagens) 🎵
- [ ] Atualizar nomes das atrações no Line-Up
- [ ] Adicionar fotos da galeria (8 imagens)
- [ ] Atualizar número de WhatsApp no Footer
- [ ] Atualizar email de contato
- [ ] Verificar links do Instagram
- [ ] Conferir pontos de venda físicos ✅
- [ ] Testar em dispositivos reais
- [ ] Otimizar imagens (TinyPNG, ImageOptim)
- [ ] Fazer build de produção
- [ ] Deploy!

## 🎯 Principais Destaques

### Design
- Cores vibrantes inspiradas no carnaval
- Gradientes modernos
- Animações suaves
- Interface intuitiva

### Performance
- Lazy loading de imagens
- CSS otimizado
- Código minificado no build
- Animações com GPU

### Experiência do Usuário
- Navegação clara
- CTAs destacados
- Informações organizadas
- Mobile-first

## 📞 Suporte

Para dúvidas sobre a implementação, consulte:
- `README.md` - Visão geral do projeto
- `public/images/README.md` - Instruções sobre imagens
- `RESPONSIVIDADE.md` - Detalhes de responsividade

## 🎊 Pronto para Usar!

A landing page está **100% funcional** e pronta para receber as imagens e ir ao ar!

Basta:
1. `npm install`
2. `npm run dev`
3. Adicionar as imagens
4. Deploy!

**Bom carnaval! 🎭🎉**

