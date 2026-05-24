import React from 'react';
import { Flame } from 'lucide-react';
import './NewsTicker.css';

const NewsTicker = ({ newsItems }) => {
  return (
    <div className="ticker-wrapper">
      <div className="ticker-inner">
        <div className="ticker-label">
          <Flame size={14} className="ticker-flame" />
          <span>ข่าวด่วน</span>
        </div>
        <div className="ticker-track">
          <div className="ticker-content">
            {newsItems.map((news, index) => (
              <span key={index} className="ticker-item">
                <span className="ticker-dot">•</span> {news}
              </span>
            ))}
            {/* Duplicate for seamless scroll */}
            {newsItems.map((news, index) => (
              <span key={`dup-${index}`} className="ticker-item">
                <span className="ticker-dot">•</span> {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
