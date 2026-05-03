import React, { useEffect, useRef, useState } from 'react';
import { Github, Mail, ExternalLink, ChevronDown, ArrowLeft, Download } from 'lucide-react';

// Palette
// #f0ece4  off-white    (primary text / sphere dots)
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
      period: 'SEP 2025 – FEB 2026',
      bullets: [
        'Research on knowledge editing and controllability in LLMs and VLMs',
        'Extended knowledge-editing frameworks to multi-modal settings, analyzing faithfulness, locality, and robustness',
      ],
      tech: ['Python', 'PyTorch', 'Transformers', 'BLIP-2', 'Qwen-VL', 'Hugging Face'],
    },
  ],
  passions: [
    { title: 'MACHINE_LEARNING_SYSTEMS', desc: 'How learning algorithms behave as real systems — optimization stability, controllability, and failure modes at scale.' },
    { title: 'ALGORITHMS_&_OPTIMIZATION', desc: 'Classical algorithms, network flow, NP-completeness, and simulation-driven performance analysis.' },
    { title: 'DEVELOPER_TOOLING', desc: 'Clean API design, observability pipelines, and the craft of building systems other engineers enjoy working with.' },
  ],
};

// --- TERMINAL COMMANDS ---
const skillBar = (pct, total = 15) =>
  '█'.repeat(Math.round((pct / 100) * total)) + '░'.repeat(total - Math.round((pct / 100) * total));

const COMMANDS = {
  help: () => [
    '',
    { text: '  Available commands:', heading: true },
    '  ─────────────────────────────────────',
    '  whoami      → identity & status',
    '  projects    → work & builds',
    '  skills      → tech stack',
    '  experience  → work history',
    '  contact     → reach me',
    '  download    → download resume PDF',
    '  resume      → same as download',
    '  portfolio   → open portfolio page',
    '  clear       → clear terminal',
    '  ls          → same as help',
    '  ─────────────────────────────────────',
    '  Tip: try sudo, anime, basketball',
    '',
  ],
  whoami: () => [
    '',
    { text: '  SUMANTHRA RAO YERRABELLY', heading: true },
    '  ─────────────────────────────────────',
    '  Role    → LLMs / AI Engineer',
    '  School  → MS CS @ University of Florida',
    '  Focus   → Multi-agent systems, LLMs, Backend',
    '  GitHub  → github.com/whysuman',
    '',
  ],
  projects: () => [
    '',
    { text: '  [01] AI_GUIDED_MANUFACTURING_COPILOT  ↗', href: 'https://github.com/whysuman/WorkFlowCopilot' },
    '  ─────────────────────────────────────',
    '  › Built multi-agent orchestration backend coordinating LLM agents',
    '    via FastAPI and Celery, replacing manual manufacturing workflows.',
    '  › Implemented RBAC with Casbin and Redis-backed session management',
    '    supporting role-scoped agent task routing.',
    '  › Integrated LangChain pipelines with PostgreSQL audit trails and',
    '    Redis pub/sub for real-time agent state broadcast.',
    '  stack  Python · FastAPI · LangChain · Celery · Redis · PostgreSQL · Casbin · Docker',
    '',
    '',
    { text: '  [02] SUIT_BACKEND — Storage Unit Integrated Tools  ↗', href: 'https://github.com/LRWFromFH/Storage-Unit-Integrated-Tools---SUIT' },
    '  ─────────────────────────────────────',
    '  › Overhauled authentication across 7 OWASP Top 10 vectors including',
    '    bcrypt hashing, JWT with HttpOnly cookies, and CSRF tokens.',
    '  › Built role-based access control middleware in Go/Gin with a',
    '    RoleRequired factory, role constants, and 6 RBAC integration tests.',
    '  › Implemented reservations, insurance upsert, move-out, and tenant',
    '    lockout APIs with 18+ auth test cases.',
    '  stack  Go · Gin · GORM · SQLite · JWT · CSRF · RBAC · REST',
    '',
  ],
  skills: () => [
    '',
    { text: '  LANGUAGE / FRAMEWORK', heading: true },
    `  Python     ${skillBar(85)}  85%`,
    `  FastAPI    ${skillBar(82)}  82%`,
    `  Go         ${skillBar(62)}  62%`,
    `  LangChain  ${skillBar(58)}  58%`,
    '',
    { text: '  DATA / INFRA', heading: true },
    `  Redis      ${skillBar(80)}  80%`,
    `  PostgreSQL ${skillBar(75)}  75%`,
    `  Docker     ${skillBar(72)}  72%`,
    `  Linux      ${skillBar(80)}  80%`,
    '',
  ],
  experience: () => [
    '',
    { text: '  [oct 2024 – jul 2025]  AI_ENGINEER @ AIDENAI', role: true },
    '  ─────────────────────────────────────',
    '  › Designed multi-agent backend services with FastAPI and Celery,',
    '    coordinating LLM workflows across role-scoped task queues.',
    '  › Built RBAC with Casbin, JWT auth, and Redis session management',
    '    supporting concurrent agent operations at scale.',
    '  › Delivered zero production rollbacks across 9 months of continuous',
    '    feature delivery, including API versioning and observability hooks.',
    '  stack  FastAPI · PostgreSQL · Redis · Celery · LangChain · Docker · Casbin',
    '',
    '',
    { text: '  [jul 2024 – sep 2024]  AI_ENGINEER_INTERN @ AIDENAI', role: true },
    '  ─────────────────────────────────────',
    '  › Implemented internal services and integrations for multi-agent',
    '    workflows, contributing to architecture decisions and system design.',
    '  stack  FastAPI · PostgreSQL · Redis · Docker',
    '',
    '',
    { text: '  [sep 2025 – feb 2026]  GRADUATE_RESEARCH_VOLUNTEER @ UF', role: true },
    '  ─────────────────────────────────────',
    '  › Research on knowledge editing and controllability in LLMs and VLMs.',
    '  › Extended knowledge-editing frameworks to multi-modal settings,',
    '    analyzing faithfulness, locality, and robustness.',
    '  stack  Python · PyTorch · Transformers · BLIP-2 · Qwen-VL · Hugging Face',
    '',
  ],
  contact: () => [
    '',
    '  Email   → s.yerrabelly@ufl.edu',
    '  GitHub  → github.com/whysuman',
    '',
  ],
  ls:   () => COMMANDS.help(),
  pwd:  () => ['', '  /home/sumanthra/portfolio', ''],
  clear: () => null,
  portfolio: () => null,
  date: () => ['', `  ${new Date().toString()}`, ''],
  sudo: (args) => {
    const s = args.join(' ');
    if (s.includes('hack'))         return ['', '  Hacking initiated... just kidding.', '  Permission denied. This incident will be reported.', ''];
    if (s.includes('sandwich'))     return ['', '  Fine. 🥪', ''];
    if (s.includes('rm -rf'))       return ['', '  Nice try. Portfolio is read-only.', ''];
    return ['', '  Permission denied.', '  You are not in the sudoers file.', '  This incident will be reported.', ''];
  },
  matrix: () => ['', '  Wake up, Sumanthra...', '  The Matrix has you.', '  Follow the white rabbit. 🐇', ''],
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
  basketball: () => ['', '        .-""-.', '       /  🏀  \\', '      |        |', "       \\      /", "        `-..-`", '  Nothing but net.', ''],
  echo: (args) => ['', `  ${args.join(' ')}`, ''],
  download: () => {
    const a = document.createElement('a');
    a.href = '/DigitalResume/Sumanthra_yerrabelly_2ndMay_SoftwareEngineer.pdf';
    a.download = 'Sumanthra_Yerrabelly_Resume.pdf';
    a.click();
    return ['', '  Downloading resume...', '  Sumanthra_Yerrabelly_Resume.pdf', ''];
  },
  resume: () => COMMANDS.download(),
};

const WELCOME = [
  '',
  '  ┌──────────────────────────────────────────────────┐',
  '  │   PORTFOLIO_OS  v1.0  —  sumanthra@portfolio     │',
  '  └──────────────────────────────────────────────────┘',
  '',
  '  Type  "help"       to see available commands.',
  '  Type  "portfolio"  to open the portfolio page.',
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
    const trail = [];
    const TRAIL_MS = 350;
    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; trail.push({ x: e.clientX, y: e.clientY, time: Date.now() }); };
    window.addEventListener('mousemove', onMouseMove);
    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      while (trail.length > 0 && now - trail[0].time > TRAIL_MS) trail.shift();
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const progress = 1 - (now - p.time) / TRAIL_MS;
        const r = progress * 2.5 + 0.3;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 201, 106, ${progress * 0.85})`; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 201, 106, ${progress * 0.08})`; ctx.fill();
      }
      if (mouse.x !== -999) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 22);
        grad.addColorStop(0, 'rgba(232, 201, 106, 0.35)');
        grad.addColorStop(1, 'rgba(232, 201, 106, 0)');
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240, 236, 228, 0.95)'; ctx.fill();
      }
    };
    animationFrameId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMouseMove); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-[99] pointer-events-none" />;
};

// --- 3D PARTICLE SPHERE ---
const ParticleSphere = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const N = 1500;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const pts = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      const ox = r * Math.cos(theta);
      const oy = y;
      const oz = r * Math.sin(theta);
      return {
        ox, oy, oz,
        curx: ox, cury: oy, curz: oz,
        vx: (Math.random() - 0.5) * 0.004,
        vy: (Math.random() - 0.5) * 0.004,
        vz: (Math.random() - 0.5) * 0.004,
        excitation:  0,
        noiseScale:  0.3 + Math.random() * 1.7,
        springScale: 0.4 + Math.random() * 1.2,
        damping:     0.94 + Math.random() * 0.05,
        // Randomised drift: each excited particle has a slowly rotating preferred direction
        driftAngle:  Math.random() * Math.PI * 2,
        driftSpeed:  (Math.random() - 0.5) * 0.04, // how fast preferred direction rotates
        driftAxis:   Math.random() < 0.5 ? 'xz' : 'yz', // plane of drift rotation
        driftMag:    0.4 + Math.random() * 0.8,    // drift strength multiplier
      };
    });

    const mouse = { x: null, y: null };
    const onMouseMove  = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = null; mouse.y = null; };
    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const TILT       = 0.22;
    const cosT       = Math.cos(TILT), sinT = Math.sin(TILT);
    const INFLUENCE_R = 130; // screen-space radius in px around cursor that stirs particles

    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scx    = canvas.width  / 2;
      const scy    = canvas.height / 2;
      const RADIUS = Math.min(canvas.width, canvas.height) * 0.28;

      // --- Pass 1: project current positions (used for cursor-distance test) ---
      const projected = pts.map((p) => {
        const py = p.cury * cosT - p.curz * sinT;
        const pz = p.cury * sinT + p.curz * cosT;
        const sx = scx + p.curx * RADIUS;
        const sy = scy + py * RADIUS;
        return { sx, sy, z: pz, p };
      });

      // --- Pass 2: per-particle physics with local cursor influence ---
      for (const { sx, sy, p } of projected) {
        // How much does the cursor stir this specific particle?
        let influence = 0;
        if (mouse.x !== null) {
          const dx   = sx - mouse.x;
          const dy   = sy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < INFLUENCE_R) {
            influence = Math.pow(1 - dist / INFLUENCE_R, 1.5); // smooth falloff
          }
        }

        // Excitation builds quickly near cursor, decays very slowly when cursor leaves
        if (influence > 0) {
          p.excitation = Math.min(1, p.excitation + influence * 0.09);
        } else {
          p.excitation *= 0.983; // ~2–3 s to fully calm down → no abrupt stop
        }

        // Spring weakens and noise amplifies proportional to excitation + personality
        const springK  = 0.003 * p.springScale * (1 - p.excitation * 0.78);
        // Excited orbital radius reduced 75% → multiplier drops from 3.2 → 0.8; +30% acceleration
        const noiseAmp = 0.00156 * p.noiseScale  * (1 + p.excitation * 0.8);

        p.vx += (p.ox - p.curx) * springK + (Math.random() - 0.5) * noiseAmp;
        p.vy += (p.oy - p.cury) * springK + (Math.random() - 0.5) * noiseAmp;
        p.vz += (p.oz - p.curz) * springK + (Math.random() - 0.5) * noiseAmp;

        // Randomised drift: each excited particle wanders in its own slowly-rotating direction
        if (p.excitation > 0.05) {
          p.driftAngle += p.driftSpeed;
          const driftForce = p.excitation * 0.000325 * p.driftMag; // +30%
          if (p.driftAxis === 'xz') {
            p.vx += Math.cos(p.driftAngle) * driftForce;
            p.vz += Math.sin(p.driftAngle) * driftForce;
          } else {
            p.vy += Math.cos(p.driftAngle) * driftForce;
            p.vz += Math.sin(p.driftAngle) * driftForce;
          }
        }

        p.vx *= p.damping;
        p.vy *= p.damping;
        p.vz *= p.damping;
        p.curx += p.vx;
        p.cury += p.vy;
        p.curz += p.vz;
      }

      // --- Pass 3: draw back-to-front ---
      projected.sort((a, b) => b.z - a.z);

      // Additive blending: overlapping amber dots add brightness together → natural glow clusters
      ctx.globalCompositeOperation = 'lighter';

      for (const { sx, sy, z } of projected) {
        const depth = Math.max(0, Math.min(1, (1 - z) / 2));
        const alpha = 0.12 + depth * 0.27; // +50% base alpha
        const r     = 0.375 + depth * 0.25;
        // Halo
        ctx.beginPath();
        ctx.arc(sx, sy, r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 201, 106, ${alpha * 0.10})`;
        ctx.fill();
        // Core
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 201, 106, ${alpha})`;
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over'; // reset for cursor trail etc.
    };

    animationFrameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[3] pointer-events-none" />;
};

// --- FLAT PARTICLE FIELD (for terminal + portfolio bg) ---
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
    const COUNT = 70, CONNECT_DIST = 140, MOUSE_DIST = 170;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.8,
    }));
    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240, 236, 228, 0.6)'; ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(240, 236, 228, ${(1 - dist / CONNECT_DIST) * 0.25})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
        if (mouse.x !== null) {
          const dx = particles[i].x - mouse.x, dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_DIST) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(232, 201, 106, ${(1 - dist / MOUSE_DIST) * 0.5})`; ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
      }
    };
    animationFrameId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseleave', onMouseLeave); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />;
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
    let pct = 0, lineIdx = 0;
    const id = setInterval(() => {
      pct += 2; setProgress(Math.min(pct, 100));
      const threshold = Math.floor((lineIdx + 1) * (100 / BOOT_LINES.length));
      if (pct >= threshold && lineIdx < BOOT_LINES.length) { const c = lineIdx; setLines((p) => [...p, BOOT_LINES[c]]); lineIdx++; }
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
const HomePage = ({ onEnter }) => (
  <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center relative overflow-hidden" onClick={onEnter}>

    <ParticleField />

    {/* Subtle grid */}
    <div className="pointer-events-none fixed inset-0 z-[1]" style={{
      backgroundImage: `linear-gradient(rgba(232,201,106,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(232,201,106,0.025) 1px, transparent 1px)`,
      backgroundSize: '64px 64px',
    }} />

    {/* Vignette */}
    <div className="pointer-events-none fixed inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(8,8,8,0.8)_100%)]" />

    {/* Content */}
    <div className="relative z-10 flex flex-col items-center text-center px-6 select-none pointer-events-none">
      <div className="font-mono text-[#8a8278] text-[11px] tracking-[0.35em] mb-8 uppercase">
        LLMs · AI Engineer · UF Gainesville
      </div>

      <h1
        className="text-3xl sm:text-5xl md:text-7xl font-black tracking-wider leading-tight mb-6 text-[#f0ece4]"
        style={{
          fontFamily: "'Orbitron', monospace",
          textShadow: `0 0 15px rgba(232,201,106,0.7), 0 0 35px rgba(232,201,106,0.4), 0 0 70px rgba(232,201,106,0.2)`,
        }}
      >
        <span className="block">{CONFIG.handle[0]}</span>
        <span className="block">{CONFIG.handle[1]}</span>
      </h1>

      <p className="font-mono text-[#8a8278] text-xs tracking-[0.25em] mb-20 uppercase">
        Backend Engineer &nbsp;·&nbsp; AI Researcher &nbsp;·&nbsp; Builder
      </p>

      {/* Click to enter */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#e8c96a]/50" />
        <span className="font-mono text-[#e8c96a] text-xs tracking-[0.4em] animate-pulse">CLICK TO ENTER</span>
      </div>
    </div>
  </div>
);

// --- TERMINAL PAGE ---
const TerminalPage = ({ onBack, onPortfolio }) => {
  const [history, setHistory] = useState([{ type: 'output', lines: WELCOME }]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const runCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const [cmd, ...args] = trimmed.toLowerCase().split(' ');
    setCmdHistory((p) => [trimmed, ...p]);
    setHistoryIdx(-1);

    if (cmd === 'clear')     { setHistory([]); return; }
    if (cmd === 'portfolio') { onPortfolio(); return; }

    const handler = COMMANDS[cmd];
    const lines = handler
      ? handler(args)
      : ['', `  command not found: ${cmd}`, '  type "help" for available commands.', ''];

    setHistory((p) => [...p, { type: 'input', text: trimmed }, { type: 'output', lines: lines || [] }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { runCommand(input); setInput(''); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); const idx = Math.min(historyIdx + 1, cmdHistory.length - 1); setHistoryIdx(idx); setInput(cmdHistory[idx] ?? ''); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); const idx = Math.max(historyIdx - 1, -1); setHistoryIdx(idx); setInput(idx === -1 ? '' : cmdHistory[idx]); }
  };

  return (
    <div className="min-h-screen bg-[#080808] font-mono flex flex-col" onClick={() => inputRef.current?.focus()}>
      <ParticleSphere />
      <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,8,8,0.65)_100%)]" />

      <div className="relative z-20 flex flex-col min-h-screen w-full max-w-5xl mx-auto px-8 py-8">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8 shrink-0">
          <span className="text-[#3a3530] text-xs tracking-widest">PORTFOLIO_OS — sumanthra@portfolio:~</span>
          <button
            onClick={onPortfolio}
            className="text-sm text-[#8a8278] hover:text-[#e8c96a] transition-colors"
          >
            PORTFOLIO →
          </button>
        </div>

        {/* Output */}
        <div className="flex-1 overflow-y-auto space-y-0.5 pb-6" style={{ minHeight: 0 }}>
          {history.map((entry, i) =>
            entry.type === 'input' ? (
              <div key={i} className="flex gap-3 text-base py-1">
                <span className="text-[#e8c96a] shrink-0">sumanthra@portfolio:~$</span>
                <span className="text-[#f0ece4]">{entry.text}</span>
              </div>
            ) : (
              <div key={i}>
                {entry.lines.map((line, j) =>
                  typeof line === 'object' && line.href ? (
                    <div key={j} className="leading-7">
                      <a href={line.href} target="_blank" rel="noreferrer"
                        className="font-mono text-base whitespace-pre text-[#e8c96a] hover:text-[#f0ece4] transition-colors duration-150 inline-block">
                        {line.text}
                      </a>
                    </div>
                  ) : typeof line === 'object' && line.heading ? (
                    <div key={j} className="text-[#f0ece4] text-base whitespace-pre leading-7 font-semibold">{line.text}</div>
                  ) : typeof line === 'object' && line.role ? (
                    <div key={j} className="text-[#e8c96a] text-base whitespace-pre leading-7">{line.text}</div>
                  ) : (
                    <div key={j} className="text-[#8a8278] text-base whitespace-pre leading-7">{line}</div>
                  )
                )}
              </div>
            )
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 border-t border-[#1e1a16] pt-5 shrink-0">
          <span className="text-[#e8c96a] text-base shrink-0">sumanthra@portfolio:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[#f0ece4] text-base outline-none caret-[#e8c96a] placeholder-[#3a3530]"
            placeholder="type a command..."
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
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
  const onMove = (e) => { const r = ref.current.getBoundingClientRect(); setMouse({ x: e.clientX - r.left, y: e.clientY - r.top }); };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setMouse({ x: -999, y: -999 }); }}
      className={`border bg-[#0c0b0a]/80 backdrop-blur-sm p-5 relative overflow-hidden transition-all duration-300 ${hovered ? 'border-[#e8c96a]/20' : 'border-[#1e1a16]'} ${className}`}
      style={hovered ? { boxShadow: '0 0 30px rgba(232,201,106,0.07), 0 0 1px rgba(232,201,106,0.2)' } : {}}>
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', background: `radial-gradient(280px circle at ${mouse.x}px ${mouse.y}px, rgba(232,201,106,0.07), transparent 70%)` }} />
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
          <ul className="space-y-1.5">{item.bullets.map((b, i) => <li key={i} className="flex gap-2 text-xs font-mono text-[#8a8278] leading-relaxed"><span className="text-[#3a3530] shrink-0">›</span>{b}</li>)}</ul>
          <div className="flex flex-wrap gap-1.5 pt-2">{item.tech.map((t) => <span key={t} className="text-[9px] px-1.5 py-0.5 bg-[#1e1a16] text-[#8a8278] border border-[#2a2520] font-mono">{t}</span>)}</div>
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
        <button onClick={onBack} className="flex items-center gap-2 font-mono text-sm text-[#8a8278] hover:text-[#e8c96a] transition-colors group">
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          BACK_TO_TERMINAL
        </button>
      </div>
      <div className="flex flex-col items-center justify-center pt-12 pb-10 px-6 text-center">
        <div className="text-[#3a3530] text-xs mb-3 tracking-widest">_SYS_READY // {CONFIG.role}</div>
        <h1 className="text-xl md:text-3xl font-bold tracking-widest text-[#f0ece4]" style={{ fontFamily: "'Orbitron', monospace", textShadow: '0 0 30px rgba(240,236,228,0.15)' }}>
          {CONFIG.handle.join(' ')}
        </h1>
      </div>
      <div className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-4">

        <BentoCard className="md:col-span-2">
          <CardLabel>whoami</CardLabel>
          <div className="text-[#e8c96a] font-bold text-sm mb-4 tracking-wider">{CONFIG.name}</div>
          <div className="space-y-1.5">{Object.entries(CONFIG.spec).map(([k, v]) => (
            <div key={k} className="flex gap-3 text-xs"><span className="text-[#3a3530] w-20 shrink-0">{k}</span><span className="text-[#3a3530]">→</span><span className="text-[#8a8278]">{v}</span></div>
          ))}</div>
        </BentoCard>

        <BentoCard>
          <CardLabel>contact</CardLabel>
          <div className="space-y-3">
            <a href={`https://github.com/${CONFIG.githubUsername}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#8a8278] hover:text-[#e8c96a] transition-colors text-sm group">
              <Github size={14} /><span>GITHUB</span><ExternalLink size={10} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href={`mailto:${CONFIG.email}`} className="flex items-center gap-2 text-[#8a8278] hover:text-[#e8c96a] transition-colors text-sm">
              <Mail size={14} /><span className="text-xs break-all">{CONFIG.email}</span>
            </a>
            <a href="/DigitalResume/Sumanthra_yerrabelly_2ndMay_SoftwareEngineer.pdf" download="Sumanthra_Yerrabelly_Resume.pdf"
              className="flex items-center gap-2 text-[#8a8278] hover:text-[#e8c96a] transition-colors text-sm group mt-1 pt-3 border-t border-[#1e1a16]">
              <Download size={14} /><span>RESUME.PDF</span><span className="ml-auto text-[9px] text-[#3a3530] group-hover:text-[#e8c96a]/60 transition-colors">↓</span>
            </a>
          </div>
        </BentoCard>

        <BentoCard>
          <CardLabel>work — 01</CardLabel>
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="text-[#f0ece4] font-bold text-sm leading-tight">{CONFIG.projects[0].title}</h3>
            <a href={CONFIG.projects[0].url} target="_blank" rel="noreferrer" className="text-[#3a3530] hover:text-[#e8c96a] transition-colors shrink-0"><ExternalLink size={13} /></a>
          </div>
          <ul className="space-y-1.5 mb-3">{CONFIG.projects[0].bullets.map((b, i) => <li key={i} className="flex gap-1.5 text-[11px] text-[#8a8278] leading-relaxed"><span className="text-[#3a3530] shrink-0 mt-0.5">›</span>{b}</li>)}</ul>
          <div className="flex flex-wrap gap-1.5">{CONFIG.projects[0].tech.map((t) => <span key={t} className="text-[9px] px-1.5 py-0.5 bg-[#1e1a16] text-[#8a8278] border border-[#2a2520] font-mono">{t}</span>)}</div>
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
          <ul className="space-y-1.5 mb-3">{CONFIG.projects[1].bullets.map((b, i) => <li key={i} className="flex gap-1.5 text-[11px] text-[#8a8278] leading-relaxed"><span className="text-[#3a3530] shrink-0 mt-0.5">›</span>{b}</li>)}</ul>
          <div className="flex flex-wrap gap-1.5">{CONFIG.projects[1].tech.map((t) => <span key={t} className="text-[9px] px-1.5 py-0.5 bg-[#1e1a16] text-[#8a8278] border border-[#2a2520] font-mono">{t}</span>)}</div>
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
        {view === 'home'      && <HomePage     onEnter={() => setView('terminal')} />}
        {view === 'terminal'  && <TerminalPage onBack={() => setView('home')} onPortfolio={() => setView('portfolio')} />}
        {view === 'portfolio' && <PortfolioPage onBack={() => setView('terminal')} />}
      </div>
    </div>
  );
}
