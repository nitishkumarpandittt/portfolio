// index.js
export const servicesData = [
  {
    title: "FullStack Development",
    description:
      "Your business deserves a fast, secure, and future-proof digital foundation. I develop custom web apps with clean architecture, optimized databases, and seamless integrations—ensuring reliability at every layer.",
    items: [
      {
        title: "Backend Engineering",
        description: "(REST/GraphQL APIs, Microservices, Auth Systems)",
      },
      {
        title: "Frontend Excellence",
        description: "(React, Vue, TypeScript, Interactive UI/UX)",
      },
      {
        title: "Database Design",
        description: "(SQL/NoSQL Optimization, Scalable Structures)",
      },
    ],
  },
  {
    title: "DevOps & Cloud Solutions",
    description:
      "Deploying software shouldn't be a gamble. I automate infrastructure, enforce security, and leverage cloud platforms (AWS/Azure) to keep your app running smoothly—24/7, at any scale.",
    items: [
      {
        title: "CI/CD Pipelines",
        description: "(GitHub Actions, Docker, Kubernetes)",
      },
      {
        title: "Server Management ",
        description: "(Linux, Nginx, Load Balancing)",
      },
      {
        title: "Performance Tuning",
        description: "(Caching, Compression, Lighthouse 90+ Scores)",
      },
    ],
  },
  {
    title: "Security & Optimization",
    description:
      "Slow or hacked apps destroy trust. I harden security (XSS/SQLI protection, OAuth) and optimize bottlenecks so your app stays fast, safe, and scalable as you grow.",
    items: [
      {
        title: "Code Audits",
        description: "(Refactoring, Tech Debt Cleanup)",
      },
      {
        title: "Pen Testing",
        description: "(Vulnerability Assessments)",
      },
      {
        title: "SEO Tech Stack",
        description: "(SSR, Metadata, Structured Data)",
      },
    ],
  },
  {
    title: "Web & Mobile Apps",
    description:
      "A clunky interface can sink even the best ideas. I craft responsive, pixel perfect web and mobile apps (React Native/Flutter) that users love—bridging design and functionality seamlessly.",
    items: [
      {
        title: "Cross-Platform Apps",
        description: "(Single codebase for iOS/Android/Web)",
      },
      {
        title: "PWAs",
        description: "(Offline mode, Push Notifications)",
      },
      {
        title: "E-Commerce",
        description: "(Checkout flows, Payment Gateways, Inventory APIs)",
      },
    ],
  },
];
export const projects = [
  {
    id: 1,
    name: "CashTrack - AI Powered Expense Tracker",
    description:
      "An online store specializing in phone accessories including cases, chargers, cables, and power banks with MagSafe compatibility.",
    href: "",
    image: "/assets/projects/cashtrack.png",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "clerk" },
      { id: 3, name: "Neon Database" },
      { id: 4, name: "Recharts" },
      { id: 5, name: "Framer Motion" },
    ],
  },
  {
    id: 2,
    name: "CompileX - An Online IDE",
    description:
      "An online store specializing in rare and decorative plants with a clean, user-friendly interface.",
    href: "",
    image: "/assets/projects/compileX.png",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "React.js" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "Mongo DB" },
      { id: 5, name: "Monaco Editor" },
    ],
  },
  {
    id: 3,
    name: "ModiFile - Convert files simply",
    description:
      "An e-commerce platform for Apple products and accessories with deals and category filtering.",
    href: "",
    image: "/assets/projects/Modifile.png",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "FFmpeg.wasm" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 4,
    name: "ShrinkLink - Transform your links",
    description:
      "A multi-category online shop featuring electronics, home appliances, and gaming gear with special offers.",
    href: "",
    image: "/assets/projects/shrinklink.png",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "React.js" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "Mongo DB" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 5,
    name: "WaveLink - Stories that Matter",
    description:
      "A curated collection of designer home decor items, including furniture and artisan vases.",
    href: "",
    image: "/assets/projects/wavelink.png",
    bgImage: "/assets/backgrounds/table.jpg",
    frameworks: [
      { id: 1, name: "React.js" },
      { id: 2, name: "Appwrite " },
      { id: 3, name: "TinyMCE" },
      { id: 4, name: "Redux" },
    ],
  },
];

export const workExperience = [
  {
    id: 1,
    position: "Game Developer",
    company: "Freelance",
    type: "Full-time",
    startDate: "Jan 2025",
    endDate: "Present",
    duration: "Freelance",
    description: "Built an interactive 2D shooting game where a player can move left-right, jump and shoot the enemies. Added main menu, restart and some assets like grenades, ammo and health to make it more interesting. Whenever the player kills an enemy, a Multiple-Choice Question is popped up. Added several levels and if the player dies or gives a wrong answer, the game restarts from the same level. ",
    technologies: ["python", "pygame", "cursor ai","CSV", "Pygame Mixer"],
    achievements: [
      "2D Side-scrolling Platformer with military theme",
      "Score-based advancement (need 60+ points to progress)",
      "Real-time quiz integration during gameplay"
    ]
  }
];

export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/nitishpandittt/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/nitishkumarpandittt/" },
  { name: "GitHub", href: "https://github.com/Nitish-Kumar-Pandit" },
];
