import { useState, useEffect } from 'react';

const RSS_FEEDS = {
  thailand: [
    'https://www.thairath.co.th/rss/news',
    'https://thestandard.co/feed/',
    'https://www.prachachat.net/feed/'
  ],
  global: [
    'https://feeds.bbci.co.uk/news/world/rss.xml',
    'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'
  ]
};

export const useNewsService = () => {
  const [thaiNews, setThaiNews] = useState([]);
  const [globalNews, setGlobalNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchRss = async (url) => {
    try {
      // Append a cache-busting timestamp to both the RSS URL itself and the rss2json API call.
      // This forces rss2json to bypass its aggressive 1-hour caching and fetch real-time updates.
      const timestamp = Date.now();
      const separator = url.includes('?') ? '&' : '?';
      const cleanUrl = `${url}${separator}t=${timestamp}`;
      
      const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(cleanUrl)}&_t=${timestamp}`);
      const data = await res.json();
      return data.items || [];
    } catch (e) {
      console.error('Failed to fetch RSS:', url, e);
      return [];
    }
  };

  const loadNews = async () => {
    setLoading(true);
    
    // Fetch Thailand News
    const thResults = await Promise.all(RSS_FEEDS.thailand.map(fetchRss));
    const mergedTh = thResults.flat().sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    
    // Fetch Global News
    const glResults = await Promise.all(RSS_FEEDS.global.map(fetchRss));
    const mergedGl = glResults.flat().sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    setThaiNews(mergedTh);
    setGlobalNews(mergedGl);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
    
    // Update every 1 minute
    const interval = setInterval(() => {
      loadNews();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return { thaiNews, globalNews, loading, lastUpdated, refresh: loadNews };
};
