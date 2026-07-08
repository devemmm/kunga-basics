#!/bin/bash
set -e

echo "▶  Pulling latest code..."
git pull origin dev

echo "▶  Building image (no cache)..."
docker compose build --no-cache

echo "▶  Stopping existing container..."
docker compose down --remove-orphans || docker rm -f kunga-basics 2>/dev/null || true

echo "▶  Starting container..."
docker compose up -d

echo "✅  Website deployed."
