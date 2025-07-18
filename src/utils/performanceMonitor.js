// Performance monitoring utility for low-end device optimization
class PerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fps = 60;
    this.isLowPerformance = false;
    this.performanceLevel = 'high';
    this.callbacks = [];
    this.memoryPressure = 'normal';
    this.webglContextLost = false;
    this.consecutiveLowFrames = 0;

    this.init();
  }

  init() {
    // Initial device detection
    this.detectDeviceCapabilities();

    // Start monitoring if needed
    if (this.shouldMonitor()) {
      this.startMonitoring();
    }

    // Setup WebGL context loss detection
    this.setupWebGLContextMonitoring();

    // Setup memory pressure monitoring
    this.setupMemoryPressureMonitoring();
  }

  detectDeviceCapabilities() {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // More aggressive detection for very low-end devices
    const isVeryLowEnd = cores <= 2 || memory <= 2 || (cores <= 4 && memory <= 3 && isMobile);
    const isLowEnd = cores <= 4 || memory <= 4;

    // Check for specific problematic devices
    const userAgent = navigator.userAgent.toLowerCase();
    const isOldAndroid = /android [1-6]\./.test(userAgent);
    const isOldIOS = /os [1-9]_/.test(userAgent);
    const isLowEndBrowser = /chrome\/[1-5][0-9]\./.test(userAgent);

    if (isVeryLowEnd || isOldAndroid || isOldIOS || isLowEndBrowser || (isLowEnd && isMobile)) {
      this.performanceLevel = 'very-low';
      this.isLowPerformance = true;
    } else if (isLowEnd) {
      this.performanceLevel = 'low';
      this.isLowPerformance = true;
    } else {
      this.performanceLevel = 'high';
      this.isLowPerformance = false;
    }
  }

  shouldMonitor() {
    // Only monitor on potentially problematic devices
    return this.performanceLevel !== 'high';
  }

  startMonitoring() {
    const monitor = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - this.lastTime;

      if (deltaTime >= 1000) { // Check every second
        this.fps = Math.round((this.frameCount * 1000) / deltaTime);

        // Track consecutive low frame periods
        if (this.fps < 20) {
          this.consecutiveLowFrames++;
        } else {
          this.consecutiveLowFrames = 0;
        }

        // More aggressive performance degradation detection
        if (this.fps < 15 || this.consecutiveLowFrames >= 3) {
          if (this.performanceLevel !== 'critical') {
            this.performanceLevel = 'critical';
            this.isLowPerformance = true;
            this.notifyCallbacks('performance-critical');
          }
        } else if (this.fps < 25 && this.performanceLevel !== 'very-low') {
          this.performanceLevel = 'very-low';
          this.isLowPerformance = true;
          this.notifyCallbacks('performance-degraded');
        } else if (this.fps < 40 && this.performanceLevel === 'high') {
          this.performanceLevel = 'low';
          this.isLowPerformance = true;
          this.notifyCallbacks('performance-degraded');
        }

        this.frameCount = 0;
        this.lastTime = currentTime;
      }

      this.frameCount++;
      requestAnimationFrame(monitor);
    };

    requestAnimationFrame(monitor);
  }

  notifyCallbacks(event) {
    this.callbacks.forEach(callback => {
      try {
        callback(event, {
          fps: this.fps,
          performanceLevel: this.performanceLevel,
          isLowPerformance: this.isLowPerformance
        });
      } catch (error) {
        console.warn('Performance monitor callback error:', error);
      }
    });
  }

  onPerformanceChange(callback) {
    this.callbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  getPerformanceLevel() {
    return this.performanceLevel;
  }

  isLowPerformanceDevice() {
    return this.isLowPerformance;
  }

  getCurrentFPS() {
    return this.fps;
  }

  setupWebGLContextMonitoring() {
    // Monitor for WebGL context loss events
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (gl) {
      canvas.addEventListener('webglcontextlost', (event) => {
        event.preventDefault();
        this.webglContextLost = true;
        this.performanceLevel = 'critical';
        this.notifyCallbacks('webgl-context-lost');
        console.warn('WebGL context lost - switching to fallback mode');
      });

      canvas.addEventListener('webglcontextrestored', () => {
        this.webglContextLost = false;
        this.notifyCallbacks('webgl-context-restored');
        console.log('WebGL context restored');
      });
    }
  }

  setupMemoryPressureMonitoring() {
    // Monitor memory usage if available
    if ('memory' in performance) {
      setInterval(() => {
        const memInfo = performance.memory;
        const usedMemoryMB = memInfo.usedJSHeapSize / 1048576;
        const totalMemoryMB = memInfo.totalJSHeapSize / 1048576;
        const memoryUsagePercent = (usedMemoryMB / totalMemoryMB) * 100;

        if (memoryUsagePercent > 90) {
          this.memoryPressure = 'critical';
          this.notifyCallbacks('memory-pressure-critical');
        } else if (memoryUsagePercent > 75) {
          this.memoryPressure = 'high';
          this.notifyCallbacks('memory-pressure-high');
        } else {
          this.memoryPressure = 'normal';
        }
      }, 5000); // Check every 5 seconds
    }
  }

  isWebGLContextLost() {
    return this.webglContextLost;
  }

  getMemoryPressure() {
    return this.memoryPressure;
  }

  forceGarbageCollection() {
    // Force garbage collection if available (Chrome DevTools)
    if (window.gc) {
      window.gc();
    }

    // Trigger memory cleanup
    this.notifyCallbacks('force-cleanup');
  }

  // Static method to get optimized settings based on performance level
  static getOptimizedSettings(performanceLevel) {
    switch (performanceLevel) {
      case 'critical':
        return {
          animationDuration: 0.1,
          staggerDelay: 0.02,
          enableShadows: false,
          enableComplexAnimations: false,
          pixelRatio: 0.5,
          frameRate: 20,
          enableParticles: false,
          enableBlur: false,
          enableGradients: false,
          enable3D: false,
          enableWebGL: false
        };
      case 'very-low':
        return {
          animationDuration: 0.2,
          staggerDelay: 0.05,
          enableShadows: false,
          enableComplexAnimations: false,
          pixelRatio: 0.75,
          frameRate: 30,
          enableParticles: false,
          enableBlur: false,
          enableGradients: false,
          enable3D: true,
          enableWebGL: true
        };
      case 'low':
        return {
          animationDuration: 0.4,
          staggerDelay: 0.1,
          enableShadows: false,
          enableComplexAnimations: false,
          pixelRatio: 1,
          frameRate: 45,
          enableParticles: false,
          enableBlur: false,
          enableGradients: true,
          enable3D: true,
          enableWebGL: true
        };
      default:
        return {
          animationDuration: 0.6,
          staggerDelay: 0.15,
          enableShadows: true,
          enableComplexAnimations: true,
          pixelRatio: Math.min(window.devicePixelRatio, 2),
          frameRate: 60,
          enableParticles: true,
          enableBlur: true,
          enableGradients: true,
          enable3D: true,
          enableWebGL: true
        };
    }
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;
export { PerformanceMonitor };
