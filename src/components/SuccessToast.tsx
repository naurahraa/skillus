"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SuccessToast() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const message = searchParams.get("toast");

  const [visible, setVisible] = useState(Boolean(message));
  const [lastMessage, setLastMessage] = useState(message);

  // "Adjust state during render" (pattern resmi React), bukan setState
  // langsung di dalem useEffect, biar nggak trigger cascading render warning.
  // https://react.dev/learn/you-might-not-need-an-effect
  if (message !== lastMessage) {
    setLastMessage(message);
    setVisible(Boolean(message));
  }

  useEffect(() => {
    if (!message || !visible) return;

    const timer = setTimeout(() => {
      handleDismiss();
    }, 3500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, visible]);

  function handleDismiss() {
    setVisible(false);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("toast");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  if (!message || !visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-[#1A194D] text-white pl-4 pr-3 py-3.5 rounded-xl shadow-lg flex items-center gap-3 max-w-sm">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="3" className="shrink-0">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-sm font-medium flex-1">{message}</span>
      <button onClick={handleDismiss} className="text-gray-400 hover:text-white shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}