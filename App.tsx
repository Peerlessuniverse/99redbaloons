import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContentSections } from './components/ContentSections';

function App() {
  return (
    <main className="min-h-screen bg-[#CFE9F6]">
      <Navbar />
      <Hero />
      <ContentSections />
    </main>
  );
}

export default App;
