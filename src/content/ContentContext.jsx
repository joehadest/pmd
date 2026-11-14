import { createContext, useContext, useEffect, useState } from 'react';
import { fallbackContent, mapContent } from '../data/site';

const CACHE_KEY = 'pmd:content:v1';
const ContentContext = createContext(fallbackContent);

// O banco só é usado junto com o painel admin. Com o painel desligado
// (VITE_ENABLE_ADMIN diferente de "true"), o conteúdo vem de src/data/site.js.
const USE_DATABASE = import.meta.env.VITE_ENABLE_ADMIN === 'true';

// O site só LÊ dados: usa a API REST do Supabase direto com fetch, sem carregar
// a biblioteca completa (que fica só no painel admin). Economiza ~50 KB.
const API_URL = USE_DATABASE ? import.meta.env.VITE_SUPABASE_URL : '';
const API_KEY = USE_DATABASE ? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY : '';

async function rest(path) {
  const res = await fetch(`${API_URL}/rest/v1/${path}`, { headers: { apikey: API_KEY } });
  if (!res.ok) throw new Error(`${res.status} ${(await res.json().catch(() => ({}))).message || res.statusText}`);
  return res.json();
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? mapContent(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

/** Busca todas as tabelas de conteúdo em paralelo. Lança erro se algo falhar. */
export async function fetchContentRows() {
  const list = (table) => rest(`${table}?select=*&active=eq.true&order=position.asc`);
  const [settings, artists, openbar, photos, tickets, sales, sponsors] = await Promise.all([
    rest('site_settings?select=*&id=eq.1'),
    list('artists'),
    list('openbar_items'),
    list('structure_photos'),
    list('ticket_types'),
    list('sales_points'),
    list('sponsors'),
  ]);

  if (!settings[0]) throw new Error('site_settings vazio — rode o seed.');
  return { settings: settings[0], artists, openbar, photos, tickets, sales, sponsors };
}

/**
 * Fornece o conteúdo do site.
 * Mostra na hora a última versão em cache (ou o conteúdo padrão) e atualiza
 * com o Supabase em seguida — o site nunca fica em branco esperando o banco.
 */
export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => (USE_DATABASE && readCache()) || fallbackContent);

  useEffect(() => {
    if (!API_URL || !API_KEY) return;
    let cancelled = false;

    fetchContentRows()
      .then((rows) => {
        if (cancelled) return;
        setContent(mapContent(rows));
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(rows));
        } catch {
          /* armazenamento indisponível: segue sem cache */
        }
      })
      .catch((err) => console.warn('[conteúdo] usando conteúdo padrão:', err.message));

    return () => {
      cancelled = true;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
