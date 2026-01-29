# Como Adicionar Logos dos Patrocinadores

Este guia explica como adicionar logos reais dos patrocinadores ao site.

**Nota:** O marquee de patrocinadores foi removido. Se você deseja adicionar patrocinadores, pode criar uma nova seção específica para isso.

## 📁 Estrutura de Arquivos

```
public/
  └── patrocinadores/
      ├── patrocinador1.png
      ├── patrocinador2.png
      ├── patrocinador3.png
      └── ...
```

## 🎨 Especificações das Imagens

- **Formato recomendado**: PNG com fundo transparente
- **Formatos aceitos**: PNG, JPG, SVG, WEBP
- **Tamanho recomendado**: 400x200px (proporção 2:1)
- **Peso máximo**: 200KB por imagem
- **Cor**: Preferencialmente logos em branco/cores claras (o componente já aplica filtros)

## 📝 Passo a Passo

### 1. Adicionar as imagens dos patrocinadores

Crie a pasta `patrocinadores` dentro de `public/` e adicione os logos:

```
public/patrocinadores/
```

### 2. Editar o componente HeroSection.jsx

Abra o arquivo `src/components/HeroSection.jsx` e substitua o array `sponsors` (linhas 7-14):

**ANTES (com placeholders):**
```jsx
const sponsors = [
  { id: 1, name: "Patrocinador 1" },
  { id: 2, name: "Patrocinador 2" },
  // ...
];
```

**DEPOIS (com logos reais):**
```jsx
const sponsors = [
  { 
    id: 1, 
    name: "Nome da Empresa 1", 
    logo: "/patrocinadores/empresa1.png",
    website: "https://empresa1.com.br" // opcional
  },
  { 
    id: 2, 
    name: "Nome da Empresa 2", 
    logo: "/patrocinadores/empresa2.png",
    website: "https://empresa2.com.br"
  },
  { 
    id: 3, 
    name: "Nome da Empresa 3", 
    logo: "/patrocinadores/empresa3.png",
    website: "https://empresa3.com.br"
  },
  // Adicione quantos patrocinadores precisar
];
```

### 3. Atualizar o JSX para exibir imagens

No mesmo arquivo, substitua a parte do render (procure por `hero-marquee-item`):

**ANTES:**
```jsx
<div className="hero-marquee-item">
  <div className="hero-sponsor-placeholder">
    <span>{sponsor.name}</span>
  </div>
</div>
```

**DEPOIS:**
```jsx
<div className="hero-marquee-item">
  {sponsor.website ? (
    <a 
      href={sponsor.website} 
      target="_blank" 
      rel="noopener noreferrer"
      className="hero-sponsor-link"
      title={sponsor.name}
    >
      <img 
        src={sponsor.logo} 
        alt={sponsor.name}
        className="hero-sponsor-logo"
      />
    </a>
  ) : (
    <img 
      src={sponsor.logo} 
      alt={sponsor.name}
      className="hero-sponsor-logo"
    />
  )}
</div>
```

### 4. Adicionar estilo para links (opcional)

Se quiser adicionar links clicáveis, adicione este CSS em `HeroSection.css`:

```css
.hero-sponsor-link {
  display: block;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.hero-sponsor-link:hover {
  transform: scale(1.1);
}
```

## 🎯 Exemplo Completo

Aqui está um exemplo completo de como ficaria o trecho do HeroSection com logos reais:

```jsx
// Dentro do HeroSection.jsx
const HeroSection = () => {
  const sponsors = [
    { 
      id: 1, 
      name: "Supermercado XYZ", 
      logo: "/patrocinadores/supermercado-xyz.png",
      website: "https://supermercadoxyz.com.br"
    },
    { 
      id: 2, 
      name: "Construtora ABC", 
      logo: "/patrocinadores/construtora-abc.png",
      website: "https://construtorabc.com.br"
    },
    { 
      id: 3, 
      name: "Auto Peças Top", 
      logo: "/patrocinadores/autopecas-top.png"
    },
  ];

  // ... resto do código do HeroSection ...
  
  return (
    <section id="inicio" className="hero-section">
      {/* ... hero-background, hero-content etc ... */}
      
      {/* Marquee de Patrocinadores */}
      <div className="hero-marquee">
        <div className="hero-marquee-container">
          <div className="hero-marquee-content">
            {sponsors.map((sponsor) => (
              <div key={`first-${sponsor.id}`} className="hero-marquee-item">
                {sponsor.website ? (
                  <a 
                    href={sponsor.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hero-sponsor-link"
                    title={sponsor.name}
                  >
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name}
                      className="hero-sponsor-logo"
                    />
                  </a>
                ) : (
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="hero-sponsor-logo"
                  />
                )}
              </div>
            ))}
            
            {sponsors.map((sponsor) => (
              <div key={`second-${sponsor.id}`} className="hero-marquee-item">
                {sponsor.website ? (
                  <a 
                    href={sponsor.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hero-sponsor-link"
                    title={sponsor.name}
                  >
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name}
                      className="hero-sponsor-logo"
                    />
                  </a>
                ) : (
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="hero-sponsor-logo"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
```

## 💡 Dicas

1. **Otimize as imagens** antes de adicionar (use TinyPNG ou similar)
2. **Use fundos transparentes** para melhor integração visual
3. **Mantenha proporções consistentes** entre os logos
4. **Teste em diferentes dispositivos** para garantir responsividade
5. **Adicione quantos patrocinadores** precisar - o marquee se ajusta automaticamente
6. O marquee está integrado ao Hero para uma experiência visual mais coesa

## 🔧 Personalização

Você pode personalizar o comportamento do marquee editando o `HeroSection.css`:

- **Velocidade**: Altere `30s` em `animation: heroMarquee 30s` (menor = mais rápido)
- **Espaçamento**: Ajuste `padding: 0 30px` em `.hero-marquee-item`
- **Tamanho dos logos**: Modifique `width` e `height` em `.hero-sponsor-logo`
- **Pausa ao passar mouse**: Já está ativo em `.hero-marquee-content:hover`
- **Margem superior**: Ajuste `margin-top` em `.hero-marquee` para mais/menos espaço

## 📍 Onde está sendo usado

O marquee de patrocinadores está integrado diretamente no **HeroSection** (seção principal do site), aparecendo logo abaixo do conteúdo principal:

1. Título "CAMAROTE PMD 2026"
2. Descrição e informações do evento
3. Logo PMD 2026
4. **Marquee de patrocinadores** ← Aqui!

O design é minimalista e discreto, integrando-se perfeitamente à identidade visual do hero.

## ❓ Problemas Comuns

**Imagem não aparece**: Verifique se o caminho está correto e se a imagem está na pasta `public/`

**Imagem muito grande/pequena**: Ajuste as dimensões em `.sponsor-logo` no CSS

**Animação muito rápida/lenta**: Altere o valor em segundos na animação do CSS

---

📧 Precisa de ajuda? Entre em contato!

