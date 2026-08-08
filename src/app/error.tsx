"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <img src="/logo-full.svg" alt="SkillUs" className="h-8 mb-8" />
      <p className="text-6xl mb-4">😵</p>
      <h1 className="text-xl font-bold text-[#1A194D] mb-2">Ada yang salah</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        Terjadi kesalahan nggak terduga. Coba muat ulang halaman ini, atau balik ke Home.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="bg-[#EDF3FF] text-[#4F4CEE] font-semibold px-6 py-3 rounded-lg hover:bg-[#DEE7FF] transition"
        >
          Coba Lagi
        </button>
        <Link
          href="/"
          className="bg-[#4F4CEE] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          Balik ke Home
        </Link>
      </div>
    </div>
  );
}