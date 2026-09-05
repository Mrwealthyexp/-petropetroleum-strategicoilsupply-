# PetroPulse — Strategic Oil Intelligence Platform

## Deploy Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Deploy to Netlify
- Push to GitHub
- Netlify auto-deploys from `main` branch
- Publish directory: `out`
- Build command: `npm run build`

## Structure
```
app/
  page.tsx              # Landing page
  layout.tsx            # Root layout
  dashboard/page.tsx    # Dashboard
  globe/page.tsx        # 3D Globe
  scenarios/page.tsx    # Scenario engine
  components/           # React components
  lib/                  # Utils, types, hooks, store, API
netlify/
  edge-functions/       # 7 API endpoints
  lib/                  # Shared edge utilities
```

## API Endpoints
- `/api/personalize` — Role-based config
- `/api/oil-data` — Price feeds
- `/api/spr-data` — Reserve levels
- `/api/supply-routes` — Route monitoring
- `/api/geopolitical-risk` — Risk assessment
- `/api/ai-copilot` — AI chat
- `/api/scenarios` — Monte Carlo simulation
