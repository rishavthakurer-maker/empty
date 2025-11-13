import React, { useState } from 'react'
import { GameState, VehicleDesign } from '../App'

export default function CarDesigner({ 
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

  const [carConfig, setCarConfig] = useState({
    engine: { 
      type: 'Inline-4', 
      cylinders: 4, 
      displacement: 2000, 
      power: 180, 
      torque: 220, 
      fuelType: 'petrol'
    },
    transmission: { 
      type: 'Automatic', 
      gears: 8 
    },
    chassis: { 
      weight: 1400, 
      length: 4.7, 
      width: 1.8, 
      suspension: 'Independent'
    },
    interior: { 
      seats: 5, 
      material: 'Leather', 
      comfort: 85,
      infotainment: 'Advanced'
    },
    exterior: { 
      bodyStyle: subcategory,
      color: '#2196F3',
      aerodynamics: 0.30
    },
    safety: { 
      airbags: 8, 
      rating: 5, 
      traction: 'Advanced',
      abs: true
    },
    performance: 0,
    efficiency: 0,
    reliability: 0,
    marketAppeal: 0,
    productionCost: 0
  })

  const calculateStats = () => {
    const performance = (carConfig.engine.power / 300) * 100 + (carConfig.chassis.weight > 1500 ? -10 : 10)
    const efficiency = 100 - ((carConfig.engine.displacement / 5000) * 50) + (carConfig.exterior.aerodynamics < 0.3 ? 20 : 0)
    const reliability = carConfig.safety.rating * 15 + (carConfig.transmission.type === 'Manual' ? -5 : 10)
    const safety = carConfig.safety.airbags * 8 + carConfig.safety.rating * 10
    const comfort = carConfig.interior.comfort + (carConfig.interior.material === 'Leather' ? 10 : 0) + (carConfig.interior.seats > 5 ? -5 : 0)
    
    const cost = 
      (carConfig.engine.displacement / 100) * 500 +
      carConfig.interior.seats * 1000 +
      (carConfig.interior.material === 'Leather' ? 5000 : 2000) +
      (carConfig.transmission.gears * 500) +
      (carConfig.safety.airbags * 300) +
      10000

    setCarConfig(prev => ({
      ...prev,
      performance: Math.min(100, Math.max(0, performance)),
      efficiency: Math.min(100, Math.max(0, efficiency)),
      reliability: Math.min(100, Math.max(0, reliability)),
      marketAppeal: Math.min(100, Math.max(0, (comfort + safety) / 2)),
      productionCost: Math.round(cost)
    }))
  }

  const handleSaveDesign = () => {
    if (gameState.money < carConfig.productionCost) {
      alert('Not enough money to save this design!')
      return
    }

    const newDesign: VehicleDesign = {
      id: Date.now().toString(),
      name: projectName,
      type: 'car',
      engine: {
        type: carConfig.engine.type as any,
        cylinders: carConfig.engine.cylinders,
        displacement: carConfig.engine.displacement,
        power: carConfig.engine.power,
        torque: carConfig.engine.torque,
        fuelType: carConfig.engine.fuelType as any,
        compression: 10,
        components: {} as any,
        redline: 7000
      },
      transmission: {
        type: carConfig.transmission.type as any,
        gears: carConfig.transmission.gears,
        finalDrive: 3.5
      },
      suspension: {
        frontType: 'macpherson' as const,
        rearType: 'semi-independent' as const,
        springs: 'coil' as const,
        dampers: 'electronic' as const,
        antiRoll: true,
        loweringKit: false,
        stiffnessLevel: 50
      },
      body: {
        material: 'steel' as const,
        roofType: 'fixed' as const,
        bodyStyle: carConfig.exterior.bodyStyle as any,
        frontBumper: 'sport' as const,
        rearBumper: 'sport' as const,
        sideSkirts: 'standard' as const,
        wheels: { size: 18, type: 'alloy' as const, design: 'sport' as const, offset: 0 },
        tires: { brand: 'performance' as const, season: 'summer' as const, width: 215, aspectRatio: 45, loadRating: 'standard' as const },
        paint: { color: carConfig.exterior.color, type: 'metallic' as const, quality: 'premium' as const }
      },
      lighting: {
        headlights: 'led' as const,
        taillights: 'led' as const,
        blinkers: 'led' as const,
        fogLights: true,
        daytimeRunning: true,
        ambientLighting: true
      },
      interior: {
        seats: carConfig.interior.seats,
        seatMaterial: carConfig.interior.material as any,
        infotainment: carConfig.interior.infotainment as any,
        soundSystem: 'premium' as const,
        climate: 'dual-zone' as const,
        steering: 'power' as const,
        airbags: carConfig.safety.airbags,
        cruiseControl: 'adaptive' as const
      },
      safetySystem: {
        abs: carConfig.safety.abs,
        esp: true,
        traction: carConfig.safety.traction as any,
        brakingSystem: 'high-performance' as const,
        aseAssist: true,
        collisionDetection: true,
        parkingAssist: true,
        blindSpotDetection: true
      },
      visibility: {
        mirrors: 'auto-dimming' as const,
        rearviewMirror: 'digital' as const,
        windows: 'power' as const,
        wipers: 'auto-sense' as const
      },
      performance: carConfig.performance,
      efficiency: carConfig.efficiency,
      reliability: carConfig.reliability,
      comfort: carConfig.interior.comfort,
      safety: carConfig.safety.rating * 20,
      style: 80,
      marketAppeal: carConfig.marketAppeal,
      productionCost: carConfig.productionCost,
      createdAt: Date.now()
    }

    updateGameState({
      designs: [...(gameState.designs || []), newDesign],
      money: gameState.money - carConfig.productionCost
    })

    alert(`${projectName} saved successfully!`)
    onBack()
  }

  const tabs = [
    { id: 'engine', icon: '⚙️', label: 'Engine' },
    { id: 'chassis', icon: '🚗', label: 'Chassis' },
    { id: 'interior', icon: '🪑', label: 'Interior' },
    { id: 'exterior', icon: '✨', label: 'Exterior' },
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
        <h2 style={styles.title}>🚗 Car Designer - {subcategory}</h2>
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

      <div style={{...styles.tabBar, overflowX: 'auto' as const}}>
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
                  value={carConfig.engine.type}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, engine: { ...prev.engine, type: e.target.value } }))}
                  style={styles.input}
                >
                  <option>Inline-3</option>
                  <option>Inline-4</option>
                  <option>Inline-6</option>
                  <option>V6</option>
                  <option>V8</option>
                </select>
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Cylinders: {carConfig.engine.cylinders}</label>
                <input 
                  type="range" 
                  min="3" 
                  max="12" 
                  value={carConfig.engine.cylinders}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, engine: { ...prev.engine, cylinders: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Displacement (cc): {carConfig.engine.displacement}</label>
                <input 
                  type="range" 
                  min="1000" 
                  max="5000" 
                  step="100"
                  value={carConfig.engine.displacement}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, engine: { ...prev.engine, displacement: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Power (HP): {carConfig.engine.power}</label>
                <input 
                  type="range" 
                  min="80" 
                  max="600" 
                  step="10"
                  value={carConfig.engine.power}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, engine: { ...prev.engine, power: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Fuel Type</label>
                <select 
                  value={carConfig.engine.fuelType}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, engine: { ...prev.engine, fuelType: e.target.value } }))}
                  style={styles.input}
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'chassis' && (
          <div>
            <h3 style={styles.sectionTitle}>🚗 Chassis & Suspension</h3>
            <div style={styles.grid}>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Weight (kg): {carConfig.chassis.weight}</label>
                <input 
                  type="range" 
                  min="1000" 
                  max="2500" 
                  step="50"
                  value={carConfig.chassis.weight}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, chassis: { ...prev.chassis, weight: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Length (m): {carConfig.chassis.length.toFixed(1)}</label>
                <input 
                  type="range" 
                  min="4.0" 
                  max="6.0" 
                  step="0.1"
                  value={carConfig.chassis.length}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, chassis: { ...prev.chassis, length: parseFloat(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Suspension Type</label>
                <select 
                  value={carConfig.chassis.suspension}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, chassis: { ...prev.chassis, suspension: e.target.value } }))}
                  style={styles.input}
                >
                  <option>MacPherson</option>
                  <option>Double Wishbone</option>
                  <option>Independent</option>
                  <option>Multi-Link</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'interior' && (
          <div>
            <h3 style={styles.sectionTitle}>🪑 Interior</h3>
            <div style={styles.grid}>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Seats: {carConfig.interior.seats}</label>
                <input 
                  type="range" 
                  min="2" 
                  max="8" 
                  step="1"
                  value={carConfig.interior.seats}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, interior: { ...prev.interior, seats: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Material</label>
                <select 
                  value={carConfig.interior.material}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, interior: { ...prev.interior, material: e.target.value } }))}
                  style={styles.input}
                >
                  <option>Fabric</option>
                  <option>Leather</option>
                  <option>Premium Leather</option>
                  <option>Alcantara</option>
                </select>
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Comfort: {carConfig.interior.comfort}</label>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  step="5"
                  value={carConfig.interior.comfort}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, interior: { ...prev.interior, comfort: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Infotainment</label>
                <select 
                  value={carConfig.interior.infotainment}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, interior: { ...prev.interior, infotainment: e.target.value } }))}
                  style={styles.input}
                >
                  <option>Basic</option>
                  <option>Standard</option>
                  <option>Advanced</option>
                  <option>Premium</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'exterior' && (
          <div>
            <h3 style={styles.sectionTitle}>✨ Exterior Design</h3>
            <div style={styles.grid}>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Body Style: {carConfig.exterior.bodyStyle}</label>
                <select 
                  value={carConfig.exterior.bodyStyle}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, exterior: { ...prev.exterior, bodyStyle: e.target.value } }))}
                  style={styles.input}
                >
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Coupe</option>
                  <option>Hatchback</option>
                  <option>Wagon</option>
                  <option>Convertible</option>
                </select>
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Color</label>
                <input 
                  type="color" 
                  value={carConfig.exterior.color}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, exterior: { ...prev.exterior, color: e.target.value } }))}
                  style={styles.colorPicker}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Aerodynamics (Cd): {carConfig.exterior.aerodynamics.toFixed(2)}</label>
                <input 
                  type="range" 
                  min="0.20" 
                  max="0.50" 
                  step="0.01"
                  value={carConfig.exterior.aerodynamics}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, exterior: { ...prev.exterior, aerodynamics: parseFloat(e.target.value) } }))}
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
                <label style={styles.label}>Airbags: {carConfig.safety.airbags}</label>
                <input 
                  type="range" 
                  min="4" 
                  max="12" 
                  step="1"
                  value={carConfig.safety.airbags}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, safety: { ...prev.safety, airbags: parseInt(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>Safety Rating: {carConfig.safety.rating}</label>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  step="0.5"
                  value={carConfig.safety.rating}
                  onChange={(e) => setCarConfig(prev => ({ ...prev, safety: { ...prev.safety, rating: parseFloat(e.target.value) } }))}
                  style={styles.slider}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.label}>
                  <input 
                    type="checkbox" 
                    checked={carConfig.safety.abs}
                    onChange={(e) => setCarConfig(prev => ({ ...prev, safety: { ...prev.safety, abs: e.target.checked } }))}
                  /> ABS
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
                <div style={styles.statValue}>{carConfig.performance.toFixed(0)}/100</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statLabel}>Efficiency</div>
                <div style={styles.statValue}>{carConfig.efficiency.toFixed(0)}/100</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statLabel}>Reliability</div>
                <div style={styles.statValue}>{carConfig.reliability.toFixed(0)}/100</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statLabel}>Market Appeal</div>
                <div style={styles.statValue}>{carConfig.marketAppeal.toFixed(0)}/100</div>
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #FFC107' }}>
              <div style={{ fontSize: '13px', color: '#bbb' }}>Production Cost</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFC107' }}>${carConfig.productionCost.toLocaleString()}</div>
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
