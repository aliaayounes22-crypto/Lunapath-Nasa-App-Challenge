import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { earthVisibilityData, supportedDates, DATA_LABELS } from '../data/lunarData';
import DataLabel from './DataLabel';

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
 * EarthVisibility – displays Earth visibility information for communication planning.
 * Clearly distinguishes geometric visibility from guaranteed communication.
 */
export default function EarthVisibility({ siteId, dateId }) {
  const visData = earthVisibilityData[siteId];
  const dateInfo = supportedDates.find((d) => d.id === dateId);
  const selectedQuarter = dateInfo?.quarter;

  if (!visData) {
    return (
      <div className="glass-card p-6">
        <h3 className="font-heading text-xl font-semibold text-lunar mb-3">
          Earth Visibility
        </h3>
        <div className="text-center py-8 text-muted">
          <p className="text-lg mb-2">Data Unavailable</p>
          <p className="text-sm">
            Earth visibility data requires libration-aware ephemeris calculations.
          </p>
        </div>
      </div>
    );
  }

  const chartData = Object.entries(visData.quarterlyData).map(([quarter, data]) => ({
    name: quarter,
    visibility: data.visibilityPercent,
    isSelected: quarter === selectedQuarter,
  }));

  const currentQuarter = visData.quarterlyData[selectedQuarter];

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h3 className="font-heading text-xl font-semibold text-lunar">
          🌍 Earth Visibility
        </h3>
        <DataLabel label={visData.label} />
      </div>

      {/* Warning banner */}
      <div className="mb-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs">
        <strong>Demonstration Data:</strong> {visData.note}
      </div>

      {/* Communication distinction */}
      <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">
        <strong>Important:</strong> {visData.communicationNote}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-deepspace/60 border border-electric/10">
          <div className="text-xs text-muted uppercase tracking-wider">Geometric Visibility</div>
          <div className="text-lg font-bold text-lunar mt-1">{visData.geometricVisibility}</div>
          <div className="text-xs text-muted mt-1">Of time Earth is above horizon</div>
        </div>
        {currentQuarter && (
          <div className="p-3 rounded-lg bg-deepspace/60 border border-electric/10">
            <div className="text-xs text-muted uppercase tracking-wider">
              {selectedQuarter} Visibility
            </div>
            <div className="text-lg font-bold text-electric mt-1">
              {currentQuarter.visibilityPercent}%
            </div>
            <DataLabel label={currentQuarter.label} className="mt-1" />
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="mb-2">
        <h4 className="text-xs text-muted uppercase tracking-wider mb-3">
          Quarterly Earth Visibility
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
            <Bar dataKey="visibility" name="Visibility" radius={[4, 4, 0, 0]}>
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
