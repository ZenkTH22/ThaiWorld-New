import React from 'react';
import { Globe } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header glass-panel">
      <div className="header-content">
        <div className="logo">
          <Globe className="logo-icon" size={32} />
          <h1>กระดานข่าวสาร<span>โลก</span></h1>
        </div>
        <div className="live-status">
          <span className="pulse-dot"></span>
          <span className="live-text">ข่าวสารอัปเดตแบบเรียลไทม์</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
