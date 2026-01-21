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
import { isNativePlatform, openInNativeWebView } from '@/lib/nativeBrowser';

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

  const handleTileClick = async (url: string, name: string) => {
    // On native platform, open in native WebView
    if (isNativePlatform()) {
      await openInNativeWebView(url);
      return;
    }
    
    // On web, navigate within the app (will show web-only message)
    if (activeTabId) {
      navigateTo(activeTabId, url);
      updateTab(activeTabId, { title: name });
    }
  };

  return (
    <div 
      className="flex-1 relative min-h-0 h-full"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Content - vertically centered, no scroll */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* KissCam Logo - scales with viewport */}
        <div className="mb-[2vh] flex-shrink-0">
          <img 
            src={kisscamLogo} 
            alt="KissCam" 
            className="h-[10vh] w-auto object-contain"
          />
        </div>

        {/* Platform tiles grid - responsive sizing */}
        <div 
          className="justify-items-center"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 'clamp(12px, 1.5vw, 24px)',
            width: 'min(1080px, 90vw)',
          }}
        >
          {platforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handleTileClick(platform.url, platform.name)}
              className="group flex items-center justify-center rounded-3xl bg-white/65 backdrop-blur-sm hover:scale-105 transition-all duration-300 drop-shadow-md hover:drop-shadow-lg w-full aspect-[16/9]"
            >
              <img 
                src={platform.logo} 
                alt={platform.name}
                className="max-w-[80%] max-h-[60%] object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </button>
          ))}
        </div>

        {/* Twitch centered below */}
        <div 
          className="flex justify-center"
          style={{ 
            marginTop: 'clamp(12px, 1.5vw, 24px)',
            width: 'min(1080px, 90vw)',
          }}
        >
          <button
            onClick={() => handleTileClick(twitchPlatform.url, twitchPlatform.name)}
            className="group flex items-center justify-center rounded-3xl bg-white/65 backdrop-blur-sm hover:scale-105 transition-all duration-300 drop-shadow-md hover:drop-shadow-lg aspect-[16/9]"
            style={{ width: 'calc((min(1080px, 90vw) - clamp(24px, 3vw, 48px)) / 3)' }}
          >
            <img 
              src={twitchPlatform.logo} 
              alt={twitchPlatform.name}
              className="max-w-[80%] max-h-[60%] object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Subtle tagline */}
        <p className="mt-[1.5vh] text-pink-600/80 text-sm font-medium tracking-wider uppercase">
          Your streaming launchpad ✨
        </p>
      </div>
    </div>
  );
};
