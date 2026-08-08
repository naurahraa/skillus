"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenuButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-gray-600 p-1.5"
        aria-label="Menu"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 top-[72px] z-40 bg-black/20" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-lg py-3 px-6 flex flex-col">
            <Link href="/" onClick={() => setOpen(false)} className="py-3 text-sm font-medium text-gray-700 hover:text-[#4F4CEE] border-b border-gray-50">
              Home
            </Link>
            <Link href="/event" onClick={() => setOpen(false)} className="py-3 text-sm font-medium text-gray-700 hover:text-[#4F4CEE] border-b border-gray-50">
              Event
            </Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="py-3 text-sm font-medium text-gray-700 hover:text-[#4F4CEE]">
              Blog
            </Link>
          </div>
        </>
      )}
    </div>
  );
}