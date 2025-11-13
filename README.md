# 🚗 Vehicle Tycoon Pro

A comprehensive car manufacturing tycoon game where you design, manufacture, and sell vehicles globally. Create custom vehicles from scratch by designing engines, chassis, interiors, and suspension systems. Research new technologies, compete with other manufacturers, and build a global automotive empire.

## 🎮 Core Features

### 🛠️ Vehicle Design System
- **Design from Scratch**: Create vehicles completely customized
  - Engine: Cylinders (3-12), displacement (500-5000cc), fuel type (petrol/diesel/hybrid/electric), turbo
  - Chassis: Weight, length, width, height, suspension type, drive system (FWD/RWD/AWD)
  - Interior: Seats (2-8), material quality (basic/standard/premium/luxury), infotainment, climate control
  - Wheels: Size, tire type, brand
- **Vehicle Types**: Cars, Buses, Trucks with different specs
- **Dynamic Stats**: Aerodynamics, Performance, Safety, Comfort, Efficiency calculated in real-time
- **Market Appeal**: Automatically calculated based on design features

### 🏭 Manufacturing
- **Production**: Manufacture your designed vehicles in batches
- **Cost Management**: Production costs scale with design complexity
- **Inventory**: Track produced vs sold vehicles
- **Employee Management**: Workforce grows with production scale

### 🌍 Global Market
- **5 Markets**: USA, Europe, Asia, India, Brazil
- **Dynamic Pricing**: Market-specific price multipliers
- **Market Demand**: High/Medium demand affects sales strategy
- **Sales Tracking**: Monitor revenue by region
- **Reputation Growth**: Increase reputation with each sale

### 🔬 Research & Technology
- **5 Research Categories**: Engine, Aerodynamics, Safety, Comfort, Efficiency
- **9 Technologies**: Turbocharging, Hybrid, Electric, Advanced Aero, Carbon Fiber, Safety Systems, Autonomous Driving, Luxury Materials, Fuel Efficiency
- **Tech Progression**: Multiple levels for each category
- **Competitive Advantage**: Researched tech unlocks new design options

### 🏆 Competition System
- **4 Competitors**: Tesla, BMW, Toyota (starting 0 vehicles)
- **Global Rankings**: Based on reputation and vehicle count
- **Market Share**: Compete for market dominance
- **Achievement Milestones**: Reach elite status (reputation 80+)

### 📊 Dashboard
- **Real-time Stats**: Cash, employees, reputation, designs
- **Production Summary**: Total produced, sold, revenue
- **Vehicle Analytics**: Breakdown by type (car/bus/truck)
- **Research Progress**: Tracking completed tech
- **Regional Sales**: Sales distribution across markets

## ✨ Game Mechanics

### Design Flow
1. Choose vehicle type (Car/Bus/Truck)
2. Configure engine (cylinders, displacement, fuel, turbo)
3. Design chassis (dimensions, weight, drive type)
4. Customize interior (seats, materials, climate)
5. Select wheels (size, tire type)
6. Review stats and save design
7. See calculated production cost

### Production & Sales Loop
1. Design vehicles with your specifications
2. Manufacture batches at calculated costs
3. Sell to different global markets
4. Adjust pricing based on market demand
5. Build reputation with each sale
6. Unlock new research options

### Strategy Elements
- **Budget Management**: Limited starting capital ($100,000)
- **R&D Investment**: Spend money on technology to improve future designs
- **Market Selection**: Each market has different demand and pricing
- **Employee Scaling**: Workforce grows with production, increases costs
- **Reputation System**: Leads to market dominance and competitive edge

## 🎨 Visual Design
- Modern dark-red/white/grey color palette
- Light & Dark theme support
- Smooth animations and transitions
- Responsive grid layouts
- Emoji-based visual hierarchy
- Professional gradient UI

## 📱 Responsive
- Works on desktop and mobile
- Touch-friendly buttons and controls
- Adapts to different screen sizes

## 🌐 Multi-Language Support
- 6 Languages: English, Hindi, Spanish, French, Chinese, German
- Full i18n implementation
- Easy language switching in settings

## 💾 Persistence
- **Auto-save** every interaction
- **Full State Tracking**:
  - Money, reputation, employees
  - All designs and vehicles
  - Research progress
  - Sales by region
  - Company name

## 🚀 Quick Start

### Prerequisites
- Node.js (16+)
- npm

### Installation & Running

```powershell
cd C:\gg\empty
npm install
npm run dev
```

Vite will open http://localhost:5173 automatically.

### Build for Production

```powershell
npm run build
```

Creates optimized `dist/` folder for deployment.

## 📁 Project Structure

```
src/
├── App.tsx                    # Main app, routing, state
├── main.tsx                   # React entry
├── styles.css                 # Global styles
├── pages/
│   ├── LanguageSelection.tsx
│   ├── MainMenu.tsx          # Game hub
│   ├── Settings.tsx
│   ├── VehicleDesigner.tsx   # Vehicle design editor
│   ├── Manufacturing.tsx      # Production system
│   ├── GlobalMarket.tsx       # Sales to regions
│   ├── Research.tsx           # Tech R&D
│   ├── Competition.tsx        # Leaderboard
│   └── Dashboard.tsx          # Game stats
├── components/
│   └── UpgradePanel.tsx
└── i18n/
    ├── en.json, hi.json, es.json, fr.json, zh.json, de.json
    └── translations.ts
```

## 🎯 Game Balance

### Starting Resources
- **Capital**: $100,000
- **Employees**: 5
- **Reputation**: 0

### Vehicle Type Economics
- **Car**: 4-5 seats, most versatile, balanced pricing
- **Bus**: 20+ seats, high production cost, premium pricing
- **Truck**: Heavy load capacity, specialized markets, high demand in industrial regions

### Market Multipliers
- **USA**: 1.2x (High demand)
- **Europe**: 1.1x (High demand)
- **Asia**: 1.0x (Medium demand)
- **India**: 0.8x (High volume, budget-conscious)
- **Brazil**: 0.9x (Growing market)

### Research Costs
- **Level 1 Tech**: $10k-20k (Turbo, Basic Aero, Safety)
- **Level 2 Tech**: $25k-35k (Hybrid, Carbon Fiber, Advanced Safety)
- **Level 3 Tech**: $50k-60k (Electric, Autonomous Driving)

## 🎁 Gameplay Tips

1. **Start Small**: Design a simple, affordable car
2. **Find Your Niche**: Different markets prefer different vehicles
3. **Invest in R&D**: Technology unlocks new design options
4. **Scale Gradually**: Increase production as sales grow
5. **Watch Competition**: Monitor other manufacturers' reputation
6. **Diversify**: Produce multiple vehicle types
7. **Expand Markets**: Don't rely on one region

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **CSS** - Responsive styling
- **LocalStorage** - Persistence

## 📝 Game State Format

```json
{
  "money": 50000,
  "companyName": "My Auto Corp",
  "employees": 8,
  "reputation": 25,
  "designs": [...],
  "vehicles": [...],
  "research": [...],
  "sales": {
    "United States": 42,
    "Europe": 28
  }
}
```

## 🎮 Gameplay Loop

```
Design Vehicle
    ↓
Manufacture Batch
    ↓
Sell to Markets
    ↓
Earn Revenue & Reputation
    ↓
Invest in Research
    ↓
Unlock New Technologies
    ↓
Design Better Vehicles
    ↓
Compete with Rivals
```

## 🚀 Advanced Features

- **Dynamic Pricing**: Set prices based on market conditions
- **Cost Optimization**: Lower production costs through research
- **Market Share Tracking**: Track your position in each market
- **Tech Synergy**: Some techs work better together
- **Scalability**: Game grows with your factory

## 🔮 Future Enhancements (Optional)

- **Supply Chain Management**: Parts suppliers and logistics
- **Marketing Campaigns**: Boost sales in specific regions
- **Vehicle Customization**: Player-customizable colors, trims
- **Seasonal Events**: Market boosts, promotional opportunities
- **Partnerships**: Alliances with other manufacturers
- **Environmental Impact**: Green vehicle research branch
- **Employee Management**: Hire specialists for R&D
- **Stock Market**: Go public and raise capital
- **Multiplayer**: Compete with other players online

## 🎉 Enjoy Building Your Automotive Empire!

Start from a small garage and grow into a global automotive powerhouse. Every design choice, manufacturing decision, and market strategy matters. Good luck, tycoon!

---

*Built with ❤️ using React + TypeScript + Vite*


