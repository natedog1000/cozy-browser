# Browser App

A simple desktop web browser built with React and Capacitor for Mac and Windows.

## Features

- 🔗 URL bar with Go button
- ◀️ Back, forward, reload navigation
- 📑 Multiple tabs support
- ⚙️ Settings with analytics consent toggle
- 🔒 Privacy-focused analytics (domain only)
- 🎯 First-launch consent popup

## Run Locally

```bash
npm install
npm run dev
```

## Build for Desktop

### 1. Export to GitHub and clone locally

### 2. Setup Capacitor

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init "Browser App" "app.browser.desktop"
npx cap add ios      # For Mac
npx cap add android  # For Windows
```

### 3. Build & Run

```bash
npm run build
npx cap sync
npx cap run ios      # Mac (requires Xcode)
npx cap run android  # Windows (requires Android Studio)
```

## Analytics Collected (with consent)

- Session duration
- Domains visited (no full URLs)
- Button clicks
