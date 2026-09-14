"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  PlantIcon,
  FireSimpleIcon,
  TruckIcon,
  CoffeeBeanIcon,
  ArrowRightIcon,
  CubeIcon,
  ClockIcon,
  MapPinIcon,
  HashIcon,
} from "@phosphor-icons/react";
import { SUPPLY_STEPS, type SupplyStep } from "@/lib/data";

const STEP_ICON: Record<SupplyStep["id"], React.ElementType> = {
  petani: PlantIcon,
  roaster: FireSimpleIcon,
  distributor: TruckIcon,
  kedai: CoffeeBeanIcon,
};

function OnChainCard({ step }: { step: SupplyStep }) {
  const rows = [
    { icon: HashIcon, label: "tx hash", value: step.txHash, accent: true },
    { icon: CubeIcon, label: "block", value: `#${step.block.toLocaleString("id-ID")}` },
    { icon: ClockIcon, label: "timestamp", value: step.timestamp },
    { icon: MapPinIcon, label: "location", value: step.location },
  ];
  return (
    <div className="absolute left-1/2 top-full z-20 mt-3 w-[260px] -translate-x-1/2">
      <div className="rounded-[12px] border border-[var(--color-line)] bg-[var(--color-bg-alt)] p-4 shadow-[0_18px_40px_-24px_rgba(26,36,33,0.45)]">
        <p className="mb-3 text-[13px] font-medium text-[var(--color-ink)]">
          {step.detail}
        </p>
        <dl className="space-y-2">
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.label} className="flex items-center gap-2">
                <Icon
                  size={14}
                  weight="duotone"
                  className={
                    row.accent
                      ? "text-[var(--color-blue)]"
                      : "text-[var(--color-muted)]"
                  }
                />
                <dt className="data-mono w-[74px] text-[11px] uppercase tracking-[0.08em] text-[var(--color-muted)]">
                  {row.label}
                </dt>
                <dd
                  className={
                    "data-mono truncate text-[12px] " +
                    (row.accent
                      ? "text-[var(--color-blue)]"
                      : "text-[var(--color-ink)]")
                  }
                >
                  {row.value}
                </dd>
              </div>
            );
          })}
        </dl>
        <p className="mt-3 border-t border-[var(--color-line)] pt-2 text-[11px] text-[var(--color-muted)]">
          Data on-chain · terverifikasi
        </p>
      </div>
    </div>
  );
}

export default function SupplyTimeline() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="jejak"
      className="relative mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="mb-12 max-w-[640px] md:mb-16">
        <h2 className="headline-serif text-[32px] sm:text-[44px] lg:text-[52px]">
          Empat tahap. Satu jejak yang tidak bisa diubah.
        </h2>
        <p className="mt-4 max-w-[58ch] text-[16px] leading-relaxed text-[var(--color-muted)]">
          Setiap perpindahan tangan dicatat sebagai transaksi on-chain. Arahkan
          kursor ke tiap tahap untuk membaca data blockchain-nya.
        </p>
      </div>

      {/* Timeline rail */}
      <div className="relative">
        {/* connecting line (desktop) */}
        <div className="pointer-events-none absolute left-0 right-0 top-[34px] hidden h-px bg-[var(--color-line)] md:block" />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
          {SUPPLY_STEPS.map((step, i) => {
            const Icon = STEP_ICON[step.id];
            const isActive = active === i;
            return (
              <motion.div
                key={step.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.55,
                  delay: reduce ? 0 : i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() =>
                  setActive((cur) => (cur === i ? null : i))
                }
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                aria-label={`${step.label}: ${step.caption}`}
                className="group relative cursor-pointer rounded-[12px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]/50"
              >
                {/* Node */}
                <div className="relative flex items-start gap-3 md:block">
                  <span
                    className={
                      "relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-full border transition-colors duration-200 " +
                      (isActive
                        ? "border-[var(--color-green)] bg-[var(--color-green)] text-white"
                        : "border-[var(--color-line)] bg-[var(--color-bg-alt)] text-[var(--color-green)]") +
                      " md:mx-auto"
                    }
                  >
                    <Icon size={28} weight="duotone" />
                  </span>

                  <div className="md:mt-5 md:text-center">
                    <p className="text-[18px] font-semibold text-[var(--color-ink)]">
                      {step.label}
                    </p>
                    <p className="mt-1 text-[14px] leading-snug text-[var(--color-muted)]">
                      {step.caption}
                    </p>

                    {/* Inline data hint (always visible) */}
                    <p className="data-mono mt-2 text-[11px] text-[var(--color-blue)]">
                      {step.txHash}
                    </p>
                  </div>
                </div>

                {/* Hover / tap detail card */}
                {isActive && <OnChainCard step={step} />}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* arrow connector hint to next section */}
      <div className="mt-16 flex items-center gap-3 text-[13px] text-[var(--color-muted)]">
        <span className="data-mono rounded-full border border-[var(--color-line)] bg-[var(--color-bg-alt)] px-3 py-1 text-[var(--color-blue)]">
          4 dari 4 tahap terverifikasi
        </span>
        <ArrowRightIcon size={16} className="hidden sm:block" />
        <span className="hidden sm:inline">
          Lihat bagaimana ini berdampak pada petani.
        </span>
      </div>
    </section>
  );
}
