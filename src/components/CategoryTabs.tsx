"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function CategoryTabs({ kategoriList }: { kategoriList: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("kategori") ?? "";

  function selectKategori(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("kategori", value);
    } else {
      params.delete("kategori");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="sticky top-[72px] z-40 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center gap-3 py-4">
        {kategoriList.map((kategori) => (
          <button
            key={kategori}
            onClick={() => selectKategori(kategori)}
            className={`text-sm font-medium px-1 py-1 transition ${
              active === kategori
                ? "text-[#4F4CEE] border-b-2 border-[#4F4CEE]"
                : "text-gray-600 hover:text-[#4F4CEE]"
            }`}
          >
            {kategori}
          </button>
        ))}
        <button
          onClick={() => selectKategori("")}
          className={`ml-auto text-sm font-semibold px-5 py-2 rounded-lg transition ${
            active === ""
              ? "bg-[#4F4CEE] text-white"
              : "bg-[#EDF3FF] text-[#4F4CEE] hover:bg-[#DEE7FF]"
          }`}
        >
          Semua Event
        </button>
      </div>
    </div>
  );
}