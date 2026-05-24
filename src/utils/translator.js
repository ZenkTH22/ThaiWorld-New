// Free public translation API (Google Translate API via proxy pattern)
// Use for client-side translation without API Key limitations

export const translateText = async (text, targetLang = 'th', sourceLang = 'auto') => {
  if (!text) return '';
  
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // The API returns an array of translated segments. We join them.
    let translatedText = '';
    if (data && data[0]) {
      data[0].forEach(segment => {
        if (segment[0]) translatedText += segment[0];
      });
    }
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text if translation fails
  }
};
