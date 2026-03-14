import React, { useState, useEffect } from 'react';
import './OpenBarSection.css';

const OpenBarSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesktopLike, setIsDesktopLike] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktopLike(window.innerWidth >= 768);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const handleImageClick = () => {
    if (!isDesktopLike) return;
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="openbar" className="openbar-section section">
      <div className="container">
        <div className="section-title animate-fadeInUp">
          <h2>Open Bar Camarote PMD 2026</h2>
          <p className="section-subtitle">
            Veja tudo o que estará liberado nos dois dias de folia
          </p>
        </div>
      </div>

      <div className="openbar-banner-wrapper animate-fadeInUp">
        <div className="openbar-banner">
          <img
            src="/openbar/OPEN BAR - CAMAROTE PMD 2026.png"
            alt="Open Bar Camarote PMD 2026"
            className={isDesktopLike ? 'clickable' : ''}
            onClick={handleImageClick}
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="openbar-modal-overlay" onClick={closeModal}>
          <div
            className="openbar-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="openbar-modal-close"
              aria-label="Fechar visualização do Open Bar"
              onClick={closeModal}
            >
              ×
            </button>
            <img
              src="/openbar/OPEN BAR - CAMAROTE PMD 2026.png"
              alt="Open Bar Camarote PMD 2026 - ampliado"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default OpenBarSection;

