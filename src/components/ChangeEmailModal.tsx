"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export default function ChangeEmailModal({ currentEmail }: { currentEmail: string }) {
  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") resetAndClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function resetAndClose() {
    setOpen(false);
    setNewEmail("");
    setCurrentPassword("");
    setError("");
    setSuccess(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/change-email", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Gagal mengubah email.");
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
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-semibold text-[#4F4CEE] hover:underline whitespace-nowrap"
      >
        Ubah Email
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
                <p className="font-semibold text-[#1A194D] mb-2">Email berhasil diubah!</p>
                <p className="text-sm text-gray-500 mb-5">
                  Kamu perlu login ulang pake email baru ({newEmail}).
                </p>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full bg-[#4F4CEE] text-white font-semibold py-2.5 rounded-lg text-sm"
                >
                  Login Ulang
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-[#1A194D] mb-1">Ubah Email</h3>
                <p className="text-xs text-gray-500 mb-4">Email sekarang: {currentEmail}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Email Baru</label>
                    <input
                      type="email"
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Konfirmasi Kata Sandi</label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
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