// ============================================
// 🛡️ World-Class Anti-Scraping Protection System
// ============================================

// 1. Disable right-click context menu
const disableRightClick = () => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showProtectionToast('🛡️ เนื้อหานี้ได้รับการคุ้มครองลิขสิทธิ์');
    return false;
  });
};

// 2. Disable keyboard shortcuts (Ctrl+U, Ctrl+S, Ctrl+Shift+I, F12)
const disableKeyboardShortcuts = () => {
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      showProtectionToast('🛡️ การดูซอร์สโค้ดถูกปิดกั้น');
      return false;
    }
    // Ctrl+S (Save)
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      return false;
    }
  });
};

// 3. Disable text selection on protected content
const disableTextSelection = () => {
  const style = document.createElement('style');
  style.textContent = `
    .protected-content,
    .news-card,
    .modal-text,
    .news-title,
    .news-summary,
    .modal-title {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }
  `;
  document.head.appendChild(style);
};

// 4. Disable drag on images
const disableImageDrag = () => {
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });
};

// 5. Disable copy/paste on content
const disableCopy = () => {
  document.addEventListener('copy', (e) => {
    const selection = document.getSelection();
    const activeEl = document.activeElement;
    // Allow copy in search inputs
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
      return;
    }
    e.preventDefault();
    e.clipboardData.setData('text/plain', '⚠️ เนื้อหานี้ได้รับการคุ้มครองลิขสิทธิ์ — กระดานข่าวสารโลก');
    showProtectionToast('🛡️ ไม่สามารถคัดลอกเนื้อหาได้');
  });
};

// 6. Console warning
const consoleWarning = () => {
  const warningStyle = 'color: red; font-size: 24px; font-weight: bold;';
  const infoStyle = 'color: #333; font-size: 14px;';
  console.log('%c⚠️ หยุด!', warningStyle);
  console.log('%cนี่คือฟีเจอร์ของเบราว์เซอร์สำหรับนักพัฒนาเท่านั้น', infoStyle);
  console.log('%cหากมีใครบอกให้คุณคัดลอกโค้ดมาวางที่นี่ นั่นคือการหลอกลวง', infoStyle);
  console.log('%c🛡️ ระบบป้องกันการดูดเว็บกำลังทำงานอยู่', 'color: green; font-size: 14px; font-weight: bold;');
};

// 7. DevTools detection
const detectDevTools = () => {
  let devToolsOpen = false;
  const threshold = 160;
  
  const check = () => {
    const widthDiff = window.outerWidth - window.innerWidth > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;
    
    if ((widthDiff || heightDiff) && !devToolsOpen) {
      devToolsOpen = true;
      showProtectionToast('🔍 ตรวจพบ DevTools — ระบบป้องกันกำลังทำงาน');
    } else if (!widthDiff && !heightDiff) {
      devToolsOpen = false;
    }
  };
  
  setInterval(check, 1000);
};

// 8. Invisible watermark on content
const addWatermark = () => {
  const style = document.createElement('style');
  style.textContent = `
    .dashboard::after {
      content: '${btoa('ThaiWorldNews-Protected-' + Date.now())}';
      position: fixed;
      bottom: 0;
      right: 0;
      font-size: 1px;
      color: transparent;
      pointer-events: none;
      z-index: -1;
    }
  `;
  document.head.appendChild(style);
};

// 9. Protection toast notification
let toastTimeout = null;
const showProtectionToast = (message) => {
  // Remove existing toast
  const existing = document.getElementById('protection-toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.id = 'protection-toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: linear-gradient(135deg, rgba(139, 0, 0, 0.95), rgba(180, 0, 60, 0.95));
    color: white;
    padding: 14px 28px;
    border-radius: 12px;
    font-family: 'Prompt', sans-serif;
    font-size: 14px;
    font-weight: 500;
    z-index: 99999;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  `;
  document.body.appendChild(toast);
  
  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  
  // Animate out
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
};

// 10. Honeypot trap — hidden links that bots will follow
const createHoneypot = () => {
  const honeypot = document.createElement('a');
  honeypot.href = '/trap';
  honeypot.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;overflow:hidden;';
  honeypot.textContent = 'Do not click';
  honeypot.setAttribute('aria-hidden', 'true');
  honeypot.setAttribute('tabindex', '-1');
  document.body.appendChild(honeypot);
};

// 🚀 Initialize all protections
export const initAntiScrape = () => {
  disableRightClick();
  disableKeyboardShortcuts();
  disableTextSelection();
  disableImageDrag();
  disableCopy();
  consoleWarning();
  detectDevTools();
  addWatermark();
  createHoneypot();
  
  console.log('%c🛡️ Anti-Scrape System v2.0 — Active', 'color: #00ff88; font-size: 12px; font-weight: bold;');
};
