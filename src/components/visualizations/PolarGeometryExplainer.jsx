import React, { useState } from 'react'
import { Sun, Globe, Mountain, Info, Compass, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react'

/**
 * PolarGeometryExplainer — Interactive educational visualization explaining:
 * 1. The Moon's low ~1.5° axial tilt and skimming polar sunlight.
 * 2. Crater terrain obstruction and permanently shadowed regions (PSRs).
 * 3. The vital operational difference between Sun-only visibility and simultaneous Sun-and-Earth visibility.
 *
 * Grounded in scientific principles from Wueller et al. (2026) and NASA Artemis studies.
 */
export default function PolarGeometryExplainer() {
  const [activeTab, setActiveTab] = useState('tilt') // 'tilt' | 'terrain' | 'simultaneous'

  const tabs = [
    {
      id: 'tilt',
      label: '1.5° Polar Sun Angle',
      icon: Sun,
      title: 'Low Solar Elevation Angle (~1.5° Axial Tilt)',
    },
    {
      id: 'terrain',
      label: 'Terrain & Crater Shadows',
      icon: Mountain,
      title: 'Local Horizon & Terrain Obstruction',
    },
    {
      id: 'simultaneous',
      label: 'Sun vs. Simultaneous Visibility',
      icon: Globe,
      title: 'Solar Power vs. Direct Earth Communications',
    },
  ]

  return (
    <div className="w-full bg-[#070D1B] rounded-3xl border border-[#F5F7FA]/10 p-5 sm:p-7 shadow-2xl space-y-6">
      {/* Header telemetry and title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F5F7FA]/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A11E]/10 border border-[#D4A11E]/30 text-xs font-mono text-[#D4A11E] mb-2">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Interactive Science Explainer</span>
          </div>
          <h3
            className="text-xl sm:text-2xl font-black text-[#FFFFFF] tracking-tight"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Why Lunar South Pole Lighting is Unique
          </h3>
          <p className="text-xs sm:text-sm text-[#A8B0C0] mt-1">
            Understanding the astronomical geometry that governs power, communications, and landing site selection.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap sm:flex-nowrap gap-1.5 p-1 bg-[#050816] rounded-xl border border-[#F5F7FA]/10">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#FC3D21] text-white shadow-lg shadow-[#FC3D21]/30 font-bold'
                    : 'text-[#A8B0C0] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">{tab.id.toUpperCase()}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Interactive Concept Canvas */}
      <div className="grid lg:grid-cols-12 gap-6 items-center">
        {/* Left: Dynamic SVG Educational Diagram */}
        <div className="lg:col-span-7 bg-[#050816] rounded-2xl border border-[#F5F7FA]/10 p-4 aspect-[16/10] flex items-center justify-center relative overflow-hidden">
          {/* TAB 1: 1.5° Axial Tilt & Skimming Sunlight */}
          {activeTab === 'tilt' && (
            <svg
              viewBox="0 0 600 360"
              className="w-full h-full select-none"
              role="img"
              aria-label="Conceptual diagram of the Moon's 1.5 degree axial tilt causing low-skimming sunlight"
            >
              <defs>
                <linearGradient id="sunRayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4A11E" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FC3D21" stopOpacity="0.2" />
                </linearGradient>
                <radialGradient id="sunAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#D4A11E" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Distant Sun Source */}
              <g transform="translate(60, 160)">
                <circle cx="0" cy="0" r="32" fill="url(#sunAura)" />
                <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
                <text x="0" y="50" textAnchor="middle" fill="#D4A11E" fontSize="11" fontFamily="'Orbitron', sans-serif" fontWeight="bold">
                  SUN
                </text>
              </g>

              {/* Parallel Solar Rays skimming horizontally */}
              <line x1="100" y1="140" x2="420" y2="140" stroke="url(#sunRayGrad)" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="100" y1="160" x2="435" y2="160" stroke="url(#sunRayGrad)" strokeWidth="2.5" />
              <line x1="100" y1="180" x2="450" y2="180" stroke="url(#sunRayGrad)" strokeWidth="2" strokeDasharray="4 4" />

              {/* Grazing angle callout */}
              <path d="M 330 160 A 40 40 0 0 1 350 175" fill="none" stroke="#D4A11E" strokeWidth="1.5" />
              <text x="365" y="172" fill="#D4A11E" fontSize="10.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                Elevation &lt; 1.8°
              </text>

              {/* Moon Section */}
              <g transform="translate(460, 180) rotate(-1.5)">
                {/* Lunar disc */}
                <circle cx="0" cy="0" r="110" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                {/* Spin Axis */}
                <line x1="0" y1="-140" x2="0" y2="140" stroke="#FC3D21" strokeWidth="2" strokeDasharray="5 3" />
                {/* Equator */}
                <line x1="-120" y1="0" x2="120" y2="0" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />

                {/* South Pole (Bottom) Highlight */}
                <circle cx="0" cy="110" r="8" fill="#FC3D21" />
                <circle cx="0" cy="110" r="16" fill="none" stroke="#FC3D21" strokeWidth="1.5" className="animate-ping" />
              </g>

              {/* Labels */}
              <text x="460" y="24" textAnchor="middle" fill="#FC3D21" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                SPIN AXIS (1.54° TILT)
              </text>
              <text x="460" y="325" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="'Orbitron', sans-serif" fontWeight="bold">
                SOUTH POLE
              </text>
              <text x="460" y="342" textAnchor="middle" fill="#A8B0C0" fontSize="9.5" fontFamily="'Space Grotesk', sans-serif">
                Sun skims along horizon 360°
              </text>
            </svg>
          )}

          {/* TAB 2: Terrain Obstruction & PSRs */}
          {activeTab === 'terrain' && (
            <svg
              viewBox="0 0 600 360"
              className="w-full h-full select-none"
              role="img"
              aria-label="Cross-section diagram of crater rim casting deep shadows into permanently shadowed floor"
            >
              {/* Sunbeam grazing from left at 1.5° */}
              <polygon points="0,70 210,130 600,240 0,110" fill="#D4A11E" fillOpacity="0.15" />
              <line x1="0" y1="70" x2="210" y2="130" stroke="#D4A11E" strokeWidth="2.5" />
              <line x1="210" y1="130" x2="600" y2="242" stroke="#D4A11E" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Crater Topographic Profile */}
              <path
                d="M 0,220 Q 120,200 170,160 Q 210,130 240,180 Q 290,290 380,290 Q 470,290 500,170 Q 530,140 600,180 L 600,360 L 0,360 Z"
                fill="#0A1124"
                stroke="#64748B"
                strokeWidth="2.5"
              />

              {/* Permanently Shadowed Region (Floor) */}
              <path
                d="M 230,195 Q 290,290 380,290 Q 450,290 480,205 L 600,242 L 600,360 L 210,360 Z"
                fill="#03060F"
                opacity="0.95"
              />

              {/* Sunlit Crater Rim Point (Candidate Site like Nobile Rim 2 / SP11) */}
              <g transform="translate(210, 130)">
                <circle cx="0" cy="0" r="16" fill="#D4A11E" fillOpacity="0.3" className="animate-pulse" />
                <circle cx="0" cy="0" r="6" fill="#D4A11E" stroke="#FFFFFF" strokeWidth="2" />
                <line x1="0" y1="-5" x2="0" y2="-28" stroke="#D4A11E" strokeWidth="1.5" />
                <rect x="-65" y="-48" width="130" height="20" rx="4" fill="#050816" stroke="#D4A11E" strokeWidth="1" />
                <text x="0" y="-34" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  SUNLIT ELEVATED RIM
                </text>
              </g>

              {/* PSR Floor Callout */}
              <g transform="translate(340, 280)">
                <circle cx="0" cy="0" r="5" fill="#38BDF8" />
                <text x="0" y="-12" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  PERMANENT SHADOW (PSR &lt; 110 K)
                </text>
                <text x="0" y="2" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="'Space Grotesk', sans-serif">
                  Protected water ice deposits
                </text>
              </g>

              {/* Blocked Shadow Zone Annotation */}
              <text x="430" y="210" fill="#FC3D21" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                BLOCKED SUNLIGHT (SHADOW)
              </text>
            </svg>
          )}

          {/* TAB 3: Simultaneous Sun-and-Earth Visibility */}
          {activeTab === 'simultaneous' && (
            <svg
              viewBox="0 0 600 360"
              className="w-full h-full select-none"
              role="img"
              aria-label="Operational diagram showing Sun visible while Earth is blocked by local terrain"
            >
              {/* Sun on left */}
              <g transform="translate(70, 90)">
                <circle cx="0" cy="0" r="24" fill="#D4A11E" fillOpacity="0.25" />
                <circle cx="0" cy="0" r="12" fill="#D4A11E" />
                <text x="0" y="32" textAnchor="middle" fill="#D4A11E" fontSize="10" fontFamily="'Orbitron', sans-serif" fontWeight="bold">
                  SUN (POWER)
                </text>
              </g>

              {/* Earth on right */}
              <g transform="translate(530, 90)">
                <circle cx="0" cy="0" r="22" fill="#38BDF8" fillOpacity="0.2" />
                <circle cx="0" cy="0" r="11" fill="#38BDF8" />
                <text x="0" y="32" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="'Orbitron', sans-serif" fontWeight="bold">
                  EARTH (RADIO LINK)
                </text>
              </g>

              {/* Candidate Lander Site on center ridge */}
              <path
                d="M 0,260 Q 150,230 260,170 Q 300,150 330,190 Q 420,290 600,240 L 600,360 L 0,360 Z"
                fill="#0A1124"
                stroke="#64748B"
                strokeWidth="2"
              />

              {/* Lander at (300, 150) */}
              <g transform="translate(300, 150)">
                {/* Solar Ray line of sight: Clear */}
                <line x1="-210" y1="-55" x2="-6" y2="-6" stroke="#D4A11E" strokeWidth="2.5" />
                <rect x="-190" y="-80" width="130" height="20" rx="4" fill="#050816" stroke="#D4A11E" strokeWidth="1" />
                <text x="-125" y="-66" textAnchor="middle" fill="#D4A11E" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  ✓ SUN VISIBLE (POWER ON)
                </text>

                {/* Earth Line of sight: Obstructed by terrain or libration dip */}
                <line x1="6" y1="-6" x2="160" y2="40" stroke="#FC3D21" strokeWidth="2" strokeDasharray="3 3" />
                <rect x="50" y="25" width="150" height="20" rx="4" fill="#050816" stroke="#FC3D21" strokeWidth="1" />
                <text x="125" y="39" textAnchor="middle" fill="#FC3D21" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  ✗ EARTH BLOCKED BY RIDGE
                </text>

                {/* Lander marker */}
                <circle cx="0" cy="0" r="7" fill="#FC3D21" stroke="#FFFFFF" strokeWidth="2" />
                <text x="0" y="-12" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="'Orbitron', sans-serif" fontWeight="bold">
                  LANDER
                </text>
              </g>

              {/* Key Scientific Invariant Formula Banner */}
              <g transform="translate(300, 320)">
                <rect x="-180" y="-16" width="360" height="32" rx="8" fill="#050816" stroke="#D4A11E" strokeWidth="1.2" />
                <text x="0" y="5" textAnchor="middle" fill="#F5F7FA" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                  RULE: Sun &amp; Earth Duration &le; Sun-Only Duration
                </text>
              </g>
            </svg>
          )}

          {/* Subtitle / Disclaimer badge */}
          <div className="absolute bottom-2 left-2 right-2 text-center pointer-events-none">
            <span className="text-[10px] text-[#A8B0C0]/70 font-mono bg-[#050816]/90 px-3 py-1 rounded-full border border-white/10">
              Illustrative educational diagram — conceptual, not to scale
            </span>
          </div>
        </div>

        {/* Right: Detailed Scientific Explanation Card */}
        <div className="lg:col-span-5 space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#050816] border border-[#F5F7FA]/10 space-y-2.5">
            <h4 className="font-bold text-[#D4A11E] uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4A11E]" />
              {activeTab === 'tilt' && 'Extreme Polar Horizon Geometry'}
              {activeTab === 'terrain' && 'The Critical Role of Local Topography'}
              {activeTab === 'simultaneous' && 'Mission Operational Constraints'}
            </h4>

            {activeTab === 'tilt' && (
              <p className="text-[#A8B0C0] leading-relaxed">
                Because the Moon has an axial tilt of only <strong className="text-white">~1.54°</strong> (compared to Earth's 23.5°), the Sun never climbs high into the polar sky. Instead, it skims along the 360° horizon once per lunar month (~29.5 Earth days).
              </p>
            )}

            {activeTab === 'terrain' && (
              <p className="text-[#A8B0C0] leading-relaxed">
                Elevated ridges—such as <strong className="text-white">Slater Plain (SP11)</strong> and <strong className="text-white">Nobile Rim 2 (NR2_K2023)</strong>—can capture continuous sunlight for weeks. Meanwhile, deep crater floors (like <strong className="text-white">Haworth</strong>) remain in permanent shadow (PSRs) where temperatures stay below 110 K (-163°C), preserving volatile water ice.
              </p>
            )}

            {activeTab === 'simultaneous' && (
              <p className="text-[#A8B0C0] leading-relaxed">
                A solar lander needs the Sun for electrical power, but needs a direct line of sight to Earth for mission telemetry. Because Earth also skims low and wobbles due to <strong className="text-white">lunar libration</strong>, simultaneous visibility is always equal to or shorter than Sun-only visibility (<code className="text-[#D4A11E]">Sun+Earth &le; Sun</code>).
              </p>
            )}
          </div>

          {/* Key Facts List */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-[#A8B0C0]">
              <CheckCircle2 className="w-4 h-4 text-[#D4A11E] shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">No Arbitrary Dates:</strong> Modeled midsummer windows shift ~18.6 calendar days earlier each year due to the Moon's 346.6-day eclipse year cycle.
              </span>
            </div>
            <div className="flex items-start gap-2 text-[#A8B0C0]">
              <CheckCircle2 className="w-4 h-4 text-[#FC3D21] shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Terrain Blocking:</strong> A hill only 200 meters high can completely obscure the Sun or Earth from hundreds of kilometers away at the pole.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
