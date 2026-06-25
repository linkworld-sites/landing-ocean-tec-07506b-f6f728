import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, getPosts } from "@/lib/posts";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | OCEAN TEC`,
    description: post.description,
    keywords: [
      "custom BMS development Austria",
      "battery pack manufacturer Europe",
      "maritime propulsion electronics",
      "BLDC motor controller",
      "PCBA development",
      "marine battery systems",
    ],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-abyss pt-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 py-20 md:py-28">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-sonar/40 hover:text-cyan uppercase tracking-wider transition-colors mb-12"
          >
            ← Journal
          </Link>

          {post.date && (
            <p className="font-mono text-xs text-sonar/40 tracking-wider uppercase mb-4">{post.date}</p>
          )}
          <h1 className="font-display text-white text-display-lg font-bold mb-10">{post.title}</h1>

          <article
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
        <Footer />
      </main>
    </>
  );
}
