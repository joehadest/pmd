import React from 'react';
import { FaWhatsapp, FaHotel } from 'react-icons/fa';
import './PousadaCentralSection.css';

const PHONE_RAW = '558435232356';
const PHONE_DISPLAY = '+55 84 3523-2356';
const WHATSAPP_URL = `https://wa.me/${PHONE_RAW}`;

const PousadaCentralSection = () => {
  return (
    <section id="pousada-central" className="pousada-central-section section">
      <div className="container">
        <div className="pousada-central-content animate-fadeInUp">
          <FaHotel className="pousada-central-icon" aria-hidden="true" />
          <h2 className="pousada-central-title">Faça sua reserva na Pousada Central</h2>
          <a
            href={`tel:${PHONE_RAW}`}
            className="pousada-central-phone"
            aria-label={`Telefone: ${PHONE_DISPLAY}`}
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            aria-label="Abrir conversa no WhatsApp"
          >
            <FaWhatsapp className="btn-whatsapp-icon" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default PousadaCentralSection;
