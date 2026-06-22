"use client";

import { useState } from "react";
import Section from "../Section";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import InteractiveCard from "../InteractiveCard";

const certificates = [
  {
    name: "Tata Cybersecurity Analyst Job Simulation",
    issuer: "Forage",
    date: "Recent",
    category: "Security",
    verifyUrl: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_6a2fac3dbe513965a4368053_1781521541633_completion_certificate.pdf",
    imageUrl: "/forage logo.png"
  },
  {
    name: "Networking Basics",
    issuer: "Cisco Networking Academy",
    date: "Recent",
    category: "General",
    verifyUrl: "https://www.credly.com/badges/718a67d6-c8e6-4de9-ba90-fc5d38f51ce9",
    imageUrl: "/cisco logo.png"
  }
];

const categories = ["All", "Security", "Cloud", "General"];

export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCertificates = certificates.filter(
    (cert) => activeCategory === "All" || cert.category === activeCategory
  );

  return (
    <Section id="certificates" title="Certifications">
      
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category 
                ? "bg-foreground text-background" 
                : "bg-panel text-text-secondary hover:text-foreground hover:bg-white/10 border border-white/5"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 group/list">
        {filteredCertificates.map((cert, index) => (
          <div key={index} className="group-hover/list:opacity-40 hover:!opacity-100 transition-opacity duration-300">
            <InteractiveCard className="!p-0 flex flex-col group">
            {/* Image Placeholder */}
            <div className="relative z-10 h-40 bg-white border-b border-white/5 flex items-center justify-center overflow-hidden p-4">
               {cert.imageUrl ? (
                 <Image 
                   src={cert.imageUrl} 
                   alt={cert.name} 
                   fill 
                   className="object-contain p-4" 
                 />
               ) : (
                 <span className="text-text-secondary/50 text-sm font-mono">No Image</span>
               )}
            </div>
            
            <div className="relative z-10 p-5 flex flex-col flex-grow">
              <span className="text-xs font-mono text-accent-cyan mb-2">{cert.issuer}</span>
              <h3 className="text-lg font-bold font-heading text-foreground mb-1 leading-tight">{cert.name}</h3>
              <p className="text-sm text-text-secondary mb-4">{cert.date}</p>
              
              <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
                <span className="text-xs font-mono text-text-secondary bg-white/5 px-2 py-1 rounded">
                  {cert.category}
                </span>
                {cert.verifyUrl && (
                  <a 
                    href={cert.verifyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent-cyan transition-colors"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
            </InteractiveCard>
          </div>
        ))}
      </div>
    </Section>
  );
}
