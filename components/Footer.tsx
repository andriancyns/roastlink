import React from "react";
import { BRAND, NAV_LINKS } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg)]">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand + mission */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[var(--color-green)] text-white"
              >
                <span className="headline-serif text-[18px] leading-none">R</span>
              </span>
              <span className="headline-serif text-[20px] font-semibold text-[var(--color-ink)]">
                {BRAND.name}
              </span>
            </div>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-[var(--color-muted)]">
              {BRAND.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <p className="data-mono mb-4 text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
              Jelajahi
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[15px] text-[var(--color-ink)]/80 transition-colors hover:text-[var(--color-green)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact-ish */}
          <div className="md:col-span-3">
            <p className="data-mono mb-4 text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
              Kontak
            </p>
            <ul className="space-y-2.5 text-[15px] text-[var(--color-ink)]/80">
              <li>
                <a className="transition-colors hover:text-[var(--color-green)]" href="mailto:halo@roastlink.id">
                  halo@roastlink.id
                </a>
              </li>
              <li>Untuk koperasi &amp; kedai mitra</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--color-line)] pt-6 text-[13px] text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BRAND.name}. Semua data pada halaman ini contoh demo.
          </p>
          <p className="data-mono">Dibangun di atas blockchain publik.</p>
        </div>
      </div>
    </footer>
  );
}
