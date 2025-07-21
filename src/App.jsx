import React, { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import { useProgress } from "@react-three/drei";

const App = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const [forceReady, setForceReady] = useState(false);

  useEffect(() => {
    // Set a timeout to force ready state after 3 seconds (mobile fallback)
    const timeout = setTimeout(() => {
      setForceReady(true);
    }, 3000);

    // Clear timeout if progress reaches 100%
    if (progress === 100) {
      clearTimeout(timeout);
      setIsReady(true);
    }

    return () => clearTimeout(timeout);
  }, [progress]);

  // Show content if either condition is met
  const shouldShowContent = isReady || forceReady;

  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      {!shouldShowContent && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div
        className={`${
          shouldShowContent ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <Experience />
        <Contact />
      </div>
    </ReactLenis>
  );
};

export default App;
