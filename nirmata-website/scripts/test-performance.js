#!/usr/bin/env node

/**
 * EPK Performance Testing Script
 * Tests the FACELESS EPK page for performance metrics
 */

const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const fs = require('fs');

const EPK_URL = 'http://localhost:3002/projects/faceless';

async function runPerformanceTests() {
  console.log('🚀 Starting EPK Performance Tests...\n');

  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // Test 1: Page Load Performance
    console.log('📊 Testing Page Load Performance...');
    const page = await browser.newPage();
    
    // Set up performance monitoring
    await page.coverage.startJSCoverage();
    await page.coverage.startCSSCoverage();
    
    const startTime = Date.now();
    const response = await page.goto(EPK_URL, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    const loadTime = Date.now() - startTime;

    console.log(`✅ Page loaded in ${loadTime}ms`);
    console.log(`✅ Response status: ${response.status()}`);

    // Test 2: JavaScript and CSS Coverage
    console.log('\n📦 Analyzing Bundle Size...');
    const jsCoverage = await page.coverage.stopJSCoverage();
    const cssCoverage = await page.coverage.stopCSSCoverage();

    let totalJSBytes = 0;
    let usedJSBytes = 0;
    let totalCSSBytes = 0;
    let usedCSSBytes = 0;

    for (const entry of jsCoverage) {
      totalJSBytes += entry.text.length;
      for (const range of entry.ranges) {
        usedJSBytes += range.end - range.start - 1;
      }
    }

    for (const entry of cssCoverage) {
      totalCSSBytes += entry.text.length;
      for (const range of entry.ranges) {
        usedCSSBytes += range.end - range.start - 1;
      }
    }

    console.log(`📄 JavaScript: ${Math.round(totalJSBytes / 1024)}KB total, ${Math.round(usedJSBytes / 1024)}KB used (${Math.round(usedJSBytes / totalJSBytes * 100)}%)`);
    console.log(`🎨 CSS: ${Math.round(totalCSSBytes / 1024)}KB total, ${Math.round(usedCSSBytes / 1024)}KB used (${Math.round(usedCSSBytes / totalCSSBytes * 100)}%)`);

    // Test 3: Image Optimization
    console.log('\n🖼️  Testing Image Performance...');
    const images = await page.$$eval('img', imgs => 
      imgs.map(img => ({
        src: img.src,
        loading: img.loading,
        width: img.naturalWidth,
        height: img.naturalHeight,
        displayWidth: img.offsetWidth,
        displayHeight: img.offsetHeight
      }))
    );

    images.forEach((img, index) => {
      const oversized = img.width > img.displayWidth * 2 || img.height > img.displayHeight * 2;
      console.log(`${oversized ? '⚠️' : '✅'} Image ${index + 1}: ${img.loading || 'eager'} loading${oversized ? ' (potentially oversized)' : ''}`);
    });

    // Test 4: Core Web Vitals Simulation
    console.log('\n⚡ Measuring Core Web Vitals...');
    
    const metricsScript = () => {
      return new Promise((resolve) => {
        const metrics = {};
        
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            metrics.lcp = entries[entries.length - 1].startTime;
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Contentful Paint
        const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
        if (fcpEntry) {
          metrics.fcp = fcpEntry.startTime;
        }

        // Time to First Byte
        const navEntry = performance.getEntriesByType('navigation')[0];
        if (navEntry) {
          metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
        }

        setTimeout(() => resolve(metrics), 3000);
      });
    };

    const metrics = await page.evaluate(metricsScript);
    
    console.log(`🎯 First Contentful Paint: ${Math.round(metrics.fcp || 0)}ms`);
    console.log(`🎯 Largest Contentful Paint: ${Math.round(metrics.lcp || 0)}ms`);
    console.log(`🌐 Time to First Byte: ${Math.round(metrics.ttfb || 0)}ms`);

    // Test 5: Mobile Performance
    console.log('\n📱 Testing Mobile Performance...');
    await page.emulate(puppeteer.devices['iPhone 12']);
    
    const mobileStartTime = Date.now();
    await page.reload({ waitUntil: 'networkidle0' });
    const mobileLoadTime = Date.now() - mobileStartTime;
    
    console.log(`📱 Mobile load time: ${mobileLoadTime}ms`);

    // Generate Report
    console.log('\n📋 Generating Performance Report...');
    const report = {
      timestamp: new Date().toISOString(),
      url: EPK_URL,
      metrics: {
        desktop_load_time: loadTime,
        mobile_load_time: mobileLoadTime,
        javascript_size_kb: Math.round(totalJSBytes / 1024),
        javascript_usage_percent: Math.round(usedJSBytes / totalJSBytes * 100),
        css_size_kb: Math.round(totalCSSBytes / 1024),
        css_usage_percent: Math.round(usedCSSBytes / totalCSSBytes * 100),
        total_images: images.length,
        core_web_vitals: metrics
      },
      recommendations: []
    };

    // Add recommendations based on metrics
    if (loadTime > 3000) {
      report.recommendations.push('Consider optimizing initial page load time');
    }
    if (usedJSBytes / totalJSBytes < 0.7) {
      report.recommendations.push('Consider code splitting to reduce unused JavaScript');
    }
    if (images.some(img => img.width > img.displayWidth * 2)) {
      report.recommendations.push('Optimize oversized images');
    }

    // Save report
    fs.writeFileSync('epk-performance-report.json', JSON.stringify(report, null, 2));
    console.log('✅ Performance report saved to epk-performance-report.json');

    // Performance Summary
    console.log('\n🎉 Performance Test Summary:');
    console.log(`🖥️  Desktop Load: ${loadTime}ms`);
    console.log(`📱 Mobile Load: ${mobileLoadTime}ms`);
    console.log(`📦 Bundle Efficiency: JS ${Math.round(usedJSBytes / totalJSBytes * 100)}%, CSS ${Math.round(usedCSSBytes / totalCSSBytes * 100)}%`);
    console.log(`🎯 Core Web Vitals: FCP ${Math.round(metrics.fcp || 0)}ms, LCP ${Math.round(metrics.lcp || 0)}ms`);

    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      report.recommendations.forEach(rec => console.log(`   • ${rec}`));
    } else {
      console.log('\n🏆 All performance metrics look good!');
    }

  } catch (error) {
    console.error('❌ Performance test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (require.main === module) {
  runPerformanceTests().catch(console.error);
}

module.exports = { runPerformanceTests };
