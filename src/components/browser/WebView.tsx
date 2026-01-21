import React, { useEffect, useState, useCallback } from 'react';
import { AlertTriangle, Smartphone, Home } from 'lucide-react';
import { useBrowserStore, HOMEPAGE_URL } from '@/store/browserStore';
import { HomePage } from './HomePage';
import { isExternalUrl, isNativePlatform, openInNativeWebView } from '@/lib/nativeBrowser';
import { Button } from '@/components/ui/button';

export const WebView: React.FC = () => {
  const { activeTabId, tabs, updateTab, navigateTo } = useBrowserStore();
  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const [error, setError] = useState<string | null>(null);

  // Check if we're on the homepage
  const isHomePage = activeTab?.url === HOMEPAGE_URL || 
                     activeTab?.url === 'kisscam://home' ||
                     activeTab?.url?.startsWith('kisscam://');

  // Check if current URL is external
  const isExternal = activeTab?.url ? isExternalUrl(activeTab.url) : false;

  // Handle navigation to external URL on native platform
  useEffect(() => {
    if (activeTab && isExternal && isNativePlatform()) {
      // Open in native WebView
      openInNativeWebView(activeTab.url).then((success) => {
        if (success) {
          // Navigate back to home after opening native browser
          navigateTo(activeTab.id, HOMEPAGE_URL);
        }
      });
    }
  }, [activeTab?.url, isExternal, navigateTo, activeTab?.id]);

  // Handle loading state
  useEffect(() => {
    if (activeTab?.isLoading) {
      setError(null);
      
      // Handle homepage - immediately mark as loaded
      if (activeTab.url === HOMEPAGE_URL || activeTab.url?.startsWith('kisscam://')) {
        updateTab(activeTab.id, { 
          isLoading: false, 
          title: 'KissCam Home' 
        });
        return;
      }
      
      // For external URLs, mark as loaded quickly
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
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab?.isLoading, activeTab?.url, activeTab?.id, updateTab]);

  const handleGoHome = useCallback(() => {
    if (activeTabId) {
      navigateTo(activeTabId, HOMEPAGE_URL);
    }
  }, [activeTabId, navigateTo]);

  // No tab open - show homepage
  if (!activeTab) {
    return <HomePage />;
  }

  // Show homepage for internal kisscam:// URLs
  if (isHomePage) {
    return <HomePage />;
  }

  // Loading state
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

  // Error state
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-webview">
        <div className="text-center max-w-md px-4">
          <AlertTriangle className="w-16 h-16 mx-auto text-destructive/60 mb-4" />
          <p className="text-foreground text-lg font-medium">{error}</p>
          <Button onClick={handleGoHome} variant="outline" className="mt-4">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  // External URL on web platform - show "install app" message
  if (isExternal && !isNativePlatform()) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Smartphone className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-3">
            External Sites Open in the App
          </h2>
          
          <p className="text-muted-foreground mb-4">
            For the best experience, external websites like{' '}
            <span className="font-medium text-foreground">
              {(() => {
                try {
                  return new URL(activeTab.url).hostname.replace('www.', '');
                } catch {
                  return activeTab.url;
                }
              })()}
            </span>{' '}
            open inside the installed KissCam app using a native browser view.
          </p>

          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Why?</strong> Many streaming sites block iframe embedding for security. 
              The native app uses a full WebView that works with all websites.
            </p>
          </div>

          <div className="space-y-3">
            <Button onClick={handleGoHome} className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Install KissCam on your device for full functionality
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to homepage
  return <HomePage />;
};
