import React, { useEffect, useState } from 'react'
import StartMenu from './pages/StartMenu'
import GameSetup from './pages/GameSetup'
import MainMenu from './pages/MainMenu'
import LoadingScreen from './components/LoadingScreen'
import Settings from './pages/Settings'
import VehicleSelection from './pages/VehicleSelection'
import VehicleDesigner from './pages/VehicleDesigner'
import Manufacturing from './pages/Manufacturing'
import GlobalMarket from './pages/GlobalMarket'
import Research from './pages/Research'
import Competition from './pages/Competition'
import Dashboard from './pages/Dashboard'
import Marketing from './pages/Marketing'
import Racing from './pages/Racing'
import Shop from './pages/Shop'
import PrivacyPolicy from './pages/PrivacyPolicy'
import translations from './i18n/translations'

export type Page = 'start' | 'setup' | 'menu' | 'settings' | 'selection' | 'designer' | 'manufacturing' | 'market' | 'research' | 'competition' | 'dashboard' | 'marketing' | 'racing' | 'shop' | 'privacy'

// Engine Components
export interface EngineComponent {
  crankshaft: 'standard' | 'forged' | 'titanium' // affects durability & power
  pistons: 'aluminum' | 'forged-steel' | 'titanium-alloy' // affects weight & performance
  valves: 'cast-iron' | 'stainless-steel' | 'titanium' // affects efficiency & performance
  camshaft: 'basic' | 'performance' | 'racing' // affects power delivery
  fuelInjection: 'carburator' | 'single-point' | 'direct-injection' | 'multi-point' // affects efficiency
  fuelPump: 'mechanical' | 'electric' | 'high-flow' // affects reliability & performance
  oilCooler: boolean // affects engine cooling
  turboSize: 'small' | 'medium' | 'large' | 'none' // turbo boost level
}

// Transmission
export interface TransmissionSpec {
  type: 'manual' | 'automatic' | 'cvt' | 'dct' // affects cost & efficiency
  gears: number // 5-10 gears
  finalDrive: number // gear ratio
}

// Suspension & Chassis
export interface SuspensionSpec {
  frontType: 'macpherson' | 'double-wishbone' | 'multi-link' // affects handling
  rearType: 'solid-axle' | 'semi-independent' | 'independent' // affects handling
  springs: 'coil' | 'leaf' | 'air' | 'magnetic' // affects comfort
  dampers: 'hydraulic' | 'electronic' | 'adaptive' // affects comfort & handling
  antiRoll: boolean // affects stability
  loweringKit: boolean // affects appearance & handling
  stiffnessLevel: number // 0-100 (ride quality)
}

// Body & Exterior
export interface BodySpec {
  material: 'steel' | 'aluminum' | 'carbon-fiber' | 'composite'
  roofType: 'fixed' | 'removable' | 'panoramic' | 'sunroof'
  bodyStyle: 'sedan' | 'coupe' | 'suv' | 'wagon' | 'hatchback'
  frontBumper: 'basic' | 'sport' | 'racing' | 'luxury'
  rearBumper: 'basic' | 'sport' | 'racing' | 'luxury'
  sideSkirts: 'standard' | 'sport' | 'racing' | 'luxury'
  wheels: WheelSpec
  tires: TireSpec
  paint: PaintSpec
}

export interface WheelSpec {
  size: number // 15-22 inches
  type: 'steel' | 'alloy' | 'forged' | 'carbon'
  design: 'standard' | 'sport' | 'luxury'
  offset: number // wheel offset
}

export interface TireSpec {
  brand: 'budget' | 'economy' | 'performance' | 'premium'
  season: 'summer' | 'winter' | 'all-season' | 'sport'
  width: number // 155-345
  aspectRatio: number // 30-80
  loadRating: 'standard' | 'reinforced' // affects durability
}

export interface PaintSpec {
  color: string
  type: 'solid' | 'metallic' | 'pearl' | 'matte'
  quality: 'basic' | 'premium' | 'ceramic'
}

// Lighting Systems
export interface LightingSpec {
  headlights: 'halogen' | 'xenon' | 'led' | 'laser'
  taillights: 'standard' | 'led' | 'oled'
  blinkers: 'standard' | 'led' | 'dynamic'
  fogLights: boolean
  daytimeRunning: boolean
  ambientLighting: boolean
}

// Interior & Comfort
export interface InteriorSpec {
  seats: number
  seatMaterial: 'cloth' | 'leather' | 'premium-leather' | 'alcantara'
  infotainment: 'basic' | 'advanced' | 'premium'
  soundSystem: 'standard' | 'premium' | 'bose' | 'harman-kardon'
  climate: 'manual' | 'auto' | 'dual-zone' | 'quad-zone'
  steering: 'manual' | 'power' | 'steer-by-wire'
  airbags: number // 4-12 airbags
  cruiseControl: 'none' | 'basic' | 'adaptive'
}

// Safety Systems
export interface SafetySpec {
  abs: boolean // Anti-lock braking
  esp: boolean // Electronic stability program
  traction: 'basic' | 'advanced' | 'torque-vectoring'
  brakingSystem: 'standard' | 'high-performance' | 'carbon-ceramic'
  aseAssist: boolean // Lane keep assist
  collisionDetection: boolean
  parkingAssist: boolean
  blindSpotDetection: boolean
}

// Mirrors & Visibility
export interface VisibilitySpec {
  mirrors: 'manual' | 'power' | 'heated' | 'auto-dimming'
  rearviewMirror: 'standard' | 'auto-dimming' | 'digital'
  windows: 'standard' | 'power' | 'one-touch' | 'privacy-glass'
  wipers: 'manual' | 'intermittent' | 'auto-sense'
}

export interface MarketDemand {
  country: string
  demand: number // 0-100
  trending: 'up' | 'down' | 'stable'
  lastUpdate: number
}

export interface MarketingCampaign {
  id: string
  type: 'social' | 'tv' | 'billboard' | 'sponsorship' | 'influencer'
  country: string
  cost: number
  duration: number // days
  demandBoost: number
  fansGained: number
  startTime: number
  active: boolean
}

export interface ProductionJob {
  id: string
  vehicleId: string
  designId: string
  quantity: number
  progress: number // 0-100
  timePerUnit: number // seconds
  startTime: number
  completed: boolean
}

export interface SalesJob {
  id: string
  vehicleId: string
  country: string
  quantity: number
  progress: number // 0-100
  timePerUnit: number // seconds based on demand
  startTime: number
  completed: boolean
  revenue: number
}

export interface RaceResult {
  id: string
  playerVehicle: string
  opponentCompany: string
  opponentVehicle: string
  playerScore: number
  opponentScore: number
  winner: 'player' | 'opponent'
  reputationGained: number
  timestamp: number
}

export interface MarketEvent {
  id: string
  type: 'boom' | 'crash' | 'shortage' | 'innovation' | 'scandal' | 'regulation'
  description: string
  effect: string
  duration: number // days
  multiplier: number // affects market prices/demand
  startTime: number
  active: boolean
}

export interface Competitor {
  name: string
  reputation: number
  vehicleCount: number
  marketShare: number
  growthRate: number // % per day
  lastUpdate: number
}

export interface GameState {
  money: number
  companyName: string
  vehicles: Vehicle[]
  designs: VehicleDesign[]
  research: ResearchTech[]
  sales: { [country: string]: number }
  reputation: number
  employees: number
  fans: number
  rating: number // 0-5 stars
  marketDemands: MarketDemand[]
  marketingCampaigns: MarketingCampaign[]
  productionJobs: ProductionJob[]
  salesJobs: SalesJob[]
  raceHistory: RaceResult[]
  marketEvents: MarketEvent[]
  competitors: Competitor[]
  lastEventCheck: number
  researchPoints: number // earned from manufacturing
  premiumCurrency: number // purchased with real money
  adFree: boolean // ad-free purchase status
}

export interface Vehicle {
  id: string
  name: string
  type: 'car' | 'bus' | 'truck'
  design: VehicleDesign
  produced: number
  sold: number
  price: number
}

export interface VehicleDesign {
  id: string
  name: string
  type: 'car' | 'bus' | 'truck'
  engine: EngineSpec
  transmission: TransmissionSpec
  suspension: SuspensionSpec
  body: BodySpec
  lighting: LightingSpec
  interior: InteriorSpec
  safetySystem: SafetySpec
  visibility: VisibilitySpec
  performance: number // 0-100
  efficiency: number // 0-100
  reliability: number // 0-100
  comfort: number // 0-100
  safety: number // 0-100
  style: number // 0-100
  marketAppeal: number // calculated
  productionCost: number
  createdAt: number
}

export interface EngineSpec {
  type: 'inline' | 'v6' | 'v8' | 'v12' | 'rotary' | 'electric'
  cylinders: number
  displacement: number
  power: number
  torque: number
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric' | 'hydrogen'
  compression: number
  components: EngineComponent
  redline: number // RPM
}

export interface ResearchTech {
  id: string
  name: string
  category: 'engine' | 'aerodynamics' | 'safety' | 'comfort' | 'efficiency'
  level: number
  cost: number
  researched: boolean
}

export default function App() {
  const initialPage = (() => {
    try {
      const params = new URLSearchParams(window.location.search)
      if (params.get('open') === 'designer') return 'designer' as Page
    } catch (e) {
      // ignore (server-side or older env)
    }
    return 'start' as Page
  })()
  const [page, setPage] = useState<Page>(initialPage)
  const [lang, setLang] = useState<string>(() => localStorage.getItem('vt_lang') || 'en')
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('vt_theme') || 'dark')
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('vt_game')
    const defaultState: GameState = {
      money: 100000,
      companyName: 'My Auto Corp',
      vehicles: [],
      designs: [],
      research: [],
      sales: {},
      reputation: 0,
      employees: 5,
      fans: 0,
      rating: 0,
      marketDemands: [
        { country: 'United States', demand: 75, trending: 'stable', lastUpdate: Date.now() },
        { country: 'Europe', demand: 70, trending: 'up', lastUpdate: Date.now() },
        { country: 'Asia', demand: 85, trending: 'up', lastUpdate: Date.now() },
        { country: 'India', demand: 90, trending: 'stable', lastUpdate: Date.now() },
        { country: 'Brazil', demand: 65, trending: 'down', lastUpdate: Date.now() },
      ],
      marketingCampaigns: [],
      productionJobs: [],
      salesJobs: [],
      raceHistory: [],
      marketEvents: [],
      competitors: [
        { name: 'Tesla', reputation: 85, vehicleCount: 150, marketShare: 0.15, growthRate: 0.05, lastUpdate: Date.now() },
        { name: 'BMW', reputation: 90, vehicleCount: 200, marketShare: 0.20, growthRate: 0.03, lastUpdate: Date.now() },
        { name: 'Toyota', reputation: 95, vehicleCount: 300, marketShare: 0.30, growthRate: 0.02, lastUpdate: Date.now() },
        { name: 'Ford', reputation: 80, vehicleCount: 180, marketShare: 0.18, growthRate: 0.025, lastUpdate: Date.now() },
        { name: 'Honda', reputation: 88, vehicleCount: 220, marketShare: 0.22, growthRate: 0.03, lastUpdate: Date.now() },
        { name: 'Volkswagen', reputation: 85, vehicleCount: 190, marketShare: 0.19, growthRate: 0.028, lastUpdate: Date.now() },
        { name: 'Hyundai', reputation: 78, vehicleCount: 160, marketShare: 0.16, growthRate: 0.04, lastUpdate: Date.now() },
        { name: 'Mercedes', reputation: 92, vehicleCount: 170, marketShare: 0.17, growthRate: 0.025, lastUpdate: Date.now() },
      ],
      lastEventCheck: Date.now(),
      researchPoints: 0,
      premiumCurrency: 0,
      adFree: false
    }
    
    if (!saved) return defaultState
    
    try {
      const parsed = JSON.parse(saved)
      // Merge with default state to ensure all new properties exist
      return {
        ...defaultState,
        ...parsed,
        // Ensure arrays exist
        marketDemands: parsed.marketDemands || defaultState.marketDemands,
        marketingCampaigns: parsed.marketingCampaigns || [],
        productionJobs: parsed.productionJobs || [],
        salesJobs: parsed.salesJobs || [],
        raceHistory: parsed.raceHistory || [],
        marketEvents: parsed.marketEvents || [],
        competitors: parsed.competitors || defaultState.competitors,
        lastEventCheck: parsed.lastEventCheck || Date.now(),
        fans: parsed.fans || 0,
        rating: parsed.rating || 0,
        researchPoints: parsed.researchPoints || 0,
        premiumCurrency: parsed.premiumCurrency || 0,
        adFree: parsed.adFree !== undefined ? parsed.adFree : defaultState.adFree,
      }
    } catch (e) {
      console.error('Error loading save:', e)
      return defaultState
    }
  })

  useEffect(() => {
    localStorage.setItem('vt_lang', lang)
  }, [lang])

  useEffect(() => {
    localStorage.setItem('vt_theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('vt_game', JSON.stringify(gameState))
  }, [gameState])

  const t = (key: string) => {
    return translations[lang]?.[key] ?? translations['en'][key] ?? key
  }

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }))
  }

  // global time speed (0 = paused, 1 = normal, 2 = 2x, 5 = 5x)
  const [timeSpeed, setTimeSpeed] = useState<number>(() => Number(localStorage.getItem('vt_timeSpeed')) || 1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    localStorage.setItem('vt_timeSpeed', String(timeSpeed))
  }, [timeSpeed])

  // Game tick system - handles production, sales, events, competitor growth
  useEffect(() => {
    if (!timeSpeed || timeSpeed <= 0) return
    const id = setInterval(() => {
      setGameState(prev => {
        const now = Date.now()
        let newState = { ...prev }
        
        // Update production jobs (with safety check)
        const updatedProductionJobs = (prev.productionJobs || []).map(job => {
          if (job.completed) return job
          const elapsed = (now - job.startTime) / 1000 * timeSpeed
          const totalTime = job.quantity * job.timePerUnit
          const progress = Math.min(100, (elapsed / totalTime) * 100)
          return { ...job, progress, completed: progress >= 100 }
        })
        
        // Update sales jobs (with safety check)
        const updatedSalesJobs = (prev.salesJobs || []).map(job => {
          if (job.completed) return job
          const elapsed = (now - job.startTime) / 1000 * timeSpeed
          const totalTime = job.quantity * job.timePerUnit
          const progress = Math.min(100, (elapsed / totalTime) * 100)
          return { ...job, progress, completed: progress >= 100 }
        })
        
        // Update marketing campaigns (with safety check)
        const updatedCampaigns = (prev.marketingCampaigns || []).map(campaign => {
          if (!campaign.active) return campaign
          const elapsed = (now - campaign.startTime) / (1000 * 60 * 60 * 24) * timeSpeed
          if (elapsed >= campaign.duration) {
            return { ...campaign, active: false }
          }
          return campaign
        })
        
        // Update market events (with safety check)
        const updatedEvents = (prev.marketEvents || []).map(event => {
          if (!event.active) return event
          const elapsed = (now - event.startTime) / (1000 * 60 * 60 * 24) * timeSpeed
          if (elapsed >= event.duration) {
            return { ...event, active: false }
          }
          return event
        })
        
        // Random event check (every 5 minutes game time) - with safety check
        const shouldCheckEvent = prev.lastEventCheck ? (now - prev.lastEventCheck) / 1000 * timeSpeed > 300 : false
        if (shouldCheckEvent && Math.random() < 0.1) { // 10% chance
          const eventTypes = ['boom', 'crash', 'shortage', 'innovation', 'scandal', 'regulation'] as const
          const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
          const eventDescriptions = {
            boom: 'Economic boom increases market demand!',
            crash: 'Market crash reduces consumer spending!',
            shortage: 'Material shortage increases production costs!',
            innovation: 'New technology breakthrough!',
            scandal: 'Industry scandal affects reputation!',
            regulation: 'New regulations impact sales!'
          }
          const eventMultipliers = {
            boom: 1.5,
            crash: 0.6,
            shortage: 0.8,
            innovation: 1.3,
            scandal: 0.7,
            regulation: 0.9
          }
          
          const newEvent: MarketEvent = {
            id: Date.now().toString(),
            type: eventType,
            description: eventDescriptions[eventType],
            effect: eventType === 'boom' || eventType === 'innovation' ? 'positive' : 'negative',
            duration: 3 + Math.floor(Math.random() * 7), // 3-10 days
            multiplier: eventMultipliers[eventType],
            startTime: now,
            active: true
          }
          updatedEvents.push(newEvent)
          newState.lastEventCheck = now
        }
        
        // Update competitors (with safety check)
        const updatedCompetitors = (prev.competitors || []).map(comp => {
          const daysSinceUpdate = (now - comp.lastUpdate) / (1000 * 60 * 60 * 24) * timeSpeed
          if (daysSinceUpdate >= 1) {
            return {
              ...comp,
              reputation: Math.min(100, comp.reputation + Math.random() * comp.growthRate),
              vehicleCount: comp.vehicleCount + Math.floor(Math.random() * 5),
              lastUpdate: now
            }
          }
          return comp
        })
        
        return {
          ...newState,
          productionJobs: updatedProductionJobs,
          salesJobs: updatedSalesJobs,
          marketingCampaigns: updatedCampaigns,
          marketEvents: updatedEvents,
          competitors: updatedCompetitors
        }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [timeSpeed])

  return (
    <div className="app-root">
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}
      {page === 'start' && <StartMenu hasGame={gameState.designs.length > 0} onNewGame={() => setPage('setup')} onContinue={() => setPage('menu')} />}
      {page === 'setup' && <GameSetup onStart={() => setPage('menu')} onBack={() => setPage('start')} t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} timeSpeed={timeSpeed} setTimeSpeed={setTimeSpeed} />}
      {page === 'menu' && <MainMenu t={t} onNavigate={(p: Page) => setPage(p)} gameState={gameState} timeSpeed={timeSpeed} setTimeSpeed={setTimeSpeed} />}
      {page === 'settings' && <Settings lang={lang} setLang={setLang} onBack={() => setPage('menu')} t={t} theme={theme} setTheme={setTheme} timeSpeed={timeSpeed} setTimeSpeed={setTimeSpeed} />}
      {page === 'designer' && <VehicleDesigner t={t} onBack={() => setPage('menu')} gameState={gameState} updateGameState={updateGameState} />}
      {page === 'manufacturing' && <Manufacturing t={t} onBack={() => setPage('menu')} gameState={gameState} updateGameState={updateGameState} timeSpeed={timeSpeed} />}
      {page === 'market' && <GlobalMarket t={t} onBack={() => setPage('menu')} gameState={gameState} updateGameState={updateGameState} timeSpeed={timeSpeed} />}
      {page === 'research' && <Research t={t} onBack={() => setPage('menu')} gameState={gameState} updateGameState={updateGameState} />}
      {page === 'competition' && <Competition t={t} onBack={() => setPage('menu')} gameState={gameState} />}
      {page === 'dashboard' && <Dashboard t={t} onBack={() => setPage('menu')} gameState={gameState} />}
      {page === 'marketing' && <Marketing t={t} onBack={() => setPage('menu')} gameState={gameState} updateGameState={updateGameState} />}
      {page === 'racing' && <Racing t={t} onBack={() => setPage('menu')} gameState={gameState} updateGameState={updateGameState} />}
      {page === 'shop' && <Shop t={t} onBack={() => setPage('menu')} gameState={gameState} updateGameState={updateGameState} />}
      {page === 'privacy' && <PrivacyPolicy onBack={() => setPage('menu')} />}
    </div>
  )
}
