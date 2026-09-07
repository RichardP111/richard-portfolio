'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type GalleryImage = {
  src: string;
  alt: string;
};

export function CaseStudyGallery({
  images,
  aspect = 'landscape',
}: {
  images: GalleryImage[];
  aspect?: 'landscape' | 'portrait';
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Single image: no controls needed, just render it plainly.
  if (images.length <= 1) {
    const only = images[0];
    if (!only) return null;
    return (
      <div
        className={`relative w-full ${
          aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-[16/10]'
        } rounded-2xl overflow-hidden border`}
        style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
      >
        <Image
          src={only.src}
          alt={only.alt}
          fill
          sizes="(min-width: 768px) 700px, 100vw"
          className="object-contain"
        />
      </div>
    );
  }

  const goTo = (i: number) => setIndex((i + images.length) % images.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <div className="w-full">
      <div
        className={`relative w-full ${
          aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-[16/10]'
        } rounded-2xl overflow-hidden border`}
        style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          key={images[index].src}
          src={images[index].src}
          alt={images[index].alt}
          fill
          sizes="(min-width: 768px) 700px, 100vw"
          className="object-contain"
        />

        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-full border transition-opacity hover:opacity-80"
          style={{
            background: 'rgba(23, 25, 28, 0.55)',
            borderColor: 'var(--line-strong)',
            color: 'var(--text)',
          }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-full border transition-opacity hover:opacity-80"
          style={{
            background: 'rgba(23, 25, 28, 0.55)',
            borderColor: 'var(--line-strong)',
            color: 'var(--text)',
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show image ${i + 1} of ${images.length}`}
            aria-current={i === index}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === index ? 20 : 6,
              background: i === index ? 'var(--accent)' : 'var(--line-strong)',
            }}
          />
        ))}
      </div>
    </div>
  );
}