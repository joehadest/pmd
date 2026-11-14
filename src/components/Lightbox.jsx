import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import './Lightbox.css';

const pad = (n) => String(n).padStart(2, '0');

/**
 * Visualizador de imagens em tela cheia usando <dialog> nativo
 * (foco preso, Esc para fechar e fundo inerte de graça).
 *
 * Layout em 3 faixas alinhadas pela mesma largura:
 *   topo      → título + contador ........................ fechar
 *   palco     → [anterior]  imagem  [próxima]   (botões nunca cobrem a imagem)
 *   miniaturas→ tira com todas as fotos
 *
 * images: [{ src, large?, alt }]
 * index:  índice aberto ou null para fechado
 * title:  rótulo exibido no topo (ex.: "Nossa estrutura")
 */
export default function Lightbox({ images, index, onChange, onClose, title }) {
  const dialogRef = useRef(null);
  const thumbsRef = useRef(null);
  const touchX = useRef(null);
  const [dir, setDir] = useState(1);
  const open = index !== null && index !== undefined;
  const many = images.length > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const goTo = (next) => {
    if (next === index) return;
    setDir(next > index ? 1 : -1);
    onChange(next);
  };

  const go = (step) => {
    setDir(step);
    onChange((index + step + images.length) % images.length);
  };

  // Setas do teclado
  useEffect(() => {
    if (!open || !many) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Mantém a miniatura ativa visível e pré-carrega as vizinhas
  useEffect(() => {
    if (!open || !many) return;
    thumbsRef.current
      ?.querySelector('[aria-current="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    [1, -1].forEach((s) => {
      const img = images[(index + s + images.length) % images.length];
      new Image().src = img.large || img.src;
    });
  }, [open, index, many, images]);

  const handleClose = () => {
    document.documentElement.style.overflow = '';
    onClose();
  };

  const close = () => dialogRef.current?.close();
  const current = open ? images[index] : null;

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      data-single={!many || undefined}
      onClose={handleClose}
      // Clique fora da imagem (no fundo) fecha
      onClick={(e) => {
        if (e.target === e.currentTarget || 'backdrop' in e.target.dataset) close();
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null || !many) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      aria-label={title ? `${title} — visualizador de imagens` : 'Visualizador de imagens'}
    >
      {current && (
        <div className="lb" data-backdrop>
          <header className="lb__top">
            <div className="lb__meta">
              {title && <span className="lb__title">{title}</span>}
              {many && (
                <span className="lb__count" aria-live="polite">
                  {pad(index + 1)}
                  <span> / {pad(images.length)}</span>
                </span>
              )}
            </div>

            {many && (
              <p className="lb__hint" aria-hidden="true">
                <kbd>←</kbd>
                <kbd>→</kbd> navegar <kbd>Esc</kbd> fechar
              </p>
            )}

            <button type="button" className="lb__btn" onClick={close} aria-label="Fechar">
              <FiX />
            </button>
          </header>

          <div className="lb__stage" data-backdrop>
            {many && (
              <button type="button" className="lb__btn lb__nav lb__nav--prev" onClick={() => go(-1)} aria-label="Imagem anterior">
                <FiChevronLeft />
              </button>
            )}

            <figure className="lb__media" data-backdrop>
              <img key={index} src={current.large || current.src} alt={current.alt} style={{ '--dir': dir }} />
            </figure>

            {many && (
              <button type="button" className="lb__btn lb__nav lb__nav--next" onClick={() => go(1)} aria-label="Próxima imagem">
                <FiChevronRight />
              </button>
            )}
          </div>

          {many && (
            <nav className="lb__thumbs" ref={thumbsRef} aria-label="Miniaturas">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ver imagem ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                >
                  <img src={img.src} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </nav>
          )}
        </div>
      )}
    </dialog>
  );
}
