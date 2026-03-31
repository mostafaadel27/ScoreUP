"use client";

import Link from "next/link";
import { Globe, X, Mail } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4 group" aria-label="Home">
              <Logo />
            </Link>
            <p className="text-sm text-muted max-w-xs">
              Your ultimate destination for live football scores, fixtures, and
              the latest sports news.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "News", href: "/news" },
                { label: "Favorites", href: "/favorites" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Leagues */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Top Leagues
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>Premier League</li>
              <li>La Liga</li>
              <li>Bundesliga</li>
              <li>Serie A</li>
              <li>Champions League</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {[
                { icon: Globe, href: "#", label: "GitHub" },
                { icon: X, href: "#", label: "Twitter" },
                { icon: Mail, href: "#", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-card-border/50 flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© {new Date().getFullYear()} ScoreUp. All rights reserved.</p>
          <p>
            Created by{" "}
            <span className="font-semibold text-accent drop-shadow-sm">Mostafa Adel</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
