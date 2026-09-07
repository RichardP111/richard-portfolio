import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Github as GithubIcon, FileText } from 'lucide-react';
import { CONFIG } from '../../../lib/config';
import { CaseStudyGallery } from '../../../components/CaseStudyGallery';

/* ------------------------------------------------------------------ */
/*  Static params / metadata                                          */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return CONFIG.PROJECTS.filter((p) => p.slug && p.caseStudy).map((p) => ({
    slug: p.slug as string,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = CONFIG.PROJECTS.find((p) => p.slug === slug && p.caseStudy);
  if (!project) return {};

  return {
    title: `${project.title} | ${CONFIG.NAME}`,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${CONFIG.NAME}`,
      description: project.description,
      type: 'article',
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Small building block, matches the style used on the homepage      */
/* ------------------------------------------------------------------ */

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p
    className="font-mono text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-4"
    style={{ color: 'var(--mint)' }}
  >
    <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--mint)' }} />
    {children}
  </p>
);

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = CONFIG.PROJECTS.find((p) => p.slug === slug && p.caseStudy);

  if (!project || !project.caseStudy) {
    notFound();
  }

  const { caseStudy } = project;
  const galleryAspect = project.mediaAspect === 'portrait' ? 'portrait' : 'landscape';

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)' }} className="min-h-screen">
      {/* Minimal top bar, consistent with resume/schematic pages */}
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.14em] transition-opacity hover:opacity-75"
            style={{ borderColor: 'var(--line-strong)', color: 'var(--text-soft)' }}
          >
            <ArrowLeft size={13} /> Home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.14em] transition-opacity hover:opacity-75"
            style={{ borderColor: 'var(--line-strong)', color: 'var(--text-soft)' }}
          >
            All projects
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        {/* Header */}
        <header className="pb-10" style={{ borderBottom: '1px solid var(--line)' }}>
          <p
            className="font-mono text-xs uppercase tracking-[0.2em]"
            style={{ color: 'var(--text-faint)' }}
          >
            {project.tag}
          </p>
          <h1
            className="font-display font-semibold text-4xl sm:text-5xl tracking-tight mt-3"
            style={{ color: 'var(--text)' }}
          >
            {project.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed" style={{ color: 'var(--text-soft)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1 rounded-full border"
                style={{ borderColor: 'var(--line-strong)', color: 'var(--text-soft)' }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-6 mt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4"
                style={{ color: 'var(--text)' }}
              >
                <GithubIcon size={14} /> Source
              </a>
            )}
            {project.designFile && (
              <a
                href={project.designFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4"
                style={{ color: 'var(--text)' }}
              >
                <FileText size={14} /> 3D design file
              </a>
            )}
          </div>
        </header>

        {/* Hero media */}
        <div
          className={`relative mt-10 w-full ${
            project.mediaAspect === 'portrait' ? 'aspect-[3/4] max-w-md mx-auto' : 'aspect-[16/9]'
          } rounded-2xl overflow-hidden border`}
          style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
        >
          {project.mediaType === 'image' ? (
            <Image
              src={project.mediaSrc}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <video
              src={project.mediaSrc}
              muted
              loop
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Problem / Approach / Result, each with any attached media directly underneath */}
        <div className="mt-16 space-y-14">
          <section>
            <SectionLabel>The problem</SectionLabel>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-soft)' }}>
              {caseStudy.problem}
            </p>
            {caseStudy.media?.problem && caseStudy.media.problem.length > 0 && (
              <div className="mt-6 max-w-2xl">
                <CaseStudyGallery images={caseStudy.media.problem} aspect={galleryAspect} />
              </div>
            )}
          </section>

          <section>
            <SectionLabel>The approach</SectionLabel>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-soft)' }}>
              {caseStudy.approach}
            </p>
            {caseStudy.media?.approach && caseStudy.media.approach.length > 0 && (
              <div className="mt-6 max-w-2xl">
                <CaseStudyGallery images={caseStudy.media.approach} aspect={galleryAspect} />
              </div>
            )}
          </section>

          <section>
            <SectionLabel>The result</SectionLabel>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-soft)' }}>
              {caseStudy.result}
            </p>
            {caseStudy.media?.result && caseStudy.media.result.length > 0 && (
              <div className="mt-6 max-w-2xl">
                <CaseStudyGallery images={caseStudy.media.result} aspect={galleryAspect} />
              </div>
            )}
          </section>
        </div>

        {/* Footer CTA */}
        <div
          className="mt-20 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-faint)' }}>
            Have questions about how this was built?
          </p>
          <a
            href={`mailto:${CONFIG.EMAIL}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            Get in touch <ArrowUpRight size={16} />
          </a>
        </div>
      </article>
    </main>
  );
}