import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  landingSites, sunlightData, earthVisibilityData, supportedDates, DATA_LABELS,
} from '../data/lunarData';
import SectionWrapper from './SectionWrapper';
import DataLabel from './DataLabel';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <p className="text-lunar font-medium mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  );
}

/**
 * ComparisonDashboard – compare two landing sites side by side.
 */
export default function ComparisonDashboard() {
  const [siteAId, setSiteAId] = useState('');
  const [siteBId, setSiteBId] = useState('');
  const [dateId, setDateId] = useState(supportedDates[0].id);

  const siteA = landingSites.find((s) => s.id === siteAId);
  const siteB = landingSites.find((s) => s.id === siteBId);
  const dateInfo = supportedDates.find((d) => d.id === dateId);
  const quarter = dateInfo?.quarter;
  const bothSelected = siteA && siteB;

  // Build comparison chart data
  const chartData = bothSelected
    ? ['Q1', 'Q2', 'Q3', 'Q4'].map((q) => ({
        name: q,
        [siteA.name]: sunlightData[siteAId]?.quarterlyData[q]?.sunlitPercent || 0,
        [siteB.name]: sunlightData[siteBId]?.quarterlyData[q]?.sunlitPercent || 0,
      }))
    : [];

  return (
    <SectionWrapper
      id="compare"
      title="Site Comparison"
      subtitle="Compare two candidate landing sites side by side."
    >
      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="text-xs text-muted uppercase tracking-wider block mb-2">
            Site A
          </label>
          <select
            value={siteAId}
            onChange={(e) => setSiteAId(e.target.value)}
            className="w-full p-3 rounded-lg bg-midnight border border-electric/20 text-lunar text-sm focus:border-electric focus:outline-none transition-colors"
          >
            <option value="">Select a site...</option>
            {landingSites.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted uppercase tracking-wider block mb-2">
            Site B
          </label>
          <select
            value={siteBId}
            onChange={(e) => setSiteBId(e.target.value)}
            className="w-full p-3 rounded-lg bg-midnight border border-electric/20 text-lunar text-sm focus:border-electric focus:outline-none transition-colors"
          >
            <option value="">Select a site...</option>
            {landingSites.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted uppercase tracking-wider block mb-2">
            Time Window
          </label>
          <select
            value={dateId}
            onChange={(e) => setDateId(e.target.value)}
            className="w-full p-3 rounded-lg bg-midnight border border-electric/20 text-lunar text-sm focus:border-electric focus:outline-none transition-colors"
          >
            {supportedDates.map((d) => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
        </div>
      </div>

      {!bothSelected ? (
        <div className="glass-card p-12 text-center text-muted">
          <div className="text-4xl mb-4 opacity-50">⚖️</div>
          <p className="text-lg">Select two landing sites above to compare them</p>
        </div>
      ) : (
        <>
          {/* Comparison table */}
          <div className="glass-card overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-electric/10">
                  <th className="text-left p-4 text-muted font-medium uppercase tracking-wider text-xs">
                    Parameter
                  </th>
                  <th className="text-left p-4 text-electric font-heading font-semibold">
                    {siteA.name}
                  </th>
                  <th className="text-left p-4 text-mission-red font-heading font-semibold">
                    {siteB.name}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-electric/5">
                <tr>
                  <td className="p-4 text-muted">Region</td>
                  <td className="p-4 text-lunar">{siteA.region}</td>
                  <td className="p-4 text-lunar">{siteB.region}</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted">
                    Coordinates <DataLabel label={DATA_LABELS.APPROXIMATE} className="ml-1" />
                  </td>
                  <td className="p-4 text-lunar font-mono text-xs">
                    {siteA.coordinates.lat.toFixed(2)}°, {siteA.coordinates.lon.toFixed(2)}°
                  </td>
                  <td className="p-4 text-lunar font-mono text-xs">
                    {siteB.coordinates.lat.toFixed(2)}°, {siteB.coordinates.lon.toFixed(2)}°
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-muted">Terrain</td>
                  <td className="p-4 text-lunar">{siteA.terrain}</td>
                  <td className="p-4 text-lunar">{siteB.terrain}</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted">
                    Annual Illumination <DataLabel label={DATA_LABELS.DEMONSTRATION} className="ml-1" />
                  </td>
                  <td className="p-4 text-lunar">
                    {sunlightData[siteAId]?.annualIllumination || 'N/A'}
                  </td>
                  <td className="p-4 text-lunar">
                    {sunlightData[siteBId]?.annualIllumination || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-muted">
                    {quarter} Sunlit % <DataLabel label={DATA_LABELS.DEMONSTRATION} className="ml-1" />
                  </td>
                  <td className="p-4 text-electric font-bold">
                    {sunlightData[siteAId]?.quarterlyData[quarter]?.sunlitPercent ?? 'N/A'}%
                  </td>
                  <td className="p-4 text-mission-red font-bold">
                    {sunlightData[siteBId]?.quarterlyData[quarter]?.sunlitPercent ?? 'N/A'}%
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-muted">
                    {quarter} Earth Visibility <DataLabel label={DATA_LABELS.DEMONSTRATION} className="ml-1" />
                  </td>
                  <td className="p-4 text-electric font-bold">
                    {earthVisibilityData[siteAId]?.quarterlyData[quarter]?.visibilityPercent ?? 'N/A'}%
                  </td>
                  <td className="p-4 text-mission-red font-bold">
                    {earthVisibilityData[siteBId]?.quarterlyData[quarter]?.visibilityPercent ?? 'N/A'}%
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-muted">
                    Earth Visibility (Annual) <DataLabel label={DATA_LABELS.DEMONSTRATION} className="ml-1" />
                  </td>
                  <td className="p-4 text-lunar">
                    {earthVisibilityData[siteAId]?.geometricVisibility || 'N/A'}
                  </td>
                  <td className="p-4 text-lunar">
                    {earthVisibilityData[siteBId]?.geometricVisibility || 'N/A'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Comparison chart */}
          <div className="glass-card p-6 mb-8">
            <h4 className="font-heading text-lg font-semibold text-lunar mb-4">
              Quarterly Sunlight Comparison
            </h4>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                  axisLine={{ stroke: '#1e293b' }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                  axisLine={{ stroke: '#1e293b' }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ color: '#94A3B8', fontSize: 12 }}
                />
                <Bar dataKey={siteA.name} fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey={siteB.name} fill="#E63946" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Disclaimer */}
          <div className="glass-card p-6 border-orange-500/20">
            <div className="flex items-start gap-3">
              <span className="text-orange-400 text-xl mt-0.5">⚠</span>
              <div>
                <h4 className="font-heading font-semibold text-orange-300 mb-2">
                  Comparison Disclaimer
                </h4>
                <p className="text-sm text-muted leading-relaxed">
                  This comparison uses <strong className="text-orange-300">demonstration data</strong> that 
                  does not represent real measurements. A production mission-planning system would use 
                  validated ephemeris calculations from NASA/JPL Horizons. This prototype does not 
                  recommend any specific site — actual site selection requires comprehensive engineering 
                  analysis beyond the scope of this educational tool.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </SectionWrapper>
  );
}
