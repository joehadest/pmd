import React from 'react';
import { FaCocktail, FaMusic, FaShieldAlt, FaEye, FaStar } from 'react-icons/fa';
import './AboutSection.css';

const AboutSection = () => {
  const benefits = [
    {
      icon: <FaCocktail />,
      title: 'Open Bar',
      description: '2 dias de bebidas liberadas para você curtir sem preocupação'
    },
    {
      icon: <FaMusic />,
      title: 'Atrações',
      description: 'As melhores atrações e DJs para animar seu carnaval'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Segurança',
      description: 'Ambiente seguro e controlado com equipe especializada'
    },
    {
      icon: <FaEye />,
      title: 'Vista Privilegiada',
      description: 'Melhor visão dos trios elétricos e de toda a festa'
    }
  ];

  return (
    <section id="sobre" className="about-section section">
      <div className="container">
        {/* Título da Seção */}
        <div className="section-title animate-fadeInUp">
          <h2>Sobre o Camarote PMD</h2>
          <p className="section-subtitle">
            Uma tradição que atravessa gerações
          </p>
        </div>

        {/* História do Bloco */}
        <div className="about-content">
          <div className="about-history animate-fadeInUp">
            <div className="history-text">
              <h3>
                <FaStar className="star-icon" />
                Tradição desde 2007
              </h3>
              <p>
                Desde 2007, o <strong>Bloco Pode Mangar Deu</strong> faz mais do que 
                sair na avenida: ele escreve história. Ano após ano, o PMD se tornou 
                parte viva da identidade do Alto Folia, levando alegria, encontros, 
                memórias e aquela energia que só quem vive o Alto Folia de verdade 
                consegue explicar.
              </p>
              <p>
                São quase duas décadas de cores, sorrisos, amizades fortalecidas e 
                uma conexão genuína com o povo. O Pode Mangar Deu não é apenas um bloco, 
                é <strong>tradição</strong>, é <strong>pertencimento</strong>, é 
                <strong> emoção</strong> que atravessa gerações e abrilhanta o Alto Folia 
                desde os seus primeiros passos.
              </p>
            </div>
          </div>

          {/* Novidade 2026 */}
          <div className="about-highlight animate-fadeInUp">
            <div className="highlight-badge">Novidade 2026</div>
            <h3>O Novo Camarote PMD</h3>
            <p>
              E é com esse legado que seguimos em frente, olhando para o futuro sem 
              esquecer nossas raízes. Hoje, damos um novo passo nessa história, 
              anunciando oficialmente o lançamento do <strong>Camarote PMD 2026</strong>:
            </p>
            <p className="highlight-description">
              Uma nova estrutura, pensada em cada detalhe, para oferecer ainda mais 
              conforto, segurança e uma experiência inesquecível aos nossos foliões. 
              <strong> Mais espaço</strong>, <strong>melhor visibilidade</strong> e 
              um ambiente EXTRA preparado para você curtir o Alto Folia do jeito que merece.
            </p>
          </div>
        </div>

        {/* Benefícios - Cards */}
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="benefit-card animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <h4 className="benefit-title">{benefit.title}</h4>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Inclusões */}
        <div className="about-includes animate-fadeInUp">
          <h3>O que está incluído:</h3>
          <ul className="includes-list">
            <li>
              <span className="check-icon">✓</span>
              <span>1 Pulseira de acesso ao Camarote PMD</span>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <span>1 Abadá oficial do Bloco Pode Mangar Deu</span>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <span>Open Bar completo durante os 2 dias</span>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <span>Acesso a área VIP com vista privilegiada</span>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <span>Segurança exclusiva e ambiente controlado</span>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <span>Banheiros privativos e estrutura completa</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Background Decorativo */}
      <div className="about-decoration"></div>
    </section>
  );
};

export default AboutSection;

