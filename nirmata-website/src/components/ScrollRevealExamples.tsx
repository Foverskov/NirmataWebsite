import React from "react";
import RevealOnScroll from "./RevealOnScroll";
import RevealOnScrollPercent from "./RevealOnScrollPercent";

// Example usage of both components
function ScrollRevealExamples() {
  return (
    <div className="space-y-20 py-20">
      {/* Original intersection observer approach */}
      <RevealOnScroll triggerType="intersection" showAtPercent={30}>
        <div className="bg-blue-500/20 p-8 rounded-lg border border-blue-500/30">
          <h3 className="text-2xl font-bold mb-4">Intersection Observer</h3>
          <p>This appears when 30% of the element is visible in viewport</p>
        </div>
      </RevealOnScroll>

      {/* Scroll percentage approach - shows at 25% page scroll */}
      <RevealOnScrollPercent showAtPercent={25}>
        <div className="bg-purple-500/20 p-8 rounded-lg border border-purple-500/30">
          <h3 className="text-2xl font-bold mb-4">25% Page Scrolled</h3>
          <p>This appears when you've scrolled 25% of the total page</p>
        </div>
      </RevealOnScrollPercent>

      {/* Scroll percentage - shows at 50% and hides when scrolling back */}
      <RevealOnScrollPercent
        showAtPercent={50}
        hideOnScrollBack={true}
        once={false}
      >
        <div className="bg-green-500/20 p-8 rounded-lg border border-green-500/30">
          <h3 className="text-2xl font-bold mb-4">
            50% Page Scrolled (Reversible)
          </h3>
          <p>This shows at 50% scroll and hides when you scroll back up</p>
        </div>
      </RevealOnScrollPercent>

      {/* Scroll percentage - shows at 75% */}
      <RevealOnScrollPercent showAtPercent={75}>
        <div className="bg-red-500/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-2xl font-bold mb-4">75% Page Scrolled</h3>
          <p>This appears when you've scrolled 75% of the total page</p>
        </div>
      </RevealOnScrollPercent>

      {/* Using the unified component with scroll percentage */}
      <RevealOnScroll triggerType="scrollPercent" showAtPercent={90}>
        <div className="bg-yellow-500/20 p-8 rounded-lg border border-yellow-500/30">
          <h3 className="text-2xl font-bold mb-4">
            90% Page Scrolled (Unified Component)
          </h3>
          <p>
            This uses the unified RevealOnScroll component with scroll
            percentage trigger
          </p>
        </div>
      </RevealOnScroll>

      {/* Add some content to make the page scrollable */}
      <div className="space-y-8">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="bg-gray-800/50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">
              Content Block {i + 1}
            </h4>
            <p className="text-gray-400">
              This is some content to make the page longer so you can test the
              scroll percentage triggers. Keep scrolling to see the different
              reveal animations in action!
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrollRevealExamples;
