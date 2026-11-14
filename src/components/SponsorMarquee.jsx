import { useContent } from '../content/ContentContext';
import './SponsorMarquee.css';

/** Faixa infinita com os logos dos patrocinadores (animação 100% CSS). */
export default function SponsorMarquee({ label = 'Patrocinadores' }) {
  const { sponsors } = useContent();
  const items = sponsors.map((s) => (
    <li key={s.id}>
      <img src={s.src} alt={s.name} loading="lazy" decoding="async" style={{ '--logo-scale': s.scale }} />
    </li>
  ));

  return (
    <div className="marquee" role="region" aria-label={label}>
      <ul className="marquee__track" role="list">
        {items}
      </ul>
      {/* Cópia apenas visual para o loop contínuo */}
      <ul className="marquee__track" role="list" aria-hidden="true">
        {items}
      </ul>
    </div>
  );
}
