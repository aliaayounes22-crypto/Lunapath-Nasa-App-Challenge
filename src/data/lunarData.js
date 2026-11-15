/**
 * LunaPath – Lunar Landing Site Data
 * 
 * SCIENTIFIC INTEGRITY NOTE:
 * This file contains candidate landing site information for the lunar south pole.
 * - Site names and general descriptions are based on publicly available NASA 
 *   Artemis program documentation and LROC (Lunar Reconnaissance Orbiter Camera) data.
 * - Coordinates marked as "approximate" are general region centers, not precise 
 *   landing coordinates.
 * - Sunlight and Earth visibility data are marked as DEMONSTRATION DATA unless 
 *   sourced from verified calculations.
 * 
 * Sources:
 * - NASA Artemis III Landing Site Studies (2022-2023)
 * - LROC Quickmap (https://quickmap.lroc.asu.edu)
 * - NASA Scientific Visualization Studio
 */

export const DATA_LABELS = {
  VERIFIED: 'verified',
  APPROXIMATE: 'approximate',
  DEMONSTRATION: 'demonstration',
  UNAVAILABLE: 'unavailable',
};

/**
 * Candidate landing regions near the lunar south pole.
 * These are general regions identified in NASA Artemis studies, 
 * not precise landing coordinates.
 */
export const landingSites = [
  {
    id: 'connecting-ridge',
    name: 'Connecting Ridge',
    region: 'Near Shackleton Crater',
    coordinates: {
      lat: -89.45,
      lon: 222.69,
      label: DATA_LABELS.APPROXIMATE,
      note: 'Approximate region center from LROC imagery',
    },
    elevation: {
      value: 'Variable, elevated ridge terrain',
      label: DATA_LABELS.APPROXIMATE,
    },
    description:
      'A ridge connecting Shackleton crater to the de Gerlache crater region. This area has been identified as a candidate Artemis landing region due to favorable illumination conditions near the south pole.',
    scientificInterest: [
      'Proximity to permanently shadowed regions (PSRs) that may contain water ice',
      'Elevated terrain provides extended periods of solar illumination',
      'Access to diverse geological units for sample collection',
    ],
    terrain: 'Ridge with moderate slopes',
    sources: [
      {
        name: 'NASA Artemis III Candidate Landing Regions',
        url: 'https://www.nasa.gov/feature/nasa-identifies-candidate-regions-for-landing-next-americans-on-moon',
        year: 2022,
      },
    ],
  },
  {
    id: 'shackleton-rim',
    name: 'Shackleton Crater Rim',
    region: 'Shackleton Crater',
    coordinates: {
      lat: -89.9,
      lon: 0.0,
      label: DATA_LABELS.APPROXIMATE,
      note: 'Approximate crater rim location',
    },
    elevation: {
      value: 'Crater rim, elevated relative to surroundings',
      label: DATA_LABELS.APPROXIMATE,
    },
    description:
      'The rim of Shackleton crater, located very near the lunar south pole. Parts of this rim receive near-continuous sunlight, making it one of the most studied potential landing areas.',
    scientificInterest: [
      'Near-continuous solar illumination on portions of the rim',
      'Direct line of sight into permanently shadowed crater interior',
      'Potential access to volatile deposits in the crater',
      'Close to the geographic south pole',
    ],
    terrain: 'Crater rim with steep interior walls',
    sources: [
      {
        name: 'LROC Shackleton Crater',
        url: 'https://www.lroc.asu.edu/',
        year: 2023,
      },
    ],
  },
  {
    id: 'de-gerlache-ridge',
    name: 'de Gerlache Rim',
    region: 'de Gerlache Crater',
    coordinates: {
      lat: -88.45,
      lon: 270.0,
      label: DATA_LABELS.APPROXIMATE,
      note: 'Approximate region from Artemis studies',
    },
    elevation: {
      value: 'Crater rim terrain',
      label: DATA_LABELS.APPROXIMATE,
    },
    description:
      'The rim region of de Gerlache crater, another candidate Artemis landing area. Offers a balance of illumination and access to scientifically interesting permanently shadowed areas.',
    scientificInterest: [
      'Favorable illumination geometry',
      'Proximity to permanently shadowed regions',
      'Relatively flat areas suitable for landing',
    ],
    terrain: 'Crater rim with nearby flat areas',
    sources: [
      {
        name: 'NASA Artemis III Candidate Landing Regions',
        url: 'https://www.nasa.gov/feature/nasa-identifies-candidate-regions-for-landing-next-americans-on-moon',
        year: 2022,
      },
    ],
  },
  {
    id: 'leibnitz-beta',
    name: 'Leibnitz Beta Plateau',
    region: 'Near Leibnitz Crater',
    coordinates: {
      lat: -85.0,
      lon: 31.0,
      label: DATA_LABELS.APPROXIMATE,
      note: 'Approximate region center',
    },
    elevation: {
      value: 'Elevated plateau terrain',
      label: DATA_LABELS.APPROXIMATE,
    },
    description:
      'An elevated plateau region near Leibnitz crater, farther from the pole than other candidates but still within the south polar region. Offers distinct geological characteristics.',
    scientificInterest: [
      'Different geological context from polar crater regions',
      'Plateau terrain may offer safer landing conditions',
      'Study of south polar highland geology',
    ],
    terrain: 'Elevated plateau',
    sources: [
      {
        name: 'NASA Artemis III Candidate Landing Regions',
        url: 'https://www.nasa.gov/feature/nasa-identifies-candidate-regions-for-landing-next-americans-on-moon',
        year: 2022,
      },
    ],
  },
  {
    id: 'nobile-rim',
    name: 'Nobile Rim',
    region: 'Nobile Crater',
    coordinates: {
      lat: -85.2,
      lon: 53.0,
      label: DATA_LABELS.APPROXIMATE,
      note: 'Approximate region center',
    },
    elevation: {
      value: 'Crater rim terrain',
      label: DATA_LABELS.APPROXIMATE,
    },
    description:
      'The rim of Nobile crater in the south polar region. Selected as the target region for the VIPER (Volatiles Investigating Polar Exploration Rover) mission.',
    scientificInterest: [
      'VIPER mission target region',
      'Evidence of hydrogen-bearing deposits from orbital data',
      'Variety of terrain types including permanently shadowed micro-environments',
    ],
    terrain: 'Crater rim with varied topography',
    sources: [
      {
        name: 'NASA VIPER Mission',
        url: 'https://www.nasa.gov/viper',
        year: 2023,
      },
    ],
  },
];

/**
 * Supported date windows for analysis.
 * These represent demonstration time periods. In a production system,
 * these would be driven by actual ephemeris calculations.
 */
export const supportedDates = [
  { id: '2026-q1', label: 'Q1 2026 (Jan–Mar)', quarter: 'Q1', year: 2026 },
  { id: '2026-q2', label: 'Q2 2026 (Apr–Jun)', quarter: 'Q2', year: 2026 },
  { id: '2026-q3', label: 'Q3 2026 (Jul–Sep)', quarter: 'Q3', year: 2026 },
  { id: '2026-q4', label: 'Q4 2026 (Oct–Dec)', quarter: 'Q4', year: 2026 },
  { id: '2027-q1', label: 'Q1 2027 (Jan–Mar)', quarter: 'Q1', year: 2027 },
  { id: '2027-q2', label: 'Q2 2027 (Apr–Jun)', quarter: 'Q2', year: 2027 },
];

/**
 * DEMONSTRATION sunlight data.
 * 
 * IMPORTANT: These values are ILLUSTRATIVE ONLY and do NOT represent 
 * real measurements or validated calculations. They are structured to 
 * demonstrate the application's analysis capability.
 * 
 * In a production system, this data would come from:
 * - NASA/JPL Horizons ephemeris calculations
 * - LROC illumination maps
 * - Validated thermal/illumination models
 */
export const sunlightData = {
  'connecting-ridge': {
    label: DATA_LABELS.DEMONSTRATION,
    note: 'Illustrative values to demonstrate analysis interface. Not real measurements.',
    annualIllumination: '~80–90%',
    annualIlluminationNote: 'General range cited in literature for favorable south polar ridges',
    quarterlyData: {
      'Q1': { sunlitPercent: 85, peakSunHours: 18, label: DATA_LABELS.DEMONSTRATION },
      'Q2': { sunlitPercent: 72, peakSunHours: 14, label: DATA_LABELS.DEMONSTRATION },
      'Q3': { sunlitPercent: 68, peakSunHours: 12, label: DATA_LABELS.DEMONSTRATION },
      'Q4': { sunlitPercent: 88, peakSunHours: 19, label: DATA_LABELS.DEMONSTRATION },
    },
  },
  'shackleton-rim': {
    label: DATA_LABELS.DEMONSTRATION,
    note: 'Illustrative values. Shackleton rim is known for high illumination but exact values require ephemeris computation.',
    annualIllumination: '~86–94%',
    annualIlluminationNote: 'Literature suggests some rim points receive >90% annual illumination',
    quarterlyData: {
      'Q1': { sunlitPercent: 92, peakSunHours: 21, label: DATA_LABELS.DEMONSTRATION },
      'Q2': { sunlitPercent: 78, peakSunHours: 16, label: DATA_LABELS.DEMONSTRATION },
      'Q3': { sunlitPercent: 74, peakSunHours: 15, label: DATA_LABELS.DEMONSTRATION },
      'Q4': { sunlitPercent: 93, peakSunHours: 22, label: DATA_LABELS.DEMONSTRATION },
    },
  },
  'de-gerlache-ridge': {
    label: DATA_LABELS.DEMONSTRATION,
    note: 'Illustrative values for interface demonstration.',
    annualIllumination: '~78–88%',
    annualIlluminationNote: 'General estimate from Artemis site selection literature',
    quarterlyData: {
      'Q1': { sunlitPercent: 82, peakSunHours: 17, label: DATA_LABELS.DEMONSTRATION },
      'Q2': { sunlitPercent: 70, peakSunHours: 13, label: DATA_LABELS.DEMONSTRATION },
      'Q3': { sunlitPercent: 65, peakSunHours: 11, label: DATA_LABELS.DEMONSTRATION },
      'Q4': { sunlitPercent: 85, peakSunHours: 18, label: DATA_LABELS.DEMONSTRATION },
    },
  },
  'leibnitz-beta': {
    label: DATA_LABELS.DEMONSTRATION,
    note: 'Illustrative values for interface demonstration.',
    annualIllumination: '~60–75%',
    annualIlluminationNote: 'General estimate; farther from pole typically means lower peak illumination',
    quarterlyData: {
      'Q1': { sunlitPercent: 70, peakSunHours: 14, label: DATA_LABELS.DEMONSTRATION },
      'Q2': { sunlitPercent: 58, peakSunHours: 10, label: DATA_LABELS.DEMONSTRATION },
      'Q3': { sunlitPercent: 52, peakSunHours: 8, label: DATA_LABELS.DEMONSTRATION },
      'Q4': { sunlitPercent: 72, peakSunHours: 15, label: DATA_LABELS.DEMONSTRATION },
    },
  },
  'nobile-rim': {
    label: DATA_LABELS.DEMONSTRATION,
    note: 'Illustrative values for interface demonstration.',
    annualIllumination: '~65–80%',
    annualIlluminationNote: 'General estimate from VIPER mission planning literature',
    quarterlyData: {
      'Q1': { sunlitPercent: 75, peakSunHours: 15, label: DATA_LABELS.DEMONSTRATION },
      'Q2': { sunlitPercent: 62, peakSunHours: 11, label: DATA_LABELS.DEMONSTRATION },
      'Q3': { sunlitPercent: 58, peakSunHours: 9, label: DATA_LABELS.DEMONSTRATION },
      'Q4': { sunlitPercent: 78, peakSunHours: 16, label: DATA_LABELS.DEMONSTRATION },
    },
  },
};

/**
 * DEMONSTRATION Earth visibility data.
 * 
 * IMPORTANT: These values are ILLUSTRATIVE ONLY.
 * Earth visibility from the lunar south pole depends on lunar libration
 * and the specific site geometry. Verified values require ephemeris calculations.
 * 
 * Geometric visibility does NOT guarantee communication availability,
 * which also depends on antenna configuration, signal strength, and 
 * potential terrain obstruction.
 */
export const earthVisibilityData = {
  'connecting-ridge': {
    label: DATA_LABELS.DEMONSTRATION,
    note: 'Illustrative. Real Earth visibility requires libration-aware calculations.',
    geometricVisibility: '~70–80%',
    communicationNote: 'Geometric visibility does not guarantee communication. Terrain, antenna pointing, and signal margin all affect link availability.',
    quarterlyData: {
      'Q1': { visibilityPercent: 76, label: DATA_LABELS.DEMONSTRATION },
      'Q2': { visibilityPercent: 72, label: DATA_LABELS.DEMONSTRATION },
      'Q3': { visibilityPercent: 74, label: DATA_LABELS.DEMONSTRATION },
      'Q4': { visibilityPercent: 78, label: DATA_LABELS.DEMONSTRATION },
    },
  },
  'shackleton-rim': {
    label: DATA_LABELS.DEMONSTRATION,
    note: 'Illustrative. Near-polar sites have limited Earth visibility due to low Earth elevation angle.',
    geometricVisibility: '~50–65%',
    communicationNote: 'Very near the pole, Earth sits very low on the horizon. Terrain can easily block line-of-sight. Relay satellites may be needed.',
    quarterlyData: {
      'Q1': { visibilityPercent: 58, label: DATA_LABELS.DEMONSTRATION },
      'Q2': { visibilityPercent: 52, label: DATA_LABELS.DEMONSTRATION },
      'Q3': { visibilityPercent: 54, label: DATA_LABELS.DEMONSTRATION },
      'Q4': { visibilityPercent: 60, label: DATA_LABELS.DEMONSTRATION },
    },
  },
  'de-gerlache-ridge': {
    label: DATA_LABELS.DEMONSTRATION,
    note: 'Illustrative. Earth visibility varies with libration cycle.',
    geometricVisibility: '~65–78%',
    communicationNote: 'Geometric visibility does not guarantee communication availability.',
    quarterlyData: {
      'Q1': { visibilityPercent: 72, label: DATA_LABELS.DEMONSTRATION },
      'Q2': { visibilityPercent: 68, label: DATA_LABELS.DEMONSTRATION },
      'Q3': { visibilityPercent: 66, label: DATA_LABELS.DEMONSTRATION },
      'Q4': { visibilityPercent: 74, label: DATA_LABELS.DEMONSTRATION },
    },
  },
  'leibnitz-beta': {
    label: DATA_LABELS.DEMONSTRATION,
    note: 'Illustrative. Sites farther from pole may have better Earth visibility angles.',
    geometricVisibility: '~75–88%',
    communicationNote: 'Better Earth elevation angle than near-polar sites, but still subject to terrain effects.',
    quarterlyData: {
      'Q1': { visibilityPercent: 82, label: DATA_LABELS.DEMONSTRATION },
      'Q2': { visibilityPercent: 78, label: DATA_LABELS.DEMONSTRATION },
      'Q3': { visibilityPercent: 80, label: DATA_LABELS.DEMONSTRATION },
      'Q4': { visibilityPercent: 85, label: DATA_LABELS.DEMONSTRATION },
    },
  },
  'nobile-rim': {
    label: DATA_LABELS.DEMONSTRATION,
    note: 'Illustrative values for interface demonstration.',
    geometricVisibility: '~70–82%',
    communicationNote: 'Geometric visibility does not guarantee communication availability.',
    quarterlyData: {
      'Q1': { visibilityPercent: 76, label: DATA_LABELS.DEMONSTRATION },
      'Q2': { visibilityPercent: 72, label: DATA_LABELS.DEMONSTRATION },
      'Q3': { visibilityPercent: 70, label: DATA_LABELS.DEMONSTRATION },
      'Q4': { visibilityPercent: 78, label: DATA_LABELS.DEMONSTRATION },
    },
  },
};

/**
 * Scientific sources used in this project
 */
export const scientificSources = [
  {
    id: 'artemis-sites',
    name: 'NASA Artemis III Candidate Landing Regions',
    url: 'https://www.nasa.gov/feature/nasa-identifies-candidate-regions-for-landing-next-americans-on-moon',
    type: 'Landing site identification',
    description: 'NASA announcement identifying 13 candidate landing regions near the lunar south pole for Artemis III.',
    dataUsed: 'Site names, general descriptions, and regional characteristics',
    year: 2022,
  },
  {
    id: 'lroc',
    name: 'Lunar Reconnaissance Orbiter Camera (LROC)',
    url: 'https://www.lroc.asu.edu/',
    type: 'Imagery and topography',
    description: 'High-resolution imagery and topographic data from the Lunar Reconnaissance Orbiter.',
    dataUsed: 'General terrain descriptions and approximate coordinate references',
    year: '2009–present',
  },
  {
    id: 'horizons',
    name: 'NASA/JPL Horizons System',
    url: 'https://ssd.jpl.nasa.gov/horizons/',
    type: 'Ephemeris data',
    description: 'Provides precise positions of solar system objects. Would be the primary data source for validated illumination and Earth visibility calculations.',
    dataUsed: 'Referenced as the appropriate source for production ephemeris data. Not directly queried in this prototype.',
    year: 'Ongoing',
  },
  {
    id: 'viper',
    name: 'NASA VIPER Mission',
    url: 'https://www.nasa.gov/viper',
    type: 'Mission planning',
    description: 'Volatiles Investigating Polar Exploration Rover mission targeting the Nobile crater region.',
    dataUsed: 'Nobile crater region context and scientific interest',
    year: 2023,
  },
  {
    id: 'nsv',
    name: 'NASA Scientific Visualization Studio',
    url: 'https://svs.gsfc.nasa.gov/',
    type: 'Visualizations',
    description: 'Scientific visualizations including lunar illumination animations.',
    dataUsed: 'Reference for illumination patterns and visualization concepts',
    year: 'Ongoing',
  },
];

/**
 * Project information
 */
export const projectInfo = {
  name: 'LunaPath',
  subtitle: 'Moon Landing Planner',
  challenge: 'Lunar Landing Site Navigator',
  event: 'NASA Space Apps Challenge 2026',
  description:
    'An interactive lunar south pole mission-planning prototype that helps users explore and compare potential landing sites and dates based on sunlight conditions and Earth visibility.',
  problem:
    'Planning a lunar landing requires evaluating multiple factors simultaneously — terrain, sunlight availability, communication windows, and scientific value. This information is scattered across many sources and difficult to compare.',
  solution:
    'LunaPath provides an interactive decision-support tool that consolidates landing site information, visualizes sunlight and Earth visibility conditions, and enables direct comparison of candidate sites.',
  innovation:
    'By combining 3D visualization with structured data presentation and transparent scientific sourcing, LunaPath makes lunar mission planning concepts accessible to students, educators, and space enthusiasts.',
  educationalImpact:
    'LunaPath demonstrates how complex mission planning decisions can be communicated through interactive visualization, promoting STEM education and public engagement with space exploration.',
  team: [
    { name: 'Team Member 1', role: 'Project Lead' },
    { name: 'Team Member 2', role: 'Frontend Developer' },
    { name: 'Team Member 3', role: 'Scientific Research' },
    { name: 'Team Member 4', role: '3D Visualization' },
    { name: 'Team Member 5', role: 'UI/UX Design' },
  ],
};
