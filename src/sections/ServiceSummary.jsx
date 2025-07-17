import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const ServiceSummary = () => {
  useGSAP(() => {
    gsap.to("#title-service-1", {
      xPercent: 20,
      scrollTrigger: {
        target: "#title-service-1",
        scrub: true,
      },
    });
    gsap.to("#title-service-2", {
      xPercent: -30,
      scrollTrigger: {
        target: "#title-service-2",
        scrub: true,
      },
    });
    gsap.to("#title-service-3", {
      xPercent: 100,
      scrollTrigger: {
        target: "#title-service-3",
        scrub: true,
      },
    });
    gsap.to("#title-service-4", {
      xPercent: -100,
      scrollTrigger: {
        target: "#title-service-4",
        scrub: true,
      },
    });
  });
  return (
    <section className="mt-12 sm:mt-16 md:mt-20 overflow-hidden font-light leading-snug text-center mb-20 sm:mb-32 md:mb-42 contact-text-responsive px-4 sm:px-0">
      <div className="max-w-10xl mx-auto">
        <div id="title-service-1" className="mb-2 sm:mb-4">
          <p>Architecture</p>
        </div>
        <div
          id="title-service-2"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4 sm:translate-x-8 md:translate-x-16"
        >
          <p className="font-normal">Development</p>
          <div className="w-6 h-0.5 sm:w-10 sm:h-1 md:w-32 bg-gold" />
          <p>Deployment</p>
        </div>
        <div
          id="title-service-3"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4 sm:-translate-x-12 md:-translate-x-48"
        >
          <p>APIs</p>
          <div className="w-6 h-0.5 sm:w-10 sm:h-1 md:w-32 bg-gold" />
          <p className="italic">Frontends</p>
          <div className="w-6 h-0.5 sm:w-10 sm:h-1 md:w-32 bg-gold" />
          <p>Scalability</p>
        </div>
        <div id="title-service-4" className="sm:translate-x-12 md:translate-x-48">
          <p>Databases</p>
        </div>
      </div>
    </section>
  );
};

export default ServiceSummary;
