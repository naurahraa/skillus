const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { email: "admin@skillus.test" },
    update: {},
    create: {
      email: "admin@skillus.test",
      password: hashedPassword,
      role: "admin",
    },
  });

  const penyelenggara = await prisma.user.upsert({
    where: { email: "panitia@skillus.test" },
    update: {},
    create: {
      email: "panitia@skillus.test",
      password: hashedPassword,
      role: "penyelenggara",
      penyelenggaraProfile: {
        create: {
          namaPic: "Tim SkillUs",
          organisasi: "SkillUs Academy",
          noHp: "081234567890",
        },
      },
    },
  });

  const events = [
    {
      judul: "UI/UX Design Bootcamp: From Zero to Portfolio",
      deskripsi: "Belajar dasar-dasar UI/UX design dari nol hingga siap membangun portofolio.",
      kategori: "Seminar",
      lokasi: "Online",
      tanggal: new Date("2026-11-05"),
      harga: 120000,
      kuota: 100,
      status: "published",
    },
    {
      judul: "Tech Innovation Talk: AI Trends for 2026",
      deskripsi: "Diskusi tren teknologi AI terbaru bersama praktisi industri.",
      kategori: "Seminar",
      lokasi: "Jakarta Selatan",
      tanggal: new Date("2026-11-08"),
      harga: 0,
      kuota: 150,
      status: "published",
    },
    {
      judul: "Personal Branding for College Students",
      deskripsi: "Membangun personal branding yang kuat sejak masa kuliah.",
      kategori: "Webinar",
      lokasi: "Online",
      tanggal: new Date("2026-11-12"),
      harga: 50000,
      kuota: 200,
      status: "published",
    },
    {
      judul: "Creative Writing Camp: Explore Your Story",
      deskripsi: "Eksplorasi teknik menulis kreatif bersama penulis berpengalaman.",
      kategori: "Workshop",
      lokasi: "Bandung",
      tanggal: new Date("2026-11-20"),
      harga: 0,
      kuota: 50,
      status: "published",
    },
    {
      judul: "Basic Python for Beginners",
      deskripsi: "Pengenalan dasar pemrograman Python untuk pemula.",
      kategori: "Kursus",
      lokasi: "Online",
      tanggal: new Date("2026-11-25"),
      harga: 75000,
      kuota: 100,
      status: "published",
    },
    {
      judul: "Digital Marketing Strategy for 2026",
      deskripsi: "Strategi pemasaran digital terkini untuk 2026.",
      kategori: "Seminar",
      lokasi: "Surabaya",
      tanggal: new Date("2026-11-30"),
      harga: 100000,
      kuota: 100,
      status: "published",
    },
    {
      judul: "Career Prep: How to Nail Your First Interview",
      deskripsi: "Persiapan wawancara kerja pertamamu dengan percaya diri.",
      kategori: "Webinar",
      lokasi: "Online",
      tanggal: new Date("2026-12-02"),
      harga: 0,
      kuota: 200,
      status: "published",
    },
    {
      judul: "Advanced Excel for Research",
      deskripsi: "Teknik Excel tingkat lanjut untuk kebutuhan riset akademik.",
      kategori: "Kursus",
      lokasi: "Online",
      tanggal: new Date("2026-12-05"),
      harga: 60000,
      kuota: 80,
      status: "published",
    },
  ];

  const existingEventCount = await prisma.event.count({
    where: { penyelenggaraId: penyelenggara.id },
  });

  if (existingEventCount === 0) {
    for (const event of events) {
      await prisma.event.create({
        data: { ...event, penyelenggaraId: penyelenggara.id },
      });
    }
    console.log("Seed selesai! 8 event dummy + 1 penyelenggara + 1 admin berhasil dibuat.");
  } else {
    console.log(`Event dummy udah pernah dibuat sebelumnya (${existingEventCount} event ditemukan), skip biar nggak dobel.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });