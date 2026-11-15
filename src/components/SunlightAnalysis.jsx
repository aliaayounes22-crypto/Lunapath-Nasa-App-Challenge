import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { sunlightData, landingSites, supportedDates, DATA_LABELS } from '../data/lunarData';
import DataLabel from './DataLabel';

/**
 * Custom tooltip for Recharts with dark styling.
 */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <p className="text-lunar font-medium">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-electric">
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  );
}

/**
 * SunlightAnalysis – displays sunlight data for a selected site and date.
 */
export default function SunlightAnalysis({ siteId, dateId }) {
  const siteData = sunlightData[siteId];
  const site = landingSites.find((s) => s.id === siteId);
  const dateInfo = supportedDates.find((d) => d.id === dateId);
  const selectedQuarter = dateInfo?.quarter;

  if (!siteData) {
    return (
      <div className="glass-card p-6">
        <h3 className="font-heading text-xl font-semibold text-lunar mb-3">
          Sunlight Analysis
        </h3>
        <div className="text-center py-8 text-muted">
          <p className="text-lg mb-2">Data Unavailable</p>
          <p className="text-sm">
            Sunlight data is not available for the selected site.
            Verified data would require ephemeris calculations from NASA/JPL Horizons.
          </p>
        </div>
      </div>
    );
  }

  // Build chart data from quarterly values
  const chartData = Object.entries(siteData.quarterlyData).map(([quarter, data]) => ({
    name: quarter,
    sunlit: data.sunlitPercent,
    peakHours: data.peakSunHours,
    isSelected: quarter === selectedQuarter,
  }));

  const currentQuarter = siteData.quarterlyData[selectedQuarter];

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h3 className="font-heading text-xl font-semibold text-lunar">
          ☀️ Sunlight Analysis
        </h3>
        <DataLabel label={siteData.label} />
      </div>

      {/* Warning banner */}
      <div className="mb-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs">
        <strong>Demonstration Data:</strong> {siteData.note}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-deepspace/60 border border-electric/10">
          <div className="text-xs text-muted uppercase tracking-wider">Annual Illumination</div>
          <div className="text-lg font-bold text-lunar mt-1">{siteData.annualIllumination}</div>
          <div className="text-xs text-muted mt-1">{siteData.annualIlluminationNote}</div>
        </div>
        {currentQuarter && (
          <div className="p-3 rounded-lg bg-deepspace/60 border border-electric/10">
            <div className="text-xs text-muted uppercase tracking-wider">
              {selectedQuarter} Sunlit Time
            </div>
            <div className="text-lg font-bold text-electric mt-1">
              {currentQuarter.sunlitPercent}%
            </div>
            <div className="text-xs text-muted mt-1">
              Peak ~{currentQuarter.peakSunHours}h/day
            </div>
            <DataLabel label={currentQuarter.label} className="mt-1" />
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="mb-2">
        <h4 className="text-xs text-muted uppercase tracking-wider mb-3">
          Quarterly Sunlit Percentage
        </h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
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
            <Bar dataKey="sunlit" name="Sunlit" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, idx) => (
                <Cell
                  key={idx}
                  fill={entry.isSelected ? '#E63946' : '#3B82F6'}
                  fillOpacity={entry.isSelected ? 1 : 0.7}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted text-center mt-1">
          Selected quarter highlighted in red
        </p>
      </div>
    </div>
  );
}
