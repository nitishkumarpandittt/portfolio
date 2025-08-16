import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
  const text = `Got a question, how or project Idea?
    WE’D love to hear from you and discus further!`;
  const items = [
    "Frontend Engineer",
    "Project Manager",
    "Backend Expert",
    "Devops Engineer ",
    "System Designer",
    "Vibe Coder",
  ];
  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);
  return (
    <section
      id="contact"
      className="flex flex-col bg-black"
    >
      <div className="flex-1">
        <AnimatedHeaderSection
          subTitle={"You Dream It, I Code it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
        />
        <div className="flex px-[clamp(1rem,4vw,2.5rem)] font-light text-white uppercase text-[clamp(14px,2.5vw,18px)] leading-none mb-[clamp(2rem,4vw,3rem)]">
          <div className="flex flex-col mt-4 w-full gap-[clamp(1rem,3vw,2rem)]">
            <div className="social-link mb-2">
              <h2 className="text-[clamp(14px,2.5vw,18px)]">E-mail</h2>
              <div className="w-full h-px my-[clamp(0.3rem,0.8vw,0.5rem)] bg-white/30" />
              <p className="text-[clamp(13px,2.3vw,18px)] tracking-wide lowercase">
                workwithnitishhh@gmail.com
              </p>
            </div>
            <div className="social-link mb-2">
              <h2 className="text-[clamp(14px,2.5vw,18px)]">Phone</h2>
              <div className="w-full h-px my-[clamp(0.3rem,0.8vw,0.5rem)] bg-white/30" />
              <p className="text-[clamp(13px,2.3vw,18px)] lowercase">
                +91 9915609635
              </p>
            </div>
            <div className="social-link mb-2">
              <h2 className="text-[clamp(14px,2.5vw,18px)]">Social Media</h2>
              <div className="w-full h-px my-[clamp(0.3rem,0.8vw,0.5rem)] bg-white/30" />
              <div className="flex flex-wrap gap-[clamp(0.3rem,0.8vw,0.5rem)]">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-[clamp(11px,2vw,14px)] leading-relaxed tracking-wide uppercase hover:text-white/80 transition-colors duration-200"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
