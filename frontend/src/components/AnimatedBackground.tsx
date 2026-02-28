import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface GridLine {
  x: number;
  y: number;
  horizontal: boolean;
  opacity: number;
  speed: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Create stars
    const stars: Star[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.7 + 0.1,
      speed: Math.random() * 0.3 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Create energy grid lines
    const gridLines: GridLine[] = [];
    const gridSpacing = 80;
    for (let x = 0; x < 2000; x += gridSpacing) {
      gridLines.push({ x, y: 0, horizontal: false, opacity: Math.random() * 0.08 + 0.02, speed: 0 });
    }
    for (let y = 0; y < 1200; y += gridSpacing) {
      gridLines.push({ x: 0, y, horizontal: true, opacity: Math.random() * 0.08 + 0.02, speed: 0 });
    }

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw energy grid
      ctx.lineWidth = 0.5;
      gridLines.forEach((line) => {
        const pulse = Math.sin(time * 0.5 + line.x * 0.01 + line.y * 0.01) * 0.03 + line.opacity;
        ctx.strokeStyle = `rgba(0, 180, 255, ${Math.max(0, pulse)})`;
        ctx.beginPath();
        if (line.horizontal) {
          ctx.moveTo(0, line.y);
          ctx.lineTo(canvas.width, line.y);
        } else {
          ctx.moveTo(line.x, 0);
          ctx.lineTo(line.x, canvas.height);
        }
        ctx.stroke();
      });

      // Draw stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.4 + 0.6;
        const opacity = star.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 230, 255, ${opacity})`;
        ctx.fill();

        // Occasional bright star with glow
        if (star.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3);
          gradient.addColorStop(0, `rgba(150, 200, 255, ${opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(150, 200, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      // Subtle energy pulse in center
      const pulseRadius = 200 + Math.sin(time * 0.5) * 30;
      const centerGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, pulseRadius
      );
      centerGradient.addColorStop(0, 'rgba(0, 150, 255, 0.03)');
      centerGradient.addColorStop(1, 'rgba(0, 150, 255, 0)');
      ctx.fillStyle = centerGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}
