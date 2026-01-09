import React, { useRef, useEffect } from 'react';
import { Particle, ShapeType } from '../types';

interface BackgroundProps {
  isDarkMode: boolean;
}

export const Background: React.FC<BackgroundProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX - window.innerWidth / 2) * 0.02,
        y: (e.clientY - window.innerHeight / 2) * 0.02
      };
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(window.innerWidth / 15, 60); 
      const shapes: ShapeType[] = ['circle', 'square', 'triangle', 'cross'];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 8 + 4,
          alpha: Math.random() * 0.15 + 0.05,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          type: shapes[Math.floor(Math.random() * shapes.length)]
        });
      }
    };

    const drawShape = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      
      // Theme aware color
      if (isDarkMode) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${p.alpha})`;
      } else {
        ctx.strokeStyle = `rgba(0, 0, 0, ${p.alpha * 0.8})`; // Slightly darker for visibility on light bg
      }
      
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      switch (p.type) {
        case 'circle':
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          break;
        case 'square':
          ctx.rect(-p.size, -p.size, p.size * 2, p.size * 2);
          break;
        case 'triangle':
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size, p.size);
          ctx.lineTo(-p.size, p.size);
          ctx.closePath();
          break;
        case 'cross':
          ctx.moveTo(-p.size, 0);
          ctx.lineTo(p.size, 0);
          ctx.moveTo(0, -p.size);
          ctx.lineTo(0, p.size);
          break;
      }

      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;

        const parallaxX = p.x + mouseRef.current.x * (p.size * 0.1);
        const parallaxY = p.y + mouseRef.current.y * (p.size * 0.1);

        const renderParticle = { ...p, x: parallaxX, y: parallaxY };
        drawShape(ctx, renderParticle);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]); // Re-run effect when theme changes

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};