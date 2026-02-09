import React, { useRef, useEffect, useState } from 'react';
import './VideoSection.css';

const VideoSection = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    // Configura a URL do vídeo com parâmetros otimizados para iOS/Safari
    const videoId = 'wOeo-zHBKMA';
    const baseUrl = 'https://www.youtube.com/embed/';
    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      loop: '1',
      playlist: videoId, // Necessário para loop funcionar
      controls: '0',
      modestbranding: '1',
      rel: '0',
      showinfo: '0',
      iv_load_policy: '3',
      playsinline: '1', // Crítico para iOS
      disablekb: '1',
      fs: '0',
      autohide: '1',
      enablejsapi: '1', // Permite controle via JavaScript
      origin: window.location.origin
    });
    
    setVideoSrc(`${baseUrl}${videoId}?${params.toString()}`);

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

  // Garante loop no iOS/Safari usando postMessage e eventos do YouTube
  useEffect(() => {
    if (!videoRef.current || !videoSrc) return;

    const iframe = videoRef.current;
    let checkInterval;
    let retryCount = 0;
    const maxRetries = 10;

    const ensureLoop = () => {
      try {
        if (iframe.contentWindow) {
          // Comando para voltar ao início e tocar
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: 'command',
              func: 'seekTo',
              args: [0, true]
            }),
            '*'
          );
          
          // Tenta tocar o vídeo (importante para iOS)
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: 'command',
              func: 'playVideo'
            }),
            '*'
          );
        }
      } catch (e) {
        // Ignora erros de cross-origin
      }
    };

    // Listener para eventos do YouTube
    const handleMessage = (event) => {
      if (event.origin !== 'https://www.youtube.com') return;
      
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        
        // Se o vídeo terminou (state 0 = ENDED), reinicia
        if (data.event === 'onStateChange') {
          if (data.info === 0) { // ENDED
            setTimeout(() => {
              ensureLoop();
            }, 100);
          } else if (data.info === 1) { // PLAYING
            retryCount = 0; // Reset retry count quando está tocando
          }
        }
      } catch (e) {
        // Ignora erros de parsing
      }
    };

    window.addEventListener('message', handleMessage);

    // Verifica periodicamente se o vídeo está tocando (especialmente para iOS)
    const startChecking = () => {
      checkInterval = setInterval(() => {
        ensureLoop();
        retryCount++;
        
        // Para após várias tentativas para não sobrecarregar
        if (retryCount >= maxRetries) {
          clearInterval(checkInterval);
          // Reinicia o check após um tempo
          setTimeout(() => {
            retryCount = 0;
            startChecking();
          }, 5000);
        }
      }, 3000); // Verifica a cada 3 segundos
    };

    // Inicia a verificação após um pequeno delay para o iframe carregar
    const initTimeout = setTimeout(() => {
      startChecking();
    }, 2000);

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (initTimeout) clearTimeout(initTimeout);
      window.removeEventListener('message', handleMessage);
    };
  }, [videoSrc]);

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
            {videoSrc && (
              <iframe
                ref={videoRef}
                className="video-element"
                src={videoSrc}
                title="Camarote PMD 2026"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                playsInline
                webkit-playsinline="true"
              ></iframe>
            )}
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

