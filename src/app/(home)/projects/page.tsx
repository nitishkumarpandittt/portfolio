import { config } from "@/config";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export const metadata = {
  title: "Projects",
  description: "My portfolio projects",
};

const ProjectsPage = () => {
  return (
    <div className="container mx-auto px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
        <p className="text-muted-foreground mb-12 text-lg">
          A collection of my recent work and side projects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl bg-muted hover:bg-muted-foreground/10 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-background rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-background rounded-md">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  {project.github !== "#" && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <FaGithub className="w-4 h-4" />
                      Code
                    </Link>
                  )}
                  {project.demo !== "#" && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      Demo
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;

