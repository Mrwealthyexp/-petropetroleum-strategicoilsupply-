import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { MarketAlert, MarketOverview, OilPrice, Region, SupplyNode } from '../types';

export interface AppState {
  selectedRegion: Region | 'Global';
  selectedNodeId: string | null;
  alerts: MarketAlert[];
  prices: OilPrice[];
  nodes: SupplyNode[];
  market: MarketOverview | null;
  favoriteRegions: Region[];
  isHydrated: boolean;
  setSelectedRegion: (region: Region | 'Global') => void;
  setSelectedNode: (nodeId: string | null) => void;
  setPrices: (prices: OilPrice[]) => void;
  setNodes: (nodes: SupplyNode[]) => void;
  setAlerts: (alerts: MarketAlert[]) => void;
  setMarket: (market: MarketOverview | null) => void;
  toggleFavoriteRegion: (region: Region) => void;
  hydrate: (snapshot: Partial<AppState>) => void;
  reset: () => void;
}

const initialState = {
  selectedRegion: 'Global' as const,
  selectedNodeId: null,
  alerts: [] as MarketAlert[],
  prices: [] as OilPrice[],
  nodes: [] as SupplyNode[],
  market: null,
  favoriteRegions: [] as Region[],
  isHydrated: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      setSelectedRegion: (region) => set({ selectedRegion: region }),
      setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),
      setPrices: (prices) => set({ prices }),
      setNodes: (nodes) => set({ nodes }),
      setAlerts: (alerts) => set({ alerts }),
      setMarket: (market) => set({ market }),
      toggleFavoriteRegion: (region) =>
        set((state) => ({
          favoriteRegions: state.favoriteRegions.includes(region)
            ? state.favoriteRegions.filter((item) => item !== region)
            : [...state.favoriteRegions, region],
        })),
      hydrate: (snapshot) => set((state) => ({ ...state, ...snapshot, isHydrated: true })),
      reset: () => set({ ...initialState, isHydrated: true }),
    }),
    {
      name: 'strategic-oil-store',
      partialize: (state) => ({
        selectedRegion: state.selectedRegion,
        selectedNodeId: state.selectedNodeId,
        favoriteRegions: state.favoriteRegions,
      }),
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.localStorage : undefined,
      ),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    },
  ),
);

export const selectSelectedRegion = (state: AppState) => state.selectedRegion;
export const selectFavoriteRegions = (state: AppState) => state.favoriteRegions;
export const selectMarket = (state: AppState) => state.market;

export default useAppStore;
