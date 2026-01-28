# 🎉 Novas Seções Adicionadas

## 1. 🎵 Line-Up 2026

### Localização
Entre "About Section" e "Tickets Section"

### Descrição
Seção dedicada às atrações musicais do Camarote PMD 2026.

### Recursos:
- ✅ Grid responsivo de artistas/atrações
- ✅ Cards com foto (placeholder) + informações
- ✅ Badge "Confirmado" em cada atração
- ✅ Seção "Mais Atrações em Breve"
- ✅ Notas musicais flutuando no fundo
- ✅ Background com gradiente azul

### Como Personalizar:

#### Adicionar Fotos dos Artistas:
1. Coloque as fotos em: `public/images/`
2. Nomeie como: `lineup-1.jpg`, `lineup-2.jpg`, etc.
3. Dimensões: 400x400px (formato quadrado)

#### Atualizar Nomes e Horários:
Edite `src/components/LineUpSection.jsx`:

```javascript
const lineup = [
  {
    name: 'Nome do Artista 1',
    time: '20:00 - Sábado',
    photo: '/images/lineup-1.jpg',
    placeholder: false // mude para false quando adicionar foto
  },
  {
    name: 'Nome do Artista 2',
    time: '22:00 - Sábado',
    photo: '/images/lineup-2.jpg',
    placeholder: false
  },
  // Adicione mais artistas conforme necessário
];
```

---

## 2. 📍 Pontos de Venda Físicos

### Localização
Entre "Tickets Section" e "Gallery Section"

### Descrição
Lista completa dos locais físicos onde é possível comprar ingressos.

### Informações Incluídas:

#### Alto do Rodrigues:
✅ **Loja PMD**
- Av. Angelo Varela, 815
- Horário: 9h às 12h / 15h às 18h

✅ **DiskGela**
- Av. Angelo Varela, 824
- Horário: Ter. a Sáb. 18h às 0h

✅ **Boutique de Luxo**
- Av. Angelo Varela, 425
- Horário: 9h às 12h / 15h às 18h

#### Macau:
✅ **MALU STORE**
- Rua Martins Ferreira, 401
- Horário: 9h às 12h

### Como Personalizar:

Para adicionar/editar pontos de venda, edite `src/components/SalesPointsSection.jsx`:

```javascript
const salesPoints = {
  altoRodrigues: [
    {
      name: 'Nome da Loja',
      address: 'Endereço completo',
      hours: 'Horário de funcionamento',
      icon: <FaStore />
    }
  ],
  // Adicione novas cidades conforme necessário
  outraCidade: [
    {
      name: 'Loja na Outra Cidade',
      address: 'Endereço',
      hours: 'Horário',
      icon: <FaStore />
    }
  ]
};
```

---

## 🎨 Design e Estilo

### Line-Up Section:
- **Background:** Gradiente azul (dark → secondary)
- **Cards:** Glass morphism com blur
- **Animações:** Float nos ícones, pulse nos badges
- **Decoração:** Notas musicais (♪ ♫) flutuando

### Sales Points Section:
- **Background:** Light background (#F0F8FF)
- **Cards:** Brancos com sombra suave
- **Hover:** Borda colorida + elevação
- **Ícones:** Círculos com gradiente azul

---

## 📱 Responsividade

Ambas as seções são **100% responsivas**:

### Desktop (1024px+):
- Line-Up: Grid de 3 colunas
- Sales Points: Grid adaptável (até 3 colunas)

### Tablet (768px):
- Line-Up: Grid de 2 colunas
- Sales Points: Grid de 2 colunas

### Mobile (até 767px):
- Line-Up: 1 coluna
- Sales Points: 1 coluna

---

## 🔗 Navegação Atualizada

O menu foi atualizado para incluir:
- ✅ Line-Up (link direto)
- ✅ Pontos de Venda (menu mobile)

---

## 📊 Nova Ordem das Seções

1. Header
2. Hero Section
3. Video Section (loop)
4. About Section
5. **🎵 Line-Up Section** ← NOVO!
6. Tickets Section
7. **📍 Sales Points Section** ← NOVO!
8. Gallery Section
9. Location Section
10. Instagram Section
11. Footer

---

## ✅ Pronto para Usar!

As seções estão **totalmente funcionais** e prontas. Basta:

1. **Line-Up:**
   - Adicionar fotos dos artistas em `public/images/`
   - Atualizar nomes e horários no código

2. **Pontos de Venda:**
   - Já configurado com todos os locais! ✅
   - Editar se precisar adicionar/remover lojas

3. Testar:
```bash
npm run dev
```

**Tudo funcionando perfeitamente!** 🎉

