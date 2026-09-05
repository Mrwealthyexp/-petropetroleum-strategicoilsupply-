import { useRemoteData } from "./useRemoteData";

export type OilPrice = {
  symbol: string;
  price: number;
  change: number;
  timestamp: string;
};

export function useOilPrices(url = "/api/oil-prices", refreshMs = 60_000) {
  return useRemoteData<OilPrice[]>(url, refreshMs);
}
