const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ── Initialize database (async for sql.js) ──
let dbReady = db.init().catch(e => { console.error('DB init error:', e); process.exit(1); });
app.use(async (req, res, next) => { await dbReady; next(); });

// ══════════════════════════════════════
// SESSIONI ADMIN (in-memory)
// ══════════════════════════════════════
const adminSessions = new Map(); // token -> expiresAt
const SESSION_TTL = 2 * 60 * 60 * 1000; // 2 ore

function createSession() {
  const token = crypto.randomBytes(32).toString('hex');
  adminSessions.set(token, Date.now() + SESSION_TTL);
  return token;
}

function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token) return res.status(401).json({ error: 'Accesso non autorizzato' });
  const expiry = adminSessions.get(token);
  if (!expiry || Date.now() > expiry) {
    adminSessions.delete(token);
    return res.status(401).json({ error: 'Sessione scaduta, effettua nuovamente l\'accesso' });
  }
  next();
}

// Pulizia periodica delle sessioni scadute (ogni ora)
setInterval(() => {
  const now = Date.now();
  for (const [token, expiry] of adminSessions) {
    if (now > expiry) adminSessions.delete(token);
  }
}, 60 * 60 * 1000);

// ══════════════════════════════════════
// RATE LIMITING PIN (in-memory)
// ══════════════════════════════════════
const pinAttempts = new Map(); // ip -> { count, resetAt }
const MAX_PIN_ATTEMPTS = 5;
const PIN_WINDOW_MS = 15 * 60 * 1000; // 15 minuti

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = pinAttempts.get(ip) || { count: 0, resetAt: now + PIN_WINDOW_MS };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + PIN_WINDOW_MS;
  }
  return entry;
}

// ══════════════════════════════════════
// PROFILES
// ══════════════════════════════════════
app.get('/api/profiles', (req, res) => {
  res.json(db.getProfiles());
});

app.get('/api/profiles/:id', (req, res) => {
  const profile = db.getProfile(req.params.id);
  if (!profile) return res.status(404).json({ error: 'Profilo non trovato' });
  res.json(profile);
});

app.post('/api/profiles', (req, res) => {
  const { id, name, avatar, color } = req.body;
  if (!id || !name) return res.status(400).json({ error: 'Nome richiesto' });
  if (typeof name !== 'string' || name.trim().length === 0 || name.length > 50) {
    return res.status(400).json({ error: 'Nome non valido (max 50 caratteri)' });
  }
  try {
    const profile = db.createProfile(id, name.trim(), avatar || '🦊', color || '#B197FC');
    res.status(201).json(profile);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/profiles/:id', (req, res) => {
  const profile = db.updateProfile(req.params.id, req.body);
  if (!profile) return res.status(404).json({ error: 'Profilo non trovato' });
  res.json(profile);
});

app.delete('/api/profiles/:id', (req, res) => {
  db.deleteProfile(req.params.id);
  res.json({ ok: true });
});

// ══════════════════════════════════════
// GAME RESULTS
// ══════════════════════════════════════
app.post('/api/profiles/:id/game-result', (req, res) => {
  try {
    const { category, score, total } = req.body;
    if (!category || score === undefined || total === undefined) {
      return res.status(400).json({ error: 'category, score, total richiesti' });
    }
    const result = db.saveGameResult(req.params.id, category, parseInt(score) || 0, parseInt(total) || 1);
    res.json(result);
  } catch (e) {
    console.error('Game result error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

// ══════════════════════════════════════
// STREAK
// ══════════════════════════════════════
app.post('/api/profiles/:id/streak', (req, res) => {
  const { correct } = req.body;
  const result = db.updateStreak(req.params.id, correct);
  res.json(result);
});

// ══════════════════════════════════════
// ERRORS
// ══════════════════════════════════════
app.post('/api/profiles/:id/errors', (req, res) => {
  db.logError(req.params.id, req.body);
  res.json({ ok: true });
});

app.get('/api/profiles/:id/errors', (req, res) => {
  const errors = db.getErrors(req.params.id, req.query.category);
  res.json(errors);
});

app.delete('/api/profiles/:id/errors', (req, res) => {
  db.clearErrors(req.params.id);
  res.json({ ok: true });
});

app.get('/api/errors', (req, res) => {
  const errors = db.getAllErrors(req.query.category, parseInt(req.query.limit) || 50);
  res.json(errors);
});

// ══════════════════════════════════════
// SPACED REPETITION
// ══════════════════════════════════════
app.get('/api/profiles/:id/reviews', (req, res) => {
  const items = db.getDueReviews(req.params.id, req.query.category);
  res.json(items);
});

app.put('/api/reviews/:id', (req, res) => {
  db.updateReview(req.params.id);
  res.json({ ok: true });
});

// ══════════════════════════════════════
// BADGES
// ══════════════════════════════════════
app.post('/api/profiles/:id/badges', (req, res) => {
  const { badgeId } = req.body;
  const added = db.addBadge(req.params.id, badgeId);
  res.json({ added });
});

// ══════════════════════════════════════
// CUSTOM QUESTIONS
// ══════════════════════════════════════
app.get('/api/custom-questions', (req, res) => {
  const questions = db.getCustomQuestions();
  res.json(questions.map(q => ({ ...q, wrong_answers: JSON.parse(q.wrong_answers || '[]') })));
});

app.post('/api/custom-questions', (req, res) => {
  const { question, answer } = req.body;
  if (!question || typeof question !== 'string' || question.length > 500) {
    return res.status(400).json({ error: 'Domanda non valida (max 500 caratteri)' });
  }
  if (!answer || typeof answer !== 'string' || answer.length > 200) {
    return res.status(400).json({ error: 'Risposta non valida (max 200 caratteri)' });
  }
  const result = db.addCustomQuestion(req.body);
  res.status(201).json(result);
});

app.delete('/api/custom-questions/:id', (req, res) => {
  db.deleteCustomQuestion(req.params.id);
  res.json({ ok: true });
});

// ══════════════════════════════════════
// ADMIN
// ══════════════════════════════════════
app.post('/api/admin/verify-pin', (req, res) => {
  const ip = req.ip || req.socket.remoteAddress;
  const entry = checkRateLimit(ip);

  if (entry.count >= MAX_PIN_ATTEMPTS) {
    pinAttempts.set(ip, entry);
    const waitMin = Math.ceil((entry.resetAt - Date.now()) / 60000);
    return res.status(429).json({ error: `Troppi tentativi. Riprova tra ${waitMin} minuti.` });
  }

  entry.count++;
  pinAttempts.set(ip, entry);

  const { pin } = req.body;
  if (!pin) return res.status(400).json({ error: 'PIN mancante' });

  if (db.verifyPin(pin)) {
    entry.count = 0; // reset contatore su successo
    const token = createSession();
    res.json({ valid: true, token });
  } else {
    res.json({ valid: false });
  }
});

app.put('/api/admin/pin', requireAdmin, (req, res) => {
  const { pin } = req.body;
  if (!pin || typeof pin !== 'string' || pin.length < 4 || pin.length > 20) {
    return res.status(400).json({ error: 'PIN deve essere tra 4 e 20 caratteri' });
  }
  db.setAdminPin(pin);
  // Invalida tutte le sessioni quando il PIN cambia
  adminSessions.clear();
  res.json({ ok: true });
});

app.get('/api/admin/stats', requireAdmin, (req, res) => {
  res.json(db.getAdminStats());
});

// ══════════════════════════════════════
// BACKUP (protetto da auth admin)
// ══════════════════════════════════════
app.get('/api/backup/export', requireAdmin, (req, res) => {
  const data = db.exportAll();
  res.json(data);
});

app.post('/api/backup/import', requireAdmin, (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Formato backup non valido' });
    }
    db.importAll(data);
    // Dopo import le sessioni vengono invalidate (il PIN potrebbe essere cambiato)
    adminSessions.clear();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Global error handler ──
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: err.message });
});

// ── SPA fallback ──
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  🇮🇹 Italiano in Gioco!`);
  console.log(`  ✅ Server attivo su http://localhost:${PORT}`);
  console.log(`  📦 Database: ${path.join(__dirname, 'data.db')}\n`);
});
