import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { deleteEvent } from "../actions";
import DeleteEventButton from "@/components/dashboard/DeleteEventButton";

export default async function EventDetailManagePage({
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

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      registrations: {
        include: { user: { include: { pesertaProfile: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!event || event.penyelenggaraId !== userId) notFound();

  const tanggalText = event.tanggal
    ? new Date(event.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    : "-";
  const hargaText = (event.harga ?? 0) === 0 ? "Gratis" : `Rp${(event.harga ?? 0).toLocaleString("id-ID")}`;
  const deleteAction = deleteEvent.bind(null, event.id);

  const STATUS_LABEL: Record<string, string> = {
    registered: "Terdaftar",
    checked_in: "Hadir",
    cancelled: "Batal",
  };
  const STATUS_STYLE: Record<string, string> = {
    registered: "bg-blue-50 text-blue-600",
    checked_in: "bg-green-50 text-green-600",
    cancelled: "bg-gray-100 text-gray-500",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <Link
            href="/dashboard/penyelenggara/event"
            className="text-sm text-[#4F4CEE] hover:underline mb-2 inline-block"
          >
            ← Kembali ke Kelola Event
          </Link>
          <h1 className="text-xl font-bold text-[#1A194D]">{event.judul}</h1>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={`/dashboard/penyelenggara/event/${event.id}/edit`}
            className="bg-[#EDF3FF] text-[#4F4CEE] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#DEE7FF] transition"
          >
            Edit
          </Link>
          <DeleteEventButton action={deleteAction} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">Tanggal</p>
          <p className="text-sm font-medium text-[#1A194D]">
            {tanggalText} {event.waktu && `| ${event.waktu}`}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Lokasi</p>
          <p className="text-sm font-medium text-[#1A194D]">{event.lokasi || "-"}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Harga</p>
          <p className="text-sm font-medium text-[#1A194D]">{hargaText}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Kuota</p>
          <p className="text-sm font-medium text-[#1A194D]">
            {event.registrations.length} / {event.kuota}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-bold text-[#1A194D] mb-5">
          Peserta Terdaftar ({event.registrations.length})
        </h2>

        {event.registrations.length === 0 ? (
          <p className="text-gray-500 text-center py-14">Belum ada peserta yang daftar.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-600">
                  <th className="px-4 py-3 font-semibold rounded-l-lg">Nama</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Tanggal Daftar</th>
                  <th className="px-4 py-3 font-semibold rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {event.registrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3 font-medium text-[#1A194D]">
                      {reg.user.pesertaProfile?.namaLengkap || "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{reg.user.email}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(reg.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${STATUS_STYLE[reg.status]}`}>
                        {STATUS_LABEL[reg.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}