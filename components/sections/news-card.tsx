"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { NewsArticle } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { useUIStore } from "@/store/use-ui-store";

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
}

export function NewsCard({ article, index = 0 }: NewsCardProps) {
  const { setSelectedArticle } = useUIStore();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link 
        href={`/news/${article.slug}`} 
        onClick={() => setSelectedArticle(article)}
        className="block glass-card overflow-hidden group"
      >
        <div className="news-image-wrapper relative h-48">
          <Image src={article.image} alt={article.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <ExternalLink className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-base font-semibold line-clamp-2 text-foreground group-hover:text-accent transition-colors duration-200 mb-2">{article.title}</h3>
          <p className="text-sm text-muted line-clamp-2 mb-4">{article.description}</p>
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {article.source.name}
            </span>
            <span>{timeAgo(article.publishedAt)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
