import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ProfilForm from "@/components/dashboard/ProfilForm";
import ChangePasswordModal from "@/components/ChangePasswordModal";

export default async function ProfilPage() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { pesertaProfile: true },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      <ProfilForm
        email={user?.email ?? ""}
        namaLengkap={user?.pesertaProfile?.namaLengkap ?? ""}
        noHp={user?.pesertaProfile?.noHp ?? ""}
        kotaAsal={user?.pesertaProfile?.kotaAsal ?? ""}
        alamat={user?.pesertaProfile?.alamat ?? ""}
      />

      <div className="space-y-4">
        <h2 className="font-bold text-[#1A194D]">Bantuan & Keamanan Akun</h2>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.7 3 1.1 4.8 1.1 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
              </svg>
            </span>
            <div>
              <p className="font-semibold text-sm text-[#1A194D]">Butuh Bantuan?</p>
              <p className="text-xs text-gray-500">Kami siap membantu!</p>
            </div>
          </div>
          <button className="w-full bg-[#EDF3FF] text-[#4F4CEE] text-sm font-semibold py-2.5 rounded-lg">
            Chat Admin
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-9 h-9 rounded-full bg-[#EDF3FF] flex items-center justify-center text-[#4F4CEE]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8" cy="15" r="4" />
                <path d="M10.5 12.5L20 3M17 6l3 3M14 9l2 2" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <p className="font-semibold text-sm text-[#1A194D]">My Password</p>
              <p className="text-xs text-gray-500">Ganti Kata Sandi Mu</p>
            </div>
          </div>
          <ChangePasswordModal />
        </div>
      </div>
    </div>
  );
}