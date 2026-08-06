"use client";

import { useState } from "react";

type Props = {
  email: string;
  namaLengkap: string;
  noHp: string;
  kotaAsal: string;
  alamat: string;
};

const KOTA_OPTIONS = [
  "Jakarta", "Depok", "Bogor", "Tangerang", "Bekasi",
  "Bandung", "Semarang", "Yogyakarta", "Surabaya", "Malang",
  "Medan", "Makassar", "Denpasar", "Palembang", "Lainnya",
];

export default function ProfilForm({ email, namaLengkap, noHp, kotaAsal, alamat }: Props) {
  const [form, setForm] = useState({ namaLengkap, noHp, kotaAsal, alamat });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setMessage({ type: "success", text: "Profil berhasil disimpan." });
    } catch {
      setMessage({ type: "error", text: "Gagal menyimpan profil, coba lagi." });
    } finally {
      setLoading(false);
    }
  }

  const initials = (namaLengkap || email)
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h1 className="text-xl font-bold text-[#1A194D] mb-1">Edit Profile</h1>
      <p className="text-sm text-gray-500 mb-6">
        Masukkan informasi yang valid agar proses belajar lebih mudah
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-2">My Avatar</label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#4F4CEE] text-white flex items-center justify-center font-semibold text-lg shrink-0">
              {initials}
            </div>
            <div>
              <button
                type="button"
                disabled
                title="Fitur upload avatar belum tersedia"
                className="flex items-center gap-1.5 text-[#4F4CEE] text-sm font-semibold bg-[#EDF3FF] px-4 py-2 rounded-lg opacity-60 cursor-not-allowed"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 16V4m0 0L7 9m5-5l5 5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Upload Gambar
              </button>
              <p className="text-xs text-gray-400 mt-1.5">Supported formats: JPEG, PNG, JPG (Max 5 MB)</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Nama</label>
          <input
            type="text"
            value={form.namaLengkap}
            onChange={(e) => handleChange("namaLengkap", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            disabled
            title="Email tidak bisa diubah dari sini"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">No Telepon</label>
          <input
            type="tel"
            value={form.noHp}
            onChange={(e) => handleChange("noHp", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Kota Asal</label>
          <select
            value={form.kotaAsal}
            onChange={(e) => handleChange("kotaAsal", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
          >
            <option value="">Pilih kota</option>
            {KOTA_OPTIONS.map((kota) => (
              <option key={kota} value={kota}>{kota}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Alamat</label>
          <input
            type="text"
            value={form.alamat}
            onChange={(e) => handleChange("alamat", e.target.value)}
            placeholder="cth: Jalan Akses UI"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
          />
        </div>

        {message && (
          <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#4F4CEE] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}