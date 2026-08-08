"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function cancelRegistration(eventId: number) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const userId = Number(session.user.id);

  const [registration, event] = await Promise.all([
    prisma.registration.findUnique({
      where: { userId_eventId: { userId, eventId } },
      include: { transaction: true },
    }),
    prisma.event.findUnique({ where: { id: eventId } }),
  ]);

  // Nggak bisa cancel kalau eventnya udah lewat
  const sudahLewat = event?.tanggal ? new Date(event.tanggal) < new Date() : false;

  if (registration && registration.status !== "cancelled" && !sudahLewat) {
    await prisma.registration.update({
      where: { id: registration.id },
      data: { status: "cancelled" },
    });

    // Ikut update status transaksinya, biar konsisten di riwayat Transaksi
    if (registration.transaction) {
      await prisma.transaction.update({
        where: { id: registration.transaction.id },
        data: { status: "cancelled" },
      });
    }
  }

  redirect(`/event/${eventId}?toast=` + encodeURIComponent("Pendaftaran berhasil dibatalkan."));
}