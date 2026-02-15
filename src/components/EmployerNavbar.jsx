import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpeg'; // ✅ Make sure this path is correct

const EmployerNavbar = ({ activeTab, setActiveTab, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { id: 'jobs', label: 'My Jobs' },
    { id: 'applications', label: 'Applications' },
    { id: 'search', label: 'Search Candidates' },
    { id: 'saved', label: 'Saved' },
    { id: 'profile', label: 'Company Profile' },
  ];

  return (
    <nav className="navbar navbar-light bg-white shadow-sm sticky-top" style={{ zIndex: 1050 }}>
      <div className="container-fluid px-3 px-md-4 position-relative">
        
        {/* ✅ LOGO + BRAND NAME (Clickable Wrapper) */}
        <div 
          className="d-flex align-items-center gap-2" 
          onClick={() => setActiveTab('jobs')}
          style={{ cursor: 'pointer' }}
        >
          {/* Logo Image */}
          <img 
            src={logo} 
            alt="Curson Logo" 
            className="rounded-circle"
            style={{ width: '42px', height: '42px', objectFit: 'contain' }} 
          />
          
          {/* Brand Name */}
         
        </div>

        {/* Desktop Navigation - Right Side */}
        <div className="d-none d-lg-flex align-items-center gap-2 ms-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`btn btn-link nav-link text-decoration-none px-3 py-2 rounded-pill ${
                activeTab === item.id ? 'bg-primary text-white fw-semibold' : 'text-secondary'
              }`}
              onClick={() => setActiveTab(item.id)}
              style={{ 
                transition: 'all 0.2s ease',
                border: 'none',
                fontSize: '0.9rem'
              }}
            >
              {item.label}
            </button>
          ))}
          <button 
            className="btn btn-warning px-3 fw-bold rounded-pill ms-2" 
            onClick={() => navigate('/employer/pricing')}
            style={{ fontSize: '0.9rem' }}
          >
            Upgrade
          </button>
          <button 
            className="btn btn-outline-secondary rounded-pill px-3" 
            onClick={handleLogout}
            style={{ fontSize: '0.9rem' }}
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="navbar-toggler border-0 d-lg-none ms-auto p-2" 
          type="button" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ outline: 'none', boxShadow: 'none' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Mobile Dropdown Menu (Floats Right) */}
        {isMenuOpen && (
          <>
            {/* Transparent Backdrop to close menu on click outside */}
            <div 
              style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 1040,
                background: 'transparent'
              }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* The Actual Dropdown Box */}
            <div 
              className="bg-white border rounded shadow-lg p-3 d-lg-none"
              style={{
                position: 'absolute',
                top: '100%', // Just below the navbar
                right: '15px', // Align to right edge
                width: '260px', // Fixed compact width
                zIndex: 1050,
                marginTop: '10px'
              }}
            >
              <div className="d-flex flex-column gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    className={`btn w-100 text-start rounded-3 px-3 ${
                      activeTab === item.id 
                        ? 'bg-primary text-white fw-semibold' 
                        : 'btn-light text-secondary bg-white border-0 hover-bg-light'
                    }`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMenuOpen(false);
                    }}
                    style={{ fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                  >
                    {item.label}
                  </button>
                ))}
                
                <hr className="my-2 opacity-25" />
                
                <button 
                  className="btn btn-warning w-100 rounded-3 fw-bold" 
                  onClick={() => {
                    navigate('/employer/pricing');
                    setIsMenuOpen(false);
                  }}
                >
                  Upgrade Plan
                </button>
                <button 
                  className="btn btn-outline-danger w-100 rounded-3" 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default EmployerNavbar;