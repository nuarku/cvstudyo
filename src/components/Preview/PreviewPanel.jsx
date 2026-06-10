import React, { useEffect, useRef, useState } from 'react';
import { useCV } from '../../context/CVContext';
import { ModernTemplate } from './Templates/ModernTemplate';
import { ClassicTemplate } from './Templates/ClassicTemplate';
import { CreativeTemplate } from './Templates/CreativeTemplate';
import { MinimalistTemplate } from './Templates/MinimalistTemplate';
import { ExecutiveTemplate } from './Templates/ExecutiveTemplate';

export const PreviewPanel = () => {
  const { cvData } = useCV();
  const { theme } = cvData;
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // available width = container width minus padding (2rem = 32px on each side -> 64px)
        const availableWidth = containerRef.current.clientWidth - 64; 
        const a4WidthPx = 794; // approx 210mm in pixels at 96dpi

        if (availableWidth < a4WidthPx) {
          setScale(availableWidth / a4WidthPx);
        } else {
          setScale(1);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    // Add a small delay for initial render to get correct width
    const timeout = setTimeout(handleResize, 100);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, []);

  const renderTemplate = () => {
    switch (theme.template) {
      case 'modern':
        return <ModernTemplate data={cvData} />;
      case 'classic':
        return <ClassicTemplate data={cvData} />;
      case 'creative':
        return <CreativeTemplate data={cvData} />;
      case 'minimalist':
        return <MinimalistTemplate data={cvData} />;
      case 'executive':
        return <ExecutiveTemplate data={cvData} />;
      default:
        return <ModernTemplate data={cvData} />;
    }
  };

  return (
    <div className="preview-panel" ref={containerRef}>
      <div 
        className="cv-wrapper"
        style={{
          '--scale-factor': scale,
          '--margin-offset': `-${1122 * (1 - scale)}px`
        }}
      >
        <div className="cv-container">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
