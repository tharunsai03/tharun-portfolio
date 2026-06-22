import Section from "../Section";
import InteractiveCard from "../InteractiveCard";

const educationData = [
  {
    institution: "NIIT University",
    degree: "B.Tech in Computer Science and Engineering | Specialization: Cyber Security",
    duration: "2023 - 2027",
    gpa: "CGPA: 6.67/10"
  },
  {
    institution: "Sri Nalanda College",
    degree: "Class XII",
    duration: "2023",
    gpa: "80%"
  },
  {
    institution: "Sri Chaitanya School",
    degree: "Class X",
    duration: "2021",
    gpa: "Completed"
  }
];

export default function About() {
  return (
    <Section id="about" title="About & Education">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Bio & Details */}
        <div className="space-y-8">
          <div className="prose prose-invert prose-slate">
            <p className="text-text-secondary text-lg leading-relaxed">
              B.Tech Computer Science and Engineering specializing in Cyber Security. Passionate about cybersecurity, network defense, ethical hacking, penetration testing, and threat detection. I am dedicated to building technical skills through projects, certifications, and hands-on labs, and eager to contribute to real-world security challenges while continuously expanding my technical expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InteractiveCard className="p-6">
              <h3 className="text-sm font-semibold text-white/90 mb-3 tracking-widest uppercase font-mono">Career Objective</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                To contribute to real-world security challenges and build scalable, secure, and resilient infrastructure.
              </p>
            </InteractiveCard>
            
            <InteractiveCard className="p-6">
              <h3 className="text-sm font-semibold text-white/90 mb-3 tracking-widest uppercase font-mono">Interests</h3>
              <p className="text-sm text-text-secondary leading-relaxed flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">Pen Testing</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">Network Defense</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">Threat Detection</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">Ethical Hacking</span>
              </p>
            </InteractiveCard>
          </div>
        </div>

        {/* Education Timeline */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6 font-heading">Education</h3>
          <div className="relative ml-4 space-y-8 group/list">
            {/* Timeline Line */}
            <div className="absolute left-0 top-6 bottom-6 w-px bg-gradient-to-b from-amber-500/50 via-amber-500/10 to-transparent"></div>

            {educationData.map((item, index) => (
              <div key={index} className="relative pl-10 group/timeline group-hover/list:opacity-40 hover:!opacity-100 transition-opacity duration-300">
                {/* Glowing Node */}
                <div className="absolute w-6 h-6 rounded-full border-2 border-amber-500/30 bg-background -left-[11px] top-6 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover/timeline:border-amber-500/80 transition-colors duration-500 z-10">
                   <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)] group-hover/timeline:scale-[1.5] transition-transform duration-500"></div>
                </div>

                {/* Horizontal Connector */}
                <div className="absolute top-[35px] w-10 h-px bg-gradient-to-r from-amber-500/50 to-transparent left-0"></div>

                <InteractiveCard className="p-6 md:p-8 w-full group-hover/timeline:-translate-y-2 group-hover/timeline:scale-[1.02]">
                  <span className="text-xs font-mono text-amber-500/90 mb-3 tracking-widest uppercase flex items-center gap-2">
                    {item.duration}
                  </span>
                  <h4 className="text-xl font-black font-heading text-foreground mb-2 group-hover/timeline:text-white transition-colors duration-500">
                    {item.institution}
                  </h4>
                  <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                    {item.degree}
                  </p>
                  <div className="inline-flex items-center rounded-md bg-white/5 px-3 py-1 text-xs font-bold text-white/90 border border-white/10">
                    {item.gpa}
                  </div>
                </InteractiveCard>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}
