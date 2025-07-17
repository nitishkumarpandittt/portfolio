import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesMinimal = () => {
  const text = `I build secure, high-performance full-stack apps
    with smooth UX to drive growth 
    not headaches.`;
  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px
  
  useGSAP(() => {
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(st => st.kill());

    // Simple fade-in animation for each service card
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      // Responsive animation settings
      const animationSettings = {
        mobile: {
          y: 30,
          duration: 0.6,
          stagger: 0.05,
        },
        desktop: {
          y: 50,
          duration: 0.7,
          stagger: 0.1,
        }
      };

      const settings = isDesktop ? animationSettings.desktop : animationSettings.mobile;

      // Create a timeline for each card
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: isDesktop ? "top 80%" : "top 90%",
          toggleActions: "play none none reverse",
        }
      });

      // Animate the card
      tl.from(el, {
        y: settings.y,
        opacity: 0,
        duration: settings.duration,
        ease: "power2.out",
      });

      // Animate the title
      const title = el.querySelector('.service-title');
      if (title) {
        tl.from(title, {
          y: isDesktop ? 20 : 15,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.4");
      }

      // Animate the description
      const desc = el.querySelector('.service-desc');
      if (desc) {
        tl.from(desc, {
          y: isDesktop ? 20 : 15,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.3");
      }

      // Animate each item with stagger
      const items = el.querySelectorAll('.service-item');
      if (items.length) {
        tl.from(items, {
          y: isDesktop ? 15 : 10,
          opacity: 0,
          stagger: settings.stagger,
          duration: 0.4,
          ease: "power1.out",
        }, "-=0.2");
      }
    });
  }, [isDesktop]);
  
  return (
    <section id="services" className="min-h-screen bg-black rounded-t-4xl py-10">
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"Service"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 mt-6 sm:mt-8 md:mt-10 mb-8 sm:mb-12 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {servicesData.map((service, index) => (
            <div
              ref={(el) => (serviceRefs.current[index] = el)}
              key={index}
              className="bg-black border border-white/10 rounded-lg p-4 sm:p-5 md:p-6 hover:border-white/30 transition-all duration-300"
            >
              {/* Service number */}
              <div className="inline-block mb-2 sm:mb-3 text-xs font-light tracking-widest text-white/40 border border-white/20 rounded-full px-2 py-0.5">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Service title */}
              <h2 className="service-title text-xl sm:text-2xl md:text-3xl font-light text-white mb-2 sm:mb-3 leading-tight">
                {service.title}
              </h2>

              {/* Divider */}
              <div className="w-6 sm:w-8 h-[1px] bg-white/30 mb-3 sm:mb-4"></div>

              {/* Service description */}
              <p className="service-desc text-white/60 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-5">
                {service.description}
              </p>

              {/* Service items */}
              <div className="space-y-2 sm:space-y-3">
                {service.items.map((item, itemIndex) => (
                  <div
                    key={`item-${index}-${itemIndex}`}
                    className="service-item flex items-start"
                  >
                    <span className="text-white/30 text-xs mr-2 mt-0.5 flex-shrink-0">
                      {String(itemIndex + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white/90 text-sm sm:text-base md:text-lg font-light leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-white/50 text-xs leading-relaxed mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesMinimal;
