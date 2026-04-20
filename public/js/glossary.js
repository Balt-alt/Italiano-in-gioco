// ══════════════════════════════════════
// GLOSSARIO GRAMMATICALE
// ══════════════════════════════════════
import { esc } from './utils.js';

let _render   = null;
let _navigate = null;

export function initGlossary(renderFn, navigateFn) {
  _render   = renderFn;
  _navigate = navigateFn;
}

// ── Dati ──
export const GLOSSARY = [
  // ── MORFOLOGIA: Articoli ──────────────────────────────────
  { id: 'articolo', term: 'Articolo', cat: 'Morfologia', tag: 'Articoli', color: '#B197FC',
    def: 'Parola che si mette davanti al nome per indicarlo. Si concorda in genere (maschile/femminile) e numero (singolare/plurale) con il nome.',
    types: ['Determinativo: il, lo, la, i, gli, le', 'Indeterminativo: un, uno, una, un\'', 'Partitivo: del, dello, della, dei, degli, delle'],
    examples: ['<b>Il</b> gatto dorme.', 'Ho visto <b>una</b> farfalla.', 'Vuoi <b>del</b> pane?'] },

  { id: 'art-det', term: 'Articolo determinativo', cat: 'Morfologia', tag: 'Articoli', color: '#B197FC',
    def: 'Indica una persona o cosa specifica, già conosciuta o unica.',
    types: ['Masch. sing.: <b>il</b> (consonante), <b>lo</b> (s+cons, z, gn, ps, x), <b>l\'</b> (vocale)', 'Femm. sing.: <b>la</b>, <b>l\'</b> (vocale)', 'Masch. plur.: <b>i</b>, <b>gli</b>', 'Femm. plur.: <b>le</b>'],
    examples: ['<b>Il</b> libro che ho letto era bello.', '<b>Lo</b> zaino pesa molto.', '<b>Gli</b> studenti studiano.'] },

  { id: 'art-indet', term: 'Articolo indeterminativo', cat: 'Morfologia', tag: 'Articoli', color: '#B197FC',
    def: 'Indica una persona o cosa non specificata, una qualunque della categoria.',
    types: ['Masch.: <b>un</b> (consonante/vocale), <b>uno</b> (s+cons, z, gn, ps)', 'Femm.: <b>una</b>, <b>un\'</b> (vocale)'],
    examples: ['Ho incontrato <b>un</b> amico.', 'C\'era <b>uno</b> strano rumore.', 'È arrivata <b>una</b> lettera.'] },

  // ── MORFOLOGIA: Nomi ─────────────────────────────────────
  { id: 'nome', term: 'Nome (sostantivo)', cat: 'Morfologia', tag: 'Nomi', color: '#74C0FC',
    def: 'Parola che indica persone, animali, cose, luoghi o concetti astratti. Ha genere e numero.',
    types: ['Comune: gatto, città, libro', 'Proprio: Marco, Roma, Italia', 'Concreto: tavolo, acqua, mano', 'Astratto: gioia, libertà, coraggio', 'Collettivo: gregge, foresta, stormo'],
    examples: ['<b>Marco</b> (proprio) gioca con il <b>cane</b> (comune).', 'La <b>felicità</b> (astratto) è preziosa.', 'Un <b>gregge</b> (collettivo) di pecore.'] },

  { id: 'genere', term: 'Genere del nome', cat: 'Morfologia', tag: 'Nomi', color: '#74C0FC',
    def: 'I nomi italiani hanno genere maschile o femminile. Spesso si riconosce dalla desinenza (finale).',
    types: ['Maschile: di solito finisce in -o (libro) o -e (fiore)', 'Femminile: di solito finisce in -a (casa) o -e (notte)', 'Eccezioni: il problema (masch.), la mano (femm.)'],
    examples: ['<b>Il libro</b> (masch.) — <b>la penna</b> (femm.)', '<b>Il fiore</b> (masch.) — <b>la notte</b> (femm.)'] },

  { id: 'numero', term: 'Numero del nome', cat: 'Morfologia', tag: 'Nomi', color: '#74C0FC',
    def: 'I nomi cambiano forma per indicare uno (singolare) o più (plurale) elementi.',
    types: ['Singolare → Plurale: libro → libr<b>i</b>, casa → cas<b>e</b>', 'Invariabili: città → città, caffè → caffè', 'Solo plurale: occhiali, forbici, pantaloni'],
    examples: ['<b>Un gatto</b> → <b>due gatti</b>', '<b>Una rosa</b> → <b>molte rose</b>', '<b>La città</b> → <b>le città</b> (invariabile)'] },

  // ── MORFOLOGIA: Aggettivi ────────────────────────────────
  { id: 'aggettivo', term: 'Aggettivo', cat: 'Morfologia', tag: 'Aggettivi', color: '#63E6BE',
    def: 'Parola che accompagna il nome per indicarne una qualità o caratteristica. Concorda in genere e numero con il nome.',
    types: ['Qualificativo: bello, grande, veloce', 'Possessivo: mio, tuo, suo, nostro', 'Dimostrativo: questo, quello, codesto', 'Numerale: primo, tre, doppio', 'Indefinito: alcuni, ogni, nessuno', 'Interrogativo/Esclamativo: quale, quanto, che'],
    examples: ['Una <b>bella</b> giornata (qualificativo).', '<b>Il mio</b> zaino è pesante (possessivo).', '<b>Questo</b> libro è interessante (dimostrativo).'] },

  { id: 'gradi-agg', term: 'Gradi dell\'aggettivo', cat: 'Morfologia', tag: 'Aggettivi', color: '#63E6BE',
    def: 'Gli aggettivi qualificativi hanno tre gradi che indicano l\'intensità della qualità.',
    types: ['Positivo: bello, grande', 'Comparativo: più bello di, bello come, meno bello di', 'Superlativo relativo: il più bello', 'Superlativo assoluto: bellissimo, molto bello'],
    examples: ['Marco è <b>alto</b> (positivo).', 'Luca è <b>più alto di</b> Marco (comparativo).', 'Sara è <b>la più alta</b> della classe (superlativo relativo).'] },

  // ── MORFOLOGIA: Pronomi ─────────────────────────────────
  { id: 'pronome', term: 'Pronome', cat: 'Morfologia', tag: 'Pronomi', color: '#FFA94D',
    def: 'Parola che sostituisce il nome per evitare ripetizioni.',
    types: ['Personale: io, tu, lui, lei, noi, voi, loro', 'Possessivo: il mio, il tuo, il suo', 'Dimostrativo: questo, quello, ci, vi', 'Relativo: che, cui, il quale', 'Indefinito: qualcuno, nessuno, tutto'],
    examples: ['<b>Io</b> leggo un libro (personale).', 'Il libro è <b>mio</b> (possessivo).', 'Il ragazzo <b>che</b> conosco (relativo).'] },

  // ── MORFOLOGIA: Verbi ───────────────────────────────────
  { id: 'verbo', term: 'Verbo', cat: 'Morfologia', tag: 'Verbi', color: '#FF6B6B',
    def: 'Parola che indica un\'azione, uno stato o un processo. È il nucleo della frase.',
    types: ['Transitivo: ha un complemento oggetto (mangio <b>una mela</b>)', 'Intransitivo: non ha complemento oggetto (corro veloce)', 'Riflessivo: l\'azione ricade sul soggetto (mi lavo)', 'Ausiliare: essere, avere (usati per i tempi composti)'],
    examples: ['<b>Leggo</b> un libro (transitivo).', '<b>Dormo</b> profondamente (intransitivo).', '<b>Mi sveglio</b> presto (riflessivo).'] },

  { id: 'modi-verbo', term: 'Modi del verbo', cat: 'Morfologia', tag: 'Verbi', color: '#FF6B6B',
    def: 'I modi indicano come il parlante presenta l\'azione.',
    types: ['Indicativo: esprime realtà (io mangio)', 'Congiuntivo: esprime dubbio/desiderio (penso che mangi)', 'Condizionale: esprime condizione (mangerei)', 'Imperativo: esprime ordine (mangia!)', 'Infinito: forma base (mangiare)', 'Participio: usato come aggettivo (mangiato)', 'Gerundio: azione contemporanea (mangiando)'],
    examples: ['<b>Studio</b> molto (indicativo).', 'Vorrei che tu <b>studiassi</b> (congiuntivo).', '<b>Studierei</b> di più (condizionale).'] },

  { id: 'tempi-verbo', term: 'Tempi verbali', cat: 'Morfologia', tag: 'Verbi', color: '#FF6B6B',
    def: 'I tempi indicano quando si svolge l\'azione rispetto al momento in cui si parla.',
    types: ['Passato: azione già avvenuta (ho mangiato, mangiavo, mangiai)', 'Presente: azione in corso (mangio)', 'Futuro: azione che avverrà (mangerò)'],
    examples: ['<b>Ho studiato</b> ieri (passato prossimo).', '<b>Studio</b> adesso (presente).', '<b>Studierò</b> domani (futuro semplice).'] },

  { id: 'coniugazioni', term: 'Coniugazioni', cat: 'Morfologia', tag: 'Verbi', color: '#FF6B6B',
    def: 'I verbi italiani si dividono in tre coniugazioni in base alla desinenza dell\'infinito.',
    types: ['1ª coniugazione: -ARE (parlare, camminare)', '2ª coniugazione: -ERE (leggere, correre)', '3ª coniugazione: -IRE (dormire, finire)'],
    examples: ['<b>Parlare</b>: io parl-o, tu parl-i, lui parl-a', '<b>Leggere</b>: io legg-o, tu legg-i, lui legg-e', '<b>Dormire</b>: io dorm-o, tu dorm-i, lui dorm-e'] },

  // ── MORFOLOGIA: Avverbi ─────────────────────────────────
  { id: 'avverbio', term: 'Avverbio', cat: 'Morfologia', tag: 'Avverbi', color: '#9775FA',
    def: 'Parola invariabile che modifica il significato di un verbo, un aggettivo o un altro avverbio.',
    types: ['Modo: bene, male, velocemente, insieme', 'Tempo: oggi, ieri, presto, spesso', 'Luogo: qui, là, dentro, sopra', 'Quantità: molto, poco, abbastanza, troppo', 'Affermazione/Negazione: sì, no, non, forse'],
    examples: ['Corro <b>velocemente</b> (modo).', 'Arrivo <b>domani</b> (tempo).', 'Il gatto è <b>qui</b> (luogo).'] },

  // ── MORFOLOGIA: Preposizioni ────────────────────────────
  { id: 'preposizione', term: 'Preposizione', cat: 'Morfologia', tag: 'Preposizioni', color: '#20C997',
    def: 'Parola invariabile che collega due elementi della frase indicando un rapporto (luogo, tempo, modo...).',
    types: ['Semplici: di, a, da, in, con, su, per, tra, fra', 'Articolate: del, al, dal, nel, col, sul (prep. + articolo)'],
    examples: ['Vado <b>a</b> scuola (luogo).', 'Il libro <b>di</b> Marco (possesso).', 'Torno <b>tra</b> un\'ora (tempo).'] },

  // ── MORFOLOGIA: Congiunzioni ────────────────────────────
  { id: 'congiunzione', term: 'Congiunzione', cat: 'Morfologia', tag: 'Congiunzioni', color: '#F06595',
    def: 'Parola invariabile che collega parole, frasi o proposizioni.',
    types: ['Coordinanti: e, o, ma, però, quindi, infatti, anzi', 'Subordinanti: che, perché, quando, se, mentre, affinché'],
    examples: ['Marco <b>e</b> Luca giocano (coordinante copulativa).', 'Non esco <b>perché</b> piove (subordinante causale).', 'Dimmelo <b>se</b> puoi (subordinante condizionale).'] },

  // ── SINTASSI ────────────────────────────────────────────
  { id: 'frase', term: 'Frase (proposizione)', cat: 'Sintassi', tag: 'Struttura', color: '#339AF0',
    def: 'Gruppo di parole che esprime un senso compiuto. Di solito contiene un soggetto e un predicato.',
    types: ['Semplice (proposizione): ha un solo predicato', 'Complessa (periodo): ha più proposizioni collegate'],
    examples: ['<b>Il cane abbaia.</b> (frase semplice)', '<b>Il cane abbaia perché sente un rumore.</b> (periodo)'] },

  { id: 'soggetto', term: 'Soggetto', cat: 'Sintassi', tag: 'Elementi della frase', color: '#339AF0',
    def: 'È l\'elemento della frase di cui si parla. Compie o subisce l\'azione indicata dal predicato. Concorda con il verbo.',
    types: ['Espresso: presente nella frase (Marco studia)', 'Sottinteso: non scritto ma ricavabile (Studia molto = lui studia)', 'Soggetto partitivo: con del/dei... (Arrivò della gente)'],
    examples: ['<b>Il gatto</b> dorme sul divano.', '<b>Sara</b> legge un libro.', '<b>I bambini</b> giocano in giardino.'],
    tip: 'Cerca chi o cosa compie l\'azione. Domanda: "Chi/cosa + verbo?"' },

  { id: 'predicato', term: 'Predicato', cat: 'Sintassi', tag: 'Elementi della frase', color: '#339AF0',
    def: 'Dice qualcosa del soggetto: indica l\'azione che compie o lo stato in cui si trova.',
    types: ['Predicato verbale: verbo di significato autonomo (Il cane <b>abbaia</b>)', 'Predicato nominale: verbo essere + nome/aggettivo (Marco <b>è stanco</b>)'],
    examples: ['Luisa <b>canta</b> una canzone (predicato verbale).', 'Il cielo <b>è azzurro</b> (predicato nominale).'],
    tip: 'Il predicato è sempre il verbo principale della frase.' },

  { id: 'complemento-oggetto', term: 'Complemento oggetto (diretto)', cat: 'Sintassi', tag: 'Complementi', color: '#FF8787',
    def: 'Indica la persona, l\'animale o la cosa su cui ricade direttamente l\'azione del verbo transitivo. Non è introdotto da preposizione.',
    examples: ['Leggo <b>un libro</b>.', 'Marco mangia <b>la pizza</b>.', 'La maestra spiega <b>la lezione</b>.'],
    tip: 'Domanda: "Chi/cosa + verbo?" senza preposizione.' },

  { id: 'complementi-indiretti', term: 'Complementi indiretti', cat: 'Sintassi', tag: 'Complementi', color: '#FF8787',
    def: 'Tutti i complementi introdotti da una preposizione. Arricchiscono la frase con informazioni su luogo, tempo, modo, causa...',
    types: ['Luogo: Abito <b>a Roma</b> / Vengo <b>dal parco</b>', 'Tempo: Studio <b>ogni giorno</b>', 'Modo: Cammina <b>con cautela</b>', 'Causa: Non esce <b>per la pioggia</b>', 'Fine: Studio <b>per imparare</b>', 'Specificazione: Il libro <b>di Marco</b>'],
    examples: ['Vado <b>a scuola</b> (luogo).', 'Torno <b>domani</b> (tempo).', 'Parla <b>con gentilezza</b> (modo).'] },

  { id: 'prop-principale', term: 'Proposizione principale', cat: 'Sintassi', tag: 'Proposizioni', color: '#74C0FC',
    def: 'La proposizione più importante del periodo. Ha senso compiuto anche da sola e non dipende da nessun\'altra proposizione.',
    examples: ['<b>Sono andato a casa</b> perché ero stanco.', '<b>Marco studia</b> mentre ascolta la musica.'],
    tip: 'Prova a isolarla: se ha senso da sola, è la principale.' },

  { id: 'prop-subordinata', term: 'Proposizione subordinata', cat: 'Sintassi', tag: 'Proposizioni', color: '#74C0FC',
    def: 'Proposizione che dipende dalla principale e ne arricchisce il significato. È introdotta da una congiunzione subordinante.',
    types: ['Causale: perché, poiché, dato che', 'Temporale: quando, mentre, dopo che', 'Condizionale: se, qualora', 'Finale: affinché, per, per fare in modo che', 'Consecutiva: così... che, tanto... da'],
    examples: ['Non esco <b>perché piove</b> (causale).', 'Telefona <b>quando arrivi</b> (temporale).', 'Studia <b>se vuoi passare</b> (condizionale).'] },

  // ── ORTOGRAFIA ──────────────────────────────────────────
  { id: 'accento', term: 'Accento', cat: 'Ortografia', tag: 'Segni grafici', color: '#A9E34B',
    def: 'Segno grafico (`) che indica la sillaba su cui cade la pronuncia più forte, o che distingue parole di diverso significato.',
    types: ['Accento grave (`): è, à, ì, ò, ù', 'Accento acuto (´): perché, né'],
    examples: ['<b>è</b> (verbo essere) vs <b>e</b> (congiunzione)', '<b>là</b> (avverbio) vs <b>la</b> (articolo/pronome)', '<b>sì</b> (affermazione) vs <b>si</b> (pronome)'] },

  { id: 'apostrofo', term: 'Apostrofo', cat: 'Ortografia', tag: 'Segni grafici', color: '#A9E34B',
    def: 'Segno grafico (\') che indica l\'elisione (caduta) di una vocale finale davanti a parola che inizia per vocale.',
    examples: ['<b>l\'amico</b> (lo amico → l\'amico)', '<b>dell\'uva</b> (dello uva → dell\'uva)', '<b>un\'amica</b> (una amica → un\'amica)'],
    tip: 'L\'apostrofo non si usa con "un" maschile (un amico, non un\'amico).' },

  { id: 'punteggiatura', term: 'Punteggiatura', cat: 'Ortografia', tag: 'Segni grafici', color: '#A9E34B',
    def: 'Sistema di segni grafici che organizza il testo scritto indicando pause e intonazioni.',
    types: ['. Punto: fine frase', ', Virgola: pausa breve, elenchi', '; Punto e virgola: pausa media', ': Due punti: introducono un elenco o una spiegazione', '! Punto esclamativo: esclamazione', '? Punto interrogativo: domanda', '... Puntini di sospensione: frase interrotta o incompleta'],
    examples: ['Il gatto dorme<b>.</b>', 'Ho comprato pane<b>,</b> latte<b>,</b> frutta<b>.</b>', 'Che bella giornata<b>!</b>'] },
];

// ── Categorie per filtro ──
const ALL_CATS = [...new Set(GLOSSARY.map(e => e.cat))];
const ALL_TAGS = [...new Set(GLOSSARY.map(e => e.tag))];

// ── Schermata Glossario ──
export function showGlossary() {
  _renderGlossary('', 'Tutte');
}

function _renderGlossary(search, filterCat) {
  const q    = (search || '').toLowerCase().trim();
  const filtered = GLOSSARY.filter(e => {
    const matchCat  = filterCat === 'Tutte' || e.cat === filterCat;
    const matchSearch = !q || e.term.toLowerCase().includes(q) || e.def.toLowerCase().includes(q) || e.tag.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  _render(`
    <button class="nav-back" onclick="window._navigate('home')">← Menu</button>
    <h2 style="margin-bottom:4px">📚 Glossario Grammaticale</h2>
    <p style="color:var(--muted);font-size:.85rem;margin-bottom:14px">${GLOSSARY.length} termini — clicca su un termine per la spiegazione completa</p>

    <!-- Ricerca e filtro -->
    <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">
      <input type="text" id="gloss-search" class="input" style="flex:1;min-width:160px"
        placeholder="🔍 Cerca un termine..." value="${esc(search)}"
        oninput="window._glossSearch(this.value)">
      <select id="gloss-cat" class="input" style="min-width:140px" onchange="window._glossFilter(this.value)">
        <option value="Tutte" ${filterCat === 'Tutte' ? 'selected' : ''}>Tutte le categorie</option>
        ${ALL_CATS.map(c => `<option value="${c}" ${filterCat === c ? 'selected' : ''}>${c}</option>`).join('')}
      </select>
    </div>

    <!-- Lista termini -->
    ${filtered.length === 0
      ? '<div class="card" style="text-align:center;color:var(--muted)">Nessun termine trovato 🔍</div>'
      : filtered.map(e => `
        <div class="card" style="margin-bottom:10px;cursor:pointer;border-left:4px solid ${e.color}"
          onclick="window._glossDetail('${e.id}')">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="flex:1">
              <div style="font-weight:800;font-size:1rem">${esc(e.term)}</div>
              <div style="font-size:.78rem;color:var(--muted)">${esc(e.cat)} › ${esc(e.tag)}</div>
            </div>
            <div style="color:var(--muted);font-size:1.2rem">›</div>
          </div>
        </div>`).join('')}
  `);

  // Mantieni i valori dei filtri
  window._glossSearch = (val) => _renderGlossary(val, document.getElementById('gloss-cat')?.value || 'Tutte');
  window._glossFilter = (val) => _renderGlossary(document.getElementById('gloss-search')?.value || '', val);
  window._glossDetail = (id)  => _showEntry(GLOSSARY.find(e => e.id === id));
}

function _showEntry(e) {
  if (!e) return;
  _render(`
    <button class="nav-back" onclick="window._showGlossary()">← Glossario</button>
    <div class="card" style="border-top:4px solid ${e.color}">
      <div style="font-size:.78rem;color:var(--muted);margin-bottom:4px">${esc(e.cat)} › ${esc(e.tag)}</div>
      <h2 style="margin-bottom:12px;color:${e.color}">${esc(e.term)}</h2>

      <p style="margin-bottom:16px;line-height:1.6">${esc(e.def)}</p>

      ${e.types?.length ? `
        <div style="margin-bottom:16px">
          <div style="font-weight:700;margin-bottom:6px">📋 Tipi / Forme</div>
          <ul style="margin:0;padding-left:18px">
            ${e.types.map(t => `<li style="margin-bottom:4px;font-size:.9rem">${t}</li>`).join('')}
          </ul>
        </div>` : ''}

      ${e.examples?.length ? `
        <div style="margin-bottom:16px">
          <div style="font-weight:700;margin-bottom:8px">💡 Esempi</div>
          ${e.examples.map(ex => `
            <div style="background:rgba(177,151,252,.07);border-left:3px solid ${e.color};padding:8px 12px;border-radius:0 8px 8px 0;margin-bottom:6px;font-size:.9rem;line-height:1.5">${ex}</div>
          `).join('')}
        </div>` : ''}

      ${e.tip ? `
        <div style="background:rgba(255,209,0,.1);border-radius:10px;padding:10px 14px;font-size:.88rem">
          ⭐ <strong>Ricorda:</strong> ${esc(e.tip)}
        </div>` : ''}
    </div>

    <!-- Termini correlati (stesso tag) -->
    ${(() => {
      const related = GLOSSARY.filter(x => x.tag === e.tag && x.id !== e.id);
      if (!related.length) return '';
      return `<div style="margin-top:14px">
        <div style="font-weight:700;margin-bottom:8px;font-size:.9rem;color:var(--muted)">Vedi anche</div>
        ${related.map(r => `
          <div class="card" style="margin-bottom:6px;cursor:pointer;border-left:3px solid ${r.color};padding:10px 14px"
            onclick="window._glossDetail('${r.id}')">
            <span style="font-weight:700">${esc(r.term)}</span>
            <span style="font-size:.78rem;color:var(--muted);margin-left:8px">${esc(r.tag)}</span>
          </div>`).join('')}
      </div>`;
    })()}
  `);
  window._glossDetail = (id) => _showEntry(GLOSSARY.find(e => e.id === id));
}

window._showGlossary = () => showGlossary();
