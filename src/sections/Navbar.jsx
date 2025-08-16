import React, { useEffect, useRef, useState } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);

      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
      setIsOpen(false);
    }
  };
  return (
    <>
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-[clamp(1rem,4vw,2.5rem)] uppercase bg-black text-white/80 py-[clamp(1.5rem,3vw,2.5rem)] gap-y-[clamp(0.8rem,1.5vw,1.2rem)] md:w-1/2 md:right-0"
      >
        <div className="flex flex-col text-[clamp(18px,3.5vw,42px)] gap-y-[clamp(0.1rem,0.4vw,0.2rem)]">
          {[
            { name: "home", target: "home" },
            { name: "services", target: "services" },
            { name: "about", target: "about" },
            { name: "Projects", target: "work" },
            { name: "experience", target: "experience" },
            { name: "contact", target: "contact" }
          ].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                <Link
                  className="transition-all duration-300 cursor-pointer hover:text-white leading-tight"
                  to={section.target}
                  smooth
                  offset={0}
                  duration={2000}
                  onClick={closeMenu}
                >
                  {section.name}
                </Link>
              </div>
            )
          )}
        </div>
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-[clamp(0.6rem,1.5vw,1rem)] md:flex-row"
        >
          <div className="font-light">
            <p className="text-[clamp(16px,2.5vw,18px)] tracking-wider text-white/50 uppercase">E-mail</p>
            <p className="text-[clamp(18px,3vw,20px)] tracking-wide lowercase text-pretty">
              workwithnitishhh@gmail.com
            </p>
          </div>
          <div className="font-light">
            <p className="text-[clamp(16px,2.5vw,18px)] tracking-wider text-white/50 uppercase">Social Media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-[clamp(0.5rem,1vw,0.5rem)]">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-[clamp(16px,2.5vw,18px)] leading-relaxed tracking-wide uppercase hover:text-white transition-colors duration-300"
                >
                  {"{ "}
                  {social.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div
        className="fixed z-50 flex flex-col items-center justify-center gap-[clamp(0.25rem,0.5vw,0.25rem)] transition-all duration-300 bg-black rounded-full cursor-pointer w-[clamp(3rem,8vw,5rem)] h-[clamp(3rem,8vw,5rem)] top-[clamp(1rem,2vw,1rem)] right-[clamp(1rem,4vw,2.5rem)]"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-[clamp(1.5rem,4vw,2rem)] h-[clamp(1.5px,0.3vw,2px)] bg-white rounded-full origin-center"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-[clamp(1.5rem,4vw,2rem)] h-[clamp(1.5px,0.3vw,2px)] bg-white rounded-full origin-center"
        ></span>
      </div>
    </>
  );
};

export default Navbar;
