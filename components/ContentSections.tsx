import React from 'react';
import { Copy, ExternalLink, Wallet, ShoppingCart, Rocket } from 'lucide-react';

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

export const ContentSections: React.FC = () => {
  const copyAddress = () => {
    navigator.clipboard.writeText("8sF...pump"); // Placeholder address
    alert("Address copied to clipboard!");
  };

  const memeGalleryItems = [
    { prompt: "cactus hugging a red balloon romance funny meme", caption: "Forbidden Love" },
    { prompt: "potato floating into the sky tied to a red balloon", caption: "My Portfolio Ascending" },
    { prompt: "cat floating in space holding a single red balloon digital art", caption: "Adios, Earth" },
    { prompt: "red balloon wearing a business suit at a meeting", caption: "Serious Inflation" },
    { prompt: "skeleton sitting on a bench holding a red balloon waiting", caption: "Still HODLing" },
    { prompt: "red balloon with a face screaming while floating away", caption: "No thoughts, just up" }
  ];

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
             <SectionTitle><span className="text-white">Roadmap</span></SectionTitle>
             <div className="relative border-l-4 border-white/20 ml-4 md:ml-0 md:pl-8 space-y-16 max-w-3xl mx-auto">
                {[
                    { q: "Q1", title: "Launch", items: ["Token Launch", "Float Engine Live", "Meme Gallery"] },
                    { q: "Q2", title: "Ascension", items: ["Trending Sprint", "Early Floater NFT Airdrop"] },
                    { q: "Q3", title: "Expansion", items: ["DEX Graduation", "Digital Merch"] },
                    { q: "Q4", title: "Celebration", items: ["'Let It Float' Community Event"] }
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

      {/* GALLERY */}
      <SectionContainer id="gallery">
        <SectionTitle>Gallery</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {memeGalleryItems.map((item, i) => (
                <div key={i} className="group relative aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                    <img 
                        src={`https://image.pollinations.ai/prompt/${encodeURIComponent(item.prompt)}?width=400&height=400&nologo=true&seed=${i+55}`} 
                        alt={`Meme ${i + 1}`} 
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#3B1F6A]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center px-4 text-center">
                        <p className="text-white font-['Chewy'] text-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform drop-shadow-md leading-none">
                           "{item.caption}"
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </SectionContainer>

      <footer className="bg-[#3B1F6A] py-12 text-center border-t border-white/10 font-['Fredoka']">
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