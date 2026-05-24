const https = require('https');
const url = 'https://www.thairath.co.th/rss/news';
https.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    if (json.items && json.items.length > 0) {
      console.log(JSON.stringify(json.items[0], null, 2));
    }
  });
});
