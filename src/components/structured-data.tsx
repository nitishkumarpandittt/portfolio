import { config } from "@/config";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: config.developer.name,
    url: "https://nitishh.in",
    image: "https://nitishh.in/og-image.jpg",
    sameAs: [
      `https://github.com/${config.social.github}`,
      "https://www.linkedin.com/in/nitishkumarpandittt/",
    ],
    jobTitle: config.developer.title,
    description: config.developer.bio,
    email: `mailto:${config.social.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: config.social.location,
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "Organization",
      name: "Binghamton University",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Full Stack Development",
      "Web Development",
      "Software Engineering",
      "TailwindCSS",
      "MongoDB",
      "Express.js",
      "AWS",
      "Docker",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}