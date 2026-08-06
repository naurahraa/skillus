import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import BarChartCard from "@/components/dashboard/BarChartCard";

export default async function PenyelenggaraDashboardPage() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { penyelenggaraProfile: true },
  });
  const nama = user?.penyelenggaraProfile?.namaPic || user?.email || "Pengguna";

  const events = await prisma.event.findMany({
    where: { penyelenggaraId: userId },
    include: { registrations: { include: { transaction: true } } },
    orderBy: { tanggal: "asc" },
  });

  const now = new Date();
  const akanDatang = events.filter((e) => e.tanggal && new Date(e.tanggal) >= now);
  const selesai = events.filter((e) => e.tanggal && new Date(e.tanggal) < now);
  const totalPeserta = events.reduce((sum, e) => sum + e.registrations.length, 0);
  const totalPendapatan = events.reduce((sum, e) => {
    const eventIncome = e.registrations.reduce((s, r) => {
      return s + (r.transaction?.status === "success" ? r.transaction.amount : 0);
    }, 0);
    return sum + eventIncome;
  }, 0);

  const pesertaPerEventData = [...events]
    .sort((a, b) => b.registrations.length - a.registrations.length)
    .slice(0, 6)
    .map((e) => ({
      label: (e.judul ?? "-").length > 14 ? `${(e.judul ?? "-").slice(0, 14)}...` : e.judul ?? "-",
      value: e.registrations.length,
    }));

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A194D]">Selamat datang, {nama}!</h1>
          <p className="text-sm text-gray-500">Berikut ringkasan event kamu.</p>
        </div>
        <Link
          href="/dashboard/penyelenggara/event/baru"
          className="bg-[#4F4CEE] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition inline-flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Buat Event
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#EDF3FF] rounded-xl p-6">
          <p className="text-3xl font-bold text-[#1A194D]">{events.length}</p>
          <p className="text-sm text-gray-600 mt-1">Total Event</p>
        </div>
        <div className="bg-[#EDF3FF] rounded-xl p-6">
          <p className="text-3xl font-bold text-[#1A194D]">{akanDatang.length}</p>
          <p className="text-sm text-gray-600 mt-1">Akan Datang</p>
        </div>
        <div className="bg-[#EDF3FF] rounded-xl p-6">
          <p className="text-3xl font-bold text-[#1A194D]">{totalPeserta}</p>
          <p className="text-sm text-gray-600 mt-1">Total Peserta</p>
        </div>
        <div className="bg-[#EDF3FF] rounded-xl p-6">
          <p className="text-2xl font-bold text-[#1A194D]">
            {totalPendapatan === 0 ? "Rp0" : `Rp${totalPendapatan.toLocaleString("id-ID")}`}
          </p>
          <p className="text-sm text-gray-600 mt-1">Total Pendapatan</p>
        </div>
      </div>

      {events.length > 0 && (
        <div className="mb-6">
          <BarChartCard title="Peserta per Event" data={pesertaPerEventData} color="#F99007" />
        </div>
      )}

      {/* Event terbaru */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-[#1A194D]">Event Kamu</h2>
          <Link href="/dashboard/penyelenggara/event" className="text-sm font-medium text-[#4F4CEE] hover:underline">
            Lihat Semua
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-14">
            <p className="text-gray-500 mb-5">Kamu belum bikin event apapun.</p>
            <Link
              href="/dashboard/penyelenggara/event/baru"
              className="bg-[#4F4CEE] text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition"
            >
              Buat Event Pertama
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {events.slice(0, 5).map((event) => {
              const tanggalText = event.tanggal
                ? new Date(event.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                : "-";
              return (
                <Link
                  key={event.id}
                  href={`/dashboard/penyelenggara/event/${event.id}`}
                  className="flex items-center justify-between py-3.5 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition"
                >
                  <div>
                    <p className="font-medium text-sm text-[#1A194D]">{event.judul}</p>
                    <p className="text-xs text-gray-500">{tanggalText} · {event.registrations.length} peserta</p>
                  </div>
                  <span
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                      event.status === "published"
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {event.status === "published" ? "Published" : "Draft"}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}