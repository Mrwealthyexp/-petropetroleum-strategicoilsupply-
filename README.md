# PetroPulse

PetroPulse is a Next.js strategic oil intelligence platform with market, reserve, supply-route, risk, scenario, and globe views.

## Development

```bash
npm install
npm run dev
```

Visit `/` for the landing page, `/dashboard` for the operational dashboard, `/globe` for the interactive 3D Earth, and `/scenarios` for the price model.

## Edge functions

The package's Netlify Edge Functions are in `netlify/edge-functions`, with routing in `netlify.toml`. Deploy or test them with Netlify's tooling. Package setup and deployment references are retained in `docs/`.

## Package guides

The supplied package documentation is available under `docs/`, organized by its original setup phases. The globe source was integrated into `components/globe`.
