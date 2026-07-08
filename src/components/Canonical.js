import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://info.t-cafe.com';

const Canonical = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    const href = SITE_URL + path;

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }, [pathname]);

  return null;
};

export default Canonical;
