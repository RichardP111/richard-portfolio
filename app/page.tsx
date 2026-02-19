'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame, useMotionTemplate } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Cpu, 
  ExternalLink, 
  ChevronRight, 
  X,
  CircuitBoard, 
  ArrowUpRight,
  Activity,
  Move,
  FileText,
  Zap,
  Camera,
  Aperture,
  Maximize,
  Recycle,
  School,
  Menu,
  Instagram,
  Disc,
  ShieldCheck,
  Scale,
  Download,
  Play
} from 'lucide-react';

// --- TYPE DEFINITIONS ---

type Socials = {
  GITHUB: string;
  LINKEDIN: string;
  INSTAGRAM: string;
  DISCORD: string;
};

type Project = {
  title: string;
  description: string;
  tag?: string;
  tech: string[];
  size: string;
  mediaType: 'video' | 'image';
  mediaSrc: string; 
  github?: string; 
  downloadLink?: string;
  schematic?: string; // New field for PDF Schematics
};

type Extracurricular = {
  title: string;
  role: string;
  desc: string;
  icon: React.ReactNode;
  link?: string;
};

type GalleryImage = {
  label: string;
  date: string;
  src: string;
};

type Spark = {
  id: number;
  x: number;
  y: number;
};

type TerminalEntry = {
  type: 'input' | 'output';
  content: string;
};

type ViewState = 'main' | 'privacy' | 'terms';

// Props
type ProfileImageProps = { className?: string };
type ScrambleHoverProps = { text: string; className?: string };
type DecryptedTextProps = { text: string; className?: string; speed?: number; trigger?: boolean };
type AutoGlitchTextProps = { text: string; className?: string };
type ScrollRevealHeaderProps = { text: string; className?: string };
type RevealTextProps = { children: React.ReactNode; delay?: number };
type ParallaxTextProps = { children: React.ReactNode; baseVelocity?: number };
type GlitchTextProps = { text: string };
type MagneticLinkProps = { children: React.ReactNode; href: string; onClick?: React.MouseEventHandler<HTMLAnchorElement>; className?: string };
type MagneticButtonProps = { children: React.ReactNode; className?: string; onClick?: React.MouseEventHandler<HTMLButtonElement> };
type BootSequenceProps = { onComplete: () => void };
type ProjectCardProps = { project: Project; index: number; onClick: () => void }; 
type HoloImageProps = { label: string; date: string; src: string; onClick?: () => void };
type ImageModalProps = { selectedImage: GalleryImage | null; onClose: () => void };
type ProjectModalProps = { selectedProject: Project | null; onClose: () => void }; 
type LifeGalleryProps = { images: GalleryImage[]; onSelect: (img: GalleryImage) => void }; // Updated prop type
type NavbarProps = { setView: React.Dispatch<React.SetStateAction<ViewState>>; socials: Socials };
type FooterProps = { setView: React.Dispatch<React.SetStateAction<ViewState>>; socials: Socials; email: string };
type ContactProps = { email: string; socials: Socials };
type LegalPageProps = { type: Exclude<ViewState, 'main'>; setView: React.Dispatch<React.SetStateAction<ViewState>> };

// --- 0. CENTRAL CONFIGURATION ---
const CONFIG = {
  EMAIL: "richardpu6@gmail.com",
  RESUME: "/resume.pdf",
  PROFILE_IMAGE_SRC: "https://lh3.googleusercontent.com/ogw/AF2bZyjYvPrbBzBEso1zBrRqnjS1KebQ_jxX5FWnn9-xtnkcrdQ=s64-c-mo",
  SOCIALS: {
    GITHUB: "https://github.com/RichardP111",       
    LINKEDIN: "https://www.linkedin.com/in/richard-p-662a87297/",  
    INSTAGRAM: "https://www.instagram.com/_._.richard/", 
    DISCORD: "https://discordapp.com/users/726468579037544448",                      
  },
  PROJECTS: [
    { 
      title: "Smart Chess Board", 
      description: "Inherited and successfully remediated a legacy hardware system. Resolved critical inter-processor communication failures by migrating from unstable GPIO-based signaling to a robust Serial (UART) protocol. Refactored source code on both Raspberry Pi and Arduino platforms to synchronize logic and re-engineered the LED lighting array by correcting hardware polarities and re-soldering connections.", 
      tag: "Hardware Engineering", 
      tech: ["Arduino Uno", "Raspberry Pi", "Neopixels", "OLED Display"], 
      size: "large",
      mediaType: 'video' as const,
      mediaSrc: "/videos/chessBoardVideo.mp4",
      schematic: "/chessSchematic.pdf"
    },
    { 
      title: "Classroom Sentinel", 
      description: "Discord Server Automation. Engineered a robust Python bot to manage server operations. Implemented asynchronous moderation filters, automated role hierarchies, and developed interactive engagement modules to foster community activity.", 
      tag: "Software Dev", 
      tech: ["Python", "Discord.py"], 
      size: "small",
      mediaType: 'image' as const,
      mediaSrc: "/images/discordBot.png",
      github: "https://github.com/RichardP111/Discord_Bot" 
    },
    { 
      title: "BenumTD", 
      description: "A LibGDX-based Tower Defense game featuring custom vector physics and optimized pathfinding. Built from the ground up to handle complex wave logic and dynamic routing, the game translates classic 'TD' mechanics into a personalized school-themed experience featuring my teacher and peers.", 
      tag: "Java Game", 
      tech: ["Java", "LibGDX", "OOP"], 
      size: "small",
      mediaType: 'image' as const,
      mediaSrc: "/images/benumTD.png",
      github: "https://github.com/RichardP111/BenumTD",
      downloadLink: "/jar/benumTD.jar"
    },
    { 
      title: "Truck Game", 
      description: "Developed a high-speed object avoidance game on an Arduino Uno utilizing the LiquidCrystal library for dynamic 16x2 display updates. Engineered a low-latency coordinate system to handle real-time physics and analog joystick inputs for precise player movement.",
      tag: "Circuit Design", 
      tech: ["Arduino Uno", "Joystick", "LCD 16x2"], 
      size: "small",
      mediaType: 'video' as const,
      mediaSrc: "/videos/truckGameVideo.mp4",
      github: "https://github.com/RichardP111/truck_game/blob/main/UNIT_PROJECT_TRUCK.ino",
      schematic: "/truckGameSchematic.pdf"
    },
    { 
      title: "Memory Matrix", 
      description: "Engineered a reaction-time assessment tool using an Arduino-based I2C architecture to synchronize LED matrices with user inputs. Optimized interrupt service routines to achieve millisecond-precision in measuring pattern retention and cognitive processing speeds.", 
      tag: "Circuit Design", 
      tech: ["Arduino", "I2C", "LED"], 
      size: "small",
      mediaType: 'video' as const,
      mediaSrc: "/videos/memoryGameVideo.mp4",
      github: "https://github.com/RichardP111/memory_game/blob/main/UNIT_PROJECT.ino",
      schematic: "/memoryGameSchematic.pdf"
    },
    { 
      title: "BenumZombs", 
      description: "A scratch-built 2D survival shooter leveraging Java Graphics2D and OOP principles to deliver a high-performance gaming experience. Features custom-engineered vector physics, object-pooling for entity management, and a personalized school-themed asset library.", 
      tag: "Java Game", 
      tech: ["Java", "Graphics2D", "OOP"], 
      size: "small",
      mediaType: 'image' as const,
      mediaSrc: "/images/benumZombsGame.png", 
      github: "https://github.com/RichardP111/BenumZombs",
      downloadLink: "/jar/BenumZombs.jar"
    }
  ],
  EXTRACURRICULARS: [
    { 
      title: "Tech Crew", 
      role: "Co-President", 
      desc: "Lead the technical production for large-scale school productions. Oversee team leadership, training, and live-event troubleshooting.", 
      icon: <Zap size={20} />,
      link: "https://www.instagram.com/tsstechcrew/"
    },
    { 
      title: "Peer Mentor", 
      role: "Executive", 
      desc: "Help support the transition framework for incoming Grade 9s. Design and execute orientation strategies.", 
      icon: <School size={20} />,
      link: "https://www.instagram.com/tss.mentors/"
    },
    { 
      title: "TSS Announcements", 
      role: "Co-President & Social Media Director", 
      desc: "Manage the organizations primary digital communication channels. Curate and broadcast daily announcements.", 
      icon: <Activity size={20} />,
      link: "https://www.instagram.com/tssannouncements/"
    },
    { 
      title: "YRHacks Hackathon", 
      role: "Participant | Computer Vision", 
      desc: "Developed 'EcoLens' with 3 others, a recycling assistant leveraging machine learning.", 
      icon: <Recycle size={20} />,
      link: "https://github.com/zhanglollo/EcoLens"
    }
  ],
  GALLERY: [
    { label: "BenumZombs", date: "JAN 2026", src: "/images/benumZombs.jpg" }, 
    { label: "BenumTD", date: "JUN 2025", src: "/images/benumTD.png" },
    { label: "Smart Chess Board", date: "JAN 2025", src: "/images/chess.png" },
    { label: "Truck Game", date: "NOV 2024", src: "/images/truckGame.png" }
  ]
};

// --- 1. VISUAL PRIMITIVES (Unchanged) ---
const ProfileImage = ({ className = "" }: ProfileImageProps) => {
  if (CONFIG.PROFILE_IMAGE_SRC) {
    return <img src={CONFIG.PROFILE_IMAGE_SRC} alt="Richard Pu" className={`object-cover ${className}`} />;
  }
  return <div className={`bg-indigo-600 flex items-center justify-center font-bold text-white ${className}`}>RP</div>;
};

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[40] opacity-[0.03] mix-blend-overlay">
    <div className="w-full h-full bg-slate-900" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
  </div>
);

const ScanlineOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden opacity-[0.03]">
      <motion.div className="w-full h-[100px] bg-gradient-to-b from-transparent via-white to-transparent" animate={{ top: ['-10%', '110%'] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute' }} />
    </div>
  );
};

const CyberGrid = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none perspective-[500px]">
      <div className="absolute bottom-[-100px] left-[-50%] w-[200%] h-[500px] bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:40px_40px] [transform:rotateX(60deg)] animate-[grid-move_20s_linear_infinite]" />
      <style>{`@keyframes grid-move { 0% { transform: rotateX(60deg) translateY(0); } 100% { transform: rotateX(60deg) translateY(40px); } }`}</style>
    </div>
  );
};

const CircuitBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M10 10 h80 v80 h-80 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-indigo-500" />
          <path d="M50 10 v30 M10 50 h30 M90 50 h-30 M50 90 v-30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-indigo-500" />
          <circle cx="50" cy="50" r="2" fill="currentColor" className="text-cyan-400" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
    </svg>
  </div>
);

const NeuralCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const context = ctx;
    let width = 0; let height = 0; let particles: any[] = [];
    const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    class Particle {
      x: number; y: number; vx: number; vy: number; size: number;
      constructor() { this.x = Math.random() * width; this.y = Math.random() * height; this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5; this.size = Math.random() * 2 + 1; }
      update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > width) this.vx *= -1; if (this.y < 0 || this.y > height) this.vy *= -1; }
      draw() { context.fillStyle = 'rgba(99, 102, 241, 0.4)'; context.beginPath(); context.arc(this.x, this.y, this.size, 0, Math.PI * 2); context.fill(); }
    }
    const animate = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          let dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 150) { context.strokeStyle = `rgba(99, 102, 241, ${1 - dist / 150})`; context.lineWidth = 1; context.beginPath(); context.moveTo(particles[i].x, particles[i].y); context.lineTo(particles[j].x, particles[j].y); context.stroke(); }
        }
      }
      requestAnimationFrame(animate);
    };
    resize(); for (let i = 0; i < 50; i++) particles.push(new Particle()); animate();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

const NeuralNexus = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute w-24 h-24 bg-indigo-500/20 rounded-full blur-xl z-0" />
    <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/50"><Cpu size={32} className="text-white" /></div>
    {[80, 160, 240].map((size, i) => (
      <motion.div key={i} className="absolute border border-indigo-500/30 rounded-full" style={{ width: size, height: size }} animate={{ rotate: 360 }} transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}>
        <div className="absolute w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] top-1/2 -translate-y-1/2 -left-2" />
      </motion.div>
    ))}
  </div>
);

// --- 2. INTERACTION & TEXT COMPONENTS (Mostly Unchanged) ---

const ClickSpark = () => {
  const [sparks, setSparks] = useState<Spark[]>([]);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target;
      if (target instanceof Element && (target.closest('button') || target.closest('a'))) return;
      const newSpark = { id: Date.now(), x: e.clientX, y: e.clientY };
      setSparks(prev => [...prev, newSpark]);
      setTimeout(() => setSparks(prev => prev.filter(s => s.id !== newSpark.id)), 1000);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-[101]">
      <AnimatePresence>{sparks.map(s => (<div key={s.id} className="absolute top-0 left-0" style={{ transform: `translate(${s.x}px, ${s.y}px)` }}>{[...Array(8)].map((_, i) => (<motion.div key={i} initial={{ opacity: 1, x: 0, y: 0, scale: 1 }} animate={{ opacity: 0, x: Math.cos(i * (Math.PI / 4)) * 60, y: Math.sin(i * (Math.PI / 4)) * 60, scale: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]" />))}</div>))}</AnimatePresence>
    </div>
  );
};

const ScrambleHover = ({ text, className }: ScrambleHoverProps) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((char, i) => i < iteration ? text[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };
  return <span onMouseEnter={scramble} className={`${className} cursor-pointer`}>{displayText}</span>;
};

const DecryptedText = ({ text, className, speed = 25, trigger = true }: DecryptedTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((char, i) => i < iteration ? text[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, trigger]);
  return <span className={className}>{displayText}</span>;
};

const AutoGlitchText = ({ text, className }: AutoGlitchTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  useEffect(() => {
    const triggerGlitch = () => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(text.split("").map((char, i) => i < iteration ? text[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    };
    const loop = setInterval(() => { if (Math.random() > 0.8) triggerGlitch(); }, 4000);
    return () => clearInterval(loop);
  }, [text]);
  return <span className={className}>{displayText}</span>;
};

const ScrollRevealHeader = ({ text, className }: ScrollRevealHeaderProps) => {
  const [hasViewed, setHasViewed] = useState(false);
  return <motion.div onViewportEnter={() => setHasViewed(true)} viewport={{ once: true, margin: "-100px" }}><DecryptedText text={text} className={className} trigger={hasViewed} /></motion.div>;
};

const RevealText = ({ children, delay = 0 }: RevealTextProps) => (
  <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>{children}</motion.div>
);

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ParallaxText = ({ children, baseVelocity = 100 }: ParallaxTextProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v: number) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });
  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap mb-12 opacity-30 select-none pointer-events-none" aria-hidden="true">
      <motion.div className="flex whitespace-nowrap text-4xl md:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-500/20 to-cyan-500/20" style={{ x }}>
        {[...Array(4)].map((_, i) => <span key={i} className="block mr-12">{children}</span>)}
      </motion.div>
    </div>
  );
};

const GlitchText = ({ text }: GlitchTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((char, i) => i < iteration ? text[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };
  return <span onMouseEnter={scramble} className="cursor-default hover:text-indigo-400 transition-colors interactive">{displayText}</span>;
};

// --- 3. UI COMPONENTS (Unchanged) ---

const CursorFollower = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return <motion.div className="fixed top-0 left-0 w-8 h-8 border border-indigo-500/50 rounded-full pointer-events-none z-[100] hidden md:flex items-center justify-center mix-blend-screen" animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }} transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}><div className="w-1 h-1 bg-indigo-400 rounded-full opacity-50" /></motion.div>;
};

const SystemHUD = () => {
  const [time, setTime] = useState("");
  const { scrollY } = useScroll();
  const [scrollVel, setScrollVel] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString([], { hour12: false })), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => scrollY.onChange((v: number) => setScrollVel(Math.abs(v - (scrollY.getPrevious() || 0)))), [scrollY]);
  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col gap-2 font-mono text-[10px] text-indigo-400/60 pointer-events-none select-none mix-blend-plus-lighter">
      <div className="flex items-center gap-2 border-b border-indigo-500/20 pb-1 mb-1 justify-between"><div className="flex items-center gap-2"><Activity size={12} className="animate-pulse" /><span>SYS.MONITOR // v15.0</span></div><div className="relative w-4 h-4 rounded-full border border-indigo-500/50 overflow-hidden"><div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_deg,rgba(99,102,241,0.5)_360deg)] animate-[spin_2s_linear_infinite]" /></div></div>
      <div className="grid grid-cols-2 gap-x-4"><span>VEL.S: {scrollVel.toFixed(0)} px/f</span><span>TIME: {time}</span><span>CORE: STABLE</span><span>ONLINE: TRUE</span></div>
    </div>
  );
};

const MagneticLink = ({ children, onClick, href, className = "" }: MagneticLinkProps) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const node = ref.current;
    if (!node) return;
    const r = node.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.3, y: (e.clientY - (r.top + r.height / 2)) * 0.3 });
  };
  return <motion.a href={href} ref={ref} onClick={onClick} className={`${className} interactive inline-block`} animate={{ x: pos.x, y: pos.y }} transition={{ type: "spring", stiffness: 200, damping: 10 }} onMouseMove={handleMouse} onMouseLeave={() => setPos({ x: 0, y: 0 })}>{children}</motion.a>;
};

const MagneticButton = ({ children, className = "", onClick }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const node = ref.current;
    if (!node) return;
    const r = node.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.2, y: (e.clientY - (r.top + r.height / 2)) * 0.2 });
  };
  return <motion.button ref={ref} className={`${className} interactive`} animate={{ x: pos.x, y: pos.y }} transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }} onMouseMove={handleMouse} onMouseLeave={() => setPos({ x: 0, y: 0 })} onClick={onClick}>{children}</motion.button>;
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 origin-left z-[60]" style={{ scaleX }} />;
};

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const bootText = ["INITIALIZING KERNEL...", "LOADING MEMORY MODULES... [OK]", "VERIFYING KEYS... [OK]", "ESTABLISHING SECURE CONNECTION...", "MOUNTING FILE SYSTEM...", "STARTING RICHARD.OS v15.0", "ACCESS GRANTED"];
  useEffect(() => {
    let currentLines: string[] = [];
    bootText.forEach((text, index) => { setTimeout(() => { currentLines.push(text); setLines([...currentLines]); if (index === bootText.length - 1) setTimeout(onComplete, 500); }, (index + 1) * 200); });
  }, []);
  return <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-[200] flex items-center justify-center font-mono text-indigo-500 text-sm p-8"><div className="w-full max-w-md">{lines.map((l, i) => <div key={i} className="mb-1">{`> ${l}`}</div>)}<div className="animate-pulse mt-2">_</div></div></motion.div>;
};

// --- 4. PAGE SECTIONS & CONTENT COMPONENTS ---

const DraggableTerminal = () => {
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const cmds = ["RichardOS Kernel v15.0.0 initialized.", "Mounting /usr/richard/skills... [OK]", 'Type "help" for command list.'];
    cmds.forEach((c, i) => setTimeout(() => setHistory(prev => [...prev, { type: 'output', content: c }]), (i + 1) * 500));
  }, []);
  useEffect(() => { if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight; }, [history]);
  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let output = '';
      switch (input.trim().toLowerCase()) {
        case 'help': output = 'Commands: about, projects, skills, contact, clear'; break;
        case 'about': output = 'Computer Engineering Student. Builder of hardware. Lover of code.'; break;
        case 'skills': output = 'Java, Kotlin, C++, Python, React, Circuit Design, Arduino...'; break;
        case 'clear': setHistory([]); setInput(''); return;
        default: output = `Command not found: ${input}`;
      }
      setHistory(prev => [...prev, { type: 'input', content: input }, { type: 'output', content: output }]);
      setInput('');
    }
  };
  return (
    <div className="relative z-40 w-full max-w-2xl mx-auto my-12 h-[350px]">
      <motion.div drag dragMomentum={false} className="absolute top-0 left-0 w-full bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-lg overflow-hidden font-mono text-sm shadow-2xl">
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between cursor-move interactive"><div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" /><div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" /><div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" /></div><span className="text-slate-500 ml-2">guest@richard-pu-portfolio:~</span><Move size={14} className="text-slate-600" /></div>
        <div ref={containerRef} className="p-4 h-64 overflow-y-auto space-y-2 custom-scrollbar cursor-text interactive">
          {history.map((entry, i) => <div key={i} className={entry.type === 'input' ? 'text-indigo-400' : 'text-slate-300'}>{entry.type === 'input' ? '> ' : ''}{entry.content}</div>)}
          <div className="flex items-center text-indigo-400"><span className="mr-2">{'>'}</span><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand} className="bg-transparent border-none outline-none flex-1 interactive" placeholder="enter command..." autoFocus /></div>
          <div ref={bottomRef} />
        </div>
      </motion.div>
    </div>
  );
};

// --- UPDATED PROJECT CARD ---
const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["-5deg", "5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["5deg", "-5deg"]);
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  
  // No longer an 'a' tag, now a button-like div
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={project.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'col-span-1'}>
      <div onClick={onClick} className="block h-full cursor-pointer">
        <motion.div ref={ref} onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => { const node = ref.current; if (!node) return; const r = node.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) / r.width); y.set((e.clientY - r.top - r.height / 2) / r.height); }} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ rotateY, rotateX, transformStyle: "preserve-3d" }} className="group relative h-full w-full overflow-hidden rounded-3xl border border-white/5 bg-slate-900/50 p-1 hover:border-indigo-500/50 interactive">
          <motion.div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ maskImage, WebkitMaskImage: maskImage }} />
          <div className="relative h-full w-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-slate-950 p-6 flex flex-col justify-between">
             <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 opacity-0 group-hover:opacity-50 blur-[2px] animate-[scan-down_1.5s_linear_infinite]" />
             <div>
                <div className="flex items-center justify-between mb-4"><span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-widest text-indigo-400 font-bold border border-white/10">{project.tag}</span><ArrowUpRight size={18} className="text-slate-600 group-hover:text-white" /></div>
                <h3 className="font-bold text-white mb-2 text-xl group-hover:text-indigo-300"><GlitchText text={project.title} /></h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>
             </div>
             <div className="flex flex-wrap gap-2 mt-auto">{project.tech.map(t => <span key={t} className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-white/5">{t}</span>)}</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- NEW PROJECT MODAL COMPONENT ---
const ProjectModal = ({ selectedProject, onClose }: ProjectModalProps) => {
  if (!selectedProject) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      onClick={onClose} 
      // Z-Index higher than everything, fixed position
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      <motion.div 
        layoutId={`project-${selectedProject.title}`} 
        // Constrain max height, added margin top to visually center nicely
        className="relative bg-slate-900 rounded-3xl overflow-hidden max-w-2xl w-full border border-indigo-500/30 shadow-2xl flex flex-col max-h-[85vh] mt-12" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors z-30">
          <X size={20} />
        </button>

        {/* Media Section (Top) */}
        <div className="w-full aspect-video bg-black relative flex items-center justify-center overflow-hidden shrink-0">
          {selectedProject.mediaType === 'video' ? (
             <video 
               src={selectedProject.mediaSrc} 
               controls 
               autoPlay 
               loop
               muted
               className="w-full h-full object-cover"
             >
               Your browser does not support video.
             </video>
          ) : (
             <img 
               src={selectedProject.mediaSrc} 
               alt={selectedProject.title} 
               className="w-full h-full object-cover" 
             />
          )}
        </div>

        {/* Content Section (Scrollable) */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tech.map(t => (
                <span key={t} className="text-xs font-mono text-indigo-400 bg-indigo-900/20 px-2 py-1 rounded border border-indigo-500/20">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="prose prose-invert prose-sm max-w-none text-slate-300 mb-8">
            <p className="leading-relaxed">{selectedProject.description}</p>
          </div>

          {/* Action Buttons (Bottom) */}
          <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t border-white/10">
            {selectedProject.github && (
              <a 
                href={selectedProject.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-bold hover:bg-indigo-50 transition-colors"
              >
                <Github size={20} /> View Source
              </a>
            )}
            
            {selectedProject.downloadLink && (
              <a 
                href={selectedProject.downloadLink} 
                download
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/50 font-bold hover:bg-indigo-600 hover:text-white transition-all"
              >
                <Download size={20} /> Download .JAR
              </a>
            )}

            {/* NEW SCHEMATIC BUTTON */}
            {selectedProject.schematic && (
              <a 
                href={selectedProject.schematic} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/50 font-bold hover:bg-indigo-600 hover:text-white transition-all"
              >
                <FileText size={20} /> View Schematic
              </a>
            )}

            {!selectedProject.github && !selectedProject.downloadLink && !selectedProject.schematic && (
               <div className="text-slate-500 text-sm italic flex items-center gap-2">
                 <ShieldCheck size={16} /> Proprietary / Source Unavailable
               </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- IMAGE MODAL (Gallery) ---
const ImageModal = ({ selectedImage, onClose }: ImageModalProps) => {
  if (!selectedImage) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      onClick={onClose} 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 cursor-zoom-out"
    >
      <motion.div 
        layoutId={`image-${selectedImage.label}`} 
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
      >
        <div 
          className="relative max-w-5xl w-full flex flex-col items-center justify-center pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
           {/* Image Container */}
           <div className="relative w-full max-h-[85vh] flex justify-center overflow-hidden rounded-lg bg-slate-900 border border-indigo-500/30 shadow-2xl">
             {selectedImage.src ? (
               <img 
                 src={selectedImage.src} 
                 alt={selectedImage.label} 
                 className="w-auto h-auto max-w-full max-h-[85vh] object-contain bg-black" 
               />
             ) : (
               <div className="w-full aspect-video bg-gradient-to-br from-indigo-900/20 to-slate-900/20" />
             )}
             
             {/* TEXT OVERLAY (Moved inside so it's never cut off) */}
             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 text-left">
               <h3 className="text-2xl font-bold text-white">{selectedImage.label}</h3>
               <p className="text-indigo-400 font-mono mt-1">{selectedImage.date}</p>
             </div>

             {/* Close button inside the frame, top right */}
             <button 
               onClick={onClose} 
               className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-red-500/80 transition-colors z-30 border border-white/10"
             >
               <X size={24} />
             </button>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ... (HoloImage, Navbar, Footer, Contact, LegalPage remain mostly unchanged)
const HoloImage = ({ label, date, src, onClick }: HoloImageProps) => (
  <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900 interactive cursor-zoom-in" onClick={onClick}>
    <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 mix-blend-color-dodge transition-opacity z-10 pointer-events-none" />
    <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-30 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px]" />
    <div className="aspect-video bg-slate-800 flex items-center justify-center relative overflow-hidden">
      {src ? (
          <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-slate-900/40" />
      )}
      {!src && <Camera size={48} className="text-white/20 group-hover:scale-110 transition-transform duration-500 relative z-10" />}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900 to-transparent z-20">
        <div className="flex justify-between items-end">
           <div><p className="text-[10px] font-mono text-indigo-400 mb-1">{date}</p><p className="text-sm font-bold text-white">{label}</p></div>
           <Maximize size={16} className="text-white/40 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
);

// REFACTORED LIFEGALLERY: Now accepts onSelect prop instead of managing its own state
const LifeGallery = ({ images, onSelect }: LifeGalleryProps) => {
  return (
    <section id="records" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-16"><h2 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Aperture size={16} /> Visual Database</h2><ScrollRevealHeader text="Field Operations & Logs." className="text-4xl md:text-5xl font-bold text-white block" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{images.map((img, i) => (<motion.div key={i} layoutId={`image-${img.label}`} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}><HoloImage label={img.label} date={img.date} src={img.src} onClick={() => onSelect(img)} /></motion.div>))}</div>
    </section>
  );
};

const Navbar = ({ setView, socials }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [{ name: 'Projects', href: '#projects' }, { name: 'About', href: '#about' }, { name: 'Records', href: '#records' }, { name: 'Contact', href: '#contact' }];
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className="flex items-center justify-between w-full max-w-4xl px-6 py-3 rounded-full border border-white/10 backdrop-blur-xl bg-slate-950/80 shadow-2xl">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('main')}><div className="w-8 h-8 rounded-full overflow-hidden border border-indigo-500/50"><ProfileImage className="w-full h-full" /></div><span className="font-bold tracking-tighter text-white hidden sm:block">RICHARD PU</span></div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <MagneticLink key={link.name} href={link.href} onClick={() => setView('main')}>
              <ScrambleHover text={link.name} className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors" />
            </MagneticLink>
          ))}
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-4">
            <a href={CONFIG.RESUME} target="_blank" rel="noopener noreferrer">
              <MagneticButton className="flex items-center gap-2 text-xs font-medium bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white px-3 py-1.5 rounded-full transition-all">
                <FileText size={14} /> RESUME
              </MagneticButton>
            </a>
            <MagneticLink href={socials.GITHUB}><Github size={18} className="text-slate-400 hover:text-white" /></MagneticLink>
            <MagneticLink href={socials.LINKEDIN}><Linkedin size={18} className="text-slate-400 hover:text-white" /></MagneticLink>
          </div>
        </div>
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </motion.div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-24 left-4 right-4 bg-slate-900/95 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 md:hidden z-50 max-h-[80vh] overflow-y-auto custom-scrollbar">
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => <a key={link.name} href={link.href} onClick={() => { setView('main'); setMobileMenuOpen(false); }} className="text-xl font-medium text-white">{link.name}</a>)}
              <div className="flex gap-8 pt-4"><Github size={24} className="text-slate-400" /><Linkedin size={24} className="text-slate-400" /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setView, socials, email }: FooterProps) => (
  <footer className="py-12 bg-slate-950 border-t border-white/5 relative z-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2"><h3 className="text-2xl font-bold text-white mb-4 tracking-tighter">RICHARD PU</h3><p className="text-slate-400 text-sm max-w-md leading-relaxed">Engineering the interface between hardware and software. Specialized in embedded control, circuit restoration, and custom Java software architecture.</p></div>
        <div><h4 className="text-white font-bold mb-4">Connect</h4><ul className="space-y-3 text-sm text-slate-400">
          <li><a href={socials.LINKEDIN} className="hover:text-indigo-400 transition-colors flex items-center gap-2"><Linkedin size={14}/> LinkedIn</a></li>
          <li><a href={socials.GITHUB} className="hover:text-indigo-400 transition-colors flex items-center gap-2"><Github size={14}/> GitHub</a></li>
          <li><a href={socials.INSTAGRAM} className="hover:text-indigo-400 transition-colors flex items-center gap-2"><Instagram size={14}/> Instagram</a></li>
          <li><a href={socials.DISCORD} className="hover:text-indigo-400 transition-colors flex items-center gap-2"><Disc size={14}/> Discord</a></li>
        </ul></div>
        <div><h4 className="text-white font-bold mb-4">Legal</h4><ul className="space-y-3 text-sm text-slate-400"><li><button onClick={() => setView('privacy')} className="hover:text-indigo-400 transition-colors flex items-center gap-2"><ShieldCheck size={14}/> Privacy Policy</button></li><li><button onClick={() => setView('terms')} className="hover:text-indigo-400 transition-colors flex items-center gap-2"><Scale size={14}/> Terms of Service</button></li><li className="flex items-center gap-2 pt-2 opacity-60"><FileText size={14} /> CC BY-NC-SA 4.0</li></ul></div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-slate-500"><p>© 2026 Richard Pu. All hardware synchronized.</p><p>Designed & Engineered in Canada</p></div>
    </div>
  </footer>
);

const Contact = ({ email, socials }: ContactProps) => (
  <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative z-10 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none opacity-20">{[...Array(20)].map((_, i) => <motion.div key={i} className="absolute top-0 w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent" style={{ left: `${Math.random() * 100}%`, height: `${Math.random() * 50 + 20}%` }} animate={{ top: ['-100%', '100%'] }} transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }} />)}</div>
    <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center">
      <div className="absolute top-0 right-0 h-full w-full opacity-10 pointer-events-none"><CircuitBoard size={400} className="absolute -right-20 -top-20" /></div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <ScrollRevealHeader text="Let's build something revolutionary." className="text-4xl md:text-6xl font-black text-white mb-6 block" />
        <p className="text-indigo-100 text-lg mb-12 max-w-xl mx-auto opacity-80">Currently looking for co-op opportunities and project collaborations. Let's talk about hardware, games, or high-performance systems.</p>
        <a href={`mailto:${email}`} className="inline-flex items-center gap-4 text-3xl md:text-5xl font-bold text-white hover:text-indigo-200 transition-all border-b-4 border-white/30 pb-2 mb-16 interactive">{email} <ExternalLink size={32} /></a>
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/20 gap-8">
          <div className="flex items-center gap-8"><a href={socials.GITHUB} className="text-white opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 interactive"><Github size={20} /> GitHub</a><a href={socials.LINKEDIN} className="text-white opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 interactive"><Linkedin size={20} /> LinkedIn</a></div>
          <p className="text-white/40 font-mono text-sm">© 2026 RICHARD PU — COMPUTER ENGINEERING</p>
        </div>
      </motion.div>
    </div>
  </section>
);

const LegalPage = ({ type, setView }: LegalPageProps) => {
  const content = type === 'privacy' ? {
    title: "Privacy Policy",
    body: (
      <div className="space-y-6">
        <p>This Privacy Policy describes how Richard Pu ("we," "us," or "our") collects, uses, and discloses your information when you visit this digital portfolio. We are committed to protecting your privacy and ensuring a secure user experience.</p>
        
        <div>
          <h3 className="text-white font-bold mb-2">1. Information We Collect</h3>
          <p><strong>A. Automatically Collected Information:</strong> We use Vercel Analytics to monitor site performance and improve user experience. This service collects de-identified data such as browser type, operating system, and general geographic data (City/Country level). IP addresses are masked to maintain anonymity.</p>
          <p><strong>B. Voluntary Information:</strong> If you contact us via email, we collect your name, email address, and any information included in your inquiry for professional communication purposes.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">2. Use of Information</h3>
          <p>Data is used exclusively for website optimization, analyzing traffic patterns, and responding to professional inquiries regarding co-op opportunities or project collaborations.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">3. Cookies & Third Parties</h3>
          <p>This Website utilizes Vercel’s privacy-friendly analytics, which function without invasive persistent cookies. We do not sell, trade, or transfer your personally identifiable information to outside parties.</p>
        </div>

        <p className="pt-4 border-t border-white/10 text-xs">Last updated: February 2026</p>
      </div>
    )
    } : {
    title: "Terms of Service",
    body: (
      <div className="space-y-6 text-sm">
        <p>Welcome to the digital portfolio of Richard Pu. By accessing or using this Website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using the site.</p>

        <div>
          <h3 className="text-white font-bold mb-2 uppercase tracking-wider text-xs">1. Intellectual Property Rights</h3>
          <p>Unless otherwise stated, all content on this site—including architectural designs, source code snippets (e.g., EcoLens algorithm, Java game engines), hardware logs, and visual media—is the intellectual property of Richard Pu. Most project code is provided for demonstration purposes and is licensed under <strong>Creative Commons BY-NC-SA 4.0</strong>, meaning you must provide credit and cannot use it for commercial purposes without explicit written consent.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2 uppercase tracking-wider text-xs">2. Use License & Restrictions</h3>
          <p>Permission is granted to temporarily view the materials on this Website for personal, non-commercial transitory viewing only. You may not:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Modify or copy the materials for commercial gain.</li>
            <li>Attempt to decompile or reverse engineer any software contained on the Website.</li>
            <li>Remove any copyright or other proprietary notations from the materials.</li>
            <li>Mirror the materials on any other server without authorization.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2 uppercase tracking-wider text-xs">3. Disclaimer of Liability</h3>
          <p>The materials on this Website are provided on an 'as-is' basis. Richard Pu makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties or conditions of merchantability or fitness for a particular purpose. Hardware projects and circuit designs are documented for portfolio purposes and should not be replicated without proper engineering supervision.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2 uppercase tracking-wider text-xs">4. External Links</h3>
          <p>This Website contains links to external platforms such as GitHub, LinkedIn, and Instagram. We have not reviewed all of the sites linked to our Website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement.</p>
        </div>

        <p className="pt-4 border-t border-white/10 text-xs">Last updated: February 2026</p>
      </div>
    )
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-32 px-6 max-w-3xl mx-auto pb-24">
      <button onClick={() => setView('main')} className="flex items-center gap-2 text-indigo-400 hover:text-white mb-8 transition-colors">
        <ChevronRight size={18} className="rotate-180" /> Back to Portfolio
      </button>
      <h1 className="text-4xl font-bold text-white mb-8">{content.title}</h1>
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-slate-400 leading-relaxed">
        {content.body}
        <p className="mt-6 text-sm">For inquiries, contact: {CONFIG.EMAIL}</p>
      </div>
    </motion.div>
  );
};

// --- 5. MAIN APP ---

export default function App() {
  const [booted, setBooted] = useState(false);
  const [view, setView] = useState<ViewState>('main'); 
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // NEW: Lifted state for Image Gallery
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, [view, booted]);

  const skillCats = [
    { title: "Languages", skills: ["Java", "Python", "C++", "HTML/CSS", "Swift", "Kotlin", "Groovy"] },
    { title: "Hardware & Design", skills: ["Arduino", "Raspberry Pi", "Circuit Design", "3D Design & Printing"] },
    { title: "Tools & Ecosystems", skills: ["VSCode", "Eclipse", "Arduino IDE", "Gradle", "Google Antigravity"] }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden relative">
      <AnimatePresence>{!booted && <BootSequence onComplete={() => setBooted(true)} />}</AnimatePresence>
      <div className={`transition-opacity duration-1000 ${booted ? 'opacity-100' : 'opacity-0'}`}>
        <GrainOverlay /><ClickSpark /><CursorFollower /><ScanlineOverlay /><SystemHUD /><ScrollProgress />
        <Navbar setView={setView} socials={CONFIG.SOCIALS} />
        
        {/* Main Content Area */}
        <main className="relative z-10">
          {view === 'main' ? (
            <>
              <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
                <NeuralCanvas /><div className="absolute bottom-0 left-0 w-full h-[400px] z-0 opacity-40"><CyberGrid /></div>
                <motion.div initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }} className="relative z-10 text-center max-w-4xl pointer-events-none">
                  <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight mb-6 pointer-events-auto"><AutoGlitchText text="RICHARD PU" className="block" /><span className="text-2xl md:text-4xl font-normal text-slate-400 block mt-2">Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-bold">Interface</span> Between Worlds.</span></h1>
                  <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed pointer-events-auto">Computer Engineering Student specializing in custom hardware, low-level embedded software, and full-stack interactive design.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"><a href="#projects" className="px-8 py-4 rounded-full bg-white text-slate-950 font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors w-full sm:w-auto">Explore Works <ChevronRight size={18} /></a><a href="#about" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold backdrop-blur-sm hover:bg-white/10 transition-colors w-full sm:w-auto flex items-center justify-center">About Me</a></div>
                </motion.div>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600"><div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1"><div className="w-1 h-2 bg-slate-700 rounded-full" /></div></motion.div>
              </section>

              <ParallaxText baseVelocity={2}>JAVA • PYTHON • C++ • ARDUINO • </ParallaxText>
              
              <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
                <CircuitBackground />
                <div className="mb-16 relative z-10"><h2 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2"><CircuitBoard size={16} /> Technical Projects</h2><ScrollRevealHeader text="Bridging Logic and Physicality." className="text-4xl md:text-5xl font-bold text-white block" /></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  {CONFIG.PROJECTS.map((p, idx) => (
                    <ProjectCard 
                      key={idx} 
                      project={p} 
                      index={idx} 
                      onClick={() => setSelectedProject(p)} 
                    />
                  ))}
                </div>
              </section>

              <ParallaxText baseVelocity={-2}>3D DESIGN • PRINTING • CIRCUIT DESIGN • </ParallaxText>
              
              <section id="about" className="py-24 px-6 bg-slate-950/50 relative z-10 overflow-hidden"><div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"><motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><ScrollRevealHeader text="Bridging the Gap" className="text-4xl font-bold text-white mb-8" /><RevealText delay={0.2}><p className="text-slate-400 text-lg mb-6 leading-relaxed">My approach to engineering is centered on the integration of hardware and software systems. I am driven by a need to understand the entire technical stack, from low-level circuit design and PCB-level interactions to high-level application logic and system architecture.</p></RevealText><div className="space-y-6 mb-8">{skillCats.map((cat) => (<div key={cat.title}><h4 className="text-xs font-mono text-indigo-400 mb-2 uppercase">{cat.title}</h4><div className="flex flex-wrap gap-2">{cat.skills.map(skill => (<span key={skill} className="text-xs font-medium bg-white/5 text-slate-300 px-3 py-1.5 rounded-full border border-white/5 hover:bg-indigo-600 transition-colors cursor-default">{skill}</span>))}</div></div>))}</div><DraggableTerminal /></motion.div><div className="relative aspect-square rounded-3xl bg-slate-900 border border-indigo-500/20 flex items-center justify-center overflow-hidden group"><NeuralNexus /><div className="absolute inset-4 border border-indigo-500/10 rounded-2xl pointer-events-none" /></div></div></section>
              
              {/* Pass state setter to LifeGallery */}
              <LifeGallery images={CONFIG.GALLERY} onSelect={setSelectedImage} />
              
              <section id="extras" className="py-24 px-6 max-w-7xl mx-auto relative z-10"><div className="mb-16"><h2 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Activity size={16} /> Operations & Leadership</h2><ScrollRevealHeader text="Beyond the IDE." className="text-4xl md:text-5xl font-bold text-white tracking-tight block" /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{CONFIG.EXTRACURRICULARS.map((item, idx) => (<motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="group flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all interactive h-full"><div className="p-3 rounded-xl bg-slate-900 text-indigo-400 group-hover:text-indigo-300 transition-all">{item.icon}</div><div><h4 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-200 transition-colors">{item.title}</h4><p className="text-xs font-mono text-indigo-400 mb-2 uppercase tracking-wide">{item.role}</p><p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p></div></motion.div>))}</div></section>
              
              <Contact email={CONFIG.EMAIL} socials={CONFIG.SOCIALS} />
            </>
          ) : (
            <LegalPage type={view} setView={setView} />
          )}
        </main>
        
        <Footer setView={setView} socials={CONFIG.SOCIALS} email={CONFIG.EMAIL} />

        {/* MODALS: MOVED OUTSIDE MAIN TO FIX Z-INDEX */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal 
              selectedProject={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
          {selectedImage && (
             <ImageModal 
               selectedImage={selectedImage} 
               onClose={() => setSelectedImage(null)} 
             />
          )}
        </AnimatePresence>

      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        body { scrollbar-width: thin; scrollbar-color: #4f46e5 #020617; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #1e1b4b; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #4f46e5; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4f46e5; border-radius: 2px; }
        @keyframes scan-down { 0% { top: -10%; opacity: 0; } 10% { opacity: 0.5; } 90% { opacity: 0.5; } 100% { top: 110%; opacity: 0; } }
      `}} />
    </div>
  );
}