
import React, { useState, useEffect } from 'react';
import { Pin } from '../types';
import { ExternalLink, Bookmark, Share2, Check } from 'lucide-react';

interface PinCardProps {
  pin: Pin & { detectedCategory?: string };
  onBookmarkChange?: () => void;
}

const PinCard: React.FC<PinCardProps> = ({ pin, onBookmarkChange }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('wst_bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(pin.guid));
  }, [pin.guid]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const bookmarks = JSON.parse(localStorage.getItem('wst_bookmarks') || '[]');
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = bookmarks.filter((id: string) => id !== pin.guid);
    } else {
      newBookmarks = [...bookmarks, pin.guid];
    }
    localStorage.setItem('wst_bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
    if (onBookmarkChange) onBookmarkChange();
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: pin.title,
          text: `Check out this SEO tip from Webseotrends: ${pin.title}`,
          url: pin.link,
        });
      } else {
        await navigator.clipboard.writeText(pin.link);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch (err) {
      console.log('Error sharing', err);
    }
  };

  return (
    <article className="pin-item group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500">
      <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[2/3]">
        <img 
          src={pin.thumbnail} 
          alt={pin.title || 'Pinterest SEO Pin by WebSEOTrends'} 
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Hover Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <a 
            href={pin.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-slate-900 px-5 py-2.5 rounded-full flex items-center justify-center space-x-2 font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
          >
            <span>View Original</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={toggleBookmark}
            className={`p-2.5 rounded-full backdrop-blur-md shadow-lg transition-all active:scale-90 ${isBookmarked ? 'bg-brand-600 text-white' : 'bg-white/80 text-slate-900 hover:bg-white'}`}
            title={isBookmarked ? "Remove from bookmarks" : "Save pin"}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/80 backdrop-blur-md text-slate-900 hover:bg-white shadow-lg transition-all active:scale-90"
            title="Share this pin"
          >
            {shared ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          {pin.detectedCategory && (
            <span className="inline-block px-2.5 py-1 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-[10px] font-black uppercase tracking-widest rounded-lg">
              {pin.detectedCategory}
            </span>
          )}
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tighter">
            {new Date(pin.pubDate).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight line-clamp-2 group-hover:text-brand-600 transition-colors">
          {pin.title}
        </h3>
        {pin.description && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
             {pin.description.replace(/<[^>]*>?/gm, '')}
          </p>
        )}
      </div>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "ImageObject",
          "contentUrl": pin.thumbnail,
          "name": pin.title,
          "description": pin.description,
          "author": { "@type": "Person", "name": "WebSEOTrends" }
        })}
      </script>
    </article>
  );
};

export default PinCard;
