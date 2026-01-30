import React, { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { 
  FaInstagram, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaArrowUp,
  FaBeer,
  FaMusic,
  FaShieldAlt,
  FaEye,
  FaBolt,
  FaStar
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const footerFeaturesRef = useRef(null);

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
            {/* Primeira sequência */}
            <div className="hero-feature-item">
              <FaBeer className="feature-icon" />
              <span className="feature-text">Open Bar</span>
            </div>
            <div className="hero-feature-item">
              <FaMusic className="feature-icon" />
              <span className="feature-text">Atrações Exclusivas</span>
            </div>
            <div className="hero-feature-item">
              <FaShieldAlt className="feature-icon" />
              <span className="feature-text">Segurança Total</span>
            </div>
            <div className="hero-feature-item">
              <FaEye className="feature-icon" />
              <span className="feature-text">Vista Privilegiada</span>
            </div>
            <div className="hero-feature-item">
              <FaBolt className="feature-icon" />
              <span className="feature-text">Energia Máxima</span>
            </div>
            <div className="hero-feature-item">
              <FaStar className="feature-icon" />
              <span className="feature-text">Experiência Única</span>
            </div>
            
            {/* Segunda sequência (duplicada para efeito infinito) */}
            <div className="hero-feature-item">
              <FaBeer className="feature-icon" />
              <span className="feature-text">Open Bar</span>
            </div>
            <div className="hero-feature-item">
              <FaMusic className="feature-icon" />
              <span className="feature-text">Atrações Exclusivas</span>
            </div>
            <div className="hero-feature-item">
              <FaShieldAlt className="feature-icon" />
              <span className="feature-text">Segurança Total</span>
            </div>
            <div className="hero-feature-item">
              <FaEye className="feature-icon" />
              <span className="feature-text">Vista Privilegiada</span>
            </div>
            <div className="hero-feature-item">
              <FaBolt className="feature-icon" />
              <span className="feature-text">Energia Máxima</span>
            </div>
            <div className="hero-feature-item">
              <FaStar className="feature-icon" />
              <span className="feature-text">Experiência Única</span>
            </div>
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

