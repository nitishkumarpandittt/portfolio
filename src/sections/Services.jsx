import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Services = () => {
  const text = `I build secure, high-performance full-stack apps
    with smooth UX to drive growth
    not headaches.`;
  const serviceRefs = useRef([]);

  useGSAP(() => {
    // Device-optimized animations
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    const isLowEnd = cores <= 4 || memory <= 4;
    const isVeryLowEnd = cores <= 2 || memory <= 2;

    // Amazing scroll-up animation for each service card
    serviceRefs.current.forEach((el, index) => {
      if (!el) return;

      // Create a powerful timeline for each card with performance optimization
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          // Reduce scroll trigger frequency for low-end devices
          refreshPriority: isLowEnd ? -1 : 0,
        }
      });

      if (isVeryLowEnd) {
        // Simplified animation for very low-end devices
        gsap.set(el, {
          y: 50,
          opacity: 0,
        });

        tl.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        // Full animation for capable devices
        gsap.set(el, {
          y: 100,
          opacity: 0,
          scale: isLowEnd ? 0.9 : 0.8,
          rotationX: isLowEnd ? 5 : 15,
        });

        tl.to(el, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: isLowEnd ? 0.4 : 0.6,
          ease: "power3.out",
        });
      }

      // Service number animation - faster
      const serviceNumber = el.querySelector('.service-number');
      if (serviceNumber) {
        gsap.set(serviceNumber, { scale: 0, rotation: 180 });
        tl.to(serviceNumber, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        }, "-=0.4");
      }

      // Title animation - faster slide up with bounce
      const title = el.querySelector('.service-title');
      if (title) {
        gsap.set(title, { y: 50, opacity: 0 });
        tl.to(title, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.2)",
        }, "-=0.3");
      }

      // Divider animation - faster width expansion
      const divider = el.querySelector('.service-divider');
      if (divider) {
        gsap.set(divider, { width: 0 });
        tl.to(divider, {
          width: "3rem",
          duration: 0.3,
          ease: "power2.out",
        }, "-=0.2");
      }

      // Description animation - faster
      const description = el.querySelector('.service-description');
      if (description) {
        gsap.set(description, { y: 30, opacity: 0 });
        tl.to(description, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        }, "-=0.15");
      }

      // Service items animation - faster staggered with bounce
      const items = el.querySelectorAll('.service-item');
      if (items.length) {
        gsap.set(items, { x: -50, opacity: 0, scale: 0.9 });
        tl.to(items, {
          x: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.4,
          ease: "back.out(1.1)",
        }, "-=0.1");
      }
    });
  }, []);

  return (
    <section id="services" className="min-h-screen bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"Service"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      <div className="px-4 sm:px-6 md:px-10 py-10 md:py-16">
        {servicesData.map((service, index) => (
          <div
            ref={(el) => (serviceRefs.current[index] = el)}
            key={index}
            className="mb-16 md:mb-24 last:mb-0"
          >
            {/* Service number */}
            <div className="service-number inline-block mb-4 text-xs font-light tracking-widest text-white/40 border border-white/20 rounded-full px-3 py-1">
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Service title */}
            <h2 className="service-title text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4">
              {service.title}
            </h2>

            {/* Divider */}
            <div className="service-divider w-12 h-[1px] bg-white/30 mb-6"></div>

            {/* Service description */}
            <p className="service-description text-sm sm:text-base md:text-lg text-white/60 max-w-3xl mb-8 leading-relaxed">
              {service.description}
            </p>

            {/* Service items */}
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 max-w-3xl">
              {service.items.map((item, itemIndex) => (
                <div
                  key={`item-${index}-${itemIndex}`}
                  className="service-item"
                >
                  <div className="flex items-center">
                    <span className="text-white/30 text-sm mr-4 sm:mr-6 md:mr-8 flex-shrink-0">
                      0{itemIndex + 1}
                    </span>
                    <h3 className="text-white/90 text-lg sm:text-xl md:text-2xl font-light">
                      {item.title}
                    </h3>
                  </div>
                  <div className="pl-8 sm:pl-10 md:pl-12 mt-1">
                    <p className="text-white/50 text-xs sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                  {itemIndex < service.items.length - 1 && (
                    <div className="w-full h-px mt-3 bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
