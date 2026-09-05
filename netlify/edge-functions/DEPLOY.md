# 05 — NETLIFY EDGE FUNCTIONS
## 7 API Endpoints for PetroPulse

---

## FILE STRUCTURE

```
netlify/
├── edge-functions/
│   ├── personalize.ts      # Role-based dashboard config
│   ├── oil-data.ts          # Real-time price feeds
│   ├── spr-data.ts          # Strategic reserve levels
│   ├── supply-routes.ts     # Active route monitoring
│   ├── geopolitical-risk.ts # Regional risk assessment
│   ├── ai-copilot.ts        # Natural language query
│   └── scenarios.ts         # Monte Carlo simulation
└── lib/
    ├── types.ts             # Shared TypeScript types
    ├── mockData.ts          # Sample data
    ├── cors.ts              # CORS headers utility
    └── auth.ts              # API key authentication
```

---

## DEPLOYMENT

**Netlify auto-detects** edge functions from `netlify.toml`:

```toml
[[edge_functions]]
  path = "/api/personalize"
  function = "personalize"

[[edge_functions]]
  path = "/api/oil-data"
  function = "oil-data"

# ... (see netlify.toml for all 7)
```

---

## TESTING

**Local:** `npx netlify dev`

**Test commands:**
```bash
# Oil prices
curl -H "X-API-Key: pk_analyst_demo_2026" https://localhost:8888/api/oil-data

# SPR data
curl -H "X-API-Key: pk_analyst_demo_2026" https://localhost:8888/api/spr-data

# Personalization
curl -H "X-API-Key: pk_analyst_demo_2026" https://localhost:8888/api/personalize
```

---

## API KEYS

Set `PETROPULSE_API_KEYS` in Netlify to a JSON object mapping API keys to role and
subscription values. Do not commit API keys to the repository.

---

## NEXT STEP
Go to `06-frontend-code/` → Wire frontend to these APIs
