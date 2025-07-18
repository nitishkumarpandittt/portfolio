/**
 * Advanced Performance Monitoring System for Mobile Optimization
 * Maintains 60fps while preserving visual quality
 */

class AdvancedPerformanceMonitor {
  constructor() {
    this.fps = 60;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fpsHistory = [];
    this.memoryHistory = [];
    this.isMonitoring = false;
    this.callbacks = new Set();
    this.performanceLevel = 'HIGH';
    
    // Device capabilities
    this.deviceInfo = this.detectDevice();
    this.qualitySettings = this.calculateQualitySettings();
    
    // Performance thresholds for 60fps target
    this.thresholds = {
      TARGET_FPS: 60,
      LOW_FPS: 45,
      CRITICAL_FPS: 30,
      MEMORY_WARNING: 50, // MB
      MEMORY_CRITICAL: 100, // MB
      FRAME_TIME_TARGET: 16.67 // ms for 60fps
    };

    // Adaptive quality system
    this.adaptiveQuality = {
      enabled: true,
      adjustmentCooldown: 2000, // 2 seconds
      lastAdjustment: 0,
      qualityLevel: 1.0
    };
  }

  detectDevice() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    const info = {
      cores: navigator.hardwareConcurrency || 4,
      memory: navigator.deviceMemory || 4,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
      isAndroid: /Android/.test(navigator.userAgent),
      pixelRatio: window.devicePixelRatio || 1,
      screenSize: window.screen.width * window.screen.height,
      webgl2: !!gl && gl.constructor.name.includes('2'),
      maxTextureSize: gl ? gl.getParameter(gl.MAX_TEXTURE_SIZE) : 2048,
      vendor: gl ? gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info')?.UNMASKED_VENDOR_WEBGL) : 'unknown',
      renderer: gl ? gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info')?.UNMASKED_RENDERER_WEBGL) : 'unknown'
    };

    canvas.remove();

    // Enhanced device classification for mobile optimization
    info.isLowEndMobile = info.isMobile && (info.cores <= 4 || info.memory <= 3);
    info.isMidRangeMobile = info.isMobile && (info.cores <= 6 || info.memory <= 6);
    info.isHighEndMobile = info.isMobile && (info.cores > 6 && info.memory > 6);
    info.isDesktop = !info.isMobile;

    // GPU tier estimation
    if (info.renderer) {
      const renderer = info.renderer.toLowerCase();
      info.gpuTier = this.estimateGPUTier(renderer);
    } else {
      info.gpuTier = 'unknown';
    }

    return info;
  }

  estimateGPUTier(renderer) {
    // High-end mobile GPUs
    if (/adreno 6[4-9][0-9]|mali-g[7-9][0-9]|apple a1[2-9]|apple m[1-9]/i.test(renderer)) {
      return 'high';
    }
    // Mid-range mobile GPUs
    if (/adreno [5-6][0-9][0-9]|mali-g[5-6][0-9]|apple a(8|9|1[0-9])/i.test(renderer)) {
      return 'medium';
    }
    // Low-end mobile GPUs
    if (/adreno [1-4][0-9][0-9]|mali-[4-5][0-9][0-9]|apple a[4-7]/i.test(renderer)) {
      return 'low';
    }
    return 'unknown';
  }

  calculateQualitySettings() {
    const { deviceInfo } = this;
    
    // Mobile-first optimization strategy
    if (deviceInfo.isMobile) {
      if (deviceInfo.isLowEndMobile || deviceInfo.gpuTier === 'low') {
        return {
          level: 'MOBILE_LOW',
          pixelRatio: 1,
          shadowMapSize: 256,
          environmentResolution: 64,
          enableShadows: false,
          enablePostProcessing: false,
          particleCount: 0.2,
          geometryLOD: 'low',
          textureQuality: 'low',
          animationQuality: 'reduced',
          targetFPS: 60
        };
      } else if (deviceInfo.isMidRangeMobile || deviceInfo.gpuTier === 'medium') {
        return {
          level: 'MOBILE_MEDIUM',
          pixelRatio: Math.min(deviceInfo.pixelRatio, 1.5),
          shadowMapSize: 512,
          environmentResolution: 128,
          enableShadows: true,
          enablePostProcessing: false,
          particleCount: 0.5,
          geometryLOD: 'medium',
          textureQuality: 'medium',
          animationQuality: 'standard',
          targetFPS: 60
        };
      } else {
        return {
          level: 'MOBILE_HIGH',
          pixelRatio: Math.min(deviceInfo.pixelRatio, 2),
          shadowMapSize: 1024,
          environmentResolution: 256,
          enableShadows: true,
          enablePostProcessing: true,
          particleCount: 0.8,
          geometryLOD: 'high',
          textureQuality: 'high',
          animationQuality: 'full',
          targetFPS: 60
        };
      }
    } else {
      // Desktop settings - maintain full quality
      return {
        level: 'DESKTOP',
        pixelRatio: Math.min(deviceInfo.pixelRatio, 2),
        shadowMapSize: 2048,
        environmentResolution: 512,
        enableShadows: true,
        enablePostProcessing: true,
        particleCount: 1.0,
        geometryLOD: 'ultra',
        textureQuality: 'ultra',
        animationQuality: 'full',
        targetFPS: 60
      };
    }
  }

  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.monitorFrame();
    this.monitorMemory();
    this.setupVisibilityChange();
  }

  stopMonitoring() {
    this.isMonitoring = false;
  }

  monitorFrame() {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    
    if (deltaTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / deltaTime);
      this.fpsHistory.push(this.fps);
      
      // Keep only last 30 samples (30 seconds)
      if (this.fpsHistory.length > 30) {
        this.fpsHistory.shift();
      }
      
      this.frameCount = 0;
      this.lastTime = currentTime;
      
      // Adaptive quality adjustment
      this.adjustQualityBasedOnPerformance();
      
      // Notify callbacks
      this.notifyCallbacks({
        type: 'fps',
        fps: this.fps,
        averageFps: this.getAverageFPS(),
        performanceLevel: this.performanceLevel,
        qualityLevel: this.adaptiveQuality.qualityLevel
      });
    }
    
    this.frameCount++;
    requestAnimationFrame(() => this.monitorFrame());
  }

  adjustQualityBasedOnPerformance() {
    const now = performance.now();
    if (now - this.adaptiveQuality.lastAdjustment < this.adaptiveQuality.adjustmentCooldown) {
      return;
    }

    const avgFps = this.getAverageFPS();
    const targetFps = this.thresholds.TARGET_FPS;
    
    if (avgFps < this.thresholds.CRITICAL_FPS) {
      // Critical performance - reduce quality significantly
      this.adaptiveQuality.qualityLevel = Math.max(0.3, this.adaptiveQuality.qualityLevel - 0.2);
      this.performanceLevel = 'CRITICAL';
    } else if (avgFps < this.thresholds.LOW_FPS) {
      // Low performance - reduce quality moderately
      this.adaptiveQuality.qualityLevel = Math.max(0.5, this.adaptiveQuality.qualityLevel - 0.1);
      this.performanceLevel = 'LOW';
    } else if (avgFps >= targetFps - 5) {
      // Good performance - can increase quality
      this.adaptiveQuality.qualityLevel = Math.min(1.0, this.adaptiveQuality.qualityLevel + 0.05);
      this.performanceLevel = 'HIGH';
    }

    this.adaptiveQuality.lastAdjustment = now;
  }

  monitorMemory() {
    if (!this.isMonitoring) return;
    
    if (performance.memory) {
      const memoryInfo = {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(performance.memory.totalJSHeapSize / 1048576),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
      };
      
      this.memoryHistory.push(memoryInfo);
      
      if (this.memoryHistory.length > 30) {
        this.memoryHistory.shift();
      }
      
      // Memory pressure handling
      if (memoryInfo.used > this.thresholds.MEMORY_CRITICAL) {
        this.notifyCallbacks({ type: 'memory-critical', memory: memoryInfo });
        this.forceGC();
      } else if (memoryInfo.used > this.thresholds.MEMORY_WARNING) {
        this.notifyCallbacks({ type: 'memory-warning', memory: memoryInfo });
      }
    }
    
    setTimeout(() => this.monitorMemory(), 5000);
  }

  setupVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.notifyCallbacks({ type: 'tab-hidden' });
      } else {
        this.notifyCallbacks({ type: 'tab-visible' });
      }
    });
  }

  getAverageFPS() {
    if (this.fpsHistory.length === 0) return 60;
    return this.fpsHistory.reduce((sum, fps) => sum + fps, 0) / this.fpsHistory.length;
  }

  getOptimalSettings() {
    const settings = { ...this.qualitySettings };
    
    // Apply adaptive quality scaling
    const qualityMultiplier = this.adaptiveQuality.qualityLevel;
    
    settings.pixelRatio *= qualityMultiplier;
    settings.shadowMapSize = Math.round(settings.shadowMapSize * qualityMultiplier);
    settings.environmentResolution = Math.round(settings.environmentResolution * qualityMultiplier);
    settings.particleCount *= qualityMultiplier;
    
    // Ensure minimum quality thresholds
    settings.pixelRatio = Math.max(0.5, Math.min(settings.pixelRatio, 2));
    settings.shadowMapSize = Math.max(128, settings.shadowMapSize);
    settings.environmentResolution = Math.max(32, settings.environmentResolution);
    
    return settings;
  }

  subscribe(callback) {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  notifyCallbacks(data) {
    this.callbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.warn('Performance monitor callback error:', error);
      }
    });
  }

  forceGC() {
    if (window.gc) {
      window.gc();
    }
  }

  getReport() {
    return {
      deviceInfo: this.deviceInfo,
      qualitySettings: this.qualitySettings,
      currentFPS: this.fps,
      averageFPS: this.getAverageFPS(),
      performanceLevel: this.performanceLevel,
      qualityLevel: this.adaptiveQuality.qualityLevel,
      memory: performance.memory ? {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(performance.memory.totalJSHeapSize / 1048576),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
      } : null,
      fpsHistory: [...this.fpsHistory],
      memoryHistory: [...this.memoryHistory]
    };
  }
}

export const advancedPerformanceMonitor = new AdvancedPerformanceMonitor();
export default AdvancedPerformanceMonitor;
