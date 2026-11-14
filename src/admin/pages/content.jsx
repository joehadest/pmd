import { FiCoffee, FiImage, FiMapPin, FiMusic, FiStar, FiTag } from 'react-icons/fi';
import CollectionPage from '../components/CollectionPage';
import SettingsCard from '../components/SettingsCard';
import { ErrorBox, Spinner } from '../components/ui';
import { useSettings } from '../hooks/useCollection';
import { formatBRL } from '../../data/site';

/* ------------------------------------------------------------- Line-up -- */

export function LineupPage() {
  return (
    <CollectionPage
      table="artists"
      icon={FiMusic}
      title="Line-up"
      description="Atrações exibidas na seção Line-up, na ordem desta lista."
      singular="atração"
      layout="grid"
      imageKey="image_url"
      defaults={{ name: '', image_url: '', time_label: '', confirmed: true }}
      emptyText="Adicione a primeira atração com o cartaz de divulgação."
      fields={[
        { name: 'image_url', label: 'Cartaz', type: 'image', preset: 'poster', folder: 'lineup', aspect: '4 / 5', full: true },
        { name: 'name', label: 'Nome', required: true, placeholder: 'Ex.: Banda Pretta' },
        { name: 'time_label', label: 'Dia e horário', placeholder: 'Ex.: Sábado · 22h', hint: 'Deixe vazio enquanto não houver horário.' },
        {
          name: 'confirmed',
          label: 'Status',
          type: 'switch',
          switchLabel: 'Confirmado',
          switchHint: 'Desligado mostra o selo "Em breve".',
          full: true,
        },
      ]}
      describe={(a) => ({
        title: a.name || 'Sem nome',
        subtitle: [a.confirmed ? 'Confirmado' : 'Em breve', a.time_label].filter(Boolean).join(' · '),
        image: a.image_url,
        aspect: '4 / 5',
      })}
    />
  );
}

/* ------------------------------------------------------------ Open Bar -- */

export function OpenBarPage() {
  const settings = useSettings();
  return (
    <CollectionPage
      table="openbar_items"
      icon={FiCoffee}
      title="Open Bar"
      description="Cartaz e lista de bebidas liberadas."
      singular="bebida"
      searchKeys={['title', 'detail']}
      defaults={{ title: '', detail: '' }}
      emptyText="Liste o que estará liberado no open bar."
      before={
        <SettingsBlock settings={settings}>
          <SettingsCard
            settings={settings}
            title="Cartaz do Open Bar"
            description="Imagem vertical exibida ao lado da lista e ampliada ao clicar."
            columns={1}
            fields={[
              { name: 'openbar_poster_url', label: 'Cartaz', type: 'image', preset: 'flyer', folder: 'openbar', aspect: '9 / 16', contain: true },
            ]}
          />
        </SettingsBlock>
      }
      fields={[
        { name: 'title', label: 'Bebida', required: true, placeholder: 'Ex.: Vodka Smirnoff', full: true },
        { name: 'detail', label: 'Detalhe', placeholder: 'Ex.: 600 litros', full: true },
      ]}
      describe={(o) => ({ title: o.title || 'Sem nome', subtitle: o.detail })}
    />
  );
}

/* ----------------------------------------------------------- Estrutura -- */

export function StructurePage() {
  return (
    <CollectionPage
      table="structure_photos"
      icon={FiImage}
      title="Estrutura"
      description="Galeria de fotos do camarote. As 8 primeiras formam o mosaico do site."
      singular="foto"
      layout="grid"
      imageKey="image_url"
      searchKeys={['alt']}
      defaults={{ image_url: '', alt: '' }}
      bulkUpload={{
        folder: 'estrutura',
        preset: 'photo',
        makeItem: (url, file) => ({ image_url: url, alt: `Estrutura do Camarote PMD — ${file.name.replace(/\.[^.]+$/, '')}` }),
      }}
      emptyText="Envie fotos ou renders da estrutura — dá para enviar várias de uma vez."
      fields={[
        { name: 'image_url', label: 'Foto', type: 'image', preset: 'photo', folder: 'estrutura', required: true, full: true },
        {
          name: 'alt',
          label: 'Descrição da foto',
          placeholder: 'Ex.: Área VIP com vista para os trios',
          hint: 'Usada por leitores de tela e pelo Google.',
          full: true,
        },
      ]}
      describe={(p) => ({ title: p.alt || 'Foto sem descrição', image: p.image_url })}
    />
  );
}

/* ----------------------------------------------------------- Ingressos -- */

export function TicketsPage() {
  const settings = useSettings();
  return (
    <CollectionPage
      table="ticket_types"
      icon={FiTag}
      title="Ingressos"
      description="Lote atual, link de vendas e tipos de ingresso."
      singular="ingresso"
      defaults={{ name: '', people_label: '', price: 0, per_person: null, featured: false, perks: [], purchase_url: '' }}
      emptyText="Cadastre os tipos de ingresso à venda."
      before={
        <SettingsBlock settings={settings}>
          <SettingsCard
            settings={settings}
            title="Lote e vendas"
            description="Aparece no topo e no rodapé da seção Ingressos."
            fields={[
              { name: 'batch_label', label: 'Lote atual', placeholder: 'Ex.: 2º lote liberado' },
              { name: 'batch_validity', label: 'Validade do lote', placeholder: 'Ex.: Válido até 05/03 ou enquanto durar.' },
              { name: 'tickets_url', label: 'Link de vendas online', type: 'url', placeholder: 'https://…', required: true },
              { name: 'tickets_url_label', label: 'Texto do link', placeholder: 'outgo.com.br/camarotepmd2026' },
              { name: 'tickets_subtitle', label: 'Texto de apoio', type: 'textarea', rows: 2, full: true },
            ]}
          />
        </SettingsBlock>
      }
      fields={[
        { name: 'name', label: 'Nome', required: true, placeholder: 'Ex.: Casadinha' },
        { name: 'people_label', label: 'Para quem', placeholder: 'Ex.: 2 pessoas · Sábado e Domingo' },
        { name: 'price', label: 'Preço', type: 'money', min: 0, required: true },
        { name: 'per_person', label: 'Preço por pessoa', type: 'money', min: 0, hint: 'Opcional — destaca a economia.' },
        { name: 'perks', label: 'O que está incluído', type: 'tags', placeholder: 'Ex.: 2 dias de Open Bar', full: true },
        {
          name: 'purchase_url',
          label: 'Link de compra próprio',
          type: 'url',
          placeholder: 'Deixe vazio para usar o link de vendas geral',
          full: true,
        },
        {
          name: 'featured',
          label: 'Destaque',
          type: 'switch',
          switchLabel: 'Mais vantajoso',
          switchHint: 'Borda dourada e selo de destaque no site.',
          full: true,
        },
      ]}
      describe={(t) => ({
        title: t.name || 'Sem nome',
        subtitle: t.people_label,
        meta: (
          <>
            {t.featured && <span className="a-badge a-badge--gold">Destaque</span>}
            <strong className="a-price">{formatBRL(t.price || 0)}</strong>
          </>
        ),
      })}
    />
  );
}

/* ---------------------------------------------------- Pontos de venda -- */

export function SalesPointsPage() {
  return (
    <CollectionPage
      table="sales_points"
      icon={FiMapPin}
      title="Pontos de venda"
      description="Lojas físicas. No site, ficam agrupadas por cidade."
      singular="ponto de venda"
      searchKeys={['name', 'city', 'address']}
      defaults={{ city: '', name: '', address: '', hours: '' }}
      emptyText="Cadastre as lojas que vendem ingressos."
      fields={[
        { name: 'name', label: 'Loja', required: true, placeholder: 'Ex.: Loja PMD' },
        {
          name: 'city',
          label: 'Cidade',
          required: true,
          placeholder: 'Ex.: Macau',
          options: (items) => [...new Set(items.map((i) => i.city))],
        },
        { name: 'address', label: 'Endereço', placeholder: 'Ex.: Av. Angelo Varela, 815', full: true, hint: 'Usado no botão "Como chegar".' },
        { name: 'hours', label: 'Horário', placeholder: 'Ex.: 9h às 12h · 15h às 18h', full: true },
      ]}
      describe={(p) => ({
        title: p.name || 'Sem nome',
        subtitle: [p.address, p.hours].filter(Boolean).join(' · '),
        meta: p.city && <span className="a-badge">{p.city}</span>,
      })}
    />
  );
}

/* ------------------------------------------------------ Patrocinadores -- */

export function SponsorsPage() {
  return (
    <CollectionPage
      table="sponsors"
      icon={FiStar}
      title="Patrocinadores"
      description="Logos do carrossel, da grade de patrocinadores e do rodapé."
      singular="patrocinador"
      layout="grid"
      imageKey="logo_url"
      defaults={{ name: '', logo_url: '', scale: 1, website_url: '' }}
      emptyText="Envie os logos (de preferência brancos, com fundo transparente)."
      fields={[
        {
          name: 'logo_url',
          label: 'Logo',
          type: 'image',
          preset: 'logo',
          folder: 'patrocinadores',
          aspect: '16 / 7',
          contain: true,
          required: true,
          full: true,
        },
        { name: 'name', label: 'Nome', required: true, placeholder: 'Ex.: Supercola' },
        { name: 'website_url', label: 'Site ou Instagram', type: 'url', placeholder: 'https://… (opcional)' },
        {
          name: 'scale',
          label: 'Tamanho do logo',
          type: 'range',
          min: 0.5,
          max: 2.5,
          step: 0.05,
          format: (v) => `${Math.round((v || 1) * 100)}%`,
          hint: 'Aumente logos quadrados ou pequenos para equilibrar com os horizontais.',
          full: true,
        },
      ]}
      describe={(s) => ({
        title: s.name || 'Sem nome',
        subtitle: `Tamanho ${Math.round((s.scale || 1) * 100)}%`,
        image: s.logo_url,
        aspect: '16 / 9',
        contain: true,
        imageStyle: { maxHeight: `${Math.min(90, 40 * (s.scale || 1))}%` },
        livePreview: s.logo_url && (
          <div className="a-logo-preview">
            <span className="a-label">Prévia no site</span>
            <div>
              <img src={s.logo_url} alt="" style={{ height: `${44 * (s.scale || 1)}px` }} />
            </div>
          </div>
        ),
      })}
    />
  );
}

/* --------------------------------------------------------- Auxiliares -- */

function SettingsBlock({ settings, children }) {
  if (settings.loading) return <Spinner label="Carregando…" />;
  if (settings.error) return <ErrorBox error={settings.error} />;
  return <div className="a-stack">{children}</div>;
}
