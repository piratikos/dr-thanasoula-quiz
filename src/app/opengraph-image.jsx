import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Τι τύπο γήρανσης έχετε και ποια εξέταση ταιριάζει σε εσάς;'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(170deg, #faf6ee 0%, #f0e8d6 35%, #e8dcc6 70%, #dfd2b8 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,149,58,0.08), transparent 70%)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,105,20,0.06), transparent 70%)', display: 'flex' }} />

        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 28px',
            borderRadius: 40,
            background: 'rgba(255,255,255,0.5)',
            border: '1.5px solid rgba(255,255,255,0.6)',
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 28 }}>🧬</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#8B6914', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Dr. Μαρία Θανάσουλα
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 900,
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: '#1a1207',
              lineHeight: 1.2,
              margin: 0,
              textAlign: 'center',
            }}
          >
            Τι τύπο γήρανσης έχετε και ποια εξέταση ταιριάζει σε εσάς;
          </h1>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            color: '#8B7355',
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          Δωρεάν τεστ 2 λεπτών · Βασισμένο στα 12 Hallmarks of Aging
        </p>

        {/* Archetype emojis row */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            marginTop: 28,
          }}
        >
          {['🔥', '⚔️', '🔋', '🍯', '🦠', '⏳'].map((emoji) => (
            <div
              key={emoji}
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: 'rgba(255,255,255,0.5)',
                border: '1.5px solid rgba(255,255,255,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '16px 36px',
            borderRadius: 20,
            background: 'linear-gradient(135deg, #8B6914, #C4953A)',
            color: '#fff',
            fontSize: 22,
            fontWeight: 700,
            marginTop: 36,
            boxShadow: '0 8px 32px rgba(139,105,20,0.3)',
          }}
        >
          Κάντε το τεστ →
        </div>
      </div>
    ),
    { ...size }
  )
}
