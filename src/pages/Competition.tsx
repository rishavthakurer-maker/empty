import React from 'react'
import { GameState } from '../App'

const COMPETITORS = [
  { name: 'Tesla Motors', marketShare: 25, reputation: 95, vehicles: 12 },
  { name: 'BMW Group', marketShare: 20, reputation: 85, vehicles: 18 },
  { name: 'Toyota Inc', marketShare: 30, reputation: 90, vehicles: 25 },
  { name: 'Your Company', marketShare: 0, reputation: 0, vehicles: 0 },
]

export default function Competition({ t, onBack, gameState }: {
  t: (k: string) => string
  onBack: () => void
  gameState: GameState
}) {
  const yourData = COMPETITORS[3]
  yourData.reputation = gameState.reputation
  yourData.vehicles = gameState.vehicles.length
  yourData.marketShare = Math.round((gameState.sales && Object.values(gameState.sales).reduce((a: number, b: number) => a + b, 0) || 0) / 10)

  const totalSales = COMPETITORS.reduce((sum, c) => sum + c.vehicles, 0) || 1
  yourData.marketShare = Math.round((yourData.vehicles / totalSales) * 100)

  return (
    <div className="card" style={{ minWidth: '500px' }}>
      <div className="header"><div className="title">🏆 {t('competition')}</div></div>

      <div style={{ marginTop: 16 }}>
        <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Global Rankings</div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {COMPETITORS.sort((a, b) => b.reputation - a.reputation).map((comp, idx) => (
            <div key={comp.name} style={{ background: comp.name === 'Your Company' ? 'rgba(139,0,0,0.2)' : 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8, border: comp.name === 'Your Company' ? '2px solid var(--accent)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{idx + 1}. {comp.name}</div>
                  <div className="small">Reputation: {comp.reputation} • Vehicles: {comp.vehicles} • Market: {comp.marketShare}%</div>
                </div>
                <div style={{ fontSize: '24px' }}>
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '⭐'}
                </div>
              </div>
              <div style={{ marginTop: 6, background: 'rgba(0,0,0,0.3)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ background: 'var(--accent)', height: '100%', width: `${comp.reputation}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {yourData.vehicles === 0 && (
          <div style={{ marginTop: 16, background: 'rgba(139,0,0,0.15)', padding: 12, borderRadius: 8 }}>
            <div className="small">🚀 <strong>Get Started!</strong></div>
            <div className="small">Design and produce your first vehicle to enter the competition.</div>
          </div>
        )}

        {yourData.vehicles > 0 && (
          <div style={{ marginTop: 16, background: 'rgba(139,0,0,0.15)', padding: 12, borderRadius: 8 }}>
            <div className="small">💪 <strong>You're Competing!</strong></div>
            <div className="small">Keep producing quality vehicles and increase your market share.</div>
            {yourData.reputation >= 80 && <div className="small">⭐ You've reached elite status! Keep innovating!</div>}
          </div>
        )}
      </div>

      <button className="btn secondary" onClick={onBack} style={{ width: '100%', marginTop: 16 }}>← Back to Menu</button>
    </div>
  )
}
