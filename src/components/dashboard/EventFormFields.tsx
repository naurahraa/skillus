"use client";

import { useState, useTransition } from "react";
import EventFormFields from "./EventFormFields";

type Props = {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: {
    judul?: string;
    deskripsi?: string;
    kategori?: string;
    lokasi?: string;
    tanggal?: string;
    waktu?: string;
    harga?: number;
    kuota?: number;
    status?: string;
  };
  currentPosterUrl?: string | null;
  submitLabel: string;
};

// Kompres & resize gambar langsung di browser sebelum dikirim ke server,
// biar nggak kena limit ukuran payload dari Vercel (4.5MB, nggak bisa diubah)
function compressImageFile(file: File, maxWidth = 1200, quality = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Gagal memproses gambar"));
              return;
            }
            const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
            resolve(new File([blob], newName, { type: "image/jpeg" }));
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = () => reject(new Error("Gagal memuat gambar"));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.readAsDataURL(file);
  });
}

export default function EventForm({ action, defaultValues, currentPosterUrl, submitLabel }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const posterFile = formData.get("poster") as File | null;
    if (posterFile && posterFile.size > 0) {
      setProcessing(true);
      try {
        const compressed = await compressImageFile(posterFile);
        formData.set("poster", compressed);
      } catch {
        setError("Gagal memproses gambar poster, coba gambar lain.");
        setProcessing(false);
        return;
      }
      setProcessing(false);
    }

    startTransition(() => {
      action(formData);
    });
  }

  const loading = isPending || processing;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <EventFormFields defaultValues={defaultValues} currentPosterUrl={currentPosterUrl} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#4F4CEE] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-60"
      >
        {processing ? "Memproses gambar..." : isPending ? "Menyimpan..." : submitLabel}
      </button>
    </form>
  );
}