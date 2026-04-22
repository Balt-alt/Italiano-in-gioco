// ══════════════════════════════════════
// MOTORE GIOCHI — MATEMATICA  (con KaTeX)
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

// ── DOM helpers ───────────────────────────────────────────────
function $el(id) { return document.getElementById(id); }

// Render + KaTeX auto-render
function ri(html) {
  document.getElementById('main-content').innerHTML = html;
  _autoMath();
}

// KaTeX auto-render: processa $...$ e $$...$$ nel contenuto math
function _autoMath() {
  if (typeof renderMathInElement !== 'function') return;
  const el = document.getElementById('main-content');
  if (!el) return;
  renderMathInElement(el, {
    delimiters: [
      { left: '$$', right: '$$', display: true  },
      { left: '$',  right: '$',  display: false },
    ],
    throwOnError: false,
    errorColor: '#FF6B6B',
  });
}

// ── KaTeX helpers ────────────────────────────────────────────

// Renderizza valore per il display nei bottoni risposta
// "3/4" → $\dfrac{3}{4}$ — tutto il resto rimane testo
function mathDisplay(val) {
  if (typeof val !== 'string') return esc(String(val));
  // Frazione semplice "a/b"
  const fr = val.match(/^(\d+)\/(\d+)$/);
  if (fr) return `$\\dfrac{${fr[1]}}{${fr[2]}}$`;
  // Frazione con testo "a/b (non semplificata)" — mostra solo la frazione
  const frp = val.match(/^(\d+)\/(\d+)\s/);
  if (frp) return `$\\dfrac{${frp[1]}}{${frp[2]}}$ ${esc(val.slice(val.indexOf(' ')))}`;
  // Numero con unità quadratica "25 cm²"
  const sq = val.match(/^([\d,]+)\s*(cm²|m²|dm²|cm³|m³)$/);
  if (sq) return `$${sq[1].replace(',','{,}')}\\,\\text{${sq[2].replace('²','^2').replace('³','^3')}}$`;
  return esc(val);
}

// Bottone risposta MCQ con data-val per confronto e LaTeX per display
function answerBtn(val, correct) {
  return `<button class="answer-btn" data-val="${esc(val)}"
    onclick="window._mathMcqAnswer(this,'${esc(correct)}')">${mathDisplay(val)}</button>`;
}

// ── Generatori ────────────────────────────────────────────────
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

// simbolo LaTeX per le operazioni
const _opTex = { '+': '+', '-': '-', '×': '\\times', '÷': '\\div' };

// ── Operazioni ───────────────────────────────────────────────
function genOp(diff, forceType) {
  const opPool = {
    facile:    ['+', '+', '-', '-', '×'],
    medio:     ['+', '-', '×', '×', '÷'],
    difficile: ['+', '-', '×', '÷', '+', '×'],
  };
  const op = forceType || opPool[diff][rand(0, opPool[diff].length - 1)];
  let a, b, ans;

  if (op === '+') {
    const [lo, hi] = { facile:[10,999], medio:[100,9999], difficile:[1000,99999] }[diff];
    a = rand(lo, hi); b = rand(lo, hi); ans = a + b;
  } else if (op === '-') {
    const [lo, hi] = { facile:[10,999], medio:[100,9999], difficile:[1000,99999] }[diff];
    a = rand(lo + 20, hi); b = rand(lo, a); ans = a - b;
  } else if (op === '×') {
    const [[lo1,hi1],[lo2,hi2]] = { facile:[[2,9],[2,9]], medio:[[10,99],[2,12]], difficile:[[100,999],[2,99]] }[diff];
    a = rand(lo1, hi1); b = rand(lo2, hi2); ans = a * b;
  } else {
    const [[lo1,hi1],[lo2,hi2]] = { facile:[[1,9],[2,9]], medio:[[2,12],[2,12]], difficile:[[2,99],[2,12]] }[diff];
    b = rand(lo2, hi2); a = b * rand(lo1, hi1); ans = a / b;
  }

  const ansStr = fmtNum(ans);
  // Domanda in LaTeX: $a \op b = ?$
  const q = `$${fmtNum(a)} ${_opTex[op]} ${fmtNum(b)} = {?}$`;
  return { q, a: ansStr, w: nearbyWrongs(ans) };
}

// ── Geometria procedurale ────────────────────────────────────
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
      return { q:`Un quadrato ha il lato di $${l}$ cm. Qual è la sua <strong>area</strong>?`,
               a:`${ans} cm²`, w:nearbyWrongs(ans).map(v=>`${v} cm²`),
               h:'$A = l^2$', x:`$A = ${l}^2 = ${ans}$ cm²` };
    } else {
      const ans = 4 * l;
      return { q:`Un quadrato ha il lato di $${l}$ cm. Qual è il suo <strong>perimetro</strong>?`,
               a:`${ans} cm`, w:nearbyWrongs(ans).map(v=>`${v} cm`),
               h:'$P = 4 \\cdot l$', x:`$P = 4 \\times ${l} = ${ans}$ cm` };
    }
  }
  if (shape === 'rettangolo') {
    const b = rand(lo, hi), h = rand(lo, b);
    if (doArea) {
      const ans = b * h;
      return { q:`Un rettangolo ha base $${b}$ cm e altezza $${h}$ cm. Qual è la sua <strong>area</strong>?`,
               a:`${ans} cm²`, w:nearbyWrongs(ans).map(v=>`${v} cm²`),
               h:'$A = b \\cdot h$', x:`$A = ${b} \\times ${h} = ${ans}$ cm²` };
    } else {
      const ans = 2 * (b + h);
      return { q:`Un rettangolo ha base $${b}$ cm e altezza $${h}$ cm. Qual è il suo <strong>perimetro</strong>?`,
               a:`${ans} cm`, w:nearbyWrongs(ans).map(v=>`${v} cm`),
               h:'$P = 2 \\cdot (b+h)$', x:`$P = 2 \\times (${b}+${h}) = ${ans}$ cm` };
    }
  }
  if (shape === 'triangolo') {
    const b = rand(lo, hi), h = rand(lo, hi);
    const ans = (b * h) / 2;
    const a1 = rand(lo, hi), a2 = rand(lo, hi);
    const perim = b + a1 + a2;
    if (doArea) {
      return { q:`Un triangolo ha base $${b}$ cm e altezza $${h}$ cm. Qual è la sua <strong>area</strong>?`,
               a:`${fmtNum(ans)} cm²`, w:nearbyWrongs(ans).map(v=>`${v} cm²`),
               h:'$A = \\dfrac{b \\cdot h}{2}$', x:`$A = \\dfrac{${b} \\times ${h}}{2} = ${fmtNum(ans)}$ cm²` };
    } else {
      return { q:`Un triangolo ha lati $${b}$ cm, $${a1}$ cm e $${a2}$ cm. Qual è il suo <strong>perimetro</strong>?`,
               a:`${perim} cm`, w:nearbyWrongs(perim).map(v=>`${v} cm`),
               h:'$P = a + b + c$', x:`$P = ${b} + ${a1} + ${a2} = ${perim}$ cm` };
    }
  }
  if (shape === 'cerchio') {
    const r = rand(2, 15), pi = 3.14;
    if (doArea) {
      const ans = Math.round(pi * r * r * 100) / 100;
      return { q:`Un cerchio ha raggio $${r}$ cm. Qual è la sua <strong>area</strong>? $\\pi \\approx 3{,}14$`,
               a:`${fmtNum(ans)} cm²`, w:nearbyWrongs(ans).map(v=>`${v} cm²`),
               h:'$A = \\pi r^2$', x:`$A = 3{,}14 \\times ${r}^2 = 3{,}14 \\times ${r*r} = ${fmtNum(ans)}$ cm²` };
    } else {
      const ans = Math.round(2 * pi * r * 100) / 100;
      return { q:`Un cerchio ha raggio $${r}$ cm. Qual è la <strong>circonferenza</strong>? $\\pi \\approx 3{,}14$`,
               a:`${fmtNum(ans)} cm`, w:nearbyWrongs(ans).map(v=>`${v} cm`),
               h:'$C = 2\\pi r$', x:`$C = 2 \\times 3{,}14 \\times ${r} = ${fmtNum(ans)}$ cm` };
    }
  }
  if (shape === 'rombo') {
    const D = rand(lo, hi), d = rand(2, D), ans = (D * d) / 2;
    return { q:`Un rombo ha diagonali $${D}$ cm e $${d}$ cm. Qual è la sua <strong>area</strong>?`,
             a:`${fmtNum(ans)} cm²`, w:nearbyWrongs(ans).map(v=>`${v} cm²`),
             h:'$A = \\dfrac{D \\cdot d}{2}$', x:`$A = \\dfrac{${D} \\times ${d}}{2} = ${fmtNum(ans)}$ cm²` };
  }
  if (shape === 'trapezio') {
    const B = rand(lo, hi), b = rand(2, B), h = rand(lo, hi), ans = ((B + b) * h) / 2;
    return { q:`Un trapezio ha base maggiore $${B}$ cm, base minore $${b}$ cm e altezza $${h}$ cm. Qual è la sua <strong>area</strong>?`,
             a:`${fmtNum(ans)} cm²`, w:nearbyWrongs(ans).map(v=>`${v} cm²`),
             h:'$A = \\dfrac{(B+b) \\cdot h}{2}$', x:`$A = \\dfrac{(${B}+${b}) \\times ${h}}{2} = ${fmtNum(ans)}$ cm²` };
  }
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
    b1 = opts[rand(0,opts.length-1)]; b2 = opts[rand(0,opts.length-1)];
    a1 = rand(1,b1-1); a2 = rand(1,b2-1);
  } else {
    b1 = rand(3,12); b2 = rand(3,12);
    a1 = rand(1,b1-1); a2 = rand(1,b2-1);
  }
  const v1 = a1/b1, v2 = a2/b2;
  // Valori per confronto (plain text) e display (LaTeX)
  const f1plain = `${a1}/${b1}`, f2plain = `${a2}/${b2}`;
  const den = b1 * b2, n1 = a1 * b2, n2 = a2 * b1;

  let correctAns, wrongs;
  if (Math.abs(v1-v2) < 0.001) {
    correctAns = 'Sono uguali';
    wrongs = [f1plain, f2plain, 'Non si può stabilire'];
  } else {
    correctAns = v1 > v2 ? f1plain : f2plain;
    wrongs = [v1 > v2 ? f2plain : f1plain, 'Sono uguali', 'Non si può stabilire'];
  }

  return {
    q: `Quale frazione è <strong>maggiore</strong>?<br>$\\dfrac{${a1}}{${b1}}$ &ensp; o &ensp; $\\dfrac{${a2}}{${b2}}$`,
    a: correctAns, w: wrongs,
    h: `Riduci allo stesso denominatore $${den}$`,
    x: `$\\dfrac{${a1}}{${b1}} = \\dfrac{${n1}}{${den}}$ &ensp; $\\dfrac{${a2}}{${b2}} = \\dfrac{${n2}}{${den}}$`,
  };
}

// ══════════════════════════════════════
// AVVIO GIOCO
// ══════════════════════════════════════
export function startMathGame(cat, mode, diff) {
  if (mode === 'formulario') { showFormulario(); return; }

  _mg = { cat, mode, diff, qs:[], ci:0, sc:0, tot:10, t0:Date.now(), inputMode:false };
  const N = _mg.tot;

  if (cat === 'operazioni') {
    if (mode === 'calcolo' || mode === 'scrivi') {
      _mg.inputMode = (mode === 'scrivi');
      _mg.qs = Array.from({ length: N }, () => genOp(diff));
    } else if (mode === 'colonna') {
      _mg.inputMode = true;
      const ops = ['+','-','×'];
      _mg.qs = Array.from({ length: 8 }, () => genOp(diff, ops[rand(0, ops.length-1)]));
      _mg.tot = 8;
    }
  } else if (cat === 'problemi') {
    const bank = QM.PROBLEMI[diff] || QM.PROBLEMI.facile;
    _mg.qs = shuffle([...bank]).slice(0, Math.min(N, bank.length));
    _mg.tot = _mg.qs.length;
  } else if (cat === 'geometria') {
    if (mode === 'calcola-geo') {
      _mg.qs = Array.from({ length: N }, () => genGeo(diff));
    } else {
      const bank = QM.GEO_QUIZ[diff] || QM.GEO_QUIZ.facile;
      _mg.qs = shuffle([...bank]).slice(0, Math.min(N, bank.length));
      _mg.tot = _mg.qs.length;
    }
  } else if (cat === 'frazioni') {
    if (mode === 'confronta-fraz') {
      _mg.qs = Array.from({ length: N }, () => genFrazConfronta(diff));
    } else {
      const bank = QM.FRAZ_QUIZ[diff] || QM.FRAZ_QUIZ.facile;
      _mg.qs = shuffle([...bank]).slice(0, Math.min(N, bank.length));
      _mg.tot = _mg.qs.length;
    }
  } else if (cat === 'misure') {
    const bank = QM.MISURE_QUIZ[diff] || QM.MISURE_QUIZ.facile;
    _mg.qs = shuffle([...bank]).slice(0, Math.min(N, bank.length));
    _mg.tot = _mg.qs.length;
  } else if (cat === 'decimali') {
    const bank = QM.DEC_QUIZ[diff] || QM.DEC_QUIZ.facile;
    _mg.qs = shuffle([...bank]).slice(0, Math.min(N, bank.length));
    _mg.tot = _mg.qs.length;
  }

  showMathQ();
}

// ══════════════════════════════════════
// GAME LOOP
// ══════════════════════════════════════

function catTag() {
  return ({ operazioni:'🔢 Operazioni', problemi:'📝 Problemi',
            geometria:'📐 Geometria', frazioni:'½ Frazioni',
            misure:'📏 Misure', decimali:'🔟 Decimali' })[_mg.cat] || '🔢 Matematica';
}

function showMathQ() {
  const q = _mg.qs[_mg.ci];
  if (!q) { showMathResult(); return; }
  const pct = (_mg.ci / _mg.tot) * 100;
  if (_mg.mode === 'colonna') showColonnaQ(q, pct);
  else if (_mg.inputMode)     showInputQ(q, pct);
  else                        showMcqQ(q, pct);
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
      ${q.h ? `<div class="hint-chip">💡 ${q.h}</div>` : ''}
      <div class="answers-grid">
        ${opts.map(o => answerBtn(o, q.a)).join('')}
      </div>
      <div id="math-feedback"></div>
      <div id="math-next" style="display:none" class="btn-group">
        <button class="btn btn-primary" onclick="window._mathNext()">Avanti ➜</button>
      </div>
    </div>`);
}

window._mathMcqAnswer = (btn, correct) => {
  document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
  const sel = btn.dataset.val;
  const ok = sel === correct;
  btn.classList.add(ok ? 'correct' : 'wrong');
  if (!ok) document.querySelectorAll('.answer-btn').forEach(b => {
    if (b.dataset.val === correct) b.classList.add('correct');
  });
  if (ok) _mg.sc++;
  const q = _mg.qs[_mg.ci];
  $el('math-feedback').innerHTML = ok
    ? `<div class="feedback ok">✅ Esatto! ${q.x ? `<div class="explain">${q.x}</div>` : ''}</div>`
    : `<div class="feedback no">❌ Era: <strong>${mathDisplay(correct)}</strong>${q.x ? `<div class="explain">${q.x}</div>` : ''}</div>`;
  $el('math-next').style.display = 'flex';
  _autoMath(); // ri-renderizza il feedback con KaTeX
  api.updateStreak(_pid, ok).catch(() => {});
};

// ── Input (scrivi il risultato) ──────────────────────────────
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
      ${q.h ? `<div class="hint-chip">💡 ${q.h}</div>` : ''}
      <div style="display:flex;gap:10px;align-items:stretch;margin-top:18px;max-width:320px">
        <input type="text" id="math-input" class="input" placeholder="Scrivi il risultato…"
          inputmode="decimal" autocomplete="off"
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
  const val  = inp.value.trim().replace(',','.').toLowerCase();
  const q    = _mg.qs[_mg.ci];
  const corr = q.a.replace(',','.').toLowerCase();
  const numV = parseFloat(val), numC = parseFloat(corr);
  const ok   = val === corr || (!isNaN(numV) && !isNaN(numC) && Math.abs(numV-numC) < 0.001);
  inp.disabled = true;
  inp.style.borderColor = ok ? 'var(--mint)' : 'var(--coral)';
  if (ok) _mg.sc++;
  $el('math-feedback').innerHTML = ok
    ? `<div class="feedback ok">✅ Esatto! ${q.x ? `<div class="explain">${q.x}</div>` : ''}</div>`
    : `<div class="feedback no">❌ Corretto: <strong>${mathDisplay(q.a)}</strong>${q.x ? `<div class="explain">${q.x}</div>` : ''}</div>`;
  $el('math-next').style.display = 'flex';
  _autoMath();
  api.updateStreak(_pid, ok).catch(() => {});
};

// ── Colonna ──────────────────────────────────────────────────
function showColonnaQ(q, pct) {
  // Estrai i numeri e l'operatore dalla domanda (formato LaTeX: "$a \times b = {?}$")
  const cleanQ = q.q.replace(/\$/g, '').replace(/\{?\?\}?/, '?');
  const match = cleanQ.match(/([\d.,]+)\s*([\+\-\\times\\div×÷])\s*([\d.,]+)/u);

  let colHtml = '';
  if (match) {
    const numa = match[1], numb = match[3];
    const opRaw = q.q.includes('\\times') ? '×' : q.q.includes('\\div') ? '÷' : q.q.includes('+') ? '+' : '−';
    const numLen = Math.max(numa.length, numb.length) + 1;
    const pad = s => '\u00a0'.repeat(Math.max(0, numLen - s.length)) + s;
    colHtml = `
      <div class="col-op-box">
        <div class="col-op-row">${esc(pad(numa))}</div>
        <div class="col-op-row col-op-sign"><span class="col-sign">${esc(opRaw)}</span>${esc(pad(numb))}</div>
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
          inputmode="decimal" autocomplete="off"
          style="flex:1;font-size:1.3rem;font-weight:700;text-align:center"
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

window._mathBack   = () => _onNav('category', _mg.cat);
window._mathReplay = () => startMathGame(_mg.cat, _mg.mode, _mg.diff);

// ══════════════════════════════════════
// RISULTATO
// ══════════════════════════════════════
async function showMathResult() {
  const { sc, tot, cat, diff } = _mg;
  const pct = tot > 0 ? Math.round((sc / tot) * 100) : 0;
  const elapsed = Math.round((Date.now() - _mg.t0) / 1000);
  const mins = Math.floor(elapsed / 60), secs = elapsed % 60;
  const timeStr = `${mins > 0 ? mins + 'm ' : ''}${secs}s`;

  let xpEarned = 0;
  try { const res = await api.saveGameResult(_pid, `math-${cat}`, sc, tot); xpEarned = res?.xpEarned ?? 0; }
  catch (_) {}

  if (sc === tot) setTimeout(launchConfetti, 300);

  const stars = pct >= 90 ? '⭐⭐⭐' : pct >= 70 ? '⭐⭐' : pct >= 50 ? '⭐' : '😅';
  const msg   = pct === 100 ? 'Perfetto! Sei un campione!' : pct >= 80 ? 'Ottimo lavoro!' :
                pct >= 60   ? 'Bene! Continua così.' : pct >= 40 ? 'Ci sei quasi, riprova!' : 'Non mollare!';

  ri(`
    <div id="confetti-box" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:999"></div>
    <div class="quiz-area" style="text-align:center">
      <div style="font-size:3.5rem;margin:16px 0">${stars}</div>
      <h2 style="margin-bottom:4px">${esc(msg)}</h2>
      <p style="color:var(--muted);margin-bottom:20px;font-size:.9rem">${catTag()} · ${diff}</p>
      <div class="result-stats-grid">
        <div class="result-stat"><div class="result-stat-val">${sc}/${tot}</div><div class="result-stat-lbl">Corrette</div></div>
        <div class="result-stat"><div class="result-stat-val">${pct}%</div><div class="result-stat-lbl">Precisione</div></div>
        <div class="result-stat"><div class="result-stat-val">+${xpEarned}</div><div class="result-stat-lbl">XP</div></div>
        <div class="result-stat"><div class="result-stat-val">${esc(timeStr)}</div><div class="result-stat-lbl">Tempo</div></div>
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
// FORMULARIO (KaTeX display mode)
// ══════════════════════════════════════
function showFormulario() {
  // Formule in LaTeX — display mode ($$...$$) per rendering grande e centrato
  const formulas = [
    {
      id:'quadrato', nm:'Quadrato', ic:'⬛', cl:['#4ECDC4','#45B7D1'],
      props:['4 lati uguali', '4 angoli retti (90°)', '4 assi di simmetria'],
      rows:[
        { nm:'Perimetro', tex:'P = 4 \\cdot l',   ex:'l=5\\text{ cm} \\Rightarrow P=20\\text{ cm}' },
        { nm:'Area',      tex:'A = l^2',            ex:'l=5\\text{ cm} \\Rightarrow A=25\\text{ cm}^2' },
      ],
    },
    {
      id:'rettangolo', nm:'Rettangolo', ic:'▬', cl:['#A29BFE','#6C5CE7'],
      props:['2 coppie di lati uguali','4 angoli retti (90°)','2 assi di simmetria'],
      rows:[
        { nm:'Perimetro', tex:'P = 2\\cdot(b+h)',   ex:'b{=}6,\\ h{=}4 \\Rightarrow P=20\\text{ cm}' },
        { nm:'Area',      tex:'A = b \\cdot h',      ex:'b{=}6,\\ h{=}4 \\Rightarrow A=24\\text{ cm}^2' },
      ],
    },
    {
      id:'triangolo', nm:'Triangolo', ic:'🔺', cl:['#FF6B6B','#FF8E53'],
      props:['3 lati','3 angoli (somma = 180°)','Tipi: equilatero, isoscele, scaleno'],
      rows:[
        { nm:'Perimetro', tex:'P = a+b+c',                   ex:'3+4+5=12\\text{ cm}' },
        { nm:'Area',      tex:'A = \\dfrac{b \\cdot h}{2}',  ex:'b{=}6,\\ h{=}4 \\Rightarrow A=12\\text{ cm}^2' },
      ],
    },
    {
      id:'cerchio', nm:'Cerchio', ic:'⭕', cl:['#FD79A8','#E84393'],
      props:['Tutti i punti equidistanti dal centro','Raggio r = metà del diametro','d = 2r'],
      rows:[
        { nm:'Circonferenza', tex:'C = 2\\pi r \\approx 6{,}28r',   ex:'r{=}5 \\Rightarrow C\\approx 31{,}4\\text{ cm}' },
        { nm:'Area',          tex:'A = \\pi r^2 \\approx 3{,}14r^2', ex:'r{=}5 \\Rightarrow A\\approx 78{,}5\\text{ cm}^2' },
      ],
    },
    {
      id:'rombo', nm:'Rombo', ic:'🔷', cl:['#FDCB6E','#E17055'],
      props:['4 lati uguali','Angoli opposti uguali','2 diagonali perpendicolari'],
      rows:[
        { nm:'Perimetro', tex:'P = 4 \\cdot l',                   ex:'l{=}6 \\Rightarrow P=24\\text{ cm}' },
        { nm:'Area',      tex:'A = \\dfrac{D \\cdot d}{2}',       ex:'D{=}10,\\ d{=}6 \\Rightarrow A=30\\text{ cm}^2' },
      ],
    },
    {
      id:'trapezio', nm:'Trapezio', ic:'🔸', cl:['#55EFC4','#00B894'],
      props:['4 lati','1 coppia di lati paralleli (basi)','Base maggiore B > base minore b'],
      rows:[
        { nm:'Perimetro', tex:'P = B+b+l_1+l_2',                    ex:'' },
        { nm:'Area',      tex:'A = \\dfrac{(B+b)\\cdot h}{2}',      ex:'B{=}8,\\ b{=}4,\\ h{=}5 \\Rightarrow A=30\\text{ cm}^2' },
      ],
    },
  ];

  ri(`
    <button class="nav-back" onclick="window._onMathNav('category','geometria')">← Indietro</button>
    <div style="max-width:600px;margin:0 auto">
      <h2 style="text-align:center;margin-bottom:4px">📋 Formulario di Geometria</h2>
      <p style="text-align:center;color:var(--muted);font-size:.88rem;margin-bottom:20px">
        Formule per le figure piane — 5ª Elementare
      </p>
      ${formulas.map(f => `
        <div class="card" style="margin-bottom:14px;border-top:4px solid ${f.cl[0]}">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <span style="font-size:2rem">${f.ic}</span>
            <div>
              <div style="font-weight:800;font-size:1.05rem">${esc(f.nm)}</div>
              <div style="font-size:.78rem;color:var(--muted)">${f.props.join(' · ')}</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${f.rows.map(r => `
              <div class="formula-row">
                <span class="formula-label">${esc(r.nm)}</span>
                <span class="formula-expr">$$${r.tex}$$</span>
                ${r.ex ? `<span class="formula-ex">$${r.ex}$</span>` : ''}
              </div>`).join('')}
          </div>
        </div>`).join('')}
    </div>`);
}
