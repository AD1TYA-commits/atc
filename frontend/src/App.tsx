import './App.css';

export default function App() {
  // 4x4 plus-sign grid in upper-right
  const plusCols = [1422, 1475, 1528, 1580];
  const plusRows = [166, 216, 267, 319];

  // Lower-left subtle dotted grid
  const dotCols: number[] = [];
  for (let x = 12; x <= 270; x += 15.2) {
    dotCols.push(x);
  }
  const dotRows: number[] = [];
  for (let y = 680; y <= 918; y += 15.2) {
    dotRows.push(y);
  }

  return (
    <div className="landing-container">
      {/* Background Geometry */}
      <svg
        className="geometric-background"
        viewBox="0 0 1648 928"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Subtle tonal variation inside right circle */}
        <circle cx="1162" cy="502" r="462" fill="#efedee" opacity="0.45" />

        {/* Construction Circles */}
        <circle cx="1162" cy="502" r="462" stroke="#d8d6d8" strokeWidth="1" />
        <circle cx="1162" cy="502" r="236" stroke="#d8d6d8" strokeWidth="1" />
        <circle cx="1015" cy="482" r="373" stroke="#d8d6d8" strokeWidth="1" />
        {/* Sweeping Arc across center-left */}
        <circle cx="254" cy="712" r="729" stroke="#d8d6d8" strokeWidth="1" />

        {/* Thin Construction Lines */}
        {/* Main horizontal line passing through center marker */}
        <line x1="0" y1="502" x2="1648" y2="502" stroke="#d8d6d8" strokeWidth="1" />

        {/* Main vertical line passing through center marker */}
        <line x1="1162" y1="60" x2="1162" y2="885" stroke="#d8d6d8" strokeWidth="1" />

        {/* Bottom horizontal construction line */}
        <line x1="55" y1="850" x2="770" y2="850" stroke="#d8d6d8" strokeWidth="1" />

        {/* Left vertical construction line */}
        <line x1="55" y1="10" x2="55" y2="180" stroke="#d8d6d8" strokeWidth="1" />

        {/* Center small black square marker */}
        <rect x="1159" y="499" width="6" height="6" fill="#111" />

        {/* Left horizontal edge black bar */}
        <rect x="54" y="340" width="30" height="9" rx="1.5" fill="#111" />

        {/* Right horizontal edge black bar */}
        <rect x="1560" y="658" width="28" height="9" rx="1.5" fill="#111" />

        {/* Upper-left crosshair */}
        <g className="crosshair">
          <line x1="68" y1="125" x2="100" y2="125" stroke="#777577" strokeWidth="1.2" />
          <line x1="84" y1="107" x2="84" y2="143" stroke="#777577" strokeWidth="1.2" />
        </g>

        {/* Lower-right crosshair */}
        <g className="crosshair">
          <line x1="1527" y1="847" x2="1563" y2="847" stroke="#777577" strokeWidth="1.2" />
          <line x1="1545" y1="825" x2="1545" y2="869" stroke="#777577" strokeWidth="1.2" />
        </g>

        {/* Upper-right 4x4 plus-sign grid */}
        <g className="plus-grid">
          {plusRows.map((py, ri) =>
            plusCols.map((px, ci) => (
              <g key={`plus-${ri}-${ci}`}>
                <line x1={px - 4} y1={py} x2={px + 4} y2={py} stroke="#9e9c9e" strokeWidth="1.2" />
                <line x1={px} y1={py - 4} x2={px} y2={py + 4} stroke="#9e9c9e" strokeWidth="1.2" />
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
              const op = Math.max(0.15, 0.85 - colRatio * 0.45 - (1 - rowRatio) * 0.35);
              return (
                <circle
                  key={`dot-${rIndex}-${cIndex}`}
                  cx={dx}
                  cy={dy}
                  r="1.4"
                  fill="#787678"
                  opacity={op}
                />
              );
            })
          )}
        </g>
      </svg>

      {/* Header */}
      <header className="site-header">
        <div className="header-logo">
          <span className="logo-text">ATC</span>
        </div>
        <nav className="header-nav" aria-label="Main Navigation">
          <div className="nav-item active">
            <a href="#home">HOME</a>
            <div className="nav-underline" />
          </div>
          <div className="nav-item">
            <a href="#events">EVENTS</a>
          </div>
          <div className="nav-item">
            <a href="#projects">PROJECTS</a>
          </div>
          <div className="nav-item">
            <a href="#team">TEAM</a>
          </div>
          <div className="nav-item">
            <a href="#resources">RESOURCES</a>
          </div>
        </nav>
      </header>

      {/* Main Title Composition */}
      <main className="hero-content">
        <div className="title-lockup">
          <h1 className="main-title">
            <span className="title-row title-row-1">
              <span className="letter-stylized-a" aria-hidden="true">
                <svg viewBox="0 0 100 88" className="lambda-glyph">
                  {/* Outer chevron shape */}
                  <polygon points="40,0 60,0 96,87 72,87 50,22 28,87 4,87" fill="#111" />
                  {/* Characteristic horizontal spur / notch on inner left stroke */}
                  <polygon points="12,65 31,65 24,75 5,75" fill="#111" />
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
