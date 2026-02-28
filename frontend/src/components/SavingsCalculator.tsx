import { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, Leaf, Zap } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(200);
  const [panelCount, setPanelCount] = useState(20);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const calculations = useMemo(() => {
    // Solar offset ratio based on panel count (each 450W panel, ~5 peak sun hours)
    const dailyKwh = panelCount * 0.45 * 5;
    const monthlyKwh = dailyKwh * 30;
    const avgCostPerKwh = 0.14; // $0.14/kWh average
    const monthlySavings = Math.min(monthlyBill * 0.85, monthlyKwh * avgCostPerKwh);
    const annualSavings = monthlySavings * 12;
    const co2PerKwh = 0.386; // kg CO2 per kWh (US average)
    const annualCo2 = (monthlyKwh * 12 * co2PerKwh) / 1000; // tons
    const paybackYears = (panelCount * 450 * 2.8) / annualSavings; // ~$2.80/W installed cost
    const savingsPercent = Math.min(Math.round((monthlySavings / monthlyBill) * 100), 100);

    return {
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      co2: annualCo2.toFixed(1),
      payback: paybackYears.toFixed(1),
      savingsPercent,
      systemSize: (panelCount * 0.45).toFixed(1),
    };
  }, [monthlyBill, panelCount]);

  const SliderInput = ({
    label,
    value,
    min,
    max,
    step,
    onChange,
    formatValue,
    color,
  }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (v: number) => void;
    formatValue: (v: number) => string;
    color: 'blue' | 'gold';
  }) => {
    const percent = ((value - min) / (max - min)) * 100;
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-white/70 text-sm font-medium">{label}</label>
          <span className={`font-orbitron font-bold text-lg ${color === 'blue' ? 'text-electric-blue' : 'text-solar-gold'}`}>
            {formatValue(value)}
          </span>
        </div>
        <div className="relative">
          <div className="w-full h-2 rounded-full" style={{ background: 'oklch(0.25 0 0)' }}>
            <div
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: `${percent}%`,
                background: color === 'blue'
                  ? 'linear-gradient(90deg, oklch(0.72 0.18 220), oklch(0.65 0.2 240))'
                  : 'linear-gradient(90deg, oklch(0.75 0.2 70), oklch(0.82 0.18 85))',
              }}
            />
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="slider-custom absolute inset-0 opacity-0 cursor-pointer"
            style={{ height: '100%', top: 0 }}
          />
          {/* Thumb indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white/30 transition-all duration-150 pointer-events-none"
            style={{
              left: `calc(${percent}% - 10px)`,
              background: color === 'blue'
                ? 'linear-gradient(135deg, oklch(0.72 0.18 220), oklch(0.65 0.2 240))'
                : 'linear-gradient(135deg, oklch(0.82 0.18 85), oklch(0.75 0.2 70))',
              boxShadow: color === 'blue'
                ? '0 0 10px oklch(0.72 0.18 220 / 60%)'
                : '0 0 10px oklch(0.82 0.18 85 / 60%)',
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/30 font-orbitron">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="calculator"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, oklch(0.1 0 0) 0%, oklch(0.12 0.01 260) 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 energy-grid-bg opacity-20 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, oklch(0.72 0.18 220), oklch(0.82 0.18 85))' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-16 section-fade-in ${isInView ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 border-electric-blue/30">
            <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-orbitron">
              Savings Calculator
            </span>
          </div>
          <h2 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Calculate Your <span className="gradient-text-blue">Savings</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Discover how much you could save by switching to solar energy. Adjust the sliders to match your situation.
          </p>
        </div>

        <div className={`section-fade-in ${isInView ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <div className="glass-card rounded-3xl p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Sliders */}
              <div className="space-y-10">
                <div>
                  <h3 className="font-orbitron font-bold text-white text-xl mb-8 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-electric-blue" />
                    Your Energy Profile
                  </h3>
                  <div className="space-y-10">
                    <SliderInput
                      label="Monthly Electricity Bill"
                      value={monthlyBill}
                      min={50}
                      max={500}
                      step={10}
                      onChange={setMonthlyBill}
                      formatValue={(v) => `$${v}`}
                      color="blue"
                    />
                    <SliderInput
                      label="Number of Solar Panels"
                      value={panelCount}
                      min={5}
                      max={50}
                      step={1}
                      onChange={setPanelCount}
                      formatValue={(v) => `${v} panels`}
                      color="gold"
                    />
                  </div>
                </div>

                {/* System info */}
                <div className="glass-card-gold rounded-xl p-4 space-y-2">
                  <div className="text-xs text-white/40 font-orbitron tracking-wider uppercase">System Configuration</div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">System Size</span>
                    <span className="text-solar-gold font-bold font-orbitron">{calculations.systemSize} kW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">Bill Offset</span>
                    <span className="text-solar-gold font-bold font-orbitron">{calculations.savingsPercent}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">Est. Payback</span>
                    <span className="text-solar-gold font-bold font-orbitron">{calculations.payback} years</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <h3 className="font-orbitron font-bold text-white text-xl flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-solar-gold" />
                  Your Estimated Savings
                </h3>

                {/* Main savings cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card rounded-2xl p-5 border-electric-blue/20">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-4 h-4 text-electric-blue" />
                      <span className="text-white/60 text-xs font-orbitron tracking-wider uppercase">Monthly</span>
                    </div>
                    <div className="text-3xl font-black font-orbitron gradient-text-blue">
                      ${calculations.monthlySavings}
                    </div>
                    <div className="text-white/40 text-xs mt-1">per month saved</div>
                  </div>

                  <div className="glass-card-gold rounded-2xl p-5 border-solar-gold/20">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-solar-gold" />
                      <span className="text-white/60 text-xs font-orbitron tracking-wider uppercase">Annual</span>
                    </div>
                    <div className="text-3xl font-black font-orbitron gradient-text-gold">
                      ${calculations.annualSavings.toLocaleString()}
                    </div>
                    <div className="text-white/40 text-xs mt-1">per year saved</div>
                  </div>
                </div>

                {/* CO2 card */}
                <div className="glass-card rounded-2xl p-5 border-electric-blue/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Leaf className="w-4 h-4 text-electric-blue" />
                    <span className="text-white/60 text-xs font-orbitron tracking-wider uppercase">Environmental Impact</span>
                  </div>
                  <div className="flex items-end gap-3">
                    <div className="text-3xl font-black font-orbitron gradient-text-blue">
                      {calculations.co2}
                    </div>
                    <div className="text-white/60 text-sm mb-1">tons CO₂ offset/year</div>
                  </div>
                  <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: 'oklch(0.25 0 0)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(parseFloat(calculations.co2) * 10, 100)}%`,
                        background: 'linear-gradient(90deg, oklch(0.72 0.18 220), oklch(0.65 0.15 160))',
                      }}
                    />
                  </div>
                </div>

                {/* 25-year projection */}
                <div className="glass-card-gold rounded-2xl p-5">
                  <div className="text-white/60 text-xs font-orbitron tracking-wider uppercase mb-2">25-Year Projection</div>
                  <div className="text-4xl font-black font-orbitron gradient-text-gold">
                    ${(calculations.annualSavings * 25).toLocaleString()}
                  </div>
                  <div className="text-white/40 text-xs mt-1">total lifetime savings</div>
                </div>

                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full btn-gold py-4 rounded-xl font-orbitron font-bold text-sm tracking-wider"
                >
                  Get Your Free Quote →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
