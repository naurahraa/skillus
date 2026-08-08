import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareButton from "@/components/ShareButton";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  return {
    title: post ? `${post.title} — SkillUs` : "Artikel — SkillUs",
    description: post?.excerpt ?? "Artikel di SkillUs.",
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

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
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-400">{post.date} — {post.author}</p>
          <ShareButton title={post.title} />
        </div>

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

      {relatedPosts.length > 0 && (
        <section className="bg-[#F8F9FB] py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-xl font-bold text-[#1A194D] mb-8">Artikel Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition"
                >
                  <div className="h-32 bg-gradient-to-br from-[#EDF3FF] to-[#DEE7FF]" />
                  <div className="p-4">
                    <h3 className="font-semibold text-sm text-[#1A194D] mb-1.5 leading-snug line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-gray-400">{related.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}