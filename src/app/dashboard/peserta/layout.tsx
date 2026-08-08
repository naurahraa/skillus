import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileDashboardNav from "@/components/dashboard/MobileDashboardNav";

const MENU = [
  { href: "/dashboard/peserta", label: "Dashboard", icon: "grid" },
  { href: "/dashboard/peserta/transaksi", label: "Transaksi", icon: "doc" },
  { href: "/dashboard/peserta/profil", label: "Profil", icon: "user" },
];

export default async function PesertaDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userId = Number(session?.user?.id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { pesertaProfile: true },
  });

  const nama = user?.pesertaProfile?.namaLengkap || user?.email || "Pengguna";

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <DashboardTopbar nama={nama} />
      <div className="max-w-[1600px] mx-auto flex">
        <DashboardSidebar nama={nama} role="peserta" menu={MENU} />
        <main className="flex-1 p-6 pb-24 md:pb-6">{children}</main>
      </div>
      <MobileDashboardNav menu={MENU} />
    </div>
  );
}