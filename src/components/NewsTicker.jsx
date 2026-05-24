import React from 'react';
import { Flame } from 'lucide-react';
import './NewsTicker.css';

const NewsTicker = ({ newsItems }) => {
  return (
    <div className="news-ticker-wrapper">
      <div className="ticker-label">
        <Flame size={16} className="flame-icon" />
        ข่าวด่วน
      </div>
      <div className="ticker-container">
        <div className="ticker-content">
          {newsItems.map((news, index) => (
            <span key={index} className="ticker-item">
              <span className="ticker-bullet">•</span> {news}
            </span>
          ))}
          {/* Duplicate for infinite scroll effect */}
          {newsItems.map((news, index) => (
            <span key={`dup-${index}`} className="ticker-item">
              <span className="ticker-bullet">•</span> {news}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
