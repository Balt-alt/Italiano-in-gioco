const express = require('express');
const cors = require('cors');
const path = require('path');
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
  try {
    const profile = db.createProfile(id, name, avatar || '🦊', color || '#B197FC');
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
  // Parse wrong_answers JSON
  res.json(questions.map(q => ({ ...q, wrong_answers: JSON.parse(q.wrong_answers || '[]') })));
});

app.post('/api/custom-questions', (req, res) => {
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
  const { pin } = req.body;
  const correct = db.getAdminPin();
  res.json({ valid: pin === correct });
});

app.put('/api/admin/pin', (req, res) => {
  const { pin } = req.body;
  if (!pin || pin.length < 4) return res.status(400).json({ error: 'PIN minimo 4 caratteri' });
  db.setAdminPin(pin);
  res.json({ ok: true });
});

app.get('/api/admin/stats', (req, res) => {
  res.json(db.getAdminStats());
});

// ══════════════════════════════════════
// BACKUP
// ══════════════════════════════════════
app.get('/api/backup/export', (req, res) => {
  const data = db.exportAll();
  res.json(data);
});

app.post('/api/backup/import', (req, res) => {
  try {
    db.importAll(req.body);
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
