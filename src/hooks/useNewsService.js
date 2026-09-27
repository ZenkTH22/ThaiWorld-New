import { useState, useEffect, useCallback } from 'react';
import { RSS_FEEDS } from '../config/feeds';
import { parseDate } from '../utils/dateFormatter';

// ข่าวมาจาก /api/news (Vercel ดึงฝั่งเซิร์ฟเวอร์ + CDN แคช 5 นาที ผู้ชมทุกคนใช้ผลเดียวกัน)
// อัปเดตถี่กว่า 5 นาทีไม่ได้ข่าวใหม่ขึ้น เพราะเซิร์ฟเวอร์แคชไว้
const REFRESH_MS = 5 * 60 * 1000;

const byNewest = (a, b) => (parseDate(b.pubDate)?.getTime() || 0) - (parseDate(a.pubDate)?.getTime() || 0);

// สำรองเมื่อ /api/news ใช้ไม่ได้ (เช่นตอนรัน `npm run dev` ในเครื่อง): ดึงผ่าน rss2json ตรง โดยไม่ทำลายแคชของเขา
const fetchRss2json = async (url) => {
  const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
  const data = await res.json();
  return data.status === 'ok' ? data.items || [] : [];
};
const fetchFallback = async () => {
  const group = async (urls) => (await Promise.allSettled(urls.map(fetchRss2json)))
    .flatMap((r) => (r.status === 'fulfilled' ? r.value : [])).sort(byNewest);
  const [thailand, global] = await Promise.all([group(RSS_FEEDS.thailand), group(RSS_FEEDS.global)]);
  if (!thailand.length && !global.length) throw new Error('fallback empty');
  return { thailand, global };
};

export const useNewsService = () => {
  const [thaiNews, setThaiNews] = useState([]);
  const [globalNews, setGlobalNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const loadNews = useCallback(async () => {
    setLoading(true);
    try {
      let data;
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data = await res.json();
      } catch (apiErr) {
        console.warn('/api/news ใช้ไม่ได้ — ใช้ rss2json แทน:', apiErr);
        data = await fetchFallback();
      }
      setThaiNews([...data.thailand].sort(byNewest));
      setGlobalNews([...data.global].sort(byNewest));
      setLastUpdated(data.updated ? new Date(data.updated) : new Date());
      setError(null);
    } catch (e) {
      // โหลดไม่ได้: เก็บข่าวชุดเดิมไว้ ไม่ล้างหน้าจอ แล้วแจ้งผู้ใช้
      console.error('Failed to load news:', e);
      setError('โหลดข่าวไม่สำเร็จ กำลังลองใหม่อัตโนมัติ');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadNews();
    const interval = setInterval(loadNews, REFRESH_MS);
    return () => clearInterval(interval);
  }, [loadNews]);

  return { thaiNews, globalNews, loading, error, lastUpdated, refresh: loadNews };
};
