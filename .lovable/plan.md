
# Fix Package.json for Electron Build

## The Problem
Your screenshot shows these errors:
- `description is missed in the package.json`
- `author is missed in the package.json`
- `Package "electron" is only allowed in "devDependencies"`
- `Package "electron-builder" is only allowed in "devDependencies"`
- `Missing script: "electron:build:mac"`

## What I'll Change

### 1. Add Required Metadata Fields
```json
"name": "kisscam",
"description": "KissCam - Desktop browser app for streaming platforms",
"author": "KissCam",
"main": "electron/main.js",
```

### 2. Add Electron Build Scripts
```json
"electron:dev": "ELECTRON_DEV=true electron .",
"electron:build:mac": "npm run build && electron-builder --mac",
"electron:build:win": "npm run build && electron-builder --win"
```

### 3. Move Packages to devDependencies
Move `electron` and `electron-builder` from `dependencies` to `devDependencies`

## After These Changes

Run these commands in Terminal:
```bash
git pull
npm install
npm run electron:build:mac
```

Then look in `dist-electron/` for your `.zip` file - that's what you upload to your website!

## Files to Modify
- `package.json` - Add metadata, scripts, and fix dependency placement
