export interface Tab {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  isLoading: boolean;
}

export interface AnalyticsEvent {
  type: 'page_visit' | 'button_click' | 'session_start' | 'session_end';
  timestamp: number;
  data: {
    domain?: string;
    buttonId?: string;
    sessionDuration?: number;
  };
}

export interface BrowserSettings {
  analyticsConsent: boolean;
  hasSeenConsentPopup: boolean;
}
