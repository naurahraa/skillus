import { prisma } from "@/lib/prisma";
import { toggleEventStatus, deleteEventAsAdmin } from "../actions";
import DeleteEventButton from "@/components/dashboard/DeleteEventButton";

export default async function AdminEventPage() {
  const events = await prisma.event.findMany({
    include: {
      penyelenggara: { include: { penyelenggaraProfile: true } },
      registrations: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-xl font-bold text-[#1A194D] mb-6">Kelola Event</h1>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {events.length === 0 ? (
          <p className="text-gray-500 text-center py-16">Belum ada event di platform.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-600">
                  <th className="px-4 py-3 font-semibold rounded-l-lg">Judul</th>
                  <th className="px-4 py-3 font-semibold">Penyelenggara</th>
                  <th className="px-4 py-3 font-semibold">Peserta</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold rounded-r-lg">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  const toggleAction = toggleEventStatus.bind(null, event.id, event.status);
                  const deleteAction = deleteEventAsAdmin.bind(null, event.id);
                  const namaOrganisasi = event.penyelenggara.penyelenggaraProfile?.organisasi || event.penyelenggara.email;

                  return (
                    <tr key={event.id} className="border-b border-gray-50 last:border-0">
                      <td className="px-4 py-3 font-medium text-[#1A194D]">{event.judul}</td>
                      <td className="px-4 py-3 text-gray-600">{namaOrganisasi}</td>
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
                          <form action={toggleAction}>
                            <button type="submit" className="text-[#4F4CEE] text-xs font-semibold hover:underline">
                              {event.status === "published" ? "Unpublish" : "Publish"}
                            </button>
                          </form>
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