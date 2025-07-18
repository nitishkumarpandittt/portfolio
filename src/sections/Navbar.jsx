import React, { useEffect, useRef, useState } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
    let scrollDirection = 'up';
    let hideTimeout = null;
    let ticking = false;

    const updateNavbar = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);

      // Only react to significant scroll changes (reduces jitter)
      if (scrollDifference < 3) {
        ticking = false;
        return;
      }

      // Always show at top
      if (currentScrollY <= 50) {
        setShowBurger(true);
        scrollDirection = 'up';
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
      } else {
        const newDirection = currentScrollY < lastScrollY ? 'up' : 'down';

        if (newDirection === 'up') {
          // Show immediately when scrolling up
          setShowBurger(true);
          scrollDirection = 'up';

          // Clear any existing hide timeout
          if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
          }
        } else if (newDirection === 'down' && scrollDirection === 'up') {
          // Only hide after scrolling down for a bit (prevents flickering)
          scrollDirection = 'down';

          // Delay hiding to prevent quick flicker
          if (hideTimeout) clearTimeout(hideTimeout);
          hideTimeout = setTimeout(() => {
            setShowBurger(false);
            hideTimeout = null;
          }, 300); // 300ms delay before hiding
        }
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    // Multiple event listeners for immediate response
    const events = ['scroll', 'wheel', 'touchmove'];
    const targets = [window, document, document.documentElement];

    targets.forEach(target => {
      events.forEach(event => {
        target.addEventListener(event, handleScroll, { passive: true });
      });
    });

    // Reduced polling frequency since we have better logic now
    const pollInterval = setInterval(() => {
      if (!ticking) {
        handleScroll();
      }
    }, 50); // Reduced to 20fps for better performance

    // Initial check
    updateNavbar();

    return () => {
      clearInterval(pollInterval);
      if (hideTimeout) clearTimeout(hideTimeout);
      targets.forEach(target => {
        events.forEach(event => {
          target.removeEventListener(event, handleScroll);
        });
      });
    };
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

  // Immediate scroll function that works with Lenis
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Try Lenis first for smooth scrolling
      if (window.lenis) {
        window.lenis.scrollTo(element, {
          duration: 0.8, // Fast but smooth
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        // Fallback to native smooth scroll
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    closeMenu();
  };
  return (
    <>
      <nav
        key="navbar-mobile-fix-2025-07-15"
        ref={navRef}
        className="fixed z-50 flex flex-col justify-center w-full h-full px-6 sm:px-2 md:px-4 lg:px-8 uppercase bg-black text-white/80 py-8 sm:py-12 md:py-16 md:w-2/3 lg:w-2/5 xl:w-1/3 2xl:w-1/4 md:left-auto md:right-0 overflow-hidden"
      >
        <div className="flex flex-col text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl leading-relaxed gap-y-2 sm:gap-y-2 md:gap-y-2 mb-10">
          {["home", "services", "about", "project", "experience", "contact"].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                <button
                  className="transition-all duration-300 cursor-pointer hover:text-white block py-0.5 tracking-wide text-left w-full"
                  onClick={() => scrollToSection(section)}
                >
                  {section.toUpperCase()}
                </button>
              </div>
            )
          )}
        </div>
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-6 md:flex-row mt-auto"
        >
          <div className="font-light">
            <p className="text-sm tracking-wider text-white/50">E-mail</p>
            <p className="text-lg tracking-widest lowercase text-pretty">
              nitishkumarpandit312@gmail.com
            </p>
          </div>
          <div className="font-light">
            <p className="text-sm tracking-wider text-white/50">Social Media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-xs leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
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
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 top-4 right-4 sm:right-6 md:right-10"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-6 sm:w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-6 sm:w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
      </div>
    </>
  );
};

export default Navbar;
