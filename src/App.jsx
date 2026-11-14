import Header from './components/Header';
import HeroSection from './components/HeroSection';
import VideoSection from './components/VideoSection';
import LineUpSection from './components/LineUpSection';
import OpenBarSection from './components/OpenBarSection';
import StructureSection from './components/StructureSection';
import TicketsSection from './components/TicketsSection';
import SalesPointsSection from './components/SalesPointsSection';
import InstagramSection from './components/InstagramSection';
import SponsorsSection from './components/SponsorsSection';
import PousadaCentralSection from './components/PousadaCentralSection';
import Footer from './components/Footer';
import { ContentProvider, useContent } from './content/ContentContext';

/** Seções na ordem do site; cada uma pode ser desligada pelo painel admin. */
const SECTIONS = [
  ['video', VideoSection],
  ['lineup', LineUpSection],
  ['openbar', OpenBarSection],
  ['structure', StructureSection],
  ['tickets', TicketsSection],
  ['sales', SalesPointsSection],
  ['instagram', InstagramSection],
  ['sponsors', SponsorsSection],
  ['pousada', PousadaCentralSection],
];

function Site() {
  const { sections, tickets } = useContent();

  return (
    <>
      {sections.tickets && tickets.options.length > 0 && (
        <a className="skip-link" href="#ingressos">
          Pular para ingressos
        </a>
      )}
      <Header />
      <main>
        <HeroSection />
        {SECTIONS.map(([key, Section]) => sections[key] && <Section key={key} />)}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <Site />
    </ContentProvider>
  );
}
