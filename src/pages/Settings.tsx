import React, { useState } from 'react'

export default function Settings({ lang, setLang, onBack, t, theme, setTheme, timeSpeed, setTimeSpeed }: { lang: string, setLang: (s:string)=>void, onBack: ()=>void, t:(k:string)=>string, theme: string, setTheme: (s:string)=>void, timeSpeed: number, setTimeSpeed: (n:number)=>void }){
  const [graphics, setGraphics] = useState('high')
  const [music, setMusic] = useState(70)
  const [sfx, setSfx] = useState(80)

  function resetSave(){
    if(confirm(t('confirm_reset') || 'Reset save data?')){
      localStorage.removeItem('vt_save')
      alert(t('save_reset_done') || 'Save reset')
    }
  }

  return (
    <div className="card">
      <div className="header"><div className="title">⚙️ {t('options')}</div></div>
      <div style={{marginTop:16}}>
        
        <div style={{marginBottom:16}}>
          <div className="small" style={{fontWeight:'bold', marginBottom:8}}>{t('graphics')}</div>
          <select value={graphics} onChange={e=>setGraphics(e.target.value)} style={{width:'100%',padding:10,borderRadius:8}}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div style={{marginBottom:16}}>
          <div className="small" style={{fontWeight:'bold', marginBottom:8}}>{t('volume')}</div>
          <div style={{display:'flex',gap:12}}>
            <div style={{flex:1}}>
              <div className="small" style={{marginBottom:6}}>🎵 Music ({music}%)</div>
              <input type="range" min={0} max={100} value={music} onChange={e=>setMusic(Number(e.target.value))} />
            </div>
            <div style={{flex:1}}>
              <div className="small" style={{marginBottom:6}}>🔊 SFX ({sfx}%)</div>
              <input type="range" min={0} max={100} value={sfx} onChange={e=>setSfx(Number(e.target.value))} />
            </div>
          </div>
        </div>

        <div style={{marginBottom:16}}>
          <div className="small" style={{fontWeight:'bold', marginBottom:8}}>{t('language')}</div>
          <select value={lang} onChange={e=>setLang(e.target.value)} style={{width:'100%',padding:10,borderRadius:8}}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="zh">中文</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div style={{marginBottom:16}}>
          <div className="small" style={{fontWeight:'bold', marginBottom:8}}>{t('theme')}</div>
          <div style={{display:'flex',gap:8}}>
            <button className={"btn" + (theme==='dark' ? '' : ' secondary')} onClick={()=>setTheme('dark')} style={{flex:1}}>🌙 {t('theme_dark')}</button>
            <button className={"btn" + (theme==='light' ? '' : ' secondary')} onClick={()=>setTheme('light')} style={{flex:1}}>☀️ {t('theme_light')}</button>
          </div>
        </div>

        <div style={{marginBottom:16}}>
          <div className="small" style={{fontWeight:'bold', marginBottom:8}}>⏱️ Time Speed</div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <div className="small" style={{marginRight:8}}>Current: <strong>{timeSpeed}x</strong></div>
            <select value={timeSpeed} onChange={e=>setTimeSpeed(Number(e.target.value))} style={{padding:8,borderRadius:8}}>
              <option value={0.5}>0.5x (Slow)</option>
              <option value={1}>1x (Normal)</option>
              <option value={2}>2x (Fast)</option>
              <option value={5}>5x (Turbo)</option>
            </select>
          </div>
        </div>

        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={onBack} style={{flex:1}}>{t('back')}</button>
          <button className="btn secondary" onClick={resetSave} style={{flex:1}}>🔄 {t('save_reset')}</button>
        </div>
      </div>
    </div>
  )
}
