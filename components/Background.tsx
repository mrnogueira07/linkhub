import React, { useRef, useEffect } from 'react';

interface BackgroundProps {
  isDarkMode: boolean;
}

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const Background: React.FC<BackgroundProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Configurações da rede
    const particleCount = Math.min(Math.floor((width * height) / 10000), 100); // Ajusta densidade baseada na tela
    const connectionDistance = 150;
    const mouseDistance = 200;
    
    let particles: Point[] = [];
    let mouse = { x: -1000, y: -1000 }; // Mouse fora da tela inicialmente

    // Cores baseadas no modo
    const colors = isDarkMode 
      ? { particle: 'rgba(168, 85, 247, 0.6)', line: '168, 85, 247' } // Roxo Neon
      : { particle: 'rgba(107, 33, 168, 0.4)', line: '107, 33, 168' }; // Roxo Escuro

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.5, // Velocidade X
          vy: (Math.random() - 0.5) * 1.5  // Velocidade Y
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Atualiza e desenha partículas
      particles.forEach((p, index) => {
        // Movimento
        p.x += p.vx;
        p.y += p.vy;

        // Rebater nas bordas
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Desenhar o nó (ponto)
        ctx.beginPath();
        ctx.arc(p.x, p.y, isDarkMode ? 2 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();

        // Conexões com outras partículas
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${colors.line}, ${1 - distance / connectionDistance})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Conexões com o mouse
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouseDistance) {
          ctx.beginPath();
          // Linha um pouco mais grossa para o mouse
          ctx.strokeStyle = `rgba(${colors.line}, ${1 - distMouse / mouseDistance})`; 
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          
          // Efeito sutil de repulsão/interação se quiser:
          // if (distMouse < 50) { p.x += dxMouse * 0.01; p.y += dyMouse * 0.01; }
        }
      });

      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    init();
    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, [isDarkMode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};