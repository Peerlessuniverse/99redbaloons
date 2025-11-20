import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MAX_WORDS, MAX_BALLOONS_ON_SCREEN, RED_VARIANTS } from '../constants';
import { BalloonData } from '../types';
import { Balloon } from './Balloon';

export const Hero: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [balloons, setBalloons] = useState<BalloonData[]>([]);
  const [showLess, setShowLess] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const nextId = useRef(0);

  // Pre-populate some balloons already stuck at the ceiling
  useEffect(() => {
    const initialBalloons: BalloonData[] = [];
    const marketingTexts = ["$REDBALLOON", "Float on", "WAGMI", "99M Dreams"];
    
    // Spawn a few that are already 'mid-life' or just stick them
    // Since our animation is 0 -> 100, to simulate them being already there we can't easily skip 
    // without complex web animations API. 
    // Instead, we just spawn them normally on load so they float up immediately.
    for (let i = 0; i < 5; i++) {
       // Random delays so they don't all go up at exactly the same millisecond
       setTimeout(() => {
           setBalloons(prev => [...prev, createBalloonData(marketingTexts[i % marketingTexts.length])]);
       }, i * 300);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createBalloonData = (text: string): BalloonData => {
    const id = nextId.current++;
    const isMobile = window.innerWidth < 768;
    
    // We need a random X destination relative to center (0).
    // Screen width is 100vw. Center is 0. Left edge is -50vw, Right edge is +50vw.
    // We keep them within -45 to +45 to avoid cutting off.
    const maxDist = isMobile ? 40 : 45; 
    const landingX = (Math.random() * (maxDist * 2)) - maxDist; 

    return {
      id,
      text,
      landingX, // Where it will end up on the ceiling (relative to center)
      duration: 9, // Fixed 9 seconds as requested
      rotate: (Math.random() - 0.5) * 15, // Slight rotation
      delay: 0,
      colorVar: RED_VARIANTS[Math.floor(Math.random() * RED_VARIANTS.length)],
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const wordCount = val.trim().split(/\s+/).filter(w => w.length > 0).length;
    
    if (wordCount > MAX_WORDS && val.length > inputValue.length) {
      setIsWarning(true);
      // Allow typing but show warning
    } else {
      setIsWarning(false);
    }
    setInputValue(val);
  };

  const handleFloat = useCallback(() => {
    if (!inputValue.trim()) return;
    
    const wordCount = inputValue.trim().split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount > MAX_WORDS) {
        setIsWarning(true);
        return;
    }

    const newBalloon = createBalloonData(inputValue);
    
    setBalloons(prev => {
      // Safety cap to prevent browser crash
      const limit = showLess ? 20 : MAX_BALLOONS_ON_SCREEN;
      const clean = prev.length >= limit ? prev.slice(prev.length - limit + 1) : prev;
      return [...clean, newBalloon];
    });

    setInputValue('');
    setIsWarning(false);
  }, [inputValue, showLess]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFloat();
    }
  };

  const removeBalloon = useCallback((id: number) => {
    setBalloons(prev => prev.filter(b => b.id !== id));
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center px-4 overflow-hidden bg-[#CFE9F6] font-['Fredoka']">
      
      {/* Balloon Layer - Fixed Position usually puts them relative to viewport, managed inside Balloon component */}
      {balloons.map(b => (
        <Balloon key={b.id} data={b} onPop={removeBalloon} />
      ))}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full animate-fade-in-up">
        
        <h1 className="sr-only">$REDBALLOON Meme Token</h1>
        
        {/* Tagline moved to Top */}
        <p className="text-[#3B1F6A] text-lg md:text-xl mb-4 text-center tracking-wide font-['Chewy'] drop-shadow-sm">
          “990M Dreams launched. Only 99M Ascend.”
        </p>

        {/* Large Logo - Moved below tagline */}
        <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
          <img 
            src="https://aistudiocdn.com/aistudio-e678f11a-4134-4468-8981-c4417177f12e.png" 
            alt="$REDBALLOON Logo" 
            className="w-40 md:w-60 h-auto drop-shadow-2xl"
          />
        </div>

        {/* Search/Chat Input Box */}
        <div className="w-full relative group z-20 max-w-lg">
          <div className={`absolute -inset-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 ${isWarning ? 'bg-red-600 opacity-60' : ''}`}></div>
          <div className="relative flex items-center bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-1.5 pr-1.5 border-2 border-white/50">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Write your dreams..."
              className="flex-1 pl-4 bg-transparent outline-none text-gray-700 placeholder-gray-400 font-['Fredoka'] text-base md:text-lg h-10 truncate"
              aria-label="Enter your dream for the balloon"
            />
            
            {/* Word Count Indicator */}
            <div className={`hidden md:block px-2 text-xs md:text-sm font-bold transition-colors ${isWarning ? 'text-red-500' : 'text-gray-300'}`}>
              {inputValue.trim().split(/\s+/).filter(w=>w).length}/10
            </div>

            <button
              onClick={handleFloat}
              className="bg-[#E63946] hover:bg-[#ff4d5a] text-white px-5 py-2 rounded-full font-['Chewy'] text-lg tracking-wide shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap border-b-4 border-[#b0232e] active:border-b-0 active:translate-y-1"
              aria-label="Float message balloon"
            >
              Float
            </button>
          </div>
        </div>

        {/* Error/Info Message */}
        <div className="h-6 mt-3 text-center">
            {isWarning ? (
                <span className="text-red-500 text-sm font-bold animate-bounce inline-block font-['Fredoka']">
                    Oops! 10 words max okay! 😉
                </span>
            ) : (
                <span className="text-[#3B1F6A]/60 text-xs font-medium">
                   Press Enter to ascend
                </span>
            )}
        </div>
      </div>

      {/* Toggle for Performance/Accessibility */}
      <div className="absolute bottom-4 right-4 z-20">
        <label className="flex items-center gap-2 bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-2xl cursor-pointer hover:bg-white/60 transition-colors shadow-sm border border-white/40">
          <input 
            type="checkbox" 
            checked={showLess}
            onChange={(e) => setShowLess(e.target.checked)}
            className="rounded text-[#E63946] focus:ring-[#E63946]"
          />
          <span className="text-xs text-[#3B1F6A] font-bold">Show less balloons</span>
        </label>
      </div>
    </section>
  );
};