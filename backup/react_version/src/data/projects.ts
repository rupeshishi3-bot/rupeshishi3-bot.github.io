export type ProjectStatusType = 'active' | 'maintenance' | 'rebuilding' | 'partially-built' | 'verifying';

export interface ProjectItem {
  id: string;
  name: string;
  url: string;
  description: string;
  category: 'Web Apps' | 'Developer Tools' | 'AI Utilities';
  status: string;
  statusType: ProjectStatusType;
  featured: boolean;
  featuredOrder?: number;
  tech: string[];
  highlights: string;
  isLive: boolean; // whether the demo button is active or shows status
}

export const ALL_PROJECTS: ProjectItem[] = [
  {
    id: 'printwise',
    name: 'PrintWise',
    url: 'https://printwise.ai.studio/',
    description: 'AI-assisted print formatting, document layout calculation, and ink/paper optimization for high-fidelity physical documents.',
    category: 'Web Apps',
    status: 'Active Preview',
    statusType: 'active',
    featured: true,
    featuredOrder: 1,
    tech: ['React', 'TypeScript', 'AI Layout Engine', 'Canvas'],
    highlights: 'Intelligent print layout scaling and automated export preview.',
    isLive: true,
  },
  {
    id: 'atmos',
    name: 'ATMOS',
    url: 'https://rupeshishi3-bot.github.io/Atmos.in/',
    description: 'Minimalist atmospheric telemetry and real-time weather analytics application featuring dynamic meteorological visualization.',
    category: 'Web Apps',
    status: 'Active Preview',
    statusType: 'active',
    featured: true,
    featuredOrder: 2,
    tech: ['JavaScript', 'OpenWeather API', 'CSS Animations', 'GeoLocation'],
    highlights: 'Instant geo-located climate forecast with atmospheric color shifts.',
    isLive: true,
  },
  {
    id: 'ats-x-ray',
    name: 'ATS X-Ray',
    url: 'https://ats-x-ray-transparent-resume-parser.ai.studio/',
    description: 'Transparent resume parser and ATS compatibility diagnostic tool exposing parsing obstacles and keyword coverage gaps.',
    category: 'AI Utilities',
    status: 'Active Preview',
    statusType: 'active',
    featured: true,
    featuredOrder: 3,
    tech: ['Document Parser', 'NLP Heuristics', 'TypeScript', 'PDF Analysis'],
    highlights: 'Breaks down resume readability scores, hidden tables, and ATS parsing traps.',
    isLive: true,
  },
  {
    id: 'docready',
    name: 'DocReady',
    url: 'https://docready.ai.studio/#purpose-section',
    description: 'Document readiness checklist and compliance verification app ensuring paperwork meets exact submission standards.',
    category: 'Web Apps',
    status: 'Active Preview',
    statusType: 'active',
    featured: true,
    featuredOrder: 4,
    tech: ['React', 'Form Logic', 'Checklist Engine', 'PWA'],
    highlights: 'Multi-criteria document checklist with instant validation indicators.',
    isLive: true,
  },
  {
    id: 'projectflows',
    name: 'ProjectFlows',
    url: 'https://projectflows.ai.studio/',
    description: 'Workflow dependency map and roadmap visualization engine to coordinate project milestones and parallel sprint tasks.',
    category: 'Developer Tools',
    status: 'Under Verification',
    statusType: 'verifying',
    featured: true,
    featuredOrder: 5,
    tech: ['React', 'Workflow Graph', 'State Management', 'SVG Rendering'],
    highlights: 'Interactive milestone graphs and dependency tracking.',
    isLive: true,
  },
  {
    id: '60sec-news',
    name: '60Sec News',
    url: 'https://service-60sec-news-881179795897.asia-southeast1.run.app/',
    description: 'Rapid 60-second news digestion and AI briefing service deployed as a containerized microservice on Google Cloud Run.',
    category: 'AI Utilities',
    status: 'Cloud Run Service',
    statusType: 'verifying',
    featured: false,
    tech: ['Google Cloud Run', 'Node.js', 'AI Summarization', 'FastAPI/REST'],
    highlights: 'Zero-latency concise news roundups refreshed on automated schedules.',
    isLive: true,
  },
  {
    id: 'proofstack',
    name: 'ProofStack',
    url: 'https://proofstack-gamma.vercel.app/',
    description: 'Verification and social proof collection platform designed to capture and display authentic user endorsements.',
    category: 'Developer Tools',
    status: 'Partially Built',
    statusType: 'partially-built',
    featured: false,
    tech: ['Next.js', 'Vercel', 'Tailwind CSS', 'API Integration'],
    highlights: 'Embeddable verification badges; verification flow partially built.',
    isLive: false,
  },
  {
    id: 'stackradar',
    name: 'StackRadar',
    url: 'https://stackradar.rupeshishi3.workers.dev/',
    description: 'Architecture radar and technical stack analyzer deployed on Cloudflare Workers edge network to evaluate engineering choices.',
    category: 'Developer Tools',
    status: 'Needs Fixes',
    statusType: 'maintenance',
    featured: false,
    tech: ['Cloudflare Workers', 'Edge Computing', 'TypeScript', 'Radar Chart'],
    highlights: 'Edge-rendered technology radar; worker routes currently being patched.',
    isLive: false,
  },
  {
    id: 'nexus-ai',
    name: 'NEXUS AI Tools',
    url: 'https://rupeshishi3-bot.github.io/nexus.ai/',
    description: 'Curated intelligence portal and developer directory aggregating specialized AI utilities, APIs, and generative models.',
    category: 'AI Utilities',
    status: 'Needs Fixes',
    statusType: 'maintenance',
    featured: false,
    tech: ['JavaScript', 'HTML5', 'AI Directory', 'CSS Grid'],
    highlights: 'Aggregates generative tools; currently undergoing core UI & route updates.',
    isLive: false,
  },
  {
    id: 'typing-website',
    name: 'Typing Website',
    url: 'https://rupeshishi3-bot.github.io/Typing-Website-by-Rupesh-Ishi/',
    description: 'Speed typing and accuracy test platform with live WPM tracking, accuracy analytics, and layouts tailored for competitive exam practice.',
    category: 'Web Apps',
    status: 'Being Rebuilt',
    statusType: 'rebuilding',
    featured: false,
    tech: ['JavaScript', 'HTML5', 'Web Audio', 'LocalStorage'],
    highlights: 'Real-time keystroke metrics, custom duration tests, and error analysis.',
    isLive: false,
  },
];

export const FEATURED_PROJECTS = ALL_PROJECTS
  .filter((p) => p.featured)
  .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));
