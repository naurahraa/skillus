import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "penyelenggara") {
    return NextResponse.json({ error: "Belum login" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { namaPic, organisasi, noHp } = body;

    const userId = Number(session.user.id);

    await prisma.penyelenggaraProfile.update({
      where: { userId },
      data: { namaPic, organisasi, noHp },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menyimpan profil" }, { status: 500 });
  }
}