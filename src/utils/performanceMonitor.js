// Performance monitoring utility for low-end device optimization
class PerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fps = 60;
    this.isLowPerformance = false;
    this.performanceLevel = 'high';
    this.callbacks = [];
    
    this.init();
  }

  init() {
    // Initial device detection
    this.detectDeviceCapabilities();
    
    // Start monitoring if needed
    if (this.shouldMonitor()) {
      this.startMonitoring();
    }
  }

  detectDeviceCapabilities() {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const isVeryLowEnd = cores <= 2 || memory <= 2;
    const isLowEnd = cores <= 4 || memory <= 4;
    
    if (isVeryLowEnd || (isLowEnd && isMobile)) {
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
        
        // Detect performance issues
        if (this.fps < 30 && this.performanceLevel !== 'very-low') {
          this.performanceLevel = 'very-low';
          this.isLowPerformance = true;
          this.notifyCallbacks('performance-degraded');
        } else if (this.fps < 45 && this.performanceLevel === 'high') {
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

  // Static method to get optimized settings based on performance level
  static getOptimizedSettings(performanceLevel) {
    switch (performanceLevel) {
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
          enableGradients: false
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
          enableGradients: true
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
          enableGradients: true
        };
    }
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;
export { PerformanceMonitor };
