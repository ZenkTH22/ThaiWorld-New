import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDate } from '../utils/dateFormatter';
import './NewsCard.css';

const NewsCard = ({ news, onClick }) => {
  // Use regex to strip HTML tags for a clean summary
  const summary = news.description ? news.description.replace(/<[^>]+>/g, '').substring(0, 120) + '...' : '';
  
  // Format precise date and time safely across browsers
  const formattedDate = formatDate(news.pubDate, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Fallback image if news doesn't provide one
  const thumbnail = news.thumbnail || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop';

  return (
    <div className="news-card glass-panel" onClick={onClick}>
      <div className="news-card-image">
        <img src={thumbnail} alt={news.title} loading="lazy" />
      </div>
      <div className="news-card-content">
        <div className="news-card-header">
          <span className="news-category text-cyan">
            {news.categories?.[0] || 'ข่าวทั่วไป'}
          </span>
          <span className="news-time">
            <Calendar size={12} /> {formattedDate}
          </span>
        </div>
        
        <h3 className="news-title">{news.title}</h3>
        {summary && <p className="news-summary">{summary}</p>}
      </div>
    </div>
  );
};

export default NewsCard;
