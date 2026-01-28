import React from 'react';
import { FaMicrophone, FaMusic, FaStar, FaImage } from 'react-icons/fa';
import './LineUpSection.css';

const LineUpSection = () => {
  // Atrações confirmadas + placeholders
  const lineup = [
    {
      name: 'BANDA PRETA',
      time: 'Horário a confirmar',
      photo: '/LINE UP/BANDA PRETA.png',
      placeholder: false
    },
    {
      name: 'JEFF COSTA',
      time: 'Horário a confirmar',
      photo: '/LINE UP/JEFF COSTA.png',
      placeholder: false
    },
    {
      name: 'LUCAS BOQUINHA',
      time: 'Horário a confirmar',
      photo: '/LINE UP/LUCAS BOQUINHA.png',
      placeholder: false
    },
    {
      name: 'Em Breve',
      time: 'Mais atrações',
      placeholder: true
    },
    {
      name: 'Em Breve',
      time: 'Mais atrações',
      placeholder: true
    },
    {
      name: 'Em Breve',
      time: 'Mais atrações',
      placeholder: true
    }
  ];

  return (
    <section id="lineup" className="lineup-section section">
      <div className="container">
        {/* Título da Seção */}
        <div className="section-title animate-fadeInUp">
          <FaMusic className="title-icon" />
          <h2>Line-Up 2026</h2>
          <p className="section-subtitle">
            Conheça as atrações que vão agitar o Camarote PMD
          </p>
        </div>

        {/* Grid de Atrações */}
        <div className="lineup-grid">
          {lineup.map((artist, index) => (
            <div 
              key={index} 
              className="lineup-card animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Foto da Atração - Placeholder */}
              <div className="artist-photo">
                {artist.placeholder ? (
                  <div className="image-placeholder lineup-placeholder">
                    <FaMicrophone />
                    <span>Foto da Atração {index + 1}</span>
                    {/* ADICIONAR FOTO:
                        Coloque a imagem em /public/images/lineup-{index + 1}.jpg
                        Dimensões recomendadas: 400x400px
                        Formato: JPG
                    */}
                  </div>
                ) : (
                  <img src={artist.photo} alt={artist.name} />
                )}
              </div>

              {/* Informações da Atração */}
              <div className="artist-info">
                <h3 className="artist-name">{artist.name}</h3>
                <p className="artist-time">{artist.time}</p>
                <div className="artist-badge">
                  <FaStar />
                  <span>Confirmado</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Destaque "Em Breve" */}
        <div className="lineup-coming-soon animate-fadeInUp">
          <FaStar className="star-icon" />
          <h3>Mais Atrações em Breve!</h3>
          <p>
            Estamos preparando um line-up incrível para você. 
            Fique ligado nas nossas redes sociais para conferir todas as novidades!
          </p>
        </div>

        {/* Nota Informativa */}
        <div className="lineup-note animate-fadeInUp">
          <p>
            🎵 <strong>Importante:</strong> O line-up está sujeito a alterações. 
            Acompanhe nossas redes sociais para atualizações em tempo real!
          </p>
        </div>
      </div>

      {/* Background Decorativo */}
      <div className="lineup-decoration">
        <div className="deco-note deco-note-1">♪</div>
        <div className="deco-note deco-note-2">♫</div>
        <div className="deco-note deco-note-3">♪</div>
        <div className="deco-note deco-note-4">♫</div>
      </div>
    </section>
  );
};

export default LineUpSection;

