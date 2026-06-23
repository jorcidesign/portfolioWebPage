import type { Project } from "./types";

// Replace coverImage.src with real project screenshots from Cloudinary
export const projects: Project[] = [
  {
    slug: "apex-commerce",
    title: "Apex Commerce",
    client: "Retail Group",
    year: "2024",
    category: "Full Stack",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Tailwind"],
    shortDescription:
      "End-to-end e-commerce platform with real-time inventory and payment processing.",
    description:
      "A scalable e-commerce solution built for a Peruvian retail group. Features include real-time inventory management, Stripe payment integration, admin dashboard with analytics, and a mobile-first customer experience.",
    coverImage: {
      src: "https://res.cloudinary.com/dhlkqt62w/image/upload/v1782185954/acc48b81-dcbf-4d93-9913-57e8c0226082.png",
      alt: "Apex Commerce platform interface",
      width: 1200,
      height: 800,
    },
    accentColor: "#1B1B3A",
    featured: true,
    order: 1,
    url: "https://apexcommerce.com",
  },
  {
    slug: "nova-dashboard",
    title: "Nova Dashboard",
    client: "Fintech Startup",
    year: "2024",
    category: "Frontend",
    tags: ["React", "TypeScript", "D3.js", "REST API", "Figma"],
    shortDescription:
      "Analytics dashboard with real-time data visualization for a fintech startup.",
    description:
      "A complex analytics platform featuring real-time charts, custom data visualizations with D3.js, role-based access control, and a highly performant virtual data grid capable of rendering 100k+ rows.",
    coverImage: {
      src: "https://res.cloudinary.com/dhlkqt62w/image/upload/v1782185954/acc48b81-dcbf-4d93-9913-57e8c0226082.png",
      alt: "Nova Dashboard analytics interface",
      width: 1200,
      height: 800,
    },
    accentColor: "#1A2B1E",
    featured: true,
    order: 2,
  },
  {
    slug: "campo-app",
    title: "Campo App",
    client: "AgriTech",
    year: "2023",
    category: "Mobile",
    tags: ["React Native", "Expo", "Node.js", "MongoDB", "Maps API"],
    shortDescription:
      "Mobile app connecting farmers to markets and logistics in rural Peru.",
    description:
      "A cross-platform mobile application empowering Peruvian farmers to connect directly with buyers, track shipments, and manage their harvest schedules. Includes offline-first architecture for areas with limited connectivity.",
    coverImage: {
      src: "https://res.cloudinary.com/dhlkqt62w/image/upload/v1782245064/2349c315-8094-45bf-9d8c-15b9a39f76bc.png",
      alt: "Campo mobile app screens",
      width: 900,
      height: 1200,
    },
    accentColor: "#2B1C14",
    featured: true,
    order: 3,
  },
  {
    slug: "renova-studio",
    title: "Renova Studio",
    client: "Architecture Firm",
    year: "2023",
    category: "Web Design",
    tags: ["Next.js", "GSAP", "Three.js", "Sanity CMS", "SCSS"],
    shortDescription:
      "Website for an architecture firm with immersive 3D project showcases.",
    description:
      "A high-end portfolio website for a Lima-based architecture firm. Features WebGL-powered project visualizations, smooth page transitions, Sanity CMS integration, and a horizontal scroll gallery.",
    coverImage: {
      src: "https://res.cloudinary.com/dhlkqt62w/image/upload/v1782185954/acc48b81-dcbf-4d93-9913-57e8c0226082.png",
      alt: "Renova Studio website",
      width: 1200,
      height: 800,
    },
    accentColor: "#141C2B",
    featured: false,
    order: 4,
    url: "https://renovastudio.pe",
  },
  {
    slug: "pulse-api",
    title: "Pulse API",
    client: "Personal Project",
    year: "2023",
    category: "Backend",
    tags: ["Node.js", "GraphQL", "PostgreSQL", "Docker", "AWS"],
    shortDescription:
      "Open-source REST/GraphQL API gateway with monitoring and rate limiting.",
    description:
      "An open-source API management platform. Features a unified gateway for REST and GraphQL APIs, real-time monitoring, automated rate limiting, and a developer-friendly documentation portal.",
    coverImage: {
      src: "https://res.cloudinary.com/dhlkqt62w/image/upload/v1782185954/acc48b81-dcbf-4d93-9913-57e8c0226082.png",
      alt: "Pulse API documentation interface",
      width: 1200,
      height: 800,
    },
    accentColor: "#222018",
    featured: false,
    order: 5,
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);

export const allProjects = [...projects].sort((a, b) => a.order - b.order);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
