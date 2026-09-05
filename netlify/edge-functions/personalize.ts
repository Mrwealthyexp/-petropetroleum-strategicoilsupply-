import type { Context } from '@netlify/edge-functions';
import { handleCors } from '../lib/cors.ts';
import { authenticate } from '../lib/auth.ts';

export default async (request: Request, context: Context): Promise<Response> => {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;
  if (request.method !== 'GET') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });

  const user = authenticate(request);
  const geo = {
    country: context.geo?.country?.name || 'Unknown',
    city: context.geo?.city || 'Unknown',
    timezone: context.geo?.timezone || 'UTC',
  };

  return new Response(JSON.stringify({ user, geo, features: ['prices', 'routes', 'risk'] }), {
    status: 200, headers: { 'Content-Type': 'application/json' }
  });
};

export const config = { path: '/api/personalize' };