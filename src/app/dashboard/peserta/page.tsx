import EventKamuTabs from "@/components/dashboard/EventKamuTabs";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PesertaEventCard from "@/components/dashboard/PesertaEventCard";

export default async function PesertaDashboardPage() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { pesertaProfile: true },
  });

  const nama = user?.pesertaProfile?.namaLengkap || user?.email || "Pengguna";

  const registrations = await prisma.registration.findMany({
    where: { userId, status: { not: "cancelled" } },
    include: { event: true },
    orderBy: { event: { tanggal: "asc" } },
  });

  const now = new Date();
  const akanDatang = registrations.filter((r) => r.event.tanggal && new Date(r.event.tanggal) >= now);
  const selesai = registrations.filter((r) => r.event.tanggal && new Date(r.event.tanggal) < now);

  const sedangBerlangsung = registrations.find((r) => {
    if (!r.event.tanggal) return false;
    return new Date(r.event.tanggal).toDateString() === now.toDateString();
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A194D]">Selamat datang, {nama}!</h1>
          <p className="text-sm text-gray-500">Berikut aktivitas terbaru.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari Event Kamu"
            className="flex-1 md:w-72 border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
          />
          <button className="bg-[#4F4CEE] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition">
            Search
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#EDF3FF] rounded-xl p-6">
          <p className="text-3xl font-bold text-[#1A194D]">{akanDatang.length}</p>
          <p className="text-sm text-gray-600 mt-1">Akan Datang</p>
        </div>
        <div className="bg-[#EDF3FF] rounded-xl p-6">
          <p className="text-3xl font-bold text-[#1A194D]">{selesai.length}</p>
          <p className="text-sm text-gray-600 mt-1">Selesai</p>
        </div>
        <div className="bg-[#EDF3FF] rounded-xl p-6">
          <p className="text-3xl font-bold text-[#1A194D]">{registrations.length}</p>
          <p className="text-sm text-gray-600 mt-1">Total Event</p>
        </div>
      </div>

      {/* Sedang Berlangsung */}
      {sedangBerlangsung && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
          <h2 className="font-bold text-[#1A194D] mb-4">Sedang Berlangsung</h2>
          <div className="max-w-xs">
            <PesertaEventCard
              id={sedangBerlangsung.event.id}
              judul={sedangBerlangsung.event.judul ?? "-"}
              lokasi={sedangBerlangsung.event.lokasi}
              tanggal={sedangBerlangsung.event.tanggal}
              waktu={sedangBerlangsung.event.waktu}
              poster={sedangBerlangsung.event.poster}
            />
          </div>
        </div>
      )}

      {/* Event Kamu */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-bold text-[#1A194D] mb-4">Event Kamu</h2>

        {registrations.length === 0 ? (
          <div className="flex flex-col items-center text-center py-10">
            <img src="/empty-state-illustration.svg" alt="Belum ada event" className="w-64 mb-6" />
            <p className="text-gray-600 mb-5">Kamu belum memiliki event apapun, yuk explore...</p>
            <a
              href="/event"
              className="bg-[#4F4CEE] text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition"
            >
              Cari Event
            </a>
          </div>
        ) : (
          <EventKamuTabs
            akanDatang={akanDatang.map((r) => ({
              id: r.event.id,
              judul: r.event.judul ?? "-",
              lokasi: r.event.lokasi,
              tanggal: r.event.tanggal,
              waktu: r.event.waktu,
              poster: r.event.poster,
            }))}
            selesai={selesai.map((r) => ({
              id: r.event.id,
              judul: r.event.judul ?? "-",
              lokasi: r.event.lokasi,
              tanggal: r.event.tanggal,
              waktu: r.event.waktu,
              poster: r.event.poster,
            }))}
          />
        )}
      </div>
    </div>
  );
}