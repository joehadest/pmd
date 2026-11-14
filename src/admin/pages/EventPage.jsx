import { useEffect, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { toast } from 'sonner';
import SettingsCard from '../components/SettingsCard';
import { Card, ErrorBox, PageHeader, Spinner, Switch } from '../components/ui';
import { useSettings } from '../hooks/useCollection';
import { SECTION_KEYS, defaultSections } from '../../data/site';

/** Liga/desliga seções inteiras do site. */
export function SectionsCard({ settings, compact }) {
  const current = { ...defaultSections, ...(settings.data?.sections || {}) };
  const [values, setValues] = useState(current);
  const [saving, setSaving] = useState(null);

  useEffect(() => setValues({ ...defaultSections, ...(settings.data?.sections || {}) }), [settings.data]);

  const toggle = async (key, on) => {
    const next = { ...values, [key]: on };
    setValues(next);
    setSaving(key);
    try {
      await settings.save({ sections: next });
      toast.success(`${SECTION_KEYS[key]}: ${on ? 'visível' : 'oculta'} no site.`);
    } catch (err) {
      setValues(values);
      toast.error(err.message);
    } finally {
      setSaving(null);
    }
  };

  return (
    <Card
      title="Seções do site"
      description={compact ? undefined : 'Esconda uma seção inteira sem apagar o conteúdo dela. Salva na hora.'}
    >
      <ul className="a-sections" role="list">
        {Object.entries(SECTION_KEYS).map(([key, label]) => (
          <li key={key} data-off={!values[key] || undefined}>
            <span className="a-sections__name">{label}</span>
            <span className="a-sections__status">{values[key] ? 'Visível' : 'Oculta'}</span>
            <Switch
              checked={values[key]}
              onChange={(on) => toggle(key, on)}
              ariaLabel={`${label}: visível no site`}
              disabled={saving === key}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function EventPage() {
  const settings = useSettings();

  return (
    <div className="a-page">
      <PageHeader
        icon={FiCalendar}
        title="Evento e textos"
        description="Informações gerais, textos do topo, contatos e quais seções aparecem no site."
      />

      {settings.loading ? (
        <Spinner label="Carregando…" />
      ) : settings.error ? (
        <ErrorBox error={settings.error} />
      ) : (
        <div className="a-columns">
          <div className="a-stack">
            <SettingsCard
              settings={settings}
              title="Evento"
              description="Usado no topo, nas faixas do vídeo e no rodapé."
              columns={6}
              fields={[
                { name: 'event_name', label: 'Nome do evento', required: true, span: 3 },
                { name: 'edition', label: 'Edição', placeholder: 'Ex.: Alto Folia 2026', span: 3 },
                { name: 'organizer', label: 'Realização', placeholder: 'Ex.: Bloco Pode Mangar Deu', full: true },
                { name: 'date_label', label: 'Data por extenso', placeholder: 'Ex.: 28 e 29 de março', span: 3 },
                { name: 'date_days', label: 'Dias da semana', placeholder: 'Ex.: Sábado e Domingo', span: 3 },
                { name: 'date_short', label: 'Data curta', placeholder: 'Ex.: 28 & 29/03', span: 2 },
                { name: 'city', label: 'Cidade', span: 3 },
                { name: 'state', label: 'UF', placeholder: 'RN', span: 1 },
              ]}
            />

            <SettingsCard
              settings={settings}
              title="Topo do site"
              description="Título grande e texto de apresentação."
              fields={[
                { name: 'hero_title_1', label: 'Título — 1ª linha', placeholder: 'Camarote' },
                { name: 'hero_title_2', label: 'Título — 2ª linha (dourada)', placeholder: 'PMD 2026' },
                { name: 'hero_lead', label: 'Texto de apresentação', type: 'textarea', rows: 3, full: true },
              ]}
            />

            <SettingsCard
              settings={settings}
              title="Vídeo"
              description="Vídeo da faixa de ponta a ponta. Toca mudo e em loop."
              columns={1}
              fields={[{ name: 'video_url', label: 'Vídeo', hideLabel: true, type: 'video', folder: 'video' }]}
            />
          </div>

          <div className="a-stack">
            <SectionsCard settings={settings} />

            <SettingsCard
              settings={settings}
              title="Contatos e redes"
              columns={1}
              fields={[
                { name: 'instagram_handle', label: 'Instagram (@)', placeholder: '@podemangardeu' },
                { name: 'instagram_url', label: 'Link do Instagram', type: 'url' },
                {
                  name: 'commercial_phone',
                  label: 'WhatsApp comercial',
                  type: 'tel',
                  placeholder: '5584999999999',
                  hint: 'Com DDI e DDD, só números. Usado no botão "Falar com o comercial".',
                },
                { name: 'commercial_message', label: 'Mensagem pronta do WhatsApp', type: 'textarea', rows: 2 },
              ]}
            />

            <SettingsCard
              settings={settings}
              title="Pousada Central"
              columns={1}
              fields={[
                { name: 'pousada_phone', label: 'Telefone/WhatsApp', type: 'tel', placeholder: '558435232356', hint: 'Só números, com DDI e DDD.' },
                { name: 'pousada_phone_display', label: 'Telefone como aparece no site', placeholder: '(84) 3523-2356' },
              ]}
            />

            <SettingsCard
              settings={settings}
              title="Rodapé"
              columns={1}
              fields={[{ name: 'footer_about', label: 'Texto sobre o bloco', type: 'textarea', rows: 3 }]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
