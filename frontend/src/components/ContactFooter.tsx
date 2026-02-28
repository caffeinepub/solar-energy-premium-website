import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { SiX, SiFacebook, SiLinkedin, SiInstagram, SiYoutube } from 'react-icons/si';
import { Zap } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function ContactFooter() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-electric-blue/60 focus:bg-white/8 transition-all duration-200';

  const appId = typeof window !== 'undefined' ? encodeURIComponent(window.location.hostname) : 'solarpeak-energy';

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Contact section */}
      <div
        className="relative py-24 sm:py-32"
        style={{ background: 'linear-gradient(180deg, oklch(0.12 0.01 260) 0%, oklch(0.08 0.01 260) 100%)' }}
      >
        {/* Background decoration */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, oklch(0.72 0.18 220 / 30%), transparent)' }}
        />
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-8 pointer-events-none"
          style={{ background: 'radial-gradient(circle, oklch(0.72 0.18 220), transparent)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 border-electric-blue/30">
              <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-orbitron">
                Get In Touch
              </span>
            </div>
            <h2 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              Start Your <span className="gradient-text-mixed">Solar Journey</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Ready to harness the power of the sun? Our experts are here to design the perfect solar solution for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-card rounded-3xl p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-electric-blue/10 border border-electric-blue/30 flex items-center justify-center animate-pulse-glow">
                    <CheckCircle className="w-8 h-8 text-electric-blue" />
                  </div>
                  <h3 className="font-orbitron font-bold text-white text-xl">Message Sent!</h3>
                  <p className="text-white/50 text-sm max-w-xs">
                    Thank you for reaching out. Our solar experts will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                    className="text-electric-blue text-sm font-orbitron hover:text-white transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-orbitron font-bold text-white text-xl mb-6">Request a Free Quote</h3>
                  <div>
                    <label className="block text-white/60 text-xs font-orbitron tracking-wider uppercase mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-orbitron tracking-wider uppercase mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-orbitron tracking-wider uppercase mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your energy needs, property size, and goals..."
                      required
                      rows={5}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-gold py-4 rounded-xl font-orbitron font-bold text-sm tracking-wider flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 space-y-5">
                <h3 className="font-orbitron font-bold text-white text-lg">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-electric-blue/10 border border-electric-blue/30 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-electric-blue" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs font-orbitron tracking-wider uppercase mb-1">Phone</div>
                      <div className="text-white font-medium">+1 (800) 765-2739</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-solar-gold/10 border border-solar-gold/30 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-solar-gold" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs font-orbitron tracking-wider uppercase mb-1">Email</div>
                      <div className="text-white font-medium">hello@solarpeak.energy</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-electric-blue/10 border border-electric-blue/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-electric-blue" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs font-orbitron tracking-wider uppercase mb-1">Address</div>
                      <div className="text-white font-medium">1 Solar Drive, Suite 400<br />San Francisco, CA 94105</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-orbitron font-bold text-white text-lg mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: <SiX className="w-4 h-4" />, label: 'X' },
                    { icon: <SiFacebook className="w-4 h-4" />, label: 'Facebook' },
                    { icon: <SiLinkedin className="w-4 h-4" />, label: 'LinkedIn' },
                    { icon: <SiInstagram className="w-4 h-4" />, label: 'Instagram' },
                    { icon: <SiYoutube className="w-4 h-4" />, label: 'YouTube' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white/50 hover:text-electric-blue hover:border-electric-blue/40 transition-all duration-200"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div className="glass-card-gold rounded-2xl p-6">
                <div className="text-white/40 text-xs font-orbitron tracking-wider uppercase mb-4">Why Choose SolarPeak?</div>
                <div className="space-y-3">
                  {[
                    '✓ Free site assessment & custom design',
                    '✓ Industry-leading 25-year warranty',
                    '✓ Certified installation team',
                    '✓ 24/7 monitoring & support',
                  ].map((item) => (
                    <div key={item} className="text-white/70 text-sm flex items-center gap-2">
                      <span className="text-solar-gold">{item.slice(0, 1)}</span>
                      <span>{item.slice(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div
        className="relative py-8"
        style={{ background: 'oklch(0.07 0.01 260)' }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, oklch(0.72 0.18 220 / 30%), oklch(0.82 0.18 85 / 30%), transparent)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-electric-blue to-solar-gold flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-orbitron font-bold text-sm gradient-text-mixed">SOLARPEAK ENERGY</span>
            </div>

            {/* Copyright */}
            <div className="text-white/30 text-xs text-center">
              © {new Date().getFullYear()} SolarPeak Energy. All rights reserved.
            </div>

            {/* Attribution */}
            <div className="text-white/30 text-xs flex items-center gap-1">
              Built with{' '}
              <span className="text-solar-gold">♥</span>{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-electric-blue hover:text-white transition-colors"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
