import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import DOMPurify from 'dompurify';
import { X, ExternalLink, Calendar, Languages, Loader2, User, ArrowRight } from 'lucide-react';
import { translateText } from '../utils/translator';
import { formatDate } from '../utils/dateFormatter';
import { detectCategory } from '../utils/categoryHelper';
import { getThumbnail, showFallbackImage } from '../utils/newsMedia';
import './NewsDetailModal.css';

const NewsDetailModal = ({ news, onClose }) => {
  const [translatedTitle, setTranslatedTitle] = useState(null);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const articleRef = useRef(null);

  // รูปในเนื้อข่าวที่เว็บต้นทางไม่ให้แสดงข้ามเว็บ → ซ่อนไป แทนที่จะโชว์ไอคอนรูปแตก
  useEffect(() => {
    articleRef.current?.querySelectorAll('img').forEach((img) => { img.onerror = () => img.remove(); });
  });

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
  const thumbnail = getThumbnail(news);

  const categoryLabel = detectCategory(news);

  // เนื้อหามาจาก RSS ของเว็บอื่น (และจากตัวแปลภาษา) — กรองสคริปต์/event handler ก่อนแสดงเสมอ
  const articleHtml = DOMPurify.sanitize(translatedContent || news.content || news.description || '', {
    FORBID_TAGS: ['style', 'form', 'input', 'button', 'iframe'],
  });
  const safeLink = /^https?:\/\//i.test(news.link || '') ? news.link : null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="ปิด">
          <X size={20} />
        </button>

        {/* Hero image */}
        <div className="modal-hero">
          <img src={thumbnail} alt="" loading="lazy" draggable="false" onError={showFallbackImage} />
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
            ref={articleRef}
            dangerouslySetInnerHTML={{ __html: articleHtml }}
          />

          <div className="modal-notice">
            ⚠️ เนื้อหาด้านบนเป็นเพียงบทสรุปเบื้องต้น คลิกลิงก์ด้านล่างเพื่ออ่านฉบับเต็ม
          </div>

          {safeLink && (
            <a href={safeLink} target="_blank" rel="noopener noreferrer" className="modal-cta">
              อ่านข่าวฉบับเต็ม <ArrowRight size={16} />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NewsDetailModal;
