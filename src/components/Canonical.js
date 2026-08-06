import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SITE_URL,
  DEFAULT_LANG,
  langFromPath,
  pathForLang,
  isLocalizedPath,
} from '../lib/langPath';

const ALTERNATE_ATTR = 'data-hreflang-managed';

const Canonical = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    const lang = langFromPath(path);

    document.documentElement.lang = lang;

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', SITE_URL + path);

    document
      .querySelectorAll(`link[${ALTERNATE_ATTR}]`)
      .forEach((el) => el.remove());

    if (!isLocalizedPath(path)) return;

    const enHref = SITE_URL + pathForLang(path, DEFAULT_LANG);
    const koHref = SITE_URL + pathForLang(path, 'ko');

    [
      ['en', enHref],
      ['ko', koHref],
      ['x-default', enHref],
    ].forEach(([hreflang, href]) => {
      const alt = document.createElement('link');
      alt.setAttribute('rel', 'alternate');
      alt.setAttribute('hreflang', hreflang);
      alt.setAttribute('href', href);
      alt.setAttribute(ALTERNATE_ATTR, '');
      document.head.appendChild(alt);
    });
  }, [pathname]);

  return null;
};

export default Canonical;
