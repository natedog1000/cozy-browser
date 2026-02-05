 import type { CapacitorConfig } from '@capacitor/cli';
 
 const config: CapacitorConfig = {
   appId: 'app.lovable.kisscam',
   appName: 'KissCam',
   webDir: 'dist',
   server: {
     url: 'https://6e0610d1-e9f0-4e79-80ec-abcbb5701eb6.lovableproject.com?forceHideBadge=true',
     cleartext: true,
   },
   plugins: {
     Browser: {
       // Configure browser plugin for external site loading
     },
   },
 };
 
 export default config;