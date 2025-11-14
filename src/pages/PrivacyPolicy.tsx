import React from 'react'

export default function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  return (
    <div className="card" style={{ minWidth: '90vw', maxWidth: '100vw', maxHeight: '95vh', overflow: 'auto', padding: '12px' }}>
      <div className="header" style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--card)', paddingBottom: '12px' }}>
        <div className="title">📋 Privacy Policy</div>
      </div>

      <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--muted)', paddingBottom: '80px' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px', color: 'var(--white)' }}>🎮 Auto Tycoon - Privacy Policy</div>
          <div className="small">Last Updated: November 2025</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '8px', color: 'var(--white)' }}>📌 Introduction</div>
          <div>
            We ("the Developer", "we", "us", or "our") operates the Auto Tycoon mobile game ("the Game" or "Service"). This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information when you use our Game.
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '8px', color: 'var(--white)' }}>📊 Information We Collect</div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Game Progress & User Data:</strong>
            <div style={{ marginLeft: '12px', marginTop: '6px' }}>
              • Your game progress, vehicle designs, and gameplay statistics<br/>
              • In-game currency balances and purchase history<br/>
              • Game achievements and leaderboard rankings
            </div>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Technical Information:</strong>
            <div style={{ marginLeft: '12px', marginTop: '6px' }}>
              • Device type, OS version, and unique device identifiers<br/>
              • IP address and general location (country/region)<br/>
              • Crash logs and app performance data
            </div>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Advertising Data (if ads enabled):</strong>
            <div style={{ marginLeft: '12px', marginTop: '6px' }}>
              • Ad interaction data and video view history<br/>
              • Advertising ID and ad network tracking data<br/>
              • Language and regional preferences for ads
            </div>
          </div>
          <div>
            <strong>In-App Purchases:</strong>
            <div style={{ marginLeft: '12px', marginTop: '6px' }}>
              • Item purchased and transaction history<br/>
              • Receipt information from Google Play<br/>
              • No credit card details stored on our servers
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '8px', color: 'var(--white)' }}>🎯 How We Use Your Information</div>
          <div>
            • Provide, maintain, and improve the Game<br/>
            • Display personalized advertisements and offers<br/>
            • Process and verify in-app purchases<br/>
            • Analyze game usage patterns and user behavior<br/>
            • Send push notifications about updates and events<br/>
            • Detect and prevent fraud or unauthorized access<br/>
            • Comply with legal obligations and respond to requests
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '8px', color: 'var(--white)' }}>🤝 Third-Party Services</div>
          <div style={{ marginBottom: '10px' }}>
            We use the following third-party services that may collect data:
          </div>
          <div>
            • <strong>Google Play Billing:</strong> For in-app purchases and payment processing<br/>
            • <strong>Firebase/Admob:</strong> For analytics, crash reporting, and advertisements<br/>
            • <strong>Ad Networks:</strong> For serving and tracking advertisements<br/>
            • <strong>Analytics Platforms:</strong> To understand how players use our Game
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '8px', color: 'var(--white)' }}>💾 Data Storage & Security</div>
          <div>
            • Game progress is stored locally on your device using browser storage<br/>
            • Optional cloud backup may be offered through Google Play<br/>
            • We implement reasonable security measures to protect your information<br/>
            • However, no method of transmission over the internet is 100% secure<br/>
            • We cannot guarantee absolute data security
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '8px', color: 'var(--white)' }}>👤 Your Rights & Choices</div>
          <div style={{ marginBottom: '10px' }}>
            <strong>You can:</strong>
            <div style={{ marginLeft: '12px', marginTop: '6px' }}>
              • Delete the game and all associated data by uninstalling<br/>
              • Opt out of personalized advertisements in device settings<br/>
              • Disable location services in device settings<br/>
              • Manage app permissions in your device settings<br/>
              • Request information about data we hold (where legally required)
            </div>
          </div>
          <div>
            <strong>Ad-Free Version:</strong> Purchase the ad-free version to remove advertisements
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '8px', color: 'var(--white)' }}>🚫 Children's Privacy</div>
          <div>
            Auto Tycoon is not intended for users under 13 years of age. We do not knowingly collect information from children under 13. If we become aware of such collection, we will delete the information and terminate the account.<br/>
            <br/>
            <strong>For EU residents under 16:</strong> Parents/guardians must provide consent for the child to use this Game.
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '8px', color: 'var(--white)' }}>🌍 Regional Privacy Laws</div>
          <div style={{ marginBottom: '10px' }}>
            <strong>GDPR (EU/UK/Switzerland):</strong>
            <div style={{ marginLeft: '12px', marginTop: '6px' }}>
              • You have rights to access, rectification, erasure, and portability<br/>
              • You can withdraw consent at any time<br/>
              • Contact us for data access requests
            </div>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>CCPA (California):</strong>
            <div style={{ marginLeft: '12px', marginTop: '6px' }}>
              • Right to know, delete, and opt-out of sales of personal information<br/>
              • Right to non-discrimination for exercising your rights
            </div>
          </div>
          <div>
            <strong>COPPA (USA - Children):</strong>
            <div style={{ marginLeft: '12px', marginTop: '6px' }}>
              • We do not knowingly collect from users under 13
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '8px', color: 'var(--white)' }}>🔄 Data Retention</div>
          <div>
            • Game progress is stored until you delete the app<br/>
            • Account data persists across sessions via local storage<br/>
            • Third-party services may retain data per their policies<br/>
            • We retain analytics data for up to 12 months<br/>
            • You can clear all game data by uninstalling and clearing app cache
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '8px', color: 'var(--white)' }}>📧 Contact Us</div>
          <div style={{ marginBottom: '10px' }}>
            If you have questions about this Privacy Policy or our privacy practices:
          </div>
          <div>
            • Email: support@autotycoon.dev<br/>
            • GitHub: rishavthakurer-maker<br/>
            <br/>
            <strong>Response Time:</strong> We will respond to privacy inquiries within 30 days
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '8px', color: 'var(--white)' }}>🔄 Changes to This Policy</div>
          <div>
            We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last Updated" date and posting the new policy in the Game. Your continued use of the Game constitutes acceptance of the updated Privacy Policy.
          </div>
        </div>

        <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(33,150,243,0.1)', border: '1px solid rgba(33,150,243,0.3)', borderRadius: '8px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '8px', color: '#64B5F6' }}>ℹ️ Summary</div>
          <div>
            We collect data necessary to run the game, personalize ads, and improve your experience. We never sell your data. You control most of your privacy settings. The ad-free version removes all advertising tracking.
          </div>
        </div>
      </div>

      <button className="btn secondary" onClick={onBack} style={{ width: 'calc(100% - 20px)', padding: '12px', position: 'fixed', bottom: '10px', left: '10px', right: '10px' }}>← Back</button>
    </div>
  )
}
