"use client";

import { motion } from "framer-motion";
import Section from "../Section";
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

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 85 },
      { name: "SQL", level: 85 },
    ]
  },
  {
    title: "Web Technologies",
    skills: [
      { name: "HTML/CSS", level: 95 },
      { name: "JavaScript", level: 90 },
    ]
  },
  {
    title: "Cybersecurity Tools",
    skills: [
      { name: "Wireshark", level: 95 },
      { name: "Nmap", level: 90 },
      { name: "Kali Linux", level: 95 },
    ]
  },
  {
    title: "Developer Tools",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 80 },
      { name: "Jenkins", level: 75 },
    ]
  },
  {
    title: "Operating Systems",
    skills: [
      { name: "Linux", level: 95 },
      { name: "Windows", level: 95 },
    ]
  },
  {
    title: "Design Tools",
    skills: [
      { name: "Figma", level: 85 },
      { name: "Canva", level: 90 },
    ]
  }
];

export default function Skills() {
  return (
    <Section id="skills" title="Technical Skills">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 group/list"
      >
        {skillCategories.map((category) => (
          <motion.div key={category.title} variants={itemVariants}>
            <InteractiveCard className="p-6 group-hover/list:opacity-40 hover:!opacity-100 transition-opacity duration-300">
              <h3 className="text-lg font-semibold text-foreground mb-6 font-heading">{category.title}</h3>
            <div className="relative z-10 space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium text-text-secondary">{skill.name}</span>
                    <span className="text-xs text-text-secondary/50 font-mono">{skill.level}%</span>
                  </div>
                  {/* Minimal progress bar */}
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
            </InteractiveCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
