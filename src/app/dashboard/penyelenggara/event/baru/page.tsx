import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { createEvent } from "../actions";
import EventFormFields from "@/components/dashboard/EventFormFields";

export default async function BuatEventPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "penyelenggara") {
    redirect("/login");
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-2xl">
      <h1 className="text-xl font-bold text-[#1A194D] mb-6">Buat Event Baru</h1>
      <form action={createEvent} className="space-y-5">
        <EventFormFields />
        <button
          type="submit"
          className="w-full bg-[#4F4CEE] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
        >
          Simpan Event
        </button>
      </form>
    </div>
  );
}