import { Rocket, ShieldAlert, Heart, Code2, FileCheck } from 'lucide-react'

/**
 * AboutSection — Mission context, team information, technical architecture,
 * and official NASA non-endorsement disclaimers.
 * Styled with NASA-inspired space palette (#050816, #0B1A33, #FC3D21, #D4A11E).
 */
export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-block px-3.5 py-1 mb-3 rounded-full bg-[#FC3D21]/10 border border-[#FC3D21]/30 text-xs text-[#FC3D21] font-mono uppercase tracking-wider font-semibold">
          NASA Space Apps Challenge 2026
        </div>
        <h2
          className="text-3xl sm:text-5xl font-black mb-3 tracking-tight"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          About <span className="text-[#FC3D21]">LunaPath</span>
        </h2>
        <p className="text-base text-[#A8B0C0] max-w-2xl mx-auto">
          An open educational planning dashboard built for the "Lunar Landing Site Navigator" challenge.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Left Column: Project Mission */}
        <div className="bg-[#0B1A33] border border-[#F5F7FA]/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Rocket className="w-6 h-6 text-[#FC3D21]" />
            <h3 className="text-xl font-bold text-[#F5F7FA]">The LunaPath Objective</h3>
          </div>
          <p className="text-sm text-[#A8B0C0] leading-relaxed">
            Landing astronauts and robotic science missions near the lunar South Pole presents unprecedented challenges.
            Because the Moon's axial tilt is only ~1.5°, the Sun skims the rugged polar horizon, casting elongated shadows
            and creating narrow, shifting illumination windows.
          </p>
          <p className="text-sm text-[#A8B0C0] leading-relaxed">
            <strong className="text-[#F5F7FA]">LunaPath</strong> was developed to make peer-reviewed lunar polar science accessible to
            planners, students, and space enthusiasts. By linking Artemis III candidate regions with exact candidate site points
            and modeled midsummer illumination datasets, LunaPath provides transparent exploration of sunlight duration,
            simultaneous Earth communication windows, and terrain slopes.
          </p>
          <div className="pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4A11E]">
              <FileCheck className="w-4 h-4" />
              <span>Scientific Data Lead: Verified from Wueller et al. (2026) Table 1, Table A1, Table A2</span>
            </div>
          </div>
        </div>

        {/* Right Column: Disclaimer & Logo Branding Notice */}
        <div className="space-y-6">
          {/* Official NASA Non-Endorsement Notice */}
          <div className="bg-[#0B1A33] border border-[#D4A11E]/40 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-[#D4A11E]">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <h3 className="text-lg font-bold text-[#F5F7FA]">Non-Endorsement Disclaimer</h3>
            </div>
            <p className="text-xs text-[#A8B0C0] leading-relaxed">
              This project is an independent hackathon prototype built for the global <strong>NASA Space Apps Challenge 2026</strong>.
              LunaPath is not affiliated with, funded by, or officially endorsed by the National Aeronautics and Space Administration (NASA)
              or any government space agency.
            </p>
            <p className="text-xs text-[#A8B0C0]/70 leading-relaxed border-t border-[#F5F7FA]/10 pt-3">
              <strong>Team Logo Notice:</strong> The LunaPath mission patch incorporates "NASA Space Apps 2026" as an event identifier badge.
              It represents participant team artwork and does not claim to be an official NASA insignia or agency seal.
            </p>
          </div>

          {/* Technology Stack & Credits */}
          <div className="bg-[#0B1A33] border border-[#F5F7FA]/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-[#FC3D21]" />
              <h4 className="text-sm font-bold text-[#F5F7FA]">Architecture & Frameworks</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'React 19',
                'Vite',
                'Tailwind CSS v4',
                'Recharts',
                'Lucide React',
                'Client-Side Architecture',
                'Zero Backend Dependency',
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1.5 rounded-lg bg-[#050816] text-[#A8B0C0] border border-[#F5F7FA]/10 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#F5F7FA]/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8B0C0] font-mono">
        <div className="flex items-center gap-3">
          <img src="/lunapath-logo.png" alt="LunaPath" className="h-10 w-auto object-contain logo-interactive" />
          <span>LunaPath Moon Landing Planner · NASA Space Apps Challenge 2026</span>
        </div>
        <div className="flex items-center gap-1 text-[#A8B0C0]/60">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[#FC3D21]" />
          <span>for planetary exploration</span>
        </div>
      </footer>
    </section>
  )
}
