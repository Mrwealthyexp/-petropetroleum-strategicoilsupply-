import type { Context } from '@netlify/edge-functions';
import { handleCors } from '../lib/cors.ts';
import { authenticate } from '../lib/auth.ts';
import { mockGeopoliticalRisks } from '../lib/mockData.ts';

export default async (request: Request, context: Context): Promise<Response> => {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  const user = authenticate(request);
  const includeDetails = ['executive', 'admin'].includes(user.role);

  const data = mockGeopoliticalRisks.map(r => ({
    region: r.region,
    score: r.score,
    trend: r.trend,
    ...(includeDetails && { factors: r.factors, lastIncident: r.lastIncident })
  }));

  return new Response(JSON.stringify({
    timestamp: new Date().toISOString(),
    risks: data,
    summary: { globalRiskScore: '61.75', highestRisk: 'Middle East' }
  }), { status: 200, headers: { 'Content-Type': 'application/json' }});
};

export const config = { path: '/api/geopolitical-risk' };