import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#E0A06D',
          borderRadius: 32,
          color: '#17191C',
          fontSize: 32,
          fontWeight: 700,
          fontFamily: 'monospace',
          letterSpacing: '-2px',
        }}
      >
        RP
      </div>
    ),
    { ...size }
  );
}