# Guia de Responsividade - Camarote PMD 2026

Este documento descreve como a responsividade foi implementada na landing page.

## Breakpoints Utilizados

A landing page foi desenvolvida com abordagem **mobile-first** e possui os seguintes breakpoints:

### Desktop Grande (padrão)
- **1024px+**: Layout completo com todos os recursos
- Menu de navegação horizontal visível
- Grid de galeria com 4 colunas
- Todos os elementos com espaçamento máximo

### Tablet (768px - 1023px)
- Menu mobile ativado
- Grid de galeria com 3 colunas
- Redução de espaçamentos
- Ajuste de tamanhos de fonte
- Cards empilhados em algumas seções

### Mobile (até 767px)
- Layout em coluna única
- Menu hamburguer completo
- Grid de galeria com 2 colunas
- Botões em largura total
- Redução significativa de espaçamentos
- Textos menores para melhor legibilidade

### Mobile Pequeno (até 480px)
- Grid de galeria em 1 coluna
- Redução adicional de fontes
- Ícones menores
- Otimização máxima de espaço

## Componentes Responsivos

### Header
✅ Menu desktop oculto em mobile
✅ Menu hamburguer funcional
✅ Logo redimensionável
✅ Background com blur no scroll

### Hero Section
✅ Título ajustável com clamp()
✅ Cards de informação empilhados em mobile
✅ Botões em largura total em telas pequenas
✅ Elementos decorativos ocultos em mobile

### About Section
✅ Grid de benefícios adaptável
✅ Cards empilhados em mobile
✅ Lista de inclusões responsiva
✅ Padding ajustado por breakpoint

### Tickets Section
✅ Layout de card centralizado
✅ Preço redimensionável
✅ Features em coluna única no mobile
✅ CTA em largura total

### Gallery Section
✅ Grid adaptável (4→3→2→1 colunas)
✅ Lightbox responsivo
✅ Controles de navegação ajustados
✅ Placeholders com texto adaptável

### Location Section
✅ Layout de 2 colunas para 1 coluna
✅ Mapa responsivo (iframe)
✅ Cards de transporte empilhados
✅ Botão de rota em largura total

### Instagram Section
✅ Grid de posts adaptável
✅ Link do Instagram redimensionável
✅ Feed em 2 colunas no tablet, 1 no mobile
✅ Overlay responsivo

### Footer
✅ Grid de 4→2→1 colunas
✅ Links sociais wrapping
✅ Copyright centralizado em mobile
✅ Botão scroll-to-top posicionado corretamente

## Técnicas Utilizadas

### 1. CSS Grid & Flexbox
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

### 2. Clamp para Tipografia Fluida
```css
font-size: clamp(2rem, 6vw, var(--font-size-3xl));
```

### 3. Media Queries Mobile-First
```css
/* Mobile primeiro */
.element { ... }

/* Depois desktop */
@media (min-width: 768px) { ... }
```

### 4. Unidades Relativas
- `rem` e `em` para tamanhos
- `vw` e `vh` para viewports
- `%` para larguras

### 5. Aspect Ratio
```css
aspect-ratio: 4/3; /* Para imagens */
```

## Testes Recomendados

### Dispositivos para Testar
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13/14 (390px)
- [ ] Samsung Galaxy S21 (360px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop 1920px
- [ ] Desktop 2560px

### Navegadores
- [ ] Chrome (Desktop & Mobile)
- [ ] Firefox
- [ ] Safari (iOS)
- [ ] Edge

### Funcionalidades a Verificar
- [ ] Menu hamburguer abre/fecha corretamente
- [ ] Scroll suave funciona
- [ ] Botão scroll-to-top aparece ao rolar
- [ ] Lightbox da galeria funciona em mobile
- [ ] Links de navegação funcionam
- [ ] Mapa carrega corretamente
- [ ] Todas as animações funcionam
- [ ] Textos são legíveis em todas as telas
- [ ] Botões são clicáveis (tamanho mínimo 44x44px)

## Otimizações Implementadas

### Performance
✅ Lazy loading nas imagens da galeria
✅ CSS otimizado com variáveis
✅ Animações com GPU (transform, opacity)
✅ Debounce em scroll events

### Acessibilidade
✅ Tamanho mínimo de toque (44x44px)
✅ Contraste adequado de cores
✅ aria-labels em botões
✅ Navegação por teclado suportada

### SEO
✅ Meta tags responsivas
✅ Viewport configurado
✅ Semantic HTML
✅ Alt text em imagens

## Comandos para Testar

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Ferramentas de Teste

- **Chrome DevTools**: Device toolbar para simular diferentes dispositivos
- **Firefox Responsive Design Mode**: Similar ao Chrome
- **Real Device Testing**: Testar em dispositivos físicos sempre que possível
- **BrowserStack/LambdaTest**: Para testes em múltiplos dispositivos

## Notas Finais

A landing page foi construída pensando em **experiência mobile primeiro**, garantindo que:
- Todos os elementos são acessíveis e clicáveis em telas pequenas
- O conteúdo é legível sem necessidade de zoom
- As animações não prejudicam a performance
- A navegação é intuitiva em qualquer dispositivo

Todos os componentes foram testados visualmente nos breakpoints principais e estão prontos para uso!

