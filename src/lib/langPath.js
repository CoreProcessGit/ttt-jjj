export const KO_PREFIX = '/ko';
export const SITE_URL = 'https://info.t-cafe.com';
export const DEFAULT_LANG = 'en';

const GUIDE_PATH_RE = /^\/support\/guide(\/|$)/;

export const langFromPath = (pathname) =>
  pathname === KO_PREFIX || pathname.startsWith(`${KO_PREFIX}/`) ? 'ko' : DEFAULT_LANG;

export const stripLangPrefix = (pathname) =>
  langFromPath(pathname) === 'ko' ? pathname.slice(KO_PREFIX.length) || '/' : pathname;

export const pathForLang = (pathname, target) => {
  const base = stripLangPrefix(pathname);
  return target === 'ko' ? `${KO_PREFIX}${base}` : base;
};

export const isLocalizedPath = (pathname) => GUIDE_PATH_RE.test(stripLangPrefix(pathname));
