import React from 'react'

export default function UpgradePanel({ money, rate, onBuy }: { money:number, rate:number, onBuy:()=>void }){
  const cost = Math.round(50 * Math.pow(1.35, rate-1))
  return (
    <div style={{marginTop:12}}>
      <div className="small">Production: <strong style={{color:'white'}}>{rate.toFixed(2)}</strong></div>
      <div className="small">Upgrade cost: <strong style={{color:'white'}}>${cost}</strong></div>
      <div style={{marginTop:8}}>
        <button className="btn" onClick={onBuy} disabled={money < cost}>Buy Garage (Upgrade)</button>
      </div>
    </div>
  )
}
