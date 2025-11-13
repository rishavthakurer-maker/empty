import React from 'react'
import type { Page } from '../App'
import { GameState } from '../App'

export default function MainMenu({ t, onNavigate, gameState, timeSpeed, setTimeSpeed }: { 
  t: (k:string)=>string
  onNavigate: (p: Page)=>void
  gameState: GameState
  timeSpeed: number
  setTimeSpeed: (n:number)=>void
}){
  return (
    <div style={{background:'linear-gradient(135deg, #1a3a52 0%, #0d2438 50%, #1a3a52 100%)',minHeight:'100vh',padding:20,fontFamily:'Arial, sans-serif',color:'#fff'}}>
      {/* Header */}
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:40}}>
          <div>
            <h1 style={{fontSize:28,margin:'0 0 5px 0',fontWeight:'bold'}}>🏢 {gameState.companyName}</h1>
            <p style={{margin:0,fontSize:13,color:'rgba(255,255,255,0.7)'}}>Automotive Tycoon</p>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:20}}>💰 ${Math.floor(gameState.money).toLocaleString()}</div>
            <div style={{fontSize:14,marginTop:4}}>⭐ Reputation: {gameState.reputation}</div>
          </div>
        </div>

        {/* Main Hub Card */}
        <div style={{background:'rgba(0,0,0,0.4)',border:'2px solid rgba(255,255,255,0.1)',borderRadius:12,padding:40,textAlign:'center',marginBottom:30,boxShadow:'0 8px 32px rgba(0,0,0,0.3)'}}>
          <div style={{fontSize:100,marginBottom:20}}>🏭</div>
          <h2 style={{fontSize:32,margin:'0 0 10px 0',fontWeight:'bold'}}>Welcome to Your Company</h2>
          <p style={{fontSize:15,color:'rgba(255,255,255,0.8)',margin:0}}>Manage your automotive business and build amazing cars</p>
        </div>

        {/* Action Buttons Grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))',gap:15,marginBottom:30}}>
          <button onClick={() => onNavigate('designer')} style={{padding:20,background:'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',border:'none',borderRadius:8,color:'#fff',cursor:'pointer',fontWeight:'bold',fontSize:14,boxShadow:'0 4px 10px rgba(0,0,0,0.2)',transition:'all 0.3s'}}>
            🛠️<br/>Design Vehicle
          </button>
          <button onClick={() => onNavigate('manufacturing')} style={{padding:20,background:'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',border:'none',borderRadius:8,color:'#fff',cursor:'pointer',fontWeight:'bold',fontSize:14,boxShadow:'0 4px 10px rgba(0,0,0,0.2)',transition:'all 0.3s'}}>
            🏭<br/>Manufacture
          </button>
          <button onClick={() => onNavigate('market')} style={{padding:20,background:'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',border:'none',borderRadius:8,color:'#fff',cursor:'pointer',fontWeight:'bold',fontSize:14,boxShadow:'0 4px 10px rgba(0,0,0,0.2)',transition:'all 0.3s'}}>
            🌍<br/>Market
          </button>
          <button onClick={() => onNavigate('research')} style={{padding:20,background:'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',border:'none',borderRadius:8,color:'#fff',cursor:'pointer',fontWeight:'bold',fontSize:14,boxShadow:'0 4px 10px rgba(0,0,0,0.2)',transition:'all 0.3s'}}>
            🔬<br/>Research
          </button>
          <button onClick={() => onNavigate('competition')} style={{padding:20,background:'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)',border:'none',borderRadius:8,color:'#fff',cursor:'pointer',fontWeight:'bold',fontSize:14,boxShadow:'0 4px 10px rgba(0,0,0,0.2)',transition:'all 0.3s'}}>
            🏆<br/>Competition
          </button>
          <button onClick={() => onNavigate('dashboard')} style={{padding:20,background:'linear-gradient(135deg, #607D8B 0%, #455A64 100%)',border:'none',borderRadius:8,color:'#fff',cursor:'pointer',fontWeight:'bold',fontSize:14,boxShadow:'0 4px 10px rgba(0,0,0,0.2)',transition:'all 0.3s'}}>
            📊<br/>Dashboard
          </button>
        </div>

        {/* Bottom Controls */}
        <div style={{display:'flex',gap:15,marginBottom:20}}>
          <button onClick={() => onNavigate('settings')} style={{flex:1,padding:14,background:'#455A64',border:'none',borderRadius:8,color:'#fff',cursor:'pointer',fontWeight:'bold',fontSize:14,boxShadow:'0 4px 10px rgba(0,0,0,0.2)'}}>
            ⚙️ Settings
          </button>
          <button onClick={() => setTimeSpeed(prev => (prev > 0 ? 0 : 1))} style={{flex:1,padding:14,background:'#666',border:'none',borderRadius:8,color:'#fff',cursor:'pointer',fontWeight:'bold',fontSize:14,boxShadow:'0 4px 10px rgba(0,0,0,0.2)'}}>
            {timeSpeed > 0 ? '⏸️ Pause' : '▶ Resume'}
          </button>
        </div>

        {/* Game Speed Control (vertical side buttons) */}
        <div style={{position:'fixed',right:16,top:'40%',display:'flex',flexDirection:'column',gap:10,zIndex:1000}}>
          <button onClick={() => setTimeSpeed(1)} title="1x" style={{width:56,height:46,background: timeSpeed===1 ? '#ff6b6b' : 'rgba(0,0,0,0.5)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#fff',cursor:'pointer',fontWeight:'bold'}}>1x</button>
          <button onClick={() => setTimeSpeed(2)} title="2x" style={{width:56,height:46,background: timeSpeed===2 ? '#ff6b6b' : 'rgba(0,0,0,0.5)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#fff',cursor:'pointer',fontWeight:'bold'}}>2x</button>
          <button onClick={() => setTimeSpeed(prev => (prev > 0 ? 0 : 1))} title="Pause/Resume" style={{width:56,height:46,background: timeSpeed===0 ? '#4CAF50' : 'rgba(0,0,0,0.5)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#fff',cursor:'pointer',fontWeight:'bold'}}>{timeSpeed===0 ? '▶' : '⏸'}</button>
        </div>
      </div>
    </div>
  )
}

