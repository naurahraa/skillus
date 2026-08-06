import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Belum login" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { namaLengkap, noHp, kotaAsal, alamat } = body;

    const userId = Number(session.user.id);

    await prisma.pesertaProfile.update({
      where: { userId },
      data: { namaLengkap, noHp, kotaAsal, alamat },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menyimpan profil" }, { status: 500 });
  }
}