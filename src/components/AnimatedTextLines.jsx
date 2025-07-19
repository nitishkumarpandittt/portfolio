import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);
export const AnimatedTextLines = ({ text, className, devicePerformance = 'medium' }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const isLowTier = devicePerformance === 'low';

  useGSAP(() => {
    if (lineRefs.current.length > 0) {
      if (isLowTier) {
        // No animations for low-tier devices
        gsap.set(lineRefs.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(lineRefs.current, {
        y: devicePerformance === 'medium' ? 50 : 100,
        opacity: 0,
        duration: devicePerformance === 'medium' ? 0.8 : 1,
        stagger: devicePerformance === 'medium' ? 0.2 : 0.3,
        ease: devicePerformance === 'medium' ? "power2.out" : "back.out",
        scrollTrigger: {
          trigger: containerRef.current,
          toggleActions: "play none none reverse",
          start: "top 90%", // Start animation earlier for hero section visibility
        },
      });
    }
  }, [devicePerformance, isLowTier]);

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => (lineRefs.current[index] = el)}
          className="block leading-relaxed tracking-wide text-pretty"
        >
          {line}
        </span>
      ))}
    </div>
  );
};
