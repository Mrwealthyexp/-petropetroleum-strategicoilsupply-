# 06 — FRONTEND CODE
## React Components, Hooks, State Management

### Install
```bash
npm install @tanstack/react-query zustand date-fns recharts lucide-react
npm install -D @tanstack/react-query-devtools
```

### Files to Create
- `app/components/providers/QueryProvider.tsx`
- `app/components/shared/ErrorBoundary.tsx`
- `app/components/shared/Skeleton.tsx`
- `app/lib/store/useAppStore.ts`
- `app/lib/api/client.ts`

### Key Hooks
- `useOilPrices()` — Auto-refreshing price ticker
- `useSPRData()` — Strategic reserve levels
- `useSupplyRoutes()` — Active/disrupted routes
- `useGeopoliticalRisk()` — Risk scores by region

### NEXT: 07-3d-globe/
