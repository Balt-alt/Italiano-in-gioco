// ══════════════════════════════════════
// Utilities
// ══════════════════════════════════════

export function esc(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function escAttr(s) {
  return esc(s).replace(/'/g, "\\'");
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function genId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback per browser datati
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function launchConfetti() {
  const box = document.getElementById('confetti-box');
  if (!box) return;
  const colors = ['#FF6B6B', '#38BFA7', '#FFD166', '#B197FC', '#F783AC', '#74C0FC', '#69DB7C', '#FF922B'];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.width = (Math.random() * 7 + 5) + 'px';
    p.style.height = (Math.random() * 7 + 5) + 'px';
    p.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    p.style.animationDelay = (Math.random() * 0.7) + 's';
    if (Math.random() > 0.5) p.style.borderRadius = '50%';
    box.appendChild(p);
    setTimeout(() => p.remove(), 3500);
  }
}

// Avatars and colors
export const AVATARS = ['🦊', '🐱', '🦋', '🌸', '🐬', '🦄', '🌈', '🐝', '🎀', '🐢', '🦩', '🍀', '🐼', '🦉', '🎨', '🌺'];
export const AVATAR_COLORS = ['#FF6B6B', '#38BFA7', '#B197FC', '#FFD166', '#F783AC', '#74C0FC', '#69DB7C', '#FF922B'];

// Categories config
export const CATS = [
  { id: 'grammatica', nm: 'Grammatica', ic: '📝', ds: 'Analisi, struttura e parti del discorso', cl: ['#FF6B6B', '#F783AC'],
    modes: [
      { id: 'quiz', nm: 'Quiz', ic: '❓', ds: 'Domande a scelta multipla', tg: 'Classico' },
      { id: 'classifica', nm: 'Classifica la Parola', ic: '🏷️', ds: 'Trascina ogni parola nella categoria giusta', tg: 'Interattivo' },
      { id: 'completa', nm: 'Completa la Frase', ic: '✏️', ds: 'Riempi gli spazi vuoti', tg: 'Scrittura' },
      { id: 'ordina', nm: 'Ordina la Frase', ic: '🧩', ds: 'Rimetti le parole in ordine', tg: 'Costruzione' },
      { id: 'singplur', nm: 'Singolare ↔ Plurale', ic: '🔄', ds: 'Trasforma la frase dal singolare al plurale', tg: 'Trasformazione' },
      { id: 'costruisci', nm: 'Costruisci la Frase', ic: '🏗️', ds: 'Componi una frase con gli elementi dati', tg: 'Produzione' },
    ]},
  { id: 'vocabolario', nm: 'Vocabolario', ic: '📚', ds: 'Significati, sinonimi e contrari', cl: ['#38BFA7', '#74C0FC'],
    modes: [
      { id: 'quiz', nm: 'Quiz', ic: '❓', ds: 'Indovina il significato', tg: 'Classico' },
      { id: 'abbina', nm: 'Abbina Coppie', ic: '🔗', ds: 'Collega elementi corrispondenti', tg: 'Visivo' },
      { id: 'intruso', nm: 'Trova l\'Intruso', ic: '🔍', ds: 'Quale parola non appartiene?', tg: 'Logica' },
      { id: 'catena', nm: 'Catena di Parole', ic: '⛓️', ds: 'Trova la parola dagli indizi', tg: 'Deduzione' },
      { id: 'cruciverba', nm: 'Cruciverba', ic: '📰', ds: 'Risolvi il cruciverba con le definizioni', tg: 'Puzzle' },
      { id: 'indovina', nm: 'Indovina!', ic: '🎯', ds: 'Indizi progressivi: meno usi, più punti!', tg: 'Deduzione' },
      { id: 'memory', nm: 'Memory', ic: '🃏', ds: 'Trova le coppie parola-significato', tg: 'Memoria' },
    ]},
  { id: 'verbi', nm: 'Verbi', ic: '🔄', ds: 'Coniugazioni, tempi e modi verbali', cl: ['#B197FC', '#D0BFFF'],
    modes: [
      { id: 'quiz', nm: 'Quiz', ic: '❓', ds: 'Domande sui verbi', tg: 'Classico' },
      { id: 'coniuga', nm: 'Coniuga!', ic: '⌨️', ds: 'Scrivi la forma corretta', tg: 'Scrittura' },
      { id: 'trasforma', nm: 'Trasforma', ic: '🔀', ds: 'Cambia il tempo verbale', tg: 'Trasformazione' },
      { id: 'essereavere', nm: 'Essere o Avere?', ic: '⚖️', ds: 'Completa le frasi con la forma giusta di essere o avere', tg: '⭐ Esclusivo' },
    ]},
  { id: 'ortografia', nm: 'Ortografia', ic: '✍️', ds: 'Accenti, doppie e apostrofi', cl: ['#F0B830', '#FF922B'],
    modes: [
      { id: 'quiz', nm: 'Quiz', ic: '❓', ds: 'Quale forma è corretta?', tg: 'Classico' },
      { id: 'errore', nm: 'Trova l\'Errore', ic: '🔎', ds: 'Scopri la parola sbagliata', tg: 'Caccia' },
      { id: 'scrivi', nm: 'Scrivi Bene', ic: '✏️', ds: 'Riscrivi con l\'ortografia giusta', tg: 'Dettato' },
    ]},
  { id: 'comprensione', nm: 'Comprensione', ic: '🧠', ds: 'Leggere e capire i testi', cl: ['#69DB7C', '#38BFA7'],
    modes: [
      { id: 'leggi', nm: 'Leggi e Rispondi', ic: '📖', ds: 'Leggi il brano e rispondi', tg: 'Lettura' },
      { id: 'vf', nm: 'Vero o Falso', ic: '✅', ds: 'Decidi se è vero o falso', tg: 'Ragionamento' },
      { id: 'sequenza', nm: 'Ordina gli Eventi', ic: '📑', ds: 'Metti gli eventi in ordine', tg: 'Sequenza' },
      { id: 'significato', nm: 'Cosa Significa?', ic: '💡', ds: 'Interpreta modi di dire', tg: 'Interpretazione' },
      { id: 'causaeffetto', nm: 'Causa ed Effetto', ic: '🔀', ds: 'Collega ogni causa al suo effetto', tg: 'Logica' },
      { id: 'complstoria', nm: 'Completa la Storia', ic: '📝', ds: 'Inserisci i paragrafi mancanti', tg: 'Coerenza' },
      { id: 'dialogo', nm: 'Completa il Dialogo', ic: '💬', ds: 'Scegli la battuta giusta nel dialogo', tg: 'Comunicazione' },
    ]},
  { id: 'analisi', nm: 'Analisi Logica', ic: '🔍', ds: 'Soggetto, predicato, complementi e periodo', cl: ['#E84393', '#FD79A8'],
    modes: [
      { id: 'evidenzia', nm: 'Evidenzia', ic: '🖍️', ds: 'Tocca il soggetto, predicato o complemento', tg: 'Interattivo' },
      { id: 'classificacompl', nm: 'Classifica Complementi', ic: '🏷️', ds: 'Che tipo di complemento è?', tg: 'Classificazione' },
      { id: 'princsub', nm: 'Principale o Subordinata?', ic: '🌳', ds: 'Identifica il tipo di proposizione', tg: 'Analisi periodo' },
      { id: 'quizanalisi', nm: 'Quiz', ic: '❓', ds: 'Domande sull\'analisi logica', tg: 'Classico' },
    ]},
  { id: 'produzione', nm: 'Produzione Scritta', ic: '🖊️', ds: 'Connettivi, coerenza e registri linguistici', cl: ['#00B894', '#55EFC4'],
    modes: [
      { id: 'connettivo', nm: 'Scegli il Connettivo', ic: '🔗', ds: 'Quale parola collega le due frasi?', tg: 'Coesione' },
      { id: 'riordinaparagrafi', nm: 'Riordina Paragrafi', ic: '📄', ds: 'Metti i paragrafi nell\'ordine giusto', tg: 'Coerenza' },
      { id: 'registro', nm: 'Registro Linguistico', ic: '🎭', ds: 'Formale o informale? Scegli il tono giusto', tg: 'Pragmatica' },
      { id: 'correggi', nm: 'Correggi il Tema', ic: '🩹', ds: 'Trova gli errori di coerenza nel testo', tg: 'Revisione' },
    ]},
];

// ── Categorie Matematica ─────────────────────────────────────
export const MATH_CATS = [
  { id:'operazioni', nm:'Operazioni', ic:'🔢', ds:'Addizione, sottrazione, moltiplicazione, divisione', cl:['#4ECDC4','#45B7D1'],
    modes:[
      { id:'calcolo',  nm:'Calcolo Veloce',    ic:'⚡', ds:'Risolvi operazioni a scelta multipla', tg:'Velocità' },
      { id:'scrivi',   nm:'Scrivi il Risultato', ic:'✏️', ds:'Digita la risposta esatta', tg:'Precisione' },
      { id:'colonna',  nm:'In Colonna',         ic:'📊', ds:'Operazioni in formato colonna', tg:'Tecnica' },
    ]},
  { id:'problemi', nm:'Problemi', ic:'📝', ds:'Situazioni reali da risolvere con la matematica', cl:['#FF6B6B','#FF8E53'],
    modes:[
      { id:'problema', nm:'Risolvi il Problema', ic:'🧩', ds:'Leggi e scegli la risposta giusta', tg:'Ragionamento' },
    ]},
  { id:'geometria', nm:'Geometria', ic:'📐', ds:'Figure, aree, perimetri e formule', cl:['#A29BFE','#6C5CE7'],
    modes:[
      { id:'formulario',  nm:'Formulario',    ic:'📋', ds:'Consulta tutte le formule geometriche', tg:'Riferimento' },
      { id:'calcola-geo', nm:'Calcola!',      ic:'📏', ds:'Calcola area e perimetro delle figure', tg:'Calcolo' },
      { id:'quiz-geo',    nm:'Quiz Figure',   ic:'❓', ds:'Proprietà e caratteristiche delle figure', tg:'Teoria' },
    ]},
  { id:'frazioni', nm:'Frazioni', ic:'½', ds:'Frazioni equivalenti, confronto e operazioni', cl:['#FD79A8','#E84393'],
    modes:[
      { id:'quiz-fraz',     nm:'Quiz Frazioni', ic:'❓', ds:'Domande sulle frazioni', tg:'Classico' },
      { id:'confronta-fraz',nm:'Confronta',     ic:'⚖️', ds:'Quale frazione è più grande?', tg:'Confronto' },
    ]},
  { id:'misure', nm:'Misure', ic:'📏', ds:'Lunghezze, pesi, capacità, conversioni', cl:['#55EFC4','#00B894'],
    modes:[
      { id:'conversioni', nm:'Conversioni', ic:'🔄', ds:'Converti tra le unità di misura', tg:'Pratico' },
    ]},
  { id:'decimali', nm:'Decimali', ic:'🔟', ds:'Numeri decimali, confronto e operazioni', cl:['#FDCB6E','#E17055'],
    modes:[
      { id:'quiz-dec', nm:'Quiz Decimali', ic:'❓', ds:'Domande sui numeri decimali', tg:'Classico' },
    ]},
];

// Badges config
export const BADGES = [
  { id: 'fg', nm: 'Prima Partita', ic: '🎮', ds: 'Completa 1 partita', ck: p => p.games_played >= 1 },
  { id: 'g5', nm: 'Esploratore', ic: '🗺️', ds: '5 partite', ck: p => p.games_played >= 5 },
  { id: 'g10', nm: 'Campione', ic: '🏅', ds: '10 partite', ck: p => p.games_played >= 10 },
  { id: 'g25', nm: 'Veterano', ic: '🎖️', ds: '25 partite', ck: p => p.games_played >= 25 },
  { id: 's5', nm: 'In Serie!', ic: '🔥', ds: '5 risposte di fila', ck: p => p.best_streak >= 5 },
  { id: 's10', nm: 'Inarrestabile', ic: '⚡', ds: '10 risposte di fila', ck: p => p.best_streak >= 10 },
  { id: 'pf', nm: 'Perfezionista', ic: '💎', ds: '100% in una partita', ck: p => (p.category_scores || []).some(c => c.best_score >= 100) },
  { id: 'x1', nm: 'Studioso', ic: '📚', ds: '100 XP', ck: p => p.xp >= 100 },
  { id: 'x5', nm: 'Sapiente', ic: '🦉', ds: '500 XP', ck: p => p.xp >= 500 },
  { id: 'x10', nm: 'Genio!', ic: '🧠', ds: '1000 XP', ck: p => p.xp >= 1000 },
  { id: 'l5', nm: 'Livello 5', ic: '⭐', ds: 'Raggiungi lv. 5', ck: p => Math.floor(p.xp / 200) + 1 >= 5 },
  { id: 'l10', nm: 'Livello 10', ic: '👑', ds: 'Raggiungi lv. 10', ck: p => Math.floor(p.xp / 200) + 1 >= 10 },
  { id: 'cw1', nm: 'Campione di Classe', ic: '🏆', ds: 'Vinto una sfida di classe', ck: p => (p.badges||[]).includes('cw1') },
  { id: 'cp3', nm: 'Sul Podio', ic: '🥉', ds: 'Top 3 in una sfida di classe', ck: p => (p.badges||[]).includes('cp3') },
];

export async function checkBadges(profileId, profile, apiFn) {
  const newBadges = [];
  for (const b of BADGES) {
    if (!(profile.badges || []).includes(b.id) && b.ck(profile)) {
      const added = await apiFn(profileId, b.id);
      if (added) newBadges.push(b);
    }
  }
  return newBadges;
}
