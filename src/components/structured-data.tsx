import { config } from "@/config";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: config.developer.name,
    url: "https://yourportfolio.com", // Replace with your actual domain
    image: config.developer.avatar,
    sameAs: [
      `https://github.com/${config.social.github}`,
      // Add more social profiles here
      // "https://linkedin.com/in/your-profile",
      // "https://twitter.com/your-handle",
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
      name: "Your University Name", // Add your education
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