import React, { useEffect, useState } from 'react';
import { Globe, Lock, AlertTriangle } from 'lucide-react';
import { useBrowserStore, HOMEPAGE_URL } from '@/store/browserStore';
import { HomePage } from './HomePage';

export const WebView: React.FC = () => {
  const { activeTabId, tabs, updateTab } = useBrowserStore();
  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const [error, setError] = useState<string | null>(null);

  // Check if we're on the homepage - handle both with and without protocol
  const isHomePage = activeTab?.url === HOMEPAGE_URL || 
                     activeTab?.url === 'kisscam://home' ||
                     activeTab?.url?.startsWith('kisscam://');

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
      
      // Simulate page load for external URLs
      const timer = setTimeout(() => {
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
      }, 800);
      
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
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-destructive/60 mb-4" />
          <p className="text-foreground text-lg font-medium">{error}</p>
          <p className="text-muted-foreground text-sm mt-2 max-w-md">
            Please check the URL and try again.
          </p>
        </div>
      </div>
    );
  }

  // Load actual websites in an iframe
  return (
    <div className="flex-1 flex flex-col bg-webview overflow-hidden">
      <iframe
        src={activeTab.url}
        className="w-full h-full border-0"
        title={activeTab.title || 'Web page'}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => {
          // Update tab title based on URL if we can't access the iframe's document
          try {
            const url = new URL(activeTab.url);
            updateTab(activeTab.id, { 
              isLoading: false,
              title: url.hostname.replace('www.', '')
            });
          } catch {}
        }}
      />
    </div>
  );
};
