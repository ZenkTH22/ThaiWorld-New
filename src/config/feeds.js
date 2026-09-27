// แหล่งข่าว RSS — ใช้ร่วมกันทั้งฝั่งเซิร์ฟเวอร์ (api/news.js) และฝั่งเว็บ (สำรองผ่าน rss2json)
export const RSS_FEEDS = {
  thailand: [
    'https://www.thairath.co.th/rss/news',
    'https://thestandard.co/feed/',
    'https://www.prachachat.net/feed/'
  ],
  global: [
    'https://feeds.bbci.co.uk/news/world/rss.xml',
    'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'
  ]
};
