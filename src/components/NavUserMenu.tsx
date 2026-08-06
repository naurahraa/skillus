"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

type Props = {
  nama: string;
  role: string;
};

export default function NavUserMenu({ nama, role }: Props) {
  const [open, setOpen] = useState(false);
  const initials = nama
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const dashboardHref =
    role === "peserta"
      ? "/dashboard/peserta"
      : role === "penyelenggara"
      ? "/dashboard/penyelenggara"
      : role === "admin"
      ? "/dashboard/admin"
      : "/";

  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2">
        <span className="text-sm font-medium text-[#1A194D] hidden sm:block">
          {nama.split(" ")[0]}
        </span>
        <div className="w-8 h-8 rounded-full bg-[#4F4CEE] text-white flex items-center justify-center text-xs font-semibold">
          {initials}
        </div>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-1.5 z-50">
            <Link
              href={dashboardHref}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
            >
              Keluar
            </button>
          </div>
        </>
      )}
    </div>
  );
}