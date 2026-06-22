"use client";

import { motion } from "framer-motion";
import Section from "../Section";
import InteractiveCard from "../InteractiveCard";

const leadershipRoles = [
  { 
    role: "House Captain", 
    org: "Orange House, NIIT University", 
    date: "Dec 2025 – Present",
    desc: "Driving leadership, teamwork, and campus engagement while representing Orange House across university activities."
  },
  { 
    role: "Operations Lead", 
    org: "siNUSoid, NIIT University", 
    date: "Jul 2024 – Dec 2024",
    desc: "Led event operations and volunteer coordination to ensure the successful execution of a major technical fest."
  },
  { 
    role: "Volunteer", 
    org: "TEDx NIIT University", 
    date: "Jan 2024 – May 2024",
    desc: "Supported event planning and guest coordination to help deliver a seamless TEDx experience."
  },
  { 
    role: "Volunteer", 
    org: "IngeNUity Fest, NIIT University", 
    date: "Jan 2024 – May 2024",
    desc: "Contributed to organizing and executing university cultural events through effective teamwork and coordination."
  },
  { 
    role: "Operations & Capture Volunteer", 
    org: "siNUSoid", 
    date: "Jul 2023 – Dec 2023",
    desc: "Assisted in event operations and content documentation to enhance event execution and engagement."
  }
];

export default function Leadership() {
  return (
    <Section id="leadership" title="Leadership & Activities">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Central Timeline Line */}
        <div className="absolute left-[36px] md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-amber-500/20 to-transparent md:-translate-x-1/2"></div>
        
        <div className="flex flex-col space-y-12 md:space-y-0">
          {leadershipRoles.map((role, i) => {
            const isEven = i % 2 === 0;
            
            return (
              <div key={i} className={`relative flex items-center md:justify-between w-full group/timeline ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} md:mb-12 lg:mb-24 last:mb-0`}>
                
                {/* Timeline Node */}
                <div className="absolute left-[20px] md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full border-2 border-amber-500/30 bg-background z-20 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)] group-hover/timeline:border-amber-500/80 transition-colors duration-500">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)] group-hover/timeline:scale-[1.5] transition-transform duration-500"></div>
                </div>
                
                {/* Card Container */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`relative w-[calc(100%-5rem)] ml-[80px] md:ml-0 md:w-[calc(50%-3rem)]`}
                >
                  {/* Horizontal Connector (Desktop) */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[3rem] h-px bg-gradient-to-r ${isEven ? '-right-[3rem] from-transparent to-amber-500/50' : '-left-[3rem] from-amber-500/50 to-transparent'}`}></div>

                  {/* Horizontal Connector (Mobile) */}
                  <div className={`md:hidden absolute top-1/2 -translate-y-1/2 w-[44px] h-px bg-gradient-to-r from-amber-500/50 to-transparent -left-[44px]`}></div>

                  <InteractiveCard className="p-8 md:p-10 group-hover/timeline:-translate-y-2 group-hover/timeline:scale-[1.02]">
                    <div className={`relative z-10 flex flex-col ${isEven ? "md:text-right" : "md:text-left"}`}>
                      {/* Date Range */}
                      <span className={`text-sm font-mono text-amber-500/90 mb-3 tracking-widest uppercase flex items-center gap-3 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                        {!isEven && <span className="hidden md:block w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>}
                        <span className="md:hidden w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>
                        {role.date}
                        {isEven && <span className="hidden md:block w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>}
                      </span>
                      
                      {/* Role Title */}
                      <h3 className="text-2xl sm:text-3xl font-black font-heading text-foreground mb-3 group-hover/timeline:text-white transition-colors duration-500">
                        {role.role}
                      </h3>
                      
                      {/* Organization Name */}
                      <p className="text-lg sm:text-xl text-foreground/80 font-bold mb-4">
                        {role.org}
                      </p>
                      
                      {/* One-line Description */}
                      <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                        {role.desc}
                      </p>
                    </div>
                  </InteractiveCard>
                </motion.div>

                {/* Empty space for alternating layout on desktop */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]"></div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
