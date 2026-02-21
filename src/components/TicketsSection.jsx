import React from 'react';
import { Link } from 'react-scroll';
import { FaTicketAlt, FaInstagram } from 'react-icons/fa';
import './TicketsSection.css';

const TicketsSection = () => {
  return (
    <section id="ingressos" className="tickets-section section">
      <div className="container">
        {/* Título da Seção */}
        <div className="section-title animate-fadeInUp">
          <h2>Ingressos</h2>
          <p className="section-subtitle">
            As primeiras vendas do bloco já encerraram! Agora vamos para uma nova etapa.
          </p>
        </div>

        {/* Badge 1º Lote */}
        <div className="ticket-lote-badge-wrapper animate-fadeInUp">
          <div className="ticket-lote-badge">1º LOTE LIBERADO!</div>
        </div>

        {/* Cards de Ingresso */}
        <div className="tickets-container tickets-grid">
          <div className="ticket-card animate-fadeInUp">
            <div className="ticket-header">
              <FaTicketAlt className="ticket-icon" />
              <h3 className="ticket-title">Casadinha</h3>
              <p className="ticket-subtitle">2 pessoas · Sábado e Domingo</p>
            </div>

            <div className="ticket-price">
              <div className="price-main">
                <span className="currency">R$</span>
                <span className="amount">420</span>
                <span className="cents">,00</span>
              </div>
            </div>

            <div className="ticket-description">
              <ul className="ticket-features">
                <li>✓ 2 Abadas +</li>
                <li>✓ 2 DIAS de Open Bar +</li>
                <li>✓ Atrações Exclusivas +</li>
                <li>✓ Segurança Privada +</li>
                <li>✓ Vista Privilegiada dos Trios!</li>
              </ul>
            </div>

            <div className="ticket-cta">
              <a 
                href="https://outgo.com.br/camarotepmd2026"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Comprar Casadinha
              </a>
            </div>
          </div>

          <div className="ticket-card animate-fadeInUp">
            <div className="ticket-header">
              <FaTicketAlt className="ticket-icon" />
              <h3 className="ticket-title">Individual</h3>
              <p className="ticket-subtitle">1 pessoa · Sábado e Domingo</p>
            </div>

            <div className="ticket-price">
              <div className="price-main">
                <span className="currency">R$</span>
                <span className="amount">250</span>
                <span className="cents">,00</span>
              </div>
            </div>

            <div className="ticket-description">
              <ul className="ticket-features">
                <li>✓ 1 Abada +</li>
                <li>✓ 2 DIAS de Open Bar +</li>
                <li>✓ Atrações Exclusivas +</li>
                <li>✓ Segurança Privada +</li>
                <li>✓ Vista Privilegiada dos Trios!</li>
              </ul>
            </div>

            <div className="ticket-cta">
              <a 
                href="https://outgo.com.br/camarotepmd2026"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Comprar Individual
              </a>
            </div>
          </div>
        </div>

        {/* Nota de validade do lote */}
        <p className="ticket-lote-note animate-fadeInUp">
          Lote válido até 05 de março ou enquanto durar!
        </p>

        <div className="tickets-container">
          <div className="ticket-cta-secondary animate-fadeInUp">
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

