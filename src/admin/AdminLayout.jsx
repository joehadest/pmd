import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import {
  FiActivity,
  FiCalendar,
  FiCoffee,
  FiExternalLink,
  FiGrid,
  FiImage,
  FiLogOut,
  FiMapPin,
  FiMenu,
  FiMusic,
  FiStar,
  FiTag,
  FiUser,
  FiX,
} from 'react-icons/fi';
import { useAuth } from './auth';
import { getProfile } from './lib/profile';
import { Avatar } from './components/ui';

export const NAV = [
  {
    group: 'Geral',
    items: [
      { to: '/admin', label: 'Visão geral', icon: FiGrid, end: true },
      { to: '/admin/evento', label: 'Evento e textos', icon: FiCalendar },
    ],
  },
  {
    group: 'Conteúdo do site',
    items: [
      { to: '/admin/lineup', label: 'Line-up', icon: FiMusic },
      { to: '/admin/open-bar', label: 'Open Bar', icon: FiCoffee },
      { to: '/admin/estrutura', label: 'Estrutura', icon: FiImage },
      { to: '/admin/ingressos', label: 'Ingressos', icon: FiTag },
      { to: '/admin/pontos-de-venda', label: 'Pontos de venda', icon: FiMapPin },
      { to: '/admin/patrocinadores', label: 'Patrocinadores', icon: FiStar },
    ],
  },
  {
    group: 'Sistema',
    items: [
      { to: '/admin/atividade', label: 'Atividade', icon: FiActivity },
      { to: '/admin/conta', label: 'Minha conta', icon: FiUser },
    ],
  },
];

const ALL = NAV.flatMap((g) => g.items);

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const profile = getProfile(user);
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Item do menu cujo caminho casa com a URL atual (o mais específico vence)
  const path = location.pathname.replace(/\/$/, '');
  const current =
    ALL.filter((i) => (i.end ? path === i.to : path.startsWith(i.to))).sort((a, b) => b.to.length - a.to.length)[0] ||
    ALL[0];

  useEffect(() => {
    setOpen(false);
    document.title = `${current.label} · Painel Camarote PMD`;
  }, [location.pathname, current.label]);

  // Menu lateral no celular: fecha com Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="admin" data-nav-open={open || undefined}>
      <aside className="a-sidebar" aria-label="Menu do painel">
        <div className="a-sidebar__brand">
          <img src="/img/brand/selo-pmd-2026-320.webp" alt="" width="40" height="40" />
          <div>
            <strong>Camarote PMD</strong>
            <span>Painel admin</span>
          </div>
          <button type="button" className="a-btn a-btn--icon a-btn--ghost a-sidebar__close" onClick={() => setOpen(false)} aria-label="Fechar menu">
            <FiX />
          </button>
        </div>

        <nav className="a-nav">
          {NAV.map(({ group, items }) => (
            <div key={group} className="a-nav__group">
              <p className="a-nav__title">{group}</p>
              <ul role="list">
                {items.map(({ to, label, icon: Icon, end }) => (
                  <li key={to}>
                    <NavLink to={to} end={end} className="a-nav__link">
                      <Icon aria-hidden="true" />
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="a-sidebar__foot">
          <a href="/" target="_blank" rel="noopener noreferrer" className="a-nav__link">
            <FiExternalLink aria-hidden="true" /> Ver site
          </a>
          <div className="a-user">
            <NavLink to="/admin/conta" className="a-user__link" title="Minha conta">
              <Avatar profile={profile} />
              <span className="a-user__text">
                <strong>{profile.displayName}</strong>
                <small title={profile.email}>{profile.role || profile.email}</small>
              </span>
            </NavLink>
            <button type="button" className="a-btn a-btn--icon a-btn--ghost" onClick={signOut} aria-label="Sair" title="Sair">
              <FiLogOut />
            </button>
          </div>
        </div>
      </aside>

      <div className="a-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />

      <div className="a-main">
        <header className="a-topbar">
          <button type="button" className="a-btn a-btn--icon a-btn--ghost a-topbar__menu" onClick={() => setOpen(true)} aria-label="Abrir menu">
            <FiMenu />
          </button>
          <nav className="a-crumbs" aria-label="Você está em">
            <span>Painel</span>
            <span aria-hidden="true">/</span>
            <strong>{current.label}</strong>
          </nav>
          <a href="/" target="_blank" rel="noopener noreferrer" className="a-btn a-btn--ghost a-btn--sm a-topbar__site">
            <FiExternalLink /> Ver site
          </a>
        </header>
        <main className="a-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
