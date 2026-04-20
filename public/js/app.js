// ══════════════════════════════════════
// APP CONTROLLER - Router e schermate
// ══════════════════════════════════════
import { api } from './api.js';
import { esc, escAttr, genId, shuffle as _shuffle, AVATARS, AVATAR_COLORS, CATS, BADGES } from './utils.js';
import { initGames, startGame, startReview, startChallenge, refreshProfile } from './games.js';
import { defaultConfig, renderAvatar, renderAvatarBuilder, avatarHTML } from './avatar.js';
import { LESSONS } from './lessons.js';
import { initOnlineChallenge, showOnlineLobby, initClassChallenge, showClassChallengeLobby } from './challenge.js';
import * as Q from './questions.js';
import { initDaily, showDailyChallenge } from './daily.js';
import { initGlossary, showGlossary } from './glossary.js';
import { initMinigames, showMinigames } from './minigames.js';

function parseAvatar(raw) {
  if (!raw) return null;
  try { return typeof raw === 'string' ? JSON.parse(raw) : raw; } catch(e) { return null; }
}

let currentProfileId = null;
let currentProfile = null;

const main = () => document.getElementById('main-content');

// Teardown registrato dalla schermata corrente (es. minigames ferma RAF/timer/listener).
// Viene chiamato prima di ogni nuovo render per evitare memory leak e listener fantasma.
let _currentTeardown = null;
window._setScreenTeardown = (fn) => { _currentTeardown = fn; };

function render(html) {
  if (_currentTeardown) { try { _currentTeardown(); } catch (_) {} _currentTeardown = null; }
  main().innerHTML = html;
}

function applyAccessibility() {
  if (!currentProfile) return;
  document.body.classList.toggle('dyslexia-mode', !!currentProfile.dyslexia_mode);
  document.body.classList.toggle('large-text', !!currentProfile.large_text);
  document.body.classList.toggle('uppercase-text', !!currentProfile.uppercase_text);
}

function navigate(screen, param) {
  switch (screen) {
    case 'profiles':   showProfiles(); break;
    case 'home':       showHome(); break;
    case 'category':   showCategory(param); break;
    case 'settings':   showSettings(); break;
    case 'badges':     showBadges(); break;
    case 'custom':     showCustomQ(); break;
    case 'admin':      showAdmin(); break;
    case 'challenge':       showOnlineLobby(); break;
    case 'class-challenge': showClassChallengeLobby(); break;
    case 'daily':      showDailyChallenge(); break;
    case 'glossary':   showGlossary(); break;
    case 'minigames':  showMinigames(); break;
    default:           showProfiles();
  }
}

// ══════════════════════════════════════
// PROFILES SCREEN
// ══════════════════════════════════════
async function showProfiles() {
  currentProfileId = null; currentProfile = null;
  document.body.className = '';
  const profiles = await api.getProfiles();
  render(`
    <div class="profile-screen">
      <h1 class="gradient-title">Italiano in Gioco!</h1>
      <p class="subtitle">Scegli il tuo profilo per iniziare 🎮</p>
      <div class="profiles-grid">
        ${profiles.map(p => {
          const avCfg = parseAvatar(p.avatar);
          return `
          <div class="profile-card" onclick="window._selectProfile('${p.id}')">
            <div class="avatar-inline" style="margin:0 auto 8px">${avatarHTML(avCfg, 64)}</div>
            <div class="profile-name">${esc(p.name)}</div>
            <div class="profile-level">Lv.${Math.floor(p.xp / 200) + 1} · ${p.xp} XP</div>
          </div>`;
        }).join('')}
        <div class="profile-card add-profile" onclick="window._addProfileScreen()">
          <div class="profile-avatar" style="background:#f0ecf5">➕</div>
          <div class="profile-name">Nuovo</div>
        </div>
      </div>
      <div class="btn-group"><button class="btn btn-ghost btn-sm" onclick="window._adminLogin()">🔒 Admin</button></div>
    </div>`);
}

window._selectProfile = async (id) => {
  currentProfileId = id;
  currentProfile = await api.getProfile(id);
  initGames(id, currentProfile, navigate);
  initOnlineChallenge(id, currentProfile, render, navigate);
  initClassChallenge(id, currentProfile, render, navigate);
  initDaily(id, render, navigate);
  initGlossary(render, navigate);
  initMinigames(render, navigate);
  applyAccessibility();
  showHome();
};

window._addProfileScreen = () => {
  const cfg = defaultConfig();
  function rerender() {
    const container = document.getElementById('avb-container');
    if (container) container.innerHTML = renderAvatarBuilder(cfg, (newCfg) => {
      Object.assign(cfg, newCfg);
      rerender();
    });
  }
  render(`
    <button class="nav-back" onclick="window._goProfiles()">← Indietro</button>
    <div class="card" style="max-width:440px;margin:16px auto;text-align:center">
      <h2 style="margin-bottom:16px">✨ Crea il tuo Avatar!</h2>
      <div id="avb-container"></div>
      <div class="setting-row" style="margin-top:16px"><label>Il tuo nome</label><input type="text" id="new-name" placeholder="Come ti chiami?" maxlength="20"></div>
      <div class="btn-group"><button class="btn btn-primary" onclick="window._createProfile()">Crea Profilo 🎉</button></div>
    </div>`);
  window._avbCfgRef = cfg;
  rerender();
};

window._createProfile = async () => {
  const name = document.getElementById('new-name')?.value.trim();
  if (!name) { alert('Inserisci un nome!'); return; }
  const cfg = window._avbCfgRef || defaultConfig();
  const profile = await api.createProfile({
    id: genId(), name, avatar: JSON.stringify(cfg), color: cfg.bg || '#B197FC'
  });
  window._selectProfile(profile.id);
};

window._goProfiles = () => showProfiles();

// ══════════════════════════════════════
// HOME SCREEN
// ══════════════════════════════════════
async function showHome() {
  if (!currentProfileId) return showProfiles();
  currentProfile = await api.getProfile(currentProfileId);
  refreshProfile(currentProfile);
  applyAccessibility();
  const p = currentProfile;
  const dailyStatus = await api.getDailyStatus(currentProfileId).catch(() => ({ completed: false }));
  const lv = Math.floor(p.xp / 200) + 1;
  const cs = p.category_scores || [];

  const avCfg = parseAvatar(p.avatar);

  render(`
    <div class="stats-bar">
      <div class="stat">⭐ ${p.xp}</div>
      <div class="stat">🔥 ${p.streak}</div>
      <div class="stat">🏆 Lv.${lv}</div>
      <div class="stat clickable" onclick="window._goProfiles()" style="padding:2px 10px">
        <span class="avatar-inline">${avatarHTML(avCfg, 28)}</span> ${esc(p.name)}
      </div>
    </div>
    <div class="home-header">
      <h1 class="gradient-title">Italiano in Gioco!</h1>
      <p class="subtitle">Ciao ${esc(p.name)}! Cosa vuoi esercitare? 🌟</p>
    </div>
    <div class="menu-grid">
      ${CATS.map(c => {
        const sc = cs.find(s => s.category === c.id);
        return `<div class="menu-card" onclick="window._showCategory('${c.id}')">
          <div class="card-accent" style="background:linear-gradient(90deg,${c.cl[0]},${c.cl[1]})"></div>
          <span class="card-icon">${c.ic}</span>
          <div class="card-title">${c.nm}</div>
          <div class="card-desc">${c.ds}</div>
          ${sc?.played ? `<div class="card-badge" style="background:${c.cl[0]}12;color:${c.cl[0]}">Best: ${sc.best_score}%</div>` : `<div class="card-badge" style="background:var(--border);color:var(--muted)">Nuovo!</div>`}
        </div>`;
      }).join('')}
    </div>
    <!-- Banner sfida giornaliera -->
    <div onclick="window._navigate('daily')" style="cursor:pointer;background:linear-gradient(135deg,#f9a825,#ff6b35);border-radius:var(--r);padding:14px 18px;margin-top:20px;display:flex;align-items:center;gap:14px;box-shadow:0 4px 14px rgba(249,168,37,.3)">
      <span style="font-size:2rem">🌟</span>
      <div style="flex:1">
        <div style="font-weight:800;color:#fff;font-size:1rem">Sfida del Giorno</div>
        <div style="font-size:.8rem;color:rgba(255,255,255,.85)">${dailyStatus.completed ? '✅ Già completata oggi! Torna domani.' : '5 domande miste · Bonus XP disponibile!'}</div>
      </div>
      ${dailyStatus.completed ? '<span style="font-size:1.4rem">✅</span>' : '<span style="background:rgba(255,255,255,.2);color:#fff;font-weight:700;padding:6px 14px;border-radius:50px;font-size:.85rem">Gioca →</span>'}
    </div>

    <div class="btn-group" style="margin-top:14px">
      <button class="btn btn-sun btn-sm" onclick="window._showMap()">🗺️ Mappa</button>
      <button class="btn btn-mint btn-sm" onclick="window._showChallenge()">⚔️ Sfida</button>
      <button class="btn btn-ghost btn-sm" onclick="window._navigate('glossary')">📚 Glossario</button>
      <button class="btn btn-ghost btn-sm" onclick="window._showLessons()">📖 Lezioni</button>
      <button class="btn btn-ghost btn-sm" onclick="window._editAvatar()">🎨 Avatar</button>
      <button class="btn btn-ghost btn-sm" onclick="window._navigate('settings')">⚙️ Impostazioni</button>
      <button class="btn btn-ghost btn-sm" onclick="window._navigate('custom')">✏️ Personalizza</button>
      <button class="btn btn-ghost btn-sm" onclick="window._navigate('badges')">🏅 Traguardi</button>
      ${p.error_count > 0 ? `<button class="btn btn-coral btn-sm" onclick="window._startReview()">🔄 Ripassa (${p.error_count})</button>` : ''}
    </div>`);
}

window._showCategory = (id) => showCategory(id);
window._navigate = (screen) => navigate(screen);
window._startReview = () => startReview();

// ══════════════════════════════════════
// PROGRESS MAP
// ══════════════════════════════════════
window._showMap = () => {
  const p = currentProfile;
  const cs = p.category_scores || [];
  const lv = Math.floor(p.xp / 200) + 1;
  const totalPossible = CATS.length * 100;
  const totalEarned = cs.reduce((sum, c) => sum + (c.best_score || 0), 0);
  const overallPct = CATS.length > 0 ? Math.round(totalEarned / totalPossible * 100) : 0;

  const mapNodes = CATS.map((cat, i) => {
    const sc = cs.find(s => s.category === cat.id);
    const pct = sc ? sc.best_score : 0;
    const played = sc ? sc.played : 0;
    const status = pct >= 80 ? 'gold' : pct >= 50 ? 'silver' : played > 0 ? 'bronze' : 'locked';
    const stars = pct >= 90 ? '⭐⭐⭐' : pct >= 70 ? '⭐⭐' : pct >= 40 ? '⭐' : pct > 0 ? '☆' : '🔒';
    return { cat, pct, played, status, stars, i };
  });

  render(`
    <button class="nav-back" onclick="window._navigate('home')">← Menu</button>
    <div class="card" style="text-align:center">
      <h2 style="margin-bottom:6px">🗺️ La tua Avventura</h2>
      <p style="color:var(--muted);font-size:.88rem;margin-bottom:16px">Progresso totale: <strong>${overallPct}%</strong> · Livello ${lv}</p>
      <div class="map-progress-bar"><div class="map-progress-fill" style="width:${overallPct}%"></div></div>
      <div class="map-container">
        <div class="map-path">
          ${mapNodes.map((n, idx) => `
            <div class="map-node map-${n.status}" onclick="window._showCategory('${n.cat.id}')" style="--delay:${idx*0.1}s">
              <div class="map-icon" style="background:${n.cat.cl[0]}">${n.cat.ic}</div>
              <div class="map-label">${n.cat.nm}</div>
              <div class="map-stars">${n.stars}</div>
              <div class="map-pct">${n.pct}%</div>
              ${idx < mapNodes.length - 1 ? '<div class="map-connector"></div>' : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>`);
};

// ══════════════════════════════════════
// MINI-LEZIONI
// ══════════════════════════════════════
window._showLessons = () => {
  render(`
    <button class="nav-back" onclick="window._navigate('home')">← Menu</button>
    <div class="card">
      <h2 style="margin-bottom:16px">📖 Mini-Lezioni</h2>
      <p style="color:var(--muted);font-size:.88rem;margin-bottom:16px">Ripassa le regole prima di giocare!</p>
      ${CATS.map(cat => {
        const lessons = LESSONS[cat.id] || [];
        if (!lessons.length) return '';
        return `
        <div class="lesson-cat" style="margin-bottom:18px">
          <div style="font-weight:700;font-size:1.05rem;margin-bottom:8px;color:${cat.cl[0]}">${cat.ic} ${cat.nm}</div>
          ${lessons.map((l, i) => `
            <div class="lesson-card" onclick="window._openLesson('${cat.id}',${i})">
              <div class="lesson-title">📄 ${esc(l.title)}</div>
              <div class="lesson-arrow">→</div>
            </div>
          `).join('')}
        </div>`;
      }).join('')}
    </div>`);
};

window._openLesson = (catId, idx) => {
  const cat = CATS.find(c => c.id === catId);
  const lessons = LESSONS[catId] || [];
  const lesson = lessons[idx];
  if (!lesson) return;

  render(`
    <button class="nav-back" onclick="window._showLessons()">← Lezioni</button>
    <div class="card lesson-detail">
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]};margin-bottom:12px">${cat.ic} ${cat.nm}</div>
      <h2 style="margin-bottom:16px">${esc(lesson.title)}</h2>
      <div class="lesson-content">${lesson.content.replace(/\n/g, '<br>')}</div>
      <div class="btn-group" style="margin-top:20px">
        ${idx > 0 ? `<button class="btn btn-ghost btn-sm" onclick="window._openLesson('${catId}',${idx-1})">← Precedente</button>` : ''}
        ${idx < lessons.length - 1 ? `<button class="btn btn-primary btn-sm" onclick="window._openLesson('${catId}',${idx+1})">Prossima →</button>` : ''}
        <button class="btn btn-mint btn-sm" onclick="window._showCategory('${catId}')">🎮 Gioca!</button>
      </div>
    </div>`);
};

// ══════════════════════════════════════
// SFIDE — scegli modalità (locale / online)
// ══════════════════════════════════════
window._showChallenge = () => {
  render(`
    <button class="nav-back" onclick="window._navigate('home')">← Menu</button>
    <div class="card" style="max-width:440px;margin:0 auto;text-align:center">
      <div style="font-size:3rem;margin-bottom:8px">⚔️</div>
      <h2 style="margin-bottom:4px">Sfide</h2>
      <p style="color:var(--muted);font-size:.88rem;margin-bottom:24px">Scegli come vuoi giocare</p>

      <div style="display:flex;flex-direction:column;gap:12px">
        <button class="btn btn-primary" style="padding:18px;font-size:1rem;justify-content:flex-start;gap:14px"
          onclick="window._navigate('challenge')">
          <span style="font-size:1.6rem">🌐</span>
          <div style="text-align:left">
            <div style="font-weight:800">Sfida Online</div>
            <div style="font-size:.8rem;font-weight:400;opacity:.85">Gioca in tempo reale con un amico su un altro dispositivo</div>
          </div>
        </button>
        <button class="btn btn-ghost" style="padding:18px;font-size:1rem;justify-content:flex-start;gap:14px"
          onclick="window._showLocalChallenge()">
          <span style="font-size:1.6rem">📱</span>
          <div style="text-align:left">
            <div style="font-weight:800">Sfida Locale</div>
            <div style="font-size:.8rem;font-weight:400;opacity:.85">Stesso dispositivo, a turni — serve un altro profilo</div>
          </div>
        </button>
        <button class="btn btn-ghost" style="padding:18px;font-size:1rem;justify-content:flex-start;gap:14px"
          onclick="window._navigate('class-challenge')">
          <span style="font-size:1.6rem">🏫</span>
          <div style="text-align:left">
            <div style="font-weight:800">Sfida di Classe</div>
            <div style="font-size:.8rem;font-weight:400;opacity:.85">Entra nella sfida creata dall'insegnante con il codice</div>
          </div>
        </button>
      </div>
    </div>`);
};

window._showLocalChallenge = async () => {
  const profiles = await api.getProfiles();
  const others = profiles.filter(p => p.id !== currentProfileId);

  if (others.length === 0) {
    render(`
      <button class="nav-back" onclick="window._showChallenge()">← Indietro</button>
      <div class="card" style="text-align:center">
        <div style="font-size:3rem;margin-bottom:12px">📱</div>
        <h2>Sfida Locale</h2>
        <p style="color:var(--muted);margin:16px 0">Serve almeno un altro profilo per sfidarsi!<br>Creane uno dalla schermata iniziale.</p>
        <div class="btn-group"><button class="btn btn-ghost" onclick="window._navigate('home')">🏠 Menu</button></div>
      </div>`);
    return;
  }

  render(`
    <button class="nav-back" onclick="window._showChallenge()">← Indietro</button>
    <div class="card" style="text-align:center;max-width:440px;margin:0 auto">
      <div style="font-size:3rem;margin-bottom:8px">📱</div>
      <h2 style="margin-bottom:4px">Sfida Locale</h2>
      <p style="color:var(--muted);margin-bottom:16px">Stesse domande, chi fa meglio vince!</p>
      <div style="text-align:left;margin-bottom:16px">
        <div class="setting-row"><label>👤 Sfida contro:</label>
          <select id="challenge-opponent">
            ${others.map(p => `<option value="${p.id}">${esc(p.name)}</option>`).join('')}
          </select>
        </div>
        <div class="setting-row"><label>📂 Categoria:</label>
          <select id="challenge-category">
            ${CATS.map(c => `<option value="${c.id}">${c.ic} ${c.nm}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="window._launchChallenge()">Inizia la Sfida! ⚔️</button>
      </div>
    </div>`);
};

window._launchChallenge = () => {
  const opponentId = document.getElementById('challenge-opponent')?.value;
  const category   = document.getElementById('challenge-category')?.value;
  if (!opponentId || !category) return;
  startChallenge(currentProfileId, opponentId, category);
};

window._editAvatar = () => {
  const cfg = parseAvatar(currentProfile.avatar) || defaultConfig();
  function rerender() {
    const container = document.getElementById('avb-container');
    if (container) container.innerHTML = renderAvatarBuilder(cfg, (newCfg) => {
      Object.assign(cfg, newCfg);
      rerender();
    });
  }
  render(`
    <button class="nav-back" onclick="window._navigate('home')">← Menu</button>
    <div class="card" style="max-width:440px;margin:16px auto;text-align:center">
      <h2 style="margin-bottom:16px">🎨 Modifica il tuo Avatar</h2>
      <div id="avb-container"></div>
      <div class="btn-group" style="margin-top:16px">
        <button class="btn btn-primary" onclick="window._saveAvatar()">✅ Salva</button>
        <button class="btn btn-ghost" onclick="window._navigate('home')">Annulla</button>
      </div>
    </div>`);
  window._avbCfgRef = cfg;
  rerender();
};

window._saveAvatar = async () => {
  const cfg = window._avbCfgRef;
  await api.updateProfile(currentProfileId, { avatar: JSON.stringify(cfg), color: cfg.bg });
  showHome();
};

// ══════════════════════════════════════
// CATEGORY SCREEN
// ══════════════════════════════════════
function showCategory(catId) {
  const cat = CATS.find(c => c.id === catId);
  if (!cat) return showHome();
  const lessons = LESSONS[catId] || [];
  const lessonBanner = lessons.length > 0 ? `
    <div class="lesson-banner" onclick="window._openLesson('${catId}',0)">
      <span>📖</span>
      <span>Ripassa prima di giocare: <strong>${lessons[0].title}</strong></span>
      <span>→</span>
    </div>` : '';
  render(`
    <button class="nav-back" onclick="window._navigate('home')">← Menu</button>
    <div style="text-align:center;margin-bottom:14px">
      <span style="font-size:2.4rem">${cat.ic}</span>
      <h2>${cat.nm}</h2>
      <p style="color:var(--muted);font-size:.9rem">${cat.ds}</p>
    </div>
    ${lessonBanner}
    <div class="modes-grid">
      ${cat.modes.map(m => `
        <div class="mode-card" onclick="window._startGame('${catId}','${m.id}')">
          <div class="mode-icon">${m.ic}</div>
          <div class="mode-name">${m.nm}</div>
          <div class="mode-desc">${m.ds}</div>
          <div class="mode-tag">${m.tg}</div>
        </div>`).join('')}
    </div>`);
}

window._startGame = (cat, mode) => startGame(cat, mode);

// ══════════════════════════════════════
// SETTINGS
// ══════════════════════════════════════
function showSettings() {
  const s = currentProfile;
  render(`
    <button class="nav-back" onclick="window._navigate('home')">← Menu</button>
    <div class="card">
      <h2 style="margin-bottom:18px">⚙️ Impostazioni</h2>
      <div class="setting-row"><label>📊 Difficoltà</label>
        <div class="diff-buttons">
          <button class="diff-btn easy ${s.difficulty==='facile'?'active':''}" onclick="window._setDiff('facile',this)">🌱 Facile</button>
          <button class="diff-btn med ${s.difficulty==='medio'?'active':''}" onclick="window._setDiff('medio',this)">🌿 Medio</button>
          <button class="diff-btn hard ${s.difficulty==='difficile'?'active':''}" onclick="window._setDiff('difficile',this)">🌳 Difficile</button>
        </div>
      </div>
      <div class="setting-row"><label>🔢 Domande</label>
        <select onchange="window._updateSetting('questions_count',+this.value)">${[5,10,15,20].map(n=>`<option value="${n}" ${s.questions_count===n?'selected':''}>${n}</option>`).join('')}</select></div>
      <div class="setting-row"><label>⏱️ Timer</label>
        <select onchange="window._updateSetting('timer_seconds',+this.value)">${[0,15,20,30,45].map(n=>`<option value="${n}" ${s.timer_seconds===n?'selected':''}>${n?n+'s':'Nessuno'}</option>`).join('')}</select></div>
      <div class="setting-row"><label>🎯 Tipo risposta</label>
        <select onchange="window._updateSetting('answer_type',this.value)">
          <option value="multiple" ${s.answer_type==='multiple'?'selected':''}>Scelta multipla</option>
          <option value="text" ${s.answer_type==='text'?'selected':''}>Testo libero</option>
          <option value="mix" ${s.answer_type==='mix'?'selected':''}>Misto</option></select></div>
      <div style="border-top:2px solid var(--border);padding-top:16px;margin-top:16px">
        <h3 style="margin-bottom:12px">♿ Accessibilità</h3>
        <div class="toggle-row">
          <button class="toggle ${s.dyslexia_mode?'on':''}" onclick="this.classList.toggle('on');window._updateSetting('dyslexia_mode',this.classList.contains('on')?1:0)"></button>
          <span style="font-weight:700">Modalità Dislessia</span><span style="font-size:.76rem;color:var(--muted)">(Lexend + spaziatura)</span></div>
        <div class="toggle-row">
          <button class="toggle ${s.large_text?'on':''}" onclick="this.classList.toggle('on');window._updateSetting('large_text',this.classList.contains('on')?1:0)"></button>
          <span style="font-weight:700">Testo Grande</span></div>
        <div class="toggle-row">
          <button class="toggle ${s.uppercase_text?'on':''}" onclick="this.classList.toggle('on');window._updateSetting('uppercase_text',this.classList.contains('on')?1:0)"></button>
          <span style="font-weight:700">Testo Maiuscolo</span><span style="font-size:.76rem;color:var(--muted)">(per chi ha difficoltà di lettura)</span></div>
      </div>
      <div class="btn-group"><button class="btn btn-primary" onclick="window._navigate('home')">✅ Fatto</button></div>
    </div>`);
}

window._setDiff = async (d, btn) => {
  await api.updateProfile(currentProfileId, { difficulty: d });
  currentProfile.difficulty = d;
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
};

window._updateSetting = async (key, value) => {
  await api.updateProfile(currentProfileId, { [key]: value });
  currentProfile[key] = value;
  applyAccessibility();
};

// ══════════════════════════════════════
// BADGES
// ══════════════════════════════════════
function showBadges() {
  const badges = currentProfile.badges || [];
  render(`
    <button class="nav-back" onclick="window._navigate('home')">← Menu</button>
    <div class="card"><h2 style="margin-bottom:16px">🏅 Traguardi</h2>
    <div class="badges-grid">
      ${BADGES.map(b => {
        const earned = badges.includes(b.id);
        return `<div class="badge-item ${earned ? 'earned' : 'locked'}"><span class="badge-icon">${b.ic}</span><div class="badge-name">${b.nm}</div><div class="badge-desc">${b.ds}</div></div>`;
      }).join('')}
    </div></div>`);
}

// ══════════════════════════════════════
// CUSTOM QUESTIONS
// ══════════════════════════════════════
async function showCustomQ() {
  const questions = await api.getCustomQuestions();
  render(`
    <button class="nav-back" onclick="window._navigate('home')">← Menu</button>
    <div class="card">
      <h2 style="margin-bottom:14px">✏️ Domande Personalizzate</h2>
      <div class="setting-row"><label>Categoria</label><select id="cq-cat">${CATS.map(c => `<option value="${c.id}">${c.ic} ${c.nm}</option>`).join('')}</select></div>
      <div class="setting-row"><label>Domanda</label><input type="text" id="cq-q" placeholder="Scrivi..."></div>
      <div class="setting-row"><label>Risposta corretta</label><input type="text" id="cq-a" placeholder="Risposta..."></div>
      <div class="setting-row"><label>Risposte sbagliate (una per riga)</label><textarea id="cq-w" placeholder="Sbagliata 1&#10;Sbagliata 2&#10;Sbagliata 3"></textarea></div>
      <div class="setting-row"><label>Suggerimento</label><input type="text" id="cq-h" placeholder="Opzionale..."></div>
      <div class="btn-group"><button class="btn btn-mint" onclick="window._addCQ()">➕ Aggiungi</button></div>
      <div style="margin-top:18px;border-top:2px solid var(--border);padding-top:14px">
        <h3>Salvate (${questions.length})</h3>
        <div id="cq-list">${renderCQList(questions)}</div>
      </div>
      <div class="btn-group" style="margin-top:14px">
        <button class="btn btn-ghost btn-sm" onclick="window._exportCQ()">📤 Esporta</button>
        <button class="btn btn-ghost btn-sm" onclick="document.getElementById('import-file').click()">📥 Importa</button>
        <input type="file" id="import-file" accept=".json" style="display:none" onchange="window._importCQ(this)">
      </div>
    </div>`);
}

function renderCQList(questions) {
  if (!questions.length) return '<p style="color:var(--muted);text-align:center;font-size:.85rem">Nessuna domanda</p>';
  return questions.map(q => `
    <div class="cq-item">
      <span>${CATS.find(c => c.id === q.category)?.ic || '❓'}</span>
      <span class="cq-question">${esc(q.question)}</span>
      <span class="cq-answer">✓ ${esc(q.answer)}</span>
      <button class="delete-btn" onclick="window._deleteCQ(${q.id})">🗑️</button>
    </div>`).join('');
}

window._addCQ = async () => {
  const q = document.getElementById('cq-q')?.value.trim();
  const a = document.getElementById('cq-a')?.value.trim();
  const w = document.getElementById('cq-w')?.value.trim().split('\n').map(s => s.trim()).filter(s => s);
  const h = document.getElementById('cq-h')?.value.trim();
  const cat = document.getElementById('cq-cat')?.value;
  if (!q || !a || w.length < 2) { alert('Compila tutto!'); return; }
  await api.addCustomQuestion({ category: cat, question: q, answer: a, wrongAnswers: w, hint: h });
  showCustomQ();
};

window._deleteCQ = async (id) => { if (confirm('Eliminare?')) { await api.deleteCustomQuestion(id); showCustomQ(); } };

window._exportCQ = async () => {
  const data = await api.getCustomQuestions();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'domande.json'; a.click();
};

window._importCQ = async (input) => {
  const file = input.files[0]; if (!file) return;
  const text = await file.text();
  try {
    const data = JSON.parse(text);
    if (Array.isArray(data)) {
      for (const q of data) await api.addCustomQuestion(q);
      alert(`✅ ${data.length} domande importate!`);
      showCustomQ();
    }
  } catch (e) { alert('File non valido!'); }
  input.value = '';
};

// ══════════════════════════════════════
// ADMIN PANEL
// ══════════════════════════════════════
window._adminLogin = () => {
  const overlay = document.createElement('div');
  overlay.className = 'pin-overlay'; overlay.id = 'pin-overlay';
  overlay.innerHTML = `
    <div class="pin-box">
      <h3>🔒 Admin</h3>
      <p style="font-size:.85rem;color:var(--muted);margin-bottom:14px">Inserisci il PIN admin</p>
      <input type="password" class="pin-input" id="pin-input" maxlength="20" onkeydown="if(event.key==='Enter')window._verifyPin()">
      <p id="pin-error" style="color:#FF6B6B;font-size:.8rem;min-height:18px;margin:4px 0"></p>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm" onclick="window._verifyPin()">Accedi</button>
        <button class="btn btn-ghost btn-sm" onclick="document.getElementById('pin-overlay').remove()">Annulla</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  setTimeout(() => document.getElementById('pin-input')?.focus(), 80);
};

window._verifyPin = async () => {
  const pin = document.getElementById('pin-input')?.value;
  const errEl = document.getElementById('pin-error');
  if (errEl) errEl.textContent = '';
  try {
    const result = await api.verifyPin(pin);
    if (result.valid) { document.getElementById('pin-overlay')?.remove(); showAdmin(); }
    else if (errEl) errEl.textContent = 'PIN errato!';
    else alert('PIN errato!');
  } catch (e) {
    const msg = e.message || 'Errore di accesso';
    if (errEl) errEl.textContent = msg;
    else alert(msg);
  }
};

let _cqAbbinaCoppie = 4; // coppie abbina visibili nel form (si resetta a ogni showAdmin)

async function showAdmin() {
  _cqAbbinaCoppie = 4; // reset coppie abbina ad ogni apertura
  // Parallelizzate: erano 3 round-trip sequenziali
  const [stats, errors, customContent] = await Promise.all([
    api.getAdminStats(),
    api.getAllErrors('all', 50),
    api.getAllCustomContent().catch(() => [])
  ]);
  render(`
    <button class="nav-back" onclick="window._goProfiles()">← Profili</button>
    <h2 style="margin-bottom:14px">📊 Pannello Admin</h2>
    <div class="admin-tabs">
      <button class="admin-tab active" onclick="window._switchTab('overview',this)">📈 Panoramica</button>
      <button class="admin-tab" onclick="window._switchTab('errors',this)">❌ Errori</button>
      <button class="admin-tab" onclick="window._switchTab('progress',this)">📊 Progressi</button>
      <button class="admin-tab" onclick="window._switchTab('domande',this)">✏️ Domande</button>
      <button class="admin-tab" onclick="window._switchTab('manage',this)">⚙️ Gestione</button>
      <button class="admin-tab" onclick="window._switchTab('classChallenge',this)">🏫 Sfida</button>
    </div>

    <div class="admin-panel active" id="panel-overview">
      ${stats.map(p => {
          const avCfg = parseAvatar(p.avatar);
          return `
        <div class="card" style="margin-bottom:12px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
            <div class="avatar-inline">${avatarHTML(avCfg, 42)}</div>
            <div><div style="font-weight:700">${esc(p.name)}</div>
              <div style="font-size:.78rem;color:var(--muted)">Lv.${p.level} · ${p.xp}XP · ${p.games_played} partite · 🔥${p.best_streak}</div></div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${CATS.map(c => {
              const sc = (p.category_scores || []).find(s => s.category === c.id);
              const ec = (p.errorsByCategory || []).find(e => e.category === c.id);
              return `<div style="flex:1;min-width:75px;padding:8px;background:${c.cl[0]}06;border-radius:8px;text-align:center;font-size:.76rem">
                <div>${c.ic}</div><div style="font-weight:700">${c.nm}</div>
                ${sc ? `<div>${sc.best_score}%</div>` : '<div style="color:var(--muted)">—</div>'}
                ${ec ? `<div style="color:var(--coral);font-weight:700">${ec.count} err</div>` : ''}
              </div>`;
            }).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>

    <div class="admin-panel" id="panel-errors">
      <div class="card">
        <h3 style="margin-bottom:12px">❌ Registro Errori (ultimi 50)</h3>
        ${errors.length ? `<div style="overflow-x:auto"><table class="data-table">
          <thead><tr><th>👤</th><th>Data</th><th>Cat.</th><th>Domanda</th><th>Risposta</th><th>Corretta</th></tr></thead>
          <tbody>${errors.map(e => {
            const c = CATS.find(x => x.id === e.category);
            return `<tr><td><span class="avatar-inline" style="vertical-align:middle">${avatarHTML(parseAvatar(e.profile_avatar), 22)}</span> ${esc(e.profile_name || '')}</td>
              <td style="font-size:.76rem;white-space:nowrap">${new Date(e.created_at).toLocaleDateString('it')}</td>
              <td>${c ? c.ic : '?'}</td>
              <td style="max-width:160px;font-size:.8rem">${esc(e.question)}</td>
              <td style="color:var(--coral);font-weight:600;font-size:.8rem">${esc(e.user_answer)}</td>
              <td style="color:var(--mint);font-weight:600;font-size:.8rem">${esc(e.correct_answer)}</td></tr>`;
          }).join('')}</tbody></table></div>` : '<p style="color:var(--muted);text-align:center">Nessun errore 🎉</p>'}
      </div>
    </div>

    <div class="admin-panel" id="panel-progress">
      <div class="card">
        <h3 style="margin-bottom:12px">📊 Progressi</h3>
        ${stats.map(p => {
          const weakest = CATS.reduce((a, b) => {
            const ae = (p.errorsByCategory || []).find(e => e.category === a.id)?.count || 0;
            const be = (p.errorsByCategory || []).find(e => e.category === b.id)?.count || 0;
            return ae > be ? a : b;
          });
          return `<div style="margin-bottom:18px;padding-bottom:18px;border-bottom:2px solid var(--border)">
            <div style="font-weight:700;margin-bottom:8px"><span class="avatar-inline" style="vertical-align:middle">${avatarHTML(parseAvatar(p.avatar), 28)}</span> ${esc(p.name)}</div>
            ${CATS.map(c => {
              const sc = (p.category_scores || []).find(s => s.category === c.id);
              const pct = sc ? sc.best_score : 0;
              return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                <span style="min-width:80px;font-size:.8rem;font-weight:600">${c.ic} ${c.nm}</span>
                <div style="flex:1;height:16px;background:var(--border);border-radius:8px;overflow:hidden">
                  <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,${c.cl[0]},${c.cl[1]});border-radius:8px"></div>
                </div>
                <span style="min-width:35px;font-weight:700;font-size:.8rem;text-align:right">${pct}%</span>
              </div>`;
            }).join('')}
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="admin-panel" id="panel-domande">
      <div class="card">
        <h3 style="margin-bottom:14px">✏️ Aggiungi Domanda</h3>

        <!-- Categoria e difficoltà -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px">
          <select id="cq-cat" class="input" style="flex:2;min-width:160px" onchange="window._cqCatChange()">
            <option value="grammatica">📐 Grammatica</option>
            <option value="vocabolario">📚 Vocabolario</option>
            <option value="verbi">🔤 Verbi</option>
            <option value="ortografia">✍️ Ortografia</option>
            <option value="comprensione">📖 Comprensione</option>
            <option value="analisi">🔬 Analisi</option>
            <option value="produzione">✒️ Produzione</option>
          </select>
          <select id="cq-diff" class="input" style="flex:1;min-width:110px">
            <option value="facile">🟢 Facile</option>
            <option value="medio">🟡 Medio</option>
            <option value="difficile">🔴 Difficile</option>
          </select>
        </div>

        <!-- Tipo: aggiornato dinamicamente da _cqCatChange -->
        <div id="cq-type-row" style="margin-bottom:14px">
          <select id="cq-type" class="input" style="width:100%" onchange="window._cqTypeChange()">
            <option value="quiz">📝 Quiz (scelta multipla)</option>
          </select>
        </div>

        <!-- Campi quiz (scelta multipla) -->
        <div id="cq-form-quiz">
          <div class="setting-row"><label>Domanda</label><input type="text" id="cq-q-domanda" class="input" placeholder="Testo della domanda..."></div>
          <div class="setting-row"><label>Risposta corretta</label><input type="text" id="cq-q-corretta" class="input" placeholder="Risposta giusta..."></div>
          <div class="setting-row"><label>Sbagliata 1</label><input type="text" id="cq-q-w1" class="input" placeholder="Risposta sbagliata 1..."></div>
          <div class="setting-row"><label>Sbagliata 2</label><input type="text" id="cq-q-w2" class="input" placeholder="Risposta sbagliata 2..."></div>
          <div class="setting-row"><label>Sbagliata 3</label><input type="text" id="cq-q-w3" class="input" placeholder="Risposta sbagliata 3..."></div>
          <div class="setting-row"><label>Suggerimento <span style="font-weight:400;color:var(--muted)">(facoltativo)</span></label><input type="text" id="cq-q-hint" class="input" placeholder="Es: pensa al soggetto..."></div>
          <div class="setting-row"><label>Spiegazione <span style="font-weight:400;color:var(--muted)">(facoltativa)</span></label><input type="text" id="cq-q-spiega" class="input" placeholder="Mostrata dopo la risposta..."></div>
        </div>

        <!-- Campi vero/falso (solo comprensione) -->
        <div id="cq-form-vf" style="display:none">
          <div class="setting-row"><label>Affermazione</label><input type="text" id="cq-vf-testo" class="input" placeholder="Es: Il cane è un animale domestico..."></div>
          <div class="setting-row"><label>È vera?</label>
            <select id="cq-vf-risposta" class="input" style="max-width:160px">
              <option value="Vero">✅ Vero</option>
              <option value="Falso">❌ Falso</option>
            </select>
          </div>
          <div class="setting-row"><label>Spiegazione <span style="font-weight:400;color:var(--muted)">(facoltativa)</span></label><input type="text" id="cq-vf-spiega" class="input" placeholder="Mostrata dopo la risposta..."></div>
        </div>

        <!-- Campi abbina coppie (solo vocabolario) -->
        <div id="cq-form-abbina" style="display:none">
          <div class="setting-row"><label>Titolo esercizio</label><input type="text" id="cq-ab-titolo" class="input" placeholder="Es: Abbina la parola al suo contrario..."></div>
          <div id="cq-ab-coppie">
            ${[1,2,3,4].map(i => `
            <div style="display:flex;gap:6px;margin-bottom:6px">
              <input type="text" id="cq-ab-l${i}" class="input" style="flex:1" placeholder="Parola ${i}...">
              <span style="align-self:center;font-size:1.2rem">→</span>
              <input type="text" id="cq-ab-r${i}" class="input" style="flex:1" placeholder="Significato / contrario ${i}...">
            </div>`).join('')}
          </div>
          <button class="btn btn-ghost btn-sm" style="margin-bottom:8px" onclick="window._cqAddCoppia()">+ Aggiungi coppia</button>
        </div>

        <div style="margin-top:8px">
          <button class="btn btn-primary" onclick="window._cqSave()">💾 Salva Domanda</button>
        </div>
      </div>

      <!-- Generazione con AI -->
      <div class="card" style="margin-top:14px">
        <h3 style="margin-bottom:4px">🤖 Genera con AI</h3>
        <p style="color:var(--muted);font-size:.82rem;margin-bottom:14px">Scrivi un argomento e Claude genererà le domande automaticamente</p>
        <div class="setting-row">
          <label>🎯 Argomento</label>
          <input type="text" id="ai-topic" class="input" placeholder="Es: il passato prossimo, gli aggettivi possessivi, i sinonimi...">
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px">
          <select id="ai-cat" class="input" style="flex:2;min-width:150px">
            ${CATS.map(c => `<option value="${c.id}">${c.ic} ${c.nm}</option>`).join('')}
          </select>
          <select id="ai-diff" class="input" style="flex:1;min-width:110px">
            <option value="facile">🟢 Facile</option>
            <option value="medio">🟡 Medio</option>
            <option value="difficile">🔴 Difficile</option>
          </select>
          <select id="ai-count" class="input" style="flex:1;min-width:100px">
            <option value="5">5 domande</option>
            <option value="8">8 domande</option>
            <option value="10" selected>10 domande</option>
          </select>
        </div>
        <button class="btn btn-primary" onclick="window._aiGenerate()" id="ai-gen-btn">✨ Genera Domande</button>
        <div id="ai-error" style="color:var(--coral);font-size:.85rem;margin-top:8px;min-height:18px"></div>
        <div id="ai-preview" style="margin-top:12px"></div>
      </div>

      <!-- Lista domande personalizzate -->
      <div class="card" style="margin-top:14px">
        <h3 style="margin-bottom:12px">📋 Domande Personalizzate (${customContent.length})</h3>
        ${customContent.length === 0
          ? '<p style="color:var(--muted);text-align:center">Nessuna domanda personalizzata ancora</p>'
          : customContent.map(item => {
              let preview = '';
              try {
                const d = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
                if (item.game_type === 'quiz') preview = esc(d.q || d.domanda || '');
                else if (item.game_type === 'vf') preview = esc(d.testo || '');
                else if (item.game_type === 'abbina') preview = esc(d.titolo || 'Abbinamento');
              } catch(_) { preview = '—'; }
              const typeIcon = item.game_type === 'quiz' ? '📝' : item.game_type === 'vf' ? '✅' : '🔗';
              const catLabel = CATS.find(c => c.id === item.category)?.nm || item.category;
              return `<div style="display:flex;align-items:center;gap:8px;padding:8px;margin-bottom:6px;background:rgba(177,151,252,.04);border-radius:8px;border:1px solid var(--border)">
                <span style="font-size:1.1rem">${typeIcon}</span>
                <div style="flex:1;min-width:0">
                  <div style="font-weight:600;font-size:.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${preview}</div>
                  <div style="font-size:.74rem;color:var(--muted)">${catLabel} · ${item.difficulty} · ${new Date(item.created_at).toLocaleDateString('it')}</div>
                </div>
                <button class="btn btn-coral btn-sm" onclick="window._cqDelete(${item.id})">🗑️</button>
              </div>`;
            }).join('')}
      </div>
    </div>

    <div class="admin-panel" id="panel-classChallenge">
      <div class="card" style="margin-bottom:14px">
        <h3 style="margin-bottom:14px">🏫 Crea Sfida di Classe</h3>
        <div class="setting-row">
          <label>📌 Titolo</label>
          <input type="text" id="cc-title" class="input" placeholder="Es: Prova di Grammatica" maxlength="60">
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px">
          <select id="cc-cat" class="input" style="flex:2;min-width:160px">
            ${CATS.map(c => `<option value="${c.id}">${c.ic} ${c.nm}</option>`).join('')}
          </select>
          <select id="cc-diff" class="input" style="flex:1;min-width:110px">
            <option value="facile">🟢 Facile</option>
            <option value="medio">🟡 Medio</option>
            <option value="difficile">🔴 Difficile</option>
          </select>
          <select id="cc-count" class="input" style="flex:1;min-width:100px">
            <option value="5">5 domande</option>
            <option value="10" selected>10 domande</option>
            <option value="15">15 domande</option>
            <option value="20">20 domande</option>
          </select>
        </div>
        <button class="btn btn-primary" onclick="window._createClassChallenge()">🎲 Crea Stanza</button>
        <div id="cc-create-error" style="color:var(--coral);font-size:.85rem;margin-top:8px;min-height:18px"></div>
      </div>

      <div class="card" id="cc-room-section" style="display:none;margin-bottom:14px">
        <div style="text-align:center">
          <p style="color:var(--muted);font-size:.82rem;margin-bottom:8px">Scrivi questo codice alla lavagna per gli alunni</p>
          <div class="class-code-display" id="cc-code-display">——————</div>
        </div>
        <div style="margin:14px 0">
          <div style="font-weight:700;font-size:.88rem;margin-bottom:8px;color:var(--muted)">👥 Partecipanti</div>
          <div id="cc-participants" style="min-height:40px"></div>
        </div>
        <div class="btn-group" style="justify-content:flex-start;flex-wrap:wrap">
          <button class="btn btn-primary" id="cc-start-btn" onclick="window._startClassChallenge()">▶ Avvia Sfida</button>
          <button class="btn btn-coral" id="cc-end-btn" style="display:none" onclick="window._endClassChallenge()">⏹ Termina Sfida</button>
          <button class="btn btn-ghost" onclick="window._closeClassRoom()">🗑 Chiudi Stanza</button>
        </div>
      </div>

      <div class="card" id="cc-live-board" style="display:none;margin-bottom:14px">
        <h4 style="margin-bottom:10px">📊 Classifica Live</h4>
        <div id="cc-live-list"></div>
      </div>

      <div class="card" id="cc-results" style="display:none">
        <h4 style="margin-bottom:10px">🏆 Risultati Finali</h4>
        <div id="cc-results-list"></div>
        <div class="btn-group" style="justify-content:flex-start;margin-top:14px">
          <button class="btn btn-ghost btn-sm" onclick="window._resetClassChallenge()">🔄 Nuova Sfida</button>
        </div>
      </div>
    </div>

    <div class="admin-panel" id="panel-manage">
      <div class="card">
        <h3 style="margin-bottom:12px">⚙️ Gestione</h3>
        <div class="setting-row"><label>🔑 Nuovo PIN</label><input type="password" id="new-pin" maxlength="6" placeholder="..."></div>
        <div class="btn-group" style="justify-content:flex-start"><button class="btn btn-primary btn-sm" onclick="window._changePin()">Salva PIN</button></div>
        <div style="margin-top:16px;border-top:2px solid var(--border);padding-top:14px"><h3>👤 Profili</h3>
          ${stats.map(p => `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;padding:8px;background:rgba(177,151,252,.03);border-radius:8px">
            <span class="avatar-inline">${avatarHTML(parseAvatar(p.avatar), 28)}</span><span style="flex:1;font-weight:700">${esc(p.name)}</span>
            <button class="btn btn-ghost btn-sm" onclick="window._clearProfileErrors('${p.id}')">🧹 Errori</button>
            <button class="btn btn-coral btn-sm" onclick="window._deleteProfileAdmin('${p.id}')">🗑️</button>
          </div>`).join('')}
        </div>
        <div style="margin-top:16px;border-top:2px solid var(--border);padding-top:14px">
          <h3 style="margin-bottom:10px">🤖 Impostazioni AI</h3>
          <p style="font-size:.82rem;color:var(--muted);margin-bottom:10px">Inserisci la tua chiave API Anthropic per usare la generazione automatica di domande. La chiave viene salvata solo sul server.</p>
          <div class="setting-row"><label>🔑 Chiave API Anthropic</label><input type="password" id="ai-api-key" class="input" placeholder="sk-ant-..."></div>
          <div class="btn-group" style="justify-content:flex-start"><button class="btn btn-primary btn-sm" onclick="window._saveApiKey()">Salva Chiave</button></div>
        </div>
        <div style="margin-top:16px;border-top:2px solid var(--border);padding-top:14px"><h3>📦 Backup</h3>
          <div class="btn-group" style="justify-content:flex-start">
            <button class="btn btn-mint btn-sm" onclick="window._exportAll()">📤 Esporta</button>
            <button class="btn btn-ghost btn-sm" onclick="document.getElementById('import-all').click()">📥 Importa</button>
            <input type="file" id="import-all" accept=".json" style="display:none" onchange="window._importAll(this)">
          </div>
        </div>
      </div>
    </div>`);
}

window._switchTab = (tab, btn) => {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-' + tab)?.classList.add('active');
};

window._changePin = async () => {
  const pin = document.getElementById('new-pin')?.value.trim();
  if (!pin || pin.length < 4) { alert('Almeno 4 caratteri!'); return; }
  try {
    await api.changePin(pin);
    alert('✅ PIN aggiornato! Effettua nuovamente l\'accesso.');
    window._goProfiles(); // torna alla schermata profili dopo logout
  } catch (e) {
    alert('Errore: ' + e.message);
  }
};

window._clearProfileErrors = async (id) => { if (confirm('Pulire errori?')) { await api.clearErrors(id); showAdmin(); } };
window._deleteProfileAdmin = async (id) => { if (confirm('⚠️ Eliminare profilo?')) { await api.deleteProfile(id); showAdmin(); } };

// ══════════════════════════════════════
// CUSTOM QUESTIONS (tab Domande admin)
// ══════════════════════════════════════

// Tipi disponibili per categoria (solo quelli supportati dal motore di gioco)
const CQ_TYPES = {
  grammatica:   [{ v: 'quiz',  l: '📝 Quiz (scelta multipla)' }],
  vocabolario:  [{ v: 'quiz',  l: '📝 Quiz (scelta multipla)' }, { v: 'abbina', l: '🔗 Abbina coppie' }],
  verbi:        [{ v: 'quiz',  l: '📝 Quiz (scelta multipla)' }],
  ortografia:   [{ v: 'quiz',  l: '📝 Quiz (scelta multipla)' }],
  comprensione: [{ v: 'quiz',  l: '📝 Quiz (scelta multipla)' }, { v: 'vf', l: '✅ Vero / Falso' }],
  analisi:      [{ v: 'quiz',  l: '📝 Quiz (scelta multipla)' }],
  produzione:   [{ v: 'quiz',  l: '📝 Quiz (scelta multipla)' }],
};

window._cqCatChange = () => {
  const cat = document.getElementById('cq-cat')?.value;
  const typeSelect = document.getElementById('cq-type');
  if (!typeSelect) return;
  const types = CQ_TYPES[cat] || CQ_TYPES.grammatica;
  typeSelect.innerHTML = types.map(t => `<option value="${t.v}">${t.l}</option>`).join('');
  window._cqTypeChange(); // aggiorna il form visibile
};

window._cqTypeChange = () => {
  const t = document.getElementById('cq-type')?.value;
  document.getElementById('cq-form-quiz').style.display   = t === 'quiz'   ? '' : 'none';
  document.getElementById('cq-form-vf').style.display     = t === 'vf'     ? '' : 'none';
  document.getElementById('cq-form-abbina').style.display = t === 'abbina' ? '' : 'none';
};

window._cqAddCoppia = () => {
  _cqAbbinaCoppie++;
  const i = _cqAbbinaCoppie;
  const container = document.getElementById('cq-ab-coppie');
  if (!container) return;
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:6px;margin-bottom:6px';
  row.innerHTML = `<input type="text" id="cq-ab-l${i}" class="input" style="flex:1" placeholder="Sinistra ${i}...">
    <span style="align-self:center;font-size:1.2rem">→</span>
    <input type="text" id="cq-ab-r${i}" class="input" style="flex:1" placeholder="Destra ${i}...">`;
  container.appendChild(row);
};

window._cqSave = async () => {
  const gameType = document.getElementById('cq-type')?.value;
  const category = document.getElementById('cq-cat')?.value;
  const difficulty = document.getElementById('cq-diff')?.value;

  let data;
  if (gameType === 'quiz') {
    const q = document.getElementById('cq-q-domanda')?.value.trim();
    const a = document.getElementById('cq-q-corretta')?.value.trim();
    const w1 = document.getElementById('cq-q-w1')?.value.trim();
    const w2 = document.getElementById('cq-q-w2')?.value.trim();
    const w3 = document.getElementById('cq-q-w3')?.value.trim();
    const hint = document.getElementById('cq-q-hint')?.value.trim();
    const spiega = document.getElementById('cq-q-spiega')?.value.trim();
    if (!q || !a || !w1 || !w2 || !w3) { alert('Compila domanda, risposta corretta e almeno 3 risposte sbagliate.'); return; }
    data = { q, a, w: [w1, w2, w3].filter(Boolean), hint: hint || '', explanation: spiega || '' };
  } else if (gameType === 'vf') {
    const testo = document.getElementById('cq-vf-testo')?.value.trim();
    const risposta = document.getElementById('cq-vf-risposta')?.value;
    const spiega = document.getElementById('cq-vf-spiega')?.value.trim();
    if (!testo) { alert('Scrivi l\'affermazione.'); return; }
    data = { testo, risposta, explanation: spiega || '' };
  } else if (gameType === 'abbina') {
    const titolo = document.getElementById('cq-ab-titolo')?.value.trim() || 'Abbina le coppie';
    const coppie = [];
    for (let i = 1; i <= _cqAbbinaCoppie; i++) {
      const l = document.getElementById(`cq-ab-l${i}`)?.value.trim();
      const r = document.getElementById(`cq-ab-r${i}`)?.value.trim();
      if (l && r) coppie.push({ l, r });
    }
    if (coppie.length < 2) { alert('Inserisci almeno 2 coppie complete.'); return; }
    data = { titolo, coppie };
  }

  try {
    await api.addCustomContent(gameType, category, difficulty, data);
    alert('✅ Domanda salvata!');
    showAdmin();
  } catch (e) {
    alert('Errore: ' + e.message);
  }
};

window._cqDelete = async (id) => {
  if (!confirm('Eliminare questa domanda?')) return;
  try {
    await api.deleteCustomContent(id);
    showAdmin();
  } catch (e) {
    alert('Errore: ' + e.message);
  }
};

window._exportAll = async () => {
  const data = await api.exportAll();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'italiano_backup.json'; a.click();
};

window._importAll = async (input) => {
  const file = input.files[0]; if (!file) return;
  const text = await file.text();
  try {
    const data = JSON.parse(text);
    await api.importAll(data);
    alert('✅ Backup importato! Effettua nuovamente l\'accesso admin.');
    window._goProfiles(); // sessione invalidata dopo import
  } catch (e) { alert('Errore: ' + e.message); }
  input.value = '';
};

// ══════════════════════════════════════
// AI GENERATION
// ══════════════════════════════════════
window._saveApiKey = async () => {
  const key = document.getElementById('ai-api-key')?.value.trim();
  if (!key || !key.startsWith('sk-')) { alert('Inserisci una chiave API valida (inizia con sk-)'); return; }
  try {
    await api.setAdminSetting('anthropic_api_key', key);
    alert('✅ Chiave API salvata!');
    document.getElementById('ai-api-key').value = '';
  } catch(e) { alert('Errore: ' + e.message); }
};

window._aiGenerate = async () => {
  const topic  = document.getElementById('ai-topic')?.value.trim();
  const cat    = document.getElementById('ai-cat')?.value;
  const diff   = document.getElementById('ai-diff')?.value;
  const count  = document.getElementById('ai-count')?.value;
  const errEl  = document.getElementById('ai-error');
  const btn    = document.getElementById('ai-gen-btn');
  const preview = document.getElementById('ai-preview');

  if (!topic) { errEl.textContent = 'Scrivi un argomento prima di generare.'; return; }
  errEl.textContent = '';
  btn.disabled = true;
  btn.textContent = '⏳ Generazione in corso...';
  preview.innerHTML = '';

  try {
    const { questions } = await api.generateQuestions({ category: cat, difficulty: diff, topic, count });
    if (!questions?.length) throw new Error('Nessuna domanda generata');

    preview.innerHTML = `
      <div style="font-weight:700;margin-bottom:10px">✅ ${questions.length} domande generate — seleziona quelle da salvare:</div>
      ${questions.map((q, i) => `
        <div style="padding:10px;border:2px solid var(--border);border-radius:10px;margin-bottom:8px">
          <label style="display:flex;gap:10px;cursor:pointer;align-items:flex-start">
            <input type="checkbox" id="ai-q-${i}" checked style="margin-top:3px;flex-shrink:0">
            <div>
              <div style="font-weight:600;font-size:.9rem">${esc(q.q)}</div>
              <div style="font-size:.8rem;color:var(--mint);margin-top:3px">✅ ${esc(q.a)}</div>
              <div style="font-size:.78rem;color:var(--muted)">${(q.w||[]).map(w => `❌ ${esc(w)}`).join(' · ')}</div>
              ${q.explanation ? `<div style="font-size:.76rem;color:var(--muted);margin-top:2px">💡 ${esc(q.explanation)}</div>` : ''}
            </div>
          </label>
        </div>`).join('')}
      <button class="btn btn-primary btn-sm" style="margin-top:4px" onclick="window._aiSaveSelected()">
        💾 Salva Selezionate
      </button>`;
    // Salviamo i dati in memoria invece di iniettarli in onclick (evita XSS e quoting issues)
    window._aiLastGenerated = { questions, cat, diff };
  } catch(e) {
    errEl.textContent = e.message.includes('non configurata') ? '⚠️ ' + e.message : 'Errore: ' + e.message;
  } finally {
    btn.disabled = false;
    btn.textContent = '✨ Genera Domande';
  }
};

window._aiSaveSelected = async () => {
  const data = window._aiLastGenerated;
  if (!data) { alert('Nessuna domanda da salvare.'); return; }
  const { questions, cat, diff } = data;
  const toSave = questions.filter((_, i) => document.getElementById(`ai-q-${i}`)?.checked);
  if (!toSave.length) { alert('Seleziona almeno una domanda.'); return; }
  let saved = 0;
  for (const q of toSave) {
    try {
      await api.addCustomContent('quiz', cat, diff, { q: q.q, a: q.a, w: q.w || [], hint: q.hint || '', explanation: q.explanation || '' });
      saved++;
    } catch(_) {}
  }
  alert(`✅ ${saved} domanda/e salvate!`);
  showAdmin();
};

// ══════════════════════════════════════
// SFIDA DI CLASSE — Admin
// ══════════════════════════════════════

// Mappa categoria → banca domande
const _ccBankMap = {
  grammatica:   'gramQuiz',
  vocabolario:  'vocabQuiz',
  verbi:        'verbiQuiz',
  ortografia:   'ortoQuiz',
  comprensione: 'compSignificato',
  analisi:      'analisiQuiz',
  produzione:   'prodRegistro',
};

let _adminCcCode   = null;
let _adminCcSocket = null;
let _adminCcListening = false;

function _getAdminClassSocket() {
  if (!_adminCcSocket || !_adminCcSocket.connected) {
    _adminCcSocket = window.io({ autoConnect: true, reconnectionAttempts: 5 });
  }
  if (!_adminCcListening) {
    _adminCcListening = true;

    _adminCcSocket.on('class-room-update', (room) => {
      // Aggiorna lista partecipanti
      const partEl = document.getElementById('cc-participants');
      if (partEl) {
        partEl.innerHTML = room.participants.length === 0
          ? '<p style="color:var(--muted);font-size:.85rem">Nessun alunno ancora...</p>'
          : room.participants.map(p => `
            <div class="cc-participant-row">
              <span>${p.avatar}</span>
              <span style="font-weight:700;flex:1">${esc(p.name)}</span>
              ${room.state === 'playing' ? `<span style="font-weight:800;color:var(--lav)">${p.score}/${room.total}</span>` : ''}
              ${p.finished ? '<span style="color:var(--mint);font-size:.8rem">✓</span>' : ''}
            </div>`).join('');
      }
      // Aggiorna live board
      const liveEl = document.getElementById('cc-live-list');
      if (liveEl && room.state === 'playing') {
        document.getElementById('cc-live-board').style.display = '';
        liveEl.innerHTML = room.participants
          .slice().sort((a, b) => b.score - a.score)
          .map((p, i) => `
            <div class="cc-participant-row">
              <span style="min-width:24px;font-weight:700;color:var(--muted)">${i + 1}.</span>
              <span>${p.avatar}</span>
              <span style="flex:1;font-weight:700">${esc(p.name)}</span>
              <span style="font-weight:900;color:var(--lav)">${p.score}/${room.total}</span>
              ${p.finished ? '<span style="color:var(--mint);font-size:.8rem">✓</span>' : ''}
            </div>`).join('');
      }
    });

    _adminCcSocket.on('class-ended', ({ leaderboard, title }) => {
      const medals = ['🥇', '🥈', '🥉'];
      const resultsEl = document.getElementById('cc-results');
      const listEl   = document.getElementById('cc-results-list');
      if (resultsEl && listEl) {
        resultsEl.style.display = '';
        listEl.innerHTML = leaderboard.map(e => `
          <div class="cc-participant-row" style="padding:10px 14px">
            <span style="font-size:1.3rem;min-width:30px">${medals[e.rank - 1] || e.rank + '.'}</span>
            <span style="font-size:1.1rem">${e.avatar}</span>
            <span style="font-weight:700;flex:1">${esc(e.name)}</span>
            <span style="font-weight:900;color:var(--lav)">${e.score}/${e.total}</span>
            <span style="color:var(--muted);font-size:.8rem">${e.pct}%</span>
          </div>`).join('');
      }
      // nascondi btn fine, mostra risultati
      const endBtn  = document.getElementById('cc-end-btn');
      const startBtn = document.getElementById('cc-start-btn');
      if (endBtn) endBtn.style.display = 'none';
      if (startBtn) startBtn.style.display = '';
    });

    _adminCcSocket.on('class-error', (msg) => {
      const errEl = document.getElementById('cc-create-error');
      if (errEl) errEl.textContent = msg;
    });
  }
  return _adminCcSocket;
}

window._createClassChallenge = async () => {
  const title = document.getElementById('cc-title')?.value.trim() || 'Sfida di Classe';
  const cat   = document.getElementById('cc-cat')?.value || 'grammatica';
  const diff  = document.getElementById('cc-diff')?.value || 'facile';
  const count = parseInt(document.getElementById('cc-count')?.value) || 10;
  const errEl = document.getElementById('cc-create-error');
  if (errEl) errEl.textContent = '';

  // Recupera domande dalla banca
  const bankName = _ccBankMap[cat] || 'gramQuiz';
  const bank = Q[bankName];
  const pool = bank ? (bank[diff] || bank.facile || []) : [];
  const questions = _shuffle([...pool]).slice(0, count).map(q => ({ q: q.q, a: q.a, w: (q.w || []).slice(0, 3) }));

  if (questions.length === 0) {
    if (errEl) errEl.textContent = 'Nessuna domanda disponibile per questa selezione.';
    return;
  }

  try {
    const { code } = await api.createClassChallenge({ title, questions, category: cat, difficulty: diff });
    _adminCcCode = code;

    // Mostra sezione stanza
    document.getElementById('cc-room-section').style.display = '';
    document.getElementById('cc-code-display').textContent = code;
    document.getElementById('cc-results').style.display = 'none';
    document.getElementById('cc-live-board').style.display = 'none';
    document.getElementById('cc-start-btn').style.display = '';
    document.getElementById('cc-end-btn').style.display = 'none';

    // Connetti socket admin
    const sock = _getAdminClassSocket();
    const adminToken = sessionStorage.getItem('adminToken');
    sock.emit('admin-join-class', { code, adminToken });
  } catch(e) {
    if (errEl) errEl.textContent = 'Errore: ' + e.message;
  }
};

window._startClassChallenge = () => {
  if (!_adminCcCode) return;
  const adminToken = sessionStorage.getItem('adminToken');
  _getAdminClassSocket().emit('start-class-challenge', { code: _adminCcCode, adminToken });
  document.getElementById('cc-start-btn').style.display = 'none';
  document.getElementById('cc-end-btn').style.display = '';
};

window._endClassChallenge = () => {
  if (!_adminCcCode) return;
  const adminToken = sessionStorage.getItem('adminToken');
  _getAdminClassSocket().emit('end-class-challenge', { code: _adminCcCode, adminToken });
  document.getElementById('cc-end-btn').style.display = 'none';
};

window._closeClassRoom = async () => {
  if (!_adminCcCode) return;
  try {
    await api.deleteClassChallenge(_adminCcCode);
  } catch(_) {}
  _adminCcCode = null;
  document.getElementById('cc-room-section').style.display = 'none';
  document.getElementById('cc-live-board').style.display = 'none';
  document.getElementById('cc-results').style.display = 'none';
};

window._resetClassChallenge = () => {
  _adminCcCode = null;
  document.getElementById('cc-room-section').style.display = 'none';
  document.getElementById('cc-live-board').style.display = 'none';
  document.getElementById('cc-results').style.display = 'none';
};

// ══════════════════════════════════════
// INIT
// ══════════════════════════════════════
showProfiles();
