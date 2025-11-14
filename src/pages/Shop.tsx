import React, { useState, useEffect } from 'react'
import { GameState } from '../App'

interface ShopItem {
  id: string
  name: string
  description: string
  icon: string
  type: 'cash' | 'researchPoints' | 'premium'
  amount: number
  realPrice: string // Real money price for display
  premiumCost: number // Cost in premium currency (for non-IAP items)
}

const SHOP_ITEMS: ShopItem[] = [
  // Cash Bundles - Aggressive pricing for maximum appeal
  {
    id: 'cash_small',
    name: '🎁 $5,000,000',
    description: 'Massive cash boost!',
    icon: '💰',
    type: 'cash',
    amount: 5000000,
    realPrice: '$0.99',
    premiumCost: 10
  },
  {
    id: 'cash_medium',
    name: '🎁 $25,000,000',
    description: 'Epic bundle - 25% BONUS!',
    icon: '💰',
    type: 'cash',
    amount: 25000000,
    realPrice: '$2.99',
    premiumCost: 30
  },
  {
    id: 'cash_large',
    name: '🎁 $100,000,000',
    description: 'Legendary bundle - 50% BONUS!',
    icon: '💵',
    type: 'cash',
    amount: 100000000,
    realPrice: '$4.99',
    premiumCost: 50
  },
  {
    id: 'cash_mega',
    name: '🎁 $500,000,000',
    description: '⭐ BEST VALUE - 100% BONUS!',
    icon: '💸',
    type: 'cash',
    amount: 500000000,
    realPrice: '$9.99',
    premiumCost: 100
  },

  // Research Points Bundles
  {
    id: 'rp_small',
    name: '🔬 10,000 RP',
    description: 'Unlock tech fast!',
    icon: '🔬',
    type: 'researchPoints',
    amount: 10000,
    realPrice: '$0.99',
    premiumCost: 10
  },
  {
    id: 'rp_medium',
    name: '🔬 50,000 RP',
    description: '25% bonus included',
    icon: '🔬',
    type: 'researchPoints',
    amount: 50000,
    realPrice: '$2.99',
    premiumCost: 30
  },
  {
    id: 'rp_large',
    name: '🔬 250,000 RP',
    description: '⭐ Max research power!',
    icon: '🚀',
    type: 'researchPoints',
    amount: 250000,
    realPrice: '$4.99',
    premiumCost: 50
  },

  // Premium Currency Bundles
  {
    id: 'gems_small',
    name: '👑 500 Premium',
    description: 'Buy anything!',
    icon: '💎',
    type: 'premium',
    amount: 500,
    realPrice: '$0.99',
    premiumCost: 0
  },
  {
    id: 'gems_medium',
    name: '👑 3,000 Premium',
    description: '50% MORE VALUE',
    icon: '💎',
    type: 'premium',
    amount: 3000,
    realPrice: '$2.99',
    premiumCost: 0
  },
  {
    id: 'gems_large',
    name: '👑 10,000 Premium',
    description: '⭐ UNLIMITED POWER!',
    icon: '👑',
    type: 'premium',
    amount: 10000,
    realPrice: '$4.99',
    premiumCost: 0
  },
]

export default function Shop({ t, onBack, gameState, updateGameState }: {
  t: (k: string) => string
  onBack: () => void
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
}) {
  const [selectedTab, setSelectedTab] = useState<'cash' | 'research' | 'premium' | 'ads' | 'adfree'>('cash')
  const [purchaseMessage, setPurchaseMessage] = useState<string>('')
  const [adCooldown, setAdCooldown] = useState<number>(0)
  const isAdFree = gameState.adFree || false

  useEffect(() => {
    if (adCooldown > 0) {
      const timer = setTimeout(() => setAdCooldown(adCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [adCooldown])

  const handlePurchaseWithPremium = (item: ShopItem) => {
    if (gameState.premiumCurrency < item.premiumCost) {
      setPurchaseMessage('❌ Insufficient premium coins!')
      setTimeout(() => setPurchaseMessage(''), 3000)
      return
    }

    let updates: Partial<GameState> = {
      premiumCurrency: gameState.premiumCurrency - item.premiumCost
    }

    if (item.type === 'cash') {
      updates.money = gameState.money + item.amount
    } else if (item.type === 'researchPoints') {
      updates.researchPoints = gameState.researchPoints + item.amount
    }

    updateGameState(updates)
    setPurchaseMessage(`✅ Purchased ${item.name}!`)
    setTimeout(() => setPurchaseMessage(''), 3000)
  }

  const handleSimulatePurchaseWithRealMoney = (item: ShopItem) => {
    // In production, this would integrate with Google Play Billing Library
    // For now, simulate the purchase by adding premium currency
    let updates: Partial<GameState> = {}

    if (item.type === 'premium') {
      updates.premiumCurrency = gameState.premiumCurrency + item.amount
    } else if (item.type === 'cash') {
      updates.money = gameState.money + item.amount
      updates.premiumCurrency = gameState.premiumCurrency + 10 // Bonus coins for purchase
    } else if (item.type === 'researchPoints') {
      updates.researchPoints = gameState.researchPoints + item.amount
      updates.premiumCurrency = gameState.premiumCurrency + 5 // Bonus coins for purchase
    }

    updateGameState(updates)
    setPurchaseMessage(`✅ Thank you for your purchase! ${item.name}\n(Demo: Real transaction would occur here)`)
    setTimeout(() => setPurchaseMessage(''), 4000)
  }

  const handleWatchAd = (type: 'cash' | 'research') => {
    if (adCooldown > 0) {
      setPurchaseMessage(`⏳ Please wait ${adCooldown}s before watching another ad`)
      setTimeout(() => setPurchaseMessage(''), 2000)
      return
    }

    // Simulate ad watching (in production, integrate with AdMob or similar)
    setPurchaseMessage('📺 Watching ad...')
    
    setTimeout(() => {
      let updates: Partial<GameState> = {}
      
      if (type === 'cash') {
        updates.money = gameState.money + 5000 // Very small amount
      } else {
        updates.researchPoints = gameState.researchPoints + 50 // Very small amount
      }

      updateGameState(updates)
      setPurchaseMessage(`✅ Ad completed! Earned ${type === 'cash' ? '$5,000' : '50 RP'}`)
      setAdCooldown(30) // 30 second cooldown between ads
      setTimeout(() => setPurchaseMessage(''), 3000)
    }, 3000)
  }

  const handlePurchaseAdFree = () => {
    let updates: Partial<GameState> = {
      adFree: true,
      premiumCurrency: gameState.premiumCurrency + 500 // Bonus premium coins
    }
    updateGameState(updates)
    setPurchaseMessage('✅ Ad-Free activated! No more ads.\n+ 500 Premium Coins bonus!')
    setTimeout(() => setPurchaseMessage(''), 3000)
  }

  const filteredItems = SHOP_ITEMS.filter(item => {
    if (selectedTab === 'cash') return item.type === 'cash'
    if (selectedTab === 'research') return item.type === 'researchPoints'
    if (selectedTab === 'premium') return item.type === 'premium'
    return false
  })

  return (
    <div className="card" style={{ minWidth: '90vw', maxWidth: '100vw', maxHeight: '95vh', overflow: 'auto', padding: '0' }}>
      <div className="header" style={{ position: 'sticky', top: 0, zIndex: 10 }}><div className="title">🛍️ Shop</div></div>

      <div style={{ padding: '12px', overflow: 'auto', maxHeight: 'calc(95vh - 80px)' }}>
        {/* Premium Currency Display */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(218,165,32,0.2), rgba(255,215,0,0.2))', padding: 12, borderRadius: 8, border: '2px solid rgba(255,215,0,0.3)' }}>
            <div className="small">💰 Cash</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fbbf24' }}>${Math.floor(gameState.money / 1000000).toLocaleString()}M</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(139,69,19,0.2), rgba(184,134,11,0.2))', padding: 12, borderRadius: 8, border: '2px solid rgba(184,134,11,0.3)' }}>
            <div className="small">👑 Premium</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#a8860b' }}>{Math.floor(gameState.premiumCurrency)}</div>
          </div>
        </div>

        {/* Tab Navigation - Horizontal scroll on mobile */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: 6, marginBottom: 12 }}>
          <button
            onClick={() => setSelectedTab('cash')}
            className="btn"
            style={{
              background: selectedTab === 'cash' ? 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' : '#455A64',
              padding: '10px',
              fontSize: '11px',
              fontWeight: 'bold'
            }}
          >
            💰 Cash
          </button>
          <button
            onClick={() => setSelectedTab('research')}
            className="btn"
            style={{
              background: selectedTab === 'research' ? 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' : '#455A64',
              padding: '10px',
              fontSize: '11px',
              fontWeight: 'bold'
            }}
          >
            🔬 RP
          </button>
          <button
            onClick={() => setSelectedTab('premium')}
            className="btn"
            style={{
              background: selectedTab === 'premium' ? 'linear-gradient(135deg, #FFD700 0%, #DAA520 100%)' : '#455A64',
              padding: '10px',
              fontSize: '11px',
              fontWeight: 'bold'
            }}
          >
            👑 Prem
          </button>
          <button
            onClick={() => setSelectedTab('ads')}
            className="btn"
            style={{
              background: selectedTab === 'ads' ? 'linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%)' : '#455A64',
              padding: '10px',
              fontSize: '11px',
              fontWeight: 'bold'
            }}
          >
            📺 Ads
          </button>
          <button
            onClick={() => setSelectedTab('adfree')}
            className="btn"
            style={{
              background: selectedTab === 'adfree' ? 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)' : '#455A64',
              padding: '10px',
              fontSize: '11px',
              fontWeight: 'bold'
            }}
          >
            ✨ Ad-Free
          </button>
        </div>

        {/* Message Display */}
        {purchaseMessage && (
          <div style={{
            background: purchaseMessage.startsWith('✅') ? 'rgba(76,175,80,0.2)' : 'rgba(244,67,54,0.2)',
            border: purchaseMessage.startsWith('✅') ? '2px solid #4CAF50' : '2px solid #F44336',
            borderRadius: 8,
            padding: 8,
            marginBottom: 10,
            color: purchaseMessage.startsWith('✅') ? '#81c784' : purchaseMessage.startsWith('⏳') ? '#FFC107' : '#ef5350',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '12px',
            whiteSpace: 'pre-line'
          }}>
            {purchaseMessage}
          </div>
        )}

        {/* Ads Tab */}
        {selectedTab === 'ads' && !isAdFree && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {/* Watch Ad for Cash */}
              <div style={{
                background: 'rgba(255,107,107,0.1)',
                border: '2px solid rgba(255,107,107,0.3)',
                borderRadius: 10,
                padding: 10,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '32px', marginBottom: 4 }}>📺</div>
                  <div style={{ fontWeight: 'bold', marginBottom: 2, fontSize: '13px' }}>Watch Ad for Cash</div>
                  <div className="small" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8, fontSize: '11px' }}>
                    Earn $5,000
                  </div>
                </div>
                <button
                  onClick={() => handleWatchAd('cash')}
                  disabled={adCooldown > 0}
                  className="btn"
                  style={{
                    background: adCooldown > 0 ? 'rgba(128,128,128,0.3)' : 'linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%)',
                    padding: '8px 6px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: adCooldown > 0 ? '#666' : '#fff',
                    cursor: adCooldown > 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  {adCooldown > 0 ? `⏳ Wait ${adCooldown}s` : '▶️ Watch'}
                </button>
              </div>

              {/* Watch Ad for Research Points */}
              <div style={{
                background: 'rgba(76,175,80,0.1)',
                border: '2px solid rgba(76,175,80,0.3)',
                borderRadius: 10,
                padding: 10,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '32px', marginBottom: 4 }}>📺</div>
                  <div style={{ fontWeight: 'bold', marginBottom: 2, fontSize: '13px' }}>Watch Ad for RP</div>
                  <div className="small" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8, fontSize: '11px' }}>
                    Earn 50 RP
                  </div>
                </div>
                <button
                  onClick={() => handleWatchAd('research')}
                  disabled={adCooldown > 0}
                  className="btn"
                  style={{
                    background: adCooldown > 0 ? 'rgba(128,128,128,0.3)' : 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
                    padding: '8px 6px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: adCooldown > 0 ? '#666' : '#fff',
                    cursor: adCooldown > 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  {adCooldown > 0 ? `⏳ Wait ${adCooldown}s` : '▶️ Watch'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ad-Free Tab */}
        {selectedTab === 'adfree' && (
          <div style={{ marginBottom: 12 }}>
            {isAdFree ? (
              <div style={{
                background: 'rgba(156,39,176,0.2)',
                border: '2px solid rgba(156,39,176,0.5)',
                borderRadius: 10,
                padding: 16,
                textAlign: 'center',
                color: '#CE93D8'
              }}>
                <div style={{ fontSize: '40px', marginBottom: 8 }}>✨</div>
                <div style={{ fontWeight: 'bold', marginBottom: 8 }}>Ad-Free Active!</div>
                <div className="small">You have no ads. Enjoy unlimited gameplay!</div>
              </div>
            ) : (
              <div style={{
                background: 'rgba(156,39,176,0.1)',
                border: '2px solid rgba(156,39,176,0.3)',
                borderRadius: 10,
                padding: 12,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: 8 }}>✨</div>
                <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: '14px' }}>Remove All Ads</div>
                <div className="small" style={{ marginBottom: 12, color: 'rgba(255,255,255,0.8)' }}>
                  Get unlimited gameplay without any ads + 500 bonus premium coins!
                </div>
                <button
                  onClick={handlePurchaseAdFree}
                  className="btn"
                  style={{
                    background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
                    padding: '10px 16px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    width: '100%'
                  }}
                >
                  💳 $3.99 - Remove Ads Forever
                </button>
              </div>
            )}
          </div>
        )}

        {/* Shop Items Grid - for regular products */}
        {(selectedTab === 'cash' || selectedTab === 'research' || selectedTab === 'premium') && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 12 }}>
            {filteredItems.map(item => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(139,0,0,0.1)',
                  border: '2px solid rgba(139,0,0,0.3)',
                  borderRadius: 10,
                  padding: 10,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '32px', marginBottom: 4 }}>{item.icon}</div>
                  <div style={{ fontWeight: 'bold', marginBottom: 2, fontSize: '13px' }}>{item.name}</div>
                  <div className="small" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8, fontSize: '11px' }}>
                    {item.description}
                  </div>
                </div>

                {/* Purchase Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {/* Real Money Purchase Button */}
                  <button
                    onClick={() => handleSimulatePurchaseWithRealMoney(item)}
                    className="btn"
                    style={{
                      background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                      padding: '8px 6px',
                      fontSize: '11px',
                      fontWeight: 'bold'
                    }}
                  >
                    💳 {item.realPrice}
                  </button>

                  {/* Premium Currency Purchase Button */}
                  {item.premiumCost > 0 && (
                    <button
                      onClick={() => handlePurchaseWithPremium(item)}
                      disabled={gameState.premiumCurrency < item.premiumCost}
                      className="btn"
                      style={{
                        background: gameState.premiumCurrency >= item.premiumCost
                          ? 'linear-gradient(135deg, #FFD700 0%, #DAA520 100%)'
                          : 'rgba(128,128,128,0.3)',
                        padding: '8px 6px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: gameState.premiumCurrency >= item.premiumCost ? '#000' : '#666',
                        cursor: gameState.premiumCurrency >= item.premiumCost ? 'pointer' : 'not-allowed'
                      }}
                    >
                      👑 {item.premiumCost}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="btn secondary" onClick={onBack} style={{ width: '100%', padding: '12px', marginTop: '8px' }}>← Back</button>
    </div>
  )
}
