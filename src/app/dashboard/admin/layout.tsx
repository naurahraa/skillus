import { auth } from "@/auth";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileDashboardNav from "@/components/dashboard/MobileDashboardNav";

const MENU = [
  { href: "/dashboard/admin", label: "Dashboard", icon: "grid" },
  { href: "/dashboard/admin/users", label: "Kelola User", icon: "user" },
  { href: "/dashboard/admin/event", label: "Kelola Event", icon: "calendar" },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const nama = session?.user?.name || session?.user?.email || "Admin";

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <DashboardTopbar nama={nama} />
      <div className="max-w-[1600px] mx-auto flex">
        <DashboardSidebar nama={nama} role="admin" menu={MENU} />
        <main className="flex-1 p-6 pb-24 md:pb-6">{children}</main>
      </div>
      <MobileDashboardNav menu={MENU} />
    </div>
  );
}