// ══════════════════════════════════════
// GLOSSARIO MATEMATICO — 5ª Elementare
// ══════════════════════════════════════
import { esc } from './utils.js';

let _render   = null;
let _navigate = null;

export function initMathGlossary(renderFn, navigateFn) {
  _render   = renderFn;
  _navigate = navigateFn;
}

// ── Dati ──────────────────────────────────────────────────────
export const MATH_GLOSSARY = [
  // ── Operazioni ───────────────────────────────────────────────
  { id:'addizione', term:'Addizione', cat:'Operazioni', tag:'Le 4 operazioni', color:'#4ECDC4',
    def:'Operazione che mette insieme due o più quantità per ottenere un totale chiamato <strong>somma</strong>.',
    types:['Addendi: i numeri che si sommano', 'Somma: il risultato', 'Proprietà commutativa: a + b = b + a', 'Elemento neutro: a + 0 = a'],
    examples:['<b>23 + 15 = 38</b> (somma)', 'Il <b>minuendo</b> è il numero da cui si sottrae', '345 + 678 = 1023'] },

  { id:'sottrazione', term:'Sottrazione', cat:'Operazioni', tag:'Le 4 operazioni', color:'#4ECDC4',
    def:'Operazione che toglie una quantità da un\'altra. Il risultato si chiama <strong>differenza</strong>.',
    types:['Minuendo: il numero da cui si toglie', 'Sottraendo: il numero da togliere', 'Differenza: il risultato', 'La sottrazione NON è commutativa: 8 − 3 ≠ 3 − 8'],
    examples:['<b>45 − 18 = 27</b>', 'Prova: 27 + 18 = 45 ✓', '1000 − 347 = 653'] },

  { id:'moltiplicazione', term:'Moltiplicazione', cat:'Operazioni', tag:'Le 4 operazioni', color:'#4ECDC4',
    def:'Operazione che equivale a una somma ripetuta. I numeri da moltiplicare si chiamano <strong>fattori</strong>, il risultato è il <strong>prodotto</strong>.',
    types:['Fattori: i numeri moltiplicati', 'Prodotto: il risultato', 'Commutativa: a × b = b × a', 'Distributiva: a × (b+c) = a×b + a×c', 'Elemento neutro: a × 1 = a', 'Elemento assorbente: a × 0 = 0'],
    examples:['<b>7 × 8 = 56</b>', '3 × 4 = 3+3+3+3 = 12 (somma ripetuta)', '100 × 45 = 4500 (aggiungi due zeri)'],
    tip:'Per × 10, 100, 1000: aggiungi rispettivamente 1, 2, 3 zeri.' },

  { id:'divisione', term:'Divisione', cat:'Operazioni', tag:'Le 4 operazioni', color:'#4ECDC4',
    def:'Operazione che distribuisce una quantità in parti uguali. Può avere un <strong>resto</strong>.',
    types:['Dividendo: il numero da dividere', 'Divisore: il numero per cui si divide', 'Quoziente: il risultato', 'Resto: ciò che avanza (sempre < divisore)', 'Prova: quoziente × divisore + resto = dividendo'],
    examples:['<b>48 ÷ 6 = 8</b> (resto 0)', '<b>23 ÷ 4 = 5</b> con resto <b>3</b>', '100 ÷ 8 = 12 con resto 4'],
    tip:'Se il resto è 0, il dividendo è divisibile per il divisore.' },

  { id:'mcd', term:'MCD — Massimo Comun Divisore', cat:'Operazioni', tag:'Divisibilità', color:'#45B7D1',
    def:'Il <strong>Massimo Comun Divisore</strong> di due numeri è il più grande numero che li divide entrambi senza resto.',
    types:['Metodo: trova tutti i divisori di entrambi i numeri', 'Divisori di 12: 1, 2, 3, 4, 6, 12', 'Divisori di 18: 1, 2, 3, 6, 9, 18', 'Comuni: 1, 2, 3, 6 → MCD = 6'],
    examples:['MCD(12, 18) = <b>6</b>', 'MCD(8, 12) = <b>4</b>', 'MCD(15, 25) = <b>5</b>'],
    tip:'Il MCD serve per semplificare le frazioni.' },

  { id:'mcm', term:'MCM — Minimo Comune Multiplo', cat:'Operazioni', tag:'Divisibilità', color:'#45B7D1',
    def:'Il <strong>Minimo Comune Multiplo</strong> di due numeri è il più piccolo numero che è multiplo di entrambi.',
    types:['Metodo: elenca i multipli di entrambi', 'Multipli di 4: 4, 8, 12, 16, 20, 24...', 'Multipli di 6: 6, 12, 18, 24...', 'Comune minimo: 12 → MCM = 12'],
    examples:['MCM(4, 6) = <b>12</b>', 'MCM(3, 5) = <b>15</b>', 'MCM(6, 9) = <b>18</b>'],
    tip:'Il MCM serve per sommare frazioni con denominatori diversi.' },

  // ── Geometria ────────────────────────────────────────────────
  { id:'perimetro', term:'Perimetro', cat:'Geometria', tag:'Misure delle figure', color:'#A29BFE',
    def:'Il <strong>perimetro</strong> è la lunghezza del contorno di una figura piana. Si misura in unità lineari (cm, m, km).',
    types:['Quadrato: P = 4 × l', 'Rettangolo: P = 2 × (b + h)', 'Triangolo: P = a + b + c', 'Rombo: P = 4 × l', 'Trapezio: P = B + b + l₁ + l₂'],
    examples:['Quadrato con l = 5 cm → P = <b>20 cm</b>', 'Rettangolo b=6, h=4 → P = <b>20 cm</b>', 'Triangolo 3+4+5 = <b>12 cm</b>'],
    tip:'Peri- (intorno) + metros (misura) → misura del contorno.' },

  { id:'area', term:'Area', cat:'Geometria', tag:'Misure delle figure', color:'#A29BFE',
    def:'L\'<strong>area</strong> è la misura della superficie interna di una figura. Si misura in unità quadrate (cm², m², km²).',
    types:['Quadrato: A = l²', 'Rettangolo: A = b × h', 'Triangolo: A = (b × h) / 2', 'Rombo: A = (D × d) / 2', 'Trapezio: A = (B + b) × h / 2', 'Cerchio: A = π × r²'],
    examples:['Quadrato l=5 → A = <b>25 cm²</b>', 'Rettangolo 6×4 → A = <b>24 cm²</b>', 'Triangolo b=6, h=4 → A = <b>12 cm²</b>'],
    tip:'Area e perimetro NON si confondono: area = spazio dentro, perimetro = contorno.' },

  { id:'angolo', term:'Angolo', cat:'Geometria', tag:'Angoli', color:'#FF6B6B',
    def:'Un <strong>angolo</strong> è la figura formata da due semirette (lati) che partono dallo stesso punto (vertice). Si misura in gradi (°).',
    types:['Angolo <b>retto</b>: esattamente 90°', 'Angolo <b>acuto</b>: minore di 90°', 'Angolo <b>ottuso</b>: tra 90° e 180°', 'Angolo <b>piatto</b>: esattamente 180°', 'Angolo <b>giro</b>: 360°'],
    examples:['Gli angoli di un quadrato sono tutti <b>retti (90°)</b>', 'Gli angoli di un triangolo equilatero sono tutti <b>60°</b>', 'Somma angoli triangolo = <b>180°</b>'] },

  { id:'triangolo', term:'Triangolo', cat:'Geometria', tag:'Poligoni', color:'#FF8E53',
    def:'Poligono con <strong>3 lati</strong> e 3 angoli. La somma degli angoli interni è sempre 180°.',
    types:['<b>Equilatero</b>: 3 lati uguali, 3 angoli di 60°', '<b>Isoscele</b>: 2 lati uguali, 2 angoli uguali', '<b>Scaleno</b>: 3 lati diversi, 3 angoli diversi', '<b>Rettangolo</b>: ha un angolo di 90°', '<b>Acutangolo</b>: tutti gli angoli < 90°', '<b>Ottusangolo</b>: un angolo > 90°'],
    examples:['Triangolo equilatero l=6 → P = <b>18 cm</b>', 'A = (b×h)/2: base 8, alt. 5 → A = <b>20 cm²</b>'] },

  { id:'quadrilateri', term:'Quadrilateri', cat:'Geometria', tag:'Poligoni', color:'#FF8E53',
    def:'Poligoni con <strong>4 lati</strong>. La somma degli angoli interni è sempre 360°.',
    types:['<b>Quadrato</b>: 4 lati uguali, 4 angoli retti', '<b>Rettangolo</b>: 2 coppie lati uguali, 4 angoli retti', '<b>Rombo</b>: 4 lati uguali, angoli non retti', '<b>Parallelogramma</b>: 2 coppie lati paralleli', '<b>Trapezio</b>: 1 coppia di lati paralleli (basi)'],
    examples:['Il quadrato è un caso speciale di rettangolo', 'Il rettangolo è un caso speciale di parallelogramma'] },

  { id:'cerchio', term:'Cerchio / Circonferenza', cat:'Geometria', tag:'Figure curve', color:'#FD79A8',
    def:'Il <strong>cerchio</strong> è la figura piana delimitata da una circonferenza: tutti i punti equidistanti dal centro.',
    types:['<b>Centro</b>: il punto da cui tutti i punti del bordo sono equidistanti', '<b>Raggio (r)</b>: distanza dal centro al bordo', '<b>Diametro (d)</b>: d = 2r (passa per il centro)', '<b>Corda</b>: segmento che unisce due punti del bordo', '<b>π (pi greco)</b>: ≈ 3,14159...'],
    examples:['r = 5 cm → d = 10 cm', 'C = 2πr ≈ 2 × 3,14 × 5 = <b>31,4 cm</b>', 'A = πr² ≈ 3,14 × 25 = <b>78,5 cm²</b>'],
    tip:'π è il rapporto tra la circonferenza e il diametro di qualsiasi cerchio.' },

  // ── Frazioni ─────────────────────────────────────────────────
  { id:'frazione', term:'Frazione', cat:'Frazioni', tag:'Definizioni', color:'#FDCB6E',
    def:'Una <strong>frazione</strong> indica una o più parti di un intero diviso in parti uguali.',
    types:['<b>Numeratore</b> (in alto): quante parti si considerano', '<b>Denominatore</b> (in basso): in quante parti è diviso l\'intero', '<b>Propria</b>: num < den → valore < 1 (es. 3/4)', '<b>Impropria</b>: num > den → valore > 1 (es. 5/3)', '<b>Apparente</b>: num multiplo del den → numero intero (es. 6/3 = 2)'],
    examples:['3/4 di una pizza: dividi in 4, prendi 3 fette', '1/2 = 0,5 · 1/4 = 0,25 · 3/4 = 0,75'],
    tip:'Denominatore ≠ 0: non si può dividere per zero!' },

  { id:'fraz-equiv', term:'Frazioni Equivalenti', cat:'Frazioni', tag:'Proprietà', color:'#FDCB6E',
    def:'Due frazioni sono <strong>equivalenti</strong> se rappresentano la stessa quantità, anche se scritte in modo diverso.',
    types:['Si moltiplicano (o dividono) numeratore E denominatore per lo stesso numero ≠ 0', '1/2 = 2/4 = 3/6 = 4/8 ... (×2, ×3, ×4)'],
    examples:['1/2 = 2/4 (×2)', '6/8 = 3/4 (÷2)', '12/16 = 3/4 (÷4, MCD = 4)'],
    tip:'Per semplificare una frazione, dividi numeratore e denominatore per il loro MCD.' },

  { id:'fraz-decimale', term:'Da Frazione a Decimale', cat:'Frazioni', tag:'Conversioni', color:'#FDCB6E',
    def:'Ogni frazione si può convertire in numero decimale dividendo il numeratore per il denominatore.',
    types:['1/2 = 1 ÷ 2 = 0,5', '1/4 = 1 ÷ 4 = 0,25', '3/4 = 3 ÷ 4 = 0,75', '1/3 = 0,333... (periodico)', '1/5 = 0,2 · 2/5 = 0,4 · 3/5 = 0,6'],
    examples:['3/4 = 75/100 = 0,75 = 75%', '2/5 = 4/10 = 0,4 = 40%', '7/4 = 1,75 (numero misto: 1 e 3/4)'] },

  // ── Misure ───────────────────────────────────────────────────
  { id:'sistema-metrico', term:'Sistema Metrico Decimale', cat:'Misure', tag:'Unità di misura', color:'#55EFC4',
    def:'Il sistema di misura internazionale basato sul <strong>metro</strong> come unità fondamentale. Ogni unità vale 10 volte quella precedente.',
    types:['km · hm · dam · <b>m</b> · dm · cm · mm', '× 10 scendendo · ÷ 10 salendo', '1 km = 1000 m · 1 m = 100 cm · 1 cm = 10 mm'],
    examples:['3,5 km = 3500 m', '250 cm = 2,5 m', '45 mm = 4,5 cm = 0,045 m'],
    tip:'Ricorda la sequenza: <b>K</b>ilo <b>H</b>ecto <b>D</b>eca <b>U</b>nità <b>d</b>eci <b>c</b>enti <b>m</b>illi' },

  { id:'misure-peso', term:'Misure di Peso', cat:'Misure', tag:'Unità di misura', color:'#55EFC4',
    def:'Le <strong>misure di peso</strong> indicano la massa di un corpo. L\'unità principale è il <strong>chilogrammo (kg)</strong>.',
    types:['t (tonnellata) = 1000 kg', 'q (quintale) = 100 kg', 'kg (chilogrammo)', 'hg (ettogrammo) = 100 g', 'dag (decagrammo) = 10 g', 'g (grammo)'],
    examples:['1 t = 1000 kg · 1 q = 100 kg', '2,5 kg = 2500 g', '4000 g = 4 kg'] },

  // ── Decimali ─────────────────────────────────────────────────
  { id:'decimale', term:'Numero Decimale', cat:'Decimali', tag:'Definizioni', color:'#6C5CE7',
    def:'Un <strong>numero decimale</strong> è un numero con cifre dopo la virgola, che rappresentano frazioni di unità.',
    types:['Parte intera: cifre prima della virgola', '1ª cifra decimale = <b>decimi</b> (1/10)', '2ª cifra decimale = <b>centesimi</b> (1/100)', '3ª cifra decimale = <b>millesimi</b> (1/1000)', 'Zeri finali: 1,5 = 1,50 = 1,500 (stessi valori)'],
    examples:['3,47 → 3 interi + 4 decimi + 7 centesimi', '0,08 = 8 centesimi = 8/100', '2,5 > 2,05 > 2,005'],
    tip:'Per confrontare decimali, allinea le virgole e confronta cifra per cifra.' },

  { id:'percentuale', term:'Percentuale', cat:'Decimali', tag:'Applicazioni', color:'#6C5CE7',
    def:'La <strong>percentuale</strong> indica quante parti su 100. Il simbolo è <strong>%</strong>.',
    types:['50% = 50/100 = 1/2 = 0,5', '25% = 25/100 = 1/4 = 0,25', '10% = 10/100 = 1/10 = 0,1', '1% = 1/100 = 0,01'],
    examples:['20% di 80: 80 × 20 ÷ 100 = <b>16</b>', 'Sconto 30% su €50: 50 × 0,7 = <b>€35</b>', '12 è il 15% di 80 (12 ÷ 80 × 100 = 15%)'],
    tip:'Percentuale ↔ decimale: sposta la virgola di 2 posti. 25% = 0,25' },

  { id:'arrotondamento', term:'Arrotondamento', cat:'Decimali', tag:'Applicazioni', color:'#6C5CE7',
    def:'L\'<strong>arrotondamento</strong> è l\'operazione che sostituisce un numero con un altro più semplice, vicino al valore originale.',
    types:['Guarda la cifra successiva a quella da arrotondare', 'Se ≥ 5 → arrotonda per <b>eccesso</b> (aggiungi 1)', 'Se < 5 → arrotonda per <b>difetto</b> (lascia invariata)'],
    examples:['3,47 al decimo → 3,5 (perché 7 ≥ 5)', '3,42 al decimo → 3,4 (perché 2 < 5)', '2,745 al centesimo → 2,75 (perché 5 ≥ 5)'],
    tip:'L\'arrotondamento introduce sempre un piccolo errore. Utile nella vita quotidiana!' },
];

// ── Categorie per filtro ──
const ALL_MATH_CATS = [...new Set(MATH_GLOSSARY.map(e => e.cat))];

// ── Schermata Glossario Matematico ──
export function showMathGlossary() {
  _renderMathGlossary('', 'Tutte');
}

function _renderMathGlossary(search, filterCat) {
  const q = (search || '').toLowerCase().trim();
  const filtered = MATH_GLOSSARY.filter(e => {
    const matchCat    = filterCat === 'Tutte' || e.cat === filterCat;
    const matchSearch = !q || e.term.toLowerCase().includes(q)
                             || e.def.toLowerCase().includes(q)
                             || e.tag.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  _render(`
    <button class="nav-back" onclick="window._mathNav('home')">← Menu Mat.</button>
    <h2 style="margin-bottom:4px">📐 Glossario di Matematica</h2>
    <p style="color:var(--muted);font-size:.85rem;margin-bottom:14px">${MATH_GLOSSARY.length} termini — clicca per la spiegazione completa</p>

    <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">
      <input type="text" id="mgloss-search" class="input" style="flex:1;min-width:160px"
        placeholder="🔍 Cerca un termine..." value="${esc(search)}"
        oninput="window._mathGlossSearch(this.value)">
      <select id="mgloss-cat" class="input" style="min-width:140px" onchange="window._mathGlossFilter(this.value)">
        <option value="Tutte" ${filterCat === 'Tutte' ? 'selected' : ''}>Tutte le categorie</option>
        ${ALL_MATH_CATS.map(c => `<option value="${c}" ${filterCat === c ? 'selected' : ''}>${c}</option>`).join('')}
      </select>
    </div>

    ${filtered.length === 0
      ? '<div class="card" style="text-align:center;color:var(--muted)">Nessun termine trovato 🔍</div>'
      : filtered.map(e => `
        <div class="card" style="margin-bottom:10px;cursor:pointer;border-left:4px solid ${e.color}"
          onclick="window._mathGlossDetail('${e.id}')">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="flex:1">
              <div style="font-weight:800;font-size:1rem">${esc(e.term)}</div>
              <div style="font-size:.78rem;color:var(--muted)">${esc(e.cat)} › ${esc(e.tag)}</div>
            </div>
            <div style="color:var(--muted);font-size:1.2rem">›</div>
          </div>
        </div>`).join('')}
  `);

  window._mathGlossSearch = (val) =>
    _renderMathGlossary(val, document.getElementById('mgloss-cat')?.value || 'Tutte');
  window._mathGlossFilter = (val) =>
    _renderMathGlossary(document.getElementById('mgloss-search')?.value || '', val);
  window._mathGlossDetail = (id) => _showMathEntry(MATH_GLOSSARY.find(e => e.id === id));
}

function _showMathEntry(e) {
  if (!e) return;
  _render(`
    <button class="nav-back" onclick="window._showMathGlossary()">← Glossario</button>
    <div class="card" style="border-top:4px solid ${e.color}">
      <div style="font-size:.78rem;color:var(--muted);margin-bottom:4px">${esc(e.cat)} › ${esc(e.tag)}</div>
      <h2 style="margin-bottom:12px;color:${e.color}">${esc(e.term)}</h2>
      <p style="margin-bottom:16px;line-height:1.6">${e.def}</p>

      ${e.types?.length ? `
        <div style="margin-bottom:16px">
          <div style="font-weight:700;margin-bottom:6px">📋 Definizioni / Proprietà</div>
          <ul style="margin:0;padding-left:18px">
            ${e.types.map(t => `<li style="margin-bottom:4px;font-size:.9rem">${t}</li>`).join('')}
          </ul>
        </div>` : ''}

      ${e.examples?.length ? `
        <div style="margin-bottom:16px">
          <div style="font-weight:700;margin-bottom:8px">💡 Esempi</div>
          ${e.examples.map(ex => `
            <div style="background:rgba(78,205,196,.07);border-left:3px solid ${e.color};padding:8px 12px;border-radius:0 8px 8px 0;margin-bottom:6px;font-size:.9rem;line-height:1.5">${ex}</div>
          `).join('')}
        </div>` : ''}

      ${e.tip ? `
        <div style="background:rgba(255,209,0,.1);border-radius:10px;padding:10px 14px;font-size:.88rem">
          ⭐ <strong>Ricorda:</strong> ${esc(e.tip)}
        </div>` : ''}
    </div>

    ${(() => {
      const related = MATH_GLOSSARY.filter(x => x.tag === e.tag && x.id !== e.id);
      if (!related.length) return '';
      return `<div style="margin-top:14px">
        <div style="font-weight:700;margin-bottom:8px;font-size:.9rem;color:var(--muted)">Vedi anche</div>
        ${related.map(r => `
          <div class="card" style="margin-bottom:6px;cursor:pointer;border-left:3px solid ${r.color};padding:10px 14px"
            onclick="window._mathGlossDetail('${r.id}')">
            <span style="font-weight:700">${esc(r.term)}</span>
            <span style="font-size:.78rem;color:var(--muted);margin-left:8px">${esc(r.tag)}</span>
          </div>`).join('')}
      </div>`;
    })()}
  `);
  window._mathGlossDetail = (id) => _showMathEntry(MATH_GLOSSARY.find(e => e.id === id));
}

window._showMathGlossary = () => showMathGlossary();
window._mathNav = (screen, param) => { /* viene impostato dall'app */ };
