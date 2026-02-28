import { useInView } from '../hooks/useInView';
import ProductCard from './ProductCard';

const products = [
  {
    image: '/assets/generated/product-panel-1.dim_600x400.png',
    name: 'SolarPeak Pro X1',
    description: 'Premium monocrystalline panel with advanced anti-reflective coating for maximum light absorption in all conditions.',
    spec: '450W',
    specLabel: 'Peak Power',
    badge: 'Best Seller',
    glowColor: 'blue' as const,
  },
  {
    image: '/assets/generated/product-panel-2.dim_600x400.png',
    name: 'Eclipse Elite Series',
    description: 'All-black aesthetic meets industry-leading efficiency. Perfect for premium residential installations.',
    spec: '23.4%',
    specLabel: 'Efficiency',
    badge: 'Premium',
    glowColor: 'gold' as const,
  },
  {
    image: '/assets/generated/product-panel-3.dim_600x400.png',
    name: 'TerraMax Commercial',
    description: 'Large-format commercial panels engineered for utility-scale deployments with superior durability.',
    spec: '600W',
    specLabel: 'Peak Power',
    badge: 'Commercial',
    glowColor: 'blue' as const,
  },
  {
    image: '/assets/generated/product-panel-4.dim_600x400.png',
    name: 'BiFacial Quantum',
    description: 'Dual-sided bifacial technology captures reflected light for up to 30% more energy generation.',
    spec: '+30%',
    specLabel: 'Yield Boost',
    badge: 'New Tech',
    glowColor: 'gold' as const,
  },
];

export default function ProductShowcase() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="products"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, oklch(0.12 0.01 260) 0%, oklch(0.1 0 0) 100%)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, oklch(0.82 0.18 85), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, oklch(0.72 0.18 220), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-16 section-fade-in ${isInView ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 border-solar-gold/30">
            <span className="text-xs font-semibold tracking-widest text-solar-gold uppercase font-orbitron">
              Product Lineup
            </span>
          </div>
          <h2 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Premium <span className="gradient-text-gold">Solar Panels</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Engineered for peak performance. Each panel is crafted with aerospace-grade materials
            and backed by our industry-leading 25-year warranty.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div
              key={product.name}
              className={`section-fade-in ${isInView ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 section-fade-in ${isInView ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary px-10 py-4 rounded-xl font-orbitron font-bold text-sm tracking-wider inline-flex items-center gap-2"
          >
            Request Custom Quote
            <span className="text-solar-gold">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
