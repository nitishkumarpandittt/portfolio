
import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { workExperience } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const timelineRefs = useRef([]);
  const experienceRefs = useRef([]);

  const text = `Professional journey through innovative 
    companies and impactful projects that 
    shaped my expertise.`;

  useGSAP(() => {
    // Animate timeline items
    gsap.from(".timeline-item", {
      x: -100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.2,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 80%",
      },
    });

    // Animate timeline line
    gsap.fromTo(".timeline-line", {
      scaleY: 0,
      transformOrigin: "top",
    }, {
      scaleY: 1,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 80%",
      },
    });

    // Animate experience cards
    gsap.from(".experience-card", {
      y: 100,
      opacity: 0,
      delay: 0.8,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section id="experience" className="min-h-screen bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Journey through Innovation"}
        title={"Experience"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      
      <div className="timeline-container relative px-4 sm:px-6 md:px-10 pb-8 sm:pb-12 md:pb-16">
        {/* Timeline Line */}
        <div className="timeline-line absolute left-6 sm:left-8 md:left-12 top-0 w-0.5 h-full bg-gold"></div>

        {workExperience.map((experience, index) => (
          <div
            key={experience.id}
            className="timeline-item relative flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16 last:mb-0"
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 sm:left-6 md:left-10 w-3 h-3 sm:w-4 sm:h-4 bg-gold rounded-full border-2 sm:border-4 border-black z-10 -translate-x-1/2"></div>
            
            {/* Date */}
            <div className="md:w-48 flex-shrink-0 ml-8 sm:ml-12 md:ml-16 lg:ml-20">
              <div className="text-gold font-light text-sm sm:text-base md:text-lg lg:text-xl tracking-wide sm:tracking-wider">
                {experience.startDate} - {experience.endDate}
              </div>
              <div className="text-white/50 text-xs sm:text-sm uppercase tracking-wide sm:tracking-widest mt-1">
                {experience.duration}
              </div>
            </div>

            {/* Experience Card */}
            <div className="experience-card flex-1 bg-DarkLava rounded-lg p-4 sm:p-6 md:p-8 ml-8 sm:ml-12 md:ml-0 hover:bg-DarkLava/80 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-white text-xl md:text-2xl font-normal mb-2">
                    {experience.position}
                  </h3>
                  <h4 className="text-gold text-lg md:text-xl font-light">
                    {experience.company}
                  </h4>
                  <p className="text-white/60 text-sm mt-1">
                    {experience.location}
                  </p>
                </div>
                <div className="text-white/40 text-sm uppercase tracking-wider">
                  {experience.type}
                </div>
              </div>
              
              <p className="text-white/80 font-light leading-relaxed mb-6">
                {experience.description}
              </p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-black/50 text-white/70 text-xs uppercase tracking-wider rounded-full border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Key Achievements */}
              {experience.achievements && experience.achievements.length > 0 && (
                <div className="mt-6">
                  <h5 className="text-white/90 text-sm uppercase tracking-wider mb-3">
                    Key Achievements
                  </h5>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, achIndex) => (
                      <li
                        key={achIndex}
                        className="text-white/70 text-sm font-light flex items-start"
                      >
                        <span className="text-gold mr-2 mt-1">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
