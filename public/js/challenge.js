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
