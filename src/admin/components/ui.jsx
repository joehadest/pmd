import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import { FiImage, FiPlus, FiTrash2, FiUploadCloud, FiX } from 'react-icons/fi';
import { toast } from 'sonner';
import { uploadImage } from '../lib/media';

/* ---------------------------------------------------------------- Layout -- */

export function PageHeader({ icon: Icon, title, description, actions }) {
  return (
    <header className="a-page-head">
      <div className="a-page-head__text">
        {Icon && (
          <span className="a-page-head__icon" aria-hidden="true">
            <Icon />
          </span>
        )}
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
      </div>
      {actions && <div className="a-page-head__actions">{actions}</div>}
    </header>
  );
}

export function Card({ title, description, actions, children, className = '' }) {
  return (
    <section className={`a-card ${className}`}>
      {(title || actions) && (
        <header className="a-card__head">
          <div>
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
          </div>
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}

export const Spinner = ({ label }) => (
  <span className="a-spinner" role="status">
    <span aria-hidden="true" />
    {label && <span>{label}</span>}
  </span>
);

export function EmptyState({ icon: Icon = FiImage, title, text, action }) {
  return (
    <div className="a-empty">
      <span className="a-empty__icon" aria-hidden="true">
        <Icon />
      </span>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {action}
    </div>
  );
}

export function ErrorBox({ error }) {
  if (!error) return null;
  return (
    <div className="a-alert a-alert--error" role="alert">
      <strong>Não foi possível carregar.</strong> {error.message}
    </div>
  );
}

/* ---------------------------------------------------------------- Campos -- */

export function Field({ label, hint, required, children, htmlFor, full }) {
  return (
    <div className={`a-field${full ? ' a-field--full' : ''}`}>
      {label && (
        <label className="a-label" htmlFor={htmlFor}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}
      {children}
      {hint && <small className="a-hint">{hint}</small>}
    </div>
  );
}

export function Switch({ checked, onChange, label, description, disabled }) {
  const id = useId();
  return (
    <label className="a-switch" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={!!checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="a-switch__track" aria-hidden="true" />
      {(label || description) && (
        <span className="a-switch__text">
          {label && <strong>{label}</strong>}
          {description && <small>{description}</small>}
        </span>
      )}
    </label>
  );
}

/** Lista de textos (ex.: benefícios do ingresso). */
export function TagsField({ value = [], onChange, placeholder = 'Novo item' }) {
  const [draft, setDraft] = useState('');
  const add = () => {
    const text = draft.trim();
    if (!text) return;
    onChange([...value, text]);
    setDraft('');
  };
  return (
    <div className="a-tags">
      {value.length > 0 && (
        <ul role="list">
          {value.map((item, i) => (
            <li key={`${item}-${i}`}>
              <input
                className="a-input"
                value={item}
                onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))}
                aria-label={`Item ${i + 1}`}
              />
              <button
                type="button"
                className="a-btn a-btn--icon a-btn--ghost"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                aria-label={`Remover ${item}`}
              >
                <FiX />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="a-tags__add">
        <input
          className="a-input"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
        />
        <button type="button" className="a-btn a-btn--ghost" onClick={add} disabled={!draft.trim()}>
          <FiPlus /> Adicionar
        </button>
      </div>
    </div>
  );
}

/**
 * Upload de imagem com arrastar-e-soltar, prévia e otimização automática.
 * `onUploaded(url)` permite ao formulário apagar o arquivo se o usuário cancelar.
 */
export function ImageField({ value, onChange, preset = 'photo', folder = 'geral', aspect = '16 / 10', onUploaded, contain }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Envie um arquivo de imagem (JPG, PNG, WebP ou SVG).');
      return;
    }
    setBusy(true);
    try {
      const url = await uploadImage(file, { folder, preset });
      onUploaded?.(url);
      onChange(url);
      toast.success('Imagem enviada e otimizada.');
    } catch (err) {
      toast.error(`Falha no envio: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="a-image"
      data-over={over || undefined}
      data-contain={contain || undefined}
      style={{ '--aspect': aspect }}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        handleFile(e.dataTransfer.files?.[0]);
      }}
    >
      <div className="a-image__preview">
        {value ? <img src={value} alt="" /> : <FiImage aria-hidden="true" />}
        {busy && (
          <div className="a-image__busy">
            <Spinner label="Otimizando e enviando…" />
          </div>
        )}
      </div>
      <div className="a-image__actions">
        <button type="button" className="a-btn a-btn--ghost" onClick={() => inputRef.current?.click()} disabled={busy}>
          <FiUploadCloud /> {value ? 'Trocar imagem' : 'Enviar imagem'}
        </button>
        {value && (
          <button type="button" className="a-btn a-btn--ghost a-btn--danger-text" onClick={() => onChange('')} disabled={busy}>
            <FiTrash2 /> Remover
          </button>
        )}
        <small className="a-hint">Arraste uma imagem aqui. Ela é convertida para WebP automaticamente.</small>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />
    </div>
  );
}

/** Envio de vídeo MP4 (sem conversão) com prévia. */
export function VideoField({ value, onChange, folder = 'video' }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (file.type !== 'video/mp4') {
      toast.error('Envie um vídeo .mp4.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('O vídeo passa de 10 MB. Comprima antes de enviar.');
      return;
    }
    setBusy(true);
    try {
      onChange(await uploadImage(file, { folder }));
      toast.success('Vídeo enviado.');
    } catch (err) {
      toast.error(`Falha no envio: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="a-video">
      {value ? <video src={value} muted loop playsInline controls preload="metadata" /> : <div className="a-video__empty">Sem vídeo</div>}
      <div className="a-image__actions">
        <button type="button" className="a-btn a-btn--ghost" onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? <Spinner /> : <FiUploadCloud />} {busy ? 'Enviando…' : value ? 'Trocar vídeo' : 'Enviar vídeo'}
        </button>
        <small className="a-hint">MP4 de até 10 MB. Prefira 720p, sem áudio importante (toca mudo).</small>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4"
        hidden
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />
    </div>
  );
}

/** Renderiza o controle certo para cada tipo de campo dos formulários. */
export function FieldInput({ field, value, onChange, onUploaded, id }) {
  const common = {
    id,
    className: 'a-input',
    value: value ?? '',
    placeholder: field.placeholder,
    required: field.required,
    onChange: (e) => onChange(e.target.value),
  };

  switch (field.type) {
    case 'textarea':
      return <textarea {...common} rows={field.rows || 3} className="a-input a-textarea" />;
    case 'number':
    case 'money':
      return (
        <div className={field.type === 'money' ? 'a-money' : undefined}>
          {field.type === 'money' && <span aria-hidden="true">R$</span>}
          <input
            {...common}
            type="number"
            inputMode="decimal"
            step={field.step || (field.type === 'money' ? '0.01' : '1')}
            min={field.min}
            max={field.max}
            onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
          />
        </div>
      );
    case 'range':
      return (
        <div className="a-range">
          <input
            id={id}
            type="range"
            min={field.min}
            max={field.max}
            step={field.step}
            value={value ?? field.min}
            onChange={(e) => onChange(Number(e.target.value))}
          />
          <output>{field.format ? field.format(value) : value}</output>
        </div>
      );
    case 'switch':
      return <Switch checked={value} onChange={onChange} label={field.switchLabel} description={field.switchHint} />;
    case 'tags':
      return <TagsField value={value || []} onChange={onChange} placeholder={field.placeholder} />;
    case 'video':
      return <VideoField value={value} onChange={onChange} folder={field.folder} />;
    case 'image':
      return (
        <ImageField
          value={value}
          onChange={onChange}
          preset={field.preset}
          folder={field.folder}
          aspect={field.aspect}
          contain={field.contain}
          onUploaded={onUploaded}
        />
      );
    default:
      return (
        <>
          <input {...common} type={field.type || 'text'} list={field.options ? `${id}-list` : undefined} />
          {field.options && (
            <datalist id={`${id}-list`}>
              {field.options.map((o) => (
                <option key={o} value={o} />
              ))}
            </datalist>
          )}
        </>
      );
  }
}

/* ------------------------------------------------------- Gaveta lateral -- */

export function Drawer({ open, title, subtitle, onClose, children, footer }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="a-drawer"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {open && (
        <div className="a-drawer__panel">
          <header className="a-drawer__head">
            <div>
              <h2>{title}</h2>
              {subtitle && <p>{subtitle}</p>}
            </div>
            <button type="button" className="a-btn a-btn--icon a-btn--ghost" onClick={onClose} aria-label="Fechar">
              <FiX />
            </button>
          </header>
          <div className="a-drawer__body">{children}</div>
          {footer && <footer className="a-drawer__foot">{footer}</footer>}
        </div>
      )}
    </dialog>
  );
}

/* ---------------------------------------------------------- Confirmação -- */

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const ref = useRef(null);
  const resolver = useRef(null);
  const [opts, setOpts] = useState({});

  const confirm = useCallback((options) => {
    setOpts(options);
    ref.current?.showModal();
    return new Promise((resolve) => (resolver.current = resolve));
  }, []);

  const finish = (answer) => {
    ref.current?.close();
    resolver.current?.(answer);
    resolver.current = null;
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <dialog ref={ref} className="a-confirm" onCancel={() => finish(false)}>
        <h2>{opts.title}</h2>
        {opts.message && <p>{opts.message}</p>}
        <div className="a-confirm__actions">
          <button type="button" className="a-btn a-btn--ghost" onClick={() => finish(false)}>
            Cancelar
          </button>
          <button
            type="button"
            className={`a-btn ${opts.danger ? 'a-btn--danger' : 'a-btn--primary'}`}
            onClick={() => finish(true)}
            autoFocus
          >
            {opts.confirmLabel || 'Confirmar'}
          </button>
        </div>
      </dialog>
    </ConfirmContext.Provider>
  );
}

export const useConfirm = () => useContext(ConfirmContext);
