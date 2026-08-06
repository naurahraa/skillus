import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QRCodeModal from "@/components/dashboard/QRCodeModal";
import CancelRegistrationButton from "@/components/CancelRegistrationButton";
import { cancelRegistration } from "./actions";

export default async function EventDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;
  const eventId = Number(id);
  if (Number.isNaN(eventId)) notFound();

  const [event, session] = await Promise.all([
    prisma.event.findUnique({ where: { id: eventId } }),
    auth(),
  ]);

  if (!event) notFound();

  let registration = null;
  if (session?.user) {
    registration = await prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId: Number(session.user.id),
          eventId,
        },
      },
    });
  }

  const isRegistered = Boolean(registration) && registration?.status !== "cancelled";

  const tanggalText = event.tanggal
    ? new Date(event.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    : "-";
  const hargaText = (event.harga ?? 0) === 0 ? "Gratis" : `Rp${(event.harga ?? 0).toLocaleString("id-ID")}`;

  const jumlahTerdaftar = await prisma.registration.count({
    where: { eventId, status: { not: "cancelled" } },
  });
  const kuotaPenuh = (event.kuota ?? 0) > 0 && jumlahTerdaftar >= (event.kuota ?? 0);
  const eventSudahLewat = event.tanggal ? new Date(event.tanggal) < new Date() : false;
  const cancelAction = cancelRegistration.bind(null, event.id);

  const breadcrumb =
    from === "dashboard"
      ? { href: "/dashboard/peserta", label: "Dashboard" }
      : from === "event"
      ? { href: "/event", label: "Event" }
      : { href: "/", label: "Home" };

  return (
    <>
      <Navbar />

      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href={breadcrumb.href} className="text-[#4F4CEE] font-medium hover:underline">{breadcrumb.label}</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-gray-700">{event.judul}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">
        <div>
          <div className="h-96 rounded-xl bg-gradient-to-br from-[#EDF3FF] to-[#DEE7FF] flex items-center justify-center mb-6 overflow-hidden">
            {event.poster ? (
              <img src={event.poster} alt={event.judul ?? ""} className="w-full h-full object-cover" />
            ) : (
              <svg width="60" height="39" viewBox="0 0 83 54" fill="none" opacity="0.5">
                <path d="M29.2979 29.708C29.2982 28.8174 30.4241 28.317 31.127 28.8643C33.7771 30.928 39.0567 34.2939 45.2979 34.2939C51.4034 34.2939 56.3585 31.0721 58.9141 29C59.6201 28.4279 60.7979 28.9321 60.7979 29.8408V36.9326C60.7977 37.1663 60.7166 37.392 60.5547 37.5605C59.438 38.7228 54.463 43.2939 45.2979 43.2939C36.1518 43.2939 30.7996 38.7414 29.5713 37.5674C29.3905 37.3945 29.2979 37.1554 29.2979 36.9053V29.708Z" fill="#4F4CEE" />
                <path d="M43.959 9.69727C44.491 9.44198 45.1086 9.43417 45.6465 9.67676L66.3535 19.0156C67.9078 19.7166 67.9286 21.9166 66.3877 22.6465L61.6172 24.9062C61.0964 25.1529 60.4945 25.1627 59.9658 24.9336L46.3701 19.042C46.0108 18.8865 45.5985 18.9139 45.2627 19.1152C44.427 19.6166 44.4921 20.8484 45.376 21.2588L53.4551 25.0107C54.9879 25.7224 55.002 27.8957 53.4785 28.627L45.6455 32.3877C45.1089 32.6453 44.4851 32.65 43.9443 32.4014L23.6641 23.0723C22.1259 22.3646 22.1083 20.1858 23.6348 19.4531L43.959 9.69727Z" fill="#4F4CEE" />
              </svg>
            )}
          </div>

          <h1 className="text-2xl font-bold text-[#1A194D] mb-3">{event.judul}</h1>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" strokeLinecap="round" />
            </svg>
            {tanggalText} {event.waktu && `| ${event.waktu}`}
          </div>
          {event.lokasi && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.5 7.3 11.7.2.2.5.3.7.3s.5-.1.7-.3C12.9 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
              </svg>
              {event.lokasi}
            </div>
          )}

          <section id="tiket" className="mb-10">
            <h2 className="text-lg font-bold text-[#1A194D] mb-3">{isRegistered ? "Ticket Saya" : "Tiket"}</h2>

            {isRegistered ? (
              <div className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <p className="font-semibold text-[#4F4CEE] text-sm mb-1.5">Reguler | {event.judul}</p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                      {tanggalText} {event.waktu && `| ${event.waktu}`}
                    </div>
                    {event.lokasi && <div className="text-xs text-gray-500">{event.lokasi}</div>}
                  </div>
                  <QRCodeModal
                    value={registration?.qrCode ?? String(registration?.id ?? "")}
                    label={event.judul ?? ""}
                  />
                </div>
                {!eventSudahLewat && (
                  <div className="pt-3 border-t border-gray-50">
                    <CancelRegistrationButton action={cancelAction} />
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm text-[#1A194D] mb-1">Reguler | {event.judul}</p>
                  <p className="text-xs text-gray-400">Penjualan berakhir pada {tanggalText} | 00.00</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-semibold text-gray-700 text-sm">{hargaText}</span>
                  {kuotaPenuh ? (
                    <span className="bg-gray-100 text-gray-400 text-xs font-semibold px-4 py-2.5 rounded-lg cursor-not-allowed">
                      Kuota Penuh
                    </span>
                  ) : (
                    <Link
                      href={session?.user ? `/event/${event.id}/checkout` : `/login?callbackUrl=/event/${event.id}`}
                      className="bg-[#4F4CEE] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition"
                    >
                      Beli Tiket
                    </Link>
                  )}
                </div>
              </div>
            )}
          </section>

          <section id="deskripsi" className="mb-10">
            <h2 className="text-lg font-bold text-[#1A194D] mb-3">Deskripsi Event</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {event.deskripsi || "Belum ada deskripsi untuk event ini."}
            </p>
          </section>

          <section id="syarat">
            <h2 className="text-lg font-bold text-[#1A194D] mb-3">Syarat & Ketentuan</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 leading-relaxed">
              <li>Peserta wajib menunjukkan tiket yang valid (digital atau cetak) saat registrasi.</li>
              <li>Tiket tidak dapat dikembalikan (non-refundable), namun dapat dialihkan kepada orang lain dengan konfirmasi sebelumnya.</li>
              <li>Peserta diwajibkan membawa laptop pribadi beserta perlengkapannya jika dibutuhkan.</li>
              <li>Penyelenggara berhak melakukan perubahan jadwal atau pembicara jika diperlukan.</li>
              <li>Peserta harus mengikuti minimal 80% sesi untuk mendapatkan sertifikat.</li>
              <li>Perekaman (audio/video) selama sesi pelatihan dilarang tanpa izin penyelenggara.</li>
              <li>Seluruh materi pelatihan hanya boleh digunakan untuk kepentingan belajar pribadi.</li>
              <li>Penyelenggara tidak bertanggung jawab atas kehilangan atau kerusakan barang pribadi peserta.</li>
              <li>Peserta diharapkan menjaga sikap dan menghormati mentor serta peserta lain.</li>
              <li>Penyediaan makanan atau minuman mengikuti kebijakan venue dan dapat berubah sewaktu-waktu.</li>
              <li>Dengan mengikuti acara ini, peserta memberikan izin kepada penyelenggara untuk menggunakan foto dokumentasi acara untuk keperluan promosi.</li>
              <li>Segala bentuk perilaku mengganggu dapat mengakibatkan peserta dikeluarkan dari acara tanpa kompensasi.</li>
            </ol>
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 border border-gray-100 rounded-xl p-5">
            <p className="text-xs font-semibold text-gray-400 text-center mb-4 uppercase tracking-wide">Navigasi</p>
            <nav className="flex flex-col gap-4">
              <a href="#tiket" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4F4CEE]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9a2 2 0 100-4 2 2 0 000 4zm0 10a2 2 0 100-4 2 2 0 000 4zM3 5h18M3 19h18M3 12h18" />
                </svg>
                Ticket
              </a>
              <a href="#deskripsi" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4F4CEE]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6M9 13h6M9 17h6" strokeLinecap="round" />
                </svg>
                Deskripsi
              </a>
              <a href="#syarat" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4F4CEE]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
                </svg>
                Syarat & Ketentuan
              </a>
            </nav>
          </div>
        </aside>
      </main>

      <Footer />
    </>
  );
}