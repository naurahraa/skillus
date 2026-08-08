import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { deleteEvent } from "./actions";
import DeleteEventButton from "@/components/dashboard/DeleteEventButton";

export default async function KelolaEventPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "penyelenggara") {
    redirect("/login");
  }
  const userId = Number(session?.user?.id);

  const events = await prisma.event.findMany({
    where: { penyelenggaraId: userId },
    include: { registrations: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-[#1A194D]">Kelola Event</h1>
        <Link
          href="/dashboard/penyelenggara/event/baru"
          className="bg-[#4F4CEE] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition"
        >
          + Buat Event
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {events.length === 0 ? (
          <p className="text-gray-500 text-center py-16">Belum ada event. Yuk buat yang pertama!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-600">
                  <th className="px-4 py-3 font-semibold rounded-l-lg">Judul</th>
                  <th className="px-4 py-3 font-semibold">Tanggal</th>
                  <th className="px-4 py-3 font-semibold">Peserta</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold rounded-r-lg">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  const tanggalText = event.tanggal
                    ? new Date(event.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                    : "-";
                  const deleteAction = deleteEvent.bind(null, event.id);
                  return (
                    <tr key={event.id} className="border-b border-gray-50 last:border-0">
                      <td className="px-4 py-3 font-medium text-[#1A194D]">{event.judul}</td>
                      <td className="px-4 py-3 text-gray-600">{tanggalText}</td>
                      <td className="px-4 py-3 text-gray-600">{event.registrations.length}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                            event.status === "published"
                              ? "bg-green-50 text-green-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {event.status === "published" ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/dashboard/penyelenggara/event/${event.id}`}
                            className="text-[#4F4CEE] text-xs font-semibold hover:underline"
                          >
                            Lihat
                          </Link>
                          <Link
                            href={`/dashboard/penyelenggara/event/${event.id}/edit`}
                            className="text-gray-600 text-xs font-semibold hover:underline"
                          >
                            Edit
                          </Link>
                          <DeleteEventButton action={deleteAction} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}