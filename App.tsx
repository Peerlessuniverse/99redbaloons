
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContentSections } from './components/ContentSections';
import { BalloonClickerGame } from './components/BalloonClickerGame';
import { PrivacyPolicy } from './components/PrivacyPolicy';

function App() {
  const [view, setView] = useState<'home' | 'game'>('home');

  const handleNavigate = (page: 'home' | 'game') => {
    setView(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#CFE9F6]">
      {view === 'home' ? (
        <>
          <Navbar onNavigate={handleNavigate} />
          <Hero />
          <ContentSections onNavigate={handleNavigate} />
        </>
      ) : (
        <BalloonClickerGame onBack={() => handleNavigate('home')} />
      )}
    </main>
  );
}

export default App;
