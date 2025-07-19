import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { Suspense, useRef, useEffect } from "react";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const canvasRef = useRef(null);
  const text = `I create premium websites and apps that
help growing brands and startups convert more
customers and outperform their competition.`;

  // WebGL Context Loss Detection and Recovery
  useEffect(() => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;

    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn('WebGL context lost - attempting to restore...');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      // Force re-render by updating a state or triggering re-mount
      window.location.reload(); // Simple but effective recovery
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);

  return (
    <section id="home" className="flex flex-col justify-end min-h-screen pb-[clamp(2rem,6vh,4rem)]">
      <AnimatedHeaderSection
        subTitle={"Software Development Engineer"}
        title={"Nitish Pandit"}
        text={text}
        textColor={"text-black"}
      />
      <figure
        ref={canvasRef}
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
          gl={{
            antialias: !isMobile,
            powerPreference: isMobile ? "low-power" : "high-performance",
            alpha: true
          }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          frameloop="always"
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <Float speed={0.5}>
              <Planet scale={isMobile ? 0.7 : 1} />
            </Float>
            <Environment resolution={isMobile ? 128 : 256}>
              <group rotation={[-Math.PI / 3, 4, 1]}>
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[0, 5, -9]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[0, 3, 1]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[-5, -1, -1]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[10, 1, 0]}
                  scale={16}
                />
              </group>
            </Environment>
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
