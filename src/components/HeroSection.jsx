import React, { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { FaCalendarAlt, FaMapMarkerAlt, FaMusic, FaBeer, FaShieldAlt, FaEye, FaBolt, FaStar } from 'react-icons/fa';
import './HeroSection.css';

const HeroSection = () => {
  const heroFeaturesRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const el = heroFeaturesRef.current;
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

  return (
    <section id="inicio" className="hero-section">
      {/* Background com gradiente */}
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          {/* Logo Mobile - aparece primeiro em mobile */}
          <div className="hero-logo-mobile animate-fadeInUp">
            <img 
              src="/SELO PMD 2026.png" 
              alt="Camarote PMD 2026" 
              className="hero-logo"
            />
          </div>

          {/* Coluna Esquerda - Conteúdo */}
          <div className="hero-left">
            {/* Badge */}
            <div className="hero-badge animate-fadeInUp">
              <span>Alto Folia 2026</span>
            </div>

            {/* Título Principal */}
            <div className="hero-title animate-fadeInUp">
              <h1>
                <span className="hero-title-line1">Camarote</span>
                <span className="hero-title-line2">PMD 2026</span>
              </h1>
            </div>

            {/* Descrição */}
            <div className="hero-description animate-fadeInUp">
              <p>
                Uma nova estrutura, pensada em cada detalhe, para oferecer ainda mais conforto, 
                segurança e uma experiência inesquecível aos nossos foliões.
              </p>
            </div>

            {/* Call to Action */}
            <div className="hero-cta animate-fadeInUp">
              <Link
                to="ingressos"
                spy={true}
                smooth={true}
                offset={-60}
                duration={500}
                className="btn btn-primary btn-lg"
              >
                Compre Online
                <span className="btn-arrow">→</span>
              </Link>
              <Link
                to="parceiros"
                spy={true}
                smooth={true}
                offset={-60}
                duration={800}
                className="btn btn-secondary btn-lg"
              >
                Seja Parceiro
              </Link>
            </div>

            {/* Informações do Evento - Grid */}
            <div className="hero-info-grid animate-fadeInUp">
              <div className="info-grid-item">
                <FaCalendarAlt className="info-grid-icon" />
                <div className="info-grid-text">
                  <div className="info-grid-title">28 e 29/03</div>
                  <div className="info-grid-subtitle">Sábado e Domingo</div>
                </div>
              </div>
              <div className="info-grid-item">
                <FaMapMarkerAlt className="info-grid-icon" />
                <div className="info-grid-text">
                  <div className="info-grid-title">Alto do Rodrigues</div>
                  <div className="info-grid-subtitle">RN, Brasil</div>
                </div>
              </div>
              <div className="info-grid-item">
                <FaMusic className="info-grid-icon" />
                <div className="info-grid-text">
                  <div className="info-grid-title">2 Dias</div>
                  <div className="info-grid-subtitle">de Festa</div>
                </div>
              </div>
            </div>

            {/* Features do Evento - Marquee Integrado */}
            <div className="hero-features" ref={(el) => {
              heroFeaturesRef.current = el;
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
          </div>

          {/* Coluna Direita - Logo Desktop */}
          <div className="hero-right animate-fadeInUp">
            <img 
              src="/SELO PMD 2026.png" 
              alt="Camarote PMD 2026" 
              className="hero-logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

