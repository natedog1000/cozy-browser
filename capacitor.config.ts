 import type { CapacitorConfig } from '@capacitor/cli';
 
 const config: CapacitorConfig = {
   appId: 'app.lovable.kisscam',
   appName: 'KissCam',
   webDir: 'dist',
   plugins: {
     Browser: {
       // Configure browser plugin for external site loading
     },
   },
 };
 
 export default config;