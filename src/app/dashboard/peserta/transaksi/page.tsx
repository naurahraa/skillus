import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const STATUS_STYLE: Record<string, string> = {
  success: "text-green-600",
  pending: "text-amber-500",
  failed: "text-red-500",
};

const STATUS_LABEL: Record<string, string> = {
  success: "Success",
  pending: "Pending",
  failed: "Failed",
};

export default async function TransaksiPage() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  const transactions = await prisma.transaction.findMany({
    where: { registration: { userId } },
    include: { registration: { include: { event: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h1 className="text-xl font-bold text-[#1A194D] mb-6">Transaksi Mu</h1>

      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center py-16">Belum ada transaksi.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600">
                <th className="px-4 py-3 font-semibold rounded-l-lg">Gambar</th>
                <th className="px-4 py-3 font-semibold">Item</th>
                <th className="px-4 py-3 font-semibold">Harga</th>
                <th className="px-4 py-3 font-semibold">Tanggal Pembelian</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold rounded-r-lg">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => {
                const judul = tx.registration.event.judul ?? "-";
                const hargaText = tx.amount === 0 ? "Gratis" : `Rp ${tx.amount.toLocaleString("id-ID")}`;
                const tanggalText = tx.createdAt
                  ? new Date(tx.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
                  : "-";

                return (
                  <tr key={tx.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EDF3FF] to-[#DEE7FF] flex items-center justify-center">
                        <svg width="16" height="10" viewBox="0 0 83 54" fill="none" opacity="0.6">
                          <path d="M29.2979 29.708C29.2982 28.8174 30.4241 28.317 31.127 28.8643C33.7771 30.928 39.0567 34.2939 45.2979 34.2939C51.4034 34.2939 56.3585 31.0721 58.9141 29C59.6201 28.4279 60.7979 28.9321 60.7979 29.8408V36.9326C60.7977 37.1663 60.7166 37.392 60.5547 37.5605C59.438 38.7228 54.463 43.2939 45.2979 43.2939C36.1518 43.2939 30.7996 38.7414 29.5713 37.5674C29.3905 37.3945 29.2979 37.1554 29.2979 36.9053V29.708Z" fill="#4F4CEE" />
                        </svg>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-[#1A194D]">{judul}</td>
                    <td className="px-4 py-3 text-gray-600">{hargaText}</td>
                    <td className="px-4 py-3 text-gray-600">{tanggalText}</td>
                    <td className={`px-4 py-3 font-medium ${STATUS_STYLE[tx.status] ?? "text-gray-500"}`}>
                      {STATUS_LABEL[tx.status] ?? tx.status}
                    </td>
                    <td className="px-4 py-3">
                      <button className="flex items-center gap-1.5 text-[#4F4CEE] text-xs font-semibold bg-[#EDF3FF] px-3 py-1.5 rounded-lg">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Invoice
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}