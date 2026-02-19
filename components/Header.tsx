
import React, { useState, useEffect } from 'react';
import { ExternalLink, Moon, Sun, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-violet-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-200 dark:shadow-none transition-transform hover:scale-105">
            W
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">Webseotrends Pins</h1>
            <div className="flex items-center mt-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-1.5"></span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Visual Marketing Hub</p>
            </div>
          </div>
        </div>
        
        <nav className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <a href="https://www.webseotrends.com" className="hidden md:block text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 transition-colors">Website</a>
          
          <a href="https://www.pinterest.com/webseotrends/" target="_blank" rel="noopener noreferrer" 
             className="flex items-center space-x-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-sm font-bold hover:shadow-xl transition-all active:scale-95">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Follow</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
