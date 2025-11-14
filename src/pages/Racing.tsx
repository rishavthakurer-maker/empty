import React, { useState } from 'react'
import { GameState, RaceResult } from '../App'

export default function Racing({ t, onBack, gameState, updateGameState }: {
  t: (k: string) => string
  onBack: () => void
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
}) {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null)
  const [isRacing, setIsRacing] = useState(false)
  const [raceProgress, setRaceProgress] = useState(0)
  const [lastRaceResult, setLastRaceResult] = useState<RaceResult | null>(null)

  const selectedVehicle = gameState.vehicles.find(v => v.id === selectedVehicleId)
  const competitor = gameState.competitors.find(c => c.name === selectedCompetitor)

  const calculateVehicleScore = (vehicle: any) => {
    const design = vehicle.design
    return (
      design.performance * 0.4 +
      design.efficiency * 0.15 +
      design.safety * 0.1 +
      design.reliability * 0.2 +
      design.style * 0.15
    )
  }

  const startRace = () => {
    if (!selectedVehicle || !competitor) return

    setIsRacing(true)
    setRaceProgress(0)
    setLastRaceResult(null)

    // Simulate race progress
    const interval = setInterval(() => {
      setRaceProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          finishRace()
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const finishRace = () => {
    if (!selectedVehicle || !competitor) return

    const playerScore = calculateVehicleScore(selectedVehicle)
    const opponentScore = 70 + Math.random() * 25 // Competitor score 70-95
    const randomFactor = (Math.random() - 0.5) * 10 // +/- 5 points
    const finalPlayerScore = playerScore + randomFactor
    const winner = finalPlayerScore > opponentScore ? 'player' : 'opponent'
    const reputationChange = winner === 'player' ? 5 + Math.floor(Math.random() * 10) : -2

    const result: RaceResult = {
      id: Date.now().toString(),
      playerVehicle: selectedVehicle.name,
      opponentCompany: competitor.name,
      opponentVehicle: `${competitor.name} Model X`,
      playerScore: Math.round(finalPlayerScore),
      opponentScore: Math.round(opponentScore),
      winner,
      reputationGained: reputationChange,
      timestamp: Date.now()
    }

    updateGameState({
      raceHistory: [...gameState.raceHistory, result],
      reputation: Math.max(0, gameState.reputation + reputationChange),
      money: winner === 'player' ? gameState.money + 10000 : gameState.money - 2000,
      fans: winner === 'player' ? gameState.fans + 500 : gameState.fans
    })

    setLastRaceResult(result)
    setIsRacing(false)
  }

  const recentRaces = (gameState.raceHistory || []).slice(-5).reverse()

  return (
    <div className="card" style={{ minWidth: '700px', maxWidth: '900px' }}>
      <div className="header">
        <div className="title">🏁 Racing Championship</div>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">🏆 Races Won</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>
              {(gameState.raceHistory || []).filter(r => r.winner === 'player').length}
            </div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">📊 Total Races</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>
              {(gameState.raceHistory || []).length}
            </div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">⭐ Reputation</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>
              {gameState.reputation}
            </div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">📈 Win Rate</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>
              {(gameState.raceHistory || []).length > 0 
                ? Math.round(((gameState.raceHistory || []).filter(r => r.winner === 'player').length / (gameState.raceHistory || []).length) * 100) 
                : 0}%
            </div>
          </div>
        </div>

        {/* Last Race Result */}
        {lastRaceResult && (
          <div style={{ 
            background: lastRaceResult.winner === 'player' 
              ? 'rgba(0,200,0,0.2)' 
              : 'rgba(200,0,0,0.2)', 
            padding: 16, 
            borderRadius: 8, 
            marginBottom: 24,
            border: `2px solid ${lastRaceResult.winner === 'player' ? '#00cc00' : '#cc0000'}`
          }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: 12, textAlign: 'center' }}>
              {lastRaceResult.winner === 'player' ? '🏆 VICTORY!' : '❌ DEFEAT'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>You</div>
                <div className="small">{lastRaceResult.playerVehicle}</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: 8 }}>
                  {lastRaceResult.playerScore}
                </div>
              </div>
              <div style={{ fontSize: '24px' }}>VS</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{lastRaceResult.opponentCompany}</div>
                <div className="small">{lastRaceResult.opponentVehicle}</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: 8 }}>
                  {lastRaceResult.opponentScore}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              {lastRaceResult.winner === 'player' ? (
                <>
                  <div className="small">🎉 Rewards: +$10,000 • +{lastRaceResult.reputationGained} Reputation • +500 Fans</div>
                </>
              ) : (
                <div className="small">Lost: -$2,000 • {lastRaceResult.reputationGained} Reputation</div>
              )}
            </div>
          </div>
        )}

        {/* Race Setup */}
        {!isRacing && (
          <>
            <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Select Your Vehicle</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {gameState.vehicles.length === 0 ? (
                <div className="small" style={{ color: 'var(--muted)' }}>No vehicles available. Build one first!</div>
              ) : (
                gameState.vehicles.map(vehicle => (
                  <button
                    key={vehicle.id}
                    className={`btn ${selectedVehicleId === vehicle.id ? '' : 'secondary'}`}
                    onClick={() => setSelectedVehicleId(vehicle.id)}
                    style={{ textAlign: 'left', padding: '12px' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <div>{vehicle.name}</div>
                        <div className="small">Performance: {Math.round(vehicle.design.performance)} • Efficiency: {Math.round(vehicle.design.efficiency)}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="small">Score</div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{Math.round(calculateVehicleScore(vehicle))}</div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Select Opponent</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
              {(gameState.competitors || []).map(comp => (
                <button
                  key={comp.name}
                  className={`btn ${selectedCompetitor === comp.name ? '' : 'secondary'}`}
                  onClick={() => setSelectedCompetitor(comp.name)}
                  style={{ textAlign: 'left', padding: '12px' }}
                >
                  <div>{comp.name}</div>
                  <div className="small">Reputation: {Math.round(comp.reputation)} • Vehicles: {comp.vehicleCount}</div>
                </button>
              ))}
            </div>

            <button
              className="btn"
              onClick={startRace}
              disabled={!selectedVehicle || !selectedCompetitor}
              style={{ width: '100%', fontSize: '18px', padding: '16px', marginBottom: 16 }}
            >
              {selectedVehicle && selectedCompetitor ? '🏁 Start Race!' : '⚠️ Select Vehicle & Opponent'}
            </button>
          </>
        )}

        {/* Racing Animation */}
        {isRacing && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: 16 }}>
              🏁 RACING IN PROGRESS 🏁
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, height: '40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ 
                background: 'linear-gradient(90deg, #cc0000, #ff4444)',
                height: '100%',
                width: `${raceProgress}%`,
                transition: 'width 0.1s linear',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '10px',
                color: 'white',
                fontWeight: 'bold'
              }}>
                🏎️
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <div className="small">{Math.round(raceProgress)}% Complete</div>
            </div>
          </div>
        )}

        {/* Race History */}
        {recentRaces.length > 0 && (
          <div>
            <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Recent Races</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: '250px', overflowY: 'auto' }}>
              {recentRaces.map(race => (
                <div 
                  key={race.id} 
                  style={{ 
                    background: race.winner === 'player' ? 'rgba(0,200,0,0.1)' : 'rgba(200,0,0,0.1)', 
                    padding: 12, 
                    borderRadius: 8,
                    borderLeft: `4px solid ${race.winner === 'player' ? '#00cc00' : '#cc0000'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div className="small">
                        {race.winner === 'player' ? '🏆' : '❌'} vs {race.opponentCompany}
                      </div>
                      <div className="small" style={{ color: 'var(--muted)' }}>
                        {race.playerVehicle} • Score: {race.playerScore} vs {race.opponentScore}
                      </div>
                    </div>
                    <div className="small">
                      {race.winner === 'player' ? '+' : ''}{race.reputationGained} Rep
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="btn secondary" onClick={onBack} style={{ width: '100%', marginTop: 20 }}>
          ← Back to Menu
        </button>
      </div>
    </div>
  )
}
