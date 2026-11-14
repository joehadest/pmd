import { FiArrowRight, FiCalendar, FiMapPin } from 'react-icons/fi';
import { LuBeer } from 'react-icons/lu';
import { useContent } from '../content/ContentContext';
import SponsorMarquee from './SponsorMarquee';
import './HeroSection.css';

export default function HeroSection() {
  const { event, sponsors, sections } = useContent();
  const facts = [
    { icon: FiCalendar, title: event.dates.short, text: event.dates.days },
    { icon: FiMapPin, title: event.city, text: `${event.state}, Brasil` },
    { icon: LuBeer, title: '2 dias', text: 'de open bar' },
  ];

  return (
    <section id="inicio" className="hero">
      <div className="hero__bg" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__rays" />
          <div className="hero__burst" />
          <img
            className="hero__seal"
            src="/img/brand/selo-pmd-2026-640.webp"
            srcSet="/img/brand/selo-pmd-2026-320.webp 320w, /img/brand/selo-pmd-2026-640.webp 640w"
            sizes="(max-width: 900px) 260px, 480px"
            alt=""
            width="640"
            height="640"
            fetchPriority="high"
          />
        </div>

        <div className="hero__content">
          <span className="eyebrow hero__in" style={{ '--d': 0 }}>
            {event.edition}
            {event.organizer && <span className="hero__eyebrow-extra"> · {event.organizer}</span>}
          </span>

          <h1 className="hero__title hero__in" style={{ '--d': 1 }}>
            {event.heroTitle[0]} <span className="text-gradient">{event.heroTitle[1]}</span>
          </h1>

          {event.heroLead && (
            <p className="hero__lead hero__in" style={{ '--d': 2 }}>
              {event.heroLead}
            </p>
          )}

          <div className="hero__actions hero__in" style={{ '--d': 3 }}>
            <a href={sections.tickets ? '#ingressos' : event.ticketsUrl} className="btn btn--primary btn--lg">
              Garantir meu ingresso
              <FiArrowRight className="icon-shift" aria-hidden="true" />
            </a>
            {sections.sponsors && (
              <a href="#parceiros" className="btn btn--ghost btn--lg">
                Seja parceiro
              </a>
            )}
          </div>

          <dl className="hero__facts hero__in" style={{ '--d': 4 }}>
            {facts.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <Icon aria-hidden="true" />
                <dt>{title}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {sponsors.length > 0 && (
        <div className="hero__sponsors">
          <SponsorMarquee />
        </div>
      )}
    </section>
  );
}
