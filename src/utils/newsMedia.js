// รูปและข้อความของข่าว ใช้ร่วมกันระหว่างการ์ดข่าวและหน้าต่างรายละเอียด

// รูปสำรองแบบฝังในโค้ด (ไม่พึ่งเว็บอื่น) ใช้เมื่อข่าวไม่มีรูป หรือเว็บต้นทางไม่อนุญาตให้แสดงรูปข้ามเว็บ
// เช่น The Standard ตั้ง Cross-Origin-Resource-Policy: same-origin เบราว์เซอร์จึงไม่แสดงรูปของเขาบนเว็บเรา
export const FALLBACK_IMAGE = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">' +
  '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset="1" stop-color="#0f172a"/></linearGradient></defs>' +
  '<rect width="400" height="225" fill="url(#g)"/>' +
  '<g fill="none" stroke="#6366f1" stroke-width="6" stroke-linejoin="round" opacity=".7" transform="translate(164 76)">' +
  '<rect x="0" y="0" width="60" height="72" rx="6"/><path d="M60 16h12v48a8 8 0 0 1-8 8H60"/><path d="M12 16h36M12 32h36M12 48h24"/></g></svg>'
)}`;

const firstImgSrc = (html) => (html || '').match(/<img[^>]+src="([^">]+)"/)?.[1];

export const getThumbnail = (news) =>
  news.thumbnail || news.enclosure?.link || firstImgSrc(news.content) || firstImgSrc(news.description) || FALLBACK_IMAGE;

// รูปโหลดไม่ขึ้น (ถูกบล็อก / ลิงก์เสีย) → เปลี่ยนเป็นรูปสำรองครั้งเดียว กันวนซ้ำ
export const showFallbackImage = (e) => {
  const img = e.currentTarget;
  if (img.dataset.fallback) return;
  img.dataset.fallback = '1';
  img.src = FALLBACK_IMAGE;
};

// ตัดแท็ก HTML และแปลง entity เช่น "[&#8230;]" → "[…]"
export const toPlainText = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
};
