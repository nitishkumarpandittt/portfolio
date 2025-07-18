import { useEffect, useState, useMemo } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import Experience from "./sections/Experience";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import { useProgress } from "@react-three/drei";

const App = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  // Device-optimized Lenis settings
  const lenisOptions = useMemo(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    const isLowEnd = cores <= 4 || memory <= 4;
    const isVeryLowEnd = cores <= 2 || memory <= 2;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isVeryLowEnd || (isLowEnd && isMobile)) {
      // Optimized settings for very low-end devices
      return {
        lerp: 0.15, // Faster lerp for less smooth but more responsive scrolling
        duration: 0.8, // Shorter duration
        smoothWheel: false, // Disable smooth wheel for better performance
        touchMultiplier: 1.5, // Reduced touch multiplier
        wheelMultiplier: 0.8, // Reduced wheel multiplier
        infinite: false,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        syncTouch: false, // Disable sync touch for better performance
        touchInertiaMultiplier: 15, // Reduced inertia
      };
    } else if (isLowEnd) {
      // Moderate optimization for low-end devices
      return {
        lerp: 0.1, // Slightly faster lerp
        duration: 1.0, // Shorter duration
        smoothWheel: true,
        touchMultiplier: 1.8,
        wheelMultiplier: 0.9,
        infinite: false,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        syncTouch: true,
        touchInertiaMultiplier: 20,
      };
    } else {
      // Full settings for high-end devices
      return {
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        touchMultiplier: 2,
        wheelMultiplier: 1,
        infinite: false,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        syncTouch: true,
        touchInertiaMultiplier: 35,
      };
    }
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);

  return (
    <ReactLenis
      root
      options={lenisOptions}
      className="relative w-full min-h-screen overflow-x-hidden"
      onCreated={(lenis) => {
        // Make Lenis available globally for immediate navigation
        window.lenis = lenis;
      }}
    >
      {!isReady && (
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
          isReady ? "opacity-100" : "opacity-0"
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
