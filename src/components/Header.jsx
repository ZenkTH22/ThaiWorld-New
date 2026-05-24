import React from 'react';
import { Globe, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const CATEGORIES = ['ทั้งหมด', 'การเมือง', 'เศรษฐกิจ', 'ต่างประเทศ', 'เทคโนโลยี', 'กีฬา', 'บันเทิง'];

const Header = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
  return (
    <header className="app-header glass-panel">
      <div className="header-top">
        <div className="logo">
          <Globe className="logo-icon" size={32} />
          <h1>กระดานข่าวสาร<span>โลก</span></h1>
        </div>
        
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="ค้นหาข่าวสาร..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
              {cat}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
