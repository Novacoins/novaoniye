import mCover from "@/assets/user-projects/nova-memory-cover.png.asset.json";
import mS1 from "@/assets/user-projects/nova-memory-1.png.asset.json";
import mS2 from "@/assets/user-projects/nova-memory-2.png.asset.json";
import mS3 from "@/assets/user-projects/nova-memory-3.png.asset.json";
import mS4 from "@/assets/user-projects/nova-memory-4.png.asset.json";
import mS5 from "@/assets/user-projects/nova-memory-5.jpg.asset.json";

import sCover from "@/assets/user-projects/nova-spin-cover.png.asset.json";
import sS1 from "@/assets/user-projects/nova-spin-1.png.asset.json";
import sS2 from "@/assets/user-projects/nova-spin-2.png.asset.json";
import sS3 from "@/assets/user-projects/nova-spin-3.png.asset.json";
import sS4 from "@/assets/user-projects/nova-spin-4.png.asset.json";
import sS5 from "@/assets/user-projects/nova-spin-5.png.asset.json";
import sS6 from "@/assets/user-projects/nova-spin-6.png.asset.json";
import sS7 from "@/assets/user-projects/nova-spin-7.png.asset.json";
import sS8 from "@/assets/user-projects/nova-spin-8.png.asset.json";
import sS9 from "@/assets/user-projects/nova-spin-9.jpg.asset.json";
import sS10 from "@/assets/user-projects/nova-spin-10.png.asset.json";
import sS11 from "@/assets/user-projects/nova-spin-11.png.asset.json";

import pCover from "@/assets/user-projects/nova-play-cover.png.asset.json";
import pS1 from "@/assets/user-projects/nova-play-1.png.asset.json";
import pS2 from "@/assets/user-projects/nova-play-2.png.asset.json";
import pS3 from "@/assets/user-projects/nova-play-3.png.asset.json";
import pS4 from "@/assets/user-projects/nova-play-4.png.asset.json";
import pS5 from "@/assets/user-projects/nova-play-5.png.asset.json";
import pS6 from "@/assets/user-projects/nova-play-6.png.asset.json";
import pS7 from "@/assets/user-projects/nova-play-7.png.asset.json";
import pS8 from "@/assets/user-projects/nova-play-8.png.asset.json";

const u = (a: { url: string }) => a.url;

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
    short:
      "Brain training & memory challenge with emoji matching, quizzes, and hundreds of levels.",
    overview:
      "Nova Memory is a fun and educational memory training application featuring emoji matching, quizzes, and hundreds of levels designed to improve focus, memory, and cognitive skills. Built for daily engagement with a polished, premium interface, smooth progression curves, and reward loops that keep users coming back.",
    image: u(mCover),
    screenshots: [u(mS1), u(mS2), u(mS3), u(mS4), u(mS5)],
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
    short:
      "Interactive rewards & spin experience with achievements, in-app rewards, and social sharing.",
    overview:
      "Nova Spin is an engaging spin-based mobile application where users enjoy interactive gameplay, unlock achievements, earn in-app rewards, and share their progress with friends. The product blends premium visual polish with addictive gameplay loops and a frictionless reward system.",
    image: u(sCover),
    screenshots: [
      u(sS1), u(sS2), u(sS3), u(sS4), u(sS5), u(sS6),
      u(sS7), u(sS8), u(sS9), u(sS10), u(sS11),
    ],
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
    short:
      "All-in-one entertainment platform with mini games, puzzles, and challenges.",
    overview:
      "Nova Play is a feature-rich mobile gaming app offering a collection of fun mini-games, puzzles, and challenges designed to deliver engaging entertainment and a smooth user experience. A modular launcher architecture makes it easy to ship new games without compromising the core experience.",
    image: u(pCover),
    screenshots: [
      u(pS1), u(pS2), u(pS3), u(pS4),
      u(pS5), u(pS6), u(pS7), u(pS8),
    ],
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
