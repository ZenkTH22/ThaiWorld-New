// Vercel Serverless Function: ดึง RSS ทุกแหล่งฝั่งเซิร์ฟเวอร์ แล้วให้ CDN แคชไว้ 5 นาที
// ผู้ชมทุกคนใช้ผลเดียวกัน จึงไม่ต้องพึ่งโควตา rss2json และไม่ยิงแหล่งข่าวซ้ำต่อผู้ชมแต่ละคน
// รูปแบบ item เหมือน rss2json (title, link, pubDate, description, content, thumbnail, enclosure, author, categories)
// ต่างกันที่ pubDate เป็น ISO 8601 มีโซนเวลา (UTC) เสมอ
import { XMLParser } from 'fast-xml-parser';
import { RSS_FEEDS } from '../src/config/feeds.js';

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@', textNodeName: '#text' });
const text = (v) => (v == null ? '' : typeof v === 'object' ? String(v['#text'] ?? '') : String(v)).trim();
const list = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]);

const toIso = (s) => {
  const d = new Date(text(s));
  return isNaN(d) ? null : d.toISOString();
};

const pickThumbnail = (it) => {
  const media = [...list(it['media:thumbnail']), ...list(it['media:content'])].find((m) => m?.['@url']);
  if (media) return media['@url'];
  const enc = list(it.enclosure).find((e) => /^image\//.test(e?.['@type'] || '') && e['@url']);
  return enc ? enc['@url'] : '';
};

const normalize = (it, source) => ({
  title: text(it.title),
  link: text(it.link),
  pubDate: toIso(it.pubDate || it['dc:date']),
  description: text(it.description),
  content: text(it['content:encoded']) || text(it.description),
  thumbnail: pickThumbnail(it),
  enclosure: {},
  author: text(it['dc:creator'] || it.author),
  source,
  categories: list(it.category).map(text).filter(Boolean),
});

const PER_FEED = 20;

async function fetchDirect(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ThaiWorldNews/1.0; +https://thai-world-new.vercel.app)' },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const channel = parser.parse(await res.text())?.rss?.channel;
  if (!channel) throw new Error('not RSS');
  const source = text(channel.title);
  return list(channel.item).map((it) => normalize(it, source));
}

// บางเว็บ (เช่น ประชาชาติ) บล็อกคำขอจากเซิร์ฟเวอร์ จึงสำรองผ่าน rss2json — เรียกแค่ครั้งละ 5 นาทีเพราะ CDN แคช
async function fetchViaRss2json(url) {
  const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(10000) });
  const j = await res.json();
  if (j.status !== 'ok') throw new Error(j.message || 'rss2json failed');
  return (j.items || []).map((it) => ({
    ...it,
    // rss2json ส่งเวลาเป็น UTC แบบไม่มีโซนเวลา ("2026-09-27 10:19:59")
    pubDate: toIso(String(it.pubDate || '').replace(' ', 'T') + 'Z'),
    source: j.feed?.title || '',
  }));
}

async function fetchFeed(url) {
  let items;
  try {
    items = await fetchDirect(url);
  } catch (e) {
    try { items = await fetchViaRss2json(url); }
    catch (e2) { throw new Error(`${e.message}; rss2json: ${e2.message}`, { cause: e2 }); }
  }
  return items.filter((n) => n.title && n.link)
    .map((n) => ({ ...n, content: n.content.slice(0, 5000), description: n.description.slice(0, 2000) }))
    .slice(0, PER_FEED);
}

async function fetchGroup(urls, errors) {
  const results = await Promise.allSettled(urls.map(fetchFeed));
  results.forEach((r, i) => r.status === 'rejected' && errors.push(`${urls[i]}: ${r.reason?.message || r.reason}`));
  return results
    .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
    .sort((a, b) => (b.pubDate || '').localeCompare(a.pubDate || ''));
}

export default async function handler(req, res) {
  const errors = [];
  const [thailand, global] = await Promise.all([fetchGroup(RSS_FEEDS.thailand, errors), fetchGroup(RSS_FEEDS.global, errors)]);
  if (!thailand.length && !global.length) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(502).json({ error: 'all feeds failed', errors });
  }
  // CDN แคช 5 นาที และส่งของเดิมระหว่างอัปเดต (ผู้ชมไม่ต้องรอ)
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  res.status(200).json({ updated: new Date().toISOString(), thailand, global, errors });
}
