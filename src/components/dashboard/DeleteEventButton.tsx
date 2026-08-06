"use client";

type Props = {
  action: () => Promise<void>;
};

export default function DeleteEventButton({ action }: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Yakin mau hapus event ini? Aksi ini nggak bisa dibatalin.")) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="text-red-600 text-xs font-semibold hover:underline">
        Hapus
      </button>
    </form>
  );
}