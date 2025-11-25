
import React from 'react';
import { Copy, ExternalLink, Wallet, ShoppingCart, Rocket, Gamepad2 } from 'lucide-react';

interface ContentSectionsProps {
  onNavigate: (page: 'home' | 'game') => void;
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
    { mc: "3 SOL", percent: "1%", amount: "9.9M" },
    { mc: "10 SOL", percent: "2%", amount: "19.8M" },
    { mc: "25 SOL", percent: "4%", amount: "39.6M" },
    { mc: "50 SOL", percent: "8%", amount: "79.2M" },
    { mc: "75 SOL", percent: "10%", amount: "99M" },
    { mc: "100 SOL (Graduation)", percent: "20%", amount: "198M" },
    { mc: "200 SOL", percent: "20%", amount: "198M" },
    { mc: "400 SOL", percent: "20%", amount: "198M" },
    { mc: "1000 SOL", percent: "15%", amount: "148.5M" },
  ];

  return (
    <div className="bg-white text-gray-800 font-['Fredoka']">
      
      {/* ABOUT */}
      <SectionContainer id="about">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <SectionTitle>About</SectionTitle>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
            Most tokens promise the moon. We promise something simpler: <span className="font-bold text-[#E63946] font-['Chewy'] text-3xl px-1">buoyancy.</span>
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
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="space-y-6">
               {/* Deflationary Description */}
               <p className="text-lg text-gray-700 leading-relaxed font-medium">
                 $REDBALLOON starts with 990M supply and deflates toward 99M through milestone-based burns tied to marketcap growth. As the project ascends, supply tightens, liquidity strengthens, and rarity increases. A token born to float—and destined to ascend.
               </p>

               <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-blue-100 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <h3 className="text-2xl font-['Chewy'] text-[#3B1F6A] mb-6 tracking-wide">Supply Breakdown</h3>
                  <ul className="space-y-4 text-lg">
                    <li className="flex flex-col md:flex-row justify-between md:items-center gap-1">
                        <span className="font-medium text-gray-600">Total Supply</span>
                        <span className="font-['Chewy'] text-2xl text-[#3B1F6A]">990,000,000</span>
                    </li>
                    <div className="h-[2px] bg-gray-100 w-full rounded-full"></div>
                    <li className="flex flex-col md:flex-row justify-between md:items-center gap-1">
                        <span className="font-medium text-gray-600">Final Target Supply</span>
                        <span className="font-['Chewy'] text-2xl text-[#E63946]">99,000,000</span>
                    </li>
                    <div className="h-[2px] bg-gray-100 w-full rounded-full"></div>
                    <li className="flex flex-col gap-1">
                        <span className="font-medium text-gray-600">Burn Mechanism</span>
                        <span className="font-['Fredoka'] text-base font-bold text-purple-600">Marketcap milestone burns (not time-based)</span>
                    </li>
                  </ul>
               </div>
               <button className="w-full bg-[#3B1F6A] text-white py-4 rounded-2xl font-['Chewy'] text-xl tracking-wide flex justify-center items-center gap-2 hover:bg-[#2a164f] hover:scale-[1.02] transition-all shadow-md border-b-4 border-[#220f45] active:border-b-0 active:translate-y-1">
                 Buy on Pump.fun <ExternalLink size={20} />
               </button>
            </div>
            
            <div className="flex flex-col items-center justify-center">
                {/* Simple SVG Donut Chart */}
                <svg width="260" height="260" viewBox="0 0 40 40" className="transform -rotate-90 drop-shadow-lg">
                    <circle cx="20" cy="20" r="15.915" fill="transparent" stroke="#E63946" strokeWidth="6" strokeDasharray="10 90" strokeDashoffset="-90" strokeLinecap="round"></circle> {/* 10% */}
                    <circle cx="20" cy="20" r="15.915" fill="transparent" stroke="#9333ea" strokeWidth="6" strokeDasharray="10 90" strokeDashoffset="-80" strokeLinecap="round"></circle> {/* 10% */}
                    <circle cx="20" cy="20" r="15.915" fill="transparent" stroke="#22c55e" strokeWidth="6" strokeDasharray="80 20" strokeDashoffset="0" strokeLinecap="round"></circle> {/* 80% */}
                    <text x="20" y="20" dy="0.35em" textAnchor="middle" className="fill-[#3B1F6A] text-[0.35rem] font-['Chewy'] rotate-90">990M</text>
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
                <h3 className="text-2xl font-['Chewy'] text-white tracking-wide">Milestone Burn Schedule</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-blue-50 text-[#3B1F6A]">
                        <tr>
                            <th className="p-4 font-['Chewy'] text-lg tracking-wide border-b border-blue-100">Marketcap Milestone</th>
                            <th className="p-4 font-['Chewy'] text-lg tracking-wide border-b border-blue-100">Burn % <span className="text-sm font-['Fredoka'] opacity-70 font-normal">(of initial)</span></th>
                            <th className="p-4 font-['Chewy'] text-lg tracking-wide border-b border-blue-100">Burn Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-50">
                        {burnMilestones.map((row, idx) => (
                            <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                <td className="p-4 font-bold text-gray-700">{row.mc}</td>
                                <td className="p-4 text-[#E63946] font-bold">{row.percent}</td>
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
                { icon: ExternalLink, title: "Go to Pump.fun", desc: "Find $REDBALLOON." },
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
                    { q: "Phase 1", title: "Inflation", items: ["Token Launch on Pump.fun", "Website & Brand Reveal", "'Great Ascension' Game Live", "Community Formation"] },
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

      <footer className="bg-[#3B1F6A] py-12 text-center border-t border-white/10 font-['Fredoka'] flex flex-col items-center"">
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
             <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white hover:scale-110 transition-all" aria-label="Discord">
                {/* Discord Icon SVG */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
                </svg>
            </a>
        </div>
        
        <p className="text-white/80 text-lg font-bold mb-2">
          Made with helium & irony. 🎈 $REDBALLOON
        </p>
        <p className="text-white/40 text-sm">
             Not financial advice. Do not float responsibly.
        </p>
      </footer>
    </div>
  );
};
