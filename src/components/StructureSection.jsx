import React, { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './StructureSection.css';

const StructureSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Dados da estrutura
  const features = [
    {
      image: '/camarote/camarote 1.jpeg',
      placeholder: false,
      title: 'Camarote PMD - Vista 1'
    },
    {
      image: '/camarote/camarote 2.jpeg',
      placeholder: false,
      title: 'Camarote PMD - Vista 2'
    },
    {
      image: '/camarote/camarote 3.jpeg',
      placeholder: false,
      title: 'Camarote PMD - Vista 3'
    },
    {
      image: '/camarote/camarote 4.jpeg',
      placeholder: false,
      title: 'Camarote PMD - Vista 4'
    },
    {
      image: '/camarote/camarote 5.jpeg',
      placeholder: false,
      title: 'Camarote PMD - Vista 5'
    },
    {
      image: '/camarote/camarote 6.jpeg',
      placeholder: false,
      title: 'Camarote PMD - Vista 6'
    },
    {
      image: '/camarote/camarote 7.jpeg',
      placeholder: false,
      title: 'Camarote PMD - Vista 7'
    },
    {
      image: '/camarote/camarote 8.jpeg',
      placeholder: false,
      title: 'Camarote PMD - Vista 8'
    }
  ];

  // Funções do Lightbox
  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Bloqueia scroll da página
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto'; // Libera scroll
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % features.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + features.length) % features.length);
  };

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        setCurrentImage((prev) => (prev + 1) % features.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentImage((prev) => (prev - 1 + features.length) % features.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, features.length]);

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
              onClick={() => openLightbox(index)}
            >
              <div className="card-image-wrapper">
                {item.placeholder ? (
                  <div className="structure-placeholder">
                    <span className="placeholder-text">Foto {index + 1}</span>
                  </div>
                ) : (
                  <>
                    <img src={item.image} alt={`Camarote PMD ${index + 1}`} loading="lazy" />
                    <div className="card-overlay">
                      <span>Clique para ampliar</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Nota Informativa */}
        <div className="structure-note animate-fadeInUp">
          <p>
            📸 <strong>Importante:</strong> Imagens ilustrativas, os ambientes podem sofrer alterações.
          </p>
        </div>
      </div>

      {/* Lightbox (Tela Cheia) */}
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <FaTimes />
          </button>
          
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <FaChevronLeft />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={features[currentImage].image} 
              alt={`Imagem ${currentImage + 1}`} 
            />
            <p className="lightbox-caption">
              {currentImage + 1} de {features.length}
            </p>
          </div>
          
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <FaChevronRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default StructureSection;
