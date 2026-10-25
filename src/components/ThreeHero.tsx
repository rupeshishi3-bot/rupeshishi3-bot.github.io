import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowDown, Download, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const ThreeHero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlAvailable, setWebGlAvailable] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGlAvailable(false);
      return;
    }

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.05);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for entire 3D structure
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Part 1: Central geometric core
    const coreGeom = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreGroup.add(coreMesh);

    // Part 2: Inner wireframe cage with electric blue accent
    const wireGeom = new THREE.IcosahedronGeometry(1.62, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const wireMesh = new THREE.Mesh(wireGeom, wireMat);
    coreGroup.add(wireMesh);

    // Part 3: Secondary orbital ring (Torus)
    const ring1Geom = new THREE.TorusGeometry(2.3, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      roughness: 0.15,
      metalness: 0.9,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // Part 4: Third angled ring with cyan accent
    const ring2Geom = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.7,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 5;
    coreGroup.add(ring2);

    // Part 5: Floating data particles lattice
    const particleCount = 180;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.2 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.04,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    coreGroup.add(particles);

    // Lighting rig (balanced 3-point light)
    const keyLight = new THREE.DirectionalLight(0x60a5fa, 3.0);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 2.5);
    rimLight.position.set(-5, -3, -4);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x020617, 0.8);
    scene.add(hemiLight);

    // Mouse / touch tracking for smooth parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      targetX = (clientX / window.innerWidth - 0.5) * 1.2;
      targetY = (clientY / window.innerHeight - 0.5) * 1.2;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Render loop with exponential damping
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      // Smooth camera interpolation
      currentX = THREE.MathUtils.damp(currentX, targetX, 3.5, delta);
      currentY = THREE.MathUtils.damp(currentY, targetY, 3.5, delta);

      camera.position.x = currentX * 1.5;
      camera.position.y = -currentY * 1.2;
      camera.lookAt(0, 0, 0);

      if (!prefersReducedMotion) {
        // Continuous organic rotation
        coreMesh.rotation.y += delta * 0.25;
        coreMesh.rotation.x += delta * 0.15;

        wireMesh.rotation.y += delta * 0.25;
        wireMesh.rotation.x += delta * 0.15;

        ring1.rotation.z += delta * 0.4;
        ring2.rotation.z -= delta * 0.3;

        particles.rotation.y += delta * 0.08;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      wireGeom.dispose();
      wireMat.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center overflow-hidden pt-24 pb-16">
      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-85 transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* Graceful Fallback if WebGL unavailable */}
      {!webGlAvailable && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-[#050508] to-[#050508] z-0" />
      )}

      {/* Geometric background grid overlay */}
      <div className="hero-grid-overlay" aria-hidden="true" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span className="text-xs font-mono text-cyan-300 tracking-wide uppercase">
            Available for Selected Projects &amp; Collaborations
          </span>
        </div>

        {/* Hero Headline */}
        <div className="max-w-3xl mb-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-3">
            Rupesh Bhagwan Ishi
          </h1>
          <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            AI-Assisted Website Builder &amp; Digital Product Creator
          </p>
        </div>

        {/* Concise Introduction */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
          Architecting intelligent web applications, modern design systems, and functional digital
          products through rapid AI-assisted workflows, clean component engineering, and continuous
          iteration.
        </p>

        {/* 3 Primary Action Buttons as required */}
        <div className="flex flex-wrap items-center gap-4 mb-14">
          <button
            type="button"
            onClick={() => scrollTo('#featured-projects')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 hover:-translate-y-0.5"
          >
            <span>Explore Projects</span>
            <ArrowRight size={16} />
          </button>

          <a
            href="/resume.pdf"
            download="Rupesh-Ishi-Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 font-medium text-sm hover:bg-slate-800 hover:border-slate-600 hover:text-white transition-all duration-200 backdrop-blur-sm"
          >
            <Download size={16} className="text-blue-400" />
            <span>Download Resume</span>
          </a>

          <button
            type="button"
            onClick={() => scrollTo('#contact')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-300 font-medium text-sm hover:text-white hover:border-slate-700 hover:bg-slate-800/60 transition-all duration-200"
          >
            <Mail size={16} className="text-purple-400" />
            <span>Contact Me</span>
          </button>
        </div>

        {/* Authentic Proof Strip (No fake vanity scores) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-3xl">
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-mono text-white tracking-tight">10 Projects</span>
            <span className="text-xs text-slate-400 mt-0.5">Live apps, edge workers &amp; prototypes</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-mono text-blue-400 tracking-tight">AI-Assisted</span>
            <span className="text-xs text-slate-400 mt-0.5">Prompt architecture &amp; rapid builds</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold font-mono text-purple-400 tracking-tight">Fast Iteration</span>
            <span className="text-xs text-slate-400 mt-0.5">Transparent status &amp; clean code</span>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <button
        type="button"
        onClick={() => scrollTo('#featured-projects')}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors"
        aria-label="Scroll to featured projects"
      >
        <span className="text-[11px] font-mono tracking-widest uppercase">Explore Work</span>
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  );
};
