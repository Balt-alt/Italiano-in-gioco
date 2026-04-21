// ══════════════════════════════════════
// MOTORE GIOCHI — MATEMATICA
// ══════════════════════════════════════
import { api } from './api.js';
import { esc, shuffle, launchConfetti } from './utils.js';
import * as QM from './questions-math.js';

// ── Stato ────────────────────────────────────────────────────
let _pid = null, _profile = null, _onNav = null;
let _mg = { cat:'', mode:'', diff:'', qs:[], ci:0, sc:0, tot:0, t0:0, inputMode:false };

export function initMathGames(profileId, profile, navigateFn) {
  _pid = profileId; _profile = profile; _onNav = navigateFn;
}
export function refreshMathProfile(p) { _profile = p; }

// ── Helpers ──────────────────────────────────────────────────
function $el(id) { return document.getElementById(id); }
function ri(html) { document.getElementById('main-content').innerHTML = html; }

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function nearbyWrongs(ans, count = 3) {
  const n = typeof ans === 'string' ? parseFloat(ans.replace(',', '.')) : ans;
  if (isNaN(n)) return ['—', '—', '—'];
  const range = Math.max(3, Math.ceil(Math.abs(n) * 0.18));
  const wrongs = new Set();
  let tries = 0;
  while (wrongs.size < count && tries++ < 80) {
    const d = rand(1, range);
    const sign = Math.random() < 0.5 ? 1 : -1;
    const w = Math.round((n + sign * d) * 100) / 100;
    if (w !== n && w >= 0 && !wrongs.has(w)) wrongs.add(w);
  }
  let i = 1;
  while (wrongs.size < count) wrongs.add(n + (i++));
  return [...wrongs].map(v => String(v).replace('.', ','));
}

function fmtNum(n) { return String(n).replace('.', ','); }

// ══════════════════════════════════════
// GENERATORI PROCEDURALI
// ══════════════════════════════════════

// ── Operazioni: addizione, sottrazione, moltiplicazione, divisione ──
function genOp(diff, forceType) {
  const opPool = {
    facile:    ['+','+','-','-','×'],
    medio:     ['+','-','×','×','÷'],
    difficile: ['+','-','×','÷','+','×'],
  };
  const op = forceType || opPool[diff][rand(0, opPool[diff].length - 1)];

  let a, b, ans, q;
  if (op === '+') {
    const [lo, hi] = { facile:[10,999], medio:[100,9999], difficile:[1000,99999] }[diff];
    a = rand(lo, hi); b = rand(lo, hi); ans = a + b;
    q = `${fmtNum(a)} + ${fmtNum(b)} = ?`;
  } else if (op === '-') {
    const [lo, hi] = { facile:[10,999], medio:[100,9999], difficile:[1000,99999] }[diff];
    a = rand(lo + 20, hi); b = rand(lo, a); ans = a - b;
    q = `${fmtNum(a)} − ${fmtNum(b)} = ?`;
  } else if (op === '×') {
    const [[lo1,hi1],[lo2,hi2]] = { facile:[[2,9],[2,9]], medio:[[10,99],[2,12]], difficile:[[100,999],[2,99]] }[diff];
    a = rand(lo1, hi1); b = rand(lo2, hi2); ans = a * b;
    q = `${fmtNum(a)} × ${fmtNum(b)} = ?`;
  } else {
    const [[lo1,hi1],[lo2,hi2]] = { facile:[[1,9],[2,9]], medio:[[2,12],[2,12]], difficile:[[2,99],[2,12]] }[diff];
    b = rand(lo2, hi2); a = b * rand(lo1, hi1); ans = a / b;
    q = `${fmtNum(a)} ÷ ${fmtNum(b)} = ?`;
  }
  const ansStr = fmtNum(ans);
  return { q, a: ansStr, w: nearbyWrongs(ans) };
}

// ── Geometria: area e perimetro ──────────────────────────────
function genGeo(diff) {
  const shapes = {
    facile:    ['quadrato','rettangolo','quadrato','rettangolo'],
    medio:     ['quadrato','rettangolo','triangolo','rettangolo'],
    difficile: ['quadrato','rettangolo','triangolo','cerchio','rombo','trapezio'],
  };
  const shape = shapes[diff][rand(0, shapes[diff].length - 1)];
  const doArea = Math.random() < 0.5;
  const [lo, hi] = { facile:[2,15], medio:[5,30], difficile:[10,50] }[diff];

  if (shape === 'quadrato') {
    const l = rand(lo, hi);
    if (doArea) {
      const ans = l * l;
      return { q:`Un quadrato ha il lato di ${l} cm. Qual è la sua <strong>area</strong>?`,
               a:`${ans} cm²`, w: nearbyWrongs(ans).map(v=>`${v} cm²`),
               h:'A = l²', x:`A = ${l}² = ${ans} cm²` };
    } else {
      const ans = 4 * l;
      return { q:`Un quadrato ha il lato di ${l} cm. Qual è il suo <strong>perimetro</strong>?`,
               a:`${ans} cm`, w: nearbyWrongs(ans).map(v=>`${v} cm`),
               h:'P = 4 × l', x:`P = 4 × ${l} = ${ans} cm` };
    }
  }
  if (shape === 'rettangolo') {
    const b = rand(lo, hi), h = rand(lo, b);
    if (doArea) {
      const ans = b * h;
      return { q:`Un rettangolo ha base ${b} cm e altezza ${h} cm. Qual è la sua <strong>area</strong>?`,
               a:`${ans} cm²`, w: nearbyWrongs(ans).map(v=>`${v} cm²`),
               h:'A = b × h', x:`A = ${b} × ${h} = ${ans} cm²` };
    } else {
      const ans = 2 * (b + h);
      return { q:`Un rettangolo ha base ${b} cm e altezza ${h} cm. Qual è il suo <strong>perimetro</strong>?`,
               a:`${ans} cm`, w: nearbyWrongs(ans).map(v=>`${v} cm`),
               h:'P = 2 × (b + h)', x:`P = 2 × (${b} + ${h}) = ${ans} cm` };
    }
  }
  if (shape === 'triangolo') {
    const b = rand(lo, hi), h = rand(lo, hi);
    const ans = (b * h) / 2;
    const a1 = rand(lo, hi), a2 = rand(lo, hi);
    const perim = b + a1 + a2;
    if (doArea) {
      return { q:`Un triangolo ha base ${b} cm e altezza ${h} cm. Qual è la sua <strong>area</strong>?`,
               a:`${fmtNum(ans)} cm²`, w: nearbyWrongs(ans).map(v=>`${v} cm²`),
               h:'A = (b × h) / 2', x:`A = (${b} × ${h}) / 2 = ${fmtNum(ans)} cm²` };
    } else {
      return { q:`Un triangolo ha lati ${b} cm, ${a1} cm e ${a2} cm. Qual è il suo <strong>perimetro</strong>?`,
               a:`${perim} cm`, w: nearbyWrongs(perim).map(v=>`${v} cm`),
               h:'P = a + b + c', x:`P = ${b} + ${a1} + ${a2} = ${perim} cm` };
    }
  }
  if (shape === 'cerchio') {
    const r = rand(2, 15);
    const pi = 3.14;
    if (doArea) {
      const ans = Math.round(pi * r * r * 100) / 100;
      return { q:`Un cerchio ha raggio ${r} cm. Qual è la sua <strong>area</strong>? (π ≈ 3,14)`,
               a:`${fmtNum(ans)} cm²`, w: nearbyWrongs(ans).map(v=>`${v} cm²`),
               h:'A = π × r²', x:`A = 3,14 × ${r}² = 3,14 × ${r*r} = ${fmtNum(ans)} cm²` };
    } else {
      const ans = Math.round(2 * pi * r * 100) / 100;
      return { q:`Un cerchio ha raggio ${r} cm. Qual è la <strong>circonferenza</strong>? (π ≈ 3,14)`,
               a:`${fmtNum(ans)} cm`, w: nearbyWrongs(ans).map(v=>`${v} cm`),
               h:'C = 2 × π × r', x:`C = 2 × 3,14 × ${r} = ${fmtNum(ans)} cm` };
    }
  }
  if (shape === 'rombo') {
    const D = rand(lo, hi), d = rand(2, D);
    const ans = (D * d) / 2;
    return { q:`Un rombo ha diagonali di ${D} cm e ${d} cm. Qual è la sua <strong>area</strong>?`,
             a:`${fmtNum(ans)} cm²`, w: nearbyWrongs(ans).map(v=>`${v} cm²`),
             h:'A = (D × d) / 2', x:`A = (${D} × ${d}) / 2 = ${fmtNum(ans)} cm²` };
  }
  if (shape === 'trapezio') {
    const B = rand(lo, hi), b = rand(2, B), h = rand(lo, hi);
    const ans = ((B + b) * h) / 2;
    return { q:`Un trapezio ha base maggiore ${B} cm, base minore ${b} cm e altezza ${h} cm. Qual è la sua <strong>area</strong>?`,
             a:`${fmtNum(ans)} cm²`, w: nearbyWrongs(ans).map(v=>`${v} cm²`),
             h:'A = ((B + b) × h) / 2', x:`A = (${B} + ${b}) × ${h} / 2 = ${fmtNum(ans)} cm²` };
  }
  // fallback
  return genOp(diff);
}

// ── Confronto frazioni ───────────────────────────────────────
function genFrazConfronta(diff) {
  let a1, b1, a2, b2;
  if (diff === 'facile') {
    b1 = b2 = rand(3, 8);
    a1 = rand(1, b1 - 1);
    do { a2 = rand(1, b2 - 1); } while (a2 === a1);
  } else if (diff === 'medio') {
    const opts = [2,3,4,5,6];
    b1 = opts[rand(0, opts.length-1)]; b2 = opts[rand(0, opts.length-1)];
    a1 = rand(1, b1-1); a2 = rand(1, b2-1);
  } else {
    b1 = rand(3, 12); b2 = rand(3, 12);
    a1 = rand(1, b1-1); a2 = rand(1, b2-1);
  }
  const v1 = a1 / b1, v2 = a2 / b2;
  const f1 = `${a1}/${b1}`, f2 = `${a2}/${b2}`;
  let correctAns, wrongs;
  if (Math.abs(v1 - v2) < 0.001) {
    correctAns = 'Sono uguali';
    wrongs = [f1, f2, 'Non si può stabilire'];
  } else {
    correctAns = v1 > v2 ? f1 : f2;
    const wrong1 = v1 > v2 ? f2 : f1;
    wrongs = [wrong1, 'Sono uguali', 'Non si può stabilire'];
  }
  const den = b1 * b2;
  const n1 = a1 * b2, n2 = a2 * b1;
  return {
    q: `Quale frazione è <strong>maggiore</strong>: ${f1} o ${f2}?`,
    a: correctAns,
    w: wrongs,
    h: `Riduci allo stesso denominatore (${den})`,
    x: `${f1} = ${n1}/${den}; ${f2} = ${n2}/${den}. ${n1 > n2 ? f1 : n2 > n1 ? f2 : 'Uguali!'}`
  };
}

// ══════════════════════════════════════
// AVVIO GIOCO
// ══════════════════════════════════════
export function startMathGame(cat, mode, diff) {
  if (mode === 'formulario') { showFormulario(); return; }

  _mg = { cat, mode, diff, qs:[], ci:0, sc:0, tot:10, t0: Date.now(), inputMode: false };

  const N = _mg.tot;
  const pool = diff;

  if (cat === 'operazioni') {
    if (mode === 'calcolo' || mode === 'scrivi') {
      _mg.inputMode = (mode === 'scrivi');
      _mg.qs = Array.from({ length: N }, () => genOp(pool));
    } else if (mode === 'colonna') {
      _mg.inputMode = true;
      _mg.qs = Array.from({ length: 8 }, () => {
        const ops = ['+','-','×'];
        const op = ops[rand(0, ops.length - 1)];
        return genOp(pool, op);
      });
      _mg.tot = _mg.qs.length;
    }
  } else if (cat === 'problemi') {
    const bank = QM.PROBLEMI[pool] || QM.PROBLEMI.facile;
    _mg.qs = shuffle([...bank]).slice(0, Math.min(N, bank.length));
    _mg.tot = _mg.qs.length;
  } else if (cat === 'geometria') {
    if (mode === 'calcola-geo') {
      _mg.qs = Array.from({ length: N }, () => genGeo(pool));
    } else {
      const bank = QM.GEO_QUIZ[pool] || QM.GEO_QUIZ.facile;
      _mg.qs = shuffle([...bank]).slice(0, Math.min(N, bank.length));
      _mg.tot = _mg.qs.length;
    }
  } else if (cat === 'frazioni') {
    if (mode === 'confronta-fraz') {
      _mg.qs = Array.from({ length: N }, () => genFrazConfronta(pool));
    } else {
      const bank = QM.FRAZ_QUIZ[pool] || QM.FRAZ_QUIZ.facile;
      _mg.qs = shuffle([...bank]).slice(0, Math.min(N, bank.length));
      _mg.tot = _mg.qs.length;
    }
  } else if (cat === 'misure') {
    const bank = QM.MISURE_QUIZ[pool] || QM.MISURE_QUIZ.facile;
    _mg.qs = shuffle([...bank]).slice(0, Math.min(N, bank.length));
    _mg.tot = _mg.qs.length;
  } else if (cat === 'decimali') {
    const bank = QM.DEC_QUIZ[pool] || QM.DEC_QUIZ.facile;
    _mg.qs = shuffle([...bank]).slice(0, Math.min(N, bank.length));
    _mg.tot = _mg.qs.length;
  }

  showMathQ();
}

// ══════════════════════════════════════
// GAME LOOP
// ══════════════════════════════════════

function catTag() {
  const tags = {
    operazioni:'🔢 Operazioni', problemi:'📝 Problemi',
    geometria:'📐 Geometria', frazioni:'½ Frazioni',
    misure:'📏 Misure', decimali:'🔟 Decimali',
  };
  return tags[_mg.cat] || '🔢 Matematica';
}

function showMathQ() {
  const q = _mg.qs[_mg.ci];
  if (!q) { showMathResult(); return; }
  const pct = (_mg.ci / _mg.tot) * 100;

  if (_mg.mode === 'colonna') {
    showColonnaQ(q, pct);
  } else if (_mg.inputMode) {
    showInputQ(q, pct);
  } else {
    showMcqQ(q, pct);
  }
}

// ── MCQ ──────────────────────────────────────────────────────
function showMcqQ(q, pct) {
  const opts = shuffle([q.a, ...q.w.slice(0, 3)]);
  ri(`
    <button class="nav-back" onclick="window._mathBack()">← Indietro</button>
    <div class="quiz-area">
      <div class="progress-wrap">
        <div class="progress-bg"><div class="progress-fill" style="width:${pct}%"></div></div>
        <span class="progress-text">${_mg.ci + 1}/${_mg.tot}</span>
      </div>
      <div class="category-tag" style="background:rgba(78,205,196,.12);color:#38BFA7">${catTag()}</div>
      <div class="question-text">${q.q}</div>
      ${q.h ? `<div class="hint-chip">💡 ${esc(q.h)}</div>` : ''}
      <div class="answers-grid">
        ${opts.map(o => `<button class="answer-btn" onclick="window._mathMcqAnswer(this,'${esc(o)}','${esc(q.a)}')">${esc(o)}</button>`).join('')}
      </div>
      <div id="math-feedback"></div>
      <div id="math-next" style="display:none" class="btn-group">
        <button class="btn btn-primary" onclick="window._mathNext()">Avanti ➜</button>
      </div>
    </div>`);
}

window._mathMcqAnswer = (btn, sel, correct) => {
  document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
  const ok = sel === correct;
  btn.classList.add(ok ? 'correct' : 'wrong');
  if (!ok) document.querySelectorAll('.answer-btn').forEach(b => {
    if (b.textContent.trim() === correct) b.classList.add('correct');
  });
  if (ok) _mg.sc++;
  const q = _mg.qs[_mg.ci];
  $el('math-feedback').innerHTML = ok
    ? `<div class="feedback ok">✅ Esatto! ${q.x ? `<div class="explain">${esc(q.x)}</div>` : ''}</div>`
    : `<div class="feedback no">❌ Era: <strong>${esc(correct)}</strong>${q.x ? `<div class="explain">${esc(q.x)}</div>` : ''}</div>`;
  $el('math-next').style.display = 'flex';
  api.updateStreak(_pid, ok).catch(() => {});
};

// ── Input (scrivi) ───────────────────────────────────────────
function showInputQ(q, pct) {
  ri(`
    <button class="nav-back" onclick="window._mathBack()">← Indietro</button>
    <div class="quiz-area">
      <div class="progress-wrap">
        <div class="progress-bg"><div class="progress-fill" style="width:${pct}%"></div></div>
        <span class="progress-text">${_mg.ci + 1}/${_mg.tot}</span>
      </div>
      <div class="category-tag" style="background:rgba(78,205,196,.12);color:#38BFA7">${catTag()}</div>
      <div class="question-text">${q.q}</div>
      ${q.h ? `<div class="hint-chip">💡 ${esc(q.h)}</div>` : ''}
      <div style="display:flex;gap:10px;align-items:stretch;margin-top:16px;max-width:320px">
        <input type="text" id="math-input" class="input" placeholder="Scrivi il risultato…"
          inputmode="decimal"
          style="flex:1;font-size:1.2rem;font-weight:700;text-align:center"
          onkeydown="if(event.key==='Enter')window._mathInputAnswer()">
        <button class="btn btn-primary" onclick="window._mathInputAnswer()">✓</button>
      </div>
      <div id="math-feedback" style="margin-top:10px"></div>
      <div id="math-next" style="display:none" class="btn-group">
        <button class="btn btn-primary" onclick="window._mathNext()">Avanti ➜</button>
      </div>
    </div>`);
  setTimeout(() => $el('math-input')?.focus(), 100);
}

window._mathInputAnswer = () => {
  const inp = $el('math-input');
  if (!inp || inp.disabled) return;
  const val = inp.value.trim().replace(',', '.').toLowerCase();
  const q = _mg.qs[_mg.ci];
  const correct = q.a.replace(',', '.').toLowerCase();
  // tolerate minor numeric equivalence
  const numVal = parseFloat(val), numCorr = parseFloat(correct);
  const ok = val === correct || (!isNaN(numVal) && !isNaN(numCorr) && Math.abs(numVal - numCorr) < 0.001);
  inp.disabled = true;
  inp.style.borderColor = ok ? 'var(--mint)' : 'var(--coral)';
  if (ok) _mg.sc++;
  $el('math-feedback').innerHTML = ok
    ? `<div class="feedback ok">✅ Esatto! ${q.x ? `<div class="explain">${esc(q.x)}</div>` : ''}</div>`
    : `<div class="feedback no">❌ Corretto: <strong>${esc(q.a)}</strong>${q.x ? `<div class="explain">${esc(q.x)}</div>` : ''}</div>`;
  $el('math-next').style.display = 'flex';
  api.updateStreak(_pid, ok).catch(() => {});
};

// ── Colonna ──────────────────────────────────────────────────
function showColonnaQ(q, pct) {
  // parse the operation from q.q (e.g. "1234 + 567 = ?")
  const match = q.q.match(/^([\d\.,]+)\s*([+\-×÷])\s*([\d\.,]+)/);
  let colHtml = '';
  if (match) {
    const [, numa, op, numb] = match;
    const numLen = Math.max(numa.replace(',','').length, numb.replace(',','').length) + 1;
    const pad = (s) => s.padStart(numLen, '\u00a0');
    colHtml = `
      <div class="col-op-box">
        <div class="col-op-row">${pad(numa)}</div>
        <div class="col-op-row col-op-sign"><span class="col-sign">${op}</span>${pad(numb)}</div>
        <div class="col-op-divider"></div>
        <div class="col-op-row col-op-result">?</div>
      </div>`;
  }
  ri(`
    <button class="nav-back" onclick="window._mathBack()">← Indietro</button>
    <div class="quiz-area">
      <div class="progress-wrap">
        <div class="progress-bg"><div class="progress-fill" style="width:${pct}%"></div></div>
        <span class="progress-text">${_mg.ci + 1}/${_mg.tot}</span>
      </div>
      <div class="category-tag" style="background:rgba(78,205,196,.12);color:#38BFA7">📊 In Colonna</div>
      ${colHtml || `<div class="question-text">${q.q}</div>`}
      <div style="display:flex;gap:10px;align-items:stretch;margin-top:16px;max-width:320px">
        <input type="text" id="math-input" class="input" placeholder="Risultato…"
          inputmode="decimal" style="flex:1;font-size:1.2rem;font-weight:700;text-align:center"
          onkeydown="if(event.key==='Enter')window._mathInputAnswer()">
        <button class="btn btn-primary" onclick="window._mathInputAnswer()">✓</button>
      </div>
      <div id="math-feedback" style="margin-top:10px"></div>
      <div id="math-next" style="display:none" class="btn-group">
        <button class="btn btn-primary" onclick="window._mathNext()">Avanti ➜</button>
      </div>
    </div>`);
  setTimeout(() => $el('math-input')?.focus(), 100);
}

window._mathNext = () => {
  _mg.ci++;
  if (_mg.ci >= _mg.qs.length) { showMathResult(); return; }
  showMathQ();
};

window._mathBack = () => _onNav('category', _mg.cat);
window._mathReplay = () => startMathGame(_mg.cat, _mg.mode, _mg.diff);

// ══════════════════════════════════════
// RISULTATO
// ══════════════════════════════════════
async function showMathResult() {
  const { sc, tot, cat, diff } = _mg;
  const pct = tot > 0 ? Math.round((sc / tot) * 100) : 0;
  const perfect = sc === tot;
  const elapsed = Math.round((Date.now() - _mg.t0) / 1000);
  const mins = Math.floor(elapsed / 60), secs = elapsed % 60;
  const timeStr = `${mins > 0 ? mins + 'm ' : ''}${secs}s`;

  let xpEarned = 0;
  try {
    const res = await api.saveGameResult(_pid, `math-${cat}`, sc, tot);
    xpEarned = res?.xpEarned ?? 0;
  } catch (_) {}

  if (perfect) setTimeout(launchConfetti, 300);

  const stars = pct >= 90 ? '⭐⭐⭐' : pct >= 70 ? '⭐⭐' : pct >= 50 ? '⭐' : '😅';
  const msg   = pct === 100 ? 'Perfetto! Sei un campione!' :
                pct >= 80   ? 'Ottimo lavoro!' :
                pct >= 60   ? 'Bene! Continua così.' :
                pct >= 40   ? 'Ci sei quasi, riprova!' : 'Non mollare, riprova!';

  ri(`
    <div id="confetti-box" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:999"></div>
    <div class="quiz-area" style="text-align:center">
      <div style="font-size:3.5rem;margin:16px 0">${stars}</div>
      <h2 style="margin-bottom:4px">${msg}</h2>
      <p style="color:var(--muted);margin-bottom:20px;font-size:.9rem">${esc(catTag())} · ${diff}</p>

      <div class="result-stats-grid">
        <div class="result-stat"><div class="result-stat-val">${sc}/${tot}</div><div class="result-stat-lbl">Corrette</div></div>
        <div class="result-stat"><div class="result-stat-val">${pct}%</div><div class="result-stat-lbl">Precisione</div></div>
        <div class="result-stat"><div class="result-stat-val">+${xpEarned}</div><div class="result-stat-lbl">XP guadagnati</div></div>
        <div class="result-stat"><div class="result-stat-val">${timeStr}</div><div class="result-stat-lbl">Tempo</div></div>
      </div>

      <div class="btn-group" style="justify-content:center;margin-top:20px">
        <button class="btn btn-primary" onclick="window._mathReplay()">🔄 Rigioca</button>
        <button class="btn btn-ghost" onclick="window._onMathNav('category','${cat}')">← Categoria</button>
        <button class="btn btn-ghost" onclick="window._onMathNav('home')">🏠 Menu</button>
      </div>
    </div>`);
}

window._onMathNav = (screen, param) => _onNav(screen, param);

// ══════════════════════════════════════
// FORMULARIO
// ══════════════════════════════════════
function showFormulario() {
  ri(`
    <button class="nav-back" onclick="window._onMathNav('category','geometria')">← Indietro</button>
    <div style="max-width:600px;margin:0 auto">
      <h2 style="text-align:center;margin-bottom:4px">📋 Formulario di Geometria</h2>
      <p style="text-align:center;color:var(--muted);font-size:.88rem;margin-bottom:20px">Formule per le figure piane — 5ª Elementare</p>
      ${QM.FORMULARIO.map(f => `
        <div class="card" style="margin-bottom:14px;border-top:4px solid ${f.cl[0]}">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
            <span style="font-size:2rem">${f.ic}</span>
            <div>
              <div style="font-weight:800;font-size:1.05rem">${esc(f.nm)}</div>
              <div style="font-size:.78rem;color:var(--muted)">${f.props.join(' · ')}</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${f.formulas.map(fm => `
              <div class="formula-row">
                <span class="formula-label">${esc(fm.nm)}</span>
                <span class="formula-expr">${esc(fm.f)}</span>
                ${fm.ex ? `<span class="formula-ex">${esc(fm.ex)}</span>` : ''}
              </div>`).join('')}
          </div>
        </div>`).join('')}
    </div>`);
}
