import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateEvent } from "../../actions";
import EventForm from "@/components/dashboard/EventForm";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = Number(id);
  const session = await auth();
  if (!session?.user || session.user.role !== "penyelenggara") {
    redirect("/login");
  }
  const userId = Number(session?.user?.id);

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || event.penyelenggaraId !== userId) notFound();

  const updateEventWithId = updateEvent.bind(null, eventId);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-2xl">
      <h1 className="text-xl font-bold text-[#1A194D] mb-6">Edit Event</h1>
      <EventForm
        action={updateEventWithId}
        submitLabel="Simpan Perubahan"
        currentPosterUrl={event.poster}
        defaultValues={{
          judul: event.judul ?? "",
          deskripsi: event.deskripsi ?? "",
          kategori: event.kategori ?? "",
          lokasi: event.lokasi ?? "",
          tanggal: event.tanggal ? new Date(event.tanggal).toISOString().split("T")[0] : "",
          waktu: event.waktu ?? "",
          harga: event.harga ?? 0,
          kuota: event.kuota ?? 0,
          status: event.status,
        }}
      />
    </div>
  );
}