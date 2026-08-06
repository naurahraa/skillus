import { prisma } from "@/lib/prisma";

const ROLE_STYLE: Record<string, string> = {
  peserta: "bg-blue-50 text-blue-600",
  penyelenggara: "bg-amber-50 text-amber-600",
  admin: "bg-purple-50 text-purple-600",
};

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: { pesertaProfile: true, penyelenggaraProfile: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-xl font-bold text-[#1A194D] mb-6">Kelola User</h1>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600">
                <th className="px-4 py-3 font-semibold rounded-l-lg">Nama</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold rounded-r-lg">Terdaftar</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const nama =
                  user.pesertaProfile?.namaLengkap ||
                  user.penyelenggaraProfile?.namaPic ||
                  "-";
                const tanggalText = new Date(user.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <tr key={user.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3 font-medium text-[#1A194D]">{nama}</td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full capitalize ${ROLE_STYLE[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{tanggalText}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}