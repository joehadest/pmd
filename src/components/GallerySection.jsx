import React, { useState } from 'react';
import { FaImage, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './GallerySection.css';

const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Placeholders para imagens da galeria
  // Substitua pelos caminhos reais das imagens quando disponíveis
  const galleryImages = [
    {
      src: '/images/gallery-1.jpg',
      alt: 'Bloco PMD - Edição Anterior 1',
      placeholder: true
    },
    {
      src: '/images/gallery-2.jpg',
      alt: 'Bloco PMD - Edição Anterior 2',
      placeholder: true
    },
    {
      src: '/images/gallery-3.jpg',
      alt: 'Bloco PMD - Edição Anterior 3',
      placeholder: true
    },
    {
      src: '/images/gallery-4.jpg',
      alt: 'Bloco PMD - Edição Anterior 4',
      placeholder: true
    },
    {
      src: '/images/gallery-5.jpg',
      alt: 'Bloco PMD - Edição Anterior 5',
      placeholder: true
    },
    {
      src: '/images/gallery-6.jpg',
      alt: 'Bloco PMD - Edição Anterior 6',
      placeholder: true
    },
    {
      src: '/images/gallery-7.jpg',
      alt: 'Bloco PMD - Edição Anterior 7',
      placeholder: true
    },
    {
      src: '/images/gallery-8.jpg',
      alt: 'Bloco PMD - Edição Anterior 8',
      placeholder: true
    }
  ];

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleKeyDown = (e) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <section id="galeria" className="gallery-section section">
      <div className="container-wide">
        {/* Título da Seção */}
        <div className="section-title animate-fadeInUp">
          <h2>Galeria</h2>
          <p className="section-subtitle">
            Reviva os melhores momentos do Bloco PMD
          </p>
        </div>

        {/* Grid de Imagens */}
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openLightbox(index)}
            >
              {image.placeholder ? (
                /* Placeholder para adicionar imagem depois */
                <div className="image-placeholder gallery-placeholder">
                  <FaImage />
                  <span>Adicionar Foto {index + 1}</span>
                  <span className="placeholder-info">800x600px</span>
                  {/* ADICIONAR IMAGEM AQUI:
                      Coloque a imagem em /public/images/gallery-{index + 1}.jpg
                      
                      Dimensões recomendadas: 800x600px
                      Formato: JPG
                      
                      Sugestões de conteúdo:
                      - Fotos de edições anteriores do Bloco PMD
                      - Foliões curtindo o carnaval
                      - Vista dos trios elétricos
                      - Momentos marcantes do Alto Folia
                  */}
                </div>
              ) : (
                <img src={image.src} alt={image.alt} loading="lazy" />
              )}
              <div className="gallery-overlay">
                <span className="overlay-text">Clique para ampliar</span>
              </div>
            </div>
          ))}
        </div>

        {/* Nota informativa */}
        <div className="gallery-note animate-fadeInUp">
          <p>
            📸 <strong>Em breve:</strong> Adicione suas fotos favoritas das edições 
            anteriores para completar nossa galeria de memórias!
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <FaTimes />
          </button>
          
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <FaChevronLeft />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {galleryImages[currentImage].placeholder ? (
              <div className="image-placeholder lightbox-placeholder">
                <FaImage />
                <span>Imagem {currentImage + 1}</span>
                <span className="placeholder-info">
                  Adicione a imagem em /public/images/gallery-{currentImage + 1}.jpg
                </span>
              </div>
            ) : (
              <img 
                src={galleryImages[currentImage].src} 
                alt={galleryImages[currentImage].alt} 
              />
            )}
            <p className="lightbox-caption">
              {galleryImages[currentImage].alt} - {currentImage + 1} de {galleryImages.length}
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

export default GallerySection;

