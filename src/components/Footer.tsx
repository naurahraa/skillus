import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#EDF3FF] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo-full.svg" alt="SkillUs" className="h-7" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Platform event akademik yang memudahkan kamu untuk menemukan seminar, workshop, webinar, dan kegiatan edukatif lainnya dalam satu tempat.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#1A194D] mb-4">Jelajahi</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-[#4F4CEE]">Beranda</Link></li>
            <li><Link href="/event" className="hover:text-[#4F4CEE]">Acara</Link></li>
            <li><Link href="/blog" className="hover:text-[#4F4CEE]">Blog</Link></li>
            <li><Link href="/about" className="hover:text-[#4F4CEE]">Tentang Kami</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#1A194D] mb-4">Bantuan</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/help" className="hover:text-[#4F4CEE]">Pusat Bantuan</Link></li>
            <li><Link href="/contact" className="hover:text-[#4F4CEE]">Kontak Kami</Link></li>
            <li><Link href="/privacy" className="hover:text-[#4F4CEE]">Kebijakan Privasi</Link></li>
            <li><Link href="/terms" className="hover:text-[#4F4CEE]">Syarat & Ketentuan</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#1A194D] mb-4">Dapatkan Aplikasi</h4>
          <p className="text-sm text-gray-600 mb-4">
            Akses semua acara akademik dengan lebih mudah lewat smartphone kamu!
          </p>
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-xs font-medium bg-[#1A194D] text-white px-4 py-2 rounded-lg">
              <svg width="16" height="16" viewBox="0 0 512 512" fill="none">
                <path d="M99 8.4C93.6 13.4 90 21.2 90 31.4v449.2c0 10.2 3.6 18 9.1 23l231-250.8L99 8.4z" fill="#00D2FF"/>
                <path d="M99 8.4l231 244.4 68.6-68.6c19.2-11.2 19.2-38.6 0-49.8L142.6 4.2C127.2-4.6 108.6-1 99 8.4z" fill="#00F076"/>
                <path d="M330 252.8L99 503.6c9.6 9.4 28.2 13 43.6 4.2l256-129.2c19.2-11.2 19.2-38.6 0-49.8L330 252.8z" fill="#FF3A44"/>
                <path d="M330 252.8l68.6 68.6c19.2-11.2 19.2-38.6 0-49.8L330 202.8c11.6 12.8 11.6 37.2 0 50z" fill="#FFBC00"/>
              </svg>
              <span className="text-left leading-tight">
                <span className="block text-[9px] opacity-80">GET IT ON</span>
                <span className="block text-xs font-semibold">Google Play</span>
              </span>
            </span>
            <span className="flex items-center gap-2 text-xs font-medium bg-[#1A194D] text-white px-4 py-2 rounded-lg">
              <svg width="16" height="16" viewBox="0 0 384 512" fill="white">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 0 184.5 0 273.4c0 26.3 4.8 53.5 14.4 81.6 12.8 37.4 59 129 107.2 127.6 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-84.1 102.6-121.6-65.2-30.7-57.7-90-57.7-92.3zm-56.6-165.3c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <span className="text-left leading-tight">
                <span className="block text-[9px] opacity-80">Download on the</span>
                <span className="block text-xs font-semibold">App Store</span>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#DEE7FF] py-6 text-center text-sm text-gray-500">
        © 2025 SkillUs. All Rights Reserved.
      </div>
    </footer>
  );
}