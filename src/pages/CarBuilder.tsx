import React, { useState } from 'react'
import { GameState, VehicleDesign } from '../App'
import { VehicleCategory, VehicleSubcategory } from './VehicleSelection'

export default function CarBuilder({ t, onBack, gameState, updateGameState, selectedVehicle }: {
  t: (k: string) => string
  onBack: () => void
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
  selectedVehicle?: { category: VehicleCategory; subcategory: VehicleSubcategory } | null
}) {
  const [projectName, setProjectName] = useState('Car Project 0')
  const [selectedCategory, setSelectedCategory] = useState<string>('engine')
  const [carConfig, setCarConfig] = useState({
    engine: { type: 'Inline', cylinders: 3, pistonDiameter: 70, pistonStroke: 60, power: 36, torque: 46, volume: 0.69 },
    transmission: { type: 'Manual', gears: 3 },
    suspension: { type: 'Normal' },
    undercarriage: { rearBrakes: 'Drum', frontBrakes: 'Drum', tires: 'Ordinary' },
    appearance: { color: '#7B2D8F', style: 'Classic' },
    interior: { seats: 4, material: 'Basic', comfort: 28 },
    safety: { material: 'Steel', rating: 0.3 },
    production: { acceleration: 25.14, maxSpeed: 136, weight: 1113, fuelConsumption: 8 }
  })

  const categories = [
    { id: 'engine', icon: '📦', label: 'Engine' },
    { id: 'transmission', icon: '⚙️', label: 'Transmission' },
    { id: 'suspension', icon: '⬇️', label: 'Suspension' },
    { id: 'undercarriage', icon: '⬇️', label: 'Undercarriage' },
    { id: 'appearance', icon: '✨', label: 'Appearance' },
    { id: 'interior', icon: '🪑', label: 'Interior' },
    { id: 'safety', icon: '🛡️', label: 'Safety' },
    { id: 'production', icon: '✓', label: 'Production' }
  ]

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case 'engine':
        return (
          <div>
            <h3 style={{marginTop:0}}>🔧 Engine Block</h3>

            <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
              {/* Left: capacity and preview */}
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                  <div style={{fontSize:14}}>Capacity in body</div>
                  <div style={{fontSize:14,fontWeight:'bold'}}>87%</div>
                </div>
                <div style={{height:12,background:'#123',borderRadius:6,overflow:'hidden',marginBottom:12}}>
                  <div style={{width:'87%',height:'100%',background:'#2ecc71'}} />
                </div>

                <div style={{height:220,display:'flex',alignItems:'center',justifyContent:'center',border:'2px dashed rgba(255,255,255,0.06)',borderRadius:8,background:'linear-gradient(180deg,#0f2340, #081426)'}}>
                  {/* placeholder engine illustration */}
                  <svg width="180" height="110" viewBox="0 0 180 110">
                    <rect x="10" y="30" rx="8" ry="8" width="160" height="50" fill="#2b2b2b" stroke="#444" />
                    <circle cx="45" cy="55" r="16" fill="#111" stroke="#666" />
                    <circle cx="90" cy="55" r="16" fill="#111" stroke="#666" />
                    <circle cx="135" cy="55" r="16" fill="#111" stroke="#666" />
                  </svg>
                </div>

                <div style={{display:'flex',gap:8,marginTop:12}}>
                  <div style={{flex:1,padding:12,background:'#111',borderRadius:8}}>
                    <div style={{fontSize:12,color:'#aaa'}}>Engine Type</div>
                    <div style={{fontWeight:'bold'}}>Inline</div>
                  </div>
                  <div style={{flex:1,padding:12,background:'#111',borderRadius:8}}>
                    <div style={{fontSize:12,color:'#aaa'}}>Cylinders</div>
                    <div style={{fontWeight:'bold'}}>3</div>
                  </div>
                </div>
              </div>

              {/* Right: controls */}
              <div style={{width:340}}>
                <div style={{marginBottom:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                    <div style={{fontSize:13}}>Piston diameter</div>
                    <div style={{fontSize:13,fontWeight:'bold'}}>{carConfig.engine.pistonDiameter}</div>
                  </div>
                  <input type="range" min={40} max={90} value={carConfig.engine.pistonDiameter} onChange={(e)=>setCarConfig(prev=>({...prev, engine:{...prev.engine, pistonDiameter: Number(e.target.value)}}))} style={{width:'100%'}} />
                </div>

                <div style={{marginBottom:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                    <div style={{fontSize:13}}>Piston stroke</div>
                    <div style={{fontSize:13,fontWeight:'bold'}}>{carConfig.engine.pistonStroke}</div>
                  </div>
                  <input type="range" min={40} max={90} value={carConfig.engine.pistonStroke} onChange={(e)=>setCarConfig(prev=>({...prev, engine:{...prev.engine, pistonStroke: Number(e.target.value)}}))} style={{width:'100%'}} />
                </div>

                <div style={{padding:12,background:'#111',borderRadius:8,marginBottom:12}}>
                  <div style={{fontSize:12,color:'#aaa',marginBottom:6}}>Specifications:</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                    <div>Power: <strong>{carConfig.engine.power} Hp</strong></div>
                    <div>Torque: <strong>{carConfig.engine.torque} N·m</strong></div>
                    <div>Engine volume: <strong>{carConfig.engine.volume} L</strong></div>
                    <div>Estimated cost: <strong>$780</strong></div>
                  </div>
                </div>

                <button onClick={()=>{
                  // create a simple engine project and add to designs
                  const newDesign: VehicleDesign = {
                    id: 'eng-'+Date.now(),
                    name: 'New Motor Project',
                    type: 'car',
                    engine: {
                      type: 'inline' as any,
                      cylinders: carConfig.engine.cylinders,
                      displacement: Math.round((carConfig.engine.pistonDiameter*carConfig.engine.pistonStroke)/1000*100)/100,
                      power: carConfig.engine.power,
                      torque: carConfig.engine.torque,
                      fuelType: 'petrol',
                      compression: 10,
                      components: {
                        crankshaft: 'standard', pistons: 'aluminum', valves: 'cast-iron', camshaft: 'basic', fuelInjection: 'multi-point', fuelPump: 'mechanical', oilCooler: false, turboSize: 'none'
                      },
                      redline: 6000
                    },
                    transmission: { type: 'manual', gears: 3, finalDrive: 3.5 },
                    suspension: { frontType: 'macpherson', rearType: 'semi-independent', springs: 'coil', dampers: 'hydraulic', antiRoll: false, loweringKit: false, stiffnessLevel: 50 },
                    body: { material: 'steel', roofType: 'fixed', bodyStyle: 'sedan', frontBumper: 'basic', rearBumper: 'basic', sideSkirts: 'standard', wheels: { size: 16, type: 'alloy', design: 'standard', offset: 35 }, tires: { brand: 'economy', season: 'all-season', width: 185, aspectRatio: 65, loadRating: 'standard' }, paint: { color: carConfig.appearance.color, type: 'solid', quality: 'basic' } },
                    lighting: { headlights: 'halogen', taillights: 'led', blinkers: 'standard', fogLights: false, daytimeRunning: false, ambientLighting: false },
                    interior: { seats: 4, seatMaterial: 'cloth', infotainment: 'basic', soundSystem: 'standard', climate: 'manual', steering: 'power', airbags: 2, cruiseControl: 'none' },
                    safetySystem: { abs: true, esp: false, traction: 'basic', brakingSystem: 'standard', aseAssist: false, collisionDetection: false, parkingAssist: false, blindSpotDetection: false },
                    visibility: { mirrors: 'manual', rearviewMirror: 'standard', windows: 'standard', wipers: 'manual' },
                    performance: 36, efficiency: 50, reliability: 50, comfort: 40, safety: 30, style: 30, marketAppeal: 30, productionCost: 780, createdAt: Date.now()
                  }
                  updateGameState({ designs: [...(gameState.designs||[]), newDesign] })
                  alert('Engine project created and saved as "New Motor Project"')
                }} style={{width:'100%',padding:12,background:'#fff',borderRadius:8,border:'none',fontWeight:'bold',cursor:'pointer'}}>Create Engine</button>
              </div>
            </div>
          </div>
        )
      case 'transmission':
        return (
          <div>
            <h3>⚙️ Transmission</h3>
            <div style={{display:'grid',gap:15}}>
              <div>
                <label>Drive Type:</label>
                <select value={carConfig.transmission.type} style={{width:'100%',padding:8,background:'#222',border:'1px solid #444',color:'#fff',borderRadius:4}}>
                  <option>Rear-wheel drive</option>
                  <option>Front-wheel drive</option>
                  <option>All-wheel drive</option>
                </select>
              </div>
              <div>
                <label>Gearbox:</label>
                <select style={{width:'100%',padding:8,background:'#222',border:'1px solid #444',color:'#fff',borderRadius:4}}>
                  <option>{carConfig.transmission.type}</option>
                  <option>Automatic</option>
                  <option>CVT</option>
                </select>
              </div>
              <div>
                <label>Ratios: {carConfig.transmission.gears}</label>
                <div style={{display:'flex',gap:10}}>
                  <button style={{padding:8,background:'#666',border:'none',color:'#fff',borderRadius:4,cursor:'pointer'}}>−</button>
                  <span style={{flex:1,textAlign:'center',padding:8}}>{carConfig.transmission.gears}</span>
                  <button style={{padding:8,background:'#666',border:'none',color:'#fff',borderRadius:4,cursor:'pointer'}}>+</button>
                </div>
              </div>
            </div>
          </div>
        )
      case 'suspension':
        return (
          <div>
            <h3>⬇️ Suspension</h3>
            <div style={{display:'grid',gap:15}}>
              <div>
                <label>Suspension Type:</label>
                <select value={carConfig.suspension.type} style={{width:'100%',padding:8,background:'#222',border:'1px solid #444',color:'#fff',borderRadius:4}}>
                  <option>Normal</option>
                  <option>Sport</option>
                  <option>Air Suspension</option>
                  <option>Adaptive</option>
                </select>
              </div>
            </div>
          </div>
        )
      case 'undercarriage':
        return (
          <div>
            <h3>🔧 Undercarriage</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:15}}>
              <div>
                <label>Rear brakes:</label>
                <select value={carConfig.undercarriage.rearBrakes} style={{width:'100%',padding:8,background:'#222',border:'1px solid #444',color:'#fff',borderRadius:4}}>
                  <option>Drum</option>
                  <option>Disc</option>
                </select>
              </div>
              <div>
                <label>Front brakes:</label>
                <select value={carConfig.undercarriage.frontBrakes} style={{width:'100%',padding:8,background:'#222',border:'1px solid #444',color:'#fff',borderRadius:4}}>
                  <option>Drum</option>
                  <option>Disc</option>
                </select>
              </div>
              <div>
                <label>Tires:</label>
                <select value={carConfig.undercarriage.tires} style={{width:'100%',padding:8,background:'#222',border:'1px solid #444',color:'#fff',borderRadius:4}}>
                  <option>Ordinary</option>
                  <option>Sport</option>
                  <option>Premium</option>
                </select>
              </div>
            </div>
          </div>
        )
      case 'appearance':
        return (
          <div>
            <h3>✨ Appearance</h3>
            <div style={{display:'grid',gap:15}}>
              <div>
                <label>Color:</label>
                <input type="color" value={carConfig.appearance.color} style={{width:'100%',height:40,border:'none',borderRadius:4,cursor:'pointer'}} />
              </div>
              <div>
                <label>Style:</label>
                <select style={{width:'100%',padding:8,background:'#222',border:'1px solid #444',color:'#fff',borderRadius:4}}>
                  <option>Classic</option>
                  <option>Sport</option>
                  <option>Luxury</option>
                </select>
              </div>
            </div>
          </div>
        )
      case 'interior':
        return (
          <div>
            <h3>🪑 Interior</h3>
            <div style={{display:'grid',gap:15}}>
              <div>
                <label>Seats:</label>
                <div style={{display:'flex',gap:10}}>
                  <button style={{padding:8,background:'#666',border:'none',color:'#fff',borderRadius:4,cursor:'pointer'}}>−</button>
                  <span style={{flex:1,textAlign:'center',padding:8}}>{carConfig.interior.seats}/4</span>
                  <button style={{padding:8,background:'#666',border:'none',color:'#fff',borderRadius:4,cursor:'pointer'}}>+</button>
                </div>
              </div>
              <div>
                <label>Material:</label>
                <select style={{width:'100%',padding:8,background:'#222',border:'1px solid #444',color:'#fff',borderRadius:4}}>
                  <option>Basic</option>
                  <option>Leather</option>
                  <option>Premium</option>
                </select>
              </div>
            </div>
          </div>
        )
      case 'safety':
        return (
          <div>
            <h3>🛡️ Safety</h3>
            <div style={{display:'grid',gap:15}}>
              <div>
                <label>Body Material:</label>
                <select style={{width:'100%',padding:8,background:'#222',border:'1px solid #444',color:'#fff',borderRadius:4}}>
                  <option>Steel</option>
                  <option>Stainless Steel</option>
                  <option>Aluminum</option>
                  <option>Carbon</option>
                </select>
              </div>
              <div style={{padding:15,background:'#222',borderRadius:4}}>
                <div style={{fontSize:14,marginBottom:10}}>NCAP Safety rating: <strong style={{color:'#FFD700'}}>0.3/5</strong></div>
                <p style={{fontSize:12,color:'#aaa'}}>The safety test significantly affects the car's rating and position among competitors globally.</p>
              </div>
            </div>
          </div>
        )
      case 'production':
        return (
          <div>
            <h3>✓ Production</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:15}}>
              <div style={{padding:15,background:'#222',borderRadius:4}}>
                <div style={{fontSize:12,color:'#aaa'}}>0-100</div>
                <div style={{fontSize:18,fontWeight:'bold'}}>{carConfig.production.acceleration} S</div>
              </div>
              <div style={{padding:15,background:'#222',borderRadius:4}}>
                <div style={{fontSize:12,color:'#aaa'}}>Max speed</div>
                <div style={{fontSize:18,fontWeight:'bold'}}>{carConfig.production.maxSpeed} Km/h</div>
              </div>
              <div style={{padding:15,background:'#222',borderRadius:4}}>
                <div style={{fontSize:12,color:'#aaa'}}>Weight</div>
                <div style={{fontSize:18,fontWeight:'bold'}}>{carConfig.production.weight}Kg</div>
              </div>
              <div style={{padding:15,background:'#222',borderRadius:4}}>
                <div style={{fontSize:12,color:'#aaa'}}>Fuel consumption</div>
                <div style={{fontSize:18,fontWeight:'bold'}}>{carConfig.production.fuelConsumption} L/100km</div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div style={{display:'flex',height:'100vh',background:'linear-gradient(135deg, #1a3a52 0%, #0d2438 100%)',color:'#fff',fontFamily:'Arial, sans-serif'}}>
      {/* Header */}
      <div style={{position:'absolute',top:0,left:0,right:0,padding:'15px 20px',background:'rgba(0,0,0,0.3)',borderBottom:'1px solid rgba(255,255,255,0.1)',display:'flex',justifyContent:'space-between',alignItems:'center',zIndex:10}}>
        <div style={{display:'flex',alignItems:'center',gap:15}}>
          <button onClick={onBack} style={{padding:'8px 12px',background:'#333',border:'none',color:'#fff',borderRadius:4,cursor:'pointer'}}>← Menu</button>
          <h1 style={{margin:0,fontSize:24}}>{projectName}</h1>
        </div>
        <div style={{display:'flex',gap:20}}>
          <div>👤 0</div>
          <div>💰 45,000,000</div>
          <button style={{padding:'6px 12px',background:'#4CAF50',border:'none',color:'#fff',borderRadius:4,cursor:'pointer'}}>+</button>
        </div>
      </div>

      {/* Left Sidebar - Categories */}
      <div style={{width:100,background:'rgba(0,0,0,0.4)',padding:'80px 10px 20px',overflowY:'auto',borderRight:'1px solid rgba(255,255,255,0.1)'}}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              width:'100%',
              padding:15,
              margin:'8px 0',
              background:selectedCategory === cat.id ? 'rgba(255,107,107,0.3)' : 'rgba(255,255,255,0.05)',
              border:`2px solid ${selectedCategory === cat.id ? '#ff6b6b' : '#444'}`,
              borderRadius:8,
              color:'#fff',
              cursor:'pointer',
              fontSize:20,
              transition:'all 0.2s'
            }}
            title={cat.label}
          >
            {cat.icon}
          </button>
        ))}
      </div>

      {/* Center - Car Visualization */}
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',paddingTop:80,paddingBottom:20}}>
        <svg width="520" height="260" viewBox="0 0 520 260" style={{filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.6))'}}>
          <defs>
            <linearGradient id="bodyGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="#6b3a8a" />
              <stop offset="100%" stopColor="#2b1b6a" />
            </linearGradient>
            <linearGradient id="glassGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="#9fd8ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#4dabf7" stopOpacity="0.6" />
            </linearGradient>
            <radialGradient id="rimGrad">
              <stop offset="0%" stopColor="#777" />
              <stop offset="100%" stopColor="#222" />
            </radialGradient>
          </defs>

          {/* Smooth car silhouette */}
          <path d="M60 150 C90 110 120 100 200 90 C260 85 320 80 380 95 C440 110 470 120 480 150 C485 170 480 190 470 205 C440 210 120 210 90 205 C75 200 58 180 60 150 Z" fill="url(#bodyGrad)" stroke="#ffffff33" strokeWidth="1" />

          {/* Windows */}
          <path d="M200 95 C220 90 260 90 300 95 L320 95 C325 95 335 100 335 108 L335 125 C330 130 250 125 200 120 Z" fill="url(#glassGrad)" stroke="#ffffff66" strokeWidth="0.8"/>

          {/* Headlight */}
          <ellipse cx="460" cy="150" rx="10" ry="6" fill="#fff7c0" opacity="0.9" />

          {/* Wheels (detailed) */}
          <g transform="translate(170,190)">
            <circle cx="0" cy="0" r="28" fill="#111" />
            <circle cx="0" cy="0" r="18" fill="url(#rimGrad)" />
            <circle cx="0" cy="0" r="6" fill="#aaa" />
          </g>
          <g transform="translate(380,190)">
            <circle cx="0" cy="0" r="28" fill="#111" />
            <circle cx="0" cy="0" r="18" fill="url(#rimGrad)" />
            <circle cx="0" cy="0" r="6" fill="#aaa" />
          </g>

          {/* Jack stands (stylized) */}
          <rect x="150" y="210" width="50" height="18" rx="6" fill="#e98f11" />
          <rect x="360" y="210" width="50" height="18" rx="6" fill="#e98f11" />

        </svg>
        <p style={{marginTop:20,fontSize:14,color:'#ccc'}}>Side-view vehicle preview — realistic shading and shape</p>
      </div>

      {/* Right Panel - Configuration */}
      <div style={{width:380,background:'rgba(0,0,0,0.4)',padding:'80px 20px 20px',overflowY:'auto',borderLeft:'1px solid rgba(255,255,255,0.1)'}}>
        {renderCategoryContent()}
        <button onClick={onBack} style={{width:'100%',marginTop:30,padding:14,background:'#4CAF50',border:'none',color:'#000',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:16}}>
          Create car
        </button>
      </div>
    </div>
  )
}
