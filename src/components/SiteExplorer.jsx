import { MapPin, Layers, Sun, Globe, Calendar, AlertCircle, Sparkles } from 'lucide-react'
import { formatDays, AVAILABLE_YEARS } from '../data/loader'

/**
 * SiteExplorer — Mission Site Explorer with authentic NASA Red, Moon Gold, and Lunar White styling.
 * Scientific verification:
 * - Representative point coordinates (Wueller et al. 2026 Table A1)
 * - Region-level terrain statistics (Table 1)
 * - Separate Sun-only (Moon Gold) and Sun+Earth (NASA Red) metric cards
 * - Streamlined scientific transparency panel (no repetitive warning clutter)
 */
export default function SiteExplorer({
  selectedSite,
  setSelectedSite,
  selectedYear,
  setSelectedYear,
  landingSites,
  visibilityData,
}) {
  const currentSite = landingSites.find((s) => s.id === selectedSite) || landingSites[0]

  // Lookup visibility record for selected site and year
  const visRecord = visibilityData.find(
    (v) => v.site_id === selectedSite && Number(v.year) === Number(selectedYear)
  )

  const regionTerrain = currentSite.terrain_statistics

  return (
    <section id="explorer" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-block px-3.5 py-1 mb-3 rounded-full bg-[#FC3D21]/15 border border-[#FC3D21]/40 text-xs text-[#FC3D21] font-mono uppercase tracking-wider font-bold">
          NASA Mission Telemetry
        </div>
        <h2
          className="text-3xl sm:text-5xl font-black mb-3 tracking-tight text-[#FFFFFF]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Mission Site <span className="text-[#FC3D21]">Explorer</span>
        </h2>
        <p className="text-base text-[#A8B0C0] max-w-2xl mx-auto">
          Evaluate candidate landing site points within Artemis candidate regions.
          Illumination and simultaneous Earth communication windows reflect peer-reviewed modeled midsummer maxima.
        </p>
      </div>

      {/* ── 1. Candidate Site Selector ── */}
      <div className="mb-8">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#D4A11E] font-bold mb-3">
          1. Select Candidate Landing Site (Representative Point)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="radiogroup" aria-label="Candidate landing sites">
          {landingSites.map((site) => {
            const isSelected = selectedSite === site.id
            return (
              <button
                key={site.id}
                onClick={() => setSelectedSite(site.id)}
                role="radio"
                aria-checked={isSelected}
                className={`p-5 rounded-2xl text-left transition-all duration-300 relative border ${
                  isSelected
                    ? 'border-[#FC3D21] bg-gradient-to-br from-[#0A1428] to-[#182642] shadow-[0_0_35px_rgba(252,61,33,0.35)] ring-2 ring-[#FC3D21]/60'
                    : 'border-[#F5F7FA]/10 bg-[#0A1428]/80 hover:border-[#D4A11E]/50 hover:bg-[#0A1428]'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-4 right-4 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FC3D21] opacity-80"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FC3D21]"></span>
                  </span>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-[#FC3D21] text-white' : 'bg-[#D4A11E]/20 text-[#D4A11E]'
                  }`}>
                    {site.id}
                  </span>
                  <span className="text-xs text-[#A8B0C0] font-mono">
                    Region: <strong className="text-[#F5F7FA]">{site.region_id}</strong>
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#FFFFFF] mb-2">{site.name}</h3>
                <div className="text-xs text-[#A8B0C0] font-mono space-y-0.5">
                  <p>Latitude: <span className="text-[#F5F7FA] font-bold">{site.latitude.toFixed(3)}°</span></p>
                  <p>Longitude: <span className="text-[#F5F7FA] font-bold">{site.longitude.toFixed(3)}°</span></p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── 2. Modeled Year Selector (2025–2032) ── */}
      <div className="mb-10 bg-[#0A1428] border border-[#F5F7FA]/10 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <label className="text-xs font-mono uppercase tracking-wider text-[#D4A11E] font-bold">
            2. Select Modeled Midsummer Year (2025–2032)
          </label>
          <span className="text-xs text-[#D4A11E] font-mono font-bold">
            {visRecord
              ? `Modeled Window: ${visRecord.midsummer_start} to ${visRecord.midsummer_end} (${visRecord.midsummer_length_days} days)`
              : 'Window data unavailable'}
          </span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {AVAILABLE_YEARS.map((yr) => {
            const isSelected = Number(selectedYear) === yr
            return (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`py-3 px-2 rounded-xl text-sm font-bold font-mono transition-all duration-200 text-center ${
                  isSelected
                    ? 'btn-nasa-red shadow-[0_0_25px_rgba(252,61,33,0.5)] scale-102 ring-1 ring-white/30'
                    : 'bg-[#050816] text-[#A8B0C0] hover:text-[#FFFFFF] border border-[#F5F7FA]/10 hover:border-[#D4A11E]/50'
                }`}
              >
                {yr}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── 3. Scientific Data Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {/* Card 1: Point Coordinates */}
        <div className="nasa-panel p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[#D4A11E] mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D4A11E] font-bold">Representative Point</span>
              <MapPin className="w-5 h-5 text-[#D4A11E]" />
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <span className="text-xs text-[#A8B0C0] block font-mono">Latitude</span>
                <span className="text-3xl font-bold font-mono text-[#FFFFFF]">{currentSite.latitude.toFixed(3)}°</span>
              </div>
              <div>
                <span className="text-xs text-[#A8B0C0] block font-mono">Longitude</span>
                <span className="text-3xl font-bold font-mono text-[#FFFFFF]">{currentSite.longitude.toFixed(3)}°</span>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-[#A8B0C0] border-t border-[#F5F7FA]/10 pt-3 space-y-1">
            <p>Source: {currentSite.coordinate_source.source_id} ({currentSite.coordinate_source.table})</p>
            <p className="text-[#D4A11E]">CRS & convention: Unverified text</p>
          </div>
        </div>

        {/* Card 2: Region Terrain Statistics */}
        <div className="nasa-panel p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[#D4A11E] mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D4A11E] font-bold">Region-Level Terrain</span>
              <Layers className="w-5 h-5" />
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <span className="text-xs text-[#A8B0C0] block font-mono">Area Meeting Slope Criteria</span>
                <span className="text-3xl font-bold font-mono text-[#FFFFFF]">
                  {regionTerrain ? `${regionTerrain.area_meeting_hls_requirements_km2} km²` : 'Data unavailable'}
                </span>
                <span className="text-sm text-[#D4A11E] ml-2 font-mono font-bold">
                  ({regionTerrain ? `${regionTerrain.fraction_of_region_percent}%` : ''})
                </span>
              </div>
              <div className="text-xs text-[#A8B0C0]">
                <span className="block font-mono">Studied Candidate Points:</span>
                <span className="font-mono text-[#FFFFFF] font-bold">{regionTerrain ? regionTerrain.representative_candidate_sites : 'Data unavailable'} points</span>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-[#A8B0C0] border-t border-[#F5F7FA]/10 pt-3">
            <p>Criterion: slope &lt; 8° and &gt; 100 m from steeper slopes (HLS requirement).</p>
            <p className="text-[#D4A11E]">Site-level slope/elevation: Regional metrics only.</p>
          </div>
        </div>

        {/* Card 3: PSR Accessibility */}
        <div className="nasa-panel p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[#D4A11E] mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D4A11E] font-bold">Volatiles & Shadow</span>
              <Sparkles className="w-5 h-5 text-[#D4A11E]" />
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <span className="text-xs text-[#A8B0C0] block font-mono">Accessible PSR &lt;110 K within 2 km</span>
                <span className="text-3xl font-bold font-mono text-[#FFFFFF]">
                  {currentSite.accessible_psr_below_110k_within_2km === true
                    ? 'Yes'
                    : currentSite.accessible_psr_below_110k_within_2km === false
                    ? 'No'
                    : 'Data unavailable'}
                </span>
              </div>
              <div className="text-xs text-[#A8B0C0] leading-relaxed">
                {currentSite.site_notes.length > 0
                  ? currentSite.site_notes[0]
                  : 'PSR accessibility details not published in retrieved extract.'}
              </div>
            </div>
          </div>
          <div className="text-[11px] text-[#A8B0C0] border-t border-[#F5F7FA]/10 pt-3">
            Source: Wueller et al. (2026) volatile accessibility study.
          </div>
        </div>

        {/* Card 4: Max Consecutive Sun Days (SEPARATE - High-Impact Moon Gold) */}
        <div className="bg-[#0A1428] border-2 border-[#D4A11E] rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(212,161,30,0.18)]">
          <div>
            <div className="flex items-center justify-between text-[#D4A11E] mb-4">
              <span className="text-xs font-mono uppercase tracking-wider font-bold">Continuous Solar Illumination</span>
              <Sun className="w-5 h-5 text-[#D4A11E]" />
            </div>
            <div className="mb-3">
              <span className="text-xs text-[#A8B0C0] block font-mono">Max Consecutive Sun Days</span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-[#D4A11E] mt-1 tracking-tight">
                {formatDays(visRecord?.max_consecutive_sun_days)}
              </div>
            </div>
            <p className="text-xs text-[#A8B0C0] leading-relaxed mb-3">
              Longest unbroken run of continuous solar illumination at candidate site pixel during the {selectedYear} modeled midsummer.
            </p>
          </div>
          <div className="text-[11px] text-[#A8B0C0] border-t border-[#F5F7FA]/10 pt-3 font-mono">
            Table A2 (Wueller et al. 2026) · Year {selectedYear}
          </div>
        </div>

        {/* Card 5: Max Consecutive Sun + Earth Days (SEPARATE - High-Impact NASA Red) */}
        <div className="bg-[#0A1428] border-2 border-[#FC3D21] rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(252,61,33,0.22)]">
          <div>
            <div className="flex items-center justify-between text-[#FC3D21] mb-4">
              <span className="text-xs font-mono uppercase tracking-wider font-bold">Simultaneous Comms & Power</span>
              <Globe className="w-5 h-5 text-[#FC3D21]" />
            </div>
            <div className="mb-3">
              <span className="text-xs text-[#A8B0C0] block font-mono">Max Consecutive Sun + Earth Days</span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-[#FC3D21] mt-1 tracking-tight">
                {formatDays(visRecord?.max_consecutive_sun_and_earth_days)}
              </div>
            </div>
            <p className="text-xs text-[#A8B0C0] leading-relaxed mb-3">
              Longest unbroken run with Sun and Earth simultaneously visible at the site pixel. Always &le; Sun-only value.
            </p>
          </div>
          <div className="text-[11px] text-[#A8B0C0] border-t border-[#F5F7FA]/10 pt-3 font-mono">
            Direct-to-Earth line of sight + illumination
          </div>
        </div>

        {/* Card 6: Midsummer Window Context */}
        <div className="nasa-panel p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[#D4A11E] mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D4A11E] font-bold">Orbital Midsummer Window</span>
              <Calendar className="w-5 h-5 text-[#D4A11E]" />
            </div>
            <div className="space-y-2 mb-3">
              <div>
                <span className="text-xs text-[#A8B0C0] block font-mono">Window Duration</span>
                <span className="text-3xl font-bold font-mono text-[#FFFFFF]">
                  {visRecord ? `${visRecord.midsummer_length_days} days` : 'Data unavailable'}
                </span>
              </div>
              <div className="text-xs font-mono text-[#A8B0C0] space-y-0.5">
                <p>Start: <span className="text-[#FFFFFF] font-bold">{visRecord?.midsummer_start || 'Data unavailable'}</span></p>
                <p>End: <span className="text-[#FFFFFF] font-bold">{visRecord?.midsummer_end || 'Data unavailable'}</span></p>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-[#A8B0C0] border-t border-[#F5F7FA]/10 pt-3">
            Source: Table 2, Wueller et al. (2026). Eclipse year cycle (~346.6 days).
          </div>
        </div>
      </div>

      {/* ── 4. Consolidated Scientific Transparency Panel ── */}
      <div className="bg-[#0A1428] border border-[#D4A11E]/40 rounded-2xl p-6 sm:p-7 shadow-2xl">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-[#D4A11E] shrink-0 mt-0.5" />
          <div className="space-y-2.5 text-sm leading-relaxed">
            <h4 className="font-bold text-[#FFFFFF] tracking-wide text-base">
              Scientific Model Scope & Transparency Notice
            </h4>
            <p className="text-xs sm:text-sm text-[#A8B0C0]">
              • <strong>Modeled midsummer maxima:</strong> Reported days represent the longest unbroken sequence of continuous visibility during that calendar year’s midsummer window (derived from 12-hour simulation steps using LOLA horizon profiles). These values do not predict conditions for arbitrary dates or seasons.
            </p>
            <p className="text-xs sm:text-sm text-[#A8B0C0]">
              • <strong>Representative point coordinates:</strong> Coordinates designate specific representative landing points evaluated in published research, not whole regional boundaries. Candidate sites can be shifted within the suitable terrain area.
            </p>
            <p className="text-xs sm:text-sm text-[#A8B0C0]">
              • <strong>Terrain slope criteria:</strong> The studied HLS criterion (slope &lt;8° and &gt;100 m from steeper slopes) does not guarantee landing safety; local surface roughness, micro-craters, boulder fields, and descent lighting remain critical factors.
            </p>
            <p className="text-xs text-[#D4A11E] font-medium">
              • <strong>HW10 Publication Note:</strong> Table A2 reports 0–7 combined visibility days across 2025–2032 for HW10, whereas narrative text notes HW04 and HW10 exceed 25 days in at least one year. In scientific fidelity, LunaPath visualizes the published Table A2 numbers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
