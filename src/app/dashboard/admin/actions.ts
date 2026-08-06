"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }
}

export async function toggleEventStatus(eventId: number, currentStatus: string) {
  await requireAdmin();

  await prisma.event.update({
    where: { id: eventId },
    data: { status: currentStatus === "published" ? "draft" : "published" },
  });

  redirect("/dashboard/admin/event");
}

export async function deleteEventAsAdmin(eventId: number) {
  await requireAdmin();

  await prisma.event.delete({ where: { id: eventId } });

  redirect("/dashboard/admin/event");
}