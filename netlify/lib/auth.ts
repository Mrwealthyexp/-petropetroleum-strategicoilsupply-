import { UserContext } from './types.ts';

declare const Deno: { env: { get(name: string): string | undefined } };

type Access = Pick<UserContext, 'role' | 'subscription'>;

function apiKeys(): Record<string, Access> {
  try {
    return JSON.parse(Deno.env.get('PETROPULSE_API_KEYS') || '{}') as Record<string, Access>;
  } catch {
    return {};
  }
}

export function authenticate(request: Request): UserContext {
  const apiKey = request.headers.get('X-API-Key') || '';
  const userAgent = request.headers.get('User-Agent') || 'unknown';
  const forwardedFor = request.headers.get('X-Forwarded-For') || 'unknown';
  const config = apiKeys()[apiKey];

  return {
    ip: forwardedFor.split(',')[0].trim(),
    userAgent,
    role: config?.role || 'public',
    subscription: config?.subscription || 'free',
  };
}

export function requireAuth(request: Request, minRole: UserContext['role'] = 'analyst'): boolean {
  const user = authenticate(request);
  const roleHierarchy = ['public', 'analyst', 'executive', 'admin'];
  return roleHierarchy.indexOf(user.role) >= roleHierarchy.indexOf(minRole);
}