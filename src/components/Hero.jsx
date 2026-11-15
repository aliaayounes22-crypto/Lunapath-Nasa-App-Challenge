import React, { useMemo } from 'react';

/**
 * Hero section – cinematic landing with star field and moon visual.
 */
export default function Hero() {
  // Generate random stars for the background
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.5,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 3 + 2}s`,
    }));
  }, []);

  const scrollToSites = () => {
    const el = document.querySelector('#sites');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              '--delay': star.delay,
              '--duration': star.duration,
            }}
          />
        ))}
      </div>

      {/* Moon glow behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full bg-gradient-to-br from-lunar/15 via-lunar/5 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-electric/30 bg-electric/5 text-electric text-sm mb-8">
          <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
          NASA Space Apps Challenge 2026
        </div>

        {/* Title */}
        <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-lunar mb-4 tracking-tight">
          Luna<span className="text-electric glow-text">Path</span>
        </h1>

        {/* Subtitle */}
        <p className="font-heading text-xl md:text-2xl text-electric/80 mb-6">
          Moon Landing Planner
        </p>

        {/* Description */}
        <p className="text-muted text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          An interactive mission-planning prototype for exploring and comparing
          lunar south pole landing sites based on sunlight conditions and Earth
          visibility.
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToSites}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-electric hover:bg-electric/85 text-white font-semibold rounded-xl transition-all duration-300 glow-blue hover:scale-105 active:scale-95"
        >
          Explore Landing Sites
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted/50 text-xs">
        <span>Scroll to explore</span>
        <div className="w-5 h-8 rounded-full border border-muted/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-muted/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
