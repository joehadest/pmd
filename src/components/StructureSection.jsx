import React from 'react';
import './StructureSection.css';

const StructureSection = () => {
  // Dados da estrutura
  const features = [
    {
      image: '/camarote/camarote 1.jpeg',
      placeholder: false
    },
    {
      image: '/camarote/camarote 2.jpeg',
      placeholder: false
    },
    {
      image: '/camarote/camarote 3.jpeg',
      placeholder: false
    },
    {
      image: '/camarote/camarote 4.jpeg',
      placeholder: false
    },
    {
      image: '/camarote/camarote 5.jpeg',
      placeholder: false
    },
    {
      image: '/camarote/camarote 6.jpeg',
      placeholder: false
    },
    {
      image: '/camarote/camarote 7.jpeg',
      placeholder: false
    },
    {
      image: '/camarote/camarote 8.jpeg',
      placeholder: false
    }
  ];

  return (
    <section id="estrutura" className="structure-section section">
      <div className="container">
        <div className="section-title animate-fadeInUp">
          <h2>Nossa Estrutura</h2>
          <p className="section-subtitle">
            Conforto e qualidade para você curtir sem preocupações
          </p>
        </div>

        <div className="structure-grid">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="structure-card animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-image-wrapper">
                {item.placeholder ? (
                  <div className="structure-placeholder">
                    <span className="placeholder-text">Foto {index + 1}</span>
                  </div>
                ) : (
                  <img src={item.image} alt={`Camarote PMD ${index + 1}`} loading="lazy" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StructureSection;
