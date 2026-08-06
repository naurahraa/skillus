import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import FilterBar from "@/components/FilterBar";
import { blogPosts } from "@/lib/blog-data";
import type { Prisma } from "@prisma/client";

type SearchParams = { hari?: string; jenis?: string; kategori?: string; q?: string; lokasi?: string };

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const session = await auth();
  const buatEventHref =
    session?.user?.role === "penyelenggara"
      ? "/dashboard/penyelenggara/event/baru"
      : "/register?role=penyelenggara";

  const where: Prisma.EventWhereInput = { status: "published" };

  if (params.q) {
    where.judul = { contains: params.q, mode: "insensitive" };
  }

  if (params.lokasi) {
    where.lokasi = { contains: params.lokasi, mode: "insensitive" };
  }

  if (params.kategori) {
    where.kategori = params.kategori;
  }

  if (params.jenis === "online") {
    where.lokasi = "Online";
  } else if (params.jenis === "offline") {
    where.lokasi = { not: "Online" };
  }

  if (params.hari) {
    const now = new Date();
    let start: Date | undefined;
    let end: Date | undefined;

    if (params.hari === "hari-ini") {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      end = new Date(start);
      end.setDate(end.getDate() + 1);
    } else if (params.hari === "minggu-ini") {
      const day = now.getDay();
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
      end = new Date(start);
      end.setDate(end.getDate() + 7);
    } else if (params.hari === "bulan-ini") {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }

    if (start && end) {
      where.tanggal = { gte: start, lt: end };
    }
  }

  const [events, kategoriRows] = await Promise.all([
    prisma.event.findMany({
      where,
      orderBy: { tanggal: "asc" },
      take: 8,
    }),
    prisma.event.findMany({
      where: { status: "published" },
      select: { kategori: true },
      distinct: ["kategori"],
    }),
  ]);

  const kategoriList = kategoriRows
    .map((k) => k.kategori)
    .filter((k): k is string => Boolean(k));

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#4F4CEE] leading-tight mb-6">
              Satu Klik untuk Akses Ilmu Tanpa Batas.
            </h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Temukan seminar, workshop, webinar, dan kegiatan akademik lainnya di satu tempat.
            </p>
            <Link
              href="/event"
              className="inline-block bg-[#4F4CEE] text-white font-semibold px-8 py-3.5 rounded-lg hover:opacity-90 transition"
            >
              Jelajahi Sekarang
            </Link>
          </div>

          <div className="flex justify-center">
            {/* Ganti src ini kalau ilustrasi Figma udah diexport, taro di /public/hero-illustration.svg */}
            <img
              src="/hero-illustration.svg"
              alt="Ilustrasi mahasiswa"
              className="max-w-md w-full"
            />
          </div>
        </section>

        {/* Search bar card */}
        <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
          <form
            method="GET"
            action="/"
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-6 items-end"
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

        {/* Event Mendatang */}
        <section id="event-mendatang" className="max-w-7xl mx-auto px-6 pt-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold text-[#1A194D]">Event Mendatang</h2>
            <Suspense fallback={<div className="h-10" />}>
              <FilterBar kategoriList={kategoriList} />
            </Suspense>
          </div>

          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-16">Belum ada event yang tersedia.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  judul={event.judul ?? "Tanpa judul"}
                  kategori={event.kategori}
                  lokasi={event.lokasi}
                  tanggal={event.tanggal}
                  harga={event.harga ?? 0}
                  poster={event.poster}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href="/event"
              className="inline-block bg-[#4F4CEE] text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition"
            >
              Lihat Semua Event
            </Link>
          </div>
        </section>

        {/* CTA Buat Event */}
        <section className="bg-[#EDF3FF] mt-20 py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              {/* Ganti src ini kalau ilustrasi Figma udah diexport, taro di /public/cta-illustration.svg */}
              <img
                src="/cta-illustration.svg"
                alt="Ilustrasi diskusi event"
                className="max-w-sm w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-[#1A194D] mb-4">
                Buat Event Akademikmu Sendiri
              </h2>
              <p className="text-gray-600 mb-6">
                Daftarkan event kampusmu secara mudah dan gratis lewat SkillUs.
              </p>
              <Link
                href={buatEventHref}
                className="inline-block bg-[#F99007] text-white font-semibold px-8 py-3.5 rounded-lg hover:opacity-90 transition"
              >
                Buat Event Sekarang
              </Link>
            </div>
          </div>
        </section>

        {/* Insight & Artikel */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-[#1A194D] mb-3">Insight & Artikel</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-12">
            Dapetin tips, panduan, dan inspirasi terbaru seputar pengembangan diri, akademik, dan teknologi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition"
              >
                <div className="h-40 bg-gradient-to-br from-[#EDF3FF] to-[#DEE7FF]" />
                <div className="p-5">
                  <h3 className="font-semibold text-[#1A194D] mb-2 leading-snug">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
                  <p className="text-xs text-gray-400">{post.date} — {post.author}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-block bg-[#4F4CEE] text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition"
            >
              Lihat Artikel Lainnya
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}