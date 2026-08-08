import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <img src="/logo-full.svg" alt="SkillUs" className="h-8 mb-8" />
      <p className="text-7xl font-bold text-[#4F4CEE] mb-4">404</p>
      <h1 className="text-xl font-bold text-[#1A194D] mb-2">Halaman nggak ketemu</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        Halaman yang lo cari mungkin udah dipindah, dihapus, atau memang nggak pernah ada.
      </p>
      <Link
        href="/"
        className="bg-[#4F4CEE] text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition"
      >
        Balik ke Home
      </Link>
    </div>
  );
}