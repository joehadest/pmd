import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo PMD */}
          <div className="header-logo">
            <img src="/SELO PMD 2026.png" alt="Camarote PMD 2026" />
          </div>

          {/* Navegação Desktop */}
          <nav className="header-nav desktop-nav">
            <ul>
              <li>
                <Link
                  to="inicio"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="lineup"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                >
                  Line-Up
                </Link>
              </li>
              <li>
                <Link
                  to="ingressos"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                >
                  Ingressos
                </Link>
              </li>
              <li>
                <Link
                  to="pontos-de-venda"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                >
                  Pontos de Venda
                </Link>
              </li>
            </ul>
          </nav>

          {/* Botão CTA Desktop */}
          <div className="header-cta desktop-cta">
            <Link
              to="ingressos"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="btn btn-primary"
            >
              VENDAS ONLINE
            </Link>
          </div>

          {/* Menu Mobile Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <nav className="mobile-nav">
          <ul>
            <li>
              <Link
                to="inicio"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={closeMobileMenu}
              >
                Início
              </Link>
            </li>
            <li>
              <Link
                to="lineup"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={closeMobileMenu}
              >
                Line-Up
              </Link>
            </li>
            <li>
              <Link
                to="ingressos"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={closeMobileMenu}
              >
                Ingressos
              </Link>
            </li>
            <li>
              <Link
                to="pontos-de-venda"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={closeMobileMenu}
              >
                Pontos de Venda
              </Link>
            </li>
            <li>
              <Link
                to="ingressos"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={closeMobileMenu}
                className="btn btn-primary"
              >
                VENDAS ONLINE
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

