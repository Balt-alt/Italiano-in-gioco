const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_PATH = path.join(__dirname, 'data.db');
let db;
let saveTimeout;

function scheduleSave() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    const data = db.export();
    fs.writeFileSync(DB_PATH, Buffer.from(data));
  }, 300);
}

function run(sql, params = []) { db.run(sql, params); scheduleSave(); }
function runRaw(sql, params = []) { db.run(sql, params); }
function get(sql, params = []) { const stmt = db.prepare(sql); stmt.bind(params); if (stmt.step()) { const r = stmt.getAsObject(); stmt.free(); return r; } stmt.free(); return null; }
function all(sql, params = []) { const stmt = db.prepare(sql); stmt.bind(params); const rows = []; while (stmt.step()) rows.push(stmt.getAsObject()); stmt.free(); return rows; }
function exec(sql) { db.exec(sql); scheduleSave(); }
function lastId() { return db.exec("SELECT last_insert_rowid()")[0]?.values[0]?.[0]; }

function hashPin(pin) {
  return crypto.createHash('sha256').update(String(pin)).digest('hex');
}

async function init() {
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const buf = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buf);
  } else {
    db = new SQL.Database();
  }
  exec(`
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS profiles (id TEXT PRIMARY KEY, name TEXT NOT NULL, avatar TEXT DEFAULT '🦊', color TEXT DEFAULT '#B197FC', xp INTEGER DEFAULT 0, streak INTEGER DEFAULT 0, best_streak INTEGER DEFAULT 0, games_played INTEGER DEFAULT 0, difficulty TEXT DEFAULT 'facile', questions_count INTEGER DEFAULT 10, timer_seconds INTEGER DEFAULT 20, answer_type TEXT DEFAULT 'multiple', dyslexia_mode INTEGER DEFAULT 0, large_text INTEGER DEFAULT 0, uppercase_text INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')));
    CREATE TABLE IF NOT EXISTS category_scores (id INTEGER PRIMARY KEY AUTOINCREMENT, profile_id TEXT NOT NULL, category TEXT NOT NULL, played INTEGER DEFAULT 0, best_score INTEGER DEFAULT 0, UNIQUE(profile_id, category));
    CREATE TABLE IF NOT EXISTS error_log (id INTEGER PRIMARY KEY AUTOINCREMENT, profile_id TEXT NOT NULL, category TEXT NOT NULL, question TEXT NOT NULL, user_answer TEXT NOT NULL, correct_answer TEXT NOT NULL, difficulty TEXT NOT NULL, created_at TEXT DEFAULT (datetime('now')));
    CREATE TABLE IF NOT EXISTS spaced_repetition (id INTEGER PRIMARY KEY AUTOINCREMENT, profile_id TEXT NOT NULL, category TEXT NOT NULL, question TEXT NOT NULL, correct_answer TEXT NOT NULL, wrong_answers TEXT DEFAULT '[]', hint TEXT DEFAULT '', explanation TEXT DEFAULT '', next_review TEXT NOT NULL, interval_days REAL DEFAULT 1, ease_factor REAL DEFAULT 2.5, repetitions INTEGER DEFAULT 0, UNIQUE(profile_id, question));
    CREATE TABLE IF NOT EXISTS badges (id INTEGER PRIMARY KEY AUTOINCREMENT, profile_id TEXT NOT NULL, badge_id TEXT NOT NULL, earned_at TEXT DEFAULT (datetime('now')), UNIQUE(profile_id, badge_id));
    CREATE TABLE IF NOT EXISTS custom_questions (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL, question TEXT NOT NULL, answer TEXT NOT NULL, wrong_answers TEXT DEFAULT '[]', hint TEXT DEFAULT '', created_at TEXT DEFAULT (datetime('now')));
    CREATE TABLE IF NOT EXISTS custom_content (id INTEGER PRIMARY KEY AUTOINCREMENT, game_type TEXT NOT NULL, category TEXT NOT NULL, difficulty TEXT NOT NULL DEFAULT 'facile', data TEXT NOT NULL, created_at TEXT DEFAULT (datetime('now')));
    CREATE TABLE IF NOT EXISTS daily_challenges (id INTEGER PRIMARY KEY AUTOINCREMENT, profile_id TEXT NOT NULL, date TEXT NOT NULL, score INTEGER DEFAULT 0, total INTEGER DEFAULT 5, xp_earned INTEGER DEFAULT 0, completed_at TEXT DEFAULT (datetime('now')), UNIQUE(profile_id, date));
  `);

  // Migrazioni colonne mancanti su DB esistenti
  const profileCols = all("PRAGMA table_info(profiles)").map(c => c.name);
  if (!profileCols.includes('uppercase_text')) {
    db.run("ALTER TABLE profiles ADD COLUMN uppercase_text INTEGER DEFAULT 0");
    console.log('  🔄 Migrazione: aggiunta colonna uppercase_text ai profili');
    scheduleSave();
  }

  const existingPin = get("SELECT value FROM settings WHERE key=?", ['admin_pin']);
  if (!existingPin) {
    // Primo avvio: genera PIN casuale a 6 cifre
    const defaultPin = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`\n  🔑 PIN Admin generato: ${defaultPin}  ← SALVALO!\n`);
    run("INSERT INTO settings (key,value) VALUES (?,?)", ['admin_pin', hashPin(defaultPin)]);
  } else if (existingPin.value.length < 32) {
    // Migrazione: PIN in chiaro → hash
    console.log(`\n  🔄 Migrazione PIN admin a formato sicuro...\n`);
    run("UPDATE settings SET value=? WHERE key=?", [hashPin(existingPin.value), 'admin_pin']);
  }
}

const verifyPin = (pin) => {
  const stored = get("SELECT value FROM settings WHERE key=?", ['admin_pin'])?.value;
  if (!stored) return false;
  return stored === hashPin(pin);
};
const setAdminPin = (pin) => run("INSERT OR REPLACE INTO settings (key,value) VALUES (?,?)", ['admin_pin', hashPin(pin)]);
const getSetting = (key) => get("SELECT value FROM settings WHERE key=?", [key])?.value || null;
const setSetting = (key, value) => run("INSERT OR REPLACE INTO settings (key,value) VALUES (?,?)", [key, value]);

// Daily challenges
const getTodayChallenge = (profileId) => {
  const today = new Date().toISOString().split('T')[0];
  return get("SELECT * FROM daily_challenges WHERE profile_id=? AND date=?", [profileId, today]);
};
const completeDailyChallenge = (profileId, score, total) => {
  const today = new Date().toISOString().split('T')[0];
  const existing = getTodayChallenge(profileId);
  if (existing) return { xp: 0, alreadyDone: true };
  const xp = 50 + (score * 10); // 50 base + 10 per ogni risposta corretta
  run("INSERT INTO daily_challenges (profile_id,date,score,total,xp_earned) VALUES (?,?,?,?,?)", [profileId, today, score, total, xp]);
  run("UPDATE profiles SET xp=xp+? WHERE id=?", [xp, profileId]);
  return { xp, alreadyDone: false };
};
const getProfiles = () => all("SELECT * FROM profiles ORDER BY created_at");
const getProfile = (id) => {
  const p = get("SELECT * FROM profiles WHERE id=?", [id]);
  if (!p) return null;
  p.level = Math.floor(p.xp / 200) + 1;
  p.category_scores = all("SELECT * FROM category_scores WHERE profile_id=?", [id]);
  p.badges = all("SELECT badge_id FROM badges WHERE profile_id=?", [id]).map(b => b.badge_id);
  p.error_count = get("SELECT COUNT(*) as c FROM error_log WHERE profile_id=?", [id])?.c || 0;
  return p;
};
const createProfile = (id, name, avatar, color) => { run("INSERT INTO profiles (id,name,avatar,color) VALUES (?,?,?,?)", [id, name, avatar, color]); return getProfile(id); };
const updateProfile = (id, data) => {
  const allowed = ['name','avatar','color','xp','streak','best_streak','games_played','difficulty','questions_count','timer_seconds','answer_type','dyslexia_mode','large_text','uppercase_text'];
  const f = [], v = [];
  for (const k of allowed) if (data[k] !== undefined) { f.push(`${k}=?`); v.push(data[k]); }
  if (!f.length) return getProfile(id);
  v.push(id);
  run(`UPDATE profiles SET ${f.join(',')} WHERE id=?`, v);
  return getProfile(id);
};
const deleteProfile = (id) => { ['badges','spaced_repetition','error_log','category_scores','profiles'].forEach(t => run(`DELETE FROM ${t} WHERE ${t==='profiles'?'id':'profile_id'}=?`, [id])); };
const saveGameResult = (pid, category, score, total) => {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const xpE = score * 10 + (pct === 100 ? 50 : 0);
  run("UPDATE profiles SET xp=xp+?, games_played=games_played+1 WHERE id=?", [xpE, pid]);
  const ex = get("SELECT * FROM category_scores WHERE profile_id=? AND category=?", [pid, category]);
  if (ex) {
    const newBest = Math.max(ex.best_score || 0, pct);
    run("UPDATE category_scores SET played=played+1, best_score=? WHERE profile_id=? AND category=?", [newBest, pid, category]);
  }
  else run("INSERT INTO category_scores (profile_id,category,played,best_score) VALUES (?,?,1,?)", [pid, category, pct]);
  return { xpEarned: xpE, pct };
};
const logError = (pid, d) => {
  run("INSERT INTO error_log (profile_id,category,question,user_answer,correct_answer,difficulty) VALUES (?,?,?,?,?,?)", [pid, d.category, d.question, d.userAnswer, d.correctAnswer, d.difficulty]);
  if (!get("SELECT id FROM spaced_repetition WHERE profile_id=? AND question=?", [pid, d.question]))
    run("INSERT INTO spaced_repetition (profile_id,category,question,correct_answer,wrong_answers,hint,explanation,next_review) VALUES (?,?,?,?,?,?,?,datetime('now','+1 minute'))", [pid, d.category, d.question, d.correctAnswer, JSON.stringify(d.wrongAnswers||[]), d.hint||'', d.explanation||'']);
};
const getErrors = (pid, cat, lim = 50) => cat && cat !== 'all' ? all("SELECT * FROM error_log WHERE profile_id=? AND category=? ORDER BY created_at DESC LIMIT ?", [pid, cat, lim]) : all("SELECT * FROM error_log WHERE profile_id=? ORDER BY created_at DESC LIMIT ?", [pid, lim]);
const getAllErrors = (cat, lim = 50) => cat && cat !== 'all' ? all("SELECT e.*, p.name as profile_name, p.avatar as profile_avatar FROM error_log e JOIN profiles p ON e.profile_id=p.id WHERE e.category=? ORDER BY e.created_at DESC LIMIT ?", [cat, lim]) : all("SELECT e.*, p.name as profile_name, p.avatar as profile_avatar FROM error_log e JOIN profiles p ON e.profile_id=p.id ORDER BY e.created_at DESC LIMIT ?", [lim]);
const clearErrors = (pid) => { run("DELETE FROM error_log WHERE profile_id=?", [pid]); run("DELETE FROM spaced_repetition WHERE profile_id=?", [pid]); };
const getDueReviews = (pid, cat) => cat ? all("SELECT * FROM spaced_repetition WHERE profile_id=? AND category=? AND next_review<=datetime('now') LIMIT 10", [pid, cat]) : all("SELECT * FROM spaced_repetition WHERE profile_id=? AND next_review<=datetime('now') LIMIT 10", [pid]);
const updateReview = (id) => { const i = get("SELECT * FROM spaced_repetition WHERE id=?", [id]); if (!i) return; const ni = Math.min(i.interval_days * i.ease_factor, 30); run("UPDATE spaced_repetition SET interval_days=?, repetitions=repetitions+1 WHERE id=?", [ni, id]); };
const addBadge = (pid, bid) => { try { run("INSERT INTO badges (profile_id,badge_id) VALUES (?,?)", [pid, bid]); return true; } catch(e) { return false; } };
const updateStreak = (pid, correct) => { if (correct) { const p = get("SELECT streak,best_streak FROM profiles WHERE id=?", [pid]); const ns=(p?.streak||0)+1,nb=Math.max(ns,p?.best_streak||0); run("UPDATE profiles SET streak=?,best_streak=? WHERE id=?", [ns,nb,pid]); return {streak:ns,bestStreak:nb}; } run("UPDATE profiles SET streak=0 WHERE id=?", [pid]); return {streak:0}; };
const getCustomQuestions = () => all("SELECT * FROM custom_questions ORDER BY created_at DESC");
const addCustomQuestion = (d) => { run("INSERT INTO custom_questions (category,question,answer,wrong_answers,hint) VALUES (?,?,?,?,?)", [d.category,d.question,d.answer,JSON.stringify(d.wrongAnswers),d.hint||'']); return {id:lastId(),...d}; };
const deleteCustomQuestion = (id) => run("DELETE FROM custom_questions WHERE id=?", [id]);
// ── Custom Content (domande aggiunte dall'admin) ──
const getCustomContent = (gameType, category, difficulty) =>
  all("SELECT * FROM custom_content WHERE game_type=? AND category=? AND difficulty=? ORDER BY created_at DESC", [gameType, category, difficulty]);
const getAllCustomContent = () => all("SELECT * FROM custom_content ORDER BY created_at DESC");
const addCustomContent = (gameType, category, difficulty, data) => {
  run("INSERT INTO custom_content (game_type,category,difficulty,data) VALUES (?,?,?,?)", [gameType, category, difficulty, JSON.stringify(data)]);
  return { id: lastId(), game_type: gameType, category, difficulty, data };
};
const deleteCustomContent = (id) => run("DELETE FROM custom_content WHERE id=?", [id]);

// Esclude segreti sensibili (chiavi API) dal backup scaricabile
const SECRET_SETTINGS = new Set(['anthropic_api_key']);
const exportAll = () => ({ settings:all("SELECT * FROM settings").filter(r => !SECRET_SETTINGS.has(r.key)), profiles:all("SELECT * FROM profiles"), category_scores:all("SELECT * FROM category_scores"), error_log:all("SELECT * FROM error_log"), spaced_repetition:all("SELECT * FROM spaced_repetition"), badges:all("SELECT * FROM badges"), custom_questions:all("SELECT * FROM custom_questions"), custom_content:all("SELECT * FROM custom_content") });

const importAll = (data) => {
  runRaw("BEGIN TRANSACTION");
  try {
    runRaw("DELETE FROM badges");
    runRaw("DELETE FROM spaced_repetition");
    runRaw("DELETE FROM error_log");
    runRaw("DELETE FROM category_scores");
    runRaw("DELETE FROM custom_questions");
    runRaw("DELETE FROM custom_content");
    runRaw("DELETE FROM profiles");
    runRaw("DELETE FROM settings");
    if (data.settings) for (const r of data.settings) runRaw("INSERT INTO settings (key,value) VALUES (?,?)", [r.key, r.value]);
    if (data.profiles) for (const r of data.profiles) runRaw("INSERT INTO profiles (id,name,avatar,color,xp,streak,best_streak,games_played,difficulty,questions_count,timer_seconds,answer_type,dyslexia_mode,large_text,uppercase_text,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [r.id,r.name,r.avatar,r.color,r.xp,r.streak,r.best_streak,r.games_played,r.difficulty,r.questions_count,r.timer_seconds,r.answer_type,r.dyslexia_mode,r.large_text,r.uppercase_text||0,r.created_at,r.updated_at]);
    if (data.category_scores) for (const r of data.category_scores) runRaw("INSERT INTO category_scores (profile_id,category,played,best_score) VALUES (?,?,?,?)", [r.profile_id,r.category,r.played,r.best_score]);
    if (data.error_log) for (const r of data.error_log) runRaw("INSERT INTO error_log (profile_id,category,question,user_answer,correct_answer,difficulty,created_at) VALUES (?,?,?,?,?,?,?)", [r.profile_id,r.category,r.question,r.user_answer,r.correct_answer,r.difficulty,r.created_at]);
    if (data.badges) for (const r of data.badges) runRaw("INSERT INTO badges (profile_id,badge_id,earned_at) VALUES (?,?,?)", [r.profile_id,r.badge_id,r.earned_at]);
    if (data.custom_questions) for (const r of data.custom_questions) runRaw("INSERT INTO custom_questions (category,question,answer,wrong_answers,hint,created_at) VALUES (?,?,?,?,?,?)", [r.category,r.question,r.answer,r.wrong_answers,r.hint,r.created_at]);
    if (data.custom_content) for (const r of data.custom_content) runRaw("INSERT INTO custom_content (game_type,category,difficulty,data,created_at) VALUES (?,?,?,?,?)", [r.game_type,r.category,r.difficulty,r.data,r.created_at]);
    runRaw("COMMIT");
    scheduleSave();
  } catch (e) {
    try { runRaw("ROLLBACK"); } catch (_) {}
    throw e;
  }
};

const getAdminStats = () => getProfiles().map(p => ({ ...getProfile(p.id), errorsByCategory: all("SELECT category, COUNT(*) as count FROM error_log WHERE profile_id=? GROUP BY category", [p.id]) }));

module.exports = { init, verifyPin, setAdminPin, getSetting, setSetting, getProfiles, getProfile, createProfile, updateProfile, deleteProfile, saveGameResult, logError, getErrors, getAllErrors, clearErrors, getDueReviews, updateReview, addBadge, updateStreak, getCustomQuestions, addCustomQuestion, deleteCustomQuestion, getCustomContent, getAllCustomContent, addCustomContent, deleteCustomContent, exportAll, importAll, getAdminStats, getTodayChallenge, completeDailyChallenge };
