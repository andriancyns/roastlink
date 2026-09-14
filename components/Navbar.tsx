"use client";

import React, { useEffect, useState } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { NAV_LINKS, BRAND } from "@/lib/data";

/**
 * Single-line desktop nav (<=72px), collapses to a sheet under md.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the mobile sheet on route-level hash changes / Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-line)]/70 bg-[var(--color-bg)]/85 backdrop-blur-md">
      <nav className="mx-auto flex h-[68px] w-full max-w-[1400px] items-center justify-between px-5 sm:px-8">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2">
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[var(--color-green)] text-white"
          >
            <span className="headline-serif text-[18px] leading-none">R</span>
          </span>
          <span className="headline-serif text-[20px] font-semibold text-[var(--color-ink)]">
            {BRAND.name}
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] text-[var(--color-ink)]/80 transition-colors hover:text-[var(--color-green)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#jejak"
          className="hidden rounded-full bg-[var(--color-green)] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[var(--color-green-2)] active:translate-y-[1px] md:inline-flex"
        >
          Mulai Telusuri
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--color-line)] text-[var(--color-ink)] md:hidden"
        >
          {open ? <XIcon size={20} /> : <ListIcon size={20} />}
        </button>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-bg)] px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[10px] px-3 py-3 text-[16px] text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#jejak"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[var(--color-green)] px-5 py-3 text-center text-[15px] font-medium text-white"
            >
              Mulai Telusuri
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
