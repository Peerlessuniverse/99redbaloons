
import React from 'react';
import { Copy, ExternalLink, Wallet, ShoppingCart, Rocket, Gamepad2 } from 'lucide-react';

interface ContentSectionsProps {
  onNavigate: (page: 'home' | 'game' | 'privacy') => void;
}

const SectionContainer = ({ id, className = "", children }: { id: string, className?: string, children?: React.ReactNode }) => (
  <section id={id} className={`py-20 px-6 md:px-12 max-w-6xl mx-auto font-['Fredoka'] ${className}`}>
    {children}
  </section>
);

const SectionTitle = ({ children }: { children?: React.ReactNode }) => (
  <h2 className="text-4xl md:text-5xl font-['Chewy'] text-[#3B1F6A] mb-12 text-center tracking-wide drop-shadow-sm">
    {children}
  </h2>
);

export const ContentSections: React.FC<ContentSectionsProps> = ({ onNavigate }) => {
  const copyAddress = () => {
    navigator.clipboard.writeText("8sF...pump"); // Placeholder address
    alert("Address copied to clipboard!");
  };

  const burnMilestones = [
    { timeline: "Day 3", event: "Dev Wallet Burn (Phase 1)", amount: "10,000,000" },
    { timeline: "Day 6", event: "Dev Wallet Burn (Phase 2)", amount: "10,000,000" },
    { timeline: "Day 9", event: "Dev Wallet Burn (Final)", amount: "10,000,000" },
    { timeline: "After Day 9", event: "Dev Wallet Balance", amount: "0 $REDBALLOON (Empty)" },
  ];

  return (
    <div className="bg-white text-gray-800 font-['Fredoka']">
      
      {/* ABOUT */}
      <SectionContainer id="about">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <SectionTitle>About</SectionTitle>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
            Most tokens promise the moon. We offer something more relaxing: <span className="font-bold text-[#E63946] font-['Chewy'] text-3xl px-1">buoyancy.</span>
          </p>
          <p className="text-gray-500 text-lg">
            $REDBALLOON is a community experiment in collective ascension. 
            We don't pump; we float. When the market is heavy, we rise. 
            Not to the moon, just comfortably above the noise.
          </p>
        </div>
      </SectionContainer>

      {/* TOKENOMICS */}
      <div className="bg-blue-50/50">
        <SectionContainer id="tokenomics">
          <SectionTitle>Tokenomics</SectionTitle>
          
          {/* Deflationary Description - Full Width */}
          <p className="text-lg text-gray-700 leading-relaxed font-medium mb-12 text-center max-w-4xl mx-auto">
            $REDBALLOON was born with 99M tokens—but not all dreams are meant to stay grounded. Every three days, a burn ritual sheds a ten million more, lifting the project higher as the supply grows rarer and the narrative sharpens. By the end, only 69M remain on-chain, but the legend insists that just 9,900,000 reach the upper sky. A token that burns to rise. A meme that refuses gravity. A token born to float—and destined to ascend.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="space-y-8">
               
               <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-blue-100 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <h3 className="text-2xl font-['Chewy'] text-[#3B1F6A] mb-6 tracking-wide">Supply Breakdown</h3>
                  <ul className="space-y-4 text-lg">
                    <li className="flex flex-col md:flex-row justify-between md:items-center gap-1">
                        <span className="font-medium text-gray-600">Total Supply</span>
                        <span className="font-['Chewy'] text-2xl text-[#3B1F6A]">99,000,000</span>
                    </li>
                    <div className="h-[2px] bg-gray-100 w-full rounded-full"></div>
                    <li className="flex flex-col md:flex-row justify-between md:items-center gap-1">
                        <span className="font-medium text-gray-600">Circulating Supply</span>
                        <span className="font-['Chewy'] text-2xl text-[#E63946]">69,000,000</span>
                    </li>
                    <div className="h-[2px] bg-gray-100 w-full rounded-full"></div>
                    <li className="flex flex-col md:flex-row justify-between md:items-center gap-1">
                        <span className="font-medium text-gray-600">Max Supply</span>
                        <span className="font-['Chewy'] text-2xl text-[#E63946]">69,000,000</span>
                    </li>
                    <div className="h-[2px] bg-gray-100 w-full rounded-full"></div>
                    <li className="flex flex-col gap-1">
                        <span className="font-medium text-gray-600">Burn Mechanism</span>
                        <span className="font-['Fredoka'] text-base font-bold text-purple-600">3 timed burn rituals to remove 30 million forever.</span>
                    </li>
                  </ul>
               </div>
               
               <button 
                onClick={() => window.open('https://raydium.io', '_blank')}
                className="w-full bg-[#3B1F6A] text-white py-4 rounded-xl font-['Chewy'] text-xl tracking-wide flex justify-center items-center gap-2 hover:bg-[#2a164f] hover:scale-[1.02] transition-all shadow-md border-b-4 border-[#220f45] active:border-b-0 active:translate-y-1"
               >
                 Buy on Raydium <ExternalLink size={20} />
               </button>
            </div>
            
            <div className="flex flex-col items-center justify-center">
                {/* Simple SVG Donut Chart */}
                <svg width="260" height="260" viewBox="0 0 40 40" className="transform -rotate-90 drop-shadow-lg">
                    <circle cx="20" cy="20" r="15.915" fill="transparent" stroke="#E63946" strokeWidth="6" strokeDasharray="10 90" strokeDashoffset="-90" strokeLinecap="round"></circle> {/* 10% */}
                    <circle cx="20" cy="20" r="15.915" fill="transparent" stroke="#9333ea" strokeWidth="6" strokeDasharray="10 90" strokeDashoffset="-80" strokeLinecap="round"></circle> {/* 10% */}
                    <circle cx="20" cy="20" r="15.915" fill="transparent" stroke="#22c55e" strokeWidth="6" strokeDasharray="80 20" strokeDashoffset="0" strokeLinecap="round"></circle> {/* 80% */}
                </svg>
                <div className="mt-8 flex items-center gap-2 bg-gray-100/80 backdrop-blur px-6 py-3 rounded-full cursor-pointer hover:bg-[#E63946] hover:text-white transition-all group border border-gray-200 shadow-sm" onClick={copyAddress}>
                    <span className="font-mono text-sm md:text-base font-bold">CA: 8sF...pump</span>
                    <Copy size={16} className="text-gray-400 group-hover:text-white"/>
                </div>
            </div>
          </div>

          {/* NEW BURN TABLE */}
          <div className="mt-8 bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-blue-100">
            <div className="bg-[#3B1F6A] px-6 py-4 border-b-2 border-[#220f45]">
                <h3 className="text-2xl font-['Chewy'] text-white tracking-wide">Burn Plan</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-blue-50 text-[#3B1F6A]">
                        <tr>
                            <th className="p-4 font-['Chewy'] text-lg tracking-wide border-b border-blue-100">Timeline</th>
                            <th className="p-4 font-['Chewy'] text-lg tracking-wide border-b border-blue-100">Event</th>
                            <th className="p-4 font-['Chewy'] text-lg tracking-wide border-b border-blue-100">Amount / Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-50">
                        {burnMilestones.map((row, idx) => (
                            <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                <td className="p-4 font-bold text-gray-700">{row.timeline}</td>
                                <td className="p-4 text-[#E63946] font-bold">{row.event}</td>
                                <td className="p-4 font-mono text-[#3B1F6A]">{row.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>

        </SectionContainer>
      </div>

      {/* HOW TO BUY */}
      <SectionContainer id="how-to-buy">
        <SectionTitle>How to Float</SectionTitle>
        <div className="grid md:grid-cols-4 gap-6">
            {[
                { icon: Wallet, title: "Create Wallet", desc: "Download Phantom or Solflare." },
                { icon: Rocket, title: "Get SOL", desc: "Load up your wallet with some Solana." },
                { icon: ExternalLink, title: "Go to raydium.io", desc: "Find $REDBALLOON." },
                { icon: ShoppingCart, title: "Buy & Float", desc: "Swap SOL and join the club." }
            ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-lg border-b-8 border-[#E63946] hover:-translate-y-2 transition-transform duration-300 group">
                    <div className="w-16 h-16 bg-blue-50 text-[#3B1F6A] rounded-full flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                        <step.icon size={32} />
                    </div>
                    <h4 className="font-['Chewy'] text-2xl mb-2 text-[#3B1F6A]">Step {idx + 1}</h4>
                    <p className="font-bold text-lg mb-1">{step.title}</p>
                    <p className="text-gray-500">{step.desc}</p>
                </div>
            ))}
        </div>
      </SectionContainer>

      {/* ROADMAP */}
      <div className="bg-[#3B1F6A] text-white overflow-hidden">
        <SectionContainer id="roadmap">
             <SectionTitle><span className="text-white">Flight Plan</span></SectionTitle>
             <div className="relative border-l-4 border-white/20 ml-4 md:ml-0 md:pl-8 space-y-16 max-w-3xl mx-auto">
                {[
                    { q: "Phase 1", title: "Inflation", items: ["Token Launch on raydium.io", "Website & Brand Reveal", "'Great Ascension' Game Live", "Community Formation"] },
                    { q: "Phase 2", title: "Lift Off", items: ["Community-Driven Growth", "Milestone Burns Activated", "Organic Holder Distribution", "Meme Culture Expansion"] },
                    { q: "Phase 3", title: "Stratosphere", items: ["Continuous Supply Deflation", "Game Leaderboard Contests", "Community-Led Initiatives", "Steady Ascension"] },
                    { q: "Phase 4", title: "Orbit", items: ["Reaching 99M Supply Target", "Burn Mechanism Complete", "Pure Community Ownership", "Eternal Float Mode"] }
                ].map((phase, idx) => (
                    <div key={idx} className="relative pl-8 md:pl-0 group">
                        <div className="absolute -left-[44px] md:-left-[44px] top-1 w-7 h-7 bg-[#E63946] rounded-full border-4 border-[#CFE9F6] group-hover:scale-125 transition-transform"></div>
                        <h3 className="text-3xl font-['Chewy'] mb-3 text-[#CFE9F6] tracking-wide">{phase.q}: {phase.title}</h3>
                        <ul className="space-y-2">
                            {phase.items.map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-lg text-blue-100">
                                    <span className="w-2 h-2 bg-[#E63946] rounded-full"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
             </div>
        </SectionContainer>
      </div>

      {/* GAME / PLAY */}
      <SectionContainer id="play">
        <SectionTitle>The Great Ascension</SectionTitle>
        <div className="bg-gradient-to-br from-[#E63946] to-[#3B1F6A] rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 {/* Decorative circles */}
                 <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
                 <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <Gamepad2 size={64} className="mb-6 animate-bounce" />
                <h3 className="text-3xl md:text-5xl font-['Chewy'] mb-4 tracking-wide">Ready to Ascend?</h3>
                <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Pump the balloon, earn altitude, buy helium upgrades, and see how high you can float. Can you reach the moon?
                </p>
                <button 
                    onClick={() => onNavigate('game')}
                    className="bg-white text-[#E63946] px-10 py-4 rounded-full font-['Chewy'] text-2xl hover:scale-105 hover:bg-gray-100 transition-all shadow-lg border-b-8 border-gray-200 active:border-b-0 active:translate-y-2"
                >
                    PLAY NOW 🎈
                </button>
            </div>
        </div>
      </SectionContainer>

      <footer className="bg-[#3B1F6A] py-12 text-center border-t border-white/10 font-['Fredoka'] flex flex-col items-center">
        {/* Social Icons */}
        <div className="flex items-center gap-6 mb-8">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white hover:scale-110 transition-all" aria-label="X (Twitter)">
                {/* X Icon SVG */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            </a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white hover:scale-110 transition-all" aria-label="Telegram">
                {/* Telegram Icon SVG */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                   <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
            </a>
        </div>
        
        <p className="text-white/80 text-lg font-bold mb-2">
          Made with helium & irony. 🎈 $REDBALLOON
        </p>
        <p className="text-white/40 text-sm mb-4">
             Not financial advice. Do not float responsibly.
        </p>
        <button 
            onClick={() => onNavigate('privacy')}
            className="text-white/30 text-xs hover:text-white transition-colors underline decoration-white/30"
        >
            Privacy Policy (Bot)
        </button>
      </footer>
    </div>
  );
};
