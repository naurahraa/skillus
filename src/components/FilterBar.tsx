"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Option = { value: string; label: string };

const HARI_OPTIONS: Option[] = [
  { value: "", label: "Semua Hari" },
  { value: "hari-ini", label: "Hari Ini" },
  { value: "minggu-ini", label: "Minggu Ini" },
  { value: "bulan-ini", label: "Bulan Ini" },
];

const JENIS_OPTIONS: Option[] = [
  { value: "", label: "Semua Jenis" },
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
];

export default function FilterBar({ kategoriList }: { kategoriList: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}#event-mendatang`, { scroll: false });
  }

  const kategoriOptions: Option[] = [
    { value: "", label: "Semua Kategori" },
    ...kategoriList.map((k) => ({ value: k, label: k })),
  ];

  return (
    <div className="flex flex-wrap gap-3">
      <FilterSelect
        value={searchParams.get("hari") ?? ""}
        onChange={(v) => updateFilter("hari", v)}
        options={HARI_OPTIONS}
      />
      <FilterSelect
        value={searchParams.get("jenis") ?? ""}
        onChange={(v) => updateFilter("jenis", v)}
        options={JENIS_OPTIONS}
      />
      <FilterSelect
        value={searchParams.get("kategori") ?? ""}
        onChange={(v) => updateFilter("kategori", v)}
        options={kategoriOptions}
      />
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none text-sm font-medium bg-[#F6F7F9] text-gray-700 pl-4 pr-9 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}