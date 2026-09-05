export type Region =
  | 'Global'
  | 'North Sea'
  | 'Gulf Coast'
  | 'Middle East'
  | 'West Africa'
  | 'Asia Pacific';

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';
export type TrendDirection = 'up' | 'down' | 'steady';
export type NodeStatus = 'online' | 'warning' | 'offline';

export interface ApiResponse<T> {
  ok: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface MarketQueryParams {
  region?: Region | string;
  start?: string;
  end?: string;
  limit?: number;
}

export interface PricePoint {
  timestamp: string;
  value: number;
  delta?: number;
}

export interface OilPrice {
  id: string;
  benchmark: string;
  region: Region;
  price: number;
  currency: string;
  unit: string;
  change: number;
  trend: TrendDirection;
  updatedAt: string;
}

export interface SupplyNode {
  id: string;
  name: string;
  region: Region;
  status: NodeStatus;
  throughput: number;
  capacity: number;
  utilization: number;
  eta?: string;
}

export interface MarketAlert {
  id: string;
  title: string;
  summary: string;
  region: Region;
  severity: RiskLevel;
  trend: TrendDirection;
  value: number;
  timestamp: string;
}

export interface MarketOverview {
  generatedAt: string;
  region: Region;
  prices: OilPrice[];
  alerts: MarketAlert[];
  nodes: SupplyNode[];
}

export interface ScenarioPlan {
  id: string;
  name: string;
  description: string;
  region: Region;
  impactScore: number;
  confidence: number;
}
