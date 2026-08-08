import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import EventListCard from "@/components/EventListCard";
import type { Prisma } from "@prisma/client";

type SearchParams = { kategori?: string; q?: string; lokasi?: string };

const ALL_KATEGORI = ["Seminar", "Webinar", "Workshop", "Kursus"];

export default async function EventPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const [params, session] = await Promise.all([searchParams, auth()]);

  const where: Prisma.EventWhereInput = { status: "published" };
  if (params.kategori) {
    where.kategori = params.kategori;
  }
  if (params.q) {
    where.judul = { contains: params.q, mode: "insensitive" };
  }
  if (params.lokasi) {
    where.lokasi = { contains: params.lokasi, mode: "insensitive" };
  }

  const events = await prisma.event.findMany({
    where,
    orderBy: { tanggal: "asc" },
  });

  return (
    <>
      <Navbar />

      <CategoryTabs kategoriList={ALL_KATEGORI} />

      <main>
        <section className="bg-[#EDF3FF] py-16 text-center px-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1A194D] max-w-2xl mx-auto leading-snug">
            Event di SkillUs tersedia dari skala kampus hingga nasional. Ikuti kegiatan sesuai minat dan jadwalmu.
          </h1>
        </section>

        <section className="max-w-5xl mx-auto px-6 mt-10">
          <form
            method="GET"
            action="/event"
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-6 items-end"
          >
            <div>
              <label className="block text-sm font-semibold text-[#1A194D] mb-1">Event</label>
              <input
                type="text"
                name="q"
                defaultValue={params.q ?? ""}
                placeholder="Cari nama event atau topik..."
                className="w-full border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#4F4CEE]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A194D] mb-1">Tempat</label>
              <input
                type="text"
                name="lokasi"
                defaultValue={params.lokasi ?? ""}
                placeholder="Pilih lokasi acara"
                className="w-full border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#4F4CEE]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A194D] mb-1">Waktu</label>
              <input
                type="text"
                disabled
                placeholder="Segera hadir"
                title="Fitur filter tanggal segera hadir"
                className="w-full border-b border-gray-200 py-1.5 text-sm placeholder:text-gray-400 cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              className="bg-[#4F4CEE] text-white p-2.5 rounded-lg hover:opacity-90 transition shrink-0"
              title="Cari"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>
          </form>
        </section>

        <section className="max-w-7xl mx-auto px-6 pt-14 pb-20">
          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-20">
              Nggak ada event yang cocok sama filter ini.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((event) => (
                <EventListCard
                  key={event.id}
                  id={event.id}
                  judul={event.judul ?? "Tanpa judul"}
                  deskripsi={event.deskripsi}
                  kategori={event.kategori}
                  lokasi={event.lokasi}
                  tanggal={event.tanggal}
                  harga={event.harga ?? 0}
                  isLoggedIn={Boolean(session?.user)}
                  poster={event.poster}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}