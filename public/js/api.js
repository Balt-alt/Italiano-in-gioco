// ══════════════════════════════════════
// API Client - tutte le chiamate al server
// ══════════════════════════════════════

const BASE = '/api';

async function request(url, opts = {}) {
  const res = await fetch(BASE + url, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
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

  // Admin
  verifyPin: (pin) => request('/admin/verify-pin', { method: 'POST', body: { pin } }),
  changePin: (pin) => request('/admin/pin', { method: 'PUT', body: { pin } }),
  getAdminStats: () => request('/admin/stats'),

  // Backup
  exportAll: () => request('/backup/export'),
  importAll: (data) => request('/backup/import', { method: 'POST', body: data }),
};
