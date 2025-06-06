/**
 * Cross-browser compatibility utilities for EPK
 */

export class BrowserCompatibility {
  private static instance: BrowserCompatibility;
  private browserInfo: {
    name: string;
    version: string;
    isMobile: boolean;
    supportsWebP: boolean;
    supportsIntersectionObserver: boolean;
    supportsCustomProperties: boolean;
  };

  private constructor() {
    this.browserInfo = this.detectBrowser();
    this.initializeCompatibility();
  }

  static getInstance(): BrowserCompatibility {
    if (!BrowserCompatibility.instance) {
      BrowserCompatibility.instance = new BrowserCompatibility();
    }
    return BrowserCompatibility.instance;
  }

  private detectBrowser() {
    const ua = navigator.userAgent;
    const info = {
      name: 'unknown',
      version: '0',
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
      supportsWebP: false,
      supportsIntersectionObserver: 'IntersectionObserver' in window,
      supportsCustomProperties: CSS.supports('color', 'var(--fake-var)')
    };

    // Detect browser
    if (ua.includes('Chrome')) {
      info.name = 'chrome';
      info.version = ua.match(/Chrome\/(\d+)/)?.[1] || '0';
    } else if (ua.includes('Firefox')) {
      info.name = 'firefox';
      info.version = ua.match(/Firefox\/(\d+)/)?.[1] || '0';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
      info.name = 'safari';
      info.version = ua.match(/Version\/(\d+)/)?.[1] || '0';
    } else if (ua.includes('Edge')) {
      info.name = 'edge';
      info.version = ua.match(/Edge\/(\d+)/)?.[1] || '0';
    }

    // Test WebP support
    this.testWebPSupport().then(supported => {
      info.supportsWebP = supported;
    });

    return info;
  }

  private async testWebPSupport(): Promise<boolean> {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  private initializeCompatibility() {
    // Add browser-specific classes to body
    document.body.classList.add(`browser-${this.browserInfo.name}`);
    if (this.browserInfo.isMobile) {
      document.body.classList.add('is-mobile');
    }

    // Polyfill for older browsers
    this.loadPolyfills();

    // Apply compatibility fixes
    this.applyCompatibilityFixes();
  }

  private loadPolyfills() {
    // Intersection Observer polyfill for older browsers
    if (!this.browserInfo.supportsIntersectionObserver) {
      const script = document.createElement('script');
      script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
      script.async = true;
      document.head.appendChild(script);
    }

    // CSS Custom Properties polyfill for IE
    if (!this.browserInfo.supportsCustomProperties) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2';
      script.async = true;
      script.onload = () => {
        // @ts-expect-error - cssVars is added by external polyfill
        if (window.cssVars) {
          // @ts-expect-error - cssVars function is added by external polyfill
          window.cssVars();
        }
      };
      document.head.appendChild(script);
    }
  }

  private applyCompatibilityFixes() {
    // Safari-specific fixes
    if (this.browserInfo.name === 'safari') {
      // Fix for backdrop-filter on older Safari versions
      const safariVersion = parseInt(this.browserInfo.version);
      if (safariVersion < 14) {
        const style = document.createElement('style');
        style.textContent = `
          .backdrop-blur-md {
            background-color: rgba(0, 0, 0, 0.8) !important;
            backdrop-filter: none !important;
          }
        `;
        document.head.appendChild(style);
      }
    }

    // Firefox-specific fixes
    if (this.browserInfo.name === 'firefox') {
      // Fix for smooth scrolling
      const style = document.createElement('style');
      style.textContent = `
        html {
          scroll-behavior: smooth;
        }
      `;
      document.head.appendChild(style);
    }

    // Mobile-specific fixes
    if (this.browserInfo.isMobile) {
      // Prevent iOS zoom on input focus
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 
          viewport.getAttribute('content') + ', maximum-scale=1.0, user-scalable=no'
        );
      }

      // Fix for mobile viewport height
      const style = document.createElement('style');
      style.textContent = `
        .min-h-screen {
          min-height: 100vh;
          min-height: -webkit-fill-available;
        }
      `;
      document.head.appendChild(style);
    }
  }

  getBrowserInfo() {
    return { ...this.browserInfo };
  }

  isSupported(): boolean {
    // Define minimum browser requirements
    const requirements = {
      chrome: 80,
      firefox: 75,
      safari: 13,
      edge: 80
    };

    const browserVersion = parseInt(this.browserInfo.version);
    const minVersion = requirements[this.browserInfo.name as keyof typeof requirements];

    return minVersion ? browserVersion >= minVersion : false;
  }

  showUnsupportedBrowserWarning() {
    if (!this.isSupported()) {
      const warning = document.createElement('div');
      warning.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ff4444;
        color: white;
        padding: 10px;
        text-align: center;
        z-index: 9999;
        font-family: Arial, sans-serif;
      `;
      warning.innerHTML = `
        <strong>Browser Compatibility Notice:</strong> 
        For the best experience viewing this Electronic Press Kit, 
        please update your browser or use a modern browser like Chrome, Firefox, or Safari.
        <button onclick="this.parentElement.remove()" style="margin-left: 10px; background: rgba(255,255,255,0.2); border: none; color: white; padding: 5px 10px; cursor: pointer;">×</button>
      `;
      document.body.insertBefore(warning, document.body.firstChild);
    }
  }
}

// Initialize compatibility checker
export function initializeBrowserCompatibility() {
  const compat = BrowserCompatibility.getInstance();
  
  // Show warning for unsupported browsers
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      compat.showUnsupportedBrowserWarning();
    }, 1000);
  }
  
  return compat;
}

// React component for browser compatibility
export function BrowserCompatibilityProvider({ children }: { children: React.ReactNode }) {
  if (typeof window !== 'undefined') {
    initializeBrowserCompatibility();
  }
  
  return <>{children}</>;
}
