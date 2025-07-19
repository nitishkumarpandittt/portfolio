import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { workExperience } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Experience = () => {
  const text = `Professional journey through innovative
    companies and impactful projects that
    shaped my expertise.`;
  
  const experienceRefs = useRef([]);

  useGSAP(() => {
    experienceRefs.current.forEach((el, index) => {
      if (!el) return;

      gsap.from(el, {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        delay: index * 0.2,
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <section id="experience" className="bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Journey through Innovation"}
        title={"Experience"}
        text={text}
        textColor={"text-white"}
      />
      
      <div className="pl-[clamp(1rem,4vw,2.5rem)] pr-[clamp(1rem,4vw,2.5rem)] pb-[clamp(2rem,4vw,4rem)] relative">
        {/* Continuous vertical timeline line */}
        <div className="absolute left-[clamp(1.5rem,4.5vw,3rem)] top-0 bottom-0 w-[2px] bg-[#cfa355]"></div>

        {workExperience.map((experience, index) => (
          <div
            key={experience.id}
            ref={(el) => (experienceRefs.current[index] = el)}
            className="mb-8 last:mb-0 relative flex"
          >
            {/* Timeline dot */}
            <div className="absolute left-[clamp(1.25rem,4.25vw,2.75rem)] top-4 w-3 h-3 bg-[#cfa355] rounded-full z-10"></div>

            {/* Content */}
            <div className="ml-[clamp(3rem,7vw,5rem)] flex-1">
              {/* Date and Type */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[clamp(14px,2.8vw,18px)] text-[#cfa355] font-light">
                  {experience.startDate} - {experience.endDate}
                </span>
                <span className="text-[clamp(12px,2.4vw,16px)] text-white/60 font-light uppercase tracking-wider">
                  FULL-TIME
                </span>
              </div>

              {/* Experience Card */}
              <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 transition-all duration-300 hover:bg-white/10 hover:border-[#cfa355]/30 hover:shadow-lg hover:shadow-[#cfa355]/10 hover:scale-[1.02] cursor-pointer">
                {/* Position and Company */}
                <div className="mb-4">
                  <h3 className="text-[clamp(20px,4vw,28px)] text-white font-medium mb-2 transition-colors duration-300">
                    {experience.position}
                  </h3>
                  <p className="text-[clamp(14px,2.8vw,18px)] text-[#cfa355] font-light  transition-colors duration-300">
                    {experience.company}
                  </p>
                </div>

                {/* Description */}
                <p className="text-[clamp(13px,2.6vw,16px)] text-white/80 font-light leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                  {experience.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1.5 text-[clamp(10px,2vw,12px)] text-white/90 bg-black/40 rounded font-light uppercase tracking-wide transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                {experience.achievements && (
                  <div>
                    <h4 className="text-[clamp(12px,2.4vw,15px)] text-[#cfa355] font-light uppercase tracking-wide mb-4  transition-colors duration-300">
                      KEY ACHIEVEMENTS
                    </h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className="text-[clamp(12px,2.4vw,15px)] text-white/70 font-light leading-relaxed flex items-start group-hover:text-white/85 transition-colors duration-300"
                        >
                          <span className="text-white/40 mr-3 mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
