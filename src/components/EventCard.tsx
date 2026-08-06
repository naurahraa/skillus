import Link from "next/link";

type EventCardProps = {
  id: number;
  judul: string;
  kategori: string | null;
  lokasi: string | null;
  tanggal: Date | null;
  harga: number;
  poster?: string | null;
};

const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];

export default function EventCard({ id, judul, kategori, lokasi, tanggal, harga, poster }: EventCardProps) {
  const bulan = tanggal ? BULAN[tanggal.getMonth()] : "-";
  const tanggalAngka = tanggal ? tanggal.getDate() : "-";
  const isOnline = lokasi?.toLowerCase() === "online";
  const hargaText = harga === 0 ? "Gratis" : `Rp${harga.toLocaleString("id-ID")}`;

  return (
    <Link
      href={`/event/${id}?from=home`}
      className="block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition"
    >
      {/* Placeholder gambar */}
      <div className="h-40 bg-gradient-to-br from-[#EDF3FF] to-[#DEE7FF] flex items-center justify-center overflow-hidden">
        {poster ? (
          <img src={poster} alt={judul} className="w-full h-full object-cover" />
        ) : (
          <svg width="40" height="26" viewBox="0 0 83 54" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.5">
            <path d="M29.2979 29.708C29.2982 28.8174 30.4241 28.317 31.127 28.8643C33.7771 30.928 39.0567 34.2939 45.2979 34.2939C51.4034 34.2939 56.3585 31.0721 58.9141 29C59.6201 28.4279 60.7979 28.9321 60.7979 29.8408V36.9326C60.7977 37.1663 60.7166 37.392 60.5547 37.5605C59.438 38.7228 54.463 43.2939 45.2979 43.2939C36.1518 43.2939 30.7996 38.7414 29.5713 37.5674C29.3905 37.3945 29.2979 37.1554 29.2979 36.9053V29.708Z" fill="#4F4CEE" />
            <path d="M43.959 9.69727C44.491 9.44198 45.1086 9.43417 45.6465 9.67676L66.3535 19.0156C67.9078 19.7166 67.9286 21.9166 66.3877 22.6465L61.6172 24.9062C61.0964 25.1529 60.4945 25.1627 59.9658 24.9336L46.3701 19.042C46.0108 18.8865 45.5985 18.9139 45.2627 19.1152C44.427 19.6166 44.4921 20.8484 45.376 21.2588L53.4551 25.0107C54.9879 25.7224 55.002 27.8957 53.4785 28.627L45.6455 32.3877C45.1089 32.6453 44.4851 32.65 43.9443 32.4014L23.6641 23.0723C22.1259 22.3646 22.1083 20.1858 23.6348 19.4531L43.959 9.69727Z" fill="#4F4CEE" />
          </svg>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3 mb-2">
          <div className="text-center shrink-0">
            <div className="text-[10px] font-semibold text-[#4F4CEE] uppercase">{bulan}</div>
            <div className="text-lg font-bold text-[#1A194D] leading-none">{tanggalAngka}</div>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {kategori && (
              <span className="text-[11px] font-medium bg-[#EDF3FF] text-[#4F4CEE] px-2 py-0.5 rounded-full">
                {kategori}
              </span>
            )}
            {lokasi && (
              <span className="text-[11px] font-medium bg-[#FFF0C6] text-[#DD6A02] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                {isOnline ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07L11.5 4.5" strokeLinecap="round" />
                    <path d="M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07L12.5 19.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.5 7.3 11.7.2.2.5.3.7.3s.5-.1.7-.3C12.9 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/>
                  </svg>
                )}
                {isOnline ? "Online" : lokasi}
              </span>
            )}
          </div>
        </div>

        <h3 className="text-sm font-semibold text-[#1A194D] leading-snug mb-2 line-clamp-2">
          {judul}
        </h3>

        <p className="text-sm font-medium text-gray-700">{hargaText}</p>
      </div>
    </Link>
  );
}