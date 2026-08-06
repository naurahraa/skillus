import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog-data";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <>
      <Navbar />

      <div className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/blog" className="text-[#4F4CEE] font-medium hover:underline">Blog</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-gray-700 line-clamp-1">{post.title}</span>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="h-64 rounded-xl bg-gradient-to-br from-[#EDF3FF] to-[#DEE7FF] mb-8" />

        <h1 className="text-3xl font-bold text-[#1A194D] mb-3">{post.title}</h1>
        <p className="text-sm text-gray-400 mb-8">{post.date} — {post.author}</p>

        <div className="space-y-5">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-gray-700 leading-relaxed">{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100">
          <Link href="/blog" className="text-[#4F4CEE] font-medium hover:underline text-sm">
            ← Kembali ke semua artikel
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}