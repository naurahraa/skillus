import { prisma } from "@/lib/prisma";
import BarChartCard from "@/components/dashboard/BarChartCard";
import PieChartCard from "@/components/dashboard/PieChartCard";

const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];

export default async function AdminDashboardPage() {
  const [
    totalPeserta,
    totalPenyelenggara,
    totalEvent,
    totalEventPublished,
    totalRegistrasi,
    totalPendapatanRow,
    registrasi6Bulan,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "peserta" } }),
    prisma.user.count({ where: { role: "penyelenggara" } }),
    prisma.event.count(),
    prisma.event.count({ where: { status: "published" } }),
    prisma.registration.count({ where: { status: { not: "cancelled" } } }),
    prisma.transaction.aggregate({
      where: { status: "success" },
      _sum: { amount: true },
    }),
    prisma.registration.findMany({
      where: {
        status: { not: "cancelled" },
        createdAt: { gte: new Date(new Date().setMonth(new Date().getMonth() - 5, 1)) },
      },
      select: { createdAt: true },
    }),
  ]);

  const totalPendapatan = totalPendapatanRow._sum.amount ?? 0;

  // Susun data 6 bulan terakhir buat bar chart
  const bulanRange: { key: string; label: string }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    bulanRange.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: BULAN[d.getMonth()] });
  }
  const countPerBulan: Record<string, number> = Object.fromEntries(bulanRange.map((b) => [b.key, 0]));
  registrasi6Bulan.forEach((r) => {
    const d = new Date(r.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (countPerBulan[key] !== undefined) countPerBulan[key]++;
  });
  const registrasiChartData = bulanRange.map((b) => ({ label: b.label, value: countPerBulan[b.key] }));

  const roleChartData = [
    { name: "Peserta", value: totalPeserta },
    { name: "Penyelenggara", value: totalPenyelenggara },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A194D] mb-1">Dashboard Admin</h1>
      <p className="text-sm text-gray-500 mb-6">Ringkasan seluruh aktivitas platform SkillUs.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#EDF3FF] rounded-xl p-6">
          <p className="text-3xl font-bold text-[#1A194D]">{totalPeserta}</p>
          <p className="text-sm text-gray-600 mt-1">Total Peserta</p>
        </div>
        <div className="bg-[#EDF3FF] rounded-xl p-6">
          <p className="text-3xl font-bold text-[#1A194D]">{totalPenyelenggara}</p>
          <p className="text-sm text-gray-600 mt-1">Total Penyelenggara</p>
        </div>
        <div className="bg-[#EDF3FF] rounded-xl p-6">
          <p className="text-3xl font-bold text-[#1A194D]">{totalRegistrasi}</p>
          <p className="text-sm text-gray-600 mt-1">Total Registrasi Tiket</p>
        </div>
        <div className="bg-[#EDF3FF] rounded-xl p-6">
          <p className="text-3xl font-bold text-[#1A194D]">{totalEvent}</p>
          <p className="text-sm text-gray-600 mt-1">Total Event</p>
        </div>
        <div className="bg-[#EDF3FF] rounded-xl p-6">
          <p className="text-3xl font-bold text-[#1A194D]">{totalEventPublished}</p>
          <p className="text-sm text-gray-600 mt-1">Event Published</p>
        </div>
        <div className="bg-[#EDF3FF] rounded-xl p-6">
          <p className="text-2xl font-bold text-[#1A194D]">
            {totalPendapatan === 0 ? "Rp0" : `Rp${totalPendapatan.toLocaleString("id-ID")}`}
          </p>
          <p className="text-sm text-gray-600 mt-1">Total Transaksi Platform</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartCard title="Registrasi Tiket per Bulan" data={registrasiChartData} />
        <PieChartCard title="Distribusi Role User" data={roleChartData} />
      </div>
    </div>
  );
}