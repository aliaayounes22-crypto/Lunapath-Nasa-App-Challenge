import React from 'react';
import { landingSites, supportedDates } from '../data/lunarData';
import SectionWrapper from './SectionWrapper';
import SunlightAnalysis from './SunlightAnalysis';
import EarthVisibility from './EarthVisibility';

/**
 * AnalysisPanel – combined sunlight + Earth visibility analysis view.
 */
export default function AnalysisPanel({ siteId, dateId }) {
  const site = landingSites.find((s) => s.id === siteId);
  const dateInfo = supportedDates.find((d) => d.id === dateId);

  return (
    <SectionWrapper
      id="analysis"
      title="Mission Analysis"
      subtitle={
        site
          ? `Analyzing ${site.name} for ${dateInfo?.label || 'selected period'}`
          : 'Select a landing site and time window above to view analysis.'
      }
    >
      {!site ? (
        <div className="glass-card p-12 text-center text-muted">
          <div className="text-4xl mb-4 opacity-50">📊</div>
          <p className="text-lg">Select a landing site above to begin analysis</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SunlightAnalysis siteId={siteId} dateId={dateId} />
          <EarthVisibility siteId={siteId} dateId={dateId} />
        </div>
      )}
    </SectionWrapper>
  );
}
