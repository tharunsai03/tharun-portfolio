import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-background pt-32 pb-8 overflow-hidden border-t border-white/5">

      {/* Background Theme Glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-accent-cyan/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[300px] bg-accent-purple/10 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col items-center">

        {/* Top Header / Links */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-sm font-semibold tracking-widest uppercase text-white/90">
            Code with precision.
            Secure with purpose.
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-bold tracking-widest uppercase text-white/50">
            <a href="https://github.com/tharunsai01" target="_blank" rel="noopener noreferrer" className="hover:text-accent-cyan transition-colors flex items-center gap-1 group">
              GITHUB
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-accent-cyan" />
            </a>
            <a href="https://linkedin.com/in/kandunuri-tharun-sai" target="_blank" rel="noopener noreferrer" className="hover:text-accent-purple transition-colors flex items-center gap-1 group">
              LINKEDIN
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-accent-purple" />
            </a>
            <a href="mailto:kandunuritharunsai@gmail.com" className="hover:text-accent-cyan transition-colors flex items-center gap-1 group">
              EMAIL
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-accent-cyan" />
            </a>
          </div>
        </div>

        {/* Giant Name Typography */}
        <div className="w-full flex justify-center items-center relative group mt-10">
          <h1 className="text-[14.5vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/40 via-white/10 to-transparent select-none text-center w-full uppercase pb-4 whitespace-nowrap">
            THARUN SAI
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="w-full max-w-7xl mx-auto mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-center items-center gap-4 text-[10px] text-white/30 uppercase tracking-widest font-mono">
          <p>
            &copy; {new Date().getFullYear()} THARUN SAI. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
}
