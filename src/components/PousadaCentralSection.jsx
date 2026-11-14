import { FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';
import { useContent } from '../content/ContentContext';
import './PousadaCentralSection.css';

export default function PousadaCentralSection() {
  const { phoneRaw, phoneDisplay } = useContent().pousada;

  return (
    <section id="pousada-central" className="pousada section" aria-labelledby="pousada-title">
      <div className="container">
        <div className="pousada__card reveal">
          <img
            className="pousada__logo"
            src="/img/patrocinadores/pousada-central.webp"
            alt="Pousada Central"
            loading="lazy"
            width="240"
            height="80"
          />
          <div className="pousada__text">
            <span className="eyebrow">Hospedagem parceira</span>
            <h2 id="pousada-title">Vem de fora? Faça sua reserva na Pousada Central</h2>
          </div>
          <div className="pousada__actions">
            <a href={`tel:+${phoneRaw}`} className="btn btn--ghost btn--lg">
              <FiPhone aria-hidden="true" />
              {phoneDisplay}
            </a>
            <a href={`https://wa.me/${phoneRaw}`} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp btn--lg">
              <FaWhatsapp aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
