import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Calendar, Languages, Loader2, User, ArrowRight } from 'lucide-react';
import { translateText } from '../utils/translator';
import { formatDate } from '../utils/dateFormatter';
import { detectCategory } from '../utils/categoryHelper';
import './NewsDetailModal.css';

const NewsDetailModal = ({ news, onClose }) => {
  const [translatedTitle, setTranslatedTitle] = useState(null);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);

  if (!news) return null;

  const formattedDate = formatDate(news.pubDate, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const [tTitle, tContent] = await Promise.all([
        translateText(news.title),
        translateText(news.content || news.description)
      ]);
      setTranslatedTitle(tTitle);
      setTranslatedContent(tContent);
    } catch (err) {
      console.error('Translation failed:', err);
    }
    setIsTranslating(false);
  };

  const isGlobalNews = !news?.title?.match(/[\u0E00-\u0E7F]/);
  // Extract thumbnail with premium fallback parsing for feeds like The Standard that embed images inside the description/content
  let thumbnail = news.thumbnail || news.enclosure?.link;
  
  if (!thumbnail && news.content) {
    const imgMatch = news.content.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch && imgMatch[1]) {
      thumbnail = imgMatch[1];
    }
  }
  
  if (!thumbnail && news.description) {
    const imgMatch = news.description.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch && imgMatch[1]) {
      thumbnail = imgMatch[1];
    }
  }
  
  if (!thumbnail) {
    thumbnail = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop';
  }
  
  const categoryLabel = detectCategory(news);

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="ปิด">
          <X size={20} />
        </button>

        {/* Hero image */}
        <div className="modal-hero">
          <img src={thumbnail} alt="" loading="lazy" draggable="false" />
          <div className="modal-hero-overlay"></div>
        </div>
        
        <div className="modal-body protected-content">
          {/* Header: Category + Translate button */}
          <div className="modal-top-bar">
            <span className="badge badge-cyan">{categoryLabel}</span>
            {isGlobalNews && !translatedTitle && (
              <button 
                className="translate-btn" 
                onClick={handleTranslate}
                disabled={isTranslating}
              >
                {isTranslating ? <Loader2 className="spin-icon" size={14} /> : <Languages size={14} />}
                {isTranslating ? 'กำลังแปล...' : '✨ ให้ AI ช่วยแปล'}
              </button>
            )}
            {translatedTitle && (
              <span className="badge badge-green">✅ แปลแล้ว</span>
            )}
          </div>

          {/* Title */}
          <h2 className="modal-title">{translatedTitle || news.title}</h2>
          
          {/* Meta */}
          <div className="modal-meta">
            <span className="meta-item">
              <Calendar size={14} /> {formattedDate}
            </span>
            <span className="meta-item">
              <User size={14} /> {news.author || news.source || 'ไม่ระบุผู้เขียน'}
            </span>
          </div>
          
          {/* Content */}
          <div 
            className="modal-article" 
            dangerouslySetInnerHTML={{ __html: translatedContent || news.content || news.description }} 
          />

          <div className="modal-notice">
            ⚠️ เนื้อหาด้านบนเป็นเพียงบทสรุปเบื้องต้น คลิกลิงก์ด้านล่างเพื่ออ่านฉบับเต็ม
          </div>
          
          <a href={news.link} target="_blank" rel="noopener noreferrer" className="modal-cta">
            อ่านข่าวฉบับเต็ม <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NewsDetailModal;
