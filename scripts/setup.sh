#!/bin/bash
set -e
echo "Setting up nextjs-dashboard-starter..."
npm install
[ -f .env.example ] && [ ! -f .env ] && cp .env.example .env
echo "Done! Run: npm run dev"
