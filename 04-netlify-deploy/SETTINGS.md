# 04 — NETLIFY DEPLOY CONFIGURATION
## Complete Settings & Troubleshooting

---

## INITIAL DEPLOY SETTINGS

**Path:** `app.netlify.com` → Add new site → Import from GitHub

| Field | Value | Why |
|-------|-------|-----|
| **Repository** | `Mrwealthyexp/petropetroleum-strategicoilsupply` | Your repo |
| **Branch to deploy** | `main` | Production branch |
| **Base directory** | `/` | Root of project |
| **Build command** | `npm run build` | Next.js build |
| **Publish directory** | `.next` | Next.js output (default) |

---

## ENVIRONMENT VARIABLES

**Path:** Site Settings → Environment variables

| Key | Value | Purpose |
|-----|-------|---------|
| `NEXT_PUBLIC_API_URL` | `https://petropetroleum-strategicoilsupply1.netlify.app` | API base |
| `NEXT_PUBLIC_API_KEY` | `pk_analyst_demo_2026` | Demo auth |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://placeholder.supabase.co` | Database (placeholder) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `placeholder-key` | DB auth (placeholder) |
| `NODE_VERSION` | `20` | Node.js version |

---

## CRITICAL FIX: STATIC EXPORT

If you get **404 errors** after deploy, Next.js needs static export.

### Fix in Bolt.new

Edit `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### Then in Netlify

Change **Publish directory** from `.next` to `out`

---

## 404 ERROR FIX

**Symptom:** Site loads but pages show 404

**Cause:** Next.js 15 needs `output: 'export'` for static sites

**Fix:**
1. Bolt.new → Edit `next.config.ts` → Add `output: 'export'`
2. Push to GitHub
3. Netlify → Change publish dir to `out`
4. Trigger deploy

---

## BUILD ERROR FIXES

### "supabaseUrl is required"

**Fix:** Add placeholder env vars:
- `NEXT_PUBLIC_SUPABASE_URL` = `https://placeholder.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `placeholder`

### "Deploy directory 'out' does not exist"

**Fix:** Code doesn't have `output: 'export'` — edit `next.config.ts`

### "Cannot find module"

**Fix:** `npm install` failed → Check `package.json` → Re-deploy

---

## VERIFY DEPLOY

**Live URL:** `https://petropetroleum-strategicoilsupply1.netlify.app/`

**Test these paths:**
- `/` → Landing page
- `/dashboard` → Dashboard
- `/globe` → 3D Globe
- `/scenarios` → Scenario modeling

---

## NEXT STEP
Go to `05-edge-functions/` → Add API backend
