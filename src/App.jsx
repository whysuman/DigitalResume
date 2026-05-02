import React, { useEffect, useRef, useState } from 'react';
import { Github, Mail, ExternalLink, ChevronDown } from 'lucide-react';

// Palette: off-white glow + black + amber
// #f0ece4  off-white    (primary text)
// #e8c96a  amber        (accent — headings, hover, active)
// #8a8278  warm gray    (body text)
// #3a3530  dark warm    (dim labels)
// #1e1a16  very dark    (borders)
// #080808  near-black   (background)

const CONFIG = {
  githubUsername: 'whysuman',
  name: 'SUMANTHRA_RAO_YERRABELLY',
  role: 'LLMS/AI_ENGINEER',
  email: 's.yerrabelly@ufl.edu',
  spec: {
    PROCESS:   'Python · Go · FastAPI · LangChain',
    MEMORY:    'PostgreSQL · Redis',
    RUNTIME:   'Docker · GitHub Actions · Linux',
    INTERFACE: 'REST · Celery · WebSockets',
    STATUS:    'MS_CS @ UF_GAINESVILLE [2024–PRESENT]',
  },
  projects: [
    {
      id: '01',
      title: 'AI_GUIDED_MANUFACTURING_COPILOT',
      bullets: [
        'Built multi-agent orchestration backend coordinating LLM agents via FastAPI and Celery, replacing manual manufacturing workflows',
        'Implemented RBAC with Casbin and Redis-backed session management supporting role-scoped agent task routing',
        'Integrated LangChain pipelines with PostgreSQL audit trails and Redis pub/sub for real-time agent state broadcast',
      ],
      tech: ['Python', 'FastAPI', 'LangChain', 'Celery', 'Redis', 'PostgreSQL', 'Casbin', 'Docker'],
      url: 'https://github.com/whysuman/WorkFlowCopilot',
    },
    {
      id: '02',
      title: 'SUIT_BACKEND',
      subtitle: 'Storage Unit Integrated Tools',
      bullets: [
        'Overhauled authentication across 7 OWASP Top 10 vectors including bcrypt hashing, JWT with HttpOnly cookies, and CSRF synchronizer tokens',
        'Built role-based access control middleware in Go/Gin with a RoleRequired factory, role constants, and 6 RBAC integration tests',
        'Implemented reservations, insurance upsert, move-out, and tenant lockout APIs with full test coverage across 18+ auth test cases',
      ],
      tech: ['Go', 'Gin', 'GORM', 'SQLite', 'JWT', 'CSRF', 'RBAC', 'REST'],
      url: 'https://github.com/LRWFromFH/Storage-Unit-Integrated-Tools---SUIT',
    },
  ],
  experience: [
    {
      id: '01',
      title: 'AI_ENGINEER @ AIDENAI',
      period: 'OCT 2024 – JUL 2025',
      bullets: [
        'Designed multi-agent backend services with FastAPI and Celery, coordinating LLM workflows across role-scoped task queues',
        'Built RBAC with Casbin, JWT auth, and Redis session management supporting concurrent agent operations at scale',
        'Delivered zero production rollbacks across 9 months of continuous feature delivery, including API versioning and observability hooks',
      ],
      tech: ['FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'LangChain', 'Docker', 'Casbin'],
    },
    {
      id: '02',
      title: 'AI_ENGINEER_INTERN @ AIDENAI',
      period: 'JUL 2024 – SEP 2024',
      bullets: [
        'Implemented internal services and integrations for multi-agent workflows, contributing to architecture decisions and maintainable system design',
      ],
      tech: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    },
    {
      id: '03',
      title: 'GRADUATE_RESEARCH_VOLUNTEER @ UF',
      period: '2024 – PRESENT',
      bullets: [
        'Research on knowledge editing and controllability in LLMs and VLMs',
        'Extended knowledge-editing frameworks to multi-modal settings, analyzing faithfulness, locality, and robustness',
      ],
      tech: ['Python', 'PyTorch', 'Transformers', 'BLIP-2', 'Qwen-VL', 'Hugging Face'],
    },
  ],
  passions: [
    {
      title: 'MACHINE_LEARNING_SYSTEMS',
      desc: 'How learning algorithms behave as real systems — optimization stability, controllability, and failure modes at scale.',
    },
    {
      title: 'ALGORITHMS_&_OPTIMIZATION',
      desc: 'Classical algorithms, network flow, NP-completeness, and simulation-driven performance analysis.',
    },
    {
      title: 'DEVELOPER_TOOLING',
      desc: 'Clean API design, observability pipelines, and the craft of building systems other engineers enjoy working with.',
    },
  ],
};

// --- PARTICLE FIELD ---
const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const mouse = { x: null, y: null };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = null; mouse.y = null; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const COUNT = 90;
    const CONNECT_DIST = 150;
    const MOUSE_DIST = 180;

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 1,
    }));

    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240, 236, 228, 0.75)';
        ctx.fill();
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(240, 236, 228, ${(1 - dist / CONNECT_DIST) * 0.3})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Amber cursor lines
        if (mouse.x !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(232, 201, 106, ${(1 - dist / MOUSE_DIST) * 0.6})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
};

// --- BOOT LOADER ---
const BOOT_LINES = [
  '> SYSTEM_INIT...',
  '> LOADING MODULES: [FastAPI] [PyTorch] [Go] [Redis]',
  `> IDENTITY: ${CONFIG.name}`,
  `> ROLE: ${CONFIG.role}`,
  '> _SYS_READY',
];

const BootLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let pct = 0;
    let lineIdx = 0;
    const id = setInterval(() => {
      pct += 2;
      setProgress(Math.min(pct, 100));
      const threshold = Math.floor((lineIdx + 1) * (100 / BOOT_LINES.length));
      if (pct >= threshold && lineIdx < BOOT_LINES.length) {
        const captured = lineIdx;
        setLines((prev) => [...prev, BOOT_LINES[captured]]);
        lineIdx++;
      }
      if (pct >= 100) { clearInterval(id); setTimeout(onComplete, 500); }
    }, 25);
    return () => clearInterval(id);
  }, [onComplete]);

  const bar = '█'.repeat(Math.floor(progress / 5)) + '░'.repeat(20 - Math.floor(progress / 5));

  return (
    <div className="fixed inset-0 bg-[#080808] z-[100] flex items-center justify-center p-8">
      <div className="font-mono w-full max-w-lg space-y-2">
        {lines.map((line, i) => <div key={i} className="text-sm text-[#8a8278]">{line}</div>)}
        <div className="pt-4 text-[#e8c96a]">[{bar}] {progress}%</div>
      </div>
    </div>
  );
};

// --- BENTO CARD (hover glow + cursor spotlight trace) ---
const BentoCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: -999, y: -999 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse({ x: -999, y: -999 }); }}
      className={`border bg-[#0c0b0a]/80 backdrop-blur-sm p-5 relative overflow-hidden transition-all duration-300
        ${hovered ? 'border-[#e8c96a]/20' : 'border-[#1e1a16]'} ${className}`}
      style={hovered ? { boxShadow: '0 0 30px rgba(232,201,106,0.07), 0 0 1px rgba(232,201,106,0.2)' } : {}}
    >
      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
          background: `radial-gradient(280px circle at ${mouse.x}px ${mouse.y}px, rgba(232,201,106,0.07), transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

const CardLabel = ({ children }) => (
  <div className="font-mono text-xs mb-3">
    <span className="text-[#e8c96a]">$</span>
    <span className="text-[#8a8278] ml-1.5">{children}</span>
  </div>
);

// --- EXPERIENCE ACCORDION ITEM ---
const ExperienceItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1e1a16] last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 py-3 text-left group"
      >
        <span className="text-[#3a3530] font-mono text-xs shrink-0">{item.id}</span>
        <span className="flex-1 font-mono text-sm text-[#8a8278] group-hover:text-[#f0ece4] transition-colors">
          {item.title}
        </span>
        <span className="text-[#3a3530] font-mono text-xs hidden sm:block shrink-0">{item.period}</span>
        <ChevronDown size={12} className={`text-[#3a3530] shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-64 pb-4' : 'max-h-0'}`}>
        <div className="pl-6 space-y-2">
          <ul className="space-y-1.5">
            {item.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-xs font-mono text-[#8a8278] leading-relaxed">
                <span className="text-[#3a3530] shrink-0">›</span>{b}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {item.tech.map((t) => (
              <span key={t} className="text-[9px] px-1.5 py-0.5 bg-[#1e1a16] text-[#8a8278] border border-[#2a2520] font-mono">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0ece4] font-mono selection:bg-[#e8c96a] selection:text-[#080808]">
      {!booted && <BootLoader onComplete={() => setBooted(true)} />}

      <ParticleField />

      {/* Vignette */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,8,8,0.6)_100%)]" />

      <div className={`relative z-20 transition-opacity duration-1000 ${booted ? 'opacity-100' : 'opacity-0'}`}>

        {/* HERO */}
        <div className="flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center">
          <div className="text-[#3a3530] text-xs mb-5 tracking-widest">_SYS_READY // {CONFIG.role}</div>
          <h1
            className="text-2xl md:text-5xl font-bold tracking-widest mb-3 text-[#f0ece4]"
            style={{ textShadow: '0 0 40px rgba(240,236,228,0.2), 0 0 80px rgba(240,236,228,0.08)' }}
          >
            {CONFIG.name}
          </h1>
          <div className="text-[#e8c96a] text-xs tracking-widest">{CONFIG.role}</div>
        </div>

        {/* BENTO GRID */}
        <div className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">

          {/* WHOAMI — spans 2 cols */}
          <BentoCard className="md:col-span-2">
            <CardLabel>whoami</CardLabel>
            <div className="text-[#e8c96a] font-bold text-sm mb-4 tracking-wider">{CONFIG.name}</div>
            <div className="space-y-1.5">
              {Object.entries(CONFIG.spec).map(([key, value]) => (
                <div key={key} className="flex gap-3 text-xs">
                  <span className="text-[#3a3530] w-20 shrink-0">{key}</span>
                  <span className="text-[#3a3530]">→</span>
                  <span className="text-[#8a8278]">{value}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* CONTACT — 1 col */}
          <BentoCard>
            <CardLabel>contact</CardLabel>
            <div className="space-y-3">
              <a
                href={`https://github.com/${CONFIG.githubUsername}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#8a8278] hover:text-[#e8c96a] transition-colors text-sm group"
              >
                <Github size={14} className="shrink-0" />
                <span>GITHUB</span>
                <ExternalLink size={10} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={`mailto:${CONFIG.email}`}
                className="flex items-center gap-2 text-[#8a8278] hover:text-[#e8c96a] transition-colors text-sm group"
              >
                <Mail size={14} className="shrink-0" />
                <span className="text-xs break-all">{CONFIG.email}</span>
              </a>
            </div>
          </BentoCard>

          {/* PROJECT 01 — 1 col */}
          <BentoCard>
            <CardLabel>work — 01</CardLabel>
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="text-[#f0ece4] font-bold text-sm leading-tight hover:text-[#e8c96a] transition-colors">
                {CONFIG.projects[0].title}
              </h3>
              <a href={CONFIG.projects[0].url} target="_blank" rel="noreferrer"
                className="text-[#3a3530] hover:text-[#e8c96a] transition-colors shrink-0">
                <ExternalLink size={13} />
              </a>
            </div>
            <ul className="space-y-1.5 mb-3">
              {CONFIG.projects[0].bullets.map((b, i) => (
                <li key={i} className="flex gap-1.5 text-[11px] text-[#8a8278] leading-relaxed">
                  <span className="text-[#3a3530] shrink-0 mt-0.5">›</span>{b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {CONFIG.projects[0].tech.map((t) => (
                <span key={t} className="text-[9px] px-1.5 py-0.5 bg-[#1e1a16] text-[#8a8278] border border-[#2a2520] font-mono">{t}</span>
              ))}
            </div>
          </BentoCard>

          {/* PROJECT 02 — spans 2 cols */}
          <BentoCard className="md:col-span-2">
            <CardLabel>work — 02</CardLabel>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-[#f0ece4] font-bold text-sm leading-tight hover:text-[#e8c96a] transition-colors">
                  {CONFIG.projects[1].title}
                </h3>
                <div className="text-[#3a3530] text-[10px] mt-0.5">{CONFIG.projects[1].subtitle}</div>
              </div>
              <a href={CONFIG.projects[1].url} target="_blank" rel="noreferrer"
                className="text-[#3a3530] hover:text-[#e8c96a] transition-colors shrink-0">
                <ExternalLink size={13} />
              </a>
            </div>
            <ul className="space-y-1.5 mb-3">
              {CONFIG.projects[1].bullets.map((b, i) => (
                <li key={i} className="flex gap-1.5 text-[11px] text-[#8a8278] leading-relaxed">
                  <span className="text-[#3a3530] shrink-0 mt-0.5">›</span>{b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {CONFIG.projects[1].tech.map((t) => (
                <span key={t} className="text-[9px] px-1.5 py-0.5 bg-[#1e1a16] text-[#8a8278] border border-[#2a2520] font-mono">{t}</span>
              ))}
            </div>
          </BentoCard>

          {/* EXPERIENCE — full width */}
          <BentoCard className="md:col-span-3">
            <CardLabel>experience</CardLabel>
            {CONFIG.experience.map((item) => (
              <ExperienceItem key={item.id} item={item} />
            ))}
          </BentoCard>

          {/* PASSIONS — 3 cols */}
          {CONFIG.passions.map((p) => (
            <BentoCard key={p.title}>
              <CardLabel>passion</CardLabel>
              <div className="text-[#e8c96a] font-bold text-xs mb-2 tracking-wider">{p.title}</div>
              <p className="text-[#8a8278] text-[11px] leading-relaxed">{p.desc}</p>
            </BentoCard>
          ))}

        </div>
      </div>
    </div>
  );
}
