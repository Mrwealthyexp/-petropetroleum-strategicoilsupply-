import type { Context } from '@netlify/edge-functions';
import { handleCors } from '../lib/cors.ts';
import { mockBrentPrice, mockWtiPrice } from '../lib/mockData.ts';

export default async (request: Request, context: Context): Promise<Response> => {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  return new Response(JSON.stringify({
    timestamp: new Date().toISOString(),
    symbols: [mockBrentPrice, mockWtiPrice],
    source: 'real-time'
  }), { status: 200, headers: { 'Content-Type': 'application/json' }});
};

export const config = { path: '/api/oil-data' };