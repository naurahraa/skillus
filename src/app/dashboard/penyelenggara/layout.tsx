import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const MENU = [
  { href: "/dashboard/penyelenggara", label: "Dashboard", icon: "grid" },
  { href: "/dashboard/penyelenggara/event", label: "Kelola Event", icon: "calendar" },
  { href: "/dashboard/penyelenggara/profil", label: "Profil", icon: "user" },
];

export default async function PenyelenggaraDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userId = Number(session?.user?.id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { penyelenggaraProfile: true },
  });

  const nama = user?.penyelenggaraProfile?.namaPic || user?.email || "Pengguna";

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <DashboardTopbar nama={nama} />
      <div className="max-w-[1600px] mx-auto flex">
        <DashboardSidebar nama={nama} role="penyelenggara" menu={MENU} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}