import React from 'react'

export default function Stats({ t, onBack }: { t:(k:string)=>string, onBack: ()=>void }){
  const s = localStorage.getItem('vt_save')
  const save = s ? JSON.parse(s) : { money:0, rate:0, garages:0, dealerships:0, labs:0 }
  return (
    <div className="card">
      <div className="header"><div className="title">📊 {t('stats')}</div></div>
      <div style={{marginTop:16}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16}}>
          <div style={{background:'rgba(139,0,0,0.1)', padding:12, borderRadius:8}}>
            <div className="small">💰 {t('money')}</div>
            <div style={{fontSize:'18px', color:'var(--white)', fontWeight:'bold'}}>${Math.floor(save.money||0)}</div>
          </div>
          <div style={{background:'rgba(139,0,0,0.1)', padding:12, borderRadius:8}}>
            <div className="small">⚙️ {t('production_rate')}</div>
            <div style={{fontSize:'18px', color:'var(--white)', fontWeight:'bold'}}>${(save.rate||0).toFixed(1)}/s</div>
          </div>
        </div>

        <div style={{background:'rgba(139,0,0,0.05)', padding:12, borderRadius:8}}>
          <div className="small">🏭 Garages: <strong style={{color:'var(--white)'}}>{save.garages||0}</strong></div>
          <div className="small">🛒 Dealerships: <strong style={{color:'var(--white)'}}>{save.dealerships||0}</strong></div>
          <div className="small">🔬 Labs: <strong style={{color:'var(--white)'}}>{save.labs||0}</strong></div>
        </div>

        <div style={{marginTop:16}}>
          <button className="btn" onClick={onBack}>{t('back')}</button>
        </div>
      </div>
    </div>
  )
}
