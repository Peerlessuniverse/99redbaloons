
import React, { useState } from 'react';
import { Download, ArrowLeft, Wand2, AlertCircle } from 'lucide-react';

interface MemeGeneratorProps {
  onBack: () => void;
}

export const MemeGenerator: React.FC<MemeGeneratorProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const generateMeme = async () => {
    if (!prompt) return;
    
    setLoading(true);
    setError('');
    setImageUrl('');
    setStatusMessage('Inflating your meme...');
    
    try {
      const seed = Math.floor(Math.random() * 1000000);
      // Removed specific model param to use robust default
      const fullPrompt = `funny absurd meme, ${prompt}, featuring a prominent red balloon, digital art style, high quality, 8k, humorous composition`;
      const directUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=1024&height=1024&nologo=true&seed=${seed}`;

      // Try to fetch as blob first for best UX (enables direct download)
      try {
        const response = await fetch(directUrl);
        if (!response.ok) throw new Error("Fetch failed");
        
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl);
      } catch (fetchErr) {
        console.warn("Blob fetch failed, falling back to direct URL", fetchErr);
        // Fallback: Use direct URL if fetch fails (e.g. CORS or network blip)
        // Pre-load image to ensure it exists before showing
        await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = directUrl;
        });
        setImageUrl(directUrl);
      }

    } catch (err: any) {
      console.error('Generation failed', err);
      setError('Failed to generate. Please try again!');
    } finally {
      setLoading(false);
      setStatusMessage('');
    }
  };

  const downloadMeme = async () => {
    if (!imageUrl) return;
    
    try {
      if (imageUrl.startsWith('blob:')) {
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = 'redballoon-meme.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        // Fallback for direct URLs: try to fetch blob for download
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'redballoon-meme.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }
    } catch (e) {
      // Last resort: open in new tab
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#CFE9F6] pt-24 pb-12 px-6 font-['Fredoka']">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#3B1F6A] font-bold mb-8 hover:text-[#E63946] transition-colors"
        >
          <ArrowLeft size={24} /> Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-white min-h-[500px]">
          <div className="bg-[#3B1F6A] p-6 text-center">
             <h1 className="text-3xl md:text-4xl font-['Chewy'] text-white tracking-wide">
               Meme Generator 🎈
             </h1>
             <p className="text-blue-100 mt-2">Create unlimited memes</p>
          </div>

          <div className="p-8 md:p-12 flex flex-col items-center gap-8">
            
            <div className="w-full max-w-lg space-y-4 animate-fade-in">
                <label className="block text-[#3B1F6A] font-bold text-lg ml-2">Describe your meme:</label>
                <div className="flex gap-2">
                    <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. A red balloon interrupting a wedding..."
                    className="flex-1 px-6 py-4 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:border-[#E63946] outline-none text-lg transition-colors text-gray-900 placeholder-gray-500"
                    onKeyDown={(e) => e.key === 'Enter' && generateMeme()}
                    />
                    <button 
                    onClick={generateMeme}
                    disabled={loading || !prompt}
                    className="bg-[#E63946] text-white p-4 rounded-2xl hover:bg-[#ff4d5a] disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:scale-95 transition-all"
                    >
                    <Wand2 size={28} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
                {error && (
                    <div className="flex items-center gap-2 text-red-500 text-sm font-bold ml-2 animate-bounce">
                    <AlertCircle size={16} />
                    {error}
                    </div>
                )}
            </div>

            <div className="w-full max-w-lg aspect-square bg-gray-100 rounded-2xl flex items-center justify-center border-4 border-dashed border-gray-300 relative overflow-hidden group">
                {loading ? (
                <div className="flex flex-col items-center gap-4 animate-pulse px-6 text-center">
                    <div className="w-16 h-16 bg-[#E63946] rounded-full animate-bounce"></div>
                    <p className="text-gray-600 font-bold transition-all duration-300">{statusMessage || "Generating..."}</p>
                </div>
                ) : imageUrl ? (
                <>
                    <img src={imageUrl} alt="Generated Meme" className="w-full h-full object-cover animate-fade-in" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                        onClick={downloadMeme}
                        className="bg-white text-[#3B1F6A] px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
                        >
                        <Download size={20} /> Download
                        </button>
                    </div>
                </>
                ) : (
                <div className="text-center px-8">
                    <p className="text-gray-400 font-bold mb-2">
                    Ready to ascend.
                    </p>
                    <p className="text-gray-300 text-sm">
                    (Your meme will always include a red balloon!)
                    </p>
                </div>
                )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
