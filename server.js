const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const http = require('http');
const { Server: SocketServer } = require('socket.io');
const Anthropic = require('@anthropic-ai/sdk');
const db = require('./db');

const app = express();
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer, { cors: { origin: '*' } });
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
// CUSTOM CONTENT (domande admin)
// ══════════════════════════════════════
// Lettura pubblica: i giochi la usano per caricare domande personalizzate
app.get('/api/custom-content', (req, res) => {
  const { game_type, category, difficulty } = req.query;
  if (game_type && category && difficulty) {
    return res.json(db.getCustomContent(game_type, category, difficulty));
  }
  res.json(db.getAllCustomContent());
});

// Scrittura protetta: solo admin
app.post('/api/custom-content', requireAdmin, (req, res) => {
  const { game_type, category, difficulty, data } = req.body;
  if (!game_type || !category || !difficulty || !data) {
    return res.status(400).json({ error: 'game_type, category, difficulty e data sono obbligatori' });
  }
  const allowed_types = ['quiz', 'vf', 'abbina'];
  if (!allowed_types.includes(game_type)) {
    return res.status(400).json({ error: 'Tipo non supportato. Usa: quiz, vf, abbina' });
  }
  const result = db.addCustomContent(game_type, category, difficulty, data);
  res.status(201).json(result);
});

app.delete('/api/custom-content/:id', requireAdmin, (req, res) => {
  db.deleteCustomContent(req.params.id);
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

// Salva/leggi impostazioni generiche (es. chiave API)
app.get('/api/admin/settings/:key', requireAdmin, (req, res) => {
  const allowed = ['anthropic_api_key'];
  if (!allowed.includes(req.params.key)) return res.status(400).json({ error: 'Chiave non valida' });
  const val = db.getSetting(req.params.key);
  // Per la chiave API, restituisci solo se è impostata (non il valore)
  if (req.params.key === 'anthropic_api_key') return res.json({ configured: !!val });
  res.json({ value: val });
});

app.put('/api/admin/settings', requireAdmin, (req, res) => {
  const { key, value } = req.body;
  const allowed = ['anthropic_api_key'];
  if (!allowed.includes(key)) return res.status(400).json({ error: 'Chiave non valida' });
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    return res.status(400).json({ error: 'Valore non valido' });
  }
  db.setSetting(key, value.trim());
  res.json({ ok: true });
});

// Generazione domande con AI
app.post('/api/admin/generate-questions', requireAdmin, async (req, res) => {
  const { category, difficulty, topic, count } = req.body;
  if (!category || !difficulty || !topic) {
    return res.status(400).json({ error: 'category, difficulty e topic sono obbligatori' });
  }
  const apiKey = db.getSetting('anthropic_api_key');
  if (!apiKey) {
    return res.status(400).json({ error: 'Chiave API Anthropic non configurata. Aggiungila nella sezione Impostazioni AI.' });
  }
  try {
    const client = new Anthropic({ apiKey });
    const n = Math.min(Math.max(parseInt(count) || 5, 1), 15);
    const msg = await client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `Sei un insegnante di italiano per la scuola primaria italiana.
Genera esattamente ${n} domande a scelta multipla sulla categoria "${category}" (difficoltà: ${difficulty}) sull'argomento: "${topic}".
Le domande devono essere adatte a bambini, chiare e didatticamente corrette.

Rispondi SOLO con un array JSON valido, senza testo aggiuntivo, senza markdown, senza backtick:
[{"q":"testo domanda","a":"risposta corretta","w":["sbagliata1","sbagliata2","sbagliata3"],"hint":"breve suggerimento","explanation":"spiegazione breve della risposta corretta"}]`
      }]
    });
    const text = msg.content[0].text.trim();
    const questions = JSON.parse(text);
    if (!Array.isArray(questions)) throw new Error('Formato risposta non valido');
    res.json({ questions });
  } catch (e) {
    console.error('AI generation error:', e.message);
    res.status(500).json({ error: 'Errore generazione: ' + e.message });
  }
});

// ══════════════════════════════════════
// SFIDA GIORNALIERA
// ══════════════════════════════════════
app.get('/api/profiles/:id/daily', (req, res) => {
  const record = db.getTodayChallenge(req.params.id);
  const today = new Date().toISOString().split('T')[0];
  res.json({ completed: !!record, record: record || null, date: today });
});

app.post('/api/profiles/:id/daily', (req, res) => {
  const { score, total } = req.body;
  if (score === undefined || total === undefined) {
    return res.status(400).json({ error: 'score e total richiesti' });
  }
  const result = db.completeDailyChallenge(req.params.id, parseInt(score) || 0, parseInt(total) || 5);
  res.json(result);
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

// ══════════════════════════════════════
// SOCKET.IO — SFIDE ONLINE IN TEMPO REALE
// ══════════════════════════════════════
const rooms = new Map(); // code → { code, host, players:[{id,profileId,name,score,finished,answeredCount}], questions, status, cat, difficulty, createdAt }

const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no 0/O/1/I/L
function genRoomCode() {
  let code;
  do { code = Array.from({ length: 4 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join(''); }
  while (rooms.has(code));
  return code;
}

// Pulizia stanze vecchie ogni 30 minuti
setInterval(() => {
  const limit = Date.now() - 2 * 60 * 60 * 1000;
  for (const [code, room] of rooms) if (room.createdAt < limit) rooms.delete(code);
}, 30 * 60 * 1000);

io.on('connection', (socket) => {
  let myRoom = null; // codice stanza corrente del socket

  function broadcastRoom(code) {
    const room = rooms.get(code);
    if (!room) return;
    io.to(code).emit('room-update', {
      code: room.code,
      cat: room.cat,
      difficulty: room.difficulty,
      status: room.status,
      players: room.players.map(p => ({ name: p.name, score: p.score, finished: p.finished, isHost: p.id === room.host }))
    });
  }

  function leaveCurrentRoom() {
    if (!myRoom) return;
    const room = rooms.get(myRoom);
    if (room) {
      room.players = room.players.filter(p => p.id !== socket.id);
      if (room.players.length === 0) {
        rooms.delete(myRoom);
      } else {
        room.host = room.players[0].id; // nuovo host
        room.status = 'waiting';
        io.to(myRoom).emit('player-left', { message: 'L\'avversario ha abbandonato la partita.' });
        broadcastRoom(myRoom);
      }
    }
    socket.leave(myRoom);
    myRoom = null;
  }

  socket.on('create-room', ({ profileId, name, cat, difficulty, questions }) => {
    leaveCurrentRoom();
    const code = genRoomCode();
    rooms.set(code, {
      code, host: socket.id,
      players: [{ id: socket.id, profileId, name, score: 0, finished: false, answeredCount: 0 }],
      questions: questions || [],
      status: 'waiting',
      cat, difficulty,
      createdAt: Date.now()
    });
    socket.join(code);
    myRoom = code;
    socket.emit('room-created', { code });
    broadcastRoom(code);
  });

  socket.on('join-room', ({ code, profileId, name }) => {
    code = (code || '').toUpperCase().trim();
    const room = rooms.get(code);
    if (!room) return socket.emit('room-error', 'Stanza non trovata. Controlla il codice.');
    if (room.status !== 'waiting') return socket.emit('room-error', 'La partita è già iniziata.');
    if (room.players.length >= 2) return socket.emit('room-error', 'Stanza piena (2/2).');
    if (room.players.find(p => p.id === socket.id)) return;
    leaveCurrentRoom();
    room.players.push({ id: socket.id, profileId, name, score: 0, finished: false, answeredCount: 0 });
    socket.join(code);
    myRoom = code;
    broadcastRoom(code);
  });

  socket.on('start-game', ({ code }) => {
    const room = rooms.get(code);
    if (!room || room.host !== socket.id) return;
    if (room.players.length < 2) return socket.emit('room-error', 'Aspetta che un avversario entri nella stanza.');
    if (room.status !== 'waiting') return;
    room.status = 'playing';
    io.to(code).emit('game-start', { questions: room.questions });
  });

  socket.on('submit-answer', ({ code, correct }) => {
    const room = rooms.get(code);
    if (!room || room.status !== 'playing') return;
    const player = room.players.find(p => p.id === socket.id);
    if (!player || player.finished) return;
    if (correct) player.score++;
    player.answeredCount++;
    if (player.answeredCount >= room.questions.length) player.finished = true;
    io.to(code).emit('score-update', {
      players: room.players.map(p => ({ name: p.name, score: p.score, finished: p.finished }))
    });
    if (room.players.every(p => p.finished)) {
      room.status = 'finished';
      const sorted = [...room.players].sort((a, b) => b.score - a.score);
      const winner = sorted[0].score > sorted[1].score ? sorted[0].name : null;
      io.to(code).emit('game-end', {
        players: room.players.map(p => ({ name: p.name, score: p.score, profileId: p.profileId })),
        winner,
        total: room.questions.length
      });
      setTimeout(() => rooms.delete(code), 60 * 1000);
    }
  });

  socket.on('leave-room', ({ code }) => leaveCurrentRoom());
  socket.on('disconnect', () => leaveCurrentRoom());
});

httpServer.listen(PORT, () => {
  console.log(`\n  🇮🇹 Italiano in Gioco!`);
  console.log(`  ✅ Server attivo su http://localhost:${PORT}`);
  console.log(`  📦 Database: ${path.join(__dirname, 'data.db')}`);
  console.log(`  ⚔️  Socket.io pronto per sfide online\n`);
});
