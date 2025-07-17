import React from "react";
import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  // Keep title as single line for better mobile display
  const shouldSplitTitle = false;
  const titleParts = [title];
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: "200",
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  }, []);
  return (
    <div ref={contextRef} className="overflow-visible">
      <div className="overflow-visible">
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-6 pt-8 sm:gap-8 sm:pt-12 md:gap-12 md:pt-16"
        >
          <p
            className={`text-xs sm:text-sm font-light tracking-[0.2rem] sm:tracking-[0.3rem] md:tracking-[0.5rem] uppercase px-4 sm:px-6 md:px-10 ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-4 sm:px-6 md:px-10">
            <h1
              className={`uppercase banner-text-responsive overflow-visible whitespace-nowrap font-bold tracking-wide ${textColor}`}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
      <div className={`px-4 sm:px-6 md:px-10 ${textColor}`}>
        <div className="w-full border-t-2 my-2" />
        <div className="py-6 sm:py-8 md:py-12 lg:py-16 text-end">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
