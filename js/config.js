// ============================================================
// ICSD × 漢神洲際冒險 - 全域設定
// TSMC ICSD 部門年度團建活動 @ 台中漢神洲際購物廣場
// 主管 Simon (寶山玄彬) 帶隊
// ============================================================

const CONFIG = {
  EVENT_NAME: 'ICSD × 漢神洲際冒險',
  EVENT_SUBTITLE: 'Hanshin Adventure',
  EVENT_DEPT: 'TSMC ICSD',
  EVENT_LEADER: 'Simon',
  EVENT_LEADER_NICKNAME: '寶山玄彬',
  EVENT_DATE: '2026-05-29',
  EVENT_DATE_DISPLAY: '2026/5/29 (五)',
  EVENT_TIME: '13:00-18:00',
  EVENT_START_HOUR: 13,
  EVENT_END_HOUR: 18,
  VENUE: '台中漢神洲際購物廣場',
  VENUE_ADDRESS: '台中市北屯區崇德路三段865號',
  VENUE_PHONE: '04-22999988',
  VENUE_HOURS: '11:00-22:00',

  // === 後端選擇：'gas' 或 'cf' ===
  BACKEND: 'cf',

  // === Cloudflare Workers 設定（部署後填入） ===
  CF_URL: 'https://icsd-hanshin-api.funideas777.workers.dev',

  // === GAS 分流節點（部署後填入） ===
  // 部署方式：複製同一份 GAS 專案 N 次，全部綁同一份 Google Sheets
  API_URL: {
    READ_NODES: [
      // TODO: 部署完成後填入 N 個 Web App URL
      'https://script.google.com/macros/s/PLACEHOLDER_NODE_1/exec',
      'https://script.google.com/macros/s/PLACEHOLDER_NODE_2/exec',
      'https://script.google.com/macros/s/PLACEHOLDER_NODE_3/exec',
      'https://script.google.com/macros/s/PLACEHOLDER_NODE_4/exec',
      'https://script.google.com/macros/s/PLACEHOLDER_NODE_5/exec'
    ],
    WRITE: 'https://script.google.com/macros/s/PLACEHOLDER_WRITE/exec',
    PHOTO: 'https://script.google.com/macros/s/PLACEHOLDER_PHOTO/exec',
    ADMIN: 'https://script.google.com/macros/s/PLACEHOLDER_ADMIN/exec',
    READ:  'https://script.google.com/macros/s/PLACEHOLDER_NODE_1/exec'
  },

  // === 分流策略（300人規模啟用 5 節點） ===
  LOAD_BALANCE: {
    enabled: true,
    strategy: 'random-sticky',
    healthCheckInterval: 60000,
    failoverTimeout: 5000,
    maxRetries: 2,
    activeNodes: 5
  },

  // === 300人優化輪詢頻率 ===
  POLL_INTERVAL: {
    chat: { base: 15000, jitter: 5000 },
    chatWindow: 180000,
    broadcast: { base: 20000, jitter: 10000 },
    scoreboard: { base: 300000, jitter: 30000 },
    scoreboardCooldown: 60000,
    emergency: { base: 45000, jitter: 15000 },
    adminDashboard: { base: 8000, jitter: 2000 },
    photoStatus: { base: 8000, jitter: 2000 }
  },

  CACHE_TTL: {
    teams: 120000,
    scores: 60000,
    rankings: 60000,
    broadcasts: 10000,
    config: 300000,
    chat: 5000
  },

  GPS: {
    highAccuracy: true, maxAge: 5000, timeout: 15000,
    accuracyThreshold: 80,
    unlockRadius: 100,
    verifyRadius: 150
  },

  PHOTO: { maxWidth: 1024, quality: 0.7, maxSize: 800000 },

  // 漢神洲際購物廣場座標（台中北屯區）
  MAP_CENTER: { lat: 24.1849, lng: 120.6962 },

  // ========== 30 隊 (300 人 / 10 人一隊) ==========
  // 主題：晶圓 × 漢神品牌 × 台中元素
  TEAMS: (() => {
    const names = [
      // 晶圓系列 (10隊)
      ['晶圓','💎'],['光刻','✨'],['蝕刻','⚡'],['封測','📦'],['良率','📈'],
      ['奈米','🔬'],['銅線','🪙'],['矽谷','🌟'],['EUV','🌈'],['先進','🚀'],
      // 漢神品牌系列 (10隊)
      ['島語','🍱'],['名人坊','🥢'],['上海包','🥟'],['尚屋','🥩'],['NARA','🍛'],
      ['LOPIA','🛒'],['星巴克','☕'],['UNIQLO','👕'],['布娜飛','🍾'],['天際營','🏕️'],
      // 台中地標系列 (10隊)
      ['洲際','⚾'],['歌劇院','🎭'],['彩虹村','🎨'],['逢甲','🌃'],['日月潭','🏞️'],
      ['谷關','♨️'],['高美','🌅'],['大甲','🛕'],['東海','⛪'],['寶山','🏔️']
    ];
    return names.map((n, i) => ({ id: i + 1, name: n[0] + '隊', emoji: n[1] }));
  })(),

  // ========== 樓層定義（漢神洲際 7 層） ==========
  FLOORS: [
    { id: 'B1F', name: 'B1 LOPIA 美食街', icon: '🍱' },
    { id: '1F',  name: '1F 閃耀經典館', icon: '💎' },
    { id: '2F',  name: '2F 國際時尚區', icon: '👗' },
    { id: '3F',  name: '3F 流行生活', icon: '🛍️' },
    { id: '4F',  name: '4F 童趣家居', icon: '🏠' },
    { id: '5F',  name: '5F 米其林餐廳', icon: '🍽️' },
    { id: '6F',  name: '6F 娛樂酒吧', icon: '🎮' }
  ],

  // ========== 12 款遊戲 (覆蓋 7 層) ==========
  // 視覺已重新設計，貼合 TSMC × 漢神 × 台中主題
  GAMES: [
    // B1F - 美食街
    { id: 'catch', name: '美食快遞', icon: '🍱', floor: 'B1F',
      description: '在 LOPIA 美食街接住即時餐點，避開過期食材！每回合速度加快',
      duration: 60, threshold: 150, color: '#E94560', hasRounds: true,
      location: { lat: 24.18495, lng: 120.69620 },
      themeAssets: { hero: 'food-courier', primary: '#E94560', accent: '#FFD740' } },
    { id: 'whack', name: '打福袋大師', icon: '🎁', floor: 'B1F',
      description: '快狠準擊中漢神福袋拿好禮！每回合出現更快更多',
      duration: 45, threshold: 150, color: '#FFB300', hasRounds: true,
      location: { lat: 24.18497, lng: 120.69625 },
      themeAssets: { hero: 'lucky-bag', primary: '#C2185B', accent: '#FFD740' } },
    // 1F - 閃耀經典
    { id: 'memory', name: '經典精品配對', icon: '💎', floor: '1F',
      description: '翻開卡片配對閃耀經典精品 LOGO，每回合卡片增加',
      duration: 90, threshold: 150, color: '#9C27B0', hasRounds: true,
      location: { lat: 24.18490, lng: 120.69615 },
      themeAssets: { hero: 'luxury-cards', primary: '#9C27B0', accent: '#FFD740' } },
    { id: 'reaction', name: '色彩極速', icon: '🎨', floor: '1F',
      description: '史特魯普色彩反應！只點擊「字色不符」的精品色塊',
      duration: 45, threshold: 100, color: '#E91E63', hasRounds: true,
      location: { lat: 24.18492, lng: 120.69618 },
      themeAssets: { hero: 'color-burst', primary: '#E91E63', accent: '#00BCD4' } },
    // 2F - 國際時尚
    { id: 'snake', name: '時尚連線', icon: '🧵', floor: '2F',
      description: '穿越 ZARA & UNIQLO 收集時尚單品越長越好！破關後速度提高',
      duration: 60, threshold: 200, color: '#1976D2', hasRounds: true,
      location: { lat: 24.18493, lng: 120.69622 },
      themeAssets: { hero: 'fashion-line', primary: '#1976D2', accent: '#FFB300' } },
    { id: 'puzzle', name: '時尚拼版', icon: '🧩', floor: '2F',
      description: '滑動拼塊還原當季 LOOK BOOK！每回合格數增加',
      duration: 120, threshold: 100, color: '#009688', hasRounds: true,
      location: { lat: 24.18495, lng: 120.69624 },
      themeAssets: { hero: 'lookbook-puzzle', primary: '#009688', accent: '#FF6F00' } },
    // 3F - 流行生活
    { id: 'pacman', name: '晶圓巡禮', icon: '👾', floor: '3F',
      description: '吃掉所有奈米點，躲避雜質粒子！破關後雜質加速進入下一關',
      duration: 60, threshold: 200, color: '#00BCD4', hasRounds: true,
      location: { lat: 24.18496, lng: 120.69620 },
      themeAssets: { hero: 'wafer-roam', primary: '#00BCD4', accent: '#7C4DFF' } },
    { id: 'rhythm', name: '節奏台中', icon: '🎵', floor: '3F',
      description: '跟著台中歌劇院旋律敲出節拍！破關後從 2 軌升級到 3 軌',
      duration: 60, threshold: 100, color: '#673AB7', hasRounds: true,
      location: { lat: 24.18494, lng: 120.69625 },
      themeAssets: { hero: 'opera-rhythm', primary: '#673AB7', accent: '#FFB300' } },
    // 4F - 童趣家居
    { id: 'breaker', name: '良率挑戰', icon: '🧱', floor: '4F',
      description: '彈板反彈光束擊破瑕疵晶粒！每關瑕疵磚塊增加',
      duration: 90, threshold: 150, color: '#0288D1', hasRounds: true,
      location: { lat: 24.18491, lng: 120.69619 },
      themeAssets: { hero: 'yield-blocks', primary: '#0288D1', accent: '#FFD740' } },
    { id: 'dodge', name: '製程接力', icon: '💎', floor: '4F',
      description: 'TSMC 晶圓製程模擬：把晶圓依序送進清洗→光刻→蝕刻→封測！',
      duration: 60, threshold: 100, color: '#00ACC1', hasRounds: true,
      location: { lat: 24.18497, lng: 120.69623 },
      themeAssets: { hero: 'process-relay', primary: '#00ACC1', accent: '#FF6F00' } },
    // 5F - 米其林餐廳
    { id: 'quiz', name: 'ICSD 知識王', icon: '🧠', floor: '5F',
      description: 'ICSD × 漢神 × 台中限時答題！答錯扣命挑戰最高連對',
      duration: 60, threshold: 100, color: '#1A237E', hasRounds: true,
      location: { lat: 24.18493, lng: 120.69617 },
      themeAssets: { hero: 'icsd-quiz', primary: '#1A237E', accent: '#FFD740' } },
    { id: 'shooter', name: '雷射對位', icon: '🎯', floor: '5F',
      description: 'EUV 光刻對位挑戰！按住瞄準鎖定移動晶粒，連續 3 發落空扣命',
      duration: 45, threshold: 150, color: '#F44336', hasRounds: true,
      location: { lat: 24.18495, lng: 120.69619 },
      themeAssets: { hero: 'euv-shooter', primary: '#F44336', accent: '#00E5FF' } },
    // 6F - 娛樂與餐飲（拍照）
    { id: 'photo', name: '寶山玄彬合照', icon: '📸', floor: '6F',
      type: 'photo',
      description: '在 6F 娛樂區與 Simon (寶山玄彬) 主管或主管立牌合照上傳！',
      points: 300, color: '#FF9800', hasRounds: false,
      location: { lat: 24.18496, lng: 120.69624 },
      themeAssets: { hero: 'simon-photo', primary: '#FF9800', accent: '#1A237E' } }
  ],

  // ========== 冒險任務（料理 + 合照） ==========
  ADVENTURE_TASKS: [
    // --- 5 款料理小遊戲（完成遊戲 + 漢神消費拍照 = 250分） ---
    { id: 'cook-boba', name: '台中珍奶', icon: '🧋', type: 'cooking',
      description: '煮黑糖珍珠、沖紅茶、加奶、攪拌——做一杯台中發源的珍珠奶茶！',
      ingredients: ['黑糖珍珠', '鮮奶', '台灣紅茶', '冰塊'],
      dish: '黑糖珍奶', dishEmoji: '🧋',
      photoTask: '前往 B1 LOPIA 或 2F 星巴克購買飲料，與飲料合照打卡',
      teamPoints: 250, duration: 60, threshold: 200, color: '#8D6E63',
      location: { lat: 24.18494, lng: 120.69620 } },
    { id: 'cook-beef', name: '上海湯包', icon: '🥟', type: 'cooking',
      description: '和餡、擀皮、包湯、蒸籠、沾醋——還原漢來上海湯包的招牌！',
      ingredients: ['豬肉餡', '高湯凍', '薄皮', '薑絲', '鎮江醋'],
      dish: '上海湯包', dishEmoji: '🥟',
      photoTask: '前往 B1 漢來上海湯包享用，與湯包合照打卡',
      teamPoints: 250, duration: 60, threshold: 200, color: '#D84315',
      location: { lat: 24.18495, lng: 120.69622 } },
    { id: 'cook-dumpling', name: '尚屋韓烤', icon: '🥩', type: 'cooking',
      description: '醃肉、鋪盤、烤肉、夾葉、沾醬——體驗 6F 屋馬尚屋韓式烤肉！',
      ingredients: ['五花肉', '韓式生菜', '泡菜', '韓式醬', '蒜片'],
      dish: '韓式烤肉', dishEmoji: '🥩',
      photoTask: '前往 6F 屋馬尚屋或同層餐廳用餐，與烤肉合照打卡',
      teamPoints: 250, duration: 60, threshold: 200, color: '#C62828',
      location: { lat: 24.18497, lng: 120.69625 } },
    { id: 'cook-shaved', name: '島語甜品', icon: '🍧', type: 'cooking',
      description: '刨冰、堆山、淋醬、擺盤——製作島語自助餐人氣甜品！',
      ingredients: ['芒果', '煉乳', '雪花冰', '芋圓', '紅豆'],
      dish: '島語芒果冰', dishEmoji: '🍧',
      photoTask: '前往 1F~5F 任一甜品店或飲品店購買，與甜品合照打卡',
      teamPoints: 250, duration: 60, threshold: 200, color: '#FFB300',
      location: { lat: 24.18493, lng: 120.69618 } },
    { id: 'cook-cake', name: '台中太陽餅', icon: '🍪', type: 'cooking',
      description: '揉麵、包麥芽糖餡、壓模、烘烤——做一盒台中名物太陽餅！',
      ingredients: ['麥芽糖餡', '奶油', '麵粉', '蛋黃', '糖粉'],
      dish: '太陽餅', dishEmoji: '🍪',
      photoTask: '前往 B1 烘焙或 5F 餐廳購買糕點，與點心合照打卡',
      teamPoints: 250, duration: 60, threshold: 200, color: '#A1887F',
      location: { lat: 24.18496, lng: 120.69619 } },
    // --- 3 景點打卡任務 ---
    { id: 'photo-heart', name: '漢神大愛心', icon: '💕', type: 'group-photo',
      description: '全隊至少 8 人在 1F 中庭，比出大愛心一起拍照！',
      condition: '至少 8 人一起比出大愛心',
      teamPoints: 250, color: '#E91E63',
      location: { lat: 24.18494, lng: 120.69620 } },
    { id: 'photo-jump', name: '飛躍洲際', icon: '🦸', type: 'group-photo',
      description: '全隊在漢神洲際門口或洲際棒球場前，一起跳躍拍出騰空照！',
      condition: '全隊成員一起跳躍，拍出騰空效果',
      teamPoints: 250, color: '#1976D2',
      location: { lat: 24.18490, lng: 120.69615 } },
    { id: 'photo-pyramid', name: '寶山金字塔', icon: '🏛️', type: 'group-photo',
      description: '全隊到 6F 娛樂區或天際營地，疊出人體金字塔或排出 ICSD 字樣！',
      condition: '全隊排出創意隊形（金字塔、ICSD 字樣等）',
      teamPoints: 250, color: '#1A237E',
      location: { lat: 24.18498, lng: 120.69624 } }
  ],

  // 團隊加分規則（前5名）
  TEAM_BONUS: [800, 600, 400, 300, 200],

  // ========== 緊急任務 ==========
  EMERGENCY_TASKS: [
    { id: 'emergency-1', name: '寶山召集令',  icon: '⚡',
      description: '全隊到 1F 中庭集合，由 Simon 親自點名拍合照上傳！',
      points: 500, triggerTime: '14:30', active: false },
    { id: 'emergency-2', name: '玄彬密語',    icon: '🧠',
      description: '前往 5F 服務台找關主領取謎題，破解後出示答案即可過關！',
      points: 300, triggerTime: '15:30', active: false },
    { id: 'emergency-3', name: '漢神尋寶',    icon: '🎁',
      description: '在 B1 LOPIA 找到隱藏的「ICSD × 漢神」貼紙，拍照上傳獲得獎勵！',
      points: 400, triggerTime: '16:30', active: false }
  ],

  // ========== 問答題庫（ICSD × 漢神 × 台中 × 半導體） ==========
  QUIZ_QUESTIONS: [
    // ICSD × TSMC
    { q: '台積電的英文縮寫是？', options: ['TSMC', 'TMSC', 'TSPC', 'TCMS'], answer: 0 },
    { q: '台積電總部位於哪個城市？', options: ['台北', '桃園', '新竹', '台中'], answer: 2 },
    { q: '台積電的創辦人是誰？', options: ['郭台銘', '張忠謀', '林百里', '施振榮'], answer: 1 },
    { q: '台積電成立於哪一年？', options: ['1980', '1987', '1991', '1995'], answer: 1 },
    { q: '寶山是台積電哪個製程的重點廠區？', options: ['28nm', '12nm', '7nm', '2nm/CoWoS'], answer: 3 },
    { q: '台積電目前最先進量產製程節點？', options: ['7nm', '5nm', '3nm', '2nm'], answer: 3 },
    { q: 'EUV 光刻技術中 EUV 是？', options: ['超紫外光', '極紫外光', '遠紫外光', '近紫外光'], answer: 1 },
    { q: '半導體製程中 nm 代表？', options: ['毫米', '微米', '奈米', '皮米'], answer: 2 },
    { q: '半導體的基本材料？', options: ['銅', '鋁', '矽', '鐵'], answer: 2 },
    { q: '晶圓標準尺寸為幾吋？', options: ['6吋', '8吋', '12吋', '16吋'], answer: 2 },
    { q: '摩爾定律預測電晶體密度幾年翻一倍？', options: ['1年', '18個月', '3年', '5年'], answer: 1 },
    { q: 'IC 設計公司不擁有工廠稱為？', options: ['IDM', 'Fabless', 'Foundry', 'OSAT'], answer: 1 },
    { q: '台積電的商業模式是？', options: ['IDM', 'Fabless', '晶圓代工', 'IC設計'], answer: 2 },
    { q: 'Apple A 系列晶片由誰代工？', options: ['三星', '台積電', '英特爾', '高通'], answer: 1 },
    { q: 'NVIDIA 高階 GPU 主要由誰代工？', options: ['三星', '台積電', '英特爾', '中芯'], answer: 1 },
    { q: 'CoWoS 是哪一種封裝？', options: ['打線封裝', '覆晶封裝', '先進 2.5D/3D 封裝', '塑封封裝'], answer: 2 },
    { q: '半導體製造的第一步通常是？', options: ['蝕刻', '氧化', '晶圓清洗', '封裝'], answer: 2 },
    { q: '半導體製程「光刻」的英文是？', options: ['Etching', 'Lithography', 'Doping', 'Deposition'], answer: 1 },
    { q: '半導體「封裝」的英文是？', options: ['Testing', 'Packaging', 'Bonding', 'Assembly'], answer: 1 },
    // 漢神洲際
    { q: '漢神洲際購物廣場開幕日期？', options: ['2025/12/12', '2026/04/10', '2026/05/29', '2026/07/01'], answer: 1 },
    { q: '漢神洲際位於台中哪個區？', options: ['西屯區', '北屯區', '南屯區', '中區'], answer: 1 },
    { q: '漢神洲際的地下幾層？', options: ['B1', 'B2', 'B3', 'B4'], answer: 3 },
    { q: '漢神洲際 B1 主要進駐的日系超市是？', options: ['唐吉訶德', 'LOPIA', 'AEON', 'OK MART'], answer: 1 },
    { q: '漢神洲際 5F 主題定位？', options: ['電影院', '兒童區', '米其林餐廳', '健身房'], answer: 2 },
    { q: '漢神洲際 6F 進駐的韓式烤肉品牌？', options: ['姜虎東', '尚屋', '新麻蒲', '草飯床'], answer: 1 },
    { q: '漢神洲際機車停車？', options: ['$30/小時', '$50/小時', '免費', '需預約'], answer: 2 },
    { q: '漢神洲際旁的棒球場是？', options: ['台中洲際棒球場', '澄清湖', '新莊棒球場', '台南棒球場'], answer: 0 },
    { q: '漢神洲際 1F 主題？', options: ['美食街', '閃耀經典館', '兒童樂園', '電器'], answer: 1 },
    { q: '漢神洲際 2F 進駐的快時尚？', options: ['H&M', 'GU', 'ZARA & UNIQLO', 'GAP'], answer: 2 },
    // 台中地標
    { q: '台中歌劇院由哪位建築師設計？', options: ['安藤忠雄', '伊東豊雄', '隈研吾', '貝聿銘'], answer: 1 },
    { q: '台中最熱鬧的夜市是？', options: ['士林', '逢甲', '饒河', '六合'], answer: 1 },
    { q: '日月潭位於哪個縣市？', options: ['嘉義縣', '南投縣', '花蓮縣', '台中市'], answer: 1 },
    { q: '台中名物太陽餅內餡主要是？', options: ['鳳梨醬', '麥芽糖', '紅豆', '芋頭'], answer: 1 },
    { q: '高美濕地以什麼景觀聞名？', options: ['夕陽', '螢火蟲', '雪景', '極光'], answer: 0 },
    { q: '彩虹眷村位於台中哪個區？', options: ['南屯區', '西屯區', '北屯區', '中區'], answer: 0 },
    { q: '珍珠奶茶起源於台灣哪個城市？', options: ['台北', '台中', '台南', '高雄'], answer: 1 },
    { q: '台中國家歌劇院位於哪個區？', options: ['北屯區', '西屯區', '南屯區', '北區'], answer: 1 },
    { q: '大甲鎮瀾宮主祀？', options: ['關聖帝君', '媽祖', '保生大帝', '土地公'], answer: 1 },
    { q: '台中的市花是？', options: ['杜鵑', '梅花', '山櫻', '茶花'], answer: 0 },
    // 台灣基本
    { q: '台灣最高的建築物？', options: ['台北101', '高雄85', '新光三越', '圓山大飯店'], answer: 0 },
    { q: '台灣國花？', options: ['櫻花', '梅花', '蓮花', '菊花'], answer: 1 },
    { q: '台灣有幾個直轄市？', options: ['4個', '5個', '6個', '7個'], answer: 2 },
    { q: '台灣最長的河流？', options: ['大甲溪', '濁水溪', '淡水河', '高屏溪'], answer: 1 },
    { q: '台灣面積最大的縣市？', options: ['花蓮縣', '南投縣', '台東縣', '屏東縣'], answer: 0 },
    { q: '玉山的海拔約幾公尺？', options: ['2952', '3492', '3952', '4952'], answer: 2 },
    { q: '太魯閣以什麼地形聞名？', options: ['火山', '峽谷', '沙漠', '草原'], answer: 1 },
    { q: '台灣的貨幣？', options: ['日圓', '美元', '新台幣', '人民幣'], answer: 2 },
    { q: '故宮博物院位於？', options: ['台北', '台中', '台南', '高雄'], answer: 0 },
    { q: '台灣第一座國家公園？', options: ['太魯閣', '墾丁', '玉山', '陽明山'], answer: 1 },
    // 趣味/勵志
    { q: 'Simon 主管的暱稱是？', options: ['新竹元彬', '寶山玄彬', '北屯小生', '科技玄彬'], answer: 1 },
    { q: '本次活動主題月份？', options: ['四月', '五月', '六月', '七月'], answer: 1 },
    { q: 'ICSD 此次部門 outing 場地？', options: ['新光三越', '大江購物中心', '漢神洲際', '勤美誠品'], answer: 2 }
  ]
};

// ============================================================
// TEST MODE
// ============================================================
const TEST_MODE = (function() {
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.has('prod')) return false;
    if (params.has('test')) return true;
    var ls = localStorage.getItem('testMode');
    if (ls === 'off') return false;
    if (ls === 'on') return true;
    return true;
  } catch(e) { return true; }
})();
if (TEST_MODE) { try { console.info('%c🧪 TEST MODE ON', 'background:#1A237E;color:white;padding:2px 8px;border-radius:4px;font-weight:bold;'); } catch(e) {} }

// ============================================================
// 工具函式
// ============================================================
function getTeamById(id) { return CONFIG.TEAMS.find(t => t.id === parseInt(id)); }
function getGameById(id) {
  var g = CONFIG.GAMES.find(function(g) { return g.id === id; });
  if (g) return g;
  var a = CONFIG.ADVENTURE_TASKS.find(function(t) { return t.id === id; });
  if (a) return a;
  return null;
}
function getFloorGames(floorId) { return CONFIG.GAMES.filter(g => g.floor === floorId); }
function getAdventureTask(id) { return CONFIG.ADVENTURE_TASKS.find(function(t) { return t.id === id; }); }
