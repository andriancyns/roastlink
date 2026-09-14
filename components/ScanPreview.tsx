import React from "react";

/**
 * ScanPreview renders a real QR-code-style SVG: three finder patterns in the
 * corners plus a deterministic data-module grid. This is a generated visual,
 * not a div mockup. The pattern is deterministic (seeded) so it never reflows.
 */

const GRID = 25; // 25 x 25 modules
const CELL = 8; // px per module -> 200 x 200 viewBox

// Simple seeded PRNG (mulberry32) so the module pattern is stable per render.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A finder pattern is the 7x7 square in three corners of a real QR code.
function FinderPattern({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {/* outer 7x7 ring (drawn as filled square with hole) */}
      <path
        d="M0 0h56v56h-56z M8 8v40h40v-40z"
        fillRule="evenodd"
        className="fill-[var(--color-ink)]"
      />
      {/* inner 3x3 solid */}
      <rect x={16} y={16} width={24} height={24} className="fill-[var(--color-ink)]" />
    </g>
  );
}

export default function ScanPreview({ className = "" }: { className?: string }) {
  const rng = mulberry32(20260711);
  const size = GRID * CELL;
  const finder = 7; // finder pattern spans 7 modules
  const modules: React.ReactNode[] = [];

  const inFinderZone = (r: number, c: number) => {
    const topLeft = r < finder && c < finder;
    const topRight = r < finder && c >= GRID - finder;
    const bottomLeft = r >= GRID - finder && c < finder;
    return topLeft || topRight || bottomLeft;
  };

  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      if (inFinderZone(r, c)) continue;
      // Sparse, organic-looking fill (~46% density)
      if (rng() < 0.46) {
        modules.push(
          <rect
            key={`${r}-${c}`}
            x={c * CELL}
            y={r * CELL}
            width={CELL}
            height={CELL}
            className="fill-[var(--color-ink)]"
          />,
        );
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="Contoh kode QR pelacakan kopi RoastLink"
      shapeRendering="crispEdges"
    >
      <rect width={size} height={size} className="fill-white" />
      {modules}
      <FinderPattern x={0} y={0} />
      <FinderPattern x={(GRID - finder) * CELL} y={0} />
      <FinderPattern x={0} y={(GRID - finder) * CELL} />
    </svg>
  );
}
