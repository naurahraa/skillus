import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#1A194D] mb-3">Insight & Artikel</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Dapetin tips, panduan, dan inspirasi terbaru seputar pengembangan diri, akademik, dan teknologi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition"
            >
              <div className="h-40 bg-gradient-to-br from-[#EDF3FF] to-[#DEE7FF]" />
              <div className="p-5">
                <h3 className="font-semibold text-[#1A194D] mb-2 leading-snug">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
                <p className="text-xs text-gray-400">{post.date} — {post.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}