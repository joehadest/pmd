import React from 'react';
import { FaMapMarkerAlt, FaClock, FaStore } from 'react-icons/fa';
import './SalesPointsSection.css';

const SalesPointsSection = () => {
  const salesPoints = {
    altoRodrigues: [
      {
        name: 'Loja PMD',
        address: 'Av. Angelo Varela, 815, Alto do Rodrigues/RN',
        hours: '9h às 12h / 15h às 18h',
        icon: <FaStore />
      },
      {
        name: 'DiskGela',
        address: 'Av. Angelo Varela, 824, Alto do Rodrigues/RN',
        hours: 'Ter. a Sáb. 18h às 0h',
        icon: <FaStore />
      },
      {
        name: 'Boutique de Luxo',
        address: 'Av. Angelo Varela, 425 - Alto do Rodrigues/RN',
        hours: '9h às 12h / 15h às 18h',
        icon: <FaStore />
      }
    ],
    macau: [
      {
        name: 'MALU STORE',
        address: 'Rua Martins Ferreira, 401, Macau/RN',
        hours: '9h às 12h',
        icon: <FaStore />
      }
    ]
  };

  return (
    <section id="pontos-de-venda" className="sales-points-section section">
      <div className="container">
        {/* Título da Seção */}
        <div className="section-title animate-fadeInUp">
          <h2>Pontos de Venda Físicos</h2>
          <p className="section-subtitle">
            Garanta seu ingresso pessoalmente em uma de nossas lojas parceiras
          </p>
        </div>

        <div className="sales-cities">
          {/* Alto do Rodrigues */}
          <div className="city-section animate-fadeInUp">
            <div className="city-header">
              <FaMapMarkerAlt className="city-icon" />
              <h3>Alto do Rodrigues</h3>
            </div>
            
            <div className="sales-grid">
              {salesPoints.altoRodrigues.map((point, index) => (
                <div 
                  key={index} 
                  className="sales-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-icon">{point.icon}</div>
                  <h4 className="store-name">{point.name}</h4>
                  <div className="store-info">
                    <div className="info-item">
                      <FaMapMarkerAlt />
                      <span>{point.address}</span>
                    </div>
                    <div className="info-item">
                      <FaClock />
                      <span>{point.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Macau */}
          <div className="city-section animate-fadeInUp">
            <div className="city-header">
              <FaMapMarkerAlt className="city-icon" />
              <h3>Macau</h3>
            </div>
            
            <div className="sales-grid">
              {salesPoints.macau.map((point, index) => (
                <div 
                  key={index} 
                  className="sales-card"
                  style={{ animationDelay: `${(salesPoints.altoRodrigues.length + index) * 0.1}s` }}
                >
                  <div className="card-icon">{point.icon}</div>
                  <h4 className="store-name">{point.name}</h4>
                  <div className="store-info">
                    <div className="info-item">
                      <FaMapMarkerAlt />
                      <span>{point.address}</span>
                    </div>
                    <div className="info-item">
                      <FaClock />
                      <span>{point.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Informação Adicional */}
        <div className="sales-note animate-fadeInUp">
          <p>
            💳 <strong>Formas de pagamento:</strong> Consulte as opções disponíveis em cada ponto de venda.
          </p>
          <p>
            🌐 <strong>Prefere comprar online?</strong> Acesse nossa plataforma de vendas: 
            <a 
              href="https://outgo.com.br/camarotepmd2026" 
              target="_blank" 
              rel="noopener noreferrer"
              className="online-link"
            >
              outgo.com.br/camarotepmd2026
            </a>
          </p>
          <p>
            📞 <strong>Dúvidas?</strong> Entre em contato pelos nossos canais de atendimento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SalesPointsSection;

