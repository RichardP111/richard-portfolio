import Link from 'next/link';

export default function ResumePage() {
  const pdfUrl = '/resume.pdf';

  return (
    <main
      className="min-h-screen px-4 py-8 sm:px-6 sm:py-10"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border p-4 shadow-sm sm:grid-cols-[1fr_auto_1fr] sm:items-center"
          style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
        >
          <div className="flex justify-start sm:justify-start">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] transition-opacity hover:opacity-75"
              style={{ borderColor: 'var(--line-strong)', color: 'var(--text-soft)' }}
            >
              ← Home
            </Link>
          </div>

          <div className="flex flex-col items-center text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--mint)' }}>
              PDF Viewer
            </p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Resume</h1>
          </div>

          <div className="flex justify-start sm:justify-end">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.14em] transition-colors"
              style={{ borderColor: 'var(--line-strong)', color: 'var(--text)' }}
            >
              Download pdf
            </a>
          </div>
        </div>

        <div
          className="overflow-hidden rounded-2xl border shadow-sm"
          style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
        >
          <div
            className="flex items-center justify-between border-b px-4 py-3 text-[10px] uppercase tracking-[0.16em]"
            style={{ borderColor: 'var(--line)', color: 'var(--text-faint)', background: 'color-mix(in srgb, var(--surface) 88%, transparent)' }}
          >
            <span>Document preview</span>
            <span>PDF</span>
          </div>
          <iframe
            src={pdfUrl}
            title="Resume"
            className="block h-[78vh] w-full"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </main>
  );
}
