import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Works = () => {
  const overlayRefs = useRef([]);

  const text = `Featured projects that have been
    crafted with passion to drive
    results and impact.`;

  useGSAP(() => {
    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });
  };

  return (
    <section id="work" className="flex flex-col w-full overflow-hidden">
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Project"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div className="relative mb-2 flex flex-col font-light overflow-hidden w-full">
        {projects.map((project, index) => (
          <div
            key={project.id}
            id="project"
            className="relative flex flex-col gap-2 py-5 cursor-pointer group md:gap-2"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
            />

            {/* title */}
            <div className="flex justify-between px-4 sm:px-6 md:px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
              <h2 className="text-lg sm:text-xl md:text-[26px] lg:text-[32px] leading-none">
                {project.name}
              </h2>
              <Icon icon="lucide:arrow-up-right" className="size-4 sm:size-5 md:size-6" />
            </div>
            {/* divider */}
            <div className="w-full h-0.5 bg-black/80 my-2" />
            {/* framework */}
            <div className="flex flex-wrap px-4 sm:px-6 md:px-10 text-[10px] sm:text-xs leading-loose uppercase transition-all duration-500 md:text-sm gap-x-1 gap-y-1 sm:gap-x-2 sm:gap-y-1 md:gap-x-5 md:group-hover:px-12">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-black transition-colors duration-500 md:group-hover:text-white whitespace-nowrap"
                >
                  {framework.name}
                </p>
              ))}
            </div>

            {/* Image preview - always visible */}
            <div className="relative flex items-center justify-center px-4 sm:px-6 md:px-10 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden">
              <img
                src={project.bgImage}
                alt={`${project.name}-bg-image`}
                className="object-cover w-full h-full rounded-md brightness-50"
              />
              <img
                src={project.image}
                alt={`${project.name}-image`}
                className="absolute bg-center px-14 rounded-xl max-w-[80%] max-h-[80%] object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Works;
