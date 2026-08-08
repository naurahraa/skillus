# SkillUs — Platform Tiket Event Akademik

SkillUs adalah platform web buat nemuin dan daftar seminar, workshop, webinar, dan kegiatan akademik kampus lainnya dalam satu tempat. Dibangun sebagai proyek pengembangan full-stack, mulai dari sistem autentikasi berbasis role sampai alur pembelian tiket yang beneran nyimpen data ke database.

**🔗 Live demo:** [skillus-project.vercel.app](https://skillus-project.vercel.app)

---

## Fitur Utama

**Untuk Peserta**
- Browse & cari event (filter kategori, lokasi, tanggal, kata kunci)
- Beli tiket (checkout tersimulasi, tanpa payment gateway asli)
- Tiket digital dengan QR code
- Batalin pendaftaran (kuota otomatis kebuka lagi)
- Riwayat transaksi
- Edit profil, ganti password & email

**Untuk Penyelenggara**
- Dashboard ringkasan (stats + grafik peserta per event)
- CRUD event lengkap (buat, edit, hapus)
- Upload poster event (otomatis dikompres di browser sebelum upload)
- Lihat daftar peserta yang terdaftar per event

**Untuk Admin**
- Dashboard ringkasan platform (total user, event, transaksi + grafik)
- Kelola semua user & event (moderasi: publish/unpublish, hapus)

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Actions, Turbopack)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL ([Neon](https://neon.tech))
- **ORM:** Prisma
- **Auth:** NextAuth.js v5 (Credentials provider, JWT session)
- **File storage:** Vercel Blob (upload poster event)
- **Grafik:** Recharts
- **QR Code:** react-qr-code
- **Image processing:** Sharp (server-side compression)
- **Deployment:** Vercel

---

## Struktur Role & Alur

Aplikasi ini punya 3 role dengan dashboard dan hak akses masing-masing:

| Role | Bisa ngapain |
|---|---|
| **Peserta** | Browse event, beli tiket, kelola tiket sendiri |
| **Penyelenggara** | Bikin & kelola event, lihat peserta terdaftar |
| **Admin** | Moderasi seluruh platform (user & event) |

Proteksi akses diatur di 2 lapis: middleware (buat halaman) dan pengecekan role di tiap Server Action (buat mutasi data), biar tetap aman walau ada yang nyoba akses API langsung dari luar.

---

## Menjalankan di Lokal

```bash
# Clone repo
git clone https://github.com/naurahraa/skillus.git
cd skillus

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# isi DATABASE_URL, AUTH_SECRET, BLOB_READ_WRITE_TOKEN

# Migrate database
npx prisma migrate dev

# (opsional) isi data dummy
npx prisma db seed

# Jalanin dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

---

## Catatan

Proyek ini dibangun sebagai bagian dari eksplorasi pengembangan full-stack — mulai dari desain database, sistem autentikasi, sampai deployment production. Beberapa keputusan teknis (kayak sistem checkout tersimulasi tanpa payment gateway asli) diambil sesuai kebutuhan skala proyek ini.

---

## Kontak

Dibuat oleh **Naurah Rahadatul Aisyi**
[Portofolio](https://naurahraa-portfolio.vercel.app) · [LinkedIn](#) · [GitHub](https://github.com/naurahraa)
