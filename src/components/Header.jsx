import { useEffect, useMemo, useState } from 'react';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import { navLinks as allLinks } from '../data/site';
import { useContent } from '../content/ContentContext';
import { useActiveSection, useScrolled } from '../hooks/useActiveSection';
import './Header.css';

export default function Header() {
  const { event, sections } = useContent();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const navLinks = useMemo(() => allLinks.filter((l) => !l.section || sections[l.section]), [sections]);
  const sectionIds = useMemo(() => navLinks.map((l) => l.id), [navLinks]);
  const active = useActiveSection(sectionIds);

  // Trava a rolagem e permite fechar com Esc quando o menu mobile está aberto
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="header" data-scrolled={scrolled || undefined} data-open={open || undefined}>
      <div className="header__bar container">
        <a href="#inicio" className="header__brand" aria-label="Camarote PMD 2026 — início" onClick={close}>
          <img src="/img/brand/selo-pmd-2026-320.webp" alt="" width="44" height="44" />
          <span>
            Camarote <strong>PMD</strong>
          </span>
        </a>

        <nav className="header__nav" aria-label="Principal">
          <ul role="list">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          className="btn btn--primary header__cta"
          href={event.ticketsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Comprar ingresso
          <FiArrowUpRight className="icon-shift" aria-hidden="true" />
        </a>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Menu mobile">
          <ul role="list">
            {navLinks.map(({ id, label }, i) => (
              <li key={id} style={{ '--i': i }}>
                <a href={`#${id}`} onClick={close} aria-current={active === id ? 'true' : undefined}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          className="btn btn--primary btn--lg btn--block"
          href={event.ticketsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
        >
          Comprar ingresso online
          <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
