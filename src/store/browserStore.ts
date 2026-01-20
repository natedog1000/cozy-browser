import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Tab, BrowserSettings } from '@/types/browser';

interface BrowserState {
  tabs: Tab[];
  activeTabId: string | null;
  settings: BrowserSettings;
  
  // Tab actions
  addTab: (url?: string) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<Tab>) => void;
  
  // Navigation history per tab
  history: Record<string, { urls: string[]; currentIndex: number }>;
  navigateTo: (tabId: string, url: string) => void;
  goBack: (tabId: string) => void;
  goForward: (tabId: string) => void;
  canGoBack: (tabId: string) => boolean;
  canGoForward: (tabId: string) => boolean;
  
  // Settings actions
  updateSettings: (updates: Partial<BrowserSettings>) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

// Use internal homepage as default
const DEFAULT_URL = 'kisscam://home';
export const HOMEPAGE_URL = 'kisscam://home';

export const useBrowserStore = create<BrowserState>()(
  persist(
    (set, get) => ({
      tabs: [],
      activeTabId: null,
      settings: {
        analyticsConsent: false,
        hasSeenConsentPopup: false,
      },
      history: {},

      addTab: (url = DEFAULT_URL) => {
        const id = generateId();
        const newTab: Tab = {
          id,
          url,
          title: 'New Tab',
          isLoading: true,
        };
        
        set((state) => ({
          tabs: [...state.tabs, newTab],
          activeTabId: id,
          history: {
            ...state.history,
            [id]: { urls: [url], currentIndex: 0 },
          },
        }));
      },

      closeTab: (id) => {
        set((state) => {
          const newTabs = state.tabs.filter((tab) => tab.id !== id);
          const { [id]: _, ...newHistory } = state.history;
          
          let newActiveTabId = state.activeTabId;
          if (state.activeTabId === id) {
            const closedIndex = state.tabs.findIndex((tab) => tab.id === id);
            if (newTabs.length > 0) {
              newActiveTabId = newTabs[Math.min(closedIndex, newTabs.length - 1)].id;
            } else {
              newActiveTabId = null;
            }
          }
          
          return {
            tabs: newTabs,
            activeTabId: newActiveTabId,
            history: newHistory,
          };
        });
      },

      setActiveTab: (id) => set({ activeTabId: id }),

      updateTab: (id, updates) => {
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.id === id ? { ...tab, ...updates } : tab
          ),
        }));
      },

      navigateTo: (tabId, url) => {
        const state = get();
        const tabHistory = state.history[tabId] || { urls: [], currentIndex: -1 };
        
        // Add new URL and truncate forward history
        const newUrls = [...tabHistory.urls.slice(0, tabHistory.currentIndex + 1), url];
        
        set({
          history: {
            ...state.history,
            [tabId]: {
              urls: newUrls,
              currentIndex: newUrls.length - 1,
            },
          },
        });
        
        state.updateTab(tabId, { url, isLoading: true });
      },

      goBack: (tabId) => {
        const state = get();
        const tabHistory = state.history[tabId];
        if (!tabHistory || tabHistory.currentIndex <= 0) return;
        
        const newIndex = tabHistory.currentIndex - 1;
        const url = tabHistory.urls[newIndex];
        
        set({
          history: {
            ...state.history,
            [tabId]: { ...tabHistory, currentIndex: newIndex },
          },
        });
        
        state.updateTab(tabId, { url, isLoading: true });
      },

      goForward: (tabId) => {
        const state = get();
        const tabHistory = state.history[tabId];
        if (!tabHistory || tabHistory.currentIndex >= tabHistory.urls.length - 1) return;
        
        const newIndex = tabHistory.currentIndex + 1;
        const url = tabHistory.urls[newIndex];
        
        set({
          history: {
            ...state.history,
            [tabId]: { ...tabHistory, currentIndex: newIndex },
          },
        });
        
        state.updateTab(tabId, { url, isLoading: true });
      },

      canGoBack: (tabId) => {
        const tabHistory = get().history[tabId];
        return !!tabHistory && tabHistory.currentIndex > 0;
      },

      canGoForward: (tabId) => {
        const tabHistory = get().history[tabId];
        return !!tabHistory && tabHistory.currentIndex < tabHistory.urls.length - 1;
      },

      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },
    }),
    {
      name: 'browser-storage',
      partialize: (state) => ({
        settings: state.settings,
      }),
    }
  )
);
