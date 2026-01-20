import React from 'react';
import { X, Shield, BarChart3, Eye, EyeOff } from 'lucide-react';
import { useBrowserStore } from '@/store/browserStore';
import { cn } from '@/lib/utils';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useBrowserStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Settings</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Privacy Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-medium text-foreground">Privacy & Analytics</h3>
            </div>

            {/* Analytics Toggle */}
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">Usage Analytics</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Help improve this browser by sharing anonymous usage data.
                  </p>
                </div>
                <button
                  onClick={() => updateSettings({ analyticsConsent: !settings.analyticsConsent })}
                  className={cn(
                    'relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0',
                    settings.analyticsConsent ? 'bg-primary' : 'bg-muted'
                  )}
                >
                  <div
                    className={cn(
                      'absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
                      settings.analyticsConsent ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>

              {/* Status indicator */}
              <div className={cn(
                'flex items-center gap-2 mt-3 pt-3 border-t border-border text-sm',
                settings.analyticsConsent ? 'text-primary' : 'text-muted-foreground'
              )}>
                {settings.analyticsConsent ? (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Analytics enabled</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4" />
                    <span>Analytics disabled</span>
                  </>
                )}
              </div>
            </div>

            {/* What we collect */}
            <div className="mt-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                What we collect
              </p>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Session duration (how long you use the app)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Pages visited (domain only, no full URLs)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Button clicks (navigation actions)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/30 border-t border-border">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
