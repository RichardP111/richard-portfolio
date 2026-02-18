import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame, useMotionTemplate } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Cpu, 
  Gamepad2, 
  ExternalLink, 
  ChevronRight, 
  ChevronDown,
  Code2, 
  Terminal, 
  Layers, 
  Menu, 
  X,
  CircuitBoard, 
  ArrowUpRight,
  Sparkles,
  Loader2,
  Activity,
  Wifi,
  Move,
  FileText,
  Award,
  Users,
  Zap,
  Camera,
  Aperture,
  Maximize,
  Binary,
  Database,
  Recycle,
  School,
  Radar,
  Bot,
  Globe,
  Smartphone,
  Instagram,
  Disc,
  Printer,
  Box,
  ShieldCheck,
  Scale
} from 'lucide-react';

// --- 0. CENTRAL CONFIGURATION ---
// EDIT THIS SECTION TO UPDATE YOUR CONTENT
const CONFIG = {
  EMAIL: "richardpu6@gmail.com",
  PROFILE_IMAGE_SRC: "", // Paste your image URL here
  SOCIALS: {
    GITHUB: "https://github.com",       // Add your link
    LINKEDIN: "https://linkedin.com",   // Add your link
    INSTAGRAM: "https://instagram.com", // Add your link
    DISCORD: "#",                       // Add your link
  },
  PROJECTS: [
    { 
      title: "Smart Chess Board", 
      description: "Hardware Restoration & Logic Integration. Revitalized a legacy hardware system by diagnosing circuit failures and re-soldering critical logic paths. Integrated an I2C OLED display for real-time game state feedback and programmed Arduino-based logic to interpret physical button inputs and drive LED indicators.", 
      tag: "Hardware Engineering", 
      tech: ["Arduino Uno", "I2C OLED", "Buttons", "C++"], 
      size: "large",
      link: "#" 
    },
    { 
      title: "Classroom Sentinel", 
      description: "Discord Community Automation. Engineered a robust Python bot to manage server operations. Implemented asynchronous moderation filters, automated role hierarchies, and developed interactive engagement modules to foster community activity.", 
      tag: "Software Dev", 
      tech: ["Python", "Discord.py", "AsyncIO", "SQLite"], 
      size: "small",
      link: "#" 
    },
    { 
      title: "BenumTD Strategy", 
      description: "React-Based Tactical Engine. Developed a complex Tower Defense game focusing on state optimization. Implemented A* pathfinding for dynamic enemy routing and custom collision physics, managing complex wave states at 60FPS.", 
      tag: "Web Game", 
      tech: ["React", "JavaScript", "Framer Motion"], 
      size: "small",
      link: "#" 
    },
    { 
      title: "Handheld Truck Game", 
      description: "Embedded Systems Console. Designed and built a portable gaming device using an Arduino Uno. Programmed a custom rendering engine for a 16x2 LCD display, handling analog joystick inputs for real-time object avoidance mechanics.", 
      tag: "Embedded", 
      tech: ["Arduino Uno", "Joystick", "LCD 16x2"], 
      size: "small",
      link: "#" 
    },
    { 
      title: "Memory Matrix", 
      description: "Low-Latency Pattern Hardware. Built a reaction-time benchmark system using I2C protocols. Synchronized LED matrices with user inputs to measure cognitive retention, optimizing interrupt service routines for millisecond-precision.", 
      tag: "Circuit Design", 
      tech: ["Arduino", "I2C", "EEPROM"], 
      size: "small",
      link: "#" 
    },
    { 
      title: "BenumZombs", 
      description: "Java 2D Rendering Engine. Built a top-down survival shooter from scratch without third-party game engines. Utilized Java's Graphics2D and AWT libraries to engineer custom vector physics, object pooling, and rendering pipelines.", 
      tag: "Java Game", 
      tech: ["Java", "Graphics2D", "OOP"], 
      size: "small",
      link: "#" 
    }
  ],
  EXTRACURRICULARS: [
    { 
      title: "Tech Crew", 
      role: "Co-President | Technical Director", 
      desc: "Lead the technical architecture for large-scale school productions. Oversee signal flow design, DMX lighting orchestration, and live-event troubleshooting, managing a team of technicians in high-pressure environments.", 
      icon: <Zap size={20} />,
      link: "#"
    },
    { 
      title: "Peer Mentor", 
      role: "Executive Lead", 
      desc: "Architect the transition framework for incoming Grade 9 cohorts. Design and execute comprehensive orientation strategies, fostering student integration and developing the next generation of student leaders.", 
      icon: <School size={20} />,
      link: "#"
    },
    { 
      title: "TSS Announcements", 
      role: "Co-President & Social Media Director", 
      desc: "Manage the institution's primary digital communication channels. Curate and broadcast daily announcements, bridging the information gap between administration, students, and parents.", 
      icon: <Activity size={20} />,
      link: "#"
    },
    { 
      title: "YRHacks Hackathon", 
      role: "Participant | Computer Vision", 
      desc: "Developed 'EcoLens', a recycling assistant leveraging machine learning. Engineered an image recognition pipeline to classify waste materials and provide real-time disposal guidance.", 
      icon: <Recycle size={20} />,
      link: "#"
    }
  ],
  GALLERY: [
    { label: "Hackathon Finals", date: "NOV 2025", src: "" }, 
    { label: "Robotics Lab V2", date: "SEPT 2025", src: "" },
    { label: "Server Rack Setup", date: "JULY 2025", src: "" },
    { label: "Prototyping Phase", date: "MAY 2025", src: "" }
  ]
};

// --- 1. VISUAL PRIMITIVES ---

const ProfileImage = ({ className = "" }) => {
  if (CONFIG.PROFILE_IMAGE_SRC) {
    return (
      <img 
        src={CONFIG.PROFILE_IMAGE_SRC} 
        alt="Richard Pu" 
        className={`object-cover ${className}`} 
      />
    );
  }
  return (
    <div className={`bg-indigo-600 flex items-center justify-center font-bold text-white ${className}`}>
      RP
    </div>
  );
};

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[40] opacity-[0.03] mix-blend-overlay">
    <div className="w-full h-full bg-slate-900" 
         style={{ 
           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
         }} 
    />
  </div>
);

const ScanlineOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden opacity-[0.03]">
      <motion.div
        className="w-full h-[100px] bg-gradient-to-b from-transparent via-white to-transparent"
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute' }}
      />
    </div>
  );
};

const CyberGrid = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none perspective-[500px]">
      <div className="absolute bottom-[-100px] left-[-50%] w-[200%] h-[500px] bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:40px_40px] [transform:rotateX(60deg)] animate-[grid-move_20s_linear_infinite]" />
      <style>{`
        @keyframes grid-move {
          0% { transform: rotateX(60deg) translateY(0); }
          100% { transform: rotateX(60deg) translateY(40px); }
        }
      `}</style>
    </div>
  );
};

const CircuitBackground = () => {
  return (
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
};

const NeuralCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    class Particle {
      constructor() { this.x = Math.random() * width; this.y = Math.random() * height; this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5; this.size = Math.random() * 2 + 1; }
      update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > width) this.vx *= -1; if (this.y < 0 || this.y > height) this.vy *= -1; }
      draw() { ctx.fillStyle = 'rgba(99, 102, 241, 0.4)'; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
    }
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          let dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 150) { ctx.strokeStyle = `rgba(99, 102, 241, ${1 - dist / 150})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); }
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

// --- 2. INTERACTION & TEXT COMPONENTS ---

const ClickSpark = () => {
  const [sparks, setSparks] = useState([]);
  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.closest('button') || e.target.closest('a')) return;
      const newSpark = { id: Date.now(), x: e.clientX, y: e.clientY };
      setSparks(prev => [...prev, newSpark]);
      setTimeout(() => setSparks(prev => prev.filter(s => s.id !== newSpark.id)), 1000);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-[101]">
      <AnimatePresence>
        {sparks.map(s => (
          <div key={s.id} className="absolute top-0 left-0" style={{ transform: `translate(${s.x}px, ${s.y}px)` }}>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{ opacity: 0, x: Math.cos(i * (Math.PI / 4)) * 60, y: Math.sin(i * (Math.PI / 4)) * 60, scale: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]"
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const ScrambleHover = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((l, i) => i < iteration ? text[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };
  return <span onMouseEnter={scramble} className={`${className} cursor-pointer`}>{displayText}</span>;
};

const DecryptedText = ({ text, className, speed = 25, trigger = true }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((l, i) => i < iteration ? text[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, trigger]);
  return <span className={className}>{displayText}</span>;
};

const AutoGlitchText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  useEffect(() => {
    const triggerGlitch = () => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(text.split("").map((l, i) => i < iteration ? text[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    };
    const loop = setInterval(() => { if (Math.random() > 0.8) triggerGlitch(); }, 4000);
    return () => clearInterval(loop);
  }, [text]);
  return <span className={className}>{displayText}</span>;
};

const ScrollRevealHeader = ({ text, className }) => {
  const [hasViewed, setHasViewed] = useState(false);
  return (
    <motion.div onViewportEnter={() => setHasViewed(true)} viewport={{ once: true, margin: "-100px" }}>
      <DecryptedText text={text} className={className} trigger={hasViewed} />
    </motion.div>
  );
};

const RevealText = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>
    {children}
  </motion.div>
);

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ParallaxText = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);
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
        <span className="block mr-12">{children}</span>
        <span className="block mr-12">{children}</span>
        <span className="block mr-12">{children}</span>
        <span className="block mr-12">{children}</span>
      </motion.div>
    </div>
  );
};

const GlitchText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((l, i) => i < iteration ? text[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };
  return <span onMouseEnter={scramble} className="cursor-default hover:text-indigo-400 transition-colors interactive">{displayText}</span>;
};

// --- 3. UI COMPONENTS ---

const CursorFollower = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
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
  useEffect(() => scrollY.onChange((v) => setScrollVel(Math.abs(v - (scrollY.getPrevious() || 0)))), [scrollY]);
  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col gap-2 font-mono text-[10px] text-indigo-400/60 pointer-events-none select-none mix-blend-plus-lighter">
      <div className="flex items-center gap-2 border-b border-indigo-500/20 pb-1 mb-1 justify-between">
        <div className="flex items-center gap-2"><Activity size={12} className="animate-pulse" /><span>SYS.MONITOR // v15.0</span></div>
        <div className="relative w-4 h-4 rounded-full border border-indigo-500/50 overflow-hidden"><div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_deg,rgba(99,102,241,0.5)_360deg)] animate-[spin_2s_linear_infinite]" /></div>
      </div>
      <div className="grid grid-cols-2 gap-x-4"><span>VEL.S: {scrollVel.toFixed(0)} px/f</span><span>TIME: {time}</span><span>CORE: STABLE</span><span>ONLINE: TRUE</span></div>
    </div>
  );
};

const MagneticLink = ({ children, onClick, href, className = "" }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouse = (e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.3, y: (e.clientY - (r.top + r.height / 2)) * 0.3 });
  };
  return (
    <motion.a href={href} ref={ref} onClick={onClick} className={`${className} interactive inline-block`} animate={{ x: pos.x, y: pos.y }} transition={{ type: "spring", stiffness: 200, damping: 10 }} onMouseMove={handleMouse} onMouseLeave={() => setPos({ x: 0, y: 0 })}>
      {children}
    </motion.a>
  );
};

const MagneticButton = ({ children, className = "", onClick }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouse = (e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.2, y: (e.clientY - (r.top + r.height / 2)) * 0.2 });
  };
  return (
    <motion.button
      ref={ref}
      className={`${className} interactive`}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 origin-left z-[60]" style={{ scaleX }} />;
};

const BootSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const bootText = ["INITIALIZING KERNEL...", "LOADING MEMORY MODULES... [OK]", "VERIFYING CRYPTO KEYS... [OK]", "ESTABLISHING SECURE CONNECTION...", "MOUNTING FILE SYSTEM...", "STARTING RICHARD.OS v15.0", "ACCESS GRANTED"];
  useEffect(() => {
    let currentLines = [];
    bootText.forEach((text, index) => {
      setTimeout(() => {
        currentLines.push(text);
        setLines([...currentLines]);
        if (index === bootText.length - 1) setTimeout(onComplete, 500);
      }, (index + 1) * 200);
    });
  }, []);
  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-[200] flex items-center justify-center font-mono text-indigo-500 text-sm p-8">
      <div className="w-full max-w-md">{lines.map((l, i) => <div key={i} className="mb-1">{`> ${l}`}</div>)}<div className="animate-pulse mt-2">_</div></div>
    </motion.div>
  );
};

// --- 4. PAGE SECTIONS & CONTENT COMPONENTS ---

const DraggableTerminal = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const cmds = ["RichardOS Kernel v15.0.0 initialized.", "Mounting /usr/richard/skills... [OK]", 'Type "help" for command list.'];
    cmds.forEach((c, i) => setTimeout(() => setHistory(prev => [...prev, { type: 'output', content: c }]), (i + 1) * 500));
  }, []);

  useEffect(() => {
    if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
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
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between cursor-move interactive">
          <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" /><div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" /><div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" /></div>
          <span className="text-slate-500 ml-2">guest@richard-pu-portfolio:~</span>
          <Move size={14} className="text-slate-600" />
        </div>
        <div ref={containerRef} className="p-4 h-64 overflow-y-auto space-y-2 custom-scrollbar cursor-text interactive">
          {history.map((entry, i) => <div key={i} className={entry.type === 'input' ? 'text-indigo-400' : 'text-slate-300'}>{entry.type === 'input' ? '> ' : ''}{entry.content}</div>)}
          <div className="flex items-center text-indigo-400"><span className="mr-2">{'>'}</span><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand} className="bg-transparent border-none outline-none flex-1 interactive" placeholder="enter command..." autoFocus /></div>
          <div ref={bottomRef} />
        </div>
      </motion.div>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["-5deg", "5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["5deg", "-5deg"]);
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  
  const Container = project.link ? 'a' : 'div';
  const props = project.link ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={project.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'col-span-1'}>
      <Container {...props} className="block h-full">
      <motion.div ref={ref} onMouseMove={(e) => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) / r.width); y.set((e.clientY - r.top - r.height / 2) / r.height); }} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ rotateY, rotateX, transformStyle: "preserve-3d" }} className="group relative h-full w-full overflow-hidden rounded-3xl border border-white/5 bg-slate-900/50 p-1 hover:border-indigo-500/50 interactive cursor-pointer">
        <motion.div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ maskImage, WebkitMaskImage: maskImage }} />
        <div className="relative h-full w-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-slate-950 p-6 flex flex-col justify-between">
           <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 opacity-0 group-hover:opacity-50 blur-[2px] animate-[scan-down_1.5s_linear_infinite]" />
           <div>
              <div className="flex items-center justify-between mb-4"><span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-widest text-indigo-400 font-bold border border-white/10">{project.tag}</span><ArrowUpRight size={18} className="text-slate-600 group-hover:text-white" /></div>
              <h3 className="font-bold text-white mb-2 text-xl group-hover:text-indigo-300"><GlitchText text={project.title} /></h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>
           </div>
           <div className="flex flex-wrap gap-2 mt-auto">{project.tech.map(t => <span key={t} className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-white/5">{t}</span>)}</div>
        </div>
      </motion.div>
      </Container>
    </motion.div>
  );
};

const HoloImage = ({ label, date, src, onClick }) => (
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

const ImageModal = ({ selectedImage, onClose }) => {
  if (!selectedImage) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out">
      <motion.div layoutId={`image-${selectedImage.label}`} className="relative bg-slate-900 rounded-2xl overflow-hidden max-w-4xl w-full border border-indigo-500/30 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-video bg-slate-800 flex items-center justify-center relative">
           {selectedImage.src ? (
             <img src={selectedImage.src} alt={selectedImage.label} className="absolute inset-0 w-full h-full object-contain bg-black" />
           ) : (
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-slate-900/20" />
           )}
           {!selectedImage.src && <Camera size={96} className="text-white/10" />}
           <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors z-30"><X size={24} /></button>
           <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent z-20"><h3 className="text-3xl font-bold text-white mb-2">{selectedImage.label}</h3><p className="text-indigo-400 font-mono">{selectedImage.date}</p></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const LifeGallery = ({ images }) => {
  const [sel, setSel] = useState(null);
  return (
    <section id="records" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-16"><h2 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Aperture size={16} /> Visual Database</h2><ScrollRevealHeader text="Field Operations & Logs." className="text-4xl md:text-5xl font-bold text-white block" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{images.map((img, i) => (<motion.div key={i} layoutId={`image-${img.label}`} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}><HoloImage label={img.label} date={img.date} src={img.src} onClick={() => setSel(img)} /></motion.div>))}</div>
      <AnimatePresence>{sel && <ImageModal selectedImage={sel} onClose={() => setSel(null)} />}</AnimatePresence>
    </section>
  );
};

const Navbar = ({ setView, socials }) => {
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
            <MagneticButton className="flex items-center gap-2 text-xs font-medium bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white px-3 py-1.5 rounded-full transition-all">
              <FileText size={14} /> RESUME
            </MagneticButton>
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

const Footer = ({ setView, socials, email }) => (
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
      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-slate-500"><p>© 2026 Richard Pu. All hardware synchronized.</p><p>Designed & Engineered in Canada 🇨🇦</p></div>
    </div>
  </footer>
);

const Contact = ({ email, socials }) => (
  <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative z-10 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none opacity-20">{[...Array(20)].map((_, i) => <motion.div key={i} className="absolute top-0 w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent" style={{ left: `${Math.random() * 100}%`, height: `${Math.random() * 50 + 20}%` }} animate={{ top: ['-100%', '100%'] }} transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }} />)}</div>
    <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center">
      <div className="absolute top-0 right-0 h-full w-full opacity-10 pointer-events-none"><CircuitBoard size={400} className="absolute -right-20 -top-20" /></div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <ScrollRevealHeader text="Let's build something revolutionary." className="text-4xl md:text-6xl font-black text-white mb-6 block" />
        <p className="text-indigo-100 text-lg mb-12 max-w-xl mx-auto opacity-80">Currently looking for internship opportunities and project collaborations. Let's talk about hardware, games, or high-performance systems.</p>
        <a href={`mailto:${email}`} className="inline-flex items-center gap-4 text-3xl md:text-5xl font-bold text-white hover:text-indigo-200 transition-all border-b-4 border-white/30 pb-2 mb-16 interactive">{email} <ExternalLink size={32} /></a>
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/20 gap-8">
          <div className="flex items-center gap-8"><a href={socials.GITHUB} className="text-white opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 interactive"><Github size={20} /> GitHub</a><a href={socials.LINKEDIN} className="text-white opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 interactive"><Linkedin size={20} /> LinkedIn</a></div>
          <p className="text-white/40 font-mono text-sm">© 2026 RICHARD PU — COMPUTER ENGINEERING</p>
        </div>
      </motion.div>
    </div>
  </section>
);

const LegalPage = ({ type, setView }) => {
  const content = type === 'privacy' ? {
    title: "Privacy Policy",
    body: "The Operator (Richard Pu) respects the privacy of every visitor. This digital portfolio does not utilize tracking cookies, analytics pixels, or persistent data collection mechanisms. Information submitted via direct email contact is used exclusively for professional communication and is never shared with third-party vendors, advertisers, or data brokers."
  } : {
    title: "Terms of Service",
    body: "By accessing this portfolio, you agree to respect the intellectual property of The Operator. All architectural designs, source code snippets, and custom hardware logs are provided 'as-is' for demonstration purposes. Use of specific project assets, including the EcoLens algorithm and school broadcast workflows, without explicit permission is prohibited. Content is licensed under Creative Commons BY-NC-SA 4.0."
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-32 px-6 max-w-3xl mx-auto pb-24">
      <button onClick={() => setView('main')} className="flex items-center gap-2 text-indigo-400 hover:text-white mb-8 transition-colors"><ChevronRight size={18} className="rotate-180" /> Back to Portfolio</button>
      <h1 className="text-4xl font-bold text-white mb-8">{content.title}</h1>
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-slate-400 leading-relaxed space-y-6"><p>{content.body}</p><p>Last updated: February 2026</p><p>For inquiries, contact: {CONFIG.EMAIL}</p></div>
    </motion.div>
  );
};

// --- 5. MAIN APP ---

export default function App() {
  const [booted, setBooted] = useState(false);
  const [view, setView] = useState('main'); 

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, [view, booted]);

  const skillCats = [
    { title: "Languages", skills: ["Java", "Python", "C++", "HTML/CSS", "Swift", "Kotlin", "Groovy"] },
    { title: "Hardware & Design", skills: ["Arduino", "Raspberry Pi", "Circuit Design", "3D Design & Printing"] },
    { title: "Tools & Ecosystems", skills: ["VS Code", "Eclipse", "Arduino IDE", "Gradle", "Google Antigravity"] }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden relative">
      <AnimatePresence>{!booted && <BootSequence onComplete={() => setBooted(true)} />}</AnimatePresence>
      <div className={`transition-opacity duration-1000 ${booted ? 'opacity-100' : 'opacity-0'}`}>
        <GrainOverlay /><ClickSpark /><CursorFollower /><ScanlineOverlay /><SystemHUD /><ScrollProgress />
        <Navbar setView={setView} socials={CONFIG.SOCIALS} />
        
        <main className="relative z-10">
          {view === 'main' ? (
            <>
              <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
                <NeuralCanvas /><div className="absolute bottom-0 left-0 w-full h-[400px] z-0 opacity-40"><CyberGrid /></div>
                <motion.div initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }} className="relative z-10 text-center max-w-4xl pointer-events-none">
                  <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight mb-6 pointer-events-auto"><AutoGlitchText text="RICHARD PU" className="block" /><span className="text-2xl md:text-4xl font-normal text-slate-400 block mt-2">Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-bold">Interface</span> Between Worlds.</span></h1>
                  <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed pointer-events-auto">Computer Engineering Student specializing in custom hardware restoration, low-level embedded software, and full-stack interactive design.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"><a href="#projects" className="px-8 py-4 rounded-full bg-white text-slate-950 font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors w-full sm:w-auto">Explore Works <ChevronRight size={18} /></a><a href="#about" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold backdrop-blur-sm hover:bg-white/10 transition-colors w-full sm:w-auto flex items-center justify-center">About Me</a></div>
                </motion.div>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600"><div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1"><div className="w-1 h-2 bg-slate-700 rounded-full" /></div></motion.div>
              </section>

              <ParallaxText baseVelocity={2}>JAVA • PYTHON • C++ • ARDUINO • </ParallaxText>
              <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative z-10"><CircuitBackground /><div className="mb-16 relative z-10"><h2 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2"><CircuitBoard size={16} /> Technical Projects</h2><ScrollRevealHeader text="Bridging Logic and Physicality." className="text-4xl md:text-5xl font-bold text-white block" /></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">{CONFIG.PROJECTS.map((p, idx) => <ProjectCard key={idx} project={p} index={idx} />)}</div></section>
              <ParallaxText baseVelocity={-2}>3D DESIGN • PRINTING • CIRCUIT DESIGN • </ParallaxText>
              
              <section id="about" className="py-24 px-6 bg-slate-950/50 relative z-10 overflow-hidden"><div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"><motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><ScrollRevealHeader text="Bridging the Gap" className="text-4xl font-bold text-white mb-8" /><RevealText delay={0.2}><p className="text-slate-400 text-lg mb-6 leading-relaxed">My engineering philosophy is rooted in the "full-stack" of reality. I don't just want to write the code; I want to build the machine that runs it. I seek to understand the entire stack, from the electron flow on a PCB to high-level system logic.</p></RevealText><div className="space-y-6 mb-8">{skillCats.map((cat) => (<div key={cat.title}><h4 className="text-xs font-mono text-indigo-400 mb-2 uppercase">{cat.title}</h4><div className="flex flex-wrap gap-2">{cat.skills.map(skill => (<span key={skill} className="text-xs font-medium bg-white/5 text-slate-300 px-3 py-1.5 rounded-full border border-white/5 hover:bg-indigo-600 transition-colors cursor-default">{skill}</span>))}</div></div>))}</div><DraggableTerminal /></motion.div><div className="relative aspect-square rounded-3xl bg-slate-900 border border-indigo-500/20 flex items-center justify-center overflow-hidden group"><NeuralNexus /><div className="absolute inset-4 border border-indigo-500/10 rounded-2xl pointer-events-none" /></div></div></section>
              
              <LifeGallery images={CONFIG.GALLERY} />
              
              <section id="extras" className="py-24 px-6 max-w-7xl mx-auto relative z-10"><div className="mb-16"><h2 className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Activity size={16} /> Operations & Leadership</h2><ScrollRevealHeader text="Beyond the IDE." className="text-4xl md:text-5xl font-bold text-white tracking-tight block" /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{CONFIG.EXTRACURRICULARS.map((item, idx) => (<motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="group flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all interactive h-full"><div className="p-3 rounded-xl bg-slate-900 text-indigo-400 group-hover:text-indigo-300 transition-all">{item.icon}</div><div><h4 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-200 transition-colors">{item.title}</h4><p className="text-xs font-mono text-indigo-400 mb-2 uppercase tracking-wide">{item.role}</p><p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p></div></motion.div>))}</div></section>
              
              <Contact email={CONFIG.EMAIL} socials={CONFIG.SOCIALS} />
            </>
          ) : (
            <LegalPage type={view} setView={setView} />
          )}
        </main>
        <Footer setView={setView} socials={CONFIG.SOCIALS} email={CONFIG.EMAIL} />
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