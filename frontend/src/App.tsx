import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import ProductShowcase from './components/ProductShowcase';
import SavingsCalculator from './components/SavingsCalculator';
import ContactFooter from './components/ContactFooter';

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.1 0 0)' }}>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ProductShowcase />
        <SavingsCalculator />
      </main>
      <ContactFooter />
    </div>
  );
}
