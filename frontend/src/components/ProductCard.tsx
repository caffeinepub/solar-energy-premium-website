interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  spec: string;
  specLabel: string;
  badge?: string;
  glowColor?: 'blue' | 'gold';
}

export default function ProductCard({
  image,
  name,
  description,
  spec,
  specLabel,
  badge,
  glowColor = 'blue',
}: ProductCardProps) {
  return (
    <div
      className={`glass-card rounded-2xl overflow-hidden product-card-hover ${
        glowColor === 'gold' ? 'product-card-hover-gold' : ''
      } group cursor-pointer`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 sm:h-52">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badge */}
        {badge && (
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold font-orbitron tracking-wider ${
            glowColor === 'gold'
              ? 'bg-solar-gold/20 border border-solar-gold/50 text-solar-gold'
              : 'bg-electric-blue/20 border border-electric-blue/50 text-electric-blue'
          }`}>
            {badge}
          </div>
        )}

        {/* Spec overlay on image */}
        <div className="absolute bottom-3 left-3">
          <div className={`text-2xl font-black font-orbitron ${
            glowColor === 'gold' ? 'text-solar-gold' : 'text-electric-blue'
          }`}>
            {spec}
          </div>
          <div className="text-white/60 text-xs font-orbitron tracking-wider">{specLabel}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-orbitron font-bold text-white text-lg mb-2 group-hover:text-electric-blue transition-colors duration-300">
          {name}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-4">{description}</p>

        {/* Bottom action */}
        <div className="flex items-center justify-between">
          <button className={`text-xs font-semibold font-orbitron tracking-wider transition-all duration-300 ${
            glowColor === 'gold'
              ? 'text-solar-gold hover:text-white'
              : 'text-electric-blue hover:text-white'
          }`}>
            Learn More →
          </button>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            glowColor === 'gold'
              ? 'bg-solar-gold/10 border border-solar-gold/30 group-hover:bg-solar-gold/20'
              : 'bg-electric-blue/10 border border-electric-blue/30 group-hover:bg-electric-blue/20'
          }`}>
            <span className={`text-xs font-bold ${glowColor === 'gold' ? 'text-solar-gold' : 'text-electric-blue'}`}>+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
