# Quick Reference - Vehicle Tycoon Pro v1.0.0

## New in This Version

### 🔬 Research Points System
- **Earned**: Manufacturing vehicles (0.5 per unit + bonus)
- **Used**: Researching technologies (100-600 points per tech)
- **Display**: Shows in Manufacturing, Research, and Dashboard pages

### 💰 Premium Currency
- **Purchased**: With real money or simulated purchases
- **Uses**: Buy any currency/bundle in shop
- **Display**: Shows premium coin count in Dashboard and Shop

### 🛍️ Shop Page
- Browse and purchase bundles
- Multiple payment options
- Demo purchase system for testing
- 15+ purchasable items

---

## File Changes

| File | Changes |
|------|---------|
| `src/App.tsx` | Added researchPoints & premiumCurrency to GameState; added Shop route |
| `src/pages/Manufacturing.tsx` | Research points display + earning logic |
| `src/pages/Research.tsx` | Use research points instead of money |
| `src/pages/Shop.tsx` | **NEW** - Complete shop interface |
| `src/pages/MainMenu.tsx` | Added Shop button to menu |
| `src/pages/Dashboard.tsx` | Display research points & premium coins |
| `package.json` | Added Android build scripts |
| `capacitor.config.ts` | Already configured for Play Store |

---

## Quick Development

### Run Locally
```bash
npm install
npm run dev
# App opens at http://localhost:5173
```

### Test on Android Device
```bash
npm run android:dev
# Opens in Android Studio/Emulator
```

### Build for Play Store
```bash
npm run android:build:release
# Creates: android/app/build/outputs/bundle/release/app-release.aab
```

---

## Game Balance

### Research Points Economy
```
1 unit = 0.5 points (base)
50 units = 5 points + 5 bonus = 10 points (2x multiplier)
100 units = 50 points + 10 bonus = 60 points

Total to unlock all tech: ~2,700 points
Time to collect: ~2-3 hours of active gameplay
```

### Pricing Strategy
| Bundle | Real Price | Premium Cost | Economy |
|--------|-----------|--------------|---------|
| $50k | $0.99 | 10 | Good for new players |
| $250k | $3.99 | 40 | Bulk savings |
| $1M | $9.99 | 100 | 30% bonus |
| $5M | $19.99 | 200 | 50% bonus |

---

## Adding New Currencies (Future)

### Step 1: Update GameState in App.tsx
```typescript
export interface GameState {
  // ... existing fields
  researchPoints: number
  premiumCurrency: number
  // Add new currency here:
  // blueprints: number
}
```

### Step 2: Initialize in App.tsx
```typescript
const defaultState: GameState = {
  // ... existing fields
  researchPoints: 0,
  premiumCurrency: 0,
  // blueprints: 0,  // Add here
}
```

### Step 3: Add to Shop.tsx
```typescript
const SHOP_ITEMS: ShopItem[] = [
  // ... existing items
  {
    id: 'blueprint_small',
    name: '10 Blueprints',
    type: 'blueprints',
    amount: 10,
    realPrice: '$0.99',
    // ... etc
  }
]
```

### Step 4: Add to Dashboard.tsx
```typescript
<div style={{ background: 'rgba(...)', padding: 12, borderRadius: 8 }}>
  <div className="small">📋 Blueprints</div>
  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#...' }}>
    {Math.floor(gameState.blueprints)}
  </div>
</div>
```

---

## Data Structure

### Shop Item
```typescript
interface ShopItem {
  id: string                    // Unique ID
  name: string                  // Display name
  description: string           // What it does
  icon: string                  // Emoji icon
  type: 'cash' | 'researchPoints' | 'premium'
  amount: number                // How much player gets
  realPrice: string             // Dollar amount ($X.XX)
  premiumCost: number           // Premium coin cost (or 0 if not available)
}
```

### Purchase Flow
```
1. Player clicks button
2. handlePurchaseWithPremium() or handleSimulatePurchaseWithRealMoney()
3. Check if player has enough currency
4. Deduct currency
5. Add purchased amount to appropriate field
6. Show success message
7. Update localStorage (automatic via App.tsx effect)
```

---

## Testing Checklist

### Before Play Store Submission
- [ ] Manufacturing produces research points ✅
- [ ] Research page spends research points ✅
- [ ] Shop page displays all items ✅
- [ ] Can purchase with demo system ✅
- [ ] Dashboard shows all currencies ✅
- [ ] Saves to localStorage ✅
- [ ] No console errors ✅
- [ ] Tested on Android device ✅
- [ ] Build completes without errors ✅

### Performance
- [ ] App loads in < 3 seconds
- [ ] No janky animations
- [ ] Smooth scrolling
- [ ] Quick button response
- [ ] Reasonable app size (< 50MB)

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Shop not showing | Check App.tsx has 'shop' page type and route |
| No research points earned | Check Manufacturing.tsx handleCollectProduction() |
| Research points not spending | Check Research.tsx handleResearch() deduction |
| Data not saving | Ensure localStorage access in browser DevTools |
| Android build fails | Run `npm run build` then `npx cap sync` first |

---

## Debug Mode

Enable debug logging in browser console:

```javascript
// View game state
console.log(localStorage.getItem('vt_game'))

// Clear save
localStorage.removeItem('vt_game')
localStorage.removeItem('vt_lang')
localStorage.removeItem('vt_theme')

// Add test currency
let state = JSON.parse(localStorage.getItem('vt_game'))
state.researchPoints += 1000
state.premiumCurrency += 100
localStorage.setItem('vt_game', JSON.stringify(state))
location.reload()
```

---

## Build Outputs

### Development Build
```bash
npm run dev
# Runs at http://localhost:5173
```

### Web Production Build
```bash
npm run build
# Output: dist/ folder
# Use for: Web hosting, testing
```

### Android Debug APK
```bash
npm run android:build:debug
# Output: android/app/build/outputs/apk/debug/app-debug.apk
# Use for: Local testing on devices
```

### Android Release (Play Store)
```bash
npm run android:build:release
# Output: android/app/build/outputs/bundle/release/app-release.aab
# Use for: Google Play Console submission
```

---

## Play Store Submission Checklist

- [ ] All features tested and working
- [ ] No critical bugs
- [ ] Graphics optimized (< 20MB web assets)
- [ ] Signed with release keystore
- [ ] Privacy policy URL ready
- [ ] Screenshots prepared (2-5 minimum)
- [ ] App icon created (512x512 PNG)
- [ ] Metadata completed in Play Console
- [ ] IAP items created and linked
- [ ] Internal testing passed

---

## Asset Management

### Screenshots for Play Store
- **Dimensions**: 3840 x 2160px (9:16 ratio)
- **Format**: PNG or JPEG
- **Quantity**: 2-8 recommended
- **Content**: Showcase key features

### App Icon
- **Dimensions**: 512x512px minimum
- **Format**: PNG (no transparency at edges)
- **Design**: Clear, recognizable, unique

### Featured Graphic
- **Dimensions**: 1024x500px
- **Format**: PNG or JPEG
- **Content**: Game title + call-to-action

---

## Revenue Metrics to Track

```
Daily Active Users (DAU) = Users who open app
Monthly Active Users (MAU) = Unique users per month
Average Revenue Per User (ARPU) = Total revenue / MAU
Conversion Rate = Buyers / DAU
Churn Rate = Users who stop playing

Target Benchmarks:
- ARPU: $0.50 - $2.00 per user/month
- Conversion: 1-5% of players make purchase
- Churn: Keep < 30% daily drop-off
```

---

## Performance Optimization Tips

1. **Code Splitting**: Already using Vite
2. **Asset Optimization**: Compress images
3. **Lazy Loading**: Consider for future features
4. **State Management**: Keep localized to components
5. **Re-renders**: Use React.memo() if needed

---

## Future Enhancement Ideas

- [ ] Cloud save to Firebase
- [ ] Multiplayer leaderboards
- [ ] Battle pass cosmetics
- [ ] Seasonal events
- [ ] New vehicle types (motorcycles, SUVs)
- [ ] Company customization (logo, colors)
- [ ] Stock market trading
- [ ] Employee training system
- [ ] Ad rewards (optional)
- [ ] Offline mode

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Ready for Play Store

Questions? Check PLAYSTORE_GUIDE.md and MONETIZATION_GUIDE.md for details.
