
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Wind, Zap, Rocket, Award, Star, Cloud, Save, BarChart3 } from 'lucide-react';

interface GameProps {
  onBack: () => void;
}

interface Upgrade {
  id: string;
  name: string;
  icon: React.ElementType;
  baseCost: number;
  increment: number; // How much it adds to auto-per-second
  count: number;
  description: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  val: number;
  isGolden?: boolean;
}

interface EnvironmentItem {
  id: number;
  type: 'cloud' | 'star';
  x: number;
  y: number;
  scale: number;
  speed: number;
}

export const BalloonClickerGame: React.FC<GameProps> = ({ onBack }) => {
  // Game State
  const [altitude, setAltitude] = useState(0); 
  const [clickPower, setClickPower] = useState(1);
  const [autoPower, setAutoPower] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  
  // Dynamic Environment State
  const [bgGradient, setBgGradient] = useState('from-[#CFE9F6] to-[#A9D6E5]');
  const [envItems, setEnvItems] = useState<EnvironmentItem[]>([]);
  const [goldenBalloon, setGoldenBalloon] = useState<{visible: boolean, x: number, y: number} | null>(null);

  // Upgrades Configuration
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    { id: 'lungs', name: 'Deep Breaths', icon: Wind, baseCost: 15, increment: 0, count: 0, description: '+1 Click Power' },
    { id: 'helium', name: 'Helium Tank', icon: Zap, baseCost: 50, increment: 5, count: 0, description: '+5 ft/sec' },
    { id: 'fan', name: 'Giant Fan', icon: Wind, baseCost: 250, increment: 20, count: 0, description: '+20 ft/sec' },
    { id: 'rocket', name: 'Booster', icon: Rocket, baseCost: 1000, increment: 100, count: 0, description: '+100 ft/sec' },
    { id: 'satellite', name: 'Satellite Relay', icon: Star, baseCost: 5000, increment: 500, count: 0, description: '+500 ft/sec' },
  ]);

  const particleId = useRef(0);

  // --- SAVE / LOAD SYSTEM ---
  useEffect(() => {
    // Load on Mount
    const savedData = localStorage.getItem('redballoon_save_v1');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setAltitude(parsed.altitude || 0);
        setClickPower(parsed.clickPower || 1);
        setAutoPower(parsed.autoPower || 0);
        
        // Restore upgrade counts
        if (parsed.upgradeCounts) {
          setUpgrades(prev => prev.map(u => ({
            ...u,
            count: parsed.upgradeCounts[u.id] || 0
          })));
        }
      } catch (e) {
        console.error("Save file corrupted", e);
      }
    }
    setLoaded(true);
  }, []);

  const handleSave = () => {
    const upgradeCounts: Record<string, number> = {};
    upgrades.forEach(u => upgradeCounts[u.id] = u.count);

    const dataToSave = {
      altitude,
      clickPower,
      autoPower,
      upgradeCounts
    };
    localStorage.setItem('redballoon_save_v1', JSON.stringify(dataToSave));
    
    setSaveStatus('Saved!');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  // --- ATMOSPHERE & ENVIRONMENT LOOP ---
  useEffect(() => {
    // Determine Background based on Altitude
    if (altitude < 2000) {
      setBgGradient('from-[#CFE9F6] to-[#A9D6E5]'); // Sky
    } else if (altitude < 10000) {
      setBgGradient('from-[#89C2D9] to-[#468FAF]'); // Stratosphere
    } else if (altitude < 25000) {
      setBgGradient('from-[#468FAF] to-[#2A6F97]'); // Mesosphere
    } else if (altitude < 50000) {
      setBgGradient('from-[#2A6F97] to-[#012A4A]'); // Thermosphere
    } else {
      setBgGradient('from-[#012A4A] to-[#000000]'); // Space
    }

    // Spawn Environment Items (Clouds/Stars)
    const interval = setInterval(() => {
        setEnvItems(prev => {
            // Remove items off screen (y > 110%)
            const clean = prev.filter(item => item.y < 110);
            
            // Spawn new ones occasionally
            if (clean.length < 8 && Math.random() > 0.7) {
                const isSpace = altitude > 25000;
                return [...clean, {
                    id: Math.random(),
                    type: isSpace ? 'star' : 'cloud',
                    x: Math.random() * 100, // %
                    y: -20, // Start above screen
                    scale: 0.5 + Math.random() * 1,
                    speed: 0.2 + Math.random() * 0.5
                }];
            }
            
            // Move items down (parallax effect relative to going up)
            return clean.map(item => ({
                ...item,
                y: item.y + item.speed
            }));
        });
    }, 100);

    return () => clearInterval(interval);
  }, [altitude]);


  // --- GOLDEN BALLOON EVENT ---
  useEffect(() => {
      const spawnTimer = setInterval(() => {
          // 15% chance every 5 seconds to spawn if not already active
          if (!goldenBalloon && Math.random() < 0.3) {
             setGoldenBalloon({
                 visible: true,
                 x: Math.random() * 80 + 10, // 10% to 90% width
                 y: 110 // Start from bottom
             });
          }
      }, 5000);

      // Animation Loop for Golden Balloon
      const moveTimer = setInterval(() => {
          if (goldenBalloon && goldenBalloon.visible) {
              setGoldenBalloon(prev => {
                  if (!prev) return null;
                  const newY = prev.y - 1.5; // Float up
                  if (newY < -20) return null; // Despawn
                  return { ...prev, y: newY };
              });
          }
      }, 50);

      return () => {
          clearInterval(spawnTimer);
          clearInterval(moveTimer);
      };
  }, [goldenBalloon]);


  // --- GAME LOGIC ---
  useEffect(() => {
    if (autoPower === 0) return;
    const interval = setInterval(() => {
      setAltitude(prev => prev + autoPower);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoPower]);

  const handleBalloonClick = (e: React.MouseEvent) => {
    addAltitude(clickPower, e.clientX, e.clientY);
    triggerClickAnim();
  };

  const handleGoldenClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      const bonus = Math.max(100, clickPower * 50); // Massive bonus
      addAltitude(bonus, e.clientX, e.clientY, true);
      setGoldenBalloon(null);
  };

  const addAltitude = (amount: number, clientX: number, clientY: number, isGolden = false) => {
    setAltitude(prev => prev + amount);
    
    // Particles
    const rect = document.body.getBoundingClientRect(); // relative to body
    const x = clientX;
    const y = clientY;
    const newParticle = { id: particleId.current++, x, y, val: amount, isGolden };
    
    setParticles(prev => [...prev, newParticle]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  const triggerClickAnim = () => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 100);
  };

  const buyUpgrade = (upgradeId: string) => {
    setUpgrades(prev => prev.map(u => {
      if (u.id !== upgradeId) return u;

      const cost = Math.floor(u.baseCost * Math.pow(1.15, u.count));
      if (altitude >= cost) {
        setAltitude(a => a - cost);
        if (u.id === 'lungs') {
            setClickPower(cp => cp + 1);
        } else {
            setAutoPower(ap => ap + u.increment);
        }
        return { ...u, count: u.count + 1 };
      }
      return u;
    }));
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgGradient} pt-24 pb-12 px-4 font-['Fredoka'] overflow-hidden select-none transition-colors duration-[5000ms] flex flex-col`}>
      
      {/* BACKGROUND PARTICLES (Clouds/Stars) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {envItems.map(item => (
              <div 
                key={item.id}
                className={`absolute transition-transform duration-100 ${item.type === 'star' ? 'text-yellow-200 animate-pulse' : 'text-white/40'}`}
                style={{ 
                    left: `${item.x}%`, 
                    top: `${item.y}%`, 
                    transform: `scale(${item.scale})` 
                }}
              >
                  {item.type === 'cloud' ? <Cloud size={64} fill="currentColor" /> : <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>}
              </div>
          ))}
      </div>

      <div className="max-w-7xl mx-auto h-full w-full flex flex-col md:flex-row gap-8 relative z-10 flex-1">
        
        {/* LEFT COLUMN: GAME AREA */}
        <div className="flex-1 flex flex-col items-center">
            <div className="w-full flex justify-between items-start">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-[#3B1F6A] font-bold mb-4 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white hover:text-[#E63946] transition-colors shadow-sm"
                >
                    <ArrowLeft size={24} /> <span className="hidden md:inline">Back to Earth</span>
                </button>
                
                <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 text-[#3B1F6A] font-bold bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full hover:bg-[#E63946] hover:text-white transition-all shadow-sm active:scale-95"
                >
                    <Save size={18} /> 
                    <span>{saveStatus || "Save Game"}</span>
                </button>
            </div>

            {/* Score Display */}
            <div className="text-center mb-8 animate-fade-in-up">
                <h2 className="text-[#3B1F6A] text-xl font-bold uppercase tracking-wider mb-1 drop-shadow-sm bg-white/30 backdrop-blur-sm rounded-lg px-2 inline-block">Current Altitude</h2>
                <div className="text-6xl md:text-8xl font-['Chewy'] text-[#E63946] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] stroke-white leading-none my-2">
                    {Math.floor(altitude).toLocaleString()} <span className="text-3xl text-[#3B1F6A]">ft</span>
                </div>
                <div className="text-gray-800 font-bold mt-2 bg-white/60 inline-block px-6 py-2 rounded-full shadow-sm backdrop-blur-sm border-2 border-white/50">
                    <span className="text-[#E63946]">{autoPower}</span> ft/sec • <span className="text-[#E63946]">{clickPower}</span> ft/click
                </div>
            </div>

            {/* PLAY AREA */}
            <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center">
                
                {/* GOLDEN BALLOON EVENT */}
                {goldenBalloon && goldenBalloon.visible && (
                    <div 
                        className="absolute z-50 cursor-pointer hover:scale-110 transition-transform animate-pulse"
                        style={{ left: `${goldenBalloon.x}%`, top: `${goldenBalloon.y}%` }}
                        onClick={handleGoldenClick}
                    >
                        <div className="w-16 h-20 bg-yellow-400 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-[0_0_20px_rgba(255,215,0,0.6)] border-2 border-yellow-200 flex items-center justify-center">
                            <span className="font-['Chewy'] text-[#3B1F6A] text-xl">$$$</span>
                        </div>
                    </div>
                )}

                {/* MAIN BALLOON */}
                <div 
                    className={`relative w-64 h-80 md:w-72 md:h-96 cursor-pointer transition-transform duration-75 select-none ${isClicking ? 'scale-95' : 'scale-100 hover:scale-105'}`}
                    onClick={handleBalloonClick}
                >
                     {/* Balloon Body */}
                    <div 
                        className="w-full h-full bg-[#E63946] rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.2),10px_10px_20px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.2)] relative overflow-hidden border-4 border-[#b0232e]"
                    >
                        {/* Shine */}
                        <div className="absolute top-[15%] left-[15%] w-10 h-24 bg-white opacity-40 rounded-[50%] rotate-[-25deg] blur-[2px]"></div>
                        
                        {/* Face */}
                        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 flex flex-col items-center opacity-90">
                            <div className="flex gap-10 mb-3">
                                <div className="w-5 h-5 bg-white rounded-full shadow-inner"></div>
                                <div className="w-5 h-5 bg-white rounded-full shadow-inner"></div>
                            </div>
                            <div className={`w-10 h-5 border-b-4 border-white rounded-[0_0_100%_100%] transition-all ${isClicking ? 'h-8 w-8 rounded-full border-4 border-white bg-transparent' : ''}`}></div>
                        </div>
                    </div>
                    {/* Knot */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-6 bg-[#E63946] rounded-md border-2 border-[#b0232e]"></div>
                    {/* String */}
                    <div className="absolute top-[98%] left-1/2 -translate-x-1/2 w-[3px] h-40 bg-white/70 origin-top animate-[stringWiggle_3s_ease-in-out_infinite]"></div>
                    
                    {/* Particles */}
                    {particles.map(p => (
                        <div 
                            key={p.id}
                            className={`absolute text-5xl font-['Chewy'] pointer-events-none animate-fade-out-up z-50 whitespace-nowrap ${p.isGolden ? 'text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]' : 'text-[#3B1F6A]'}`}
                            style={{ left: p.x - (window.innerWidth < 768 ? 0 : 300), top: p.y - 150 }} // Rough adjustment for fixed pos vs container
                        >
                            {p.isGolden ? `BONUS +${p.val}!` : `+${p.val}`}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: SHOP & CHART */}
        <div className="flex flex-col gap-6 w-full md:w-[400px]">
            
            {/* UPGRADE SHOP */}
            <div className="w-full bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border-2 border-white/40 flex flex-col h-96 md:h-[500px] transition-all">
                <div className="bg-[#3B1F6A]/90 backdrop-blur-sm p-4 text-center border-b border-white/20">
                    <h3 className="text-2xl text-white font-['Chewy'] tracking-wide">Upgrade Shop 🛒</h3>
                    <p className="text-blue-100 text-sm">Spent altitude returns you to earth!</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent">
                    {upgrades.map(item => {
                        const currentCost = Math.floor(item.baseCost * Math.pow(1.15, item.count));
                        const canAfford = altitude >= currentCost;

                        return (
                            <button
                                key={item.id}
                                onClick={() => buyUpgrade(item.id)}
                                disabled={!canAfford}
                                className={`w-full flex items-center justify-between p-4 rounded-xl border-b-2 transition-all relative overflow-hidden group ${
                                    canAfford 
                                    ? 'bg-white/50 backdrop-blur-sm border-white/60 hover:bg-white/80 hover:border-[#E63946] active:scale-[0.98] shadow-sm' 
                                    : 'bg-black/20 backdrop-blur-sm border-white/10 opacity-60 cursor-not-allowed'
                                }`}
                            >
                                <div className="flex items-center gap-4 z-10">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm transition-colors ${canAfford ? 'bg-[#E63946]' : 'bg-gray-500'}`}>
                                        <item.icon size={20} />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-bold text-[#3B1F6A] text-sm md:text-base leading-tight">{item.name}</h4>
                                        <p className="text-[10px] md:text-xs text-[#3B1F6A] font-bold">{item.description}</p>
                                    </div>
                                </div>
                                
                                <div className="text-right z-10">
                                    <p className="font-['Chewy'] text-lg text-[#3B1F6A]">{currentCost}</p>
                                    <p className="text-[10px] text-[#3B1F6A] font-bold uppercase opacity-80">ft cost</p>
                                </div>

                                {/* Level Badge */}
                                <div className="absolute top-1 right-1 bg-white/80 backdrop-blur text-[#3B1F6A] text-[9px] px-2 rounded-full font-bold shadow-sm">
                                    Lvl {item.count}
                                </div>
                            </button>
                        )
                    })}
                    
                    {/* Milestone Badge */}
                    <div className="mt-4 text-center p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50">
                        <Award className="mx-auto text-yellow-500 mb-1 drop-shadow-sm" size={32} />
                        <p className="text-xs text-[#3B1F6A] font-bold">Next Target: Moon (238,900 ft)</p>
                        <div className="w-full bg-black/10 rounded-full h-2 mt-1 overflow-hidden">
                            <div className="bg-[#E63946] h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (altitude / 238900) * 100)}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LIVE CHART */}
            <div className="w-full bg-white/30 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border-2 border-white/40 h-[300px] flex flex-col">
                 <div className="bg-[#3B1F6A]/90 backdrop-blur-sm px-4 py-2 flex items-center justify-between border-b border-white/20">
                    <h3 className="text-white font-bold flex items-center gap-2 text-sm"><BarChart3 size={16}/> Live Chart</h3>
                    <span className="text-xs text-white/60">DexScreener</span>
                 </div>
                 <div className="flex-1 bg-black/40 relative">
                     {/* Embed DexScreener - Using a popular random Solana token as placeholder since standard placeholder creates 404 */}
                     {/* In production, replace with: https://dexscreener.com/solana/[YOUR_TOKEN_ADDRESS]?embed=1&theme=dark */}
                     <iframe 
                        src="https://dexscreener.com/solana/58f9a92z8f9a92z?embed=1&theme=dark" 
                        title="Live Chart"
                        className="w-full h-full border-0"
                     ></iframe>
                     
                     {/* Overlay for fake token visual since we don't have a real CA */}
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/60 backdrop-blur-[2px]">
                         <div className="text-center text-white p-4">
                             <p className="font-['Chewy'] text-2xl mb-2 text-[#E63946]">Chart Coming Soon!</p>
                             <p className="text-sm opacity-70">Once liquidity is added to Raydium.</p>
                             <p className="text-xs mt-2 opacity-50 font-mono">CA: 8sF...pump</p>
                         </div>
                     </div>
                 </div>
            </div>
        </div>

      </div>

      <footer className="mt-8 text-center pb-4 relative z-10">
        <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/20 shadow-sm">
            <p className="text-[#3B1F6A] text-sm font-bold">
            Made with helium & irony. 🎈 $REDBALLOON
            </p>
        </div>
        <button 
            onClick={() => onNavigate('privacy')}
            className="text-[#3B1F6A]/50 text-xs hover:text-[#3B1F6A] transition-colors underline decoration-[#3B1F6A]/30"
        >
            Privacy Policy (Bot)
        </button>
      </footer>
    </div>
  );
};
