import type { Context } from '@netlify/edge-functions';
import { handleCors } from '../lib/cors.ts';
import { authenticate } from '../lib/auth.ts';

export default async (request: Request, context: Context): Promise<Response> => {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;
  if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });

  const user = authenticate(request);
  if (!['analyst', 'executive', 'admin'].includes(user.role)) {
    return new Response(JSON.stringify({ error: 'Scenario modeling requires Analyst access' }), { status: 403 });
  }

  const params = await request.json();
  const basePrice = 84.52;
  const projected = basePrice + (params.sanctionsLevel * 0.15) + (params.opecCutPercent * 0.8) + (params.hurricaneRisk * 0.05) + (params.demandGrowth * 1.5) - (params.sprRelease * 0.02);

  return new Response(JSON.stringify({
    timestamp: new Date().toISOString(),
    scenario: {
      basePrice, projectedPrice: parseFloat(projected.toFixed(2)),
      probability: 45.2, confidenceInterval: [78.5, 102.3],
      impactFactors: [`Sanctions: +$${(params.sanctionsLevel * 0.15).toFixed(2)}`, `OPEC cuts: +$${(params.opecCutPercent * 0.8).toFixed(2)}`]
    },
    inputs: params
  }), { status: 200, headers: { 'Content-Type': 'application/json' }});
};

export const config = { path: '/api/scenarios' };