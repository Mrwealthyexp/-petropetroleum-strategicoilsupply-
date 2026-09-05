# 03 — GITHUB REPO MANAGEMENT
## Push, Verify, Sync

---

## VERIFY REPO HAS CODE

**URL:** `github.com/Mrwealthyexp/petropetroleum-strategicoilsupply`

**Must see these files:**
```
📁 app/
  📁 dashboard/
  📁 globe/
  📁 scenarios/
  📄 page.tsx (landing)
  📄 layout.tsx
📁 components/
  📁 ui/
  📁 dashboard/
  📁 globe/
📁 lib/
  📄 utils.ts
📄 next.config.ts
📄 package.json
📄 tailwind.config.ts
📄 tsconfig.json
📄 .env.example
📄 README.md
📄 .gitignore
```

---

## IF REPO IS EMPTY (Only README)

### Manual Push Method

**Step 1:** Download from Bolt
- In Bolt: Project name → Export → Download ZIP

**Step 2:** Open terminal
- Windows: Win+R → `cmd`
- Mac: Cmd+Space → `Terminal`
- Linux: Ctrl+Alt+T

**Step 3:** Run commands
```bash
cd Downloads
unzip bolt-project-XXXX.zip
cd bolt-project-XXXX
git init
git remote add origin https://github.com/Mrwealthyexp/petropetroleum-strategicoilsupply.git
git add .
git commit -m "Initial PetroPulse build"
git push -u origin main --force
```

---

## BRANCH STRATEGY

```
main          ← production (Netlify deploys from here)
├── staging   ← testing
├── feat/web3 ← new features
└── hotfix    ← urgent fixes
```

---

## SYNC COMMANDS

```bash
# Pull latest
git pull origin main

# Create feature branch
git checkout -b feat/new-feature

# Push changes
git add .
git commit -m "feat: add new feature"
git push origin feat/new-feature
```

---

## NEXT STEP
Go to `04-netlify-deploy/` → Configure deploy
