"use client";

import { motion } from "framer-motion";
import Section from "../Section";
import { ExternalLink } from "lucide-react";
import { Github } from "../Icons";
import InteractiveCard from "../InteractiveCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const projects = [
  {
    title: "Agentic AI for Smart Traffic Management",
    description: "Built an Agentic AI-based traffic management platform for real-time monitoring and signal optimization. Designed a multi-agent AI pipeline to predict congestion and optimize traffic signal timings. Implemented JWT authentication, OAuth 2.0, Docker, and Jenkins CI/CD.",
    tags: ["React", "Node.js", "MongoDB", "Docker", "Jenkins", "Agentic AI"],
    githubUrl: "https://github.com",
    liveUrl: "",
    status: "Completed",
  }
];

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 group/list"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <InteractiveCard className="!p-0 flex flex-col group group-hover/list:opacity-40 hover:!opacity-100 transition-opacity duration-300">
              {/* Image Placeholder */}
            <div className="relative z-10 h-48 bg-background border-b border-white/5 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 mix-blend-overlay opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-text-secondary/50 text-sm font-mono">[ADD: Image Screenshot]</span>
            </div>
            
            <div className="relative z-10 p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold font-heading text-foreground">{project.title}</h3>
                <span className={`text-[10px] font-mono px-2 py-1 rounded-full border ${
                  project.status === 'Completed' 
                    ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                    : 'border-amber-500/30 text-white/90 bg-amber-500/10'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-sm text-text-secondary mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono text-text-secondary bg-white/5 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4 mt-auto pt-4 border-t border-white/5">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-foreground transition-colors ml-auto"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Demo</span>
                  </a>
                )}
              </div>
            </div>
            </InteractiveCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
