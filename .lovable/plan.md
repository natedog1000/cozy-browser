

# Fix Package.json for Electron Build

## What's Wrong Now
The `electron-builder` is failing because:
1. Missing `description` field
2. Missing `author` field  
3. Missing `main` entry point
4. `electron` and `electron-builder` are in wrong place (should be devDependencies)

## What I'll Fix

I'll update `package.json` to add all required fields and move packages to the correct location.

### Changes:
1. **Add metadata fields:**
   - `"name": "kisscam"`
   - `"description": "KissCam - Desktop browser app for streaming platforms"`
   - `"author": "KissCam"`
   - `"main": "electron/main.js"`

2. **Move to devDependencies:**
   - `electron`
   - `electron-builder`

3. **Add build scripts:**
   - `"electron:dev": "ELECTRON_DEV=true electron ."`
   - `"electron:build:mac": "npm run build && electron-builder --mac"`
   - `"electron:build:win": "npm run build && electron-builder --win"`

## After I Make These Changes

You'll just run in Terminal:
```bash
git pull
npm install
npm run electron:build:mac
```

Then look in `dist-electron/` for your `.zip` file. That's it!

