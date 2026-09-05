import { UserContext } from "./types.ts";
const API_KEYS: Record<string, { role: UserContext["role"]; subscription: UserContext["subscription"] }> = {
  "pk_analyst_demo_2026": { role: "analyst", subscription: "pro" },
  "pk_exec_demo_2026": { role: "executive", subscription: "enterprise" },
  "pk_public_demo_2026": { role: "public", subscription: "free" },
};
export function authenticate(request: Request): UserContext {
  const apiKey = request.headers.get("X-API-Key") || "";
  const userAgent = request.headers.get("User-Agent") || "unknown";
  const forwardedFor = request.headers.get("X-Forwarded-For") || "unknown";
  const config = API_KEYS[apiKey];
  return { ip: forwardedFor.split(",")[0].trim(), userAgent, role: config?.role || "public", subscription: config?.subscription || "free" };
}
export function requireAuth(request: Request, minRole: UserContext["role"] = "analyst"): boolean {
  const user = authenticate(request);
  const roleHierarchy = ["public", "analyst", "executive", "admin"];
  return roleHierarchy.indexOf(user.role) >= roleHierarchy.indexOf(minRole);
}
