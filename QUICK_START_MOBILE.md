# 🚀 Quick Start - Convert to Android App

## 1️⃣ Install Capacitor (One-time setup)

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

## 2️⃣ Initialize Capacitor (One-time setup)

```bash
npx cap init "Vehicle Tycoon Pro" com.vehicletycoon.game --web-dir=dist
```

Answer prompts:
- App name: **Vehicle Tycoon Pro**
- Package ID: **com.vehicletycoon.game**
- Web asset directory: **dist**

## 3️⃣ Build Your Web App

```bash
npm run build
```

## 4️⃣ Add Android Platform (One-time setup)

```bash
npx cap add android
```

This creates the `android/` folder.

## 5️⃣ Sync Web Code to Android

Every time you make changes, run:

```bash
npm run build
npx cap sync
```

Or use the shortcut:

```bash
npm run cap:build
```

## 6️⃣ Open in Android Studio

```bash
npx cap open android
```

Or use:

```bash
npm run cap:android
```

## 7️⃣ Build & Test

In Android Studio:

### For Testing (APK):
1. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
2. Find APK at: `android/app/build/outputs/apk/debug/app-debug.apk`
3. Install on phone or share with others

### For Play Store (AAB):
1. **Build > Generate Signed Bundle / APK**
2. Select **Android App Bundle**
3. Create/select keystore
4. Choose **release** variant
5. Find AAB at: `android/app/release/app-release.aab`

## 📋 Requirements

Before starting, install:

1. **Node.js** - Already installed ✓
2. **Android Studio** - [Download here](https://developer.android.com/studio)
3. **Java JDK 11+** - [Download here](https://www.oracle.com/java/technologies/downloads/)

## 🔄 Daily Workflow

When you update the game:

```bash
# 1. Make changes to src/ files
# 2. Build and sync
npm run build
npx cap sync

# 3. Open in Android Studio
npm run cap:android

# 4. Click Run button to test
```

## 📦 Share APK with Friends

1. Build APK (Step 7)
2. Find file: `android/app/build/outputs/apk/debug/app-debug.apk`
3. Send via email, WhatsApp, or Google Drive
4. Friend installs on Android phone
5. They can play!

## 🏪 Publish to Google Play Store

### One-time Setup:
1. Create [Google Play Developer Account](https://play.google.com/console) ($25)
2. Wait for approval (48 hours)

### For Each Release:
1. Build signed AAB (Step 7)
2. Upload to Play Console
3. Fill store listing
4. Submit for review
5. Wait for approval (few days)

## ✨ Pre-configured for You

I've already added:
- ✅ `capacitor.config.ts` - App configuration
- ✅ `package.json` scripts - Quick commands
- ✅ Mobile-optimized UI
- ✅ Touch-friendly buttons
- ✅ Responsive design

## 🎮 Testing

**On Emulator:**
1. Open Android Studio
2. Click device dropdown
3. Create Virtual Device
4. Click Run ▶

**On Real Phone:**
1. Enable Developer Options
2. Enable USB Debugging
3. Connect via USB
4. Select your device
5. Click Run ▶

## 📊 App Size

Expected APK size: **5-10 MB**
Expected AAB size: **3-7 MB**

## 🔧 Common Commands

```bash
# Build web app
npm run build

# Sync to Android
npx cap sync

# Open Android Studio
npx cap open android

# Build + Sync (combined)
npm run cap:build

# Full development workflow
npm run android:dev
```

## ❓ Troubleshooting

**"capacitor not found"**
→ Run: `npm install @capacitor/core @capacitor/cli`

**"Android Studio won't open"**
→ Make sure Android Studio is installed and in PATH

**"Build failed"**
→ Update Android Studio to latest version
→ Install SDK Platform 33+

**"App not loading"**
→ Run: `npm run build && npx cap sync`
→ Clear app data on device

## 🎯 Next Steps

1. Run: `npm install @capacitor/core @capacitor/cli @capacitor/android`
2. Run: `npx cap init`
3. Run: `npm run build`
4. Run: `npx cap add android`
5. Run: `npx cap open android`
6. Click **Run** ▶ button in Android Studio

**Your game will run on Android!** 📱🎮

---

Need help? Check `MOBILE_APP_GUIDE.md` for detailed instructions.
