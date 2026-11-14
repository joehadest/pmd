import { FiArrowUpRight, FiClock, FiCreditCard, FiGlobe, FiMapPin, FiNavigation } from 'react-icons/fi';
import { useContent } from '../content/ContentContext';
import './SalesPointsSection.css';

const mapsUrl = (store, city, state) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${store.address}, ${city} - ${state}`)}`;

export default function SalesPointsSection() {
  const { salesPoints, event } = useContent();

  return (
    <section id="pontos-de-venda" className="sales section" aria-labelledby="pontos-title">
      <div className="container">
        <header className="section-head section-head--center reveal">
          <span className="eyebrow">Compra presencial</span>
          <h2 id="pontos-title">
            Pontos de <span className="text-gradient">venda</span>
          </h2>
          <p>Garanta seu ingresso pessoalmente em uma de nossas lojas parceiras.</p>
        </header>

        <div className="sales__cities">
          {salesPoints.map(({ city, stores }) => (
            <div key={city} className="sales__city reveal" style={{ '--n': stores.length }}>
              <h3>
                <FiMapPin aria-hidden="true" />
                {city}
                <span>{event.state}</span>
              </h3>

              <ul className="sales__stores" role="list">
                {stores.map((store) => (
                  <li key={store.id} className="store">
                    <h4>{store.name}</h4>
                    <p>
                      <FiMapPin aria-hidden="true" />
                      {store.address}
                    </p>
                    <p>
                      <FiClock aria-hidden="true" />
                      {store.hours}
                    </p>
                    <a href={mapsUrl(store, city, event.state)} target="_blank" rel="noopener noreferrer" className="store__map">
                      <FiNavigation aria-hidden="true" /> Como chegar
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ul className="sales__info reveal" role="list">
          <li>
            <FiCreditCard aria-hidden="true" />
            <div>
              <strong>Formas de pagamento</strong>
              <span>Consulte as opções disponíveis em cada ponto de venda.</span>
            </div>
          </li>
          <li>
            <FiGlobe aria-hidden="true" />
            <div>
              <strong>Prefere comprar online?</strong>
              <a href={event.ticketsUrl} target="_blank" rel="noopener noreferrer">
                {event.ticketsUrlLabel} <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
