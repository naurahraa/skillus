import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      password,
      role,
      namaLengkap,
      institusi,
      namaPic,
      organisasi,
      noHp,
    } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password, dan role wajib diisi" },
        { status: 400 }
      );
    }

    if (role !== "peserta" && role !== "penyelenggara") {
      return NextResponse.json({ error: "Role tidak valid" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        ...(role === "peserta" && {
          pesertaProfile: { create: { namaLengkap, institusi, noHp } },
        }),
        ...(role === "penyelenggara" && {
          penyelenggaraProfile: { create: { namaPic, organisasi, noHp } },
        }),
      },
    });

    return NextResponse.json(
      { id: user.id, email: user.email, role: user.role },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}