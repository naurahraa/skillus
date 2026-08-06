"use client";

type Props = {
  action: () => Promise<void>;
};

export default function CancelRegistrationButton({ action }: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Yakin mau batalin pendaftaran ini? Tiket kamu bakal hangus dan slot-nya kebuka lagi buat orang lain.")) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="text-red-600 text-xs font-semibold hover:underline">
        Batalkan Pendaftaran
      </button>
    </form>
  );
}