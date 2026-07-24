"use client";

import { useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface MobileNavProps {
  links: NavLink[];
  prefix: string;
  /** Where the "Join the Flock" CTA points — defaults to the homepage signup. */
  ctaHref?: string;
}

export default function MobileNav({ links, prefix, ctaHref = "/#signup" }: MobileNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .${prefix}-hamburger{
          display:none;
          background:none;border:none;
          font-size:1.6rem;color:var(--brand-ink);
          cursor:pointer;padding:4px 8px;line-height:1;
          z-index:201
        }
        .${prefix}-mobile-menu{
          position:absolute;top:100%;left:0;right:0;
          background:var(--brand-canvas);
          overflow:hidden;
          transition:max-height 0.35s ease;
          display:flex;flex-direction:column;align-items:center;
          z-index:200;
          box-shadow:0 8px 32px rgba(var(--brand-ink-rgb),0.10)
        }
        .${prefix}-mobile-menu a{
          display:block;width:100%;padding:16px 24px;
          background:none;border:none;
          border-bottom:1px solid rgba(var(--brand-ink-rgb),0.08);
          font-family:var(--brand-font-body);font-weight:600;
          font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;
          color:var(--brand-ink);cursor:pointer;text-align:center;
          text-decoration:none;transition:color 0.2s
        }
        .${prefix}-mobile-menu a:hover{color:var(--brand-accent-deep)}
        .${prefix}-mobile-menu-cta{
          display:block;
          background:var(--brand-ink) !important;color:var(--brand-canvas) !important;
          border:none !important;
          width:calc(100% - 48px) !important;
          margin:16px 24px !important;padding:14px 22px !important;
          font-family:var(--brand-font-body);font-weight:800;
          font-size:0.72rem;letter-spacing:0.1em;text-transform:uppercase;
          cursor:pointer;text-align:center;text-decoration:none
        }
        @media(max-width:768px){
          .${prefix}-hamburger{display:block}
        }
        @media(min-width:769px){
          .${prefix}-hamburger{display:none !important}
          .${prefix}-mobile-menu{display:none !important}
        }
      `}</style>

      <button
        className={`${prefix}-hamburger`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? "\u2715" : "\u2630"}
      </button>

      <div
        className={`${prefix}-mobile-menu`}
        style={{ maxHeight: menuOpen ? 400 : 0 }}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href={ctaHref}
          className={`${prefix}-mobile-menu-cta`}
          onClick={() => setMenuOpen(false)}
        >
          Join the Flock &rarr;
        </a>
      </div>
    </>
  );
}
