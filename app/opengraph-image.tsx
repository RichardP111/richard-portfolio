import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Richard Pu — Computer Engineering Portfolio';

// Same values as CONFIG in page.tsx — update both places together,
// or better yet, move CONFIG to a shared file and import it in both.
const NAME = 'Richard Pu';
const AVAILABILITY = 'Available for Winter 2027 co-op (Jan–Apr).';
const EDUCATION_LINE = 'Computer Engineering (BASc Co-op) student at University of Waterloo.';
const TAGLINE =
  'I work across the whole stack, from circuit-level signalling and embedded firmware to the interactive software that sits on top of it.';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://richardpu.ca';

// Same soft-charcoal palette as globals.css (satori can't read CSS vars,
// so the values are duplicated here — keep in sync if you retheme).
const COLORS = {
  bg: '#17191c',
  surface: '#202327',
  text: '#f2f0e9',
  textSoft: '#b9bbb5',
  accent: '#e0a06d',
  mint: '#9bb9a6',
  lineStrong: '#4a4f53',
};

async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (match) {
    const res = await fetch(match[1]);
    if (res.ok) return res.arrayBuffer();
  }
  throw new Error(`Failed to load font: ${family} ${weight}`);
}

export default async function Image() {
  const displayText = 'From circuits to production code.' + NAME;
  const bodyText = AVAILABILITY + EDUCATION_LINE + TAGLINE + 'View projects Get in touch';

  const [displayFont, bodyFont, bodyMedium] = await Promise.all([
    loadGoogleFont('IBM Plex Sans', 700, displayText),
    loadGoogleFont('Inter', 400, bodyText),
    loadGoogleFont('Inter', 600, bodyText),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: COLORS.bg,
          fontFamily: 'Inter',
        }}
      >
        {/* soft accent glow, top-left — stand-in for the site's dot-grid/vignette.
            Satori (next/og's renderer) doesn't support CSS `filter`, so the glow
            is faded with a radial-gradient instead of blur. */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: -160,
            width: 680,
            height: 680,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${COLORS.accent} 0%, transparent 68%)`,
            opacity: 0.28,
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            padding: '64px 72px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left: copy */}
          <div style={{ display: 'flex', flexDirection: 'column', width: 700 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: 20,
                borderLeft: `3px solid ${COLORS.accent}`,
              }}
            >
              <div style={{ display: 'flex', fontSize: 22, fontWeight: 600, color: COLORS.text, fontFamily: 'Inter-Medium' }}>
                {AVAILABILITY}
              </div>
              <div style={{ display: 'flex', fontSize: 18, marginTop: 6, color: COLORS.textSoft, fontStyle: 'italic' }}>
                {EDUCATION_LINE}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                fontFamily: 'IBM Plex Sans',
                fontWeight: 700,
                fontSize: 64,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: COLORS.text,
                marginTop: 28,
                maxWidth: 660,
              }}
            >
              From circuits to <span style={{ display: 'flex', color: COLORS.accent }}>production code.</span>
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: 20,
                lineHeight: 1.5,
                color: COLORS.textSoft,
                marginTop: 24,
                maxWidth: 560,
              }}
            >
              {TAGLINE}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 40 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 28px',
                  borderRadius: 999,
                  background: COLORS.accent,
                  color: COLORS.bg,
                  fontSize: 17,
                  fontWeight: 600,
                  fontFamily: 'Inter-Medium',
                }}
              >
                View projects
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: 17,
                  fontWeight: 600,
                  fontFamily: 'Inter-Medium',
                  color: COLORS.text,
                  textDecoration: 'underline',
                }}
              >
                Get in touch
              </div>
            </div>
          </div>

          {/* Right: circular hero photo with corner brackets, matching the site */}
          <div style={{ display: 'flex', position: 'relative', width: 320, height: 320 }}>
            <div
              style={{
                position: 'absolute',
                inset: -50,
                borderRadius: '50%',
                background: `radial-gradient(circle at 35% 30%, ${COLORS.accent} 0%, ${COLORS.mint} 42%, transparent 72%)`,
                opacity: 0.55,
                display: 'flex',
              }}
            />
            <div
              style={{
                display: 'flex',
                width: 320,
                height: 320,
                borderRadius: '50%',
                overflow: 'hidden',
                border: `1px solid ${COLORS.lineStrong}`,
                background: COLORS.surface,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={new URL('/profile-hero.jpg', siteUrl).toString()}
                width={320}
                height={320}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                top: -10,
                left: -10,
                width: 26,
                height: 26,
                borderTop: `3px solid ${COLORS.accent}`,
                borderLeft: `3px solid ${COLORS.accent}`,
                borderTopLeftRadius: 10,
              }}
            />
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                bottom: -10,
                right: -10,
                width: 26,
                height: 26,
                borderBottom: `3px solid ${COLORS.mint}`,
                borderRight: `3px solid ${COLORS.mint}`,
                borderBottomRightRadius: 10,
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'IBM Plex Sans', data: displayFont, weight: 700, style: 'normal' },
        { name: 'Inter', data: bodyFont, weight: 400, style: 'normal' },
        { name: 'Inter-Medium', data: bodyMedium, weight: 600, style: 'normal' },
      ],
    }
  );
}