import React from 'react'
import { GameState } from '../App'

export default function Dashboard({ t, onBack, gameState }: {
  t: (k: string) => string
  onBack: () => void
  gameState: GameState
}) {
  const totalRevenue = Object.values(gameState.sales).reduce((a: number, b: number) => a + b, 0) as number || 0
  const avgQuality = gameState.vehicles.length > 0 
    ? Math.round(gameState.vehicles.reduce((sum, v) => sum + v.design.marketAppeal, 0) / gameState.vehicles.length)
    : 0

  return (
    <div className="card" style={{ minWidth: '500px' }}>
      <div className="header"><div className="title">📊 {t('dashboard')}</div></div>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">💰 Cash</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--white)' }}>${Math.floor(gameState.money)}</div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">👥 Employees</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--white)' }}>{gameState.employees}</div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">⭐ Reputation</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--white)' }}>{gameState.reputation}</div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">📦 Designs</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--white)' }}>{gameState.designs.length}</div>
          </div>
          <div style={{ background: 'rgba(0,150,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">🔬 Research Points</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4ade80' }}>{Math.floor(gameState.researchPoints)}</div>
          </div>
          <div style={{ background: 'rgba(218,165,32,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">👑 Premium Coins</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>{Math.floor(gameState.premiumCurrency)}</div>
          </div>
        </div>

        <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Production Summary</div>
        <div style={{ background: 'rgba(139,0,0,0.05)', padding: 12, borderRadius: 8, marginBottom: 16 }}>
          <div className="small">Vehicles Designed: <strong>{gameState.designs.length}</strong></div>
          <div className="small">Vehicles Produced: <strong>{gameState.vehicles.reduce((sum, v) => sum + v.produced, 0)}</strong></div>
          <div className="small">Vehicles Sold: <strong>{gameState.vehicles.reduce((sum, v) => sum + v.sold, 0)}</strong></div>
          <div className="small">Total Revenue: <strong>${totalRevenue * 20000}</strong></div>
        </div>

        <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Vehicle Types Produced</div>
        <div style={{ background: 'rgba(139,0,0,0.05)', padding: 12, borderRadius: 8, marginBottom: 16 }}>
          {['car', 'bus', 'truck'].map(type => {
            const count = gameState.vehicles.filter(v => v.type === type).reduce((sum, v) => sum + v.produced, 0)
            return (
              <div key={type} className="small">
                {type === 'car' ? '🚗' : type === 'bus' ? '🚌' : '🚚'} {type.toUpperCase()}: <strong>{count}</strong>
              </div>
            )
          })}
        </div>

        <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Research Progress</div>
        <div style={{ background: 'rgba(139,0,0,0.05)', padding: 12, borderRadius: 8, marginBottom: 16 }}>
          <div className="small">Technologies Researched: <strong>{gameState.research.filter(r => r.researched).length}</strong></div>
          {gameState.research.filter(r => r.researched).length > 0 && (
            <div style={{ marginTop: 8 }}>
              {gameState.research.filter(r => r.researched).map(r => (
                <div key={r.id} className="small">✅ {r.name}</div>
              ))}
            </div>
          )}
        </div>

        <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Sales by Region</div>
        <div style={{ background: 'rgba(139,0,0,0.05)', padding: 12, borderRadius: 8, marginBottom: 16, maxHeight: '150px', overflowY: 'auto' }}>
          {Object.keys(gameState.sales).length === 0 ? (
            <div className="small">No sales yet.</div>
          ) : (
            Object.entries(gameState.sales).map(([region, units]) => (
              <div key={region} className="small">{region}: <strong>{units} units</strong></div>
            ))
          )}
        </div>
      </div>

      <button className="btn secondary" onClick={onBack} style={{ width: '100%' }}>← Back to Menu</button>
    </div>
  )
}
