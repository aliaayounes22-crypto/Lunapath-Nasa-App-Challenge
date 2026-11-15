import React from 'react';
import { scientificSources, DATA_LABELS } from '../data/lunarData';
import SectionWrapper from './SectionWrapper';
import DataLabel from './DataLabel';

export default function Sources() {
  return (
    <SectionWrapper
      id="sources"
      title="Scientific Sources & Transparency"
      subtitle="Documenting authoritative data sources, research literature, methodology, and prototype constraints."
    >
      {/* Integrity Classification Guide */}
      <div className="glass-card p-6 mb-8 border border-electric/20">
        <h3 className="font-heading text-lg font-semibold text-lunar mb-3">
          Scientific Transparency & Classification System
        </h3>
        <p className="text-sm text-muted mb-4 leading-relaxed">
          In adherence to NASA Space Apps Challenge research standards, LunaPath strictly partitions verified reference data from demonstrative mockups. We never present synthetic numbers as empirical telemetry.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-deepspace/60 border border-green-500/20">
            <div className="flex items-center gap-2 mb-1">
              <DataLabel label={DATA_LABELS.VERIFIED} />
              <span className="text-xs font-semibold text-green-400">Validated</span>
            </div>
            <p className="text-xs text-muted">
              Published directly by NASA Artemis program studies or peer-reviewed planetary mission papers.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-deepspace/60 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-1">
              <DataLabel label={DATA_LABELS.APPROXIMATE} />
              <span className="text-xs font-semibold text-yellow-400">Regional Center</span>
            </div>
            <p className="text-xs text-muted">
              Centroid of broad 15–20 km² candidate landing boxes derived from LROC DEMs and public cartography.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-deepspace/60 border border-orange-500/20">
            <div className="flex items-center gap-2 mb-1">
              <DataLabel label={DATA_LABELS.DEMONSTRATION} />
              <span className="text-xs font-semibold text-orange-400">Illustrative</span>
            </div>
            <p className="text-xs text-muted">
              Representative values illustrating UI workflow. Must not be used for navigational trajectory or landing descent.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-deepspace/60 border border-gray-500/20">
            <div className="flex items-center gap-2 mb-1">
              <DataLabel label={DATA_LABELS.UNAVAILABLE} />
              <span className="text-xs font-semibold text-gray-400">Uncalculated</span>
            </div>
            <p className="text-xs text-muted">
              Explicitly marked whenever ephemeris or line-of-sight elevation cannot be reliably computed.
            </p>
          </div>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {scientificSources.map((source) => (
          <div key={source.id} className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider text-electric font-semibold">
                  {source.type}
                </span>
                <span className="text-xs text-muted">{source.year}</span>
              </div>
              <h4 className="font-heading font-semibold text-lunar text-base mb-2">
                {source.name}
              </h4>
              <p className="text-xs text-muted leading-relaxed mb-4">
                {source.description}
              </p>
            </div>

            <div className="pt-3 border-t border-electric/10 mt-2">
              <div className="text-[11px] text-muted mb-2">
                <strong className="text-lunar/80">Application Data:</strong> {source.dataUsed}
              </div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-electric hover:text-electric/80 font-medium transition-colors"
              >
                Access Repository / Agency Archive
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Assumptions and Limitations */}
      <div className="glass-card p-6 border-l-4 border-l-electric">
        <h4 className="font-heading text-lg font-semibold text-lunar mb-2">
          Methodological Assumptions & Technical Constraints
        </h4>
        <ul className="space-y-2 text-sm text-muted">
          <li className="flex items-start gap-2">
            <span className="text-electric font-bold">1.</span>
            <span>
              <strong>Libration & Horizon Horizon Masking:</strong> Polar Earth visibility is deeply sensitive to the lunar 18.6-year nodal precessional cycle and local topographical obstructions (crater rims, peaks). Direct line-of-sight geometric visibility does not assure continuous X/Ka-band radio link margin.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-electric font-bold">2.</span>
            <span>
              <strong>Low Solar Elevation Angles:</strong> At the lunar south pole, the sun skims the horizon at 1.5° maximum inclination. Shadow dynamics cast by micro-roughness and crater massifs produce dynamic wandering shadows that require full horizon-elevation-mask models for operational flight.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-electric font-bold">3.</span>
            <span>
              <strong>Educational Scope:</strong> LunaPath is an interactive mission visualization prototype developed for educational analysis and challenge demonstration; it is not an operational flight software system.
            </span>
          </li>
        </ul>
      </div>
    </SectionWrapper>
  );
}
