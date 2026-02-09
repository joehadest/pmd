import React, { useRef, useEffect, useState } from 'react';
import './VideoSection.css';

const VideoSection = () => {
  const videoRef = useRef(null);
  const html5VideoRef = useRef(null);
  const sectionRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState('');
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detecta se é iOS/iPhone
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent) || 
                       (/macintosh/.test(userAgent) && navigator.maxTouchPoints > 1);
    setIsIOS(isIOSDevice);

    // Se for iOS, não precisa configurar o YouTube (usará vídeo HTML5)
    if (!isIOSDevice) {
      // Configura a URL do vídeo do YouTube para outros dispositivos
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
        playsinline: '1',
        disablekb: '1',
        fs: '0',
        autohide: '1',
        enablejsapi: '1',
        origin: window.location.origin
      });
      
      setVideoSrc(`${baseUrl}${videoId}?${params.toString()}`);
    }

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

  // Gerencia o vídeo HTML5 para iOS
  useEffect(() => {
    if (!isIOS || !html5VideoRef.current) return;

    const video = html5VideoRef.current;

    const handlePlay = () => {
      setIsVideoPlaying(true);
    };

    const handleEnded = () => {
      // Reinicia o vídeo para loop infinito
      video.currentTime = 0;
      video.play().catch(() => {
        // Ignora erros de autoplay
      });
    };

    const handleError = () => {
      console.warn('Erro ao carregar vídeo HTML5, tentando novamente...');
      // Tenta recarregar o vídeo
      setTimeout(() => {
        video.load();
        video.play().catch(() => {});
      }, 1000);
    };

    // Tenta iniciar o vídeo automaticamente
    const tryPlay = () => {
      video.play().then(() => {
        setIsVideoPlaying(true);
      }).catch((error) => {
        // Se autoplay falhar, tenta após interação do usuário
        console.log('Autoplay bloqueado, aguardando interação do usuário...');
      });
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Tenta iniciar quando o vídeo está pronto
    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener('loadeddata', tryPlay, { once: true });
      video.addEventListener('canplay', tryPlay, { once: true });
    }

    // Tenta iniciar após um pequeno delay
    setTimeout(tryPlay, 500);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [isIOS]);

  // Detecta qualquer interação do usuário e tenta iniciar o vídeo
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        // Tenta iniciar o vídeo após interação
        setTimeout(() => {
          if (isIOS && html5VideoRef.current) {
            // Para iOS, tenta iniciar o vídeo HTML5
            html5VideoRef.current.play().catch(() => {});
          } else {
            // Para outros dispositivos, usa o método do YouTube
            forceVideoPlay();
          }
        }, 50);
      }
    };

    // Eventos que indicam interação do usuário
    const events = ['touchstart', 'touchend', 'click', 'scroll', 'mousedown', 'keydown', 'pointerdown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    // Também tenta quando a página carrega completamente
    if (document.readyState === 'complete') {
      setTimeout(() => {
        forceVideoPlay();
      }, 500);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          forceVideoPlay();
        }, 500);
      }, { once: true });
    }

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [hasUserInteracted, isIOS]);

  // Função para forçar o vídeo a tocar
  const forceVideoPlay = () => {
    if (!videoRef.current) return;

    const iframe = videoRef.current;
    
    try {
      // Múltiplas tentativas de iniciar o vídeo
      const playCommands = [
        { event: 'command', func: 'playVideo' },
        { event: 'command', func: 'seekTo', args: [0, true] },
        { event: 'command', func: 'playVideo' }
      ];

      playCommands.forEach((cmd, index) => {
        setTimeout(() => {
          if (iframe.contentWindow) {
            iframe.contentWindow.postMessage(JSON.stringify(cmd), '*');
          }
        }, index * 200);
      });
    } catch (e) {
      // Ignora erros
    }
  };

  // Intersection Observer para iniciar vídeo quando entra na viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVideoPlaying) {
            if (isIOS && html5VideoRef.current) {
              // Para iOS, tenta iniciar o vídeo HTML5
              html5VideoRef.current.play().catch(() => {});
            } else if (videoRef.current) {
              // Para outros dispositivos, usa o método do YouTube
              for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                  forceVideoPlay();
                }, i * 300);
              }
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [isVideoPlaying, isIOS]);

  // Tenta simular um toque programático no overlay para iniciar o vídeo
  useEffect(() => {
    if (!videoSrc) return;

    const tryAutoStart = () => {
      // Aguarda o overlay ser renderizado
      setTimeout(() => {
        const overlay = document.querySelector('.video-autoplay-overlay');
        if (overlay) {
          // Tenta disparar eventos de toque programaticamente
          try {
            const touchEvent = new TouchEvent('touchstart', {
              bubbles: true,
              cancelable: true,
              touches: [new Touch({
                identifier: 0,
                target: overlay,
                clientX: 0,
                clientY: 0,
                radiusX: 0,
                radiusY: 0,
                rotationAngle: 0,
                force: 0
              })]
            });
            overlay.dispatchEvent(touchEvent);
          } catch (e) {
            // Se TouchEvent não estiver disponível, tenta com MouseEvent
            try {
              const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
              });
              overlay.dispatchEvent(clickEvent);
            } catch (e2) {
              // Fallback: apenas força o play
              forceVideoPlay();
            }
          }
        }
      }, 2000);
    };

    // Tenta múltiplas vezes em diferentes momentos
    tryAutoStart();
    setTimeout(tryAutoStart, 3000);
    setTimeout(tryAutoStart, 5000);

    // Também tenta quando o iframe carrega
    if (videoRef.current) {
      videoRef.current.addEventListener('load', () => {
        setTimeout(tryAutoStart, 1500);
      });
    }
  }, [videoSrc]);

  // Garante loop e autoplay no iOS/Safari usando postMessage e eventos do YouTube (apenas para não-iOS)
  useEffect(() => {
    if (isIOS || !videoRef.current || !videoSrc) return;

    const iframe = videoRef.current;
    let checkInterval;
    let retryCount = 0;
    const maxRetries = 15;

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
            setIsVideoPlaying(true);
            retryCount = 0; // Reset retry count quando está tocando
          } else if (data.info === 2) { // PAUSED
            // Se pausou, tenta retomar (especialmente para iOS)
            setTimeout(() => {
              ensureLoop();
            }, 500);
          }
        }
      } catch (e) {
        // Ignora erros de parsing
      }
    };

    window.addEventListener('message', handleMessage);

    // Tenta iniciar o vídeo imediatamente quando o iframe carrega
    const tryInitialPlay = () => {
      // Múltiplas tentativas agressivas para iniciar
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          ensureLoop();
        }, i * 300);
      }
    };

    // Verifica periodicamente se o vídeo está tocando (especialmente para iOS)
    const startChecking = () => {
      checkInterval = setInterval(() => {
        if (!isVideoPlaying) {
          ensureLoop();
          retryCount++;
          
          // Para após várias tentativas para não sobrecarregar
          if (retryCount >= maxRetries) {
            clearInterval(checkInterval);
            // Reinicia o check após um tempo
            setTimeout(() => {
              retryCount = 0;
              startChecking();
            }, 10000);
          }
        } else {
          // Se está tocando, apenas garante o loop
          ensureLoop();
        }
      }, 2000); // Verifica a cada 2 segundos
    };

    // Inicia a verificação após um pequeno delay para o iframe carregar
    const initTimeout = setTimeout(() => {
      tryInitialPlay();
      startChecking();
    }, 1000);

    // Se o usuário interagiu, tenta iniciar imediatamente
    if (hasUserInteracted) {
      setTimeout(() => {
        tryInitialPlay();
      }, 200);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (initTimeout) clearTimeout(initTimeout);
      window.removeEventListener('message', handleMessage);
    };
  }, [videoSrc, hasUserInteracted, isVideoPlaying]);

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
            {/* Para iOS/iPhone: usa vídeo HTML5 hospedado localmente */}
            {isIOS ? (
              <video
                ref={html5VideoRef}
                className="video-element video-html5"
                src="/video/video%20pmd.mp4"
                autoPlay
                loop
                muted
                playsInline
                webkit-playsinline="true"
                preload="auto"
                style={{ pointerEvents: 'none' }}
              >
                Seu navegador não suporta vídeo HTML5.
              </video>
            ) : (
              /* Para outros dispositivos: usa iframe do YouTube */
              videoSrc && (
                <>
                  <iframe
                    ref={(el) => {
                      videoRef.current = el;
                      // Tenta iniciar o vídeo quando o iframe carrega
                      if (el) {
                        el.addEventListener('load', () => {
                          setTimeout(() => {
                            forceVideoPlay();
                          }, 1000);
                        });
                      }
                    }}
                    className="video-element"
                    src={videoSrc}
                    title="Camarote PMD 2026"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    playsInline
                    webkit-playsinline="true"
                  ></iframe>
                  {/* Overlay invisível para tentar iniciar o vídeo automaticamente */}
                  <div 
                    className="video-autoplay-overlay"
                    onClick={() => {
                      forceVideoPlay();
                      setHasUserInteracted(true);
                    }}
                    onTouchStart={() => {
                      forceVideoPlay();
                      setHasUserInteracted(true);
                    }}
                    aria-hidden="true"
                  ></div>
                </>
              )
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

