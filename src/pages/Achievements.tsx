import React from 'react'

const ACHIEVEMENT_ICONS: Record<string,string> = {
  'First $50': '💵',
  'First $500': '💸',
  'First $5k': '💰',
  'Fast Producer': '⚡',
  'Industrial': '🏭',
  'Multi-Garage': '🏢',
  'Dealership Owner': '🛒',
  'Tech Pioneer': '🔬'
}

export default function Achievements({ t, onBack }: { t:(k:string)=>string, onBack: ()=>void }){
  const s = localStorage.getItem('vt_save')
  const save = s ? JSON.parse(s) : { achievements: [] }
  const unlocked: string[] = save.achievements || []
  
  return (
    <div className="card">
      <div className="header"><div className="title">🏆 {t('achievements')}</div></div>
      <div style={{marginTop:16}}>
        {unlocked.length === 0 && <div className="small" style={{textAlign:'center', color:'var(--muted)'}}>No achievements yet. Keep playing!</div>}
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {unlocked.map((a,i)=> (
            <div key={i} style={{background:'rgba(139,0,0,0.1)', padding:12, borderRadius:8, display:'flex', gap:8, alignItems:'center'}}>
              <span style={{fontSize:'20px'}}>{ACHIEVEMENT_ICONS[a] || '✨'}</span>
              <span style={{color:'var(--white)', fontWeight:'600'}}>{a}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:16}}>
          <button className="btn" onClick={onBack}>{t('back')}</button>
        </div>
      </div>
    </div>
  )
}
