import React, { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { 
  FaInstagram, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaArrowUp
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const footerFeaturesRef = useRef(null);

  const sponsors = [
    { name: 'Delta', logo: '/Logos patrocinios/LOGOS DELTA.png' },
    { name: 'DaCasa', logo: '/Logos patrocinios/LOGOS DACASA.png' },
    { name: 'Sol Maxi', logo: '/Logos patrocinios/SOL MAXI.png' },
    { name: 'Baracho', logo: '/Logos patrocinios/BARACHO.png' },
    { name: 'DiskGela', logo: '/Logos patrocinios/LOGOS DISKGELA.png' },
    { name: 'Viva', logo: '/Logos patrocinios/LOGOS VIVA.png' },
    { name: 'ITudo', logo: '/Logos patrocinios/ITUDO.png' },
    { name: 'Ultranet', logo: '/Logos patrocinios/LOGO ULTRANET - VERTICAL.png' }
  ];

  // Removido useEffect - agora o CSS cuida do full-width sem quebrar o viewport

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      {/* Features do Evento - Marquee Integrado */}
      <div className="footer-features" ref={footerFeaturesRef}>
        <div className="hero-features-scroll">
          <div className="hero-features-content">
            {[...sponsors, ...sponsors].map((sponsor, index) => {
                const isSmallLogo = sponsor.name === 'Baracho' || sponsor.name === 'Sol Maxi';
                return (
                  <div
                    key={`${sponsor.name}-${index}`}
                    className="hero-feature-item hero-sponsor-item"
                    aria-label={`Patrocinador ${sponsor.name}`}
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className={`hero-sponsor-logo ${isSmallLogo ? 'hero-sponsor-logo-large' : ''}`}
                      loading="lazy"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Footer Content */}
        <div className="footer-content">
          <h3 className="footer-title">Camarote PMD 2026</h3>
          
          <div className="footer-social">
            <a 
              href="https://instagram.com/podemangardeu" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-link"
            >
              <FaInstagram />
            </a>
          </div>
          
          <p className="footer-copyright">
            © 2026 Pode Mangar Deu. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className="scroll-to-top"
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;

