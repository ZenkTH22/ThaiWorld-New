import React from 'react';
import { Clock, Activity } from 'lucide-react';
import './NewsCard.css';

const NewsCard = ({ title, category, timeAgo, trendLevel, color = "cyan", summary }) => {
  return (
    <div className={`news-card glass-panel accent-${color}`}>
      <div className="news-card-header">
        <span className={`news-category text-${color}`}>{category}</span>
        <div className="news-meta">
          <span className="news-time">
            <Clock size={14} /> {timeAgo} นาทีที่แล้ว
          </span>
          {trendLevel === 'high' && (
            <span className="news-trend text-orange">
              <Activity size={14} /> กำลังมาแรง
            </span>
          )}
        </div>
      </div>
      
      <div className="news-content">
        <h3 className="news-title">{title}</h3>
        {summary && <p className="news-summary">{summary}</p>}
      </div>
      
      <div className="news-footer">
        <button className={`read-more-btn bg-${color}`}>อ่านรายละเอียด</button>
      </div>
    </div>
  );
};

export default NewsCard;
