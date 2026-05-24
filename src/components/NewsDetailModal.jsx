import React, { useState } from 'react';
import { X, ExternalLink, Calendar, Languages, Loader } from 'lucide-react';
import { translateText } from '../utils/translator';
import './NewsDetailModal.css';

const NewsDetailModal = ({ news, onClose }) => {
  const [translatedTitle, setTranslatedTitle] = useState(null);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);

  if (!news) return null;

  const formattedDate = new Date(news.pubDate).toLocaleString('th-TH', {
    dateStyle: 'full', timeStyle: 'short'
  });

  const handleTranslate = async () => {
    setIsTranslating(true);
    const [tTitle, tContent] = await Promise.all([
      translateText(news.title),
      translateText(news.content || news.description)
    ]);
    setTranslatedTitle(tTitle);
    setTranslatedContent(tContent);
    setIsTranslating(false);
  };

  const isGlobalNews = !news.title.match(/[\u0E00-\u0E7F]/); // Check if title has no Thai characters

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-body">
          <div className="modal-header-top">
            <span className="modal-category text-cyan">
              {news.categories?.[0] || 'ข่าวทั่วไป'}
            </span>
            {isGlobalNews && !translatedTitle && (
              <button 
                className="translate-agent-btn" 
                onClick={handleTranslate}
                disabled={isTranslating}
              >
                {isTranslating ? <Loader className="spin" size={16} /> : <Languages size={16} />}
                {isTranslating ? 'กำลังแปล...' : 'ให้ AI ช่วยแปล (TH)'}
              </button>
            )}
          </div>

          <h2 className="modal-title">{translatedTitle || news.title}</h2>
          
          <div className="modal-meta">
            <span className="modal-date"><Calendar size={16}/> {formattedDate}</span>
            <span className="modal-author">โดย: {news.author || news.source || 'ไม่ระบุผู้เขียน'}</span>
          </div>
          
          {news.thumbnail && (
            <img src={news.thumbnail} alt={news.title} className="modal-image" />
          )}
          
          <div 
            className="modal-text" 
            dangerouslySetInnerHTML={{ __html: translatedContent || news.content || news.description }} 
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
