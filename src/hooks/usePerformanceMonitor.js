import { useEffect, useRef, useState } from 'react';

export const usePerformanceMonitor = () => {
  const [performanceLevel, setPerformanceLevel] = useState('high');
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fpsHistory = useRef([]);
  const monitoringRef = useRef(null);

  useEffect(() => {
    let animationId;
    
    const measurePerformance = () => {
      const now = performance.now();
      const delta = now - lastTime.current;
      
      if (delta >= 1000) { // Measure every second
        const fps = Math.round((frameCount.current * 1000) / delta);
        fpsHistory.current.push(fps);
        
        // Keep only last 5 measurements
        if (fpsHistory.current.length > 5) {
          fpsHistory.current.shift();
        }
        
        // Calculate average FPS
        const avgFps = fpsHistory.current.reduce((a, b) => a + b, 0) / fpsHistory.current.length;
        
        // Adjust performance level based on FPS
        if (avgFps < 20) {
          setPerformanceLevel('low');
        } else if (avgFps < 40) {
          setPerformanceLevel('medium');
        } else {
          setPerformanceLevel('high');
        }
        
        frameCount.current = 0;
        lastTime.current = now;
      }
      
      frameCount.current++;
      animationId = requestAnimationFrame(measurePerformance);
    };
    
    // Start monitoring after a delay to let the scene load
    const timeoutId = setTimeout(() => {
      measurePerformance();
    }, 2000);
    
    return () => {
      clearTimeout(timeoutId);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return performanceLevel;
};
