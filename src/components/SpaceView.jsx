import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import SpaceView3D from './SpaceView3D';
import SpaceView2D from './SpaceView2D';

/**
 * Section B: Interactive Space View with 3D Orbital Scene and 2D Polar Projection Fallback.
 */
export default function SpaceView({ selectedSite, onSelectSite, selectedDate }) {
  const [viewMode, setViewMode] = useState('3d'); // '3d' | '2d'
  const [hasWebGLError, setHasWebGLError] = useState(false);

  return (
    <SectionWrapper
      id="space-view"
      title="Interactive Space & South Pole View"
      subtitle="Examine lunar polar geometry, Earth line-of-sight orientation, and solar illumination angles in 3D or 2D."
    >
      {/* View Switcher & Integrity Label Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        {/* Toggle Mode */}
        <div className="inline-flex p-1 rounded-xl bg-midnight border border-electric/20">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              viewMode === '3d' && !hasWebGLError
                ? 'bg-electric text-white shadow-md'
                : 'text-muted hover:text-lunar'
            }`}
          >
            🛰️ Interactive 3D Orbit
          </button>
          <button
            onClick={() => setViewMode('2d')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              viewMode === '2d' || hasWebGLError
                ? 'bg-electric text-white shadow-md'
                : 'text-muted hover:text-lunar'
            }`}
          >
            🗺️ 2D Polar Projection (Fallback)
          </button>
        </div>

        {/* Model Accuracy Badge */}
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="w-2 h-2 rounded-full bg-orange-400" />
          <span>Status: <strong>Illustrative Visualization</strong> (Scaled for educational comprehension)</span>
        </div>
      </div>

      {/* Non-scale Scientific Disclosure Notice */}
      <div className="p-3 mb-6 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-200 text-xs flex items-start gap-2.5">
        <span className="text-sm font-bold text-orange-400">ℹ️</span>
        <div>
          <strong>Astronomical Scale Disclosure:</strong> While planetary axial tilts and lunar south pole positions are oriented accurately, the orbital distances between the Sun, Earth, and Moon are scaled down for interactive visibility. The 3D animation is illustrative and not driven by realtime orbital ephemerides.
        </div>
      </div>

      {/* Main View Display */}
      <div className="glass-card p-4 md:p-6">
        {viewMode === '3d' && !hasWebGLError ? (
          <div>
            <SpaceView3D
              selectedSite={selectedSite}
              onSelectSite={onSelectSite}
              onError={() => setHasWebGLError(true)}
            />
          </div>
        ) : (
          <div>
            <SpaceView2D
              selectedSite={selectedSite}
              onSelectSite={onSelectSite}
              selectedDate={selectedDate}
            />
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
