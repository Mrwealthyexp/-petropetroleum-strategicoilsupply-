# PetroPulse

**Strategic Oil Intelligence Platform**

A comprehensive Next.js application for real-time oil market analysis, supply chain monitoring, and geopolitical risk assessment.

## Features

### 📊 Dashboard
- Real-time WTI and Brent crude price tickers
- Strategic Petroleum Reserve (SPR) monitoring
- Geopolitical risk index
- Market alerts and notifications

### 🌍 Global Intelligence
- 3D interactive globe visualization powered by Three.js
- Real-time supply route tracking
- Infrastructure monitoring (refineries, pipelines, terminals)
- Tanker fleet positioning

### 🎮 Scenario Engine
- Simulate supply disruptions
- Model demand shocks
- Geopolitical crisis scenarios
- Weather impact analysis
- Price and availability forecasting

### 🤖 AI Copilot
- Market intelligence chatbot
- Trend analysis and recommendations
- Risk assessment insights
- Natural language queries

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + React 18
- **Styling**: Tailwind CSS + PostCSS
- **State Management**: Zustand + React Query
- **3D Graphics**: Three.js + three-stdlib
- **Language**: TypeScript
- **Deployment**: Netlify (static export)

## Project Structure

```
app/
├── components/
│   ├── shared/           # Reusable UI components
│   ├── dashboard/        # Dashboard cards and widgets
│   ├── globe/            # 3D globe visualization
│   ├── scenarios/        # Scenario engine UI
│   ├── copilot/          # AI chat widget
│   └── providers/        # React context providers
├── lib/
│   ├── api/              # API client
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand state store
│   ├── types/            # TypeScript types
│   └── utils/            # Helper functions
├── dashboard/            # Dashboard page
├── globe/                # Globe page
├── scenarios/            # Scenarios page
└── layout.tsx            # Root layout
```

## Getting Started

### Prerequisites
- Node.js 20 (see `.nvmrc`)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Deploy

```bash
# Build the static site (outputs to out/)
npm run build

# Preview the static build locally
npx serve out
```

This project uses Next.js static export (`output: 'export'` in `next.config.ts`), so `npm run build` generates a fully static site in the `out/` directory. There is no Node.js server to start in production — the `out/` folder is deployed as-is to any static host.

## Deployment (Netlify)

PetroPulse is configured for automatic deployment to Netlify via `netlify.toml`:

| Setting            | Value           |
| ------------------ | --------------- |
| Build command      | `npm run build` |
| Publish directory  | `out`           |
| Node version       | `20`            |

### Auto-deploy workflow

1. Connect this repository to a Netlify site (**Site settings → Build & deploy → Link repository**).
2. Netlify reads `netlify.toml` automatically and applies the build command, publish directory, and `NODE_VERSION` above.
3. Push to the `main` branch on GitHub.
4. Netlify detects the push, runs `npm run build`, and publishes the generated `out/` directory.
5. Deploy previews are created automatically for pull requests.

### Manual deploy

```bash
# One-off production deploy from your machine
netlify deploy --prod --dir=out
```

### Environment variables on Netlify

The app reads `NEXT_PUBLIC_*` variables at build time (see `.env.local.example`). Set the real values in **Site settings → Environment variables** in the Netlify UI, or with the CLI:

```bash
netlify env:set NEXT_PUBLIC_OIL_API_KEY your_api_key
netlify env:set NEXT_PUBLIC_OIL_API_URL https://api.example.com
netlify env:set NEXT_PUBLIC_COPILOT_API_KEY your_api_key
netlify env:set NEXT_PUBLIC_COPILOT_MODEL gpt-4
```

Never commit real API keys or secrets to `netlify.toml` or the repository; only placeholder/example values belong in source control.

### Dependency notes

`package.json` pins `postcss` in both `devDependencies` and `overrides` to the same patched version (currently `^8.5.28`). The `overrides` entry is required because Next.js bundles its own internal `postcss` dependency, which otherwise resolves to an older, vulnerable version regardless of what's declared in `devDependencies`. When bumping `postcss`, update both entries together to keep them in sync.

## Configuration

### Environment Variables

```env
NEXT_PUBLIC_OIL_API_KEY=your_api_key
NEXT_PUBLIC_OIL_API_URL=https://api.example.com
NEXT_PUBLIC_COPILOT_API_KEY=your_api_key
NEXT_PUBLIC_COPILOT_MODEL=gpt-4
```

### Tailwind CSS

Custom theme configuration in `tailwind.config.ts`:
- Dark color scheme
- Custom gradients
- Extended shadows and animations

## Performance

- **React Query**: Automatic caching and background updates
- **Zustand**: Lightweight state management
- **Static Export**: Pre-rendered HTML served directly from Netlify's CDN
- **Cache-Control headers**: Long-term caching for hashed Next.js assets (see `netlify.toml`)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- WebGL required for 3D globe

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, please open an issue on GitHub.
