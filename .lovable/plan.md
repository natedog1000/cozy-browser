

# Fix Package.json for Electron Build

## Problem
Your terminal shows these errors from `electron-builder`:
- `description is missed in the package.json`
- `author is missed in the package.json`
- `Package "electron" is only allowed in "devDependencies"`
- `Package "electron-builder" is only allowed in "devDependencies"`

## What I'll Fix

### 1. Add Missing Fields
Add these required fields to `package.json`:
- `"name": "kisscam"` (change from generic name)
- `"description": "KissCam - Desktop browser app for streaming platforms"`
- `"author": "KissCam"`
- `"main": "electron/main.js"` (Electron entry point)

### 2. Move Electron Packages
Move from `dependencies` to `devDependencies`:
- `electron`
- `electron-builder`

### 3. Add Build Scripts
Add these scripts to `package.json`:
- `"electron:dev"` - Run Electron in development mode
- `"electron:build:mac"` - Build Mac app with one command
- `"electron:build:win"` - Build Windows app with one command

## After I Make These Changes

You'll run in Terminal:
```bash
git pull
npm install
npm run electron:build:mac
```

Then look in `dist-electron/` for your `.zip` file.

## Technical Details

**File to modify:** `package.json`

**Changes:**
- Add `name`, `description`, `author`, `main` fields at the top level
- Remove `electron` and `electron-builder` from `dependencies`
- Add `electron` and `electron-builder` to `devDependencies`
- Add Electron build scripts

