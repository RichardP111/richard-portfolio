'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Github,
  Linkedin,
  Instagram,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  FileText,
  ShieldCheck,
  Scale,
  Accessibility,
  Eye,
  Type,
  VideoOff,
  ALargeSmall,
  Link2,
  TextSelect,
  RefreshCcw,
  Github as GithubIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Socials = {
  GITHUB: string;
  LINKEDIN: string;
  INSTAGRAM: string;
};

type Project = {
  title: string;
  description: string;
  tag: string;
  tech: string[];
  mediaType: 'video' | 'image';
  mediaSrc: string;
  github?: string;
  downloadLink?: string;
  schematic?: string;
  designFile?: string;
  mediaAspect?: 'portrait';
};

type ViewState = 'main' | 'privacy' | 'terms';

type A11yState = {
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
  textSpacing: boolean;
  readingMode: boolean;
  highlightLinks: boolean;
};

/* ------------------------------------------------------------------ */
/*  Content                                              */
/* ------------------------------------------------------------------ */

const CONFIG = {
  NAME: 'Richard Pu',
  EMAIL: 'r3pu@uwaterloo.ca',
  RESUME: '/resume',
  RESUME_FILE: '/resume.pdf',
  LOCATION: 'Ontario, Canada',
  ROLE: 'Computer Engineering',
  AVAILABILITY: 'Available for Winter 2027 co-op (Jan–Apr)',
  PROFILE_IMAGE_SRC: '/profile.jpg',
  HERO_IMAGE_SRC: '/profile-hero.jpg',
  SOCIALS: {
    GITHUB: 'https://github.com/RichardPu',
    LINKEDIN: 'https://www.linkedin.com/in/purichard/',
    INSTAGRAM: 'https://www.instagram.com/_._.richard/',
  } as Socials,
  EDUCATION: {
    school: 'University of Waterloo',
    program: 'Computer Engineering (BASc Co-op)',
    note: 'Edit the timeframe/year in the EDUCATION block in page.tsx.',
  },
  PROJECTS: [
    {
      title: 'Smart Chess Board',
      description:
        'A smart chess board powered by an NVIDIA Jetson Orin Nano. The project combines computer vision, embedded control, and a physical LED board into one interactive system.',
      tag: 'Hardware Engineering',
      tech: ['Jetson Orin Nano', 'Neopixels', 'OLED Display'],
      mediaType: 'image' as const,
      mediaSrc: '/images/chessBoard.jpg',
      github: 'https://github.com/RichardPu/jetson-chess',
      designFile: 'https://github.com/RichardPu/jetson-chess/tree/main/3D%20models',
    },
    {
      title: 'Red Light, Green Light',
      description:
        'An AI-powered Red Light, Green Light game inspired by Squid Game, running on an NVIDIA Jetson Orin Nano. The system uses vision-based movement detection to decide when players move.',
      tag: 'AI & Hardware',
      tech: ['Jetson Orin Nano', 'Python', 'Computer Vision', 'Ultralytics YOLO'],
      mediaType: 'image' as const,
      mediaSrc: '/images/rlgl.jpg',
      github: 'https://github.com/RichardPu/jetson-rlgl',
      designFile: 'https://github.com/RichardPu/jetson-rlgl/tree/main/3D_files',
      mediaAspect: 'portrait',
    },
    {
      title: 'BenumZombs',
      description:
        'A scratch-built 2D survival shooter using Java Graphics2D and OOP principles. Features custom vector physics, object-pooling for entity management, and a personalized asset library.',
      tag: 'Java Game',
      tech: ['Java', 'Graphics2D', 'OOP'],
      mediaType: 'image' as const,
      mediaSrc: '/images/benumZombsGame.png',
      github: 'https://github.com/RichardPu/BenumZombs',
      downloadLink: '/jar/BenumZombs.jar',
    },
    {
      title: 'Truck Game',
      description:
        'A high-speed object-avoidance game on an Arduino Uno, using the LiquidCrystal library for dynamic 16x2 display updates and a low-latency coordinate system for real-time physics and analog joystick input.',
      tag: 'Circuit Design',
      tech: ['Arduino Uno', 'Joystick', 'LCD 16x2'],
      mediaType: 'video' as const,
      mediaSrc: '/videos/truckGameVideo.mp4',
      github: 'https://github.com/RichardPu/arduino-truck-game',
      schematic: '/schematic?file=/truckGameSchematic.pdf&title=Truck%20Game%20Schematic',
    },
    {
      title: 'Memory Matrix',
      description:
        'A reaction-time assessment tool built on an Arduino I2C architecture, synchronizing LED matrices with user input. Optimized interrupt service routines achieve millisecond precision in measuring pattern retention.',
      tag: 'Circuit Design',
      tech: ['Arduino', 'I2C', 'LED'],
      mediaType: 'video' as const,
      mediaSrc: '/videos/memoryGameVideo.mp4',
      github: 'https://github.com/RichardPu/arduino-memory-game',
      schematic: '/schematic?file=/memoryGameSchematic.pdf&title=Memory%20Matrix%20Schematic',
    },
  ] as Project[],
  SKILLS: [
    { title: 'Languages', items: ['Java', 'Python', 'C++', 'HTML / CSS'] },
    { title: 'Hardware & Design', items: ['Arduino', 'Raspberry Pi', 'NVIDIA Jetson Orin Nano', '3D Design & Printing'] },
    { title: 'Tools & Ecosystems', items: ['VS Code', 'Eclipse', 'Arduino IDE', 'GitHub', 'Docker'] },
  ],
};

/* ------------------------------------------------------------------ */
/*  Small primitives                                                   */
/* ------------------------------------------------------------------ */

const Reveal = ({
  children,
  delay = 0,
  reduceMotion,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  reduceMotion?: boolean;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Kicker = ({ children, showMarker = true }: { children: React.ReactNode; showMarker?: boolean }) => (
  <p
    className={`font-mono text-xs uppercase tracking-[0.2em] flex items-center ${showMarker ? 'gap-2' : ''}`}
    style={{ color: 'var(--mint)' }}
  >
    {showMarker && <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--mint)' }} />}
    {children}
  </p>
);

/* ------------------------------------------------------------------ */
/*  Navbar                                                              */
/* ------------------------------------------------------------------ */

const Navbar = ({ setView }: { setView: React.Dispatch<React.SetStateAction<ViewState>> }) => {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const links = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
      style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)', borderBottom: '1px solid var(--line)' }}
    >
      <nav ref={navRef} className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between" aria-label="Main navigation">
        <button onClick={() => setView('main')} className="flex items-center gap-3" aria-label="Back to top">
          <span
            className="w-9 h-9 rounded-full overflow-hidden border shrink-0"
            style={{ borderColor: 'var(--line-strong)' }}
          >
            <Image
              src={CONFIG.PROFILE_IMAGE_SRC}
              alt={CONFIG.NAME}
              width={36}
              height={36}
              className="object-cover w-full h-full"
            />
          </span>
          <span
            className="font-display font-semibold text-lg tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            {CONFIG.NAME}
          </span>
        </button>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={() => setView('main')}
              className="text-[13px] uppercase tracking-[0.14em] font-medium hover:opacity-70 transition-opacity"
              style={{ color: 'var(--text-soft)' }}
            >
              {l.name}
            </a>
          ))}
          <span className="h-4 w-px" style={{ background: 'var(--line-strong)' }} />
          <a
            href={CONFIG.RESUME}
            className="text-[13px] uppercase tracking-[0.14em] font-medium px-4 py-2 rounded-full border transition-colors"
            style={{ borderColor: 'var(--line-strong)', color: 'var(--text)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-tint)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            Résumé
          </a>
          <div className="flex items-center gap-4">
            <a href={CONFIG.SOCIALS.GITHUB} aria-label="GitHub" style={{ color: 'var(--text-soft)' }}>
              <Github size={18} />
            </a>
            <a href={CONFIG.SOCIALS.LINKEDIN} aria-label="LinkedIn" style={{ color: 'var(--text-soft)' }}>
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <button
          className="md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          style={{ color: 'var(--text)' }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: '1px solid var(--line)' }}
          >
            <div className="flex flex-col gap-5 px-4 sm:px-6 py-6">
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  onClick={() => {
                    setView('main');
                    setOpen(false);
                  }}
                  className="text-lg font-display font-medium"
                  style={{ color: 'var(--text)' }}
                >
                  {l.name}
                </a>
              ))}
              <a
                href={CONFIG.RESUME}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-widest font-mono"
                style={{ color: 'var(--mint)' }}
              >
                Résumé ↗
              </a>
              <div className="flex gap-6 pt-2">
                <a href={CONFIG.SOCIALS.GITHUB} aria-label="GitHub" style={{ color: 'var(--text-soft)' }}>
                  <Github size={20} />
                </a>
                <a href={CONFIG.SOCIALS.LINKEDIN} aria-label="LinkedIn" style={{ color: 'var(--text-soft)' }}>
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */

const Hero = ({ reduceMotion }: { reduceMotion?: boolean }) => (
  <section className="relative min-h-[calc(100svh-5rem)] flex items-center px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 md:pt-24 md:pb-24 max-w-6xl mx-auto overflow-visible">
    <div
      className="dot-grid absolute inset-0 -z-10 opacity-40"
      style={{ maskImage: 'radial-gradient(ellipse at 30% 20%, black, transparent 70%)' }}
    />

    <div className="hero-content grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-12 sm:gap-14 md:gap-24 items-center">
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pl-4" style={{ borderLeft: '2px solid var(--accent)' }}>
          <p className="text-base sm:text-lg font-medium" style={{ color: 'var(--text)' }}>
            Available for Winter 2027 co-op (Jan–Apr).
          </p>
          <p className="mt-1 text-sm sm:text-base italic" style={{ color: 'var(--text-soft)' }}>
            {CONFIG.EDUCATION.program} student at {CONFIG.EDUCATION.school}.
          </p>
        </div>

        <h1
          className="font-display font-semibold text-[clamp(2.75rem,12vw,4.6rem)] leading-[0.98] tracking-tight mt-6"
          style={{ color: 'var(--text)' }}
        >
          From circuits to{' '}
          <span style={{ color: 'var(--accent)' }}>production code.</span>
        </h1>

        <p className="mt-5 max-w-lg text-lg leading-relaxed" style={{ color: 'var(--text-soft)' }}>
          I work across the whole stack, from circuit-level signalling and embedded
          firmware to the interactive software that sits on top of it.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            View projects <ArrowUpRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
            style={{ color: 'var(--text)', textDecorationColor: 'var(--line-strong)' }}
          >
            Get in touch
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : 0.15 }}
        className="relative mx-auto md:mx-0 md:justify-self-center w-full max-w-[340px] aspect-square"
      >
        <div
          className="absolute -inset-3 rounded-[2rem] blur-2xl opacity-40"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--mint))' }}
        />
        <div
          className="relative w-full h-full rounded-full overflow-hidden border"
          style={{ borderColor: 'var(--line-strong)', background: 'var(--surface)' }}
        >
          <Image
            src={CONFIG.HERO_IMAGE_SRC}
            alt={CONFIG.NAME}
            fill
            sizes="340px"
            className="object-cover"
            priority
          />
        </div>
        {}
        <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: 'var(--accent)' }} />
        <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: 'var(--mint)' }} />
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Projects, editorial index / accordion                             */
/* ------------------------------------------------------------------ */

const ProjectRow = ({
  project,
  index,
  isOpen,
  onToggle,
  reduceMotion,
}: {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  reduceMotion?: boolean;
}) => (
  <div style={{ borderBottom: '1px solid var(--line)' }}>
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full flex items-center gap-4 md:gap-8 py-6 md:py-8 text-left group"
    >
      <span className="font-mono text-sm md:text-base w-8 shrink-0" style={{ color: 'var(--text-faint)' }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span
        className="font-display font-medium text-2xl md:text-4xl tracking-tight flex-1 transition-colors"
        style={{ color: isOpen ? 'var(--accent)' : 'var(--text)' }}
      >
        {project.title}
      </span>
      <span
        className="hidden sm:block font-mono text-xs uppercase tracking-[0.14em] shrink-0"
        style={{ color: 'var(--text-faint)' }}
      >
        {project.tag}
      </span>
      <ChevronDown
        size={20}
        className="shrink-0 transition-transform"
        style={{ color: 'var(--text-faint)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
      />
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="pb-10 pl-12 md:pl-20 pr-2 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 items-start">
            <div>
              <p className="text-base leading-relaxed max-w-xl" style={{ color: 'var(--text-soft)' }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
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
                {project.schematic && (
                  <a
                    href={project.schematic}
                    className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4"
                    style={{ color: 'var(--text)' }}
                  >
                    <FileText size={14} /> Schematic
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
                {project.downloadLink && (
                  <a
                    href={project.downloadLink}
                    className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4"
                    style={{ color: 'var(--text)' }}
                  >
                    Download build
                  </a>
                )}
              </div>
            </div>

            <div
              className={`relative ${project.mediaAspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'} w-full rounded-lg overflow-hidden border`}
              style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
            >
              {project.mediaType === 'image' ? (
                <Image
                  src={project.mediaSrc}
                  alt={project.title}
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              ) : (
                <video src={project.mediaSrc} muted loop autoPlay playsInline className="w-full h-full object-cover" />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ProjectsIndex = ({ reduceMotion }: { reduceMotion?: boolean }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="projects" className="px-4 sm:px-6 py-20 sm:py-24 md:py-32 max-w-5xl mx-auto">
      <Reveal reduceMotion={reduceMotion}>
        <Kicker>Selected work</Kicker>
        <h2 className="font-display font-semibold text-4xl md:text-5xl tracking-tight mt-4 mb-14" style={{ color: 'var(--text)' }}>
          Projects
        </h2>
      </Reveal>

      <div style={{ borderTop: '1px solid var(--line)' }}>
        {CONFIG.PROJECTS.map((p, i) => (
          <ProjectRow
            key={p.title}
            project={p}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  About                                                               */
/* ------------------------------------------------------------------ */

const About = ({ reduceMotion }: { reduceMotion?: boolean }) => (
  <section id="about" className="px-4 sm:px-6 py-20 sm:py-24 md:py-32" style={{ background: 'var(--surface)' }}>
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-16">
      <Reveal reduceMotion={reduceMotion}>
        <Kicker>About</Kicker>
        <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight mt-4 mb-8 max-w-md" style={{ color: 'var(--text)' }}>
          I like building things I can understand from end to end.
        </h2>
        <p className="text-base leading-relaxed max-w-md" style={{ color: 'var(--text-soft)' }}>
          I&apos;m a Computer Engineering student at the University of Waterloo who enjoys
          working across hardware and software. Most of my projects start with a physical
          system and grow into the code, controls, and interface that make it useful.
        </p>
        <p className="mt-4 text-base leading-relaxed max-w-md" style={{ color: 'var(--text-soft)' }}>
          I&apos;m currently looking for co-op opportunities and collaborations where I can
          keep learning, build practical systems, and contribute across the stack.
        </p>

      </Reveal>

      <Reveal reduceMotion={reduceMotion} delay={0.1}>
        <div className="space-y-6">
          {CONFIG.SKILLS.map((cat) => (
            <div key={cat.title} className="pb-6" style={{ borderBottom: '1px solid var(--line)' }}>
              <h4 className="font-mono text-xs uppercase tracking-[0.14em] mb-3" style={{ color: 'var(--mint)' }}>
                {cat.title}
              </h4>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text)' }}>
                {cat.items.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Contact                                                             */
/* ------------------------------------------------------------------ */

const Contact = ({ reduceMotion }: { reduceMotion?: boolean }) => (
  <section
    id="contact"
    className="px-4 sm:px-6 py-24 sm:py-28 md:py-36"
    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-strong))' }}
  >
    <div className="max-w-4xl mx-auto text-center">
      <Reveal reduceMotion={reduceMotion}>
        <p className="font-mono text-[13px] uppercase tracking-[0.2em] mb-6" style={{ color: 'rgba(11,14,20,0.6)' }}>
          Get in touch
        </p>
        <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tight mb-10" style={{ color: 'var(--bg)' }}>
          Let&apos;s build something good together.
        </h2>
        <a
          href={`mailto:${CONFIG.EMAIL}`}
          className="inline-flex items-center gap-3 text-xl md:text-2xl font-display font-medium border-b-2 pb-1 transition-opacity hover:opacity-80"
          style={{ color: 'var(--bg)', borderColor: 'rgba(11,14,20,0.3)' }}
        >
          {CONFIG.EMAIL} <ArrowUpRight size={22} />
        </a>

        <div className="flex items-center justify-center gap-8 mt-14">
          <a href={CONFIG.SOCIALS.GITHUB} aria-label="GitHub" style={{ color: 'rgba(11,14,20,0.65)' }}>
            <Github size={20} />
          </a>
          <a href={CONFIG.SOCIALS.LINKEDIN} aria-label="LinkedIn" style={{ color: 'rgba(11,14,20,0.65)' }}>
            <Linkedin size={20} />
          </a>
          <a href={CONFIG.SOCIALS.INSTAGRAM} aria-label="Instagram" style={{ color: 'rgba(11,14,20,0.65)' }}>
            <Instagram size={20} />
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */

const Footer = ({ setView }: { setView: React.Dispatch<React.SetStateAction<ViewState>> }) => (
  <footer className="px-6 py-10" style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-center md:text-left" style={{ color: 'var(--text-faint)' }}>
      <p>© 2026 {CONFIG.NAME}. All rights reserved.</p>
      <div className="flex items-center gap-6">
        <button onClick={() => setView('privacy')} className="hover:opacity-80 inline-flex items-center gap-1.5">
          <ShieldCheck size={13} /> Privacy Policy
        </button>
        <button onClick={() => setView('terms')} className="hover:opacity-80 inline-flex items-center gap-1.5">
          <Scale size={13} /> Terms of Use
        </button>
      </div>
    </div>
  </footer>
);

/* ------------------------------------------------------------------ */
/*  Legal pages                                                         */
/* ------------------------------------------------------------------ */

const LegalPage = ({
  type,
  setView,
}: {
  type: Exclude<ViewState, 'main'>;
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
}) => {
  const content =
    type === 'privacy'
      ? {
          title: 'Privacy Policy',
          body: (
            <div className="space-y-6 text-base leading-relaxed">
              <p>
                This Privacy Policy explains what information this portfolio collects and how it is
                used. It applies to visitors to this website.
              </p>
              <div>
                <h3 className="font-display font-medium text-lg mb-2" style={{ color: 'var(--text)' }}>1. Information collected</h3>
                <p>
                  <strong>Website analytics:</strong> this website uses Vercel Analytics to understand
                  website traffic and improve performance. Vercel may process technical information
                  such as page views, browser or device details, and approximate location in
                  accordance with its own privacy policy.
                </p>
                <p className="mt-2">
                  <strong>Messages:</strong> if you contact me by email, I receive the information
                  you choose to send, such as your name, email address, and message. I use it only
                  to reply and handle your request.
                </p>
              </div>
              <div>
                <h3 className="font-display font-medium text-lg mb-2" style={{ color: 'var(--text)' }}>2. How information is used</h3>
                <p>
                  I do not sell your personal information. Information is used to operate and
                  improve this website, understand basic site usage, and respond to messages.
                </p>
              </div>
              <div>
                <h3 className="font-display font-medium text-lg mb-2" style={{ color: 'var(--text)' }}>3. Third-party services</h3>
                <p>
                  This website is hosted by Vercel and uses Vercel Analytics. Links to GitHub,
                  LinkedIn, Instagram, and other services take you to websites governed by their
                  own terms and privacy policies.
                </p>
              </div>
              <div>
                <h3 className="font-display font-medium text-lg mb-2" style={{ color: 'var(--text)' }}>4. Your choices</h3>
                <p>
                  You can avoid sending personal information by not contacting me. You can also
                  manage cookies and similar technologies through your browser settings. To ask
                  about information sent to me, contact {CONFIG.EMAIL}.
                </p>
              </div>
              <p className="pt-4 text-sm" style={{ borderTop: '1px solid var(--line)', color: 'var(--text-faint)' }}>
                Last updated: August 2026
              </p>
            </div>
          ),
        }
      : {
          title: 'Terms of Service',
          body: (
            <div className="space-y-6 text-base leading-relaxed">
              <p>
                By using this website, you agree to these Terms. If you do not agree, please do not
                use the website or download its materials.
              </p>
              <div>
                <h3 className="font-display font-medium text-lg mb-2" style={{ color: 'var(--text)' }}>1. Intellectual property</h3>
                <p>
                  Unless stated otherwise, the writing, design, photographs, videos, and other
                  content on this site belong to {CONFIG.NAME}. Project source code is generally
                  released under the <strong>MIT License</strong>, but the license for each project
                  is controlled by its repository and license file.
                </p>
              </div>
              <div>
                <h3 className="font-display font-medium text-lg mb-2" style={{ color: 'var(--text)' }}>2. Check the project repository</h3>
                <p>
                  Before using, copying, modifying, or distributing project code, check the
                  corresponding GitHub repository and its LICENSE, README, and other documentation.
                  Those project-specific terms take priority over this summary. If a repository
                  does not include a license, do not assume that its code or assets may be reused.
                </p>
              </div>
              <div>
                <h3 className="font-display font-medium text-lg mb-2" style={{ color: 'var(--text)' }}>3. Responsible use</h3>
                <p>You may not use this website or its materials to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Break the law or infringe someone else&apos;s rights.</li>
                  <li>Remove copyright, attribution, or license notices.</li>
                  <li>Present my work, writing, or media as your own.</li>
                  <li>Use hardware examples without appropriate knowledge, supervision, and safety precautions.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-display font-medium text-lg mb-2" style={{ color: 'var(--text)' }}>4. No warranty</h3>
                <p>
                  This website and its materials are provided &ldquo;as is&rdquo; and &ldquo;as
                  available,&rdquo; without warranties of any kind. Project descriptions are for
                  portfolio and educational purposes. I do not promise that the website, code, or
                  hardware information will be complete, current, error-free, or suitable for a
                  particular purpose.
                </p>
              </div>
              <div>
                <h3 className="font-display font-medium text-lg mb-2" style={{ color: 'var(--text)' }}>5. Liability</h3>
                <p>
                  To the fullest extent permitted by law, {CONFIG.NAME} is not responsible for
                  loss, damage, injury, or other harm resulting from use of this website, its
                  materials, or linked services. Nothing in these Terms excludes rights or
                  protections that cannot legally be excluded.
                </p>
              </div>
              <div>
                <h3 className="font-display font-medium text-lg mb-2" style={{ color: 'var(--text)' }}>6. External links and changes</h3>
                <p>
                  Links to GitHub and other external websites are provided for convenience. I do
                  not control or guarantee those websites. I may update this website or these Terms
                  from time to time; the updated version will be posted here.
                </p>
              </div>
              <p className="pt-4 text-sm" style={{ borderTop: '1px solid var(--line)', color: 'var(--text-faint)' }}>
                Last updated: August 2026
              </p>
            </div>
          ),
        };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-32 sm:pt-36 px-4 sm:px-6 max-w-2xl mx-auto pb-24 sm:pb-28">
      <button
        onClick={() => setView('main')}
        className="text-sm mb-8 underline underline-offset-4"
        style={{ color: 'var(--text-soft)' }}
      >
        ← Back to portfolio
      </button>
      <h1 className="font-display font-semibold text-4xl mb-10" style={{ color: 'var(--text)' }}>{content.title}</h1>
      <div style={{ color: 'var(--text-soft)' }}>
        {content.body}
        <p className="mt-8 text-sm">For inquiries, contact: {CONFIG.EMAIL}</p>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Accessibility widget                                                */
/* ------------------------------------------------------------------ */

const AccessibilityWidget = ({
  a11y,
  setA11y,
}: {
  a11y: A11yState;
  setA11y: React.Dispatch<React.SetStateAction<A11yState>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const resetAll = () =>
    setA11y({
      highContrast: false,
      largeText: false,
      reduceMotion: false,
      textSpacing: false,
      readingMode: false,
      highlightLinks: false,
    });

  const options: { key: keyof A11yState; label: string; icon: React.ReactNode }[] = [
    { key: 'highContrast', label: 'High contrast', icon: <Eye size={18} /> },
    { key: 'largeText', label: 'Large text', icon: <ALargeSmall size={18} /> },
    { key: 'reduceMotion', label: 'Reduce motion', icon: <VideoOff size={18} /> },
    { key: 'readingMode', label: 'Reading mode', icon: <Type size={18} /> },
    { key: 'textSpacing', label: 'Text spacing', icon: <TextSelect size={18} /> },
    { key: 'highlightLinks', label: 'Highlight links', icon: <Link2 size={18} /> },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  return (
    <div ref={widgetRef} className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-16 left-0 p-4 sm:p-5 rounded-2xl shadow-xl mb-2 w-[calc(100vw-2rem)] max-w-72 border"
            style={{ background: 'var(--surface)', borderColor: 'var(--line-strong)' }}
          >
            <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: '1px solid var(--line)' }}>
              <h4 className="text-sm font-medium uppercase tracking-wide flex items-center gap-2" style={{ color: 'var(--text)' }}>
                <Accessibility size={16} /> Accessibility
              </h4>
              <button onClick={resetAll} aria-label="Reset all settings" className="text-xs flex items-center gap-1" style={{ color: 'var(--text-faint)' }}>
                <RefreshCcw size={12} /> Reset
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {options.map((opt) => {
                const active = a11y[opt.key];
                return (
                  <button
                    key={opt.key}
                    onClick={() => setA11y((p) => ({ ...p, [opt.key]: !p[opt.key] }))}
                    className="flex flex-col items-center justify-center gap-1.5 p-3 text-xs text-center rounded-xl border transition-colors"
                    style={{
                      borderColor: active ? 'var(--accent)' : 'var(--line)',
                      background: active ? 'var(--accent-tint)' : 'transparent',
                      color: active ? 'var(--accent)' : 'var(--text-soft)',
                    }}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle accessibility menu"
        aria-expanded={isOpen}
        className="w-12 h-12 rounded-full flex items-center justify-center border shadow-md transition-colors"
        style={{
          background: isOpen ? 'var(--accent)' : 'var(--surface)',
          borderColor: 'var(--line-strong)',
          color: isOpen ? 'var(--bg)' : 'var(--text)',
        }}
      >
        {isOpen ? <X size={20} /> : <Accessibility size={22} />}
      </button>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  App                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  const [view, setView] = useState<ViewState>('main');
  const [a11y, setA11y] = useState<A11yState>({
    highContrast: false,
    largeText: false,
    reduceMotion: false,
    textSpacing: false,
    readingMode: false,
    highlightLinks: false,
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('a11y-large-text', a11y.largeText);
    root.classList.toggle('a11y-reduce-motion', a11y.reduceMotion);
    root.classList.toggle('a11y-text-spacing', a11y.textSpacing);
    root.classList.toggle('a11y-reading-mode', a11y.readingMode);
    root.classList.toggle('a11y-highlight-links', a11y.highlightLinks);
    root.classList.toggle('a11y-contrast', a11y.highContrast);
  }, [a11y]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  return (
    <div className="min-h-screen font-sans" style={{ background: 'var(--bg)' }}>
      <div className={a11y.highContrast ? 'a11y-contrast-wrapper' : ''}>
        <AccessibilityWidget a11y={a11y} setA11y={setA11y} />
        <Navbar setView={setView} />

        <main>
          {view === 'main' ? (
            <>
              <Hero reduceMotion={a11y.reduceMotion} />
              <ProjectsIndex reduceMotion={a11y.reduceMotion} />
              <About reduceMotion={a11y.reduceMotion} />
              <Contact reduceMotion={a11y.reduceMotion} />
            </>
          ) : (
            <LegalPage type={view} setView={setView} />
          )}
        </main>

        <Footer setView={setView} />
      </div>
    </div>
  );
}