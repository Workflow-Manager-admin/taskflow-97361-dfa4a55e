import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

// PUBLIC_INTERFACE
const Header = ({ user }) => {
  /**
   * Header component with user menu and logout functionality
   * @param {Object} user - Current user object
   */
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="logo">TaskVerse</h1>
        </div>
        
        <div className="header-right">
          <div className="user-menu">
            <button
              className="user-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
            >
              <div className="user-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user?.name}</span>
              <svg 
                className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}
                width="12" 
                height="12" 
                viewBox="0 0 12 12"
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>
            
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item user-info">
                  <div className="user-details">
                    <p className="user-name-full">{user?.name}</p>
                    <p className="user-email">{user?.email}</p>
                  </div>
                </div>
                <hr className="dropdown-divider" />
                <button className="dropdown-item dropdown-button" onClick={handleLogout}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2H4V3h4a1 1 0 0 0 0-2H3zm9.707 4.293a1 1 0 0 0-1.414 1.414L12.586 8H6a1 1 0 0 0 0 2h6.586l-1.293 1.293a1 1 0 0 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414l-3-3z"/>
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
