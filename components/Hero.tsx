"use client";

import React from "react";
import { ArrowRightIcon, PlayCircleIcon } from "@phosphor-icons/react";
import QRScanDemo from "./QRScanDemo";

/**
 * Hero — asymmetric split.
 * Left: one eyebrow + headline + subtext + 2 CTAs (max 4 text elements).
 * Right: the QRScanDemo asset.
 */
export default function Hero() {
  return (
    <section
      id="cara-kerja"
      className="relative mx-auto w-full max-w-[1400px] px-5 pt-16 pb-12 sm:px-8 md:pt-24 md:pb-20"
    >
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8">
        {/* Copy */}
        <div className="md:col-span-6 lg:col-span-6">
          <p className="data-mono mb-5 text-[12px] uppercase tracking-[0.2em] text-[var(--color-green-2)]">
            Rantai pasok berbasis blockchain
          </p>

          <h1 className="headline-serif text-[40px] leading-[1.05] sm:text-[56px] lg:text-[64px]">
            Setiap Cangkir Punya Cerita yang Bisa Dibuktikan
          </h1>

          <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-[var(--color-muted)]">
            RoastLink melacak perjalanan biji kopi dari petani hingga cangkir
            Anda. Setiap tahap ditandatangani di blockchain, jadi keaslian dan
            harga yang adil bisa diverifikasi siapa pun.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#jejak"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-green)] px-6 py-3 text-[15px] font-medium text-white shadow-[0_8px_24px_-10px_rgba(31,95,63,0.6)] transition-transform duration-200 hover:bg-[var(--color-green-2)] active:translate-y-[1px]"
            >
              Telusuri Asal Kopi
              <ArrowRightIcon size={18} weight="bold" />
            </a>
            <a
              href="#jejak"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-bg-alt)] px-6 py-3 text-[15px] font-medium text-[var(--color-ink)] transition-colors duration-200 hover:border-[var(--color-muted)] active:translate-y-[1px]"
            >
              <PlayCircleIcon size={18} weight="duotone" />
              Lihat Demo
            </a>
          </div>
        </div>

        {/* Asset */}
        <div className="md:col-span-6 lg:col-span-6">
          <QRScanDemo />
        </div>
      </div>
    </section>
  );
}
