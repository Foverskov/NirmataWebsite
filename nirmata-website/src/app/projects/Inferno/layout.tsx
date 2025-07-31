import type { Metadata } from "next";
import { CriticalCSS } from "../../../components/CriticalCSS";
import { PerformanceMonitor } from "../../../components/PerformanceMonitor";
import { EPKAnalytics } from "../../../components/EPKAnalytics";
import { BrowserCompatibilityProvider } from "../../../components/BrowserCompatibility";

export const metadata: Metadata = {
  title: "Inferno - NIRMATA Electronic Press Kit",
  description:
    "A powerful exploration of unhealthy relationships and their impact on mental health. Inferno by NIRMATA - Electronic Press Kit with band information, release details, and streaming links.",
  keywords:
    "NIRMATA, Inferno, Electronic Press Kit, EPK, Danish rock, modern rock, Copenhagen, Last Mile Records, music press kit",
  authors: [{ name: "NIRMATA" }],
  creator: "NIRMATA",
  publisher: "Last Mile Records",
  openGraph: {
    title: "Inferno - NIRMATA Electronic Press Kit",
    description:
      "A powerful exploration of unhealthy relationships and their impact on mental health. Official EPK for Inferno by NIRMATA.",
    url: "https://nirmata.dk/projects/Inferno",
    siteName: "NIRMATA",
    images: [
      {
        url: "/Inferno FINAL.png",
        width: 1200,
        height: 1200,
        alt: "Inferno Album Artwork by NIRMATA",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inferno - NIRMATA Electronic Press Kit",
    description:
      "A powerful exploration of unhealthy relationships and their impact on mental health. Official EPK for Inferno by NIRMATA.",
    images: ["/INFERNO_COVER_NOW.png"],
    creator: "@nirmata_dk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // To be replaced with actual verification code
  },
  category: "music",
};

export default function FacelessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BrowserCompatibilityProvider>
      <CriticalCSS />
      <PerformanceMonitor />
      <EPKAnalytics />
      {children}
    </BrowserCompatibilityProvider>
  );
}
