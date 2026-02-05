

# Build KissCam as a Mac Desktop App

## The Problem
Capacitor iOS creates iPhone apps, not Mac apps. To create a downloadable `.app` file that works like Chrome, we need to use **Electron**.

## What I'll Do

### 1. Install Electron Dependencies
Add the following packages:
- `electron` - The framework that wraps your web app as a desktop app
- `electron-builder` - Tool to package and create the `.app` and `.zip` files

### 2. Create Electron Main File
Create `electron/main.js` - This is the entry point that:
- Creates a browser window
- Loads your KissCam app inside it
- Handles window close/minimize behavior

### 3. Create Electron Preload Script
Create `electron/preload.js` - Security bridge between the app and system

### 4. Update package.json
Add these scripts:
```json
"electron:dev": "electron .",
"electron:build": "npm run build && electron-builder"
```

Add Electron builder configuration:
```json
"build": {
  "appId": "app.kisscam",
  "productName": "KissCam",
  "mac": {
    "target": ["zip"],
    "icon": "public/favicon.png"
  }
}
```

### 5. Create Build Script
Add a simple command that:
1. Builds the web app (`npm run build`)
2. Packages it as a Mac app
3. Creates a `.zip` file ready for download

## After This Change

You'll run:
```bash
git pull
npm install
npm run electron:build
```

This creates: `dist-electron/KissCam.app` and `dist-electron/KissCam-mac.zip`

## For Your Website Download Button

Upload the `.zip` file to your hosting (or use a service like GitHub Releases), then link to it:
```html
<a href="/downloads/KissCam-mac.zip" download>Download KissCam for Mac</a>
```

## Technical Details

**Files to create:**
- `electron/main.js` - Main process (creates window, loads app)
- `electron/preload.js` - Security preload script

**Files to modify:**
- `package.json` - Add electron dependencies and build config

**New dependencies:**
- `electron` (dev dependency)
- `electron-builder` (dev dependency)

**Build output:**
- `dist-electron/KissCam.app` - The Mac application
- `dist-electron/KissCam-mac.zip` - Zipped version for download

