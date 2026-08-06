import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGE_META } from '../lib/pageMeta';
import { SITE_URL, langFromPath, stripLangPrefix, isLocalizedPath } from '../lib/langPath';
import {
  guideMap,
  getGuideMetaTitle,
  getGuideMetaDescription,
  DEFAULT_GUIDE_SLUG,
} from '../pages/guide/guidesIndex';

const upsert = (selector, create, content) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setNamed = (name, content) =>
  upsert(`meta[name="${name}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('name', name);
    return el;
  }, content);

const setProperty = (property, content) =>
  upsert(`meta[property="${property}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('property', property);
    return el;
  }, content);

const resolveGuideMeta = (path) => {
  if (!isLocalizedPath(path)) return null;
  const base = stripLangPrefix(path);
  const slug = base.replace(/^\/support\/guide\/?/, '') || DEFAULT_GUIDE_SLUG;
  if (!guideMap[slug]) return null;
  const lang = langFromPath(path);
  return {
    title: getGuideMetaTitle(slug, lang),
    description: getGuideMetaDescription(slug, lang),
  };
};

const PageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    const meta = PAGE_META[path] || resolveGuideMeta(path);
    if (!meta) return;

    document.title = meta.title;
    setNamed('description', meta.description);
    setProperty('og:title', meta.title);
    setProperty('og:description', meta.description);
    setProperty('og:url', SITE_URL + path);
    setNamed('twitter:title', meta.title);
    setNamed('twitter:description', meta.description);
  }, [pathname]);

  return null;
};

export default PageMeta;
