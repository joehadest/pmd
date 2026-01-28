import React, { useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import VideoSection from './components/VideoSection';
import LineUpSection from './components/LineUpSection';
import TicketsSection from './components/TicketsSection';
import SalesPointsSection from './components/SalesPointsSection';
import InstagramSection from './components/InstagramSection';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Adiciona classe para controlar visibilidade do botão scroll-to-top
    const handleScroll = () => {
      if (window.scrollY > 300) {
        document.body.classList.remove('at-top');
      } else {
        document.body.classList.add('at-top');
      }
    };

    // Define estado inicial
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <VideoSection />
        <LineUpSection />
        <TicketsSection />
        <SalesPointsSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;

