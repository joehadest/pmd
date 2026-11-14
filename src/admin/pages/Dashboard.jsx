import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  FiActivity,
  FiArrowRight,
  FiCalendar,
  FiCoffee,
  FiExternalLink,
  FiGrid,
  FiImage,
  FiMapPin,
  FiMusic,
  FiPlus,
  FiStar,
  FiTag,
} from 'react-icons/fi';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../auth';
import { useSettings } from '../hooks/useCollection';
import { Card, ErrorBox, PageHeader, Spinner } from '../components/ui';
import { SectionsCard } from './EventPage';
import { ActivityList } from './ActivityPage';

const STATS = [
  { table: 'artists', label: 'Atrações', icon: FiMusic, to: 'lineup' },
  { table: 'structure_photos', label: 'Fotos da estrutura', icon: FiImage, to: 'estrutura' },
  { table: 'ticket_types', label: 'Tipos de ingresso', icon: FiTag, to: 'ingressos' },
  { table: 'openbar_items', label: 'Bebidas no open bar', icon: FiCoffee, to: 'open-bar' },
  { table: 'sales_points', label: 'Pontos de venda', icon: FiMapPin, to: 'pontos-de-venda' },
  { table: 'sponsors', label: 'Patrocinadores', icon: FiStar, to: 'patrocinadores' },
];

function useStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    Promise.all(
      STATS.map(async ({ table }) => {
        const { data, error } = await supabase.from(table).select('active');
        if (error) throw error;
        return [table, { total: data.length, active: data.filter((r) => r.active).length }];
      }),
    )
      .then((rows) => setStats(Object.fromEntries(rows)))
      .catch(() => setStats({}));
  }, []);
  return stats;
}

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
};

export default function Dashboard() {
  const { user } = useAuth();
  const settings = useSettings();
  const stats = useStats();
  const s = settings.data;
  const name = user?.email?.split('@')[0];

  return (
    <div className="a-page">
      <PageHeader
        icon={FiGrid}
        title={`${greeting()}${name ? `, ${name}` : ''}!`}
        description="Resumo do conteúdo publicado no site do Camarote PMD."
        actions={
          <a className="a-btn a-btn--ghost" href="/" target="_blank" rel="noopener noreferrer">
            <FiExternalLink /> Abrir site
          </a>
        }
      />

      <ul className="a-stats" role="list">
        {STATS.map(({ table, label, icon: Icon, to }) => {
          const st = stats?.[table];
          return (
            <li key={table}>
              <Link to={to} className="a-stat">
                <span className="a-stat__icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="a-stat__value">{st ? st.active : stats ? '—' : <Spinner />}</span>
                <span className="a-stat__label">{label}</span>
                {st && st.total !== st.active && <span className="a-stat__extra">+{st.total - st.active} oculto(s)</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="a-columns">
        <div className="a-stack">
          <Card
            title="Evento"
            actions={
              <Link to="evento" className="a-btn a-btn--ghost a-btn--sm">
                Editar <FiArrowRight />
              </Link>
            }
          >
            {settings.loading ? (
              <Spinner label="Carregando…" />
            ) : settings.error ? (
              <ErrorBox error={settings.error} />
            ) : (
              <dl className="a-summary">
                <div>
                  <dt>Evento</dt>
                  <dd>{s.event_name}</dd>
                </div>
                <div>
                  <dt>Data</dt>
                  <dd>
                    <FiCalendar aria-hidden="true" /> {s.date_label} · {s.date_days}
                  </dd>
                </div>
                <div>
                  <dt>Local</dt>
                  <dd>
                    {s.city}/{s.state}
                  </dd>
                </div>
                <div>
                  <dt>Lote</dt>
                  <dd>
                    {s.batch_label ? <span className="a-badge a-badge--mint">{s.batch_label}</span> : '—'}
                    {s.batch_validity && <small>{s.batch_validity}</small>}
                  </dd>
                </div>
                <div>
                  <dt>Vendas online</dt>
                  <dd>
                    {s.tickets_url ? (
                      <a href={s.tickets_url} target="_blank" rel="noopener noreferrer">
                        {s.tickets_url_label || s.tickets_url} <FiExternalLink aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="a-warning">Sem link de vendas</span>
                    )}
                  </dd>
                </div>
              </dl>
            )}
          </Card>

          <Card title="Atalhos">
            <div className="a-quick">
              <Link to="lineup" className="a-quick__item">
                <FiPlus /> Nova atração
              </Link>
              <Link to="estrutura" className="a-quick__item">
                <FiImage /> Enviar fotos
              </Link>
              <Link to="ingressos" className="a-quick__item">
                <FiTag /> Mudar lote
              </Link>
              <Link to="patrocinadores" className="a-quick__item">
                <FiStar /> Novo patrocinador
              </Link>
            </div>
          </Card>
        </div>

        <div className="a-stack">
          {s && <SectionsCard settings={settings} compact />}
          <Card
            title="Últimas alterações"
            actions={
              <Link to="atividade" className="a-btn a-btn--ghost a-btn--sm">
                <FiActivity /> Ver tudo
              </Link>
            }
          >
            <ActivityList limit={6} />
          </Card>
        </div>
      </div>
    </div>
  );
}
