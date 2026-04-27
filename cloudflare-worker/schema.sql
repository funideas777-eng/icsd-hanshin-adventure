-- ============================================================
-- MetroWalk Adventure - D1 Database Schema
-- 對應 Google Sheets 10 張分頁 → 10 張 SQL 表
-- ============================================================

-- 60 組隊伍
CREATE TABLE IF NOT EXISTS Teams (
  teamId INTEGER PRIMARY KEY,
  teamName TEXT NOT NULL,
  teamEmoji TEXT NOT NULL,
  totalPoints INTEGER DEFAULT 0
);

-- 玩家註冊
CREATE TABLE IF NOT EXISTS Players (
  playerId TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  teamId INTEGER NOT NULL,
  registeredAt TEXT NOT NULL,
  FOREIGN KEY (teamId) REFERENCES Teams(teamId)
);
CREATE INDEX IF NOT EXISTS idx_players_team ON Players(teamId);

-- 遊戲分數
CREATE TABLE IF NOT EXISTS GameScores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  playerId TEXT NOT NULL,
  playerName TEXT NOT NULL,
  teamId INTEGER NOT NULL,
  gameId TEXT NOT NULL,
  score INTEGER NOT NULL,
  timestamp TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_scores_game ON GameScores(gameId, score DESC);
CREATE INDEX IF NOT EXISTS idx_scores_player ON GameScores(playerId, gameId);
CREATE INDEX IF NOT EXISTS idx_scores_team ON GameScores(teamId, gameId);

-- GPS 遊戲解鎖
CREATE TABLE IF NOT EXISTS GameUnlocks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  playerId TEXT NOT NULL,
  gameId TEXT NOT NULL,
  unlockedAt TEXT NOT NULL,
  lat REAL,
  lng REAL
);
CREATE INDEX IF NOT EXISTS idx_unlocks_player ON GameUnlocks(playerId);

-- 團隊加分紀錄
CREATE TABLE IF NOT EXISTS TeamPoints (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  teamId INTEGER NOT NULL,
  source TEXT NOT NULL,
  points INTEGER NOT NULL,
  detail TEXT,
  timestamp TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_teampoints_team ON TeamPoints(teamId);
CREATE INDEX IF NOT EXISTS idx_teampoints_source ON TeamPoints(source);

-- 廣播訊息
CREATE TABLE IF NOT EXISTS Broadcasts (
  broadcastId INTEGER PRIMARY KEY,
  type TEXT DEFAULT 'text',
  content TEXT NOT NULL,
  timestamp TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_broadcasts_time ON Broadcasts(timestamp);

-- 系統設定
CREATE TABLE IF NOT EXISTS Config (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- 聊天訊息
CREATE TABLE IF NOT EXISTS Chat (
  msgId INTEGER PRIMARY KEY,
  channel TEXT NOT NULL,
  teamId INTEGER NOT NULL,
  playerId TEXT NOT NULL,
  playerName TEXT NOT NULL,
  teamName TEXT,
  teamEmoji TEXT,
  content TEXT NOT NULL,
  timestamp TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_chat_channel ON Chat(channel, timestamp);
CREATE INDEX IF NOT EXISTS idx_chat_team ON Chat(channel, teamId, timestamp);

-- 玩家位置
CREATE TABLE IF NOT EXISTS PlayerLocations (
  playerId TEXT PRIMARY KEY,
  playerName TEXT NOT NULL,
  teamId INTEGER NOT NULL,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  timestamp TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_locations_team ON PlayerLocations(teamId);

-- 照片任務
CREATE TABLE IF NOT EXISTS PhotoTasks (
  submissionId TEXT PRIMARY KEY,
  playerId TEXT NOT NULL,
  playerName TEXT NOT NULL,
  teamId INTEGER NOT NULL,
  gameId TEXT DEFAULT 'photo',
  photoUrl TEXT,
  status TEXT DEFAULT 'pending',
  submittedAt TEXT NOT NULL,
  verifiedAt TEXT
);
CREATE INDEX IF NOT EXISTS idx_photos_status ON PhotoTasks(status);
CREATE INDEX IF NOT EXISTS idx_photos_player ON PhotoTasks(playerId, gameId);

-- 審計日誌
CREATE TABLE IF NOT EXISTS AuditLog (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT,
  ip TEXT
);
CREATE INDEX IF NOT EXISTS idx_audit_time ON AuditLog(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_action ON AuditLog(action);

-- ============================================================
-- 初始化 30 隊（對應 ICSD × 漢神洲際冒險）
-- 主題：晶圓 / 漢神品牌 / 台中地標
-- ============================================================
INSERT OR IGNORE INTO Teams (teamId, teamName, teamEmoji, totalPoints) VALUES
-- 晶圓系列 (10隊)
(1,'晶圓隊','💎',0),(2,'光刻隊','✨',0),(3,'蝕刻隊','⚡',0),(4,'封測隊','📦',0),(5,'良率隊','📈',0),
(6,'奈米隊','🔬',0),(7,'銅線隊','🪙',0),(8,'矽谷隊','🌟',0),(9,'EUV隊','🌈',0),(10,'先進隊','🚀',0),
-- 漢神品牌系列 (10隊)
(11,'島語隊','🍱',0),(12,'名人坊隊','🥢',0),(13,'上海包隊','🥟',0),(14,'尚屋隊','🥩',0),(15,'NARA隊','🍛',0),
(16,'LOPIA隊','🛒',0),(17,'星巴克隊','☕',0),(18,'UNIQLO隊','👕',0),(19,'布娜飛隊','🍾',0),(20,'天際營隊','🏕️',0),
-- 台中地標系列 (10隊)
(21,'洲際隊','⚾',0),(22,'歌劇院隊','🎭',0),(23,'彩虹村隊','🎨',0),(24,'逢甲隊','🌃',0),(25,'日月潭隊','🏞️',0),
(26,'谷關隊','♨️',0),(27,'高美隊','🌅',0),(28,'大甲隊','🛕',0),(29,'東海隊','⛪',0),(30,'寶山隊','🏔️',0);
