import React, { useState, useEffect } from 'react';
import { TabBar } from './TabBar';
import { NavigationBar } from './NavigationBar';
import { WebView } from './WebView';
import { SettingsModal } from './SettingsModal';
import { ConsentPopup } from './ConsentPopup';
import { useBrowserStore, HOMEPAGE_URL } from '@/store/browserStore';

export const BrowserApp: React.FC = () => {
  const { tabs, addTab, settings } = useBrowserStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  // Show consent popup on first launch
  useEffect(() => {
    if (!settings.hasSeenConsentPopup) {
      setShowConsent(true);
    }
  }, [settings.hasSeenConsentPopup]);

  // Create initial tab with homepage, or force existing tabs to homepage if they have old URLs
  useEffect(() => {
    if (tabs.length === 0) {
      addTab(HOMEPAGE_URL);
    }
  }, [tabs.length, addTab]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Tab Bar */}
      <TabBar />
      
      {/* Navigation Bar */}
      <NavigationBar onOpenSettings={() => setIsSettingsOpen(true)} />
      
      {/* Web View */}
      <WebView />

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

      {/* Consent Popup */}
      {showConsent && (
        <ConsentPopup onClose={() => setShowConsent(false)} />
      )}
    </div>
  );
};
