"use client";

import { useState } from "react";

type Props = {
  email: string;
  namaPic: string;
  organisasi: string;
  noHp: string;
};

export default function ProfilPenyelenggaraForm({ email, namaPic, organisasi, noHp }: Props) {
  const [form, setForm] = useState({ namaPic, organisasi, noHp });
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
      const res = await fetch("/api/profile-penyelenggara", {
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

  const initials = (namaPic || email)
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-lg">
      <h1 className="text-xl font-bold text-[#1A194D] mb-1">Edit Profile</h1>
      <p className="text-sm text-gray-500 mb-6">
        Lengkapi informasi organisasi kamu biar peserta lebih percaya
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-2">Logo / Avatar</label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#4F4CEE] text-white flex items-center justify-center font-semibold text-lg shrink-0">
              {initials}
            </div>
            <button
              type="button"
              disabled
              title="Fitur upload logo belum tersedia"
              className="flex items-center gap-1.5 text-[#4F4CEE] text-sm font-semibold bg-[#EDF3FF] px-4 py-2 rounded-lg opacity-60 cursor-not-allowed"
            >
              Upload Logo
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Nama PIC</label>
          <input
            type="text"
            value={form.namaPic}
            onChange={(e) => handleChange("namaPic", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Organisasi</label>
          <input
            type="text"
            value={form.organisasi}
            onChange={(e) => handleChange("organisasi", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
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