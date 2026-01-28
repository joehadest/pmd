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
          {/* Título Principal */}
          <div className="hero-title animate-fadeInUp">
            <h1>
              <span className="hero-subtitle">Bem-vindo ao</span>
              <span className="hero-main-title">CAMAROTE PMD</span>
              <span className="hero-year">2026</span>
            </h1>
          </div>

          {/* Descrição */}
          <div className="hero-description animate-fadeInUp">
            <p>
              2 dias de open bar, atrações e vista privilegiada no <strong>Alto Folia 2026</strong>
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
              Vendas Online
            </Link>
            <Link
              to="pontos-de-venda"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="btn btn-outline btn-lg"
            >
              Vendas Físicas
            </Link>
          </div>

          {/* Badge - Pré-venda */}
          <div className="hero-badge animate-float">
            <span className="badge-text">Pré-venda Aberta!</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;

