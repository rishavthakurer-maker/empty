import React, { useState } from 'react'
import { GameState, Vehicle, ProductionJob } from '../App'

export default function Manufacturing({ t, onBack, gameState, updateGameState, timeSpeed }: {
  t: (k: string) => string
  onBack: () => void
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
  timeSpeed: number
}) {
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(10)

  const selectedDesign = gameState.designs.find(d => d.id === selectedDesignId)
  const totalCost = selectedDesign ? selectedDesign.productionCost * quantity : 0
  const canProduce = gameState.money >= totalCost && selectedDesign

  // Calculate production time based on vehicle type and complexity
  const getProductionTime = (design: any) => {
    const baseTime = {
      car: 2,      // 2 seconds per car
      bus: 4,      // 4 seconds per bus
      truck: 3     // 3 seconds per truck
    }
    const complexityMultiplier = 1 + (design.productionCost / 100000)
    const finalTime = baseTime[design.type as keyof typeof baseTime] * complexityMultiplier
    // Ensure time is between 2-5 seconds per unit
    return Math.max(2, Math.min(5, finalTime))
  }

  const handleProduce = () => {
    if (!selectedDesign || !canProduce) return
    
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      name: `${selectedDesign.name} (Batch ${gameState.vehicles.length + 1})`,
      type: selectedDesign.type,
      design: selectedDesign,
      produced: 0, // Start at 0, will be updated when production completes
      sold: 0,
      price: 20000 + Math.round(selectedDesign.marketAppeal * 500)
    }

    const productionJob: ProductionJob = {
      id: Date.now().toString(),
      vehicleId: newVehicle.id,
      designId: selectedDesign.id,
      quantity: quantity,
      progress: 0,
      timePerUnit: getProductionTime(selectedDesign),
      startTime: Date.now(),
      completed: false
    }

    updateGameState({
      vehicles: [...gameState.vehicles, newVehicle],
      productionJobs: [...gameState.productionJobs, productionJob],
      money: gameState.money - totalCost,
      employees: gameState.employees + Math.ceil(quantity / 10)
    })

    alert(`✅ Started production of ${quantity} units of ${selectedDesign.name}!`)
    setSelectedDesignId(null)
    setQuantity(10)
  }

  const handleCollectProduction = (jobId: string) => {
    const job = gameState.productionJobs.find(j => j.id === jobId)
    if (!job || !job.completed) return

    const updatedVehicles = gameState.vehicles.map(v => 
      v.id === job.vehicleId ? { ...v, produced: job.quantity } : v
    )

    const updatedJobs = gameState.productionJobs.filter(j => j.id !== jobId)
    
    // Award research points based on quantity produced
    // Base: 0.5 points per unit, bonus for batch size
    const basePoints = job.quantity * 0.5
    const batchBonus = job.quantity >= 50 ? job.quantity * 0.1 : 0
    const totalResearchPoints = basePoints + batchBonus

    updateGameState({
      vehicles: updatedVehicles,
      productionJobs: updatedJobs,
      researchPoints: gameState.researchPoints + totalResearchPoints
    })

    alert(`✅ Collected ${job.quantity} completed vehicles!\n🔬 Earned ${totalResearchPoints.toFixed(1)} research points!`)
  }

  const activeJobs = (gameState.productionJobs || []).filter(j => !j.completed)
  const completedJobs = (gameState.productionJobs || []).filter(j => j.completed)

  return (
    <div className="card" style={{ minWidth: '600px', maxWidth: '800px' }}>
      <div className="header"><div className="title">🏭 {t('manufacturing')}</div></div>
      
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">💰 Balance</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>${Math.floor(gameState.money).toLocaleString()}</div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">🏗️ Employees</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>{gameState.employees}</div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">⚙️ Active Jobs</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>{activeJobs.length}</div>
          </div>
          <div style={{ background: 'rgba(0,150,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">🔬 Research Points</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4ade80' }}>{Math.floor(gameState.researchPoints)}</div>
          </div>
        </div>

        {/* Active Production Jobs */}
        {activeJobs.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>🔧 Production in Progress</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {activeJobs.map(job => {
                const design = gameState.designs.find(d => d.id === job.designId)
                const totalTime = job.quantity * job.timePerUnit
                const estimatedCompletion = Math.max(0, (totalTime - (Date.now() - job.startTime) / 1000) / timeSpeed)
                
                return (
                  <div key={job.id} style={{ background: 'rgba(139,0,0,0.15)', padding: 12, borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{design?.name}</div>
                        <div className="small">Quantity: {job.quantity} units</div>
                      </div>
                      <div className="small" style={{ textAlign: 'right' }}>
                        {Math.round(job.progress)}%
                      </div>
                    </div>
                    <div style={{ 
                      background: 'rgba(0,0,0,0.3)', 
                      borderRadius: '4px', 
                      height: '20px', 
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{ 
                        background: 'linear-gradient(90deg, #cc0000, #ff4444)',
                        height: '100%',
                        width: `${job.progress}%`,
                        transition: 'width 0.5s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {job.progress > 10 && `${Math.round(job.progress)}%`}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Completed Jobs */}
        {completedJobs.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>✅ Production Complete</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {completedJobs.map(job => {
                const design = gameState.designs.find(d => d.id === job.designId)
                return (
                  <div key={job.id} style={{ background: 'rgba(0,200,0,0.2)', padding: 12, borderRadius: 8, border: '2px solid rgba(0,200,0,0.4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{design?.name}</div>
                        <div className="small">{job.quantity} units ready!</div>
                      </div>
                      <button 
                        className="btn" 
                        onClick={() => handleCollectProduction(job.id)}
                        style={{ padding: '8px 16px', fontSize: '14px' }}
                      >
                        📦 Collect
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Available Designs</div>
        {gameState.designs.length === 0 ? (
          <div className="small" style={{ color: 'var(--muted)' }}>No designs yet. Create one first!</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {gameState.designs.map(design => (
              <div
                key={design.id}
                className={`btn ${selectedDesignId === design.id ? '' : 'secondary'}`}
                onClick={() => setSelectedDesignId(design.id)}
                style={{ textAlign: 'left', padding: '12px', cursor: 'pointer' }}
              >
                <div>{design.name} ({design.type})</div>
                <div className="small">Cost: ${design.productionCost}/unit • Time: {Math.round(getProductionTime(design))}s/unit • Appeal: {Math.round(design.marketAppeal)}%</div>
              </div>
            ))}
          </div>
        )}

        {selectedDesign && (
          <div style={{ background: 'rgba(139,0,0,0.15)', padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <div className="small" style={{ fontWeight: 'bold', marginBottom: 8 }}>Production Order</div>
            <div className="small">Quantity: {quantity}</div>
            <input type="range" min={1} max={100} value={quantity} onChange={e => setQuantity(Number(e.target.value))} style={{ width: '100%', marginBottom: 8 }} />
            <div className="small">Cost per unit: ${selectedDesign.productionCost}</div>
            <div className="small">Time per unit: {Math.round(getProductionTime(selectedDesign))} seconds</div>
            <div className="small">Total time: {Math.round(getProductionTime(selectedDesign) * quantity / timeSpeed)} seconds</div>
            <div className="small" style={{ fontWeight: 'bold', color: 'var(--white)', marginTop: 8 }}>Total Cost: ${totalCost.toLocaleString()}</div>
            <button
              className="btn"
              onClick={handleProduce}
              disabled={!canProduce}
              style={{ width: '100%', marginTop: 12 }}
            >
              🏭 Start Production ({quantity} Units)
            </button>
          </div>
        )}

        <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Inventory ({gameState.vehicles.filter(v => v.produced > 0).length})</div>
        <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: 16 }}>
          {gameState.vehicles.filter(v => v.produced > 0).length === 0 ? (
            <div className="small" style={{ color: 'var(--muted)' }}>No vehicles in inventory yet.</div>
          ) : (
            gameState.vehicles.filter(v => v.produced > 0).map(v => (
              <div key={v.id} style={{ background: 'rgba(139,0,0,0.1)', padding: 8, borderRadius: 6, marginBottom: 6 }}>
                <div className="small"><strong>{v.name}</strong></div>
                <div className="small">In Stock: {v.produced - v.sold} / {v.produced} • Price: ${v.price}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <button className="btn secondary" onClick={onBack} style={{ width: '100%' }}>← Back to Menu</button>
    </div>
  )
}
