import Link from "next/link";

type Props = {
  id: number;
  judul: string;
  lokasi: string | null;
  tanggal: Date | null;
  waktu: string | null;
};

export default function PesertaEventCard({ id, judul, lokasi, tanggal, waktu }: Props) {
  const now = new Date();
  const tanggalText = tanggal
    ? new Date(tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    : "-";

  let hariLagiBadge: string | null = null;
  if (tanggal) {
    const diffDays = Math.ceil((new Date(tanggal).getTime() - now.getTime()) / 86400000);
    if (diffDays >= 0 && diffDays <= 7) {
      hariLagiBadge = diffDays === 0 ? "Hari Ini" : `${diffDays} Hari Lagi`;
    }
  }

  return (
    <Link
      href={`/event/${id}?from=dashboard`}
      className="block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition"
    >
      <div className="relative h-32 bg-gradient-to-br from-[#EDF3FF] to-[#DEE7FF] flex items-center justify-center">
        {hariLagiBadge && (
          <span className="absolute top-2 left-2 text-[11px] font-semibold bg-red-500 text-white px-2.5 py-1 rounded-full">
            {hariLagiBadge}
          </span>
        )}
        <svg width="32" height="21" viewBox="0 0 83 54" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.5">
          <path d="M29.2979 29.708C29.2982 28.8174 30.4241 28.317 31.127 28.8643C33.7771 30.928 39.0567 34.2939 45.2979 34.2939C51.4034 34.2939 56.3585 31.0721 58.9141 29C59.6201 28.4279 60.7979 28.9321 60.7979 29.8408V36.9326C60.7977 37.1663 60.7166 37.392 60.5547 37.5605C59.438 38.7228 54.463 43.2939 45.2979 43.2939C36.1518 43.2939 30.7996 38.7414 29.5713 37.5674C29.3905 37.3945 29.2979 37.1554 29.2979 36.9053V29.708Z" fill="#4F4CEE" />
          <path d="M43.959 9.69727C44.491 9.44198 45.1086 9.43417 45.6465 9.67676L66.3535 19.0156C67.9078 19.7166 67.9286 21.9166 66.3877 22.6465L61.6172 24.9062C61.0964 25.1529 60.4945 25.1627 59.9658 24.9336L46.3701 19.042C46.0108 18.8865 45.5985 18.9139 45.2627 19.1152C44.427 19.6166 44.4921 20.8484 45.376 21.2588L53.4551 25.0107C54.9879 25.7224 55.002 27.8957 53.4785 28.627L45.6455 32.3877C45.1089 32.6453 44.4851 32.65 43.9443 32.4014L23.6641 23.0723C22.1259 22.3646 22.1083 20.1858 23.6348 19.4531L43.959 9.69727Z" fill="#4F4CEE" />
        </svg>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-[#1A194D] mb-2 line-clamp-2">{judul}</h3>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" strokeLinecap="round" />
          </svg>
          {tanggalText} {waktu && `| ${waktu}`}
        </div>

        {lokasi && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.5 7.3 11.7.2.2.5.3.7.3s.5-.1.7-.3C12.9 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
            </svg>
            {lokasi}
          </div>
        )}
      </div>
    </Link>
  );
}