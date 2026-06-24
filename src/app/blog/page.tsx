import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata = { title: "Journal — OCEAN TEC" };

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-abyss pt-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-20 md:py-28">
          <p className="font-mono text-xs text-cyan tracking-[0.2em] uppercase mb-4">Journal</p>
          <h1 className="font-display text-white text-display-lg font-bold mb-16">
            Engineering<br />insights.
          </h1>

          {posts.length === 0 ? (
            <p className="text-sonar/50 text-body-lg">New entries are on the way — check back soon.</p>
          ) : (
            <ul className="space-y-0 divide-y divide-cyan/10">
              {posts.map((p) => (
                <li key={p.slug} className="py-10 first:pt-0">
                  <Link href={`/blog/${p.slug}`} className="group block">
                    {p.date && (
                      <p className="font-mono text-xs text-sonar/40 tracking-wider uppercase mb-3">{p.date}</p>
                    )}
                    <h2 className="font-display text-white text-display-md font-bold group-hover:text-cyan transition-colors duration-300">
                      {p.title}
                    </h2>
                    {p.description && (
                      <p className="mt-3 text-sonar/60 text-body-lg max-w-2xl">{p.description}</p>
                    )}
                    <span className="inline-flex items-center gap-2 mt-5 font-mono text-xs text-cyan uppercase tracking-wider">
                      <span>Read</span>
                      <span className="w-6 h-px bg-cyan inline-block" />
                      <span>→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}
