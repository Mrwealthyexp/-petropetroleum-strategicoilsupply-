import type {
  ApiResponse,
  MarketAlert,
  MarketOverview,
  MarketQueryParams,
  OilPrice,
  ScenarioPlan,
  SupplyNode,
} from '../types';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_OIL_API_URL ?? 'https://api.example.com/oil';

const buildQueryString = (params?: Record<string, string | number | boolean | undefined>) => {
  if (!params) {
    return '';
  }

  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.append(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `?${query}` : '';
};

export async function fetchJson<T>(
  input: string,
  init: RequestInit & { params?: Record<string, string | number | boolean | undefined> } = {},
): Promise<T> {
  const { params, ...requestInit } = init;
  const url = `${API_BASE_URL}${input}${buildQueryString(params)}`;

  const response = await fetch(url, {
    ...requestInit,
    headers: {
      Accept: 'application/json',
      ...(requestInit.headers ?? {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export const queryKeys = {
  all: ['oil'],
  overview: ['oil', 'overview'],
  prices: ['oil', 'prices'],
  nodes: ['oil', 'nodes'],
  alerts: ['oil', 'alerts'],
  scenarios: ['oil', 'scenarios'],
} as const;

export const oilApi = {
  async getOverview(region?: string): Promise<MarketOverview> {
    const payload = await fetchJson<ApiResponse<MarketOverview>>('/market/overview', {
      params: region ? { region } : undefined,
    });

    return payload.data;
  },

  async getPrices(params: MarketQueryParams = {}): Promise<OilPrice[]> {
    const payload = await fetchJson<ApiResponse<OilPrice[]>>('/prices', {
      params,
    });

    return payload.data;
  },

  async getSupplyNodes(params: MarketQueryParams = {}): Promise<SupplyNode[]> {
    const payload = await fetchJson<ApiResponse<SupplyNode[]>>('/supply/nodes', {
      params,
    });

    return payload.data;
  },

  async getAlerts(params: MarketQueryParams = {}): Promise<MarketAlert[]> {
    const payload = await fetchJson<ApiResponse<MarketAlert[]>>('/alerts', {
      params,
    });

    return payload.data;
  },

  async getScenarios(region?: string): Promise<ScenarioPlan[]> {
    const payload = await fetchJson<ApiResponse<ScenarioPlan[]>>('/scenarios', {
      params: region ? { region } : undefined,
    });

    return payload.data;
  },

  async getMarketSnapshot(): Promise<MarketOverview> {
    return this.getOverview();
  },

  async getOilPrices(params: MarketQueryParams = {}): Promise<OilPrice[]> {
    return this.getPrices(params);
  },

  async getRiskAlerts(params: MarketQueryParams = {}): Promise<MarketAlert[]> {
    return this.getAlerts(params);
  },
};

export default oilApi;
