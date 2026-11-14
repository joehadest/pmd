import { FiUsers, FiZap } from 'react-icons/fi';
import { FaHandshake, FaWhatsapp } from 'react-icons/fa6';
import { useContent } from '../content/ContentContext';
import './SponsorsSection.css';

const benefits = [
  {
    icon: FiUsers,
    title: 'Visibilidade',
    text: 'Exponha sua marca para milhares de pessoas no maior evento da região.',
  },
  {
    icon: FaHandshake,
    title: 'Networking',
    text: 'Conecte-se com clientes em potencial e fortaleça sua presença no mercado.',
  },
  {
    icon: FiZap,
    title: 'Ativação',
    text: 'Oportunidades exclusivas de ativação de marca dentro do camarote.',
  },
];

export default function SponsorsSection() {
  const { sponsors, event } = useContent();
  return (
    <section id="parceiros" className="sponsors section" aria-labelledby="parceiros-title">
      <div className="container">
        <header className="section-head section-head--center reveal">
          <span className="eyebrow">Quem faz acontecer</span>
          <h2 id="parceiros-title">
            Nossos <span className="text-gradient">patrocinadores</span>
          </h2>
          <p>Marcas que fazem parte da história do {event.name}.</p>
        </header>

        <ul className="sponsors__wall reveal" role="list">
          {sponsors.map((s) => (
            <li key={s.id}>
              <img src={s.src} alt={s.name} loading="lazy" decoding="async" style={{ '--logo-scale': s.scale }} />
            </li>
          ))}
        </ul>

        <div className="partner reveal">
          <div className="partner__intro">
            <span className="eyebrow">Seja um parceiro</span>
            <h3>Junte sua marca ao Camarote PMD e faça parte dessa história.</h3>
            <p>
              Fale com nossa equipe comercial e conheça as cotas de patrocínio disponíveis para o{' '}
              {event.edition}.
            </p>
            <a href={event.commercialWhatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp btn--lg">
              <FaWhatsapp aria-hidden="true" />
              Falar com o comercial
            </a>
          </div>

          <ul className="partner__benefits" role="list">
            {benefits.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon aria-hidden="true" />
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
