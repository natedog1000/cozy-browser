import React from 'react';
import { Shield, BarChart3, X } from 'lucide-react';
import { useBrowserStore } from '@/store/browserStore';

interface ConsentPopupProps {
  onClose: () => void;
}

export const ConsentPopup: React.FC<ConsentPopupProps> = ({ onClose }) => {
  const { updateSettings } = useBrowserStore();

  const handleAccept = () => {
    updateSettings({ 
      analyticsConsent: true, 
      hasSeenConsentPopup: true 
    });
    onClose();
  };

  const handleDecline = () => {
    updateSettings({ 
      analyticsConsent: false, 
      hasSeenConsentPopup: true 
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Popup */}
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden border border-border animate-in fade-in zoom-in-95 duration-300">
        {/* Decorative header */}
        <div className="relative h-24 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,hsl(var(--primary)/0.3),transparent_50%)]" />
          <div className="absolute top-4 right-4">
            <button
              onClick={handleDecline}
              className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Icon */}
        <div className="relative -mt-10 px-6">
          <div className="w-20 h-20 rounded-2xl bg-primary shadow-lg flex items-center justify-center">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome to KissCam ✨
          </h2>
          <p className="text-muted-foreground mb-6">
            Before you start browsing, please review our analytics preferences.
          </p>

          {/* What we collect */}
          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Anonymous Usage Data</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Help us improve by sharing minimal, privacy-focused analytics:
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span><strong className="text-foreground">Session duration</strong> — How long you use the app</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span><strong className="text-foreground">Domains visited</strong> — Only the domain, never full URLs</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span><strong className="text-foreground">Button clicks</strong> — Navigation actions only</span>
              </li>
            </ul>
          </div>

          {/* Privacy note */}
          <p className="text-xs text-muted-foreground text-center mb-6">
            We never collect personal information, passwords, or browsing content.
            You can change this anytime in Settings.
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDecline}
              className="flex-1 py-3 px-4 rounded-xl font-medium text-muted-foreground bg-secondary hover:bg-secondary/80 transition-colors"
            >
              No Thanks
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 py-3 px-4 rounded-xl font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
