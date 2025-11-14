import React, { useState } from 'react'
import { GameState, MarketingCampaign } from '../App'

const CAMPAIGN_TYPES = [
  {
    type: 'social' as const,
    name: 'Social Media Campaign',
    icon: '📱',
    cost: 5000,
    duration: 7,
    demandBoost: 5,
    fansGained: 1000,
    description: 'Boost visibility on social media platforms'
  },
  {
    type: 'tv' as const,
    name: 'TV Advertising',
    icon: '📺',
    cost: 25000,
    duration: 14,
    demandBoost: 15,
    fansGained: 5000,
    description: 'Prime time television advertisements'
  },
  {
    type: 'billboard' as const,
    name: 'Billboard Campaign',
    icon: '🏙️',
    cost: 15000,
    duration: 30,
    demandBoost: 10,
    fansGained: 3000,
    description: 'Strategic billboard placements'
  },
  {
    type: 'sponsorship' as const,
    name: 'Sports Sponsorship',
    icon: '⚽',
    cost: 50000,
    duration: 90,
    demandBoost: 25,
    fansGained: 15000,
    description: 'Sponsor major sporting events'
  },
  {
    type: 'influencer' as const,
    name: 'Influencer Marketing',
    icon: '⭐',
    cost: 35000,
    duration: 21,
    demandBoost: 20,
    fansGained: 10000,
    description: 'Partner with popular influencers'
  }
]

const COUNTRIES = [
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  { code: 'eu', name: 'Europe', flag: '🇪🇺' },
  { code: 'asia', name: 'Asia', flag: '🌏' },
  { code: 'india', name: 'India', flag: '🇮🇳' },
  { code: 'brazil', name: 'Brazil', flag: '🇧🇷' },
]

export default function Marketing({ t, onBack, gameState, updateGameState }: {
  t: (k: string) => string
  onBack: () => void
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
}) {
  const [selectedCampaign, setSelectedCampaign] = useState<typeof CAMPAIGN_TYPES[0] | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string>('United States')

  const activeCampaigns = (gameState.marketingCampaigns || []).filter(c => c.active)
  const canAfford = selectedCampaign ? gameState.money >= selectedCampaign.cost : false

  const handleLaunch = () => {
    if (!selectedCampaign || !canAfford) return

    const newCampaign: MarketingCampaign = {
      id: Date.now().toString(),
      type: selectedCampaign.type,
      country: selectedCountry,
      cost: selectedCampaign.cost,
      duration: selectedCampaign.duration,
      demandBoost: selectedCampaign.demandBoost,
      fansGained: selectedCampaign.fansGained,
      startTime: Date.now(),
      active: true
    }

    // Update market demand
    const updatedDemands = gameState.marketDemands.map(md => 
      md.country === selectedCountry 
        ? { ...md, demand: Math.min(100, md.demand + selectedCampaign.demandBoost), trending: 'up' as const }
        : md
    )

    updateGameState({
      marketingCampaigns: [...gameState.marketingCampaigns, newCampaign],
      money: gameState.money - selectedCampaign.cost,
      fans: gameState.fans + selectedCampaign.fansGained,
      rating: Math.min(5, gameState.rating + 0.1),
      marketDemands: updatedDemands
    })

    alert(`✅ Launched ${selectedCampaign.name} in ${selectedCountry}!`)
    setSelectedCampaign(null)
  }

  return (
    <div className="card" style={{ minWidth: '600px', maxWidth: '800px' }}>
      <div className="header">
        <div className="title">📢 Marketing & Advertising</div>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">💰 Budget</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>
              ${Math.floor(gameState.money).toLocaleString()}
            </div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">👥 Fans</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>
              {gameState.fans.toLocaleString()}
            </div>
          </div>
          <div style={{ background: 'rgba(139,0,0,0.1)', padding: 12, borderRadius: 8 }}>
            <div className="small">⭐ Rating</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>
              {'★'.repeat(Math.floor(gameState.rating))}{'☆'.repeat(5 - Math.floor(gameState.rating))} ({gameState.rating.toFixed(1)})
            </div>
          </div>
        </div>

        {/* Active Campaigns */}
        {activeCampaigns.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Active Campaigns ({activeCampaigns.length})</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {activeCampaigns.map(campaign => {
                const campaignType = CAMPAIGN_TYPES.find(ct => ct.type === campaign.type)
                const daysRemaining = Math.max(0, campaign.duration - Math.floor((Date.now() - campaign.startTime) / (1000 * 60 * 60 * 24)))
                return (
                  <div key={campaign.id} style={{ background: 'rgba(139,0,0,0.15)', padding: 12, borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div>{campaignType?.icon} {campaignType?.name}</div>
                        <div className="small" style={{ color: 'var(--muted)' }}>{campaign.country}</div>
                      </div>
                      <div className="small">⏱️ {daysRemaining} days left</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Select Country */}
        <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Select Target Market</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 24 }}>
          {COUNTRIES.map(country => (
            <button
              key={country.code}
              className={`btn ${selectedCountry === country.name ? '' : 'secondary'}`}
              onClick={() => setSelectedCountry(country.name)}
              style={{ padding: '8px', fontSize: '12px' }}
            >
              <div>{country.flag}</div>
              <div className="small">{country.name}</div>
            </button>
          ))}
        </div>

        {/* Campaign Types */}
        <div className="small" style={{ fontWeight: 'bold', marginBottom: 12 }}>Select Campaign Type</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {CAMPAIGN_TYPES.map(campaign => (
            <div
              key={campaign.type}
              className={`btn ${selectedCampaign?.type === campaign.type ? '' : 'secondary'}`}
              onClick={() => setSelectedCampaign(campaign)}
              style={{ 
                textAlign: 'left', 
                padding: '16px', 
                cursor: 'pointer',
                opacity: gameState.money < campaign.cost ? 0.5 : 1
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '16px', marginBottom: 4 }}>
                    {campaign.icon} {campaign.name}
                  </div>
                  <div className="small" style={{ color: 'var(--muted)', marginBottom: 8 }}>
                    {campaign.description}
                  </div>
                  <div style={{ display: 'flex', gap: 16, fontSize: '12px' }}>
                    <span>💰 ${campaign.cost.toLocaleString()}</span>
                    <span>⏱️ {campaign.duration} days</span>
                    <span>📈 +{campaign.demandBoost}% demand</span>
                    <span>👥 +{campaign.fansGained.toLocaleString()} fans</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Launch Button */}
        {selectedCampaign && (
          <div style={{ background: 'rgba(139,0,0,0.2)', padding: 16, borderRadius: 8, marginBottom: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <div className="small" style={{ fontWeight: 'bold' }}>Campaign Summary</div>
              <div className="small">Target: {selectedCountry}</div>
              <div className="small">Duration: {selectedCampaign.duration} days</div>
              <div className="small">Total Cost: ${selectedCampaign.cost.toLocaleString()}</div>
              <div className="small">Expected Fans: +{selectedCampaign.fansGained.toLocaleString()}</div>
              <div className="small">Demand Boost: +{selectedCampaign.demandBoost}%</div>
            </div>
            <button
              className="btn"
              onClick={handleLaunch}
              disabled={!canAfford}
              style={{ width: '100%' }}
            >
              {canAfford ? '🚀 Launch Campaign' : '❌ Insufficient Funds'}
            </button>
          </div>
        )}

        <button className="btn secondary" onClick={onBack} style={{ width: '100%' }}>
          ← Back to Menu
        </button>
      </div>
    </div>
  )
}
