# 10 — DNS CONFIGURATION
## Connect FreeName Web3 Domain to Netlify

---

## YOUR DOMAIN

**Web3 Domain:** `global energy.strategicoilsupply`
**Platform:** FreeName.io
**Target:** Netlify site

---

## STEP 1: FREENAME.IO DASHBOARD

**Site:** freename.io → Login → My Domains

### Add DNS Records

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | petropetroleum-strategicoilsupply1.netlify.app | 3600 |
| CNAME | www | petropetroleum-strategicoilsupply1.netlify.app | 3600 |

### OR URL Redirect

| Type | From | To |
|------|------|-----|
| URL Redirect | global energy.strategicoilsupply | https://petropetroleum-strategicoilsupply1.netlify.app |

---

## STEP 2: NETLIFY CUSTOM DOMAIN

**Site:** app.netlify.com → Your Site → Domain Management

| Action | Value |
|--------|-------|
| Add custom domain | `global energy.strategicoilsupply` |
| Verify DNS | Click "Verify" |
| Force HTTPS | Toggle ON |

---

## STEP 3: VERIFY

**Test URLs:**
- `https://global energy.strategicoilsupply` → Should load PetroPulse
- `https://www.global energy.strategicoilsupply` → Should redirect to root

---

## NEXT STEP
Go to `11-final-deploy/` → Launch checklist
