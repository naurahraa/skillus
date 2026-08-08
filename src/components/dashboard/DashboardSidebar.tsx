"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type MenuItem = { href: string; label: string; icon: string };

type Props = {
  nama: string;
  role: string;
  menu: MenuItem[];
};

function MenuIcon({ type }: { type: string }) {
  if (type === "grid") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </svg>
    );
  }
  if (type === "doc") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h6" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "calendar") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a8 8 0 0116 0v1" />
    </svg>
  );
}

export default function DashboardSidebar({ nama, role, menu }: Props) {
  const pathname = usePathname();
  const initials = nama
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside className="hidden md:block w-64 shrink-0 bg-white border-r border-gray-100 min-h-[calc(100vh-73px)] p-5">
      <div className="flex items-center gap-3 pb-5 mb-5 border-b border-gray-100">
        <div className="w-11 h-11 rounded-full bg-[#4F4CEE] text-white flex items-center justify-center font-semibold text-sm shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-[#1A194D] text-sm leading-tight">{nama}</p>
          <span className="inline-block mt-1 text-[11px] font-medium bg-[#EDF3FF] text-[#4F4CEE] px-2.5 py-0.5 rounded-full capitalize">
            {role}
          </span>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-[#EDF3FF] text-[#4F4CEE]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <MenuIcon type={item.icon} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}