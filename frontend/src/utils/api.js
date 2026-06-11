export function createApiUrl(apiBase) {
  const base = apiBase ? String(apiBase) : '';
  return function apiUrl(path) {
    const p = String(path || '');
    if (!base) return p;
    if (base.endsWith('/') && p.startsWith('/')) return base.slice(0, -1) + p;
    if (!base.endsWith('/') && !p.startsWith('/')) return base + '/' + p;
    return base + p;
  };
}

export async function fetchJson(url, options) {
  let res;
  try {
    res = await fetch(url, options);
  } catch (e) {
    return { res: null, data: { code: -1, msg: '网络异常，请检查网络连接' } };
  }
  let data = null;
  try {
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      data = { code: res.status, msg: text || res.statusText };
    }
  } catch (e) {
    data = { code: res.status, msg: res.statusText || '响应解析失败' };
  }
  return { res, data };
}

