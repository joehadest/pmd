import React from 'react';
import { FaMapMarkerAlt, FaDirections, FaCar, FaBus } from 'react-icons/fa';
import './LocationSection.css';

const LocationSection = () => {
  return (
    <section id="local" className="location-section section">
      <div className="container">
        {/* Título da Seção */}
        <div className="section-title animate-fadeInUp">
          <h2>Localização</h2>
          <p className="section-subtitle">
            Encontre o Camarote PMD no coração do Alto Folia
          </p>
        </div>

        <div className="location-content">
          {/* Informações de Localização */}
          <div className="location-info animate-fadeInUp">
            <div className="location-card">
              <div className="location-header">
                <FaMapMarkerAlt className="location-icon" />
                <h3>Endereço</h3>
              </div>
              <p className="location-address">
                Alto do Rodrigues, RN<br />
                CEP: 59507-000
              </p>
              <p className="location-description">
                O Camarote PMD estará localizado no melhor ponto do Alto Folia, 
                proporcionando vista privilegiada de toda a festa e dos trios elétricos.
              </p>
            </div>

            {/* Como Chegar */}
            <div className="how-to-get">
              <h3>Como Chegar</h3>
              <div className="transport-options">
                <div className="transport-item">
                  <FaCar className="transport-icon" />
                  <div className="transport-info">
                    <h4>De Carro</h4>
                    <p>Estacionamento disponível nas proximidades</p>
                  </div>
                </div>
                <div className="transport-item">
                  <FaBus className="transport-icon" />
                  <div className="transport-info">
                    <h4>Transporte Público</h4>
                    <p>Linhas de ônibus com acesso ao centro</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Alto+do+Rodrigues,+RN,+59507-000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <FaDirections />
                Ver Rotas no Google Maps
              </a>
            </div>
          </div>

          {/* Mapa */}
          <div className="location-map animate-fadeInUp">
            <div className="map-container">
              {/* Google Maps Embed */}
              <iframe
                title="Localização Alto do Rodrigues, RN"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31803.74738895!2d-37.0078!3d-5.3178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ba3e80000000000%3A0x0!2sAlto%20do%20Rodrigues%2C%20RN!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="map-note">
              📍 A localização exata do Camarote PMD será divulgada próximo ao evento
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

