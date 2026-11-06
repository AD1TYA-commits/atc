import { useEffect, useRef, useState } from 'react';
import './App.css';

// ─── Nav items ───────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'HOME',      hash: '#home' },
  { label: 'EVENTS',    hash: '#events' },
  { label: 'PROJECTS',  hash: '#projects' },
  { label: 'TEAM',      hash: '#team' },
  { label: 'RESOURCES', hash: '#resources' },
] as const;

// ─── Theme helpers ────────────────────────────────────────────
type Theme = 'light' | 'dark';
const STORAGE_KEY = 'atc-theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// ─── Component ────────────────────────────────────────────────
export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Theme state — initialised from localStorage / OS preference
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Active nav hash — driven by URL hash changes + IntersectionObserver
  const [activeHash, setActiveHash] = useState<string>(() =>
    window.location.hash || '#home'
  );

  // 4×4 plus-sign grid in upper-right
  const plusCols = [1422, 1475, 1528, 1580];
  const plusRows = [166, 216, 267, 319];

  // Lower-left subtle dotted grid
  const dotCols: number[] = [];
  for (let x = 12; x <= 270; x += 15.2) dotCols.push(x);
  const dotRows: number[] = [];
  for (let y = 680; y <= 918; y += 15.2) dotRows.push(y);

  // ── Apply theme to <html> and persist ──────────────────────
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // ── Active nav: hashchange + popstate ──────────────────────
  useEffect(() => {
    const syncHash = () => {
      setActiveHash(window.location.hash || '#home');
    };

    // Fire on hash changes (anchor clicks, browser back/fwd)
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);

    // IntersectionObserver for scroll-based detection.
    // We only have one real page section (#home) but we register
    // any section-like landmarks that may exist in the DOM.
    const sectionIds = NAV_ITEMS.map((n) => n.hash.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        }
      },
      { threshold: 0.5 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('popstate', syncHash);
      observer.disconnect();
    };
  }, []);

  // ── Inertial mouse parallax via CSS Custom Properties ──────
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.04);
      currentY = lerp(currentY, targetY, 0.04);

      if (containerRef.current) {
        containerRef.current.style.setProperty(
          '--shift-circles-x', `${(currentX * 12).toFixed(2)}px`
        );
        containerRef.current.style.setProperty(
          '--shift-circles-y', `${(currentY * 12).toFixed(2)}px`
        );
        containerRef.current.style.setProperty(
          '--shift-grid-x', `${(currentX * -6).toFixed(2)}px`
        );
        containerRef.current.style.setProperty(
          '--shift-grid-y', `${(currentY * -6).toFixed(2)}px`
        );
        containerRef.current.style.setProperty(
          '--shift-crosshair-x', `${(currentX * 8).toFixed(2)}px`
        );
        containerRef.current.style.setProperty(
          '--shift-crosshair-y', `${(currentY * 8).toFixed(2)}px`
        );
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  // ── SVG colour values derived from CSS vars at render time ─
  // We use CSS currentColor / stroke="currentColor" where possible
  // but for SVG attributes we pass literal values and let the CSS
  // variable drive them via a <style> block inside the SVG.

  return (
    <div className="landing-container" ref={containerRef} id="home">
      {/* Background Geometry */}
      <svg
        className="geometric-background"
        viewBox="0 0 1648 928"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Inject CSS variables into SVG for stroke colours */}
        <defs>
          <style>{`
            .svg-line   { stroke: var(--line);       }
            .svg-circle { stroke: var(--line);       }
            .svg-dot    { fill:   var(--dot);        }
            .svg-plus   { stroke: var(--plus);       }
            .svg-ch     { stroke: var(--crosshair);  }
            .svg-bar    { fill:   var(--bar);        }
            .svg-cfill  { fill:   var(--circle-fill);}
          `}</style>
        </defs>

        {/* Static Construction Lines */}
        <g className="geo-static-lines">
          <line className="svg-line" x1="0" y1="502" x2="1648" y2="502" strokeWidth="1" />
          <line className="svg-line" x1="1162" y1="60" x2="1162" y2="885" strokeWidth="1" />
          <line className="svg-line" x1="55" y1="850" x2="770" y2="850" strokeWidth="1" />
          <line className="svg-line" x1="55" y1="10" x2="55" y2="180" strokeWidth="1" />
        </g>

        {/* Dynamic / Interactive Circle Layer */}
        <g className="geo-interactive-circles">
          <circle className="svg-cfill" cx="1162" cy="502" r="462" stroke="none" opacity="0.32" />
          <circle className="svg-circle" cx="1162" cy="502" r="462" strokeWidth="1" />
          <g className="geo-rotating-orbit">
            <circle className="svg-circle" cx="1015" cy="482" r="373" strokeWidth="1" />
          </g>
          <circle className="svg-circle" cx="1162" cy="502" r="236" strokeWidth="1" />
          <circle className="svg-circle" cx="254" cy="712" r="729" strokeWidth="1" />
        </g>

        {/* Center small marker */}
        <rect className="svg-bar geo-center-marker" x="1159" y="499" width="6" height="6" />

        {/* Left edge bar */}
        <rect className="svg-bar geo-edge-bar geo-left-bar" x="54" y="340" width="30" height="9" rx="1.5" />

        {/* Right edge bar */}
        <rect className="svg-bar geo-edge-bar geo-right-bar" x="1560" y="658" width="28" height="9" rx="1.5" />

        {/* Crosshair Markers */}
        <g className="geo-crosshairs">
          <g className="crosshair-marker crosshair-ul">
            <line className="svg-ch" x1="68" y1="125" x2="100" y2="125" strokeWidth="1.2" />
            <line className="svg-ch" x1="84" y1="107" x2="84" y2="143" strokeWidth="1.2" />
          </g>
          <g className="crosshair-marker crosshair-lr">
            <line className="svg-ch" x1="1527" y1="847" x2="1563" y2="847" strokeWidth="1.2" />
            <line className="svg-ch" x1="1545" y1="825" x2="1545" y2="869" strokeWidth="1.2" />
          </g>
        </g>

        {/* Secondary Grid Elements */}
        <g className="geo-grids">
          {/* Upper-right 4×4 plus-sign grid */}
          <g className="plus-grid">
            {plusRows.map((py, ri) =>
              plusCols.map((px, ci) => (
                <g key={`plus-${ri}-${ci}`} className="plus-mark">
                  <line className="svg-plus" x1={px - 4} y1={py} x2={px + 4} y2={py} strokeWidth="1.2" />
                  <line className="svg-plus" x1={px} y1={py - 4} x2={px} y2={py + 4} strokeWidth="1.2" />
                </g>
              ))
            )}
          </g>

          {/* Lower-left dotted grid */}
          <g className="dot-grid">
            {dotRows.map((dy, rIndex) =>
              dotCols.map((dx, cIndex) => {
                const colRatio = (dx - 12) / (270 - 12);
                const rowRatio = (dy - 680) / (918 - 680);
                const op = Math.max(0.15, 0.82 - colRatio * 0.45 - (1 - rowRatio) * 0.35);
                return (
                  <circle
                    key={`dot-${rIndex}-${cIndex}`}
                    className="svg-dot grid-dot"
                    cx={dx}
                    cy={dy}
                    r="1.4"
                    opacity={op}
                  />
                );
              })
            )}
          </g>
        </g>
      </svg>

      {/* Header */}
      <header className="site-header">
        <div className="header-logo">
          <span className="logo-text">ATC</span>
        </div>
        <nav className="header-nav" aria-label="Main Navigation">
          {NAV_ITEMS.map(({ label, hash }) => {
            const isActive = activeHash === hash;
            return (
              <div key={hash} className={`nav-item${isActive ? ' active' : ''}`}>
                <a href={hash}>{label}</a>
                {isActive ? (
                  <div className="nav-underline" />
                ) : (
                  <div className="nav-hover-line" />
                )}
              </div>
            );
          })}

          {/* Theme toggle — sun / moon icon */}
          <button
            className="theme-toggle"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? (
              /* Sun icon */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1"  x2="12" y2="3"  />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"  />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1"  y1="12" x2="3"  y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* Moon icon */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* Main Title Composition */}
      <main className="hero-content">
        <div className="title-lockup">
          <h1 className="main-title">
            <span className="title-row title-row-1">
              {/* PRESERVE THE EXACT DISTINCTIVE A / LAMBDA TREATMENT */}
              <span className="letter-stylized-a" aria-hidden="true">
                <svg viewBox="0 0 100 88" className="lambda-glyph">
                  {/* Outer chevron shape */}
                  <polygon
                    points="40,0 60,0 96,87 72,87 50,22 28,87 4,87"
                    fill="currentColor"
                  />
                  {/* Characteristic horizontal spur / notch on inner left stroke */}
                  <polygon
                    points="12,65 31,65 24,75 5,75"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="sr-only">A</span>LAN
            </span>

            <span className="title-row title-row-2">TURING</span>
          </h1>

          <div className="title-sub">
            <span>C</span>
            <span>L</span>
            <span>U</span>
            <span>B</span>
          </div>
        </div>
      </main>
    </div>
  );
}
