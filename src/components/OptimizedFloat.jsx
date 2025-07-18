import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function OptimizedFloat({ 
  children, 
  speed = 1, 
  rotationIntensity = 1, 
  floatIntensity = 1,
  performanceLevel = 'high',
  ...props 
}) {
  const ref = useRef();
  const offset = useRef(Math.random() * 10000);
  
  // Reduce animation complexity based on performance level
  const getAnimationSettings = () => {
    switch (performanceLevel) {
      case 'low':
        return {
          speed: speed * 0.3,
          rotationIntensity: rotationIntensity * 0.2,
          floatIntensity: floatIntensity * 0.3,
          updateFrequency: 3 // Update every 3rd frame
        };
      case 'medium':
        return {
          speed: speed * 0.6,
          rotationIntensity: rotationIntensity * 0.5,
          floatIntensity: floatIntensity * 0.6,
          updateFrequency: 2 // Update every 2nd frame
        };
      default:
        return {
          speed,
          rotationIntensity,
          floatIntensity,
          updateFrequency: 1 // Update every frame
        };
    }
  };

  const settings = getAnimationSettings();
  const frameCounter = useRef(0);

  useFrame((state) => {
    frameCounter.current++;
    
    // Skip frames based on performance level
    if (frameCounter.current % settings.updateFrequency !== 0) {
      return;
    }

    if (ref.current) {
      const t = offset.current + state.clock.elapsedTime * settings.speed;
      
      // Simplified float animation
      ref.current.rotation.x = Math.cos(t / 4) * settings.rotationIntensity * 0.1;
      ref.current.rotation.y = Math.sin(t / 4) * settings.rotationIntensity * 0.1;
      ref.current.rotation.z = Math.sin(t / 8) * settings.rotationIntensity * 0.05;
      
      ref.current.position.y = Math.sin(t / 2) * settings.floatIntensity * 0.1;
    }
  });

  return (
    <group ref={ref} {...props}>
      {children}
    </group>
  );
}
