const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Cari semua registrasi yang statusnya cancelled, tapi transaksinya belum ikut cancelled
  const registrations = await prisma.registration.findMany({
    where: {
      status: "cancelled",
      transaction: {
        status: { not: "cancelled" },
      },
    },
    include: { transaction: true },
  });

  if (registrations.length === 0) {
    console.log("Aman, nggak ada data yang perlu disinkronin.");
    return;
  }

  console.log(`Ketemu ${registrations.length} transaksi yang perlu disinkronin...`);

  for (const reg of registrations) {
    if (reg.transaction) {
      await prisma.transaction.update({
        where: { id: reg.transaction.id },
        data: { status: "cancelled" },
      });
      console.log(`- Transaction #${reg.transaction.id} (registration #${reg.id}) diupdate jadi cancelled`);
    }
  }

  console.log("Selesai! Semua data udah disinkronin.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });