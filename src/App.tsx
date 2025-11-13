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
import translations from './i18n/translations'

export type Page = 'start' | 'setup' | 'menu' | 'settings' | 'selection' | 'designer' | 'manufacturing' | 'market' | 'research' | 'competition' | 'dashboard'

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

export interface GameState {
  money: number
  companyName: string
  vehicles: Vehicle[]
  designs: VehicleDesign[]
  research: ResearchTech[]
  sales: { [country: string]: number }
  reputation: number
  employees: number
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
    return saved ? JSON.parse(saved) : {
      money: 100000,
      companyName: 'My Auto Corp',
      vehicles: [],
      designs: [],
      research: [],
      sales: {},
      reputation: 0,
      employees: 5
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

  // simple game tick that accrues money based on timeSpeed
  useEffect(() => {
    if (!timeSpeed || timeSpeed <= 0) return
    const id = setInterval(() => {
      setGameState(prev => ({ ...prev, money: prev.money + 10 * timeSpeed }))
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
      {page === 'manufacturing' && <Manufacturing t={t} onBack={() => setPage('menu')} gameState={gameState} updateGameState={updateGameState} />}
      {page === 'market' && <GlobalMarket t={t} onBack={() => setPage('menu')} gameState={gameState} updateGameState={updateGameState} />}
      {page === 'research' && <Research t={t} onBack={() => setPage('menu')} gameState={gameState} updateGameState={updateGameState} />}
      {page === 'competition' && <Competition t={t} onBack={() => setPage('menu')} gameState={gameState} />}
      {page === 'dashboard' && <Dashboard t={t} onBack={() => setPage('menu')} gameState={gameState} />}
    </div>
  )
}
