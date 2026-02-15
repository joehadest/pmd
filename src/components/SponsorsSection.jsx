import React from 'react';
import { FaHandshake, FaBullhorn, FaUsers, FaWhatsapp } from 'react-icons/fa';
import './SponsorsSection.css';

const SponsorsSection = () => {
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

  const benefits = [
    {
      icon: <FaUsers />,
      title: 'Visibilidade',
      text: 'Exponha sua marca para milhares de pessoas no maior evento da região.'
    },
    {
      icon: <FaHandshake />,
      title: 'Networking',
      text: 'Conecte-se com clientes em potencial e fortaleça sua presença no mercado.'
    },
    {
      icon: <FaBullhorn />,
      title: 'Ativação',
      text: 'Oportunidades exclusivas de ativação de marca dentro do camarote.'
    }
  ];

  return (
    <section id="parceiros" className="sponsors-section section">
      <div className="container">
        <div className="sponsors-content">
          <div className="section-title animate-fadeInUp">
            <h2>Seja um Parceiro</h2>
            <p className="section-subtitle">
              Junte sua marca ao Camarote PMD 2026 e faça parte dessa história
            </p>
          </div>

          {/* Seção de Patrocinadores */}
          <div className="sponsors-logos-section animate-fadeInUp">
            <h3 className="sponsors-title">Nossos Patrocinadores</h3>
            <div className="sponsors-logos-grid">
              {sponsors.map((sponsor, index) => (
                <div 
                  key={index} 
                  className="sponsor-logo-item animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="sponsor-logo"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Grid de Benefícios */}
          <div className="benefits-grid">
            {benefits.map((item, index) => (
              <div 
                key={index} 
                className="benefit-card animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="benefit-icon">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Chamada para Ação (CTA) */}
          <div className="sponsors-cta animate-fadeInUp">
            <div className="cta-box">
              <h3>Quer ser um patrocinador oficial?</h3>
              <p>
                Entre em contato com nossa equipe comercial e conheça as cotas de patrocínio 
                disponíveis para o Alto Folia 2026.
              </p>
              <a 
                href="https://wa.me/558496454229?text=Olá, gostaria de saber mais sobre parcerias com o Camarote PMD."
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <FaWhatsapp />
                Falar com Comercial
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
