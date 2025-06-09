"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

interface EPKAnalyticsEvent {
  action: string;
  section?: string;
  value?: number;
  custom_parameters?: Record<string, string | number | boolean>;
}

export function EPKAnalytics() {
  useEffect(() => {
    // Initialize analytics only in production
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "Analytics initialized in development mode (tracking disabled)",
      );
      return;
    }

    // Load Google Analytics (when ready for production)
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (GA_MEASUREMENT_ID) {
      // Load GA script
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_title: "FACELESS EPK",
        page_location: window.location.href,
        custom_map: {
          custom_parameter_1: "epk_section",
          custom_parameter_2: "user_interaction",
        },
      });
    }

    // Track EPK-specific events
    const trackEPKEvent = (event: EPKAnalyticsEvent) => {
      if (window.gtag) {
        window.gtag("event", event.action, {
          event_category: "EPK_Interaction",
          event_label: event.section,
          value: event.value,
          ...event.custom_parameters,
        });
      } else {
        // Fallback for development or when GA is not loaded
        console.log("EPK Analytics Event:", event);
      }
    };

    // Track page view
    trackEPKEvent({
      action: "page_view",
      section: "hero",
      custom_parameters: {
        epk_version: "1.0",
        load_time: performance.now(),
      },
    });

    // Track scroll events
    const scrollThresholds = [25, 50, 75, 100];
    const trackedThresholds = new Set<number>();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100,
      );

      scrollThresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          trackEPKEvent({
            action: "scroll",
            section: `${threshold}_percent`,
            value: threshold,
          });
        }
      });
    };

    // Track section visibility
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "-10% 0px -10% 0px",
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          trackEPKEvent({
            action: "section_view",
            section: sectionId,
            custom_parameters: {
              visibility_ratio: entry.intersectionRatio,
            },
          });
        }
      });
    }, observerOptions);

    // Observe EPK sections
    const sections = document.querySelectorAll(
      '[id^="listen"], [id^="about"], [id^="contact"]',
    );
    sections.forEach((section) => sectionObserver.observe(section));

    // Track music player interactions
    const trackMusicInteraction = (action: string) => {
      trackEPKEvent({
        action: "music_interaction",
        section: "listen_now",
        custom_parameters: {
          interaction_type: action,
          timestamp: new Date().toISOString(),
        },
      });
    };

    // Listen for iframe interactions (music player)
    const musicIframe = document.querySelector('iframe[src*="samply.app"]');
    if (musicIframe) {
      musicIframe.addEventListener("load", () => {
        trackMusicInteraction("player_loaded");
      });
    }

    // Track external link clicks
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href && link.hostname !== window.location.hostname) {
        trackEPKEvent({
          action: "external_link_click",
          section: "contact",
          custom_parameters: {
            link_url: link.href,
            link_text: link.textContent || "unknown",
          },
        });
      }
    };

    // Track download/streaming button clicks
    const handleStreamingClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest("button, a");

      if (button && button.textContent?.toLowerCase().includes("listen")) {
        trackEPKEvent({
          action: "streaming_click",
          section: "listen_now",
          custom_parameters: {
            platform: button.textContent || "unknown",
          },
        });
      }
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleLinkClick);
    document.addEventListener("click", handleStreamingClick);

    // Track time spent on page
    const startTime = Date.now();
    const trackTimeSpent = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackEPKEvent({
        action: "time_on_page",
        section: "overall",
        value: timeSpent,
        custom_parameters: {
          time_spent_seconds: timeSpent,
        },
      });
    };

    // Track when user leaves page
    window.addEventListener("beforeunload", trackTimeSpent);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleLinkClick);
      document.removeEventListener("click", handleStreamingClick);
      window.removeEventListener("beforeunload", trackTimeSpent);
      sectionObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}

// Hook for manual event tracking
export function useEPKAnalytics() {
  const track = (event: EPKAnalyticsEvent) => {
    if (window.gtag) {
      window.gtag("event", event.action, {
        event_category: "EPK_Interaction",
        event_label: event.section,
        value: event.value,
        ...event.custom_parameters,
      });
    } else {
      console.log("EPK Analytics Event:", event);
    }
  };

  return { track };
}
