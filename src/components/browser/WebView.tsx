import React, { useEffect, useState } from 'react';
import { Globe, Lock, AlertTriangle } from 'lucide-react';
import { useBrowserStore } from '@/store/browserStore';

export const WebView: React.FC = () => {
  const { activeTabId, tabs, updateTab } = useBrowserStore();
  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab?.isLoading) {
      setError(null);
      // Simulate page load
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

  if (!activeTab) {
    return (
      <div className="flex-1 flex items-center justify-center bg-webview">
        <div className="text-center">
          <Globe className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground text-lg">No tab open</p>
          <p className="text-muted-foreground/60 text-sm mt-1">
            Click the + button to create a new tab
          </p>
        </div>
      </div>
    );
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

  // In a real Capacitor/Electron app, this would be an actual webview
  // For demo purposes, we show a mock preview
  const isSecure = activeTab.url.startsWith('https://');
  let domain = 'unknown';
  try {
    domain = new URL(activeTab.url).hostname;
  } catch {}

  return (
    <div className="flex-1 flex flex-col bg-webview overflow-hidden">
      {/* Security indicator bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border text-xs">
        {isSecure ? (
          <Lock className="w-3 h-3 text-green-600" />
        ) : (
          <AlertTriangle className="w-3 h-3 text-amber-500" />
        )}
        <span className={isSecure ? 'text-green-600' : 'text-amber-500'}>
          {isSecure ? 'Secure connection' : 'Not secure'}
        </span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">{domain}</span>
      </div>
      
      {/* Mock page content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6">
            <Globe className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {domain}
          </h2>
          <p className="text-muted-foreground mb-6">
            This is a browser simulation. In a real Capacitor desktop app, 
            the actual webpage would be displayed here using a WebView component.
          </p>
          <div className="p-4 bg-muted/50 rounded-lg text-left">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Current URL:</strong>
              <br />
              <code className="text-primary break-all">{activeTab.url}</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
