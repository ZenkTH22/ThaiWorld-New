import React, { useState } from 'react';
import NewsCard from './NewsCard';
import NewsDetailModal from './NewsDetailModal';
import ErrorBoundary from './ErrorBoundary';
import { detectCategory } from '../utils/categoryHelper';
import { RefreshCw, TrendingUp, Globe2, Newspaper } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ searchQuery, selectedCategory, thaiNews, globalNews, loading, lastUpdated, refresh }) => {
  const [selectedNews, setSelectedNews] = useState(null);

  const filterNews = (newsList) => {
    return newsList.filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (news.description && news.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const newsCat = detectCategory(news);
      const matchesCategory = selectedCategory === 'ทั้งหมด' || newsCat === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredThai = filterNews(thaiNews);
  const filteredGlobal = filterNews(globalNews);
  const totalNews = thaiNews.length + globalNews.length;

  return (
    <main className="dashboard protected-content">
      {/* ═══ Stats Bar ═══ */}
      <div className="stats-bar">
        <div className="stat-chip">
          <Newspaper size={14} />
          <span>ข่าวทั้งหมด <strong>{totalNews}</strong></span>
        </div>
        <div className="stat-chip">
          <TrendingUp size={14} />
          <span>ข่าวไทย <strong>{thaiNews.length}</strong></span>
        </div>
        <div className="stat-chip">
          <Globe2 size={14} />
          <span>ข่าวต่างประเทศ <strong>{globalNews.length}</strong></span>
        </div>
        
        <div className="stats-right">
          <span className="last-updated-text">
            <span className="live-dot"></span>
            อัปเดตล่าสุด {lastUpdated.toLocaleTimeString('th-TH')}
          </span>
          <button className={`refresh-btn ${loading ? 'spinning' : ''}`} onClick={refresh} disabled={loading}>
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* ═══ News Columns ═══ */}
      <div className="dashboard-columns">
        {/* Thai News */}
        <section className="news-section">
          <div className="section-header">
            <div className="section-title-group">
              <span className="section-flag">🇹🇭</span>
              <div>
                <h2 className="section-title">ข่าวเด่นประเทศไทย</h2>
                <p className="section-subtitle">{filteredThai.length} รายการ</p>
              </div>
            </div>
          </div>
          
          <div className="news-grid">
            {loading && thaiNews.length === 0 ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton skeleton-img"></div>
                  <div className="skeleton-body">
                    <div className="skeleton skeleton-badge"></div>
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-text"></div>
                  </div>
                </div>
              ))
            ) : filteredThai.length > 0 ? (
              filteredThai.map((news, idx) => (
                <NewsCard key={`th-${idx}`} news={news} onClick={() => setSelectedNews(news)} />
              ))
            ) : (
              <p className="no-news">ไม่พบข่าวที่ตรงกับการค้นหา</p>
            )}
          </div>
        </section>

        {/* Global News */}
        <section className="news-section">
          <div className="section-header">
            <div className="section-title-group">
              <span className="section-flag">🌐</span>
              <div>
                <h2 className="section-title">ข่าวเด่นต่างประเทศ</h2>
                <p className="section-subtitle">{filteredGlobal.length} รายการ</p>
              </div>
            </div>
          </div>
          
          <div className="news-grid">
            {loading && globalNews.length === 0 ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton skeleton-img"></div>
                  <div className="skeleton-body">
                    <div className="skeleton skeleton-badge"></div>
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-text"></div>
                  </div>
                </div>
              ))
            ) : filteredGlobal.length > 0 ? (
              filteredGlobal.map((news, idx) => (
                <NewsCard key={`gl-${idx}`} news={news} onClick={() => setSelectedNews(news)} />
              ))
            ) : (
              <p className="no-news">ไม่พบข่าวที่ตรงกับการค้นหา</p>
            )}
          </div>
        </section>
      </div>

      {selectedNews && (
        <ErrorBoundary>
          <NewsDetailModal news={selectedNews} onClose={() => setSelectedNews(null)} />
        </ErrorBoundary>
      )}
    </main>
  );
};

export default Dashboard;
