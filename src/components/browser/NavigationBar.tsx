import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Settings } from 'lucide-react';
import { useBrowserStore } from '@/store/browserStore';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from '@/lib/utils';

interface NavigationBarProps {
  onOpenSettings: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ onOpenSettings }) => {
  const { 
    activeTabId, 
    tabs, 
    navigateTo, 
    goBack, 
    goForward, 
    canGoBack, 
    canGoForward,
    updateTab 
  } = useBrowserStore();
  const { trackButtonClick, trackPageVisit } = useAnalytics();
  
  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const [inputUrl, setInputUrl] = useState(activeTab?.url || '');

  useEffect(() => {
    if (activeTab) {
      setInputUrl(activeTab.url);
    }
  }, [activeTab?.url, activeTabId]);

  const handleNavigate = () => {
    if (!activeTabId || !inputUrl.trim()) return;
    
    let url = inputUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    trackButtonClick('go');
    trackPageVisit(url);
    navigateTo(activeTabId, url);
    setInputUrl(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  };

  const handleBack = () => {
    if (!activeTabId) return;
    trackButtonClick('back');
    goBack(activeTabId);
  };

  const handleForward = () => {
    if (!activeTabId) return;
    trackButtonClick('forward');
    goForward(activeTabId);
  };

  const handleReload = () => {
    if (!activeTabId || !activeTab) return;
    trackButtonClick('reload');
    updateTab(activeTabId, { isLoading: true });
    // Simulate reload
    setTimeout(() => updateTab(activeTabId, { isLoading: false }), 500);
  };

  const handleHome = () => {
    if (!activeTabId) return;
    trackButtonClick('home');
    navigateTo(activeTabId, 'https://www.google.com');
    trackPageVisit('https://www.google.com');
  };

  const isBackDisabled = !activeTabId || !canGoBack(activeTabId);
  const isForwardDisabled = !activeTabId || !canGoForward(activeTabId);

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-toolbar border-b border-border">
      {/* Navigation Buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={handleBack}
          disabled={isBackDisabled}
          className={cn(
            'p-2 rounded-lg transition-all duration-200',
            isBackDisabled
              ? 'text-muted-foreground/40 cursor-not-allowed'
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          )}
          title="Go Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleForward}
          disabled={isForwardDisabled}
          className={cn(
            'p-2 rounded-lg transition-all duration-200',
            isForwardDisabled
              ? 'text-muted-foreground/40 cursor-not-allowed'
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          )}
          title="Go Forward"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleReload}
          disabled={!activeTabId}
          className={cn(
            'p-2 rounded-lg transition-all duration-200',
            !activeTabId
              ? 'text-muted-foreground/40 cursor-not-allowed'
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
            activeTab?.isLoading && 'animate-spin'
          )}
          title="Reload"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleHome}
          disabled={!activeTabId}
          className={cn(
            'p-2 rounded-lg transition-all duration-200',
            !activeTabId
              ? 'text-muted-foreground/40 cursor-not-allowed'
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          )}
          title="Home"
        >
          <Home className="w-4 h-4" />
        </button>
      </div>

      {/* URL Bar */}
      <div className="flex-1 flex items-center gap-2">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter URL..."
          className="flex-1 px-4 py-2 bg-urlbar rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          disabled={!activeTabId}
        />
        <button
          onClick={handleNavigate}
          disabled={!activeTabId || !inputUrl.trim()}
          className={cn(
            'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
            !activeTabId || !inputUrl.trim()
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
          )}
        >
          Go
        </button>
      </div>

      {/* Settings Button */}
      <button
        onClick={() => {
          trackButtonClick('settings');
          onOpenSettings();
        }}
        className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200"
        title="Settings"
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
};
