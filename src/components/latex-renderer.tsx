'use client';

import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface LaTeXRendererProps {
  children: string;
  className?: string;
}

export default function LaTeXRenderer({ children, className }: LaTeXRendererProps) {
  const renderText = (text: string) => {
    // Split text by LaTeX delimiters
    const parts = text.split(/(\$\$.*?\$\$|\$.*?\$)/);

    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        // Block math
        const math = part.slice(2, -2);
        return (
          <div key={index} className="my-4">
            <BlockMath math={math} />
          </div>
        );
      } else if (part.startsWith('$') && part.endsWith('$')) {
        // Inline math
        const math = part.slice(1, -1);
        return <InlineMath key={index} math={math} />;
      } else {
        // Regular text with markdown-like formatting
        return (
          <span key={index}>
            {part.split('\n\n').map((paragraph, pIndex) => (
              <p key={pIndex} className={pIndex > 0 ? 'mt-4' : ''}>
                {paragraph.split('\n').map((line, lIndex) => (
                  <React.Fragment key={lIndex}>
                    {lIndex > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </p>
            ))}
          </span>
        );
      }
    });
  };

  return (
    <div className={className}>
      {renderText(children)}
    </div>
  );
}