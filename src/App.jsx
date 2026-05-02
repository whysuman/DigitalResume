import React, { useEffect, useRef, useState } from 'react';
import { Github, Mail, ExternalLink, ChevronDown, ArrowLeft, Download } from 'lucide-react';

// Palette
// #f0ece4  off-white    (primary text)
// #e8c96a  amber        (accent)
// #8a8278  warm gray    (body / meta)
// #3a3530  dark warm    (dim)
// #1e1a16  very dark    (borders)
// #080808  near-black   (background)

const CONFIG = {
  githubUsername: 'whysuman',
  name: 'SUMANTHRA_RAO_YERRABELLY',
  handle: ['SUMANTHRA RAO', 'YERRABELLY'],
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

// --- TERMINAL COMMANDS ---
const bar = (pct, total = 15) =>
  '█'.repeat(Math.round((pct / 100) * total)) + '░'.repeat(total - Math.round((pct / 100) * total));

const COMMANDS = {
  help: () => [
    '',
    '  Available commands:',
    '  ─────────────────────────────────────',
    '  whoami      → identity & status',
    '  projects    → work & builds',
    '  skills      → tech stack',
    '  experience  → work history',
    '  contact     → reach me',
    '  download    → download resume PDF',
    '  clear       → clear terminal',
    '  ls          → same as help',
    '  ─────────────────────────────────────',
    '  Tip: try sudo, exit, or something fun',
    '',
  ],
  whoami: () => [
    '',
    '  SUMANTHRA RAO YERRABELLY',
    '  ─────────────────────────────────────',
    '  Role    → LLMs / AI Engineer',
    '  School  → MS CS @ University of Florida',
    '  Focus   → Multi-agent systems, LLMs, Backend',
    '  GitHub  → github.com/whysuman',
    '',
  ],
  projects: () => [
    '',
    '  [01] AI_GUIDED_MANUFACTURING_COPILOT',
    '       Multi-agent backend · FastAPI · LangChain · Casbin',
    '       ↗  github.com/whysuman/WorkFlowCopilot',
    '',
    '  [02] SUIT_BACKEND',
    '       Go/Gin RBAC · 7 OWASP fixes · 18+ auth tests',
    '       ↗  github.com/LRWFromFH/Storage-Unit-Integrated-Tools---SUIT',
    '',
  ],
  skills: () => [
    '',
    '  LANGUAGE / FRAMEWORK',
    `  Python     ${bar(85)}  85%`,
    `  FastAPI    ${bar(82)}  82%`,
    `  Go         ${bar(62)}  62%`,
    `  LangChain  ${bar(58)}  58%`,
    '',
    '  DATA / INFRA',
    `  Redis      ${bar(80)}  80%`,
    `  PostgreSQL ${bar(75)}  75%`,
    `  Docker     ${bar(72)}  72%`,
    `  Linux      ${bar(80)}  80%`,
    '',
  ],
  experience: () => [
    '',
    '  [oct 2024 – jul 2025]  AI_ENGINEER @ AIDENAI',
    '  [jul 2024 – sep 2024]  AI_ENGINEER_INTERN @ AIDENAI',
    '  [2024 – present     ]  GRAD_RESEARCH_VOLUNTEER @ UF',
    '',
  ],
  contact: () => [
    '',
    '  Email   → s.yerrabelly@ufl.edu',
    '  GitHub  → github.com/whysuman',
    '',
  ],
  ls: () => COMMANDS.help(),
  pwd: () => ['', '  /home/sumanthra/portfolio', ''],
  clear: () => null,
  exit: () => ['', '  Redirecting to home...', ''],
  date: () => ['', `  ${new Date().toString()}`, ''],
  sudo: (args) => {
    const s = args.join(' ');
    if (s.includes('hack'))              return ['', '  Hacking initiated...', '  Just kidding. Permission denied.', '  This incident will be reported.', ''];
    if (s.includes('sandwich'))          return ['', '  Fine. 🥪', ''];
    if (s.includes('rm -rf'))            return ['', '  Nice try. Portfolio is read-only.', ''];
    return ['', '  Permission denied.', '  You are not in the sudoers file.', '  This incident will be reported.', ''];
  },
  matrix: () => [
    '',
    '  Wake up, Sumanthra...',
    '  The Matrix has you.',
    '  Follow the white rabbit. 🐇',
    '',
  ],
  anime: () => [
    '',
    '  Currently watching / all-time favs:',
    '  ─────────────────────────────────────',
    '  → Fullmetal Alchemist: Brotherhood',
    '  → Attack on Titan',
    '  → Hunter x Hunter',
    '  → Steins;Gate',
    '  → Vinland Saga',
    '',
  ],
  basketball: () => [
    '',
    '        .-""-.',
    '       /  🏀  \\',
    '      |        |',
    '       \\      /',
    '        `-..-`',
    '           |',
    '        Nothing but net.',
    '',
  ],
  echo: (args) => ['', `  ${args.join(' ')}`, ''],
  resume: () => COMMANDS.download(),
  download: () => {
    const a = document.createElement('a');
    a.href = '/DigitalResume/Sumanthra_yerrabelly_2ndMay_SoftwareEngineer.pdf';
    a.download = 'Sumanthra_Yerrabelly_Resume.pdf';
    a.click();
    return ['', '  Downloading resume...', '  Sumanthra_Yerrabelly_Resume.pdf', ''];
  },
};

const WELCOME = [
  '  ┌─────────────────────────────────────────────┐',
  '  │  PORTFOLIO_OS  v1.0  —  sumanthra@portfolio  │',
  '  └─────────────────────────────────────────────┘',
  '',
  '  Type "help" to see available commands.',
  '  Try: whoami · projects · skills · experience',
  '',
];

// --- CURSOR LASER TRAIL ---
const CursorEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: -999, y: -999 };
    const trail = []; // { x, y, time }
    const TRAIL_MS = 350;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    };
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      // Expire old trail points
      while (trail.length > 0 && now - trail[0].time > TRAIL_MS) trail.shift();

      // Draw trail
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const progress = 1 - (now - p.time) / TRAIL_MS; // 1=newest, 0=oldest
        const r = progress * 2.5 + 0.3;

        // Core trail dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 201, 106, ${progress * 0.85})`;
        ctx.fill();

        // Soft glow around trail
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 201, 106, ${progress * 0.08})`;
        ctx.fill();
      }

      // Draw cursor head
      if (mouse.x !== -999) {
        // Outer radial glow
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 22);
        grad.addColorStop(0, 'rgba(232, 201, 106, 0.35)');
        grad.addColorStop(1, 'rgba(232, 201, 106, 0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Bright core dot
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240, 236, 228, 0.95)';
        ctx.fill();
      }
    };

    animationFrameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[99] pointer-events-none" />;
};

// --- PARTICLE FIELD ---
const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const mouse = { x: null, y: null };

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
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

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240, 236, 228, 0.75)';
        ctx.fill();
      }

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
  '> IDENTITY: SUMANTHRA_RAO_YERRABELLY',
  `> ROLE: ${CONFIG.role}`,
  '> _SYS_READY',
];

const BootLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let pct = 0; let lineIdx = 0;
    const id = setInterval(() => {
      pct += 2;
      setProgress(Math.min(pct, 100));
      const threshold = Math.floor((lineIdx + 1) * (100 / BOOT_LINES.length));
      if (pct >= threshold && lineIdx < BOOT_LINES.length) {
        const c = lineIdx; setLines((p) => [...p, BOOT_LINES[c]]); lineIdx++;
      }
      if (pct >= 100) { clearInterval(id); setTimeout(onComplete, 500); }
    }, 25);
    return () => clearInterval(id);
  }, [onComplete]);

  const bar = '█'.repeat(Math.floor(progress / 5)) + '░'.repeat(20 - Math.floor(progress / 5));
  return (
    <div className="fixed inset-0 bg-[#080808] z-[100] flex items-center justify-center p-8">
      <div className="font-mono w-full max-w-lg space-y-2">
        {lines.map((l, i) => <div key={i} className="text-sm text-[#8a8278]">{l}</div>)}
        <div className="pt-4 text-[#e8c96a]">[{bar}] {progress}%</div>
      </div>
    </div>
  );
};

// --- HOME PAGE ---
const HomePage = ({ onNavigate }) => {
  const NAV = [
    { label: 'PORTFOLIO', action: () => onNavigate('portfolio') },
    { label: 'TERMINAL',  action: () => onNavigate('terminal') },
    { label: 'GITHUB',    action: () => window.open(`https://github.com/${CONFIG.githubUsername}`, '_blank') },
    { label: 'CONTACT',   action: () => window.open(`mailto:${CONFIG.email}`) },
  ];

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center relative overflow-hidden">
      <ParticleField />
      <div className="pointer-events-none fixed inset-0 z-[1]" style={{
        backgroundImage: `linear-gradient(rgba(232,201,106,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(232,201,106,0.035) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
      }} />
      <div className="pointer-events-none fixed inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,8,8,0.75)_100%)]" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">
        <div className="font-mono text-[#8a8278] text-[11px] tracking-[0.35em] mb-10 uppercase">
          LLMs · AI Engineer · UF Gainesville
        </div>

        <h1
          className="text-3xl sm:text-5xl md:text-7xl font-black tracking-wider leading-tight mb-6 text-[#f0ece4] text-center"
          style={{
            fontFamily: "'Orbitron', monospace",
            textShadow: `0 0 15px rgba(232,201,106,0.7), 0 0 35px rgba(232,201,106,0.45), 0 0 70px rgba(232,201,106,0.25), 0 0 120px rgba(232,201,106,0.12)`,
          }}
        >
          <span className="block">{CONFIG.handle[0]}</span>
          <span className="block">{CONFIG.handle[1]}</span>
        </h1>

        <p className="font-mono text-[#8a8278] text-xs tracking-[0.25em] mb-16 uppercase">
          Backend Engineer &nbsp;·&nbsp; AI Researcher &nbsp;·&nbsp; Builder
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {NAV.map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              className="font-mono text-xs tracking-[0.2em] border px-8 py-3 transition-all duration-300
                text-[#8a8278] border-[#3a3530]
                hover:text-[#e8c96a] hover:border-[#e8c96a]/50 hover:bg-[#e8c96a]/5
                hover:shadow-[0_0_20px_rgba(232,201,106,0.15)]"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-20 font-mono text-[#3a3530] text-[10px] tracking-widest animate-pulse">
          SUMANTHRA_RAO_YERRABELLY
        </div>
      </div>
    </div>
  );
};

// --- TERMINAL PAGE ---
const TerminalPage = ({ onBack }) => {
  const [history, setHistory] = useState([{ type: 'output', lines: WELCOME }]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const runCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.toLowerCase().split(' ');
    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryIdx(-1);

    const inputEntry = { type: 'input', text: trimmed };

    if (cmd === 'clear') { setHistory([]); return; }
    if (cmd === 'exit')  { onBack(); return; }

    const handler = COMMANDS[cmd];
    const outputLines = handler
      ? handler(args)
      : ['', `  command not found: ${cmd}`, '  type "help" for available commands.', ''];

    setHistory((prev) => [...prev, inputEntry, { type: 'output', lines: outputLines || [] }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(idx);
      setInput(cmdHistory[idx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(idx);
      setInput(idx === -1 ? '' : cmdHistory[idx]);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#080808] font-mono flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <ParticleField />
      <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,8,8,0.6)_100%)]" />

      <div className="relative z-20 flex flex-col min-h-screen max-w-4xl mx-auto w-full px-6 py-8">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs text-[#3a3530] hover:text-[#e8c96a] transition-colors group mb-6 w-fit"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          BACK_TO_HOME
        </button>

        {/* Terminal window */}
        <div className="flex-1 border border-[#1e1a16] bg-[#0a0908]/95 flex flex-col">

          {/* Title bar */}
          <div className="border-b border-[#1e1a16] px-4 py-2.5 flex items-center shrink-0">
            <span className="text-[#3a3530] text-[10px] tracking-widest">
              PORTFOLIO_OS — sumanthra@portfolio:~
            </span>
          </div>

          {/* Output area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-0.5" style={{ minHeight: '400px', maxHeight: 'calc(100vh - 200px)' }}>
            {history.map((entry, i) =>
              entry.type === 'input' ? (
                <div key={i} className="flex gap-2 text-sm py-0.5">
                  <span className="text-[#e8c96a] shrink-0">sumanthra@portfolio:~$</span>
                  <span className="text-[#f0ece4]">{entry.text}</span>
                </div>
              ) : (
                <div key={i}>
                  {entry.lines.map((line, j) => (
                    <div key={j} className="text-[#8a8278] text-sm whitespace-pre leading-relaxed">{line}</div>
                  ))}
                </div>
              )
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input row */}
          <div className="border-t border-[#1e1a16] px-5 py-3 flex items-center gap-2 shrink-0">
            <span className="text-[#e8c96a] text-sm shrink-0">sumanthra@portfolio:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-[#f0ece4] text-sm outline-none caret-[#e8c96a] placeholder-[#3a3530]"
              placeholder="type a command..."
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- BENTO CARD ---
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
      <div className="absolute inset-0 pointer-events-none" style={{
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s',
        background: `radial-gradient(280px circle at ${mouse.x}px ${mouse.y}px, rgba(232,201,106,0.07), transparent 70%)`,
      }} />
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

// --- EXPERIENCE ACCORDION ---
const ExperienceItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1e1a16] last:border-0">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-3 py-3 text-left group">
        <span className="text-[#3a3530] font-mono text-xs shrink-0">{item.id}</span>
        <span className="flex-1 font-mono text-sm text-[#8a8278] group-hover:text-[#f0ece4] transition-colors">{item.title}</span>
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

// --- PORTFOLIO PAGE ---
const PortfolioPage = ({ onBack }) => (
  <div className="min-h-screen bg-[#080808] text-[#f0ece4] font-mono">
    <ParticleField />
    <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,8,8,0.6)_100%)]" />

    <div className="relative z-20">
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <button onClick={onBack} className="flex items-center gap-2 font-mono text-xs text-[#8a8278] hover:text-[#e8c96a] transition-colors group">
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          BACK_TO_HOME
        </button>
      </div>

      <div className="flex flex-col items-center justify-center pt-12 pb-10 px-6 text-center">
        <div className="text-[#3a3530] text-xs mb-3 tracking-widest">_SYS_READY // {CONFIG.role}</div>
        <h1 className="text-xl md:text-3xl font-bold tracking-widest text-[#f0ece4]"
          style={{ fontFamily: "'Orbitron', monospace", textShadow: '0 0 30px rgba(240,236,228,0.15)' }}>
          {CONFIG.handle.join(' ')}
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-4">

        <BentoCard className="md:col-span-2">
          <CardLabel>whoami</CardLabel>
          <div className="text-[#e8c96a] font-bold text-sm mb-4 tracking-wider">{CONFIG.name}</div>
          <div className="space-y-1.5">
            {Object.entries(CONFIG.spec).map(([k, v]) => (
              <div key={k} className="flex gap-3 text-xs">
                <span className="text-[#3a3530] w-20 shrink-0">{k}</span>
                <span className="text-[#3a3530]">→</span>
                <span className="text-[#8a8278]">{v}</span>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard>
          <CardLabel>contact</CardLabel>
          <div className="space-y-3">
            <a href={`https://github.com/${CONFIG.githubUsername}`} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-[#8a8278] hover:text-[#e8c96a] transition-colors text-sm group">
              <Github size={14} /><span>GITHUB</span>
              <ExternalLink size={10} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href={`mailto:${CONFIG.email}`}
              className="flex items-center gap-2 text-[#8a8278] hover:text-[#e8c96a] transition-colors text-sm">
              <Mail size={14} /><span className="text-xs break-all">{CONFIG.email}</span>
            </a>
            <a
              href="/DigitalResume/Sumanthra_yerrabelly_2ndMay_SoftwareEngineer.pdf"
              download="Sumanthra_Yerrabelly_Resume.pdf"
              className="flex items-center gap-2 text-[#8a8278] hover:text-[#e8c96a] transition-colors text-sm group mt-1 pt-3 border-t border-[#1e1a16]"
            >
              <Download size={14} />
              <span>RESUME.PDF</span>
              <span className="ml-auto text-[9px] text-[#3a3530] group-hover:text-[#e8c96a]/60 transition-colors">↓</span>
            </a>
          </div>
        </BentoCard>

        <BentoCard>
          <CardLabel>work — 01</CardLabel>
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="text-[#f0ece4] font-bold text-sm leading-tight">{CONFIG.projects[0].title}</h3>
            <a href={CONFIG.projects[0].url} target="_blank" rel="noreferrer" className="text-[#3a3530] hover:text-[#e8c96a] transition-colors shrink-0"><ExternalLink size={13} /></a>
          </div>
          <ul className="space-y-1.5 mb-3">
            {CONFIG.projects[0].bullets.map((b, i) => (
              <li key={i} className="flex gap-1.5 text-[11px] text-[#8a8278] leading-relaxed">
                <span className="text-[#3a3530] shrink-0 mt-0.5">›</span>{b}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {CONFIG.projects[0].tech.map((t) => <span key={t} className="text-[9px] px-1.5 py-0.5 bg-[#1e1a16] text-[#8a8278] border border-[#2a2520] font-mono">{t}</span>)}
          </div>
        </BentoCard>

        <BentoCard className="md:col-span-2">
          <CardLabel>work — 02</CardLabel>
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="text-[#f0ece4] font-bold text-sm leading-tight">{CONFIG.projects[1].title}</h3>
              <div className="text-[#3a3530] text-[10px] mt-0.5">{CONFIG.projects[1].subtitle}</div>
            </div>
            <a href={CONFIG.projects[1].url} target="_blank" rel="noreferrer" className="text-[#3a3530] hover:text-[#e8c96a] transition-colors shrink-0"><ExternalLink size={13} /></a>
          </div>
          <ul className="space-y-1.5 mb-3">
            {CONFIG.projects[1].bullets.map((b, i) => (
              <li key={i} className="flex gap-1.5 text-[11px] text-[#8a8278] leading-relaxed">
                <span className="text-[#3a3530] shrink-0 mt-0.5">›</span>{b}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {CONFIG.projects[1].tech.map((t) => <span key={t} className="text-[9px] px-1.5 py-0.5 bg-[#1e1a16] text-[#8a8278] border border-[#2a2520] font-mono">{t}</span>)}
          </div>
        </BentoCard>

        <BentoCard className="md:col-span-3">
          <CardLabel>experience</CardLabel>
          {CONFIG.experience.map((item) => <ExperienceItem key={item.id} item={item} />)}
        </BentoCard>

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

// --- ROOT ---
export default function App() {
  const [booted, setBooted] = useState(false);
  const [view, setView] = useState('home');

  return (
    <div className="selection:bg-[#e8c96a] selection:text-[#080808] cursor-none">
      <CursorEffect />
      {!booted && <BootLoader onComplete={() => setBooted(true)} />}
      <div className={`transition-opacity duration-1000 ${booted ? 'opacity-100' : 'opacity-0'}`}>
        {view === 'home'      && <HomePage      onNavigate={(v) => setView(v)} />}
        {view === 'portfolio' && <PortfolioPage onBack={() => setView('home')} />}
        {view === 'terminal'  && <TerminalPage  onBack={() => setView('home')} />}
      </div>
    </div>
  );
}
