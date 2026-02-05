
# Fix: Make KissCam a Standalone App

## The Problem
The app currently tries to load from Lovable's website (which requires login) instead of running as a standalone app.

## What I'll Change

### File: `capacitor.config.ts`
Remove the `server` section that points to Lovable's URL:

```typescript
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
```

---

## After I Make This Change

Run these commands on your computer (in Terminal, inside the project folder):

```bash
git pull
npm run build
npx cap sync
npx cap open ios
```

---

## Then in Xcode (Step-by-Step)

1. **Left sidebar**: Click on **"App"** (the blue app icon at the top)
2. **Main area**: Click the **"Signing & Capabilities"** tab
3. **Team dropdown**: Select your Apple ID (add one in Xcode → Settings → Accounts if needed)
4. **Bundle Identifier**: Change to something unique like `com.yourname.kisscam`
5. **Top menu**: Click **Product → Destination → My Mac**
6. **Top menu**: Click **Product → Archive** (wait for it to build)
7. **When Archive window opens**: Click **Distribute App → Copy App**
8. **Choose a folder**: This saves your final `KissCam.app` file

That `.app` file is what you share with models - they just double-click to install!

---

## About AI Controlling Xcode

Unfortunately, AI assistants (including ChatGPT and me) cannot control software on your computer. We can only provide instructions that you follow manually. There's no way for us to click buttons, type in Xcode, or run commands for you.
