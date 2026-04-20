// ══════════════════════════════════════
// API Client - tutte le chiamate al server
// ══════════════════════════════════════

const BASE = '/api';

// Token di sessione admin (persiste nella tab corrente)
let adminToken = sessionStorage.getItem('adminToken') || null;

export function setAdminToken(token) {
  adminToken = token;
  if (token) sessionStorage.setItem('adminToken', token);
  else sessionStorage.removeItem('adminToken');
}

async function request(url, opts = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (adminToken) headers['X-Admin-Token'] = adminToken;

  const res = await fetch(BASE + url, {
    headers,
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  // Sessione scaduta: rimuovi il token locale
  if (res.status === 401) {
    setAdminToken(null);
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Errore di rete' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Profiles
  getProfiles: () => request('/profiles'),
  getProfile: (id) => request(`/profiles/${id}`),
  createProfile: (data) => request('/profiles', { method: 'POST', body: data }),
  updateProfile: (id, data) => request(`/profiles/${id}`, { method: 'PUT', body: data }),
  deleteProfile: (id) => request(`/profiles/${id}`, { method: 'DELETE' }),

  // Game
  saveGameResult: (profileId, data) =>
    request(`/profiles/${profileId}/game-result`, { method: 'POST', body: data }),
  updateStreak: (profileId, correct) =>
    request(`/profiles/${profileId}/streak`, { method: 'POST', body: { correct } }),

  // Errors
  logError: (profileId, data) =>
    request(`/profiles/${profileId}/errors`, { method: 'POST', body: data }),
  getErrors: (profileId, category) =>
    request(`/profiles/${profileId}/errors?category=${category || 'all'}`),
  clearErrors: (profileId) =>
    request(`/profiles/${profileId}/errors`, { method: 'DELETE' }),
  getAllErrors: (category, limit) =>
    request(`/errors?category=${category || 'all'}&limit=${limit || 50}`),

  // Spaced repetition
  getDueReviews: (profileId, category) =>
    request(`/profiles/${profileId}/reviews${category ? '?category=' + category : ''}`),
  updateReview: (reviewId) =>
    request(`/reviews/${reviewId}`, { method: 'PUT' }),

  // Badges
  addBadge: (profileId, badgeId) =>
    request(`/profiles/${profileId}/badges`, { method: 'POST', body: { badgeId } }),

  // Custom questions
  getCustomQuestions: () => request('/custom-questions'),
  addCustomQuestion: (data) => request('/custom-questions', { method: 'POST', body: data }),
  deleteCustomQuestion: (id) => request(`/custom-questions/${id}`, { method: 'DELETE' }),

  // Custom Content (domande admin)
  getCustomContent: (gameType, category, difficulty) =>
    request(`/custom-content?game_type=${encodeURIComponent(gameType)}&category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty)}`),
  getAllCustomContent: () => request('/custom-content'),
  addCustomContent: (gameType, category, difficulty, data) =>
    request('/custom-content', { method: 'POST', body: { game_type: gameType, category, difficulty, data } }),
  deleteCustomContent: (id) => request(`/custom-content/${id}`, { method: 'DELETE' }),

  // Admin
  verifyPin: async (pin) => {
    const result = await request('/admin/verify-pin', { method: 'POST', body: { pin } });
    if (result.valid && result.token) {
      setAdminToken(result.token);
    }
    return result;
  },
  changePin: async (pin) => {
    const result = await request('/admin/pin', { method: 'PUT', body: { pin } });
    // Il server invalida tutte le sessioni al cambio PIN → logout
    setAdminToken(null);
    return result;
  },
  getAdminStats: () => request('/admin/stats'),
  getAdminSetting: (key) => request(`/admin/settings/${key}`),
  setAdminSetting: (key, value) => request('/admin/settings', { method: 'PUT', body: { key, value } }),
  generateQuestions: (data) => request('/admin/generate-questions', { method: 'POST', body: data }),

  // Daily challenge
  getDailyStatus: (profileId) => request(`/profiles/${profileId}/daily`),
  completeDailyChallenge: (profileId, score, total) =>
    request(`/profiles/${profileId}/daily`, { method: 'POST', body: { score, total } }),

  // Backup
  exportAll: () => request('/backup/export'),
  importAll: async (data) => {
    const result = await request('/backup/import', { method: 'POST', body: data });
    // Il server invalida le sessioni dopo import → logout
    setAdminToken(null);
    return result;
  },

  // Sfida di Classe
  createClassChallenge: (data) => request('/admin/class-challenge', { method: 'POST', body: data }),
  getClassChallenge: (code) => request(`/admin/class-challenge/${code}`),
  deleteClassChallenge: (code) => request(`/admin/class-challenge/${code}`, { method: 'DELETE' }),
  getClassResults: (profileId) => request(`/profiles/${profileId}/class-results`),
};
