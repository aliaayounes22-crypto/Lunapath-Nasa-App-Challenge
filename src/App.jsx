import { useState } from 'react'

// Section components
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import PolarGeometryExplainer from './components/visualizations/PolarGeometryExplainer'
import SiteExplorer from './components/SiteExplorer'
import ChartsSection from './components/ChartsSection'
import ComparisonSection from './components/ComparisonSection'
import SourcesSection from './components/SourcesSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'

// Rigorous, verified data loader
import { landingSites, visibilityRecords } from './data/loader'

function App() {
  // ── Central Interactive State ──
  const [selectedSite, setSelectedSite] = useState('SP11')
  const [selectedYear, setSelectedYear] = useState(2026)

  return (
    <div className="min-h-screen bg-[#050816] text-[#F5F7FA] flex flex-col selection:bg-[#FC3D21]/30 selection:text-white">
      {/* 1. Fixed navigation bar with enlarged mission patch logo */}
      <Navbar />

      {/* 2. Hero section with realistic interactive 3D lunar globe and conceptual polar geometry widget */}
      <HeroSection
        selectedSite={selectedSite}
        onSelectSite={setSelectedSite}
        setSelectedSite={setSelectedSite}
        selectedYear={selectedYear}
        landingSites={landingSites}
        visibilityData={visibilityRecords}
      />

      <main className="flex-1 space-y-16">
        {/* Educational Polar Geometry & Lighting Explainer */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PolarGeometryExplainer />
        </section>

        {/* 3. Mission Site Explorer — candidate sites, year selection, data cards */}
        <SiteExplorer
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          landingSites={landingSites}
          visibilityData={visibilityRecords}
        />

        {/* 4. Interactive visibility charts powered by Recharts with NASA Gold & Red styling */}
        <ChartsSection
          landingSites={landingSites}
          visibilityData={visibilityRecords}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedSite={selectedSite}
        />

        {/* 5. Direct side-by-side comparison table & mobile cards */}
        <ComparisonSection
          landingSites={landingSites}
          visibilityData={visibilityRecords}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />

        {/* 6. Scientific sources, citations, and data limitations */}
        <SourcesSection />

        {/* 7. About LunaPath, team notice, and disclaimers */}
        <AboutSection />
      </main>

      {/* Global Mission Control Footer */}
      <Footer />
    </div>
  )
}

export default App
