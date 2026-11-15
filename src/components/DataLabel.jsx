import React from 'react';
import { DATA_LABELS } from '../data/lunarData';

const labelConfig = {
  [DATA_LABELS.VERIFIED]: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/40',
    text: 'text-green-400',
    icon: '✓',
    label: 'Verified',
    tooltip: 'Data verified from authoritative scientific source',
  },
  [DATA_LABELS.APPROXIMATE]: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/40',
    text: 'text-yellow-400',
    icon: '≈',
    label: 'Approximate',
    tooltip: 'Approximate value based on available references',
  },
  [DATA_LABELS.DEMONSTRATION]: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/40',
    text: 'text-orange-400',
    icon: '⚠',
    label: 'Demo Data',
    tooltip: 'Illustrative demonstration data — not real measurements',
  },
  [DATA_LABELS.UNAVAILABLE]: {
    bg: 'bg-gray-500/20',
    border: 'border-gray-500/40',
    text: 'text-gray-400',
    icon: '—',
    label: 'Unavailable',
    tooltip: 'Data not available for this parameter',
  },
};

/**
 * DataLabel – a small badge indicating data integrity status.
 * Prominently marks all values as verified, approximate, demo, or unavailable.
 */
export default function DataLabel({ label, className = '' }) {
  const config = labelConfig[label] || labelConfig[DATA_LABELS.UNAVAILABLE];

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${config.bg} ${config.border} ${config.text} ${className}`}
      title={config.tooltip}
    >
      <span className="text-[10px]">{config.icon}</span>
      {config.label}
    </span>
  );
}
