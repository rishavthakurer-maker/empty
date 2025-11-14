# 📱 Mobile App Conversion Guide - Vehicle Tycoon Pro

## Overview
This guide will help you convert the Vehicle Tycoon web game into an Android app for Google Play Store.

## Prerequisites
- Node.js installed
- Android Studio installed
- Java JDK 11+ installed

## Step 1: Install Capacitor

Run these commands in your project directory:

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
npx cap init
```

When prompted:
- **App name**: Vehicle Tycoon Pro
- **App ID**: com.vehicletycoon.game (or your custom package name)
- **Web directory**: dist

## Step 2: Update Configuration Files

### package.json
Add Capacitor scripts (already included below)

### capacitor.config.ts
Configuration file created automatically

## Step 3: Build the Web App

```bash
npm run build
```

This creates the `dist` folder with your compiled web app.

## Step 4: Add Android Platform

```bash
npx cap add android
```

This creates the `android` folder with native Android project.

## Step 5: Copy Web Assets to Native Project

```bash
npx cap copy
npx cap sync
```

## Step 6: Open in Android Studio

```bash
npx cap open android
```

This opens the Android project in Android Studio.

## Step 7: Configure Android App

### In Android Studio:

1. **Update App Name**:
   - Open `android/app/src/main/res/values/strings.xml`
   - Change app name to "Vehicle Tycoon Pro"

2. **Update Package Name** (if needed):
   - Go to `Build > Edit Flavors`
   - Update Application ID

3. **Set App Icon**:
   - Place icons in `android/app/src/main/res/mipmap-*` folders
   - Update `android/app/src/main/AndroidManifest.xml`

4. **Set Permissions**:
   - Already configured in AndroidManifest.xml

5. **Configure Version**:
   - Open `android/app/build.gradle`
   - Update `versionCode` and `versionName`

## Step 8: Build APK for Testing

In Android Studio:
1. **Build > Build Bundle(s) / APK(s) > Build APK(s)**
2. Wait for build to complete
3. APK will be in `android/app/build/outputs/apk/debug/app-debug.apk`

## Step 9: Build AAB for Play Store

For Google Play Store, you need an AAB (Android App Bundle):

1. **Build > Generate Signed Bundle / APK**
2. Select **Android App Bundle**
3. Click **Next**
4. Create new keystore or use existing
5. Fill in keystore details (SAVE THESE!)
6. Click **Next**
7. Select **release** build variant
8. Click **Finish**

AAB will be in `android/app/release/app-release.aab`

## Step 10: Testing

### Test on Physical Device:
1. Enable Developer Options on your Android phone
2. Enable USB Debugging
3. Connect phone via USB
4. Click **Run** in Android Studio
5. Select your device

### Test APK:
1. Transfer `app-debug.apk` to phone
2. Install and test

## Step 11: Publish to Google Play Store

### Prerequisites:
- Google Play Developer Account ($25 one-time fee)
- Signed AAB file
- App assets (screenshots, icon, banner)
- Store listing details

### Steps:
1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app
3. Fill in app details
4. Upload AAB file
5. Complete store listing:
   - Title: Vehicle Tycoon Pro
   - Short description
   - Full description
   - Screenshots (phone & tablet)
   - App icon (512x512)
   - Feature graphic (1024x500)
6. Set content rating
7. Set pricing (Free/Paid)
8. Submit for review

## Project Structure After Conversion

```
vehicle-tycoon/
├── android/                    # Native Android project
│   ├── app/
│   │   ├── src/
│   │   └── build.gradle
│   └── build.gradle
├── dist/                       # Built web app
├── src/                        # React source code
├── public/                     # Static assets
├── capacitor.config.ts         # Capacitor configuration
└── package.json
```

## Important Files

### capacitor.config.ts
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vehicletycoon.game',
  appName: 'Vehicle Tycoon Pro',
  webDir: 'dist',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true
  }
};

export default config;
```

### android/app/src/main/AndroidManifest.xml
Key permissions already added:
- INTERNET (for future updates)
- WAKE_LOCK (keep app running)

## Updating the App

When you make changes to your web code:

1. Make changes in `src/` folder
2. Build: `npm run build`
3. Sync: `npx cap sync`
4. Open in Android Studio: `npx cap open android`
5. Run/Build from Android Studio

## Tips for Mobile Optimization

1. **Touch Friendly**: All buttons are already touch-friendly
2. **Responsive**: Game uses responsive design
3. **Performance**: Optimize images and assets
4. **Offline**: Game works offline (localStorage)
5. **Screen Sizes**: Test on different screen sizes

## Troubleshooting

### Build Errors:
- Ensure Java JDK 11+ is installed
- Update Android Studio to latest version
- Clear gradle cache: `./gradlew clean`

### App Not Loading:
- Check `capacitor.config.ts` webDir is correct
- Run `npx cap sync` again
- Clear app data on device

### Slow Performance:
- Optimize images in `public/` folder
- Minify JavaScript (already done by Vite)
- Reduce animation complexity

## File Size Optimization

Reduce APK/AAB size:
1. Enable minification in `build.gradle`
2. Use WebP images instead of PNG
3. Remove unused dependencies
4. Enable ProGuard

## Version Management

Update version before each release:

**android/app/build.gradle:**
```gradle
versionCode 2      // Increment for each release
versionName "1.1"  // User-facing version
```

## Revenue Options

If monetizing:
1. **Ads**: Integrate AdMob
2. **In-App Purchases**: Add premium features
3. **Paid App**: Set price in Play Console

## Next Steps

1. Install Capacitor (Step 1)
2. Build web app (Step 3)
3. Add Android platform (Step 4)
4. Test in Android Studio (Steps 6-8)
5. Publish to Play Store (Step 11)

## Support & Resources

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)

---

**Your game is ready to become a mobile app!** 🚀📱
