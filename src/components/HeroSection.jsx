import { useMemo } from 'react'
import { ChevronDown, Sun, Globe, Compass, Info, ArrowUpRight } from 'lucide-react'
import { formatDays } from '../data/loader'
import LunarGlobe3D from './visualizations/LunarGlobe3D'

/**
 * HeroSection — High-impact NASA-inspired mission control hero section.
 * Features:
 * - Interactive 3D Lunar Globe with NASA texture mapping and candidate site markers
 * - Polar candidate site point markers (SP11, NR2_K2023, HW10)
 * - Conceptual Sun & Earth Polar Geometry telemetry instrument
 * - Modern Manrope + Space Grotesk + Orbitron typography in NASA Red, Moon Gold, and Lunar White
 */
export default function HeroSection({ selectedSite, selectedYear, landingSites, visibilityData, onSelectSite, setSelectedSite }) {
  const currentSelectSite = onSelectSite || setSelectedSite
  const currentSite = landingSites?.find((s) => s.id === selectedSite) || landingSites?.[0]
  const currentVis = visibilityData?.find(
    (v) => v.site_id === selectedSite && Number(v.year) === Number(selectedYear)
  )

  // Star field with subtle twinkle
  const stars = useMemo(
    () =>
      Array.from({ length: 75 }, (_, i) => ({
        id: i,
        top: (i * 17.3) % 100,
        left: (i * 29.7) % 100,
        size: (i % 3) * 0.75 + 0.75,
        delay: (i % 6) * 0.6,
        duration: (i % 4) + 3,
      })),
    []
  )

  return (
    <section
      id="top"
      className="relative w-full min-h-[95vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#050816] via-[#070D1B] to-[#050816]"
    >
      {/* Background Star Field */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-[#FFFFFF] star-twinkle"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading, Mission Context & Modern Typography */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-7">
          {/* Mission Tag / Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#D4A11E]/40 bg-[#D4A11E]/10 text-xs sm:text-sm font-mono tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#FC3D21] animate-ping" />
            <span className="font-bold text-[#D4A11E]">NASA Space Apps Challenge 2026</span>
            <span className="text-[#F5F7FA]/30">•</span>
            <span className="text-[#F5F7FA]/80">Lunar Landing Site Navigator</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-[#FFFFFF]"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Planning the <br />
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#D4A11E] to-[#FC3D21] bg-clip-text text-transparent">
              Lunar Frontier
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#A8B0C0] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            A next-generation mission planning dashboard exploring candidate landing sites near the Moon’s South Pole.
            Featuring <strong className="text-[#FFFFFF]">published modeled analysis</strong> of continuous solar illumination
            and direct Earth communication windows grounded in peer-reviewed research by{' '}
            <strong className="text-[#D4A11E]">Wueller et al. (2026)</strong> and NASA Artemis candidate data.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#explorer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl btn-nasa-red text-sm font-bold uppercase tracking-wider shadow-2xl"
            >
              Explore Candidate Sites
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
            <a
              href="#comparison"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl btn-nasa-gold text-sm font-bold uppercase tracking-wider"
            >
              Compare Terrain Data
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mission Workflow Indicator */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-[#A8B0C0] font-mono">
            <span className="text-[#D4A11E] font-bold uppercase tracking-wider">Mission Flow:</span>
            <span className="px-2.5 py-1 rounded-md bg-[#0A1428] border border-[#F5F7FA]/10 text-[#F5F7FA]">1. Select Site</span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded-md bg-[#0A1428] border border-[#F5F7FA]/10 text-[#F5F7FA]">2. Select Year (2025–2032)</span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded-md bg-[#0A1428] border border-[#F5F7FA]/10 text-[#F5F7FA]">3. Analyze Visibility</span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded-md bg-[#0A1428] border border-[#F5F7FA]/10 text-[#F5F7FA]">4. Compare Metrics</span>
          </div>
        </div>

        {/* Right Column: Interactive 3D Lunar Globe & Polar Telemetry */}
        <div className="lg:col-span-5 flex flex-col items-center w-full">
          {/* Interactive 3D Lunar Globe */}
          <div className="w-full max-w-md mx-auto">
            <LunarGlobe3D
              selectedSite={selectedSite}
              onSelectSite={currentSelectSite}
            />
          </div>

          {/* Conceptual Sun & Earth Polar Geometry Telemetry Instrument Widget */}
          <div className="mt-5 w-full max-w-sm bg-[#0A1428] border border-[#D4A11E]/40 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F5F7FA]/10 pb-2 mb-3">
              <span className="text-[11px] font-mono uppercase text-[#D4A11E] font-bold flex items-center gap-1.5 tracking-wider">
                <Compass className="w-3.5 h-3.5 text-[#FC3D21]" />
                Polar Illumination Telemetry
              </span>
              <span className="text-[10px] font-mono text-[#F5F7FA] font-bold px-2 py-0.5 rounded bg-[#FC3D21]/15 border border-[#FC3D21]/30">
                {currentSite?.id} · {selectedYear}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#050816] p-3 rounded-xl border border-[#D4A11E]/30">
                <div className="flex items-center gap-1.5 text-[#D4A11E] mb-1 font-semibold text-[11px]">
                  <Sun className="w-3.5 h-3.5" />
                  <span>Sun Window</span>
                </div>
                <div className="text-xl font-black font-mono text-[#D4A11E]">
                  {formatDays(currentVis?.max_consecutive_sun_days)}
                </div>
                <p className="text-[10px] text-[#A8B0C0] mt-0.5">Grazing incidence (~1.5° skim)</p>
              </div>

              <div className="bg-[#050816] p-3 rounded-xl border border-[#FC3D21]/30">
                <div className="flex items-center gap-1.5 text-[#FC3D21] mb-1 font-semibold text-[11px]">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Sun + Earth Window</span>
                </div>
                <div className="text-xl font-black font-mono text-[#FC3D21]">
                  {formatDays(currentVis?.max_consecutive_sun_and_earth_days)}
                </div>
                <p className="text-[10px] text-[#A8B0C0] mt-0.5">Direct Earth comms &le; Sun</p>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-1.5 text-[10px] text-[#A8B0C0] leading-tight">
              <Info className="w-3 h-3 text-[#D4A11E] shrink-0 mt-0.5" />
              <span>Conceptual geometry · Illustrative model visualization · Not real-time astronomy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
    </section>
  )
}
