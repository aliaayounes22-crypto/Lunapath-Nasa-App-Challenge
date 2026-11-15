import React, { useRef, useEffect, useState } from 'react';

/**
 * Reusable section wrapper with consistent styling and fade-in animation.
 */
export default function SectionWrapper({ id, title, subtitle, children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Ensure visibility is active
    setVisible(true);
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`section-fade ${visible ? 'visible' : ''} py-20 px-4 md:px-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-lunar mb-3">
              {title}
              <div className="mt-3 h-1 w-16 bg-electric rounded-full" />
            </h2>
            {subtitle && (
              <p className="text-muted text-lg mt-4 max-w-2xl">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
