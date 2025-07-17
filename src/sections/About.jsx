import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const text = `Passionate about clean architecture
    I build scalable, high-performance solutions
    from prototype to production`;
    
  const aboutText = `Final year Computer Science student with a passion for creating modern, responsive web applications. Specializing in React, Node.js, and modern JavaScript frameworks to build seamless user experiences.
  
My technical toolkit includes:
• Frontend: React, Next.js, TailwindCSS, GSAP
• Backend: Node.js, Express, MongoDB, Firebase
• Tools: Git, Webpack, Figma, AWS

When I'm not coding:
📚 Exploring new web technologies and design trends
🎮 Gaming to recharge my creative energy
🎧 Finding inspiration through music`;

  const imgRef = useRef(null);
  
  useGSAP(() => {
    // Remove the scaling animation that causes white spaces
    // Instead, add a subtle fade-in animation for the content
    const contentElements = document.querySelectorAll('#about h2, #about h3, #about .animated-text');

    contentElements.forEach((element, index) => {
      gsap.fromTo(element,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#about",
            start: "top 80%", // Start animation when About section is 80% visible
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // Only run image animation if imgRef exists
    if (imgRef.current) {
      // Set initial state
      gsap.set(imgRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      // Faster reveal animation
      gsap.to(imgRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 90%",
        },
      });
    }
  });
  
  return (
    <section id="about" className="w-full bg-black">
      <AnimatedHeaderSection
        subTitle={"Code with Passion"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 py-10 md:py-16">
        {/* Profile section */}
        <div className="max-w-5xl">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-3 text-white">Nitish Kumar Pandit</h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl text-white/60 font-light mb-8">Full Stack Web Developer</h3>
          </div>

          <div className="text-white/70 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl animated-text">
            <AnimatedTextLines text={aboutText} />
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-10">
            <a href="#contact" className="px-6 sm:px-8 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-white/80 transition-colors text-center">
              Get in Touch
            </a>
            <a href="#" className="px-6 sm:px-8 py-3 border border-white/30 text-white rounded-full text-sm font-medium hover:bg-white/10 transition-colors text-center">
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
