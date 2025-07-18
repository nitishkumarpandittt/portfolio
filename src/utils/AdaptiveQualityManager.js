/**
 * Adaptive Quality Management System
 * Dynamically adjusts rendering quality to maintain 60fps
 */

import { advancedPerformanceMonitor } from './AdvancedPerformanceMonitor.js';

class AdaptiveQualityManager {
  constructor() {
    this.currentQuality = 'HIGH';
    this.qualityLevels = this.defineQualityLevels();
    this.adaptiveSettings = {};
    this.callbacks = new Set();
    this.isInitialized = false;
    
    // Quality adjustment parameters
    this.adjustmentParams = {
      fpsThreshold: 55, // Target minimum FPS
      adjustmentDelay: 2000, // Wait 2 seconds between adjustments
      lastAdjustment: 0,
      maxDowngrades: 3, // Maximum quality downgrades
      currentDowngrades: 0
    };
  }

  defineQualityLevels() {
    return {
      ULTRA: {
        name: 'Ultra',
        pixelRatio: 2.0,
        shadowMapSize: 2048,
        environmentResolution: 512,
        enableShadows: true,
        enablePostProcessing: true,
        enableSSAO: true,
        enableBloom: true,
        particleCount: 1.0,
        geometryLOD: 'ultra',
        textureQuality: 'ultra',
        animationQuality: 'full',
        antialiasing: 'MSAA',
        anisotropicFiltering: 16
      },
      HIGH: {
        name: 'High',
        pixelRatio: 1.5,
        shadowMapSize: 1024,
        environmentResolution: 256,
        enableShadows: true,
        enablePostProcessing: true,
        enableSSAO: false,
        enableBloom: true,
        particleCount: 0.8,
        geometryLOD: 'high',
        textureQuality: 'high',
        animationQuality: 'full',
        antialiasing: 'FXAA',
        anisotropicFiltering: 8
      },
      MEDIUM: {
        name: 'Medium',
        pixelRatio: 1.0,
        shadowMapSize: 512,
        environmentResolution: 128,
        enableShadows: true,
        enablePostProcessing: false,
        enableSSAO: false,
        enableBloom: false,
        particleCount: 0.6,
        geometryLOD: 'medium',
        textureQuality: 'medium',
        animationQuality: 'standard',
        antialiasing: 'FXAA',
        anisotropicFiltering: 4
      },
      LOW: {
        name: 'Low',
        pixelRatio: 1.0,
        shadowMapSize: 256,
        environmentResolution: 64,
        enableShadows: false,
        enablePostProcessing: false,
        enableSSAO: false,
        enableBloom: false,
        particleCount: 0.3,
        geometryLOD: 'low',
        textureQuality: 'low',
        animationQuality: 'reduced',
        antialiasing: 'none',
        anisotropicFiltering: 1
      },
      MINIMAL: {
        name: 'Minimal',
        pixelRatio: 0.75,
        shadowMapSize: 128,
        environmentResolution: 32,
        enableShadows: false,
        enablePostProcessing: false,
        enableSSAO: false,
        enableBloom: false,
        particleCount: 0.1,
        geometryLOD: 'minimal',
        textureQuality: 'minimal',
        animationQuality: 'minimal',
        antialiasing: 'none',
        anisotropicFiltering: 1
      }
    };
  }

  initialize() {
    if (this.isInitialized) return;

    // Get initial quality based on device capabilities
    const deviceInfo = advancedPerformanceMonitor.deviceInfo;
    this.currentQuality = this.determineInitialQuality(deviceInfo);
    this.adaptiveSettings = { ...this.qualityLevels[this.currentQuality] };

    // Subscribe to performance updates
    advancedPerformanceMonitor.subscribe((data) => {
      this.handlePerformanceUpdate(data);
    });

    this.isInitialized = true;
    this.notifyCallbacks('initialized', this.adaptiveSettings);
  }

  determineInitialQuality(deviceInfo) {
    // Desktop gets high quality by default
    if (deviceInfo.isDesktop) {
      return deviceInfo.cores > 8 && deviceInfo.memory > 8 ? 'ULTRA' : 'HIGH';
    }

    // Mobile quality determination
    if (deviceInfo.isMobile) {
      if (deviceInfo.isHighEndMobile && deviceInfo.gpuTier === 'high') {
        return 'HIGH';
      } else if (deviceInfo.isMidRangeMobile && deviceInfo.gpuTier === 'medium') {
        return 'MEDIUM';
      } else {
        return 'LOW';
      }
    }

    return 'MEDIUM'; // Fallback
  }

  handlePerformanceUpdate(data) {
    if (data.type !== 'fps') return;

    const now = performance.now();
    if (now - this.adjustmentParams.lastAdjustment < this.adjustmentParams.adjustmentDelay) {
      return;
    }

    const { fps, averageFps } = data;
    const targetFps = this.adjustmentParams.fpsThreshold;

    // Performance is too low - downgrade quality
    if (averageFps < targetFps && this.adjustmentParams.currentDowngrades < this.adjustmentParams.maxDowngrades) {
      this.downgradeQuality();
      this.adjustmentParams.lastAdjustment = now;
      this.adjustmentParams.currentDowngrades++;
    }
    // Performance is good - try to upgrade quality
    else if (averageFps > targetFps + 10 && this.adjustmentParams.currentDowngrades > 0) {
      this.upgradeQuality();
      this.adjustmentParams.lastAdjustment = now;
      this.adjustmentParams.currentDowngrades--;
    }
  }

  downgradeQuality() {
    const qualityOrder = ['ULTRA', 'HIGH', 'MEDIUM', 'LOW', 'MINIMAL'];
    const currentIndex = qualityOrder.indexOf(this.currentQuality);
    
    if (currentIndex < qualityOrder.length - 1) {
      const newQuality = qualityOrder[currentIndex + 1];
      this.setQuality(newQuality);
      console.log(`Quality downgraded to ${newQuality} for better performance`);
    }
  }

  upgradeQuality() {
    const qualityOrder = ['ULTRA', 'HIGH', 'MEDIUM', 'LOW', 'MINIMAL'];
    const currentIndex = qualityOrder.indexOf(this.currentQuality);
    
    if (currentIndex > 0) {
      const newQuality = qualityOrder[currentIndex - 1];
      this.setQuality(newQuality);
      console.log(`Quality upgraded to ${newQuality}`);
    }
  }

  setQuality(qualityLevel) {
    if (!this.qualityLevels[qualityLevel]) {
      console.warn(`Invalid quality level: ${qualityLevel}`);
      return;
    }

    this.currentQuality = qualityLevel;
    this.adaptiveSettings = { ...this.qualityLevels[qualityLevel] };
    
    // Apply device-specific adjustments
    this.applyDeviceSpecificAdjustments();
    
    this.notifyCallbacks('qualityChanged', {
      quality: qualityLevel,
      settings: this.adaptiveSettings
    });
  }

  applyDeviceSpecificAdjustments() {
    const deviceInfo = advancedPerformanceMonitor.deviceInfo;
    
    // Mobile-specific adjustments
    if (deviceInfo.isMobile) {
      // Limit pixel ratio on mobile
      this.adaptiveSettings.pixelRatio = Math.min(this.adaptiveSettings.pixelRatio, 1.5);
      
      // Reduce shadow quality on mobile
      if (this.adaptiveSettings.enableShadows) {
        this.adaptiveSettings.shadowMapSize = Math.min(this.adaptiveSettings.shadowMapSize, 512);
      }
      
      // Disable expensive effects on low-end mobile
      if (deviceInfo.isLowEndMobile) {
        this.adaptiveSettings.enablePostProcessing = false;
        this.adaptiveSettings.enableSSAO = false;
        this.adaptiveSettings.enableBloom = false;
      }
    }

    // High DPI adjustments
    if (deviceInfo.pixelRatio > 2) {
      this.adaptiveSettings.pixelRatio = Math.min(this.adaptiveSettings.pixelRatio, 2);
    }
  }

  getSettings() {
    return { ...this.adaptiveSettings };
  }

  getCurrentQuality() {
    return this.currentQuality;
  }

  // Manual quality override
  forceQuality(qualityLevel) {
    this.setQuality(qualityLevel);
    // Reset automatic adjustments
    this.adjustmentParams.currentDowngrades = 0;
    this.adjustmentParams.lastAdjustment = performance.now();
  }

  // Get quality recommendations for specific scenarios
  getQualityForScenario(scenario) {
    const deviceInfo = advancedPerformanceMonitor.deviceInfo;
    
    switch (scenario) {
      case 'hero-section':
        return deviceInfo.isMobile ? 'MEDIUM' : 'HIGH';
      case 'portfolio-items':
        return deviceInfo.isMobile ? 'LOW' : 'MEDIUM';
      case 'background-elements':
        return 'LOW';
      case 'interactive-elements':
        return deviceInfo.isMobile ? 'MEDIUM' : 'HIGH';
      default:
        return this.currentQuality;
    }
  }

  // Subscribe to quality changes
  subscribe(callback) {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  notifyCallbacks(type, data) {
    this.callbacks.forEach(callback => {
      try {
        callback({ type, data });
      } catch (error) {
        console.warn('Quality manager callback error:', error);
      }
    });
  }

  // Get performance report
  getReport() {
    return {
      currentQuality: this.currentQuality,
      settings: this.adaptiveSettings,
      adjustmentParams: this.adjustmentParams,
      availableQualities: Object.keys(this.qualityLevels),
      deviceInfo: advancedPerformanceMonitor.deviceInfo
    };
  }

  // Enable/disable adaptive quality
  setAdaptiveMode(enabled) {
    this.adaptiveSettings.adaptiveMode = enabled;
    if (!enabled) {
      // Reset to initial quality when disabled
      const deviceInfo = advancedPerformanceMonitor.deviceInfo;
      const initialQuality = this.determineInitialQuality(deviceInfo);
      this.setQuality(initialQuality);
    }
  }
}

export const adaptiveQualityManager = new AdaptiveQualityManager();
export default AdaptiveQualityManager;
