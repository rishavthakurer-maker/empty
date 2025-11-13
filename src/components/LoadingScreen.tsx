import React, { useEffect, useState } from 'react'

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setProgress(p => Math.min(100, p + Math.floor(Math.random() * 12) + 6))
    }, 300)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => onFinish(), 400)
      return () => clearTimeout(t)
    }
  }, [progress, onFinish])

  return (
    <div style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(10,10,10,0.95), rgba(0,0,0,0.95))', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
      <div style={{ width: 520, padding: 28, background: '#111', border: '1px solid #333', borderRadius: 8 }}>
        <h2 style={{ margin: '0 0 8px 0' }}>Loading Vehicle Tycoon Pro</h2>
        <p style={{ marginTop: 0, color: '#888' }}>Preparing assets and systems...</p>
        <div style={{ height: 18, background: '#222', borderRadius: 9, overflow: 'hidden', marginTop: 12 }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#51cf66', transition: 'width 260ms linear' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
          <div style={{ color: '#aaa' }}>{progress}%</div>
          <div>
            <button onClick={() => onFinish()} style={{ padding: '6px 10px', background: '#ff6b6b', border: 'none', color: '#fff', borderRadius: 6 }}>Skip</button>
          </div>
        </div>
      </div>
    </div>
  )
}
