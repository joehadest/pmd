import { FiArrowUpRight, FiCheck, FiClock, FiMapPin } from 'react-icons/fi';
import { formatBRL } from '../data/site';
import { useContent } from '../content/ContentContext';
import './TicketsSection.css';

export default function TicketsSection() {
  const { tickets, sections } = useContent();

  return (
    <section id="ingressos" className="tickets section" aria-labelledby="ingressos-title">
      <div className="container">
        <header className="section-head section-head--center reveal">
          {tickets.batch && <span className="eyebrow tickets__live">{tickets.batch}</span>}
          <h2 id="ingressos-title">
            Garanta seu <span className="text-gradient">ingresso</span>
          </h2>
          {tickets.subtitle && <p>{tickets.subtitle}</p>}
        </header>

        <div className="tickets__grid">
          {tickets.options.map((t) => (
            <article key={t.id} className="ticket reveal" data-featured={t.featured || undefined}>
              {t.featured && <span className="ticket__tag">Mais vantajoso</span>}

              <header>
                <h3>{t.name}</h3>
                {t.people && <p>{t.people}</p>}
              </header>

              <div className="ticket__price">
                <span className="ticket__value">{formatBRL(t.price)}</span>
                {t.perPerson != null && <span className="ticket__per">{formatBRL(t.perPerson)} por pessoa</span>}
              </div>

              <ul className="ticket__perks" role="list">
                {t.perks.map((perk) => (
                  <li key={perk}>
                    <FiCheck aria-hidden="true" />
                    {perk}
                  </li>
                ))}
              </ul>

              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn--lg btn--block ${t.featured ? 'btn--primary' : 'btn--ghost'}`}
              >
                Comprar {t.name}
                <FiArrowUpRight className="icon-shift" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        <div className="tickets__footer reveal">
          {tickets.validity && (
            <p>
              <FiClock aria-hidden="true" />
              {tickets.validity}
            </p>
          )}
          {sections.sales && (
            <a href="#pontos-de-venda">
              <FiMapPin aria-hidden="true" />
              Prefere comprar pessoalmente? Ver pontos de venda
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
