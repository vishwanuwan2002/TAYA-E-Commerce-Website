import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>ABOUT US</h4>
            <p>We are a company dedicated to providing the best services.</p>
          </div>
          <div className="footer-section">
            <h4>CONTACT</h4>
            <p>Email: info@example.com</p>
            <p>Phone: +94 71 795 3103</p>
          </div>
          <div className="footer-section">
            <h4>FOLLOW US</h4>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Taya Clothing Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
