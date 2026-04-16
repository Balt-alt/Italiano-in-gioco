# 🇮🇹 Italiano in Gioco!

App educativa interattiva per imparare l'italiano, pensata per bambini della scuola primaria con attenzione alle difficoltà linguistiche.

## Caratteristiche

- **20 modalità di gioco** diverse per 5 categorie (Grammatica, Vocabolario, Verbi, Ortografia, Comprensione)
- **Multi-profilo**: ogni bambino ha il suo account con progressi separati
- **Pannello Admin** protetto da PIN con statistiche, errori e progressi
- **Ripetizione spaziata** per ripassare gli errori
- **Accessibilità**: modalità dislessia (font Lexend + spaziatura) e testo grande
- **Salvataggio server-side** con SQLite
- **Import/Export** domande personalizzate e backup completo in JSON

## Requisiti

- Node.js 18+ 
- npm

## Installazione

```bash
# Clona o copia il progetto
cd italiano-in-gioco

# Installa le dipendenze
npm install

# Avvia il server
npm start
```

Il server si avvia su `http://localhost:3000`

## Struttura

```
├── server.js          # Express server + API REST
├── db.js              # SQLite database layer  
├── data.db            # Database (creato automaticamente)
├── package.json
├── public/
│   ├── index.html     # Shell HTML
│   ├── css/
│   │   └── style.css  # Stili
│   └── js/
│       ├── app.js     # Controller principale + schermate
│       ├── api.js     # Client API (fetch)
│       ├── games.js   # Motori di gioco
│       ├── questions.js # Banca domande
│       └── utils.js   # Utility
```

## API

Tutte le API sono sotto `/api`:

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | /api/profiles | Lista profili |
| POST | /api/profiles | Crea profilo |
| GET | /api/profiles/:id | Dettaglio profilo |
| PUT | /api/profiles/:id | Aggiorna profilo |
| DELETE | /api/profiles/:id | Elimina profilo |
| POST | /api/profiles/:id/game-result | Salva risultato partita |
| POST | /api/profiles/:id/errors | Registra errore |
| GET | /api/profiles/:id/errors | Lista errori |
| GET | /api/custom-questions | Domande personalizzate |
| POST | /api/custom-questions | Aggiungi domanda |
| GET | /api/backup/export | Esporta tutto |
| POST | /api/backup/import | Importa backup |
| POST | /api/admin/verify-pin | Verifica PIN admin |

## Deploy su VPS

```bash
# Con PM2 (raccomandato)
npm install -g pm2
pm2 start server.js --name italiano-in-gioco
pm2 save
pm2 startup

# Oppure con systemd
# Crea /etc/systemd/system/italiano.service
```

## PIN Admin

Il PIN predefinito è `1234`. Può essere cambiato dal pannello admin.
