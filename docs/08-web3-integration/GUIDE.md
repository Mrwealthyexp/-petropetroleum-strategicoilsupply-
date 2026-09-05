# 08 — WEB3 INTEGRATION
## Wallet Connect, NFT Access, Crypto Payments

---

## INSTALL

```bash
npm install ethers @rainbow-me/rainbowkit wagmi viem
```

---

## FILES

```
app/components/web3/
├── WalletConnect.tsx    # MetaMask/WalletConnect button
└── NFTGate.tsx          # Token-gated content
```

---

## FREENAME DOMAIN INTEGRATION

Your domain: `global energy.strategicoilsupply`

### DNS Records (in FreeName dashboard)

| Type | Name | Value |
|------|------|-------|
| CNAME | @ | petropetroleum-strategicoilsupply1.netlify.app |
| TXT | @ | v=spf1 include:_spf.google.com ~all |

### Netlify Custom Domain

1. Site Settings → Domain Management
2. Add custom domain: `global energy.strategicoilsupply`
3. Verify DNS
4. Force HTTPS: ON

---

## WALLET COMPONENT

```tsx
import { WalletConnect } from '@/app/components/web3/WalletConnect';

// In header:
<WalletConnect />
```

---

## NFT ACCESS GATE

```tsx
import { NFTGate } from '@/app/components/web3/NFTGate';

<NFTGate requiredTier="premium">
  <PriceTicker /> {/* Premium only */}
</NFTGate>
```

---

## NEXT STEP
Go to `09-smart-contracts/` → Deploy Solidity contracts
