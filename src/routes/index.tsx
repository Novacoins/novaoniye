import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Services } from "@/components/portfolio/Services";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Stats } from "@/components/portfolio/Stats";
import { WhyMe } from "@/components/portfolio/WhyMe";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { FloatingActions } from "@/components/portfolio/FloatingActions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oniye Taofiq Ishola — Mobile & Web Developer | NovaPlay Technologies" },
      {
        name: "description",
        content:
          "Premium mobile app developer, web developer, and digital entrepreneur. Founder of NovaPlay Technologies. 5+ years building business-focused digital products.",
      },
      { property: "og:title", content: "Oniye Taofiq Ishola — Mobile & Web Developer" },
      {
        property: "og:description",
        content:
          "Founder of NovaPlay Technologies. Transforming ideas into powerful mobile apps and websites.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground grain">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Stats />
      <Portfolio />
      <WhyMe />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingActions />
    </main>
  );
}
