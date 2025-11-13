import React, { useEffect, useState, useRef } from 'react'
import UpgradePanel from '../components/UpgradePanel'

interface GameState {
  money: number
  rate: number
  garages: number
  dealerships: number
  labs: number
  achievements: string[]
}

export default function Gameplay({ t, onBack }: { t:(k:string)=>string, onBack: ()=>void }){
  const [game, setGame] = useState<GameState>(() => {
    const s = localStorage.getItem('vt_save')
    if(s) return JSON.parse(s)
    return { money:0, rate:1, garages:1, dealerships:0, labs:0, achievements:[] }
  })

  const last = useRef<number>(Date.now())
  const [showNotif, setShowNotif] = useState<string>('')

  // Idle earnings loop
  useEffect(()=>{
    const id = setInterval(()=>{
      const now = Date.now()
      const dt = (now - last.current)/1000
      last.current = now
      setGame(g => {
        const nextMoney = g.money + g.rate*dt
        return {...g, money: nextMoney}
      })
    }, 100)
    return ()=>clearInterval(id)
  },[])

  // Auto-save every 5 seconds
  useEffect(()=>{
    const tId = setInterval(()=>{
      localStorage.setItem('vt_save', JSON.stringify(game))
    }, 5000)
    return ()=>clearInterval(tId)
  },[game])

  // Achievement checks
  useEffect(()=>{
    const checks: [boolean, string][] = [
      [game.money >= 50, 'First $50'],
      [game.money >= 500, 'First $500'],
      [game.money >= 5000, 'First $5k'],
      [game.rate >= 5, 'Fast Producer'],
      [game.rate >= 20, 'Industrial'],
      [game.garages >= 2, 'Multi-Garage'],
      [game.dealerships >= 1, 'Dealership Owner'],
      [game.labs >= 1, 'Tech Pioneer']
    ]
    checks.forEach(([cond, name]) => {
      if(cond && !game.achievements.includes(name)){
        setGame(g => {
          const next = [...g.achievements, name]
          const updated = {...g, achievements: next}
          localStorage.setItem('vt_save', JSON.stringify(updated))
          setShowNotif(`🏆 ${name}`)
          setTimeout(()=>setShowNotif(''), 2000)
          return updated
        })
      }
    })
  },[game.money, game.rate, game.garages, game.dealerships, game.labs])

  const garagePrice = Math.round(100 * Math.pow(1.4, game.garages))
  const dealerPrice = Math.round(500 * Math.pow(1.5, game.dealerships))
  const labPrice = Math.round(2000 * Math.pow(1.6, game.labs))

  function buyGarage(){
    if(game.money >= garagePrice){
      setGame(g=>({...g, money: g.money - garagePrice, garages: g.garages+1, rate: g.rate+0.5}))
    }else{
      setShowNotif('❌ Not enough funds')
      setTimeout(()=>setShowNotif(''), 2000)
    }
  }

  function buyDealer(){
    if(game.money >= dealerPrice){
      setGame(g=>({...g, money: g.money - dealerPrice, dealerships: g.dealerships+1, rate: g.rate*1.2}))
    }else{
      setShowNotif('❌ Not enough funds')
      setTimeout(()=>setShowNotif(''), 2000)
    }
  }

  function buyLab(){
    if(game.money >= labPrice){
      setGame(g=>({...g, money: g.money - labPrice, labs: g.labs+1, rate: g.rate*1.3}))
    }else{
      setShowNotif('❌ Not enough funds')
      setTimeout(()=>setShowNotif(''), 2000)
    }
  }

  return (
    <div className="card" style={{minWidth:'400px'}}>
      <div className="header"><div className="title">🚗 {t('build_garage')}</div></div>
      {showNotif && <div style={{marginTop:8, padding:'8px 12px', background:'rgba(139,0,0,0.3)', borderRadius:6, textAlign:'center', fontSize:'14px'}}>{showNotif}</div>}
      <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
        <div style={{background:'rgba(139,0,0,0.1)', padding:10, borderRadius:8}}>
          <div className="small">💰 {t('money')}</div>
          <div style={{fontSize:'18px', color:'var(--white)', fontWeight:'bold'}}>${Math.floor(game.money)}</div>
        </div>
        <div style={{background:'rgba(139,0,0,0.1)', padding:10, borderRadius:8}}>
          <div className="small">⚙️ {t('production_rate')}</div>
          <div style={{fontSize:'18px', color:'var(--white)', fontWeight:'bold'}}>${game.rate.toFixed(1)}/s</div>
        </div>
      </div>

      <div style={{marginTop:16}}>
        <div className="small" style={{fontWeight:'bold', marginBottom:8}}>🏭 Garages: {game.garages}</div>
        <button className="btn" onClick={buyGarage} disabled={game.money < garagePrice} style={{width:'100%'}}>
          Build Garage (${garagePrice}) • +$0.5/s
        </button>
      </div>

      <div style={{marginTop:12}}>
        <div className="small" style={{fontWeight:'bold', marginBottom:8}}>🛒 Dealerships: {game.dealerships}</div>
        <button className="btn" onClick={buyDealer} disabled={game.money < dealerPrice} style={{width:'100%'}}>
          Open Dealership (${dealerPrice}) • ×1.2x Rate
        </button>
      </div>

      <div style={{marginTop:12}}>
        <div className="small" style={{fontWeight:'bold', marginBottom:8}}>🔬 Research Labs: {game.labs}</div>
        <button className="btn" onClick={buyLab} disabled={game.money < labPrice} style={{width:'100%'}}>
          Build Lab (${labPrice}) • ×1.3x Rate
        </button>
      </div>

      <div style={{marginTop:16, display:'flex', gap:8}}>
        <button className="btn secondary" onClick={()=>localStorage.setItem('vt_save', JSON.stringify(game))}>💾 Save</button>
        <button className="btn secondary" onClick={onBack}>{t('back')}</button>
      </div>
    </div>
  )
}
