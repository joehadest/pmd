import React from 'react';
import { FaInstagram, FaExternalLinkAlt } from 'react-icons/fa';
import './InstagramSection.css';

const InstagramSection = () => {

  return (
    <section id="instagram" className="instagram-section section">
      <div className="container">
        {/* Título da Seção */}
        <div className="section-title animate-fadeInUp">
          <FaInstagram className="instagram-logo" />
          <h2>Siga @podemangardeu</h2>
          <p className="section-subtitle">
            Acompanhe as novidades e bastidores do Camarote PMD
          </p>
        </div>

        {/* Instagram Handle - Destaque Principal */}
        <div className="instagram-handle animate-fadeInUp">
          <a 
            href="https://instagram.com/podemangardeu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="instagram-link"
          >
            <FaInstagram />
            <span>@podemangardeu</span>
            <FaExternalLinkAlt className="external-icon" />
          </a>
        </div>

        {/* Call to Action */}
        <div className="instagram-cta animate-fadeInUp">
          <p className="cta-description">
            Acompanhe todas as novidades, bastidores e informações exclusivas do Camarote PMD 2026!
          </p>
          <a 
            href="https://instagram.com/podemangardeu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg instagram-btn"
          >
            <FaInstagram />
            Seguir no Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;

