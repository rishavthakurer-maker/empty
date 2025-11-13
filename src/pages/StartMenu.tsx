import React from 'react'

export default function StartMenu({ onNewGame, onContinue, hasGame }: { onNewGame: ()=>void, onContinue: ()=>void, hasGame: boolean }){
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'linear-gradient(135deg, #1a3a52 0%, #0d2438 50%, #1a3a52 100%)',fontFamily:'Arial, sans-serif'}}>
      <div style={{textAlign:'center',color:'#fff'}}>
        <div style={{fontSize:'120px',marginBottom:30,textShadow:'0 4px 15px rgba(0,0,0,0.5)'}}>🚗</div>
        <h1 style={{fontSize:56,margin:'0 0 10px 0',fontWeight:'bold',textShadow:'0 2px 10px rgba(0,0,0,0.3)'}}>CAR COMPANY</h1>
        <h2 style={{fontSize:56,margin:'0 0 20px 0',fontWeight:'bold',color:'#FFD700',textShadow:'0 2px 10px rgba(0,0,0,0.3)'}}>TYCOON</h2>
        <p style={{fontSize:18,color:'rgba(255,255,255,0.8)',marginBottom:50}}>Create your dream car!</p>
        
        <div style={{display:'flex',flexDirection:'column',gap:16,minWidth:300}}>
          <button onClick={onNewGame} style={{padding:'16px 40px',fontSize:20,background:'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontWeight:'bold',boxShadow:'0 4px 15px rgba(0,0,0,0.3)',transition:'all 0.3s'}}>
            ➕ New game
          </button>
          <button onClick={onContinue} disabled={!hasGame} style={{padding:'16px 40px',fontSize:20,background:hasGame?'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)':'#666',color:'#fff',border:'none',borderRadius:8,cursor:hasGame?'pointer':'not-allowed',fontWeight:'bold',boxShadow:'0 4px 15px rgba(0,0,0,0.3)',opacity:hasGame?1:0.5,transition:'all 0.3s'}}>
            ▶ Continue
          </button>
        </div>
      </div>
    </div>
  )
}

