import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  guideCategories,
  guideMap,
  getGuideMetaTitle,
  getGuideMetaDescription,
  DEFAULT_GUIDE_SLUG,
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  LAYOUT_TEXT,
} from './guidesIndex';
import '../../styles/guide.css';

const LANG_STORAGE_KEY = 'guideLang';

const readInitialLang = (search) => {
  try {
    const params = new URLSearchParams(search);
    const urlLang = params.get('lang');
    if (urlLang && SUPPORTED_LANGS.includes(urlLang)) return urlLang;
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(LANG_STORAGE_KEY) : null;
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  } catch (e) { /* ignore */ }
  return DEFAULT_LANG;
};

const GuideLayout = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const slug = params.slug || DEFAULT_GUIDE_SLUG;
  const guide = guideMap[slug];
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [lang, setLang] = useState(() => readInitialLang(location.search));

  useEffect(() => {
    setSidebarCollapsed(true);
  }, [location.pathname]);

  useEffect(() => {
    document.title = getGuideMetaTitle(slug, lang);

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', getGuideMetaDescription(slug, lang));
  }, [slug, lang]);

  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    if (!sp.get('lang')) {
      sp.set('lang', lang);
      navigate({ pathname: location.pathname, search: `?${sp.toString()}` }, { replace: true });
    }
  }, []);

  const switchLang = useCallback((next) => {
    if (!SUPPORTED_LANGS.includes(next) || next === lang) return;
    setLang(next);
    try { window.localStorage.setItem(LANG_STORAGE_KEY, next); } catch (e) { }
    const sp = new URLSearchParams(location.search);
    sp.set('lang', next);
    navigate({ pathname: location.pathname, search: `?${sp.toString()}` }, { replace: true });
  }, [lang, location.pathname, location.search, navigate]);

  const t = (key) => (LAYOUT_TEXT[key] && LAYOUT_TEXT[key][lang]) || (LAYOUT_TEXT[key] && LAYOUT_TEXT[key][DEFAULT_LANG]) || key;
  const pickTitle = (titles) => (titles && titles[lang]) || (titles && titles[DEFAULT_LANG]) || '';

  const Content = guide && guide.components
    ? (guide.components[lang] || guide.components[DEFAULT_LANG])
    : null;

  const buildLink = (s) => {
    const params = new URLSearchParams(location.search);
    params.set('lang', lang);
    return `/support/guide/${s}?${params.toString()}`;
  };

  return (
    <div className="guide-page">
      <button
        type="button"
        className="guide-sidebar-toggle"
        onClick={() => setSidebarCollapsed((prev) => !prev)}
        aria-expanded={!sidebarCollapsed}
      >
        {sidebarCollapsed ? t('showToc') : t('hideToc')}
      </button>

      <aside className={`guide-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="guide-sidebar-header">
          <h2>{t('sidebarTitle')}</h2>
          <p>{t('sidebarSubtitle')}</p>
          {/* 
          <div className="guide-lang-toggle" role="group" aria-label="Language">
            <button
              type="button"
              className={`guide-lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => switchLang('en')}
              aria-pressed={lang === 'en'}
            >
              {t('langEn')}
            </button>
            <button
              type="button"
              className={`guide-lang-btn ${lang === 'ko' ? 'active' : ''}`}
              onClick={() => switchLang('ko')}
              aria-pressed={lang === 'ko'}
            >
              {t('langKo')}
            </button>
          </div>
          */}
        </div>

        {guideCategories.map((category) => (
          <div key={pickTitle(category.titles)} className="guide-sidebar-category">
            <div className="guide-sidebar-category-title">{pickTitle(category.titles)}</div>
            {category.items.map((item) => (
              <Link
                key={item.slug}
                to={buildLink(item.slug)}
                className={`guide-sidebar-link ${item.slug === slug ? 'active' : ''}`}
              >
                {pickTitle(item.titles)}
              </Link>
            ))}
          </div>
        ))}
      </aside>

      <div className="guide-content-wrap">
        {Content ? (
          Content
        ) : (
          <div className="guide-not-found">
            <h2>{t('notFoundTitle')}</h2>
            <p>{t('notFoundBody')}</p>
            <p>
              <Link to={buildLink(DEFAULT_GUIDE_SLUG)}>{t('goToStart')}</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideLayout;
