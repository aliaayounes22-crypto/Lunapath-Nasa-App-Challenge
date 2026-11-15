import React from 'react'
import { Compass, Info, CheckCircle2 } from 'lucide-react'

/**
 * LunarPolar2D — High-fidelity 2D Lunar South Pole Polar Stereographic Projection.
 * Serves as both an interactive technical polar chart and the robust fallback
 * when WebGL is unavailable or prefers-reduced-motion is active.
 *
 * Grounded in coordinates from Wueller et al. (2026), Appendix Table A1.
 */
export default function LunarPolar2D({ selectedSite, onSelectSite, landingSites }) {
  // Center of the projection circle is (250, 250), representing the South Pole (90°S).
  // The outer rim represents 83.5°S (radius ~220px).
  // Polar Stereographic math:
  // r = 220 * (90 - abs(lat)) / (90 - 83.5)
  // angle = lon in radians (0° towards bottom or right)
  const cx = 250
  const cy = 250
  const maxR = 215
  const minLat = 83.5

  const projectCoord = (lat, lon) => {
    const absLat = Math.abs(lat)
    const r = (maxR * (90 - absLat)) / (90 - minLat)
    // Longitude angle in radians (-180 to 180)
    // Orient 0° to the top (-Y) so Prime Meridian points upwards
    const rad = ((lon - 90) * Math.PI) / 180
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
      r,
    }
  }

  // Sites from verified data
  const sites = [
    {
      id: 'SP11',
      name: 'SP11 (Slater Plain)',
      region: 'Slater Plain',
      lat: -86.95,
      lon: 126.675,
      notes: 'Plains terrain, 19.3% suitable area, boulder-free in radar data',
    },
    {
      id: 'NR2_K2023',
      name: 'NR2_K2023 (Nobile Rim 2)',
      region: 'Nobile Rim 2',
      lat: -84.074,
      lon: 59.197,
      notes: 'Crater rim location, 14.0% suitable area, 56.9 km² suitable terrain',
    },
    {
      id: 'HW10',
      name: 'HW10 (Haworth)',
      region: 'Haworth',
      lat: -86.527,
      lon: -14.876,
      notes: 'Near western rim of Haworth crater, accessible cold PSR',
    },
  ]

  // Key craters for context
  const polarCraters = [
    { name: 'Shackleton', lat: -89.9, lon: 0.0, radiusKm: 10.5 },
    { name: 'Haworth', lat: -87.4, lon: -5.1, radiusKm: 26 },
    { name: 'Shoemaker', lat: -88.1, lon: 45.0, radiusKm: 25 },
    { name: 'Faustini', lat: -87.3, lon: 77.0, radiusKm: 19.5 },
    { name: 'Nobile', lat: -85.2, lon: 53.5, radiusKm: 36.5 },
    { name: 'de Gerlache', lat: -88.5, lon: -87.0, radiusKm: 16.5 },
    { name: 'Amundsen', lat: -84.5, lon: 82.8, radiusKm: 51 },
  ]

  return (
    <div className="relative w-full max-w-lg mx-auto bg-[#070D1B] rounded-2xl border border-[#F5F7FA]/10 p-4 shadow-2xl">
      {/* Header telemetry badge */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#F5F7FA]/10 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#D4A11E]">
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span className="font-bold uppercase tracking-wider">Lunar South Pole Projection</span>
        </div>
        <span className="text-[#A8B0C0]/70 text-[11px]">84°S – 90°S Polar Grid</span>
      </div>

      {/* SVG Stereographic Map */}
      <div className="relative aspect-square w-full">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full select-none"
          role="img"
          aria-label="Lunar South Pole stereographic chart with candidate landing sites"
        >
          <defs>
            {/* Deep space background gradient */}
            <radialGradient id="polarBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0B1528" />
              <stop offset="70%" stopColor="#070D1B" />
              <stop offset="100%" stopColor="#050816" />
            </radialGradient>

            {/* Inky permanently shadowed region pattern */}
            <pattern id="psrPattern" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M 0 3 L 6 3 M 3 0 L 3 6" stroke="#03060F" strokeWidth="1" opacity="0.8" />
            </pattern>

            {/* Active marker pulse aura */}
            <radialGradient id="selectedSiteAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FC3D21" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#D4A11E" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D4A11E" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Projection Base Circle */}
          <circle cx={cx} cy={cy} r={maxR} fill="url(#polarBg)" stroke="#334155" strokeWidth="1.5" />

          {/* Latitude Concentric Rings */}
          {[84, 85, 86, 87, 88, 89].map((lat) => {
            const r = (maxR * (90 - lat)) / (90 - minLat)
            return (
              <g key={lat}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                  opacity={lat === 89 ? 0.7 : 0.4}
                />
                <text
                  x={cx + 4}
                  y={cy - r + 11}
                  fill="#94A3B8"
                  fontSize="9"
                  fontFamily="'JetBrains Mono', monospace"
                  opacity="0.6"
                >
                  {lat}°S
                </text>
              </g>
            )
          })}

          {/* Longitude Meridian Spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((lon) => {
            const rad = ((lon - 90) * Math.PI) / 180
            const x2 = cx + maxR * Math.cos(rad)
            const y2 = cy + maxR * Math.sin(rad)
            return (
              <g key={lon}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={x2}
                  y2={y2}
                  stroke="#334155"
                  strokeWidth="0.6"
                  opacity="0.35"
                />
                <text
                  x={cx + (maxR - 14) * Math.cos(rad)}
                  y={cy + (maxR - 14) * Math.sin(rad) + 3}
                  textAnchor="middle"
                  fill="#64748B"
                  fontSize="8"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {lon}°
                </text>
              </g>
            )
          })}

          {/* Polar Craters & Shadowed Floors */}
          {polarCraters.map((crater) => {
            const p = projectCoord(crater.lat, crater.lon)
            const pxRadius = (crater.radiusKm / 100) * 28 + 4
            return (
              <g key={crater.name} className="pointer-events-none">
                {/* Crater outer rim */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={pxRadius}
                  fill="#0E1A33"
                  stroke="#64748B"
                  strokeWidth="1.2"
                  opacity="0.75"
                />
                {/* Permanently shadowed floor */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={pxRadius * 0.65}
                  fill="#03060F"
                  stroke="#1E293B"
                  strokeWidth="0.8"
                />
                {/* Crater name */}
                <text
                  x={p.x}
                  y={p.y + pxRadius + 9}
                  textAnchor="middle"
                  fill="#A8B0C0"
                  fontSize="8"
                  fontFamily="'Space Grotesk', sans-serif"
                  fontWeight="600"
                  opacity="0.85"
                >
                  {crater.name}
                </text>
              </g>
            )
          })}

          {/* South Pole Center (90°S) */}
          <g>
            <circle cx={cx} cy={cy} r="4" fill="#D4A11E" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} stroke="#D4A11E" strokeWidth="1" />
            <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} stroke="#D4A11E" strokeWidth="1" />
            <text
              x={cx}
              y={cy + 15}
              textAnchor="middle"
              fill="#D4A11E"
              fontSize="9"
              fontFamily="'Orbitron', sans-serif"
              fontWeight="bold"
            >
              SOUTH POLE (90°S)
            </text>
          </g>

          {/* Candidate Landing Sites */}
          {sites.map((site) => {
            const p = projectCoord(site.lat, site.lon)
            const isSelected = selectedSite === site.id

            return (
              <g
                key={site.id}
                onClick={() => onSelectSite && onSelectSite(site.id)}
                className="cursor-pointer transition-transform duration-200"
                role="button"
                tabIndex={0}
                aria-label={`Select candidate site ${site.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectSite && onSelectSite(site.id)
                  }
                }}
              >
                {/* Selection Pulse Aura */}
                {isSelected && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="24"
                    fill="url(#selectedSiteAura)"
                    className="animate-pulse"
                  />
                )}

                {/* Target Pin Outer Ring */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSelected ? '9' : '6.5'}
                  fill={isSelected ? '#FC3D21' : '#0A1428'}
                  stroke={isSelected ? '#FFFFFF' : '#D4A11E'}
                  strokeWidth={isSelected ? '2' : '1.5'}
                />

                {/* Pin Core */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="2.5"
                  fill={isSelected ? '#FFFFFF' : '#D4A11E'}
                />

                {/* Site Label Badge */}
                <g transform={`translate(${p.x}, ${p.y - (isSelected ? 16 : 13)})`}>
                  <rect
                    x="-32"
                    y="-12"
                    width="64"
                    height="16"
                    rx="4"
                    fill={isSelected ? '#FC3D21' : '#050816'}
                    fillOpacity="0.95"
                    stroke={isSelected ? '#FFFFFF' : '#D4A11E'}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="-1"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="8.5"
                    fontFamily="'JetBrains Mono', monospace"
                    fontWeight="bold"
                  >
                    {site.id}
                  </text>
                </g>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Selected Site Detail Footer Card */}
      {selectedSite && (
        <div className="mt-3 p-3 bg-[#0A1428] rounded-xl border border-[#D4A11E]/30 flex items-start gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-[#D4A11E] shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#FFFFFF]">
                {sites.find((s) => s.id === selectedSite)?.name}
              </span>
              <span className="text-[11px] font-mono text-[#D4A11E]">
                {sites.find((s) => s.id === selectedSite)?.lat}°,{' '}
                {sites.find((s) => s.id === selectedSite)?.lon}°
              </span>
            </div>
            <p className="text-[11px] text-[#A8B0C0] mt-0.5 leading-snug">
              {sites.find((s) => s.id === selectedSite)?.notes}
            </p>
          </div>
        </div>
      )}

      {/* Scientific Transparency Caption */}
      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-[#64748B] font-mono justify-center">
        <Info className="w-3 h-3 text-[#D4A11E]" />
        <span>Stereographic polar chart — representative candidate points from Wueller et al. (2026) Table A1</span>
      </div>
    </div>
  )
}
