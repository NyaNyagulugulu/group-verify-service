const STORAGE_KEY = 'admin_access_token';

/**
 * 简单的编码/解码，仅避免 token 以明文形式直接暴露在 sessionStorage 中。
 * 注意：这不是加密，不提供真正的安全防护，任何人都可以通过 DevTools 还原。
 */
function obfuscate(value) {
  if (!value) return '';
  try {
    return btoa(encodeURIComponent(value).split('').reverse().join(''));
  } catch (e) {
    return value;
  }
}

function deobfuscate(encoded) {
  if (!encoded) return '';
  try {
    return decodeURIComponent(atob(encoded).split('').reverse().join(''));
  } catch (e) {
    return '';
  }
}

export function getStorageItem(key) {
  try {
    return sessionStorage.getItem(key) || '';
  } catch (e) {
    return '';
  }
}

export function setStorageItem(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {}
}

export function removeStorageItem(key) {
  try {
    sessionStorage.removeItem(key);
  } catch (e) {}
}

export const ADMIN_TOKEN_KEY = STORAGE_KEY;

export function getAdminToken() {
  const raw = getStorageItem(ADMIN_TOKEN_KEY);
  return deobfuscate(raw);
}

export function setAdminToken(value) {
  const v = value ? String(value) : '';
  setStorageItem(ADMIN_TOKEN_KEY, obfuscate(v));
}

export function clearAdminToken() {
  removeStorageItem(ADMIN_TOKEN_KEY);
}
