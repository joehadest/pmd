import React from 'react';
import { Link } from 'react-scroll';
import { FaTicketAlt, FaClock, FaCalendarAlt, FaInstagram } from 'react-icons/fa';
import './TicketsSection.css';

const TicketsSection = () => {
  return (
    <section id="ingressos" className="tickets-section section">
      <div className="container">
        {/* Título da Seção */}
        <div className="section-title animate-fadeInUp">
          <h2>Ingressos</h2>
          <p className="section-subtitle">
            Garanta seu lugar no Camarote PMD 2026
          </p>
        </div>

        {/* Card de Ingresso */}
        <div className="tickets-container">
          <div className="ticket-card main-ticket animate-fadeInUp">
            {/* Badge de Pré-venda */}
            <div className="ticket-badge">Pré-venda Ativa</div>

            {/* Cabeçalho */}
            <div className="ticket-header">
              <FaTicketAlt className="ticket-icon" />
              <h3 className="ticket-title">
                PRÉ VENDA - CAMAROTE PMD
              </h3>
              <p className="ticket-subtitle">Sábado e Domingo</p>
            </div>

            {/* Preço */}
            <div className="ticket-price">
              <div className="price-main">
                <span className="currency">R$</span>
                <span className="amount">230</span>
                <span className="cents">,00</span>
              </div>
              <div className="price-fee">
                + R$ 23,00 (taxa online)
              </div>
              <div className="price-total">
                Total: <strong>R$ 253,00</strong>
              </div>
            </div>

            {/* Informações do Ingresso */}
            <div className="ticket-info">
              <div className="info-row">
                <FaCalendarAlt />
                <span>28 e 29 de Março de 2026</span>
              </div>
              <div className="info-row">
                <FaClock />
                <span>Encerra em 28/03/2026 às 23:59</span>
              </div>
            </div>

            {/* Descrição */}
            <div className="ticket-description">
              <ul className="ticket-features">
                <li>✓ 2 DIAS de Open Bar</li>
                <li>✓ Atrações Exclusivas</li>
                <li>✓ Segurança Total</li>
                <li>✓ Vista Privilegiada dos Trios</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="ticket-cta">
              <a 
                href="https://outgo.com.br/camarotepmd2026"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Comprar Ingresso Online
              </a>
              <p className="ticket-note">
                Ou compre pessoalmente em nossos pontos de venda físicos
              </p>
              <Link
                to="pontos-de-venda"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="btn btn-secondary"
              >
                Ver Pontos de Venda Físicos
              </Link>
            </div>
          </div>

          {/* Cards de Informações Adicionais */}
          <div className="info-cards">
            <div className="info-card animate-fadeInUp">
              <FaInstagram className="info-card-icon" />
              <h4>Siga-nos</h4>
              <p>Acompanhe as novidades no Instagram</p>
              <a href="https://instagram.com/podemangardeu" className="info-link" target="_blank" rel="noopener noreferrer">
                @podemangardeu
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TicketsSection;

