import { useEffect, useState } from 'react';
import { FiActivity, FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';
import { Card, EmptyState, ErrorBox, PageHeader, Spinner } from '../components/ui';

export const TABLE_LABELS = {
  site_settings: 'Configurações',
  artists: 'Line-up',
  openbar_items: 'Open Bar',
  structure_photos: 'Estrutura',
  ticket_types: 'Ingressos',
  sales_points: 'Pontos de venda',
  sponsors: 'Patrocinadores',
};

const ACTIONS = {
  insert: { icon: FiPlus, verb: 'adicionou', tone: 'mint' },
  update: { icon: FiEdit2, verb: 'editou', tone: 'sky' },
  delete: { icon: FiTrash2, verb: 'excluiu', tone: 'red' },
};

/** Quem fez a alteração: apelido do perfil → parte do e-mail → "Sistema". */
const actor = (r) => r.actor_name || r.actor_email?.split('@')[0] || 'Sistema';

const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
export function timeAgo(date) {
  const diff = (new Date(date) - Date.now()) / 1000;
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unit, secs] of units) if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
  return 'agora mesmo';
}

/** Lista do log de atividades (usada no painel inicial e na página completa). */
export function ActivityList({ limit = 50, table = '' }) {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let query = supabase.from('activity_log').select('*').order('created_at', { ascending: false }).limit(limit);
    if (table) query = query.eq('table_name', table);
    query.then(({ data, error: err }) => (err ? setError(err) : setRows(data)));
  }, [limit, table]);

  if (error) return <ErrorBox error={error} />;
  if (!rows) return <Spinner label="Carregando…" />;
  if (!rows.length) return <EmptyState icon={FiActivity} title="Nenhuma alteração ainda" text="As edições feitas no painel aparecem aqui." />;

  return (
    <ul className="a-activity" role="list">
      {rows.map((r) => {
        const a = ACTIONS[r.action];
        return (
          <li key={r.id}>
            <span className={`a-activity__icon a-tone--${a.tone}`} aria-hidden="true">
              <a.icon />
            </span>
            <div>
              {r.table_name === 'site_settings' ? (
                <p>
                  <strong>{actor(r)}</strong> atualizou as{' '}
                  <strong>configurações do site</strong>
                </p>
              ) : (
                <p>
                  <strong>{actor(r)}</strong> {a.verb}{' '}
                  {r.label ? <em>“{r.label}”</em> : 'um item'} em <strong>{TABLE_LABELS[r.table_name] || r.table_name}</strong>
                </p>
              )}
              <time dateTime={r.created_at} title={new Date(r.created_at).toLocaleString('pt-BR')}>
                {timeAgo(r.created_at)}
              </time>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function ActivityPage() {
  const [table, setTable] = useState('');
  return (
    <div className="a-page">
      <PageHeader icon={FiActivity} title="Atividade" description="Histórico das últimas 100 alterações feitas no painel." />
      <Card
        actions={
          <select className="a-input a-select" value={table} onChange={(e) => setTable(e.target.value)} aria-label="Filtrar por seção">
            <option value="">Todas as seções</option>
            {Object.entries(TABLE_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        }
        title="Alterações"
      >
        <ActivityList limit={100} table={table} />
      </Card>
    </div>
  );
}
