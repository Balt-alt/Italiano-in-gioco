// ─── Mini Giochi ────────────────────────────────────────────────────────────
// Tre giochi arcade classici come premio dopo la sfida giornaliera.
// Ispirati alle implementazioni di straker (github.com/straker).

let _render, _navigate;
let _cleanupFn = null;

function cleanup() {
  if (_cleanupFn) { _cleanupFn(); _cleanupFn = null; }
}

export function initMinigames(renderFn, navigateFn) {
  _render = renderFn;
  _navigate = navigateFn;
}

export function showMinigames() {
  cleanup();
  _render(`
    <div class="screen fade-in">
      <div class="screen-header">
        <button class="btn btn-ghost" onclick="cleanup_mg();window._navigate('home')">← Home</button>
        <h2 style="margin:0">🎮 Mini Giochi</h2>
        <div></div>
      </div>
      <p style="text-align:center;color:var(--muted);margin:0 0 24px">Hai guadagnato un po' di svago! 🎉</p>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;max-width:480px;margin:0 auto;padding:0 16px">
        <button class="card mg-tile" onclick="window._mgSnake()">
          <span class="mg-icon">🐍</span>
          <span class="mg-label">Snake</span>
        </button>
        <button class="card mg-tile" onclick="window._mgMemory()">
          <span class="mg-icon">🃏</span>
          <span class="mg-label">Memory</span>
        </button>
        <button class="card mg-tile" onclick="window._mgBreakout()">
          <span class="mg-icon">🧱</span>
          <span class="mg-label">Breakout</span>
        </button>
      </div>
    </div>
  `);
}

window.cleanup_mg = cleanup;

// ── Helpers canvas ────────────────────────────────────────────────────────────

function gameShell(title, canvasId, width, height, extraHtml = '') {
  return `
    <div class="screen fade-in" style="display:flex;flex-direction:column;align-items:center">
      <div class="screen-header" style="width:100%;max-width:520px">
        <button class="btn btn-ghost" onclick="cleanup_mg();window._mgShowMenu()">← Giochi</button>
        <h2 style="margin:0">${title}</h2>
        <div id="mg-score" style="font-weight:700;font-size:1.1rem"></div>
      </div>
      ${extraHtml}
      <canvas id="${canvasId}" width="${width}" height="${height}"
        style="border-radius:16px;max-width:100%;touch-action:none;margin-top:8px"></canvas>
      <div id="mg-overlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99;display:flex;align-items:center;justify-content:center">
        <div class="card" style="padding:32px;text-align:center;max-width:300px">
          <div id="mg-over-text" style="font-size:1.4rem;font-weight:700;margin-bottom:16px"></div>
          <div id="mg-over-score" style="color:var(--muted);margin-bottom:20px"></div>
          <div style="display:flex;gap:12px;justify-content:center">
            <button class="btn btn-primary" onclick="window._mgRestart()">🔄 Rigioca</button>
            <button class="btn btn-ghost" onclick="cleanup_mg();window._mgShowMenu()">← Menu</button>
          </div>
        </div>
      </div>
    </div>`;
}

function showOverlay(title, scoreText) {
  const o = document.getElementById('mg-overlay');
  if (!o) return;
  document.getElementById('mg-over-text').textContent = title;
  document.getElementById('mg-over-score').textContent = scoreText;
  o.style.display = 'flex';
}

window._mgShowMenu = showMinigames;

// ════════════════════════════════════════════════════════════════════════════
// 🐍  SNAKE
// ════════════════════════════════════════════════════════════════════════════

const CELL = 20;

window._mgSnake = function () {
  cleanup();
  _render(gameShell('🐍 Snake', 'mg-canvas', 400, 400));
  setTimeout(startSnake, 50);
};

function startSnake() {
  const canvas = document.getElementById('mg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const COLS = canvas.width / CELL;
  const ROWS = canvas.height / CELL;

  let snake, dir, nextDir, food, score, raf, interval, running;

  const LS_KEY = 'mg_snake_best';
  let best = parseInt(localStorage.getItem(LS_KEY) || '0');

  function rand(n) { return Math.floor(Math.random() * n); }

  function init() {
    snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    score = 0;
    running = true;
    spawnFood();
    updateScore();
    document.getElementById('mg-overlay').style.display = 'none';
    clearInterval(interval);
    interval = setInterval(tick, 130);
    rafId = requestAnimationFrame(draw);
  }

  let rafId;

  function spawnFood() {
    let pos;
    do { pos = { x: rand(COLS), y: rand(ROWS) }; }
    while (snake.some(s => s.x === pos.x && s.y === pos.y));
    food = pos;
  }

  function tick() {
    if (!running) return;
    dir = { ...nextDir };
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS || snake.some(s => s.x === head.x && s.y === head.y)) {
      running = false;
      clearInterval(interval);
      if (score > best) { best = score; localStorage.setItem(LS_KEY, best); }
      showOverlay('💀 Game Over!', `Punteggio: ${score}  |  Record: ${best}`);
      return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) { score++; updateScore(); spawnFood(); }
    else snake.pop();
  }

  function draw() {
    if (!document.getElementById('mg-canvas')) return;
    rafId = requestAnimationFrame(draw);
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // grid dots
    ctx.fillStyle = 'rgba(255,255,255,.04)';
    for (let x = 0; x < COLS; x++) for (let y = 0; y < ROWS; y++) { ctx.beginPath(); ctx.arc(x * CELL + CELL / 2, y * CELL + CELL / 2, 1, 0, Math.PI * 2); ctx.fill(); }
    // food
    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    // snake
    snake.forEach((s, i) => {
      const t = 1 - i / snake.length;
      ctx.fillStyle = `hsl(${120 + i * 2}, 70%, ${40 + t * 25}%)`;
      ctx.beginPath();
      ctx.roundRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2, 4);
      ctx.fill();
    });
  }

  function updateScore() {
    const el = document.getElementById('mg-score');
    if (el) el.textContent = `🍎 ${score}  🏆 ${best}`;
  }

  // keyboard
  function onKey(e) {
    const map = { ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 }, w: { x: 0, y: -1 }, s: { x: 0, y: 1 }, a: { x: -1, y: 0 }, d: { x: 1, y: 0 } };
    const nd = map[e.key];
    if (nd && !(nd.x === -dir.x && nd.y === -dir.y)) { nextDir = nd; e.preventDefault(); }
  }
  document.addEventListener('keydown', onKey);

  // touch swipe
  let tx0, ty0;
  canvas.addEventListener('touchstart', e => { tx0 = e.touches[0].clientX; ty0 = e.touches[0].clientY; }, { passive: true });
  canvas.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx0, dy = e.changedTouches[0].clientY - ty0;
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
    let nd;
    if (Math.abs(dx) > Math.abs(dy)) nd = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
    else nd = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
    if (!(nd.x === -dir.x && nd.y === -dir.y)) nextDir = nd;
  }, { passive: true });

  window._mgRestart = init;
  _cleanupFn = () => { clearInterval(interval); cancelAnimationFrame(rafId); document.removeEventListener('keydown', onKey); };

  init();
}

// ════════════════════════════════════════════════════════════════════════════
// 🃏  MEMORY
// ════════════════════════════════════════════════════════════════════════════

const MEM_PAIRS = ['🍎', '🐶', '⭐', '🚀', '🌈', '🦋', '🎸', '🍕', '🐬', '🌺', '🎯', '🦁'];

window._mgMemory = function () {
  cleanup();
  _render(`
    <div class="screen fade-in" style="display:flex;flex-direction:column;align-items:center">
      <div class="screen-header" style="width:100%;max-width:520px">
        <button class="btn btn-ghost" onclick="cleanup_mg();window._mgShowMenu()">← Giochi</button>
        <h2 style="margin:0">🃏 Memory</h2>
        <div id="mg-score" style="font-weight:700"></div>
      </div>
      <div id="mem-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;max-width:360px;width:100%;padding:8px 16px"></div>
      <div id="mg-overlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99;display:flex;align-items:center;justify-content:center">
        <div class="card" style="padding:32px;text-align:center;max-width:300px">
          <div id="mg-over-text" style="font-size:1.4rem;font-weight:700;margin-bottom:16px"></div>
          <div id="mg-over-score" style="color:var(--muted);margin-bottom:20px"></div>
          <div style="display:flex;gap:12px;justify-content:center">
            <button class="btn btn-primary" onclick="window._mgRestart()">🔄 Rigioca</button>
            <button class="btn btn-ghost" onclick="cleanup_mg();window._mgShowMenu()">← Menu</button>
          </div>
        </div>
      </div>
    </div>
  `);
  setTimeout(startMemory, 50);
};

function startMemory() {
  const grid = document.getElementById('mem-grid');
  if (!grid) return;

  let cards, flipped, matched, moves, lockBoard, timerInt, seconds;

  function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

  function init() {
    cards = shuffle([...MEM_PAIRS.slice(0, 8), ...MEM_PAIRS.slice(0, 8)]);
    flipped = []; matched = 0; moves = 0; lockBoard = false; seconds = 0;
    clearInterval(timerInt);
    timerInt = setInterval(() => { seconds++; updateScore(); }, 1000);
    document.getElementById('mg-overlay').style.display = 'none';
    render();
    updateScore();
  }

  function render() {
    grid.innerHTML = cards.map((emoji, i) => `
      <button class="mem-card" id="mc${i}" data-i="${i}" onclick="window._memFlip(${i})"
        style="aspect-ratio:1;font-size:1.8rem;border-radius:12px;border:2px solid var(--border);background:var(--surface);cursor:pointer;transition:transform .2s">
        <span class="mem-face" style="display:none">${emoji}</span>
        <span class="mem-back">❓</span>
      </button>`).join('');
  }

  window._memFlip = function (i) {
    if (lockBoard) return;
    const el = document.getElementById(`mc${i}`);
    if (!el || el.dataset.matched || flipped.find(f => f.i === i)) return;
    el.querySelector('.mem-face').style.display = '';
    el.querySelector('.mem-back').style.display = 'none';
    el.style.background = 'var(--primary-light, #e8d5ff)';
    flipped.push({ i, emoji: cards[i] });
    if (flipped.length < 2) return;
    moves++;
    updateScore();
    lockBoard = true;
    const [a, b] = flipped;
    if (a.emoji === b.emoji) {
      [a.i, b.i].forEach(idx => { const c = document.getElementById(`mc${idx}`); c.dataset.matched = '1'; c.style.background = '#d4edda'; c.style.borderColor = '#28a745'; });
      matched++;
      flipped = [];
      lockBoard = false;
      if (matched === 8) {
        clearInterval(timerInt);
        showOverlay('🎉 Hai vinto!', `Mosse: ${moves}  |  Tempo: ${seconds}s`);
      }
    } else {
      setTimeout(() => {
        [a.i, b.i].forEach(idx => { const c = document.getElementById(`mc${idx}`); if (!c) return; c.querySelector('.mem-face').style.display = 'none'; c.querySelector('.mem-back').style.display = ''; c.style.background = 'var(--surface)'; });
        flipped = [];
        lockBoard = false;
      }, 900);
    }
  };

  function updateScore() {
    const el = document.getElementById('mg-score');
    if (el) el.textContent = `👆 ${moves}  ⏱ ${seconds}s`;
  }

  window._mgRestart = init;
  _cleanupFn = () => clearInterval(timerInt);

  init();
}

// ════════════════════════════════════════════════════════════════════════════
// 🧱  BREAKOUT
// ════════════════════════════════════════════════════════════════════════════

window._mgBreakout = function () {
  cleanup();
  _render(gameShell('🧱 Breakout', 'mg-canvas', 400, 500,
    `<p style="color:var(--muted);font-size:.82rem;margin:4px 0 0;text-align:center">← → tasto / trascina il dito</p>`));
  setTimeout(startBreakout, 50);
};

function startBreakout() {
  const canvas = document.getElementById('mg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // Paddle
  const PAD_H = 12, PAD_W = 80;
  let padX, ballX, ballY, ballDX, ballDY, bricks, score, lives, rafId, running;

  const BRICK_ROWS = 5, BRICK_COLS = 8, BRICK_W = W / BRICK_COLS, BRICK_H = 22, BRICK_PAD = 3;
  const COLORS = ['#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c', '#74c0fc'];

  function init() {
    padX = W / 2 - PAD_W / 2;
    ballX = W / 2; ballY = H - 80;
    ballDX = 3.5; ballDY = -3.5;
    score = 0; lives = 3;
    bricks = [];
    for (let r = 0; r < BRICK_ROWS; r++)
      for (let c = 0; c < BRICK_COLS; c++)
        bricks.push({ r, c, alive: true, color: COLORS[r] });
    running = true;
    document.getElementById('mg-overlay').style.display = 'none';
    updateScore();
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
  }

  function loop() {
    if (!document.getElementById('mg-canvas')) return;
    rafId = requestAnimationFrame(loop);
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, W, H);
    if (!running) return;

    // Move ball
    ballX += ballDX; ballY += ballDY;
    if (ballX < 6 || ballX > W - 6) ballDX = -ballDX;
    if (ballY < 6) ballDY = -ballDY;
    if (ballY > H) {
      lives--;
      updateScore();
      if (lives <= 0) { running = false; showOverlay('💔 Game Over', `Punteggio: ${score}`); return; }
      ballX = W / 2; ballY = H - 80; ballDX = 3.5 * (Math.random() > .5 ? 1 : -1); ballDY = -3.5;
    }

    // Paddle collision
    if (ballY > H - 80 && ballY < H - 80 + PAD_H && ballX > padX && ballX < padX + PAD_W) {
      ballDY = -Math.abs(ballDY);
      ballDX = ((ballX - (padX + PAD_W / 2)) / (PAD_W / 2)) * 5;
    }

    // Brick collision
    for (const b of bricks) {
      if (!b.alive) continue;
      const bx = b.c * BRICK_W + BRICK_PAD, by = b.r * (BRICK_H + BRICK_PAD) + 40, bw = BRICK_W - BRICK_PAD * 2, bh = BRICK_H;
      if (ballX > bx && ballX < bx + bw && ballY > by && ballY < by + bh) {
        b.alive = false; ballDY = -ballDY; score += 10; updateScore();
        if (bricks.every(b => !b.alive)) { running = false; showOverlay('🎉 Hai vinto!', `Punteggio: ${score}!`); }
        break;
      }
    }

    // Draw bricks
    bricks.forEach(b => {
      if (!b.alive) return;
      const bx = b.c * BRICK_W + BRICK_PAD, by = b.r * (BRICK_H + BRICK_PAD) + 40, bw = BRICK_W - BRICK_PAD * 2;
      ctx.fillStyle = b.color;
      ctx.beginPath(); ctx.roundRect(bx, by, bw, BRICK_H, 5); ctx.fill();
    });

    // Draw paddle
    ctx.fillStyle = '#B197FC';
    ctx.beginPath(); ctx.roundRect(padX, H - 80, PAD_W, PAD_H, 6); ctx.fill();

    // Draw ball
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(ballX, ballY, 7, 0, Math.PI * 2); ctx.fill();

    // Draw lives
    ctx.fillStyle = '#ff6b6b';
    ctx.font = '16px sans-serif';
    for (let i = 0; i < lives; i++) ctx.fillText('❤️', 8 + i * 24, H - 8);
  }

  function updateScore() {
    const el = document.getElementById('mg-score');
    if (el) el.textContent = `⭐ ${score}  ❤️ ${lives}`;
  }

  // Keyboard
  function onKey(e) {
    if (e.key === 'ArrowLeft') { padX = Math.max(0, padX - 24); e.preventDefault(); }
    if (e.key === 'ArrowRight') { padX = Math.min(W - PAD_W, padX + 24); e.preventDefault(); }
  }
  document.addEventListener('keydown', onKey);

  // Touch drag
  canvas.addEventListener('touchmove', e => {
    const rect = canvas.getBoundingClientRect();
    const scale = W / rect.width;
    padX = Math.min(W - PAD_W, Math.max(0, (e.touches[0].clientX - rect.left) * scale - PAD_W / 2));
    e.preventDefault();
  }, { passive: false });

  // Mouse
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const scale = W / rect.width;
    padX = Math.min(W - PAD_W, Math.max(0, (e.clientX - rect.left) * scale - PAD_W / 2));
  });

  window._mgRestart = init;
  _cleanupFn = () => { cancelAnimationFrame(rafId); document.removeEventListener('keydown', onKey); };

  init();
}
