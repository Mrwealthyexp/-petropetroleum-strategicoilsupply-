import { useRemoteData } from "./useRemoteData";

export type SPRData = {
  inventory: number;
  capacity: number;
  dailyChange: number;
  asOf: string;
};

export function useSPRData(url = "/api/spr", refreshMs = 300_000) {
  return useRemoteData<SPRData>(url, refreshMs);
}
