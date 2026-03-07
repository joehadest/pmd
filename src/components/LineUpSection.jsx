import React from 'react';
import { FaMusic, FaStar, FaClock } from 'react-icons/fa';
import './LineUpSection.css';

const LineUpSection = () => {
  // Atrações confirmadas
  const lineup = [
    {
      name: 'BANDA PRETTA',
      time: 'Horário a confirmar',
      photo: '/LINE UP/BANDA PRETA.jpeg'
    },
    {
      name: 'JEFF COSTA',
      time: 'Horário a confirmar',
      photo: '/LINE UP/JEFF COSTA.png'
    },
    {
      name: 'LUCAS BOQUINHA',
      time: 'Horário a confirmar',
      photo: '/LINE UP/LUCAS BOQUINHA.png'
    },
    {
      name: 'JP FORROZADO',
      time: 'Horário a confirmar',
      photo: '/LINE UP/JP FORROZADO.jpeg'
    },
    {
      name: 'PK',
      time: 'Horário a confirmar',
      photo: '/LINE UP/PK.jpeg'
    },
    {
      name: 'OZ PIRAZ',
      time: 'Horário a confirmar',
      photo: '/LINE UP/OZ PIRAZ.png'
    },
    {
      name: 'DJ GUILHERME',
      time: 'Horário a confirmar',
      photo: '/LINE UP/dj guilherme.jpeg'
    },
    {
      name: 'DJ IRONSIDE',
      time: 'Horário a confirmar',
      photo: '/LINE UP/dj ironside.jpeg'
    },
    {
      name: 'LIVIA SOUZA',
      time: 'Horário a confirmar',
      photo: '/LINE UP/livia souza.jpeg'
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
              <div className="artist-photo">
                <img src={artist.photo} alt={artist.name} />
              </div>
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

          {/* Card "Em Breve" (dentro do grid) */}
          <div className="lineup-card coming-soon-card animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <div className="coming-soon-content">
              <div className="coming-soon-icon-wrapper">
                <FaClock className="coming-soon-icon" />
              </div>
              <h3>Em Breve</h3>
              <p>Mais atrações sendo preparadas para você!</p>
              <span className="coming-soon-badge">Aguarde</span>
            </div>
          </div>
        </div>

        {/* Nota Informativa */}
        <div className="lineup-note animate-fadeInUp">
          <p>
            🎵 <strong>Importante:</strong> O line-up está sujeito a alterações. 
            Acompanhe nossas redes sociais para atualizações em tempo real!
          </p>
        </div>
      </div>

    </section>
  );
};

export default LineUpSection;

