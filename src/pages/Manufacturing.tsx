import React, { useState } from 'react'
import { GameState, Vehicle } from '../App'

export default function Manufacturing({ t, onBack, gameState, updateGameState }: {
  t: (k: string) => string
  onBack: () => void
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
}) {
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(10)

  const selectedDesign = gameState.designs.find(d => d.id === selectedDesignId)
  const totalCost = selectedDesign ? selectedDesign.productionCost * quantity : 0
  const canProduce = gameState.money >= totalCost && selectedDesign

  const handleProduce = () => {
    if (!selectedDesign) return
    
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      name: `${selectedDesign.name} (Batch ${gameState.vehicles.length + 1})`,
      type: selectedDesign.type,
      design: selectedDesign,
      produced: quantity,
      sold: 0,
      price: 20000 + Math.round(selectedDesign.marketAppeal * 500)
    }

    updateGameState({
      vehicles: [...gameState.vehicles, newVehicle],
      money: gameState.money - totalCost,
      employees: gameState.employees + Math.ceil(quantity / 10)
    })

    alert(`✅ Produced ${quantity} units of ${selectedDesign.name}!`)
    setSelectedDesignId(null)
    setQuantity(10)
  }

  return (
    <div className="card" style={{ minWidth: '500px' }}>
      <div className="header"><div className="title">🏭 {t('manufacturing')}</div></div>
      
      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">💰 Balance</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--white)' }}>${Math.floor(gameState.money)}</div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">🏗️ Employees</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--white)' }}>{gameState.employees}</div>
          </div>
        </div>

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
                <div className="small">Cost: ${design.productionCost}/unit • Appeal: {Math.round(design.marketAppeal)}%</div>
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
            <div className="small" style={{ fontWeight: 'bold', color: 'var(--white)', marginTop: 8 }}>Total Cost: ${totalCost}</div>
            <button
              className="btn"
              onClick={handleProduce}
              disabled={!canProduce}
              style={{ width: '100%', marginTop: 12 }}
            >
              🏭 Produce {quantity} Units
            </button>
          </div>
        )}

        <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Inventory ({gameState.vehicles.length})</div>
        <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: 16 }}>
          {gameState.vehicles.length === 0 ? (
            <div className="small" style={{ color: 'var(--muted)' }}>No vehicles produced yet.</div>
          ) : (
            gameState.vehicles.map(v => (
              <div key={v.id} style={{ background: 'rgba(139,0,0,0.1)', padding: 8, borderRadius: 6, marginBottom: 6 }}>
                <div className="small"><strong>{v.name}</strong></div>
                <div className="small">In Stock: {v.produced - v.sold} • Price: ${v.price}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <button className="btn secondary" onClick={onBack} style={{ width: '100%' }}>← Back to Menu</button>
    </div>
  )
}
