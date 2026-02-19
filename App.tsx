
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import PinCard from './components/PinCard';
import { fetchPins } from './services/pinterestService';
import { Pin, Category } from './types';
import { Loader2, Search, ArrowUpCircle, TrendingUp, Zap, Target, Globe, HelpCircle, Mail, ChevronRight, Bookmark } from 'lucide-react';

const App: React.FC = () => {
  const [pins, setPins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const fetchedPins = await fetchPins();
      setPins(fetchedPins);
      setLoading(false);
    };
    loadData();

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPins = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const bookmarks = JSON.parse(localStorage.getItem('wst_bookmarks') || '[]');

    return pins.filter(pin => {
      const matchesCategory = selectedCategory === 'All' || pin.detectedCategory === selectedCategory;
      const matchesBookmark = !showOnlyBookmarks || bookmarks.includes(pin.guid);
      
      if (!matchesCategory || !matchesBookmark) return false;
      if (!term) return true;

      const cleanDescription = (pin.description || '').replace(/<[^>]*>?/gm, '').toLowerCase();
      const cleanTitle = (pin.title || '').toLowerCase();
      const categoryTag = (pin.detectedCategory || '').toLowerCase();
      
      return cleanTitle.includes(term) || cleanDescription.includes(term) || categoryTag.includes(term);
    });
  }, [pins, selectedCategory, searchTerm, showOnlyBookmarks]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-100 selection:text-brand-900 dark:bg-slate-950 transition-colors">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-500 via-violet-500 to-cyan-500 z-[60] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <Header />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-20 pb-24 lg:pt-32 lg:pb-36 border-b dark:border-slate-800">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.05] dark:opacity-[0.1] pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full"><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/></pattern><rect width="100" height="100" fill="url(#grid)" /></svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-800 mb-8 uppercase tracking-[0.3em] animate-bounce">
                <TrendingUp className="w-3 h-3 mr-2" /> 2x Daily SEO Intelligence Sync
              </span>
              <h1 className="text-5xl sm:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] mb-8">
                Webseotrends <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-violet-500">Pins</span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
                Visual engineering for <strong className="text-slate-900 dark:text-slate-200">Modern Search</strong>. AI SEO strategies, Hosting guides, and Link Building visual roadmaps.
              </p>
              
              <div className="relative max-w-2xl mx-auto group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-600 to-violet-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative flex items-center">
                  <Search className="absolute left-5 text-slate-400 w-6 h-6" />
                  <input 
                    type="text" 
                    placeholder="Search over 5,000+ SEO visual assets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-xl dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="bg-slate-50 dark:bg-slate-900/50 py-16 border-b dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Pins Indexed', val: '5.2k+', icon: <Globe className="w-4 h-4" /> },
                { label: 'AI Strategies', val: '800+', icon: <Zap className="w-4 h-4" /> },
                { label: 'Sync Status', val: 'Active', icon: <TrendingUp className="w-4 h-4" /> },
                { label: 'Core Vitals', val: 'Passed', icon: <Target className="w-4 h-4" /> }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1">
                  <div className="text-brand-500 mb-2">{stat.icon}</div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">{stat.val}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-extrabold mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PIN GALLERY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                Gallery
              </h2>
              <button 
                onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${showOnlyBookmarks ? 'bg-brand-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200'}`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarks ? 'fill-current' : ''}`} />
                <span>Saved Pins</span>
              </button>
            </div>
            <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-brand-100 dark:border-slate-800 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-brand-600 rounded-full animate-spin border-t-transparent"></div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-black text-xs uppercase tracking-[0.3em] mt-8">Fetching Visual Data...</p>
            </div>
          ) : (
            <div className="pin-grid animate-slide-in">
              {filteredPins.map((pin) => (
                <PinCard key={pin.guid} pin={pin} />
              ))}
              {filteredPins.length === 0 && (
                <div className="col-span-full py-40 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <Search className="w-16 h-16 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
                  <p className="text-slate-400 dark:text-slate-500 font-bold text-xl">No assets found matching your criteria.</p>
                  <button 
                    onClick={() => {setSelectedCategory('All'); setSearchTerm(''); setShowOnlyBookmarks(false);}}
                    className="mt-6 text-brand-600 font-black hover:underline uppercase tracking-widest text-xs"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* FAQ SECTION */}
        <section className="bg-slate-950 text-white py-32 border-y border-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-block px-3 py-1 bg-brand-900/40 text-brand-400 text-[10px] font-black uppercase tracking-widest rounded mb-6">Expert Knowledge</div>
            <h2 className="text-5xl font-black mb-20 tracking-tighter">SEO Strategic <span className="text-brand-500">FAQ</span></h2>
            <div className="grid gap-12">
              {[
                {
                  q: "How does Webseotrends curate these pins?",
                  a: "Our team of SEO analysts identifies high-utility visual assets that break down complex algorithms into actionable steps. We refresh our local index twice daily to capture immediate shifts in marketing trends."
                },
                {
                  q: "Are the strategies updated for 2024/2025?",
                  a: "Yes. Our sync engine prioritizes fresh content. You'll find specific categories for AI Search (SGE), current Link Building ethics, and the latest Core Web Vitals requirements."
                },
                {
                  q: "Can I save my favorite pins?",
                  a: "Absolutely. Use the bookmark icon on any card to save it to your local gallery. No account required—it's stored securely in your browser's memory."
                }
              ].map((faq, idx) => (
                <div key={idx} className="group">
                  <h4 className="text-2xl font-extrabold mb-6 flex items-start group-hover:text-brand-400 transition-colors">
                    <span className="text-brand-600 mr-4 font-black">0{idx + 1}</span>
                    {faq.q}
                  </h4>
                  <p className="text-slate-400 leading-relaxed pl-12 text-lg">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="py-32 bg-brand-600 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-900/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <Mail className="w-20 h-20 mx-auto mb-8 opacity-50" />
            <h2 className="text-5xl sm:text-6xl font-black mb-6 tracking-tighter">Future-Proof Your <span className="underline decoration-violet-300">Strategy</span></h2>
            <p className="text-brand-100 text-xl mb-12 max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">Join 10,000+ top-tier SEOs receiving our curated breakdown of visual marketing trends every Tuesday.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="marketing@yourgrowth.com" 
                className="flex-grow px-8 py-5 rounded-3xl text-slate-900 font-bold outline-none shadow-2xl focus:ring-4 focus:ring-white/30 transition-all text-lg" 
              />
              <button className="bg-slate-950 text-white px-10 py-5 rounded-3xl font-black hover:bg-slate-900 transition-all shadow-2xl active:scale-95 text-lg">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t dark:border-slate-900 py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="max-w-md">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">W</div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Webseotrends Pins</h4>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
                The visual authority for search engine optimization. We bridge the gap between complex data and actionable creative strategy.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-20">
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Navigation</h5>
                <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                  <li><a href="https://webseotrends.com/blog/" className="hover:text-brand-600 transition-colors">Digital Blog</a></li>
                  <li><a href="https://webseotrends.com/seo/packages/" className="hover:text-brand-600 transition-colors">SEO Services</a></li>
                  <li><a href="https://webseotrends.com/seo/services/" className="hover:text-brand-600 transition-colors">SEO Case Studies</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Connect</h5>
                <ul className="space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                  <li><a href="https://www.pinterest.com/webseotrends/" className="hover:text-brand-600 transition-colors">Pinterest</a></li>
                  <li><a href="https://x.com/webseotrends" className="hover:text-brand-600 transition-colors">Twitter (X)</a></li>
                  <li><a href="https://www.linkedin.com/in/er-mani-pathak/" className="hover:text-brand-600 transition-colors">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 dark:text-slate-500 text-xs font-bold">&copy; {new Date().getFullYear()} Webseotrends. All Rights Reserved. Engineered for Performance.</p>
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-[10px] font-black text-brand-600 bg-brand-50 dark:bg-brand-900/20 px-3 py-1 rounded-full uppercase tracking-widest">
                <Zap className="w-3 h-3 mr-1.5" /> Static Performance Mode
              </span>
            </div>
          </div>
        </div>
      </footer>

      <button onClick={scrollToTop} className={`fixed bottom-8 right-8 p-5 bg-brand-600 text-white rounded-[2rem] shadow-2xl shadow-brand-200 dark:shadow-none transition-all duration-300 z-50 hover:bg-slate-950 dark:hover:bg-white dark:hover:text-slate-950 active:scale-90 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <ArrowUpCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default App;
