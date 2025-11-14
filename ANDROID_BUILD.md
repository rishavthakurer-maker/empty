# Android Build Configuration Guide

## Quick Setup for Google Play Store

### 1. Install Capacitor Android

```bash
npm install
npm run build
npx cap add android
npx cap sync
```

### 2. Create Signing Key for Play Store

```bash
# Generate keystore (run from project root)
keytool -genkey -v -keystore vehicletycoon.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias vehicletycoon_key

# When prompted:
# - Keystore password: [Create a strong password]
# - Key password: [Same or different strong password]
# - Name: [Your Company Name]
# - Organization: [Your Company]
# - City: [City]
# - State: [State/Province]
# - Country: US

# Move keystore to secure location
mkdir -p android/keystore
mv vehicletycoon.keystore android/keystore/
```

### 3. Configure gradle.properties

Create `android/gradle.properties`:

```properties
# Build configuration
org.gradle.jvmargs=-Xmx2048m
org.gradle.parallel=true
org.gradle.caching=true

# Version
gradle.version=7.6.2

# Android configuration
android.useAndroidX=true
android.enableJetifier=true

# Release build optimization
android.enableR8=true
android.minSdkVersion=21
android.targetSdkVersion=33
```

### 4. Update app/build.gradle

Add to `android/app/build.gradle`:

```gradle
android {
    compileSdkVersion 33
    
    defaultConfig {
        applicationId "com.vehicletycoon.game"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0.0"
    }

    signingConfigs {
        release {
            storeFile file('../keystore/vehicletycoon.keystore')
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias 'vehicletycoon_key'
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }

    buildTypes {
        debug {
            minifyEnabled false
            debuggable true
        }
        
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            debuggable false
            
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    // Existing dependencies...
    
    // Google Play Billing (for in-app purchases)
    implementation 'com.android.billingclient:billing:5.0.0'
    
    // Firebase (optional, for analytics)
    // implementation platform('com.google.firebase:firebase-bom:31.0.0')
    // implementation 'com.google.firebase:firebase-analytics-ktx'
}
```

### 5. Create proguard-rules.pro

Add to `android/app/proguard-rules.pro`:

```proguard
# Keep React Native classes
-keepclassmembers class *  {
    *** *JNI*(...);
}

-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# Keep Capacitor
-keep class com.getcapacitor.** { *; }
-keep class com.getcapacitor.plugin.** { *; }

# Keep application classes
-keep class com.vehicletycoon.** { *; }

# Optimization
-optimizationpasses 5
-dontusemixedcaseclassnames
```

### 6. Build Commands

```bash
# Development/Debug build
cd android
./gradlew assembleDebug
# Output: app/build/outputs/apk/debug/app-debug.apk

# Release build (creates APK for testing)
./gradlew assembleRelease
# Output: app/build/outputs/apk/release/app-release.apk

# App Bundle for Google Play (REQUIRED for Play Store)
./gradlew bundleRelease
# Output: app/build/outputs/bundle/release/app-release.aab
```

### 7. Build Environment Setup

For automated builds on CI/CD:

```bash
# Set environment variables
export KEYSTORE_PASSWORD="your_keystore_password"
export KEY_PASSWORD="your_key_password"

# Then build
cd android && ./gradlew bundleRelease
```

### 8. Debug on Device

```bash
# Connect device with USB debugging enabled
adb devices

# Install debug APK
adb install -r android/app/build/outputs/apk/debug/app-debug.apk

# View logs
adb logcat | grep -i vehicletycoon

# Clear app data
adb shell pm clear com.vehicletycoon.game
```

### 9. Verify Build

```bash
# Check APK contents
unzip -l android/app/build/outputs/apk/release/app-release.apk | head -20

# Verify signature
jarsigner -verify -verbose android/app/build/outputs/apk/release/app-release.apk
```

## Play Store Submission Build List

### Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 1.0.0 | [Launch Date] | Initial Release | Ready to Submit |
| 1.0.1 | [Update] | Bug Fixes | [Status] |

### Build Checklist Before Upload

- [ ] Version code incremented in `build.gradle`
- [ ] Version name updated (semantic versioning)
- [ ] Signed with release keystore
- [ ] ProGuard enabled
- [ ] Resource shrinking enabled
- [ ] Tested on Android 6.0+ devices
- [ ] No crashes in crash reporting
- [ ] All features working (in-app purchases, saves, etc.)
- [ ] App bundle generated (.aab file)
- [ ] Release notes prepared

### Upload to Play Console

```bash
# From project root:
cd android

# Build release bundle
./gradlew bundleRelease

# The AAB file is ready at:
# app/build/outputs/bundle/release/app-release.aab

# Upload via Google Play Console web interface:
# 1. Go to Release > Production (or Internal Testing first)
# 2. Create new release
# 3. Upload app-release.aab
# 4. Add release notes
# 5. Review and publish
```

## Troubleshooting Build Issues

### Build Fails: "Gradle sync failed"
```bash
# Update Gradle
./gradlew wrapper --gradle-version=7.6.2

# Clean build
./gradlew clean build
```

### Build Fails: "Android SDK not found"
```bash
# Install Android SDK
# Set ANDROID_HOME
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# Install required SDK tools
$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager "platforms;android-33" "build-tools;33.0.2"
```

### Signing Issues
```bash
# Verify keystore
keytool -list -v -keystore android/keystore/vehicletycoon.keystore -alias vehicletycoon_key

# If wrong password, regenerate:
keytool -delete -alias vehicletycoon_key -keystore android/keystore/vehicletycoon.keystore
keytool -genkey -v -keystore android/keystore/vehicletycoon.keystore -keyalg RSA -keysize 2048 -alias vehicletycoon_key
```

### APK Too Large
```gradle
// In build.gradle, under release buildType:
minifyEnabled true
shrinkResources true

// Remove unused resources
configurations.all {
    resolutionStrategy {
        eachDependency { details ->
            if (details.requested.group == 'com.facebook.react') {
                // Pin react-native version
                details.useVersion "0.71.0"
            }
        }
    }
}
```

## Performance Tips

1. **Minification**: Reduces APK size by 30-50%
2. **Resource Compression**: PNG optimization saves 10-20%
3. **Code Shrinking**: Remove unused dependencies
4. **Proguard**: Keep only necessary classes
5. **Split APKs**: Create separate builds for different architectures

## Security Best Practices

1. **Never commit keystore** to version control
2. **Rotate passwords** regularly
3. **Use environment variables** for passwords
4. **Keep SDK updated** for security patches
5. **Review dependencies** for vulnerabilities
6. **Test on physical devices** before release

## Next Steps

1. Build locally: `cd android && ./gradlew bundleRelease`
2. Test on multiple devices
3. Follow PLAYSTORE_GUIDE.md for submission
4. Monitor crash reports
5. Deploy updates with versioning

---

For detailed Play Store submission instructions, see **PLAYSTORE_GUIDE.md**
