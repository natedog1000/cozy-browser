import React from 'react';
import kisscamLogo from '@/assets/kisscam-logo.png';
import heroBackground from '@/assets/hero-background.png';
import chaturbateLogo from '@/assets/chaturbate-logo.png';
import bongacamsLogo from '@/assets/bongacams-logo.png';
import myfreecamsLogo from '@/assets/myfreecams-logo.png';
import stripchatLogo from '@/assets/stripchat-logo.png';
import camsodaLogo from '@/assets/camsoda-logo.png';
import cam4Logo from '@/assets/cam4-logo.png';
import twitchLogo from '@/assets/twitch-logo.png';
import { useBrowserStore } from '@/store/browserStore';

interface PlatformTile {
  name: string;
  url: string;
  logo: string;
}

const platforms: PlatformTile[] = [
  {
    name: 'Chaturbate',
    url: 'https://chaturbate.com/',
    logo: chaturbateLogo,
  },
  {
    name: 'BongaCams',
    url: 'https://bongamodels.com/',
    logo: bongacamsLogo,
  },
  {
    name: 'MyFreeCams',
    url: 'https://www.myfreecams.com/modelweb/',
    logo: myfreecamsLogo,
  },
  {
    name: 'Stripchat',
    url: 'https://stripchat.com/start-broadcasting',
    logo: stripchatLogo,
  },
  {
    name: 'CamSoda',
    url: 'https://www.camsoda.com/',
    logo: camsodaLogo,
  },
  {
    name: 'Cam4',
    url: 'https://www.cam4.com/login',
    logo: cam4Logo,
  },
];

const twitchPlatform: PlatformTile = {
  name: 'Twitch',
  url: 'https://www.twitch.tv',
  logo: twitchLogo,
};

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
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start h-full pt-8 px-8 overflow-auto">
        {/* KissCam Logo */}
        <div className="mb-8 flex-shrink-0">
          <img 
            src={kisscamLogo} 
            alt="KissCam" 
            className="w-[400px] h-auto object-contain"
          />
        </div>

        {/* Platform tiles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          {platforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handleTileClick(platform.url, platform.name)}
              className="group flex items-center justify-center p-6 rounded-3xl bg-white/65 backdrop-blur-sm hover:scale-105 transition-all duration-300 drop-shadow-md hover:drop-shadow-lg w-[260px] h-[140px] sm:w-[280px] sm:h-[150px] lg:w-[320px] lg:h-[180px] flex-shrink-0"
            >
              <img 
                src={platform.logo} 
                alt={platform.name}
                className="max-w-full h-auto max-h-24 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </button>
          ))}
        </div>

        {/* Twitch centered below */}
        <div className="flex justify-center w-full mt-2">
          <button
            onClick={() => handleTileClick(twitchPlatform.url, twitchPlatform.name)}
            className="group flex items-center justify-center p-6 rounded-3xl bg-white/65 backdrop-blur-sm hover:scale-105 transition-all duration-300 drop-shadow-md hover:drop-shadow-lg w-[260px] h-[140px] sm:w-[280px] sm:h-[150px] lg:w-[320px] lg:h-[180px] flex-shrink-0"
          >
            <img 
              src={twitchPlatform.logo} 
              alt={twitchPlatform.name}
              className="max-w-full h-auto max-h-24 object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Subtle tagline */}
        <p className="mt-8 text-pink-600/80 text-sm font-medium tracking-wider uppercase">
          Your streaming launchpad ✨
        </p>
      </div>
    </div>
  );
};
