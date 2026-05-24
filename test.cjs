const https = require('https');
const urls = [
  'https://rssfeeds.sanook.com/rss/feature/news/',
  'https://www.thairath.co.th/rss/news',
  'http://feeds.bbci.co.uk/news/world/rss.xml',
  'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'
];

urls.forEach(url => {
  https.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const json = JSON.parse(data);
      if (json.items && json.items.length > 0) {
        const item = json.items[0];
        console.log(`[${url}] Content len: ${item.content?.length || 0}, Desc len: ${item.description?.length || 0}`);
      } else {
        console.log(`[${url}] Failed to get items.`);
      }
    });
  });
});
