# 關主驗證系統 - 設定指南

> 每款遊戲（含料理 / 合照 / 緊急任務）開始前，玩家必須先到指定地點拍下「線索照片」並輸入照片中被馬賽克遮住的關鍵字才能解鎖該遊戲。

## 系統架構

```
玩家 → 點擊遊戲卡 → Gatekeeper.guard()
   → CF Worker getLocationHint → D1 LocationKeepers
   → 顯示關主對話 + 照片 + hint
   → 玩家輸入答案 → CF Worker verifyLocation
   → SHA-256(salt + answer) 比對 → KV unlock 30 天
   → 進入遊戲
```

安全要點：
- 答案明文絕不出現在前端或 API 回應（前端只拿到 photoUrl + keeperName + hint）
- 後端用 sha256(salt + normalize(answer)) 比對
- 每 playerId+gameId 每 10 分鐘最多 5 次嘗試
- 解鎖後存 KV 30 天 + 前端 localStorage
- 所有解鎖事件寫進 AuditLog

## 24 個關主清單

| gameId | 遊戲 | 關主 | 樓層 | 預設答案 |
|---|---|---|---|---|
| catch | 美食快遞 | LOPIA 店長 阿森 | B1F | 本日特價 |
| whack | 打福袋大師 | 福袋姐 小漢 | B1F | 漢神精選 |
| memory | 經典精品配對 | 閃耀經典 LISA | 1F | 布娜飛 |
| reaction | 色彩極速 | 美妝大師 KIKO | 1F | 閃耀經典 |
| snake | 時尚連線 | UNIQLO 店員 阿尤 | 2F | 國際時尚 |
| puzzle | 時尚拼版 | 造型師 ZARA | 2F | 時尚拼版 |
| pacman | 晶圓巡禮 | 寶山工程師 阿凱 | 3F | N2 |
| rhythm | 節奏台中 | DJ 歌劇院 | 3F | 台中歌劇院 |
| breaker | 良率挑戰 | 良率工程師 阿芬 | 4F | 良率 |
| dodge | 製程接力 | 張博士 | 4F | 光刻 |
| quiz | ICSD 知識王 | 林教授 | 5F | 先進製程 |
| shooter | 雷射對位 | EUV 工程師 Linda | 5F | 13.5 |
| photo | 寶山玄彬合照 | 小編 Mia | 6F | 寶山玄彬 |
| cook-boba | 台中珍奶 | 飲品店長 小珍 | 料理 | 台中珍奶 |
| cook-beef | 上海湯包 | 包子師傅 老李 | 料理 | 漢來上海湯包 |
| cook-dumpling | 尚屋韓烤 | 屋馬尚屋 店員 | 料理 | 尚屋韓烤 |
| cook-shaved | 島語甜品 | 島語自助餐 | 料理 | 芒果冰 |
| cook-cake | 台中太陽餅 | 烘焙師 小鳳 | 料理 | 太陽餅 |
| photo-heart | 漢神大愛心 | 活動主持人 阿明 | 1F | 漢神大愛心 |
| photo-jump | 飛躍洲際 | 棒球教練 阿球 | 戶外 | 洲際棒球場 |
| photo-pyramid | 寶山金字塔 | 6F 場控 | 6F/7F | ICSD |
| emergency-1 | 寶山召集令 | Simon 助理 | 1F | 寶山召集 |
| emergency-2 | 玄彬密語 | 5F 服務台 | 5F | 玄彬密語 |
| emergency-3 | 漢神尋寶 | LOPIA 經理 | B1F | ICSD漢神 |

> 所有 24 筆已 seed 到 D1（enabled=0 預設關閉）。可逐關拍照、上傳到 R2、填入 photoUrl，最後 enable=1 啟用。

## 設定流程（推薦：Google Sheet 雲端管理）

### Step 1：開啟 Google Sheet

1. 到 https://sheets.new （快速建立新試算表）
2. 命名為 `ICSD × 漢神洲際 - 關主資料表`

### Step 2：匯入 CSV 範本

1. 開啟本地檔案 [keeper-template.csv](./keeper-template.csv)（24 筆預設資料）
2. 在 Sheets：**檔案 → 匯入 → 上傳 → 選此 CSV → 取代目前工作表**
3. 你會看到 8 個欄位：`gameId / gameName / keeperName / keeperAvatar / hint / photoUrl / answer / enabled`

### Step 3：拍照、上傳到 R2、填 photoUrl

每個 gameId 對應一張現場線索照片（含馬賽克遮住關鍵字）。

**上傳照片到 R2**（CF 物件儲存）：

```bash
# 假設你拍好了 catch.jpg 在 ~/Desktop/keepers/ 下
cd /Users/minialbert/claude/icsd-hanshin-adventure/cloudflare-worker
wrangler r2 object put icsd-hanshin-photos-prod/keepers/catch.jpg \
  --file ~/Desktop/keepers/catch.jpg --remote

# 取得公開 URL（需先在 R2 dashboard 為 bucket 啟用 public access）
echo "https://pub-icsd-hanshin.r2.dev/keepers/catch.jpg"
```

把產出的 URL 貼到 Sheet 對應行的 `photoUrl` 欄位。

> 若 R2 public domain 還沒啟用，先到 Cloudflare Dashboard → R2 → `icsd-hanshin-photos-prod` → Settings → Public Access → Allow → 取得 `pub-xxx.r2.dev` URL

### Step 4：依需要修改 answer 與 enabled

- `answer`：照片中被馬賽克遮住的關鍵字（玩家要輸入的內容）
- `enabled`：1 = 啟用驗證，0 = 不檢查（直接放行）

預設所有列 `enabled=0`，方便你逐關啟用測試。

### Step 5：發布為 CSV → 同步到 D1

1. **檔案 → 共用 → 發布到網頁**
2. **整個文件** + **逗號分隔值 (.csv)** → 發布
3. 複製產生的 URL（以 `/pub?output=csv` 結尾）

執行同步：

```bash
cd /Users/minialbert/claude/icsd-hanshin-adventure
bash scripts/sync-from-sheet.sh <ADMIN_TOKEN> "<SHEET_CSV_URL>"
```

範例輸出：
```json
{
  "ok": true,
  "count": 24,
  "updates": [
    {"gameId": "catch", "enabled": 1, "hasAnswer": true, "hasPhoto": true},
    ...
  ]
}
```

### Step 6：驗證單一遊戲

```bash
# 取得任一玩家 ID（從 D1 查）
PID=$(wrangler d1 execute icsd-hanshin-db-prod --remote --command "SELECT playerId FROM Players LIMIT 1" --json | python3 -c "import json,sys; print(json.load(sys.stdin)[0]['results'][0]['playerId'])")

# 模擬玩家請求關主資訊
curl -s "https://icsd-hanshin-api.funideas777.workers.dev/?action=getLocationHint&gameId=catch&playerId=$PID" | python3 -m json.tool
# 應該回傳：required:true, photoUrl:..., hint:..., keeperName:...

# 模擬輸入錯誤答案
curl -s -X POST "https://icsd-hanshin-api.funideas777.workers.dev/" \
  -H "Content-Type: application/json" \
  -d "{\"action\":\"verifyLocation\",\"gameId\":\"catch\",\"playerId\":\"$PID\",\"answer\":\"錯的\"}"
# 應該回 ok:false, remaining:4

# 輸入正確答案
curl -s -X POST "https://icsd-hanshin-api.funideas777.workers.dev/" \
  -H "Content-Type: application/json" \
  -d "{\"action\":\"verifyLocation\",\"gameId\":\"catch\",\"playerId\":\"$PID\",\"answer\":\"本日特價\"}"
# 應該回 ok:true, unlocked:true
```

## 替代方案：直接用 admin API 逐筆 upsert

如果不想用 Google Sheet，可在 admin 後台或腳本逐筆改：

```bash
TOKEN=<ADMIN_TOKEN>
curl -s -X POST "https://icsd-hanshin-api.funideas777.workers.dev/" \
  -H "Content-Type: application/json" \
  -d "{
    \"action\":\"upsertKeeper\",\"token\":\"$TOKEN\",
    \"gameId\":\"catch\",
    \"gameName\":\"美食快遞\",
    \"keeperName\":\"LOPIA 店長 阿森\",
    \"keeperAvatar\":\"🍱\",
    \"hint\":\"找到 B1 LOPIA 招牌看板\",
    \"photoUrl\":\"https://pub-xxx.r2.dev/keepers/catch.jpg\",
    \"answer\":\"本日特價\",
    \"enabled\":1
  }"
```

## 注意事項

- 資料表內 `answer` 欄位是明文，**Google Sheet 必須限制存取**（只給活動籌備團隊看）
- 同步到後端後，answer 會立即被 SHA-256 雜湊化，D1 內不留明文
- 玩家解鎖後資料快取 30 天（KV expirationTtl 60×60×24×30）
- 同步腳本支援增量更新：只有有變更的列會被覆寫
- Sheet 的 `enabled` 欄位填 `1 / true / yes / y` 都會啟用，其他都視為 disabled
- 答案輸入會做 normalize（小寫、去空白、去標點），所以「本日特價」「本日 特價」「本日,特價」都通過

## 重置某玩家的解鎖狀態（測試用）

```bash
wrangler kv key delete --namespace-id=7fab4af22ab24d4d931069367fdc61c7 \
  "loc_unlock:<PLAYER_ID>:<GAME_ID>" --remote
```
