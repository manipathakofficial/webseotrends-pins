
export interface Pin {
  guid: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author: string;
  thumbnail: string;
  content: string;
  enclosure: {
    link: string;
    type: string;
  };
  categories: string[];
}

export interface PinterestFeedResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: Pin[];
}

export type Category = 
  | 'All'
  | 'AI SEO'
  | 'Local SEO'
  | 'Backlinks'
  | 'PPC'
  | 'Web Design'
  | 'SEO Tips'
  | 'Web Hosting'
  | 'Other';
