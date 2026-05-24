import React from 'react';
import { X, ExternalLink, Calendar } from 'lucide-react';
import './NewsDetailModal.css';

const NewsDetailModal = ({ news, onClose }) => {
  if (!news) return null;

  const formattedDate = new Date(news.pubDate).toLocaleString('th-TH', {
    dateStyle: 'full', timeStyle: 'short'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-body">
          <span className="modal-category text-cyan">
            {news.categories?.[0] || 'ข่าวทั่วไป'}
          </span>
          <h2 className="modal-title">{news.title}</h2>
          
          <div className="modal-meta">
            <span className="modal-date"><Calendar size={16}/> {formattedDate}</span>
            <span className="modal-author">โดย: {news.author || news.source || 'ไม่ระบุผู้เขียน'}</span>
          </div>
          
          {news.thumbnail && (
            <img src={news.thumbnail} alt={news.title} className="modal-image" />
          )}
          
          <div 
            className="modal-text" 
            dangerouslySetInnerHTML={{ __html: news.content || news.description }} 
          />

          <div className="modal-notice">
            * เนื่องจากข้อจำกัดของแหล่งข่าว เนื้อหาด้านบนจึงเป็นเพียงบทสรุปเบื้องต้น
          </div>
          
          <a href={news.link} target="_blank" rel="noopener noreferrer" className="read-original-btn">
            คลิกอ่านข่าวฉบับเต็มที่นี่ <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailModal;
