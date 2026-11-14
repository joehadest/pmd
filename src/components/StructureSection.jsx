import { useState } from 'react';
import { FiInfo, FiMaximize2 } from 'react-icons/fi';
import { useContent } from '../content/ContentContext';
import Lightbox from './Lightbox';
import './StructureSection.css';

export default function StructureSection() {
  const { structurePhotos } = useContent();
  const [current, setCurrent] = useState(null);

  return (
    <section id="estrutura" className="structure section" aria-labelledby="estrutura-title">
      <div className="container">
        <header className="section-head section-head--center reveal">
          <span className="eyebrow">Novidade 2026</span>
          <h2 id="estrutura-title">
            Nossa <span className="text-gradient">estrutura</span>
          </h2>
          <p>Mais espaço, melhor visibilidade e conforto para você curtir o Alto Folia do jeito que merece.</p>
        </header>

        <ul className="structure__bento" role="list">
          {structurePhotos.map((photo, i) => (
            <li key={photo.id} className="reveal">
              <button type="button" onClick={() => setCurrent(i)} aria-label={`Ampliar ${photo.alt}`}>
                <img
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
                />
                <span className="structure__zoom" aria-hidden="true">
                  <FiMaximize2 />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="note reveal">
          <FiInfo aria-hidden="true" />
          <span>
            <strong>Imagens ilustrativas.</strong> Os ambientes podem sofrer alterações.
          </span>
        </p>
      </div>

      <Lightbox
        title="Nossa estrutura"
        images={structurePhotos}
        index={current}
        onChange={setCurrent}
        onClose={() => setCurrent(null)}
      />
    </section>
  );
}
