import React from 'react';
import { Link } from 'react-scroll';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaImage } from 'react-icons/fa';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section id="inicio" className="hero-section">
      {/* Background com gradiente - Placeholder para imagem de fundo opcional */}
      <div className="hero-background">
        {/* ADICIONAR IMAGEM DE FUNDO (OPCIONAL):
            Para adicionar uma imagem de fundo, descomente e adicione o caminho:
            <img src="/images/hero-background.jpg" alt="Fundo Carnaval" />
            
            Dimensões recomendadas: 1920x1080px
            Formato: JPG
        */}
        <div className="hero-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          {/* Coluna Esquerda - Conteúdo */}
          <div className="hero-left">
            {/* Título Principal */}
            <div className="hero-title animate-fadeInUp">
              <h1>
                <span className="hero-main-title">CAMAROTE PMD 2026</span>
              </h1>
            </div>

            {/* Descrição */}
            <div className="hero-description animate-fadeInUp">
              <p>
                Open bar • Atrações • Vista privilegiada
              </p>
            </div>

            {/* Informações do Evento */}
            <div className="hero-info animate-fadeInUp">
              <div className="info-item">
                <FaCalendarAlt className="info-icon" />
                <div className="info-text">
                  <span className="info-label">Data</span>
                  <span className="info-value">28 e 29 de Março</span>
                </div>
              </div>

              <div className="info-item">
                <FaClock className="info-icon" />
                <div className="info-text">
                  <span className="info-label">Horário</span>
                  <span className="info-value">18:00 até 23:59</span>
                </div>
              </div>

              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div className="info-text">
                  <span className="info-label">Local</span>
                  <span className="info-value">Alto do Rodrigues, RN</span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="hero-cta animate-fadeInUp">
              <Link
                to="ingressos"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="btn btn-primary btn-lg animate-pulse"
              >
                Comprar Ingresso
              </Link>
            </div>
          </div>

          {/* Coluna Direita - Logo */}
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

