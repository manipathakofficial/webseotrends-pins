
import { Category } from './types';

export const PINTEREST_RSS_URL = 'https://www.pinterest.com/webseotrends/feed.rss';
export const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json';

export const CATEGORY_MAP: Record<string, Category> = {
  'ai': 'AI SEO',
  'local': 'Local SEO',
  'backlink': 'Backlinks',
  'link building': 'Backlinks',
  'ppc': 'PPC',
  'google ads': 'PPC',
  'design': 'Web Design',
  'ux': 'Web Design',
  'ui': 'Web Design',
  'tips': 'SEO Tips',
  'guide': 'SEO Tips',
  'how to': 'SEO Tips',
  'hosting': 'Web Hosting',
  'server': 'Web Hosting',
  'vps': 'Web Hosting',
  'bluehost': 'Web Hosting',
  'siteground': 'Web Hosting',
};

export const CATEGORIES: Category[] = [
  'All',
  'AI SEO',
  'Local SEO',
  'Backlinks',
  'PPC',
  'Web Design',
  'SEO Tips',
  'Web Hosting'
];
