import React, { memo } from 'react';
import { BalloonData } from '../types';

interface BalloonProps {
  data: BalloonData;
  onPop: (id: number) => void;
}

export const Balloon = memo(({ data, onPop }: BalloonProps) => {
  const style: React.CSSProperties = {
    // Position is fixed so it relates to viewport (ceiling)
    left: '50%', 
    top: '0',
    '--landing-x': `${data.landingX}vw`, 
    '--rotate-deg': `${data.rotate}deg`,
    animationDuration: `${data.duration}s`,
    animationDelay: `${data.delay}s`,
  } as React.CSSProperties;

  return (
    <div
      className="fixed w-[100px] h-[120px] flex flex-col items-center select-none pointer-events-none z-50 balloon-anim"
      style={style}
      onAnimationEnd={() => onPop(data.id)}
      role="img"
      aria-label={`Floating balloon saying: ${data.text}`}
    >
      {/* The Balloon Body - Organic Shape */}
      <div 
        className="relative w-[85px] h-[100px] flex items-center justify-center text-center overflow-visible"
        style={{ 
            backgroundColor: data.colorVar,
            borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%', // Organic balloon shape
            boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.1), 2px 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        {/* Specular Highlight (Shine) */}
        <div className="absolute top-[15%] left-[15%] w-3 h-8 bg-white opacity-40 rounded-[50%] rotate-[-25deg] blur-[0.5px]"></div>
        <div className="absolute top-[14%] left-[22%] w-1.5 h-2.5 bg-white opacity-60 rounded-[50%] rotate-[-25deg]"></div>
        
        {/* Text Content */}
        <div className="relative z-10 px-2 pb-2 w-full flex items-center justify-center h-full pt-2">
            <p className="text-white font-bold text-xs leading-3 break-words drop-shadow-sm font-['Fredoka'] tracking-wide antialiased text-center max-h-[70%] overflow-hidden">
            {data.text}
            </p>
        </div>

        {/* The Knot */}
        <div 
            className="absolute -bottom-[4px] w-3 h-2"
            style={{ backgroundColor: data.colorVar, borderRadius: '20%' }}
        ></div>
      </div>

      {/* The String */}
      <div className="w-[1px] h-16 bg-white/60 origin-top animate-[stringWiggle_3s_ease-in-out_infinite] -mt-0.5"></div>
    </div>
  );
}, (prev, next) => prev.data.id === next.data.id);

Balloon.displayName = 'Balloon';