import React, { useState } from 'react'
import { GameState } from '../App'

export type VehicleCategory = 'car' | 'bus' | 'truck'
export type VehicleSubcategory = 
  // Cars
  | 'sedan' | 'suv' | 'coupe' | 'hatchback' | 'wagon' | 'convertible'
  // Buses
  | 'minibus' | 'coach' | 'double-decker' | 'articulated' | 'electric-bus' | 'luxury-bus'
  // Trucks
  | 'pickup' | 'cargo' | 'dump' | 'tanker' | 'flatbed' | 'refrigerated'

interface VehicleType {
  id: VehicleSubcategory
  name: string
  description: string
  emoji: string
  seats?: number
  payload?: string
  specifications: string[]
}

const VEHICLE_CATEGORIES: Record<VehicleCategory, {
  name: string
  emoji: string
  description: string
  subcategories: VehicleType[]
}> = {
  car: {
    name: 'Cars',
    emoji: '🚗',
    description: 'Personal and commercial passenger vehicles',
    subcategories: [
      {
        id: 'sedan',
        name: 'Sedan',
        description: 'Classic 4-door passenger car',
        emoji: '🚙',
        seats: 5,
        specifications: ['Perfect balance of comfort & performance', 'Fuel efficient', 'Family-friendly', 'High market demand']
      },
      {
        id: 'suv',
        name: 'SUV',
        description: 'Sport Utility Vehicle with high ground clearance',
        emoji: '🚐',
        seats: 7,
        specifications: ['Off-road capability', 'Spacious interior', 'Premium pricing', 'Growing demand']
      },
      {
        id: 'coupe',
        name: 'Coupe',
        description: 'High-performance 2-door sports car',
        emoji: '🏎️',
        seats: 2,
        specifications: ['Extreme performance', 'Lightweight design', 'High price point', 'Luxury niche market']
      },
      {
        id: 'hatchback',
        name: 'Hatchback',
        description: 'Compact car with fold-down rear seats',
        emoji: '🚗',
        seats: 5,
        specifications: ['Excellent fuel economy', 'Lower production cost', 'Urban-friendly', 'Budget market appeal']
      },
      {
        id: 'wagon',
        name: 'Wagon',
        description: 'Extended cargo area with passenger seating',
        emoji: '🚘',
        seats: 5,
        payload: '2.5 tons',
        specifications: ['Maximum cargo space', 'Family-oriented', 'Practical design', 'Stable demand']
      },
      {
        id: 'convertible',
        name: 'Convertible',
        description: 'Open-top luxury vehicle',
        emoji: '🏎️',
        seats: 4,
        specifications: ['Premium luxury segment', 'High performance', 'Exclusive appeal', 'Premium pricing']
      }
    ]
  },
  bus: {
    name: 'Buses',
    emoji: '🚌',
    description: 'Public and commercial transportation vehicles',
    subcategories: [
      {
        id: 'minibus',
        name: 'Minibus',
        description: 'Small shuttle vehicle for 8-15 passengers',
        emoji: '🚐',
        seats: 12,
        specifications: ['Economical operation', 'Easy maneuverability', 'Airport/hotel transfers', 'Low maintenance']
      },
      {
        id: 'coach',
        name: 'Coach',
        description: 'Long-distance luxury bus for 40-50 passengers',
        emoji: '🚌',
        seats: 45,
        specifications: ['Long-distance comfort', 'Premium amenities', 'High revenue potential', 'Tourism market']
      },
      {
        id: 'double-decker',
        name: 'Double-Decker',
        description: 'Two-story bus with 60+ passenger capacity',
        emoji: '🚌',
        seats: 70,
        specifications: ['Maximum capacity', 'Iconic design', 'Urban transit demand', 'High revenue per route']
      },
      {
        id: 'articulated',
        name: 'Articulated Bus',
        description: 'Bendy bus with 80-100 passenger capacity',
        emoji: '🚌',
        seats: 90,
        specifications: ['Highest capacity', 'Complex engineering', 'Premium pricing', 'Major city transit']
      },
      {
        id: 'electric-bus',
        name: 'Electric Bus',
        description: 'Zero-emission electric bus for modern transit',
        emoji: '🔋',
        seats: 50,
        specifications: ['Eco-friendly', 'Lower operating costs', 'Government incentives', 'Future market growth']
      },
      {
        id: 'luxury-bus',
        name: 'Luxury Bus',
        description: 'Premium executive coach with VIP amenities',
        emoji: '✨',
        seats: 30,
        specifications: ['Ultra-premium interior', 'Executive segment', 'High margins', 'Exclusive clientele']
      }
    ]
  },
  truck: {
    name: 'Trucks',
    emoji: '🚚',
    description: 'Cargo and freight transportation vehicles',
    subcategories: [
      {
        id: 'pickup',
        name: 'Pickup Truck',
        description: 'Light-duty truck with open cargo bed',
        emoji: '🚙',
        payload: '1.5 tons',
        specifications: ['Versatile usage', 'Off-road capable', 'Easy customization', 'Popular in developing markets']
      },
      {
        id: 'cargo',
        name: 'Cargo Truck',
        description: 'Medium-duty closed-box truck',
        emoji: '🚚',
        payload: '5 tons',
        specifications: ['Weather protection', 'Efficient transport', 'Urban delivery', 'Steady demand']
      },
      {
        id: 'dump',
        name: 'Dump Truck',
        description: 'Heavy-duty truck with hydraulic dump bed',
        emoji: '⛏️',
        payload: '20 tons',
        specifications: ['Construction industry', 'High payload', 'Premium pricing', 'Specialized market']
      },
      {
        id: 'tanker',
        name: 'Tanker Truck',
        description: 'Specialized for liquid transport',
        emoji: '🛢️',
        payload: '25 tons',
        specifications: ['High specialization', 'Complex safety systems', 'Premium pricing', 'Industrial demand']
      },
      {
        id: 'flatbed',
        name: 'Flatbed Truck',
        description: 'Open platform for oversize cargo',
        emoji: '📦',
        payload: '18 tons',
        specifications: ['Maximum flexibility', 'Heavy construction', 'Industrial strength', 'Niche market leader']
      },
      {
        id: 'refrigerated',
        name: 'Refrigerated Truck',
        description: 'Temperature-controlled cargo transport',
        emoji: '❄️',
        payload: '8 tons',
        specifications: ['Food industry', 'Complex cooling system', 'Premium pricing', 'Consistent demand']
      }
    ]
  }
}

export default function VehicleSelection({ 
  t, 
  onBack, 
  gameState, 
  updateGameState,
  onSelectVehicle
}: {
  t: (k: string) => string
  onBack: () => void
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
  onSelectVehicle: (category: VehicleCategory, subcategory: VehicleSubcategory) => void
}) {
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | null>(null)

  const styles = {
    container: {
      padding: '20px',
      color: '#fff',
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #1a3a52 0%, #0d2438 100%)',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    } as React.CSSProperties,
    header: {
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    } as React.CSSProperties,
    title: {
      margin: 0,
      fontSize: '28px',
      fontWeight: 'bold'
    } as React.CSSProperties,
    backBtn: {
      padding: '8px 16px',
      background: '#666',
      border: 'none',
      color: '#fff',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    } as React.CSSProperties,
    categoryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '40px'
    } as React.CSSProperties,
    categoryCard: {
      padding: '20px',
      background: 'rgba(76, 175, 80, 0.2)',
      border: '2px solid #4CAF50',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center' as const
    } as React.CSSProperties,
    categoryCardHover: {
      background: 'rgba(76, 175, 80, 0.4)',
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(76, 175, 80, 0.3)'
    } as React.CSSProperties,
    categoryEmoji: {
      fontSize: '48px',
      marginBottom: '10px'
    } as React.CSSProperties,
    categoryName: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '8px'
    } as React.CSSProperties,
    categoryDesc: {
      fontSize: '12px',
      color: '#bbb'
    } as React.CSSProperties,
    subcategorySection: {
      marginBottom: '40px'
    } as React.CSSProperties,
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    } as React.CSSProperties,
    backToCategories: {
      padding: '8px 16px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: '#fff',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      marginBottom: '20px'
    } as React.CSSProperties,
    subcategoryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px'
    } as React.CSSProperties,
    vehicleCard: {
      padding: '20px',
      background: 'rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    } as React.CSSProperties,
    vehicleCardHover: {
      background: 'rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)'
    } as React.CSSProperties,
    vehicleEmoji: {
      fontSize: '40px',
      marginBottom: '10px',
      display: 'block'
    } as React.CSSProperties,
    vehicleName: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px'
    } as React.CSSProperties,
    vehicleDesc: {
      fontSize: '12px',
      color: '#bbb',
      marginBottom: '12px',
      minHeight: '32px'
    } as React.CSSProperties,
    specs: {
      fontSize: '11px',
      color: '#999',
      marginBottom: '12px'
    } as React.CSSProperties,
    specItem: {
      margin: '4px 0',
      paddingLeft: '8px',
      borderLeft: '2px solid #4CAF50'
    } as React.CSSProperties,
    selectBtn: {
      width: '100%',
      padding: '10px',
      background: '#4CAF50',
      border: 'none',
      color: '#000',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '14px',
      transition: 'all 0.2s ease'
    } as React.CSSProperties,
    selectBtnHover: {
      background: '#45a049'
    } as React.CSSProperties
  }

  if (selectedCategory) {
    const category = VEHICLE_CATEGORIES[selectedCategory]
    
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            {category.emoji} {category.name}
          </h2>
          <button onClick={onBack} style={styles.backBtn}>← Back</button>
        </div>

        <button 
          onClick={() => setSelectedCategory(null)}
          style={styles.backToCategories}
        >
          ← Back to Categories
        </button>

        <p style={{fontSize: '14px', color: '#ccc', marginBottom: '30px'}}>
          {category.description}
        </p>

        <div style={styles.subcategoryGrid}>
          {category.subcategories.map(vehicle => (
            <div 
              key={vehicle.id}
              style={styles.vehicleCard}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.vehicleCardHover)
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, {
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(0)',
                  boxShadow: 'none'
                })
              }}
            >
              <span style={styles.vehicleEmoji}>{vehicle.emoji}</span>
              <div style={styles.vehicleName}>{vehicle.name}</div>
              <div style={styles.vehicleDesc}>{vehicle.description}</div>
              
              <div style={styles.specs}>
                {vehicle.seats && <div style={styles.specItem}>👥 {vehicle.seats} Seats</div>}
                {vehicle.payload && <div style={styles.specItem}>📦 {vehicle.payload} Payload</div>}
              </div>

              <div style={{fontSize: '11px', color: '#888', marginBottom: '12px'}}>
                {vehicle.specifications.map((spec, i) => (
                  <div key={i} style={styles.specItem}>
                    ✓ {spec}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onSelectVehicle(selectedCategory, vehicle.id)}
                style={styles.selectBtn}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, styles.selectBtnHover)
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#4CAF50'
                }}
              >
                Select {vehicle.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Show category selection
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🚗 Select Vehicle Category</h2>
        <button onClick={onBack} style={styles.backBtn}>← Back</button>
      </div>

      <p style={{fontSize: '16px', color: '#ccc', marginBottom: '30px'}}>
        Choose the type of vehicle you want to design and manufacture:
      </p>

      <div style={styles.categoryGrid}>
        {(Object.keys(VEHICLE_CATEGORIES) as VehicleCategory[]).map(category => {
          const cat = VEHICLE_CATEGORIES[category]
          return (
            <div 
              key={category}
              style={styles.categoryCard}
              onClick={() => setSelectedCategory(category)}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.categoryCardHover)
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, {
                  background: 'rgba(76, 175, 80, 0.2)',
                  transform: 'translateY(0)',
                  boxShadow: 'none'
                })
              }}
            >
              <div style={styles.categoryEmoji}>{cat.emoji}</div>
              <div style={styles.categoryName}>{cat.name}</div>
              <div style={styles.categoryDesc}>{cat.description}</div>
              <div style={{marginTop: '12px', fontSize: '12px', color: '#9ccc65'}}>
                {cat.subcategories.length} types available →
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
