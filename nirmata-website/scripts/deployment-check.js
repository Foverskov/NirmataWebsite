#!/usr/bin/env node

/**
 * EPK Deployment Readiness Checker
 * Comprehensive testing script for Phase 3 completion
 */

const fs = require('fs');
const path = require('path');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class EPKDeploymentChecker {
  constructor() {
    this.results = [];
    this.warnings = [];
    this.errors = [];
  }

  log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
  }

  logResult(test, passed, details = '') {
    const icon = passed ? '✅' : '❌';
    const color = passed ? colors.green : colors.red;
    this.log(`${icon} ${test}${details ? ': ' + details : ''}`, color);
    
    this.results.push({ test, passed, details });
    if (!passed) {
      this.errors.push(`${test}: ${details}`);
    }
  }

  logWarning(message) {
    this.log(`⚠️  ${message}`, colors.yellow);
    this.warnings.push(message);
  }

  async checkFileExists(filePath, description) {
    const exists = fs.existsSync(filePath);
    this.logResult(`${description} exists`, exists, filePath);
    return exists;
  }

  async checkFileContent(filePath, searchText, description) {
    if (!fs.existsSync(filePath)) {
      this.logResult(`${description} content check`, false, 'File not found');
      return false;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const found = content.includes(searchText);
    this.logResult(`${description} contains required content`, found, searchText);
    return found;
  }

  async checkPackageScripts() {
    this.log('\n📦 Checking Package Configuration...', colors.bold);
    
    const packagePath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packagePath)) {
      this.logResult('Package.json exists', false);
      return;
    }

    const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Check required scripts
    const requiredScripts = ['dev', 'build', 'build:analyze', 'test:performance', 'test:epk'];
    requiredScripts.forEach(script => {
      const exists = packageContent.scripts && packageContent.scripts[script];
      this.logResult(`Script "${script}" configured`, !!exists);
    });

    // Check dependencies
    const requiredDeps = ['next', 'react', 'lucide-react'];
    requiredDeps.forEach(dep => {
      const exists = packageContent.dependencies && packageContent.dependencies[dep];
      this.logResult(`Dependency "${dep}" installed`, !!exists);
    });

    // Check dev dependencies
    const requiredDevDeps = ['@next/bundle-analyzer', 'puppeteer', 'lighthouse'];
    requiredDevDeps.forEach(dep => {
      const exists = packageContent.devDependencies && packageContent.devDependencies[dep];
      this.logResult(`Dev dependency "${dep}" installed`, !!exists);
    });
  }

  async checkEPKFiles() {
    this.log('\n🎵 Checking EPK Core Files...', colors.bold);
    
    const files = [
      { path: 'src/app/projects/faceless/page.tsx', desc: 'EPK Main Page' },
      { path: 'src/app/projects/faceless/layout.tsx', desc: 'EPK Layout' },
      { path: 'src/components/CriticalCSS.tsx', desc: 'Critical CSS Component' },
      { path: 'src/components/PerformanceMonitor.tsx', desc: 'Performance Monitor' },
      { path: 'src/components/EPKAnalytics.tsx', desc: 'Analytics Component' },
      { path: 'src/components/BrowserCompatibility.tsx', desc: 'Browser Compatibility' },
      { path: 'next.config.js', desc: 'Next.js Configuration' },
      { path: 'scripts/test-performance.js', desc: 'Performance Test Script' }
    ];

    for (const file of files) {
      await this.checkFileExists(file.path, file.desc);
    }
  }

  async checkAssets() {
    this.log('\n🖼️  Checking Assets...', colors.bold);
    
    const assets = [
      { path: 'public/FACELESS FINAL.png', desc: 'Album Artwork' },
      { path: 'public/BANDFRONT.jpg', desc: 'Band Photo' }
    ];

    for (const asset of assets) {
      const exists = await this.checkFileExists(asset.path, asset.desc);
      if (exists) {
        const stats = fs.statSync(asset.path);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        this.log(`   📊 Size: ${sizeMB}MB`, colors.cyan);
        
        if (stats.size > 2 * 1024 * 1024) { // 2MB
          this.logWarning(`${asset.desc} is larger than 2MB, consider optimization`);
        }
      }
    }
  }

  async checkPerformanceFeatures() {
    this.log('\n⚡ Checking Performance Features...', colors.bold);
    
    // Check Next.js Image optimization
    await this.checkFileContent(
      'src/app/projects/faceless/page.tsx',
      'next/image',
      'Next.js Image optimization usage'
    );

    // Check critical CSS implementation
    await this.checkFileContent(
      'src/components/CriticalCSS.tsx',
      'criticalCSS',
      'Critical CSS implementation'
    );

    // Check performance monitoring
    await this.checkFileContent(
      'src/components/PerformanceMonitor.tsx',
      'PerformanceObserver',
      'Performance monitoring implementation'
    );

    // Check bundle analyzer configuration
    await this.checkFileContent(
      'next.config.js',
      '@next/bundle-analyzer',
      'Bundle analyzer configuration'
    );
  }

  async checkSEOImplementation() {
    this.log('\n🔍 Checking SEO Implementation...', colors.bold);
    
    const layoutPath = 'src/app/projects/faceless/layout.tsx';
    
    const seoChecks = [
      { search: 'metadata', desc: 'Metadata export' },
      { search: 'title:', desc: 'Page title' },
      { search: 'description:', desc: 'Meta description' },
      { search: 'openGraph:', desc: 'Open Graph tags' },
      { search: 'twitter:', desc: 'Twitter card tags' },
      { search: 'keywords:', desc: 'Keywords meta tag' }
    ];

    for (const check of seoChecks) {
      await this.checkFileContent(layoutPath, check.search, check.desc);
    }
  }

  async checkAnalyticsIntegration() {
    this.log('\n📊 Checking Analytics Integration...', colors.bold);
    
    const analyticsPath = 'src/components/EPKAnalytics.tsx';
    
    const analyticsChecks = [
      { search: 'gtag', desc: 'Google Analytics integration' },
      { search: 'trackEPKEvent', desc: 'Custom event tracking' },
      { search: 'IntersectionObserver', desc: 'Section visibility tracking' },
      { search: 'scroll', desc: 'Scroll tracking' }
    ];

    for (const check of analyticsChecks) {
      await this.checkFileContent(analyticsPath, check.search, check.desc);
    }
  }

  async checkBrowserCompatibility() {
    this.log('\n🌐 Checking Browser Compatibility...', colors.bold);
    
    const compatPath = 'src/components/BrowserCompatibility.tsx';
    
    const compatChecks = [
      { search: 'detectBrowser', desc: 'Browser detection' },
      { search: 'polyfill', desc: 'Polyfill loading' },
      { search: 'IntersectionObserver', desc: 'IntersectionObserver polyfill' },
      { search: 'supportsWebP', desc: 'WebP support detection' }
    ];

    for (const check of compatChecks) {
      await this.checkFileContent(compatPath, check.search, check.desc);
    }
  }

  async checkResponsiveDesign() {
    this.log('\n📱 Checking Responsive Design...', colors.bold);
    
    const epkPagePath = 'src/app/projects/faceless/page.tsx';
    
    const responsiveChecks = [
      { search: 'lg:block', desc: 'Desktop-specific styling' },
      { search: 'md:', desc: 'Tablet breakpoint usage' },
      { search: 'sm:', desc: 'Mobile breakpoint usage' },
      { search: 'hidden lg:block', desc: 'Desktop sticky layout' }
    ];

    for (const check of responsiveChecks) {
      await this.checkFileContent(epkPagePath, check.search, check.desc);
    }
  }

  generateReport() {
    this.log('\n📋 DEPLOYMENT READINESS REPORT', colors.bold + colors.cyan);
    this.log('═'.repeat(50), colors.cyan);
    
    const passedTests = this.results.filter(r => r.passed).length;
    const totalTests = this.results.length;
    const score = Math.round((passedTests / totalTests) * 100);
    
    this.log(`\n📊 Overall Score: ${score}% (${passedTests}/${totalTests} tests passed)`, 
      score >= 90 ? colors.green : score >= 70 ? colors.yellow : colors.red);
    
    if (this.errors.length > 0) {
      this.log('\n❌ Critical Issues:', colors.red + colors.bold);
      this.errors.forEach(error => this.log(`   • ${error}`, colors.red));
    }
    
    if (this.warnings.length > 0) {
      this.log('\n⚠️  Warnings:', colors.yellow + colors.bold);
      this.warnings.forEach(warning => this.log(`   • ${warning}`, colors.yellow));
    }
    
    this.log('\n🎯 Deployment Readiness:', colors.bold);
    if (score >= 95) {
      this.log('🚀 READY FOR PRODUCTION DEPLOYMENT!', colors.green + colors.bold);
    } else if (score >= 85) {
      this.log('✅ Ready for staging deployment, minor optimizations recommended', colors.yellow);
    } else if (score >= 70) {
      this.log('⚠️  Needs improvements before deployment', colors.yellow);
    } else {
      this.log('❌ Critical issues must be resolved before deployment', colors.red);
    }
    
    // Save report
    const report = {
      timestamp: new Date().toISOString(),
      score,
      passed: passedTests,
      total: totalTests,
      results: this.results,
      warnings: this.warnings,
      errors: this.errors
    };
    
    fs.writeFileSync('epk-deployment-report.json', JSON.stringify(report, null, 2));
    this.log('\n💾 Detailed report saved to epk-deployment-report.json', colors.blue);
  }

  async runAllChecks() {
    this.log('🚀 EPK DEPLOYMENT READINESS CHECKER', colors.bold + colors.cyan);
    this.log('═'.repeat(50), colors.cyan);
    
    await this.checkPackageScripts();
    await this.checkEPKFiles();
    await this.checkAssets();
    await this.checkPerformanceFeatures();
    await this.checkSEOImplementation();
    await this.checkAnalyticsIntegration();
    await this.checkBrowserCompatibility();
    await this.checkResponsiveDesign();
    
    this.generateReport();
  }
}

// Run if called directly
if (require.main === module) {
  const checker = new EPKDeploymentChecker();
  checker.runAllChecks().catch(console.error);
}

module.exports = { EPKDeploymentChecker };
