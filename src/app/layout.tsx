import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillUs — Platform Event Akademik Kampus",
  description: "Platform tiket seminar, workshop, dan webinar akademik. Temukan dan ikuti berbagai kegiatan kampus dalam satu tempat.",
  openGraph: {
    title: "SkillUs — Platform Event Akademik Kampus",
    description: "Temukan seminar, workshop, webinar, dan kegiatan akademik lainnya di satu tempat.",
    siteName: "SkillUs",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillUs — Platform Event Akademik Kampus",
    description: "Temukan seminar, workshop, webinar, dan kegiatan akademik lainnya di satu tempat.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}