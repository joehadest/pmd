import React, { useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import VideoSection from './components/VideoSection';
import LineUpSection from './components/LineUpSection';
import TicketsSection from './components/TicketsSection';
import SalesPointsSection from './components/SalesPointsSection';
import GallerySection from './components/GallerySection';
import LocationSection from './components/LocationSection';
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
        <AboutSection />
        <LineUpSection />
        <TicketsSection />
        <SalesPointsSection />
        <GallerySection />
        <LocationSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;

