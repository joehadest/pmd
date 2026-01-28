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
          <h3 className="footer-title">Camarote PMD 2026</h3>
          
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
          </div>
          
          <p className="footer-copyright">
            © 2026 Pode Mangar Deu. Todos os direitos reservados.
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
    </footer>
  );
};

export default Footer;

