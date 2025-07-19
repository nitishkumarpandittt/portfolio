import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `Versatile developer focused on building 
  modern web applications with clean, efficient code`;
  const aboutText = `As a Software Engineer, I build and deploy web applications end-to-end using React, Next.js, TypeScript, Node.js, Docker, Kubernetes, and AWS. I write clean, maintainable code, establish CI/CD pipelines, and monitor systems to ensure stability. I focus on creating reliable solutions that address real-world needs.`;

  const imgRef = useRef(null);
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: ".about-subtitle", // Target the subtitle specifically
        start: "top 0%", // Start when subtitle hits top of screen
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });
  return (
    <section id="about" className="bg-black rounded-b-4xl">
      <div className="about-subtitle">
        <AnimatedHeaderSection
          subTitle={"Versatile Developer not just a coder"}
          title={"About"}
          text={text}
          textColor={"text-white"}
        />
      </div>
      <div className="flex flex-col items-center justify-between gap-12 px-10 pb-[clamp(2rem,4vw,3rem)] text-[clamp(12px,2.5vw,32px)] font-light tracking-wide lg:flex-row text-white/60">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80&sat=-100"
          alt="code snippet"
          className="w-md rounded-3xl"
        />
        <div className="w-full">
          <AnimatedTextLines text={aboutText} className={"w-full text-[clamp(11px,2.2vw,18px)] leading-relaxed"} />
          <div className="flex flex-col gap-[clamp(0.8rem,1.5vw,1.5rem)] mt-[clamp(1.5rem,3vw,2rem)] sm:flex-row">
            <a
              href="#contact"
              className="px-[clamp(1.2rem,2.5vw,3rem)] py-[clamp(0.5rem,1.2vw,1rem)] text-[clamp(8px,1.5vw,14px)] font-light tracking-wide text-black bg-primary rounded-full hover:bg-primary/90 transition-all duration-500 text-center uppercase border border-primary"
            >
              Get In Touch
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-[clamp(1.2rem,2.5vw,3rem)] py-[clamp(0.5rem,1.2vw,1rem)] text-[clamp(8px,1.5vw,14px)] font-light tracking-wide text-primary border  rounded-full hover:bg-[#1A1A1A] hover:text-primary  transition-all duration-500 text-center uppercase"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
