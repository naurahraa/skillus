import { redirect } from "next/navigation";
import crypto from "crypto";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = Number(id);
  const session = await auth();

  if (!session?.user) {
    redirect(`/login?callbackUrl=/event/${eventId}/checkout`);
  }

  if (session.user.role !== "peserta") {
    redirect(`/event/${eventId}`);
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) redirect("/event");

  const existing = await prisma.registration.findUnique({
    where: {
      userId_eventId: { userId: Number(session.user.id), eventId },
    },
  });
  if (existing && existing.status !== "cancelled") {
    redirect(`/event/${eventId}?toast=` + encodeURIComponent("Pembayaran berhasil! Tiket kamu udah aktif."));
  }

  const jumlahTerdaftar = await prisma.registration.count({
    where: { eventId, status: { not: "cancelled" } },
  });
  const kuotaPenuh = (event.kuota ?? 0) > 0 && jumlahTerdaftar >= (event.kuota ?? 0);
  if (kuotaPenuh) {
    redirect(`/event/${eventId}?toast=` + encodeURIComponent("Pembayaran berhasil! Tiket kamu udah aktif."));
  }

  const hargaText = (event.harga ?? 0) === 0 ? "Gratis" : `Rp${(event.harga ?? 0).toLocaleString("id-ID")}`;

  async function bayarSekarang() {
    "use server";
    const session = await auth();
    if (!session?.user) redirect("/login");

    const userId = Number(session.user.id);

    // Cek ulang kuota tepat sebelum bikin registrasi (jaga race condition)
    const currentEvent = await prisma.event.findUnique({ where: { id: eventId } });
    const currentTerdaftar = await prisma.registration.count({
      where: { eventId, status: { not: "cancelled" } },
    });
    const masihPenuh = (currentEvent?.kuota ?? 0) > 0 && currentTerdaftar >= (currentEvent?.kuota ?? 0);
    if (masihPenuh) {
      redirect(`/event/${eventId}?toast=` + encodeURIComponent("Pembayaran berhasil! Tiket kamu udah aktif."));
    }

    const qrCode = crypto.randomUUID();

    const registration = await prisma.registration.create({
      data: {
        userId,
        eventId,
        status: "registered",
        qrCode,
      },
    });

    await prisma.transaction.create({
      data: {
        registrationId: registration.id,
        amount: event?.harga ?? 0,
        status: "success",
      },
    });

    redirect(`/event/${eventId}?toast=` + encodeURIComponent("Pembayaran berhasil! Tiket kamu udah aktif."));
  }

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold text-[#1A194D] mb-8">Checkout</h1>

        <div className="border border-gray-100 rounded-xl p-6 mb-6">
          <p className="text-xs text-gray-400 mb-1">Event</p>
          <p className="font-semibold text-[#1A194D] mb-4">{event.judul}</p>

          <p className="text-xs text-gray-400 mb-1">Tiket</p>
          <p className="text-sm text-gray-700 mb-4">Reguler</p>

          {(event.kuota ?? 0) > 0 && (
            <p className="text-xs text-gray-400 mb-4">
              Sisa kuota: {Math.max((event.kuota ?? 0) - jumlahTerdaftar, 0)} dari {event.kuota}
            </p>
          )}

          <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Total Pembayaran</span>
            <span className="text-lg font-bold text-[#1A194D]">{hargaText}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-5">
          * Ini simulasi pembayaran untuk keperluan demo/tugas kuliah, belum terhubung ke payment gateway asli.
        </p>

        <form action={bayarSekarang}>
          <button
            type="submit"
            className="w-full bg-[#4F4CEE] text-white font-semibold py-3.5 rounded-lg hover:opacity-90 transition"
          >
            Bayar Sekarang
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}