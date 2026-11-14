import { useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiPause, FiPlay, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { useContent } from '../content/ContentContext';
import './VideoSection.css';

/** Brilho de 4 pontas, o mesmo do logo PMD. */
const Sparkle = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0Z" />
  </svg>
);

/** Faixa estilo cartaz PMD com texto correndo (decorativa). */
function Ribbon({ items, variant }) {
  const group = [...items, ...items, ...items];
  return (
    <div className={`ribbon ribbon--${variant}`} aria-hidden="true">
      <div className="ribbon__track">
        {[0, 1].map((copy) => (
          <div className="ribbon__group" key={copy}>
            {group.map((text, i) => (
              <span key={i}>
                {text}
                <Sparkle />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Vídeo da última edição em faixa de ponta a ponta da tela.
 * - Só baixa o arquivo quando a seção se aproxima da tela (lazy load).
 * - Toca sozinho (mudo) enquanto visível e pausa fora da tela, economizando bateria/dados.
 * - Respeita "reduzir movimento": nesse caso não toca automaticamente.
 */
export default function VideoSection() {
  const { event } = useContent();
  const ribbonTop = [event.name, event.edition, event.organizer, event.dates.label].filter(Boolean);
  const ribbonBottom = ['2 dias de open bar', 'Atrações exclusivas', 'Vista privilegiada', event.instagram.handle];
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLoad(true);
        const video = videoRef.current;
        if (!video || reduceMotion) return;
        if (entry.intersectionRatio > 0.25) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: '400px 0px', threshold: [0, 0.25, 0.6] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [load]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section className="video" ref={sectionRef} aria-labelledby="video-title">
      <div className="video__stage">
        <Ribbon items={ribbonTop} variant="top" />

        <div className="video__frame">
          {load && (
            <video
              ref={videoRef}
              src={event.videoUrl}
              muted
              loop
              playsInline
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onClick={togglePlay}
              aria-label="Vídeo da última edição do Camarote PMD"
            />
          )}
        </div>

        <div className="video__content container">
          <div className="video__text reveal">
            <span className="eyebrow">Edição anterior</span>
            <h2 id="video-title">
              Viva a experiência <span className="text-gradient">PMD</span>
            </h2>
            <p>Sinta a energia do camarote e prepare-se para uma edição ainda mais incrível em 2026.</p>
            <a href="#ingressos" className="btn btn--primary btn--lg">
              Garantir meu ingresso
              <FiArrowRight className="icon-shift" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="video__controls">
          <button type="button" onClick={togglePlay} aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}>
            {playing ? <FiPause /> : <FiPlay />}
          </button>
          <button type="button" onClick={toggleMute} aria-label={muted ? 'Ativar som' : 'Desativar som'}>
            {muted ? <FiVolumeX /> : <FiVolume2 />}
          </button>
        </div>

        <Ribbon items={ribbonBottom} variant="bottom" />
      </div>
    </section>
  );
}
