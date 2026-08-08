"use server";

import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import sharp from "sharp";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requirePenyelenggara() {
  const session = await auth();
  if (!session?.user || session.user.role !== "penyelenggara") {
    redirect("/login");
  }
  return Number(session!.user.id);
}

async function uploadPosterIfProvided(formData: FormData): Promise<string | null> {
  const file = formData.get("poster") as File | null;
  if (!file || file.size === 0) return null;

  const buffer = Buffer.from(await file.arrayBuffer());

  // Otomatis di-resize & dikompres, biar ukuran file poster berapa pun tetep aman
  const compressed = await sharp(buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();

  const fileName = file.name.replace(/\.[^.]+$/, "");
  const blob = await put(`event-posters/${Date.now()}-${fileName}.jpg`, compressed, {
    access: "public",
    contentType: "image/jpeg",
  });

  return blob.url;
}

export async function createEvent(formData: FormData) {
  const penyelenggaraId = await requirePenyelenggara();
  const posterUrl = await uploadPosterIfProvided(formData);

  await prisma.event.create({
    data: {
      penyelenggaraId,
      judul: formData.get("judul") as string,
      deskripsi: (formData.get("deskripsi") as string) || null,
      kategori: (formData.get("kategori") as string) || null,
      lokasi: (formData.get("lokasi") as string) || null,
      tanggal: formData.get("tanggal") ? new Date(formData.get("tanggal") as string) : null,
      waktu: (formData.get("waktu") as string) || null,
      harga: Number(formData.get("harga")) || 0,
      kuota: Number(formData.get("kuota")) || 0,
      status: (formData.get("status") as "draft" | "published") || "draft",
      poster: posterUrl,
    },
  });

  redirect("/dashboard/penyelenggara/event?toast=" + encodeURIComponent("Event berhasil dibuat!"));
}

export async function updateEvent(eventId: number, formData: FormData) {
  const penyelenggaraId = await requirePenyelenggara();

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || event.penyelenggaraId !== penyelenggaraId) {
    redirect("/dashboard/penyelenggara/event");
  }

  const newPosterUrl = await uploadPosterIfProvided(formData);

  await prisma.event.update({
    where: { id: eventId },
    data: {
      judul: formData.get("judul") as string,
      deskripsi: (formData.get("deskripsi") as string) || null,
      kategori: (formData.get("kategori") as string) || null,
      lokasi: (formData.get("lokasi") as string) || null,
      tanggal: formData.get("tanggal") ? new Date(formData.get("tanggal") as string) : null,
      waktu: (formData.get("waktu") as string) || null,
      harga: Number(formData.get("harga")) || 0,
      kuota: Number(formData.get("kuota")) || 0,
      status: (formData.get("status") as "draft" | "published") || "draft",
      poster: newPosterUrl ?? event.poster,
    },
  });

  redirect(`/dashboard/penyelenggara/event/${eventId}?toast=` + encodeURIComponent("Perubahan berhasil disimpan!"));
}

export async function deleteEvent(eventId: number) {
  const penyelenggaraId = await requirePenyelenggara();

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || event.penyelenggaraId !== penyelenggaraId) {
    redirect("/dashboard/penyelenggara/event?toast=" + encodeURIComponent("Event berhasil dihapus."));
  }

  await prisma.event.delete({ where: { id: eventId } });

  redirect("/dashboard/penyelenggara/event?toast=" + encodeURIComponent("Event berhasil dihapus."));
}