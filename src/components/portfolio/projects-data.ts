import novaMemory1 from "@/assets/nova-memory-1.jpg";
import novaMemory2 from "@/assets/nova-memory-2.jpg";
import novaMemory3 from "@/assets/nova-memory-3.jpg";
import novaSpin1 from "@/assets/nova-spin-1.jpg";
import novaSpin2 from "@/assets/nova-spin-2.jpg";
import novaSpin3 from "@/assets/nova-spin-3.jpg";
import novaPlay1 from "@/assets/nova-play-1.jpg";
import novaPlay2 from "@/assets/nova-play-2.jpg";
import novaPlay3 from "@/assets/nova-play-3.jpg";

export type ProjectStatus = "Live" | "Beta" | "Completed";

export type Project = {
  slug: string;
  title: string;
  cat: string;
  tag: string;
  short: string;
  overview: string;
  status: ProjectStatus;
  image: string;
  screenshots: string[];
  features: string[];
  technologies: string[];
  challenges: { title: string; body: string }[];
  liveDemo?: string;
  website?: string;
  download?: string;
};

export const projects: Project[] = [
  {
    slug: "nova-memory",
    title: "Nova Memory",
    cat: "Educational Apps",
    tag: "Launched",
    status: "Live",
    short: "Brain training & memory challenge with emoji matching, quizzes, and hundreds of levels.",
    overview:
      "Nova Memory is a fun and educational memory training application featuring emoji matching, quizzes, and hundreds of levels designed to improve focus, memory, and cognitive skills. Built for daily engagement with a polished, premium interface, smooth progression curves, and reward loops that keep users coming back.",
    image: novaMemory1,
    screenshots: [novaMemory1, novaMemory2, novaMemory3],
    features: [
      "Hundreds of progressive memory levels",
      "Emoji matching mini-games",
      "Quiz mode with timed challenges",
      "Daily streaks & cognitive scoring",
      "Cloud-synced progress",
      "Beautiful, distraction-free UI",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Google Play Services", "AdMob"],
    challenges: [
      {
        title: "Smooth performance at scale",
        body: "Designed an asset-streaming pipeline so hundreds of levels load instantly on low-end Android devices.",
      },
      {
        title: "Daily retention",
        body: "Engineered streaks, daily challenges, and reward loops that lifted Day-7 retention significantly.",
      },
    ],
    download: "https://play.google.com/store/apps/details?id=nova.memory",
  },
  {
    slug: "nova-spin",
    title: "Nova Spin",
    cat: "Mobile Apps",
    tag: "Live",
    status: "Live",
    short: "Interactive rewards & spin experience with achievements, in-app rewards, and social sharing.",
    overview:
      "Nova Spin is an engaging spin-based mobile application where users enjoy interactive gameplay, unlock achievements, earn in-app rewards, and share their progress with friends. The product blends premium visual polish with addictive gameplay loops and a frictionless reward system.",
    image: novaSpin1,
    screenshots: [novaSpin1, novaSpin2, novaSpin3],
    features: [
      "Animated spin wheel with prize mechanics",
      "Achievements & unlockable badges",
      "In-app rewards & coin economy",
      "Daily missions and bonuses",
      "Friend invites & social sharing",
      "Optimized for buttery-smooth animation",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Cloud Functions", "AdMob"],
    challenges: [
      {
        title: "Provably-fair spin engine",
        body: "Implemented a server-validated randomness layer to keep rewards fair while preserving the thrill of the spin.",
      },
      {
        title: "Animation performance",
        body: "Hand-tuned the spin physics and easing to hit 60fps across mid-tier Android hardware.",
      },
    ],
    download: "https://play.google.com/store/apps/details?id=novaspin.aplicajn",
  },
  {
    slug: "nova-play",
    title: "Nova Play",
    cat: "Mobile Apps",
    tag: "Flagship",
    status: "Live",
    short: "All-in-one entertainment platform with mini games, puzzles, and challenges.",
    overview:
      "Nova Play is a feature-rich mobile gaming app offering a collection of fun mini-games, puzzles, and challenges designed to deliver engaging entertainment and a smooth user experience. A modular launcher architecture makes it easy to ship new games without compromising the core experience.",
    image: novaPlay1,
    screenshots: [novaPlay1, novaPlay2, novaPlay3],
    features: [
      "Curated library of mini-games",
      "Puzzles, arcade and challenge modes",
      "Cross-game leaderboards",
      "Unified profile & achievements",
      "Offline-capable gameplay",
      "Premium dark UI with gold accents",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Game Services", "AdMob"],
    challenges: [
      {
        title: "Modular game architecture",
        body: "Built a plug-in style architecture so new mini-games can be shipped as isolated modules without app-wide regressions.",
      },
      {
        title: "Install size optimization",
        body: "Used dynamic asset delivery to keep the base install lean while supporting a large catalog of games.",
      },
    ],
    download: "https://play.google.com/store/apps/details?id=novaplay.aplicwoo",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
