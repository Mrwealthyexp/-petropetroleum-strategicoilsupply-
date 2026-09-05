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
- **Backend**: Netlify Edge Functions
- **Language**: TypeScript
- **Deployment**: Netlify

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

netlify/
├── edge-functions/       # 7 API endpoints
├── lib/                  # Edge utilities
└── functions/            # Serverless functions
```

## Getting Started

### Prerequisites
- Node.js 18+
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
# Build for production
npm run build

# Start production server
npm start

# Deploy to Netlify
netlify deploy --prod
```

## API Endpoints (Netlify Edge Functions)

- `GET /api/oil-data` - Current oil prices (WTI, Brent)
- `GET /api/spr-data` - Strategic Petroleum Reserve data
- `GET /api/supply-routes` - Active supply routes and tanker tracking
- `GET /api/geopolitical-risk` - Regional risk assessments
- `POST /api/scenarios` - Run scenario simulations
- `POST /api/ai-copilot` - AI market intelligence
- `GET /api/personalize` - User preference personalization

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
- **Next.js Image Optimization**: Automatic image optimization
- **Edge Functions**: Globally distributed edge computing

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- WebGL required for 3D globe

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, please open an issue on GitHub.
