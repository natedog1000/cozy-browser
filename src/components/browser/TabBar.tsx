import React from 'react';
import { X, Plus } from 'lucide-react';
import { useBrowserStore } from '@/store/browserStore';
import { cn } from '@/lib/utils';

export const TabBar: React.FC = () => {
  const { tabs, activeTabId, addTab, closeTab, setActiveTab } = useBrowserStore();

  return (
    <div className="flex items-center gap-1 px-2 py-1.5 bg-toolbar border-b border-border overflow-x-auto">
      <div className="flex items-center gap-1 flex-1 min-w-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'group flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 min-w-[120px] max-w-[200px]',
              activeTabId === tab.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-tab-inactive text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
          >
            {tab.favicon ? (
              <img src={tab.favicon} alt="" className="w-4 h-4 rounded-sm" />
            ) : (
              <div className="w-4 h-4 rounded-sm bg-muted flex items-center justify-center">
                <span className="text-[10px] font-bold text-muted-foreground">
                  {tab.title.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="truncate flex-1 text-left">{tab.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className={cn(
                'opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-black/10 transition-opacity',
                activeTabId === tab.id && 'hover:bg-white/20'
              )}
            >
              <X className="w-3 h-3" />
            </button>
          </button>
        ))}
      </div>
      
      <button
        onClick={() => addTab()}
        className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
        title="New Tab"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
