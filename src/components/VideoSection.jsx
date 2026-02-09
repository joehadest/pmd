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

  // Gerencia o vídeo HTML5 para iOS - usando loop nativo do HTML5
  useEffect(() => {
    if (!isIOS || !html5VideoRef.current) return;

    const video = html5VideoRef.current;
    let hasStarted = false;
    let pauseCheckInterval = null;

    const handlePlay = () => {
      setIsVideoPlaying(true);
    };

    const handlePause = () => {
      // Se o vídeo foi pausado (exceto quando realmente terminou), retoma
      if (!video.ended) {
        video.play().catch(() => {});
      }
    };

    const handleError = () => {
      console.warn('Erro ao carregar vídeo HTML5, tentando novamente...');
      // Tenta recarregar o vídeo apenas uma vez
      setTimeout(() => {
        if (video.error) {
          video.load();
          video.play().catch(() => {});
        }
      }, 1000);
    };

    // Tenta iniciar o vídeo automaticamente apenas uma vez
    const tryPlay = () => {
      if (!hasStarted) {
        hasStarted = true;
        video.play().then(() => {
          setIsVideoPlaying(true);
        }).catch((error) => {
          // Se autoplay falhar, tenta após interação do usuário
          console.log('Autoplay bloqueado, aguardando interação do usuário...');
          hasStarted = false; // Permite tentar novamente após interação
        });
      }
    };

    // Monitora se o vídeo foi pausado automaticamente e retoma
    const startPauseMonitoring = () => {
      pauseCheckInterval = setInterval(() => {
        if (video.paused && !video.ended && hasStarted) {
          // Vídeo foi pausado mas não terminou - retoma
          video.play().catch(() => {});
        }
      }, 1000); // Verifica a cada segundo
    };

    // Adiciona listeners
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    // Tenta iniciar quando o vídeo está pronto
    if (video.readyState >= 2) {
      tryPlay();
      startPauseMonitoring();
    } else {
      video.addEventListener('loadeddata', () => {
        tryPlay();
        startPauseMonitoring();
      }, { once: true });
      video.addEventListener('canplay', tryPlay, { once: true });
    }

    // Tenta iniciar após um pequeno delay (apenas uma vez)
    const initTimeout = setTimeout(() => {
      tryPlay();
      if (!pauseCheckInterval) {
        startPauseMonitoring();
      }
    }, 500);

    return () => {
      clearTimeout(initTimeout);
      if (pauseCheckInterval) {
        clearInterval(pauseCheckInterval);
      }
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
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

    // Também tenta quando a página carrega completamente (apenas para não-iOS)
    if (!isIOS) {
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

  // Intersection Observer para garantir que o vídeo continue tocando mesmo ao sair da viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Quando entra na viewport, garante que está tocando
            if (isIOS && html5VideoRef.current) {
              const video = html5VideoRef.current;
              if (video.paused || video.ended) {
                video.play().catch(() => {});
              }
            } else if (videoRef.current) {
              // Para YouTube, garante que está tocando sem resetar
              setTimeout(() => {
                if (videoRef.current?.contentWindow) {
                  videoRef.current.contentWindow.postMessage(
                    JSON.stringify({ event: 'command', func: 'playVideo' }),
                    '*'
                  );
                }
              }, 100);
            }
          }
          // Não pausa quando sai da viewport - deixa o vídeo continuar tocando
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [isIOS]);


  // Monitora estado do YouTube e garante que continue tocando mesmo ao sair da viewport
  useEffect(() => {
    if (isIOS || !videoRef.current || !videoSrc) return;

    const iframe = videoRef.current;
    let playCheckInterval = null;

    // Listener para eventos do YouTube - monitora estado e garante reprodução contínua
    const handleMessage = (event) => {
      if (event.origin !== 'https://www.youtube.com') return;
      
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        
        if (data.event === 'onStateChange') {
          if (data.info === 1) { // PLAYING
            setIsVideoPlaying(true);
          } else if (data.info === 2) { // PAUSED
            // Se pausou (mas não terminou), retoma para garantir reprodução contínua
            setTimeout(() => {
              if (iframe.contentWindow) {
                iframe.contentWindow.postMessage(
                  JSON.stringify({ event: 'command', func: 'playVideo' }),
                  '*'
                );
              }
            }, 100);
          }
          // Não faz nada quando ENDED - o YouTube com loop=1 e playlist reinicia automaticamente
        }
      } catch (e) {
        // Ignora erros de parsing
      }
    };

    // Monitora periodicamente se o vídeo está tocando e retoma se necessário
    const startPlayMonitoring = () => {
      playCheckInterval = setInterval(() => {
        // Envia comando para garantir que está tocando (sem resetar)
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'playVideo' }),
            '*'
          );
        }
      }, 3000); // Verifica a cada 3 segundos
    };

    window.addEventListener('message', handleMessage);
    startPlayMonitoring();

    return () => {
      if (playCheckInterval) {
        clearInterval(playCheckInterval);
      }
      window.removeEventListener('message', handleMessage);
    };
  }, [videoSrc, isIOS]);

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
                      // O YouTube com autoplay=1 na URL já inicia automaticamente
                      // Não precisa chamar forceVideoPlay() aqui para evitar múltiplas chamadas
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

