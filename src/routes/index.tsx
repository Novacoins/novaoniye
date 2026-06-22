import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Services } from "@/components/portfolio/Services";
import { Skills } from "@/components/portfolio/Skills";
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
      { title: "Oniye Taofiq Ishola — Mobile App Developer | Luxury Portfolio" },
      {
        name: "description",
        content:
          "Oniye Taofiq Ishola — premium mobile app developer, web developer, and digital entrepreneur. Founder of NovaPlay Technologies. I build modern apps and websites that drive businesses forward, engage users, and elevate experiences.",
      },
      {
        name: "keywords",
        content:
          "mobile app developer, luxury portfolio, Flutter developer, React Native developer, web developer Nigeria, Android app developer, Play Store developer, NovaPlay Technologies, Oniye Taofiq Ishola, digital entrepreneur, Firebase developer, UI/UX design, premium portfolio",
      },
      { property: "og:title", content: "Oniye Taofiq Ishola — Mobile & Web Developer" },
      {
        property: "og:description",
        content:
          "I build modern apps and websites that drive businesses forward, engage users, and elevate experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Oniye Taofiq Ishola — Mobile & Web Developer" },
      {
        name: "twitter:description",
        content:
          "Premium mobile app developer & founder of NovaPlay Technologies.",
      },
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
      <Skills />
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
