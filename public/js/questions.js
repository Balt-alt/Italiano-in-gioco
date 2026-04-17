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
    {q:"'Poiché era tardi, andammo via' — 'poiché era tardi' è...",a:"Subordinata causale",w:["Principale","Coordinata","Subordinata temporale"],h:"Indica il motivo",x:"'Poiché' introduce la causa dell'azione."},
    {q:"Il modo condizionale di 'andare' (io) è...",a:"Andrei",w:["Andrò","Andavo","Sono andato"],h:"Ipotesi o desiderio",x:"Andare al condizionale: andrei, andresti, andrebbe..."},
    {q:"'Giacché' è una congiunzione...",a:"Causale",w:["Temporale","Avversativa","Finale"],h:"Sinonimo di 'poiché'",x:"Giacché = poiché, dato che → introduce una causale."},
    {q:"In 'Credo che tu abbia ragione', 'che tu abbia ragione' è una proposizione...",a:"Oggettiva",w:["Relativa","Causale","Finale"],h:"Dipende da 'credo'",x:"La oggettiva (o completiva) è il complemento oggetto della principale."},
  ]
};

// ── Grammatica: Classifica ──
export const gramClassifica = {
  facile: [
    {words:["gatto","correre","bello","tavolo","mangiare","grande"],categories:{"Nome":["gatto","tavolo"],"Verbo":["correre","mangiare"],"Aggettivo":["bello","grande"]}},
    {words:["casa","scrivere","rosso","albero","dormire","piccolo"],categories:{"Nome":["casa","albero"],"Verbo":["scrivere","dormire"],"Aggettivo":["rosso","piccolo"]}},
    {words:["sole","saltare","felice","fiore","leggere","triste"],categories:{"Nome":["sole","fiore"],"Verbo":["saltare","leggere"],"Aggettivo":["felice","triste"]}},
    {words:["penna","cantare","verde","mare","correre","alto"],categories:{"Nome":["penna","mare"],"Verbo":["cantare","correre"],"Aggettivo":["verde","alto"]}},
    {words:["libro","parlare","lungo","amico","giocare","bianco"],categories:{"Nome":["libro","amico"],"Verbo":["parlare","giocare"],"Aggettivo":["lungo","bianco"]}},
    {words:["stella","volare","rotondo","porta","costruire","stanco"],categories:{"Nome":["stella","porta"],"Verbo":["volare","costruire"],"Aggettivo":["rotondo","stanco"]}},
    {words:["cane","urlare","freddo","luna","nuotare","caldo"],categories:{"Nome":["cane","luna"],"Verbo":["urlare","nuotare"],"Aggettivo":["freddo","caldo"]}},
    {words:["acqua","pensare","nuovo","vento","disegnare","antico"],categories:{"Nome":["acqua","vento"],"Verbo":["pensare","disegnare"],"Aggettivo":["nuovo","antico"]}},
  ],
  medio: [
    {words:["velocemente","Luca","scrisse","incredibile","spesso","quaderno"],categories:{"Nome":["Luca","quaderno"],"Verbo":["scrisse"],"Aggettivo":["incredibile"],"Avverbio":["velocemente","spesso"]}},
    {words:["improvvisamente","la quale","studiano","meraviglioso","ieri","problema"],categories:{"Nome":["problema"],"Verbo":["studiano"],"Aggettivo":["meraviglioso"],"Avverbio":["improvvisamente","ieri"],"Pron. relativo":["la quale"]}},
    {words:["raramente","maestra","scrisse","enorme","oggi","zaino","mentre"],categories:{"Nome":["maestra","zaino"],"Verbo":["scrisse"],"Aggettivo":["enorme"],"Avverbio":["raramente","oggi"],"Congiunzione":["mentre"]}},
    {words:["silenziosamente","poesia","capisce","delicato","sempre","finestra","perché"],categories:{"Nome":["poesia","finestra"],"Verbo":["capisce"],"Aggettivo":["delicato"],"Avverbio":["silenziosamente","sempre"],"Congiunzione":["perché"]}},
    {words:["certamente","pittore","dipingeva","straordinario","mai","colore","sebbene"],categories:{"Nome":["pittore","colore"],"Verbo":["dipingeva"],"Aggettivo":["straordinario"],"Avverbio":["certamente","mai"],"Congiunzione":["sebbene"]}},
    {words:["purtroppo","atleta","vinse","velocissimo","presto","medaglia","dunque"],categories:{"Nome":["atleta","medaglia"],"Verbo":["vinse"],"Aggettivo":["velocissimo"],"Avverbio":["purtroppo","presto"],"Congiunzione":["dunque"]}},
    {words:["gentilmente","professore","spiega","difficile","spesso","lavagna","oppure"],categories:{"Nome":["professore","lavagna"],"Verbo":["spiega"],"Aggettivo":["difficile"],"Avverbio":["gentilmente","spesso"],"Congiunzione":["oppure"]}},
    {words:["probabilmente","scienziato","scoprì","affascinante","già","scoperta","tuttavia"],categories:{"Nome":["scienziato","scoperta"],"Verbo":["scoprì"],"Aggettivo":["affascinante"],"Avverbio":["probabilmente","già"],"Congiunzione":["tuttavia"]}},
  ],
  difficile: [
    {words:["affinché","tuttavia","il quale","loro","avrebbero","magnifico","silenziosamente"],categories:{"Cong. subordinante":["affinché"],"Cong. coordinante":["tuttavia"],"Pron. relativo":["il quale"],"Pron. personale":["loro"],"Verbo":["avrebbero"],"Aggettivo":["magnifico"],"Avverbio":["silenziosamente"]}},
    {words:["ciononostante","chiunque","avesse","aulico","poiché","nondimeno","qualora"],categories:{"Cong. coordinante":["ciononostante","nondimeno"],"Pron. indefinito":["chiunque"],"Verbo":["avesse"],"Aggettivo":["aulico"],"Cong. subordinante":["poiché","qualora"]}},
    {words:["giacché","colui che","ebbero","mirabile","altrimenti","sebbene","costoro"],categories:{"Cong. causale":["giacché"],"Pron. relativo":["colui che"],"Verbo":["ebbero"],"Aggettivo":["mirabile"],"Cong. avversativa":["altrimenti"],"Cong. concessiva":["sebbene"],"Pron. dimostrativo":["costoro"]}},
    {words:["benché","il medesimo","avrebbe dovuto","sublime","nondimeno","affinché","nessuno"],categories:{"Cong. concessiva":["benché"],"Agg. identità":["il medesimo"],"Verbo modale":["avrebbe dovuto"],"Aggettivo":["sublime"],"Cong. avversativa":["nondimeno"],"Cong. finale":["affinché"],"Pron. indefinito":["nessuno"]}},
    {words:["purché","costui","diventasse","illustre","ebbene","laddove","alcuno"],categories:{"Cong. condizionale":["purché"],"Pron. dimostrativo":["costui"],"Verbo":["diventasse"],"Aggettivo":["illustre"],"Cong. coordinante":["ebbene"],"Cong. temporale":["laddove"],"Agg. indefinito":["alcuno"]}},
    {words:["malgrado","taluno","avesse visto","imperscrutabile","pertanto","onde","medesimo"],categories:{"Cong. concessiva":["malgrado"],"Pron. indefinito":["taluno"],"Verbo":["avesse visto"],"Aggettivo":["imperscrutabile"],"Cong. conclusiva":["pertanto"],"Cong. finale":["onde"],"Agg. identità":["medesimo"]}},
    {words:["quantunque","chiunque","si fosse recato","mirabile","sicché","poiché","alcunché"],categories:{"Cong. concessiva":["quantunque"],"Pron. relativo indef.":["chiunque"],"Verbo":["si fosse recato"],"Aggettivo":["mirabile"],"Cong. consecutiva":["sicché"],"Cong. causale":["poiché"],"Pron. indefinito":["alcunché"]}},
    {words:["nonostante","coloro che","avranno visto","esimio","nondimeno","acciocché","ciascuno"],categories:{"Cong. concessiva":["nonostante"],"Pron. relativo":["coloro che"],"Verbo":["avranno visto"],"Aggettivo":["esimio"],"Cong. avversativa":["nondimeno"],"Cong. finale":["acciocché"],"Agg. distributivo":["ciascuno"]}},
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
    {frase:"Ho comprato ___ zainetto rosso.",opts:["un","uno","una","un'"],a:"uno",h:"Davanti a z",x:"'Uno' si usa davanti a z, s+consonante, gn."},
    {frase:"Marco è ___ bravo a disegnare.",opts:["molto","molta","molti","molte"],a:"molto",h:"Avverbio invariabile",x:"'Molto' come avverbio è invariabile."},
    {frase:"Le mie sorelle ___ a casa.",opts:["sono","è","siamo","sei"],h:"Plurale di 'è'",a:"sono",x:"Soggetto plurale → verbo plurale: loro sono."},
  ],
  medio: [
    {frase:"Sebbene ___ stanco, continuò a lavorare.",opts:["fosse","è","sarà","aveva"],a:"fosse",h:"Congiuntivo imperfetto",x:"Dopo 'sebbene' si usa il congiuntivo."},
    {frase:"La ragazza ___ studia molto è brava.",opts:["che","la","di","con"],a:"che",h:"Pronome relativo",x:"'Che' introduce la proposizione relativa."},
    {frase:"Vorrei che tu ___ più attento.",opts:["fossi","sei","saresti","eri"],a:"fossi",h:"Desiderio → congiuntivo",x:"Dopo 'vorrei che' si usa il congiuntivo imperfetto."},
    {frase:"Lo studente ___ studiato tutta la notte si è addormentato.",opts:["che aveva","di cui","il quale ha","a cui"],a:"che aveva",h:"Relativa al trapassato",x:"'Che aveva studiato' = proposizione relativa al trapassato."},
    {frase:"Pensavo ___ Luca fosse ancora in vacanza.",opts:["che","di","come","quando"],a:"che",h:"Congiunzione completiva",x:"'Pensavo che' + congiuntivo introduce la completiva."},
    {frase:"___ piova, uscirò comunque.",opts:["Sebbene","Poiché","Quindi","Allora"],a:"Sebbene",h:"Concessiva",x:"'Sebbene' + congiuntivo = frase concessiva."},
    {frase:"Il libro ___ mi hai regalato è bellissimo.",opts:["che","di cui","il quale","a cui"],a:"che",h:"Pronome relativo oggetto",x:"'Che' come pronome relativo riferito all'oggetto diretto."},
    {frase:"Prima di uscire, ricordati di ___ le finestre.",opts:["chiudere","chiudi","chiuda","chiudendo"],a:"chiudere",h:"Dopo 'di' + infinito",x:"Dopo la preposizione 'di' si usa l'infinito."},
  ],
  difficile: [
    {frase:"Se io ___ potuto, ti avrei aiutato.",opts:["avessi","ho","avrei","ebbi"],a:"avessi",h:"Periodo ipotetico 3° tipo",x:"Se + congiuntivo trapassato nella protasi."},
    {frase:"___ avesse studiato di più, avrebbe superato l'esame.",opts:["Se","Sebbene","Poiché","Affinché"],a:"Se",h:"Condizionale impossibile",x:"'Se' + congiuntivo trapassato = ipotetico 3° tipo (irreale)."},
    {frase:"Non sapevo ___ lui avesse già letto quel libro.",opts:["che","di","come","quale"],a:"che",h:"Oggettiva al congiuntivo",x:"'Non sapevo che' + congiuntivo trapassato = oggettiva."},
    {frase:"Per quanto ___ bravissimo, sbaglia talvolta.",opts:["sia","è","fosse","sarà"],a:"sia",h:"Concessiva al presente",x:"'Per quanto' + congiuntivo presente = concessiva."},
    {frase:"È necessario che voi ___ in tempo.",opts:["arriviate","arrivate","arriverete","arriviamo"],a:"arriviate",h:"Necessità → congiuntivo",x:"'È necessario che' + congiuntivo."},
    {frase:"L'unico studente ___ abbia capito è Marco.",opts:["che","il quale","di cui","a cui"],a:"che",h:"Superlativo + relativa",x:"Con i superlativi si usa 'che' + congiuntivo nelle relative."},
    {frase:"Pur ___ tardi, decise di chiamare.",opts:["essendo","essere","sia","fosse"],a:"essendo",h:"Gerundio concessivo",x:"'Pur essendo' = benché fosse: gerundio con valore concessivo."},
    {frase:"Mi chiedo ___ lui dica la verità.",opts:["se","che","come","quando"],a:"se",h:"Interrogativa indiretta",x:"'Mi chiedo se' = interrogativa indiretta, esprime dubbio."},
  ]
};

// ── Grammatica: Ordina ──
export const gramOrdina = {
  facile: [
    {w:["Il","gatto","dorme","sul","divano"],c:"Il gatto dorme sul divano",h:"Chi? Cosa fa? Dove?"},
    {w:["Maria","mangia","una","mela","rossa"],c:"Maria mangia una mela rossa",h:"Soggetto + verbo + oggetto"},
    {w:["I","bambini","giocano","nel","parco"],c:"I bambini giocano nel parco",h:"Art. + nome + verbo + luogo"},
    {w:["Oggi","piove","e","fa","freddo"],c:"Oggi piove e fa freddo",h:"Tempo + verbo + congiunzione"},
    {w:["La","maestra","spiega","la","lezione"],c:"La maestra spiega la lezione",h:"Soggetto + verbo + oggetto"},
    {w:["Ho","comprato","un","libro","nuovo"],c:"Ho comprato un libro nuovo",h:"Passato prossimo + oggetto"},
    {w:["Il","cane","corre","velocemente","nel","prato"],c:"Il cane corre velocemente nel prato",h:"Soggetto + verbo + avverbio + luogo"},
    {w:["Domani","andremo","al","mare","con","la","famiglia"],c:"Domani andremo al mare con la famiglia",h:"Tempo + futuro + luogo + compagnia"},
  ],
  medio: [
    {w:["Sebbene","fosse","tardi","Marco","uscì","di","casa"],c:"Sebbene fosse tardi Marco uscì di casa",h:"Concessiva + principale"},
    {w:["Dopo","aver","mangiato","andarono","a","dormire"],c:"Dopo aver mangiato andarono a dormire",h:"Temporale + principale"},
    {w:["La","ragazza","che","studia","molto","diventerà","famosa"],c:"La ragazza che studia molto diventerà famosa",h:"Sogg. + relativa + predicato"},
    {w:["Poiché","era","stanco","si","sedette","su","una","panchina"],c:"Poiché era stanco si sedette su una panchina",h:"Causale + principale"},
    {w:["Gli","studenti","che","non","hanno","studiato","sono","rimasti","a","casa"],c:"Gli studenti che non hanno studiato sono rimasti a casa",h:"Sogg. + relativa + pred."},
    {w:["Prima","di","uscire","ricordati","di","prendere","l'ombrello"],c:"Prima di uscire ricordati di prendere l'ombrello",h:"Temporale + imperativo + infinito"},
    {w:["Quando","arrivò","a","casa","trovò","una","sorpresa"],c:"Quando arrivò a casa trovò una sorpresa",h:"Temporale + principale"},
    {w:["Il","libro","di","cui","mi","hai","parlato","è","esaurito"],c:"Il libro di cui mi hai parlato è esaurito",h:"Nome + relativa + predicato"},
  ],
  difficile: [
    {w:["Se","avessi","studiato","di","più","avrei","superato","l'esame"],c:"Se avessi studiato di più avrei superato l'esame",h:"Periodo ipotetico 3° tipo"},
    {w:["Nonostante","la","pioggia","i","ragazzi","uscirono","lo","stesso"],c:"Nonostante la pioggia i ragazzi uscirono lo stesso",h:"Concessiva nominale + principale"},
    {w:["Penso","che","Marco","abbia","già","finito","il","compito"],c:"Penso che Marco abbia già finito il compito",h:"Principale + oggettiva al congiuntivo"},
    {w:["Per","quanto","si","sforzi","non","riesce","a","capire"],c:"Per quanto si sforzi non riesce a capire",h:"Concessiva + principale"},
    {w:["Affinché","tu","possa","riuscire","devi","impegnarti","ogni","giorno"],c:"Affinché tu possa riuscire devi impegnarti ogni giorno",h:"Finale + principale"},
    {w:["Era","così","stanco","che","si","addormentò","subito"],c:"Era così stanco che si addormentò subito",h:"Consecutiva: così... che"},
    {w:["L'unico","che","abbia","capito","la","spiegazione","è","Giovanni"],c:"L'unico che abbia capito la spiegazione è Giovanni",h:"Superlativo + relativa al congiuntivo"},
    {w:["Pur","avendo","studiato","tutta","la","notte","non","era","pronto"],c:"Pur avendo studiato tutta la notte non era pronto",h:"Concessiva con gerundio + principale"},
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
    {q:"Un sinonimo di 'bambino' è...",a:"Fanciullo",w:["Adulto","Anziano","Professore"],h:"Piccolo di età",x:"Fanciullo è una parola letteraria per bambino."},
    {q:"Il contrario di 'piangere' è...",a:"Ridere",w:["Dormire","Correre","Mangiare"],h:"Opposto",x:"Piangere/ridere sono antonimi."},
    {q:"'Silenzioso' significa...",a:"Che non fa rumore",w:["Molto alto","Colorato","Veloce"],h:"Quiet",x:"Silenzioso = privo di rumore, quieto."},
    {q:"Un sinonimo di 'bello' è...",a:"Splendido",w:["Brutto","Strano","Piccolo"],h:"Aspetto gradevole",x:"Splendido, magnifico, meraviglioso sono sinonimi di bello."},
  ],
  medio: [
    {q:"Cosa significa 'perspicace'?",a:"Intelligente e acuto",w:["Alto","Stanco","Lento"],h:"Capisce subito",x:"Perspicace: coglie rapidamente i dettagli."},
    {q:"'Enigmatico' significa...",a:"Misterioso",w:["Chiaro","Semplice","Noioso"],h:"Enigma",x:"Enigmatico: difficile da capire, misterioso."},
    {q:"'Procrastinare' vuol dire...",a:"Rimandare a dopo",w:["Fare subito","Correre","Dormire"],h:"Domani...",x:"Procrastinare: rimandare continuamente."},
    {q:"Il contrario di 'abbondante' è...",a:"Scarso",w:["Enorme","Ricco","Pieno"],h:"Poco",x:"Abbondante = molto; scarso = poco."},
    {q:"'Indomito' significa...",a:"Che non si arrende",w:["Stanco","Calmo","Lento"],h:"Non domabile",x:"Indomito: che non può essere domato."},
    {q:"'Meticoloso' vuol dire...",a:"Molto preciso e accurato",w:["Disordinato","Veloce","Pigro"],h:"Cura dei dettagli",x:"Chi è meticoloso cura ogni minimo dettaglio."},
    {q:"Il contrario di 'timido' è...",a:"Audace",w:["Basso","Magro","Silenzioso"],h:"Chi parla senza paura",x:"Timido / audace (o sfrontato) sono antonimi."},
    {q:"'Efimero' significa...",a:"Che dura poco",w:["Eterno","Enorme","Difficile"],h:"Dura un momento",x:"Efimero: di brevissima durata, transitorio."},
    {q:"Un sinonimo di 'sconvolgente' è...",a:"Sconcertante",w:["Noioso","Tranquillo","Comune"],h:"Sorpresa forte",x:"Sconvolgente = scioccante, sconcertante."},
    {q:"'Lacónico' significa...",a:"Che usa pochissime parole",w:["Rumoroso","Loquace","Elegante"],h:"Sparta / Laconia",x:"Laconico: stile conciso, poche parole essenziali."},
  ],
  difficile: [
    {q:"'Aulico' si riferisce a...",a:"Elevato e solenne",w:["Quotidiano","Volgare","Semplice"],h:"Corte",x:"Registro aulico = poesia classica, linguaggio formale."},
    {q:"Cosa significa 'serendipità'?",a:"Scoperta fortunata per caso",w:["Tristezza","Forte vento","Lunga attesa"],h:"Fortuna inaspettata",x:"Fare scoperte fortunate per puro caso."},
    {q:"Un 'ossimoro' è...",a:"Accostamento di opposti",w:["Ripetizione","Elenco","Domanda"],h:"'Ghiaccio bollente'",x:"Ossimoro: 'dolce amaro', 'silenzio assordante'."},
    {q:"Un 'eufemismo' serve a...",a:"Attenuare un'espressione",w:["Esagerare","Ripetere","Invertire"],h:"Forma delicata",x:"'Passare a miglior vita' per 'morire'."},
    {q:"'Perifrasi' significa...",a:"Descrivere con più parole ciò che si potrebbe dire in una",w:["Frase breve","Domanda retorica","Ripetizione"],h:"Giro di parole",x:"Perifrasi: 'l'astro del giorno' al posto di 'il sole'."},
    {q:"'Antitesi' è...",a:"Accostamento di concetti opposti",w:["Lista di sinonimi","Ripetizione","Domanda"],h:"Contrasto",x:"Antitesi: 'vinsi/perdei'; 'risi/piansi'."},
    {q:"Cosa significa 'arcaismo'?",a:"Parola o forma non più in uso",w:["Parola straniera","Neologismo","Abbreviazione"],h:"Antico",x:"Gli arcaismi sono forme anticate della lingua."},
    {q:"'Sinestesia' è...",a:"Unione di sensazioni di sensi diversi",w:["Ripetizione","Inversione","Esagerazione"],h:"'Voce calda'",x:"Sinestesia: 'colore fragrante', 'voce morbida'."},
  ]
};

// ── Vocabolario: Abbina ──
export const vocabAbbina = {
  facile: [
    {title:"Abbina i contrari",pairs:[["Grande","Piccolo"],["Alto","Basso"],["Caldo","Freddo"],["Aperto","Chiuso"],["Veloce","Lento"]]},
    {title:"Abbina i sinonimi",pairs:[["Allegro","Felice"],["Casa","Abitazione"],["Veloce","Rapido"],["Iniziare","Cominciare"],["Bello","Carino"]]},
    {title:"Animale e verso",pairs:[["Cane","Abbaia"],["Gatto","Miagola"],["Mucca","Muggisce"],["Leone","Ruggisce"],["Ape","Ronza"]]},
    {title:"Parola e contrario",pairs:[["Giorno","Notte"],["Piangere","Ridere"],["Salire","Scendere"],["Iniziare","Finire"],["Domanda","Risposta"]]},
    {title:"Parola e categoria",pairs:[["Mela","Frutto"],["Carota","Verdura"],["Cane","Animale"],["Rosa","Fiore"],["Quercia","Albero"]]},
    {title:"Sinonimi 2",pairs:[["Correre","Scattare"],["Guardare","Osservare"],["Parlare","Conversare"],["Camminare","Passeggiare"],["Scegliere","Selezionare"]]},
    {title:"Contrari 2",pairs:[["Coraggio","Paura"],["Silenzio","Rumore"],["Chiedere","Rispondere"],["Costruire","Distruggere"],["Trovare","Perdere"]]},
    {title:"Plurale irregolare",pairs:[["Uovo","Uova"],["Uomo","Uomini"],["Dito","Dita"],["Braccio","Braccia"],["Bue","Buoi"]]},
  ],
  medio: [
    {title:"Parola e significato",pairs:[["Perspicace","Molto acuto"],["Enigmatico","Misterioso"],["Indomito","Inarrendibile"],["Procrastinare","Rimandare"],["Meticoloso","Molto preciso"]]},
    {title:"Sinonimi letterari",pairs:[["Fanciullo","Bambino"],["Dimora","Casa"],["Udire","Sentire"],["Mirabile","Meraviglioso"],["Giungere","Arrivare"]]},
    {title:"Registro formale / informale",pairs:[["Egregio","Caro"],["Le scrivo","Ti scrivo"],["Cordiali saluti","Ciao"],["Sono grato","Grazie"],["Mi permetto di","Posso"]]},
    {title:"Modi di dire",pairs:[["In bocca al lupo","Buona fortuna"],["Acqua in bocca","Silenzio"],["A occhio e croce","Circa"],["Piove a catinelle","Piove forte"],["Prendere lucciole per lanterne","Sbagliarsi"]]},
    {title:"Parola e antonimo",pairs:[["Abbondante","Scarso"],["Efimero","Eterno"],["Audace","Timido"],["Laconico","Loquace"],["Perspicace","Ottuso"]]},
    {title:"Prefisso e significato",pairs:[["In-","Negazione"],["Pre-","Prima"],["Post-","Dopo"],["Anti-","Contro"],["Ri-","Di nuovo"]]},
    {title:"Parti del discorso",pairs:[["Velocemente","Avverbio"],["Sebbene","Congiunzione"],["Di","Preposizione"],["Bello","Aggettivo"],["Correre","Verbo"]]},
    {title:"Congiunzione e tipo",pairs:[["E","Copulativa"],["Ma","Avversativa"],["Perché","Causale"],["Affinché","Finale"],["Sebbene","Concessiva"]]},
  ],
  difficile: [
    {title:"Figure retoriche",pairs:[["Metafora","Trasferimento significato"],["Similitudine","Paragone con 'come'"],["Ossimoro","Opposti accostati"],["Iperbole","Esagerazione"],["Eufemismo","Attenuazione"]]},
    {title:"Figure retoriche avanzate",pairs:[["Anafora","Ripetizione iniziale"],["Sinestesia","Sensi diversi uniti"],["Litote","Negazione del contrario"],["Allegoria","Significato nascosto"],["Perifrasi","Giro di parole"]]},
    {title:"Proposizioni subordinate",pairs:[["Causale","Perché / poiché"],["Finale","Affinché / per"],["Concessiva","Sebbene / benché"],["Temporale","Quando / mentre"],["Condizionale","Se / qualora"]]},
    {title:"Modi verbali",pairs:[["Indicativo","Certezza"],["Congiuntivo","Dubbio / desiderio"],["Condizionale","Ipotesi"],["Imperativo","Comando"],["Infinito","Forma base"]]},
    {title:"Termini di analisi del testo",pairs:[["Narratore onnisciente","Conosce tutto"],["Flashback","Salto al passato"],["Climax","Tensione crescente"],["Protagonista","Personaggio principale"],["Fabula","Ordine cronologico"]]},
    {title:"Parola e arcaismo",pairs:[["Dimane","Domani"],["Aulico","Elevato"],["Vegliardo","Vecchio"],["Prence","Principe"],["Donzella","Ragazza"]]},
    {title:"Poetica italiana",pairs:[["Endecasillabo","11 sillabe"],["Novenario","9 sillabe"],["Terzina","3 versi"],["Sonetto","14 versi"],["Rima baciata","AABB"]]},
    {title:"Struttura testo argomentativo",pairs:[["Tesi","Opinione principale"],["Argomenti","Prove della tesi"],["Antitesi","Opinione contraria"],["Confutazione","Smontare l'antitesi"],["Conclusione","Sintesi finale"]]},
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
    {words:["Lunedì","Martedì","Gennaio","Mercoledì"],intruso:"Gennaio",h:"Non è un giorno",x:"Gennaio è un mese, non un giorno della settimana."},
    {words:["Grande","Alto","Bello","Correre"],intruso:"Correre",h:"Non è un aggettivo",x:"Correre è un verbo; gli altri sono aggettivi."},
    {words:["Pane","Pasta","Riso","Arancia"],intruso:"Arancia",h:"Non è un carboidrato",x:"Arancia è un frutto; gli altri sono carboidrati."},
  ],
  medio: [
    {words:["Sebbene","Affinché","Perché","Ma"],intruso:"Ma",h:"Uno è coordinante",x:"'Ma' è coordinante; le altre sono subordinanti."},
    {words:["Lessi","Scrissi","Mangiai","Ho mangiato"],intruso:"Ho mangiato",h:"Tempo diverso",x:"'Ho mangiato' è passato prossimo; gli altri passato remoto."},
    {words:["Perspicace","Meticoloso","Lacónico","Tavolo"],intruso:"Tavolo",h:"Non è un aggettivo di carattere",x:"Tavolo è un nome concreto; gli altri descrivono caratteristiche."},
    {words:["Metafora","Similitudine","Ossimoro","Congiuntivo"],intruso:"Congiuntivo",h:"Categoria diversa",x:"Congiuntivo è un modo verbale; gli altri sono figure retoriche."},
    {words:["Poiché","Sebbene","Giacché","Affinché"],intruso:"Affinché",h:"Uno indica scopo, gli altri causa",x:"Affinché = finale; poiché/giacché = causali; sebbene = concessiva."},
    {words:["Avevo","Avevi","Aveva","Abbiamo"],intruso:"Abbiamo",h:"Tempo diverso",x:"Abbiamo = presente; avevo/avevi/aveva = imperfetto."},
    {words:["Vocale","Consonante","Sillaba","Verbo"],intruso:"Verbo",h:"Categoria diversa",x:"Verbo è parte del discorso; gli altri sono elementi fonologici."},
    {words:["Tesi","Argomento","Conclusione","Metafora"],intruso:"Metafora",h:"Non appartiene al testo argomentativo",x:"Metafora è una figura retorica; gli altri sono parti del testo argomentativo."},
  ],
  difficile: [
    {words:["Metafora","Similitudine","Congiuntivo","Ossimoro"],intruso:"Congiuntivo",h:"Non è una figura retorica",x:"Il congiuntivo è un modo verbale."},
    {words:["Endecasillabo","Novenario","Settenario","Terzina"],intruso:"Terzina",h:"Uno è una strofa",x:"Terzina è una strofa (3 versi); gli altri sono tipi di verso."},
    {words:["Fabula","Intreccio","Flashback","Sonetto"],intruso:"Sonetto",h:"Non è un elemento narrativo",x:"Sonetto è una forma poetica; gli altri sono elementi della narratologia."},
    {words:["Climax","Anticlimax","Anafora","Protagonista"],intruso:"Protagonista",h:"Non è una figura retorica/narrativa",x:"Protagonista è un personaggio; gli altri sono tecniche stilistiche o narrative."},
    {words:["Perifrasi","Eufemismo","Litote","Congiuntivo trapassato"],intruso:"Congiuntivo trapassato",h:"Non è una figura retorica",x:"Congiuntivo trapassato è un tempo verbale."},
    {words:["Narratore onnisciente","Narratore interno","Focalizzazione","Passato remoto"],intruso:"Passato remoto",h:"Non è un elemento narratologico",x:"Passato remoto è un tempo verbale; gli altri sono concetti di narratologia."},
    {words:["Dante","Petrarca","Boccaccio","Leopardi"],intruso:"Leopardi",h:"Epoca diversa",x:"Dante, Petrarca e Boccaccio sono del Trecento; Leopardi è dell'Ottocento."},
    {words:["Tesi","Antitesi","Confutazione","Similitudine"],intruso:"Similitudine",h:"Non fa parte del testo argomentativo",x:"Similitudine è figura retorica; gli altri sono parti del testo argomentativo."},
  ]
};

// ── Vocabolario: Catena ──
export const vocabCatena = {
  facile: [
    {clue1:"Sinonimo di 'contento'",clue2:"Contrario di 'triste'",a:"Felice",opts:["Felice","Nervoso","Stanco","Grande"],x:"Felice = contento, contrario di triste."},
    {clue1:"Contrario di 'notte'",clue2:"Quando c'è il sole",a:"Giorno",opts:["Giorno","Sera","Mattina","Alba"],x:"Giorno = contrario di notte, c'è la luce."},
    {clue1:"Un frutto giallo",clue2:"Lo mangiano le scimmie",a:"Banana",opts:["Banana","Mela","Arancia","Pera"],x:"Banana = frutto giallo delle scimmie."},
    {clue1:"Il contrario di 'grande'",clue2:"Sinonimo di 'minuscolo'",a:"Piccolo",opts:["Piccolo","Basso","Sottile","Corto"],x:"Piccolo = contrario di grande, sinonimo di minuscolo."},
    {clue1:"Sinonimo di 'veloce'",clue2:"Contrario di 'lento'",a:"Rapido",opts:["Rapido","Forte","Alto","Pesante"],x:"Rapido = veloce, contrario di lento."},
    {clue1:"L'opposto del giorno",clue2:"Quando ci sono le stelle",a:"Notte",opts:["Notte","Sera","Alba","Tramonto"],x:"La notte è buia, ci sono le stelle."},
    {clue1:"Dove abitano i pesci",clue2:"Copre il 70% della Terra",a:"Mare",opts:["Mare","Fiume","Lago","Piscina"],x:"Il mare copre la maggior parte della Terra."},
    {clue1:"Sinonimo di 'casa'",clue2:"Luogo dove si abita",a:"Abitazione",opts:["Abitazione","Scuola","Negozio","Parco"],x:"Abitazione = casa, luogo dove si vive."},
  ],
  medio: [
    {clue1:"Modo verbale dell'ipotesi",clue2:"Si usa dopo 'se'",a:"Congiuntivo",opts:["Congiuntivo","Indicativo","Imperativo","Gerundio"],x:"Il congiuntivo esprime dubbio, ipotesi."},
    {clue1:"Figura retorica con 'come'",clue2:"Paragone esplicito",a:"Similitudine",opts:["Similitudine","Metafora","Iperbole","Ossimoro"],x:"La similitudine usa 'come' per confrontare."},
    {clue1:"Chi rimanda sempre tutto",clue2:"Fa ciò che significa 'procrastinare'",a:"Pigro",opts:["Pigro","Veloce","Studioso","Attento"],x:"Chi procrastina rimanda continuamente le cose."},
    {clue1:"Sinonimo di 'misterioso'",clue2:"Deriva da 'enigma'",a:"Enigmatico",opts:["Enigmatico","Bello","Famoso","Lento"],x:"Enigmatico = che contiene un enigma, misterioso."},
    {clue1:"Aggettivo per chi cura ogni dettaglio",clue2:"Contrario di 'approssimativo'",a:"Meticoloso",opts:["Meticoloso","Stanco","Curioso","Silenzioso"],x:"Meticoloso: preciso, accurato in ogni dettaglio."},
    {clue1:"Contrario di 'eterno'",clue2:"Di brevissima durata",a:"Efimero",opts:["Efimero","Noioso","Comune","Lontano"],x:"Efimero: dura pochissimo, transitorio."},
    {clue1:"Chi usa pochissime parole",clue2:"Aggettivo che deriva da Laconia (Sparta)",a:"Laconico",opts:["Laconico","Loquace","Curioso","Timido"],x:"Laconico: stile conciso tipico degli Spartani."},
    {clue1:"Contrario di 'timido'",clue2:"Sinonimo di 'coraggioso' nel parlare",a:"Audace",opts:["Audace","Alto","Allegro","Rapido"],x:"Audace: che agisce con coraggio e sfrontatezza."},
  ],
  difficile: [
    {clue1:"Figura retorica che unisce sensi diversi",clue2:"'Voce calda' è un esempio",a:"Sinestesia",opts:["Sinestesia","Metafora","Ossimoro","Anafora"],x:"Sinestesia: unione di percezioni di sensi diversi."},
    {clue1:"Giro di parole al posto di un termine diretto",clue2:"'L'astro del giorno' per 'il sole'",a:"Perifrasi",opts:["Perifrasi","Metafora","Eufemismo","Iperbole"],x:"Perifrasi: descrivere con più parole ciò che si potrebbe dire in una."},
    {clue1:"Opposti accostati in poesia",clue2:"'Silenzio assordante' è un esempio",a:"Ossimoro",opts:["Ossimoro","Antitesi","Litote","Anafora"],x:"Ossimoro: due termini opposti vicini nella stessa espressione."},
    {clue1:"Negazione del contrario",clue2:"'Non senza emozione' per 'con emozione'",a:"Litote",opts:["Litote","Eufemismo","Iperbole","Ironia"],x:"Litote: affermare qualcosa negando il suo contrario."},
    {clue1:"Ripetizione della stessa parola all'inizio di versi o frasi",clue2:"Dante la usa spesso",a:"Anafora",opts:["Anafora","Epistrofe","Chiasmo","Climax"],x:"Anafora: ripetizione della stessa parola o gruppo di parole."},
    {clue1:"Intensificazione progressiva",clue2:"L'azione sale sempre di più",a:"Climax",opts:["Climax","Anticlimax","Flashback","Ellissi"],x:"Climax: serie di elementi in ordine crescente di intensità."},
    {clue1:"Racconto in cui ogni elemento ha significato nascosto",clue2:"La Divina Commedia ne è ricca",a:"Allegoria",opts:["Allegoria","Metafora","Similitudine","Simbolo"],x:"Allegoria: il significato letterale ne nasconde uno più profondo."},
    {clue1:"Forma poetica di 14 versi",clue2:"Petrarca ne compose moltissimi",a:"Sonetto",opts:["Sonetto","Ode","Ballata","Terzina"],x:"Il sonetto ha 14 versi: due quartine e due terzine."},
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
    {q:"Trapassato prossimo: Loro (già/mangiare)",a:"Avevano già mangiato",w:["Mangiano già","Mangiavano già","Avrebbero mangiato"],h:"Aus. imperfetto + participio",x:"Trapassato prossimo = avevo/avevi/aveva + participio."},
    {q:"Quale ausiliare usa 'cadere' al passato prossimo?",a:"Essere",w:["Avere","Entrambi","Nessuno"],h:"Moto / stato",x:"Cadere (intransitivo) usa 'essere': sono caduto/a."},
    {q:"'Stavo mangiando' è al...",a:"Imperfetto progressivo",w:["Presente","Passato prossimo","Futuro"],h:"Stavo + gerundio",x:"'Stavo + gerundio' esprime un'azione in corso nel passato."},
    {q:"Passivo: La torta ___ preparata dalla nonna.",a:"è stata",w:["ha","è","aveva"],h:"Ausiliare essere + participio",x:"Forma passiva: essere + participio passato concordato."},
    {q:"Futuro anteriore: Quando (tu/finire), chiamami.",a:"avrai finito",w:["finirai","finisci","avevi finito"],h:"Anteriorità futura",x:"Futuro anteriore = ausiliare al futuro + participio."},
  ],
  difficile: [
    {q:"Congiuntivo imperfetto: Se io (potere)...",a:"Potessi",w:["Posso","Potrei","Potrò"],h:"Se + cong. imp.",x:"Se + congiuntivo imperfetto."},
    {q:"Passato remoto di 'nascere' (io):",a:"Nacqui",w:["Nascei","Nascetti","Sono nato"],h:"Irregolare",x:"Nascere: nacqui, nascesti, nacque..."},
    {q:"Condizionale passato: Loro (dovere) studiare",a:"Avrebbero dovuto",w:["Dovrebbero","Dovevano","Hanno dovuto"],h:"Cond. aus. + part.",x:"Condizionale passato = condizionale ausiliare + participio."},
    {q:"Il participio presente di 'correre' è...",a:"Corrente",w:["Correndo","Corso","Corruto"],h:"Aggettivo",x:"Participio presente come aggettivo: acqua corrente."},
    {q:"Congiuntivo trapassato: Se io (sapere)...",a:"Avessi saputo",w:["Avrei saputo","Sapessi","Sapevo"],h:"Aus. cong. imp. + participio",x:"Cong. trapassato = avessi/avessi/avesse + participio."},
    {q:"'Verrebbe' è al modo...",a:"Condizionale presente",w:["Futuro","Congiuntivo","Imperativo"],h:"Ipotesi cortese",x:"'Verrebbe' = condizionale presente di 'venire'."},
    {q:"Passato remoto di 'porre' (io):",a:"Posi",w:["Ponei","Ponetti","Ho posto"],h:"Irregolare forte",x:"Porre: posi, ponesti, pose, ponemmo, poneste, posero."},
    {q:"Il gerundio passato di 'leggere' è...",a:"Avendo letto",w:["Leggendo","Letto","Aver letto"],h:"Aus. gerundio + participio",x:"Gerundio passato = avendo/essendo + participio."},
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
    {verb:"venire",persona:"lui",tempo:"presente",a:"viene"},
    {verb:"parlare",persona:"tu",tempo:"presente",a:"parli"},
    {verb:"leggere",persona:"noi",tempo:"presente",a:"leggiamo"},
    {verb:"capire",persona:"lei",tempo:"presente",a:"capisce"},
  ],
  medio: [
    {verb:"mangiare",persona:"io",tempo:"passato prossimo",a:"ho mangiato"},
    {verb:"andare",persona:"lei",tempo:"passato prossimo",a:"è andata"},
    {verb:"scrivere",persona:"noi",tempo:"futuro semplice",a:"scriveremo"},
    {verb:"volere",persona:"io",tempo:"condizionale",a:"vorrei"},
    {verb:"avere",persona:"tu",tempo:"imperfetto",a:"avevi"},
    {verb:"partire",persona:"loro",tempo:"passato prossimo",a:"sono partiti"},
    {verb:"vedere",persona:"io",tempo:"futuro semplice",a:"vedrò"},
    {verb:"bere",persona:"noi",tempo:"imperfetto",a:"bevevamo"},
    {verb:"prendere",persona:"voi",tempo:"passato prossimo",a:"avete preso"},
    {verb:"svegliarsi",persona:"io",tempo:"presente",a:"mi sveglio"},
  ],
  difficile: [
    {verb:"potere",persona:"io",tempo:"congiuntivo imperfetto",a:"potessi"},
    {verb:"essere",persona:"lui",tempo:"congiuntivo presente",a:"sia"},
    {verb:"leggere",persona:"io",tempo:"passato remoto",a:"lessi"},
    {verb:"nascere",persona:"io",tempo:"passato remoto",a:"nacqui"},
    {verb:"venire",persona:"loro",tempo:"passato remoto",a:"vennero"},
    {verb:"avere",persona:"io",tempo:"congiuntivo trapassato",a:"avessi avuto"},
    {verb:"porre",persona:"io",tempo:"passato remoto",a:"posi"},
    {verb:"tradurre",persona:"tu",tempo:"passato remoto",a:"traducesti"},
    {verb:"sapere",persona:"noi",tempo:"congiuntivo presente",a:"sappiamo"},
    {verb:"dire",persona:"voi",tempo:"congiuntivo imperfetto",a:"diceste"},
  ]
};

// ── Verbi: Trasforma ──
export const verbiTrasforma = {
  facile: [
    {frase:"Io mangio la pizza.",tempo:"Futuro semplice",a:"Io mangerò la pizza.",opts:["Io mangerò la pizza.","Io mangiavo la pizza.","Io mangiai la pizza.","Io ho mangiato la pizza."]},
    {frase:"Tu corri veloce.",tempo:"Passato prossimo",a:"Tu sei corso/a veloce.",opts:["Tu sei corso/a veloce.","Tu correvi veloce.","Tu correrai veloce.","Tu corresti veloce."]},
    {frase:"Noi giochiamo a pallone.",tempo:"Imperfetto",a:"Noi giocavamo a pallone.",opts:["Noi giocavamo a pallone.","Noi giocheremo a pallone.","Noi abbiamo giocato.","Noi giocammo."]},
    {frase:"Lei scrive una lettera.",tempo:"Futuro semplice",a:"Lei scriverà una lettera.",opts:["Lei scriverà una lettera.","Lei scriveva una lettera.","Lei ha scritto una lettera.","Lei scrisse una lettera."]},
    {frase:"Voi dormite tardi.",tempo:"Passato prossimo",a:"Voi avete dormito tardi.",opts:["Voi avete dormito tardi.","Voi dormivate tardi.","Voi dormirete tardi.","Voi dormiste tardi."]},
    {frase:"Il bambino piange.",tempo:"Imperfetto",a:"Il bambino piangeva.",opts:["Il bambino piangeva.","Il bambino piangerà.","Il bambino ha pianto.","Il bambino pianse."]},
    {frase:"Loro arrivano a casa.",tempo:"Futuro semplice",a:"Loro arriveranno a casa.",opts:["Loro arriveranno a casa.","Loro arrivavano a casa.","Loro sono arrivati a casa.","Loro arrivarono a casa."]},
    {frase:"Io guardo la TV.",tempo:"Passato prossimo",a:"Io ho guardato la TV.",opts:["Io ho guardato la TV.","Io guardavo la TV.","Io guarderò la TV.","Io guardai la TV."]},
  ],
  medio: [
    {frase:"Marco studia italiano.",tempo:"Condizionale presente",a:"Marco studierebbe italiano.",opts:["Marco studierebbe italiano.","Marco studiava italiano.","Marco studierà italiano.","Marco ha studiato italiano."]},
    {frase:"Io leggo un libro.",tempo:"Passato remoto",a:"Io lessi un libro.",opts:["Io lessi un libro.","Io leggevo un libro.","Io ho letto un libro.","Io leggerò un libro."]},
    {frase:"Noi partiamo per le vacanze.",tempo:"Condizionale presente",a:"Noi partiremmo per le vacanze.",opts:["Noi partiremmo per le vacanze.","Noi partivamo per le vacanze.","Noi partiremo per le vacanze.","Noi siamo partiti per le vacanze."]},
    {frase:"Tu vedi un film.",tempo:"Passato remoto",a:"Tu vedesti un film.",opts:["Tu vedesti un film.","Tu vedevi un film.","Tu hai visto un film.","Tu vedrai un film."]},
    {frase:"Lei viene da Roma.",tempo:"Imperfetto",a:"Lei veniva da Roma.",opts:["Lei veniva da Roma.","Lei verrà da Roma.","Lei è venuta da Roma.","Lei venne da Roma."]},
    {frase:"Io faccio i compiti.",tempo:"Trapassato prossimo",a:"Io avevo fatto i compiti.",opts:["Io avevo fatto i compiti.","Io facevo i compiti.","Io farò i compiti.","Io ho fatto i compiti."]},
    {frase:"Voi bevete il latte.",tempo:"Passato remoto",a:"Voi beveste il latte.",opts:["Voi beveste il latte.","Voi bevevate il latte.","Voi avete bevuto il latte.","Voi berrete il latte."]},
    {frase:"Marco sa la verità.",tempo:"Futuro anteriore",a:"Marco avrà saputo la verità.",opts:["Marco avrà saputo la verità.","Marco saprà la verità.","Marco sapeva la verità.","Marco ha saputo la verità."]},
  ],
  difficile: [
    {frase:"Se studio, supero l'esame.",tempo:"Periodo ipotetico 3° tipo",a:"Se avessi studiato, avrei superato l'esame.",opts:["Se avessi studiato, avrei superato l'esame.","Se studiassi, supererei l'esame.","Se studierò, supererò.","Se studiavo, superavo."]},
    {frase:"Se avessi tempo, verrei.",tempo:"Periodo ipotetico 2° tipo (reale al presente)",a:"Se ho tempo, vengo.",opts:["Se ho tempo, vengo.","Se avessi avuto tempo, sarei venuto.","Se avessi tempo, verrei.","Se avessi avuto tempo, venivo."]},
    {frase:"Penso che Marco venga.",tempo:"Congiuntivo passato",a:"Penso che Marco sia venuto.",opts:["Penso che Marco sia venuto.","Penso che Marco venisse.","Penso che Marco veniva.","Penso che Marco verrà."]},
    {frase:"La torta è mangiata da Marco.",tempo:"Forma attiva",a:"Marco mangia la torta.",opts:["Marco mangia la torta.","La torta mangia Marco.","Marco viene mangiato.","È Marco che mangia."]},
    {frase:"Marco mangiava quando arrivai.",tempo:"Trapassato prossimo per l'azione precedente",a:"Marco aveva mangiato quando arrivai.",opts:["Marco aveva mangiato quando arrivai.","Marco mangerebbe quando arrivai.","Marco aveva mangiato quando sarei arrivato.","Marco mangiò quando arrivai."]},
    {frase:"Vorrei che tu venissi.",tempo:"Forma con verbo principale al presente",a:"Voglio che tu venga.",opts:["Voglio che tu venga.","Voglio che tu venissi.","Voglio che tu sei venuto.","Voglio che tu verrai."]},
    {frase:"Pur essendo stanco, lavorò.",tempo:"Forma esplicita (con congiunzione)",a:"Sebbene fosse stanco, lavorò.",opts:["Sebbene fosse stanco, lavorò.","Perché era stanco, lavorò.","Stando stanco, lavorò.","Poiché era stanco, lavorò."]},
    {frase:"Dopo aver mangiato, uscì.",tempo:"Forma esplicita temporale",a:"Dopo che ebbe mangiato, uscì.",opts:["Dopo che ebbe mangiato, uscì.","Quando mangiava, uscì.","Prima di mangiare, uscì.","Sebbene mangiasse, uscì."]},
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
    {q:"Si scrive...",a:"Occhiali",w:["Occhali","Okkiali","Occhiali"],h:"Doppia C + H",x:"Occhiali: OCCHI (come occhio → occhi)."},
    {q:"'Ci' o 'c'è'? '___ andiamo domani.'",a:"Ci",w:["C'è","Cì","Ce"],h:"Pronome di luogo",x:"'Ci andiamo' = ci = pronome di luogo; non ha apostrofo."},
    {q:"Si scrive...",a:"Abbastanza",w:["Abastanza","Abbastanza","Abbbastanza"],h:"Due B",x:"Abbastanza: doppia B, una S, una T."},
    {q:"Quale parola è corretta?",a:"Conoscere",w:["Connoscere","Conosgere","Connosciere"],h:"C-O-N-O-S-C-E-R-E",x:"Conoscere: una N, una S, poi -cere."},
    {q:"Si scrive 'obbiettivo' o 'obiettivo'?",a:"Obiettivo",w:["Obbiettivo","Obbietivo","Obiettibo"],h:"Una sola B",x:"Obiettivo: una B, doppia T."},
    {q:"'Ne' o 'né'? 'Non voglio ___ pane ___ pasta.'",a:"né... né",w:["ne... ne","nè... nè","ne'... ne'"],h:"Congiunzione negativa",x:"'Né...né' con accento = congiunzione negativa."},
  ],
  difficile: [
    {q:"'Né... né' o 'ne... ne'?",a:"Né... né (accento)",w:["Ne... ne","Nè... nè","Ne'... ne'"],h:"Congiunzione negativa",x:"'Né' congiunzione = accento acuto."},
    {q:"'A' o 'ha'? '___ studiato molto.'",a:"Ha",w:["A","Hà","A'"],h:"Verbo avere",x:"'Ha' = verbo avere; 'a' = preposizione."},
    {q:"'Dà' o 'da'? 'Mi ___ una mano.'",a:"dà",w:["da","da'","dá"],h:"Verbo dare",x:"'Dà' verbo = accento; 'da' preposizione = no."},
    {q:"'Fa' o 'fà'?",a:"fa (senza accento)",w:["fà","fa'","Fà"],h:"3ª pers. fare",x:"'Fa' (fare, 3ª pers.) NON ha accento."},
    {q:"'Sì' o 'si'? '___, ho capito.'",a:"Sì (con accento)",w:["Si","Sí","Sì'"],h:"Avverbio di affermazione",x:"'Sì' avverbio = accento; 'si' particella pronominale = no."},
    {q:"'Lì' o 'li'? 'Mettilo ___.'",a:"Lì (con accento)",w:["Li","Lí","Li'"],h:"Avverbio di luogo",x:"'Lì' avverbio di luogo = accento; 'li' pronome = no."},
    {q:"'Tè' o 'te'? 'Vuoi un ___ caldo?'",a:"Tè (con accento)",w:["Te","Té","Te'"],h:"La bevanda",x:"'Tè' la bevanda = accento; 'te' pronome = no."},
    {q:"Come si scrive?",a:"D'accordo",w:["Daccordo","D'acordo","Daccordo"],h:"Di + accordo",x:"D'accordo = di accordo con apostrofo."},
  ]
};

// ── Ortografia: Trova l'errore ──
export const ortoErrore = {
  facile: [
    {frase:"Ho bevuto un bicchiere di *aqua* fresca.",errore:"aqua",corretto:"acqua",x:"Acqua con CQU."},
    {frase:"Oggi a scuola abbiamo studiato la *sciensa*.",errore:"sciensa",corretto:"scienza",x:"Scienza con -ie-."},
    {frase:"Il *quoco* ha preparato una torta.",errore:"quoco",corretto:"cuoco",x:"Cuoco con CU, non QU."},
    {frase:"Mamma mi ha comprato un *quarderno* nuovo.",errore:"quarderno",corretto:"quaderno",x:"Quaderno con QUA."},
    {frase:"Il gatto *a* graffiato il divano.",errore:"a",corretto:"ha",x:"'Ha' = verbo avere; 'a' = preposizione."},
    {frase:"Ho messo le chiavi *sopratutto* nel cassetto.",errore:"sopratutto",corretto:"soprattutto",x:"Soprattutto: doppia T."},
    {frase:"Mi ha detto di fare *silensio* in classe.",errore:"silensio",corretto:"silenzio",x:"Silenzio con Z, non S."},
    {frase:"Il bambino piangeva *perchè* aveva fame.",errore:"perchè",corretto:"perché",x:"Perché: accento acuto (é), non grave."},
  ],
  medio: [
    {frase:"*Qual'è* il tuo colore preferito?",errore:"Qual'è",corretto:"Qual è",x:"Senza apostrofo: troncamento."},
    {frase:"Non *cè* nessuno in casa.",errore:"cè",corretto:"c'è",x:"C'è = ci + è, con apostrofo."},
    {frase:"Devo *accellerare* il passo.",errore:"accellerare",corretto:"accelerare",x:"Accelerare: due C, una L."},
    {frase:"Ho dimenticato il *capello* in testa.",errore:"capello",corretto:"cappello",x:"Cappello (copricapo) ha doppia P; capello è un pelo."},
    {frase:"Non lo conosco *affatto*, è un *obbiettivo* difficile.",errore:"obbiettivo",corretto:"obiettivo",x:"Obiettivo: una B, non due."},
    {frase:"Pensa sempre solo a *sè* stesso.",errore:"sè",corretto:"sé",x:"'Sé' pronome = accento acuto (é), non grave."},
    {frase:"*L'anno* scorso siamo andati a Parigi.",errore:"L'anno",corretto:"L'anno (corretto)",x:"Attenzione: L'anno è corretto! Elisione di 'lo' davanti ad anno."},
    {frase:"Vorrei un *pò* di zucchero.",errore:"pò",corretto:"po'",x:"'Po'' = apocope di poco, si scrive con apostrofo (non accento)."},
  ],
  difficile: [
    {frase:"Non vuole *ne* acqua *ne* succo.",errore:"ne",corretto:"né",x:"'Né...né' congiunzione → accento."},
    {frase:"Oggi *fà* molto caldo.",errore:"fà",corretto:"fa",x:"'Fa' (fare, 3ª pers.) senza accento."},
    {frase:"Ha agito *daccordo* con le regole.",errore:"daccordo",corretto:"d'accordo",x:"D'accordo = di + accordo con apostrofo."},
    {frase:"Non mi *va* di uscire, *và* pure tu.",errore:"và",corretto:"va",x:"'Va' (andare, 3ª pers.) senza accento; solo 'và' in vecchie stampe è superato."},
    {frase:"Lo studente non stava *se* stesso quel giorno.",errore:"se",corretto:"sé",x:"'Sé stesso' = pronome riflessivo → accento."},
    {frase:"Ci *siamo* trovati *lì* davanti al negozio.",errore:"lì (corretto)",corretto:"lì (corretto!)",x:"'Lì' avverbio di luogo vuole l'accento: è già corretto!"},
    {frase:"Non *ho* paura, ma *a* volte tremo.",errore:"a volte (corretto)",corretto:"a volte è corretto",x:"'A volte' = preposizione + nome: non ha apostrofo né accento."},
    {frase:"Marco *sa* tutto, *né* mi stupisce.",errore:"né",corretto:"né (ma qui è 'e' o 'e non mi stupisce')",x:"'Né' si usa con doppia negazione; qui sarebbe meglio 'e non mi stupisce'."},
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
    {aff:"Il gatto abbaia.",v:false,x:"Il gatto miagola; il cane abbaia."},
    {aff:"La parola 'penna' è femminile.",v:true,x:"La penna → femminile singolare."},
    {aff:"Il plurale di 'uovo' è 'uovi'.",v:false,x:"Irregolare: uovo → uova (femminile plurale)."},
    {aff:"'Bello' è un aggettivo qualificativo.",v:true,x:"Bello descrive una qualità del nome → aggettivo qualificativo."},
  ],
  medio: [
    {aff:"Il passato prossimo usa sempre 'avere'.",v:false,x:"Molti verbi usano 'essere' (movimento, riflessivi)."},
    {aff:"La similitudine usa 'come'.",v:true,x:"Similitudine = paragone con 'come'."},
    {aff:"'Qual è' si scrive con l'apostrofo.",v:false,x:"Senza apostrofo: è troncamento."},
    {aff:"Il congiuntivo esprime certezze.",v:false,x:"Il congiuntivo = dubbio, desiderio, possibilità."},
    {aff:"'Perché' ha accento acuto.",v:true,x:"Perché: accento acuto (é). 'Perchè' con grave è sbagliato."},
    {aff:"'Sebbene' introduce una proposizione causale.",v:false,x:"Sebbene = concessiva (contrasto); causale = poiché/perché."},
    {aff:"Il superlativo assoluto si forma con -issimo/-issima.",v:true,x:"Bellissimo, altissimo, velocissima..."},
    {aff:"L'imperfetto si usa per azioni abituali nel passato.",v:true,x:"'Da bambino, giocavo sempre' = azione abituale al passato."},
    {aff:"'Affinché' introduce una proposizione finale.",v:true,x:"'Affinché tu capisca' = per lo scopo di farti capire."},
    {aff:"Il passato remoto si usa per azioni recenti.",v:false,x:"Il passato remoto indica azioni lontane nel tempo."},
  ],
  difficile: [
    {aff:"Nel periodo ipotetico 3° tipo: se + cong. trapassato + cond. passato.",v:true,x:"Es: Se avessi studiato, avrei superato l'esame."},
    {aff:"L'ossimoro accosta due opposti.",v:true,x:"Es: 'silenzio assordante'."},
    {aff:"Il narratore onnisciente racconta solo ciò che vede.",v:false,x:"L'onnisciente sa tutto: pensieri, futuro..."},
    {aff:"La fabula è l'ordine in cui il narratore presenta i fatti.",v:false,x:"La fabula è l'ordine cronologico reale; l'intreccio è l'ordine narrativo."},
    {aff:"L'endecasillabo ha 11 sillabe.",v:true,x:"L'endecasillabo (11 sillabe) è il verso italiano per eccellenza."},
    {aff:"Dante scrisse la Divina Commedia in latino.",v:false,x:"Dante la scrisse in volgare toscano, non in latino."},
    {aff:"Il congiuntivo trapassato si forma con: avessi/fossi + participio.",v:true,x:"Es: avessi mangiato, fossi andato."},
    {aff:"La litote è un'esagerazione.",v:false,x:"La litote nega il contrario ('non è stupido' = è intelligente); l'iperbole è l'esagerazione."},
  ]
};

// ── Comprensione: Sequenza ──
export const compSequenza = {
  facile: [
    {title:"La giornata di Marco",events:["Marco si sveglia.","Fa colazione.","Va a scuola.","Torna a casa.","Fa i compiti.","Va a dormire."]},
    {title:"Preparare un panino",events:["Prendi il pane.","Taglia il pane a metà.","Metti il prosciutto.","Aggiungi il formaggio.","Chiudi il panino.","Mangia!"]},
    {title:"Piantare un seme",events:["Scava una buca nel terreno.","Metti il seme nella buca.","Ricopri con la terra.","Annaffia il seme.","Aspetta che germogli.","Goditi il fiore!"]},
    {title:"Lavarsi i denti",events:["Prendi lo spazzolino.","Metti il dentifricio.","Spazzola i denti per 2 minuti.","Risciacqua la bocca.","Sciacqua lo spazzolino.","Rimetti tutto a posto."]},
    {title:"Una storia di un cavaliere",events:["C'era una volta un drago.","Arrivò un cavaliere coraggioso.","Il cavaliere sfidò il drago.","Combatterono a lungo.","Il cavaliere vinse.","Tutti festeggiarono."]},
    {title:"Preparare uno zaino",events:["Apri lo zaino.","Metti i libri necessari.","Aggiungi il quaderno e l'astuccio.","Controlla il diario.","Chiudi lo zaino.","Sei pronto per la scuola!"]},
  ],
  medio: [
    {title:"Cappuccetto Rosso",events:["La mamma dà il cestino.","Cappuccetto va nel bosco.","Il lupo arriva dalla nonna.","Cappuccetto trova il lupo travestito.","Il cacciatore li salva."]},
    {title:"La volpe e l'uva",events:["La volpe vede l'uva sul pergolato.","Prova a saltare per raggiungerla.","L'uva è troppo in alto.","La volpe si stanca dopo molti tentativi.","Se ne va dicendo che l'uva è acerba."]},
    {title:"Il processo di scrittura",events:["Scegli l'argomento da trattare.","Raccogli le idee con una mappa mentale.","Scrivi una prima bozza.","Rileggi e correggi gli errori.","Riscrivi la versione definitiva.","Consegna il testo."]},
    {title:"La metamorfosi della farfalla",events:["La farfalla depone le uova.","Nasce il bruco.","Il bruco mangia e cresce.","Il bruco si trasforma in crisalide.","Dalla crisalide nasce la farfalla.","La farfalla vola di fiore in fiore."]},
    {title:"Odisseo e i Ciclopi",events:["Odisseo approda sull'isola dei Ciclopi.","Entra nella grotta di Polifemo.","Polifemo li imprigiona.","Odisseo acceca il Ciclope con un palo.","Odisseo e i compagni fuggono nascosti sotto le pecore."]},
  ],
  difficile: [
    {title:"Testo argomentativo",events:["Introduzione del tema.","Presentazione della tesi.","Primo argomento.","Presentazione dell'antitesi.","Confutazione.","Conclusione."]},
    {title:"Analisi di un testo letterario",events:["Lettura del testo.","Identificazione del genere letterario.","Analisi dei personaggi.","Studio delle tecniche narrative.","Commento delle figure retoriche.","Interpretazione del messaggio dell'autore."]},
    {title:"Il viaggio di Dante",events:["Dante si perde nella selva oscura.","Virgilio appare e si offre come guida.","Dante e Virgilio attraversano l'Inferno.","Salgono il monte del Purgatorio.","Beatrice prende il posto di Virgilio.","Dante giunge al Paradiso e vede Dio."]},
    {title:"Composizione di un sonetto",events:["Scelta del tema poetico.","Stesura della prima quartina.","Stesura della seconda quartina.","Stesura della prima terzina.","Stesura della seconda terzina.","Revisione della metrica e delle rime."]},
  ]
};

// ── Comprensione: Cosa significa ──
export const compSignificato = {
  facile: [
    {q:"'Piove a catinelle' significa...",a:"Piove molto forte",w:["Piove piano","Ci sono i gatti","Piove in casa"],h:"Modo di dire",x:"'A catinelle' = in grande quantità."},
    {q:"'Avere la testa fra le nuvole' significa...",a:"Essere distratto",w:["Essere alto","Mal di testa","Dormire"],h:"Espressione",x:"Chi è 'fra le nuvole' non fa attenzione."},
    {q:"'In bocca al lupo' si dice per...",a:"Augurare buona fortuna",w:["Spaventare","Parlare di animali","Andare nel bosco"],h:"Augurio",x:"Si risponde: 'Crepi il lupo!'"},
    {q:"'Avere il pollice verde' significa...",a:"Essere bravo a coltivare le piante",w:["Avere le mani sporche","Essere pittore","Essere un medico"],h:"Giardinaggio",x:"Chi ha il 'pollice verde' è molto bravo con le piante."},
    {q:"'Prendere due piccioni con una fava' significa...",a:"Ottenere due risultati con una sola azione",w:["Cacciare gli uccelli","Cucinare","Mangiare molto"],h:"Efficienza",x:"Fare due cose utili con un solo gesto."},
    {q:"'Avere le mani bucate' significa...",a:"Spendere i soldi facilmente",w:["Avere le mani rotte","Essere ladro","Lavorare molto"],h:"I soldi scappano via",x:"Chi ha 'le mani bucate' non riesce a tenere i soldi."},
    {q:"'Acqua in bocca!' significa...",a:"Silenzio! Non dire niente a nessuno",w:["Bevi acqua","Hai sete","Parla!"],h:"Segreto",x:"'Acqua in bocca' = tienilo segreto, non dirlo."},
    {q:"'Essere al settimo cielo' significa...",a:"Essere molto felice",w:["Essere in aereo","Stare in alto","Avere la testa tra le nuvole"],h:"Felicità massima",x:"Chi è 'al settimo cielo' è contentissimo."},
  ],
  medio: [
    {q:"'Piove sul bagnato' significa...",a:"Ai problemi se ne aggiungono altri",w:["Piove molto","Terreno bagnato","È umido"],h:"Proverbio",x:"Quando le cose peggiorano ulteriormente."},
    {q:"'Chi dorme non piglia pesci'...",a:"Bisogna darsi da fare",w:["Non si pesca di notte","Chi dorme ingrassa","I pesci dormono"],h:"Proverbio",x:"Per ottenere risultati bisogna agire."},
    {q:"'Avere le mani in pasta'...",a:"Essere coinvolto",w:["Cucinare","Mani sporche","Fare il pane"],h:"Espressione",x:"Chi ha 'le mani in pasta' è dentro a un affare."},
    {q:"'Prendere lucciole per lanterne' significa...",a:"Sbagliarsi, confondere le cose",w:["Andare a caccia","Vedere di notte","Avere buona vista"],h:"Confusione",x:"Scambiare una cosa per un'altra: ingannarsi."},
    {q:"'Fare di ogni erba un fascio' significa...",a:"Trattare tutti allo stesso modo senza distinzione",w:["Lavorare in giardino","Cucinare la verdura","Fare un bouquet"],h:"Generalizzare",x:"Non distinguere le differenze tra persone o cose diverse."},
    {q:"'Avere la coda di paglia' significa...",a:"Sentirsi in colpa",w:["Avere paura dei gatti","Essere nervoso","Avere la febbre"],h:"Chi ha fatto qualcosa di sbagliato",x:"Chi ha 'la coda di paglia' teme di essere scoperto."},
    {q:"'Tagliare la testa al toro' significa...",a:"Risolvere un problema in modo definitivo",w:["Andare alla corrida","Essere crudele","Urlare forte"],h:"Decisione netta",x:"Prendere una decisione radicale che risolve tutto."},
    {q:"'Roma non fu costruita in un giorno' significa...",a:"Le cose importanti richiedono tempo",w:["Roma è antica","Bisogna andare a Roma","I romani erano bravi"],h:"Pazienza",x:"Le grandi realizzazioni non avvengono all'istante."},
  ],
  difficile: [
    {q:"'Fare orecchie da mercante'...",a:"Fingere di non sentire",w:["Ascoltare bene","Vendere","Orecchie grandi"],h:"Modo di dire",x:"Il mercante 'non sente' quando non gli conviene."},
    {q:"'Non tutte le ciambelle riescono col buco'...",a:"Non tutto va come previsto",w:["Le ciambelle son difficili","Attenzione","I buchi son importanti"],h:"Proverbio",x:"A volte le cose non vanno come pianificato."},
    {q:"'Gettare perle ai porci' significa...",a:"Offrire qualcosa di prezioso a chi non sa apprezzarlo",w:["Allevare animali","Cucinare","Sprecare il cibo"],h:"Spreco di valore",x:"Dare qualcosa di valore a chi non è in grado di apprezzarlo."},
    {q:"'Il lupo perde il pelo ma non il vizio' significa...",a:"Le persone non cambiano il loro carattere",w:["I lupi si tosano","Gli animali mutano","Il vizio fa bene"],h:"Proverbio sulla natura umana",x:"Nonostante l'apparenza cambi, il carattere profondo rimane."},
    {q:"'Tra il dire e il fare c'è di mezzo il mare' significa...",a:"È più difficile fare che parlare",w:["Il mare è grande","Viaggiare è difficile","Nuotare è bello"],h:"Differenza tra parole e azioni",x:"Promettere è facile; mantenere la promessa è ben altra cosa."},
    {q:"'Gallina vecchia fa buon brodo' significa...",a:"L'esperienza ha un grande valore",w:["La gallina è buona da mangiare","Cucinare a lungo","Le galline vecchie sono migliori"],h:"Esperienza e saggezza",x:"Chi ha molta esperienza ha un grande valore, nonostante l'età."},
    {q:"'Chi va piano, va sano e va lontano' significa...",a:"Agire con calma porta a risultati migliori",w:["Camminare lentamente fa bene","Non correre fa male","La lentezza è un difetto"],h:"Prudenza e costanza",x:"La prudenza e la costanza sono la strada migliore per il successo."},
    {q:"'Cane che abbaia non morde' significa...",a:"Chi fa molto rumore di solito non è pericoloso",w:["I cani mordono i ladri","Il cane è feroce","Abbaiare fa paura"],h:"Apparenza vs realtà",x:"Chi minaccia molto raramente agisce davvero."},
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
    {sing:"Il fiore è profumato.",plur:"I fiori sono profumati.",h:"-e → -i al plurale"},
    {sing:"La porta è aperta.",plur:"Le porte sono aperte.",h:"Femminile: -a → -e"},
    {sing:"Lo studente studia.",plur:"Gli studenti studiano.",h:"Lo → gli davanti a st-"},
    {sing:"L'amica è simpatica.",plur:"Le amiche sono simpatiche.",h:"-ca → -che per mantenere il suono duro"},
  ],
  medio: [
    {sing:"Il ragazzo mangia la pizza.",plur:"I ragazzi mangiano la pizza.",h:"Soggetto e verbo al plurale, oggetto invariato"},
    {sing:"La maestra spiega la lezione.",plur:"Le maestre spiegano la lezione.",h:"Soggetto e verbo cambiano"},
    {sing:"L'amico è arrivato ieri.",plur:"Gli amici sono arrivati ieri.",h:"Anche il participio concorda"},
    {sing:"La città è grande.",plur:"Le città sono grandi.",h:"Città è invariabile!"},
    {sing:"Il problema è difficile.",plur:"I problemi sono difficili.",h:"Problema: maschile in -a → plurale -i"},
    {sing:"Il medico visita il paziente.",plur:"I medici visitano i pazienti.",h:"-co → -ci (suono morbido)"},
    {sing:"La mano è fredda.",plur:"Le mani sono fredde.",h:"Mano: femminile, plurale in -i"},
    {sing:"L'uovo è fresco.",plur:"Le uova sono fresche.",h:"Uovo → uova (neutro latino, diventa femminile al plurale)"},
  ],
  difficile: [
    {sing:"L'uomo che cammina è stanco.",plur:"Gli uomini che camminano sono stanchi.",h:"Uomo → uomini (irregolare)"},
    {sing:"Il bue mangia l'erba.",plur:"I buoi mangiano l'erba.",h:"Bue → buoi (irregolare)"},
    {sing:"Il dito fa male.",plur:"Le dita fanno male.",h:"Dito → dita (maschile → femminile!)"},
    {sing:"Il braccio è rotto.",plur:"Le braccia sono rotte.",h:"Braccio → braccia (maschile → femminile al plurale)"},
    {sing:"Il labbro trema.",plur:"Le labbra tremano.",h:"Labbro → labbra (doppio plurale: labbri o labbra)"},
    {sing:"L'ala è spezzata.",plur:"Le ali sono spezzate.",h:"Ala: femminile invariabile nella radice, -a → -i"},
    {sing:"Il sopracciglio è alzato.",plur:"Le sopracciglia sono alzate.",h:"Sopracciglio → sopracciglia (maschile → femminile)"},
    {sing:"Il ginocchio fa male.",plur:"Le ginocchia fanno male.",h:"Ginocchio → ginocchia (maschile → femminile al plurale)"},
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
    {title:"Cause della natura",pairs:[
      ["La pianta non è stata annaffiata.","Le foglie si seccano."],
      ["Il vento soffia forte.","Le foglie cadono dagli alberi."],
      ["Nevica molto.","Le strade sono scivolose."],
      ["Il sole scalda il terreno.","I fiori sbocciano."],
    ]},
    {title:"Cause e reazioni",pairs:[
      ["Il bambino è caduto.","Si è messo a piangere."],
      ["La squadra ha vinto.","I tifosi esultano."],
      ["Maria riceve un bel regalo.","È contentissima."],
      ["Il cane sente un rumore strano.","Abbaia e si agita."],
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
    {title:"Cause storiche e sociali",pairs:[
      ["La foresta viene abbattuta.","Molti animali perdono il loro habitat."],
      ["Le temperature globali aumentano.","I ghiacciai si sciolgono."],
      ["Un'epidemia si diffonde rapidamente.","Le scuole vengono chiuse."],
      ["Il paese investe nell'istruzione.","Il livello culturale migliora."],
      ["Si introduce la stampa.","I libri diventano accessibili a tutti."],
    ]},
    {title:"Causa-effetto nella narrativa",pairs:[
      ["Il protagonista commette un errore.","Deve affrontarne le conseguenze."],
      ["Il conflitto principale si risolve.","La storia si avvia alla conclusione."],
      ["L'antagonista scopre il piano dell'eroe.","Si intensifica la tensione narrativa."],
      ["Il personaggio riceve nuove informazioni.","Cambia il suo punto di vista."],
      ["L'ambientazione è cupa e minacciosa.","Il lettore si sente in tensione."],
    ]},
  ],
  difficile: [
    {title:"Ragionamento logico",pairs:[
      ["L'autore usa un narratore onnisciente.","Il lettore conosce i pensieri di tutti."],
      ["La poesia usa molte metafore.","Il significato non è letterale."],
      ["Il periodo ipotetico è di 3° tipo.","L'azione non si è realizzata."],
      ["Il testo manca di coerenza.","Il lettore non capisce il filo logico."],
    ]},
    {title:"Cause letterarie e linguistiche",pairs:[
      ["L'autore usa il congiuntivo trapassato.","L'azione è irreale e passata."],
      ["Il testo usa molte anafore.","Si crea un effetto di insistenza e ritmo."],
      ["Il narratore è in prima persona.","Il lettore conosce solo i pensieri del protagonista."],
      ["Il testo argomentativo manca di antitesi.","La tesi appare unilaterale e debole."],
      ["Il ritmo del verso è endecasillabo.","Il testo richiama la tradizione poetica italiana."],
    ]},
    {title:"Cause di mutamento linguistico",pairs:[
      ["Il latino si evolve nei secoli.","Nascono le lingue romanze (italiano, francese...)."],
      ["Aumentano i contatti con altri popoli.","La lingua si arricchisce di prestiti stranieri."],
      ["Si diffonde l'uso di internet.","Compaiono nuovi neologismi digitali."],
      ["I dialetti regionali declinano.","L'italiano standard si diffonde uniformemente."],
      ["I classici vengono studiati nelle scuole.","Il vocabolario si arricchisce di arcaismi letterari."],
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
    {soggetto:"Il cane",verbo:"correre",complemento:"nel prato",tempo:"presente",a:"Il cane corre nel prato.",opts:["Il cane corre nel prato.","Nel prato correre il cane.","Il cane nel prato correre.","Corre il prato il cane nel."]},
    {soggetto:"Mia sorella",verbo:"cantare",complemento:"una canzone bella",tempo:"imperfetto",a:"Mia sorella cantava una canzone bella.",opts:["Mia sorella cantava una canzone bella.","Mia sorella canta una canzone bella.","Mia sorella cantò una canzone bella.","Mia sorella canterà una canzone bella."]},
    {soggetto:"Voi",verbo:"partire",complemento:"per le vacanze",tempo:"futuro semplice",a:"Voi partirete per le vacanze.",opts:["Voi partirete per le vacanze.","Voi partite per le vacanze.","Voi partivate per le vacanze.","Voi siete partiti per le vacanze."]},
    {soggetto:"Il sole",verbo:"tramontare",complemento:"all'orizzonte",tempo:"passato prossimo",a:"Il sole è tramontato all'orizzonte.",opts:["Il sole è tramontato all'orizzonte.","Il sole ha tramontato all'orizzonte.","Il sole tramontava all'orizzonte.","Il sole tramonterà all'orizzonte."]},
  ],
  medio: [
    {soggetto:"Marco",verbo:"leggere",complemento:"un libro interessante",tempo:"imperfetto",a:"Marco leggeva un libro interessante.",opts:["Marco leggeva un libro interessante.","Marco legge un libro interessante.","Marco leggerà un libro interessante.","Marco ha letto un libro interessante."]},
    {soggetto:"Le ragazze",verbo:"andare",complemento:"al cinema con le amiche",tempo:"futuro semplice",a:"Le ragazze andranno al cinema con le amiche.",opts:["Le ragazze andranno al cinema con le amiche.","Le ragazze vanno al cinema con le amiche.","Le ragazze andavano al cinema.","Le ragazze sono andate al cinema."]},
    {soggetto:"Io",verbo:"volere",complemento:"un gelato al cioccolato",tempo:"condizionale",a:"Io vorrei un gelato al cioccolato.",opts:["Io vorrei un gelato al cioccolato.","Io voglio un gelato al cioccolato.","Io volli un gelato al cioccolato.","Io vorrò un gelato al cioccolato."]},
    {soggetto:"Gli studenti",verbo:"consegnare",complemento:"il compito al professore",tempo:"trapassato prossimo",a:"Gli studenti avevano consegnato il compito al professore.",opts:["Gli studenti avevano consegnato il compito al professore.","Gli studenti consegnano il compito al professore.","Gli studenti consegnarono il compito al professore.","Gli studenti consegneranno il compito al professore."]},
    {soggetto:"Noi",verbo:"vedere",complemento:"un film bellissimo",tempo:"passato remoto",a:"Noi vedemmo un film bellissimo.",opts:["Noi vedemmo un film bellissimo.","Noi vediamo un film bellissimo.","Noi abbiamo visto un film bellissimo.","Noi vedremo un film bellissimo."]},
    {soggetto:"Tu",verbo:"dovere studiare",complemento:"ogni giorno",tempo:"condizionale passato",a:"Tu avresti dovuto studiare ogni giorno.",opts:["Tu avresti dovuto studiare ogni giorno.","Tu dovresti studiare ogni giorno.","Tu dovevi studiare ogni giorno.","Tu hai dovuto studiare ogni giorno."]},
    {soggetto:"La squadra",verbo:"vincere",complemento:"la partita finale",tempo:"futuro anteriore",a:"La squadra avrà vinto la partita finale.",opts:["La squadra avrà vinto la partita finale.","La squadra vinse la partita finale.","La squadra vincerà la partita finale.","La squadra aveva vinto la partita finale."]},
    {soggetto:"Io",verbo:"svegliarsi",complemento:"tardi stamattina",tempo:"passato prossimo riflessivo",a:"Io mi sono svegliato/a tardi stamattina.",opts:["Io mi sono svegliato/a tardi stamattina.","Io ho svegliato tardi stamattina.","Io svegliavo tardi stamattina.","Io mi sveglio tardi stamattina."]},
  ],
  difficile: [
    {soggetto:"Se io",verbo:"studiare",complemento:"di più",tempo:"periodo ipotetico 3° tipo",a:"Se avessi studiato di più, avrei superato l'esame.",opts:["Se avessi studiato di più, avrei superato l'esame.","Se studio di più, supero l'esame.","Se studiassi di più, supererei l'esame.","Se studierò di più, supererò l'esame."]},
    {soggetto:"Il professore",verbo:"volere",complemento:"che gli studenti capissero",tempo:"congiuntivo",a:"Il professore voleva che gli studenti capissero.",opts:["Il professore voleva che gli studenti capissero.","Il professore vuole che gli studenti capiscono.","Il professore voleva che gli studenti capivano.","Il professore vuole che gli studenti capiranno."]},
    {soggetto:"La torta",verbo:"mangiare (passivo)",complemento:"dai bambini",tempo:"passato prossimo passivo",a:"La torta è stata mangiata dai bambini.",opts:["La torta è stata mangiata dai bambini.","La torta ha mangiato i bambini.","I bambini hanno mangiato la torta.","La torta fu mangiata dai bambini."]},
    {soggetto:"Sebbene",verbo:"essere stanco",complemento:"(lui) continuare a lavorare",tempo:"concessiva + principale",a:"Sebbene fosse stanco, continuò a lavorare.",opts:["Sebbene fosse stanco, continuò a lavorare.","Poiché era stanco, continuò a lavorare.","Anche se stanco, lavorò.","Sebbene stanco, continuava a lavorare."]},
    {soggetto:"Penso",verbo:"che Marco/partire",complemento:"già",tempo:"congiuntivo passato",a:"Penso che Marco sia già partito.",opts:["Penso che Marco sia già partito.","Penso che Marco è già partito.","Penso che Marco partisse già.","Penso che Marco aveva già partito."]},
    {soggetto:"Dopo che",verbo:"finire i compiti",complemento:"(lui) uscire a giocare",tempo:"trapassato + passato remoto",a:"Dopo che ebbe finito i compiti, uscì a giocare.",opts:["Dopo che ebbe finito i compiti, uscì a giocare.","Dopo che finì i compiti, usciva a giocare.","Dopo che aveva finito i compiti, uscì a giocare.","Dopo aver finito i compiti, uscire a giocare."]},
    {soggetto:"Affinché",verbo:"capire (voi)",complemento:"spiegare di nuovo",tempo:"finale al congiuntivo",a:"Affinché voi capiate, spiegherò di nuovo.",opts:["Affinché voi capiate, spiegherò di nuovo.","Perché voi capite, spiegherò di nuovo.","Affinché voi capirete, spiego di nuovo.","Sebbene voi capiate, spiegherò di nuovo."]},
    {soggetto:"Non appena",verbo:"arrivare (lei)",complemento:"iniziare la riunione",tempo:"futuro anteriore + futuro",a:"Non appena sarà arrivata, inizieremo la riunione.",opts:["Non appena sarà arrivata, inizieremo la riunione.","Non appena arriva, iniziamo la riunione.","Non appena era arrivata, iniziammo la riunione.","Non appena arrivi, iniziamo la riunione."]},
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
    {frase:"Luca mangia | mentre guarda la TV.",parti:["Luca mangia","mentre guarda la TV"],tipi:["Principale","Subordinata temporale"],x:"'Mentre' introduce una temporale (contemporaneità)."},
    {frase:"Dormo | perché sono stanco.",parti:["Dormo","perché sono stanco"],tipi:["Principale","Subordinata causale"],x:"'Perché' introduce la causa."},
    {frase:"Esco | ma ho freddo.",parti:["Esco","ho freddo"],tipi:["Principale","Coordinata avversativa"],x:"'Ma' coordina due frasi con contrasto."},
    {frase:"Se piove | non esco.",parti:["Se piove","non esco"],tipi:["Subordinata condizionale","Principale"],x:"'Se' introduce una condizionale (ipotesi)."},
    {frase:"Ho visto un film | che mi è piaciuto molto.",parti:["Ho visto un film","che mi è piaciuto molto"],tipi:["Principale","Subordinata relativa"],x:"'Che' introduce una relativa."},
  ],
  medio: [
    {frase:"Sebbene fosse stanco | continuò a lavorare.",parti:["Sebbene fosse stanco","continuò a lavorare"],tipi:["Subordinata concessiva","Principale"],x:"'Sebbene' introduce una concessiva (ostacolo)."},
    {frase:"Studio | affinché io possa superare l'esame.",parti:["Studio","affinché io possa superare l'esame"],tipi:["Principale","Subordinata finale"],x:"'Affinché' introduce una finale (scopo)."},
    {frase:"La ragazza che studia molto | è brava.",parti:["che studia molto","La ragazza è brava"],tipi:["Subordinata relativa","Principale"],x:"'Che' introduce una relativa."},
    {frase:"Ho mangiato | ma non ho bevuto.",parti:["Ho mangiato","non ho bevuto"],tipi:["Principale","Coordinata avversativa"],x:"'Ma' coordina con contrapposizione."},
    {frase:"Poiché era tardi | andammo via.",parti:["Poiché era tardi","andammo via"],tipi:["Subordinata causale","Principale"],x:"'Poiché' introduce la causa."},
    {frase:"Credo | che tu abbia ragione.",parti:["Credo","che tu abbia ragione"],tipi:["Principale","Subordinata oggettiva"],x:"'Che' + congiuntivo introduce una oggettiva."},
    {frase:"Appena arrivò | ci salutò tutti.",parti:["Appena arrivò","ci salutò tutti"],tipi:["Subordinata temporale","Principale"],x:"'Appena' introduce una temporale (anteriorità immediata)."},
    {frase:"Lavorò molto | così ottenne ottimi risultati.",parti:["Lavorò molto","ottenne ottimi risultati"],tipi:["Principale","Coordinata consecutiva"],x:"'Così' coordina con conseguenza."},
  ],
  difficile: [
    {frase:"Se avessi studiato | avrei superato l'esame | che era molto difficile.",parti:["Se avessi studiato","avrei superato l'esame","che era molto difficile"],tipi:["Sub. condizionale","Principale","Sub. relativa"],x:"Periodo con condizionale + relativa."},
    {frase:"Penso | che Marco sia partito | perché non risponde al telefono.",parti:["Penso","che Marco sia partito","perché non risponde al telefono"],tipi:["Principale","Sub. oggettiva","Sub. causale"],x:"La oggettiva dipende dalla principale, la causale dalla oggettiva."},
    {frase:"Nonostante piovesse | uscì | senza prendere l'ombrello.",parti:["Nonostante piovesse","uscì","senza prendere l'ombrello"],tipi:["Sub. concessiva","Principale","Sub. modale implicita"],x:"Concessiva + principale + modale implicita con gerundio."},
    {frase:"Sapevo | che sarebbe arrivato tardi | dal momento che il treno aveva subito ritardi.",parti:["Sapevo","che sarebbe arrivato tardi","dal momento che il treno aveva subito ritardi"],tipi:["Principale","Sub. oggettiva","Sub. causale"],x:"Tre livelli: principale → oggettiva → causale."},
    {frase:"L'unico studente | che abbia capito la spiegazione | è Giovanni.",parti:["L'unico studente","che abbia capito la spiegazione","è Giovanni"],tipi:["Soggetto della principale","Sub. relativa al congiuntivo","Principale"],x:"Dopo superlativo la relativa usa il congiuntivo."},
    {frase:"Pur avendo studiato tutta la notte | non riuscì a superare l'esame | per quanto si sforzasse.",parti:["Pur avendo studiato tutta la notte","non riuscì a superare l'esame","per quanto si sforzasse"],tipi:["Sub. concessiva implicita","Principale","Sub. concessiva esplicita"],x:"Due concessivi con la principale al centro."},
    {frase:"Mi chiedo | se verrà | e | se porterà i documenti.",parti:["Mi chiedo","se verrà","e","se porterà i documenti"],tipi:["Principale","Sub. interrogativa indiretta","Coordinante","Sub. interrogativa indiretta"],x:"Due interrogative indirette coordinate dipendenti dalla stessa principale."},
    {frase:"È necessario | che tutti capiscano | affinché il progetto abbia successo.",parti:["È necessario","che tutti capiscano","affinché il progetto abbia successo"],tipi:["Principale","Sub. soggettiva","Sub. finale"],x:"Principale impersonale → soggettiva → finale."},
  ]
};

// ── Quiz Analisi ──
export const analisiQuiz = {
  facile: [
    {q:"In 'Il cane corre', qual è il soggetto?",a:"Il cane",w:["Corre","Il","Cane"],h:"Chi compie l'azione?",x:"Il soggetto è chi compie l'azione del verbo."},
    {q:"In 'Maria mangia la mela', qual è il predicato?",a:"Mangia",w:["Maria","La mela","La"],h:"Qual è l'azione?",x:"Il predicato verbale indica l'azione."},
    {q:"In 'Luca è felice', 'felice' è...",a:"Parte nominale del predicato",w:["Soggetto","Complemento oggetto","Avverbio"],h:"È + aggettivo = predicato nominale",x:"'È felice' è un predicato nominale (copula + parte nominale)."},
    {q:"'Nel parco' è un complemento di...",a:"Luogo",w:["Tempo","Modo","Causa"],h:"Dove?",x:"Risponde alla domanda 'Dove?'"},
    {q:"In 'Marco legge il libro', 'il libro' è...",a:"Complemento oggetto",w:["Soggetto","Predicato","Complemento di luogo"],h:"Che cosa legge?",x:"Il complemento oggetto risponde a 'Che cosa?' o 'Chi?'"},
    {q:"In 'Ieri sono andato a scuola', 'ieri' è...",a:"Complemento di tempo",w:["Soggetto","Complemento di luogo","Predicato"],h:"Quando?",x:"'Ieri' risponde a 'Quando?' → complemento di tempo."},
    {q:"La frase 'Il gatto dorme' ha il soggetto...",a:"Espresso",w:["Sottinteso","Assente","Implicito"],h:"Lo vedi scritto?",x:"'Il gatto' è il soggetto espresso, scritto nella frase."},
    {q:"In 'Canto', il soggetto è...",a:"Sottinteso (io)",w:["Canto","Assente","La musica"],h:"La desinenza lo indica",x:"La desinenza -o del verbo indica 'io' come soggetto sottinteso."},
  ],
  medio: [
    {q:"Quale frase ha un predicato nominale?",a:"Il cielo è azzurro",w:["Marco corre veloce","Ho mangiato la pizza","I bambini giocano"],h:"Essere + aggettivo",x:"Il predicato nominale è formato da essere + nome/aggettivo."},
    {q:"In 'Studio per l'esame', 'per l'esame' è complemento di...",a:"Fine/Scopo",w:["Causa","Modo","Tempo"],h:"Per quale scopo?",x:"'Per quale scopo studio?' → fine."},
    {q:"'Perché ero stanco' è una proposizione...",a:"Subordinata causale",w:["Principale","Coordinata","Subordinata temporale"],h:"Esprime il motivo",x:"'Perché' introduce la causa."},
    {q:"In 'Il vaso di cristallo', 'di cristallo' è complemento di...",a:"Materia",w:["Specificazione","Qualità","Luogo"],h:"Di quale materiale?",x:"'Di cristallo' risponde a 'Di quale materiale è fatto?' → materia."},
    {q:"'Il libro di Marco' → 'di Marco' è complemento di...",a:"Specificazione",w:["Materia","Agente","Compagnia"],h:"Di chi?",x:"'Di chi è il libro?' → specificazione (possesso o appartenenza)."},
    {q:"Quale frase è passiva?",a:"La torta è stata mangiata da Marco",w:["Marco mangia la torta","La torta piace a Marco","Marco e la torta sono buoni"],h:"Essere + participio + da",x:"Forma passiva: soggetto che subisce + essere + participio + da + agente."},
    {q:"In 'Cammina lentamente', 'lentamente' è...",a:"Complemento di modo",w:["Predicato","Soggetto","Complemento di luogo"],h:"Come cammina?",x:"'Come cammina?' → complemento di modo (avverbio)."},
    {q:"'Affinché tu capisca' è una proposizione...",a:"Finale",w:["Causale","Temporale","Concessiva"],h:"Indica lo scopo",x:"'Affinché' introduce la proposizione finale (scopo dell'azione)."},
  ],
  difficile: [
    {q:"In 'La lettera fu scritta da Marco', 'da Marco' è...",a:"Complemento d'agente",w:["Complemento di causa","Soggetto","Complemento di specificazione"],h:"Chi compie l'azione nella passiva?",x:"Nella frase passiva, chi compie l'azione è il complemento d'agente."},
    {q:"'Sebbene' introduce una proposizione...",a:"Concessiva",w:["Causale","Temporale","Finale"],h:"Indica un ostacolo superato",x:"Sebbene = nonostante. Introduce una concessiva."},
    {q:"In 'Gli studenti, stanchi, tornarono a casa', 'stanchi' è...",a:"Apposizione / predicativo del soggetto",w:["Soggetto","Complemento oggetto","Predicato verbale"],h:"Descrive il soggetto in azione",x:"'Stanchi' è un predicativo del soggetto: descrive il soggetto durante l'azione."},
    {q:"'Secondo me, hai ragione' → 'Secondo me' è complemento di...",a:"Limitazione/Opinione",w:["Causa","Modo","Specificazione"],h:"Dal mio punto di vista",x:"Complemento di limitazione = restringe l'affermazione a un punto di vista."},
    {q:"'Tant'è vero che partì' — quale tipo di proposizione è 'che partì'?",a:"Consecutiva",w:["Causale","Finale","Relativa"],h:"Conseguenza",x:"La consecutiva esprime la conseguenza di quanto detto prima."},
    {q:"In una frase passiva, il soggetto grammaticale...",a:"Subisce l'azione",w:["Compie l'azione","È sempre assente","È il complemento d'agente"],h:"Chi subisce?",x:"Nella forma passiva il soggetto grammaticale è quello che subisce l'azione."},
    {q:"'Essendo stanco, si sedette' — 'essendo stanco' è...",a:"Proposizione implicita causale/concessiva",w:["Principale","Coordinata","Subordinata esplicita"],h:"Gerundio = implicita",x:"Il gerundio forma una proposizione implicita; il contesto la rende causale."},
    {q:"Il complemento partitivo risponde alla domanda...",a:"Di chi? Di che cosa? (parte di un tutto)",w:["Dove?","Quando?","Come?"],h:"Una parte del tutto",x:"Es: 'Alcuni di loro' → 'di loro' è complemento partitivo."},
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
    {frase1:"Non ho dormito bene.",frase2:"Sono stanco.",a:"Perciò",opts:["Perciò","Tuttavia","Anche","Prima"],x:"'Perciò' = quindi, introduce la conseguenza."},
    {frase1:"Luca ama la matematica.",frase2:"la fatica anche con l'italiano.",a:"Però",opts:["Però","Quindi","Poi","Anche"],x:"'Però' introduce un contrasto tra i due aspetti."},
    {frase1:"Sono andato al supermercato.",frase2:"Ho comprato frutta e verdura.",a:"E",opts:["E","Ma","Perché","Sebbene"],x:"'E' aggiunge informazioni dello stesso tipo."},
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
    {title:"Una storia di amicizia",paragrafi:[
      "Luca e Marco si conobbero il primo giorno di scuola.",
      "All'inizio erano timidi e non si parlavano quasi mai.",
      "Un giorno Luca dimenticò la merenda e Marco la condivise con lui.",
      "Da quel giorno diventarono inseparabili e passavano il ricreazione insieme.",
      "Anni dopo, ricordavano sempre con un sorriso quel primo giorno di scuola.",
    ]},
    {title:"Come si fa una ricerca scolastica",paragrafi:[
      "Scegli l'argomento che vuoi studiare.",
      "Cerca informazioni su libri, enciclopedie o siti affidabili.",
      "Prendi appunti e seleziona le informazioni più importanti.",
      "Organizza le informazioni in paragrafi con un titolo.",
      "Rileggi, correggi e presenta la tua ricerca alla classe.",
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
    {title:"Lo sport fa bene alla salute",paragrafi:[
      "Lo sport è fondamentale per il benessere fisico e mentale.",
      "Dal punto di vista fisico, l'attività motoria rafforza muscoli, ossa e cuore.",
      "Sul piano psicologico, fare sport riduce lo stress e migliora l'umore.",
      "Tuttavia, è importante praticare sport con moderazione per evitare infortuni.",
      "Per questi motivi, è consigliabile dedicare almeno 30 minuti al giorno al movimento.",
    ]},
    {title:"Una recensione di un libro",paragrafi:[
      "Il libro 'Le avventure di Pinocchio' è un classico della letteratura italiana.",
      "La storia narra le peripezie di un burattino di legno che vuole diventare un bambino vero.",
      "Il personaggio di Pinocchio rappresenta l'infanzia con i suoi difetti e le sue virtù.",
      "La scrittura di Collodi è vivace e coinvolgente, adatta a lettori di tutte le età.",
      "Consiglio vivamente questo libro a chi vuole unire divertimento e riflessione.",
    ]},
    {title:"Descrizione di un luogo",paragrafi:[
      "Il parco del mio quartiere è il mio posto preferito.",
      "Al centro si trova un grande prato verde dove i bambini giocano a pallone.",
      "Lungo i vialetti crescono alti pini e colorati cespugli di rose.",
      "In un angolo c'è una fontana vecchia dove i passeri fanno il bagno.",
      "Quando mi siedo sulla mia panchina preferita, mi sento in pace con il mondo.",
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
    {title:"Saggio sul valore della memoria storica",paragrafi:[
      "La memoria storica è il fondamento su cui si costruisce l'identità di un popolo.",
      "Ricordare gli eventi del passato, anche i più dolorosi, ci permette di non ripetere gli stessi errori.",
      "Alcuni sostengono che guardare avanti sia più importante che voltarsi indietro.",
      "Tuttavia, senza radici solide nel passato, non è possibile costruire un futuro consapevole.",
      "La storia insegna che i popoli che dimenticano i propri errori sono destinati a ricommetterli.",
      "Per questo, l'insegnamento della storia nelle scuole rimane indispensabile e urgente.",
    ]},
    {title:"Analisi del Rinascimento",paragrafi:[
      "Il Rinascimento rappresenta uno dei momenti più fervidi della cultura occidentale.",
      "Nato in Italia nel XV secolo, si diffuse rapidamente in tutta Europa.",
      "Il pensiero rinascimentale pose l'uomo al centro dell'universo, in contrasto con il Medioevo teocentrico.",
      "Artisti come Leonardo, Michelangelo e Raffaello rivoluzionarono la pittura, la scultura e l'architettura.",
      "Anche la letteratura conobbe un grande rinnovamento con Ariosto, Machiavelli e Guicciardini.",
      "Il lascito rinascimentale è ancora oggi parte essenziale della nostra identità culturale.",
    ]},
    {title:"I pro e i contro dei social media",paragrafi:[
      "I social media sono diventati uno strumento di comunicazione imprescindibile nel mondo contemporaneo.",
      "Da un lato, permettono di rimanere in contatto con amici e familiari lontani e di condividere esperienze.",
      "Dall'altro, l'uso eccessivo può portare a dipendenza, ansia sociale e difficoltà di concentrazione.",
      "Alcuni studi mostrano una correlazione tra l'uso intensivo dei social e il calo del benessere psicologico nei giovani.",
      "Ciononostante, se usati con consapevolezza, i social possono essere strumenti preziosi di informazione e creatività.",
      "La chiave, dunque, è un uso equilibrato e critico di questi potenti strumenti digitali.",
    ]},
  ]
};

// ── Registro Linguistico ──
export const prodRegistro = {
  facile: [
    {contesto:"Scrivi alla maestra per giustificare un'assenza.",formale:"Gentile maestra, Le scrivo per giustificare la mia assenza di ieri dovuta a motivi di salute.",informale:"Ciao mae, ieri non sono venuto perché stavo male!",a:"formale",h:"Chi è il destinatario?",x:"Con gli insegnanti si usa il registro formale (Lei)."},
    {contesto:"Inviti un amico a giocare.",formale:"Le sarei grato se potesse raggiungermi questo pomeriggio.",informale:"Ehi, vieni a giocare da me oggi pomeriggio?",a:"informale",h:"È un amico o un adulto?",x:"Con gli amici si usa il registro informale (tu)."},
    {contesto:"Ringrazi la nonna per un regalo.",formale:"La ringrazio sentitamente per il cortese dono.",informale:"Grazie nonna, il regalo è bellissimo! Mi è piaciuto tantissimo!",a:"informale",h:"La nonna è famiglia!",x:"In famiglia si usa il registro informale."},
    {contesto:"Chiedi informazioni in un negozio.",formale:"Buongiorno, potrebbe indicarmi dove si trovano i libri per ragazzi?",informale:"Ehi, dove sono i libri per ragazzi?",a:"formale",h:"Con un commesso sconosciuto",x:"In un contesto pubblico con adulti sconosciuti si usa il formale."},
    {contesto:"Mandi un messaggio al tuo migliore amico.",formale:"Caro amico, ti informo che domani non potrò essere presente all'appuntamento.",informale:"Domani non vengo, mi dispiace!",a:"informale",h:"Il migliore amico è molto intimo",x:"Con i migliori amici si usa sempre il registro informale."},
    {contesto:"Parli con il papà a cena.",formale:"Gentile padre, Le chiedo il permesso di uscire questa sera.",informale:"Papà, posso uscire stasera?",a:"informale",h:"Il papà è famiglia",x:"In famiglia si usa il registro informale."},
    {contesto:"Scrivi un'email a un professore universitario.",formale:"Egregio Professor Rossi, Le scrivo per chiedere un chiarimento riguardo all'ultima lezione.",informale:"Ciao prof, non ho capito la lezione, puoi spiegarmi?",a:"formale",h:"Professore universitario = autorità accademica",x:"Con figure accademiche si usa sempre il registro formale."},
    {contesto:"Racconti a tua sorella di una gita scolastica.",formale:"Ho partecipato a un'interessante escursione presso il museo civico della città.",informale:"Ieri siamo andati al museo, era una figata!",a:"informale",h:"Tua sorella è famiglia",x:"Con i familiari si usa il registro informale."},
  ],
  medio: [
    {contesto:"Scrivi al preside per chiedere un permesso.",formale:"Egregio Preside, Le scrivo per richiedere un permesso di uscita anticipata per il giorno...",informale:"Ciao preside, posso uscire prima giovedì?",a:"formale",h:"Il preside è un'autorità",x:"Con le autorità si usa il registro formale."},
    {contesto:"Racconti a un compagno cosa hai fatto nel weekend.",formale:"Nel fine settimana mi sono recato presso un'esposizione artistica di notevole interesse.",informale:"Sabato sono andato a una mostra fichissima! Ti sarebbe piaciuta!",a:"informale",h:"È un compagno di classe",x:"Con i compagni si usa il registro informale."},
    {contesto:"Scrivi una recensione per il giornalino della scuola.",formale:"Il romanzo analizzato presenta una struttura narrativa complessa e personaggi ben delineati.",informale:"Il libro è troppo bello, dovete leggerlo assolutamente!",a:"formale",h:"Un giornalino è una pubblicazione",x:"Per una pubblicazione si usa un registro formale/standard."},
    {contesto:"Presenti te stesso a un colloquio di lavoro (futuro).",formale:"Sono una persona precisa e motivata, con ottima capacità di lavorare in team.",informale:"Sono abbastanza bravo, mi impegno quando mi va.",a:"formale",h:"Un colloquio è un contesto professionale",x:"In un contesto professionale si usa sempre il registro formale."},
    {contesto:"Scrivi al medico di famiglia.",formale:"Gentile Dottore, Le scrivo per riferirle dei sintomi che accusavo da alcuni giorni.",informale:"Ciao dottore, sto maluccio, ho mal di gola.",a:"formale",h:"Il medico è un professionista",x:"Con i professionisti della salute si usa il registro formale."},
    {contesto:"Descrivi un libro in una tesina scolastica.",formale:"Il testo analizzato affronta tematiche di grande rilevanza sociale attraverso uno stile narrativo coinvolgente.",informale:"Il libro parla di cose importanti ed è scritto benissimo.",a:"formale",h:"Una tesina è un testo scolastico ufficiale",x:"I testi scolastici richiedono il registro formale/standard."},
    {contesto:"Inviti un vicino di casa adulto a una festa.",formale:"La invito cordialmente alla festicciola che organizzo sabato sera alle ore 19.",informale:"Ehi vicino, sabato faccio una festa, vieni?",a:"formale",h:"Un vicino adulto che non conosci bene",x:"Con adulti che non si conoscono intimamente si usa il formale."},
    {contesto:"Mandi un messaggio vocale alla tua squadra di calcio.",formale:"Desidero informarvi che l'allenamento di domani è spostato alle ore 18.",informale:"Ragazzi, domani ci alleniamo alle 6 di sera!",a:"informale",h:"La squadra sono tuoi coetanei",x:"Con coetanei in contesti informali si usa il registro informale."},
  ],
  difficile: [
    {contesto:"Scrivi una lettera al sindaco per segnalare un problema.",formale:"Egregio Signor Sindaco, mi permetto di segnalare alla Sua cortese attenzione il deterioramento del parco pubblico di via Roma.",informale:"Ehi sindaco, il parco di via Roma fa schifo, sistematelo!",a:"formale",h:"Il sindaco è un'autorità pubblica",x:"Le lettere ufficiali richiedono registro formale e formulario appropriato."},
    {contesto:"Scrivi un articolo per un quotidiano nazionale.",formale:"Secondo i dati recentemente pubblicati, il fenomeno risulta in costante crescita negli ultimi anni.",informale:"I numeri dicono che la cosa sta crescendo un sacco ultimamente.",a:"formale",h:"Un quotidiano è una pubblicazione ufficiale",x:"Il giornalismo richiede registro formale, preciso e oggettivo."},
    {contesto:"Fai un reclamo scritto a un'azienda.",formale:"Vi contatto per segnalare un grave disservizio riscontrato in merito all'ordine n. 12345, consegnato in ritardo e danneggiato.",informale:"Il mio pacco è arrivato in ritardo e tutto rotto, non va bene!",a:"formale",h:"Un reclamo aziendale è un documento ufficiale",x:"Le comunicazioni aziendali richiedono registro formale e tono professionale."},
    {contesto:"Esprimi un parere critico in un saggio argomentativo.",formale:"A mio avviso, la tesi dell'autore risulta parzialmente condivisibile, tuttavia presenta alcune lacune argomentative.",informale:"Secondo me l'autore ha un po' ragione ma si sbaglia su alcune cose.",a:"formale",h:"Un saggio argomentativo è un testo accademico",x:"I saggi argomentativi richiedono registro formale, distaccato e preciso."},
    {contesto:"Scrivi il verbale di una riunione scolastica.",formale:"Il giorno 15 aprile 2024, alle ore 17:00, si è tenuta la riunione del consiglio di classe. Sono presenti i seguenti docenti...",informale:"Ci siamo trovati il 15 aprile alle 5, erano presenti i prof...",a:"formale",h:"Il verbale è un documento ufficiale",x:"I verbali sono documenti ufficiali: registro formale obbligatorio."},
    {contesto:"Scrivi una relazione scientifica per la scuola.",formale:"L'esperimento condotto ha dimostrato che, all'aumentare della temperatura, la velocità di dissoluzione della sostanza incrementa proporzionalmente.",informale:"Più scaldiamo l'acqua, più lo zucchero si scioglie in fretta.",a:"formale",h:"Una relazione scientifica è un testo tecnico",x:"I testi tecnico-scientifici richiedono linguaggio preciso e registro formale."},
    {contesto:"Parli con un amico d'infanzia dopo anni.",formale:"Caro amico, è trascorso un lungo periodo dalla nostra ultima conversazione.",informale:"Amico, sono secoli che non ci vediamo!",a:"informale",h:"Un amico d'infanzia è una persona intima",x:"Con amici intimi si usa sempre il registro informale, anche dopo molto tempo."},
    {contesto:"Scrivi la dedica di un libro pubblicato.",formale:"Dedico quest'opera a tutti coloro che hanno creduto nel mio progetto e mi hanno sostenuto nel lungo percorso.",informale:"Questo libro è per tutti quelli che mi hanno aiutato!",a:"formale",h:"Una dedica pubblicata è un testo pubblico e duraturo",x:"Le dediche pubblicate, seppur personali, usano un registro formale e curato."},
  ]
};

// ── Correggi il Tema ──
export const prodCorreggi = {
  facile: [
    {testo:"Ieri sono andato al mare. Il mare era bello. Ho giocato sulla spiaggia. *Domani ho mangiato un gelato.* Poi siamo tornati a casa.",errore:"Domani ho mangiato un gelato.",corretto:"Poi ho mangiato un gelato.",x:"Errore di coerenza temporale: 'domani' è futuro ma il racconto è al passato."},
    {testo:"Il mio gatto si chiama Micio. È un gatto bianco e nero. *Gli piace abbaiare quando vede gli uccelli.* Dorme sempre sul divano.",errore:"Gli piace abbaiare quando vede gli uccelli.",corretto:"Gli piace miagolare quando vede gli uccelli.",x:"Errore logico: i gatti miagolano, non abbaiano!"},
    {testo:"La primavera è la mia stagione preferita. I fiori sbocciano e gli alberi si riempiono di foglie. *In primavera cade la neve e fa molto freddo.* Mi piace giocare al parco.",errore:"In primavera cade la neve e fa molto freddo.",corretto:"In primavera il sole splende e fa più caldo.",x:"Contraddizione: la neve e il freddo non sono caratteristiche della primavera."},
    {testo:"Luca è il mio migliore amico. Giochiamo sempre insieme. *Luca è il mio peggior nemico.* Andiamo a scuola insieme ogni mattina.",errore:"Luca è il mio peggior nemico.",corretto:"Luca è il mio compagno di banco.",x:"Contraddizione: 'migliore amico' e 'peggior nemico' non possono coesistere."},
    {testo:"Oggi è una bellissima giornata di sole. *Fuori piove forte e c'è un temporale.* Decido di andare al parco a giocare.",errore:"Fuori piove forte e c'è un temporale.",corretto:"C'è un cielo azzurro e splende il sole.",x:"Contraddizione: se è una bella giornata di sole, non può piovere."},
    {testo:"Ho ricevuto un bel voto in matematica. Avevo studiato molto. *Avevo fatto tutti gli errori.* Sono contento del risultato.",errore:"Avevo fatto tutti gli errori.",corretto:"Avevo fatto tutto correttamente.",x:"Incoerenza: se ho preso un bel voto, non ho fatto errori."},
    {testo:"Mia sorella è alta e bionda. *Ha i capelli scuri e corti.* Le piace molto leggere.",errore:"Ha i capelli scuri e corti.",corretto:"Ha i capelli lunghi e chiari.",x:"Contraddizione con 'bionda': se è bionda, i capelli non sono scuri."},
    {testo:"Ho mangiato una mela. *La pera era dolcissima.* Ho fatto merenda.",errore:"La pera era dolcissima.",corretto:"La mela era dolcissima.",x:"Incoerenza: ho mangiato una mela, non una pera."},
  ],
  medio: [
    {testo:"Il testo argomentativo serve a esporre un'opinione. *Per questo motivo, non è importante avere argomenti.* Bisogna convincere il lettore con ragionamenti logici e prove.",errore:"Per questo motivo, non è importante avere argomenti.",corretto:"Per questo motivo, è fondamentale avere argomenti solidi.",x:"Contraddizione: se serve convincere, gli argomenti sono essenziali!"},
    {testo:"Marco era molto stanco dopo la partita. *Si sentiva pieno di energia e aveva voglia di correre.* Decise di andare subito a dormire.",errore:"Si sentiva pieno di energia e aveva voglia di correre.",corretto:"Si sentiva esausto e non vedeva l'ora di riposare.",x:"Incoerenza: se era stanco, non poteva sentirsi pieno di energia."},
    {testo:"La lettura è un'attività molto utile. Migliora il vocabolario e stimola la fantasia. *Per questo bisogna evitare di leggere il più possibile.* Leggere un libro al mese è un ottimo obiettivo.",errore:"Per questo bisogna evitare di leggere il più possibile.",corretto:"Per questo bisogna leggere il più possibile.",x:"Contraddizione: se la lettura è utile, bisogna incoraggiarla, non evitarla."},
    {testo:"L'autore usa molte similitudini per descrivere il paesaggio. *Questo rende il testo difficile da capire e noioso.* Le immagini create sono molto evocative.",errore:"Questo rende il testo difficile da capire e noioso.",corretto:"Questo rende il testo vivido e piacevole da leggere.",x:"Incoerenza: le similitudini e le immagini evocative rendono il testo più interessante, non noioso."},
    {testo:"Il protagonista del racconto è un ragazzo coraggioso. Affronta ogni ostacolo senza esitare. *Alla fine scappa impaurito davanti al primo pericolo.* Il lettore rimane colpito dalla sua determinazione.",errore:"Alla fine scappa impaurito davanti al primo pericolo.",corretto:"Alla fine affronta anche il pericolo più grande con coraggio.",x:"Incoerenza: un protagonista coraggioso non scappa davanti ai pericoli."},
    {testo:"L'inquinamento è un problema serio. Le cause principali sono le emissioni industriali e il traffico. *Non ci sono soluzioni possibili, è inutile agire.* Per questo è importante adottare comportamenti più sostenibili.",errore:"Non ci sono soluzioni possibili, è inutile agire.",corretto:"Fortunatamente esistono soluzioni se agiamo insieme.",x:"Contraddizione: se poi si dice che bisogna agire, non si può dire che è inutile."},
    {testo:"Il testo descrittivo deve creare un'immagine vivida nella mente del lettore. *A tal fine, bisogna usare parole generiche e vaghe.* Aggettivi precisi e paragoni efficaci sono fondamentali.",errore:"A tal fine, bisogna usare parole generiche e vaghe.",corretto:"A tal fine, bisogna usare parole precise e specifiche.",x:"Contraddizione: la chiarezza descrittiva richiede precisione, non vaghezza."},
    {testo:"La poesia di Leopardi esprime una visione pessimistica della vita. *Il poeta è convinto che l'uomo possa essere pienamente felice.* Il tema della 'noia' ricorre in molte sue opere.",errore:"Il poeta è convinto che l'uomo possa essere pienamente felice.",corretto:"Il poeta è convinto che l'uomo non possa raggiungere la vera felicità.",x:"Contraddizione con il pessimismo leopardiano: Leopardi nega la possibilità della felicità umana."},
  ],
  difficile: [
    {testo:"Nella Divina Commedia, Dante compie un viaggio attraverso Inferno, Purgatorio e Paradiso. *La sua guida nell'Inferno è Beatrice, la donna amata.* Virgilio lo accompagna nei primi due regni.",errore:"La sua guida nell'Inferno è Beatrice, la donna amata.",corretto:"La sua guida nell'Inferno è Virgilio, il poeta latino.",x:"Errore fattuale: Virgilio guida Dante nell'Inferno e Purgatorio. Beatrice lo guida nel Paradiso."},
    {testo:"Il periodo ipotetico di 3° tipo esprime un'ipotesi irreale nel passato. *Si costruisce con 'se' + indicativo imperfetto + condizionale presente.* La conseguenza non si è verificata.",errore:"Si costruisce con 'se' + indicativo imperfetto + condizionale presente.",corretto:"Si costruisce con 'se' + congiuntivo trapassato + condizionale passato.",x:"Errore grammaticale: il 3° tipo usa congiuntivo trapassato + condizionale passato."},
    {testo:"Il Romanticismo è un movimento letterario dell'Ottocento. Si caratterizza per la valorizzazione della ragione e della scienza. *Il sentimento, la natura e l'individualismo sono temi secondari.*",errore:"Si caratterizza per la valorizzazione della ragione e della scienza.",corretto:"Si caratterizza per la valorizzazione del sentimento, della natura e dell'individualismo.",x:"Errore: il Romanticismo valorizza sentimento e natura, non la ragione (che è invece l'Illuminismo)."},
    {testo:"La metafora è una figura retorica che trasferisce il significato di una parola a un'altra. *A differenza della similitudine, usa la parola 'come'.* Esempio: 'Il tempo è denaro'.",errore:"A differenza della similitudine, usa la parola 'come'.",corretto:"A differenza della similitudine, non usa la parola 'come'.",x:"Errore: è la similitudine che usa 'come'; la metafora trasferisce direttamente il significato."},
    {testo:"Il narratore in prima persona racconta la storia dal suo punto di vista interno. *Conosce i pensieri e i sentimenti di tutti i personaggi.* Usa il pronome 'io'.",errore:"Conosce i pensieri e i sentimenti di tutti i personaggi.",corretto:"Conosce solo i propri pensieri e sentimenti.",x:"Errore: il narratore onnisciente conosce tutto; il narratore in prima persona conosce solo se stesso."},
    {testo:"Il Futurismo esaltava la velocità, la tecnologia e il movimento. *I futuristi amavano i musei e la cultura del passato.* Marinetti scrisse il Manifesto del Futurismo nel 1909.",errore:"I futuristi amavano i musei e la cultura del passato.",corretto:"I futuristi rifiutavano i musei e volevano distruggere la cultura del passato.",x:"Errore: il Futurismo era violentemente contrario ai musei e al passato."},
    {testo:"La tesi, in un testo argomentativo, è l'opinione che l'autore vuole dimostrare. *Va presentata alla fine del testo, come conclusione.* Gli argomenti a supporto seguono la tesi.",errore:"Va presentata alla fine del testo, come conclusione.",corretto:"Va presentata all'inizio del testo, nell'introduzione.",x:"Errore: la tesi si presenta all'inizio; la conclusione ribadisce la tesi già dimostrata."},
    {testo:"Il soggetto grammaticale è chi compie l'azione nella frase attiva. *Nella frase passiva, il soggetto grammaticale compie ancora l'azione.* Es: 'La torta fu mangiata da Marco'.",errore:"Nella frase passiva, il soggetto grammaticale compie ancora l'azione.",corretto:"Nella frase passiva, il soggetto grammaticale subisce l'azione.",x:"Errore: nella passiva il soggetto grammaticale ('la torta') subisce l'azione; chi la compie è Marco (complemento d'agente)."},
  ]
};
