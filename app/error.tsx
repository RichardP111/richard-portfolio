'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, ArrowLeft } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'var(--bg)' }}
    >
      <div className="text-center max-w-md">
        <h1
          className="font-display font-semibold text-4xl mb-4"
          style={{ color: 'var(--text)' }}
        >
          Something went wrong
        </h1>

        <p className="text-base mb-10" style={{ color: 'var(--text-soft)' }}>
          An unexpected error occurred. You can try again or head back home.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm border transition-colors"
            style={{ background: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--bg)' }}
          >
            <RefreshCcw size={16} />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm border transition-colors"
            style={{ borderColor: 'var(--line-strong)', color: 'var(--text)' }}
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}