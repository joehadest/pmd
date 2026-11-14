import { FiArrowUpRight } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa6';
import { useContent } from '../content/ContentContext';
import './InstagramSection.css';

export default function InstagramSection() {
  const { event } = useContent();
  return (
    <section id="instagram" className="insta section" aria-labelledby="insta-title">
      <div className="container">
        <div className="insta__card reveal">
          <div className="insta__icon" aria-hidden="true">
            <FaInstagram />
          </div>
          <div className="insta__text">
            <h2 id="insta-title">Siga {event.instagram.handle}</h2>
            <p>Novidades, bastidores e informações exclusivas do Camarote PMD 2026 em primeira mão.</p>
          </div>
          <a href={event.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn--lg insta__btn">
            Seguir no Instagram
            <FiArrowUpRight className="icon-shift" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
