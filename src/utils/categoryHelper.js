const CATEGORY_KEYWORDS = {
  'การเมือง': ['นายก', 'ส.ส.', 'รัฐสภา', 'เลือกตั้ง', 'พรรค', 'รัฐบาล', 'ทักษิณ', 'พิธา', 'ก้าวไกล', 'เพื่อไทย', 'ประท้วง', 'กฎหมาย', 'ศาล', 'president', 'minister', 'parliament', 'election', 'politics', 'government'],
  'เศรษฐกิจ': ['หุ้น', 'เศรษฐกิจ', 'ธนาคาร', 'ดอกเบี้ย', 'เงินเฟ้อ', 'ลงทุน', 'ธุรกิจ', 'ตลาด', 'ราคาทอง', 'ราคาน้ำมัน', 'บาท', 'ดอลลาร์', 'economy', 'business', 'market', 'bank', 'finance', 'invest'],
  'ต่างประเทศ': ['ต่างประเทศ', 'โลก', 'สงคราม', 'สหรัฐ', 'จีน', 'รัสเซีย', 'ยูเครน', 'อิสราเอล', 'ต่างชาติ', 'world', 'global', 'international', 'foreign'],
  'เทคโนโลยี': ['ไอที', 'เทคโนโลยี', 'มือถือ', 'แอป', 'สมาร์ทโฟน', 'AI', 'ปัญญาประดิษฐ์', 'Apple', 'Google', 'Microsoft', 'ซอฟต์แวร์', 'tech', 'software', 'hardware', 'cyber'],
  'กีฬา': ['กีฬา', 'ฟุตบอล', 'พรีเมียร์ลีก', 'แชมป์', 'โอลิมปิก', 'นักเตะ', 'แมนยู', 'ลิเวอร์พูล', 'โค้ช', 'sport', 'football', 'soccer', 'tennis', 'olympic', 'match'],
  'บันเทิง': ['ดารา', 'ละคร', 'นักร้อง', 'ศิลปิน', 'ภาพยนตร์', 'ซีรีส์', 'คอนเสิร์ต', 'หนัง', 'เพลง', 'บันเทิง', 'movie', 'star', 'music', 'entertainment', 'hollywood']
};

export const detectCategory = (news) => {
  // If the RSS already provides meaningful categories, try to map them first
  if (news.categories && news.categories.length > 0) {
    const rssCat = news.categories[0].toLowerCase();
    for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      if (keywords.some(k => rssCat.includes(k.toLowerCase()))) {
        return cat;
      }
    }
  }

  // Otherwise, search for keywords in title and description
  const textToSearch = `${news.title} ${news.description || ''} ${news.content || ''}`.toLowerCase();
  
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => textToSearch.includes(k.toLowerCase()))) {
      return cat;
    }
  }

  return 'ข่าวทั่วไป'; // Default if no keywords match
};
