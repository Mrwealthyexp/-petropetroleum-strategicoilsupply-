# 02 — BOLT.NEW PROJECT BUILD
## Complete Prompt & Build Steps

---

## STEP 1: CREATE NEW PROJECT

**Site:** bolt.new

| Step | Click | Result |
|------|-------|--------|
| 1 | "New Project" button | Blank project |
| 2 | Chat box active | Cursor blinking |

---

## STEP 2: PASTE THIS EXACT PROMPT

```
Build a Next.js 15 full-stack web app called PetroPulse — Strategic Oil Intelligence Platform.

Tech stack:
- Next.js 15 App Router + TypeScript
- Tailwind CSS + shadcn/ui components
- React Query + Zustand
- Three.js + React Three Fiber for 3D globe

Pages:
1. / — Landing page with "Enter Platform" button, dark theme #050505
2. /dashboard — Bento grid with:
   - Brent/WTI price tickers (live-looking, amber #ff6b00)
   - SPR facility cards with progress bars
   - Supply route status indicators
   - Geopolitical risk scores with color coding
3. /globe — Full-screen 3D Earth with:
   - Rotating sphere with atmosphere glow
   - Animated supply route arcs (green=active, red=disrupted)
   - Clickable facility markers
   - OrbitControls for drag/rotate/zoom
4. /scenarios — Interactive modeling:
   - Sliders: sanctions, OPEC cuts, hurricane risk, demand growth
   - Real-time price projection chart
   - Confidence intervals display

Design tokens:
- Background: #050505 (crude black)
- Primary: #ff6b00 (refinery amber)
- Secondary: #4a90d9 (pipeline steel)
- Alert: #ff3333 (red)
- Success: #22c55e (green)
- Font-mono: JetBrains Mono for data
- Font-display: Space Grotesk for headers
- All cards: rounded-xl, border #222, hover:border-[#ff6b00]/30

Install ALL dependencies. Create complete file structure with working components.
```

---

## STEP 3: WAIT FOR BUILD

**Time:** 5-10 minutes

**What happens:**
- Bolt generates files
- Left sidebar populates with folders
- Dependencies install automatically

---

## STEP 4: RENAME PROJECT

| Step | Click | Type |
|------|-------|------|
| 1 | Project name (top left) | Editable |
| 2 | Clear, type: `petropetroleum-strategicoilsupply` | New name |
| 3 | Checkmark or Enter | Saved |

---

## STEP 5: SWITCH TO CLAUDE AGENT

| Step | Click | Select |
|------|-------|--------|
| 1 | "v1 Agent (legacy)" (bottom left) | Menu opens |
| 2 | "Claude Agent" | Selected |
| 3 | "Sonnet 4.6" or "Opus 4.6" | Model chosen |
| 4 | "Switch to [model]" | Confirmed |

---

## STEP 6: PUSH TO GITHUB

| Step | Click | Result |
|------|-------|--------|
| 1 | GitHub icon (top right) | Menu opens |
| 2 | "Push to GitHub" | Repo list |
| 3 | Select `petropetroleum-strategicoilsupply` | Connected |
| 4 | "Push" | Code uploads |

---

## VERIFICATION

Go to: `github.com/Mrwealthyexp/petropetroleum-strategicoilsupply`

**Must see:**
- ✅ package.json
- ✅ app/ folder
- ✅ next.config.js/ts
- ✅ tailwind.config.ts
- ✅ components/

---

## TROUBLESHOOTING

| Problem | Fix |
|---------|-----|
| Push fails | Check GitHub auth, re-login |
| No repo in list | Create repo first in GitHub |
| Build errors | Check prompt clarity, re-paste |

---

## NEXT STEP
Go to `03-github-repo/` → Verify push
