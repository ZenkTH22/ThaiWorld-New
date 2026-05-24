import React, { useState } from 'react';
import NewsCard from './NewsCard';
import NewsDetailModal from './NewsDetailModal';
import { useNewsService } from '../hooks/useNewsService';
import './Dashboard.css';

const Dashboard = ({ searchQuery, selectedCategory, thaiNews, globalNews, loading, lastUpdated, refresh }) => {
  const [selectedNews, setSelectedNews] = useState(null);

  const filterNews = (newsList) => {
    return newsList.filter(news => {
      // Filter by Search Query
      const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (news.description && news.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Filter by Category
      const matchesCategory = selectedCategory === 'ทั้งหมด' || 
                              (news.categories && news.categories.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase())));
                              
      return matchesSearch && matchesCategory;
    });
  };

  const filteredThai = filterNews(thaiNews);
  const filteredGlobal = filterNews(globalNews);

  return (
    <main className="dashboard">
      <div className="dashboard-meta">
        <p className="last-updated">
          อัปเดตล่าสุด: {lastUpdated.toLocaleTimeString('th-TH')}
          {loading && <span className="loading-spinner">กำลังโหลด...</span>}
        </p>
        <button className="refresh-btn" onClick={refresh}>🔄 รีเฟรช</button>
      </div>

      <div className="dashboard-columns">
        {/* Left Column: Thailand News */}
        <section className="news-column th-column">
          <div className="column-header">
            <div className="flag-icon">🇹🇭</div>
            <h2 className="column-title">ข่าวเด่นประเทศไทย</h2>
          </div>
          
          <div className="news-feed">
            {filteredThai.length > 0 ? (
              filteredThai.map((news, idx) => (
                <NewsCard key={idx} news={news} onClick={() => setSelectedNews(news)} />
              ))
            ) : (
              <p className="no-news">ไม่มีข่าวที่ตรงกับการค้นหา</p>
            )}
          </div>
        </section>

        {/* Right Column: Global News */}
        <section className="news-column global-column">
          <div className="column-header">
            <div className="flag-icon">🌐</div>
            <h2 className="column-title">ข่าวเด่นต่างประเทศ</h2>
          </div>
          
          <div className="news-feed">
            {filteredGlobal.length > 0 ? (
              filteredGlobal.map((news, idx) => (
                <NewsCard key={idx} news={news} onClick={() => setSelectedNews(news)} />
              ))
            ) : (
              <p className="no-news">ไม่มีข่าวที่ตรงกับการค้นหา</p>
            )}
          </div>
        </section>
      </div>

      {selectedNews && (
        <NewsDetailModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </main>
  );
};

export default Dashboard;
