"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

type Props = {
  nama: string;
};

export default function DashboardTopbar({ nama }: Props) {
  const [open, setOpen] = useState(false);
  const initials = nama
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo-full.svg" alt="SkillUs" className="h-8" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-[#4F4CEE]">Home</Link>
          <Link href="/event" className="hover:text-[#4F4CEE]">Event</Link>
          <Link href="/blog" className="hover:text-[#4F4CEE]">Blog</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            className="text-gray-400 cursor-not-allowed"
            aria-label="Notifikasi"
            title="Fitur notifikasi belum tersedia"
            disabled
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" />
            </svg>
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2"
            >
              <span className="text-sm font-medium text-[#1A194D]">{nama.split(" ")[0]}</span>
              <div className="w-8 h-8 rounded-full bg-[#4F4CEE] text-white flex items-center justify-center text-xs font-semibold">
                {initials}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-1.5 z-50">
                <Link
                  href="/dashboard/peserta/profil"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  Profil
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}