"use client";

import { useState } from "react";

export default function ChangePasswordModal() {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function resetAndClose() {
    setOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi kata sandi baru nggak cocok.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/change-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Gagal mengubah kata sandi.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch {
      setError("Tidak bisa terhubung ke server.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-[#EDF3FF] text-[#4F4CEE] text-sm font-semibold py-2.5 rounded-lg hover:bg-[#DEE7FF] transition"
      >
        Ubah Sekarang
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6"
          onClick={resetAndClose}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {success ? (
              <div className="text-center py-4">
                <p className="font-semibold text-[#1A194D] mb-2">Kata sandi berhasil diubah!</p>
                <p className="text-sm text-gray-500 mb-5">Pake kata sandi baru buat login berikutnya.</p>
                <button
                  onClick={resetAndClose}
                  className="w-full bg-[#4F4CEE] text-white font-semibold py-2.5 rounded-lg text-sm"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-[#1A194D] mb-4">Ubah Kata Sandi</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Kata Sandi Lama</label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Kata Sandi Baru</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Konfirmasi Kata Sandi Baru</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={resetAndClose}
                      className="flex-1 bg-gray-50 text-gray-600 font-semibold py-2.5 rounded-lg text-sm"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-[#4F4CEE] text-white font-semibold py-2.5 rounded-lg text-sm disabled:opacity-60"
                    >
                      {loading ? "Menyimpan..." : "Simpan"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}