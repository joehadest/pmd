import { useEffect, useId, useMemo, useState } from 'react';
import { FiCheck, FiRotateCcw } from 'react-icons/fi';
import { toast } from 'sonner';
import { removeImage } from '../lib/media';
import { Card, Field, FieldInput, Spinner } from './ui';

/**
 * Cartão que edita um grupo de campos da tabela site_settings.
 * Cada cartão salva só os próprios campos, com botão que aparece ao alterar algo.
 */
export default function SettingsCard({ settings, title, description, fields, columns = 2 }) {
  const formId = useId();
  const initial = useMemo(
    () => Object.fromEntries(fields.map((f) => [f.name, settings.data?.[f.name] ?? (f.type === 'tags' ? [] : '')])),
    [settings.data, fields],
  );
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);

  useEffect(() => setValues(initial), [initial]);

  const dirty = fields.some((f) => JSON.stringify(values[f.name]) !== JSON.stringify(initial[f.name]));

  const save = async (e) => {
    e.preventDefault();
    const missing = fields.find((f) => f.required && !values[f.name]);
    if (missing) {
      toast.error(`Preencha o campo "${missing.label}".`);
      return;
    }
    setSaving(true);
    try {
      await settings.save(values);
      // Imagens trocadas: apaga a antiga do armazenamento
      await Promise.all(
        fields.filter((f) => f.type === 'image' && initial[f.name] !== values[f.name]).map((f) => removeImage(initial[f.name])),
      );
      toast.success(`${title}: alterações salvas.`);
    } catch (err) {
      toast.error(`Não foi possível salvar: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title={title} description={description}>
      <form id={formId} className="a-form" style={{ '--cols': columns }} onSubmit={save} noValidate>
        {fields.map((field) => {
          const id = `${formId}-${field.name}`;
          return (
            <Field key={field.name} label={field.label} hint={field.hint} required={field.required} htmlFor={id} full={field.full}>
              <FieldInput
                id={id}
                field={field}
                value={values[field.name]}
                onChange={(v) => setValues((prev) => ({ ...prev, [field.name]: v }))}
              />
            </Field>
          );
        })}
      </form>
      <footer className="a-card__foot" data-dirty={dirty || undefined}>
        <span className="a-card__status">{dirty ? 'Alterações não salvas' : 'Tudo salvo'}</span>
        <button type="button" className="a-btn a-btn--ghost" onClick={() => setValues(initial)} disabled={!dirty || saving}>
          <FiRotateCcw /> Desfazer
        </button>
        <button type="submit" form={formId} className="a-btn a-btn--primary" disabled={!dirty || saving}>
          {saving ? <Spinner /> : <FiCheck />} Salvar
        </button>
      </footer>
    </Card>
  );
}
