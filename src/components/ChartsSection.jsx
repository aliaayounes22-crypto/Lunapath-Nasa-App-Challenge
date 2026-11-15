import { useMemo } from 'react'
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts'
import { BarChart2, Sun, Globe } from 'lucide-react'
import { formatDays } from '../data/loader'

/**
 * ChartsSection — Interactive visibility charts with authentic NASA Red (#FC3D21),
 * Moon Gold (#D4A11E), and Lunar White (#FFFFFF) styling.
 * High contrast, legible typography and polished dark command tooltips.
 */

const SITE_PALETTE = {
  SP11: '#FC3D21',        // NASA Red
  NR2_K2023: '#D4A11E',   // Moon Gold
  HW10: '#38BDF8',        // Cyan / Ice Blue
}

const customTooltipStyle = {
  backgroundColor: '#070D1B',
  borderColor: 'rgba(212, 161, 30, 0.5)',
  borderRadius: '0.875rem',
  color: '#FFFFFF',
  boxShadow: '0 20px 35px rgba(0, 0, 0, 0.85)',
  fontSize: '12px',
  padding: '12px 16px',
}

export default function ChartsSection({ landingSites, visibilityData, selectedYear, setSelectedYear }) {
  const nameMap = useMemo(() => {
    const map = {}
    landingSites.forEach((s) => {
      map[s.id] = s.name
    })
    return map
  }, [landingSites])

  // Sun-only line chart data across 2025–2032
  const sunTrendData = useMemo(() => {
    const years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032]
    return years.map((yr) => {
      const entry = { year: yr }
      landingSites.forEach((s) => {
        const rec = visibilityData.find((r) => r.site_id === s.id && Number(r.year) === yr)
        entry[s.id] = rec ? rec.max_consecutive_sun_days : null
      })
      return entry
    })
  }, [landingSites, visibilityData])

  // Simultaneous Sun + Earth line chart data across 2025–2032
  const earthTrendData = useMemo(() => {
    const years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032]
    return years.map((yr) => {
      const entry = { year: yr }
      landingSites.forEach((s) => {
        const rec = visibilityData.find((r) => r.site_id === s.id && Number(r.year) === yr)
        entry[s.id] = rec ? rec.max_consecutive_sun_and_earth_days : null
      })
      return entry
    })
  }, [landingSites, visibilityData])

  // Bar chart: Selected year comparison across candidate sites
  const currentYearBarData = useMemo(() => {
    return landingSites.map((s) => {
      const rec = visibilityData.find((r) => r.site_id === s.id && Number(r.year) === Number(selectedYear))
      return {
        siteId: s.id,
        name: s.name,
        displayName: `${s.id} (${s.name})`,
        'Max Sun Days (Continuous)': rec?.max_consecutive_sun_days ?? null,
        'Max Sun + Earth Days (Simultaneous)': rec?.max_consecutive_sun_and_earth_days ?? null,
      }
    })
  }, [landingSites, visibilityData, selectedYear])

  const siteIds = landingSites.map((s) => s.id)

  return (
    <section id="charts" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-block px-3.5 py-1 mb-3 rounded-full bg-[#D4A11E]/15 border border-[#D4A11E]/40 text-xs text-[#D4A11E] font-mono uppercase tracking-wider font-bold">
          Illumination & Comms Telemetry
        </div>
        <h2
          className="text-3xl sm:text-5xl font-black mb-3 tracking-tight text-[#FFFFFF]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Visibility <span className="text-[#D4A11E]">Analysis</span>
        </h2>
        <p className="text-base text-[#A8B0C0] max-w-2xl mx-auto">
          Comparative multi-year illumination and direct line-of-sight modeled across lunar midsummer windows (2025–2032).
        </p>
      </div>

      <div className="space-y-10">
        {/* ── Chart 1: Sun Visibility Multi-Year Line Chart ── */}
        <div className="bg-[#0A1428] border border-[#F5F7FA]/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2 text-[#FFFFFF]">
                <Sun className="w-5 h-5 text-[#D4A11E]" />
                Maximum Consecutive Sun Visibility (2025–2032)
              </h3>
              <p className="text-xs text-[#A8B0C0] mt-1 font-mono">
                Longest unbroken run of continuous solar illumination at candidate site pixels per midsummer window.
              </p>
            </div>
            <span className="text-xs font-mono text-[#D4A11E] bg-[#D4A11E]/10 px-3 py-1.5 rounded-full border border-[#D4A11E]/30 w-fit font-bold">
              Units: Days (12h model steps)
            </span>
          </div>

          <div className="w-full h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sunTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,247,250,0.06)" />
                <XAxis dataKey="year" stroke="#A8B0C0" fontSize={12} fontFamily="'JetBrains Mono', monospace" />
                <YAxis stroke="#A8B0C0" fontSize={12} unit=" d" domain={[0, 20]} fontFamily="'JetBrains Mono', monospace" />
                <Tooltip
                  contentStyle={customTooltipStyle}
                  formatter={(val, name) => [formatDays(val), `${name} — ${nameMap[name] || ''}`]}
                  labelFormatter={(yr) => `Modeled Midsummer ${yr}`}
                />
                <Legend
                  formatter={(value) => `${value} (${nameMap[value] || value})`}
                  wrapperStyle={{ paddingTop: '16px', fontSize: '13px', color: '#F5F7FA', fontFamily: "'Space Grotesk', sans-serif" }}
                />
                {siteIds.map((id) => (
                  <Line
                    key={id}
                    type="monotone"
                    dataKey={id}
                    name={id}
                    stroke={SITE_PALETTE[id]}
                    strokeWidth={2.75}
                    dot={{ r: 4, strokeWidth: 2, fill: '#0A1428' }}
                    activeDot={{ r: 7, fill: SITE_PALETTE[id] }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Chart 2: Sun + Earth Visibility Multi-Year Line Chart ── */}
        <div className="bg-[#0A1428] border border-[#F5F7FA]/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2 text-[#FFFFFF]">
                <Globe className="w-5 h-5 text-[#FC3D21]" />
                Maximum Consecutive Sun + Earth Visibility (2025–2032)
              </h3>
              <p className="text-xs text-[#A8B0C0] mt-1 font-mono">
                Simultaneous continuous solar power and unocculted direct radio line-of-sight to Earth. Always &le; Sun-only value.
              </p>
            </div>
            <span className="text-xs font-mono text-[#FC3D21] bg-[#FC3D21]/10 px-3 py-1.5 rounded-full border border-[#FC3D21]/30 w-fit font-bold">
              Source: Table A2, Wueller et al. (2026)
            </span>
          </div>

          <div className="w-full h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earthTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,247,250,0.06)" />
                <XAxis dataKey="year" stroke="#A8B0C0" fontSize={12} fontFamily="'JetBrains Mono', monospace" />
                <YAxis stroke="#A8B0C0" fontSize={12} unit=" d" domain={[0, 20]} fontFamily="'JetBrains Mono', monospace" />
                <Tooltip
                  contentStyle={customTooltipStyle}
                  formatter={(val, name) => [formatDays(val), `${name} — ${nameMap[name] || ''}`]}
                  labelFormatter={(yr) => `Modeled Midsummer ${yr}`}
                />
                <Legend
                  formatter={(value) => `${value} (${nameMap[value] || value})`}
                  wrapperStyle={{ paddingTop: '16px', fontSize: '13px', color: '#F5F7FA', fontFamily: "'Space Grotesk', sans-serif" }}
                />
                {siteIds.map((id) => (
                  <Line
                    key={id}
                    type="monotone"
                    dataKey={id}
                    name={id}
                    stroke={SITE_PALETTE[id]}
                    strokeWidth={2.75}
                    dot={{ r: 4, strokeWidth: 2, fill: '#0A1428' }}
                    activeDot={{ r: 7, fill: SITE_PALETTE[id] }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Chart 3: Selected Year Direct Comparison Bar Chart ── */}
        <div className="bg-[#0A1428] border border-[#F5F7FA]/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2 text-[#FFFFFF]">
                <BarChart2 className="w-5 h-5 text-[#D4A11E]" />
                Direct Comparison for Modeled Midsummer {selectedYear}
              </h3>
              <p className="text-xs text-[#A8B0C0] mt-1 font-mono">
                Comparing Sun-only (Moon Gold) versus simultaneous Sun + Earth (NASA Red) across candidate sites.
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-[#A8B0C0] font-mono font-bold">Select Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="bg-[#050816] border border-[#D4A11E]/50 text-[#FFFFFF] font-bold text-xs font-mono rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#D4A11E]"
                aria-label="Select year for comparison bar chart"
              >
                {[2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032].map((y) => (
                  <option key={y} value={y}>
                    Year {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentYearBarData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,247,250,0.06)" />
                <XAxis dataKey="displayName" stroke="#A8B0C0" fontSize={12} fontFamily="'Space Grotesk', sans-serif" />
                <YAxis stroke="#A8B0C0" fontSize={12} unit=" d" domain={[0, 20]} fontFamily="'JetBrains Mono', monospace" />
                <Tooltip
                  contentStyle={customTooltipStyle}
                  formatter={(val) => [formatDays(val), '']}
                  labelFormatter={(name) => `Site: ${name}`}
                />
                <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '13px', color: '#F5F7FA', fontFamily: "'Space Grotesk', sans-serif" }} />
                <Bar dataKey="Max Sun Days (Continuous)" fill="#D4A11E" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Max Sun + Earth Days (Simultaneous)" fill="#FC3D21" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
