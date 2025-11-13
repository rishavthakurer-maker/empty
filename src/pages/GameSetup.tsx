import React, { useState } from 'react'

export default function GameSetup({ onStart, onBack, t, lang, setLang, theme, setTheme, timeSpeed, setTimeSpeed }: { 
  onStart: ()=>void
  onBack: ()=>void
  t: (k:string)=>string
  lang: string
  setLang: (s:string)=>void
  theme: string
  setTheme: (s:string)=>void
  timeSpeed: number
  setTimeSpeed: (n:number)=>void
}){
  const [graphics, setGraphics] = useState('high')
  const [music, setMusic] = useState(70)

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'linear-gradient(135deg, #1a3a52 0%, #0d2438 50%, #1a3a52 100%)',fontFamily:'Arial, sans-serif'}}>
      <div style={{background:'rgba(26, 58, 82, 0.95)',padding:40,borderRadius:16,maxWidth:500,width:'90%',color:'#fff',boxShadow:'0 8px 32px rgba(0,0,0,0.3)',border:'1px solid rgba(255,255,255,0.1)'}}>
        <h2 style={{fontSize:32,margin:'0 0 30px 0',textAlign:'center',fontWeight:'bold'}}>⚙️ Game Setup</h2>
        
        <div style={{marginBottom:24}}>
          <label style={{display:'block',marginBottom:8,fontWeight:'bold',fontSize:14}}>🎮 Graphics Quality</label>
          <select value={graphics} onChange={e=>setGraphics(e.target.value)} style={{width:'100%',padding:12,borderRadius:8,fontSize:14,background:'#222',border:'1px solid #444',color:'#fff'}}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div style={{marginBottom:24}}>
          <label style={{display:'block',marginBottom:8,fontWeight:'bold',fontSize:14}}>🎵 Music Volume: {music}%</label>
          <input type="range" min={0} max={100} value={music} onChange={e=>setMusic(Number(e.target.value))} style={{width:'100%',cursor:'pointer'}} />
        </div>

        <div style={{marginBottom:24}}>
          <label style={{display:'block',marginBottom:8,fontWeight:'bold',fontSize:14}}>🗣️ Language</label>
          <select value={lang} onChange={e=>setLang(e.target.value)} style={{width:'100%',padding:12,borderRadius:8,fontSize:14,background:'#222',border:'1px solid #444',color:'#fff'}}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="zh">中文</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div style={{marginBottom:24}}>
          <label style={{display:'block',marginBottom:8,fontWeight:'bold',fontSize:14}}>🌙 Theme</label>
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=>setTheme('dark')} style={{flex:1,padding:12,background:theme==='dark'?'#4CAF50':'#333',border:'none',borderRadius:8,color:'#fff',cursor:'pointer',fontWeight:'bold'}}>🌙 Dark</button>
            <button onClick={()=>setTheme('light')} style={{flex:1,padding:12,background:theme==='light'?'#FFD700':'#555',border:'none',borderRadius:8,color:theme==='light'?'#000':'#fff',cursor:'pointer',fontWeight:'bold'}}>☀️ Light</button>
          </div>
        </div>

        <div style={{marginBottom:24}}>
          <label style={{display:'block',marginBottom:8,fontWeight:'bold',fontSize:14}}>⏱️ Game Speed</label>
          <select value={timeSpeed} onChange={e=>setTimeSpeed(Number(e.target.value))} style={{width:'100%',padding:12,borderRadius:8,fontSize:14,background:'#222',border:'1px solid #444',color:'#fff'}}>
            <option value={0.5}>0.5x - Slow</option>
            <option value={1}>1x - Normal</option>
            <option value={2}>2x - Fast</option>
            <option value={5}>5x - Turbo</option>
          </select>
        </div>

        <div style={{display:'flex',gap:12}}>
          <button onClick={onBack} style={{flex:1,padding:14,background:'#666',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontWeight:'bold',fontSize:16}}>← Back</button>
          <button onClick={onStart} style={{flex:1,padding:14,background:'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontWeight:'bold',fontSize:16,boxShadow:'0 4px 10px rgba(0,0,0,0.2)'}}>▶ Start Game</button>
        </div>
      </div>
    </div>
  )
}

