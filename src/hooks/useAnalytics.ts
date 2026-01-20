import { useCallback, useEffect, useRef } from 'react';
import { useBrowserStore } from '@/store/browserStore';
import type { AnalyticsEvent } from '@/types/browser';

export const useAnalytics = () => {
  const { settings } = useBrowserStore();
  const sessionStartTime = useRef<number>(Date.now());
  const eventsQueue = useRef<AnalyticsEvent[]>([]);

  const extractDomain = (url: string): string => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return 'unknown';
    }
  };

  const trackEvent = useCallback((event: Omit<AnalyticsEvent, 'timestamp'>) => {
    if (!settings.analyticsConsent) return;

    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
    };

    eventsQueue.current.push(fullEvent);
    
    // In a real app, you'd send this to your analytics server
    console.log('[Analytics]', fullEvent);
  }, [settings.analyticsConsent]);

  const trackPageVisit = useCallback((url: string) => {
    const domain = extractDomain(url);
    trackEvent({
      type: 'page_visit',
      data: { domain },
    });
  }, [trackEvent]);

  const trackButtonClick = useCallback((buttonId: string) => {
    trackEvent({
      type: 'button_click',
      data: { buttonId },
    });
  }, [trackEvent]);

  const trackSessionStart = useCallback(() => {
    sessionStartTime.current = Date.now();
    trackEvent({
      type: 'session_start',
      data: {},
    });
  }, [trackEvent]);

  const trackSessionEnd = useCallback(() => {
    const sessionDuration = Date.now() - sessionStartTime.current;
    trackEvent({
      type: 'session_end',
      data: { sessionDuration },
    });
  }, [trackEvent]);

  useEffect(() => {
    if (settings.analyticsConsent) {
      trackSessionStart();
    }

    return () => {
      if (settings.analyticsConsent) {
        trackSessionEnd();
      }
    };
  }, [settings.analyticsConsent, trackSessionStart, trackSessionEnd]);

  return {
    trackPageVisit,
    trackButtonClick,
    getEventsQueue: () => eventsQueue.current,
  };
};
