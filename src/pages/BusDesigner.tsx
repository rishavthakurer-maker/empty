import React, { useState } from 'react'
import { GameState, VehicleDesign } from '../App'

export default function BusDesigner({ 
  t, 
  onBack, 
  gameState, 
  updateGameState,
  subcategory
}: {
  t: (k: string) => string
  onBack: () => void
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
  subcategory: string
}) {
  const [projectName, setProjectName] = useState(`${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Design`)
  const [selectedTab, setSelectedTab] = useState('engine')

  const [busConfig, setBusConfig] = useState({
    engine: { 
      type: 'Diesel-V6', 
      cylinders: 6, 
      displacement: 6700, 
      power: 320, 
      torque: 1100, 
      fuelType: 'diesel'
    },
    transmission: { 
      type: 'Automatic', 
      gears: 6 
    },
    chassis: { 
      weight: 12000, 
      length: 12.0, 
      width: 2.5, 
      suspension: 'Air Suspension'
    },
    capacity: { 
      seats: 45, 
      standingRoom: 20,
      accessibility: true,
      wheelchairSpaces: 2
    },
    interior: { 
      material: 'Premium Fabric', 
      comfort: 75,
      infotainment: 'Standard',
      climate: 'Dual-Zone',
      comfort_features: ['USB Charging', 'LED Lighting', 'WiFi Ready']
    },
    exterior: { 
      color: '#FFFFFF',
      aerodynamics: 0.65,
      windows: 'Large Panoramic'
    },
    safety: { 
      airbags: 6, 
      rating: 4, 
      traction: 'Advanced',
      esp: true,
      emergencyExit: true
    },
    performance: 0,
    efficiency: 0,
    reliability: 0,
    marketAppeal: 0,
    productionCost: 0
  })

  const calculateStats = () => {
    const performance = (busConfig.engine.power / 400) * 80
    const efficiency = 100 - ((busConfig.engine.displacement / 8000) * 60)
    const reliability = busConfig.safety.rating * 15 + 20
    const comfort = busConfig.capacity.seats > 40 ? 80 : 60
    
    const cost = 
      (busConfig.engine.displacement / 100) * 800 +
      busConfig.capacity.seats * 500 +
      (busConfig.interior.material === 'Premium Fabric' ? 8000 : 4000) +
      (busConfig.capacity.wheelchairSpaces * 5000) +
      (busConfig.interior.climate === 'Dual-Zone' ? 3000 : 1000) +
      25000

    setBusConfig(prev => ({
      ...prev,
      performance: Math.min(100, Math.max(0, performance)),
      efficiency: Math.min(100, Math.max(0, efficiency)),
      reliability: Math.min(100, Math.max(0, reliability)),
      marketAppeal: Math.min(100, Math.max(0, comfort + busConfig.capacity.seats / 5)),
      productionCost: Math.round(cost)
    }))
  }

  const handleSaveDesign = () => {
    if (gameState.money < busConfig.productionCost) {
      alert('Not enough money to save this design!')
      return
    }

    const newDesign: VehicleDesign = {
      id: Date.now().toString(),
      name: projectName,
      type: 'bus',
      engine: {
        type: busConfig.engine.type as any,
        cylinders: busConfig.engine.cylinders,
        displacement: busConfig.engine.displacement,
        power: busConfig.engine.power,
        torque: busConfig.engine.torque,
        fuelType: busConfig.engine.fuelType as any,
        compression: 15,
        components: {} as any,
        redline: 5000
      },
      transmission: {
        type: busConfig.transmission.type as any,
        gears: busConfig.transmission.gears,
        finalDrive: 2.5
      },
      suspension: {
        frontType: 'double-wishbone' as const,
        rearType: 'independent' as const,
        springs: 'air' as const,
        dampers: 'adaptive' as const,
        antiRoll: true,
        loweringKit: false,
        stiffnessLevel: 30
      },
      body: {
        material: 'steel' as const,
        roofType: 'fixed' as const,
        bodyStyle: 'bus' as any,
        frontBumper: 'standard' as const,
        rearBumper: 'standard' as const,
        sideSkirts: 'standard' as const,
        wheels: { size: 22, type: 'steel' as const, design: 'standard' as const, offset: 0 },
        tires: { brand: 'economy' as const, season: 'all-season' as const, width: 315, aspectRatio: 70, loadRating: 'reinforced' as const },
        paint: { color: busConfig.exterior.color, type: 'solid' as const, quality: 'basic' as const }
      },
      lighting: {
        headlights: 'xenon' as const,
        taillights: 'led' as const,
        blinkers: 'led' as const,
        fogLights: true,
        daytimeRunning: true,
        ambientLighting: false
      },
      interior: {
        seats: busConfig.capacity.seats,
        seatMaterial: busConfig.interior.material as any,
        infotainment: busConfig.interior.infotainment as any,
        soundSystem: 'standard' as const,
        climate: busConfig.interior.climate as any,
        steering: 'power' as const,
        airbags: busConfig.safety.airbags,
        cruiseControl: 'basic' as const
      },
      safetySystem: {
        abs: true,
        esp: busConfig.safety.esp,
        traction: busConfig.safety.traction as any,
        brakingSystem: 'standard' as const,
        aseAssist: true,
        collisionDetection: false,
        parkingAssist: true,
        blindSpotDetection: true
      },
      visibility: {
        mirrors: 'heated' as const,
        rearviewMirror: 'standard' as const,
        windows: 'power' as const,
        wipers: 'intermittent' as const
      },
      performance: busConfig.performance,
      efficiency: busConfig.efficiency,
      reliability: busConfig.reliability,
      comfort: busConfig.interior.comfort,
      safety: busConfig.safety.rating * 20,
      style: 70,
      marketAppeal: busConfig.marketAppeal,
      productionCost: busConfig.productionCost,
      createdAt: Date.now()
    }

    updateGameState({
      designs: [...(gameState.designs || []), newDesign],
      money: gameState.money - busConfig.productionCost
    })

    alert(`${projectName} saved successfully!`)
    onBack()
  }

  const tabs = [
    { id: 'engine', icon: '⚙️', label: 'Engine' },
    { id: 'chassis', icon: '🚌', label: 'Chassis' },
    { id: 'capacity', icon: '👥', label: 'Capacity' },
    { id: 'interior', icon: '🪑', label: 'Interior' },
    { id: 'safety', icon: '🛡️', label: 'Safety' },
    { id: 'stats', icon: '📊', label: 'Stats' }
  ]

  const styles = {
    container: { padding: '20px', color: '#fff', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(135deg, #1a3a52 0%, #0d2438 100%)', minHeight: '100vh' },
    header: { marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    title: { margin: 0, fontSize: '24px', fontWeight: 'bold' },
    backBtn: { padding: '8px 16px', background: '#666', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' },
    nameInput: { padding: '12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: '#fff', fontSize: '14px', width: '300px' },
    tabBar: { display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '10px' },
    tab: (active: boolean) => ({
      padding: '10px 16px',
      background: active ? '#4CAF50' : 'rgba(255,255,255,0.1)',
      border: 'none',
      color: '#fff',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: active ? 'bold' : 'normal'
    }),
    content: { background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '20px', marginBottom: '20px' },
    section: { marginBottom: '20px' },
    sectionTitle: { fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' },
    controlGroup: { display: 'flex', flexDirection: 'column' as const, gap: '8px' },
    label: { fontSize: '13px', fontWeight: '500', color: '#ccc' },
    input: { padding: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: '#fff', fontSize: '13px' },
    slider: { width: '100%', cursor: 'pointer' },
    statBar: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '15px' },
    stat: { background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #4CAF50' },
    statLabel: { fontSize: '12px', color: '#bbb' },
    statValue: { fontSize: '20px', fontWeight: 'bold', color: '#4CAF50' },
    colorPicker: { width: '100%', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    buttons: { display: 'flex', gap: '10px' },
    btn: (color: string) => ({ padding: '12px 24px', background: color, border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' })
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🚌 Bus Designer - {subcategory}</h2>
        <button onClick={onBack} style={styles.backBtn}>← Back</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '13px', color: '#ccc' }}>Project Name:</label>
        <input 
          type="text" 
          value={projectName} 
          onChange={(e) => setProjectName(e.target.value)}
          style={styles.nameInput}
        />
      </div>

      <div style={styles.tabBar}>
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            style={styles.tab(selectedTab === tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div style={styles.content}>
        {selectedTab === 'engine' && (
          <div>
            <h3 style={styles.sectionTitle}>⚙️ Engine Configuration</h3>
            <div style={styles.grid}>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Engine Type</label>
                <select 
                  value={busConfig.engine.type}
                  onChange={(e) => setBusConfig(prev => ({ ...prev, engine: { ...prev.engine, type: e.target.value } }))}
                  style={styles.input}
                >
                  <option>Diesel-I6</option>
                  <option>Diesel-V6</option>
                  <option>Diesel-V8</option>
                  <option>Natural Gas</option>
                  <option>Electric</option>
                </select>
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Displacement (cc): {busConfig.engine.displacement}</label>
                <input 
                  type="range" 
                  min="5000" 
                  max="12000" 
                  step="100"
                  value={busConfig.engine.displacement}
                  onChange={(e) => setBusConfig(prev => ({ ...prev, engine: { ...prev.engine, displacement: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Power (HP): {busConfig.engine.power}</label>
                <input 
                  type="range" 
                  min="200" 
                  max="500" 
                  step="10"
                  value={busConfig.engine.power}
                  onChange={(e) => setBusConfig(prev => ({ ...prev, engine: { ...prev.engine, power: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'chassis' && (
          <div>
            <h3 style={styles.sectionTitle}>🚌 Chassis & Suspension</h3>
            <div style={styles.grid}>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Weight (kg): {busConfig.chassis.weight}</label>
                <input 
                  type="range" 
                  min="8000" 
                  max="18000" 
                  step="500"
                  value={busConfig.chassis.weight}
                  onChange={(e) => setBusConfig(prev => ({ ...prev, chassis: { ...prev.chassis, weight: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Length (m): {busConfig.chassis.length.toFixed(1)}</label>
                <input 
                  type="range" 
                  min="10" 
                  max="18" 
                  step="0.5"
                  value={busConfig.chassis.length}
                  onChange={(e) => setBusConfig(prev => ({ ...prev, chassis: { ...prev.chassis, length: parseFloat(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Suspension Type</label>
                <select 
                  value={busConfig.chassis.suspension}
                  onChange={(e) => setBusConfig(prev => ({ ...prev, chassis: { ...prev.chassis, suspension: e.target.value } }))}
                  style={styles.input}
                >
                  <option>Coil Spring</option>
                  <option>Leaf Spring</option>
                  <option>Air Suspension</option>
                  <option>Adaptive Air</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'capacity' && (
          <div>
            <h3 style={styles.sectionTitle}>👥 Seating Capacity</h3>
            <div style={styles.grid}>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Seated Passengers: {busConfig.capacity.seats}</label>
                <input 
                  type="range" 
                  min="12" 
                  max="90" 
                  step="1"
                  value={busConfig.capacity.seats}
                  onChange={(e) => setBusConfig(prev => ({ ...prev, capacity: { ...prev.capacity, seats: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Standing Room: {busConfig.capacity.standingRoom}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  step="5"
                  value={busConfig.capacity.standingRoom}
                  onChange={(e) => setBusConfig(prev => ({ ...prev, capacity: { ...prev.capacity, standingRoom: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Wheelchair Spaces: {busConfig.capacity.wheelchairSpaces}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="6" 
                  step="1"
                  value={busConfig.capacity.wheelchairSpaces}
                  onChange={(e) => setBusConfig(prev => ({ ...prev, capacity: { ...prev.capacity, wheelchairSpaces: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>
                  <input 
                    type="checkbox" 
                    checked={busConfig.capacity.accessibility}
                    onChange={(e) => setBusConfig(prev => ({ ...prev, capacity: { ...prev.capacity, accessibility: e.target.checked } }))}
                  /> Full Accessibility
                </label>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'interior' && (
          <div>
            <h3 style={styles.sectionTitle}>🪑 Interior</h3>
            <div style={styles.grid}>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Material</label>
                <select 
                  value={busConfig.interior.material}
                  onChange={(e) => setBusConfig(prev => ({ ...prev, interior: { ...prev.interior, material: e.target.value } }))}
                  style={styles.input}
                >
                  <option>Basic Fabric</option>
                  <option>Standard Fabric</option>
                  <option>Premium Fabric</option>
                  <option>Leather</option>
                </select>
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Climate Control</label>
                <select 
                  value={busConfig.interior.climate}
                  onChange={(e) => setBusConfig(prev => ({ ...prev, interior: { ...prev.interior, climate: e.target.value } }))}
                  style={styles.input}
                >
                  <option>Manual</option>
                  <option>Auto</option>
                  <option>Dual-Zone</option>
                  <option>Multi-Zone</option>
                </select>
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Comfort Level: {busConfig.interior.comfort}</label>
                <input 
                  type="range" 
                  min="40" 
                  max="95" 
                  step="5"
                  value={busConfig.interior.comfort}
                  onChange={(e) => setBusConfig(prev => ({ ...prev, interior: { ...prev.interior, comfort: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'safety' && (
          <div>
            <h3 style={styles.sectionTitle}>🛡️ Safety Features</h3>
            <div style={styles.grid}>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Safety Rating: {busConfig.safety.rating}</label>
                <input 
                  type="range" 
                  min="2" 
                  max="5" 
                  step="0.5"
                  value={busConfig.safety.rating}
                  onChange={(e) => setBusConfig(prev => ({ ...prev, safety: { ...prev.safety, rating: parseFloat(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>
                  <input 
                    type="checkbox" 
                    checked={busConfig.safety.esp}
                    onChange={(e) => setBusConfig(prev => ({ ...prev, safety: { ...prev.safety, esp: e.target.checked } }))}
                  /> ESP (Stability Control)
                </label>
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>
                  <input 
                    type="checkbox" 
                    checked={busConfig.safety.emergencyExit}
                    onChange={(e) => setBusConfig(prev => ({ ...prev, safety: { ...prev.safety, emergencyExit: e.target.checked } }))}
                  /> Emergency Exits
                </label>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'stats' && (
          <div>
            <h3 style={styles.sectionTitle}>📊 Vehicle Statistics</h3>
            <button 
              onClick={calculateStats}
              style={{ ...styles.btn('#4CAF50'), marginBottom: '20px' }}
            >
              Calculate Stats
            </button>
            <div style={styles.statBar}>
              <div style={styles.stat}>
                <div style={styles.statLabel}>Performance</div>
                <div style={styles.statValue}>{busConfig.performance.toFixed(0)}/100</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statLabel}>Efficiency</div>
                <div style={styles.statValue}>{busConfig.efficiency.toFixed(0)}/100</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statLabel}>Reliability</div>
                <div style={styles.statValue}>{busConfig.reliability.toFixed(0)}/100</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statLabel}>Market Appeal</div>
                <div style={styles.statValue}>{busConfig.marketAppeal.toFixed(0)}/100</div>
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #FFC107' }}>
              <div style={{ fontSize: '13px', color: '#bbb' }}>Production Cost</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFC107' }}>${busConfig.productionCost.toLocaleString()}</div>
            </div>
          </div>
        )}
      </div>

      <div style={styles.buttons}>
        <button onClick={onBack} style={styles.btn('#666')}>← Cancel</button>
        <button onClick={calculateStats} style={styles.btn('#2196F3')}>🔄 Recalculate</button>
        <button onClick={handleSaveDesign} style={styles.btn('#4CAF50')}>💾 Save Design</button>
      </div>
    </div>
  )
}
