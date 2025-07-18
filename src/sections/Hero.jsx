import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useMemo, Suspense } from "react";
const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `I create premium websites and apps that
  help growing brands and startups convert
  more customers, scale faster, and
  outperform their competition.`;

  // Simple device capabilities
  const deviceCapabilities = useMemo(() => {
    return {
      pixelRatio: Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2),
      enableShadows: !isMobile,
      environmentResolution: isMobile ? 128 : 256,
      floatSpeed: 0.5
    };
  }, [isMobile]);
  return (
    <section id="home" className="relative flex flex-col justify-end min-h-screen overflow-hidden">
      <div className="relative z-10 will-change-transform">
        <AnimatedHeaderSection
          subTitle={"Software Development Engineer"}
          title={"Nitish Pandit"}
          text={text}
          textColor={"text-black"}
        />
      </div>
      <figure
        className="absolute inset-0 z-0 w-full h-full will-change-transform"
        style={{ pointerEvents: "none" }}
      >
        <Canvas
          shadows={deviceCapabilities.enableShadows}
          dpr={deviceCapabilities.pixelRatio}
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
          performance={{ min: 0.5 }}
          frameloop="always"
          gl={{
            powerPreference: isMobile ? "low-power" : "high-performance",
            antialias: deviceCapabilities.enableShadows && !isMobile,
            alpha: true,
            depth: true,
            stencil: false,
            preserveDrawingBuffer: false
          }}
        >
          <Suspense fallback={
            <mesh>
              <sphereGeometry args={[1, 16, 12]} />
              <meshBasicMaterial color="#666" />
            </mesh>
          }>
            <ambientLight intensity={0.5} />
            <Float speed={deviceCapabilities.floatSpeed}>
              <Planet scale={isMobile ? 0.7 : 1} />
            </Float>
            <Environment resolution={deviceCapabilities.environmentResolution}>
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
              {deviceCapabilities.enableShadows && (
                <>
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
                </>
              )}
            </group>
          </Environment>
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
