import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Daftar Akun — SkillUs",
  description: "Buat akun baru di SkillUs sebagai peserta atau penyelenggara.",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <RegisterForm />
    </Suspense>
  );
}