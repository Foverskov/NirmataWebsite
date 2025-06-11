"use client";

import { Music } from "lucide-react";

interface ReleaseDetail {
  title: string;
  items: string[];
}

interface ReleaseDetailsSectionProps {
  releaseDetails: ReleaseDetail[];
  className?: string;
}

export function ReleaseDetailsSection({ releaseDetails, className = "" }: ReleaseDetailsSectionProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-transparent to-black/20 px-4 lg:px-12 ${className}`}>
      <div className="w-full max-w-2xl">
        <div className="card-epk p-8">
          <h3 className="text-3xl font-bold mb-8 text-epk-cyan flex items-center gap-3">
            <Music className="w-8 h-8" />
            Release Details
          </h3>
          <div className="space-y-6">
            {releaseDetails.map((detail, index) => (
              <div key={index} className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300">
                <h4 className="text-lg font-semibold mb-3 text-epk-cyan">
                  {detail.title}
                </h4>
                {detail.items.map((item, itemIndex) => (
                  <p key={itemIndex} className="text-gray-300">{item}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}