// ══════════════════════════════════════
// GAME ENGINES - Logica di tutti i giochi
// ══════════════════════════════════════
import { api } from './api.js';
import { esc, escAttr, shuffle, formatTime, launchConfetti, CATS, BADGES, checkBadges } from './utils.js';
import * as Q from './questions.js';

// Current game state
export let game = { cat: '', mode: '', qs: [], ci: 0, sc: 0, tot: 0, t0: 0, tm: null, tv: 0, ms: null, os: null };
let currentProfileId = null;
let profileData = null;
let onNavigate = null;

export function initGames(profileId, profile, navigateFn) {
  currentProfileId = profileId;
  profileData = profile;
  onNavigate = navigateFn;
}

export function refreshProfile(p) { profileData = p; }

// ══════════════════════════════════════
// REVIEW MODE (Spaced Repetition)
// ══════════════════════════════════════
export async function startReview(category) {
  // Get due reviews from server
  let items = await api.getDueReviews(currentProfileId, category || null);

  // If no spaced rep items, fall back to recent errors
  if (!items.length) {
    const errors = await api.getErrors(currentProfileId, category || 'all');
    if (!errors.length) { alert('Nessun errore da ripassare! 🎉'); onNavigate('home'); return; }
    items = errors.slice(0, 10).map(e => ({
      id: e.id,
      question: e.question,
      correct_answer: e.correct_answer,
      wrong_answers: '[]',
      hint: '',
      explanation: '',
      category: e.category,
    }));
  }

  // Determine the best category to show (use provided or most common from items)
  const actualCat = category || items[0]?.category || 'grammatica';

  game = { cat: actualCat, mode: 'review', qs: [], ci: 0, sc: 0, tot: 0, t0: Date.now(), tm: null, tv: 0, ms: null, os: null };

  game.qs = items.slice(0, 10).map(sr => {
    let wa;
    try { wa = typeof sr.wrong_answers === 'string' ? JSON.parse(sr.wrong_answers) : sr.wrong_answers; } catch(e) { wa = []; }
    return {
      q: sr.question,
      a: sr.correct_answer,
      w: wa.length >= 2 ? wa : ['—', '—', '—'],
      h: sr.hint || 'Ripasso',
      x: sr.explanation || '',
      _reviewId: sr.id,
    };
  });
  game.tot = game.qs.length;
  game._isCompleta = false;
  game._isCatena = false;
  showQuizQuestion();
}

function $el(id) { return document.getElementById(id); }

function renderInto(html) {
  document.getElementById('main-content').innerHTML = html;
}

// ── Get questions by category and mode ──
function getQuizBank(cat) {
  const map = { grammatica: Q.gramQuiz, vocabolario: Q.vocabQuiz, verbi: Q.verbiQuiz, ortografia: Q.ortoQuiz };
  return map[cat] || {};
}

// ══════════════════════════════════════
// GAME ROUTER
// ══════════════════════════════════════
// Converte domande custom (db format) nel formato interno dei giochi
function adaptCustomQuiz(items, d) {
  return items
    .filter(item => item.game_type === 'quiz')
    .flatMap(item => {
      try {
        const data = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
        if (!data.q || !data.a) return [];
        return [{ q: data.q, a: data.a, w: data.w || [], hint: data.hint || '', explanation: data.explanation || '' }];
      } catch(_) { return []; }
    });
}

function adaptCustomVF(items) {
  return items
    .filter(item => item.game_type === 'vf')
    .flatMap(item => {
      try {
        const data = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
        if (!data.testo) return [];
        return [{ aff: data.testo, v: data.risposta === 'Vero', x: data.explanation || '' }];
      } catch(_) { return []; }
    });
}

function adaptCustomAbbina(items) {
  return items
    .filter(item => item.game_type === 'abbina')
    .flatMap(item => {
      try {
        const data = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
        if (!data.coppie?.length) return [];
        return [{ title: data.titolo || 'Abbina', pairs: data.coppie.map(c => [c.l, c.r]) }];
      } catch(_) { return []; }
    });
}

export async function startGame(cat, mode) {
  game = { cat, mode, qs: [], ci: 0, sc: 0, tot: 0, t0: Date.now(), tm: null, tv: 0, ms: null, os: null, _custom: { quiz: [], vf: [], abbina: [] } };
  const d = profileData.difficulty;

  // Precarica domande personalizzate per questa categoria e difficoltà
  try {
    const [quizItems, vfItems, abbinaItems] = await Promise.all([
      api.getCustomContent('quiz', cat, d).catch(() => []),
      api.getCustomContent('vf', cat, d).catch(() => []),
      api.getCustomContent('abbina', cat, d).catch(() => [])
    ]);
    const customItems = [...quizItems, ...vfItems, ...abbinaItems];
    game._custom = {
      quiz: adaptCustomQuiz(customItems, d),
      vf: adaptCustomVF(customItems),
      abbina: adaptCustomAbbina(customItems)
    };
  } catch (_) { /* ignora errori fetch custom */ }

  // Grammatica
  if (cat === 'grammatica') {
    if (mode === 'quiz') return startQuiz(Q.gramQuiz, d);
    if (mode === 'classifica') return startClassifica(d);
    if (mode === 'completa') return startQuiz(Q.gramCompleta, d, true);
    if (mode === 'ordina') return startOrdina(Q.gramOrdina, d);
    if (mode === 'singplur') return startSingPlur(d);
    if (mode === 'costruisci') return startCostruisci(d);
  }
  // Vocabolario
  if (cat === 'vocabolario') {
    if (mode === 'quiz') return startQuiz(Q.vocabQuiz, d);
    if (mode === 'abbina') return startAbbina(d);
    if (mode === 'intruso') return startIntruso(d);
    if (mode === 'catena') return startQuiz(Q.vocabCatena, d, false, true);
    if (mode === 'cruciverba') return startCruciverba(d);
    if (mode === 'indovina') return startIndovina(d);
    if (mode === 'memory') return startMemory(d);
  }
  // Verbi
  if (cat === 'verbi') {
    if (mode === 'quiz') return startQuiz(Q.verbiQuiz, d);
    if (mode === 'coniuga') return startConiuga(d);
    if (mode === 'trasforma') return startTrasforma(d);
  }
  // Ortografia
  if (cat === 'ortografia') {
    if (mode === 'quiz') return startQuiz(Q.ortoQuiz, d);
    if (mode === 'errore') return startErrore(d);
    if (mode === 'scrivi') return startScrivi(d);
  }
  // Comprensione
  if (cat === 'comprensione') {
    if (mode === 'leggi') return startLeggi(d);
    if (mode === 'vf') return startVF(d);
    if (mode === 'sequenza') return startSequenza(d);
    if (mode === 'significato') return startQuiz(Q.compSignificato, d);
    if (mode === 'causaeffetto') return startCausaEffetto(d);
    if (mode === 'complstoria') return startComplStoria(d);
    if (mode === 'dialogo') return startDialogo(d);
  }
  // Analisi Logica
  if (cat === 'analisi') {
    if (mode === 'evidenzia') return startEvidenzia(d);
    if (mode === 'classificacompl') return startClassificaCompl(d);
    if (mode === 'princsub') return startPrincSub(d);
    if (mode === 'quizanalisi') return startQuiz(Q.analisiQuiz, d);
  }
  // Produzione Scritta
  if (cat === 'produzione') {
    if (mode === 'connettivo') return startConnettivo(d);
    if (mode === 'riordinaparagrafi') return startRiordinaParagrafi(d);
    if (mode === 'registro') return startRegistro(d);
    if (mode === 'correggi') return startCorreggiTema(d);
  }

  alert('Questa modalità non è ancora disponibile per questa categoria.');
  onNavigate('category', cat);
}

// ══════════════════════════════════════
// GENERIC QUIZ (scelta multipla / completa / catena)
// ══════════════════════════════════════
function startQuiz(bank, d, isCompleta = false, isCatena = false) {
  let pool = [...(bank[d] || bank.facile || [])];
  // Merge domande personalizzate (solo per quiz semplice, non completa/catena)
  if (!isCompleta && !isCatena && game._custom?.quiz?.length) {
    pool = [...pool, ...game._custom.quiz];
  }
  pool = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  if (!pool.length) { alert('Nessuna domanda!'); return onNavigate('category', game.cat); }
  game.qs = pool; game.tot = pool.length;
  game._isCompleta = isCompleta;
  game._isCatena = isCatena;
  showQuizQuestion();
}

function showQuizQuestion() {
  const q = game.qs[game.ci], t = game.tot, pct = (game.ci / t) * 100;
  const cat = CATS.find(c => c.id === game.cat) || { id: game.cat, nm: 'Ripasso', ic: '🔄', cl: ['#B197FC', '#D0BFFF'] };
  const ts = profileData.timer_seconds;

  // Determine options
  let opts;
  if (game._isCompleta) {
    opts = shuffle([...q.opts]);
  } else if (game._isCatena) {
    opts = shuffle([...q.opts]);
  } else {
    const at = profileData.answer_type;
    const useText = at === 'text' || (at === 'mix' && Math.random() > 0.5);
    if (useText) {
      renderInto(quizShell(cat, pct, t, ts, q,
        `<input type="text" class="text-input" id="txt-ans" placeholder="Scrivi la risposta..." onkeydown="if(event.key==='Enter')window._checkText()">
         <div class="btn-group"><button class="btn btn-primary btn-sm" onclick="window._checkText()">Conferma ✓</button></div>`));
      setTimeout(() => $el('txt-ans')?.focus(), 80);
      if (ts > 0) startTimer(ts);
      // Expose check function
      window._checkText = () => checkTextAnswer(q);
      return;
    }
    opts = shuffle([q.a, ...q.w.slice(0, 3)]);
  }

  const isSingleCol = game._isCatena || game._isCompleta;
  const gridClass = isSingleCol ? 'answers-grid single-col' : 'answers-grid';

  // Context for catena
  let contextHtml = '';
  if (game._isCatena) {
    contextHtml = `<div class="question-context"><strong>Indizio 1:</strong> ${esc(q.clue1)}<br><strong>Indizio 2:</strong> ${esc(q.clue2)}</div>`;
  }
  if (game._isCompleta) {
    contextHtml = `<div class="question-context" style="font-size:1.1rem">${esc(q.frase)}</div>`;
  }

  const answersHtml = `<div class="${gridClass}">${opts.map(o =>
    `<button class="answer-btn" onclick="window._checkAnswer(this,'${escAttr(o)}','${escAttr(q.a)}')">${esc(o)}</button>`
  ).join('')}</div>`;

  renderInto(quizShell(cat, pct, t, ts, q, answersHtml, contextHtml));
  if (ts > 0) startTimer(ts);

  window._checkAnswer = (btn, sel, correct) => checkMultipleAnswer(btn, sel, correct, q);
}

function quizShell(cat, pct, total, ts, q, answersHtml, contextHtml = '') {
  const modeLabel = game._isCompleta ? 'Completa la Frase ✏️' : game._isCatena ? 'Catena di Parole ⛓️' : 'Quiz';
  const questionText = game._isCatena ? 'Quale parola collega i due indizi?' : (game._isCompleta ? '' : q.q);
  return `
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap">
        <div class="progress-bg"><div class="progress-fill" style="width:${pct}%"></div></div>
        <span class="progress-text">${game.ci + 1}/${total}</span>
      </div>
      ${ts > 0 ? '<div class="timer-bar"><div class="timer-fill" id="timer-fill" style="width:100%"></div></div>' : ''}
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} ${modeLabel}</div>
      ${questionText ? `<div class="question-text">${esc(questionText)}</div>` : ''}
      ${q.h && !game._isCompleta ? `<div class="question-hint">💡 ${esc(q.h)}</div>` : ''}
      ${contextHtml}
      <div id="answers-box">${answersHtml}</div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group">
        <button class="btn btn-primary" onclick="window._nextQuestion()">Avanti ➜</button>
      </div>
    </div>`;
}

async function checkMultipleAnswer(btn, sel, correct, q) {
  clearInterval(game.tm);
  document.querySelectorAll('.answer-btn').forEach(b => b.classList.add('disabled'));

  if (sel === correct) {
    btn.classList.add('correct');
    game.sc++;
    await api.updateStreak(currentProfileId, true);
    showFeedback(true, q);
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.answer-btn').forEach(b => { if (b.textContent === correct) b.classList.add('reveal'); });
    await api.updateStreak(currentProfileId, false);
    await logErrorToServer(q, sel);
    showFeedback(false, q, correct);
  }
  $el('next-box').style.display = 'flex';
}

async function checkTextAnswer(q) {
  clearInterval(game.tm);
  const input = $el('txt-ans');
  if (!input || !input.value.trim()) return;
  const val = input.value.trim();
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\/\s]+/g, ' ').trim();
  const isCorrect = norm(val) === norm(q.a) || q.a.toLowerCase().split('/').some(p => norm(val) === norm(p.trim()));
  input.disabled = true;

  if (isCorrect) {
    input.style.borderColor = 'var(--lime)';
    game.sc++;
    await api.updateStreak(currentProfileId, true);
    showFeedback(true, q);
  } else {
    input.style.borderColor = 'var(--coral)';
    await api.updateStreak(currentProfileId, false);
    await logErrorToServer(q, val);
    showFeedback(false, q, q.a);
  }
  $el('next-box').style.display = 'flex';
}

function showFeedback(ok, q, correctAns, isTimeout) {
  const fb = $el('feedback-box');
  if (!fb) return;
  if (ok) {
    const msgs = ['Esatto! 🎉', 'Bravissima! 👏', 'Perfetto! 🌟', 'Giusto! ✨', 'Grande! 💪'];
    fb.innerHTML = `<div class="feedback ok">${msgs[Math.floor(Math.random() * msgs.length)]}${q.x ? `<div class="explain">${esc(q.x)}</div>` : ''}</div>`;
  } else {
    const msg = isTimeout ? '⏱️ Tempo scaduto!' : '😅 Non è corretto...';
    fb.innerHTML = `<div class="feedback no">${msg}<br><small>Risposta: <strong>${esc(correctAns)}</strong></small>${q.x ? `<div class="explain">${esc(q.x)}</div>` : ''}</div>`;
  }
}

function startTimer(sec) {
  game.tv = sec;
  clearInterval(game.tm);
  game.tm = setInterval(() => {
    game.tv -= 0.1;
    const fill = $el('timer-fill');
    if (fill) fill.style.width = Math.max(0, (game.tv / sec) * 100) + '%';
    if (game.tv <= 0) { clearInterval(game.tm); handleTimeout(); }
  }, 100);
}

async function handleTimeout() {
  const q = game.qs[game.ci];
  document.querySelectorAll('.answer-btn').forEach(b => { b.classList.add('disabled'); if (b.textContent === q.a) b.classList.add('reveal'); });
  const input = $el('txt-ans'); if (input) input.disabled = true;
  await api.updateStreak(currentProfileId, false);
  await logErrorToServer(q, '⏱️ Tempo scaduto');
  showFeedback(false, q, q.a, true);
  $el('next-box').style.display = 'flex';
}

async function logErrorToServer(q, userAnswer) {
  await api.logError(currentProfileId, {
    category: game.cat,
    question: q.q || q.frase || '',
    userAnswer,
    correctAnswer: q.a || q.corretto || '',
    difficulty: profileData.difficulty,
    wrongAnswers: q.w || [],
    hint: q.h || '',
    explanation: q.x || '',
  });
}

window._nextQuestion = () => {
  game.ci++;
  if (game.ci >= game.tot) { endGame(); return; }
  showQuizQuestion();
};

window._quitGame = () => {
  if (confirm('Uscire dal gioco?')) { clearInterval(game.tm); onNavigate('home'); }
};

// ══════════════════════════════════════
// CLASSIFICA (Grammatica)
// ══════════════════════════════════════
function startClassifica(d) {
  const data = Q.gramClassifica[d] || Q.gramClassifica.facile;
  if (!data?.length) { alert('Non disponibile!'); return onNavigate('category', game.cat); }
  const round = data[Math.floor(Math.random() * data.length)];
  game.ms = { words: shuffle([...round.words]), cats: round.categories, placed: {}, sel: null };
  game.tot = round.words.length;
  renderClassifica();
}

function renderClassifica() {
  const s = game.ms, cat = CATS.find(c => c.id === game.cat);
  const catNames = Object.keys(s.cats);
  const remaining = s.words.filter(w => !Object.values(s.placed).flat().includes(w));
  const matched = Object.values(s.placed).flat().length;

  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Classifica la Parola 🏷️</div>
      <div class="question-text">Tocca una parola, poi la categoria giusta</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:14px 0">
        ${remaining.map(w => `<div class="word-chip" onclick="window._clfSelWord('${escAttr(w)}')">${esc(w)}</div>`).join('')}
      </div>
      <div class="classify-zones">
        ${catNames.map(cn => `<div class="classify-zone" onclick="window._clfPlace('${escAttr(cn)}')">
          <div class="zone-name">${esc(cn)}</div>
          ${(s.placed[cn] || []).map(w => `<span class="zone-word">${esc(w)}</span>`).join('')}
        </div>`).join('')}
      </div>
      <div class="progress-wrap" style="margin-top:14px">
        <div class="progress-bg"><div class="progress-fill" style="width:${(matched / game.tot) * 100}%"></div></div>
        <span class="progress-text">${matched}/${game.tot}</span>
      </div>
      <div id="feedback-box"></div>
    </div>`);
}

window._clfSelWord = (w) => { game.ms.sel = w; };
window._clfPlace = async (cn) => {
  const s = game.ms;
  if (!s.sel) return;
  const correct = s.cats[cn]?.includes(s.sel);
  if (!s.placed[cn]) s.placed[cn] = [];
  if (correct) {
    s.placed[cn].push(s.sel);
    game.sc++;
    await api.updateStreak(currentProfileId, true);
  } else {
    await api.updateStreak(currentProfileId, false);
    const fb = $el('feedback-box');
    if (fb) { fb.innerHTML = `<div class="feedback no">'${esc(s.sel)}' non è ${esc(cn)}!</div>`; setTimeout(() => { if (fb) fb.innerHTML = ''; }, 1500); }
  }
  s.sel = null;
  if (Object.values(s.placed).flat().length >= game.tot) setTimeout(() => endGame(), 400);
  else renderClassifica();
};

// ══════════════════════════════════════
// ORDINA LA FRASE
// ══════════════════════════════════════
function startOrdina(bank, d) {
  let pool = [...(bank[d] || bank.facile || [])];
  if (!pool.length) { alert('Non disponibile!'); return onNavigate('category', game.cat); }
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length;
  showOrderQuestion();
}

function showOrderQuestion() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  game.os = { w: shuffle([...q.w]), pl: [], c: q.c };

  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap">
        <div class="progress-bg"><div class="progress-fill" style="width:${(game.ci / game.tot) * 100}%"></div></div>
        <span class="progress-text">${game.ci + 1}/${game.tot}</span>
      </div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Ordina la Frase 🧩</div>
      ${q.h ? `<div class="question-hint">💡 ${esc(q.h)}</div>` : ''}
      <div class="sentence-slot" id="order-slot" onclick="window._orderRemove()"></div>
      <p style="font-size:.72rem;color:var(--muted)">Tocca la frase per rimuovere l'ultima parola</p>
      <div class="sentence-bank" id="order-bank"></div>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm" onclick="window._checkOrder()">Verifica ✓</button>
        <button class="btn btn-ghost btn-sm" onclick="window._resetOrder()">🔄</button>
      </div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group">
        <button class="btn btn-primary" onclick="window._nextOrderQ()">Avanti ➜</button>
      </div>
    </div>`);
  renderOrderWords();
}

function renderOrderWords() {
  const o = game.os, bank = $el('order-bank'), slot = $el('order-slot');
  if (!bank || !slot) return;
  const rem = o.w.filter((_, i) => !o.pl.includes(i));
  bank.innerHTML = o.w.map((w, i) => o.pl.includes(i) ? '' : `<div class="word-chip" onclick="window._orderPlace(${i})">${esc(w)}</div>`).join('');
  slot.innerHTML = o.pl.length ? o.pl.map(i => `<div class="word-chip placed">${esc(o.w[i])}</div>`).join('') : '<span style="color:var(--muted);font-size:.85rem">Tocca le parole...</span>';
}

window._orderPlace = (i) => { game.os.pl.push(i); renderOrderWords(); };
window._orderRemove = () => { if (game.os.pl.length) { game.os.pl.pop(); renderOrderWords(); } };
window._resetOrder = () => { game.os.pl = []; renderOrderWords(); $el('feedback-box').innerHTML = ''; $el('next-box').style.display = 'none'; };
window._checkOrder = async () => {
  const o = game.os, built = o.pl.map(i => o.w[i]).join(' ');
  if (built === o.c) { game.sc++; await api.updateStreak(currentProfileId, true); $el('feedback-box').innerHTML = `<div class="feedback ok">Perfetto! 🎉</div>`; }
  else { await api.updateStreak(currentProfileId, false); $el('feedback-box').innerHTML = `<div class="feedback no">Non corretto 😅<br><small>Giusto: <strong>${esc(o.c)}</strong></small></div>`; }
  $el('next-box').style.display = 'flex';
};
window._nextOrderQ = () => { game.ci++; if (game.ci >= game.tot) endGame(); else showOrderQuestion(); };

// ══════════════════════════════════════
// ABBINA (Vocabolario)
// ══════════════════════════════════════
function startAbbina(d) {
  const builtIn = Q.vocabAbbina[d] || Q.vocabAbbina.facile || [];
  const customAbbina = game._custom?.abbina || [];
  const data = [...builtIn, ...customAbbina];
  if (!data?.length) { alert('Non disponibile!'); return onNavigate('category', game.cat); }
  const r = data[Math.floor(Math.random() * data.length)];
  game.ms = { pairs: r.pairs, title: r.title, matched: [], selL: null };
  game.tot = r.pairs.length; game.sc = 0;
  renderAbbina();
}

function renderAbbina() {
  const s = game.ms, cat = CATS.find(c => c.id === game.cat);
  const L = shuffle(s.pairs.map((p, i) => ({ t: p[0], i }))), R2 = shuffle(s.pairs.map((p, i) => ({ t: p[1], i })));
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} ${esc(s.title)} 🔗</div>
      <p style="color:var(--muted);font-size:.85rem;margin-bottom:12px">Tocca a sinistra, poi a destra</p>
      <div class="match-grid">
        <div class="match-col">${L.map(l => `<div class="match-item ${s.matched.includes(l.i) ? 'matched' : ''}" data-i="${l.i}" data-s="L" onclick="window._matchClick(this)">${esc(l.t)}</div>`).join('')}</div>
        <div class="match-col">${R2.map(r => `<div class="match-item ${s.matched.includes(r.i) ? 'matched' : ''}" data-i="${r.i}" data-s="R" onclick="window._matchClick(this)">${esc(r.t)}</div>`).join('')}</div>
      </div>
      <div class="progress-wrap" style="margin-top:14px">
        <div class="progress-bg"><div class="progress-fill" style="width:${(s.matched.length / game.tot) * 100}%"></div></div>
        <span class="progress-text">${s.matched.length}/${game.tot}</span>
      </div>
    </div>`);
}

window._matchClick = async (el) => {
  const s = game.ms, i = +el.dataset.i, sd = el.dataset.s;
  if (s.matched.includes(i) && sd === 'L') return;
  if (sd === 'L') {
    document.querySelectorAll('.match-item').forEach(m => m.classList.remove('selected'));
    el.classList.add('selected'); s.selL = i;
  } else if (s.selL !== null) {
    if (i === s.selL) {
      s.matched.push(i); game.sc++; await api.updateStreak(currentProfileId, true); s.selL = null;
      if (s.matched.length >= game.tot) setTimeout(() => endGame(), 400); else renderAbbina();
    } else {
      el.classList.add('wrong-match'); await api.updateStreak(currentProfileId, false);
      setTimeout(() => { el.classList.remove('wrong-match'); document.querySelectorAll('.match-item').forEach(m => m.classList.remove('selected')); s.selL = null; }, 500);
    }
  }
};

// ══════════════════════════════════════
// INTRUSO (Vocabolario)
// ══════════════════════════════════════
function startIntruso(d) {
  let pool = [...(Q.vocabIntruso[d] || Q.vocabIntruso.facile || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length;
  showIntruso();
}

function showIntruso() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat), w = shuffle([...q.words]);
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci / game.tot) * 100}%"></div></div><span class="progress-text">${game.ci + 1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Trova l'Intruso 🔍</div>
      <div class="question-text">Quale parola non appartiene?</div>
      ${q.h ? `<div class="question-hint">💡 ${esc(q.h)}</div>` : ''}
      <div class="answers-grid">${w.map(o => `<button class="answer-btn" onclick="window._checkIntruso(this,'${escAttr(o)}')">${esc(o)}</button>`).join('')}</div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextIntruso()">Avanti ➜</button></div>
    </div>`);
}

window._checkIntruso = async (btn, sel) => {
  document.querySelectorAll('.answer-btn').forEach(b => b.classList.add('disabled'));
  const q = game.qs[game.ci];
  if (sel === q.intruso) { btn.classList.add('correct'); game.sc++; await api.updateStreak(currentProfileId, true); showFeedback(true, q); }
  else { btn.classList.add('wrong'); document.querySelectorAll('.answer-btn').forEach(b => { if (b.textContent === q.intruso) b.classList.add('reveal'); }); await api.updateStreak(currentProfileId, false); showFeedback(false, { ...q, a: q.intruso }, q.intruso); }
  $el('next-box').style.display = 'flex';
};
window._nextIntruso = () => { game.ci++; if (game.ci >= game.tot) endGame(); else showIntruso(); };

// ══════════════════════════════════════
// CONIUGA (Verbi)
// ══════════════════════════════════════
function startConiuga(d) {
  let pool = [...(Q.verbiConiuga[d] || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length; showConiuga();
}

function showConiuga() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci / game.tot) * 100}%"></div></div><span class="progress-text">${game.ci + 1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Coniuga! ⌨️</div>
      <div class="question-text">Coniuga <strong>"${esc(q.verb)}"</strong></div>
      <div class="question-context">Persona: <strong>${esc(q.persona)}</strong> · Tempo: <strong>${esc(q.tempo)}</strong></div>
      <input type="text" class="text-input" id="txt-ans" placeholder="Scrivi la forma..." onkeydown="if(event.key==='Enter')window._checkConiuga()">
      <div class="btn-group"><button class="btn btn-primary btn-sm" onclick="window._checkConiuga()">Conferma ✓</button></div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextConiuga()">Avanti ➜</button></div>
    </div>`);
  setTimeout(() => $el('txt-ans')?.focus(), 80);
}

window._checkConiuga = async () => {
  const input = $el('txt-ans'); if (!input || !input.value.trim()) return;
  const val = input.value.trim(), q = game.qs[game.ci];
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\/\s]+/g, ' ').trim();
  const ok = norm(val) === norm(q.a) || q.a.toLowerCase().split('/').some(p => norm(val) === norm(p.trim()));
  input.disabled = true;
  if (ok) { input.style.borderColor = 'var(--lime)'; game.sc++; await api.updateStreak(currentProfileId, true); $el('feedback-box').innerHTML = `<div class="feedback ok">Esatto! ✨ ${esc(q.a)}</div>`; }
  else { input.style.borderColor = 'var(--coral)'; await api.updateStreak(currentProfileId, false); await logErrorToServer({ q: `${q.verb} (${q.persona}, ${q.tempo})`, a: q.a, w: [], h: '', x: '' }, val); $el('feedback-box').innerHTML = `<div class="feedback no">Corretto: <strong>${esc(q.a)}</strong></div>`; }
  $el('next-box').style.display = 'flex';
};
window._nextConiuga = () => { game.ci++; if (game.ci >= game.tot) endGame(); else showConiuga(); };

// ══════════════════════════════════════
// TRASFORMA (Verbi)
// ══════════════════════════════════════
function startTrasforma(d) {
  let pool = [...(Q.verbiTrasforma[d] || Q.verbiTrasforma.facile || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length;
  game._isCompleta = false; game._isCatena = false;
  showTrasforma();
}

function showTrasforma() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat), opts = shuffle([...q.opts]);
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci / game.tot) * 100}%"></div></div><span class="progress-text">${game.ci + 1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Trasforma la Frase 🔀</div>
      <div class="question-context"><strong>Frase:</strong> ${esc(q.frase)}<br><strong>Trasforma al:</strong> ${esc(q.tempo)}</div>
      <div class="answers-grid single-col">${opts.map(o => `<button class="answer-btn" style="text-align:left" onclick="window._checkAnswer(this,'${escAttr(o)}','${escAttr(q.a)}')">${esc(o)}</button>`).join('')}</div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextTrasforma()">Avanti ➜</button></div>
    </div>`);

  window._checkAnswer = (btn, sel, correct) => checkMultipleAnswer(btn, sel, correct, { ...q, w: [] });
}

window._nextTrasforma = () => {
  game.ci++;
  if (game.ci >= game.tot) endGame(); else showTrasforma();
};

// ══════════════════════════════════════
// TROVA L'ERRORE (Ortografia)
// ══════════════════════════════════════
function startErrore(d) {
  let pool = [...(Q.ortoErrore[d] || Q.ortoErrore.facile || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length; showErrore();
}

function showErrore() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  const parts = q.frase.split('*');
  let html = '';
  for (let i = 0; i < parts.length; i++) {
    html += esc(parts[i]);
    if (i < parts.length - 1) {
      html += `<span class="error-word" onclick="window._foundError(this,'${escAttr(q.errore)}','${escAttr(q.corretto)}')">${esc(q.errore)}</span>`;
      i++;
    }
  }
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci / game.tot) * 100}%"></div></div><span class="progress-text">${game.ci + 1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Trova l'Errore 🔎</div>
      <div class="question-text">Tocca la parola sbagliata!</div>
      <div class="question-context" style="font-size:1.05rem;line-height:1.8">${html}</div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextErrore()">Avanti ➜</button></div>
    </div>`);
}

window._foundError = async (el, err, corr) => {
  const q = game.qs[game.ci];
  el.style.background = 'rgba(105,219,124,.3)'; el.style.textDecoration = 'line-through';
  game.sc++; await api.updateStreak(currentProfileId, true);
  $el('feedback-box').innerHTML = `<div class="feedback ok">Trovato! ✨ Corretto: <strong>${esc(corr)}</strong>${q.x ? `<div class="explain">${esc(q.x)}</div>` : ''}</div>`;
  $el('next-box').style.display = 'flex';
};
window._nextErrore = () => { game.ci++; if (game.ci >= game.tot) endGame(); else showErrore(); };

// ══════════════════════════════════════
// SCRIVI CORRETTAMENTE (Ortografia)
// ══════════════════════════════════════
function startScrivi(d) {
  let pool = [...(Q.ortoScrivi[d] || Q.ortoScrivi.facile || [])];
  game.qs = shuffle(pool); game.tot = game.qs.length; showScrivi();
}

function showScrivi() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci / game.tot) * 100}%"></div></div><span class="progress-text">${game.ci + 1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Scrivi Correttamente ✏️</div>
      <div class="question-text">Come si scrive?</div>
      <div style="font-size:1.3rem;margin:14px 0;padding:12px;background:rgba(255,107,107,.06);border-radius:12px;font-weight:700;text-decoration:line-through;color:var(--coral)">${esc(q.w)}</div>
      <input type="text" class="text-input" id="txt-ans" placeholder="Forma corretta..." onkeydown="if(event.key==='Enter')window._checkScrivi()">
      <div class="btn-group"><button class="btn btn-primary btn-sm" onclick="window._checkScrivi()">Conferma ✓</button></div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextScrivi()">Avanti ➜</button></div>
    </div>`);
  setTimeout(() => $el('txt-ans')?.focus(), 80);
}

window._checkScrivi = async () => {
  const input = $el('txt-ans'); if (!input || !input.value.trim()) return;
  const val = input.value.trim(), q = game.qs[game.ci];
  const ok = val.toLowerCase() === q.r.toLowerCase(); input.disabled = true;
  if (ok) { input.style.borderColor = 'var(--lime)'; game.sc++; await api.updateStreak(currentProfileId, true); $el('feedback-box').innerHTML = `<div class="feedback ok">Perfetto! ✨ <strong>${esc(q.r)}</strong></div>`; }
  else { input.style.borderColor = 'var(--coral)'; await api.updateStreak(currentProfileId, false); await logErrorToServer({ q: q.w, a: q.r, w: [], h: '', x: '' }, val); $el('feedback-box').innerHTML = `<div class="feedback no">Si scrive: <strong>${esc(q.r)}</strong></div>`; }
  $el('next-box').style.display = 'flex';
};
window._nextScrivi = () => { game.ci++; if (game.ci >= game.tot) endGame(); else showScrivi(); };

// ══════════════════════════════════════
// LEGGI E RISPONDI (Comprensione)
// ══════════════════════════════════════
function startLeggi(d) {
  const data = Q.compLeggi[d] || Q.compLeggi.facile;
  if (!data?.length) { alert('Non disponibile!'); return onNavigate('category', game.cat); }
  const passage = data[Math.floor(Math.random() * data.length)];
  game.qs = passage.domande; game.tot = passage.domande.length; game.ms = { testo: passage.testo };
  game._isCompleta = false; game._isCatena = false;
  showLeggiQ();
}

function showLeggiQ() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat), opts = shuffle([q.a, ...q.w]);
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci / game.tot) * 100}%"></div></div><span class="progress-text">${game.ci + 1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Leggi e Rispondi 📖</div>
      <div class="question-context">${esc(game.ms.testo)}</div>
      <div class="question-text" style="margin-top:14px">${esc(q.q)}</div>
      <div class="answers-grid" style="margin-top:12px">${opts.map(o => `<button class="answer-btn" onclick="window._checkAnswer(this,'${escAttr(o)}','${escAttr(q.a)}')">${esc(o)}</button>`).join('')}</div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextQuestion()">Avanti ➜</button></div>
    </div>`);

  window._checkAnswer = (btn, sel, correct) => checkMultipleAnswer(btn, sel, correct, { ...q, w: q.w, h: '', x: '' });
}

// ══════════════════════════════════════
// VERO O FALSO (Comprensione)
// ══════════════════════════════════════
function startVF(d) {
  let pool = [...(Q.compVF[d] || Q.compVF.facile || [])];
  if (game._custom?.vf?.length) pool = [...pool, ...game._custom.vf];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length; showVFQ();
}

function showVFQ() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci / game.tot) * 100}%"></div></div><span class="progress-text">${game.ci + 1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Vero o Falso? ✅❌</div>
      <div class="question-text">${esc(q.aff)}</div>
      <div class="vf-buttons">
        <button class="vf-btn vero" onclick="window._checkVF(true)">✅ Vero</button>
        <button class="vf-btn falso" onclick="window._checkVF(false)">❌ Falso</button>
      </div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextVF()">Avanti ➜</button></div>
    </div>`);
}

window._checkVF = async (ans) => {
  const q = game.qs[game.ci];
  document.querySelectorAll('.vf-btn').forEach(b => b.style.pointerEvents = 'none');
  if (ans === q.v) { game.sc++; await api.updateStreak(currentProfileId, true); $el('feedback-box').innerHTML = `<div class="feedback ok">Esatto! ✨${q.x ? `<div class="explain">${esc(q.x)}</div>` : ''}</div>`; }
  else { await api.updateStreak(currentProfileId, false); await logErrorToServer({ q: q.aff, a: q.v ? 'Vero' : 'Falso', w: [], h: '', x: q.x }, ans ? 'Vero' : 'Falso'); $el('feedback-box').innerHTML = `<div class="feedback no">Era ${q.v ? 'VERO' : 'FALSO'}!${q.x ? `<div class="explain">${esc(q.x)}</div>` : ''}</div>`; }
  $el('next-box').style.display = 'flex';
};
window._nextVF = () => { game.ci++; if (game.ci >= game.tot) endGame(); else showVFQ(); };

// ══════════════════════════════════════
// ORDINA GLI EVENTI (Comprensione)
// ══════════════════════════════════════
function startSequenza(d) {
  const data = Q.compSequenza[d] || Q.compSequenza.facile;
  if (!data?.length) { alert('Non disponibile!'); return onNavigate('category', game.cat); }
  const r = data[Math.floor(Math.random() * data.length)];
  game.os = { events: r.events, title: r.title, placed: [] };
  game.tot = r.events.length; game.ms = { shuffled: shuffle([...r.events]) };
  showSequenza();
}

function showSequenza() {
  const o = game.os, s = game.ms, cat = CATS.find(c => c.id === game.cat);
  const rem = s.shuffled.filter(e => !o.placed.includes(e));
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Ordina gli Eventi 📑</div>
      <div class="question-text">${esc(o.title)}</div>
      <p style="color:var(--muted);font-size:.82rem;margin:8px 0">Tocca nell'ordine corretto</p>
      <div class="sentence-slot" onclick="window._seqRemove()">${o.placed.length ? o.placed.map((e, i) => `<div class="word-chip placed" style="display:block;margin:3px 0"><strong>${i + 1}.</strong> ${esc(e)}</div>`).join('') : '<span style="color:var(--muted);font-size:.85rem">Tocca gli eventi...</span>'}</div>
      <div class="sentence-bank">${rem.map(e => `<div class="word-chip" style="text-align:left" onclick="window._seqPlace('${escAttr(e)}')">${esc(e)}</div>`).join('')}</div>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm" onclick="window._checkSeq()">Verifica ✓</button>
        <button class="btn btn-ghost btn-sm" onclick="window._resetSeq()">🔄</button>
      </div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._endFromSeq()">Risultati ➜</button></div>
    </div>`);
}

window._seqPlace = (e) => { game.os.placed.push(e); showSequenza(); };
window._seqRemove = () => { if (game.os.placed.length) { game.os.placed.pop(); showSequenza(); } };
window._resetSeq = () => { game.os.placed = []; showSequenza(); };
window._checkSeq = async () => {
  const o = game.os;
  if (o.placed.join('|') === o.events.join('|')) { game.sc = game.tot; await api.updateStreak(currentProfileId, true); $el('feedback-box').innerHTML = `<div class="feedback ok">Ordine perfetto! 🎉</div>`; }
  else { await api.updateStreak(currentProfileId, false); $el('feedback-box').innerHTML = `<div class="feedback no">Non corretto 😅<br><small>${o.events.map((e, i) => `<strong>${i + 1}.</strong> ${esc(e)}`).join('<br>')}</small></div>`; }
  $el('next-box').style.display = 'flex';
};
window._endFromSeq = () => endGame();

// ══════════════════════════════════════
// END GAME
// ══════════════════════════════════════
async function endGame() {
  clearInterval(game.tm);
  const t = game.tot || 1, pct = Math.round((game.sc / t) * 100);
  const elapsed = Math.round((Date.now() - game.t0) / 1000);

  // Save to server (don't let errors block the results screen)
  let result = { xpEarned: game.sc * 10 + (pct === 100 ? 50 : 0), pct };
  let newBadges = [];
  try {
    result = await api.saveGameResult(currentProfileId, { category: game.cat, score: game.sc, total: t });
    const profile = await api.getProfile(currentProfileId);
    profileData = profile;
    newBadges = await checkBadges(currentProfileId, profile, async (pid, bid) => {
      const r = await api.addBadge(pid, bid);
      return r.added;
    });
  } catch (e) {
    console.warn('Could not save game result:', e.message);
  }

  let stars = pct >= 90 ? '⭐⭐⭐' : pct >= 70 ? '⭐⭐' : pct >= 40 ? '⭐' : '';
  let emoji, title;
  if (pct === 100) { emoji = '🏆'; title = 'Perfetto!'; }
  else if (pct >= 80) { emoji = '🎉'; title = 'Fantastico!'; }
  else if (pct >= 60) { emoji = '👍'; title = 'Molto bene!'; }
  else if (pct >= 40) { emoji = '💪'; title = 'Continua così!'; }
  else { emoji = '📚'; title = 'Riprova!'; }

  renderInto(`
    <div class="results-card">
      <span class="big-emoji">${emoji}</span>
      <h2>${title}</h2>
      <div class="score-big">${game.sc}<span class="of"> / ${t}</span></div>
      <div class="stars-row">${stars || '—'}</div>
      <div class="result-pills">
        <div class="pill"><span class="val">+${result.xpEarned}</span><span class="lbl">XP</span></div>
        <div class="pill"><span class="val">${pct}%</span><span class="lbl">Precisione</span></div>
        <div class="pill"><span class="val">${formatTime(elapsed)}</span><span class="lbl">Tempo</span></div>
      </div>
      ${newBadges.length ? `<div class="new-badges-alert"><strong>🏅 Nuovi traguardi!</strong><br>${newBadges.map(b => `${b.ic} ${b.nm}`).join(', ')}</div>` : ''}
      <div class="btn-group">
        <button class="btn btn-primary" onclick="window._replay()">🔄 Rigioca</button>
        <button class="btn btn-ghost" onclick="window._goHome()">🏠 Menu</button>
      </div>
    </div>`);
  if (pct >= 70) launchConfetti();
}

window._replay = () => startGame(game.cat, game.mode);
window._goHome = () => onNavigate('home');

// ══════════════════════════════════════
// 1. SINGOLARE ↔ PLURALE (Grammatica)
// ══════════════════════════════════════
function startSingPlur(d) {
  let pool = [...(Q.gramSingPlur[d] || Q.gramSingPlur.facile || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length; showSingPlur();
}
function showSingPlur() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci/game.tot)*100}%"></div></div><span class="progress-text">${game.ci+1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Singolare → Plurale 🔄</div>
      <div class="question-text">Trasforma al plurale:</div>
      <div class="question-context" style="font-size:1.15rem;text-align:center"><strong>${esc(q.sing)}</strong></div>
      ${q.h ? `<div class="question-hint">💡 ${esc(q.h)}</div>` : ''}
      <input type="text" class="text-input" id="txt-ans" placeholder="Scrivi al plurale..." onkeydown="if(event.key==='Enter')window._checkSP()">
      <div class="btn-group"><button class="btn btn-primary btn-sm" onclick="window._checkSP()">Conferma ✓</button></div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextSP()">Avanti ➜</button></div>
    </div>`);
  setTimeout(() => $el('txt-ans')?.focus(), 80);
}
window._checkSP = async () => {
  const input = $el('txt-ans'); if (!input || !input.value.trim()) return;
  const val = input.value.trim(), q = game.qs[game.ci];
  const norm = s => s.toLowerCase().replace(/\s+/g,' ').replace(/[.!?]/g,'').trim();
  const ok = norm(val) === norm(q.plur);
  input.disabled = true;
  if (ok) { input.style.borderColor='var(--lime)'; game.sc++; await api.updateStreak(currentProfileId,true); $el('feedback-box').innerHTML=`<div class="feedback ok">Perfetto! ✨ ${esc(q.plur)}</div>`; }
  else { input.style.borderColor='var(--coral)'; await api.updateStreak(currentProfileId,false); await logErrorToServer({q:q.sing,a:q.plur,w:[],h:q.h,x:''},val); $el('feedback-box').innerHTML=`<div class="feedback no">Corretto: <strong>${esc(q.plur)}</strong></div>`; }
  $el('next-box').style.display='flex';
};
window._nextSP = () => { game.ci++; if(game.ci>=game.tot) endGame(); else showSingPlur(); };

// ══════════════════════════════════════
// 2. CRUCIVERBA (Vocabolario)
// ══════════════════════════════════════
function startCruciverba(d) {
  const data = Q.vocabCruciverba[d] || Q.vocabCruciverba.facile;
  if (!data?.length) { alert('Non disponibile!'); return onNavigate('category', game.cat); }
  const puzzle = data[Math.floor(Math.random() * data.length)];
  game.ms = { puzzle, answers: {}, solved: 0 };
  game.tot = puzzle.words.length;
  renderCruciverba();
}
function renderCruciverba() {
  const { puzzle, answers, solved } = game.ms;
  const cat = CATS.find(c => c.id === game.cat);
  const sz = puzzle.size;

  // Build grid
  let grid = Array.from({length:sz}, () => Array(sz).fill(null));
  puzzle.words.forEach((w, wi) => {
    for (let i = 0; i < w.word.length; i++) {
      const r = w.dir === 'h' ? w.row : w.row + i;
      const c = w.dir === 'h' ? w.col + i : w.col;
      if (r < sz && c < sz) grid[r][c] = { letter: w.word[i], wordIdx: wi, pos: i };
    }
  });

  const gridHtml = `<div class="crossword-grid" style="grid-template-columns:repeat(${sz},1fr)">
    ${grid.flat().map((cell, idx) => {
      if (!cell) return `<div class="cw-cell cw-black"></div>`;
      const solved = answers[cell.wordIdx]?.toLowerCase() === puzzle.words[cell.wordIdx].word.toLowerCase();
      const letter = solved ? cell.letter : '';
      return `<div class="cw-cell cw-letter ${solved ? 'cw-solved' : ''}" onclick="window._cwFocus(${cell.wordIdx})">${letter}</div>`;
    }).join('')}
  </div>`;

  const defsHtml = puzzle.words.map((w, i) => {
    const done = answers[i]?.toLowerCase() === w.word.toLowerCase();
    return `<div class="cw-def ${done ? 'cw-def-done' : ''}" onclick="window._cwFocus(${i})">
      <strong>${i+1}.</strong> ${esc(w.def)} <span style="font-size:.75rem;color:var(--muted)">(${w.word.length} lettere, ${w.dir==='h'?'→':'↓'})</span>
      ${done ? ' ✅' : ''}
    </div>`;
  }).join('');

  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Cruciverba 📰</div>
      <div class="question-text">${esc(puzzle.title)}</div>
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(solved/game.tot)*100}%"></div></div><span class="progress-text">${solved}/${game.tot}</span></div>
      ${gridHtml}
      <div class="cw-defs">${defsHtml}</div>
      <div class="cw-input-area" id="cw-input-area" style="display:none">
        <div id="cw-current-def" style="font-weight:700;margin-bottom:8px"></div>
        <input type="text" class="text-input" id="cw-input" placeholder="Scrivi la parola..." onkeydown="if(event.key==='Enter')window._cwCheck()">
        <div class="btn-group"><button class="btn btn-primary btn-sm" onclick="window._cwCheck()">Conferma ✓</button></div>
      </div>
      <div id="feedback-box"></div>
    </div>`);
}
window._cwFocus = (idx) => {
  const w = game.ms.puzzle.words[idx];
  if (game.ms.answers[idx]?.toLowerCase() === w.word.toLowerCase()) return;
  game.ms._currentWord = idx;
  const area = $el('cw-input-area');
  area.style.display = 'block';
  $el('cw-current-def').textContent = `${idx+1}. ${w.def} (${w.word.length} lettere)`;
  const inp = $el('cw-input');
  inp.value = '';
  inp.focus();
};
window._cwCheck = async () => {
  const idx = game.ms._currentWord;
  const w = game.ms.puzzle.words[idx];
  const val = $el('cw-input')?.value.trim();
  if (!val) return;
  if (val.toLowerCase() === w.word.toLowerCase()) {
    game.ms.answers[idx] = val;
    game.ms.solved++;
    game.sc++;
    await api.updateStreak(currentProfileId, true);
    if (game.ms.solved >= game.tot) { setTimeout(() => endGame(), 500); }
    else renderCruciverba();
  } else {
    await api.updateStreak(currentProfileId, false);
    $el('feedback-box').innerHTML = `<div class="feedback no">Non è corretto! Riprova...</div>`;
    setTimeout(() => { const fb = $el('feedback-box'); if(fb) fb.innerHTML=''; }, 1500);
  }
};

// ══════════════════════════════════════
// 3. INDOVINA DALLA DEFINIZIONE (Vocabolario)
// ══════════════════════════════════════
function startIndovina(d) {
  let pool = [...(Q.vocabIndovina[d] || Q.vocabIndovina.facile || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length;
  showIndovina();
}
function showIndovina() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  game.ms = { hintIdx: 0, maxPoints: q.hints.length };
  renderIndovina();
}
function renderIndovina() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  const hi = game.ms.hintIdx;
  const pts = game.ms.maxPoints - hi;
  const hintsShown = q.hints.slice(0, hi + 1);

  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci/game.tot)*100}%"></div></div><span class="progress-text">${game.ci+1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Indovina! 🎯</div>
      <div class="question-text">Di cosa si tratta?</div>
      <div class="indovina-hints">
        ${hintsShown.map((h, i) => `<div class="indovina-hint" style="animation-delay:${i*0.1}s">💡 ${esc(h)}</div>`).join('')}
      </div>
      <div style="margin:10px 0;font-weight:700;color:var(--lav)">Punti disponibili: ${pts}/${game.ms.maxPoints}</div>
      ${hi < q.hints.length - 1 ? `<button class="btn btn-ghost btn-sm" onclick="window._indHint()" style="margin-bottom:12px">Mostra altro indizio (-1 punto)</button>` : ''}
      <input type="text" class="text-input" id="txt-ans" placeholder="Scrivi la risposta..." onkeydown="if(event.key==='Enter')window._indCheck()">
      <div class="btn-group"><button class="btn btn-primary btn-sm" onclick="window._indCheck()">Conferma ✓</button></div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextInd()">Avanti ➜</button></div>
    </div>`);
  setTimeout(() => $el('txt-ans')?.focus(), 80);
}
window._indHint = () => {
  const q = game.qs[game.ci];
  if (game.ms.hintIdx < q.hints.length - 1) { game.ms.hintIdx++; renderIndovina(); }
};
window._indCheck = async () => {
  const input = $el('txt-ans'); if (!input || !input.value.trim()) return;
  const val = input.value.trim(), q = game.qs[game.ci];
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
  const ok = norm(val) === norm(q.answer);
  input.disabled = true;
  if (ok) {
    input.style.borderColor='var(--lime)';
    game.sc++;
    await api.updateStreak(currentProfileId, true);
    const pts = game.ms.maxPoints - game.ms.hintIdx;
    $el('feedback-box').innerHTML = `<div class="feedback ok">Esatto! 🎯 "${esc(q.answer)}" — ${pts} punti!${q.x?`<div class="explain">${esc(q.x)}</div>`:''}</div>`;
  } else {
    input.style.borderColor='var(--coral)';
    await api.updateStreak(currentProfileId, false);
    await logErrorToServer({q:'Indovina: '+q.hints[0],a:q.answer,w:[],h:'',x:q.x},val);
    $el('feedback-box').innerHTML = `<div class="feedback no">Era: <strong>${esc(q.answer)}</strong>${q.x?`<div class="explain">${esc(q.x)}</div>`:''}</div>`;
  }
  $el('next-box').style.display='flex';
  const hintBtn = document.querySelector('[onclick="window._indHint()"]');
  if (hintBtn) hintBtn.style.display = 'none';
};
window._nextInd = () => { game.ci++; if(game.ci>=game.tot) endGame(); else showIndovina(); };

// ══════════════════════════════════════
// 4. MEMORY (Vocabolario)
// ══════════════════════════════════════
function startMemory(d) {
  const data = Q.vocabMemory[d] || Q.vocabMemory.facile;
  if (!data?.length) { alert('Non disponibile!'); return onNavigate('category', game.cat); }
  const round = data[Math.floor(Math.random() * data.length)];
  // Create cards: each pair becomes two cards
  let cards = [];
  round.pairs.forEach((p, i) => {
    cards.push({ id: i, side: 'A', text: p[0], pairId: i });
    cards.push({ id: i, side: 'B', text: p[1], pairId: i });
  });
  cards = shuffle(cards);
  game.ms = { cards, flipped: [], matched: [], attempts: 0, lockBoard: false };
  game.tot = round.pairs.length;
  renderMemory();
}
function renderMemory() {
  const { cards, matched } = game.ms;
  const cat = CATS.find(c => c.id === game.cat);
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Memory 🃏</div>
      <div class="question-text">Trova le coppie!</div>
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(matched.length/game.tot)*100}%"></div></div><span class="progress-text">${matched.length}/${game.tot}</span></div>
      <div class="memory-grid" id="mem-grid">
        ${cards.map((c, i) => {
          const isMatched = matched.includes(c.pairId);
          return `<div class="mem-card ${isMatched ? 'mem-matched' : 'mem-hidden'}" data-idx="${i}" onclick="window._memFlip(${i})">
            <div class="mem-front">${isMatched ? esc(c.text) : '?'}</div>
          </div>`;
        }).join('')}
      </div>
      <div style="margin-top:10px;font-size:.85rem;color:var(--muted)">Tentativi: ${game.ms.attempts}</div>
    </div>`);
}
window._memFlip = async (idx) => {
  const ms = game.ms;
  if (ms.lockBoard) return;
  const card = ms.cards[idx];
  if (ms.matched.includes(card.pairId)) return;
  if (ms.flipped.length === 1 && ms.flipped[0] === idx) return;

  // Show card
  const el = document.querySelectorAll('.mem-card')[idx];
  el.classList.remove('mem-hidden');
  el.querySelector('.mem-front').textContent = card.text;

  if (ms.flipped.length === 0) {
    ms.flipped = [idx];
  } else {
    ms.lockBoard = true;
    ms.attempts++;
    const firstIdx = ms.flipped[0];
    const firstCard = ms.cards[firstIdx];

    if (firstCard.pairId === card.pairId && firstCard.side !== card.side) {
      // Match!
      ms.matched.push(card.pairId);
      game.sc++;
      await api.updateStreak(currentProfileId, true);
      ms.flipped = [];
      ms.lockBoard = false;
      if (ms.matched.length >= game.tot) { setTimeout(() => endGame(), 600); }
      else { setTimeout(() => renderMemory(), 400); }
    } else {
      // No match
      await api.updateStreak(currentProfileId, false);
      setTimeout(() => {
        ms.flipped = [];
        ms.lockBoard = false;
        renderMemory();
      }, 1000);
    }
  }
};

// ══════════════════════════════════════
// 5. CAUSA ED EFFETTO (Comprensione)
// ══════════════════════════════════════
function startCausaEffetto(d) {
  const data = Q.compCausaEffetto[d] || Q.compCausaEffetto.facile;
  if (!data?.length) { alert('Non disponibile!'); return onNavigate('category', game.cat); }
  const round = data[Math.floor(Math.random() * data.length)];
  game.ms = { pairs: round.pairs, title: round.title, matched: [], selL: null };
  game.tot = round.pairs.length;
  renderCausaEffetto();
}
function renderCausaEffetto() {
  const s = game.ms, cat = CATS.find(c => c.id === game.cat);
  const L = shuffle(s.pairs.map((p, i) => ({ t: p[0], i }))), R2 = shuffle(s.pairs.map((p, i) => ({ t: p[1], i })));
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Causa ed Effetto 🔀</div>
      <div class="question-text">${esc(s.title)}</div>
      <p style="color:var(--muted);font-size:.85rem;margin-bottom:12px">Tocca una causa a sinistra, poi il suo effetto a destra</p>
      <div class="match-grid">
        <div class="match-col"><div style="text-align:center;font-weight:700;font-size:.82rem;color:var(--coral);margin-bottom:6px">⚡ CAUSE</div>${L.map(l => `<div class="match-item ${s.matched.includes(l.i)?'matched':''}" data-i="${l.i}" data-s="L" onclick="window._ceClick(this)" style="text-align:left;font-size:.85rem">${esc(l.t)}</div>`).join('')}</div>
        <div class="match-col"><div style="text-align:center;font-weight:700;font-size:.82rem;color:var(--mint);margin-bottom:6px">💥 EFFETTI</div>${R2.map(r => `<div class="match-item ${s.matched.includes(r.i)?'matched':''}" data-i="${r.i}" data-s="R" onclick="window._ceClick(this)" style="text-align:left;font-size:.85rem">${esc(r.t)}</div>`).join('')}</div>
      </div>
      <div class="progress-wrap" style="margin-top:14px"><div class="progress-bg"><div class="progress-fill" style="width:${(s.matched.length/game.tot)*100}%"></div></div><span class="progress-text">${s.matched.length}/${game.tot}</span></div>
    </div>`);
}
window._ceClick = async (el) => {
  const s = game.ms, i = +el.dataset.i, sd = el.dataset.s;
  if (s.matched.includes(i) && sd === 'L') return;
  if (sd === 'L') {
    document.querySelectorAll('.match-item').forEach(m => m.classList.remove('selected'));
    el.classList.add('selected'); s.selL = i;
  } else if (s.selL !== null) {
    if (i === s.selL) {
      s.matched.push(i); game.sc++; await api.updateStreak(currentProfileId, true); s.selL = null;
      if (s.matched.length >= game.tot) setTimeout(() => endGame(), 400); else renderCausaEffetto();
    } else {
      el.classList.add('wrong-match'); await api.updateStreak(currentProfileId, false);
      setTimeout(() => { el.classList.remove('wrong-match'); document.querySelectorAll('.match-item').forEach(m => m.classList.remove('selected')); s.selL = null; }, 600);
    }
  }
};

// ══════════════════════════════════════
// 6. COMPLETA LA STORIA (Comprensione)
// ══════════════════════════════════════
function startComplStoria(d) {
  let pool = [...(Q.compComplStoria[d] || Q.compComplStoria.facile || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length;
  showComplStoria();
}
function showComplStoria() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  const opts = shuffle([...q.opts]);
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci/game.tot)*100}%"></div></div><span class="progress-text">${game.ci+1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Completa la Storia 📝</div>
      <div class="question-text">Quale pezzo manca?</div>
      ${q.h ? `<div class="question-hint">💡 ${esc(q.h)}</div>` : ''}
      <div class="story-block">
        <div class="story-part">${esc(q.intro)}</div>
        <div class="story-missing">❓ Parte mancante ❓</div>
        <div class="story-part">${esc(q.finale)}</div>
      </div>
      <div class="answers-grid single-col" style="margin-top:14px">
        ${opts.map(o => `<button class="answer-btn" style="text-align:left;font-size:.88rem" onclick="window._checkStoria(this,'${escAttr(o)}','${escAttr(q.missing)}')">${esc(o)}</button>`).join('')}
      </div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextStoria()">Avanti ➜</button></div>
    </div>`);
}
window._checkStoria = async (btn, sel, correct) => {
  document.querySelectorAll('.answer-btn').forEach(b => b.classList.add('disabled'));
  const q = game.qs[game.ci];
  if (sel === correct) {
    btn.classList.add('correct'); game.sc++; await api.updateStreak(currentProfileId, true);
    showFeedback(true, {x: q.x});
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.answer-btn').forEach(b => { if (escAttr(b.textContent) === correct || b.textContent === q.missing) b.classList.add('reveal'); });
    await api.updateStreak(currentProfileId, false);
    await logErrorToServer({q:'Completa la storia',a:q.missing,w:[],h:q.h,x:q.x}, sel);
    showFeedback(false, {x:q.x, a:q.missing}, q.missing);
  }
  $el('next-box').style.display='flex';
};
window._nextStoria = () => { game.ci++; if(game.ci>=game.tot) endGame(); else showComplStoria(); };

// ══════════════════════════════════════
// 7. COSTRUISCI LA FRASE (Grammatica)
// ══════════════════════════════════════
function startCostruisci(d) {
  let pool = [...(Q.gramCostruisci[d] || Q.gramCostruisci.facile || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length;
  showCostruisci();
}
function showCostruisci() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  const opts = shuffle([...q.opts]);
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci/game.tot)*100}%"></div></div><span class="progress-text">${game.ci+1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Costruisci la Frase 🏗️</div>
      <div class="question-text">Componi la frase corretta</div>
      <div class="question-context">
        <strong>Soggetto:</strong> ${esc(q.soggetto)}<br>
        <strong>Verbo:</strong> ${esc(q.verbo)}<br>
        <strong>Complemento:</strong> ${esc(q.complemento)}<br>
        <strong>Tempo:</strong> ${esc(q.tempo)}
      </div>
      <div class="answers-grid single-col" style="margin-top:12px">
        ${opts.map(o => `<button class="answer-btn" style="text-align:left" onclick="window._checkCostr(this,'${escAttr(o)}','${escAttr(q.a)}')">${esc(o)}</button>`).join('')}
      </div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextCostr()">Avanti ➜</button></div>
    </div>`);
}
window._checkCostr = async (btn, sel, correct) => {
  document.querySelectorAll('.answer-btn').forEach(b => b.classList.add('disabled'));
  const q = game.qs[game.ci];
  if (sel === correct) {
    btn.classList.add('correct'); game.sc++; await api.updateStreak(currentProfileId, true);
    showFeedback(true, {x:`La frase al ${q.tempo}: ${q.a}`});
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.answer-btn').forEach(b => { if (b.textContent === q.a) b.classList.add('reveal'); });
    await api.updateStreak(currentProfileId, false);
    await logErrorToServer({q:`${q.soggetto} + ${q.verbo} + ${q.complemento} (${q.tempo})`,a:q.a,w:[],h:'',x:''},sel);
    showFeedback(false, {x:'',a:q.a}, q.a);
  }
  $el('next-box').style.display='flex';
};
window._nextCostr = () => { game.ci++; if(game.ci>=game.tot) endGame(); else showCostruisci(); };

// ══════════════════════════════════════
// 8. COMPLETA IL DIALOGO (Comprensione)
// ══════════════════════════════════════
function startDialogo(d) {
  let pool = [...(Q.compDialogo[d] || Q.compDialogo.facile || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length;
  showDialogo();
}
function showDialogo() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  const missingBattuta = q.battute.find(b => b.missing);
  const opts = shuffle([...missingBattuta.opts]);

  const dialogHtml = q.battute.map(b => {
    const isLeft = b.chi === q.personaggi[0];
    if (b.missing) {
      return `<div class="dialog-bubble ${isLeft ? 'dlg-left' : 'dlg-right'} dlg-missing">
        <div class="dlg-name">${esc(b.chi)}</div>
        <div class="dlg-text">❓ ...</div>
      </div>`;
    }
    return `<div class="dialog-bubble ${isLeft ? 'dlg-left' : 'dlg-right'}">
      <div class="dlg-name">${esc(b.chi)}</div>
      <div class="dlg-text">${esc(b.testo)}</div>
    </div>`;
  }).join('');

  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci/game.tot)*100}%"></div></div><span class="progress-text">${game.ci+1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Completa il Dialogo 💬</div>
      ${q.h ? `<div class="question-hint">💡 ${esc(q.h)}</div>` : ''}
      <div class="dialog-container">${dialogHtml}</div>
      <div class="question-text" style="font-size:1.1rem;margin-top:14px">Cosa dice ${esc(missingBattuta.chi)}?</div>
      <div class="answers-grid single-col" style="margin-top:10px">
        ${opts.map(o => `<button class="answer-btn" style="text-align:left;font-size:.88rem" onclick="window._checkDlg(this,'${escAttr(o)}','${escAttr(missingBattuta.a)}')">${esc(o)}</button>`).join('')}
      </div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextDlg()">Avanti ➜</button></div>
    </div>`);
}
window._checkDlg = async (btn, sel, correct) => {
  document.querySelectorAll('.answer-btn').forEach(b => b.classList.add('disabled'));
  const q = game.qs[game.ci];
  const missingBattuta = q.battute.find(b => b.missing);
  if (sel === correct) {
    btn.classList.add('correct'); game.sc++; await api.updateStreak(currentProfileId, true);
    // Reveal in dialog
    const missing = document.querySelector('.dlg-missing .dlg-text');
    if (missing) { missing.textContent = missingBattuta.a; missing.parentElement.classList.remove('dlg-missing'); missing.parentElement.classList.add('dlg-revealed'); }
    showFeedback(true, {x:''});
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.answer-btn').forEach(b => { if (b.textContent === missingBattuta.a) b.classList.add('reveal'); });
    await api.updateStreak(currentProfileId, false);
    await logErrorToServer({q:'Dialogo: '+missingBattuta.chi,a:missingBattuta.a,w:[],h:q.h,x:''},sel);
    showFeedback(false, {x:'',a:missingBattuta.a}, missingBattuta.a);
  }
  $el('next-box').style.display='flex';
};
window._nextDlg = () => { game.ci++; if(game.ci>=game.tot) endGame(); else showDialogo(); };
// ══════════════════════════════════════
// ANALISI LOGICA: EVIDENZIA
// ══════════════════════════════════════
function startEvidenzia(d) {
  let pool = [...(Q.analisiEvidenzia[d] || Q.analisiEvidenzia.facile || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length; showEvidenzia();
}
function showEvidenzia() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  const partiNames = Object.keys(q.parti);
  const asking = partiNames[0]; // ask one part at a time
  game.ms = { asking: 0, partiNames, found: [] };
  renderEvidenzia();
}
function renderEvidenzia() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  const ms = game.ms;
  const askKey = ms.partiNames[ms.asking];
  const askLabel = {soggetto:'il SOGGETTO',predicato:'il PREDICATO',oggetto:'il COMPLEMENTO OGGETTO',luogo:'il COMPLEMENTO DI LUOGO',tempo:'il COMPLEMENTO DI TEMPO',modo:'il COMPLEMENTO DI MODO',compagnia:'il COMPLEMENTO DI COMPAGNIA',fine:'il COMPLEMENTO DI FINE',mezzo:'il COMPLEMENTO DI MEZZO',causa:'la CAUSA',concessiva:'la CONCESSIVA',agente:"il COMPLEMENTO D'AGENTE"}[askKey] || askKey.toUpperCase();
  const words = q.frase.split(/(\s+)/);
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci/game.tot)*100}%"></div></div><span class="progress-text">${game.ci+1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Evidenzia 🖍️</div>
      <div class="question-text">Tocca ${askLabel}</div>
      ${q.h ? `<div class="question-hint">💡 ${esc(q.h)}</div>` : ''}
      <div class="evidenzia-phrase">${words.map(w => w.trim() ? `<span class="ev-word" onclick="window._evSelect(this)">${esc(w)}</span>` : ' ').join('')}</div>
      <div class="btn-group"><button class="btn btn-primary btn-sm" onclick="window._evCheck()">Conferma selezione ✓</button></div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextEv()">Avanti ➜</button></div>
    </div>`);
}
window._evSelect = (el) => el.classList.toggle('ev-selected');
window._evCheck = async () => {
  const q = game.qs[game.ci], ms = game.ms;
  const askKey = ms.partiNames[ms.asking];
  const correct = q.parti[askKey];
  const selected = [...document.querySelectorAll('.ev-selected')].map(e => e.textContent).join(' ').trim();
  const norm = s => s.toLowerCase().replace(/[.,!?]/g,'').trim();
  if (norm(selected) === norm(correct)) {
    ms.asking++;
    if (ms.asking >= ms.partiNames.length) {
      game.sc++; await api.updateStreak(currentProfileId, true);
      $el('feedback-box').innerHTML = `<div class="feedback ok">Tutto corretto! 🎉</div>`;
      $el('next-box').style.display = 'flex';
    } else {
      $el('feedback-box').innerHTML = `<div class="feedback ok">✅ Giusto! Ora trova la prossima parte.</div>`;
      setTimeout(() => renderEvidenzia(), 1000);
    }
  } else {
    await api.updateStreak(currentProfileId, false);
    $el('feedback-box').innerHTML = `<div class="feedback no">${esc(askKey)}: <strong>${esc(correct)}</strong></div>`;
    ms.asking++;
    if (ms.asking >= ms.partiNames.length) { $el('next-box').style.display = 'flex'; }
    else { setTimeout(() => renderEvidenzia(), 1500); }
  }
};
window._nextEv = () => { game.ci++; if(game.ci>=game.tot) endGame(); else showEvidenzia(); };

// ══════════════════════════════════════
// ANALISI LOGICA: CLASSIFICA COMPLEMENTI
// ══════════════════════════════════════
function startClassificaCompl(d) {
  let pool = [...(Q.analisiComplementi[d] || Q.analisiComplementi.facile || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length;
  game._isCompleta = false; game._isCatena = false;
  showClassificaCompl();
}
function showClassificaCompl() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  const opts = shuffle([...q.opts]);
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci/game.tot)*100}%"></div></div><span class="progress-text">${game.ci+1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Classifica il Complemento 🏷️</div>
      <div class="question-context" style="font-size:1.05rem">${esc(q.frase)}</div>
      <div class="question-text">Che tipo di complemento è "<strong>${esc(q.complemento)}</strong>"?</div>
      <div class="answers-grid">${opts.map(o=>`<button class="answer-btn" onclick="window._checkAnswer(this,'${esc(o)}','${esc(q.tipo)}')">${esc(o)}</button>`).join('')}</div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextCC()">Avanti ➜</button></div>
    </div>`);
  window._checkAnswer = (btn, sel, correct) => checkMultipleAnswer(btn, sel, correct, {q:q.frase, a:q.tipo, w:q.opts.filter(o=>o!==q.tipo), h:'', x:q.x});
}
window._nextCC = () => { game.ci++; if(game.ci>=game.tot) endGame(); else showClassificaCompl(); };

// ══════════════════════════════════════
// ANALISI: PRINCIPALE O SUBORDINATA
// ══════════════════════════════════════
function startPrincSub(d) {
  let pool = [...(Q.analisiPrincSub[d] || Q.analisiPrincSub.facile || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length;
  showPrincSub();
}
function showPrincSub() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  game.ms = { asking: 0 };
  renderPrincSub();
}
function renderPrincSub() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  const ms = game.ms;
  if (ms.asking >= q.parti.length) {
    game.sc++; api.updateStreak(currentProfileId, true);
    $el('feedback-box').innerHTML = `<div class="feedback ok">Tutto giusto! 🎉${q.x ? `<div class="explain">${esc(q.x)}</div>`:''}</div>`;
    $el('next-box').style.display = 'flex';
    return;
  }
  const part = q.parti[ms.asking];
  const correctType = q.tipi[ms.asking];
  const allTypes = [...new Set(q.tipi)];
  if (allTypes.length < 3) allTypes.push('Coordinata','Subordinata relativa');
  const opts = shuffle([...new Set([correctType, ...allTypes])]).slice(0,4);
  if (!opts.includes(correctType)) opts[0] = correctType;
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci/game.tot)*100}%"></div></div><span class="progress-text">${game.ci+1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Analisi del Periodo 🌳</div>
      <div class="question-context" style="font-size:1rem">${q.frase.split('|').map((p,i)=>`<span style="${i===ms.asking?'background:rgba(177,151,252,.2);padding:2px 6px;border-radius:6px;font-weight:700':''}">${esc(p.trim())}</span>`).join(' <span style="color:var(--lav);font-weight:800">|</span> ')}</div>
      <div class="question-text">Che tipo di proposizione è la parte evidenziata?</div>
      <div class="answers-grid">${shuffle(opts).map(o=>`<button class="answer-btn" onclick="window._checkPS(this,'${esc(o)}','${esc(correctType)}')">${esc(o)}</button>`).join('')}</div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextPS()">Avanti ➜</button></div>
    </div>`);
}
window._checkPS = async (btn, sel, correct) => {
  document.querySelectorAll('.answer-btn').forEach(b=>b.classList.add('disabled'));
  if (sel === correct) {
    btn.classList.add('correct');
    game.ms.asking++;
    if (game.ms.asking >= game.qs[game.ci].parti.length) {
      game.sc++; await api.updateStreak(currentProfileId, true);
      const q = game.qs[game.ci];
      $el('feedback-box').innerHTML = `<div class="feedback ok">Analisi completa! 🎉${q.x?`<div class="explain">${esc(q.x)}</div>`:''}</div>`;
      $el('next-box').style.display = 'flex';
    } else {
      $el('feedback-box').innerHTML = `<div class="feedback ok">✅ Giusto! Prossima proposizione...</div>`;
      setTimeout(() => renderPrincSub(), 1000);
    }
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.answer-btn').forEach(b=>{if(b.textContent===correct)b.classList.add('reveal');});
    await api.updateStreak(currentProfileId, false);
    game.ms.asking++;
    $el('feedback-box').innerHTML = `<div class="feedback no">Era: <strong>${esc(correct)}</strong></div>`;
    if (game.ms.asking >= game.qs[game.ci].parti.length) { $el('next-box').style.display='flex'; }
    else { setTimeout(() => renderPrincSub(), 1500); }
  }
};
window._nextPS = () => { game.ci++; if(game.ci>=game.tot) endGame(); else showPrincSub(); };

// ══════════════════════════════════════
// PRODUZIONE: SCEGLI IL CONNETTIVO
// ══════════════════════════════════════
function startConnettivo(d) {
  let pool = [...(Q.prodConnettivo[d] || Q.prodConnettivo.facile || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length;
  showConnettivo();
}
function showConnettivo() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  const opts = shuffle([...q.opts]);
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci/game.tot)*100}%"></div></div><span class="progress-text">${game.ci+1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Scegli il Connettivo 🔗</div>
      <div class="question-text">Quale parola collega queste frasi?</div>
      <div class="connettivo-box">
        <div class="conn-frase">${esc(q.frase1)}</div>
        <div class="conn-slot">❓ ___</div>
        <div class="conn-frase">${esc(q.frase2)}</div>
      </div>
      <div class="answers-grid">${opts.map(o=>`<button class="answer-btn" onclick="window._checkConn(this,'${esc(o)}','${esc(q.a)}')">${esc(o)}</button>`).join('')}</div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextConn()">Avanti ➜</button></div>
    </div>`);
}
window._checkConn = async (btn, sel, correct) => {
  document.querySelectorAll('.answer-btn').forEach(b=>b.classList.add('disabled'));
  const q = game.qs[game.ci];
  if (sel === correct) { btn.classList.add('correct'); game.sc++; await api.updateStreak(currentProfileId,true); showFeedback(true,{x:q.x}); }
  else { btn.classList.add('wrong'); document.querySelectorAll('.answer-btn').forEach(b=>{if(b.textContent===correct)b.classList.add('reveal');}); await api.updateStreak(currentProfileId,false); showFeedback(false,{x:q.x,a:q.a},q.a); }
  $el('next-box').style.display='flex';
};
window._nextConn = () => { game.ci++; if(game.ci>=game.tot) endGame(); else showConnettivo(); };

// ══════════════════════════════════════
// PRODUZIONE: RIORDINA PARAGRAFI
// ══════════════════════════════════════
function startRiordinaParagrafi(d) {
  const data = Q.prodRiordinaParagrafi[d] || Q.prodRiordinaParagrafi.facile;
  if (!data?.length) { alert('Non disponibile!'); return onNavigate('category', game.cat); }
  const r = data[Math.floor(Math.random()*data.length)];
  game.os = { paragraphs: r.paragrafi, title: r.title, placed: [] };
  game.tot = r.paragrafi.length;
  game.ms = { shuffled: shuffle([...r.paragrafi]) };
  showRiordinaParagrafi();
}
function showRiordinaParagrafi() {
  const o = game.os, s = game.ms, cat = CATS.find(c => c.id === game.cat);
  const rem = s.shuffled.filter(p => !o.placed.includes(p));
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Riordina i Paragrafi 📄</div>
      <div class="question-text">${esc(o.title)}</div>
      <p style="color:var(--muted);font-size:.82rem;margin:8px 0">Tocca i paragrafi nell'ordine corretto del testo</p>
      <div class="sentence-slot" onclick="window._rpRemove()">${o.placed.length ? o.placed.map((p,i)=>`<div class="para-chip placed"><strong>${i+1}.</strong> ${esc(p)}</div>`).join('') : '<span style="color:var(--muted);font-size:.85rem">Tocca i paragrafi nell\'ordine giusto...</span>'}</div>
      <div class="sentence-bank">${rem.map(p=>`<div class="para-chip" onclick="window._rpPlace(this)">${esc(p)}</div>`).join('')}</div>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm" onclick="window._rpCheck()">Verifica ✓</button>
        <button class="btn btn-ghost btn-sm" onclick="window._rpReset()">🔄</button>
      </div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._rpEnd()">Risultati ➜</button></div>
    </div>`);
}
window._rpPlace = (el) => { game.os.placed.push(el.textContent); showRiordinaParagrafi(); };
window._rpRemove = () => { if(game.os.placed.length){game.os.placed.pop();showRiordinaParagrafi();} };
window._rpReset = () => { game.os.placed=[]; showRiordinaParagrafi(); };
window._rpCheck = async () => {
  const o = game.os;
  if (o.placed.join('|') === o.paragraphs.join('|')) {
    game.sc = game.tot; await api.updateStreak(currentProfileId, true);
    $el('feedback-box').innerHTML = `<div class="feedback ok">Ordine perfetto! 🎉</div>`;
  } else {
    await api.updateStreak(currentProfileId, false);
    $el('feedback-box').innerHTML = `<div class="feedback no">Non è l'ordine giusto 😅<br><small>${o.paragraphs.map((p,i)=>`<strong>${i+1}.</strong> ${esc(p.substring(0,60))}...`).join('<br>')}</small></div>`;
  }
  $el('next-box').style.display = 'flex';
};
window._rpEnd = () => endGame();

// ══════════════════════════════════════
// PRODUZIONE: REGISTRO LINGUISTICO
// ══════════════════════════════════════
function startRegistro(d) {
  let pool = [...(Q.prodRegistro[d] || Q.prodRegistro.facile || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length;
  showRegistro();
}
function showRegistro() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci/game.tot)*100}%"></div></div><span class="progress-text">${game.ci+1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Registro Linguistico 🎭</div>
      <div class="question-context"><strong>Situazione:</strong> ${esc(q.contesto)}</div>
      ${q.h ? `<div class="question-hint">💡 ${esc(q.h)}</div>` : ''}
      <div class="question-text">Quale versione è più appropriata?</div>
      <div class="registro-options">
        <div class="reg-option" onclick="window._checkReg('formale')">
          <div class="reg-label">🎩 Formale</div>
          <div class="reg-text">${esc(q.formale)}</div>
        </div>
        <div class="reg-option" onclick="window._checkReg('informale')">
          <div class="reg-label">😄 Informale</div>
          <div class="reg-text">${esc(q.informale)}</div>
        </div>
      </div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextReg()">Avanti ➜</button></div>
    </div>`);
}
window._checkReg = async (sel) => {
  const q = game.qs[game.ci];
  document.querySelectorAll('.reg-option').forEach(o=>o.style.pointerEvents='none');
  if (sel === q.a) {
    document.querySelector(`.reg-option:${q.a==='formale'?'first':'last'}-child`).classList.add('reg-correct');
    game.sc++; await api.updateStreak(currentProfileId, true);
    showFeedback(true, {x:q.x});
  } else {
    document.querySelector(`.reg-option:${sel==='formale'?'first':'last'}-child`).classList.add('reg-wrong');
    document.querySelector(`.reg-option:${q.a==='formale'?'first':'last'}-child`).classList.add('reg-correct');
    await api.updateStreak(currentProfileId, false);
    showFeedback(false, {x:q.x, a:q.a==='formale'?'Formale':'Informale'}, q.a==='formale'?'Formale':'Informale');
  }
  $el('next-box').style.display='flex';
};
window._nextReg = () => { game.ci++; if(game.ci>=game.tot) endGame(); else showRegistro(); };

// ══════════════════════════════════════
// PRODUZIONE: CORREGGI IL TEMA
// ══════════════════════════════════════
function startCorreggiTema(d) {
  let pool = [...(Q.prodCorreggi[d] || Q.prodCorreggi.facile || [])];
  game.qs = shuffle(pool).slice(0, Math.min(profileData.questions_count, pool.length));
  game.tot = game.qs.length;
  showCorreggiTema();
}
function showCorreggiTema() {
  const q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  const parts = q.testo.split('*');
  let html = '';
  for (let i = 0; i < parts.length; i++) {
    html += esc(parts[i]);
    if (i < parts.length - 1) {
      html += `<span class="error-word correggi-err" onclick="window._foundCorreggi(this)">${esc(q.errore)}</span>`;
      i++;
    }
  }
  renderInto(`
    <button class="nav-back" onclick="window._quitGame()">← Esci</button>
    <div class="quiz-area">
      <div class="progress-wrap"><div class="progress-bg"><div class="progress-fill" style="width:${(game.ci/game.tot)*100}%"></div></div><span class="progress-text">${game.ci+1}/${game.tot}</span></div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Correggi il Tema 🩹</div>
      <div class="question-text">Trova la frase che non ha senso nel contesto!</div>
      <div class="question-context" style="font-size:.95rem;line-height:1.8">${html}</div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._nextCorr()">Avanti ➜</button></div>
    </div>`);
}
window._foundCorreggi = async (el) => {
  const q = game.qs[game.ci];
  el.style.background = 'rgba(105,219,124,.3)'; el.style.textDecoration = 'line-through';
  game.sc++; await api.updateStreak(currentProfileId, true);
  $el('feedback-box').innerHTML = `<div class="feedback ok">Trovato! ✨<br>Correzione: <strong>${esc(q.corretto)}</strong>${q.x?`<div class="explain">${esc(q.x)}</div>`:''}</div>`;
  $el('next-box').style.display='flex';
};
window._nextCorr = () => { game.ci++; if(game.ci>=game.tot) endGame(); else showCorreggiTema(); };

// ══════════════════════════════════════
// CHALLENGE MODE (Sfide tra profili)
// ══════════════════════════════════════
export async function startChallenge(profile1Id, profile2Id, category) {
  const cat = CATS.find(c => c.id === category);
  if (!cat) return;
  const d = profileData.difficulty;

  // Get quiz bank for the category
  const bankMap = { grammatica: Q.gramQuiz, vocabolario: Q.vocabQuiz, verbi: Q.verbiQuiz, ortografia: Q.ortoQuiz, comprensione: Q.compSignificato, analisi: Q.analisiQuiz, produzione: Q.prodConnettivo };
  const bank = bankMap[category] || Q.gramQuiz;
  let pool = [...(bank[d] || bank.facile || [])];
  pool = shuffle(pool).slice(0, 5); // 5 questions per challenge

  game = { cat: category, mode: 'challenge', qs: pool, ci: 0, sc: 0, tot: pool.length, t0: Date.now(), tm: null, tv: 0, ms: { p1: profile1Id, p2: profile2Id, p1Score: 0, p2Score: 0, currentPlayer: 1, p1Name: '', p2Name: '' }, os: null };
  game._isCompleta = false;
  game._isCatena = false;

  // Get names
  const p1 = await api.getProfile(profile1Id);
  const p2 = await api.getProfile(profile2Id);
  game.ms.p1Name = p1?.name || 'Giocatore 1';
  game.ms.p2Name = p2?.name || 'Giocatore 2';

  showChallengeIntro();
}

function showChallengeIntro() {
  const ms = game.ms, cat = CATS.find(c => c.id === game.cat);
  renderInto(`
    <div class="quiz-area" style="text-align:center">
      <div style="font-size:3rem;margin-bottom:12px">⚔️</div>
      <h2>Sfida!</h2>
      <div style="font-size:1.2rem;margin:16px 0;font-weight:700">${esc(ms.p1Name)} <span style="color:var(--lav)">VS</span> ${esc(ms.p2Name)}</div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} ${cat.nm}</div>
      <p style="color:var(--muted);margin:14px 0">${game.tot} domande · Stesse domande per entrambi</p>
      <div class="btn-group"><button class="btn btn-primary" onclick="window._startChallengeRound()">Inizia! 🚀</button></div>
    </div>`);
}

window._startChallengeRound = () => {
  game.ms.currentPlayer = 1;
  game.ci = 0; game.sc = 0;
  showChallengeQuestion();
};

function showChallengeQuestion() {
  const ms = game.ms, q = game.qs[game.ci], cat = CATS.find(c => c.id === game.cat);
  const playerName = ms.currentPlayer === 1 ? ms.p1Name : ms.p2Name;
  const opts = shuffle([q.a, ...q.w.slice(0,3)]);

  renderInto(`
    <div class="quiz-area">
      <div style="text-align:center;margin-bottom:12px;font-weight:800;color:var(--lav)">🎮 Turno di ${esc(playerName)} · Domanda ${game.ci+1}/${game.tot}</div>
      <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} ${cat.nm}</div>
      <div class="question-text">${esc(q.q)}</div>
      ${q.h ? `<div class="question-hint">💡 ${esc(q.h)}</div>` : ''}
      <div class="answers-grid">${opts.map(o=>`<button class="answer-btn" onclick="window._challengeAnswer(this,'${escAttr(o)}','${escAttr(q.a)}')">${esc(o)}</button>`).join('')}</div>
      <div id="feedback-box"></div>
      <div id="next-box" style="display:none" class="btn-group"><button class="btn btn-primary" onclick="window._challengeNext()">Avanti ➜</button></div>
    </div>`);
}

window._challengeAnswer = (btn, sel, correct) => {
  document.querySelectorAll('.answer-btn').forEach(b=>b.classList.add('disabled'));
  const ms = game.ms;
  if (sel === correct) {
    btn.classList.add('correct');
    if (ms.currentPlayer === 1) ms.p1Score++; else ms.p2Score++;
    showFeedback(true, game.qs[game.ci]);
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.answer-btn').forEach(b=>{if(b.textContent===correct)b.classList.add('reveal');});
    showFeedback(false, game.qs[game.ci], correct);
  }
  $el('next-box').style.display='flex';
};

window._challengeNext = () => {
  game.ci++;
  if (game.ci >= game.tot) {
    if (game.ms.currentPlayer === 1) {
      // Switch to player 2
      game.ms.currentPlayer = 2;
      game.ci = 0;
      renderInto(`
        <div class="quiz-area" style="text-align:center">
          <div style="font-size:2.5rem;margin-bottom:12px">🔄</div>
          <h2>Tocca a ${esc(game.ms.p2Name)}!</h2>
          <p style="color:var(--muted);margin:14px 0">Passa il dispositivo. Stesse ${game.tot} domande.</p>
          <div class="btn-group"><button class="btn btn-primary" onclick="window._startP2()">Vai! 🚀</button></div>
        </div>`);
    } else {
      showChallengeResults();
    }
  } else {
    showChallengeQuestion();
  }
};
window._startP2 = () => showChallengeQuestion();

function showChallengeResults() {
  const ms = game.ms;
  let winner, emoji;
  if (ms.p1Score > ms.p2Score) { winner = ms.p1Name; emoji = '🏆'; }
  else if (ms.p2Score > ms.p1Score) { winner = ms.p2Name; emoji = '🏆'; }
  else { winner = 'Pareggio!'; emoji = '🤝'; }

  renderInto(`
    <div class="results-card">
      <span class="big-emoji">${emoji}</span>
      <h2>${winner === 'Pareggio!' ? 'Pareggio!' : `${esc(winner)} vince!`}</h2>
      <div class="challenge-scores">
        <div class="ch-score"><div class="ch-name">${esc(ms.p1Name)}</div><div class="ch-pts">${ms.p1Score}/${game.tot}</div></div>
        <div class="ch-vs">VS</div>
        <div class="ch-score"><div class="ch-name">${esc(ms.p2Name)}</div><div class="ch-pts">${ms.p2Score}/${game.tot}</div></div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="window._goHome()">🏠 Menu</button>
      </div>
    </div>`);
  if (winner !== 'Pareggio!') launchConfetti();
}
