#!/bin/bash
set -e
cd "$(dirname "$0")/site"
echo "LISENBART — starting local dev server..."
echo "Do not open index.html directly — use the URL below."
(sleep 2 && open "http://localhost:5173") &
npm run dev
