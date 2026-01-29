import React, { useRef, useEffect } from 'react';
import './VideoSection.css';

const VideoSection = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = 1 - (rect.top / window.innerHeight);
      
      // Efeito de zoom suave baseado no scroll
      if (scrollProgress > 0 && scrollProgress < 1) {
        const scale = 1 + (scrollProgress * 0.1);
        sectionRef.current.style.setProperty('--scroll-scale', scale);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="video-section" ref={sectionRef}>
      <div className="video-container-full">
        {/* Título */}
        <div className="video-header animate-fadeInUp">
          <h2 className="video-title">Viva a Experiência PMD</h2>
          <p className="video-subtitle">
            Veja como foi a última edição do Camarote PMD
          </p>
        </div>

        {/* Container do Vídeo */}
        <div className="video-wrapper">
          <div className="video-player autoplay">
            {/* Vídeo PMD do YouTube - Loop Infinito como GIF com bordas rasgadas */}
            <iframe
              ref={videoRef}
              className="video-element"
              src="https://www.youtube.com/embed/wOeo-zHBKMA?autoplay=1&mute=1&loop=1&playlist=wOeo-zHBKMA&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1&disablekb=1&fs=0&autohide=1"
              title="Camarote PMD 2026"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Caption */}
          <div className="video-caption animate-fadeInUp">
            <p>
              ✨ <strong>Sinta a energia</strong> do Camarote PMD e 
              prepare-se para uma experiência ainda mais incrível em 2026!
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default VideoSection;

