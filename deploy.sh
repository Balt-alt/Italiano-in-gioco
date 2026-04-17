#!/bin/bash
# Rebuild frontend + riavvia pm2
set -e
cd "$(dirname "$0")"

echo "🔨 Build frontend..."
node build.js

echo "♻️  Riavvio pm2..."
pm2 restart italiano

echo "✅ Deploy completato!"
