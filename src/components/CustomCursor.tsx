"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [buttonRect, setButtonRect] = useState<{ width: number; height: number; left: number; top: number; radius: number } | null>(null);

  const activeInteractive = useRef<HTMLElement | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Premium spring configurations
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Trails setup
  const trailCount = 6;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const trails = Array.from({ length: trailCount }).map((_, i) => ({
    x: useSpring(cursorX, { damping: 20 + i * 4, stiffness: 400 - i * 30, mass: 0.4 + i * 0.1 }),
    y: useSpring(cursorY, { damping: 20 + i * 4, stiffness: 400 - i * 30, mass: 0.4 + i * 0.1 }),
  }));

  const [clickParticles, setClickParticles] = useState<{ id: number; x: number; y: number; angle: number }[]>([]);

  useEffect(() => {
    // Hide native cursor only on devices that have a precise pointer (mouse)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      
      const target = e.target as HTMLElement;
      // Define what elements are magnetic
      const interactive = target.closest('button, a, [role="button"], input[type="submit"], .magnetic-card');
      
      if (interactive) {
        setIsHovering(true);
        const rect = interactive.getBoundingClientRect();
        
        // Estimate border radius
        const computedStyle = window.getComputedStyle(interactive);
        let radius = 12;
        if (computedStyle.borderRadius && computedStyle.borderRadius !== '0px') {
          radius = parseInt(computedStyle.borderRadius);
        }

        setButtonRect({
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top,
          radius: isNaN(radius) ? 12 : radius
        });

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // 1. Move cursor towards the center (magnetic snap)
        cursorX.set(centerX + distanceX * 0.1);
        cursorY.set(centerY + distanceY * 0.1);

        // 2. Element follows cursor slightly
        if (activeInteractive.current !== interactive) {
          if (activeInteractive.current) {
            activeInteractive.current.style.transform = '';
          }
          activeInteractive.current = interactive as HTMLElement;
          activeInteractive.current.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }
        activeInteractive.current.style.transform = `translate(${distanceX * 0.15}px, ${distanceY * 0.15}px)`;

      } else {
        setIsHovering(false);
        setButtonRect(null);
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);

        // Reset element transform
        if (activeInteractive.current) {
          activeInteractive.current.style.transform = 'translate(0px, 0px)';
          activeInteractive.current = null;
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      // Spawn particles
      const newParticles = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        angle: (Math.PI * 2 * i) / 6,
      }));
      setClickParticles(prev => [...prev.slice(-12), ...newParticles]);
    };
    
    const handleMouseUp = () => setIsClicked(false);
    
    const handleMouseLeave = () => {
      setIsVisible(false);
      if (activeInteractive.current) {
        activeInteractive.current.style.transform = 'translate(0px, 0px)';
      }
    };
    
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  // Don't render on mobile/touch devices
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[9999] overflow-visible">
        {/* Trails */}
        {!isHovering && trails.map((trail, index) => (
          <motion.div
            key={index}
            className="fixed top-0 left-0 rounded-full bg-white will-change-transform"
            style={{
              x: trail.x,
              y: trail.y,
              width: 10 - index * 1.2,
              height: 10 - index * 1.2,
              opacity: 0.6 - index * 0.1,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        ))}

        {/* Main Glow */}
        <motion.div
          className="fixed top-0 left-0 rounded-full will-change-transform pointer-events-none mix-blend-normal blur-[40px]"
          style={{
            x: smoothX,
            y: smoothY,
            width: 120,
            height: 120,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isHovering ? 1.2 : 0.66,
            opacity: isHovering ? 0.8 : 0.4,
            backgroundColor: isClicked ? "#c084fc" : "#38bdf8", // purple-400 : sky-400
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Main Cursor Center */}
        <motion.div
          className="fixed top-0 left-0 flex items-center justify-center will-change-transform shadow-[0_0_20px_4px_rgba(255,255,255,0.4)]"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            width: isHovering && buttonRect ? buttonRect.width + 12 : 12,
            height: isHovering && buttonRect ? buttonRect.height + 12 : 12,
            borderRadius: isHovering && buttonRect ? buttonRect.radius : 9999,
            opacity: isVisible ? 1 : 0,
            scale: isClicked ? 0.9 : 1,
            backgroundColor: isHovering ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)",
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
            mass: 0.5
          }}
        >
          {/* Glass outline on hover */}
          {isHovering && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="absolute inset-0 rounded-[inherit] border-[0.5px] border-white/50" 
            />
          )}
        </motion.div>

        {/* Click Explosion Particles */}
        <AnimatePresence>
          {clickParticles.map((p) => (
            <motion.div
              key={p.id}
              className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(103,232,249,0.8)] mix-blend-normal"
              initial={{ 
                x: p.x, 
                y: p.y, 
                opacity: 1, 
                scale: 1,
                translateX: "-50%", 
                translateY: "-50%" 
              }}
              animate={{ 
                x: p.x + Math.cos(p.angle) * 50, 
                y: p.y + Math.sin(p.angle) * 50,
                opacity: 0,
                scale: 0
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Global Style to hide native cursor on desktop */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: fine) {
          body, *, *:hover {
            cursor: none !important;
          }
        }
      `}} />
    </>
  );
}
