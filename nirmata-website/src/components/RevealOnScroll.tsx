import { useRef, useState, useEffect, ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  showAtPercent?: number; // 0-100, defaults to intersection observer behavior
  triggerType?: "intersection" | "scrollPercent";
}

function RevealOnScroll({
  children,
  showAtPercent = 10,
  triggerType = "intersection",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (triggerType === "scrollPercent") {
      // Scroll percentage based trigger
      const handleScroll = () => {
        const scrollPercent =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100;
        if (scrollPercent >= showAtPercent) {
          setShow(true);
          // Optional: Remove listener once shown to improve performance
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);
      // Check initial scroll position
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // Original intersection observer behavior
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setShow(true),
        { threshold: showAtPercent / 100 }, // Convert percentage to decimal
      );
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }
  }, [showAtPercent, triggerType]);

  return (
    <div
      ref={ref}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
}

export default RevealOnScroll;
