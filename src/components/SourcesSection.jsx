import { ExternalLink, ShieldCheck, AlertTriangle, Database } from 'lucide-react'

/**
 * SourcesSection — Prominent scientific references and rigorous data limitation disclosures.
 * NASA-inspired styling with NASA Red and Moon Gold highlights.
 */
export default function SourcesSection() {
  const primarySources = [
    {
      category: 'Independent Peer-Reviewed Research',
      badgeColor: 'bg-[#D4A11E]/15 text-[#D4A11E] border-[#D4A11E]/30',
      title: 'Wueller et al. (2026)',
      citation:
        'Wueller, L., Berger, L. M., Christopher, H., Sugimoto, K., Thaker, A. D., Carton, L., Jo, W., Lee, S., Pedrelli, R., Sanchez, P., & Kring, D. A. (2026). Assessing Potential Landing Sites With Favorable Illumination and Accessible, Potentially Volatile-Rich Permanently Shadowed Regions Within Artemis Candidate Landing Regions.',
      journal: 'Journal of Geophysical Research: Planets, 131(3), e2025JE009434',
      doi: '10.1029/2025JE009434',
      url: 'https://doi.org/10.1029/2025JE009434',
      role: 'Primary source for site coordinates (Table A1), midsummer dates (Table 2), and modeled maximum consecutive Sun & Sun+Earth visibility durations (Table A2).',
    },
    {
      category: 'Open Research Dataset',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      title: 'Complementary Data for Wueller et al. (2026)',
      citation: 'Wueller, L., et al. (2026). Complementary Data for Wueller et al. (2026) [Dataset]. Zenodo.',
      journal: 'Zenodo Open Research Repository (CC BY 4.0)',
      doi: '10.5281/zenodo.17084058',
      url: 'https://doi.org/10.5281/zenodo.17084058',
      role: 'GIS shapefiles, suitable-area rasters, and illumination modeling rasters across 16 regions.',
    },
    {
      category: 'Official NASA Mission Information',
      badgeColor: 'bg-[#FC3D21]/15 text-[#FC3D21] border-[#FC3D21]/30',
      title: 'NASA Artemis III Landing Regions Update (2024)',
      citation: 'NASA (2024). NASA Provides Update on Artemis III Moon Landing Regions.',
      journal: 'Official NASA Press Release',
      doi: null,
      url: 'https://www.nasa.gov/news-release/nasa-provides-update-on-artemis-iii-moon-landing-regions/',
      role: 'Official identification of nine refined Artemis III candidate landing regions, including Slater Plain, Nobile Rim 2, and Haworth.',
    },
    {
      category: 'Official NASA Technical Reports Server (NTRS)',
      badgeColor: 'bg-[#FC3D21]/15 text-[#FC3D21] border-[#FC3D21]/30',
      title: 'Artemis III Site Selection Update: Downselection',
      citation: 'NASA (2026). Artemis III Site Selection Update: Downselection From Thirteen to Nine Candidate Regions.',
      journal: 'Lunar and Planetary Science Conference (LPSC)',
      doi: null,
      url: 'https://ntrs.nasa.gov/citations/20250011660',
      role: 'Formal mission documentation for candidate region refinement.',
    },
  ]

  const scientificLimitations = [
    {
      title: 'Modeled Midsummer Maxima vs. Real-Time Observations',
      desc: 'Visibility numbers represent per-year modeled maxima during the lunar midsummer period derived from 12-hour simulation time steps. They are NOT real-time predictions for arbitrary days or hours.',
    },
    {
      title: 'Published Granularity & Simulation Steps',
      desc: 'Durations were published as whole days. No continuous sub-daily or hourly time series is published in the source tables.',
    },
    {
      title: 'Representative Points vs. Region Outlines',
      desc: 'Candidate sites (SP11, NR2_K2023, HW10) are manually selected representative points. They do NOT outline whole landing regions and can be shifted within the suitable terrain area.',
    },
    {
      title: 'No Direct Raw Data Processing on Client',
      desc: 'LunaPath does not directly process raw LRO altimetry or compute ray-traced horizons in real time; it faithfully visualizes published peer-reviewed model output.',
    },
    {
      title: 'Slope Criteria vs. Landing Safety',
      desc: 'Terrain satisfying the HLS slope criterion (slope < 8° and > 100 m from steeper slopes) does not guarantee landing safety. Local roughness, boulders, micro-craters, and navigation dispersion remain independent risks.',
    },
    {
      title: 'Published Table A2 vs. Narrative Inconsistency (HW10)',
      desc: 'Table A2 lists 0–7 combined visibility days across 2025–2032 for HW10, whereas narrative text notes HW04 and HW10 exceed 25 days in at least one year. In scientific fidelity, our application charts Table A2.',
    },
  ]

  return (
    <section id="sources" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-block px-3.5 py-1 mb-3 rounded-full bg-[#D4A11E]/10 border border-[#D4A11E]/30 text-xs text-[#D4A11E] font-mono uppercase tracking-wider font-semibold">
          Scientific Provenance & Citations
        </div>
        <h2
          className="text-3xl sm:text-5xl font-black mb-3 tracking-tight"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Scientific <span className="text-[#D4A11E]">Sources</span> & Limitations
        </h2>
        <p className="text-base text-[#A8B0C0] max-w-2xl mx-auto">
          Distinguishing independent academic peer-reviewed research from official NASA mission
          statements, and detailing the scientific bounds of the dataset.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Primary Sources */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#0B1A33] border border-[#F5F7FA]/10 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-[#F5F7FA]">
              <Database className="w-5 h-5 text-[#D4A11E]" />
              Verified Primary Scientific Literature
            </h3>

            <div className="space-y-5">
              {primarySources.map((src, i) => (
                <div
                  key={i}
                  className="bg-[#050816]/70 border border-[#F5F7FA]/10 rounded-xl p-5 hover:border-[#D4A11E]/40 transition-all duration-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${src.badgeColor}`}>
                      {src.category}
                    </span>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#D4A11E] hover:text-[#F0B726] font-mono"
                    >
                      {src.doi ? `DOI: ${src.doi}` : 'Official Link'}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <h4 className="text-base font-bold text-[#F5F7FA] mb-1">{src.title}</h4>
                  <p className="text-xs text-[#A8B0C0] leading-relaxed mb-2">{src.citation}</p>
                  <p className="text-xs text-[#A8B0C0]/70 italic mb-2">{src.journal}</p>
                  <div className="text-xs text-[#F5F7FA]/90 border-t border-[#F5F7FA]/10 pt-2 font-mono">
                    <strong className="text-[#D4A11E]">Role in LunaPath:</strong> {src.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Limitations & Assumptions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0B1A33] border border-[#FC3D21]/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_30px_rgba(252,61,33,0.08)]">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-[#F5F7FA]">
              <AlertTriangle className="w-5 h-5 text-[#FC3D21]" />
              Scientific Assumptions & Limitations
            </h3>

            <div className="space-y-4">
              {scientificLimitations.map((lim, i) => (
                <div key={i} className="border-b border-[#F5F7FA]/10 pb-3.5 last:border-0 last:pb-0">
                  <h4 className="text-sm font-semibold text-[#F5F7FA] mb-1 flex items-center gap-1.5">
                    <span className="text-[#FC3D21] text-xs font-mono">•</span>
                    {lim.title}
                  </h4>
                  <p className="text-xs text-[#A8B0C0] leading-relaxed pl-3">{lim.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* NASA Tool Clarification */}
          <div className="bg-[#0B1A33]/80 border border-[#D4A11E]/20 rounded-2xl p-5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#D4A11E] mb-2 flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4" />
              Direct Data Disclosure
            </h4>
            <p className="text-xs text-[#A8B0C0] leading-relaxed">
              While the study by Wueller et al. utilizes Lunar Reconnaissance Orbiter (LRO) and LOLA elevation datasets,
              LunaPath serves as a synthesis dashboard of published research. We do not claim to execute real-time ray-tracing
              or NASA/JPL SPICE orbit integrations directly in this client application.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
