"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ExternalLink, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { mockNews } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { useUIStore } from "@/store/use-ui-store";

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { selectedArticle } = useUIStore();
  
  // Try to use the passed article from store, otherwise search mock data as fallback
  const article = selectedArticle || mockNews.find((a) => a.slug === slug);

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-32 pb-12 min-h-screen flex flex-col items-center">
          <AlertCircle className="w-16 h-16 text-muted mb-4" />
          <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
          <p className="text-muted mb-6">This news article doesn't exist or its session has expired.</p>
          <Link href="/news" className="px-6 py-2 bg-accent text-white rounded-full font-medium">Return to News Feed</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {article.source.name}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {formatDate(article.publishedAt)}
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8">
              <Image src={article.image} alt={article.title} fill className="object-cover" unoptimized />
            </div>

            {/* Description */}
            <p className="text-lg text-foreground/90 font-medium leading-relaxed mb-6 border-l-4 border-accent pl-4">
              {article.description}
            </p>

            {/* Content */}
            <div className="prose prose-invert max-w-none text-foreground/80 leading-relaxed space-y-4">
              {article.content.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Source Link (Always Show for API) */}
            {article.url && article.url !== "#" && (
              <div className="mt-12 pt-8 border-t border-card-border text-center">
                <p className="text-muted mb-4">You are reading a preview snippet.</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-accent/10 hover:bg-accent/20 border border-accent/50 rounded-full font-medium text-accent transition-all">
                  Read Full Article on {article.source.name} <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </motion.div>
        </article>
      </main>
      <Footer />
    </>
  );
}
