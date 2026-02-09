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
    {
      name: 'Ultranet',
      logo: '/Logos patrocinios/LOGO ULTRANET - VERTICAL.png'
    },
    {
      name: 'DaCasa',
      logo: '/Logos patrocinios/LOGOS DACASA.png'
    },
    {
      name: 'Delta',
      logo: '/Logos patrocinios/LOGOS DELTA.png'
    },
    {
      name: 'DiskGela',
      logo: '/Logos patrocinios/LOGOS DISKGELA.png'
    },
    {
      name: 'Viva',
      logo: '/Logos patrocinios/LOGOS VIVA.png'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      const el = footerFeaturesRef.current;
      if (!el) return;
      
      const vw = window.innerWidth;
      const parent = el.parentElement;
      const parentRect = parent?.getBoundingClientRect();
      const parentLeft = parentRect?.left || 0;
      
      el.style.setProperty('width', `${vw}px`, 'important');
      el.style.setProperty('margin-left', `-${parentLeft}px`, 'important');
      el.style.setProperty('margin-right', `-${vw - parentLeft - (parentRect?.width || 0)}px`, 'important');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      {/* Features do Evento - Marquee Integrado */}
      <div className="footer-features" ref={(el) => {
        footerFeaturesRef.current = el;
        if (el) {
          // Aplicar ajuste inicial
          const vw = window.innerWidth;
          const parent = el.parentElement;
          const parentRect = parent?.getBoundingClientRect();
          const parentLeft = parentRect?.left || 0;
          
          el.style.setProperty('width', `${vw}px`, 'important');
          el.style.setProperty('margin-left', `-${parentLeft}px`, 'important');
          el.style.setProperty('margin-right', `-${vw - parentLeft - (parentRect?.width || 0)}px`, 'important');
        }
      }}>
        <div className="hero-features-scroll">
          <div className="hero-features-content">
            {[...sponsors, ...sponsors].map((sponsor, index) => {
              const isUltranetOrDaCasa = sponsor.name === 'Ultranet' || sponsor.name === 'DaCasa';
              return (
                <div
                  key={`${sponsor.name}-${index}`}
                  className={`hero-feature-item hero-sponsor-item ${isUltranetOrDaCasa ? 'hero-sponsor-item-extra-spacing' : ''}`}
                  aria-label={`Patrocinador ${sponsor.name}`}
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="hero-sponsor-logo"
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

