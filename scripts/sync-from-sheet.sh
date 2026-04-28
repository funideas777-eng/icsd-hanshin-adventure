#!/bin/bash
# 從 Google Sheet 公開 CSV URL 同步到 D1 LocationKeepers
# Usage: bash sync-from-sheet.sh <admin_token> <sheet_csv_url>
set -euo pipefail

API="https://icsd-hanshin-api.funideas777.workers.dev"
TOKEN="${1:-${TOKEN:-}}"
SHEET_URL="${2:-${SHEET_URL:-}}"

if [ -z "$TOKEN" ] || [ -z "$SHEET_URL" ]; then
  echo "❌ Usage: $0 <admin_token> <sheet_csv_url>"
  echo ""
  echo "如何取得 sheet_csv_url："
  echo "1. 在 Google Sheets 開啟你的關主資料表"
  echo "2. 檔案 → 共用 → 發布到網頁 → 「整個文件」「逗號分隔值 (.csv)」 → 發布"
  echo "3. 複製產生的 URL（會以 /pub?output=csv 結尾）"
  echo ""
  echo "範例 URL: https://docs.google.com/spreadsheets/d/e/XXXXX/pub?output=csv"
  exit 1
fi

body=$(python3 -c "import json,sys; print(json.dumps({'action':'syncKeepersFromSheet','token':'$TOKEN','sheetCsvUrl':'$SHEET_URL'}))")
echo "🔄 同步中..."
res=$(curl -s -X POST "$API" -H "Content-Type: application/json" -d "$body")
echo "$res" | python3 -m json.tool
