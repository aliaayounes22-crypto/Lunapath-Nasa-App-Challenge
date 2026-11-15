import React from 'react';
import { landingSites, DATA_LABELS } from '../data/lunarData';
import DataLabel from './DataLabel';

/**
 * 2D Fallback – Polar Stereographic Map of Lunar South Pole (85°S to 90°S).
 * Accurately plots sites based on latitude and longitude in a polar coordinate frame.
 */
export default function SpaceView2D({ selectedSite, onSelectSite, selectedDate }) {
  const cx = 250;
  const cy = 250;
  const maxR = 210; // Corresponds to 85° S

  // Convert lat/lon into polar projection (lat: -85 to -90, lon: 0 to 360)
  const polarToXY = (lat, lon) => {
    // Distance from pole (-90) is 90 - abs(lat) degrees
    // Range is 0 degrees (at 90S) to 5 degrees (at 85S)
    const distDeg = Math.min(5, Math.max(0, 90 - Math.abs(lat)));
    const r = (distDeg / 5) * maxR;
    // lon to radians (0 at top, clockwise)
    const angleRad = ((lon - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  };

  // Concentric latitude rings: 85°S, 87°S, 89°S
  const rings = [
    { lat: -85, label: '85°S', r: maxR },
    { lat: -87, label: '87°S', r: (3 / 5) * maxR },
    { lat: -89, label: '89°S', r: (1 / 5) * maxR },
  ];

  const currentSite = landingSites.find((s) => s.id === selectedSite);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-4 px-2">
        <div>
          <span className="text-xs uppercase tracking-wider text-electric font-semibold">
            2D Polar Stereographic Projection
          </span>
          <p className="text-xs text-muted">
            South Polar Map: 85.0°S to 90.0°S • Concentric latitude parallels
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted">Projection:</span>
          <span className="text-xs px-2 py-0.5 rounded bg-midnight border border-electric/20 text-lunar">
            Azimuthal Polar
          </span>
        </div>
      </div>

      <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center p-2">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full select-none"
        >
          <defs>
            <radialGradient id="lunarSurface" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0B1B33" />
              <stop offset="70%" stopColor="#071426" />
              <stop offset="100%" stopColor="#030712" />
            </radialGradient>
            <radialGradient id="poleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Lunar South Polar base circle */}
          <circle cx={cx} cy={cy} r={maxR} fill="url(#lunarSurface)" stroke="#1E293B" strokeWidth="2" />
          <circle cx={cx} cy={cy} r={maxR * 0.3} fill="url(#poleGlow)" />

          {/* Latitude rings */}
          {rings.map((ring, idx) => (
            <g key={idx}>
              <circle
                cx={cx}
                cy={cy}
                r={ring.r}
                fill="none"
                stroke="#3B82F6"
                strokeOpacity={idx === 0 ? "0.3" : "0.15"}
                strokeDasharray={idx === 0 ? "none" : "3,3"}
                strokeWidth="1"
              />
              <text
                x={cx + 6}
                y={cy - ring.r + 12}
                fill="#94A3B8"
                fontSize="10"
                fontFamily="sans-serif"
                opacity="0.8"
              >
                {ring.label}
              </text>
            </g>
          ))}

          {/* Longitude axes (0°, 90°, 180°, 270°) */}
          <line x1={cx - maxR} y1={cy} x2={cx + maxR} y2={cy} stroke="#3B82F6" strokeOpacity="0.15" strokeWidth="1" />
          <line x1={cx} y1={cy - maxR} x2={cx} y2={cy + maxR} stroke="#3B82F6" strokeOpacity="0.15" strokeWidth="1" />

          {/* Axis Labels */}
          <text x={cx} y={cy - maxR - 8} fill="#94A3B8" fontSize="10" textAnchor="middle">0° lon (Prime)</text>
          <text x={cx + maxR + 12} y={cy + 4} fill="#94A3B8" fontSize="10">90° E</text>
          <text x={cx} y={cy + maxR + 16} fill="#94A3B8" fontSize="10" textAnchor="middle">180°</text>
          <text x={cx - maxR - 32} y={cy + 4} fill="#94A3B8" fontSize="10">270° E / 90° W</text>

          {/* South Pole Center Point (90° S) */}
          <circle cx={cx} cy={cy} r="3" fill="#E63946" />
          <text x={cx} y={cy + 15} fill="#E63946" fontSize="10" textAnchor="middle" fontWeight="bold">
            90°S Pole
          </text>

          {/* Sunlight Vector Arrow */}
          <g transform={`translate(${cx + maxR * 0.75}, 50)`}>
            <line x1="0" y1="0" x2="-30" y2="25" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3,2" />
            <polygon points="-30,25 -22,23 -26,17" fill="#FBBF24" />
            <text x="10" y="5" fill="#FBBF24" fontSize="10" fontWeight="bold">Sun Vector (Low Angle ~1.5°)</text>
          </g>

          {/* Candidate Landing Site Markers */}
          {landingSites.map((site) => {
            const { x, y } = polarToXY(site.coordinates.lat, site.coordinates.lon);
            const isSelected = site.id === selectedSite;

            return (
              <g
                key={site.id}
                onClick={() => onSelectSite(site.id)}
                className="cursor-pointer group"
              >
                {/* Highlight ring for selected site */}
                {isSelected && (
                  <circle
                    cx={x}
                    cy={y}
                    r="14"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeDasharray="4,2"
                    className="animate-spin origin-center"
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />
                )}

                {/* Outer beacon pulse */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? "8" : "5"}
                  fill={isSelected ? "#3B82F6" : "#E2E8F0"}
                  fillOpacity={isSelected ? "0.9" : "0.7"}
                  stroke="#030712"
                  strokeWidth="1.5"
                  className="transition-all duration-200"
                />

                {/* Site Label text */}
                <text
                  x={x + (x > cx ? 10 : -10)}
                  y={y + (y > cy ? 12 : -6)}
                  textAnchor={x > cx ? 'start' : 'end'}
                  fill={isSelected ? '#F3F6FA' : '#94A3B8'}
                  fontSize={isSelected ? '11' : '9.5'}
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  className="pointer-events-none drop-shadow-md select-none transition-colors"
                >
                  {site.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Site Callout Bar */}
      {currentSite && (
        <div className="w-full mt-2 p-3 rounded-lg bg-midnight/80 border border-electric/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-electric animate-ping" />
            <span className="font-semibold text-lunar">{currentSite.name}</span>
            <span className="text-muted">({currentSite.region})</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-muted">
              {currentSite.coordinates.lat.toFixed(2)}°S, {currentSite.coordinates.lon.toFixed(2)}°E
            </span>
            <DataLabel label={currentSite.coordinates.label} />
          </div>
        </div>
      )}
    </div>
  );
}
