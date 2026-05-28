import React from 'react';
import { Link } from 'react-router-dom';
import archiveLogoWhite from '../assets/logo-archive-white.svg';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={archiveLogoWhite} alt="T-CAFE archive" height={36} />
        </div>
        <div className="footer-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
          <Link to="/dpa">DPA</Link>
          <Link to="/sla">SLA</Link>
          <Link to="/sub-processors">Sub-processors</Link>
          <Link to="/security-policy">Security</Link>
          <Link to="/support">Support</Link>
          <a href="mailto:contact@coreprocess.co.kr">Contact</a>
        </div>
        <div className="footer-copyright">
          <p>&copy; 2026 COREPROCESS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
