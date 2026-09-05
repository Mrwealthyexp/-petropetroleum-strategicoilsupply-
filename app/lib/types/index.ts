// Oil Market Types
export interface OilPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: Date;
}

export interface SupplyRoute {
  id: string;
  origin: string;
  destination: string;
  tonnage: number;
  eta: Date;
  status: 'in-transit' | 'delayed' | 'completed';
}

export interface GeopoliticalRisk {
  country: string;
  region: string;
  riskLevel: number; // 0-10
  description: string;
  impact: 'high' | 'medium' | 'low';
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  impactOnPrice: number;
  impactOnSupply: number;
  probability: number;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  updateFrequency: 'real-time' | 'hourly' | 'daily';
  alerts: {
    priceChange: number;
    supplyDisruption: boolean;
    geopoliticalRisk: boolean;
  };
}
