import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  sidebarOpen: boolean; toggleSidebar: () => void;
  activeSection: string; setActiveSection: (s: string) => void;
  autoRefresh: boolean; toggleAutoRefresh: () => void;
  refreshInterval: number; setRefreshInterval: (n: number) => void;
  globalError: string | null; setGlobalError: (e: string | null) => void; clearError: () => void;
}

export const useAppStore = create<AppState>()(persist((set) => ({
  sidebarOpen: true, toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
  activeSection: "dashboard", setActiveSection: (s) => set({ activeSection: s }),
  autoRefresh: true, toggleAutoRefresh: () => set(s => ({ autoRefresh: !s.autoRefresh })),
  refreshInterval: 60, setRefreshInterval: (n) => set({ refreshInterval: n }),
  globalError: null, setGlobalError: (e) => set({ globalError: e }), clearError: () => set({ globalError: null }),
}), { name: "petropulse-storage", partialize: (s) => ({ sidebarOpen: s.sidebarOpen, autoRefresh: s.autoRefresh, refreshInterval: s.refreshInterval }) }));
