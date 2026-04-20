# 🇮🇹 Italiano in Gioco!

App educativa interattiva per imparare l'italiano, pensata per bambini della scuola primaria con attenzione alle difficoltà linguistiche.

## Caratteristiche

- **26+ modalità di gioco** per 7 categorie: Grammatica, Vocabolario, Verbi (incl. gioco esclusivo "Essere o Avere?"), Ortografia, Comprensione, Analisi Logica, Produzione Scritta
- **Sfide online in tempo reale** via Socket.io — crea una stanza, condividi il codice, gioca contro un amico su un altro dispositivo
- **Sfida del Giorno** — 5 domande miste ogni giorno con bonus XP; al termine sblocca 3 mini giochi arcade (Snake, Memory, Breakout)
- **Glossario grammaticale** — 30+ termini con definizioni, esempi e navigazione per categoria, consultabile dai profili
- **Generazione domande con AI** — inserisci un argomento nel pannello admin e Claude genera domande pronte da salvare (richiede chiave API Anthropic)
- **Multi-profilo**: ogni bambino ha il suo account con XP, livello, badge e progressi separati
- **Pannello Admin** protetto da PIN con sessioni sicure (token server-side, scadenza 2h)
- **Domande personalizzate**: aggiungi domande dal pannello admin — i tipi disponibili si adattano alla categoria selezionata (quiz per tutte, vero/falso solo comprensione, abbina coppie solo vocabolario)
- **Ripetizione spaziata** per ripassare automaticamente gli errori
- **Accessibilità**: modalità dislessia (font Lexend + spaziatura), testo grande e testo tutto maiuscolo (per bambini con maggiori difficoltà di lettura)
- **Salvataggio server-side** con SQLite (sql.js)
- **Backup completo** Import/Export JSON dal pannello admin
- **Frontend minificato**: tutto il codice client è bundlato e offuscato in produzione

## Requisiti

- Node.js 18+
- npm
- PM2 (consigliato per il deploy)

## Installazione

```bash
# Clona il progetto
git clone git@github.com:Balt-alt/Italiano-in-gioco.git
cd Italiano-in-gioco

# Installa le dipendenze
npm install

# Build del frontend (genera public/dist/bundle.js)
npm run build

# Avvia il server
node server.js
```

Il server si avvia su `http://localhost:3000`.  
Al primo avvio viene generato un **PIN admin casuale a 6 cifre** — comparirà nella console.

## Struttura

```
├── server.js            # Express server + API REST
├── db.js                # SQLite database layer
├── build.js             # Script di build (esbuild, minifica il frontend)
├── deploy.sh            # Build + pm2 restart in un comando
├── data.db              # Database (creato automaticamente, non committare)
├── package.json
└── public/
    ├── index.html       # Shell HTML (punta a /dist/bundle.js in produzione)
    ├── css/
    │   └── style.css    # Stili
    ├── dist/
    │   └── bundle.js    # Bundle minificato (generato da build.js, non committare)
    └── js/              # Sorgenti frontend (ES modules)
        ├── app.js       # Controller principale + schermate
        ├── api.js       # Client HTTP (fetch wrapper)
        ├── games.js     # Motori di tutti i giochi
        ├── questions.js # Banca domande built-in
        └── utils.js     # Utility (shuffle, esc, badge, confetti…)
```

## Workflow di sviluppo

```bash
# Sviluppo (serve i file JS sorgenti direttamente, senza build)
npm run dev
```

> In modalità `dev` il server si riavvia automaticamente sui cambiamenti a `server.js`/`db.js`.  
> Per i file frontend (`public/js/`) basta ricaricare il browser — **non serve la build**.

## Deploy su VPS con PM2

```bash
# Prima installazione
npm install
npm run build
pm2 start server.js --name italiano
pm2 save
pm2 startup

# Aggiornamento dopo modifiche al codice
git pull
./deploy.sh        # esegue build + pm2 restart italiano in un comando
```

> Se hai modificato **solo** file server (`server.js`, `db.js`) e non il frontend,  
> `pm2 restart italiano` da solo è sufficiente — il bundle non cambia.

## API

Tutte le API sono sotto `/api`. Le route di scrittura admin richiedono l'header `X-Admin-Token`.

| Metodo | Endpoint | Auth | Descrizione |
|--------|----------|------|-------------|
| GET | `/api/profiles` | — | Lista profili |
| POST | `/api/profiles` | — | Crea profilo |
| GET | `/api/profiles/:id` | — | Dettaglio profilo |
| PUT | `/api/profiles/:id` | — | Aggiorna profilo |
| DELETE | `/api/profiles/:id` | — | Elimina profilo |
| POST | `/api/profiles/:id/game-result` | — | Salva risultato partita |
| POST | `/api/profiles/:id/streak` | — | Aggiorna streak |
| POST | `/api/profiles/:id/errors` | — | Registra errore |
| GET | `/api/profiles/:id/errors` | — | Lista errori profilo |
| DELETE | `/api/profiles/:id/errors` | — | Cancella errori profilo |
| GET | `/api/errors` | — | Tutti gli errori (admin view) |
| GET | `/api/profiles/:id/reviews` | — | Domande in scadenza (spaced rep.) |
| PUT | `/api/reviews/:id` | — | Aggiorna intervallo ripetizione |
| POST | `/api/profiles/:id/badges` | — | Assegna badge |
| GET | `/api/custom-content` | — | Domande custom (lettura pubblica) |
| POST | `/api/custom-content` | ✅ Admin | Aggiungi domanda custom |
| DELETE | `/api/custom-content/:id` | ✅ Admin | Elimina domanda custom |
| GET | `/api/backup/export` | ✅ Admin | Esporta tutto in JSON |
| POST | `/api/backup/import` | ✅ Admin | Importa backup JSON |
| POST | `/api/admin/verify-pin` | — | Verifica PIN (rate limit: 5 tentativi/15 min) |
| PUT | `/api/admin/pin` | ✅ Admin | Cambia PIN |
| GET | `/api/admin/stats` | ✅ Admin | Statistiche aggregate |

## Sicurezza

- **PIN hashato** con SHA-256 — mai salvato in chiaro
- **Sessioni server-side** con token casuali da 64 char (TTL 2h)
- **Rate limiting** sul login: max 5 tentativi ogni 15 minuti per IP
- **Middleware `requireAdmin`** su tutte le route di scrittura sensibili
- **Frontend minificato** in produzione — nessun source map esposto
- Il database e il codice server non sono mai raggiungibili via HTTP
