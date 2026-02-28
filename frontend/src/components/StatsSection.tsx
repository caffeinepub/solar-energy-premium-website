import { useRef } from 'react';
import { Zap, Leaf, Home, Award } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  target: number;
  suffix: string;
  decimals?: number;
  description: string;
  color: 'blue' | 'gold';
  trigger: boolean;
  delay?: number;
}

function StatCard({ icon, label, target, suffix, decimals = 0, description, color, trigger }: StatCardProps) {
  const count = useCountUp({ target, duration: 2500, trigger, decimals });

  return (
    <div
      className={`glass-card p-6 sm:p-8 rounded-2xl product-card-hover ${
        color === 'blue' ? 'product-card-hover' : 'product-card-hover-gold'
      } group`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
        color === 'blue'
          ? 'bg-electric-blue/10 border border-electric-blue/30'
          : 'bg-solar-gold/10 border border-solar-gold/30'
      }`}>
        <div className={color === 'blue' ? 'text-electric-blue' : 'text-solar-gold'}>
          {icon}
        </div>
      </div>
      <div className={`text-4xl sm:text-5xl font-black font-orbitron mb-2 ${
        color === 'blue' ? 'gradient-text-blue' : 'gradient-text-gold'
      }`}>
        {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}
      </div>
      <div className="text-white font-semibold text-lg mb-1">{label}</div>
      <div className="text-white/50 text-sm leading-relaxed">{description}</div>
    </div>
  );
}

export default function StatsSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const stats = [
    {
      icon: <Zap className="w-6 h-6" />,
      label: 'Energy Saved',
      target: 12500,
      suffix: ' MWh',
      description: 'Total clean energy generated across all installations',
      color: 'blue' as const,
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      label: 'CO₂ Reduced',
      target: 8750,
      suffix: ' tons',
      description: 'Carbon emissions prevented from entering the atmosphere',
      color: 'gold' as const,
    },
    {
      icon: <Home className="w-6 h-6" />,
      label: 'Homes Powered',
      target: 3200,
      suffix: '+',
      description: 'Residential and commercial properties running on solar',
      color: 'blue' as const,
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: 'Years of Excellence',
      target: 15,
      suffix: ' yrs',
      description: 'Delivering premium solar solutions since 2010',
      color: 'gold' as const,
    },
  ];

  return (
    <section
      id="stats"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, oklch(0.1 0 0) 0%, oklch(0.12 0.01 260) 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 energy-grid-bg opacity-30 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, oklch(0.72 0.18 220 / 40%), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-16 section-fade-in ${isInView ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 border-electric-blue/30">
            <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-orbitron">
              Impact Metrics
            </span>
          </div>
          <h2 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Our <span className="gradient-text-mixed">Impact</span> in Numbers
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Real results from real installations. Every number represents a step toward a cleaner, more sustainable future.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`section-fade-in ${isInView ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <StatCard {...stat} trigger={isInView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
