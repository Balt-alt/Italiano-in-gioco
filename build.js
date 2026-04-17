// ══════════════════════════════════════
// Build script — bundle + minifica il frontend
// Uso: node build.js
// ══════════════════════════════════════
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'public', 'dist');

async function build() {
  // Assicurati che la cartella dist esista
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const result = await esbuild.build({
    entryPoints: ['public/js/app.js'],
    bundle: true,           // unisce tutti i moduli importati in un solo file
    minify: true,           // rimuove spazi, accorcia nomi variabili
    sourcemap: false,       // niente source map in produzione (nasconde il codice originale)
    target: ['es2020'],
    format: 'iife',         // wrapper (function(){...})() — funziona senza <script type="module">
    outfile: path.join(OUT_DIR, 'bundle.js'),
    metafile: true,
  });

  // Stampa dimensioni
  const size = fs.statSync(path.join(OUT_DIR, 'bundle.js')).size;
  console.log(`✅ Bundle creato: public/dist/bundle.js (${(size / 1024).toFixed(1)} KB)`);

  // Aggiorna index.html per usare il bundle invece dei moduli
  const htmlPath = path.join(__dirname, 'public', 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  if (!html.includes('dist/bundle.js')) {
    html = html.replace(
      '<script type="module" src="/js/app.js"></script>',
      '<script src="/dist/bundle.js"></script>'
    );
    fs.writeFileSync(htmlPath, html);
    console.log('✅ index.html aggiornato → usa /dist/bundle.js');
  }
}

build().catch(e => { console.error('Build fallita:', e); process.exit(1); });
