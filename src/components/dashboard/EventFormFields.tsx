type Props = {
  defaultValues?: {
    judul?: string;
    deskripsi?: string;
    kategori?: string;
    lokasi?: string;
    tanggal?: string;
    waktu?: string;
    harga?: number;
    kuota?: number;
    status?: string;
  };
  currentPosterUrl?: string | null;
};

export default function EventFormFields({ defaultValues = {}, currentPosterUrl }: Props) {
  return (
    <>
      <div>
        <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Poster Event</label>
        {currentPosterUrl && (
          <img
            src={currentPosterUrl}
            alt="Poster saat ini"
            className="w-full max-w-xs h-32 object-cover rounded-lg mb-2 border border-gray-100"
          />
        )}
        <input
          type="file"
          name="poster"
          accept="image/*"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-[#EDF3FF] file:text-[#4F4CEE] file:text-sm file:font-medium"
        />
        <p className="text-xs text-gray-400 mt-1">
          {currentPosterUrl ? "Kosongin kalau nggak mau ganti poster." : "JPG/PNG, maks 5MB."}
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Judul Event</label>
        <input
          name="judul"
          defaultValue={defaultValues.judul}
          required
          placeholder="cth: UI/UX Design Bootcamp"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Deskripsi</label>
        <textarea
          name="deskripsi"
          defaultValue={defaultValues.deskripsi}
          rows={4}
          placeholder="Jelaskan tentang event ini..."
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Kategori</label>
          <select
            name="kategori"
            defaultValue={defaultValues.kategori}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
          >
            <option value="">Pilih kategori</option>
            <option value="Seminar">Seminar</option>
            <option value="Webinar">Webinar</option>
            <option value="Workshop">Workshop</option>
            <option value="Kursus">Kursus</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Lokasi</label>
          <input
            name="lokasi"
            defaultValue={defaultValues.lokasi}
            placeholder="Online / Nama kota"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Tanggal</label>
          <input
            type="date"
            name="tanggal"
            defaultValue={defaultValues.tanggal}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Waktu</label>
          <input
            type="time"
            name="waktu"
            defaultValue={defaultValues.waktu}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Harga (Rp)</label>
          <input
            type="number"
            name="harga"
            defaultValue={defaultValues.harga ?? 0}
            min={0}
            placeholder="0 = gratis"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Kuota</label>
          <input
            type="number"
            name="kuota"
            defaultValue={defaultValues.kuota ?? 0}
            min={0}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1A194D] mb-1.5">Status</label>
        <select
          name="status"
          defaultValue={defaultValues.status ?? "draft"}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
        >
          <option value="draft">Draft (belum tampil ke publik)</option>
          <option value="published">Published (tampil ke publik)</option>
        </select>
      </div>
    </>
  );
}