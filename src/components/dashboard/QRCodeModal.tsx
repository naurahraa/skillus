"use client";

import { useState } from "react";
import QRCode from "react-qr-code";

type Props = {
  value: string;
  label: string;
};

export default function QRCodeModal({ value, label }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#EDF3FF] text-[#4F4CEE] p-3 rounded-lg shrink-0 hover:bg-[#DEE7FF] transition"
        title="Lihat QR Tiket"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm-2 9h7v7H3v-7zm2 2v3h3v-3H5zm9-11h7v7h-7V3zm2 2v3h3V5h-3zm-2 9h2v2h-2v-2zm4 0h3v2h-3v-2zm-4 4h2v3h-2v-3zm4 0h3v3h-3v-3z" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-xs w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-semibold text-[#1A194D] mb-1">Tiket Kamu</p>
            <p className="text-xs text-gray-500 mb-6 line-clamp-2">{label}</p>

            <div className="bg-white p-3 border border-gray-100 rounded-xl inline-block">
              <QRCode value={value} size={180} />
            </div>

            <p className="text-[11px] text-gray-400 mt-4">
              Tunjukkan QR ini ke panitia saat check-in
            </p>

            <button
              onClick={() => setOpen(false)}
              className="mt-5 w-full bg-[#EDF3FF] text-[#4F4CEE] font-semibold py-2.5 rounded-lg text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}