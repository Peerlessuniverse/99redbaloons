import React, { useState } from 'react';
import { NAV_ITEMS } from '../constants';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-[#3B1F6A] text-white shadow-lg flex items-center justify-between px-6 md:px-12 transition-all duration-300 font-['Fredoka']">
      {/* Logo Area */}
      <div className="flex items-center gap-2 cursor-pointer select-none group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
        <div className="relative">
          <div className="w-8 h-8 bg-[#E63946] rounded-full flex items-center justify-center shadow-inner group-hover:animate-bounce">
            <span className="text-white text-lg font-['Chewy'] pt-1">$</span>
          </div>
          <div className="absolute -bottom-2 left-1/2 w-[1px] h-3 bg-white opacity-50 -translate-x-1/2"></div>
        </div>
        <span className="text-2xl tracking-wider font-['Chewy'] pt-1 text-[#F5F7FA]">$REDBALLOON</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="text-[#F5F7FA] hover:text-[#E63946] transition-colors font-medium text-lg tracking-wide"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-white hover:text-[#E63946] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-[#3B1F6A] shadow-xl flex flex-col items-center py-6 space-y-6 md:hidden border-t border-white/10 animate-fade-in">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-2xl font-bold text-white hover:text-[#E63946]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};