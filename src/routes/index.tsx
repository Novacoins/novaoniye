import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Workspace } from "@/components/portfolio/Workspace";
import { About } from "@/components/portfolio/About";
import { Services } from "@/components/portfolio/Services";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Stats } from "@/components/portfolio/Stats";
import { WhyMe, FAQ } from "@/components/portfolio/WhyMe";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { FloatingActions } from "@/components/portfolio/FloatingActions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nova Studio — Premium Mobile Apps, Web & AI Development" },
      {
        name: "description",
        content:
          "Nova Studio is a premium digital agency designing, developing, and launching world-class mobile apps, AI solutions, web platforms, and luxury brand identities for businesses worldwide.",
      },
      {
        name: "keywords",
        content:
          "Nova Studio, mobile app development, web development, AI applications, iOS developer, Android developer, SaaS, luxury digital agency, Flutter, React Native, Firebase, UI/UX design",
      },
      { property: "og:title", content: "Nova Studio — Premium Mobile Apps, Web & AI" },
      {
        property: "og:description",
        content:
          "We design, develop, and launch premium mobile apps, AI solutions, business websites, and digital platforms for businesses worldwide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Nova Studio — Premium Mobile Apps, Web & AI" },
      {
        name: "twitter:description",
        content:
          "Premium digital agency for mobile apps, AI, web platforms and luxury brand identities.",
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
      <Workspace />
      <About />
      <Services />
      <Stats />
      <Portfolio />
      <WhyMe />
      <FAQ />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingActions />
    </main>
  );
}
