import React, { useState } from 'react'

interface Part {
  id: string
  name: string
  category: string
  image: string
  x: number
  y: number
  width: number
  height: number
}

interface VisualVehicleBuilderProps {
  onPartSelect?: (part: Part) => void
  onChange?: (parts: Part[]) => void
}

const AVAILABLE_PARTS = {
  // engine removed from draggable parts — engine will be configured elsewhere
  // transmission not exposed as draggable in side-view designer
  wheels: [
    { id: 'wheel-sport', name: 'Sport Wheel 18"', category: 'wheels', width: 70, height: 70 },
    { id: 'wheel-luxury', name: 'Luxury Wheel 20"', category: 'wheels', width: 80, height: 80 },
    { id: 'wheel-offroad', name: 'Off-Road Wheel', category: 'wheels', width: 75, height: 75 }
  ],
  bumper: [
    { id: 'bumper-sport', name: 'Sport Bumper', category: 'bumper', width: 200, height: 40 },
    { id: 'bumper-luxury', name: 'Luxury Bumper', category: 'bumper', width: 200, height: 45 },
    { id: 'bumper-racing', name: 'Racing Bumper', category: 'bumper', width: 200, height: 50 }
  ],
  mirrors: [
    { id: 'mirror-manual', name: 'Manual Mirror', category: 'mirrors', width: 35, height: 40 },
    { id: 'mirror-power', name: 'Power Mirror', category: 'mirrors', width: 38, height: 42 },
    { id: 'mirror-autodim', name: 'Auto-Dimming Mirror', category: 'mirrors', width: 40, height: 45 }
  ],
  lights: [
    { id: 'light-halogen', name: 'Halogen Light', category: 'lights', width: 50, height: 35 },
    { id: 'light-led', name: 'LED Light', category: 'lights', width: 50, height: 30 },
    { id: 'light-laser', name: 'Laser Light', category: 'lights', width: 50, height: 32 }
  ],
  suspension: [
    { id: 'suspension-spring', name: 'Spring Suspension', category: 'suspension', width: 45, height: 60 },
    { id: 'suspension-air', name: 'Air Suspension', category: 'suspension', width: 50, height: 65 },
    { id: 'suspension-adaptive', name: 'Adaptive Suspension', category: 'suspension', width: 55, height: 70 }
  ]
}

const SVG_PARTS = {
  'engine-v6': `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="60" height="40" fill="#333" stroke="#FFD700" stroke-width="2"/><circle cx="40" cy="35" r="4" fill="#FF6B6B"/><circle cx="50" cy="35" r="4" fill="#FF6B6B"/><circle cx="60" cy="35" r="4" fill="#FF6B6B"/><text x="50" y="70" text-anchor="middle" fill="#666" font-size="10">V6</text></svg>`,
  'engine-v8': `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="15" width="70" height="50" fill="#444" stroke="#FFD700" stroke-width="2"/><circle cx="35" cy="30" r="4" fill="#FF6B6B"/><circle cx="45" cy="30" r="4" fill="#FF6B6B"/><circle cx="55" cy="30" r="4" fill="#FF6B6B"/><circle cx="65" cy="30" r="4" fill="#FF6B6B"/><circle cx="35" cy="50" r="4" fill="#FF6B6B"/><circle cx="45" cy="50" r="4" fill="#FF6B6B"/><circle cx="55" cy="50" r="4" fill="#FF6B6B"/><circle cx="65" cy="50" r="4" fill="#FF6B6B"/><text x="50" y="75" text-anchor="middle" fill="#666" font-size="10">V8</text></svg>`,
  'engine-electric': `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="40" r="25" fill="#00AA44" stroke="#0077CC" stroke-width="2"/><path d="M50 20 L50 10 M50 70 L50 60" stroke="#0077CC" stroke-width="2"/><text x="50" y="50" text-anchor="middle" fill="white" font-size="8" font-weight="bold">E</text><text x="50" y="75" text-anchor="middle" fill="#666" font-size="10">Electric</text></svg>`,
  'trans-manual': `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="25" width="60" height="30" fill="#555" stroke="#AAA" stroke-width="2"/><circle cx="35" cy="40" r="5" fill="#666"/><circle cx="50" cy="40" r="5" fill="#666"/><circle cx="65" cy="40" r="5" fill="#666"/><text x="50" y="75" text-anchor="middle" fill="#666" font-size="10">Manual</text></svg>`,
  'trans-auto': `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="20" width="64" height="40" fill="#666" stroke="#BBB" stroke-width="2"/><rect x="25" y="30" width="15" height="20" fill="#4dabf7" stroke="#0099FF" stroke-width="1"/><rect x="45" y="30" width="15" height="20" fill="#4dabf7" stroke="#0099FF" stroke-width="1"/><rect x="65" y="30" width="10" height="20" fill="#4dabf7" stroke="#0099FF" stroke-width="1"/><text x="50" y="75" text-anchor="middle" fill="#666" font-size="10">Auto</text></svg>`,
  'trans-cvt': `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"><ellipse cx="35" cy="40" rx="15" ry="25" fill="#555" stroke="#999" stroke-width="2"/><ellipse cx="65" cy="40" rx="15" ry="25" fill="#555" stroke="#999" stroke-width="2"/><path d="M50 20 Q52 40 50 60" stroke="#AAA" stroke-width="3"/><text x="50" y="75" text-anchor="middle" fill="#666" font-size="10">CVT</text></svg>`,
  'wheel-sport': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#222" stroke="#333" stroke-width="2"/><circle cx="50" cy="50" r="35" fill="#111" stroke="#555" stroke-width="2"/><circle cx="50" cy="50" r="25" fill="#333" stroke="#666" stroke-width="1"/><circle cx="50" cy="50" r="10" fill="#444"/><text x="50" y="95" text-anchor="middle" fill="#666" font-size="9">Sport</text></svg>`,
  'wheel-luxury': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#333" stroke="#999" stroke-width="2"/><circle cx="50" cy="50" r="38" fill="#222" stroke="#CCC" stroke-width="1"/><circle cx="50" cy="50" r="28" fill="#444"/><circle cx="50" cy="50" r="18" fill="#555" stroke="#999" stroke-width="1"/><circle cx="50" cy="50" r="8" fill="#777"/><text x="50" y="95" text-anchor="middle" fill="#666" font-size="9">Luxury</text></svg>`,
  'wheel-offroad': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#333" stroke="#666" stroke-width="2"/><circle cx="50" cy="50" r="38" fill="#222"/><path d="M30 50 L70 50 M50 30 L50 70 M35 35 L65 65 M65 35 L35 65" stroke="#666" stroke-width="1"/><circle cx="50" cy="50" r="12" fill="#444"/><text x="50" y="95" text-anchor="middle" fill="#666" font-size="9">Off-Road</text></svg>`,
  'bumper-sport': `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="15" width="180" height="30" fill="#111" stroke="#666" stroke-width="2" rx="3"/><rect x="30" y="20" width="25" height="20" fill="#0099FF" stroke="#0077CC" stroke-width="1"/><rect x="65" y="20" width="25" height="20" fill="#0099FF" stroke="#0077CC" stroke-width="1"/><rect x="145" y="20" width="25" height="20" fill="#0099FF" stroke="#0077CC" stroke-width="1"/><rect x="180" y="20" width="15" height="20" fill="#0099FF" stroke="#0077CC" stroke-width="1"/><text x="100" y="58" text-anchor="middle" fill="#666" font-size="9">Sport</text></svg>`,
  'bumper-luxury': `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg"><path d="M10 30 Q10 15 25 15 L175 15 Q190 15 190 30 L190 45 Q190 55 175 55 L25 55 Q10 55 10 45 Z" fill="#222" stroke="#999" stroke-width="2"/><rect x="35" y="20" width="30" height="25" fill="#4dabf7" stroke="#0099FF" stroke-width="1" rx="2"/><rect x="75" y="20" width="30" height="25" fill="#4dabf7" stroke="#0099FF" stroke-width="1" rx="2"/><rect x="135" y="20" width="30" height="25" fill="#4dabf7" stroke="#0099FF" stroke-width="1" rx="2"/><text x="100" y="58" text-anchor="middle" fill="#666" font-size="9">Luxury</text></svg>`,
  'bumper-racing': `<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg"><polygon points="10,30 15,15 185,15 190,30 190,50 10,50" fill="#000" stroke="#FF6B6B" stroke-width="2"/><polygon points="30,25 40,18 60,18 70,25" fill="#FF6B6B" stroke="#DD0000" stroke-width="1"/><polygon points="85,25 95,18 105,18 115,25" fill="#FF6B6B" stroke="#DD0000" stroke-width="1"/><polygon points="140,25 150,18 160,18 170,25" fill="#FF6B6B" stroke="#DD0000" stroke-width="1"/><text x="100" y="58" text-anchor="middle" fill="#FF6B6B" font-size="9">Racing</text></svg>`,
  'mirror-manual': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="10" width="44" height="50" fill="#CCC" stroke="#666" stroke-width="1" rx="2"/><polygon points="5,65 55,65 52,80 8,80" fill="#333" stroke="#555" stroke-width="1"/><text x="30" y="75" text-anchor="middle" fill="white" font-size="7">Manual</text></svg>`,
  'mirror-power': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="8" width="48" height="52" fill="#DDD" stroke="#666" stroke-width="1.5" rx="2"/><circle cx="30" cy="65" r="4" fill="#0099FF" stroke="#0077CC" stroke-width="1"/><text x="30" y="77" text-anchor="middle" fill="#333" font-size="7">Power</text></svg>`,
  'mirror-autodim': `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="6" width="50" height="54" fill="#AAA" stroke="#333" stroke-width="2" rx="3"/><circle cx="30" cy="35" r="20" fill="#4dabf7" stroke="#0099FF" stroke-width="1"/><circle cx="30" cy="35" r="15" fill="#1a5f99"/><text x="30" y="77" text-anchor="middle" fill="#333" font-size="7">AutoDim</text></svg>`,
  'light-halogen': `<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg"><ellipse cx="40" cy="30" rx="28" ry="20" fill="#FFD700" stroke="#FFA500" stroke-width="2"/><ellipse cx="40" cy="30" rx="20" ry="14" fill="#FFA500"/><path d="M15 15 L8 5 M65 15 L72 5" stroke="#666" stroke-width="2"/><text x="40" y="58" text-anchor="middle" fill="#666" font-size="8">Halogen</text></svg>`,
  'light-led': `<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg"><ellipse cx="40" cy="30" rx="28" ry="20" fill="#FFFFFF" stroke="#00BBFF" stroke-width="2"/><ellipse cx="40" cy="30" rx="20" ry="14" fill="#00DDFF" filter="url(#glow)"/><path d="M15 15 L8 5 M65 15 L72 5" stroke="#0099FF" stroke-width="2"/><text x="40" y="58" text-anchor="middle" fill="#666" font-size="8">LED</text></svg>`,
  'light-laser': `<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg"><ellipse cx="40" cy="30" rx="28" ry="20" fill="#00FF00" stroke="#00AA00" stroke-width="2" opacity="0.9"/><ellipse cx="40" cy="30" rx="20" ry="14" fill="#00FF44" opacity="0.8"/><path d="M35 10 L40 2 L45 10" fill="#00DD00"/><line x1="40" y1="2" x2="40" y2="8" stroke="#00FF00" stroke-width="1"/><text x="40" y="58" text-anchor="middle" fill="#00AA00" font-size="8">Laser</text></svg>`,
  'suspension-spring': `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg"><line x1="40" y1="10" x2="40" y2="30" stroke="#666" stroke-width="2"/><path d="M35 30 Q35 40 40 45 Q45 40 40 50 Q35 55 40 60 Q45 55 40 65 Q35 70 40 75" stroke="#999" stroke-width="3" fill="none"/><line x1="40" y1="75" x2="40" y2="95" stroke="#666" stroke-width="2"/><circle cx="40" cy="10" r="3" fill="#333"/><circle cx="40" cy="95" r="3" fill="#333"/><text x="40" y="98" text-anchor="middle" fill="#666" font-size="8">Spring</text></svg>`,
  'suspension-air': `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg"><line x1="40" y1="10" x2="40" y2="25" stroke="#666" stroke-width="2"/><rect x="25" y="25" width="30" height="40" fill="#4dabf7" stroke="#0099FF" stroke-width="2" rx="3"/><circle cx="32" cy="35" r="2.5" fill="#00BBFF"/><circle cx="48" cy="35" r="2.5" fill="#00BBFF"/><circle cx="32" cy="55" r="2.5" fill="#00BBFF"/><circle cx="48" cy="55" r="2.5" fill="#00BBFF"/><line x1="40" y1="65" x2="40" y2="95" stroke="#666" stroke-width="2"/><circle cx="40" cy="10" r="3" fill="#333"/><circle cx="40" cy="95" r="3" fill="#333"/><text x="40" y="98" text-anchor="middle" fill="#666" font-size="8">Air</text></svg>`,
  'suspension-adaptive': `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg"><line x1="40" y1="10" x2="40" y2="25" stroke="#666" stroke-width="2"/><rect x="22" y="25" width="36" height="45" fill="#333" stroke="#FF6B6B" stroke-width="2" rx="2"/><circle cx="32" cy="40" r="3" fill="#FF6B6B"/><circle cx="48" cy="40" r="3" fill="#FF6B6B"/><circle cx="32" cy="60" r="3" fill="#FF6B6B"/><circle cx="48" cy="60" r="3" fill="#FF6B6B"/><path d="M35 35 L45 45" stroke="#4dabf7" stroke-width="1"/><path d="M35 45 L45 55" stroke="#4dabf7" stroke-width="1"/><line x1="40" y1="70" x2="40" y2="95" stroke="#666" stroke-width="2"/><circle cx="40" cy="10" r="3" fill="#333"/><circle cx="40" cy="95" r="3" fill="#333"/><text x="40" y="98" text-anchor="middle" fill="#FF6B6B" font-size="8">Adaptive</text></svg>`
}

// Templates define anchor slots (normalized coordinates 0..1 relative to canvas)
const TEMPLATES: Record<string, { name: string; anchors: Array<{ id: string; x: number; y: number; allowed: string[] }>; silhouette?: string }> = {
  sedan: {
    name: 'Sedan (Side View)',
    // side-view silhouette (simple car outline)
    silhouette: 'M50 180 Q100 90 200 80 L800 80 Q900 90 950 180 L950 220 L50 220 Z',
    anchors: [
      // engine bay (front-left quarter) — visual only, not droppable here (engine configured in designer settings)
      { id: 'engine-bay', x: 0.28, y: 0.45, allowed: [] },
      // front bumper (very front)
      { id: 'front-bumper', x: 0.05, y: 0.6, allowed: ['bumper'] },
      // rear bumper (very back)
      { id: 'rear-bumper', x: 0.95, y: 0.6, allowed: ['bumper'] },
      // wheels (side positions)
      { id: 'left-front-wheel', x: 0.32, y: 0.82, allowed: ['wheels'] },
      { id: 'right-front-wheel', x: 0.68, y: 0.82, allowed: ['wheels'] },
      // mirrors & lights on the side view
      { id: 'left-mirror', x: 0.42, y: 0.38, allowed: ['mirrors'] },
      { id: 'right-mirror', x: 0.62, y: 0.38, allowed: ['mirrors'] },
      { id: 'left-headlight', x: 0.12, y: 0.6, allowed: ['lights'] },
      { id: 'right-headlight', x: 0.88, y: 0.6, allowed: ['lights'] }
    ]
  },
  suv: {
    name: 'SUV / XUV (Side View)',
    silhouette: 'M40 170 Q120 80 260 70 L740 70 Q880 80 960 170 L960 220 L40 220 Z',
    anchors: [
      { id: 'engine-bay', x: 0.30, y: 0.42, allowed: [] },
      { id: 'front-bumper', x: 0.06, y: 0.6, allowed: ['bumper'] },
      { id: 'rear-bumper', x: 0.94, y: 0.6, allowed: ['bumper'] },
      { id: 'left-front-wheel', x: 0.34, y: 0.84, allowed: ['wheels'] },
      { id: 'right-front-wheel', x: 0.66, y: 0.84, allowed: ['wheels'] },
      { id: 'left-mirror', x: 0.44, y: 0.36, allowed: ['mirrors'] },
      { id: 'right-mirror', x: 0.56, y: 0.36, allowed: ['mirrors'] },
      { id: 'left-headlight', x: 0.10, y: 0.6, allowed: ['lights'] },
      { id: 'right-headlight', x: 0.90, y: 0.6, allowed: ['lights'] }
    ]
  },
  truck: {
    name: 'Truck (Side View)',
    silhouette: 'M30 200 Q150 80 300 70 L700 70 Q850 80 970 200 L970 260 L30 260 Z',
    anchors: [
      { id: 'engine-bay', x: 0.22, y: 0.45, allowed: [] },
      { id: 'front-bumper', x: 0.05, y: 0.64, allowed: ['bumper'] },
      { id: 'left-front-wheel', x: 0.28, y: 0.86, allowed: ['wheels'] },
      { id: 'right-front-wheel', x: 0.72, y: 0.86, allowed: ['wheels'] }
    ]
  }
}

export const VisualVehicleBuilder: React.FC<VisualVehicleBuilderProps> = ({ onPartSelect, onChange }) => {
  const [placedParts, setPlacedParts] = useState<Part[]>([])
  const [draggedPart, setDraggedPart] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('engine')
  const [templateKey, setTemplateKey] = useState<string>('sedan')

  const handleDragStart = (part: any, category: string) => {
    setDraggedPart({ ...part, category })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedPart) return

    const canvas = e.currentTarget as HTMLElement
    const rect = canvas.getBoundingClientRect()
    const dropX = e.clientX - rect.left
    const dropY = e.clientY - rect.top

    // find nearest anchor in current template that supports this category
    const template = TEMPLATES[templateKey]
    let nearest: any = null
    template.anchors.forEach(a => {
      if (!a.allowed.includes(draggedPart.category)) return
      const ax = a.x * canvas.clientWidth
      const ay = a.y * canvas.clientHeight
      const dx = ax - dropX
      const dy = ay - dropY
      const d = Math.sqrt(dx * dx + dy * dy)
      if (!nearest || d < nearest.dist) nearest = { anchor: a, dist: d }
    })

    // threshold: if too far, snap anyway to the first allowed anchor
    let chosenAnchor = nearest?.anchor
    if (!chosenAnchor) chosenAnchor = template.anchors.find(a => a.allowed.includes(draggedPart.category)) || null
    if (!chosenAnchor) {
      // no compatible anchor on this template
      alert('This part cannot be placed on the current vehicle template.')
      setDraggedPart(null)
      return
    }

    const targetX = Math.max(0, Math.min(chosenAnchor.x * canvas.clientWidth - draggedPart.width / 2, canvas.clientWidth - draggedPart.width))
    const targetY = Math.max(0, Math.min(chosenAnchor.y * canvas.clientHeight - draggedPart.height / 2, canvas.clientHeight - draggedPart.height))

    // if slot occupied, replace
    const existingIndex = placedParts.findIndex(p => (p as any).anchorId === chosenAnchor.id)

    const newPart: Part = {
      id: `${draggedPart.id}-${Date.now()}`,
      name: draggedPart.name,
      category: draggedPart.category,
      image: SVG_PARTS[draggedPart.id as keyof typeof SVG_PARTS] || '',
      x: targetX,
      y: targetY,
      width: draggedPart.width,
      height: draggedPart.height
    }
    // attach anchor id so designer can map parts to slots
    ;(newPart as any).anchorId = chosenAnchor.id

    const next = [...placedParts]
    if (existingIndex >= 0) next[existingIndex] = newPart
    else next.push(newPart)

    setPlacedParts(next)
    setDraggedPart(null)
    if (onChange) onChange(next)
  }

  const removePart = (id: string) => {
    setPlacedParts(placedParts.filter(p => p.id !== id))
  }

  const categories = Object.keys(AVAILABLE_PARTS) as Array<keyof typeof AVAILABLE_PARTS>
  const currentParts = AVAILABLE_PARTS[selectedCategory as keyof typeof AVAILABLE_PARTS] || []

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px', padding: '20px' }}>
      {/* Parts Panel */}
      <div style={{ borderRight: '1px solid #444', paddingRight: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>Available Parts</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '10px',
                background: selectedCategory === cat ? '#ff6b6b' : '#333',
                border: 'none',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: selectedCategory === cat ? 'bold' : 'normal'
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {currentParts.map(part => (
            <div
              key={part.id}
              draggable
              onDragStart={() => handleDragStart(part, selectedCategory)}
              style={{
                padding: '8px',
                background: '#222',
                border: '2px solid #444',
                borderRadius: '4px',
                cursor: 'grab',
                transition: 'all 0.2s',
                userSelect: 'none',
                fontSize: 12
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#ff6b6b'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#444'}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {part.name}
              </div>
              <div style={{ width: '100%', height: '40px', background: '#111', borderRadius: '2px', overflow: 'hidden' }}>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                  {SVG_PARTS[part.id as keyof typeof SVG_PARTS] && (
                    <foreignObject x="0" y="0" width="100" height="100">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: SVG_PARTS[part.id as keyof typeof SVG_PARTS]
                        }}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </foreignObject>
                  )}
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: 16 }}>Vehicle Design Canvas</h3>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
            border: '2px dashed #666',
            borderRadius: '8px',
            width: '100%',
            height: '350px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
          }}
        >
          {/* Grid Background */}
          <svg
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0.1
            }}
            width="100%"
            height="100%"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Template selector */}
          <div style={{ position: 'absolute', left: '10px', top: '10px', zIndex: 5 }}>
            {Object.keys(TEMPLATES).map(k => (
              <button key={k} onClick={() => setTemplateKey(k)} style={{ marginRight: 8, padding: '6px 8px', background: templateKey === k ? '#ff6b6b' : '#333', color: '#fff', border: 'none', borderRadius: 4 }}>
                {TEMPLATES[k].name}
              </button>
            ))}
          </div>

          {/* Vehicle silhouette guide (from template) */}
          <svg
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.2,
              pointerEvents: 'none'
            }}
            viewBox="0 0 300 200"
            width="300"
            height="200"
          >
            <path d={TEMPLATES[templateKey].silhouette || ''} fill="none" stroke="#fff" strokeWidth="2" />
          </svg>

          {/* Anchors */}
          {TEMPLATES[templateKey].anchors.map(a => (
            <div key={a.id} style={{ position: 'absolute', left: `${a.x * 100}%`, top: `${a.y * 100}%`, transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: 'rgba(255,107,107,0.7)', border: '2px solid #111' }} />
            </div>
          ))}

          {/* Placed Parts */}
          {placedParts.map(part => (
            <div
              key={part.id}
              style={{
                position: 'absolute',
                left: `${part.x}px`,
                top: `${part.y}px`,
                width: `${part.width}px`,
                height: `${part.height}px`,
                background: '#111',
                border: '2px solid #ff6b6b',
                borderRadius: '4px',
                padding: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 0 10px rgba(255, 107, 107, 0.3)'
              }}
              onClick={() => onPartSelect?.(part)}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.6)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)'}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  height: '100%',
                  position: 'relative'
                }}
              >
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                  {part.image && (
                    <foreignObject x="0" y="0" width="100" height="100">
                      <div
                        dangerouslySetInnerHTML={{ __html: part.image }}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </foreignObject>
                  )}
                </svg>

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removePart(part.id)
                  }}
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    background: '#ff6b6b',
                    border: 'none',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '10px',
                  color: '#aaa',
                  whiteSpace: 'nowrap',
                  background: 'rgba(0,0,0,0.8)',
                  padding: '2px 6px',
                  borderRadius: '2px'
                }}
              >
                {part.name}
              </div>
            </div>
          ))}

          {/* Empty state */}
          {placedParts.length === 0 && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: '#666',
                pointerEvents: 'none'
              }}
            >
              <div style={{ fontSize: '18px', marginBottom: '10px' }}>📦</div>
              <div>Drag parts here to build your vehicle</div>
            </div>
          )}
        </div>

        {/* Parts List */}
        {placedParts.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4>Placed Parts ({placedParts.length})</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
              {placedParts.map(part => (
                <div
                  key={part.id}
                  style={{
                    padding: '8px',
                    background: '#222',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    fontSize: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{part.name}</span>
                  <button
                    onClick={() => removePart(part.id)}
                    style={{
                      background: '#ff6b6b',
                      border: 'none',
                      color: 'white',
                      borderRadius: '2px',
                      padding: '2px 6px',
                      cursor: 'pointer',
                      fontSize: '10px'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VisualVehicleBuilder
