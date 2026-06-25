"use client";

import { useRef, useState } from "react";
import Section from "../Section";
import { Mail, Phone } from "lucide-react";
import { Linkedin } from "../Icons";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Convert FormData to JSON
    const object = Object.fromEntries(formData.entries());
    object.access_key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";
    object.from_name = "Tharun's Portfolio";
    object.subject = "New Portfolio Contact Form";

    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        form.reset();
      } else {
        console.error("Web3Forms API Error:", data);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);

      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  // Mouse tracking for 3D tilt & Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 150, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 150, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(smoothMouseY, [-1, 1], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-4, 4]);

  const spotlightX = useTransform(smoothMouseX, [-1, 1], ["0%", "100%"]);
  const spotlightY = useTransform(smoothMouseY, [-1, 1], ["0%", "100%"]);
  const spotlightBackground = useMotionTemplate`radial-gradient(circle 400px at ${spotlightX} ${spotlightY}, rgba(56, 189, 248, 0.15), transparent 80%)`;

  return (
    <Section id="contact" title="Get In Touch">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Contact Info */}
        <div className="space-y-8">
          <p className="text-lg text-text-secondary leading-relaxed">
            I&apos;m currently open to new opportunities. Whether you have a question, a project proposal, or just want to say hi, feel free to drop a message.
          </p>

          <ul className="flex flex-wrap gap-6 m-0 p-0 list-none">
            {/* Email */}
            <li className="relative group w-16 h-16 hover:w-32 rounded-xl bg-panel border border-white/5 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 flex items-center justify-center overflow-hidden hover:bg-white/5 hover:border-accent-cyan/50">
              <a href="mailto:kandunuritharunsai@gmail.com" aria-label="Email" className="flex items-center justify-center w-full h-full relative z-10">
                <Mail className="w-7 h-7 text-accent-cyan group-hover:text-accent-cyan transition-all duration-300 group-hover:scale-0 absolute" />
                <span className="text-white font-semibold scale-0 group-hover:scale-100 transition-transform duration-300 absolute whitespace-nowrap">Email</span>
              </a>
            </li>

            {/* Phone */}
            <li className="relative group w-16 h-16 hover:w-32 rounded-xl bg-panel border border-white/5 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 flex items-center justify-center overflow-hidden hover:bg-white/5 hover:border-accent-purple/50">
              <a href="tel:+917672052950" aria-label="Phone" className="flex items-center justify-center w-full h-full relative z-10">
                <Phone className="w-7 h-7 text-accent-purple group-hover:text-accent-purple transition-all duration-300 group-hover:scale-0 absolute" />
                <span className="text-white font-semibold scale-0 group-hover:scale-100 transition-transform duration-300 absolute whitespace-nowrap">Phone</span>
              </a>
            </li>

            {/* LinkedIn */}
            <li className="relative group w-16 h-16 hover:w-32 rounded-xl bg-panel border border-white/5 transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 flex items-center justify-center overflow-hidden hover:bg-white/5 hover:border-white/20">
              <a href="https://www.linkedin.com/in/kandunuri-tharun-sai" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full relative z-10">
                <Linkedin className="w-7 h-7 text-foreground group-hover:text-white transition-all duration-300 group-hover:scale-0 absolute" />
                <span className="text-white font-semibold scale-0 group-hover:scale-100 transition-transform duration-300 absolute whitespace-nowrap">LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="relative w-full animate-[float-card_5s_ease-in-out_infinite]">
          <style>{`
            .kodplay-card {
              position: absolute;
              inset: 0;
              pointer-events: none;
              z-index: 0;
            }
            .kodplay-card::before,
            .kodplay-card::after {
              content: '';
              position: absolute;
              inset: 0;
              background: linear-gradient(315deg, #38bdf8, #a855f7, #38bdf8);
              background-size: 200% 200%;
              transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
              border-radius: 1.5rem;
            }
            .kodplay-card::before {
              transform: skew(15deg) scale(0.9);
              filter: blur(20px);
              opacity: 0.25;
            }
            .kodplay-card::after {
              transform: skew(-15deg) scale(0.9);
              filter: blur(20px);
              opacity: 0.25;
            }
            .group:hover .kodplay-card::before,
            .group:hover .kodplay-card::after {
              transform: skew(0deg) scale(1.05);
              filter: blur(35px);
              opacity: 0.5;
            }
            @keyframes float-card {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-15px); }
            }
          `}</style>

          <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className="relative group transition-all duration-500 z-10"
          >
            {/* Kodplay Glowing Skewed Elements */}
            <span className="kodplay-card" />

            {/* Glassmorphism Content Box */}
            <div className="relative bg-[#050B14]/60 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/10 shadow-[0_25px_45px_rgba(0,0,0,0.4)] overflow-hidden z-10">
              {/* Premium Glassmorphism Hover Border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none shadow-[inset_0_0_0_1px_rgba(56,189,248,0.5)] z-20" />

              {/* Mouse Tracking Spotlight */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 mix-blend-screen"
                style={{ background: spotlightBackground }}
              />

              <form className="relative z-30 space-y-6" onSubmit={handleSubmit}>
                {/* Honeypot Spam Protection (Invisible to users, traps bots) */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-white tracking-wide">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan focus:bg-background/80 transition-all relative z-40"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-white tracking-wide">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan focus:bg-background/80 transition-all relative z-40"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-semibold text-white tracking-wide">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan focus:bg-background/80 transition-all relative z-40"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-white tracking-wide">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan focus:bg-background/80 transition-all resize-none relative z-40"
                    placeholder="Tell me more about your project or question"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`relative overflow-hidden w-full text-white font-bold py-4 px-4 rounded-xl shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all mt-6 border border-white/10 group/btn z-40 ${submitStatus === 'success'
                    ? 'bg-green-500'
                    : submitStatus === 'error'
                      ? 'bg-red-500'
                      : 'bg-gradient-to-r from-accent-cyan to-blue-600 magnetic-card'
                    } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10">
                    {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : submitStatus === 'error' ? 'Error Sending' : 'Send Message'}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

      </div>
    </Section>
  );
}
