import { useState } from 'react'
import { Menu, X, Compass } from 'lucide-react'

/**
 * Navbar — NASA-inspired navigation bar featuring a large, commanding mission patch,
 * modern Space Grotesk + Orbitron typography, and an enhanced dual-glow hover effect.
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { label: 'Mission Explorer', href: '#explorer' },
    { label: 'Visibility Charts', href: '#charts' },
    { label: 'Site Comparison', href: '#comparison' },
    { label: 'Scientific Sources', href: '#sources' },
    { label: 'About LunaPath', href: '#about' },
  ]

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050816]/95 backdrop-blur-2xl border-b border-[#F5F7FA]/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 sm:h-26">
          {/* Approved Mission Patch Logo & Wordmark */}
          <a
            href="#top"
            onClick={scrollToTop}
            className="flex items-center gap-4 group focus:outline-none focus:ring-2 focus:ring-[#FC3D21] rounded-2xl py-1.5 px-2 -ml-2 transition-colors hover:bg-[#0A1428]/60"
            title="LunaPath — Return to top"
            aria-label="LunaPath homepage"
          >
            {/* Commanding, Significantly Enlarged Mission Patch */}
            <div className="relative flex items-center justify-center">
              <img
                src={`${import.meta.env.BASE_URL}lunapath-logo.png`}
                alt="LunaPath NASA Space Apps 2026 Mission Patch"
                className="h-18 sm:h-22 w-auto object-contain logo-patch-enhanced drop-shadow-xl"
                loading="eager"
              />
            </div>

            {/* Modern Wordmark & Mission Designation */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span
                  className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#FFFFFF]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Luna<span className="text-[#FC3D21]">Path</span>
                </span>
                <span className="hidden sm:inline-flex items-center text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#D4A11E]/15 text-[#D4A11E] border border-[#D4A11E]/40 font-bold tracking-wider">
                  2026
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono tracking-wider text-[#A8B0C0] uppercase font-medium">
                <span className="text-[#D4A11E] font-bold">Moon Landing Planner</span>
                <span className="text-[#F5F7FA]/30">•</span>
                <span className="hidden sm:inline text-[#F5F7FA]/70">South Pole Navigator</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold tracking-wide text-[#A8B0C0] hover:text-[#FFFFFF] transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-[#FC3D21]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#explorer"
              className="ml-3 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider btn-nasa-red shadow-lg flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              Launch Explorer
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 text-[#F5F7FA] hover:text-[#FC3D21] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FC3D21] rounded-xl bg-[#0A1428] border border-[#F5F7FA]/10"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6 text-[#FC3D21]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-[#F5F7FA]/10 space-y-1 bg-[#050816]/98" aria-label="Mobile Navigation">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 rounded-xl text-base font-semibold text-[#A8B0C0] hover:text-[#FFFFFF] hover:bg-[#0A1428] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 px-3">
              <a
                href="#explorer"
                onClick={() => setMobileOpen(false)}
                className="block text-center py-3 rounded-xl text-sm font-bold uppercase tracking-wider btn-nasa-red"
              >
                Launch Explorer
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
