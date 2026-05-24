import React from 'react';
import { Clock } from 'lucide-react';
import './NewsCard.css';

const NewsCard = ({ news, onClick }) => {
  // Use regex to strip HTML tags for a clean summary
  const summary = news.description ? news.description.replace(/<[^>]+>/g, '').substring(0, 120) + '...' : '';
  const timeAgo = Math.max(1, Math.floor((new Date() - new Date(news.pubDate)) / 60000));

  return (
    <div className="news-card glass-panel" onClick={onClick}>
      {news.thumbnail && (
        <div className="news-card-image">
          <img src={news.thumbnail} alt={news.title} />
        </div>
      )}
      <div className="news-card-content">
        <div className="news-card-header">
          <span className="news-category text-cyan">
            {news.categories?.[0] || 'ข่าวทั่วไป'}
          </span>
          <span className="news-time">
            <Clock size={14} /> {timeAgo} นาทีที่แล้ว
          </span>
        </div>
        
        <h3 className="news-title">{news.title}</h3>
        {summary && <p className="news-summary">{summary}</p>}
      </div>
    </div>
  );
};

export default NewsCard;
