import { useState } from 'react';
import { FiMaximize2 } from 'react-icons/fi';
import { useContent } from '../content/ContentContext';
import Lightbox from './Lightbox';
import './OpenBarSection.css';

export default function OpenBarSection() {
  const { openBar, event, sections } = useContent();
  const [zoom, setZoom] = useState(null);
  const poster = {
    src: openBar.image.src,
    large: openBar.image.large,
    alt: 'Cartaz do Open Bar Camarote PMD 2026',
  };

  return (
    <section id="openbar" className="openbar section" aria-labelledby="openbar-title">
      <div className="container openbar__grid">
        <div className="openbar__content">
          <header className="section-head reveal">
            <span className="eyebrow">Tudo liberado</span>
            <h2 id="openbar-title">
              Open bar <span className="text-gradient">nos 2 dias</span>
            </h2>
            <p>Veja tudo o que estará liberado nos dois dias de folia.</p>
          </header>

          <ol className="openbar__list" role="list">
            {openBar.items.map((item, i) => (
              <li key={item.id} className="reveal" style={{ '--n': `"${String(i + 1).padStart(2, '0')}"` }}>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ol>

          <a href={sections.tickets ? '#ingressos' : event.ticketsUrl} className="btn btn--primary btn--lg reveal">
            Quero meu ingresso
          </a>
          <p className="openbar__legal">
            Venda e consumo de bebidas alcoólicas proibidos para menores de 18 anos. Beba com
            moderação.
          </p>
        </div>

        {openBar.image.src && (
          <button type="button" className="openbar__poster reveal" onClick={() => setZoom(0)} aria-label="Ampliar cartaz do Open Bar">
            <img
              src={openBar.image.src}
              srcSet={openBar.image.srcSet}
              sizes="(max-width: 900px) 90vw, 440px"
              alt={`Cartaz do Open Bar ${event.name}`}
              loading="lazy"
              decoding="async"
              width="720"
              height="1280"
            />
            <span className="openbar__zoom">
              <FiMaximize2 aria-hidden="true" /> Ampliar
            </span>
          </button>
        )}
      </div>

      <Lightbox title="Open Bar" images={[poster]} index={zoom} onChange={setZoom} onClose={() => setZoom(null)} />
    </section>
  );
}
