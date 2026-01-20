import React from 'react';
import kisscamLogo from '@/assets/kisscam-logo.png';
import heroBackground from '@/assets/hero-background.jpg';
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
      className="flex-1 relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Soft pink overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-homepage-overlay/40 via-homepage-overlay/20 to-homepage-overlay/50" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start h-full pt-12 px-8">
        {/* Logo with glow effect */}
        <div className="relative mb-10">
          <div className="absolute inset-0 blur-2xl bg-white/60 rounded-full scale-125" />
          <img 
            src={kisscamLogo} 
            alt="KissCam" 
            className="relative w-72 h-auto drop-shadow-2xl"
          />
        </div>

        {/* Platform tiles grid */}
        <div className="grid grid-cols-3 gap-5 max-w-3xl">
          {platforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handleTileClick(platform.url, platform.name)}
              className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-white/90 backdrop-blur-sm shadow-homepage-tile hover:shadow-homepage-tile-hover transition-all duration-300 hover:scale-105 hover:-translate-y-1 min-w-[180px]"
            >
              {/* Subtle gradient border on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              
              {/* Icon */}
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {platform.icon}
              </span>
              
              {/* Platform name */}
              <span className="text-homepage-tile-text font-semibold text-lg tracking-wide">
                {platform.name}
              </span>
              
              {/* Subtle pink accent line */}
              <div className={`mt-3 w-12 h-1 rounded-full bg-gradient-to-r ${platform.gradient} opacity-60 group-hover:w-16 group-hover:opacity-100 transition-all duration-300`} />
            </button>
          ))}
        </div>

        {/* Subtle tagline */}
        <p className="mt-10 text-homepage-tagline text-sm font-medium tracking-wider uppercase">
          Your streaming launchpad ✨
        </p>
      </div>
    </div>
  );
};
