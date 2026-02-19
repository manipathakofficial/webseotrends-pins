
import { PinterestFeedResponse, Pin, Category } from '../types';
import { PINTEREST_RSS_URL, RSS_TO_JSON_API, CATEGORY_MAP } from '../constants';

export const fetchPins = async (): Promise<Pin[]> => {
  try {
    // Generate a timestamp key that changes every 12 hours (2 times daily)
    // to force rss2json to fetch fresh data from Pinterest.
    const twelveHoursInMs = 12 * 60 * 60 * 1000;
    const cacheBuster = Math.floor(Date.now() / twelveHoursInMs);
    
    const apiUrl = `${RSS_TO_JSON_API}?rss_url=${encodeURIComponent(PINTEREST_RSS_URL)}&_t=${cacheBuster}`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch Pinterest feed');
    const data: PinterestFeedResponse = await response.json();
    
    return (data.items || []).map(item => ({
      ...item,
      thumbnail: item.enclosure?.link || item.thumbnail || extractImageUrl(item.description || ''),
      detectedCategory: detectCategory(item.title || '', item.description || '')
    }));
  } catch (error) {
    console.error('Error fetching pins:', error);
    return [];
  }
};

const extractImageUrl = (description: string): string => {
  const match = description.match(/src="([^"]+)"/);
  return match ? match[1] : 'https://picsum.photos/400/600';
};

const detectCategory = (title: string, description: string): Category => {
  const fullText = `${title || ''} ${description || ''}`.toLowerCase();
  
  for (const [keyword, category] of Object.entries(CATEGORY_MAP)) {
    if (fullText.includes(keyword)) {
      return category;
    }
  }
  
  return 'Other';
};
