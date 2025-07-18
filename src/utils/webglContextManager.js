// WebGL Context Manager for handling context loss and recovery
class WebGLContextManager {
  constructor() {
    this.canvas = null;
    this.gl = null;
    this.isContextLost = false;
    this.callbacks = [];
    this.retryCount = 0;
    this.maxRetries = 3;
    this.retryDelay = 2000;
    
    this.init();
  }

  init() {
    // Create a hidden canvas for WebGL context monitoring
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1;
    this.canvas.height = 1;
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '-9999px';
    this.canvas.style.top = '-9999px';
    document.body.appendChild(this.canvas);

    this.setupWebGLContext();
    this.setupEventListeners();
  }

  setupWebGLContext() {
    try {
      this.gl = this.canvas.getContext('webgl', {
        failIfMajorPerformanceCaveat: false,
        antialias: false,
        alpha: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: 'default'
      }) || this.canvas.getContext('experimental-webgl');

      if (!this.gl) {
        console.warn('WebGL not supported');
        this.notifyCallbacks('webgl-not-supported');
        return false;
      }

      this.isContextLost = false;
      return true;
    } catch (error) {
      console.warn('WebGL context creation failed:', error);
      this.notifyCallbacks('webgl-creation-failed', { error });
      return false;
    }
  }

  setupEventListeners() {
    if (!this.canvas) return;

    this.canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      this.isContextLost = true;
      console.warn('WebGL context lost');
      this.notifyCallbacks('webgl-context-lost');
      
      // Attempt to restore context after a delay
      this.scheduleContextRestore();
    });

    this.canvas.addEventListener('webglcontextrestored', () => {
      this.isContextLost = false;
      this.retryCount = 0;
      console.log('WebGL context restored');
      this.notifyCallbacks('webgl-context-restored');
    });

    // Monitor for context loss periodically
    this.startContextMonitoring();
  }

  scheduleContextRestore() {
    if (this.retryCount >= this.maxRetries) {
      console.warn('Max WebGL context restore attempts reached');
      this.notifyCallbacks('webgl-restore-failed');
      return;
    }

    setTimeout(() => {
      this.retryCount++;
      console.log(`Attempting WebGL context restore (${this.retryCount}/${this.maxRetries})`);
      
      if (this.setupWebGLContext()) {
        this.notifyCallbacks('webgl-context-restored');
      } else {
        this.scheduleContextRestore();
      }
    }, this.retryDelay * this.retryCount);
  }

  startContextMonitoring() {
    // Check context health every 5 seconds
    setInterval(() => {
      if (this.gl && !this.isContextLost) {
        try {
          // Try a simple WebGL operation to check if context is still valid
          this.gl.getParameter(this.gl.VERSION);
        } catch (error) {
          console.warn('WebGL context appears to be lost:', error);
          this.isContextLost = true;
          this.notifyCallbacks('webgl-context-lost');
          this.scheduleContextRestore();
        }
      }
    }, 5000);
  }

  // Check if WebGL is available and working
  isWebGLAvailable() {
    return this.gl && !this.isContextLost;
  }

  // Get WebGL context info for debugging
  getContextInfo() {
    if (!this.gl) return null;

    try {
      const debugInfo = this.gl.getExtension('WEBGL_debug_renderer_info');
      return {
        vendor: this.gl.getParameter(this.gl.VENDOR),
        renderer: this.gl.getParameter(this.gl.RENDERER),
        version: this.gl.getParameter(this.gl.VERSION),
        shadingLanguageVersion: this.gl.getParameter(this.gl.SHADING_LANGUAGE_VERSION),
        unmaskedVendor: debugInfo ? this.gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : null,
        unmaskedRenderer: debugInfo ? this.gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : null,
        maxTextureSize: this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE),
        maxViewportDims: this.gl.getParameter(this.gl.MAX_VIEWPORT_DIMS),
        maxVertexAttribs: this.gl.getParameter(this.gl.MAX_VERTEX_ATTRIBS),
        isContextLost: this.isContextLost
      };
    } catch (error) {
      console.warn('Error getting WebGL context info:', error);
      return { error: error.message, isContextLost: this.isContextLost };
    }
  }

  // Subscribe to WebGL events
  onWebGLEvent(callback) {
    this.callbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  notifyCallbacks(event, data = {}) {
    this.callbacks.forEach(callback => {
      try {
        callback(event, { ...data, contextInfo: this.getContextInfo() });
      } catch (error) {
        console.warn('WebGL context manager callback error:', error);
      }
    });
  }

  // Force context loss for testing
  loseContext() {
    if (this.gl) {
      const loseContextExt = this.gl.getExtension('WEBGL_lose_context');
      if (loseContextExt) {
        loseContextExt.loseContext();
      }
    }
  }

  // Force context restore for testing
  restoreContext() {
    if (this.gl) {
      const loseContextExt = this.gl.getExtension('WEBGL_lose_context');
      if (loseContextExt) {
        loseContextExt.restoreContext();
      }
    }
  }

  // Cleanup
  destroy() {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    this.callbacks = [];
    this.gl = null;
    this.canvas = null;
  }
}

// Export singleton instance
export const webglContextManager = new WebGLContextManager();
export default webglContextManager;
