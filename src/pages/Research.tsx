import React, { useState } from 'react'
import { GameState, ResearchTech } from '../App'

const RESEARCH_TREE: ResearchTech[] = [
  { id: 'turbo', name: 'Turbocharging', category: 'engine', level: 1, cost: 10000, researched: false },
  { id: 'hybrid', name: 'Hybrid Technology', category: 'engine', level: 2, cost: 25000, researched: false },
  { id: 'electric', name: 'Electric Powerplant', category: 'engine', level: 3, cost: 50000, researched: false },
  { id: 'aero', name: 'Advanced Aerodynamics', category: 'aerodynamics', level: 1, cost: 15000, researched: false },
  { id: 'carbon', name: 'Carbon Fiber Chassis', category: 'aerodynamics', level: 2, cost: 35000, researched: false },
  { id: 'safety', name: 'Advanced Safety Systems', category: 'safety', level: 1, cost: 20000, researched: false },
  { id: 'auto_drive', name: 'Autonomous Driving', category: 'safety', level: 2, cost: 60000, researched: false },
  { id: 'luxury', name: 'Luxury Materials', category: 'comfort', level: 1, cost: 18000, researched: false },
  { id: 'efficiency', name: 'Fuel Efficiency', category: 'efficiency', level: 1, cost: 12000, researched: false },
]

export default function Research({ t, onBack, gameState, updateGameState }: {
  t: (k: string) => string
  onBack: () => void
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
}) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  const selectedResearch = RESEARCH_TREE.find(r => r.id === selectedTech)
  const researched = gameState.research.find(r => r.id === selectedTech)?.researched || false
  const canResearch = gameState.money >= (selectedResearch?.cost || 0) && !researched

  const handleResearch = () => {
    if (!selectedResearch || !canResearch) return

    const newResearch = gameState.research.filter(r => r.id !== selectedResearch.id)
    newResearch.push({ ...selectedResearch, researched: true })

    updateGameState({
      research: newResearch,
      money: gameState.money - selectedResearch.cost,
      reputation: gameState.reputation + 10
    })

    alert(`✅ Researched: ${selectedResearch.name}!`)
    setSelectedTech(null)
  }

  const categories = ['engine', 'aerodynamics', 'safety', 'comfort', 'efficiency'] as const

  return (
    <div className="card" style={{ minWidth: '500px' }}>
      <div className="header"><div className="title">🔬 {t('research')}</div></div>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">💰 Budget</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>${Math.floor(gameState.money)}</div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">📚 Researched</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>{gameState.research.filter(r => r.researched).length}</div>
          </div>
        </div>

        {categories.map(category => (
          <div key={category} style={{ marginBottom: 16 }}>
            <div className="small" style={{ fontWeight: 'bold', marginBottom: 8, textTransform: 'uppercase' }}>
              {category === 'engine' ? '⚙️' : category === 'aerodynamics' ? '💨' : category === 'safety' ? '🛡️' : category === 'comfort' ? '🪑' : '⚡'} {category}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {RESEARCH_TREE.filter(r => r.category === category).map(tech => {
                const isResearched = gameState.research.find(r => r.id === tech.id)?.researched
                return (
                  <button
                    key={tech.id}
                    className={`btn ${selectedTech === tech.id ? '' : 'secondary'} ${isResearched ? 'secondary' : ''}`}
                    onClick={() => setSelectedTech(tech.id)}
                    disabled={isResearched}
                    style={{ textAlign: 'left', padding: '10px', cursor: isResearched ? 'default' : 'pointer', opacity: isResearched ? 0.6 : 1 }}
                  >
                    <div>{isResearched ? '✅' : '🔒'} {tech.name}</div>
                    <div className="small">Cost: ${tech.cost}</div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {selectedTech && !researched && (
          <div style={{ background: 'rgba(139,0,0,0.15)', padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <div className="small" style={{ fontWeight: 'bold' }}>{selectedResearch?.name}</div>
            <div className="small">Category: {selectedResearch?.category}</div>
            <div className="small">Cost: ${selectedResearch?.cost}</div>
            <button
              className="btn"
              onClick={handleResearch}
              disabled={!canResearch}
              style={{ width: '100%', marginTop: 12 }}
            >
              🔬 {canResearch ? 'Research Now' : 'Insufficient Funds'}
            </button>
          </div>
        )}
      </div>

      <button className="btn secondary" onClick={onBack} style={{ width: '100%' }}>← Back to Menu</button>
    </div>
  )
}
