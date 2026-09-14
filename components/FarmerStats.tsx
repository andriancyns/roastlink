"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
} from "motion/react";
import { TrendUpIcon, CoinsIcon, HandshakeIcon } from "@phosphor-icons/react";
import { FARMER_STATS } from "@/lib/data";

/**
 * A small counter that animates 0 -> target when scrolled into view.
 * Uses Motion's useInView + animate (no scroll listeners, no rAF on state).
 */
function CountUp({
  to,
  suffix = "",
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className="data-mono">
      {val.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

function ShareBar({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "green" | "muted";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const fill = tone === "green" ? "bg-[var(--color-green)]" : "bg-[var(--color-muted)]/60";

  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[14px] text-[var(--color-muted)]">{label}</span>
        <span className="data-mono text-[15px] font-medium text-[var(--color-ink)]">
          {value}%
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--color-surface)]">
        <motion.div
          className={`h-full rounded-full ${fill}`}
          initial={reduce ? { width: `${value}%` } : { width: "0%" }}
          animate={inView ? { width: `${value}%` } : undefined}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </div>
    </div>
  );
}

export default function FarmerStats() {
  const reduce = useReducedMotion();

  return (
    <section
      id="petani"
      className="relative bg-[var(--color-green-soft)] py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="mb-12 max-w-[640px] md:mb-16">
          <h2 className="headline-serif text-[32px] sm:text-[44px] lg:text-[52px]">
            Harga yang adul, angka yang terbuka.
          </h2>
          <p className="mt-4 max-w-[58ch] text-[16px] leading-relaxed text-[var(--color-muted)]">
            Berbeda dari rantai pasok biasa, RoastLink menunjukkan persentase
            harga jual yang benar-benar sampai ke petani. Transparansi ini
            dihitung dari data on-chain, bukan klaim pemasaran.
          </p>
        </div>

        {/* Asymmetric bento: 1 hero stat (left, tall) + 2 supporting (right, stacked) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {/* Hero stat: income increase counter */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col justify-between overflow-hidden rounded-[16px] border border-[var(--color-line)] bg-[var(--color-bg-alt)] p-7 md:col-span-6 md:p-9"
          >
            <div className="flex items-center gap-2 text-[var(--color-green-2)]">
              <TrendUpIcon size={20} weight="duotone" />
              <span className="data-mono text-[12px] uppercase tracking-[0.14em]">
                kenaikan pendapatan petani
              </span>
            </div>

            <div className="mt-6 flex items-end gap-1">
              <span className="headline-serif text-[88px] leading-none text-[var(--color-green)] md:text-[120px]">
                +
                <CountUp to={FARMER_STATS.incomeIncrease} suffix="" />
              </span>
              <span className="headline-serif mb-3 text-[40px] text-[var(--color-green)] md:mb-4 md:text-[56px]">
                %
              </span>
            </div>

            <p className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-[var(--color-muted)]">
              Rata-rata kenaikan pendapatan petani mitra RoastLink dalam 12
              bulan pertama, dibanding jalur konvensional. Data agregat dari
              koperasi mitra.
            </p>

            {/* decorative texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(31,95,63,0.10),transparent_70%)]"
            />
          </motion.div>

          {/* Supporting column */}
          <div className="grid grid-cols-1 gap-5 md:col-span-6 md:gap-6">
            {/* Share comparison */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-bg-alt)] p-7"
            >
              <div className="mb-5 flex items-center gap-2">
                <CoinsIcon size={20} weight="duotone" className="text-[var(--color-blue)]" />
                <h3 className="text-[16px] font-semibold text-[var(--color-ink)]">
                  Bagi harga jual yang sampai ke petani
                </h3>
              </div>
              <div className="space-y-5">
                <ShareBar
                  label="Rute RoastLink"
                  value={FARMER_STATS.farmerShareRoastlink}
                  tone="green"
                />
                <ShareBar
                  label="Rantai konvensional"
                  value={FARMER_STATS.farmerShareConventional}
                  tone="muted"
                />
              </div>
              <p className="mt-5 text-[13px] text-[var(--color-muted)]">
                Harga jual eceran kemasan 250&nbsp;g, dibagi per jalur.
              </p>
            </motion.div>

            {/* Partner reach */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-ink)] p-7 text-white"
            >
              <div className="mb-4 flex items-center gap-2 text-[var(--color-blue-2)]">
                <HandshakeIcon size={20} weight="duotone" />
                <span className="data-mono text-[12px] uppercase tracking-[0.14em]">
                  jangkauan mitra
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="headline-serif text-[44px] leading-none">
                    <CountUp to={FARMER_STATS.partnerFarmers} />
                  </p>
                  <p className="mt-2 text-[13px] text-white/70">
                    petani mitra terdaftar
                  </p>
                </div>
                <div>
                  <p className="headline-serif text-[44px] leading-none">
                    <CountUp to={FARMER_STATS.cooperatives} />
                  </p>
                  <p className="mt-2 text-[13px] text-white/70">
                    koperasi di 8 provinsi
                  </p>
                </div>
              </div>
              <p className="mt-5 text-[12px] text-white/50">
                Angka contoh untuk demo landing page.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
