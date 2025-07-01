import React from 'react';
import './Header.css';

// PUBLIC_INTERFACE
const Header = () => {
  /**
   * Header component with application branding
   * Simple header without authentication features
   */
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="logo">TaskVerse</h1>
        </div>
        
        <div className="header-right">
          <p className="header-subtitle">Task Management Board</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
