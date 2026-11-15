import React from 'react';
import { projectInfo } from '../data/lunarData';
import SectionWrapper from './SectionWrapper';

export default function About() {
  return (
    <SectionWrapper
      id="about"
      title="About LunaPath"
      subtitle="Built for NASA Space Apps Challenge 2026: Lunar Landing Site Navigator"
    >
      {/* 4 Pillars: Problem, Solution, Innovation, Impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="glass-card p-6">
          <div className="w-10 h-10 rounded-lg bg-electric/10 border border-electric/20 flex items-center justify-center text-electric font-heading font-bold mb-4">
            01
          </div>
          <h3 className="font-heading text-lg font-semibold text-lunar mb-2">
            The Mission Challenge
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {projectInfo.problem}
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="w-10 h-10 rounded-lg bg-electric/10 border border-electric/20 flex items-center justify-center text-electric font-heading font-bold mb-4">
            02
          </div>
          <h3 className="font-heading text-lg font-semibold text-lunar mb-2">
            Our Engineered Solution
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {projectInfo.solution}
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="w-10 h-10 rounded-lg bg-electric/10 border border-electric/20 flex items-center justify-center text-electric font-heading font-bold mb-4">
            03
          </div>
          <h3 className="font-heading text-lg font-semibold text-lunar mb-2">
            Scientific & UX Innovation
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {projectInfo.innovation}
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="w-10 h-10 rounded-lg bg-electric/10 border border-electric/20 flex items-center justify-center text-electric font-heading font-bold mb-4">
            04
          </div>
          <h3 className="font-heading text-lg font-semibold text-lunar mb-2">
            Educational & STEM Impact
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {projectInfo.educationalImpact}
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="glass-card p-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-electric mb-2 block">
            NASA Space Apps Challenge 2026 Team
          </span>
          <h3 className="font-heading text-2xl font-bold text-lunar">
            The LunaPath Engineering Crew
          </h3>
          <p className="text-xs text-muted mt-2">
            A collaborative five-member multidisciplinary team dedicated to lunar exploration visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {projectInfo.team.map((member, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-deepspace/70 border border-electric/10 text-center hover:border-electric/30 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-midnight border border-electric/30 flex items-center justify-center text-electric font-heading font-bold text-sm">
                LP-{index + 1}
              </div>
              <h4 className="font-heading font-semibold text-sm text-lunar mb-1">
                {member.name}
              </h4>
              <p className="text-xs text-electric/80 font-medium">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
