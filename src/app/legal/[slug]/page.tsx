import { notFound } from "next/navigation";
import Link from "next/link";
import { getLegalPage, getLegalSlugs } from "@/lib/legal";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return getLegalSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-abyss pt-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 py-20 md:py-28">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-sonar/40 hover:text-cyan uppercase tracking-wider transition-colors mb-12"
          >
            ← Home
          </Link>
          <article
            className="post-body"
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
        </div>
        <Footer />
      </main>
    </>
  );
}
