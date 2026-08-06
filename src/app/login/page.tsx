"use client";

import { useState } from "react";
import { signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Role = "peserta" | "penyelenggara";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("peserta");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isPeserta = role === "peserta";

  function handleRoleChange(newRole: Role) {
    setRole(newRole);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email atau kata sandi salah.");
      setLoading(false);
      return;
    }

    // Pastiin role yang login sesuai tab yang dipilih
    // (khusus admin, boleh login lewat tab manapun karena nggak ada tab khusus admin di UI publik)
    const session = await getSession();
    if (session?.user?.role !== role && session?.user?.role !== "admin") {
      await signOut({ redirect: false });
      setError(
        `Akun ini terdaftar sebagai ${session?.user?.role ?? "role lain"}, bukan ${role}. Pilih tab yang sesuai.`
      );
      setLoading(false);
      return;
    }

    // Redirect ke dashboard sesuai role
    // Redirect ke dashboard sesuai role ASLI akun (bukan tab yang dipilih)
    const actualRole = session?.user?.role;
    const dashboardPath =
      actualRole === "peserta"
        ? "/dashboard/peserta"
        : actualRole === "penyelenggara"
        ? "/dashboard/penyelenggara"
        : "/dashboard/admin";
    router.push(dashboardPath);
    router.refresh();
  }

  return (
    <div className="min-h-screen flex">
      {/* Panel kiri */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#EDF3FF] to-white items-center justify-center px-16">
        <div className="max-w-sm flex flex-col items-start gap-6">
          <div className="w-[100px] h-[65px] flex items-center">
            <svg
              width="83"
              height="54"
              viewBox="0 0 83 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.2979 29.708C29.2982 28.8174 30.4241 28.317 31.127 28.8643C33.7771 30.928 39.0567 34.2939 45.2979 34.2939C51.4034 34.2939 56.3585 31.0721 58.9141 29C59.6201 28.4279 60.7979 28.9321 60.7979 29.8408V36.9326C60.7977 37.1663 60.7166 37.392 60.5547 37.5605C59.438 38.7228 54.463 43.2939 45.2979 43.2939C36.1518 43.2939 30.7996 38.7414 29.5713 37.5674C29.3905 37.3945 29.2979 37.1554 29.2979 36.9053V29.708Z"
                fill="#4F4CEE"
              />
              <path
                d="M43.959 9.69727C44.491 9.44198 45.1086 9.43417 45.6465 9.67676L66.3535 19.0156C67.9078 19.7166 67.9286 21.9166 66.3877 22.6465L61.6172 24.9062C61.0964 25.1529 60.4945 25.1627 59.9658 24.9336L46.3701 19.042C46.0108 18.8865 45.5985 18.9139 45.2627 19.1152C44.427 19.6166 44.4921 20.8484 45.376 21.2588L53.4551 25.0107C54.9879 25.7224 55.002 27.8957 53.4785 28.627L45.6455 32.3877C45.1089 32.6453 44.4851 32.65 43.9443 32.4014L23.6641 23.0723C22.1259 22.3646 22.1083 20.1858 23.6348 19.4531L43.959 9.69727Z"
                fill="#4F4CEE"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M76.5 0C80.0899 0 83 2.91015 83 6.5V47.5C83 51.0899 80.0898 54 76.5 54H6.5C2.91568 54 4.12467e-05 51.0973 0 47.502V40.8457C0.000218594 37.6569 2.29013 35.7867 3.26172 35.0381C3.85227 34.5831 4.52 34.138 5.03516 33.79C5.59907 33.4092 6.09695 33.0682 6.57617 32.6982C7.51802 31.9712 8.23881 31.2421 8.74609 30.3633C9.23126 29.5227 9.65234 28.3197 9.65234 26.4512C9.65234 24.577 9.23184 23.6401 8.89453 23.1318C8.52608 22.5768 7.97399 22.1055 7.03711 21.5518C6.53468 21.2548 6.07018 21.0158 5.41797 20.6641C4.84217 20.3535 4.08358 19.9352 3.36914 19.418C1.84313 18.3131 0.111649 16.4305 0.00488281 13.4463L0 13.1543V6.49805C0.000244813 2.904 2.91471 1.15868e-06 6.5 0H76.5ZM6.5 4.5C5.39558 4.5 4.50024 5.39369 4.5 6.49805V13.1543C4.50061 17.9133 14.1523 16.0247 14.1523 26.4512L14.1455 26.9326C13.8533 36.8942 4.50083 37.4386 4.5 40.8457V47.502C4.50004 48.5376 5.28725 49.3872 6.2959 49.4893L6.5 49.5H76.5C77.6046 49.5 78.5 48.6046 78.5 47.5V6.5C78.5 5.39543 77.6046 4.5 76.5 4.5H6.5Z"
                fill="#4F4CEE"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-[#1A194D]">
            {isPeserta ? "Masuk Sebagai Peserta" : "Masuk Sebagai Penyelenggara"}
          </h2>

          <p className="text-lg font-medium text-[#4F4CEE] italic">
            {isPeserta
              ? '"Ikuti berbagai event menarik dan kembangkan potensimu bareng SkillUs!"'
              : '"Kelola event akademikmu dengan lebih mudah dan terstruktur bareng SkillUs!"'}
          </p>
        </div>
      </div>

      {/* Panel kanan - form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-[#1A194D] text-center mb-6">
            Masuk
          </h1>

          {/* Role toggle */}
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleRoleChange("peserta")}
              className={`flex-1 py-3 rounded-lg font-semibold border transition ${
                isPeserta
                  ? "bg-[#4F4CEE] text-white border-[#4F4CEE]"
                  : "bg-white text-[#4F4CEE] border-[#4F4CEE]"
              }`}
            >
              Peserta
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("penyelenggara")}
              className={`flex-1 py-3 rounded-lg font-semibold border transition ${
                !isPeserta
                  ? "bg-[#4F4CEE] text-white border-[#4F4CEE]"
                  : "bg-white text-[#4F4CEE] border-[#4F4CEE]"
              }`}
            >
              Penyelenggara
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`Masukkan email ${role}`}
                className="w-full border border-[#D4D9E3] rounded-lg px-4 py-3 text-sm placeholder:text-[#8493AC] focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Kata Sandi
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full border border-[#D4D9E3] rounded-lg px-4 py-3 text-sm placeholder:text-[#8493AC] focus:outline-none focus:ring-2 focus:ring-[#4F4CEE]"
              />
            </div>

            {error && <p className="text-sm text-red-600 -mt-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4F4CEE] text-white font-semibold py-3 rounded-lg mt-2 hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link href="/register" className="text-[#4F4CEE] font-medium hover:underline">
                Daftar di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}