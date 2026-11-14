import { FiArrowUp, FiArrowUpRight } from 'react-icons/fi';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { navLinks as allLinks } from '../data/site';
import { useContent } from '../content/ContentContext';
import { useScrolled } from '../hooks/useActiveSection';
import SponsorMarquee from './SponsorMarquee';
import './Footer.css';

export default function Footer() {
  const { event, sections, sponsors } = useContent();
  const navLinks = allLinks.filter((l) => !l.section || sections[l.section]);
  const showTop = useScrolled(600);

  return (
    <footer className="footer">
      {sponsors.length > 0 && (
        <div className="footer__sponsors">
          <SponsorMarquee label={`Patrocinadores do ${event.name}`} />
        </div>
      )}

      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/img/brand/selo-pmd-2026-320.webp" alt={event.name} width="96" height="96" loading="lazy" />
          {event.footerAbout && <p>{event.footerAbout}</p>}
        </div>

        <nav aria-label="Rodapé">
          <h2 className="footer__title">Navegue</h2>
          <ul role="list">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer__title">Contato</h2>
          <ul role="list" className="footer__contact">
            <li>
              <a href={event.instagram.url} target="_blank" rel="noopener noreferrer">
                <FaInstagram aria-hidden="true" /> {event.instagram.handle}
              </a>
            </li>
            <li>
              <a href={event.commercialWhatsapp} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp aria-hidden="true" /> Comercial / parcerias
              </a>
            </li>
            <li>
              <a href={event.ticketsUrl} target="_blank" rel="noopener noreferrer">
                <FiArrowUpRight aria-hidden="true" /> Vendas online
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Pode Mangar Deu. Todos os direitos reservados.</p>
        <p>
          {event.edition} · {event.city}/{event.state}
        </p>
      </div>

      <button
        type="button"
        className="to-top"
        data-visible={showTop || undefined}
        onClick={() => window.scrollTo({ top: 0 })}
        aria-label="Voltar ao topo"
        tabIndex={showTop ? 0 : -1}
      >
        <FiArrowUp />
      </button>
    </footer>
  );
}
