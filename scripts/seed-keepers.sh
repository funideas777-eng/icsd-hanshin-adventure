#!/bin/bash
# Seed 23 keeper configs into D1 via upsertKeeper API
set -euo pipefail

API="https://icsd-hanshin-api.funideas777.workers.dev"
TOKEN="${1:-${TOKEN:-}}"
if [ -z "$TOKEN" ]; then echo "❌ Usage: $0 <admin_token>"; exit 1; fi

CFG="$(dirname "$0")/keeper-config.json"
[ -f "$CFG" ] || { echo "❌ $CFG not found"; exit 1; }

count=$(python3 -c "import json,sys; print(len(json.load(open('$CFG'))))")
echo "📋 Seeding $count keeper configs..."

python3 -c "
import json,sys
cfg=json.load(open('$CFG'))
for k in cfg:
  body=json.dumps({
    'action':'upsertKeeper','token':'$TOKEN',
    'gameId':k['gameId'],'gameName':k['gameName'],
    'keeperName':k['keeperName'],'keeperAvatar':k['keeperAvatar'],
    'hint':k['hint'],'photoUrl':'','answer':k['answer'],'enabled':0
  })
  print(k['gameId']+'\t'+body)
" | while IFS=$'\t' read -r gid body; do
  res=$(curl -s -X POST "$API" -H "Content-Type: application/json" -d "$body")
  ok=$(echo "$res" | python3 -c "import json,sys; print(json.load(sys.stdin).get('ok',False))" 2>/dev/null)
  if [ "$ok" = "True" ]; then echo "  ✅ $gid"; else echo "  ❌ $gid → $res"; fi
done

echo ""
echo "🎉 完成！可以到 admin 後台或 D1 查表確認："
echo "   wrangler d1 execute icsd-hanshin-db-prod --remote --command 'SELECT gameId, gameName, enabled FROM LocationKeepers'"
