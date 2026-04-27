# Grok Image Generation Prompts — ICSD × 漢神洲際冒險

> 用於 Grok（grok.com / X）、Midjourney、Imagen 3、Stable Diffusion 等圖像模型。
> 共 14 組提示詞，涵蓋封面 / 主管吉祥物 / 樓層 / 遊戲徽章 / 完賽勳章。
> 每組附「自檢表」(self-check)：生成後應比對是否符合 5 項條件。

---

## 通用指引（請於每張圖片前都附上）

```
Style guide for ALL images in this batch:
- Color palette: deep night blue (#050b22) base, TSMC engineering blue (#1A237E) primary,
  Hanshin luxury gold (#FFB300, #FFD740) accent, emerald wafer green (#00C896) highlight.
- Mood: premium retail meets semiconductor fab. Polished, high-tech, slightly cinematic.
- Avoid: cartoonish chibi, low-poly, generic stock-photo people, garish rainbow gradients,
  any visible Western brand logos, any visible person resembling a real public figure.
- Aspect ratio noted per image. Vector / flat-illustration unless photo is required.
- Text in image: prefer minimal English / Mandarin only when explicitly requested.
```

---

## 1. Hero Cover Banner（登入頁 + 排行榜頂部）
**Aspect**: 16:9, 1920×1080
**Use**: `index.html` glow background, `scoreboard.html` top hero

```
A cinematic hero illustration that fuses three worlds:
(1) the silhouette of Taichung's National Theater curves and the Intercontinental
    baseball stadium at twilight; (2) a glowing 12-inch silicon wafer with circuit
    traces forming the skyline of a 7-floor luxury department store; (3) gentle
    floating golden particles like champagne bubbles. Color palette: deep night
    blue base #050b22, dominant TSMC engineering blue #1A237E gradient, Hanshin
    gold #FFB300 light accents, subtle emerald #00C896 wafer ring. The phrase
    "ICSD × 漢神洲際冒險" is engraved in elegant gold sans-serif at the top
    center; smaller subtitle "Hanshin Adventure · 2026.05.29" beneath. No
    cartoon characters. Premium tech-luxury poster, ultra-detailed, 8K, no logos.
```

**Self-check** ✅
- [ ] 含台中地標輪廓（歌劇院曲線 / 洲際棒球場）
- [ ] 顯示 12 吋晶圓元素
- [ ] 主色為 TSMC 藍 + 漢神金
- [ ] 含中文標題「ICSD × 漢神洲際冒險」+ 日期
- [ ] 無真人臉、無第三方品牌 logo

---

## 2. Simon「寶山玄彬」吉祥物 — 主視覺
**Aspect**: 1:1, 1024×1024
**Use**: `info.html` 主管卡 / `game.html` Simon avatar

```
A stylized vector mascot of a confident male manager nicknamed "Baoshan Hyun-bin"
(寶山玄彬). He has clean K-pop-inspired styling — neat short black hair, sharp
jawline, rectangular thin glasses optional, mid-30s, charismatic but warm smile.
Wears a deep navy slim-cut suit (#1A237E) with a thin gold tie clip and a
small Hanshin gold lapel pin shaped like a silicon wafer (#FFB300). Holding
a tablet displaying a glowing yield curve. Background: a stylized wafer-grid
halo with golden particles. Bust-up portrait, 3/4 view, flat illustration with
soft cel-shading. NOT photo-real, NOT a real-person likeness — generic Asian
animated character. Centered composition, transparent background.
```

**Self-check** ✅
- [ ] 角色是 stylized 動畫角色（非真人）
- [ ] 深藍西裝 + 金色領帶夾 + 晶圓徽章
- [ ] 表情自信、有領袖魅力
- [ ] 背景含晶圓格紋
- [ ] 透明背景或可去背

---

## 3. Simon 表情貼紙包（6 連張，遊戲互動用）
**Aspect**: 1:1 each, generate as 1 grid 1024×1024 with 6 cells

```
Six stylized cel-shaded emoji-style stickers of the same character "Baoshan
Hyun-bin" (a stylized male manager in a navy suit with a gold wafer pin),
arranged in a 3×2 grid with thin gold dividers. Expressions left-to-right,
top-to-bottom: (1) thumbs-up confident smile (success); (2) winking with a
finger gun (encouragement); (3) thoughtful chin-stroking (thinking);
(4) face-palm with a kind smile (oops/fail); (5) holding a small trophy with
sparkles (champion); (6) raising a champagne glass (celebration). Flat vector
illustration, deep navy and Hanshin gold, transparent background, no text.
```

**Self-check** ✅
- [ ] 6 格表情：成功 / 鼓勵 / 思考 / 失敗 / 冠軍 / 慶祝
- [ ] 角色一致（同樣的西裝、髮型）
- [ ] 透明背景
- [ ] 風格與第 2 張一致
- [ ] 無文字

---

## 4. 樓層導覽縮圖 × 7（B1, 1F, 2F, 3F, 4F, 5F, 6F）
**Aspect**: 4:3 each, generate as a single grid 1600×1200 (3+3+1 layout)
**Use**: `info.html` 樓層卡片背景

```
Seven small vector illustration thumbnails representing each floor of Hanshin
Intercontinental Mall, Taichung. Common style: flat illustration, isometric or
3/4 cutaway view, deep navy outlines on warm gold backgrounds, no text labels.

(1) B1 LOPIA Food Hall — Japanese supermarket aisle with bento, sushi tray,
    bread loaf, and golden basket; bowl of Hanlai xiaolongbao on the side.
(2) 1F Luxury Hall — chandelier and mirrored cosmetics counter with perfume
    bottle and a champagne flute; subtle Hanshin red velvet rope.
(3) 2F International Fashion — Mannequins wearing minimalist outfits next to
    a coffee bar; a fitting room curtain in gold.
(4) 3F Trend Lifestyle — Modern lounge with sneakers, accessories shelf,
    and a small DJ booth in the back.
(5) 4F Kid & Home — A pastel-tone kids playroom with toys and a cozy sofa
    arrangement.
(6) 5F Michelin Restaurants — Plated fine-dining dishes (small Asian fusion),
    candles, and a curtained private dining room silhouette.
(7) 6F Entertainment & Bar — Korean BBQ table with smokeless grill, a sports
    pub TV, and bar shelf with golden bottles.

Each thumbnail in a 4:3 box with a thin gold border. Color palette stays:
navy #1A237E + gold #FFB300 + ivory + small accents per floor.
```

**Self-check** ✅
- [ ] 7 個縮圖樓層內容對應正確（B1 LOPIA / 1F 精品 …）
- [ ] 風格統一（同樣 navy + gold）
- [ ] 無文字
- [ ] 4:3 比例 + 金色細邊框
- [ ] 不含真實品牌 logo

---

## 5. 遊戲徽章 × 12（小遊戲）
**Aspect**: 1:1, 512×512 each, ideally 12 images in 4×3 grid

```
Twelve circular game badges in the same flat vector style. Each badge is a
70mm circle with a thin gold border (#FFB300), a navy gradient background
(#1A237E → #0E1862), a single bold central icon, and a small "ICSD" monogram
at the bottom edge.

Badges in order:
(1) 🍱 美食快遞 — bento + speed lines.
(2) 🎁 打福袋大師 — Hanshin gold lucky bag with red knot.
(3) 💎 經典精品配對 — 4 luxury icons (handbag/perfume/lipstick/diamond).
(4) 🎨 色彩極速 — color wheel with stroop-effect typography (Chinese for "紅"
    rendered in green for visual joke).
(5) 🧵 時尚連線 — gold thread looping into a snake shape with fashion icons.
(6) 🧩 時尚拼版 — slide-puzzle showing a fashion lookbook silhouette.
(7) 👾 晶圓巡禮 — silicon wafer with maze pattern + tiny pacman-style dots
    (no Pacman copyright character, abstract original).
(8) 🎵 節奏台中 — 3 musical notes overlapping the curve of Taichung Opera House.
(9) 🧱 良率挑戰 — bouncy ball cracking defective wafer dies.
(10) 💎 製程接力 — 4 stations (clean / litho / etch / package) connected by
    a glowing yellow arrow.
(11) 🧠 ICSD 知識王 — brain made of circuit traces.
(12) 🎯 雷射對位 — concentric target with EUV laser line.

All in the same flat vector style, navy + gold + small color accent per game.
NO text on the badges except the "ICSD" monogram.
```

**Self-check** ✅
- [ ] 12 個徽章一致圓形 + 金邊
- [ ] 主色 navy + gold，僅小色點區別
- [ ] 圖示貼合各遊戲主題
- [ ] 含 "ICSD" 小字
- [ ] 不含 Pacman 等版權角色

---

## 6. 料理任務徽章 × 5
**Aspect**: 1:1, 512×512 each, 5 images in 5×1 strip

```
Five rectangular food badges (3:4 cards), each illustrated in flat vector with
a hand-painted texture overlay. Card frame: navy + gold trim. Subtitle area
at bottom shows the dish name in Chinese gold serif.

(1) 台中珍奶 — Glass tumbler of brown sugar boba milk tea with caramel drizzle,
    Taichung-skyline silhouette behind.
(2) 上海湯包 — Steamer basket with 8 dumplings, chopsticks lifting one revealing
    soup; Hanlai brand-style red lattice background (no logo).
(3) 尚屋韓烤 — Sizzling table grill with marbled pork belly and lettuce wrap,
    smoke curling.
(4) 島語甜品 — Mango shaved ice mountain with condensed milk drizzle and taro
    balls; bright sunny vibe.
(5) 台中太陽餅 — Stack of three round sun cakes, top one cut to show malt-syrup
    filling; Taichung sun-ray emblem behind.

Cohesive flat-vector style, navy + gold frame, no text other than dish title.
```

**Self-check** ✅
- [ ] 5 個料理徽章對應：珍奶 / 湯包 / 韓烤 / 芒果冰 / 太陽餅
- [ ] 風格一致 navy + gold 邊框
- [ ] 含菜名中文字
- [ ] 無真實品牌 logo
- [ ] 食物質感誘人

---

## 7. 合照任務徽章 × 3
**Aspect**: 1:1, 512×512 each

```
Three flat vector group-photo task badges, navy + gold frame:

(1) 漢神大愛心 — Eight stylized silhouettes forming a heart with their arms,
    confetti, gold particles.
(2) 飛躍洲際 — Group of silhouettes mid-jump in front of a stylized
    Intercontinental baseball stadium archway; motion-blur trails.
(3) 寶山金字塔 — Silhouettes stacked into a pyramid spelling out "ICSD" with
    overhead golden spotlight, deep navy background.

Same vector style, no logos, no real faces. Suitable as task icons.
```

**Self-check** ✅
- [ ] 3 個合照徽章：愛心 / 跳躍 / 金字塔
- [ ] 全部用 silhouette（無臉）
- [ ] 風格一致
- [ ] 含金色裝飾
- [ ] 不含真實品牌

---

## 8. 緊急任務徽章 × 3
**Aspect**: 1:1, 512×512 each

```
Three urgent-task circular badges with red glow + navy core:

(1) ⚡ 寶山召集令 — A bolt of gold lightning piercing a wafer, megaphone.
(2) 🧠 玄彬密語 — A locked envelope with gold wax seal showing a "C" insignia,
    riddle scroll background.
(3) 🎁 漢神尋寶 — Treasure chest open with golden coins shaped like wafers,
    a Hanshin red ribbon.

Each badge has a soft red outer glow ring (#E53935) over navy + gold base.
No text in image.
```

**Self-check** ✅
- [ ] 紅色外光暈 + navy + gold
- [ ] 三個圖示對應三個任務
- [ ] 風格一致
- [ ] 無文字

---

## 9. 完賽勳章 × 5
**Aspect**: 1:1, 512×512 each

```
Five medal-style award badges: shield-shaped frame with ribbon banner.

(1) Top1 Champion — Gold shield, large "1" with a silicon wafer halo.
(2) Top2 — Silver shield, "2".
(3) Top3 — Bronze shield, "3".
(4) 全勤勳章 — Navy shield with 12 small gold dots (one per game) circling.
(5) 隊魂勳章 — Navy shield with 10 silhouettes interlocked into a hexagon.

Same vector style, ribbon at top with thin gold serif text "ICSD × 漢神".
No real-person likenesses.
```

**Self-check** ✅
- [ ] 5 個勳章：金/銀/銅/全勤/隊魂
- [ ] 含 "ICSD × 漢神" 緞帶
- [ ] 盾牌形狀統一
- [ ] 無真人 / 無 logo

---

## 10. PWA App Icons（192 / 512）
**Aspect**: 1:1
**Use**: `assets/icons/icon-192.png`, `icon-512.png`, `manifest.json`

```
A flat geometric app icon: a deep navy rounded square (#1A237E) with a centered
golden Hanshin "H" letter (#FFB300) cleverly stylized as a tilted silicon wafer
notch on its top-right corner. Below the H, three thin emerald lines (#00C896)
representing the wafer floors. Subtle 1px gold inner border, very small "ICSD"
monogram at bottom. Maskable safe zone.
```

**Self-check** ✅
- [ ] 主色 navy + gold + emerald
- [ ] 中央 H 字含晶圓 notch 設計
- [ ] 含 "ICSD" 小字
- [ ] 留 maskable 安全邊距

---

## 11. 樓層平面圖（簡化）
**Aspect**: 4:3, 1280×960
**Use**: `info.html` 場館配置縮圖

```
A simplified isometric floor plan of Hanshin Intercontinental, Taichung,
shown as a 7-layer cutaway tower with each floor labeled by its function in
small Mandarin gold serif: B1 美食街 / 1F 精品 / 2F 時尚 / 3F 流行 /
4F 童趣家居 / 5F 米其林 / 6F 娛樂 / 7-8F 天際營地. Each floor has 1-2 simple
icons. Right side shows three key landmarks nearby: Taichung Intercontinental
Baseball Stadium, Beitun MRT marker, Chungde Rd road sign. Top of building
glows with a small gold "Hanshin" wafer crown. Style: minimalist isometric,
navy + gold, ivory background with subtle wafer grid texture.
```

**Self-check** ✅
- [ ] 7-8 樓層 + 對應主題
- [ ] 含洲際棒球場 / 北屯捷運 / 崇德路標誌
- [ ] 樓層名稱中文
- [ ] navy + gold 主色

---

## 12. 排行榜頂部裝飾（金獎盃）
**Aspect**: 16:9, 1920×600
**Use**: `scoreboard.html` 頂部 hero（替換預設）

```
A premium horizontal banner: a giant trophy in the center, made of stacked
silicon wafers and a gold cup, glowing softly. Behind it, a soft bokeh blur of
champagne flutes (left) and skyscraper silhouettes of Taichung at night (right).
Subtle Hanshin gold particles drifting across. Empty space top for a "排行榜"
gold serif title. Cinematic, photorealistic-vector hybrid, navy + gold.
```

**Self-check** ✅
- [ ] 中央獎盃由晶圓堆成
- [ ] 香檳 + 台中夜景
- [ ] 留標題空間
- [ ] navy + gold

---

## 13. 隊伍徽章模板（30 隊用）
**Aspect**: 1:1, 256×256 (single template)

```
A circular team badge template with three concentric rings: outer ring deep
navy with thin gold rivets, middle ring blank gold gradient (where the team
emoji + name will be placed), inner ring emerald wafer pattern. Designed as
a placeholder PNG to be filled in code with the team emoji and name.
```

**Self-check** ✅
- [ ] 三層同心圓構造
- [ ] 中央留白
- [ ] 一張即可，靠程式套用 emoji + 名稱

---

## 14. Loading / Splash Screen
**Aspect**: 9:16, 1080×1920
**Use**: PWA splash

```
A vertical splash screen: top half a wafer + Hanshin building skyline silhouette
glowing at twilight, bottom half deep navy with a gold loading dot animation
placeholder (3 dots) and centered text "ICSD × 漢神洲際冒險" in gold sans-serif.
Subtitle "Hanshin Adventure · 2026.05.29 · 台中漢神洲際" smaller white text.
Premium tech-luxury vibe.
```

**Self-check** ✅
- [ ] 9:16 直式
- [ ] 含活動名稱 + 日期 + 場地
- [ ] 含 loading 點
- [ ] navy + gold 配色

---

## 自我驗證流程（Self-Verification）

每張圖片生成後，請按下列檢查表逐項勾選；若 5 項中有 2 項以上未過，請：
1. 將失敗項目附在 prompt 結尾的 "**Constraints to satisfy:**" 段落
2. 加 "**Re-render with strict adherence to:**" 重新生成
3. 重複至全部通過

### 通用 Sanity Check
- [ ] 不含真人臉（避免肖像權）
- [ ] 不含第三方品牌 logo（避免商標權）
- [ ] 配色符合主題色票（navy + gold + 翡翠 + 漢神紅）
- [ ] 文字排版可閱讀（若有中文，需正確）
- [ ] 解析度與比例正確

### 風格一致性 Check
- [ ] 與同批其他圖片風格一致
- [ ] 不過度卡通（除非該圖明確要求）
- [ ] 不過度寫實（除非該圖明確要求）

---

## 整合到專案

1. 將生成的 PNG/JPG 放入 `assets/icons/` (app icons) 或 `assets/images/`
2. 更新對應的 HTML：
   - `index.html` 登入背景：`.login-glow-top` 可改用 `cover.png`
   - `info.html` Simon 卡片：`.simon-avatar-big` 改用 `simon-avatar.png`
   - `map.html` 遊戲卡：每張遊戲 thumbnail 改用對應徽章
3. 更新 `manifest.json` 的 icons 路徑
4. 確認 `sw.js` 的 STATIC_ASSETS 有將圖片納入快取

---

> 主管 Simon「寶山玄彬」是本活動精神象徵，吉祥物應以「優雅有自信、半導體菁英 × 韓系帥氣」為核心。
> 視覺整體須讓 ICSD 同仁感受到「我們是科技人，今天去漢神慶功」的氛圍。
