"use client";

import { useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface MobileNavProps {
  links: NavLink[];
  prefix: string;
}

export default function MobileNav({ links, prefix }: MobileNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .${prefix}-hamburger{
          display:none;
          background:none;border:none;
          font-size:1.6rem;color:#1B1F3B;
          cursor:pointer;padding:4px 8px;line-height:1;
          z-index:201
        }
        .${prefix}-mobile-menu{
          position:absolute;top:100%;left:0;right:0;
          background:#FDF4EE;
          overflow:hidden;
          transition:max-height 0.35s ease;
          display:flex;flex-direction:column;align-items:center;
          z-index:200;
          box-shadow:0 8px 32px rgba(27,31,59,0.10)
        }
        .${prefix}-mobile-menu a{
          display:block;width:100%;padding:16px 24px;
          background:none;border:none;
          border-bottom:1px solid rgba(27,31,59,0.08);
          font-family:'Syne',system-ui,sans-serif;font-weight:600;
          font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;
          color:#1B1F3B;cursor:pointer;text-align:center;
          text-decoration:none;transition:color 0.2s
        }
        .${prefix}-mobile-menu a:hover{color:#2D4A2D}
        .${prefix}-mobile-menu-cta{
          display:block;
          background:#1B1F3B !important;color:#FDF4EE !important;
          border:none !important;
          width:calc(100% - 48px) !important;
          margin:16px 24px !important;padding:14px 22px !important;
          font-family:'Syne',system-ui,sans-serif;font-weight:800;
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
          href="/"
          className={`${prefix}-mobile-menu-cta`}
          onClick={() => setMenuOpen(false)}
        >
          Get 20% off + free shipping &rarr;
        </a>
      </div>
    </>
  );
}
