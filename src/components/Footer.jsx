import React from 'react'
import { ArrowUp, Compass, ShieldAlert, BookOpen, ExternalLink } from 'lucide-react'

/**
 * Footer — Mission Control Dashboard Footer
 * Displays project branding, NASA Space Apps Challenge 2026 disclaimers,
 * scientific attribution notice, and back-to-top navigation.
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-[#03060F] border-t border-[#F5F7FA]/10 pt-12 pb-16 px-4 sm:px-6 lg:px-8 mt-16 text-[#A8B0C0]">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Col 1: Branding & Mission Badge */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}lunapath-logo.png`}
                alt="LunaPath Mission Logo"
                className="w-12 h-12 object-contain logo-patch-enhanced"
              />
              <div>
                <span
                  className="text-xl font-black text-white tracking-tight"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Luna<span className="text-[#FC3D21]">Path</span>
                </span>
                <span className="block text-xs font-mono text-[#D4A11E] uppercase tracking-wider font-semibold">
                  Moon Landing Planner · 2026
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A8B0C0] leading-relaxed max-w-sm">
              An interactive educational decision-support prototype exploring candidate lunar south pole landing sites based on published illumination and Earth visibility research.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A11E]/10 border border-[#D4A11E]/30 text-[11px] font-mono text-[#D4A11E]">
              <span>NASA Space Apps Challenge 2026</span>
              <span>•</span>
              <span>Lunar Landing Site Navigator</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2.5 text-xs font-medium">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#F5F7FA] font-bold block mb-3">
              Mission Modules
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#explorer" className="hover:text-[#D4A11E] transition-colors">
                  Candidate Site Explorer
                </a>
              </li>
              <li>
                <a href="#charts" className="hover:text-[#D4A11E] transition-colors">
                  Visibility Analysis Charts
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-[#D4A11E] transition-colors">
                  Cross-Site Terrain Comparison
                </a>
              </li>
              <li>
                <a href="#sources" className="hover:text-[#D4A11E] transition-colors">
                  Scientific Sources &amp; Methodology
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4A11E] transition-colors">
                  About the LunaPath Project
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Scientific Attribution & Disclaimers */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#F5F7FA] font-bold block mb-1">
              Scientific Attribution
            </span>
            <p className="text-[11px] text-[#A8B0C0] leading-relaxed">
              Illumination modeling and midsummer duration records sourced from{' '}
              <strong className="text-white">Wueller et al. (2026)</strong>, JGR Planets. Artemis candidate regions informed by NASA Goddard LRO/LOLA data.
            </p>
            <div className="p-3 rounded-xl bg-[#050816] border border-[#F5F7FA]/10 text-[10.5px] leading-relaxed text-[#94A3B8] space-y-1">
              <div className="flex items-center gap-1.5 text-[#FC3D21] font-semibold">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Educational Prototype Disclaimer</span>
              </div>
              <p>
                LunaPath is an educational decision-support model developed for hackathon presentation. It does not replace operational mission flight planning systems.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar: Copyright & Back-to-Top */}
        <div className="pt-6 border-t border-[#F5F7FA]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
          <div>
            &copy; {new Date().getFullYear()} Team LunaPath · Built for NASA Space Apps Challenge 2026
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1428] border border-[#F5F7FA]/15 text-[#F5F7FA] hover:text-[#D4A11E] hover:border-[#D4A11E]/40 transition-all text-xs"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
