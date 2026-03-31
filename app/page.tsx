import { Navbar } from "@/components/sections/navbar";
import { HeroBanner } from "@/components/sections/hero-banner";
import { MatchesSection } from "@/components/sections/matches-section";
import { NewsSection } from "@/components/sections/news-section";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <MatchesSection />
        <NewsSection />
      </main>
      <Footer />
    </>
  );
}
