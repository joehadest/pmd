/**
 * Conteúdo do site.
 *
 * Com o painel admin DESLIGADO (padrão, VITE_ENABLE_ADMIN != "true"), este
 * arquivo é a fonte do conteúdo publicado: para mudar algo no site, edite aqui.
 *
 * Com o painel LIGADO, o conteúdo vem do Supabase e este arquivo vira a reserva,
 * usada enquanto o banco carrega ou se ele estiver fora do ar. Ao religar o
 * painel, confira se o banco tem as mesmas mudanças feitas aqui no meio tempo.
 */

export const navLinks = [
  { id: 'inicio', label: 'Início' },
  { id: 'lineup', label: 'Line-up', section: 'lineup' },
  { id: 'openbar', label: 'Open Bar', section: 'openbar' },
  { id: 'estrutura', label: 'Estrutura', section: 'structure' },
  { id: 'ingressos', label: 'Ingressos', section: 'tickets' },
  { id: 'pontos-de-venda', label: 'Pontos de venda', section: 'sales' },
];

/** Seções que podem ser ligadas/desligadas pelo painel. */
export const SECTION_KEYS = {
  video: 'Vídeo da edição anterior',
  lineup: 'Line-up',
  openbar: 'Open Bar',
  structure: 'Estrutura',
  tickets: 'Ingressos',
  sales: 'Pontos de venda',
  instagram: 'Instagram',
  sponsors: 'Patrocinadores',
  pousada: 'Pousada Central',
};

export const defaultSections = Object.fromEntries(Object.keys(SECTION_KEYS).map((k) => [k, true]));

/**
 * Gera srcSet/versão grande para as imagens locais otimizadas (public/img).
 * Imagens enviadas pelo painel já chegam otimizadas e usam a URL direta.
 */
const LOCAL_SIZES = { lineup: [480, 800], estrutura: [800, 1600], openbar: [720, 1080] };

export function imageSet(url) {
  const match = /^(\/img\/(lineup|estrutura|openbar)\/.+)-(\d+)\.webp$/.exec(url || '');
  if (!match) return { src: url, srcSet: undefined, large: url };
  const [, base, folder] = match;
  const [small, big] = LOCAL_SIZES[folder];
  return {
    src: `${base}-${small}.webp`,
    srcSet: `${base}-${small}.webp ${small}w, ${base}-${big}.webp ${big}w`,
    large: `${base}-${big}.webp`,
  };
}

export const whatsappUrl = (phone, message) =>
  phone ? `https://wa.me/${phone.replace(/\D/g, '')}${message ? `?text=${encodeURIComponent(message)}` : ''}` : '';

export const formatBRL = (value) =>
  Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });

const perks = (abada) => [abada, '2 dias de Open Bar', 'Atrações exclusivas', 'Segurança privada', 'Vista privilegiada dos trios'];

/** Linhas no mesmo formato do banco — o site sempre passa por mapContent(). */
export const fallbackRows = {
  settings: {
    event_name: 'Camarote PMD 2026',
    edition: 'Alto Folia 2026',
    organizer: 'Bloco Pode Mangar Deu',
    date_label: '28 e 29 de março',
    date_short: '28 & 29/03',
    date_days: 'Sábado e Domingo',
    city: 'Alto do Rodrigues',
    state: 'RN',
    hero_title_1: 'Camarote',
    hero_title_2: 'PMD 2026',
    hero_lead:
      'Uma nova estrutura, pensada em cada detalhe, para oferecer ainda mais conforto, segurança e uma experiência inesquecível aos nossos foliões.',
    tickets_url: 'https://outgo.com.br/camarotepmd2026',
    tickets_url_label: 'outgo.com.br/camarotepmd2026',
    tickets_subtitle: 'As primeiras vendas do bloco já encerraram! Agora vamos para uma nova etapa.',
    batch_label: '1º lote liberado',
    batch_validity: 'Lote válido até 05 de março ou enquanto durar.',
    video_url: '/video/pmd-experiencia.mp4',
    openbar_poster_url: '/img/openbar/open-bar-camarote-pmd-2026-1080.webp',
    instagram_handle: '@podemangardeu',
    instagram_url: 'https://instagram.com/podemangardeu',
    commercial_phone: '558496454229',
    commercial_message: 'Olá, gostaria de saber mais sobre parcerias com o Camarote PMD.',
    pousada_phone: '558435232356',
    pousada_phone_display: '(84) 3523-2356',
    footer_about:
      'Desde 2007 o Bloco Pode Mangar Deu faz parte da história do Alto Folia. Em 2026, um novo capítulo: o Camarote PMD.',
    sections: defaultSections,
  },
  artists: [
    ['Banda Pretta', 'banda-preta'],
    ['Jeff Costa', 'jeff-costa'],
    ['Lucas Boquinha', 'lucas-boquinha'],
    ['JP Forrozado', 'jp-forrozado'],
    ['PK', 'pk'],
    ['Oz Piraz', 'oz-piraz'],
    ['DJ Guilherme', 'dj-guilherme'],
    ['DJ Ironside', 'dj-ironside'],
    ['Livia Souza', 'livia-souza'],
  ].map(([name, slug], i) => ({
    id: slug,
    name,
    image_url: `/img/lineup/${slug}-480.webp`,
    time_label: '',
    confirmed: true,
    position: i,
  })),
  openbar: [
    ['Budweiser e Brahma Chopp', 'Open de cerveja'],
    ['Skol Beats', '600 litros'],
    ['Vodka Smirnoff', 'Open de vodka'],
    ['Suco da Confusão', '200 litros'],
    ['Refrigerante e água', 'Open liberado'],
  ].map(([title, detail], i) => ({ id: `ob-${i}`, title, detail, position: i })),
  photos: Array.from({ length: 8 }, (_, i) => ({
    id: `foto-${i + 1}`,
    image_url: `/img/estrutura/camarote-${i + 1}-800.webp`,
    alt: `Projeto da estrutura do Camarote PMD — vista ${i + 1}`,
    position: i,
  })),
  tickets: [
    {
      id: 'casadinha',
      name: 'Casadinha',
      people_label: '2 pessoas · Sábado e Domingo',
      price: 420,
      per_person: 210,
      featured: true,
      perks: perks('2 abadás oficiais do Bloco PMD'),
      purchase_url: '',
      position: 0,
    },
    {
      id: 'individual',
      name: 'Individual',
      people_label: '1 pessoa · Sábado e Domingo',
      price: 250,
      per_person: null,
      featured: false,
      perks: perks('1 abadá oficial do Bloco PMD'),
      purchase_url: '',
      position: 1,
    },
  ],
  sales: [
    ['Alto do Rodrigues', 'Loja PMD', 'Av. Angelo Varela, 815', '9h às 12h · 15h às 18h'],
    ['Alto do Rodrigues', 'DiskGela', 'Av. Angelo Varela, 824', 'Ter. a Sáb. · 18h às 0h'],
    ['Alto do Rodrigues', 'Boutique de Luxo', 'Av. Angelo Varela, 425', '9h às 12h · 15h às 18h'],
    ['Macau', 'Malu Store', 'Rua Martins Ferreira, 401', '9h às 12h'],
  ].map(([city, name, address, hours], i) => ({ id: `pv-${i}`, city, name, address, hours, position: i })),
  sponsors: [
    ['Delta Construções & Serviços', 'delta'],
    ['DaCasa', 'dacasa'],
    ['Sol Maxi', 'sol-maxi', 1.5],
    ['Baracho', 'baracho'],
    ['Disk Gela', 'diskgela'],
    ['Viva', 'viva'],
    ['iTudo', 'itudo'],
    ['Ultranet', 'ultranet-vertical'],
    ['Supercola', 'supercola'],
    ['Arena', 'arena'],
    ['AutoMais', 'automais'],
    ['MasterMais', 'mastermais', 1.25],
    ['Pousada Central', 'pousada-central'],
  ].map(([name, slug, scale = 1], i) => ({
    id: slug,
    name,
    logo_url: `/img/patrocinadores/${slug}.webp`,
    scale,
    website_url: '',
    position: i,
  })),
};

/** Converte as linhas do banco no formato usado pelos componentes do site. */
export function mapContent(rows) {
  const s = { ...fallbackRows.settings, ...(rows.settings || {}) };

  const cities = [];
  for (const p of rows.sales || []) {
    let group = cities.find((c) => c.city === p.city);
    if (!group) cities.push((group = { city: p.city, stores: [] }));
    group.stores.push({ id: p.id, name: p.name, address: p.address, hours: p.hours });
  }

  return {
    event: {
      name: s.event_name,
      edition: s.edition,
      organizer: s.organizer,
      dates: { label: s.date_label, short: s.date_short, days: s.date_days },
      city: s.city,
      state: s.state,
      heroTitle: [s.hero_title_1, s.hero_title_2],
      heroLead: s.hero_lead,
      ticketsUrl: s.tickets_url,
      ticketsUrlLabel: s.tickets_url_label,
      instagram: { handle: s.instagram_handle, url: s.instagram_url },
      commercialWhatsapp: whatsappUrl(s.commercial_phone, s.commercial_message),
      videoUrl: s.video_url,
      footerAbout: s.footer_about,
    },
    sections: { ...defaultSections, ...(s.sections || {}) },
    lineup: (rows.artists || []).map((a) => ({
      id: a.id,
      name: a.name,
      timeLabel: a.time_label,
      confirmed: a.confirmed,
      ...imageSet(a.image_url),
    })),
    openBar: {
      image: imageSet(s.openbar_poster_url),
      items: (rows.openbar || []).map((o) => ({ id: o.id, title: o.title, detail: o.detail })),
    },
    structurePhotos: (rows.photos || []).map((p) => ({ id: p.id, alt: p.alt, ...imageSet(p.image_url) })),
    tickets: {
      batch: s.batch_label,
      validity: s.batch_validity,
      subtitle: s.tickets_subtitle,
      options: (rows.tickets || []).map((t) => ({
        id: t.id,
        name: t.name,
        people: t.people_label,
        price: Number(t.price),
        perPerson: t.per_person == null ? null : Number(t.per_person),
        featured: t.featured,
        perks: t.perks || [],
        url: t.purchase_url || s.tickets_url,
      })),
    },
    salesPoints: cities,
    sponsors: (rows.sponsors || []).map((sp) => ({
      id: sp.id,
      name: sp.name,
      src: sp.logo_url,
      scale: Number(sp.scale) || 1,
      url: sp.website_url,
    })),
    pousada: { phoneRaw: s.pousada_phone, phoneDisplay: s.pousada_phone_display },
  };
}

export const fallbackContent = mapContent(fallbackRows);
