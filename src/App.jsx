import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NewsTicker from './components/NewsTicker';
import Dashboard from './components/Dashboard';
import { useNewsService } from './hooks/useNewsService';
import { initAntiScrape } from './utils/antiScrape';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  
  const { thaiNews, globalNews, loading, lastUpdated, refresh } = useNewsService();

  // Initialize anti-scraping protection
  useEffect(() => {
    initAntiScrape();
  }, []);

  // Get top 5 breaking news for the ticker (mixing Thai and Global)
  const breakingNews = [...thaiNews.slice(0, 3), ...globalNews.slice(0, 2)]
    .map(news => news.title)
    .filter(Boolean);

  // If no data yet, provide fallbacks
  const tickerItems = breakingNews.length > 0 
    ? breakingNews 
    : ["กำลังโหลดข่าวสารล่าสุด...", "โปรดรอสักครู่..."];

  return (
    <div className="app-container">
      <div className="ambient-background"></div>
      
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      
      <NewsTicker newsItems={tickerItems} />
      
      <Dashboard 
        searchQuery={searchQuery} 
        selectedCategory={selectedCategory}
        thaiNews={thaiNews}
        globalNews={globalNews}
        loading={loading}
        lastUpdated={lastUpdated}
        refresh={refresh}
      />
      
      <footer className="app-footer">
        <p>
          <span className="live-dot"></span>
          ดึงข้อมูลข่าวสารจริงผ่าน RSS Feeds สาธารณะ — อัปเดตอัตโนมัติทุก 1 นาที
        </p>
        <p style={{marginTop: '8px', fontSize: '11px'}}>🛡️ Protected by Anti-Scrape System v2.0</p>
      </footer>
    </div>
  );
}

export default App;
