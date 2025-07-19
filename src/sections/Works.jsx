import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(null);
  const text = `Featured projects that have been crafted 
  with passion to drive results and impact.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    // Only create quickTo animations if previewRef exists
    if (previewRef.current) {
      moveX.current = gsap.quickTo(previewRef.current, "x", {
        duration: 1.5,
        ease: "power3.out",
      });
      moveY.current = gsap.quickTo(previewRef.current, "y", {
        duration: 2,
        ease: "power3.out",
      });
    }

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
    setCurrentIndex(index);

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

    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    if (moveX.current && moveY.current) {
      moveX.current(mouse.current.x);
      moveY.current(mouse.current.y);
    }
  };

  return (
    <section id="work" className="flex flex-col">
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Projects"}
        text={text}
        textColor={"text-black"}
      />
      <div
        className="relative flex flex-col font-light pb-[clamp(2rem,4vw,4rem)]"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            id="project"
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
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
            <div className="flex justify-between px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
              <h2 className="text-[clamp(18px,4vw,32px)] leading-none">
                {project.name}
              </h2>
              <Icon icon="lucide:arrow-up-right" className="size-[clamp(16px,3vw,24px)]" />
            </div>
            {/* divider */}
            <div className="w-full h-0.5 bg-black/80" />
            {/* framework */}
            <div className="flex px-10 text-[clamp(8px,1.5vw,14px)] leading-loose uppercase transtion-all duration-500 gap-x-3 md:group-hover:px-12">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-black transition-colors duration-500 md:group-hover:text-white"
                >
                  {framework.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Works;
