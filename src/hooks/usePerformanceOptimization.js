import { useEffect, useRef, useCallback } from 'react';
import performanceMonitor from '../utils/performanceMonitor';
import webglContextManager from '../utils/webglContextManager';

// Hook for automatic performance optimization without UI changes
export const usePerformanceOptimization = () => {
  const optimizationApplied = useRef(false);
  const cleanupFunctions = useRef([]);

  // Apply performance optimizations based on device capabilities
  const applyOptimizations = useCallback((performanceLevel, contextInfo) => {
    if (optimizationApplied.current) return;

    const settings = performanceMonitor.constructor.getOptimizedSettings(performanceLevel);
    
    // Apply CSS-based optimizations for low-end devices
    if (performanceLevel === 'critical' || performanceLevel === 'very-low') {
      const style = document.createElement('style');
      style.id = 'performance-optimizations';
      style.textContent = `
        /* Reduce animation complexity for low-end devices */
        * {
          animation-duration: ${settings.animationDuration}s !important;
          transition-duration: ${settings.animationDuration}s !important;
        }
        
        /* Disable expensive visual effects */
        ${!settings.enableBlur ? '* { filter: none !important; backdrop-filter: none !important; }' : ''}
        ${!settings.enableShadows ? '* { box-shadow: none !important; text-shadow: none !important; }' : ''}
        
        /* Optimize transforms */
        .will-change-transform {
          will-change: ${performanceLevel === 'critical' ? 'auto' : 'transform'} !important;
          backface-visibility: ${performanceLevel === 'critical' ? 'visible' : 'hidden'} !important;
        }
        
        /* Reduce pixel ratio for better performance */
        canvas {
          image-rendering: ${performanceLevel === 'critical' ? 'pixelated' : 'auto'} !important;
        }
      `;
      
      document.head.appendChild(style);
      cleanupFunctions.current.push(() => {
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      });
    }

    // Apply memory management optimizations
    if (performanceLevel === 'critical' || performanceLevel === 'very-low') {
      // Force garbage collection periodically
      const gcInterval = setInterval(() => {
        if (window.gc) {
          window.gc();
        }
        
        // Clear any unused resources
        if (performance.memory) {
          const memInfo = performance.memory;
          const usedMemoryMB = memInfo.usedJSHeapSize / 1048576;
          const totalMemoryMB = memInfo.totalJSHeapSize / 1048576;
          const memoryUsagePercent = (usedMemoryMB / totalMemoryMB) * 100;
          
          if (memoryUsagePercent > 85) {
            // Trigger cleanup events
            window.dispatchEvent(new CustomEvent('memory-pressure', {
              detail: { usage: memoryUsagePercent, level: 'high' }
            }));
          }
        }
      }, 10000); // Every 10 seconds
      
      cleanupFunctions.current.push(() => clearInterval(gcInterval));
    }

    // Apply WebGL-specific optimizations
    if (!webglContextManager.isWebGLAvailable() || performanceLevel === 'critical') {
      // Disable WebGL-heavy features by dispatching events
      window.dispatchEvent(new CustomEvent('disable-webgl-features', {
        detail: { reason: 'performance-optimization', level: performanceLevel }
      }));
    }

    optimizationApplied.current = true;
    console.log(`Performance optimizations applied for ${performanceLevel} performance level`);
  }, []);

  // Monitor performance and apply optimizations
  useEffect(() => {
    let performanceUnsubscribe, webglUnsubscribe;

    // Subscribe to performance changes
    performanceUnsubscribe = performanceMonitor.onPerformanceChange((event, data) => {
      if (event === 'performance-degraded' || event === 'performance-critical') {
        applyOptimizations(data.performanceLevel, data);
      }
    });

    // Subscribe to WebGL context events
    webglUnsubscribe = webglContextManager.onWebGLEvent((event, data) => {
      if (event === 'webgl-context-lost' || event === 'webgl-not-supported') {
        applyOptimizations('critical', data);
      }
    });

    // Apply initial optimizations based on current performance level
    const currentLevel = performanceMonitor.getPerformanceLevel();
    if (currentLevel === 'low' || currentLevel === 'very-low' || currentLevel === 'critical') {
      applyOptimizations(currentLevel, {});
    }

    return () => {
      if (performanceUnsubscribe) performanceUnsubscribe();
      if (webglUnsubscribe) webglUnsubscribe();
      
      // Cleanup all applied optimizations
      cleanupFunctions.current.forEach(cleanup => {
        try {
          cleanup();
        } catch (error) {
          console.warn('Cleanup error:', error);
        }
      });
      cleanupFunctions.current = [];
      optimizationApplied.current = false;
    };
  }, [applyOptimizations]);

  // Return current performance info for debugging
  return {
    performanceLevel: performanceMonitor.getPerformanceLevel(),
    isWebGLAvailable: webglContextManager.isWebGLAvailable(),
    contextInfo: webglContextManager.getContextInfo(),
    optimizationApplied: optimizationApplied.current
  };
};

// Hook for Three.js specific optimizations
export const useThreeJSOptimization = () => {
  const frameSkipCounter = useRef(0);
  const lastFrameTime = useRef(performance.now());

  useEffect(() => {
    const handlePerformanceChange = (event, data) => {
      if (event === 'performance-critical' || event === 'memory-pressure-critical') {
        // Dispatch event to Three.js components to reduce quality
        window.dispatchEvent(new CustomEvent('threejs-reduce-quality', {
          detail: { level: data.performanceLevel, fps: data.fps }
        }));
      }
    };

    const unsubscribe = performanceMonitor.onPerformanceChange(handlePerformanceChange);
    return unsubscribe;
  }, []);

  // Frame skipping utility for animations
  const shouldSkipFrame = useCallback((targetFPS = 30) => {
    const now = performance.now();
    const deltaTime = now - lastFrameTime.current;
    const targetFrameTime = 1000 / targetFPS;

    if (deltaTime < targetFrameTime) {
      frameSkipCounter.current++;
      return frameSkipCounter.current % 2 === 0; // Skip every other frame
    }

    lastFrameTime.current = now;
    frameSkipCounter.current = 0;
    return false;
  }, []);

  return { shouldSkipFrame };
};
