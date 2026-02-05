# Browser App

 # KissCam Browser
 
 A standalone desktop browser app built with React and Capacitor for Mac and Windows. Features a custom homepage with quick access to streaming platforms.

## Features

 - 🎀 Custom KissCam branded homepage
 - 🔗 Quick access to streaming platforms (Chaturbate, BongaCams, Stripchat, etc.)
 - 📑 Multiple tabs support
 - ⚙️ Settings with analytics consent toggle
 - 📱 Native desktop app (Mac & Windows)

## Run Locally

```bash
npm install
npm run dev
```

## Build for Desktop

 ### Prerequisites
 - **Mac**: Xcode installed
 - **Windows**: Android Studio installed

 ### 1. Export to GitHub and clone locally

 ### 2. Install dependencies & setup

```bash
 npm install
 npx cap add ios      # For Mac
 npx cap add android  # For Windows
npm run build
npx cap sync
```

 ### 3. Run on device/emulator
 
 ```bash
 npx cap run ios      # Mac (opens in Xcode)
 npx cap run android  # Windows (opens in Android Studio)
 ```
 
 ### 4. Build final app

 - **Mac (.dmg)**: Build in Xcode → Product → Archive
 - **Windows (.exe)**: Build in Android Studio or use Electron for native Windows
 
 ## App Configuration
 
 - **App ID**: `app.lovable.kisscam`
 - **App Name**: KissCam
 - **Web Directory**: `dist`
