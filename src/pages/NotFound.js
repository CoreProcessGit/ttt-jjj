import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/legal.css';

const NotFound = () => {
  return (
    <div className="legal-page">
      <div className="legal-content" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h1 style={{ fontSize: '72px', margin: '0 0 16px', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '24px', margin: '0 0 16px', border: 'none', padding: 0 }}>Page Not Found</h2>
        <p style={{ color: '#5E6C84', marginBottom: '32px' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        {/* <p style={{ color: '#5E6C84', marginBottom: '32px' }}>
          찾으시는 페이지가 존재하지 않거나 이동되었습니다.
        </p> */}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: '#0052CC',
              color: '#FFFFFF',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 500,
            }}
          >
            Go to Home
          </Link>
          <Link
            to="/support"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: '#F4F5F7',
              color: '#172B4D',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 500,
            }}
          >
            Support
          </Link>
        </div>

        <div style={{ marginTop: '32px', fontSize: '14px', color: '#6B778C' }}>
          <p>You may also be looking for:</p>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '12px' }}>
            <li><Link to="/support">Support</Link></li>
            <li><Link to="/support/guide">User Guide</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
            <li><Link to="/sla">Service Level Agreement</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
