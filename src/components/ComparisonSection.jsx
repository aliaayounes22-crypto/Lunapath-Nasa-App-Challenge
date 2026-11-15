import { useMemo } from 'react'
import { CheckCircle2, Info, Calendar } from 'lucide-react'
import { formatDays, AVAILABLE_YEARS } from '../data/loader'

/**
 * ComparisonSection — Multi-site scientific comparison grounded strictly in published research.
 * Displays region-level terrain statistics, verified point coordinates, and modeled midsummer visibility.
 * Styled with NASA-inspired space palette (#050816, #0A1428, #FC3D21, #D4A11E).
 */
export default function ComparisonSection({ landingSites, visibilityData, selectedYear, setSelectedYear }) {
  // Map visibility record for each site in selectedYear
  const siteVisRecords = useMemo(() => {
    const map = {}
    landingSites.forEach((site) => {
      map[site.id] = visibilityData.find(
        (r) => r.site_id === site.id && Number(r.year) === Number(selectedYear)
      ) || null
    })
    return map
  }, [landingSites, visibilityData, selectedYear])

  // Comparison metrics rows
  const comparisonRows = useMemo(() => {
    return [
      {
        category: 'Identification',
        label: 'Candidate Site ID',
        render: (site) => (
          <span className="font-mono font-bold text-[#FC3D21] bg-[#FC3D21]/15 border border-[#FC3D21]/30 px-2.5 py-1 rounded-md text-xs">
            {site.id}
          </span>
        ),
      },
      {
        category: 'Identification',
        label: 'Artemis III Candidate Region',
        render: (site) => (
          <span className="font-semibold text-[#FFFFFF]">
            {site.name} <span className="text-[#A8B0C0] font-mono font-normal">({site.region_id})</span>
          </span>
        ),
      },
      {
        category: 'Coordinates',
        label: 'Latitude (Point Coordinate)',
        render: (site) => (
          <span className="font-mono font-bold text-[#FFFFFF]">{site.latitude.toFixed(3)}°</span>
        ),
        note: 'Specific representative point, NOT region boundary',
      },
      {
        category: 'Coordinates',
        label: 'Longitude (Point Coordinate)',
        render: (site) => (
          <span className="font-mono font-bold text-[#FFFFFF]">{site.longitude.toFixed(3)}°</span>
        ),
        note: 'CRS & convention unverified; displayed as published',
      },
      {
        category: 'Region Terrain',
        label: 'Region Area Meeting Slope Criteria',
        render: (site) => (
          <span className="font-mono font-bold text-[#FFFFFF]">
            {site.terrain_statistics.area_meeting_hls_requirements_km2} km²
          </span>
        ),
        note: 'Slope < 8° and > 100 m from steeper slopes (Table 1)',
      },
      {
        category: 'Region Terrain',
        label: 'Fraction of Candidate Region',
        render: (site) => (
          <span className="font-semibold font-mono text-[#FFFFFF]">
            {site.terrain_statistics.fraction_of_region_percent}%
            {site.id === 'SP11' && (
              <span className="ml-2 text-[11px] bg-[#D4A11E]/20 text-[#D4A11E] border border-[#D4A11E]/40 px-2 py-0.5 rounded font-bold font-mono">
                Highest of 16 regions
              </span>
            )}
          </span>
        ),
      },
      {
        category: 'Region Terrain',
        label: 'Representative Sites in Region',
        render: (site) => (
          <span className="font-mono text-[#A8B0C0]">
            <strong className="text-[#FFFFFF]">{site.terrain_statistics.representative_candidate_sites}</strong> candidate points
          </span>
        ),
      },
      {
        category: 'Site Terrain',
        label: 'Site-Level Slope & Elevation',
        render: () => (
          <span className="text-[#A8B0C0]/80 italic">
            Data unavailable (regional metrics only)
          </span>
        ),
        note: 'Slope criteria evaluated at regional scale; not published per point',
      },
      {
        category: 'Volatiles',
        label: 'Accessible PSR <110 K Within 2 km',
        render: (site) => {
          if (site.accessible_psr_below_110k_within_2km === true) {
            return (
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Yes
              </span>
            )
          }
          if (site.accessible_psr_below_110k_within_2km === false) {
            return <span className="text-amber-400 font-bold">No</span>
          }
          return <span className="text-[#A8B0C0]/70 italic">Data unavailable</span>
        },
      },
      {
        category: 'Modeled Visibility',
        label: `Max Consecutive Sun Days (${selectedYear})`,
        render: (site) => {
          const rec = siteVisRecords[site.id]
          const val = rec?.max_consecutive_sun_days
          return (
            <span className="font-mono font-black text-[#D4A11E] text-base">
              {formatDays(val)}
            </span>
          )
        },
        highlight: 'gold',
      },
      {
        category: 'Modeled Visibility',
        label: `Max Consecutive Sun + Earth Days (${selectedYear})`,
        render: (site) => {
          const rec = siteVisRecords[site.id]
          const val = rec?.max_consecutive_sun_and_earth_days
          return (
            <span className="font-mono font-black text-[#FC3D21] text-base">
              {formatDays(val)}
            </span>
          )
        },
        highlight: 'red',
      },
      {
        category: 'Research Context',
        label: 'Key Scientific Advantage',
        render: (site) => (
          <span className="text-xs text-[#F5F7FA] leading-relaxed">
            {site.scientific_advantages[0] || 'See paper'}
          </span>
        ),
      },
      {
        category: 'Research Context',
        label: 'Documented Regional Constraint',
        render: (site) => (
          <span className="text-xs text-[#A8B0C0] leading-relaxed">
            {site.scientific_limitations[0] || 'See paper'}
          </span>
        ),
      },
    ]
  }, [landingSites, siteVisRecords, selectedYear])

  return (
    <section id="comparison" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-block px-3.5 py-1 mb-3 rounded-full bg-[#FC3D21]/15 border border-[#FC3D21]/40 text-xs text-[#FC3D21] font-mono uppercase tracking-wider font-bold">
          Side-By-Side Synthesis
        </div>
        <h2
          className="text-3xl sm:text-5xl font-black mb-3 tracking-tight text-[#FFFFFF]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Site <span className="text-[#FC3D21]">Comparison</span>
        </h2>
        <p className="text-base text-[#A8B0C0] max-w-2xl mx-auto">
          Direct side-by-side comparison of candidate landing sites based on published findings from
          Wueller et al. (2026) Table 1, Table A1, and Table A2.
        </p>

        {/* Year Toggle Bar */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 bg-[#0A1428] border border-[#F5F7FA]/10 px-5 py-3 rounded-2xl shadow-xl">
          <Calendar className="w-4 h-4 text-[#D4A11E]" />
          <span className="text-xs text-[#A8B0C0] font-mono font-bold">Comparing Midsummer Year:</span>
          <div className="flex gap-1.5">
            {AVAILABLE_YEARS.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  Number(selectedYear) === yr
                    ? 'btn-nasa-red shadow-[0_0_20px_rgba(252,61,33,0.5)] scale-102'
                    : 'text-[#A8B0C0] hover:text-[#FFFFFF] hover:bg-[#050816]'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop Comparison Table ── */}
      <div className="hidden lg:block bg-[#0A1428] border border-[#F5F7FA]/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" role="table" aria-label="Candidate landing sites comparison">
            <thead>
              <tr className="border-b border-[#F5F7FA]/10 bg-[#050816]">
                <th className="text-left py-4 px-6 text-[#D4A11E] font-mono text-xs uppercase tracking-wider w-1/4 font-bold">
                  Parameter / Metric
                </th>
                {landingSites.map((site) => (
                  <th key={site.id} className="text-left py-4 px-6 w-1/4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-[#FC3D21] bg-[#FC3D21]/15 border border-[#FC3D21]/30 px-2 py-0.5 rounded">
                        {site.id}
                      </span>
                    </div>
                    <span className="text-base font-bold text-[#FFFFFF] block">{site.name}</span>
                    <span className="text-xs font-mono text-[#A8B0C0] font-normal">
                      Point: {site.latitude.toFixed(3)}°, {site.longitude.toFixed(3)}°
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F7FA]/5">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-[#050816]/60 transition-colors ${
                    row.highlight === 'gold'
                      ? 'bg-[#D4A11E]/5'
                      : row.highlight === 'red'
                      ? 'bg-[#FC3D21]/5'
                      : ''
                  }`}
                >
                  <td className="py-4 px-6 text-[#F5F7FA]">
                    <div className="font-semibold text-sm text-[#FFFFFF]">{row.label}</div>
                    {row.note && (
                      <div className="text-[11px] text-[#A8B0C0] mt-0.5 font-mono leading-tight">
                        {row.note}
                      </div>
                    )}
                  </td>
                  {landingSites.map((site) => (
                    <td key={site.id} className="py-4 px-6 text-[#F5F7FA] align-top">
                      {row.render(site)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Mobile Comparison Cards ── */}
      <div className="lg:hidden space-y-6">
        {landingSites.map((site) => (
          <div
            key={site.id}
            className="bg-[#0A1428] border border-[#F5F7FA]/10 rounded-2xl p-6 space-y-4 shadow-2xl"
          >
            <div className="border-b border-[#F5F7FA]/10 pb-4">
              <span className="text-xs font-mono text-[#FC3D21] font-bold bg-[#FC3D21]/15 border border-[#FC3D21]/30 px-2.5 py-1 rounded">
                {site.id}
              </span>
              <h3 className="text-xl font-bold text-[#FFFFFF] mt-2">{site.name}</h3>
              <p className="text-xs font-mono text-[#A8B0C0]">
                Point: {site.latitude.toFixed(3)}° lat, {site.longitude.toFixed(3)}° lon
              </p>
            </div>

            <div className="space-y-3">
              {comparisonRows.map((row, idx) => (
                <div key={idx} className="flex flex-col py-2 border-b border-[#F5F7FA]/5 last:border-0">
                  <span className="text-xs text-[#A8B0C0] font-mono">{row.label}</span>
                  <div className="text-sm text-[#FFFFFF] mt-1">{row.render(site)}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Methodological Safety Notice */}
      <div className="mt-8 p-5 rounded-2xl bg-[#0A1428] border border-[#D4A11E]/30 flex items-start gap-3.5 text-xs text-[#A8B0C0]">
        <Info className="w-4 h-4 text-[#D4A11E] shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <p>
            <strong>Terrain Criterion Note:</strong> Area statistics apply to the full study region using the HLS slope threshold (&lt;8° and &gt;100 m from steeper slopes). Individual candidate sites are representative points within that suitable envelope, not guaranteed safe landing touch-down zones.
          </p>
          <p>
            <strong>Visibility Data Source:</strong> Durations are extracted directly from Table A2 of Wueller et al. (2026), representing modeled consecutive days during that calendar year’s midsummer window.
          </p>
        </div>
      </div>
    </section>
  )
}
