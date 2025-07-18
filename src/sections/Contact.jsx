import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
  const text = `Got a question, how or project Idea?
    WE’D love to hear from you and discus further!`;

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
      className="bg-black overflow-hidden w-full"
    >
      <AnimatedHeaderSection
        subTitle={"You Dream It, I Code it"}
        title={"Contact"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="px-4 sm:px-6 md:px-10 py-2 sm:py-2 font-light text-white uppercase text-lg sm:text-xl md:text-[26px] lg:text-[32px] leading-none">
        <div className="flex flex-col w-full gap-2 sm:gap-6 md:gap-8">
            <div className="social-link mt-10">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-sm mb-4 sm:text-base md:text-lg lg:text-xl tracking-wide sm:tracking-wider lowercase">
                nitishpandit312@gmail.com
              </p>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-sm mb-4 sm:text-base md:text-lg lg:text-xl lowercase">
                +91 99156 09635
              </p>
            </div>
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap mb-5 gap-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-xs leading-loose tracking-wide uppercase sm:text-sm hover:text-white/80 transition-colors duration-200"
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

      {/* Bottom Marquee - positioned at the bottom */}
      <div className="mt-8 sm:mt-12 md:mt-16">
        <Marquee
          items={["Just Imagine, I Code", "Let's Connect", "Build Together"]}
          className="text-white bg-black border-t border-white/20"
          iconClassName="text-gold"
          icon="mdi:star-four-points"
        />
      </div>
    </section>
  );
};

export default Contact;
