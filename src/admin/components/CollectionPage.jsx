import { useId, useMemo, useRef, useState } from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiEdit2, FiMenu, FiPlus, FiSearch, FiTrash2, FiUploadCloud } from 'react-icons/fi';
import { toast } from 'sonner';
import { useCollection } from '../hooks/useCollection';
import { removeImage, uploadImage } from '../lib/media';
import { Drawer, EmptyState, ErrorBox, Field, FieldInput, PageHeader, Spinner, Switch, useConfirm } from './ui';

const SYSTEM_KEYS = ['id', 'position', 'created_at', 'updated_at'];

/** Item arrastável (linha ou cartão). */
function SortableItem({ item, layout, describe, disabled, onEdit, onDelete, onToggle }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled,
  });
  const info = describe(item);
  const style = { transform: CSS.Transform.toString(transform), transition };

  const handle = (
    <button
      type="button"
      ref={setActivatorNodeRef}
      className="a-handle"
      aria-label={`Arrastar ${info.title} para reordenar`}
      disabled={disabled}
      {...attributes}
      {...listeners}
    >
      <FiMenu />
    </button>
  );

  const actions = (
    <div className="a-item__actions">
      <Switch checked={item.active} onChange={(v) => onToggle(item, v)} />
      <button type="button" className="a-btn a-btn--icon a-btn--ghost" onClick={() => onEdit(item)} aria-label={`Editar ${info.title}`}>
        <FiEdit2 />
      </button>
      <button
        type="button"
        className="a-btn a-btn--icon a-btn--ghost a-btn--danger-text"
        onClick={() => onDelete(item)}
        aria-label={`Excluir ${info.title}`}
      >
        <FiTrash2 />
      </button>
    </div>
  );

  if (layout === 'grid') {
    return (
      <li
        ref={setNodeRef}
        style={{ ...style, '--aspect': info.aspect || '16 / 10' }}
        className="a-tile"
        data-dragging={isDragging || undefined}
        data-inactive={!item.active || undefined}
      >
        <button type="button" className="a-tile__media" data-contain={info.contain || undefined} onClick={() => onEdit(item)}>
          {info.image ? <img src={info.image} alt="" loading="lazy" style={info.imageStyle} /> : <span>Sem imagem</span>}
        </button>
        {handle}
        {!item.active && <span className="a-badge a-tile__badge">Oculto</span>}
        <div className="a-tile__body">
          <div className="a-tile__text">
            <strong>{info.title}</strong>
            {info.subtitle && <small>{info.subtitle}</small>}
          </div>
          {actions}
        </div>
      </li>
    );
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="a-row"
      data-dragging={isDragging || undefined}
      data-inactive={!item.active || undefined}
    >
      {handle}
      {info.image !== undefined && (
        <span className="a-row__thumb" data-contain={info.contain || undefined}>
          {info.image && <img src={info.image} alt="" loading="lazy" />}
        </span>
      )}
      <button type="button" className="a-row__text" onClick={() => onEdit(item)}>
        <strong>{info.title}</strong>
        {info.subtitle && <small>{info.subtitle}</small>}
      </button>
      {info.meta && <div className="a-row__meta">{info.meta}</div>}
      {!item.active && <span className="a-badge">Oculto</span>}
      {actions}
    </li>
  );
}

/**
 * Página completa de gestão de uma lista do site, configurada por props:
 * campos do formulário, como descrever cada item e o layout (lista ou grade).
 */
export default function CollectionPage({
  table,
  icon,
  title,
  description,
  singular,
  fields,
  defaults,
  describe,
  layout = 'list',
  searchKeys = ['name'],
  imageKey,
  bulkUpload,
  before,
  emptyText,
}) {
  const { items, loading, error, create, update, remove, reorder } = useCollection(table);
  const confirm = useConfirm();
  const formId = useId();
  const bulkInput = useRef(null);
  const uploads = useRef([]);
  const [editing, setEditing] = useState(null); // { item?: row, values }
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => searchKeys.some((k) => String(i[k] ?? '').toLowerCase().includes(q)));
  }, [items, query, searchKeys]);

  const activeCount = items.filter((i) => i.active).length;

  /* ---------- Formulário ---------- */
  const openCreate = () => {
    uploads.current = [];
    setEditing({ item: null, values: { active: true, ...defaults } });
  };

  const openEdit = (item) => {
    uploads.current = [];
    setEditing({ item, values: { ...item } });
  };

  const setValue = (name, value) => setEditing((e) => ({ ...e, values: { ...e.values, [name]: value } }));

  const cancel = async () => {
    // Apaga imagens enviadas nesta edição que não foram salvas
    await Promise.all(uploads.current.map(removeImage));
    uploads.current = [];
    setEditing(null);
  };

  const save = async (e) => {
    e.preventDefault();
    const missing = fields.find((f) => f.required && (editing.values[f.name] == null || editing.values[f.name] === ''));
    if (missing) {
      toast.error(`Preencha o campo "${missing.label}".`);
      return;
    }

    const values = Object.fromEntries(Object.entries(editing.values).filter(([k]) => !SYSTEM_KEYS.includes(k)));
    setSaving(true);
    try {
      if (editing.item) await update(editing.item.id, values);
      else await create(values);

      // Limpeza de arquivos: o antigo (se trocado) e os enviados mas descartados
      const finalImage = imageKey ? values[imageKey] : null;
      const oldImage = imageKey && editing.item ? editing.item[imageKey] : null;
      const toRemove = uploads.current.filter((u) => u !== finalImage);
      if (oldImage && oldImage !== finalImage) toRemove.push(oldImage);
      await Promise.all(toRemove.map(removeImage));
      uploads.current = [];

      toast.success(editing.item ? 'Alterações salvas.' : `${capitalize(singular)} adicionad${gender(singular)}.`);
      setEditing(null);
    } catch (err) {
      toast.error(`Não foi possível salvar: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  /* ---------- Ações da lista ---------- */
  const handleDelete = async (item) => {
    const label = describe(item).title;
    const ok = await confirm({
      title: `Excluir ${singular}?`,
      message: `"${label}" será removid${gender(singular)} do site. Essa ação não pode ser desfeita.`,
      confirmLabel: 'Excluir',
      danger: true,
    });
    if (!ok) return;
    try {
      await remove(item.id);
      if (imageKey) await removeImage(item[imageKey]);
      toast.success(`${capitalize(singular)} excluíd${gender(singular)}.`);
    } catch (err) {
      toast.error(`Não foi possível excluir: ${err.message}`);
    }
  };

  const handleToggle = async (item, active) => {
    try {
      await update(item.id, { active });
      toast.success(active ? 'Visível no site.' : 'Oculto do site.');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const from = items.findIndex((i) => i.id === active.id);
    const to = items.findIndex((i) => i.id === over.id);
    try {
      await reorder(arrayMove(items, from, to));
      toast.success('Ordem atualizada.');
    } catch (err) {
      toast.error(`Não foi possível reordenar: ${err.message}`);
    }
  };

  const handleBulk = async (files) => {
    const list = Array.from(files || []);
    if (!list.length) return;
    const id = toast.loading(`Enviando 0 de ${list.length}…`);
    let done = 0;
    try {
      for (const file of list) {
        const url = await uploadImage(file, { folder: bulkUpload.folder, preset: bulkUpload.preset });
        await create({ active: true, ...defaults, ...bulkUpload.makeItem(url, file) });
        done += 1;
        toast.loading(`Enviando ${done} de ${list.length}…`, { id });
      }
      toast.success(`${done} ${done === 1 ? 'imagem enviada' : 'imagens enviadas'}.`, { id });
    } catch (err) {
      toast.error(`Parou em ${done} de ${list.length}: ${err.message}`, { id });
    }
  };

  const strategy = layout === 'grid' ? rectSortingStrategy : verticalListSortingStrategy;

  return (
    <div className="a-page">
      <PageHeader
        icon={icon}
        title={title}
        description={description}
        actions={
          <>
            {bulkUpload && (
              <>
                <button type="button" className="a-btn a-btn--ghost" onClick={() => bulkInput.current?.click()}>
                  <FiUploadCloud /> Enviar várias
                </button>
                <input
                  ref={bulkInput}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => {
                    handleBulk(e.target.files);
                    e.target.value = '';
                  }}
                />
              </>
            )}
            <button type="button" className="a-btn a-btn--primary" onClick={openCreate}>
              <FiPlus /> Adicionar {singular}
            </button>
          </>
        }
      />

      {before}

      <ErrorBox error={error} />

      <div className="a-toolbar">
        <div className="a-search">
          <FiSearch aria-hidden="true" />
          <input
            className="a-input"
            type="search"
            placeholder="Buscar…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={`Buscar em ${title}`}
          />
        </div>
        <p className="a-toolbar__info">
          {items.length} no total · <strong>{activeCount}</strong> visíveis no site
          {!query && items.length > 1 && <span className="a-toolbar__tip"> · arraste ☰ para reordenar</span>}
        </p>
      </div>

      {loading ? (
        <div className="a-loading">
          <Spinner label="Carregando…" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={icon}
          title={`Nenhum${gender(singular) === 'a' ? 'a' : ''} ${singular} ainda`}
          text={emptyText}
          action={
            <button type="button" className="a-btn a-btn--primary" onClick={openCreate}>
              <FiPlus /> Adicionar {singular}
            </button>
          }
        />
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filtered.map((i) => i.id)} strategy={strategy}>
            <ul className={layout === 'grid' ? 'a-tiles' : 'a-rows'} role="list">
              {filtered.map((item) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  layout={layout}
                  describe={describe}
                  disabled={!!query}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      <Drawer
        open={!!editing}
        title={editing?.item ? `Editar ${singular}` : `Nov${gender(singular)} ${singular}`}
        subtitle={editing?.item ? describe(editing.item).title : 'Preencha os campos e salve.'}
        onClose={cancel}
        footer={
          <>
            <button type="button" className="a-btn a-btn--ghost" onClick={cancel} disabled={saving}>
              Cancelar
            </button>
            <button type="submit" form={formId} className="a-btn a-btn--primary" disabled={saving}>
              {saving ? <Spinner /> : null} {editing?.item ? 'Salvar alterações' : 'Adicionar'}
            </button>
          </>
        }
      >
        {editing && (
          <form id={formId} className="a-form" onSubmit={save} noValidate>
            {fields.map((field) => {
              const id = `${formId}-${field.name}`;
              return (
                <Field key={field.name} label={field.label} hint={field.hint} required={field.required} htmlFor={id} full={field.full}>
                  <FieldInput
                    id={id}
                    field={typeof field.options === 'function' ? { ...field, options: field.options(items) } : field}
                    value={editing.values[field.name]}
                    onChange={(v) => setValue(field.name, v)}
                    onUploaded={(url) => uploads.current.push(url)}
                  />
                </Field>
              );
            })}
            {field_preview(editing, describe)}
            <Field full>
              <Switch
                checked={editing.values.active}
                onChange={(v) => setValue('active', v)}
                label="Visível no site"
                description="Desligue para esconder sem excluir."
              />
            </Field>
          </form>
        )}
      </Drawer>
    </div>
  );
}

/** Prévia ao vivo opcional (ex.: logo com escala). */
function field_preview(editing, describe) {
  const info = describe(editing.values);
  return info.livePreview ? <div className="a-field a-field--full">{info.livePreview}</div> : null;
}

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
// Concordância simples pela primeira palavra ("ponto de venda" → o, "foto" → a)
const FEMININE = ['atração', 'foto', 'loja', 'opção', 'bebida'];
const gender = (word) => {
  const first = word.split(' ')[0];
  return FEMININE.includes(first) || first.endsWith('a') ? 'a' : 'o';
};
