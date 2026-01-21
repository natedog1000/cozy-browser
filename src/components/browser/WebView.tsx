import React, { useEffect, useState, useRef, useCallback } from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { useBrowserStore, HOMEPAGE_URL } from '@/store/browserStore';
import { HomePage } from './HomePage';
import { isExternalUrl } from '@/lib/nativeBrowser';

export const WebView: React.FC = () => {
  const { activeTabId, tabs, updateTab, navigateTo } = useBrowserStore();
  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Check if we're on the homepage - handle both with and without protocol
  const isHomePage = activeTab?.url === HOMEPAGE_URL || 
                     activeTab?.url === 'kisscam://home' ||
                     activeTab?.url?.startsWith('kisscam://');

  // Handle iframe load events
  const handleIframeLoad = useCallback(() => {
    if (!activeTab) return;
    
    try {
      const url = new URL(activeTab.url);
      updateTab(activeTab.id, { 
        isLoading: false,
        title: url.hostname.replace('www.', '')
      });
    } catch {
      updateTab(activeTab.id, { isLoading: false });
    }
  }, [activeTab?.id, activeTab?.url, updateTab]);

  // Handle iframe errors
  const handleIframeError = useCallback(() => {
    if (activeTab) {
      setError('Unable to load this page. The site may block embedding.');
      updateTab(activeTab.id, { isLoading: false });
    }
  }, [activeTab?.id, updateTab]);

  useEffect(() => {
    if (activeTab?.isLoading) {
      setError(null);
      
      // Handle homepage specially - immediately mark as loaded
      if (activeTab.url === HOMEPAGE_URL || activeTab.url?.startsWith('kisscam://')) {
        updateTab(activeTab.id, { 
          isLoading: false, 
          title: 'KissCam Home' 
        });
        return;
      }
      
      // Set a timeout for loading external URLs
      const timer = setTimeout(() => {
        if (activeTab.isLoading) {
          try {
            const url = new URL(activeTab.url);
            updateTab(activeTab.id, { 
              isLoading: false, 
              title: url.hostname.replace('www.', '') 
            });
          } catch {
            updateTab(activeTab.id, { 
              isLoading: false, 
              title: 'Invalid URL' 
            });
            setError('Unable to load this page');
          }
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab?.isLoading, activeTab?.url, activeTab?.id, updateTab]);

  // No tab open - show homepage
  if (!activeTab) {
    return <HomePage />;
  }

  // ALWAYS show homepage for internal kisscam:// URLs (regardless of loading state)
  if (isHomePage) {
    return <HomePage />;
  }

  if (activeTab.isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-webview">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
          <p className="text-muted-foreground/60 text-sm mt-1 truncate max-w-md">
            {activeTab.url}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-webview">
        <div className="text-center max-w-md px-4">
          <AlertTriangle className="w-16 h-16 mx-auto text-destructive/60 mb-4" />
          <p className="text-foreground text-lg font-medium">{error}</p>
          <p className="text-muted-foreground text-sm mt-2">
            Some websites prevent embedding for security reasons.
          </p>
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <ExternalLink className="w-3 h-3" />
              {activeTab.url}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Load external websites in an iframe within the app
  return (
    <div className="flex-1 flex flex-col bg-webview overflow-hidden">
      <iframe
        ref={iframeRef}
        src={activeTab.url}
        className="w-full h-full border-0"
        title={activeTab.title || 'Web page'}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads allow-popups-to-escape-sandbox"
        referrerPolicy="no-referrer-when-downgrade"
        allow="camera; microphone; geolocation; payment; autoplay; fullscreen"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
    </div>
  );
};
