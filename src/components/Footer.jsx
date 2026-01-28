import React from 'react';
import { Link } from 'react-scroll';
import { 
  FaInstagram, 
  FaFacebook, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaArrowUp
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Footer Content */}
        <div className="footer-content">
          {/* Coluna 1 - Sobre */}
          <div className="footer-column">
            <h3 className="footer-title">Camarote PMD</h3>
            <p className="footer-description">
              Desde 2007 levando alegria, tradição e emoção para o Alto Folia. 
              Viva essa experiência única com o Bloco Pode Mangar Deu!
            </p>
            <div className="footer-social">
              <a 
                href="https://instagram.com/podemangardeu" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-link"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://facebook.com/podemangardeu" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-link"
              >
                <FaFacebook />
              </a>
              <a 
                href="mailto:contato@podemangardeu.com.br"
                aria-label="Email"
                className="social-link"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div className="footer-column">
            <h4 className="footer-subtitle">Links Rápidos</h4>
            <ul className="footer-links">
              <li>
                <Link
                  to="inicio"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="sobre"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="ingressos"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                >
                  Ingressos
                </Link>
              </li>
              <li>
                <Link
                  to="galeria"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                >
                  Galeria
                </Link>
              </li>
              <li>
                <Link
                  to="local"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                >
                  Localização
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Informações */}
          <div className="footer-column">
            <h4 className="footer-subtitle">Informações</h4>
            <ul className="footer-info">
              <li>
                <FaMapMarkerAlt className="info-icon" />
                <span>Alto do Rodrigues, RN</span>
              </li>
              <li>
                <FaEnvelope className="info-icon" />
                <span>contato@podemangardeu.com.br</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Produtor */}
          <div className="footer-column">
            <h4 className="footer-subtitle">Produtor</h4>
            <p className="producer-info">
              <strong>Pode Mangar Deu</strong><br />
              Tradição desde 2007
            </p>
            <a 
              href="https://instagram.com/podemangardeu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="producer-link"
            >
              @podemangardeu
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Pode Mangar Deu. Todos os direitos reservados.
          </p>
          <p className="footer-made-with">
            Feito com <FaHeart className="heart-icon" /> para o Alto Folia
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className="scroll-to-top"
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
      >
        <FaArrowUp />
      </button>

      {/* Decorative Elements */}
      <div className="footer-decoration">
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
      </div>
    </footer>
  );
};

export default Footer;

