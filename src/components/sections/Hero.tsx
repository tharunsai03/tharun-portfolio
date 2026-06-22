"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Download, Mail, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Github, Linkedin } from "../Icons";

// Lazy load the shader background
const HeroBackground = dynamic(() => import("../HeroBackground"), { ssr: false });

export default function Hero() {
  const [showContact, setShowContact] = useState(false);
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <HeroBackground />
      
      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
        
        {/* Left Side (Image & Name) */}
        <motion.div 
          initial={{ opacity: 0, x: -40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden border border-white/10 bg-panel/30 shadow-[0_0_50px_rgba(56,189,248,0.15)] mb-6">
             <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 mix-blend-overlay z-10"></div>
             <Image 
               src="/profile .jpeg" 
               alt="Kandunuri Tharun Sai" 
               fill 
               className="object-cover"
               priority
             />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-6 font-heading tracking-tight">Kandunuri Tharun Sai</h2>
          
          <div className="relative w-full max-w-[240px]">
            <motion.button 
              onClick={() => setShowContact(!showContact)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg transition-all w-full"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </motion.button>

            <AnimatePresence>
              {showContact && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full mt-2 bg-panel border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20 backdrop-blur-xl"
                >
                  <div className="flex flex-col py-2">
                    <a 
                      href="mailto:kandunuritharunsai@gmail.com" 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-accent-cyan" />
                      <span className="truncate">Email Me</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/kandunuri-tharun-sai" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <span className="truncate">LinkedIn</span>
                    </a>
                    <a 
                      href="https://github.com/tharunsai03" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Github className="w-4 h-4 text-white" />
                      <span className="truncate">GitHub</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Side (Text) */}
        <motion.div 
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-1 text-center lg:text-left max-w-2xl"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-black font-heading tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-sm uppercase">
            Cybersecurity
          </h1>
          <h3 className="text-2xl sm:text-3xl text-text-secondary font-semibold mb-6">
            B.Tech CSE (Cyber Security)
          </h3>
          
          <div className="text-sm sm:text-base font-bold text-accent-cyan tracking-wide mb-8 flex flex-wrap justify-center lg:justify-start gap-3">
             <span>Network Security</span>
             <span className="text-text-secondary">•</span>
             <span>Penetration Testing</span>
             <span className="text-text-secondary">•</span>
             <span>Threat Detection</span>
          </div>

          <p className="text-lg text-text-secondary mb-10 leading-relaxed text-left">
            Aspiring cybersecurity professional with a strong interest in network security, penetration testing, threat detection, and security operations. Passionate about building practical skills through projects, certifications, and hands-on learning.
          </p>
          
          <div className="flex justify-center lg:justify-start">
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-bold text-white shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all"
            >
              View Projects &rarr;
            </motion.a>
          </div>
        </motion.div>

      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center hidden sm:flex"
      >
        <span className="text-xs text-text-secondary tracking-widest uppercase mb-2">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-text-secondary/50 to-transparent"></div>
      </motion.div>
    </section>
  );
}
