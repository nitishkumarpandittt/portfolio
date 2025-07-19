import React from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";

const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  devicePerformance = 'medium',
}) => {
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  return (
    <div>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div className="flex flex-col justify-center gap-[clamp(1rem,3vw,2.5rem)] pt-[clamp(1.5rem,4vw,3rem)]">
          <p
            className={`text-[clamp(8px,1.5vw,12px)] font-light tracking-[clamp(0.1rem,0.6vw,0.3rem)] uppercase px-[clamp(1rem,4vw,2.5rem)] ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-[clamp(1rem,4vw,2.5rem)]">
            <h1
              className={`uppercase text-[clamp(32px,8vw,80px)] leading-[0.85] tracking-tight ${textColor}`}
            >
              {titleParts.join(" ")}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-[clamp(1rem,4vw,2.5rem)] ${textColor}`}>
        <div className="absolute inset-x-0 border-t-[clamp(1px,0.2vw,2px)]" />
        <div className="py-[clamp(1rem,3vw,2.5rem)] text-end max-w-[clamp(280px,85vw,1024px)] ml-auto">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase text-[clamp(9px,1.8vw,16px)] leading-relaxed ${textColor}`}
            devicePerformance={devicePerformance}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
