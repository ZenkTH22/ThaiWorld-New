import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import NewsDetailModal from './src/components/NewsDetailModal.jsx';

const mockNews = {
  title: "อาคาร 9 ชั้นถล่มกลางเมืองฟิลิปปินส์",
  pubDate: "2026-05-24 02:41:53",
  link: "https://www.thairath.co.th/news/foreign/2934895",
  content: "Test content",
  description: "Test description"
};

try {
  const html = renderToString(createElement(NewsDetailModal, { news: mockNews, onClose: () => {} }));
  console.log("Rendered successfully:", html.length > 0);
} catch (e) {
  console.error("Crash during render:", e);
}
