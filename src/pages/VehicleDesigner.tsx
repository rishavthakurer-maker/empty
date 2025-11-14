import React, { useState } from 'react'
import { GameState } from '../App'
import VehicleSelection, { VehicleCategory, VehicleSubcategory } from './VehicleSelection'
import CarDesigner from './CarDesigner'
import BusDesigner from './BusDesigner'
import TruckDesigner from './TruckDesigner'

export default function VehicleDesigner({ t, onBack, gameState, updateGameState }: {
  t: (k: string) => string
  onBack: () => void
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
}) {
  const [mode, setMode] = useState<'list' | 'selection' | 'designer'>('list')
  const [selectedVehicle, setSelectedVehicle] = useState<{ category: VehicleCategory; subcategory: VehicleSubcategory } | null>(null)

  if (mode === 'selection') {
    return (
      <VehicleSelection 
        t={t} 
        onBack={() => setMode('list')} 
        gameState={gameState} 
        updateGameState={updateGameState}
        onSelectVehicle={(category, subcategory) => {
          setSelectedVehicle({ category, subcategory })
          setMode('designer')
        }}
      />
    )
  }

  if (mode === 'designer' && selectedVehicle) {
    if (selectedVehicle.category === 'car') {
      return <CarDesigner t={t} onBack={() => setMode('list')} gameState={gameState} updateGameState={updateGameState} subcategory={selectedVehicle.subcategory} />
    } else if (selectedVehicle.category === 'bus') {
      return <BusDesigner t={t} onBack={() => setMode('list')} gameState={gameState} updateGameState={updateGameState} subcategory={selectedVehicle.subcategory} />
    } else if (selectedVehicle.category === 'truck') {
      return <TruckDesigner t={t} onBack={() => setMode('list')} gameState={gameState} updateGameState={updateGameState} subcategory={selectedVehicle.subcategory} />
    }
  }

  return (
    <div style={{padding:20,color:'#fff',maxWidth:'1200px',margin:'0 auto',background:'linear-gradient(135deg, #1a3a52 0%, #0d2438 100%)',minHeight:'100vh'}}>
      <div style={{marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 style={{margin:0,fontSize:24}}>🚗 Vehicle Designer</h2>
        <button onClick={onBack} style={{padding:'8px 16px',background:'#666',border:'none',color:'#fff',borderRadius:4,cursor:'pointer'}}>← Back</button>
      </div>

      <button onClick={() => setMode('selection')} style={{padding:'12px 24px',background:'#4CAF50',border:'none',color:'#000',borderRadius:4,cursor:'pointer',fontWeight:'bold',fontSize:16,marginBottom:20,boxShadow:'0 4px 10px rgba(0,0,0,0.2)'}}>
        ➕ Create New Vehicle
      </button>

      <div>
        <h3>Saved Designs ({gameState.designs?.length || 0})</h3>
        {gameState.designs && gameState.designs.length > 0 ? (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:15}}>
            {gameState.designs.map(design => (
              <div key={design.id} style={{padding:15,background:'rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8}}>
                <div style={{fontWeight:'bold',marginBottom:10}}>{design.name}</div>
                <div style={{fontSize:12,marginBottom:8}}>Type: {design.type}</div>
                <div style={{fontSize:12,marginBottom:8}}>Performance: {design.performance}/100</div>
                <div style={{fontSize:12,marginBottom:8}}>Cost: ${design.productionCost.toLocaleString()}</div>
                <button onClick={() => updateGameState({designs: gameState.designs?.filter(d => d.id !== design.id) || []})} style={{width:'100%',padding:8,background:'#ff6b6b',border:'none',color:'#fff',borderRadius:4,cursor:'pointer',fontSize:12}}>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{color:'#aaa'}}>No designs saved yet. Create your first design!</p>
        )}
      </div>
    </div>
  )
}
