import React, { useState } from 'react'
import { GameState, SalesJob } from '../App'

const COUNTRIES = [
  { code: 'us', name: 'United States', priceMultiplier: 1.2, flag: '🇺🇸' },
  { code: 'eu', name: 'Europe', priceMultiplier: 1.1, flag: '🇪🇺' },
  { code: 'asia', name: 'Asia', priceMultiplier: 1.0, flag: '🌏' },
  { code: 'india', name: 'India', priceMultiplier: 0.8, flag: '🇮🇳' },
  { code: 'brazil', name: 'Brazil', priceMultiplier: 0.9, flag: '🇧🇷' },
]

export default function GlobalMarket({ t, onBack, gameState, updateGameState, timeSpeed }: {
  t: (k: string) => string
  onBack: () => void
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
  timeSpeed: number
}) {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null)
  const [sellQuantity, setSellQuantity] = useState(1)
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)

  const selectedCountry = COUNTRIES.find(c => c.name === selectedMarket)
  const selectedVehicle = gameState.vehicles.find(v => v.id === selectedVehicleId)
  const marketDemand = gameState.marketDemands.find(md => md.country === selectedMarket)
  
  const availableStock = selectedVehicle ? selectedVehicle.produced - selectedVehicle.sold : 0
  const salePrice = selectedVehicle && selectedCountry 
    ? Math.round(selectedVehicle.price * selectedCountry.priceMultiplier)
    : 0
  const totalRevenue = salePrice * sellQuantity

  // Calculate selling time based on demand (higher demand = faster sales)
  const getSellingTime = (demand: number) => {
    const baseTime = 20 // 20 seconds base
    const demandMultiplier = 2 - (demand / 100) // High demand reduces time
    return baseTime * demandMultiplier
  }

  // Apply market event multipliers
  const getEffectiveMultiplier = () => {
    const activeEvent = gameState.marketEvents.find(e => e.active)
    return activeEvent ? activeEvent.multiplier : 1
  }

  const handleStartSale = () => {
    if (!selectedVehicle || !selectedCountry || !marketDemand || availableStock < sellQuantity) return

    const sellingTimePerUnit = getSellingTime(marketDemand.demand)
    const eventMultiplier = getEffectiveMultiplier()
    const adjustedRevenue = Math.round(totalRevenue * eventMultiplier)

    const salesJob: SalesJob = {
      id: Date.now().toString(),
      vehicleId: selectedVehicle.id,
      country: selectedCountry.name,
      quantity: sellQuantity,
      progress: 0,
      timePerUnit: sellingTimePerUnit,
      startTime: Date.now(),
      completed: false,
      revenue: adjustedRevenue
    }

    updateGameState({
      salesJobs: [...gameState.salesJobs, salesJob]
    })

    alert(`✅ Started selling ${sellQuantity} units to ${selectedCountry.name}!`)
    setSellQuantity(1)
  }

  const handleCollectSales = (jobId: string) => {
    const job = gameState.salesJobs.find(j => j.id === jobId)
    if (!job || !job.completed) return

    const updatedVehicles = gameState.vehicles.map(v => 
      v.id === job.vehicleId 
        ? { ...v, sold: v.sold + job.quantity }
        : v
    )

    const newSales = { ...gameState.sales }
    newSales[job.country] = (newSales[job.country] || 0) + job.quantity

    const updatedJobs = gameState.salesJobs.filter(j => j.id !== jobId)

    updateGameState({
      vehicles: updatedVehicles,
      salesJobs: updatedJobs,
      money: gameState.money + job.revenue,
      sales: newSales,
      reputation: gameState.reputation + Math.round(job.quantity / 10),
      fans: gameState.fans + Math.round(job.quantity * 50)
    })

    alert(`✅ Collected $${job.revenue.toLocaleString()} from sales!`)
  }

  const activeSales = (gameState.salesJobs || []).filter(j => !j.completed)
  const completedSales = (gameState.salesJobs || []).filter(j => j.completed)
  const activeEvent = (gameState.marketEvents || []).find(e => e.active)

  return (
    <div className="card" style={{ minWidth: '700px', maxWidth: '900px' }}>
      <div className="header"><div className="title">🌍 {t('global_market')}</div></div>

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">💰 Balance</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>${Math.floor(gameState.money).toLocaleString()}</div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">⭐ Reputation</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>{gameState.reputation}</div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">🚀 Active Sales</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>{activeSales.length}</div>
          </div>
        </div>

        {/* Market Event Alert */}
        {activeEvent && (
          <div style={{ 
            background: activeEvent.effect === 'positive' ? 'rgba(0,200,0,0.2)' : 'rgba(200,0,0,0.2)', 
            padding: 12, 
            borderRadius: 8, 
            marginBottom: 16,
            border: `2px solid ${activeEvent.effect === 'positive' ? '#00cc00' : '#cc0000'}`
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
              {activeEvent.effect === 'positive' ? '📈' : '📉'} Market Event: {activeEvent.type.toUpperCase()}
            </div>
            <div className="small">{activeEvent.description}</div>
            <div className="small">Price Multiplier: ×{activeEvent.multiplier} • Duration: {activeEvent.duration} days</div>
          </div>
        )}

        {/* Active Sales */}
        {activeSales.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>💼 Sales in Progress</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {activeSales.map(job => {
                const vehicle = gameState.vehicles.find(v => v.id === job.vehicleId)
                const totalTime = job.quantity * job.timePerUnit
                const estimatedCompletion = Math.max(0, (totalTime - (Date.now() - job.startTime) / 1000) / timeSpeed)
                
                return (
                  <div key={job.id} style={{ background: 'rgba(139,0,0,0.15)', padding: 12, borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{vehicle?.name} → {job.country}</div>
                        <div className="small">Selling {job.quantity} units • Revenue: ${job.revenue.toLocaleString()}</div>
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
                        background: 'linear-gradient(90deg, #00aa00, #00ff00)',
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

        {/* Completed Sales */}
        {completedSales.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>✅ Sales Complete</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {completedSales.map(job => {
                const vehicle = gameState.vehicles.find(v => v.id === job.vehicleId)
                return (
                  <div key={job.id} style={{ background: 'rgba(0,200,0,0.2)', padding: 12, borderRadius: 8, border: '2px solid rgba(0,200,0,0.4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{vehicle?.name} → {job.country}</div>
                        <div className="small">Sold {job.quantity} units • Revenue: ${job.revenue.toLocaleString()}</div>
                      </div>
                      <button 
                        className="btn" 
                        onClick={() => handleCollectSales(job.id)}
                        style={{ padding: '8px 16px', fontSize: '14px' }}
                      >
                        💰 Collect
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Select Market</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 16 }}>
          {COUNTRIES.map(country => {
            const demand = gameState.marketDemands.find(md => md.country === country.name)
            return (
              <button
                key={country.code}
                className={`btn ${selectedMarket === country.name ? '' : 'secondary'}`}
                onClick={() => setSelectedMarket(country.name)}
                style={{ padding: '10px', cursor: 'pointer', textAlign: 'center' }}
              >
                <div style={{ fontSize: '20px' }}>{country.flag}</div>
                <div className="small">{country.name}</div>
                {demand && (
                  <div className="small">
                    📊 {demand.demand}%
                    {demand.trending === 'up' && ' 📈'}
                    {demand.trending === 'down' && ' 📉'}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {selectedMarket && marketDemand && (
          <div style={{ background: 'rgba(139,0,0,0.15)', padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <div className="small" style={{ fontWeight: 'bold', marginBottom: 8 }}>Market Info: {selectedMarket}</div>
            <div className="small">Demand Level: {marketDemand.demand}% {marketDemand.trending === 'up' ? '📈' : marketDemand.trending === 'down' ? '📉' : '➡️'}</div>
            <div className="small">Price Multiplier: ×{selectedCountry?.priceMultiplier}</div>
            <div className="small">Selling Speed: {marketDemand.demand > 70 ? 'Fast ⚡' : marketDemand.demand > 40 ? 'Medium ⏱️' : 'Slow 🐌'}</div>
          </div>
        )}

        {selectedMarket && (
          <>
            <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Select Vehicle to Sell</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {gameState.vehicles.filter(v => v.produced > v.sold).length === 0 ? (
                <div className="small" style={{ color: 'var(--muted)' }}>No vehicles in stock.</div>
              ) : (
                gameState.vehicles
                  .filter(v => v.produced > v.sold)
                  .map(v => (
                    <button
                      key={v.id}
                      className={`btn ${selectedVehicleId === v.id ? '' : 'secondary'}`}
                      onClick={() => setSelectedVehicleId(v.id)}
                      style={{ textAlign: 'left', padding: '10px', cursor: 'pointer' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div>{v.name}</div>
                          <div className="small">Stock: {v.produced - v.sold} units</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div className="small">Base Price</div>
                          <div style={{ fontWeight: 'bold' }}>${v.price.toLocaleString()}</div>
                        </div>
                      </div>
                    </button>
                  ))
              )}
            </div>

            {selectedVehicle && (
              <div style={{ background: 'rgba(139,0,0,0.2)', padding: 12, borderRadius: 8, marginBottom: 16 }}>
                <div className="small" style={{ fontWeight: 'bold', marginBottom: 8 }}>Sale Order</div>
                <div className="small">Quantity: {sellQuantity}</div>
                <input 
                  type="range" 
                  min={1} 
                  max={Math.min(availableStock, 50)} 
                  value={sellQuantity} 
                  onChange={e => setSellQuantity(Number(e.target.value))} 
                  style={{ width: '100%', marginBottom: 8 }} 
                />
                <div className="small">Sale price: ${salePrice.toLocaleString()} per unit</div>
                <div className="small">Selling time: ~{Math.round(getSellingTime(marketDemand?.demand || 50) * sellQuantity / timeSpeed)}s</div>
                {activeEvent && <div className="small">Event bonus: ×{activeEvent.multiplier}</div>}
                <div className="small" style={{ fontWeight: 'bold', color: 'var(--white)', marginTop: 8 }}>
                  Total Revenue: ${totalRevenue.toLocaleString()}
                </div>
                <button
                  className="btn"
                  onClick={handleStartSale}
                  disabled={availableStock < sellQuantity}
                  style={{ width: '100%', marginTop: 12 }}
                >
                  {availableStock >= sellQuantity ? `🚀 Start Selling ${sellQuantity} Units` : '❌ Insufficient Stock'}
                </button>
              </div>
            )}
          </>
        )}

        <button className="btn secondary" onClick={onBack} style={{ width: '100%' }}>← Back to Menu</button>
      </div>
    </div>
  )
}
