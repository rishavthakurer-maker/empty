# Play Store Preparation Guide

This document provides step-by-step instructions to prepare Vehicle Tycoon Pro for Google Play Store submission.

## Overview of Monetization Features

### 1. Research Points System
- **Earned**: Players earn research points by manufacturing vehicles (0.5 per unit + bonus for large batches)
- **Used for**: Researching new vehicle technologies
- **Cost**: Research points (100-600 points per technology)

### 2. Premium Currency System
- **In-App Purchases**: Players buy premium coins with real money
- **Uses**: Alternative to regular currency, unlocks premium bundles
- **Prices**: $0.99 to $19.99

### 3. Soft Currency (Cash)
- **Starting Amount**: $100,000
- **Earned**: Selling vehicles, completing missions
- **Purchasable**: Buy cash bundles with real money or premium coins

## Prerequisites

- Android SDK (API 28+)
- Java JDK 11 or higher
- Gradle 7.0+
- Capacitor CLI installed globally: `npm install -g @capacitor/cli`
- Google Play Developer Account ($25 one-time fee)

## Step-by-Step Setup

### Step 1: Install Required Dependencies

```bash
npm install
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
npm run build
npx cap add android
```

### Step 2: Configure Google Play Billing Library

Install the Google Play Billing plugin for in-app purchases:

```bash
npm install @react-native-firebase/inappmessaging
# OR use capacitor-google-play-billing
npm install capacitor-google-play-billing
```

### Step 3: Update Android Configuration

The `capacitor.config.ts` is pre-configured with:
- App ID: `com.vehicletycoon.game`
- App Name: `Vehicle Tycoon Pro`
- Android API Scheme: HTTPS
- Mixed Content: Allowed (for loading external resources)

### Step 4: Create Signing Key

```bash
# Navigate to your project
cd android

# Create a signing key
keytool -genkey -v -keystore vehicletycoon.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias vehicletycoon

# This will prompt you for:
# - Password (remember this!)
# - First and Last Name
# - Organization Unit
# - Organization
# - City/Locality
# - State/Province
# - Country Code (US, IN, etc)
```

**IMPORTANT**: Store the keystore file and password securely. You'll need it for future updates.

### Step 5: Configure Gradle for Release Build

Edit `android/app/build.gradle`:

```gradle
android {
    signingConfigs {
        release {
            storeFile file('/path/to/vehicletycoon.keystore')
            storePassword 'YOUR_KEYSTORE_PASSWORD'
            keyAlias 'vehicletycoon'
            keyPassword 'YOUR_KEY_PASSWORD'
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Step 6: Build Release APK/AAB

```bash
# Navigate to android folder
cd android

# Build App Bundle (recommended for Play Store)
./gradlew bundleRelease

# OR build APK for testing
./gradlew assembleRelease
```

Output location:
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`
- APK: `android/app/build/outputs/apk/release/app-release.apk`

### Step 7: Create Google Play Developer Account

1. Go to https://play.google.com/console
2. Pay $25 registration fee
3. Create new app:
   - Choose app name: "Vehicle Tycoon Pro"
   - Select category: "Simulation" or "Strategy"
   - Content rating: Complete questionnaire

### Step 8: Configure In-App Products

In Google Play Console:

1. Go to **Monetize** > **Products** > **In-app products**
2. Create managed products for:

#### Cash Bundles
- `cash_small`: $0.99 - 50,000 cash
- `cash_medium`: $3.99 - 250,000 cash
- `cash_large`: $9.99 - 1,000,000 cash
- `cash_mega`: $19.99 - 5,000,000 cash

#### Premium Currency
- `premium_small`: $0.99 - 100 coins
- `premium_medium`: $3.99 - 500 coins
- `premium_large`: $9.99 - 1,200 coins

#### Research Points (if needed)
- `research_small`: $0.99 - 500 points
- `research_medium`: $3.99 - 2,500 points
- `research_large`: $9.99 - 6,000 points

### Step 9: Prepare Store Listing

#### App Title
"Vehicle Tycoon Pro - Build Your Auto Empire"

#### Short Description (80 chars)
"Design, manufacture, and sell cars in this addictive business sim!"

#### Full Description (4000 chars)
```
Build Your Auto Empire! 🚗🏭

Vehicle Tycoon Pro is an immersive business simulation game where you create your own automotive company from scratch.

FEATURES:
🛠️ Design Vehicles: Customize cars, buses, and trucks with hundreds of parts
🏭 Manage Production: Optimize manufacturing to maximize profits
🌍 Global Markets: Sell in 50+ countries with different market demands
🔬 Research Technology: Unlock cutting-edge automotive innovations
🏆 Compete: Race against and outsell rival companies
📊 Analytics: Track your company's growth in detail
💰 Economy: Buy/sell stocks, manage finances strategically

MONETIZATION:
• Free-to-play with optional in-app purchases
• No ads during gameplay
• Buy premium currency for cosmetics and bundles
• Earn research points through gameplay
• Fair progression system

No energy systems! No constant ads! Pure strategy gaming.

PERMISSIONS:
• Internet: Required for cloud saves and leaderboards
• Storage: To save your progress

Perfect for simulation fans, business enthusiasts, and casual gamers!
```

#### Screenshots (3840 x 2160px recommended)
Create 5 screenshots showing:
1. Car design interface
2. Manufacturing overview
3. Market trading system
4. Research technologies
5. Dashboard/statistics

#### App Icon
- 512x512 PNG with no transparency at edges
- Should include: 🏭 or car silhouette

#### Featured Graphic
- 1024x500 PNG
- Show game title and "Vehicle Tycoon Pro"

### Step 10: Privacy Policy & Terms

Create and host:

1. **Privacy Policy** (required):
   - Explain data collection
   - Mention Firebase/Analytics if used
   - State that no personal info is sold
   - GDPR compliant

2. **Terms of Service**:
   - In-app purchase terms
   - Limitation of liability
   - Content guidelines

### Step 11: Configure Ratings & Content

In Google Play Console > Ratings & Content:

1. Complete content rating questionnaire
2. Select content rating: Likely "Everyone" or "Everyone 10+"
3. Confirm no restricted content

### Step 12: Upload & Test

1. Go to **Release** > **Testing** > **Internal Testing**
2. Upload `app-release.aab`
3. Add testers (use Google groups or individual emails)
4. Wait for Google to process (usually 5-15 min)
5. Install and test on real device:
   ```bash
   npx cap open android
   ```

### Step 13: Submit to Play Store

1. Once testing passes, go to **Release** > **Production**
2. Upload new release:
   - AAB file
   - Release notes (minimum 500 characters)
   - Example notes:
     ```
     Version 1.0.0 Launch!
     
     🎉 Vehicle Tycoon Pro is now live!
     
     Features:
     ✅ Complete vehicle design system
     ✅ Full manufacturing and sales pipeline
     ✅ Research technology tree
     ✅ Global markets with dynamic pricing
     ✅ Player competition system
     ✅ Multiple monetization options
     
     Earn research points through manufacturing!
     Purchase premium currency to accelerate growth!
     
     Enjoy building your auto empire!
     ```
3. Fill in age rating
4. Confirm all details
5. Click "Review Release"
6. Google reviews in 24-48 hours (typically)

## Post-Launch Maintenance

### Monitoring
- Check Google Play Console daily for reviews
- Monitor crash logs
- Track daily active users
- Check revenue and conversion rates

### Updates
For each update:
1. Increment version in `package.json`
2. Run `npm run build`
3. Run `npx cap sync`
4. Build new AAB in Android
5. Upload to internal testing first
6. Test thoroughly
7. Promote to production

### Versioning Strategy
- `1.0.0` - Initial launch
- `1.1.0` - Bug fixes, minor features
- `2.0.0` - Major features, overhauls

## File Structure for Play Store

```
android/
├── app/
│   ├── build/
│   │   └── outputs/
│   │       ├── bundle/release/
│   │       │   └── app-release.aab  ← Upload this
│   │       └── apk/release/
│   │           └── app-release.apk
│   └── build.gradle
├── gradle/
└── build.gradle
```

## Common Issues & Solutions

### Issue: "Google Play Services not installed"
**Solution**: Ensure test device has Google Play Services installed. Use emulator with Google APIs.

### Issue: In-app purchases not working in testing
**Solution**: 
- Ensure product IDs match exactly in Play Console
- Wait 24 hours after creating products
- Use internal testing account
- Device must be using same Google account

### Issue: App crashes on startup
**Solution**:
- Check logcat: `adb logcat | grep -i error`
- Ensure permissions in AndroidManifest.xml
- Verify all plugins are properly integrated

### Issue: Large file size
**Solution**:
- Enable minification in Gradle
- Use PNG compression for images
- Consider dynamic asset loading

## Compliance & Legal

### Required for Play Store
- ✅ Privacy Policy (linked in settings)
- ✅ Terms of Service (linked in settings)
- ✅ COPPA compliance (if targeting under 13)
- ✅ No malware/spyware
- ✅ No content restrictions violated

### Add Settings Page Link
In-app, add link to privacy policy:
```typescript
// In Settings.tsx
<a href="https://yourdomain.com/privacy" target="_blank">
  Privacy Policy
</a>
```

## Revenue Tips

1. **First Week**: Monitor conversion rates carefully
2. **A/B Test**: Try different pricing and bundle configurations
3. **User Retention**: Focus on keeping players engaged (longer playtime = more revenue)
4. **Analytics**: Track which bundles sell best
5. **Updates**: Regular content updates increase retention
6. **Reviews**: Respond to all reviews (positive and negative)

## Next Steps

1. ✅ Prepare all assets (screenshots, icons, etc.)
2. ✅ Complete metadata in Play Console
3. ✅ Get privacy policy reviewed by legal team
4. ✅ Internal test on multiple devices
5. ✅ Submit for review
6. ✅ Monitor submission process
7. ✅ Launch!

---

**Questions?** Refer to [Google Play Console Help](https://support.google.com/googleplay/android-developer/)
