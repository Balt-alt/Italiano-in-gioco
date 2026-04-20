// ══════════════════════════════════════
// SFIDE ONLINE — Socket.io real-time
// ══════════════════════════════════════
import { esc, escAttr, shuffle, CATS } from './utils.js';
import * as Q from './questions.js';

// Banche domande per categoria (formato {q, a, w:[]})
const QUIZ_BANKS = {
  grammatica:   Q.gramQuiz,
  vocabolario:  Q.vocabQuiz,
  verbi:        Q.verbiQuiz,
  ortografia:   Q.ortoQuiz,
  comprensione: Q.compSignificato,
  analisi:      Q.analisiQuiz,
  produzione:   Q.prodRegistro,
};

let _render    = null;
let _navigate  = null;
let _profileId = null;
let _name      = null;
let _avatar    = null;

let socket     = null;
let currentRoom = null; // { code, cat, difficulty, players, status }
let onlineGame = { questions: [], ci: 0, sc: 0, tot: 0 };

// ── Init ──
export function initOnlineChallenge(profileId, profile, renderFn, navigateFn) {
  _profileId = profileId;
  _name      = profile.name;
  _avatar    = profile.avatar;
  _render    = renderFn;
  _navigate  = navigateFn;
}

// ── Socket (lazy connect) ──
function getSocket() {
  if (socket && socket.connected) return socket;
  // window.io è fornito da /socket.io/socket.io.js caricato in index.html
  socket = window.io({ autoConnect: true, reconnectionAttempts: 5 });
  socket.on('room-created',  ({ code }) => { currentRoom = { code }; });
  socket.on('room-update',   (room)    => { currentRoom = room; if (room.status === 'waiting') _renderWaiting(room); });
  socket.on('room-error',    (msg)     => _showError(msg));
  socket.on('game-start',    ({ questions }) => _startOnlineGame(questions));
  socket.on('score-update',  ({ players }) => _updateScoreboard(players));
  socket.on('game-end',      (result)  => _showResults(result));
  socket.on('player-left',   ({ message }) => { _showError(message); setTimeout(() => showOnlineLobby(), 2000); });
  socket.on('disconnect',    ()        => { if (currentRoom) _showError('Connessione persa. Riconnettiti.'); });
  return socket;
}

// ══════════════════════════════════════
// SCHERMATE
// ══════════════════════════════════════

export function showOnlineLobby() {
  getSocket(); // connetti subito
  currentRoom = null;
  _render(`
    <button class="nav-back" onclick="window._navigate('home')">← Menu</button>
    <div class="card" style="max-width:440px;margin:0 auto;text-align:center">
      <div style="font-size:3rem;margin-bottom:8px">🌐</div>
      <h2 style="margin-bottom:4px">Sfida Online</h2>
      <p style="color:var(--muted);font-size:.88rem;margin-bottom:24px">
        Gioca in tempo reale con un amico su un altro dispositivo
      </p>

      <button class="btn btn-primary" style="width:100%;margin-bottom:12px;font-size:1rem;padding:14px"
        onclick="window._chlShowCreate()">
        🏠 Crea una stanza
      </button>

      <div style="color:var(--muted);font-size:.82rem;margin-bottom:12px">— oppure entra con un codice —</div>

      <div style="display:flex;gap:8px;align-items:stretch">
        <input type="text" id="chl-code-input" class="input"
          style="flex:1;text-transform:uppercase;letter-spacing:5px;font-size:1.3rem;font-weight:800;text-align:center;min-width:0"
          placeholder="XXXX" maxlength="4"
          oninput="this.value=this.value.toUpperCase()"
          onkeydown="if(event.key==='Enter')window._chlJoin()">
        <button class="btn btn-mint btn-sm" style="flex-shrink:0;align-self:stretch;border-radius:var(--rs)" onclick="window._chlJoin()">Entra →</button>
      </div>
      <div id="chl-lobby-error" style="color:var(--coral);font-size:.85rem;margin-top:10px;min-height:20px"></div>
    </div>`);
}

window._chlShowCreate = () => {
  _render(`
    <button class="nav-back" onclick="window._chlBack()">← Indietro</button>
    <div class="card" style="max-width:440px;margin:0 auto">
      <h3 style="margin-bottom:16px">🏠 Crea Stanza</h3>
      <div class="setting-row">
        <label>📂 Categoria</label>
        <select id="chl-cat" class="input" style="width:100%">
          ${CATS.map(c => `<option value="${c.id}">${c.ic} ${c.nm}</option>`).join('')}
        </select>
      </div>
      <div class="setting-row">
        <label>🎯 Difficoltà</label>
        <select id="chl-diff" class="input" style="width:100%">
          <option value="facile">🟢 Facile</option>
          <option value="medio">🟡 Medio</option>
          <option value="difficile">🔴 Difficile</option>
        </select>
      </div>
      <div class="setting-row">
        <label>🔢 Domande</label>
        <select id="chl-count" class="input" style="width:100%">
          <option value="5">5 domande</option>
          <option value="8">8 domande</option>
          <option value="10" selected>10 domande</option>
        </select>
      </div>
      <button class="btn btn-primary" style="width:100%;margin-top:8px" onclick="window._chlCreate()">
        Crea Stanza 🚀
      </button>
      <div id="chl-create-error" style="color:var(--coral);font-size:.85rem;margin-top:10px;min-height:20px"></div>
    </div>`);
};

window._chlCreate = () => {
  const cat   = document.getElementById('chl-cat')?.value;
  const diff  = document.getElementById('chl-diff')?.value;
  const count = parseInt(document.getElementById('chl-count')?.value) || 10;
  const bank  = QUIZ_BANKS[cat] || QUIZ_BANKS.grammatica;
  const pool  = shuffle([...(bank[diff] || bank.facile || [])]).slice(0, count);

  if (!pool.length) {
    document.getElementById('chl-create-error').textContent = 'Nessuna domanda per questa selezione.';
    return;
  }
  getSocket().emit('create-room', {
    profileId: _profileId, name: _name,
    cat, difficulty: diff,
    questions: pool.map(q => ({ q: q.q, a: q.a, w: (q.w || []).slice(0, 3) }))
  });
};

window._chlJoin = () => {
  const code = document.getElementById('chl-code-input')?.value.trim().toUpperCase();
  if (!code || code.length !== 4) {
    document.getElementById('chl-lobby-error').textContent = 'Inserisci un codice di 4 lettere.';
    return;
  }
  document.getElementById('chl-lobby-error').textContent = '';
  getSocket().emit('join-room', { code, profileId: _profileId, name: _name });
};

window._chlBack = () => showOnlineLobby();

// ── Sala d'attesa ──
function _renderWaiting(room) {
  const code    = room.code;
  const isHost  = room.players?.[0]?.isHost;
  const catObj  = CATS.find(c => c.id === room.cat);
  const ready   = (room.players || []).length >= 2;

  _render(`
    <button class="nav-back" onclick="window._chlLeave()">← Esci</button>
    <div class="card" style="max-width:440px;margin:0 auto;text-align:center">
      <h3 style="margin-bottom:4px">⚔️ Sala d'Attesa</h3>
      ${catObj ? `<p style="color:var(--muted);font-size:.83rem;margin-bottom:14px">${catObj.ic} ${catObj.nm} · ${room.difficulty || ''}</p>` : ''}

      <div class="challenge-code-box">
        <div style="font-size:.76rem;color:var(--muted);margin-bottom:6px">Codice Stanza — condividilo con l'avversario</div>
        <div style="font-size:2.8rem;font-weight:900;letter-spacing:10px;color:var(--lav);cursor:pointer"
          title="Clicca per copiare" onclick="navigator.clipboard?.writeText('${code}');this.textContent='✅ Copiato!'">
          ${code}
        </div>
      </div>

      <div id="chl-players" style="margin:14px 0;display:flex;flex-direction:column;gap:8px">
        ${(room.players || []).map(p => `
          <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;
            background:rgba(177,151,252,.07);border-radius:12px;border:2px solid var(--lav)">
            <span style="font-size:1.3rem">${p.isHost ? '👑' : '⚔️'}</span>
            <span style="font-weight:700;flex:1;text-align:left">${esc(p.name)}</span>
            <span style="font-size:.78rem;color:var(--muted)">${p.isHost ? 'Host' : 'Sfidante'}</span>
          </div>`).join('')}
        ${!ready ? `
          <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;
            background:var(--border);border-radius:12px;opacity:.5">
            <span style="font-size:1.3rem">⏳</span>
            <span style="font-weight:700;flex:1;text-align:left;color:var(--muted)">In attesa...</span>
          </div>` : ''}
      </div>

      ${isHost
        ? `<button class="btn btn-primary" style="width:100%" onclick="window._chlStart()"
            ${ready ? '' : 'disabled style="opacity:.5;cursor:not-allowed;width:100%"'}>
            🚀 Inizia la Partita!
          </button>
          ${!ready ? '<p style="font-size:.78rem;color:var(--muted);margin-top:8px">Aspetta che l\'avversario entri</p>' : ''}`
        : `<p style="color:var(--muted);margin-top:8px">⏳ L'host avvierà la partita...</p>`}
    </div>`);
}

window._chlStart = () => {
  if (currentRoom?.code) getSocket().emit('start-game', { code: currentRoom.code });
};

window._chlLeave = () => {
  if (currentRoom?.code) getSocket().emit('leave-room', { code: currentRoom.code });
  currentRoom = null;
  _navigate('home');
};

// ══════════════════════════════════════
// GIOCO ONLINE
// ══════════════════════════════════════
function _startOnlineGame(questions) {
  onlineGame = { questions, ci: 0, sc: 0, tot: questions.length };
  _showOnlineQuestion();
}

function _showOnlineQuestion() {
  const q    = onlineGame.questions[onlineGame.ci];
  const pct  = (onlineGame.ci / onlineGame.tot) * 100;
  const opts = shuffle([q.a, ...(q.w || []).slice(0, 3)]);
  const cat  = CATS.find(c => c.id === currentRoom?.cat) || { cl: ['#B197FC', '#D0BFFF'], ic: '⚔️', nm: 'Sfida' };

  _render(`
    <div class="quiz-area">
      <div class="progress-wrap">
        <div class="progress-bg"><div class="progress-fill" style="width:${pct}%"></div></div>
        <span class="progress-text">${onlineGame.ci + 1}/${onlineGame.tot}</span>
      </div>

      <div id="online-scoreboard" class="challenge-scores" style="margin:10px 0 16px"></div>

      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Sfida Online ⚔️</div>
      <div class="question-text">${esc(q.q)}</div>

      <div class="answers-grid">
        ${opts.map(o =>
          `<button class="answer-btn"
            onclick="window._chlAnswer(this,'${escAttr(o)}','${escAttr(q.a)}')"
          >${esc(o)}</button>`
        ).join('')}
      </div>

      <div id="online-feedback"></div>
      <div id="online-next" style="display:none" class="btn-group">
        <button class="btn btn-primary" onclick="window._chlNext()">Avanti ➜</button>
      </div>
    </div>`);
}

window._chlAnswer = (btn, sel, correct) => {
  document.querySelectorAll('.answer-btn').forEach(b => { b.disabled = true; });
  const ok = sel === correct;
  btn.classList.add(ok ? 'correct' : 'wrong');
  if (!ok) {
    document.querySelectorAll('.answer-btn').forEach(b => {
      if (b.textContent.trim() === correct) b.classList.add('correct');
    });
  }
  if (ok) onlineGame.sc++;
  document.getElementById('online-feedback').innerHTML =
    `<div class="feedback ${ok ? 'ok' : 'no'}">${ok ? '✅ Esatto!' : `❌ Era: <strong>${esc(correct)}</strong>`}</div>`;
  document.getElementById('online-next').style.display = 'flex';
  getSocket().emit('submit-answer', { code: currentRoom?.code, correct: ok });
};

window._chlNext = () => {
  onlineGame.ci++;
  if (onlineGame.ci >= onlineGame.tot) {
    _render(`
      <div class="quiz-area" style="text-align:center">
        <div style="font-size:3.5rem;margin:48px 0 16px">⏳</div>
        <h3>Hai finito!</h3>
        <p style="color:var(--muted);margin-top:8px">Aspetto che l'avversario completi...</p>
        <div style="margin-top:24px;font-size:1.5rem;font-weight:900;color:var(--lav)">
          ${onlineGame.sc} / ${onlineGame.tot}
        </div>
      </div>`);
  } else {
    _showOnlineQuestion();
  }
};

function _updateScoreboard(players) {
  const sb = document.getElementById('online-scoreboard');
  if (!sb || !players?.length) return;
  sb.innerHTML = players.map((p, i) => `
    <div class="ch-score">
      <div class="ch-name">${esc(p.name)}${p.finished ? ' ✓' : ''}</div>
      <div class="ch-pts">${p.score}</div>
    </div>
    ${i < players.length - 1 ? '<div class="ch-vs">VS</div>' : ''}
  `).join('');
}

// ── Risultati ──
function _showResults(result) {
  const me = result.players.find(p => p.profileId === _profileId);
  const isWinner = me && result.winner === me.name;
  const isDraw   = !result.winner;
  const emoji    = isDraw ? '🤝' : isWinner ? '🏆' : '😔';
  const title    = isDraw ? 'Pareggio!' : isWinner ? 'Hai Vinto!' : `Vince ${esc(result.winner)}!`;

  _render(`
    <div class="card" style="max-width:440px;margin:0 auto;text-align:center">
      <div style="font-size:4rem;margin-bottom:8px">${emoji}</div>
      <h2 style="margin-bottom:4px">${title}</h2>
      <p style="color:var(--muted);margin-bottom:24px">su ${result.total} domande</p>

      <div class="challenge-scores" style="margin-bottom:24px">
        ${result.players.map((p, i) => `
          <div class="ch-score">
            <div class="ch-name">${esc(p.name)}</div>
            <div class="ch-pts" style="color:${p.name === result.winner ? 'var(--sun)' : 'var(--lav)'}">
              ${p.score}
            </div>
          </div>
          ${i < result.players.length - 1 ? '<div class="ch-vs">VS</div>' : ''}
        `).join('')}
      </div>

      <div class="btn-group">
        <button class="btn btn-primary" onclick="window._chlRematch()">⚔️ Rivincita</button>
        <button class="btn btn-ghost"   onclick="window._navigate('home')">🏠 Menu</button>
      </div>
    </div>`);

  currentRoom = null;
}

window._chlRematch = () => showOnlineLobby();

// ── Utility ──
function _showError(msg) {
  // prova a mostrare nell'elemento errore se esiste, altrimenti alert
  const el = document.getElementById('chl-lobby-error') || document.getElementById('chl-create-error');
  if (el) el.textContent = msg;
  else alert('⚠️ ' + msg);
}

// ══════════════════════════════════════
// SFIDA DI CLASSE — lato studente
// ══════════════════════════════════════
let _ccProfileId = null;
let _ccProfile   = null;
let _ccRender    = null;
let _ccNavigate  = null;
let _ccCode      = null;
let _ccGame      = { questions: [], ci: 0, sc: 0, tot: 0 };
let _ccListening = false;

export function initClassChallenge(profileId, profile, renderFn, navigateFn) {
  _ccProfileId = profileId;
  _ccProfile   = profile;
  _ccRender    = renderFn;
  _ccNavigate  = navigateFn;
}

function _getClassSocket() {
  const sock = getSocket();
  if (!_ccListening) {
    _ccListening = true;

    sock.on('class-joined', ({ code, title, category, difficulty }) => {
      _ccCode = code;
      _ccRender(`
        <button class="nav-back" onclick="window._ccLeave()">← Esci</button>
        <div class="card" style="max-width:500px;margin:0 auto;text-align:center">
          <div style="font-size:2.5rem;margin-bottom:8px">🏫</div>
          <h2 style="margin-bottom:4px">${esc(title)}</h2>
          <p style="color:var(--muted);font-size:.85rem;margin-bottom:16px">${category} · ${difficulty}</p>
          <div class="challenge-code-box" style="margin-bottom:16px">
            <div style="font-size:.76rem;color:var(--muted);margin-bottom:4px">Codice stanza</div>
            <div style="font-size:2rem;font-weight:900;letter-spacing:8px;color:var(--lav)">${code}</div>
          </div>
          <p style="color:var(--muted)">⏳ In attesa che l'insegnante avvii la sfida...</p>
          <div id="cc-waiting-list" style="margin-top:16px"></div>
          <div id="cc-error" style="color:var(--coral);font-size:.85rem;margin-top:10px;min-height:18px"></div>
        </div>`);
    });

    sock.on('class-room-update', (room) => {
      const listEl = document.getElementById('cc-waiting-list');
      if (listEl && room.participants) {
        listEl.innerHTML = room.participants.map(p => `
          <div class="cc-participant-row">
            <span>${p.avatar}</span>
            <span style="font-weight:700;flex:1;text-align:left">${esc(p.name)}</span>
            ${room.state === 'playing' ? `<span style="font-weight:800;color:var(--lav)">${p.score}/${room.total}</span>` : ''}
          </div>`).join('');
      }
      const liveEl = document.getElementById('cc-student-live');
      if (liveEl && room.participants) {
        liveEl.innerHTML = room.participants
          .slice().sort((a, b) => b.score - a.score)
          .map((p, i) => `
            <div class="cc-participant-row ${p.profileId === _ccProfileId ? 'me' : ''}">
              <span style="min-width:22px;font-weight:700;color:var(--muted)">${i + 1}.</span>
              <span>${p.avatar}</span>
              <span style="flex:1;font-weight:700">${esc(p.name)}</span>
              <span style="font-weight:800;color:var(--lav)">${p.score}</span>
              ${p.finished ? '<span style="color:var(--mint);font-size:.75rem">✓</span>' : ''}
            </div>`).join('');
      }
    });

    sock.on('class-started', ({ questions, title, total }) => {
      _ccGame = { questions, ci: 0, sc: 0, tot: total };
      _ccShowQuestion();
    });

    sock.on('class-score-update', (participants) => {
      const liveEl = document.getElementById('cc-student-live');
      if (!liveEl || !participants) return;
      liveEl.innerHTML = participants
        .slice().sort((a, b) => b.score - a.score)
        .map((p, i) => `
          <div class="cc-participant-row ${p.profileId === _ccProfileId ? 'me' : ''}">
            <span style="min-width:22px;font-weight:700;color:var(--muted)">${i + 1}.</span>
            <span>${p.avatar}</span>
            <span style="flex:1;font-weight:700">${esc(p.name)}</span>
            <span style="font-weight:800;color:var(--lav)">${p.score}</span>
            ${p.finished ? '<span style="color:var(--mint);font-size:.75rem">✓</span>' : ''}
          </div>`).join('');
    });

    sock.on('class-ended', ({ leaderboard, title }) => {
      _ccShowClassResults(leaderboard, title);
    });

    sock.on('class-error', (msg) => {
      const errEl = document.getElementById('cc-error') || document.getElementById('cc-join-error');
      if (errEl) errEl.textContent = msg;
      else alert('⚠️ ' + msg);
    });
  }
  return sock;
}

export function showClassChallengeLobby() {
  _getClassSocket();
  _ccCode = null;
  _ccRender(`
    <button class="nav-back" onclick="window._navigate('home')">← Menu</button>
    <div class="card" style="max-width:440px;margin:0 auto;text-align:center">
      <div style="font-size:3rem;margin-bottom:8px">🏫</div>
      <h2 style="margin-bottom:4px">Sfida di Classe</h2>
      <p style="color:var(--muted);font-size:.88rem;margin-bottom:24px">
        L'insegnante ha creato una sfida — inserisci il codice per entrare
      </p>
      <div style="display:flex;gap:8px;align-items:stretch;margin-bottom:12px">
        <input type="text" id="cc-code-input" class="input"
          style="flex:1;text-transform:uppercase;letter-spacing:5px;font-size:1.3rem;font-weight:800;text-align:center;min-width:0"
          placeholder="XXXXXX" maxlength="6"
          oninput="this.value=this.value.toUpperCase()"
          onkeydown="if(event.key==='Enter')window._ccEnter()">
        <button class="btn btn-primary btn-sm" style="flex-shrink:0;align-self:stretch;border-radius:var(--rs)"
          onclick="window._ccEnter()">Entra →</button>
      </div>
      <div id="cc-join-error" style="color:var(--coral);font-size:.85rem;min-height:20px"></div>
    </div>`);
}

window._ccEnter = () => {
  const code = document.getElementById('cc-code-input')?.value.trim().toUpperCase();
  if (!code || code.length !== 6) {
    document.getElementById('cc-join-error').textContent = 'Inserisci un codice di 6 caratteri.';
    return;
  }
  document.getElementById('cc-join-error').textContent = '';
  _getClassSocket().emit('join-class-room', {
    code,
    profileId: _ccProfileId,
    name: _ccProfile?.name || 'Studente',
    avatar: _ccProfile?.avatar || '🦊'
  });
};

window._ccLeave = () => {
  _ccCode = null;
  _ccNavigate('home');
};

function _ccShowQuestion() {
  const q = _ccGame.questions[_ccGame.ci];
  if (!q) return;
  const pct = (_ccGame.ci / _ccGame.tot) * 100;
  const opts = shuffle([q.a, ...(q.w || []).slice(0, 3)]);

  _ccRender(`
    <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start">
      <div class="quiz-area" style="flex:1;min-width:280px">
        <div class="progress-wrap">
          <div class="progress-bg"><div class="progress-fill" style="width:${pct}%"></div></div>
          <span class="progress-text">${_ccGame.ci + 1}/${_ccGame.tot}</span>
        </div>
        <div class="category-tag" style="background:rgba(177,151,252,.1);color:var(--lav)">🏫 Sfida di Classe</div>
        <div class="question-text">${esc(q.q)}</div>
        <div class="answers-grid">
          ${opts.map(o =>
            `<button class="answer-btn"
              onclick="window._ccAnswer(this,'${escAttr(o)}','${escAttr(q.a)}')"
            >${esc(o)}</button>`
          ).join('')}
        </div>
        <div id="cc-feedback"></div>
        <div id="cc-next" style="display:none" class="btn-group">
          <button class="btn btn-primary" onclick="window._ccNext()">Avanti ➜</button>
        </div>
      </div>
      <div class="class-live-board" style="min-width:180px;flex:0 0 180px">
        <div style="font-weight:700;font-size:.85rem;margin-bottom:8px;color:var(--muted)">📊 Classifica Live</div>
        <div id="cc-student-live"></div>
      </div>
    </div>`);
}

window._ccAnswer = (btn, sel, correct) => {
  document.querySelectorAll('.answer-btn').forEach(b => { b.disabled = true; });
  const ok = sel === correct;
  btn.classList.add(ok ? 'correct' : 'wrong');
  if (!ok) {
    document.querySelectorAll('.answer-btn').forEach(b => {
      if (b.textContent.trim() === correct) b.classList.add('correct');
    });
  }
  if (ok) _ccGame.sc++;
  document.getElementById('cc-feedback').innerHTML =
    `<div class="feedback ${ok ? 'ok' : 'no'}">${ok ? '✅ Esatto!' : `❌ Era: <strong>${esc(correct)}</strong>`}</div>`;
  document.getElementById('cc-next').style.display = 'flex';
  _getClassSocket().emit('submit-class-answer', { code: _ccCode, correct: ok });
};

window._ccNext = () => {
  _ccGame.ci++;
  if (_ccGame.ci >= _ccGame.tot) {
    _ccRender(`
      <div class="quiz-area" style="text-align:center">
        <div style="font-size:3.5rem;margin:48px 0 16px">⏳</div>
        <h3>Hai finito!</h3>
        <p style="color:var(--muted);margin-top:8px">In attesa che tutti completino...</p>
        <div style="margin-top:24px;font-size:1.5rem;font-weight:900;color:var(--lav)">
          ${_ccGame.sc} / ${_ccGame.tot}
        </div>
      </div>`);
  } else {
    _ccShowQuestion();
  }
};

function _ccShowClassResults(leaderboard, title) {
  const myEntry = leaderboard.find(e => e.profileId === _ccProfileId);
  const isFirst = myEntry?.rank === 1;
  const medals  = ['🥇', '🥈', '🥉'];

  _ccRender(`
    <div id="confetti-box" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:999"></div>
    <div class="card" style="max-width:520px;margin:0 auto;text-align:center">
      <div style="font-size:3rem;margin-bottom:6px">🏫</div>
      <h2 style="margin-bottom:2px">Sfida Terminata!</h2>
      <p style="color:var(--muted);font-size:.85rem;margin-bottom:20px">${esc(title)}</p>
      <div class="class-podium">
        ${leaderboard.map(e => `
          <div class="cc-participant-row ${e.profileId === _ccProfileId ? 'me' : ''}" style="padding:10px 14px">
            <span style="font-size:1.4rem;min-width:32px">${medals[e.rank - 1] || e.rank + '.'}</span>
            <span style="font-size:1.2rem">${e.avatar}</span>
            <span style="font-weight:700;flex:1;text-align:left">${esc(e.name)}</span>
            <span style="font-weight:900;color:var(--lav)">${e.score}/${e.total}</span>
            <span style="font-size:.78rem;color:var(--muted);min-width:38px">${e.pct}%</span>
          </div>`).join('')}
      </div>
      ${myEntry ? `<p style="margin-top:14px;font-weight:700;color:var(--mint)">
        Sei arrivato/a ${myEntry.rank === 1 ? '🥇 PRIMO/A' : myEntry.rank === 2 ? '🥈 secondo/a' : myEntry.rank === 3 ? '🥉 terzo/a' : myEntry.rank + 'º'}!
        Punteggio: ${myEntry.score}/${myEntry.total}</p>` : ''}
      <div class="btn-group">
        <button class="btn btn-primary" onclick="window._navigate('home')">🏠 Menu</button>
        <button class="btn btn-ghost" onclick="showClassChallengeLobby()">🏫 Altra Sfida</button>
      </div>
    </div>`);

  if (isFirst) {
    import('./utils.js').then(({ launchConfetti }) => launchConfetti());
  }
}
