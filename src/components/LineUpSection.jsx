import { FiCheck, FiClock, FiInfo } from 'react-icons/fi';
import { useContent } from '../content/ContentContext';
import './LineUpSection.css';

export default function LineUpSection() {
  const { lineup, event } = useContent();
  const confirmed = lineup.filter((a) => a.confirmed).length;
  const missingTimes = lineup.some((a) => !a.timeLabel);

  return (
    <section id="lineup" className="lineup section" aria-labelledby="lineup-title">
      <div className="container">
        <header className="section-head section-head--center reveal">
          <span className="eyebrow">
            {confirmed} {confirmed === 1 ? 'atração confirmada' : 'atrações confirmadas'}
          </span>
          <h2 id="lineup-title">
            Line-up <span className="text-gradient">2026</span>
          </h2>
          <p>Conheça quem vai agitar os dois dias de {event.name.replace(/\s*\d{4}$/, '')}.</p>
        </header>

        <ul className="lineup__grid" role="list">
          {lineup.map((artist) => (
            <li key={artist.id} className="artist reveal">
              <div className="artist__media">
                {artist.src && (
                  <img
                    src={artist.src}
                    srcSet={artist.srcSet}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px"
                    alt={`${artist.name} — atração do ${event.name}`}
                    loading="lazy"
                    decoding="async"
                    width="480"
                    height="600"
                  />
                )}
              </div>
              <div className="artist__info">
                <div>
                  <h3>{artist.name}</h3>
                  {artist.timeLabel && (
                    <p className="artist__time">
                      <FiClock aria-hidden="true" /> {artist.timeLabel}
                    </p>
                  )}
                </div>
                {artist.confirmed ? (
                  <span className="artist__badge">
                    <FiCheck aria-hidden="true" /> Confirmado
                  </span>
                ) : (
                  <span className="artist__badge artist__badge--soon">Em breve</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="note reveal">
          <FiInfo aria-hidden="true" />
          <span>
            {missingTimes && <strong>Horários a confirmar. </strong>}O line-up está sujeito a
            alterações — acompanhe nossas redes sociais para atualizações em tempo real.
          </span>
        </p>
      </div>
    </section>
  );
}
