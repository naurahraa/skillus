import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Belum login" }, { status: 401 });
  }

  try {
    const { currentPassword, newEmail } = await req.json();

    if (!currentPassword || !newEmail) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return NextResponse.json({ error: "Format email nggak valid" }, { status: 400 });
    }

    const userId = Number(session.user.id);
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Kata sandi salah" }, { status: 400 });
    }

    if (newEmail === user.email) {
      return NextResponse.json({ error: "Email baru sama dengan email lama" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email: newEmail } });
    if (existing) {
      return NextResponse.json({ error: "Email sudah dipakai akun lain" }, { status: 409 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { email: newEmail },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}