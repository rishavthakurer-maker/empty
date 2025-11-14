# Vehicle Tycoon Pro - Monetization & Play Store Guide

## New Features (v1.0.0)

### 🔬 Research Points System

Players now earn **Research Points** by manufacturing vehicles:

- **Base Rate**: 0.5 points per unit manufactured
- **Batch Bonus**: Additional 0.1 points per unit for batches ≥ 50 units
- **Example**: Completing 100 units = 50 + 10 = 60 research points

#### How to Use
1. Go to **Manufacturing**
2. Produce vehicles and collect them
3. View earned research points in the **Research** page
4. Spend points to unlock new vehicle technologies
5. Each technology costs 100-600 research points

### 💰 Premium Currency System

**Premium Coins** are purchased with real money and provide multiple benefits:

#### Available Bundles
- **$0.99**: 100 Premium Coins
- **$3.99**: 500 Premium Coins
- **$9.99**: 1,200 Premium Coins

#### Uses
- Purchase Cash bundles
- Buy Research Points
- Priority in future features
- Special cosmetics (planned)

### 🛍️ New Shop Page

Access the **Shop** from the main menu to purchase:

#### Cash Bundles
- $0.99: $50,000 (Small)
- $3.99: $250,000 (Medium, +20% bonus)
- $9.99: $1,000,000 (Large, +30% bonus)
- $19.99: $5,000,000 (Mega, +50% bonus)

#### Research Points Bundles
- $0.99: 500 points
- $3.99: 2,500 points
- $9.99: 6,000 points

#### Premium Currency
- Multiple tiers from $0.99 to $9.99

## Game Balance

### Earning Currency

**Without Purchases:**
- Manufacturing: Earn cash from vehicle sales
- Racing: Win rewards
- Marketing: Increase sales volume
- Research Points: Manufacture vehicles (guaranteed)

**With Purchases:**
- Accelerate research unlocks
- Skip early grinding
- Support game development

### Research Progression

**Total Research Points Needed to Unlock All Tech**: ~2,700 points

**Achievement Milestones:**
- 100 units manufactured = 60 points
- 500 units manufactured = 300 points
- 1,000 units manufactured = 600 points

---

## Play Store Submission Process

### Quick Start

1. **Prerequisites**
   - Android SDK (API 21+)
   - Capacitor installed: `npm install -g @capacitor/cli`
   - Google Play Developer Account ($25)

2. **Setup Android Build**
   ```bash
   npm run build
   npx cap add android
   npm install
   ```

3. **Create Release Key**
   ```bash
   keytool -genkey -v -keystore vehicletycoon.keystore \
     -keyalg RSA -keysize 2048 -validity 10000 \
     -alias vehicletycoon_key
   ```

4. **Build Release Bundle**
   ```bash
   npm run android:build:release
   # Output: android/app/build/outputs/bundle/release/app-release.aab
   ```

5. **Upload to Play Store**
   - Go to Google Play Console
   - Create new app
   - Upload .aab file
   - Fill metadata and screenshots
   - Submit for review

### Detailed Guides

- **PLAYSTORE_GUIDE.md** - Complete step-by-step guide with all details
- **ANDROID_BUILD.md** - Android build configuration and commands
- **MONETIZATION.md** - Monetization strategy and balancing

---

## Build Commands

```bash
# Development
npm run dev              # Local web development
npm run android:dev      # Build + sync + open in Android

# Production for Play Store
npm run android:build:release  # Create release bundle (app-release.aab)
npm run android:build:debug    # Create debug APK for testing

# Testing
npm run android:install  # Install debug APK on connected device
npm run android:logs     # View app logs on device

# Regular web build
npm run build           # Build for web
npm run preview         # Preview production build
```

---

## File Structure

```
├── src/
│   ├── App.tsx              [Main app with routing]
│   ├── pages/
│   │   ├── Manufacturing.tsx [Updated: Earn research points]
│   │   ├── Research.tsx      [Updated: Use research points]
│   │   ├── Shop.tsx          [NEW: Purchase currencies]
│   │   └── MainMenu.tsx      [Updated: Added Shop button]
│   └── ...
├── android/               [Capacitor Android project]
├── PLAYSTORE_GUIDE.md     [Play Store setup]
├── ANDROID_BUILD.md       [Build configuration]
└── ...
```

---

## Monetization Strategy

### Fair Pricing
- No pay-to-win mechanics
- Research points earned naturally through gameplay
- Premium currency is cosmetic/convenience only
- Players can reach endgame without spending

### Player Retention
- Daily bonuses (future feature)
- Seasonal events (planned)
- Achievements and badges
- Leaderboards

### Revenue Streams
1. Premium currency purchases (primary)
2. Cosmetic items (planned)
3. Battle pass system (planned)
4. Special events with limited offerings

---

## Translation Support

The shop is automatically translated to all supported languages:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Hindi (hi)
- Chinese (zh)

---

## Testing In-App Purchases Locally

**In Development Mode:**

The shop has a demo purchase system that simulates real purchases:

1. Click any purchase button
2. Virtual currency is added
3. Bonus coins awarded
4. Success message displayed

**For Real Play Store Testing:**

1. Set up internal testing track
2. Add test accounts in Play Console
3. Install app on test device
4. Use actual purchase flow
5. Purchases won't charge during testing

---

## Analytics & Monitoring

### Recommended Setup

1. **Google Play Console Monitoring**
   - Crashes and errors
   - User feedback
   - Rating trends
   - Revenue reports

2. **Firebase Analytics** (Optional)
   ```bash
   npm install @react-native-firebase/app @react-native-firebase/analytics
   ```

3. **Key Metrics to Track**
   - Daily Active Users (DAU)
   - Monthly Active Users (MAU)
   - Average Revenue Per User (ARPU)
   - Conversion rate (% who make a purchase)
   - Churn rate (% who stop playing)

---

## Troubleshooting

### "Cannot find Shop page"
- Ensure Shop.tsx is in `src/pages/`
- Verify App.tsx imports Shop component
- Check type definition includes 'shop' in Page type

### "In-app purchases not showing"
- Verify products created in Google Play Console
- Wait 24 hours after creating products
- Use correct product IDs
- Test on internal testing track first

### "Build fails with Gradle error"
- Run `npm run build` first
- Run `npx cap sync` to update Android
- Clear Android cache: `cd android && ./gradlew clean`
- Update Gradle: `./gradlew wrapper --gradle-version=7.6.2`

---

## Next Features (Roadmap)

- [ ] Daily login bonuses
- [ ] Premium cosmetics (vehicle skins, office decorations)
- [ ] Battle pass system
- [ ] Seasonal events
- [ ] Multiplayer competitive mode
- [ ] Cloud save sync
- [ ] Achievement badges
- [ ] Referral rewards

---

## Support & Contact

For issues, feature requests, or feedback:
1. Check existing documentation
2. Review crash logs in Google Play Console
3. Update to latest version
4. Contact support team

---

## Credits & Attribution

- **Game Engine**: React + TypeScript + Vite
- **Mobile**: Capacitor
- **UI Framework**: Custom CSS
- **Platform**: Google Play Store

---

**Version**: 1.0.0
**Last Updated**: 2024
**Status**: Ready for Play Store Submission

Good luck with your game! 🚗🏆
