// ══════════════════════════════════════
// SFIDA GIORNALIERA
// ══════════════════════════════════════
import { api } from './api.js';
import { esc, escAttr, shuffle, launchConfetti, CATS } from './utils.js';
import * as Q from './questions.js';

let _render   = null;
let _navigate = null;
let _profileId = null;

export function initDaily(profileId, renderFn, navigateFn) {
  _profileId = profileId;
  _render    = renderFn;
  _navigate  = navigateFn;
}

// Restituisce 5 domande casuali da categorie diverse
function pickDailyQuestions() {
  // Usa la data odierna come seed per la selezione delle categorie
  const today = new Date().toISOString().split('T')[0];
  const seed  = today.split('-').reduce((a, b) => parseInt(a) * 100 + parseInt(b), 0);
  const rng   = (n) => { const x = Math.sin(seed + n) * 10000; return x - Math.floor(x); };

  const banks = [
    { cat: 'grammatica',   bank: Q.gramQuiz },
    { cat: 'vocabolario',  bank: Q.vocabQuiz },
    { cat: 'verbi',        bank: Q.verbiQuiz },
    { cat: 'ortografia',   bank: Q.ortoQuiz },
    { cat: 'comprensione', bank: Q.compSignificato },
    { cat: 'analisi',      bank: Q.analisiQuiz },
  ];

  const difficulties = ['facile', 'medio', 'difficile'];
  const picked = [];
  // 5 domande da 5 categorie diverse (casuali ma deterministiche per data)
  const order = [...banks].sort((a, b) => rng(banks.indexOf(a)) - rng(banks.indexOf(b)));
  for (let i = 0; i < 5; i++) {
    const { cat, bank } = order[i % order.length];
    const diff = difficulties[Math.floor(rng(i * 7) * 3)];
    const pool = bank[diff] || bank.facile || [];
    if (!pool.length) continue;
    const idx = Math.floor(rng(i * 13) * pool.length);
    picked.push({ ...pool[idx], _cat: cat });
  }
  return picked.filter(Boolean);
}

// ── Schermata principale (chiamata da showHome) ──
export async function showDailyChallenge() {
  const status = await api.getDailyStatus(_profileId).catch(() => ({ completed: false }));

  if (status.completed) {
    const rec = status.record;
    _render(`
      <button class="nav-back" onclick="window._navigate('home')">← Menu</button>
      <div class="card" style="max-width:420px;margin:0 auto;text-align:center">
        <div style="font-size:3.5rem;margin-bottom:8px">🌟</div>
        <h2 style="margin-bottom:4px">Sfida Completata!</h2>
        <p style="color:var(--muted);margin-bottom:20px">Torna domani per una nuova sfida</p>
        <div style="display:flex;justify-content:center;gap:24px;margin-bottom:20px">
          <div style="text-align:center">
            <div style="font-size:2.2rem;font-weight:900;color:var(--lav)">${rec.score}/${rec.total}</div>
            <div style="font-size:.78rem;color:var(--muted)">Risposte corrette</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:2.2rem;font-weight:900;color:var(--sun)">+${rec.xp_earned} XP</div>
            <div style="font-size:.78rem;color:var(--muted)">Guadagnati</div>
          </div>
        </div>
        <button class="btn btn-ghost" onclick="window._navigate('home')">🏠 Torna al Menu</button>
      </div>`);
    return;
  }

  const questions = pickDailyQuestions();
  if (!questions.length) {
    alert('Nessuna domanda disponibile per oggi!');
    _navigate('home');
    return;
  }

  // Avvia il gioco
  _runDaily(questions);
}

function _runDaily(questions) {
  let ci = 0, sc = 0;
  const tot = questions.length;

  function showQ() {
    const q    = questions[ci];
    const pct  = (ci / tot) * 100;
    const opts = shuffle([q.a, ...(q.w || []).slice(0, 3)]);
    const cat  = CATS.find(c => c.id === q._cat) || { cl: ['#B197FC', '#D0BFFF'], ic: '🌟', nm: 'Sfida' };

    _render(`
      <div class="quiz-area">
        <div class="progress-wrap">
          <div class="progress-bg"><div class="progress-fill" style="width:${pct}%"></div></div>
          <span class="progress-text">${ci + 1}/${tot}</span>
        </div>
        <div class="category-tag" style="background:${cat.cl[0]}12;color:${cat.cl[0]}">${cat.ic} Sfida del Giorno 🌟</div>
        <div class="question-text">${esc(q.q)}</div>
        <div class="answers-grid">
          ${opts.map(o =>
            `<button class="answer-btn" onclick="window._dailyAnswer(this,'${escAttr(o)}','${escAttr(q.a)}')">${esc(o)}</button>`
          ).join('')}
        </div>
        <div id="daily-feedback"></div>
        <div id="daily-next" style="display:none" class="btn-group">
          <button class="btn btn-primary" onclick="window._dailyNext()">Avanti ➜</button>
        </div>
      </div>`);

    window._dailyAnswer = (btn, sel, correct) => {
      document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
      const ok = sel === correct;
      btn.classList.add(ok ? 'correct' : 'wrong');
      if (!ok) document.querySelectorAll('.answer-btn').forEach(b => {
        if (b.textContent.trim() === correct) b.classList.add('correct');
      });
      if (ok) sc++;
      document.getElementById('daily-feedback').innerHTML =
        `<div class="feedback ${ok ? 'ok' : 'no'}">${ok ? '✅ Esatto!' : `❌ Era: <strong>${esc(correct)}</strong>`}${q.explanation ? `<div class="explain">${esc(q.explanation)}</div>` : ''}</div>`;
      document.getElementById('daily-next').style.display = 'flex';
    };

    window._dailyNext = () => {
      ci++;
      if (ci >= tot) _endDaily(sc, tot);
      else showQ();
    };
  }

  showQ();
}

async function _endDaily(sc, tot) {
  // Salva sul server
  const result = await api.completeDailyChallenge(_profileId, sc, tot).catch(() => ({ xp: 0, alreadyDone: false }));
  if (!result.alreadyDone) launchConfetti();

  const perfect  = sc === tot;
  const emoji    = perfect ? '🏆' : sc >= tot * 0.6 ? '⭐' : '💪';
  const msg      = perfect ? 'Perfetto! Hai risposto a tutto correttamente!' : sc > 0 ? 'Ottimo lavoro, continua così!' : 'Riprova domani, puoi farcela!';

  _render(`
    <div class="card" style="max-width:420px;margin:0 auto;text-align:center">
      <div style="font-size:4rem;margin:8px 0">${emoji}</div>
      <h2 style="margin-bottom:4px">Sfida del Giorno Completata!</h2>
      <p style="color:var(--muted);margin-bottom:24px">${msg}</p>

      <div style="display:flex;justify-content:center;gap:32px;margin-bottom:24px">
        <div>
          <div style="font-size:2.4rem;font-weight:900;color:var(--lav)">${sc}/${tot}</div>
          <div style="font-size:.8rem;color:var(--muted)">Corrette</div>
        </div>
        <div>
          <div style="font-size:2.4rem;font-weight:900;color:var(--sun)">+${result.xp || 0}</div>
          <div style="font-size:.8rem;color:var(--muted)">XP guadagnati</div>
        </div>
      </div>

      ${perfect ? `<div style="padding:10px;background:rgba(255,209,0,.1);border-radius:12px;margin-bottom:16px;font-weight:700;color:var(--sun)">🌟 Punteggio Perfetto! Bonus +50 XP incluso!</div>` : ''}

      <div class="btn-group">
        <button class="btn btn-primary" onclick="window._navigate('home')">🏠 Torna al Menu</button>
      </div>
      <p style="font-size:.78rem;color:var(--muted);margin-top:14px">La prossima sfida sarà disponibile domani</p>
    </div>`);
}
