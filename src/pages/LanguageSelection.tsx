import React from 'react'

const FLAGS = [
  { code: 'en', label: 'English', file: '/assets/flags/us.svg' },
  { code: 'hi', label: 'हिन्दी', file: '/assets/flags/in.svg' },
  { code: 'es', label: 'Español', file: '/assets/flags/es.svg' },
  { code: 'fr', label: 'Français', file: '/assets/flags/fr.svg' },
  { code: 'zh', label: '中文', file: '/assets/flags/cn.svg' },
  { code: 'de', label: 'Deutsch', file: '/assets/flags/de.svg' }
]

export default function LanguageSelection({ onChoose }: { onChoose: (lang: string) => void }) {
  return (
    <div className="card" style={{textAlign:'center'}}>
      <div style={{fontSize:'40px', marginBottom:12}}>🚗</div>
      <div className="header" style={{justifyContent:'center', marginBottom:12}}>
        <div className="title">Vehicle Tycoon</div>
      </div>
      <p className="small" style={{marginBottom:20}}>Select your language</p>
      <div className="buttons">
        {FLAGS.map(f => (
          <button key={f.code} className="btn row" onClick={() => onChoose(f.code)} style={{justifyContent:'center'}}>
            <img src={f.file} alt={f.label} style={{ width: 36, height: 24, borderRadius: 4 }} />
            <span style={{ marginLeft: 8 }}>{f.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
