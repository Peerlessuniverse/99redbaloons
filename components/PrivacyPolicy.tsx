
import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Server } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#CFE9F6] pt-24 pb-12 px-6 font-['Fredoka'] text-[#3B1F6A]">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 font-bold mb-8 hover:text-[#E63946] transition-colors bg-white/50 px-4 py-2 rounded-full w-fit"
        >
          <ArrowLeft size={24} /> Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-white">
          <div className="bg-[#3B1F6A] p-8 text-center border-b-4 border-[#220f45]">
             <div className="w-16 h-16 bg-[#E63946] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield size={32} className="text-white" />
             </div>
             <h1 className="text-3xl md:text-4xl font-['Chewy'] text-white tracking-wide">
               Privacy Policy
             </h1>
             <p className="text-blue-100 mt-2 font-bold opacity-80 uppercase tracking-widest text-sm">
               $REDBALLOON Telegram Bot
             </p>
          </div>

          <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
            
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <p className="italic text-center text-gray-600">
                    Last Updated: October 2025
                </p>
                <p className="mt-4 text-center">
                    This Privacy Policy describes how the <strong>$REDBALLOON Bot</strong> ("we", "our", or "us") collects, uses, and protects your information when you interact with our bot on Telegram. By using the bot, you agree to the collection and use of information in accordance with this policy.
                </p>
            </div>

            <section>
                <h2 className="text-2xl font-['Chewy'] text-[#E63946] mb-4 flex items-center gap-2">
                    <Eye size={24} /> 1. Information We Collect
                </h2>
                <p className="mb-4">We only collect the minimal amount of data necessary for the bot to function:</p>
                <ul className="list-disc pl-6 space-y-2 marker:text-[#E63946]">
                    <li><strong>Telegram User ID:</strong> A unique numeric identifier provided by Telegram to manage your specific session and game state.</li>
                    <li><strong>Username & Display Name:</strong> To address you correctly within the bot's interface.</li>
                    <li><strong>Interaction Data:</strong> Commands you send (e.g., /start, /float) to process your requests.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-['Chewy'] text-[#E63946] mb-4 flex items-center gap-2">
                    <Server size={24} /> 2. How We Use Your Data
                </h2>
                <p className="mb-4">Your data is used solely for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2 marker:text-[#E63946]">
                    <li><strong>Game Mechanics:</strong> To track your high scores, inventory, or participation in the $REDBALLOON ecosystem.</li>
                    <li><strong>Communication:</strong> To send you responses to your commands. We do not send spam or unsolicited messages.</li>
                    <li><strong>Bot Improvement:</strong> Aggregated, anonymized data may be used to identify bugs or improve features.</li>
                </ul>
            </section>

             <section>
                <h2 className="text-2xl font-['Chewy'] text-[#E63946] mb-4 flex items-center gap-2">
                    <Lock size={24} /> 3. Data Security
                </h2>
                <p>
                    We implement reasonable security measures to maintain the safety of your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-['Chewy'] text-[#E63946] mb-4">4. Third-Party Sharing</h2>
                <p>
                    We do <strong>not</strong> sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our bot, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                </p>
            </section>

            <div className="border-t-2 border-gray-100 pt-8 mt-8">
                <p className="text-sm text-gray-500 text-center">
                    For any questions regarding this Privacy Policy, please contact us via our official Telegram community.
                </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
