import React, { useState } from 'react'
import { GameState, VehicleDesign } from '../App'

export default function TruckDesigner({ 
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

  const [truckConfig, setTruckConfig] = useState({
    engine: { 
      type: 'Diesel-V8', 
      cylinders: 8, 
      displacement: 7500, 
      power: 400, 
      torque: 1400, 
      fuelType: 'diesel'
    },
    transmission: { 
      type: 'Automatic', 
      gears: 10 
    },
    chassis: { 
      weight: 8000, 
      length: 7.5, 
      width: 2.5, 
      suspension: 'Heavy-Duty Leaf'
    },
    cargo: { 
      capacity: 5000, 
      type: 'open-bed',
      refrigerated: false,
      loadRating: 10000
    },
    powertrain: { 
      driveType: 'RWD',
      gvwr: 15000,
      payloadCapacity: 7000
    },
    safety: { 
      airbags: 2, 
      rating: 4.5, 
      traction: 'Advanced',
      abs: true,
      stability: true,
      rollover: true
    },
    performance: 0,
    efficiency: 0,
    reliability: 0,
    marketAppeal: 0,
    productionCost: 0
  })

  const calculateStats = () => {
    const performance = (truckConfig.engine.power / 500) * 70
    const efficiency = 100 - ((truckConfig.engine.displacement / 8000) * 70) + (truckConfig.chassis.weight > 10000 ? -20 : 0)
    const reliability = truckConfig.safety.rating * 18 + 15
    const marketAppeal = (truckConfig.cargo.capacity / 10000) * 100
    
    const cost = 
      (truckConfig.engine.displacement / 100) * 900 +
      (truckConfig.cargo.capacity / 100) * 50 +
      (truckConfig.cargo.refrigerated ? 8000 : 0) +
      (truckConfig.powertrain.driveType === 'AWD' ? 5000 : 0) +
      (truckConfig.safety.rollover ? 3000 : 0) +
      30000

    setTruckConfig(prev => ({
      ...prev,
      performance: Math.min(100, Math.max(0, performance)),
      efficiency: Math.min(100, Math.max(0, efficiency)),
      reliability: Math.min(100, Math.max(0, reliability)),
      marketAppeal: Math.min(100, Math.max(0, marketAppeal)),
      productionCost: Math.round(cost)
    }))
  }

  const handleSaveDesign = () => {
    if (gameState.money < truckConfig.productionCost) {
      alert('Not enough money to save this design!')
      return
    }

    const newDesign: VehicleDesign = {
      id: Date.now().toString(),
      name: projectName,
      type: 'truck',
      engine: {
        type: truckConfig.engine.type as any,
        cylinders: truckConfig.engine.cylinders,
        displacement: truckConfig.engine.displacement,
        power: truckConfig.engine.power,
        torque: truckConfig.engine.torque,
        fuelType: truckConfig.engine.fuelType as any,
        compression: 18,
        components: {} as any,
        redline: 4500
      },
      transmission: {
        type: truckConfig.transmission.type as any,
        gears: truckConfig.transmission.gears,
        finalDrive: 2.2
      },
      suspension: {
        frontType: 'double-wishbone' as const,
        rearType: 'solid-axle' as const,
        springs: 'leaf' as const,
        dampers: 'hydraulic' as const,
        antiRoll: false,
        loweringKit: false,
        stiffnessLevel: 70
      },
      body: {
        material: 'steel' as const,
        roofType: 'fixed' as const,
        bodyStyle: 'truck' as any,
        frontBumper: 'basic' as const,
        rearBumper: 'basic' as const,
        sideSkirts: 'standard' as const,
        wheels: { size: 24, type: 'steel' as const, design: 'sport' as const, offset: 0 },
        tires: { brand: 'economy' as const, season: 'all-season' as const, width: 385, aspectRatio: 65, loadRating: 'reinforced' as const },
        paint: { color: '#444444', type: 'solid' as const, quality: 'basic' as const }
      },
      lighting: {
        headlights: 'halogen' as const,
        taillights: 'led' as const,
        blinkers: 'led' as const,
        fogLights: true,
        daytimeRunning: false,
        ambientLighting: false
      },
      interior: {
        seats: 2,
        seatMaterial: 'cloth' as any,
        infotainment: 'basic' as any,
        soundSystem: 'standard' as const,
        climate: 'manual' as any,
        steering: 'power' as const,
        airbags: truckConfig.safety.airbags,
        cruiseControl: 'basic' as const
      },
      safetySystem: {
        abs: truckConfig.safety.abs,
        esp: truckConfig.safety.stability,
        traction: truckConfig.safety.traction as any,
        brakingSystem: 'high-performance' as const,
        aseAssist: false,
        collisionDetection: false,
        parkingAssist: true,
        blindSpotDetection: true
      },
      visibility: {
        mirrors: 'heated' as const,
        rearviewMirror: 'auto-dimming' as const,
        windows: 'power' as const,
        wipers: 'intermittent' as const
      },
      performance: truckConfig.performance,
      efficiency: truckConfig.efficiency,
      reliability: truckConfig.reliability,
      comfort: 50,
      safety: truckConfig.safety.rating * 20,
      style: 60,
      marketAppeal: truckConfig.marketAppeal,
      productionCost: truckConfig.productionCost,
      createdAt: Date.now()
    }

    updateGameState({
      designs: [...(gameState.designs || []), newDesign],
      money: gameState.money - truckConfig.productionCost
    })

    alert(`${projectName} saved successfully!`)
    onBack()
  }

  const tabs = [
    { id: 'engine', icon: '⚙️', label: 'Engine' },
    { id: 'chassis', icon: '🚚', label: 'Chassis' },
    { id: 'cargo', icon: '📦', label: 'Cargo Bed' },
    { id: 'powertrain', icon: '⚡', label: 'Powertrain' },
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
    buttons: { display: 'flex', gap: '10px' },
    btn: (color: string) => ({ padding: '12px 24px', background: color, border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' })
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🚚 Truck Designer - {subcategory}</h2>
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
                  value={truckConfig.engine.type}
                  onChange={(e) => setTruckConfig(prev => ({ ...prev, engine: { ...prev.engine, type: e.target.value } }))}
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
                <label style={styles.label}>Displacement (cc): {truckConfig.engine.displacement}</label>
                <input 
                  type="range" 
                  min="5000" 
                  max="12000" 
                  step="100"
                  value={truckConfig.engine.displacement}
                  onChange={(e) => setTruckConfig(prev => ({ ...prev, engine: { ...prev.engine, displacement: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Power (HP): {truckConfig.engine.power}</label>
                <input 
                  type="range" 
                  min="250" 
                  max="600" 
                  step="10"
                  value={truckConfig.engine.power}
                  onChange={(e) => setTruckConfig(prev => ({ ...prev, engine: { ...prev.engine, power: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Torque (Nm): {truckConfig.engine.torque}</label>
                <input 
                  type="range" 
                  min="800" 
                  max="2000" 
                  step="50"
                  value={truckConfig.engine.torque}
                  onChange={(e) => setTruckConfig(prev => ({ ...prev, engine: { ...prev.engine, torque: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'chassis' && (
          <div>
            <h3 style={styles.sectionTitle}>🚚 Chassis & Suspension</h3>
            <div style={styles.grid}>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Weight (kg): {truckConfig.chassis.weight}</label>
                <input 
                  type="range" 
                  min="6000" 
                  max="12000" 
                  step="500"
                  value={truckConfig.chassis.weight}
                  onChange={(e) => setTruckConfig(prev => ({ ...prev, chassis: { ...prev.chassis, weight: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Length (m): {truckConfig.chassis.length.toFixed(1)}</label>
                <input 
                  type="range" 
                  min="5" 
                  max="10" 
                  step="0.5"
                  value={truckConfig.chassis.length}
                  onChange={(e) => setTruckConfig(prev => ({ ...prev, chassis: { ...prev.chassis, length: parseFloat(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Suspension Type</label>
                <select 
                  value={truckConfig.chassis.suspension}
                  onChange={(e) => setTruckConfig(prev => ({ ...prev, chassis: { ...prev.chassis, suspension: e.target.value } }))}
                  style={styles.input}
                >
                  <option>Leaf Spring</option>
                  <option>Heavy-Duty Leaf</option>
                  <option>Air Suspension</option>
                  <option>Coil Spring</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'cargo' && (
          <div>
            <h3 style={styles.sectionTitle}>📦 Cargo Bed Configuration</h3>
            <div style={styles.grid}>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Cargo Capacity (kg): {truckConfig.cargo.capacity}</label>
                <input 
                  type="range" 
                  min="1000" 
                  max="30000" 
                  step="500"
                  value={truckConfig.cargo.capacity}
                  onChange={(e) => setTruckConfig(prev => ({ ...prev, cargo: { ...prev.cargo, capacity: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Cargo Type</label>
                <select 
                  value={truckConfig.cargo.type}
                  onChange={(e) => setTruckConfig(prev => ({ ...prev, cargo: { ...prev.cargo, type: e.target.value } }))}
                  style={styles.input}
                >
                  <option value="open-bed">Open Bed</option>
                  <option value="enclosed">Enclosed Box</option>
                  <option value="flatbed">Flatbed</option>
                  <option value="dump">Dump Bed</option>
                  <option value="tanker">Tanker</option>
                </select>
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>
                  <input 
                    type="checkbox" 
                    checked={truckConfig.cargo.refrigerated}
                    onChange={(e) => setTruckConfig(prev => ({ ...prev, cargo: { ...prev.cargo, refrigerated: e.target.checked } }))}
                  /> Refrigerated
                </label>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'powertrain' && (
          <div>
            <h3 style={styles.sectionTitle}>⚡ Powertrain</h3>
            <div style={styles.grid}>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Drive Type</label>
                <select 
                  value={truckConfig.powertrain.driveType}
                  onChange={(e) => setTruckConfig(prev => ({ ...prev, powertrain: { ...prev.powertrain, driveType: e.target.value } }))}
                  style={styles.input}
                >
                  <option>RWD</option>
                  <option>AWD</option>
                  <option>6x4</option>
                  <option>6x6</option>
                </select>
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>GVWR (kg): {truckConfig.powertrain.gvwr}</label>
                <input 
                  type="range" 
                  min="10000" 
                  max="40000" 
                  step="1000"
                  value={truckConfig.powertrain.gvwr}
                  onChange={(e) => setTruckConfig(prev => ({ ...prev, powertrain: { ...prev.powertrain, gvwr: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Payload (kg): {truckConfig.powertrain.payloadCapacity}</label>
                <input 
                  type="range" 
                  min="2000" 
                  max="15000" 
                  step="500"
                  value={truckConfig.powertrain.payloadCapacity}
                  onChange={(e) => setTruckConfig(prev => ({ ...prev, powertrain: { ...prev.powertrain, payloadCapacity: parseInt(e.target.value) } }))}
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
                <label style={styles.label}>Safety Rating: {truckConfig.safety.rating}</label>
                <input 
                  type="range" 
                  min="2" 
                  max="5" 
                  step="0.5"
                  value={truckConfig.safety.rating}
                  onChange={(e) => setTruckConfig(prev => ({ ...prev, safety: { ...prev.safety, rating: parseFloat(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>
                  <input 
                    type="checkbox" 
                    checked={truckConfig.safety.abs}
                    onChange={(e) => setTruckConfig(prev => ({ ...prev, safety: { ...prev.safety, abs: e.target.checked } }))}
                  /> ABS
                </label>
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>
                  <input 
                    type="checkbox" 
                    checked={truckConfig.safety.stability}
                    onChange={(e) => setTruckConfig(prev => ({ ...prev, safety: { ...prev.safety, stability: e.target.checked } }))}
                  /> Stability Control
                </label>
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>
                  <input 
                    type="checkbox" 
                    checked={truckConfig.safety.rollover}
                    onChange={(e) => setTruckConfig(prev => ({ ...prev, safety: { ...prev.safety, rollover: e.target.checked } }))}
                  /> Rollover Protection
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
                <div style={styles.statValue}>{truckConfig.performance.toFixed(0)}/100</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statLabel}>Efficiency</div>
                <div style={styles.statValue}>{truckConfig.efficiency.toFixed(0)}/100</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statLabel}>Reliability</div>
                <div style={styles.statValue}>{truckConfig.reliability.toFixed(0)}/100</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statLabel}>Market Appeal</div>
                <div style={styles.statValue}>{truckConfig.marketAppeal.toFixed(0)}/100</div>
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #FFC107' }}>
              <div style={{ fontSize: '13px', color: '#bbb' }}>Production Cost</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFC107' }}>${truckConfig.productionCost.toLocaleString()}</div>
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
