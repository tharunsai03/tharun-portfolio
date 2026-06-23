"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, Variants } from "framer-motion";
import { Download, Mail, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Github, Linkedin } from "../Icons";

const HeroBackground = dynamic(() => import("../HeroBackground"), { ssr: false });

// Helper for character-by-character reveal
const sentence: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.05 },
  },
};
const letter: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-accent-cyan ml-1 align-middle"
      />
    </span>
  );
};

export default function Hero() {
  const [showContact, setShowContact] = useState(false);
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse tracking for parallax, 3D tilt, and spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize between -1 and 1
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
  };

  const imageRotateX = useTransform(smoothMouseY, [-1, 1], [10, -10]);
  const imageRotateY = useTransform(smoothMouseX, [-1, 1], [-10, 10]);

  const spotlightX = useTransform(smoothMouseX, [-1, 1], ["0%", "100%"]);
  const spotlightY = useTransform(smoothMouseY, [-1, 1], ["0%", "100%"]);
  const spotlightBackground = useMotionTemplate`radial-gradient(circle 800px at ${spotlightX} ${spotlightY}, rgba(56, 189, 248, 0.15), transparent 80%)`;

  return (
    <section 
      ref={ref} 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Spotlight */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen"
        style={{ background: spotlightBackground }}
      />

      <HeroBackground />

      {/* Floating 3D Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl"
          animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl"
          animate={{ y: [0, 40, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <motion.div 
        style={{ y, opacity }} 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { filter: "blur(10px)", opacity: 0 },
          visible: { 
            filter: "blur(0px)", 
            opacity: 1, 
            transition: { duration: 1.2, staggerChildren: 0.15 } 
          }
        }}
      >
        
        {/* Left Side (Image & Name) */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, x: -40, y: 20 },
            visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
          className="flex flex-col items-center"
        >
          {/* Profile Image with 3D Tilt */}
          <motion.div 
            style={{ rotateX: imageRotateX, rotateY: imageRotateY, transformPerspective: 1000 }}
            className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-full mb-6 group cursor-pointer"
          >
            {/* Animated Gradient Border */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,var(--color-accent-cyan),var(--color-accent-purple),var(--color-accent-cyan))] opacity-50 group-hover:opacity-100 blur-sm transition-opacity"
            />
            
            <div className="absolute inset-0 rounded-full overflow-hidden border border-white/20 bg-panel shadow-[0_0_50px_rgba(56,189,248,0.2)] group-hover:shadow-[0_0_80px_rgba(139,92,246,0.3)] transition-shadow duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 mix-blend-overlay z-10"></div>
               <Image 
                 src="/profile.png" 
                 alt="Kandunuri Tharun Sai" 
                 fill 
                 className="object-cover transition-transform duration-700 group-hover:scale-110"
                 priority
               />
            </div>
          </motion.div>

          {/* Character-by-Character Name */}
          <motion.h2 
            variants={sentence}
            className="text-3xl sm:text-4xl font-extrabold text-foreground mb-6 font-heading tracking-tight flex"
          >
            {"Kandunuri Tharun Sai".split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
          
          <div className="relative w-full max-w-[240px]">
            <motion.button 
              onClick={() => setShowContact(!showContact)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg transition-all w-full overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <Mail className="h-4 w-4 relative z-10" />
              <span className="relative z-10">Contact Me</span>
            </motion.button>

            <AnimatePresence>
              {showContact && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full mt-2 bg-panel border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20 backdrop-blur-xl absolute top-full left-0"
                >
                  <div className="flex flex-col py-2">
                    <motion.a 
                      whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                      href="mailto:kandunuritharunsai@gmail.com" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-white transition-colors"
                    >
                      <motion.div whileHover={{ scale: 1.2, rotate: 10 }}><Mail className="w-4 h-4 text-accent-cyan" /></motion.div>
                      <span className="truncate">Email Me</span>
                    </motion.a>
                    <motion.a 
                      whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                      href="https://www.linkedin.com/in/kandunuri-tharun-sai" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-white transition-colors"
                    >
                      <motion.div whileHover={{ scale: 1.2, rotate: -10 }}><Linkedin className="w-4 h-4 text-blue-400" /></motion.div>
                      <span className="truncate">LinkedIn</span>
                    </motion.a>
                    <motion.a 
                      whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                      href="https://github.com/tharunsai03" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-white transition-colors"
                    >
                      <motion.div whileHover={{ scale: 1.2, rotate: 10 }}><Github className="w-4 h-4 text-white" /></motion.div>
                      <span className="truncate">GitHub</span>
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Side (Text) */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, x: 40, y: 20 },
            visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
          className="flex-1 text-center lg:text-left max-w-2xl"
        >
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-[5rem] font-black font-heading tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)] uppercase inline-block"
          >
            Cybersecurity
          </motion.h1>
          <h3 className="text-2xl sm:text-3xl text-text-secondary font-semibold mb-6 h-10 flex justify-center lg:justify-start items-center">
            <TypewriterText text="B.Tech CSE (Cyber Security)" delay={1.5} />
          </h3>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { delay: 2.5, duration: 0.5 } }
            }}
            className="text-sm sm:text-base font-bold text-accent-cyan tracking-wide mb-8 flex flex-wrap justify-center lg:justify-start gap-3"
          >
             <span className="hover:text-white transition-colors cursor-default">Network Security</span>
             <span className="text-text-secondary">•</span>
             <span className="hover:text-white transition-colors cursor-default">Penetration Testing</span>
             <span className="text-text-secondary">•</span>
             <span className="hover:text-white transition-colors cursor-default">Threat Detection</span>
          </motion.div>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 2.8, duration: 0.8 } }
            }}
            className="text-lg text-text-secondary mb-10 leading-relaxed text-left"
          >
            Aspiring cybersecurity professional with a strong interest in network security, penetration testing, threat detection, and security operations. Passionate about building practical skills through projects, certifications, and hands-on learning.
          </motion.p>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 3.0, duration: 0.8 } }
            }}
            className="flex justify-center lg:justify-start"
          >
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden inline-flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-bold text-white shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">View Projects &rarr;</span>
            </motion.a>
          </motion.div>
        </motion.div>

      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center hidden sm:flex"
      >
        <span className="text-xs text-text-secondary tracking-widest uppercase mb-2">Scroll</span>
        <div className="w-px h-12 bg-white/10 relative overflow-hidden rounded-full">
          <motion.div 
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-accent-cyan to-transparent shadow-[0_0_10px_rgba(56,189,248,1)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
