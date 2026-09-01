'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 dot-grid"
      style={{ background: 'var(--bg)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-md"
      >
        <h1
          className="font-display font-semibold text-8xl sm:text-9xl mb-4"
          style={{ color: 'var(--text)' }}
        >
          404
        </h1>

        <p
          className="font-display font-medium text-2xl sm:text-3xl mb-4"
          style={{ color: 'var(--text)' }}
        >
          Page not found
        </p>

        <p className="text-base mb-10" style={{ color: 'var(--text-soft)' }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm border transition-colors"
          style={{
            background: 'var(--accent)',
            borderColor: 'var(--accent)',
            color: 'var(--bg)',
          }}
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}