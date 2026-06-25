"use client";

import { useEffect, useRef } from "react";

export default function SnowfallBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; r: number; d: number; color: string }[] = [];
    const maxParticles = 60; // "a little bit snow fall"
    let W = window.innerWidth;
    let H = window.innerHeight;

    const colors = [
      "rgba(248, 250, 252, 0.4)", // text-foreground
      "rgba(56, 189, 248, 0.3)",  // accent-cyan
      "rgba(139, 92, 246, 0.3)",  // accent-purple
    ];

    const setCanvasSize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2 + 0.5,
        d: Math.random() * maxParticles,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      
      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        ctx.fill();
      }
      
      update();
    };

    const update = () => {
      angle += 0.01;
      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];
        
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 1;

        if (p.x > W + 5 || p.x < -5 || p.y > H) {
          if (i % 3 > 0) {
            particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d, color: p.color };
          } else {
            if (Math.sin(angle) > 0) {
              particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d, color: p.color };
            } else {
              particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d, color: p.color };
            }
          }
        }
      }
    };

    let animationId: number;
    const loop = () => {
      draw();
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  );
}
