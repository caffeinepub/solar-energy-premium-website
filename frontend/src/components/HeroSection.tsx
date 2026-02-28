import { useRef } from 'react';
import { ChevronDown, ArrowRight, Sun, Zap } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import Solar3DModel from './Solar3DModel';

export default function HeroSection() {
  const scrollToStats = () => {
    document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, oklch(0.08 0.01 260) 0%, oklch(0.1 0 0) 50%, oklch(0.09 0.02 240) 100%)' }}
    >
      {/* Animated background */}
      <AnimatedBackground />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 70% 50%, oklch(0.72 0.18 220 / 8%) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 30% 60%, oklch(0.82 0.18 85 / 5%) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-8 py-12 lg:py-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full w-fit border-electric-blue/30">
              <Sun className="w-4 h-4 text-solar-gold" />
              <span className="text-xs font-semibold tracking-widest text-white/70 uppercase font-orbitron">
                Premium Solar Solutions
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="font-orbitron font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight">
                <span className="text-white">Power Your</span>
                <br />
                <span className="gradient-text-mixed">Future</span>
                <br />
                <span className="text-white">with Clean</span>
                <br />
                <span className="gradient-text-gold">Solar Energy</span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed max-w-lg font-inter">
              Harness the infinite power of the sun with our cutting-edge photovoltaic systems.
              Premium efficiency, zero emissions, maximum savings.
            </p>

            {/* Stats preview */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
                <span className="text-sm text-white/60">
                  <span className="text-electric-blue font-bold">500+</span> Installations
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-solar-gold animate-pulse" />
                <span className="text-sm text-white/60">
                  <span className="text-solar-gold font-bold">25yr</span> Warranty
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
                <span className="text-sm text-white/60">
                  <span className="text-electric-blue font-bold">99.8%</span> Uptime
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToContact}
                className="btn-gold px-8 py-4 rounded-xl font-orbitron font-bold text-sm tracking-wider flex items-center gap-2 group"
              >
                Request Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
                className="glass-card px-8 py-4 rounded-xl font-orbitron font-semibold text-sm tracking-wider text-white/80 hover:text-white flex items-center gap-2 group transition-all duration-300 hover:border-electric-blue/50"
              >
                <Zap className="w-4 h-4 text-electric-blue" />
                View Products
              </button>
            </div>
          </div>

          {/* 3D Model */}
          <div className="relative flex items-center justify-center h-[400px] sm:h-[500px] lg:h-[600px]">
            {/* Glow backdrop */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, oklch(0.82 0.18 85) 0%, oklch(0.72 0.18 220) 50%, transparent 70%)',
              }}
            />
            <Solar3DModel />

            {/* Floating info cards */}
            <div className="absolute top-8 right-0 glass-card px-4 py-3 rounded-xl animate-float" style={{ animationDelay: '0s' }}>
              <div className="text-xs text-white/50 font-orbitron tracking-wider">EFFICIENCY</div>
              <div className="text-xl font-bold text-solar-gold font-orbitron">23.4%</div>
            </div>
            <div className="absolute bottom-12 left-0 glass-card px-4 py-3 rounded-xl animate-float" style={{ animationDelay: '2s' }}>
              <div className="text-xs text-white/50 font-orbitron tracking-wider">OUTPUT</div>
              <div className="text-xl font-bold text-electric-blue font-orbitron">450W</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToStats}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors group"
      >
        <span className="text-xs font-orbitron tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}
