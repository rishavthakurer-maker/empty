import React, { useState } from 'react'
import { GameState } from '../App'

const COUNTRIES = [
  { code: 'us', name: 'United States', demand: 'high', priceMultiplier: 1.2, flag: '🇺🇸' },
  { code: 'eu', name: 'Europe', demand: 'high', priceMultiplier: 1.1, flag: '🇪🇺' },
  { code: 'asia', name: 'Asia', demand: 'medium', priceMultiplier: 1.0, flag: '🌏' },
  { code: 'india', name: 'India', demand: 'high', priceMultiplier: 0.8, flag: '🇮🇳' },
  { code: 'brazil', name: 'Brazil', demand: 'medium', priceMultiplier: 0.9, flag: '🇧🇷' },
]

export default function GlobalMarket({ t, onBack, gameState, updateGameState }: {
  t: (k: string) => string
  onBack: () => void
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
}) {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null)
  const [sellQuantity, setSellQuantity] = useState(1)
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)

  const selectedCountry = COUNTRIES.find(c => c.code === selectedMarket)
  const selectedVehicle = gameState.vehicles.find(v => v.id === selectedVehicleId)
  
  const availableStock = selectedVehicle ? selectedVehicle.produced - selectedVehicle.sold : 0
  const salePrice = selectedVehicle && selectedCountry 
    ? Math.round(selectedVehicle.price * selectedCountry.priceMultiplier)
    : 0
  const totalRevenue = salePrice * sellQuantity

  const handleSell = () => {
    if (!selectedVehicle || !selectedCountry || availableStock < sellQuantity) return

    const newVehicles = gameState.vehicles.map(v => 
      v.id === selectedVehicleId 
        ? { ...v, sold: v.sold + sellQuantity }
        : v
    )

    const newSales = { ...gameState.sales }
    newSales[selectedCountry.name] = (newSales[selectedCountry.name] || 0) + sellQuantity

    updateGameState({
      vehicles: newVehicles,
      money: gameState.money + totalRevenue,
      sales: newSales,
      reputation: gameState.reputation + Math.round(sellQuantity / 10)
    })

    alert(`✅ Sold ${sellQuantity} units to ${selectedCountry.name} for $${totalRevenue}!`)
    setSellQuantity(1)
  }

  return (
    <div className="card" style={{ minWidth: '500px' }}>
      <div className="header"><div className="title">🌍 {t('global_market')}</div></div>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">💰 Balance</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>${Math.floor(gameState.money)}</div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">⭐ Reputation</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>{gameState.reputation}</div>
          </div>
        </div>

        <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Select Market</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {COUNTRIES.map(country => (
            <button
              key={country.code}
              className={`btn ${selectedMarket === country.code ? '' : 'secondary'}`}
              onClick={() => setSelectedMarket(country.code)}
              style={{ textAlign: 'left', padding: '12px', cursor: 'pointer' }}
            >
              <div>{country.flag} {country.name} (Demand: {country.demand})</div>
              <div className="small">Price Multiplier: {country.priceMultiplier}x</div>
            </button>
          ))}
        </div>

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
                      <div>{v.name}</div>
                      <div className="small">Stock: {v.produced - v.sold} • Base Price: ${v.price}</div>
                    </button>
                  ))
              )}
            </div>
          </>
        )}

        {selectedVehicle && selectedCountry && availableStock > 0 && (
          <div style={{ background: 'rgba(139,0,0,0.15)', padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <div className="small" style={{ fontWeight: 'bold', marginBottom: 8 }}>Sale Order</div>
            <div className="small">Available Stock: {availableStock}</div>
            <div className="small">Quantity: {sellQuantity}</div>
            <input 
              type="range" 
              min={1} 
              max={availableStock} 
              value={sellQuantity} 
              onChange={e => setSellQuantity(Number(e.target.value))} 
              style={{ width: '100%', marginBottom: 8 }} 
            />
            <div className="small">Price per unit: ${salePrice}</div>
            <div className="small" style={{ fontWeight: 'bold', color: 'var(--white)', marginTop: 8 }}>Total Revenue: ${totalRevenue}</div>
            <button
              className="btn"
              onClick={handleSell}
              style={{ width: '100%', marginTop: 12 }}
            >
              🛒 Sell {sellQuantity} Units
            </button>
          </div>
        )}

        <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Sales by Country</div>
        <div style={{ background: 'rgba(139,0,0,0.05)', padding: 12, borderRadius: 8, marginBottom: 16, maxHeight: '150px', overflowY: 'auto' }}>
          {Object.keys(gameState.sales).length === 0 ? (
            <div className="small" style={{ color: 'var(--muted)' }}>No sales yet.</div>
          ) : (
            Object.entries(gameState.sales).map(([country, units]) => (
              <div key={country} className="small">📊 {country}: <strong>{units} units</strong></div>
            ))
          )}
        </div>
      </div>

      <button className="btn secondary" onClick={onBack} style={{ width: '100%' }}>← Back to Menu</button>
    </div>
  )
}
