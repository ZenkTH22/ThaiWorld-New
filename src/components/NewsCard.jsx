import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDate } from '../utils/dateFormatter';
import { detectCategory } from '../utils/categoryHelper';
import './NewsCard.css';

const CATEGORY_BADGE_MAP = {
  'การเมือง': 'badge-purple',
  'เศรษฐกิจ': 'badge-green',
  'ต่างประเทศ': 'badge-cyan',
  'เทคโนโลยี': 'badge-pink',
  'กีฬา': 'badge-orange',
  'บันเทิง': 'badge-red',
  'ข่าวทั่วไป': 'badge-cyan',
};

const NewsCard = ({ news, onClick }) => {
  const summary = news.description ? news.description.replace(/<[^>]+>/g, '').substring(0, 100) + '...' : '';
  
  const formattedDate = formatDate(news.pubDate, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const thumbnail = news.thumbnail || news.enclosure?.link || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop';
  
  const categoryLabel = detectCategory(news);
  const badgeClass = CATEGORY_BADGE_MAP[categoryLabel] || 'badge-cyan';

  return (
    <article className="news-card protected-content" onClick={onClick}>
      <div className="news-card-image">
        <img src={thumbnail} alt="" loading="lazy" draggable="false" />
        <div className="card-image-overlay"></div>
        <span className={`card-badge badge ${badgeClass}`}>
          {categoryLabel}
        </span>
      </div>
      <div className="news-card-body">
        <h3 className="news-card-title">{news.title}</h3>
        {summary && <p className="news-card-excerpt">{summary}</p>}
        <div className="news-card-footer">
          <span className="news-card-time">
            <Calendar size={12} /> {formattedDate}
          </span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
