// แปลงเวลาข่าวเป็น Date
// - ISO มีโซนเวลา (จาก /api/news) ใช้ได้ตรงๆ
// - "YYYY-MM-DD HH:mm:ss" (จาก rss2json) เป็นเวลา UTC ที่ไม่มีโซน: ต้องเติม "Z"
//   ไม่งั้นเบราว์เซอร์ตีเป็นเวลาท้องถิ่น ข่าวจะคลาดไป 7 ชม. และ Safari/iOS อ่านไม่ได้เลย
export const parseDate = (dateString) => {
  if (!dateString) return null;
  const s = String(dateString).trim();
  const date = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/.test(s) ? new Date(s.replace(' ', 'T') + 'Z') : new Date(s);
  return isNaN(date) ? null : date;
};

export const formatDate = (dateString, options = {}) => {
  const date = parseDate(dateString);
  if (!date) return 'ไม่ทราบเวลา';
  return date.toLocaleString('th-TH', options);
};
