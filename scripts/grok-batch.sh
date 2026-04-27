#!/bin/bash
# Grok 批次產圖 — ICSD × 漢神洲際冒險
# Usage: XAI_API_KEY=xai-xxx bash scripts/grok-batch.sh
set -euo pipefail

if [ -z "${XAI_API_KEY:-}" ]; then echo "❌ XAI_API_KEY 未設定"; exit 1; fi

cd "$(dirname "$0")/.."
mkdir -p assets/images/{cover,mascot,floors,games,foods,group,emergency,medals,misc}

API="https://api.x.ai/v1/images/generations"
MODEL="grok-imagine-image"  # 2026-02-24 起取代 grok-2-image-1212

# 通用風格指引（每個 prompt 都會自動 prefix）
COMMON='Style: TSMC engineering navy #1A237E + Hanshin luxury gold #FFB300 + emerald wafer green #00C896 on deep night blue #050b22 base. Premium retail meets semiconductor fab. No cartoonish chibi, no Western brand logos, no real-person likeness. Vector / flat illustration unless photo required. '

declare -a JOBS=(
  "cover/hero.jpg|A cinematic hero illustration fusing the silhouette of Taichung National Theater curves and Intercontinental baseball stadium at twilight, a 12-inch silicon wafer with circuit traces forming a 7-floor luxury mall skyline, gentle floating golden particles. Engraved gold sans-serif title 'ICSD × 漢神洲際冒險' top center, subtitle 'Hanshin Adventure · 2026.05.29' beneath. Premium tech-luxury poster, ultra-detailed, 8K, no logos."
  "mascot/simon-portrait.jpg|Stylized vector mascot of a confident Asian male manager nicknamed 'Baoshan Hyun-bin'. K-pop styling, neat short black hair, sharp jawline, mid-30s, charismatic warm smile. Deep navy slim-cut suit with thin gold tie clip and small Hanshin gold lapel pin shaped like a silicon wafer. Holding a tablet displaying a glowing yield curve. Bust-up portrait, 3/4 view, flat illustration with soft cel-shading. NOT photo-real, generic animated character. Transparent background."
  "mascot/simon-stickers.jpg|Six stylized cel-shaded emoji stickers of the same character (navy-suited Asian male manager) arranged in a 3x2 grid with thin gold dividers. Expressions: thumbs-up confident smile; winking finger-gun encouragement; thoughtful chin-stroking; face-palm with a kind smile; holding a small trophy with sparkles; raising a champagne glass. Flat vector, transparent background, no text."
  "floors/floor-grid.jpg|Seven small thumbnail illustrations representing each floor of Hanshin Intercontinental Taichung in a 3x3 grid (last cell empty). Common style: flat isometric 3/4 cutaway, deep navy outlines on warm gold backgrounds, no text labels. (1) B1 LOPIA Japanese supermarket aisle with bento, sushi, bread loaf, golden basket; (2) 1F luxury hall with chandelier, cosmetics counter, perfume, champagne flute; (3) 2F international fashion mannequins next to coffee bar; (4) 3F trend lifestyle lounge with sneakers and DJ booth; (5) 4F kids playroom with toys and cozy sofa; (6) 5F Michelin restaurant with plated fine dining and candles; (7) 6F entertainment with Korean BBQ table, sports pub TV, gold-bottle bar shelf. Each thumbnail has thin gold border."
  "games/game-badges-grid.jpg|Twelve circular game badges in 4x3 grid, identical flat vector style. Each badge: 70mm circle with thin gold border, navy gradient background, single bold central icon, small ICSD monogram at bottom edge. Icons in order: bento with speed lines; Hanshin gold lucky bag with red knot; four luxury icons (handbag/perfume/lipstick/diamond); color wheel with stroop typography; gold thread looping into snake shape with fashion icons; slide puzzle showing fashion silhouette; silicon wafer with maze pattern and dots; three musical notes overlapping Taichung Opera House curve; bouncy ball cracking defective wafer dies; four process stations connected by glowing arrow; brain made of circuit traces; concentric target with EUV laser line. NO text on badges except ICSD monogram."
  "foods/food-cards.jpg|Five rectangular food badges (3:4 cards) in a row. Flat vector with hand-painted texture overlay. Frame: navy + gold trim. Subtitle in Chinese gold serif. (1) Glass tumbler of brown sugar boba milk tea with caramel drizzle, Taichung skyline silhouette behind, label '台中珍奶'; (2) Steamer basket with 8 dumplings, chopsticks lifting one revealing soup, red lattice background, label '上海湯包'; (3) Sizzling table grill with marbled pork belly and lettuce wrap with smoke, label '尚屋韓烤'; (4) Mango shaved ice mountain with condensed milk drizzle and taro balls, sunny vibe, label '島語甜品'; (5) Stack of three round sun cakes, top one cut showing malt-syrup filling, sun-ray emblem, label '台中太陽餅'. Cohesive flat-vector style."
  "group/group-photo-badges.jpg|Three flat vector group-photo task badges in a row, navy + gold frame. (1) 漢神大愛心: eight stylized silhouettes forming a heart with their arms, confetti, gold particles. (2) 飛躍洲際: silhouettes mid-jump in front of a stylized Intercontinental baseball stadium archway, motion-blur trails. (3) 寶山金字塔: silhouettes stacked into a pyramid spelling out ICSD with overhead golden spotlight, deep navy background. No real faces, no logos."
  "emergency/emergency-badges.jpg|Three urgent-task circular badges with red glow + navy core in a row. (1) Bolt of gold lightning piercing a wafer with a megaphone, label '寶山召集令'. (2) Locked envelope with gold wax seal showing a 'C' insignia, riddle scroll background, label '玄彬密語'. (3) Open treasure chest with golden wafer-shaped coins and a Hanshin red ribbon, label '漢神尋寶'. Each badge has soft red outer glow ring (#E53935) over navy + gold base."
  "medals/medals.jpg|Five medal-style award badges in a row: shield-shaped frame with ribbon banner. (1) Top1 gold shield with large '1' and silicon wafer halo. (2) Top2 silver shield with '2'. (3) Top3 bronze shield with '3'. (4) Navy shield with 12 small gold dots circling, label '全勤'. (5) Navy shield with 10 silhouettes interlocked into hexagon, label '隊魂'. Ribbon at top with thin gold serif text 'ICSD × 漢神'. No real-person likenesses."
  "misc/app-icon.jpg|A flat geometric app icon: deep navy rounded square (#1A237E) with centered golden Hanshin H letter (#FFB300) stylized as a tilted silicon wafer with notch on top-right corner. Below the H, three thin emerald lines (#00C896) representing wafer floors. Subtle 1px gold inner border, very small ICSD monogram at bottom. Maskable safe zone."
  "misc/floor-plan.jpg|A simplified isometric floor plan of Hanshin Intercontinental Taichung shown as a 7-layer cutaway tower with each floor labeled in small Mandarin gold serif: B1 美食街 / 1F 精品 / 2F 時尚 / 3F 流行 / 4F 童趣家居 / 5F 米其林 / 6F 娛樂 / 7-8F 天際營地. Each floor has 1-2 simple icons. Right side shows three landmarks: Taichung Intercontinental Baseball Stadium, Beitun MRT marker, Chungde Rd road sign. Top of building glows with gold Hanshin wafer crown. Minimalist isometric, ivory background with subtle wafer grid texture."
  "misc/scoreboard-hero.jpg|Premium horizontal banner: giant trophy in center made of stacked silicon wafers and a gold cup glowing softly. Behind it, soft bokeh blur of champagne flutes (left) and Taichung skyscraper silhouettes at night (right). Subtle Hanshin gold particles drifting across. Top space reserved for '排行榜' gold serif title. Cinematic, photorealistic-vector hybrid, navy + gold."
  "misc/team-badge-template.jpg|A circular team badge template with three concentric rings: outer ring deep navy with thin gold rivets, middle ring blank gold gradient (placeholder for team emoji + name), inner ring emerald wafer pattern. PNG with transparent center for code-overlay."
  "misc/splash.jpg|Vertical 9:16 splash screen: top half wafer + Hanshin building skyline silhouette glowing at twilight. Bottom half deep navy with gold loading-dot animation placeholder (3 dots) and centered text 'ICSD × 漢神洲際冒險' in gold sans-serif. Subtitle 'Hanshin Adventure · 2026.05.29 · 台中漢神洲際' smaller white text. Premium tech-luxury vibe."
)

for job in "${JOBS[@]}"; do
  out="assets/images/${job%%|*}"
  prompt="${COMMON}${job#*|}"
  echo "🎨 $out"
  if [ -f "$out" ]; then echo "   (exists, skip)"; continue; fi

  body=$(python3 -c "import json,sys,os; print(json.dumps({'model':'$MODEL','prompt':sys.argv[1],'n':1,'response_format':'url'}))" "$prompt")
  url=$(curl -s "$API" -H "Authorization: Bearer $XAI_API_KEY" -H "Content-Type: application/json" -d "$body" \
        | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('data',[{}])[0].get('url',''),end='')")
  if [ -z "$url" ]; then echo "   ❌ no url"; continue; fi
  curl -s "$url" -o "$out" && echo "   ✅ $(du -h "$out" | cut -f1)"
  sleep 1   # 避免 rate limit
done

echo ""
echo "🎉 完成！執行 ls -la assets/images/**/* 檢視結果"
