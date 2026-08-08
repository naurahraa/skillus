import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateEvent } from "../../actions";
import EventFormFields from "@/components/dashboard/EventFormFields";

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
      <form action={updateEventWithId} className="space-y-5">
        <EventFormFields
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
        <button
          type="submit"
          className="w-full bg-[#4F4CEE] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}