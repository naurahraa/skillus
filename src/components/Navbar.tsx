import Link from "next/link";
import { auth } from "@/auth";
import NavUserMenu from "./NavUserMenu";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo-full.svg" alt="SkillUs" className="h-8" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-[#4F4CEE]">Home</Link>
          <Link href="/event" className="hover:text-[#4F4CEE]">Event</Link>
          <Link href="/blog" className="hover:text-[#4F4CEE]">Blog</Link>
        </nav>

        {session?.user ? (
          <NavUserMenu
            nama={session.user.name ?? session.user.email ?? "Pengguna"}
            role={session.user.role}
          />
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-[#4F4CEE] hover:underline">
              Masuk
            </Link>
            <Link
              href="/register"
              className="bg-[#4F4CEE] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition"
            >
              Daftar
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}