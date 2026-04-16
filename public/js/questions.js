// ══════════════════════════════════════
// BANCA DOMANDE
// ══════════════════════════════════════

// ── Grammatica: Quiz ──
export const gramQuiz = {
  facile: [
    {q:"Qual è il plurale di 'libro'?",a:"Libri",w:["Libre","Libra","Libros"],h:"Nomi maschili: -o → -i",x:"I nomi maschili in -o formano il plurale in -i."},
    {q:"Qual è l'articolo corretto? ___ casa",a:"La",w:["Il","Lo","Le"],h:"Femminile singolare",x:"'La' si usa davanti ai nomi femminili singolari."},
    {q:"Qual è il femminile di 'gatto'?",a:"Gatta",w:["Gatti","Gatte","Gattina"],h:"-o → -a",x:"Maschile -o → femminile -a."},
    {q:"Completa: Il bambino ___ felice.",a:"è",w:["ha","sono","sei"],h:"Verbo essere, 3ª persona",x:"Lui/lei È: 3ª persona singolare di essere."},
    {q:"Qual è il plurale di 'penna'?",a:"Penne",w:["Penni","Penna","Pennas"],h:"Femminile: -a → -e",x:"I nomi femminili in -a → plurale in -e."},
    {q:"Quale articolo va con 'zaino'?",a:"Lo",w:["Il","La","Le"],h:"Davanti a z",x:"'Lo' davanti a z, s+consonante, gn, ps."},
    {q:"Completa: Io ___ un gelato.",a:"mangio",w:["mangia","mangiano","mangi"],h:"1ª persona singolare",x:"Io mangio: 1ª persona del presente indicativo."},
    {q:"Quale frase è corretta?",a:"Le bambine giocano",w:["Le bambine gioca","La bambine giocano","Le bambina giocano"],h:"Concordanza",x:"Soggetto plurale → verbo plurale."},
    {q:"Il contrario di 'grande' è...",a:"Piccolo",w:["Alto","Lungo","Grosso"],h:"Dimensione",x:"Grande/piccolo sono antonimi."},
    {q:"Qual è il plurale di 'amica'?",a:"Amiche",w:["Amice","Amici","Amicas"],h:"-ca → -che",x:"Nomi femminili in -ca → -che (suono duro)."},
  ],
  medio: [
    {q:"Qual è il soggetto in 'Luca corre veloce'?",a:"Luca",w:["Corre","Veloce","Il parco"],h:"Chi compie l'azione?",x:"Il soggetto compie l'azione del verbo."},
    {q:"In 'Ho mangiato una mela', il complemento oggetto è...",a:"Una mela",w:["Ho","Mangiato","Io"],h:"Chi? Che cosa?",x:"Il compl. oggetto risponde a 'Che cosa?'"},
    {q:"'Andrò al mare' — il verbo è al...",a:"Futuro semplice",w:["Presente","Passato prossimo","Condizionale"],h:"Azione futura",x:"Il futuro semplice indica azioni future."},
    {q:"'Che bel fiore!' è una frase...",a:"Esclamativa",w:["Interrogativa","Dichiarativa","Imperativa"],h:"Esprime meraviglia",x:"Frase esclamativa = emozione forte + punto esclamativo."},
    {q:"'Con Marco' in 'Vado a scuola con Marco' è complemento di...",a:"Compagnia",w:["Luogo","Tempo","Modo"],h:"Con chi?",x:"Complemento di compagnia = 'Con chi?'"},
    {q:"Qual è l'aggettivo in 'Il cielo azzurro'?",a:"Azzurro",w:["Il","Cielo","Il cielo"],h:"Descrive il nome",x:"L'aggettivo qualificativo descrive il nome."},
    {q:"Il superlativo assoluto di 'bello' è...",a:"Bellissimo",w:["Più bello","Il più bello","Molto più bello"],h:"-issimo",x:"Superlativo assoluto: radice + -issimo/-issima."},
    {q:"'Noi andavamo' è all'...",a:"Imperfetto",w:["Presente","Passato remoto","Futuro"],h:"Azione nel passato",x:"L'imperfetto descrive azioni abituali nel passato."},
  ],
  difficile: [
    {q:"'Che studiano' in 'Gli studenti che studiano...' è una proposizione...",a:"Relativa",w:["Principale","Temporale","Causale"],h:"Introdotta da 'che'",x:"La relativa specifica il nome, introdotta da pronome relativo."},
    {q:"'Nonostante piova, esco' — 'nonostante piova' è...",a:"Concessiva",w:["Causale","Temporale","Finale"],h:"Contrasto",x:"La concessiva esprime un ostacolo che non impedisce l'azione."},
    {q:"'Affinché tu capisca' introduce una proposizione...",a:"Finale",w:["Causale","Temporale","Concessiva"],h:"Scopo",x:"La finale indica lo scopo dell'azione."},
    {q:"'Di vetro' in 'bicchiere di vetro' è complemento di...",a:"Materia",w:["Specificazione","Qualità","Modo"],h:"Di che materiale?",x:"Complemento di materia = materiale di cui è fatto qualcosa."},
    {q:"Il congiuntivo presente di 'essere' (3ª pers.) è...",a:"Sia",w:["È","Fosse","Sarà"],h:"Che lui/lei...",x:"Congiuntivo presente: sia, sia, sia, siamo, siate, siano."},
    {q:"Il passato remoto di 'leggere' (io) è...",a:"Lessi",w:["Leggei","Leggetti","Ho letto"],h:"Irregolare",x:"Leggere: lessi, leggesti, lesse... (irregolare)."},
  ]
};

// ── Grammatica: Classifica ──
export const gramClassifica = {
  facile: [
    {words:["gatto","correre","bello","tavolo","mangiare","grande"],categories:{"Nome":["gatto","tavolo"],"Verbo":["correre","mangiare"],"Aggettivo":["bello","grande"]}},
    {words:["casa","scrivere","rosso","albero","dormire","piccolo"],categories:{"Nome":["casa","albero"],"Verbo":["scrivere","dormire"],"Aggettivo":["rosso","piccolo"]}},
  ],
  medio: [
    {words:["velocemente","Luca","scrisse","incredibile","spesso","quaderno"],categories:{"Nome":["Luca","quaderno"],"Verbo":["scrisse"],"Aggettivo":["incredibile"],"Avverbio":["velocemente","spesso"]}},
  ],
  difficile: [
    {words:["affinché","tuttavia","il quale","loro","avrebbero","magnifico","silenziosamente"],categories:{"Cong. subordinante":["affinché"],"Cong. coordinante":["tuttavia"],"Pron. relativo":["il quale"],"Pron. personale":["loro"],"Verbo":["avrebbero"],"Aggettivo":["magnifico"],"Avverbio":["silenziosamente"]}},
  ]
};

// ── Grammatica: Completa ──
export const gramCompleta = {
  facile: [
    {frase:"Il ___ gioca nel giardino.",opts:["bambino","mangiare","rosso","sotto"],a:"bambino",h:"Chi gioca?",x:"Serve un nome (soggetto)."},
    {frase:"La mamma ___ una torta.",opts:["prepara","grande","domani","sotto"],a:"prepara",h:"Che cosa fa?",x:"Serve un verbo."},
    {frase:"Il cielo è molto ___.",opts:["azzurro","correre","tavolo","perché"],a:"azzurro",h:"Com'è?",x:"Serve un aggettivo."},
    {frase:"I gatti ___ sul divano.",opts:["dormono","bello","scuola","sempre"],a:"dormono",h:"Cosa fanno?",x:"Verbo al plurale perché 'i gatti' è plurale."},
    {frase:"___ andiamo al parco.",opts:["Noi","Bello","Mangiare","Sotto"],a:"Noi",h:"Chi va?",x:"'Noi' è il pronome soggetto."},
  ],
  medio: [
    {frase:"Sebbene ___ stanco, continuò a lavorare.",opts:["fosse","è","sarà","aveva"],a:"fosse",h:"Congiuntivo imperfetto",x:"Dopo 'sebbene' si usa il congiuntivo."},
    {frase:"La ragazza ___ studia molto è brava.",opts:["che","la","di","con"],a:"che",h:"Pronome relativo",x:"'Che' introduce la proposizione relativa."},
  ],
  difficile: [
    {frase:"Se io ___ potuto, ti avrei aiutato.",opts:["avessi","ho","avrei","ebbi"],a:"avessi",h:"Periodo ipotetico 3° tipo",x:"Se + congiuntivo trapassato nella protasi."},
  ]
};

// ── Grammatica: Ordina ──
export const gramOrdina = {
  facile: [
    {w:["Il","gatto","dorme","sul","divano"],c:"Il gatto dorme sul divano",h:"Chi? Cosa fa? Dove?"},
    {w:["Maria","mangia","una","mela","rossa"],c:"Maria mangia una mela rossa",h:"Soggetto + verbo + oggetto"},
    {w:["I","bambini","giocano","nel","parco"],c:"I bambini giocano nel parco",h:"Art. + nome + verbo + luogo"},
    {w:["Oggi","piove","e","fa","freddo"],c:"Oggi piove e fa freddo",h:"Tempo + verbo + congiunzione"},
  ],
  medio: [
    {w:["Sebbene","fosse","tardi","Marco","uscì","di","casa"],c:"Sebbene fosse tardi Marco uscì di casa",h:"Concessiva + principale"},
    {w:["Dopo","aver","mangiato","andarono","a","dormire"],c:"Dopo aver mangiato andarono a dormire",h:"Temporale + principale"},
  ],
  difficile: [
    {w:["Se","avessi","studiato","di","più","avrei","superato","l'esame"],c:"Se avessi studiato di più avrei superato l'esame",h:"Periodo ipotetico 3° tipo"},
  ]
};

// ── Vocabolario: Quiz ──
export const vocabQuiz = {
  facile: [
    {q:"Cosa significa 'allegro'?",a:"Felice",w:["Triste","Arrabbiato","Stanco"],h:"Positivo",x:"Allegro = felice, contento, gioioso."},
    {q:"Un sinonimo di 'casa' è...",a:"Abitazione",w:["Scuola","Negozio","Giardino"],h:"Dove si vive",x:"Sinonimi = parole con significato simile."},
    {q:"Il contrario di 'caldo' è...",a:"Freddo",w:["Tiepido","Bollente","Fresco"],h:"Opposto",x:"Caldo/freddo sono antonimi."},
    {q:"'Coraggioso' significa...",a:"Che non ha paura",w:["Pigro","Alto","Gentile"],h:"Coraggio",x:"Affronta le difficoltà senza timore."},
    {q:"L'opposto di 'aprire' è...",a:"Chiudere",w:["Rompere","Lanciare","Costruire"],h:"Contrario",x:"Aprire/chiudere sono antonimi."},
    {q:"Quale parola indica un colore?",a:"Azzurro",w:["Tavolo","Correre","Domani"],h:"Pensa al cielo",x:"Azzurro, rosso, verde... sono colori."},
  ],
  medio: [
    {q:"Cosa significa 'perspicace'?",a:"Intelligente e acuto",w:["Alto","Stanco","Lento"],h:"Capisce subito",x:"Perspicace: coglie rapidamente i dettagli."},
    {q:"'Enigmatico' significa...",a:"Misterioso",w:["Chiaro","Semplice","Noioso"],h:"Enigma",x:"Enigmatico: difficile da capire, misterioso."},
    {q:"'Procrastinare' vuol dire...",a:"Rimandare a dopo",w:["Fare subito","Correre","Dormire"],h:"Domani...",x:"Procrastinare: rimandare continuamente."},
    {q:"Il contrario di 'abbondante' è...",a:"Scarso",w:["Enorme","Ricco","Pieno"],h:"Poco",x:"Abbondante = molto; scarso = poco."},
    {q:"'Indomito' significa...",a:"Che non si arrende",w:["Stanco","Calmo","Lento"],h:"Non domabile",x:"Indomito: che non può essere domato."},
  ],
  difficile: [
    {q:"'Aulico' si riferisce a...",a:"Elevato e solenne",w:["Quotidiano","Volgare","Semplice"],h:"Corte",x:"Registro aulico = poesia classica, linguaggio formale."},
    {q:"Cosa significa 'serendipità'?",a:"Scoperta fortunata per caso",w:["Tristezza","Forte vento","Lunga attesa"],h:"Fortuna inaspettata",x:"Fare scoperte fortunate per puro caso."},
    {q:"Un 'ossimoro' è...",a:"Accostamento di opposti",w:["Ripetizione","Elenco","Domanda"],h:"'Ghiaccio bollente'",x:"Ossimoro: 'dolce amaro', 'silenzio assordante'."},
    {q:"Un 'eufemismo' serve a...",a:"Attenuare un'espressione",w:["Esagerare","Ripetere","Invertire"],h:"Forma delicata",x:"'Passare a miglior vita' per 'morire'."},
  ]
};

// ── Vocabolario: Abbina ──
export const vocabAbbina = {
  facile: [
    {title:"Abbina i contrari",pairs:[["Grande","Piccolo"],["Alto","Basso"],["Caldo","Freddo"],["Aperto","Chiuso"],["Veloce","Lento"]]},
    {title:"Abbina i sinonimi",pairs:[["Allegro","Felice"],["Casa","Abitazione"],["Veloce","Rapido"],["Iniziare","Cominciare"],["Bello","Carino"]]},
  ],
  medio: [
    {title:"Parola e significato",pairs:[["Perspicace","Molto acuto"],["Enigmatico","Misterioso"],["Indomito","Inarrendibile"],["Procrastinare","Rimandare"],["Meticoloso","Molto preciso"]]},
  ],
  difficile: [
    {title:"Figure retoriche",pairs:[["Metafora","Trasferimento significato"],["Similitudine","Paragone con 'come'"],["Ossimoro","Opposti accostati"],["Iperbole","Esagerazione"],["Eufemismo","Attenuazione"]]},
  ]
};

// ── Vocabolario: Intruso ──
export const vocabIntruso = {
  facile: [
    {words:["Cane","Gatto","Tavolo","Cavallo"],intruso:"Tavolo",h:"Uno non è un animale",x:"Tavolo è un oggetto."},
    {words:["Rosso","Verde","Correre","Blu"],intruso:"Correre",h:"Uno non è un colore",x:"Correre è un verbo."},
    {words:["Felice","Allegro","Contento","Triste"],intruso:"Triste",h:"Significato opposto",x:"Triste è il contrario."},
    {words:["Mela","Pera","Banana","Carota"],intruso:"Carota",h:"Non è un frutto",x:"Carota è una verdura."},
    {words:["Mangiare","Dormire","Tavolo","Correre"],intruso:"Tavolo",h:"Non è un verbo",x:"Tavolo è un nome."},
  ],
  medio: [
    {words:["Sebbene","Affinché","Perché","Ma"],intruso:"Ma",h:"Uno è coordinante",x:"'Ma' è coordinante; le altre sono subordinanti."},
    {words:["Lessi","Scrissi","Mangiai","Ho mangiato"],intruso:"Ho mangiato",h:"Tempo diverso",x:"'Ho mangiato' è passato prossimo; gli altri passato remoto."},
  ],
  difficile: [
    {words:["Metafora","Similitudine","Congiuntivo","Ossimoro"],intruso:"Congiuntivo",h:"Non è una figura retorica",x:"Il congiuntivo è un modo verbale."},
  ]
};

// ── Vocabolario: Catena ──
export const vocabCatena = {
  facile: [
    {clue1:"Sinonimo di 'contento'",clue2:"Contrario di 'triste'",a:"Felice",opts:["Felice","Nervoso","Stanco","Grande"],x:"Felice = contento, contrario di triste."},
    {clue1:"Contrario di 'notte'",clue2:"Quando c'è il sole",a:"Giorno",opts:["Giorno","Sera","Mattina","Alba"],x:"Giorno = contrario di notte, c'è la luce."},
    {clue1:"Un frutto giallo",clue2:"Lo mangiano le scimmie",a:"Banana",opts:["Banana","Mela","Arancia","Pera"],x:"Banana = frutto giallo delle scimmie."},
  ],
  medio: [
    {clue1:"Modo verbale dell'ipotesi",clue2:"Si usa dopo 'se'",a:"Congiuntivo",opts:["Congiuntivo","Indicativo","Imperativo","Gerundio"],x:"Il congiuntivo esprime dubbio, ipotesi."},
    {clue1:"Figura retorica con 'come'",clue2:"Paragone esplicito",a:"Similitudine",opts:["Similitudine","Metafora","Iperbole","Ossimoro"],x:"La similitudine usa 'come' per confrontare."},
  ],
};

// ── Verbi: Quiz ──
export const verbiQuiz = {
  facile: [
    {q:"Coniuga 'mangiare' → io (presente)",a:"Mangio",w:["Mangia","Mangi","Mangiano"],h:"1ª pers. sing.",x:"Io mangio, tu mangi, lui mangia..."},
    {q:"Coniuga 'essere' → tu (presente)",a:"Sei",w:["Sono","È","Siamo"],h:"2ª pers.",x:"Io sono, tu sei, lui è..."},
    {q:"Coniuga 'avere' → noi (presente)",a:"Abbiamo",w:["Avete","Hanno","Ho"],h:"1ª pers. plur.",x:"Io ho, tu hai, noi abbiamo..."},
    {q:"'Parlare' è della...",a:"Prima coniugazione (-are)",w:["Seconda (-ere)","Terza (-ire)","Nessuna"],h:"Parl-ARE",x:"Le tre coniugazioni: -are (1ª), -ere (2ª), -ire (3ª)."},
    {q:"Il participio passato di 'mangiare' è...",a:"Mangiato",w:["Mangiando","Mangiava","Mangerà"],h:"-are → -ato",x:"1ª coniugazione: -are → -ato."},
    {q:"Il gerundio di 'cantare' è...",a:"Cantando",w:["Cantato","Canterà","Cantava"],h:"-are → -ando",x:"Gerundio: 1ª conj. → -ando."},
    {q:"Coniuga 'fare' → loro (presente)",a:"Fanno",w:["Fa","Fai","Facciamo"],h:"3ª plur.",x:"Fare: faccio, fai, fa, facciamo, fate, fanno."},
  ],
  medio: [
    {q:"Passato prossimo: Io (andare) al cinema",a:"Sono andato/a",w:["Ho andato","Andai","Ero andato"],h:"Andare usa 'essere'",x:"Verbi di movimento usano 'essere'."},
    {q:"Condizionale: Io (volere) un gelato",a:"Vorrei",w:["Voglio","Volevo","Vorrò"],h:"Desiderio cortese",x:"'Vorrei' è più cortese di 'voglio'."},
    {q:"Futuro: Noi (partire)",a:"Partiremo",w:["Partiamo","Partivamo","Siamo partiti"],h:"Futuro 1ª plur.",x:"3ª coniugazione futuro: -irò, -irai, -irà, -iremo..."},
    {q:"Quale verbo è riflessivo?",a:"Svegliarsi",w:["Dormire","Correre","Mangiare"],h:"Si + verbo",x:"Riflessivi: l'azione ricade sul soggetto."},
    {q:"Imperfetto: Tu (avere) fame",a:"Avevi",w:["Hai","Avrai","Avresti"],h:"Imperfetto",x:"Avere imperfetto: avevo, avevi, aveva..."},
  ],
  difficile: [
    {q:"Congiuntivo imperfetto: Se io (potere)...",a:"Potessi",w:["Posso","Potrei","Potrò"],h:"Se + cong. imp.",x:"Se + congiuntivo imperfetto."},
    {q:"Passato remoto di 'nascere' (io):",a:"Nacqui",w:["Nascei","Nascetti","Sono nato"],h:"Irregolare",x:"Nascere: nacqui, nascesti, nacque..."},
    {q:"Condizionale passato: Loro (dovere) studiare",a:"Avrebbero dovuto",w:["Dovrebbero","Dovevano","Hanno dovuto"],h:"Cond. aus. + part.",x:"Condizionale passato = condizionale ausiliare + participio."},
    {q:"Il participio presente di 'correre' è...",a:"Corrente",w:["Correndo","Corso","Corruto"],h:"Aggettivo",x:"Participio presente come aggettivo: acqua corrente."},
  ]
};

// ── Verbi: Coniuga ──
export const verbiConiuga = {
  facile: [
    {verb:"mangiare",persona:"io",tempo:"presente",a:"mangio"},
    {verb:"dormire",persona:"tu",tempo:"presente",a:"dormi"},
    {verb:"avere",persona:"noi",tempo:"presente",a:"abbiamo"},
    {verb:"essere",persona:"loro",tempo:"presente",a:"sono"},
    {verb:"andare",persona:"io",tempo:"presente",a:"vado"},
    {verb:"fare",persona:"voi",tempo:"presente",a:"fate"},
  ],
  medio: [
    {verb:"mangiare",persona:"io",tempo:"passato prossimo",a:"ho mangiato"},
    {verb:"andare",persona:"lei",tempo:"passato prossimo",a:"è andata"},
    {verb:"scrivere",persona:"noi",tempo:"futuro semplice",a:"scriveremo"},
    {verb:"volere",persona:"io",tempo:"condizionale",a:"vorrei"},
    {verb:"avere",persona:"tu",tempo:"imperfetto",a:"avevi"},
  ],
  difficile: [
    {verb:"potere",persona:"io",tempo:"congiuntivo imperfetto",a:"potessi"},
    {verb:"essere",persona:"lui",tempo:"congiuntivo presente",a:"sia"},
    {verb:"leggere",persona:"io",tempo:"passato remoto",a:"lessi"},
    {verb:"nascere",persona:"io",tempo:"passato remoto",a:"nacqui"},
  ]
};

// ── Verbi: Trasforma ──
export const verbiTrasforma = {
  facile: [
    {frase:"Io mangio la pizza.",tempo:"Futuro semplice",a:"Io mangerò la pizza.",opts:["Io mangerò la pizza.","Io mangiavo la pizza.","Io mangiai la pizza.","Io ho mangiato la pizza."]},
    {frase:"Tu corri veloce.",tempo:"Passato prossimo",a:"Tu sei corso/a veloce.",opts:["Tu sei corso/a veloce.","Tu correvi veloce.","Tu correrai veloce.","Tu corresti veloce."]},
    {frase:"Noi giochiamo a pallone.",tempo:"Imperfetto",a:"Noi giocavamo a pallone.",opts:["Noi giocavamo a pallone.","Noi giocheremo a pallone.","Noi abbiamo giocato.","Noi giocammo."]},
  ],
  medio: [
    {frase:"Marco studia italiano.",tempo:"Condizionale presente",a:"Marco studierebbe italiano.",opts:["Marco studierebbe italiano.","Marco studiava italiano.","Marco studierà italiano.","Marco ha studiato italiano."]},
    {frase:"Io leggo un libro.",tempo:"Passato remoto",a:"Io lessi un libro.",opts:["Io lessi un libro.","Io leggevo un libro.","Io ho letto un libro.","Io leggerò un libro."]},
  ],
  difficile: [
    {frase:"Se studio, supero l'esame.",tempo:"Periodo ipotetico 3° tipo",a:"Se avessi studiato, avrei superato l'esame.",opts:["Se avessi studiato, avrei superato l'esame.","Se studiassi, supererei l'esame.","Se studierò, supererò.","Se studiavo, superavo."]},
  ]
};

// ── Ortografia: Quiz ──
export const ortoQuiz = {
  facile: [
    {q:"Quale è corretta?",a:"Acqua",w:["Aqua","Acua","Accua"],h:"Gruppo -cqu-",x:"CQU in parole da 'acqua': acquario, acquisto."},
    {q:"Si scrive...",a:"Scuola",w:["Squola","Scola","Scquola"],h:"S-C-U-O-L-A",x:"'Scuola' con SCU, non SQU."},
    {q:"Come si scrive?",a:"Perché",w:["Perchè","Perche","Per che"],h:"Accento acuto",x:"'Perché' ha accento acuto (é)."},
    {q:"Quale è giusta?",a:"Un'amica",w:["Un amica","Una amica","Un amica'"],h:"Femminile + vocale",x:"Femminile + vocale: un' con apostrofo."},
    {q:"Come si scrive?",a:"Qual è",w:["Qual'è","Quale è","Quale'è"],h:"Niente apostrofo!",x:"'Qual è': troncamento, non elisione."},
    {q:"Si scrive...",a:"Soprattutto",w:["Sopratutto","Sopra tutto","Soprattuto"],h:"Doppia T x2",x:"Soprattutto: doppia T in entrambe le parti."},
    {q:"Si scrive...",a:"Cappello",w:["Capello","Capelo","Cappelo"],h:"Doppie!",x:"Cappello (copricapo) ≠ capello (pelo). Le doppie contano!"},
  ],
  medio: [
    {q:"'Ce' o 'C'è'? '___ un gatto.'",a:"C'è",w:["Ce","Cè","Ce'"],h:"Ci + è",x:"C'è = ci + è, con apostrofo."},
    {q:"Si scrive...",a:"Accelerare",w:["Accellerare","Accellare","Acellerare"],h:"Una sola L",x:"Accelerare: due C, una L."},
    {q:"'Sé' o 'se'? 'Pensa a ___ stesso'",a:"sé",w:["se","sè","Se"],h:"Pronome",x:"'Sé' pronome riflessivo = accento acuto."},
    {q:"Quale è corretta?",a:"Eccezionale",w:["Ecezzionale","Eccezzionale","Eccezionnale"],h:"Due C, una Z",x:"Eccezionale: CC + Z."},
  ],
  difficile: [
    {q:"'Né... né' o 'ne... ne'?",a:"Né... né (accento)",w:["Ne... ne","Nè... nè","Ne'... ne'"],h:"Congiunzione negativa",x:"'Né' congiunzione = accento acuto."},
    {q:"'A' o 'ha'? '___ studiato molto.'",a:"Ha",w:["A","Hà","A'"],h:"Verbo avere",x:"'Ha' = verbo avere; 'a' = preposizione."},
    {q:"'Dà' o 'da'? 'Mi ___ una mano.'",a:"dà",w:["da","da'","dá"],h:"Verbo dare",x:"'Dà' verbo = accento; 'da' preposizione = no."},
    {q:"'Fa' o 'fà'?",a:"fa (senza accento)",w:["fà","fa'","Fà"],h:"3ª pers. fare",x:"'Fa' (fare, 3ª pers.) NON ha accento."},
  ]
};

// ── Ortografia: Trova l'errore ──
export const ortoErrore = {
  facile: [
    {frase:"Ho bevuto un bicchiere di *aqua* fresca.",errore:"aqua",corretto:"acqua",x:"Acqua con CQU."},
    {frase:"Oggi a scuola abbiamo studiato la *sciensa*.",errore:"sciensa",corretto:"scienza",x:"Scienza con -ie-."},
    {frase:"Il *quoco* ha preparato una torta.",errore:"quoco",corretto:"cuoco",x:"Cuoco con CU, non QU."},
    {frase:"Mamma mi ha comprato un *quarderno* nuovo.",errore:"quarderno",corretto:"quaderno",x:"Quaderno con QUA."},
  ],
  medio: [
    {frase:"*Qual'è* il tuo colore preferito?",errore:"Qual'è",corretto:"Qual è",x:"Senza apostrofo: troncamento."},
    {frase:"Non *cè* nessuno in casa.",errore:"cè",corretto:"c'è",x:"C'è = ci + è, con apostrofo."},
    {frase:"Devo *accellerare* il passo.",errore:"accellerare",corretto:"accelerare",x:"Accelerare: due C, una L."},
  ],
  difficile: [
    {frase:"Non vuole *ne* acqua *ne* succo.",errore:"ne",corretto:"né",x:"'Né...né' congiunzione → accento."},
    {frase:"Oggi *fà* molto caldo.",errore:"fà",corretto:"fa",x:"'Fa' (fare, 3ª pers.) senza accento."},
  ]
};

// ── Ortografia: Scrivi correttamente ──
export const ortoScrivi = {
  facile: [{w:"aqua",r:"acqua"},{w:"squola",r:"scuola"},{w:"perchè",r:"perché"},{w:"capello (copricapo)",r:"cappello"},{w:"qual'è",r:"qual è"},{w:"sopratutto",r:"soprattutto"}],
  medio: [{w:"accellerare",r:"accelerare"},{w:"efficenza",r:"efficienza"},{w:"coscenza",r:"coscienza"},{w:"obbiettivo",r:"obiettivo"}],
  difficile: [{w:"daccordo",r:"d'accordo"},{w:"fà",r:"fa"},{w:"se stesso",r:"sé stesso"},{w:"nè",r:"né"}]
};

// ── Comprensione: Leggi e rispondi ──
export const compLeggi = {
  facile: [
    {testo:"Marco si sveglia alle sette. Fa colazione con latte e biscotti, poi va a scuola in bicicletta. A scuola, la maestra spiega matematica e italiano. Dopo la scuola, Marco gioca a pallone con gli amici nel parco.",
     domande:[{q:"A che ora si sveglia Marco?",a:"Alle sette",w:["Alle otto","Alle sei","Alle nove"]},{q:"Come va a scuola?",a:"In bicicletta",w:["A piedi","In macchina","In autobus"]},{q:"Cosa fa dopo la scuola?",a:"Gioca a pallone",w:["Studia","Dorme","Guarda la TV"]}]},
    {testo:"La nonna di Giulia vive in campagna. Ha un grande giardino con tanti fiori e un orto dove coltiva pomodori e zucchine. Giulia ama andare dalla nonna perché può giocare con il gatto Micio e mangiare la torta di mele.",
     domande:[{q:"Dove vive la nonna?",a:"In campagna",w:["In città","Al mare","In montagna"]},{q:"Cosa coltiva nell'orto?",a:"Pomodori e zucchine",w:["Fiori","Mele","Patate"]},{q:"Come si chiama il gatto?",a:"Micio",w:["Felix","Pallino","Briciola"]}]},
  ],
  medio: [
    {testo:"La volpe e l'uva. Una volpe affamata vide dei grappoli d'uva appesi a un pergolato. Provò a raggiungerli saltando, ma erano troppo in alto. Dopo molti tentativi, se ne andò dicendo: \"Tanto quell'uva è acerba!\"",
     domande:[{q:"Perché la volpe non prende l'uva?",a:"Era troppo in alto",w:["Non le piaceva","Era pesante","Non aveva fame"]},{q:"Cosa dice la volpe?",a:"Che l'uva è acerba",w:["Che tornerà","Che chiede aiuto","Che non ha fame"]},{q:"La morale è che...",a:"Disprezziamo ciò che non possiamo avere",w:["Bisogna saltare di più","L'uva è cattiva","Le volpi non mangiano frutta"]}]},
  ],
  difficile: [
    {testo:"\"Considerate la vostra semenza: fatti non foste a viver come bruti, ma per seguir virtute e canoscenza.\" Con queste parole, nella Divina Commedia, Ulisse esorta i compagni a proseguire il viaggio oltre le Colonne d'Ercole.",
     domande:[{q:"Chi pronuncia queste parole?",a:"Ulisse",w:["Dante","Virgilio","Beatrice"]},{q:"Cosa esorta a fare?",a:"Seguire la conoscenza",w:["Tornare a casa","Arrendersi","Combattere"]},{q:"Le 'Colonne d'Ercole' sono...",a:"I limiti del mondo conosciuto",w:["Due montagne","Due città","Due fiumi"]}]},
  ]
};

// ── Comprensione: Vero o Falso ──
export const compVF = {
  facile: [
    {aff:"Il sole sorge a ovest.",v:false,x:"Il sole sorge a est."},
    {aff:"L'Italia è una penisola.",v:true,x:"L'Italia è circondata dal mare su tre lati."},
    {aff:"'Mangiare' è della seconda coniugazione.",v:false,x:"Mangiare = -are = prima coniugazione."},
    {aff:"'Un'amica' si scrive con l'apostrofo.",v:true,x:"Femminile + vocale: un'amica."},
    {aff:"Il plurale di 'libro' è 'libre'.",v:false,x:"Corretto: libri (-o → -i)."},
    {aff:"Roma è la capitale d'Italia.",v:true,x:"Roma è la capitale della Repubblica Italiana."},
  ],
  medio: [
    {aff:"Il passato prossimo usa sempre 'avere'.",v:false,x:"Molti verbi usano 'essere' (movimento, riflessivi)."},
    {aff:"La similitudine usa 'come'.",v:true,x:"Similitudine = paragone con 'come'."},
    {aff:"'Qual è' si scrive con l'apostrofo.",v:false,x:"Senza apostrofo: è troncamento."},
    {aff:"Il congiuntivo esprime certezze.",v:false,x:"Il congiuntivo = dubbio, desiderio, possibilità."},
  ],
  difficile: [
    {aff:"Nel periodo ipotetico 3° tipo: se + cong. trapassato + cond. passato.",v:true,x:"Es: Se avessi studiato, avrei superato l'esame."},
    {aff:"L'ossimoro accosta due opposti.",v:true,x:"Es: 'silenzio assordante'."},
    {aff:"Il narratore onnisciente racconta solo ciò che vede.",v:false,x:"L'onnisciente sa tutto: pensieri, futuro..."},
  ]
};

// ── Comprensione: Sequenza ──
export const compSequenza = {
  facile: [
    {title:"La giornata di Marco",events:["Marco si sveglia.","Fa colazione.","Va a scuola.","Torna a casa.","Fa i compiti.","Va a dormire."]},
    {title:"Preparare un panino",events:["Prendi il pane.","Taglia il pane a metà.","Metti il prosciutto.","Aggiungi il formaggio.","Chiudi il panino.","Mangia!"]},
  ],
  medio: [
    {title:"Cappuccetto Rosso",events:["La mamma dà il cestino.","Cappuccetto va nel bosco.","Il lupo arriva dalla nonna.","Cappuccetto trova il lupo travestito.","Il cacciatore li salva."]},
  ],
  difficile: [
    {title:"Testo argomentativo",events:["Introduzione del tema.","Presentazione della tesi.","Primo argomento.","Presentazione dell'antitesi.","Confutazione.","Conclusione."]},
  ]
};

// ── Comprensione: Cosa significa ──
export const compSignificato = {
  facile: [
    {q:"'Piove a catinelle' significa...",a:"Piove molto forte",w:["Piove piano","Ci sono i gatti","Piove in casa"],h:"Modo di dire",x:"'A catinelle' = in grande quantità."},
    {q:"'Avere la testa fra le nuvole' significa...",a:"Essere distratto",w:["Essere alto","Mal di testa","Dormire"],h:"Espressione",x:"Chi è 'fra le nuvole' non fa attenzione."},
    {q:"'In bocca al lupo' si dice per...",a:"Augurare buona fortuna",w:["Spaventare","Parlare di animali","Andare nel bosco"],h:"Augurio",x:"Si risponde: 'Crepi il lupo!'"},
  ],
  medio: [
    {q:"'Piove sul bagnato' significa...",a:"Ai problemi se ne aggiungono altri",w:["Piove molto","Terreno bagnato","È umido"],h:"Proverbio",x:"Quando le cose peggiorano ulteriormente."},
    {q:"'Chi dorme non piglia pesci'...",a:"Bisogna darsi da fare",w:["Non si pesca di notte","Chi dorme ingrassa","I pesci dormono"],h:"Proverbio",x:"Per ottenere risultati bisogna agire."},
    {q:"'Avere le mani in pasta'...",a:"Essere coinvolto",w:["Cucinare","Mani sporche","Fare il pane"],h:"Espressione",x:"Chi ha 'le mani in pasta' è dentro a un affare."},
  ],
  difficile: [
    {q:"'Fare orecchie da mercante'...",a:"Fingere di non sentire",w:["Ascoltare bene","Vendere","Orecchie grandi"],h:"Modo di dire",x:"Il mercante 'non sente' quando non gli conviene."},
    {q:"'Non tutte le ciambelle riescono col buco'...",a:"Non tutto va come previsto",w:["Le ciambelle son difficili","Attenzione","I buchi son importanti"],h:"Proverbio",x:"A volte le cose non vanno come pianificato."},
  ]
};

// ══════════════════════════════════════
// NEW GAMES DATA
// ══════════════════════════════════════

// ── 1. Singolare ↔ Plurale (Grammatica) ──
export const gramSingPlur = {
  facile: [
    {sing:"Il gatto dorme.",plur:"I gatti dormono.",h:"Cambia articolo, nome e verbo"},
    {sing:"La bambina gioca.",plur:"Le bambine giocano.",h:"Femminile: la → le, -a → -e"},
    {sing:"Il libro è nuovo.",plur:"I libri sono nuovi.",h:"Anche l'aggettivo cambia"},
    {sing:"La mela è rossa.",plur:"Le mele sono rosse.",h:"Tutto concordato al plurale"},
    {sing:"Lo zaino è pesante.",plur:"Gli zaini sono pesanti.",h:"Lo → gli, -o → -i"},
    {sing:"L'albero è alto.",plur:"Gli alberi sono alti.",h:"L' → gli davanti a vocale maschile"},
  ],
  medio: [
    {sing:"Il ragazzo mangia la pizza.",plur:"I ragazzi mangiano la pizza.",h:"Soggetto e verbo al plurale, oggetto invariato"},
    {sing:"La maestra spiega la lezione.",plur:"Le maestre spiegano la lezione.",h:"Soggetto e verbo cambiano"},
    {sing:"L'amico è arrivato ieri.",plur:"Gli amici sono arrivati ieri.",h:"Anche il participio concorda"},
    {sing:"La città è grande.",plur:"Le città sono grandi.",h:"Città è invariabile!"},
    {sing:"Il problema è difficile.",plur:"I problemi sono difficili.",h:"Problema: maschile in -a → plurale -i"},
  ],
  difficile: [
    {sing:"L'uomo che cammina è stanco.",plur:"Gli uomini che camminano sono stanchi.",h:"Uomo → uomini (irregolare)"},
    {sing:"Il bue mangia l'erba.",plur:"I buoi mangiano l'erba.",h:"Bue → buoi (irregolare)"},
    {sing:"Il dito fa male.",plur:"Le dita fanno male.",h:"Dito → dita (maschile → femminile!)"},
  ]
};

// ── 2. Cruciverba (Vocabolario) ──
export const vocabCruciverba = {
  facile: [
    { title:"Animali e natura", size:8, words:[
      {word:"GATTO",def:"Animale domestico che miagola",row:0,col:0,dir:"h"},
      {word:"ALBERO",def:"Pianta con tronco e rami",row:0,col:0,dir:"v"},
      {word:"SOLE",def:"Stella che illumina il giorno",row:2,col:2,dir:"h"},
      {word:"RANA",def:"Anfibio che salta e gracida",row:4,col:1,dir:"h"},
    ]},
    { title:"A scuola", size:8, words:[
      {word:"PENNA",def:"Si usa per scrivere",row:0,col:0,dir:"h"},
      {word:"PAGINA",def:"Un foglio del libro",row:0,col:0,dir:"v"},
      {word:"BANCO",def:"Dove ti siedi in classe",row:2,col:3,dir:"h"},
      {word:"VOTO",def:"Il giudizio dell'insegnante",row:4,col:1,dir:"h"},
    ]},
  ],
  medio: [
    { title:"Sentimenti e stati d'animo", size:10, words:[
      {word:"FELICE",def:"Sinonimo di contento",row:0,col:0,dir:"h"},
      {word:"FURIOSO",def:"Molto arrabbiato",row:0,col:0,dir:"v"},
      {word:"TRISTE",def:"Il contrario di allegro",row:2,col:2,dir:"h"},
      {word:"TIMIDO",def:"Chi ha vergogna a parlare",row:4,col:1,dir:"h"},
      {word:"SERENO",def:"Calmo e tranquillo",row:6,col:0,dir:"h"},
    ]},
  ],
  difficile: [
    { title:"Figure retoriche", size:12, words:[
      {word:"METAFORA",def:"Trasferimento di significato senza 'come'",row:0,col:0,dir:"h"},
      {word:"OSSIMORO",def:"Accostamento di parole opposte",row:2,col:1,dir:"h"},
      {word:"IPERBOLE",def:"Esagerazione per enfatizzare",row:4,col:0,dir:"h"},
      {word:"ANAFORA",def:"Ripetizione a inizio verso",row:6,col:2,dir:"h"},
    ]},
  ]
};

// ── 3. Indovina dalla Definizione (Vocabolario) ──
export const vocabIndovina = {
  facile: [
    {answer:"Sole",hints:["È nello spazio.","Lo vedi di giorno.","È giallo e caldo.","Illumina la Terra."],x:"Il Sole è la stella del nostro sistema solare."},
    {answer:"Cane",hints:["È un essere vivente.","Ha quattro zampe.","È un animale domestico.","Abbaia e scodinzola."],x:"Il cane è il migliore amico dell'uomo."},
    {answer:"Scuola",hints:["È un edificio.","Ci vai quasi ogni giorno.","Ci sono i banchi.","La maestra insegna qui."],x:"La scuola è il luogo dell'apprendimento."},
    {answer:"Gelato",hints:["È un alimento.","È freddo.","Si mangia d'estate.","Può essere al cioccolato o alla frutta."],x:"Il gelato è un dolce freddo tipico italiano."},
    {answer:"Libro",hints:["È un oggetto.","Ha molte pagine.","Ha una copertina.","Si legge per imparare o divertirsi."],x:"I libri contengono storie e conoscenza."},
    {answer:"Arcobaleno",hints:["Lo vedi in cielo.","Appare quando piove e c'è il sole.","Ha tanti colori.","Ha una forma curva."],x:"L'arcobaleno ha 7 colori: rosso, arancione, giallo, verde, azzurro, indaco, violetto."},
    {answer:"Orologio",hints:["È un oggetto comune.","Può stare al polso.","Ha dei numeri.","Ti dice che ore sono."],x:"L'orologio misura il tempo."},
    {answer:"Farfalla",hints:["È un essere vivente.","Ha le ali colorate.","Era un bruco.","Vola di fiore in fiore."],x:"La farfalla nasce dalla metamorfosi del bruco."},
  ],
  medio: [
    {answer:"Similitudine",hints:["È un concetto letterario.","Si studia in italiano.","Usa la parola 'come'.","Confronta due cose diverse."],x:"La similitudine è un paragone esplicito: veloce come il vento."},
    {answer:"Dizionario",hints:["È un libro molto spesso.","Contiene migliaia di parole.","Le parole sono in ordine alfabetico.","Ti dice il significato delle parole."],x:"Il dizionario è lo strumento per conoscere significati e ortografia."},
    {answer:"Vulcano",hints:["Si trova in natura.","È una montagna speciale.","L'Italia ne ha di famosi.","Può eruttare lava."],x:"I vulcani italiani più noti: Vesuvio, Etna, Stromboli."},
    {answer:"Preposizione",hints:["È una parte del discorso.","È una parola corta.","Collega parole nella frase.","Esempi: di, a, da, in, con, su, per, tra."],x:"Le preposizioni semplici sono: di, a, da, in, con, su, per, tra, fra."},
    {answer:"Rinascimento",hints:["È un periodo storico.","È nato in Italia.","L'arte e la cultura fiorirono.","Leonardo e Michelangelo sono protagonisti."],x:"Il Rinascimento (XV-XVI sec.) fu un'epoca di straordinario sviluppo culturale."},
  ],
  difficile: [
    {answer:"Congiuntivo",hints:["Riguarda la grammatica.","È un modo verbale.","Esprime dubbio o desiderio.","Segue spesso 'che' o 'se'."],x:"Il congiuntivo è il modo dell'incertezza e del desiderio."},
    {answer:"Allegoria",hints:["È una figura retorica.","Un racconto ha un significato nascosto.","Dante la usò molto.","Ogni elemento rappresenta qualcos'altro."],x:"Nell'allegoria il significato letterale nasconde uno più profondo."},
    {answer:"Endecasillabo",hints:["Riguarda la poesia.","È un tipo di verso.","Ha un numero preciso di sillabe.","Ne ha undici: è il verso della Divina Commedia."],x:"L'endecasillabo (11 sillabe) è il verso più nobile della poesia italiana."},
  ]
};

// ── 4. Memory (Vocabolario) ──
export const vocabMemory = {
  facile: [
    {pairs:[["Felice","Contento"],["Grande","Piccolo"],["Veloce","Rapido"],["Caldo","Freddo"],["Alto","Basso"],["Aprire","Chiudere"]]},
    {pairs:[["Cane","Abbaia"],["Gatto","Miagola"],["Mucca","Muggisce"],["Leone","Ruggisce"],["Rana","Gracida"],["Ape","Ronza"]]},
    {pairs:[["Mela","Frutta"],["Carota","Verdura"],["Pane","Cibo"],["Latte","Bevanda"],["Rosa","Fiore"],["Quercia","Albero"]]},
    {pairs:[["Scuola","Studiare"],["Cucina","Cucinare"],["Letto","Dormire"],["Parco","Giocare"],["Piscina","Nuotare"],["Stadio","Tifare"]]},
  ],
  medio: [
    {pairs:[["Perspicace","Acuto"],["Enigmatico","Misterioso"],["Indomito","Inarrendibile"],["Meticoloso","Preciso"],["Laconico","Conciso"],["Ubiquo","Ovunque"]]},
    {pairs:[["Soggetto","Chi agisce"],["Predicato","L'azione"],["Aggettivo","Descrive"],["Avverbio","Come/dove/quando"],["Congiunzione","Collega"],["Preposizione","Relazione"]]},
  ],
  difficile: [
    {pairs:[["Metafora","Trasferimento"],["Similitudine","Paragone"],["Ossimoro","Opposti uniti"],["Iperbole","Esagerazione"],["Eufemismo","Attenuazione"],["Anafora","Ripetizione"]]},
    {pairs:[["Climax","Tensione crescente"],["Flashback","Salto al passato"],["Allegoria","Significato nascosto"],["Ironia","Contrario di ciò che si dice"],["Sineddoche","Parte per il tutto"],["Litote","Negazione del contrario"]]},
  ]
};

// ── 5. Causa ed Effetto (Comprensione) ──
export const compCausaEffetto = {
  facile: [
    {title:"Collega causa ed effetto",pairs:[
      ["Marco non ha studiato.","Ha preso un brutto voto."],
      ["Piove molto forte.","Le strade si allagano."],
      ["Il gatto ha fame.","Miagola davanti alla ciotola."],
      ["Anna è stanca.","Va a dormire presto."],
      ["Fa molto caldo.","I bambini vanno in piscina."],
    ]},
    {title:"Perché succede?",pairs:[
      ["Luca ha mangiato troppo.","Ha mal di pancia."],
      ["Non c'è il sole.","La giornata è grigia."],
      ["Sara si è allenata tanto.","Ha vinto la gara."],
      ["Il ghiaccio si scioglie.","Diventa acqua."],
    ]},
  ],
  medio: [
    {title:"Cause e conseguenze",pairs:[
      ["Lo studente non ha fatto i compiti.","L'insegnante lo ha rimproverato."],
      ["Il paese fu colpito da un terremoto.","Molte case furono distrutte."],
      ["L'inventore ebbe un'idea geniale.","Creò una macchina rivoluzionaria."],
      ["La siccità durò mesi.","I raccolti andarono perduti."],
      ["Marco leggeva molto.","Aveva un vocabolario molto ricco."],
    ]},
  ],
  difficile: [
    {title:"Ragionamento logico",pairs:[
      ["L'autore usa un narratore onnisciente.","Il lettore conosce i pensieri di tutti."],
      ["La poesia usa molte metafore.","Il significato non è letterale."],
      ["Il periodo ipotetico è di 3° tipo.","L'azione non si è realizzata."],
      ["Il testo manca di coerenza.","Il lettore non capisce il filo logico."],
    ]},
  ]
};

// ── 6. Completa la Storia (Comprensione) ──
export const compComplStoria = {
  facile: [
    { intro:"Marco si sveglia la mattina.",
      finale:"Finalmente arriva a scuola e saluta i compagni.",
      missing:"Si veste, fa colazione e prende lo zaino.",
      opts:[
        "Si veste, fa colazione e prende lo zaino.",
        "Torna a dormire e accende la TV.",
        "Esce a giocare a pallone nel parco.",
        "Chiama la nonna per andare al mare.",
      ],h:"Cosa fa tra svegliarsi e arrivare a scuola?",x:"La sequenza logica è: svegliarsi → prepararsi → andare a scuola."},
    { intro:"La mamma entra in cucina.",
      finale:"La torta è pronta e profuma di cioccolato.",
      missing:"Mescola gli ingredienti e mette tutto in forno.",
      opts:[
        "Mescola gli ingredienti e mette tutto in forno.",
        "Accende la lavatrice e stende i panni.",
        "Va al supermercato a comprare il latte.",
        "Chiama il papà per cenare insieme.",
      ],h:"Cosa fa per preparare la torta?",x:"La parte mancante descrive la preparazione."},
  ],
  medio: [
    { intro:"La volpe vide dei grappoli d'uva su un pergolato alto.",
      finale:"Se ne andò dicendo: 'Tanto quell'uva è acerba!'",
      missing:"Provò a saltare più volte per raggiungerli, ma erano troppo in alto.",
      opts:[
        "Provò a saltare più volte per raggiungerli, ma erano troppo in alto.",
        "Chiese aiuto alla lepre che passava di lì.",
        "Si arrampicò sull'albero e colse i grappoli.",
        "Aspettò che i grappoli cadessero da soli.",
      ],h:"Cosa succede tra la scoperta dell'uva e la rinuncia?",x:"La volpe tenta e fallisce, poi si giustifica."},
    { intro:"Era una notte buia. Il cavaliere si avvicinò al castello.",
      finale:"Il drago fu sconfitto e la principessa fu liberata.",
      missing:"Entrò nella torre, affrontò il drago con coraggio e lottò a lungo.",
      opts:[
        "Entrò nella torre, affrontò il drago con coraggio e lottò a lungo.",
        "Tornò indietro perché aveva troppa paura.",
        "Bussò alla porta e chiese gentilmente di entrare.",
        "Si sedette ad aspettare che il sole sorgesse.",
      ],h:"Cosa fa il cavaliere per liberare la principessa?",x:"Il cavaliere compie l'impresa: entra, combatte, vince."},
  ],
  difficile: [
    { intro:"Nel testo argomentativo l'autore presenta la propria tesi: tutti dovrebbero leggere ogni giorno.",
      finale:"In conclusione, l'autore ribadisce che la lettura quotidiana arricchisce la mente.",
      missing:"A sostegno porta tre argomenti: migliora il vocabolario, sviluppa il pensiero critico e riduce lo stress.",
      opts:[
        "A sostegno porta tre argomenti: migliora il vocabolario, sviluppa il pensiero critico e riduce lo stress.",
        "Racconta una favola per divertire il lettore.",
        "Elenca tutti i libri che ha letto nell'ultimo anno.",
        "Descrive la sua libreria preferita nel centro della città.",
      ],h:"Cosa manca tra tesi e conclusione?",x:"In un testo argomentativo, tra tesi e conclusione ci sono gli argomenti a sostegno."},
  ]
};

// ── 7. Costruisci la Frase Libera (Grammatica) ──
export const gramCostruisci = {
  facile: [
    {soggetto:"Il gatto",verbo:"dormire",complemento:"sul divano",tempo:"presente",a:"Il gatto dorme sul divano.",opts:["Il gatto dorme sul divano.","Sul divano il gatto dormire.","Dormire il gatto sul divano.","Il gatto sul divano dorme il."]},
    {soggetto:"I bambini",verbo:"giocare",complemento:"nel parco",tempo:"presente",a:"I bambini giocano nel parco.",opts:["I bambini giocano nel parco.","Nel parco giocare i bambini.","Giocano i bambini parco nel.","I bambini giocare nel parco."]},
    {soggetto:"La maestra",verbo:"spiegare",complemento:"la lezione",tempo:"presente",a:"La maestra spiega la lezione.",opts:["La maestra spiega la lezione.","Spiegare la maestra la lezione.","La lezione la maestra spiega.","La maestra la lezione spiegare."]},
    {soggetto:"Noi",verbo:"mangiare",complemento:"la pizza",tempo:"passato prossimo",a:"Noi abbiamo mangiato la pizza.",opts:["Noi abbiamo mangiato la pizza.","Noi mangiamo la pizza.","Noi mangiare la pizza abbiamo.","Noi la pizza mangiato abbiamo."]},
  ],
  medio: [
    {soggetto:"Marco",verbo:"leggere",complemento:"un libro interessante",tempo:"imperfetto",a:"Marco leggeva un libro interessante.",opts:["Marco leggeva un libro interessante.","Marco legge un libro interessante.","Marco leggerà un libro interessante.","Marco ha letto un libro interessante."]},
    {soggetto:"Le ragazze",verbo:"andare",complemento:"al cinema con le amiche",tempo:"futuro semplice",a:"Le ragazze andranno al cinema con le amiche.",opts:["Le ragazze andranno al cinema con le amiche.","Le ragazze vanno al cinema con le amiche.","Le ragazze andavano al cinema.","Le ragazze sono andate al cinema."]},
    {soggetto:"Io",verbo:"volere",complemento:"un gelato al cioccolato",tempo:"condizionale",a:"Io vorrei un gelato al cioccolato.",opts:["Io vorrei un gelato al cioccolato.","Io voglio un gelato al cioccolato.","Io volli un gelato al cioccolato.","Io vorrò un gelato al cioccolato."]},
  ],
  difficile: [
    {soggetto:"Se io",verbo:"studiare",complemento:"di più",tempo:"periodo ipotetico 3° tipo",a:"Se avessi studiato di più, avrei superato l'esame.",opts:["Se avessi studiato di più, avrei superato l'esame.","Se studio di più, supero l'esame.","Se studiassi di più, supererei l'esame.","Se studierò di più, supererò l'esame."]},
    {soggetto:"Il professore",verbo:"volere",complemento:"che gli studenti capissero",tempo:"congiuntivo",a:"Il professore voleva che gli studenti capissero.",opts:["Il professore voleva che gli studenti capissero.","Il professore vuole che gli studenti capiscono.","Il professore voleva che gli studenti capivano.","Il professore vuole che gli studenti capiranno."]},
  ]
};

// ── 8. Completa il Dialogo (Comprensione) ──
export const compDialogo = {
  facile: [
    { personaggi:["Mamma","Luca"],
      battute:[
        {chi:"Mamma",testo:"Luca, hai fatto i compiti?"},
        {chi:"Luca",testo:"___",missing:true,a:"Sì mamma, li ho appena finiti!",opts:["Sì mamma, li ho appena finiti!","Mi piace il gelato.","Oggi è lunedì.","Il gatto è sul divano."]},
        {chi:"Mamma",testo:"Bravo! Allora puoi andare a giocare."},
        {chi:"Luca",testo:"Grazie mamma!"},
      ],h:"Luca risponde alla domanda sui compiti"},
    { personaggi:["Sara","Marco"],
      battute:[
        {chi:"Sara",testo:"Ciao Marco! Vuoi venire al parco?"},
        {chi:"Marco",testo:"___",missing:true,a:"Mi piacerebbe, ma devo finire i compiti prima.",opts:["Mi piacerebbe, ma devo finire i compiti prima.","La pizza è buona.","No, il cielo è blu.","Domani è festa."]},
        {chi:"Sara",testo:"Va bene, ti aspetto! Vieni quando hai finito."},
        {chi:"Marco",testo:"D'accordo, arrivo tra mezz'ora!"},
      ],h:"Marco risponde all'invito di Sara"},
    { personaggi:["Giulia","Papà"],
      battute:[
        {chi:"Giulia",testo:"Papà, posso avere un cucciolo?"},
        {chi:"Papà",testo:"___",missing:true,a:"Ne parliamo con la mamma, ma dovresti prenderti cura di lui ogni giorno.",opts:["Ne parliamo con la mamma, ma dovresti prenderti cura di lui ogni giorno.","I cuccioli mangiano la pizza.","No, perché fa freddo.","Il gatto è sul tavolo."]},
        {chi:"Giulia",testo:"Prometto che lo porterò a passeggio tutti i giorni!"},
      ],h:"Il papà risponde alla richiesta del cucciolo"},
    { personaggi:["Commessa","Bambina"],
      battute:[
        {chi:"Commessa",testo:"Ciao! Posso aiutarti a trovare qualcosa?"},
        {chi:"Bambina",testo:"___",missing:true,a:"Sì, cerco un regalo per la mia amica. Le piacciono i libri di avventura.",opts:["Sì, cerco un regalo per la mia amica. Le piacciono i libri di avventura.","Oggi piove.","Il cielo è azzurro.","Mi piace la matematica."]},
        {chi:"Commessa",testo:"Perfetto! Abbiamo delle novità bellissime, vieni a vedere!"},
      ],h:"La bambina spiega cosa cerca nel negozio"},
  ],
  medio: [
    { personaggi:["Cliente","Cameriere"],
      battute:[
        {chi:"Cameriere",testo:"Buongiorno! Cosa desidera ordinare?"},
        {chi:"Cliente",testo:"___",missing:true,a:"Vorrei una pizza margherita e un'acqua naturale, per favore.",opts:["Vorrei una pizza margherita e un'acqua naturale, per favore.","Il tempo è bello oggi.","Sono nato a Roma.","Mi piacciono i gatti."]},
        {chi:"Cameriere",testo:"Perfetto. La pizza arriva tra dieci minuti."},
        {chi:"Cliente",testo:"Grazie mille!"},
      ],h:"Il cliente ordina da mangiare"},
    { personaggi:["Insegnante","Alunno"],
      battute:[
        {chi:"Insegnante",testo:"Chi sa dirmi qual è il soggetto nella frase 'Il cane corre veloce'?"},
        {chi:"Alunno",testo:"___",missing:true,a:"Il soggetto è 'il cane', perché è chi compie l'azione.",opts:["Il soggetto è 'il cane', perché è chi compie l'azione.","Il soggetto è 'veloce' perché è un aggettivo.","Non lo so, non ho studiato.","Il soggetto è 'corre' perché è il verbo."]},
        {chi:"Insegnante",testo:"Esatto, bravissimo! Il cane compie l'azione di correre."},
      ],h:"L'alunno risponde alla domanda di grammatica"},
    { personaggi:["Dottore","Paziente"],
      battute:[
        {chi:"Dottore",testo:"Buongiorno, cosa posso fare per lei?"},
        {chi:"Paziente",testo:"___",missing:true,a:"Buongiorno dottore, ho mal di gola da tre giorni e un po' di febbre.",opts:["Buongiorno dottore, ho mal di gola da tre giorni e un po' di febbre.","Vorrei una pizza margherita.","Il treno parte alle cinque.","Mi piace giocare a calcio."]},
        {chi:"Dottore",testo:"Capisco. La visito subito e le prescrivo qualcosa."},
      ],h:"Il paziente descrive i sintomi al dottore"},
  ],
  difficile: [
    { personaggi:["Dante","Virgilio"],
      battute:[
        {chi:"Dante",testo:"Maestro, ho paura di entrare nell'Inferno."},
        {chi:"Virgilio",testo:"___",missing:true,a:"Non temere, io sarò la tua guida. Seguimi con coraggio.",opts:["Non temere, io sarò la tua guida. Seguimi con coraggio.","Andiamo a mangiare una pizza.","Non so, chiedi a qualcun altro.","Hai ragione, torniamo a casa."]},
        {chi:"Dante",testo:"Con te al mio fianco, troverò la forza di proseguire."},
      ],h:"Virgilio rassicura Dante nel suo ruolo di guida"},
    { personaggi:["Giornalista","Scienziata"],
      battute:[
        {chi:"Giornalista",testo:"Professoressa, come spiega ai ragazzi l'importanza della lettura?"},
        {chi:"Scienziata",testo:"___",missing:true,a:"La lettura sviluppa il pensiero critico e arricchisce il vocabolario, strumenti fondamentali per comprendere il mondo.",opts:["La lettura sviluppa il pensiero critico e arricchisce il vocabolario, strumenti fondamentali per comprendere il mondo.","Mi piace il colore rosso.","Non ho tempo per queste domande.","I libri sono fatti di carta."]},
        {chi:"Giornalista",testo:"Grazie per questa risposta così chiara e ispiratrice."},
      ],h:"La scienziata spiega il valore della lettura"},
  ]
};

// ══════════════════════════════════════
// ANALISI LOGICA & DEL PERIODO
// ══════════════════════════════════════

// ── Evidenzia (tocca la parte della frase) ──
export const analisiEvidenzia = {
  facile: [
    {frase:"Il gatto dorme.",parti:{soggetto:"Il gatto",predicato:"dorme"},h:"Chi? → soggetto. Cosa fa? → predicato"},
    {frase:"Maria mangia la mela.",parti:{soggetto:"Maria",predicato:"mangia",oggetto:"la mela"},h:"Chi? Cosa fa? Che cosa?"},
    {frase:"I bambini giocano nel parco.",parti:{soggetto:"I bambini",predicato:"giocano",luogo:"nel parco"},h:"Chi? Cosa fanno? Dove?"},
    {frase:"Il cane corre velocemente.",parti:{soggetto:"Il cane",predicato:"corre",modo:"velocemente"},h:"Chi? Cosa fa? Come?"},
    {frase:"Luca legge un libro.",parti:{soggetto:"Luca",predicato:"legge",oggetto:"un libro"},h:"Chi? Cosa fa? Che cosa?"},
  ],
  medio: [
    {frase:"Marco studia con Sara in biblioteca.",parti:{soggetto:"Marco",predicato:"studia",compagnia:"con Sara",luogo:"in biblioteca"},h:"Chi? Cosa fa? Con chi? Dove?"},
    {frase:"La nonna prepara la torta per i nipoti.",parti:{soggetto:"La nonna",predicato:"prepara",oggetto:"la torta",fine:"per i nipoti"},h:"Chi? Cosa fa? Che cosa? Per chi?"},
    {frase:"Ieri Giulia è andata a scuola in bicicletta.",parti:{tempo:"Ieri",soggetto:"Giulia",predicato:"è andata",luogo:"a scuola",mezzo:"in bicicletta"},h:"Quando? Chi? Cosa ha fatto? Dove? Con cosa?"},
  ],
  difficile: [
    {frase:"Nonostante la pioggia, i ragazzi uscirono con entusiasmo.",parti:{concessiva:"Nonostante la pioggia",soggetto:"i ragazzi",predicato:"uscirono",modo:"con entusiasmo"},h:"Quale ostacolo? Chi? Cosa fecero? Come?"},
    {frase:"Il bicchiere di vetro fu rotto dal bambino per sbaglio.",parti:{soggetto:"Il bicchiere di vetro",predicato:"fu rotto",agente:"dal bambino",causa:"per sbaglio"},h:"Frase passiva! Cosa? Da chi? Perché?"},
  ]
};

// ── Classifica i complementi ──
export const analisiComplementi = {
  facile: [
    {frase:"Vado al parco.",complemento:"al parco",tipo:"Luogo",opts:["Luogo","Tempo","Modo","Causa"],x:"'Dove?' → complemento di luogo."},
    {frase:"Studio con Marco.",complemento:"con Marco",tipo:"Compagnia",opts:["Compagnia","Luogo","Modo","Tempo"],x:"'Con chi?' → complemento di compagnia."},
    {frase:"Arrivo domani.",complemento:"domani",tipo:"Tempo",opts:["Tempo","Luogo","Modo","Causa"],x:"'Quando?' → complemento di tempo."},
    {frase:"Piango per la gioia.",complemento:"per la gioia",tipo:"Causa",opts:["Causa","Fine","Modo","Luogo"],x:"'Perché?' → complemento di causa."},
    {frase:"Cammina velocemente.",complemento:"velocemente",tipo:"Modo",opts:["Modo","Luogo","Tempo","Causa"],x:"'Come?' → complemento di modo."},
    {frase:"Mangio la pizza.",complemento:"la pizza",tipo:"Oggetto",opts:["Oggetto","Luogo","Modo","Causa"],x:"'Che cosa?' → complemento oggetto."},
  ],
  medio: [
    {frase:"Il vaso di ceramica è sul tavolo.",complemento:"di ceramica",tipo:"Materia",opts:["Materia","Specificazione","Qualità","Luogo"],x:"'Di che materiale?' → complemento di materia."},
    {frase:"Studio per l'esame.",complemento:"per l'esame",tipo:"Fine",opts:["Fine","Causa","Modo","Tempo"],x:"'Per quale scopo?' → complemento di fine."},
    {frase:"Viaggio in treno.",complemento:"in treno",tipo:"Mezzo",opts:["Mezzo","Luogo","Modo","Compagnia"],x:"'Con quale mezzo?' → complemento di mezzo."},
    {frase:"Il libro di Marco è interessante.",complemento:"di Marco",tipo:"Specificazione",opts:["Specificazione","Materia","Causa","Agente"],x:"'Di chi?' → complemento di specificazione."},
  ],
  difficile: [
    {frase:"La torta fu mangiata dai bambini.",complemento:"dai bambini",tipo:"Agente",opts:["Agente","Compagnia","Causa","Specificazione"],x:"'Da chi?' (in frase passiva) → complemento d'agente."},
    {frase:"Roma è famosa per la sua storia.",complemento:"per la sua storia",tipo:"Causa",opts:["Causa","Fine","Specificazione","Luogo"],x:"'Per quale motivo è famosa?' → causa."},
    {frase:"Secondo Marco, il film è bello.",complemento:"Secondo Marco",tipo:"Opinione/Limitazione",opts:["Opinione/Limitazione","Causa","Modo","Compagnia"],x:"'Secondo chi?' → complemento di limitazione."},
  ]
};

// ── Principale o Subordinata ──
export const analisiPrincSub = {
  facile: [
    {frase:"Marco studia | perché vuole imparare.",parti:["Marco studia","perché vuole imparare"],tipi:["Principale","Subordinata causale"],x:"'Perché' introduce una causale."},
    {frase:"Quando piove | resto a casa.",parti:["Quando piove","resto a casa"],tipi:["Subordinata temporale","Principale"],x:"'Quando' introduce una temporale."},
    {frase:"Il cane abbaia | e il gatto scappa.",parti:["Il cane abbaia","il gatto scappa"],tipi:["Principale","Coordinata"],x:"'E' coordina due frasi indipendenti."},
  ],
  medio: [
    {frase:"Sebbene fosse stanco | continuò a lavorare.",parti:["Sebbene fosse stanco","continuò a lavorare"],tipi:["Subordinata concessiva","Principale"],x:"'Sebbene' introduce una concessiva (ostacolo)."},
    {frase:"Studio | affinché io possa superare l'esame.",parti:["Studio","affinché io possa superare l'esame"],tipi:["Principale","Subordinata finale"],x:"'Affinché' introduce una finale (scopo)."},
    {frase:"La ragazza che studia molto | è brava.",parti:["che studia molto","La ragazza è brava"],tipi:["Subordinata relativa","Principale"],x:"'Che' introduce una relativa."},
    {frase:"Ho mangiato | ma non ho bevuto.",parti:["Ho mangiato","non ho bevuto"],tipi:["Principale","Coordinata avversativa"],x:"'Ma' coordina con contrapposizione."},
  ],
  difficile: [
    {frase:"Se avessi studiato | avrei superato l'esame | che era molto difficile.",parti:["Se avessi studiato","avrei superato l'esame","che era molto difficile"],tipi:["Sub. condizionale","Principale","Sub. relativa"],x:"Periodo con condizionale + relativa."},
    {frase:"Penso | che Marco sia partito | perché non risponde al telefono.",parti:["Penso","che Marco sia partito","perché non risponde al telefono"],tipi:["Principale","Sub. oggettiva","Sub. causale"],x:"La oggettiva dipende dalla principale, la causale dalla oggettiva."},
  ]
};

// ── Quiz Analisi ──
export const analisiQuiz = {
  facile: [
    {q:"In 'Il cane corre', qual è il soggetto?",a:"Il cane",w:["Corre","Il","Cane"],h:"Chi compie l'azione?",x:"Il soggetto è chi compie l'azione del verbo."},
    {q:"In 'Maria mangia la mela', qual è il predicato?",a:"Mangia",w:["Maria","La mela","La"],h:"Qual è l'azione?",x:"Il predicato verbale indica l'azione."},
    {q:"In 'Luca è felice', 'felice' è...",a:"Parte nominale del predicato",w:["Soggetto","Complemento oggetto","Avverbio"],h:"È + aggettivo = predicato nominale",x:"'È felice' è un predicato nominale (copula + parte nominale)."},
    {q:"'Nel parco' è un complemento di...",a:"Luogo",w:["Tempo","Modo","Causa"],h:"Dove?",x:"Risponde alla domanda 'Dove?'"},
  ],
  medio: [
    {q:"Quale frase ha un predicato nominale?",a:"Il cielo è azzurro",w:["Marco corre veloce","Ho mangiato la pizza","I bambini giocano"],h:"Essere + aggettivo",x:"Il predicato nominale è formato da essere + nome/aggettivo."},
    {q:"In 'Studio per l'esame', 'per l'esame' è complemento di...",a:"Fine/Scopo",w:["Causa","Modo","Tempo"],h:"Per quale scopo?",x:"'Per quale scopo studio?' → fine."},
    {q:"'Perché ero stanco' è una proposizione...",a:"Subordinata causale",w:["Principale","Coordinata","Subordinata temporale"],h:"Esprime il motivo",x:"'Perché' introduce la causa."},
  ],
  difficile: [
    {q:"In 'La lettera fu scritta da Marco', 'da Marco' è...",a:"Complemento d'agente",w:["Complemento di causa","Soggetto","Complemento di specificazione"],h:"Chi compie l'azione nella passiva?",x:"Nella frase passiva, chi compie l'azione è il complemento d'agente."},
    {q:"'Sebbene' introduce una proposizione...",a:"Concessiva",w:["Causale","Temporale","Finale"],h:"Indica un ostacolo superato",x:"Sebbene = nonostante. Introduce una concessiva."},
  ]
};

// ══════════════════════════════════════
// PRODUZIONE SCRITTA
// ══════════════════════════════════════

// ── Scegli il Connettivo ──
export const prodConnettivo = {
  facile: [
    {frase1:"Ho studiato molto.",frase2:"Ho preso un bel voto.",a:"Quindi",opts:["Quindi","Ma","Perché","Anche se"],x:"'Quindi' collega causa → conseguenza."},
    {frase1:"Piove forte.",frase2:"Prendo l'ombrello.",a:"Perciò",opts:["Perciò","Tuttavia","Prima","Sebbene"],x:"'Perciò' introduce la conseguenza."},
    {frase1:"Mi piace il gelato.",frase2:"Mi piace la torta.",a:"Inoltre",opts:["Inoltre","Però","Quindi","Sebbene"],x:"'Inoltre' aggiunge un'informazione."},
    {frase1:"Volevo uscire.",frase2:"Piove, non posso.",a:"Ma",opts:["Ma","Quindi","Anche","Poi"],x:"'Ma' introduce un contrasto."},
    {frase1:"Ho fatto i compiti.",frase2:"Ho giocato a pallone.",a:"Poi",opts:["Poi","Ma","Perché","Quindi"],x:"'Poi' indica la sequenza temporale."},
  ],
  medio: [
    {frase1:"Marco è bravo a scuola.",frase2:"Non studia molto.",a:"Tuttavia",opts:["Tuttavia","Inoltre","Quindi","Poi"],x:"'Tuttavia' introduce un contrasto inatteso."},
    {frase1:"Ho letto il libro.",frase2:"Volevo capirlo meglio.",a:"Perché",opts:["Perché","Inoltre","Poi","Ma"],x:"'Perché' introduce la ragione/causa."},
    {frase1:"Abbiamo visitato il museo.",frase2:"Abbiamo mangiato in trattoria.",a:"Successivamente",opts:["Successivamente","Tuttavia","Perché","Sebbene"],x:"'Successivamente' indica ciò che avviene dopo."},
    {frase1:"La situazione era difficile.",frase2:"Riuscì a superarla.",a:"Nonostante ciò",opts:["Nonostante ciò","Quindi","Inoltre","Perché"],x:"'Nonostante ciò' = malgrado la difficoltà."},
  ],
  difficile: [
    {frase1:"Il testo argomentativo presenta una tesi.",frase2:"Porta argomenti a sostegno.",a:"In seguito",opts:["In seguito","Sebbene","Tuttavia","Per esempio"],x:"'In seguito' indica il passo successivo."},
    {frase1:"L'ipotesi è interessante.",frase2:"Non è supportata dai dati.",a:"Ciononostante",opts:["Ciononostante","Inoltre","Dunque","Pertanto"],x:"'Ciononostante' = nonostante questo."},
    {frase1:"Dante scrisse la Divina Commedia.",frase2:"È considerato il padre della lingua italiana.",a:"Per questo motivo",opts:["Per questo motivo","Sebbene","Prima","Malgrado"],x:"'Per questo motivo' collega causa e conseguenza."},
  ]
};

// ── Riordina Paragrafi ──
export const prodRiordinaParagrafi = {
  facile: [
    {title:"La gita al mare",paragrafi:[
      "Sabato mattina ci siamo svegliati presto e abbiamo preparato le borse.",
      "Siamo saliti in macchina e abbiamo viaggiato per due ore.",
      "Quando siamo arrivati, il mare era bellissimo e azzurro.",
      "Abbiamo giocato sulla spiaggia e fatto il bagno tutto il giorno.",
      "La sera siamo tornati a casa, stanchi ma felici.",
    ]},
    {title:"Come preparare una torta",paragrafi:[
      "Per prima cosa, preriscalda il forno a 180 gradi.",
      "In una ciotola, mescola la farina, lo zucchero e le uova.",
      "Aggiungi il latte e il burro fuso, poi mescola bene.",
      "Versa il composto in una teglia e mettila nel forno.",
      "Dopo 30 minuti, la torta è pronta! Lasciala raffreddare.",
    ]},
  ],
  medio: [
    {title:"Un testo argomentativo",paragrafi:[
      "Molti ritengono che la lettura sia un'attività superata nell'era digitale.",
      "In realtà, leggere sviluppa il pensiero critico e arricchisce il vocabolario.",
      "Inoltre, numerosi studi dimostrano che chi legge ha migliori risultati scolastici.",
      "C'è chi obietta che i video siano più efficaci, ma la lettura richiede un'elaborazione più profonda.",
      "In conclusione, leggere rimane un'attività fondamentale per la crescita personale.",
    ]},
  ],
  difficile: [
    {title:"L'analisi di un fenomeno",paragrafi:[
      "Il cambiamento climatico è una delle sfide più importanti del nostro tempo.",
      "Le cause principali sono le emissioni di gas serra prodotte dall'attività umana.",
      "Le conseguenze si manifestano con l'aumento delle temperature e eventi meteo estremi.",
      "Per contrastare il fenomeno, sono necessarie azioni sia individuali che collettive.",
      "Solo attraverso la cooperazione internazionale sarà possibile invertire la tendenza.",
      "In definitiva, il futuro del pianeta dipende dalle scelte che facciamo oggi.",
    ]},
  ]
};

// ── Registro Linguistico ──
export const prodRegistro = {
  facile: [
    {contesto:"Scrivi alla maestra per giustificare un'assenza.",formale:"Gentile maestra, Le scrivo per giustificare la mia assenza di ieri dovuta a motivi di salute.",informale:"Ciao mae, ieri non sono venuto perché stavo male!",a:"formale",h:"Chi è il destinatario?",x:"Con gli insegnanti si usa il registro formale (Lei)."},
    {contesto:"Inviti un amico a giocare.",formale:"Le sarei grato se potesse raggiungermi questo pomeriggio.",informale:"Ehi, vieni a giocare da me oggi pomeriggio?",a:"informale",h:"È un amico o un adulto?",x:"Con gli amici si usa il registro informale (tu)."},
    {contesto:"Ringrazi la nonna per un regalo.",formale:"La ringrazio sentitamente per il cortese dono.",informale:"Grazie nonna, il regalo è bellissimo! Mi è piaciuto tantissimo!",a:"informale",h:"La nonna è famiglia!",x:"In famiglia si usa il registro informale."},
  ],
  medio: [
    {contesto:"Scrivi al preside per chiedere un permesso.",formale:"Egregio Preside, Le scrivo per richiedere un permesso di uscita anticipata per il giorno...",informale:"Ciao preside, posso uscire prima giovedì?",a:"formale",h:"Il preside è un'autorità",x:"Con le autorità si usa il registro formale."},
    {contesto:"Racconti a un compagno cosa hai fatto nel weekend.",formale:"Nel fine settimana mi sono recato presso un'esposizione artistica di notevole interesse.",informale:"Sabato sono andato a una mostra fichissima! Ti sarebbe piaciuta!",a:"informale",h:"È un compagno di classe",x:"Con i compagni si usa il registro informale."},
    {contesto:"Scrivi una recensione per il giornalino della scuola.",formale:"Il romanzo analizzato presenta una struttura narrativa complessa e personaggi ben delineati.",informale:"Il libro è troppo bello, dovete leggerlo assolutamente!",a:"formale",h:"Un giornalino è una pubblicazione",x:"Per una pubblicazione si usa un registro formale/standard."},
  ],
  difficile: [
    {contesto:"Scrivi una lettera al sindaco per segnalare un problema.",formale:"Egregio Signor Sindaco, mi permetto di segnalare alla Sua cortese attenzione il deterioramento del parco pubblico di via Roma.",informale:"Ehi sindaco, il parco di via Roma fa schifo, sistematelo!",a:"formale",h:"Il sindaco è un'autorità pubblica",x:"Le lettere ufficiali richiedono registro formale e formulario appropriato."},
  ]
};

// ── Correggi il Tema ──
export const prodCorreggi = {
  facile: [
    {testo:"Ieri sono andato al mare. Il mare era bello. Ho giocato sulla spiaggia. *Domani ho mangiato un gelato.* Poi siamo tornati a casa.",errore:"Domani ho mangiato un gelato.",corretto:"Poi ho mangiato un gelato.",x:"Errore di coerenza temporale: 'domani' è futuro ma il racconto è al passato."},
    {testo:"Il mio gatto si chiama Micio. È un gatto bianco e nero. *Gli piace abbaiare quando vede gli uccelli.* Dorme sempre sul divano.",errore:"Gli piace abbaiare quando vede gli uccelli.",corretto:"Gli piace miagolare quando vede gli uccelli.",x:"Errore logico: i gatti miagolano, non abbaiano!"},
    {testo:"La primavera è la mia stagione preferita. I fiori sbocciano e gli alberi si riempiono di foglie. *In primavera cade la neve e fa molto freddo.* Mi piace giocare al parco.",errore:"In primavera cade la neve e fa molto freddo.",corretto:"In primavera il sole splende e fa più caldo.",x:"Contraddizione: la neve e il freddo non sono caratteristiche della primavera."},
  ],
  medio: [
    {testo:"Il testo argomentativo serve a esporre un'opinione. *Per questo motivo, non è importante avere argomenti.* Bisogna convincere il lettore con ragionamenti logici e prove.",errore:"Per questo motivo, non è importante avere argomenti.",corretto:"Per questo motivo, è fondamentale avere argomenti solidi.",x:"Contraddizione: se serve convincere, gli argomenti sono essenziali!"},
    {testo:"Marco era molto stanco dopo la partita. *Si sentiva pieno di energia e aveva voglia di correre.* Decise di andare subito a dormire.",errore:"Si sentiva pieno di energia e aveva voglia di correre.",corretto:"Si sentiva esausto e non vedeva l'ora di riposare.",x:"Incoerenza: se era stanco, non poteva sentirsi pieno di energia."},
  ],
  difficile: [
    {testo:"Nella Divina Commedia, Dante compie un viaggio attraverso Inferno, Purgatorio e Paradiso. *La sua guida nell'Inferno è Beatrice, la donna amata.* Virgilio lo accompagna nei primi due regni.",errore:"La sua guida nell'Inferno è Beatrice, la donna amata.",corretto:"La sua guida nell'Inferno è Virgilio, il poeta latino.",x:"Errore fattuale: Virgilio guida Dante nell'Inferno e Purgatorio. Beatrice lo guida nel Paradiso."},
  ]
};
