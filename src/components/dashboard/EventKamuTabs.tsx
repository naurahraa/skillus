"use client";

import { useState } from "react";
import PesertaEventCard from "./PesertaEventCard";

type EventItem = {
  id: number;
  judul: string;
  lokasi: string | null;
  tanggal: Date | null;
  waktu: string | null;
};

type Props = {
  akanDatang: EventItem[];
  selesai: EventItem[];
};

export default function EventKamuTabs({ akanDatang, selesai }: Props) {
  const [tab, setTab] = useState<"akanDatang" | "selesai">("akanDatang");
  const list = tab === "akanDatang" ? akanDatang : selesai;

  return (
    <div>
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => setTab("akanDatang")}
          className={`text-sm font-semibold px-5 py-2 rounded-full transition ${
            tab === "akanDatang"
              ? "bg-[#EDF3FF] text-[#4F4CEE]"
              : "bg-gray-50 text-gray-500 hover:bg-gray-100"
          }`}
        >
          Akan Datang
        </button>
        <button
          onClick={() => setTab("selesai")}
          className={`text-sm font-semibold px-5 py-2 rounded-full transition ${
            tab === "selesai"
              ? "bg-[#EDF3FF] text-[#4F4CEE]"
              : "bg-gray-50 text-gray-500 hover:bg-gray-100"
          }`}
        >
          Selesai
        </button>
      </div>

      {list.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-10">
          Belum ada event di kategori ini.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((event) => (
            <PesertaEventCard
              key={event.id}
              id={event.id}
              judul={event.judul}
              lokasi={event.lokasi}
              tanggal={event.tanggal}
              waktu={event.waktu}
            />
          ))}
        </div>
      )}
    </div>
  );
}