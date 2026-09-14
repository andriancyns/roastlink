"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { QrCodeIcon, MapPinIcon } from "@phosphor-icons/react";
import ScanPreview from "./ScanPreview";
import { SUPPLY_STEPS } from "@/lib/data";

/**
 * QRScanDemo — the hero's right-side asset.
 *
 * A mock QR code with a scan line that sweeps top->bottom, after which the
 * bean's journey (4 stages) reveals in sequence below the code. All motion
 * degrades to a static state under prefers-reduced-motion.
 */
export default function QRScanDemo() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full">
      {/* Outer glass-edged panel */}
      <div className="relative rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-alt)] p-5 shadow-[0_24px_60px_-30px_rgba(26,36,33,0.35)] sm:p-7">
        {/* Panel header */}
        <div className="mb-5 flex items-center justify-between border-b border-[var(--color-line)] pb-4">
          <div className="flex items-center gap-2">
            <QrCodeIcon size={20} weight="duotone" className="text-[var(--color-blue)]" />
            <span className="data-mono text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
              roastlink.scan
            </span>
          </div>
          <span className="data-mono rounded-full bg-[var(--color-blue-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-blue)]">
            verified
          </span>
        </div>

        {/* QR + scan line */}
        <div className="relative mx-auto w-fit">
          <ScanPreview className="h-[220px] w-[220px] rounded-[12px] sm:h-[240px] sm:w-[240px]" />

          {/* Scan line: sweeps while not reduced-motion */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-[-6px] h-[3px] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-blue) 20%, var(--color-blue-2) 50%, var(--color-blue) 80%, transparent)",
                boxShadow: "0 0 14px 2px rgba(30,94,255,0.55)",
              }}
              initial={{ top: "4%" }}
              animate={{ top: ["4%", "96%", "4%"] }}
              transition={{
                duration: 3.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.2,
              }}
            />
          )}
          {/* Corner crop marks for a "scanner" feel */}
          {[
            "left-0 top-0 border-l-2 border-t-2",
            "right-0 top-0 border-r-2 border-t-2",
            "left-0 bottom-0 border-l-2 border-b-2",
            "right-0 bottom-0 border-r-2 border-b-2",
          ].map((pos) => (
            <span
              key={pos}
              aria-hidden
              className={`absolute h-5 w-5 rounded-[3px] border-[var(--color-blue)]/70 ${pos}`}
            />
          ))}
        </div>

        {/* Resolved hash line */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-green-2)]" />
          <span className="data-mono text-[11px] text-[var(--color-muted)]">
            lot&nbsp;
            <span className="text-[var(--color-ink)]">GAYO-2026-0711</span>
            &nbsp;·&nbsp;0x7af3..b9e14
          </span>
        </div>

        {/* Journey reveal */}
        <div className="mt-6 space-y-3">
          {SUPPLY_STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              animate={
                reduce
                  ? { opacity: 1, x: 0 }
                  : { opacity: 1, x: 0 }
              }
              transition={{
                duration: 0.5,
                delay: reduce ? 0 : 0.4 + i * 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-3 rounded-[12px] border border-[var(--color-line)] bg-[var(--color-surface)]/60 px-3 py-2.5"
            >
              <span className="data-mono flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-green)] text-[11px] font-medium text-white">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-[var(--color-ink)]">
                  {step.label}
                  <span className="text-[var(--color-muted)]"> · {step.caption}</span>
                </p>
                <p className="flex items-center gap-1 text-[12px] text-[var(--color-muted)]">
                  <MapPinIcon size={12} weight="fill" />
                  {step.location}
                </p>
              </div>
              <span className="data-mono shrink-0 text-[11px] text-[var(--color-blue)]">
                {step.date}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Soft floating backdrop glow behind the panel (decorative) */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_70%_20%,rgba(30,94,255,0.10),transparent_60%),radial-gradient(circle_at_20%_80%,rgba(31,95,63,0.12),transparent_60%)]"
      />
    </div>
  );
}
