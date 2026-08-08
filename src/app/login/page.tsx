import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Masuk — SkillUs",
  description: "Masuk ke akun SkillUs kamu.",
};

export default function LoginPage() {
  return <LoginForm />;
}