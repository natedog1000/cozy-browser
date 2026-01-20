import React from 'react';
import kisscamLogo from '@/assets/kisscam-logo.png';
import heroBackground from '@/assets/hero-background.png';
import { useBrowserStore } from '@/store/browserStore';

interface PlatformTile {
  name: string;
  url: string;
  gradient: string;
  icon: string;
}

const platforms: PlatformTile[] = [
  {
    name: 'Chaturbate',
    url: 'https://chaturbate.com/',
    gradient: 'from-pink-400 to-pink-500',
    icon: '💋',
  },
  {
    name: 'BongaModels',
    url: 'https://bongamodels.com/',
    gradient: 'from-rose-300 to-rose-400',
    icon: '🎀',
  },
  {
    name: 'MyFreeCams',
    url: 'https://www.myfreecams.com/modelweb/',
    gradient: 'from-pink-300 to-rose-300',
    icon: '📹',
  },
  {
    name: 'Stripchat',
    url: 'https://stripchat.com/start-broadcasting',
    gradient: 'from-rose-400 to-pink-400',
    icon: '💝',
  },
  {
    name: 'CamSoda',
    url: 'https://www.camsoda.com/',
    gradient: 'from-pink-400 to-rose-400',
    icon: '🌸',
  },
  {
    name: 'Cam4',
    url: 'https://www.cam4.com/login',
    gradient: 'from-rose-300 to-pink-300',
    icon: '✨',
  },
];

export const HomePage: React.FC = () => {
  const { activeTabId, navigateTo, updateTab } = useBrowserStore();

  const handleTileClick = (url: string, name: string) => {
    if (activeTabId) {
      navigateTo(activeTabId, url);
      updateTab(activeTabId, { title: name });
    }
  };

  return (
    <div 
      className="flex-1 relative overflow-hidden min-h-0"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Soft pink overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-pink-50/30 to-white/60" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start h-full pt-8 px-8 overflow-auto">
        {/* Logo with glow effect */}
        <div className="relative mb-8 flex-shrink-0">
          <div className="absolute inset-0 blur-3xl bg-white/80 rounded-full scale-150" />
          <img 
            src={kisscamLogo} 
            alt="KissCam" 
            width={280}
            height={140}
            className="relative z-10 w-[280px] h-auto object-contain drop-shadow-2xl"
            style={{ maxWidth: '280px' }}
          />
        </div>

        {/* Platform tiles grid */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl w-full">
          {platforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handleTileClick(platform.url, platform.name)}
              className="group relative flex flex-col items-center justify-center p-5 rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-pink-100/50"
            >
              {/* Subtle gradient border on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />
              
              {/* Icon */}
              <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {platform.icon}
              </span>
              
              {/* Platform name */}
              <span className="text-gray-700 font-semibold text-base tracking-wide">
                {platform.name}
              </span>
              
              {/* Subtle pink accent line */}
              <div className={`mt-2 w-10 h-1 rounded-full bg-gradient-to-r ${platform.gradient} opacity-50 group-hover:w-14 group-hover:opacity-100 transition-all duration-300`} />
            </button>
          ))}
        </div>

        {/* Subtle tagline */}
        <p className="mt-8 text-pink-400/80 text-sm font-medium tracking-wider uppercase">
          Your streaming launchpad ✨
        </p>
      </div>
    </div>
  );
};
