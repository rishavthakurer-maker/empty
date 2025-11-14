# 🎮 Auto Tycoon - Build Instructions

## Prerequisites Required

Before building the APK, you need to install:

### 1. **Java Development Kit (JDK) 11+**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Or use OpenJDK: https://adoptopenjdk.net/
   - **After installation, set JAVA_HOME environment variable:**
     ```bash
     # Windows CMD
     set JAVA_HOME=C:\Program Files\Java\jdk-17
     
     # Or add to System Environment Variables (requires restart)
     JAVA_HOME = C:\Program Files\Java\jdk-17
     ```

### 2. **Android SDK & Build Tools**
   - Download Android Studio: https://developer.android.com/studio
   - During setup, install:
     - Android SDK Platform 33+
     - Android SDK Build-Tools 33+
     - Android Emulator (optional)
   
   - Set ANDROID_HOME environment variable:
     ```bash
     # Default location:
     set ANDROID_HOME=C:\Users\<YourUsername>\AppData\Local\Android\sdk
     
     # Add to PATH:
     set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools
     ```

### 3. **Node.js & npm**
   - Download from: https://nodejs.org/ (LTS recommended)
   - Already installed: v25.2.0 ✓

---

## Build Steps

### Step 1: Install Dependencies
```bash
cd c:\gg\empty
npm install --legacy-peer-deps
```

### Step 2: Build Web Assets
```bash
npm run build
```
Output: `dist/` folder with optimized web files

### Step 3: Sync with Capacitor
```bash
npx cap sync android
```

### Step 4: Build Debug APK
```bash
cd android
gradlew.bat assembleDebug
```
Output: `android\app\build\outputs\apk\debug\app-debug.apk`

### Step 5: Build Release APK (Optional)
For Play Store submission:
```bash
gradlew.bat assembleRelease
```
Output: `android\app\build\outputs\apk\release\app-release.apk`

Or use Gradle to generate AAB (Android App Bundle):
```bash
gradlew.bat bundleRelease
```
Output: `android\app\build\outputs\bundle\release\app-release.aab`

---

## Quick Command Summary

```bash
# Full build pipeline (all steps at once)
cd c:\gg\empty
npm install --legacy-peer-deps
npm run build
npx cap sync android
cd android
gradlew.bat assembleDebug
```

---

## Install APK on Device/Emulator

### Using ADB (Android Debug Bridge):
```bash
# Must have device/emulator running
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
```

### Or use npm shortcut:
```bash
npm run android:install
```

---

## Troubleshooting

### Error: "JAVA_HOME is not set"
- Solution: Set JAVA_HOME environment variable (see Prerequisites #1)
- Restart terminal/IDE after setting environment variables

### Error: "Android SDK not found"
- Solution: Set ANDROID_HOME environment variable (see Prerequisites #2)
- Restart terminal/IDE after setting environment variables

### Error: "Gradle build failed"
- Try: `gradlew.bat clean`
- Then: `gradlew.bat assembleDebug`

### Error: "Module not found" (after code changes)
- Solution: `npm install --legacy-peer-deps`

### Error: "Web assets not found"
- Solution: Run `npm run build` first, then `npx cap sync android`

---

## Play Store Release Checklist

- ✓ Version code updated in `android/app/build.gradle`
- ✓ Version name updated in `capacitor.config.ts`
- ✓ App icon created (192x192 min)
- ✓ Release notes written
- ✓ Privacy policy added ✓ (DONE: See PrivacyPolicy.tsx)
- ✓ Screenshots prepared (up to 8 images)
- ✓ APK/AAB signed with release keystore

### Generate Release Keystore:
```bash
keytool -genkey -v -keystore android\app\release-key.keystore ^
  -keyalg RSA -keysize 2048 -validity 10000 ^
  -alias vehicle-tycoon-key
```

### Sign Release APK:
```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 ^
  -keystore android\app\release-key.keystore ^
  android\app\build\outputs\apk\release\app-release-unsigned.apk ^
  vehicle-tycoon-key

zipalign -v 4 ^
  android\app\build\outputs\apk\release\app-release-unsigned.apk ^
  android\app\build\outputs\apk\release\app-release-signed.apk
```

---

## File Locations After Build

```
c:\gg\empty\
├── dist/                          # Web build (production)
├── android/
│   └── app/build/outputs/
│       ├── apk/debug/
│       │   └── app-debug.apk      # Debug APK ← Install this
│       ├── apk/release/
│       │   └── app-release.apk    # Release APK
│       └── bundle/release/
│           └── app-release.aab    # Android App Bundle (for Play Store)
└── src/                           # Source code
```

---

## Development Workflow

### Hot Reload Development:
```bash
npm run dev
# Visit http://localhost:5173 in browser
```

### Build and Open Android Studio:
```bash
npm run android:dev
# Automatically opens Android Studio for further configuration
```

### View App Logs:
```bash
npm run android:logs
```

---

## Configuration Files

### capacitor.config.ts
- App ID: `com.vehicletycoon.game`
- App Name: `Vehicle Tycoon Pro`
- Platform: Android 5.0+

### Key Features
- ✓ Research Points System (earned from manufacturing)
- ✓ Premium Currency (purchased with real money)
- ✓ Shop System (IAP ready)
- ✓ Ad System (rewarded ads + ad-free option)
- ✓ Privacy Policy (compliant with Play Store)
- ✓ Responsive UI (mobile-optimized)

---

## Support

For issues:
1. Check this guide first
2. Review Android Studio logs: `Logcat` window
3. Run `adb logcat` for device logs
4. Check capacitor documentation: https://capacitorjs.com/

---

**Last Updated:** November 14, 2025
**Game Version:** 1.0.0
**Min Android:** 5.0 (API 21)
**Target Android:** 13+ (API 33+)
