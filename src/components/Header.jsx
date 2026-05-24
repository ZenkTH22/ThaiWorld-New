import React from 'react';
import { Globe, Search, Shield } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const CATEGORIES = ['ทั้งหมด', 'การเมือง', 'เศรษฐกิจ', 'ต่างประเทศ', 'เทคโนโลยี', 'กีฬา', 'บันเทิง'];

const CATEGORY_ICONS = {
  'ทั้งหมด': '📰',
  'การเมือง': '🏛️',
  'เศรษฐกิจ': '📈',
  'ต่างประเทศ': '🌍',
  'เทคโนโลยี': '💻',
  'กีฬา': '⚽',
  'บันเทิง': '🎬'
};

const Header = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-top">
          <div className="logo">
            <div className="logo-icon-wrapper">
              <Globe className="logo-icon" size={24} />
            </div>
            <div className="logo-text">
              <h1>กระดานข่าวสาร<span className="text-gradient">โลก</span></h1>
              <div className="logo-subtitle">
                <span className="live-dot"></span>
                <span>ข่าวสดตลอด 24 ชั่วโมง</span>
              </div>
            </div>
          </div>
          
          <div className="header-actions">
            <div className="search-bar">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="ค้นหาข่าวสาร..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="shield-badge" title="ระบบป้องกันการดูดเว็บ">
              <Shield size={16} />
            </div>
            <ThemeToggle />
          </div>
        </div>

        <div className="header-bottom">
          <nav className="categories-nav">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span className="cat-icon">{CATEGORY_ICONS[cat]}</span>
                {cat}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
