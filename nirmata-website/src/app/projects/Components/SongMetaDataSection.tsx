"use client";

import { Music, Users2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface CreditItem {
  title: string;
  content: string | string[];
}

interface ReleaseDetail {
  title: string;
  items: string[];
}

interface SongMetaDataSectionProps {
  embedUrl: string;
  credits: CreditItem[];
  releaseDetails: ReleaseDetail[];
  className?: string;
  compact?: boolean;
  maxHeight?: string;
}

export function SongMetaDataSection({ 
  embedUrl, 
  credits, 
  releaseDetails, 
  className = "",
  compact = false,
  maxHeight = "none"
}: SongMetaDataSectionProps) {
  const [creditsExpanded, setCreditsExpanded] = useState(true);
  const [releaseDetailsExpanded, setReleaseDetailsExpanded] = useState(true);
  const [playerLoaded, setPlayerLoaded] = useState(false);

  const spacingClass = compact ? "space-y-4" : "space-y-6";
  const sectionPadding = compact ? "p-3" : "p-4";

  return (
    <div 
      className={`w-full ${className}`}
      style={{ maxHeight: maxHeight !== "none" ? maxHeight : undefined }}
    >
      <div className="card-epk p-6">
        {/* Samply Player Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-epk-cyan flex items-center gap-3">
            <Music className="w-6 h-6" />
            Listen Now
          </h3>
          <div className="relative">
            {!playerLoaded && (
              <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-4 h-4 border-2 border-epk-cyan border-t-transparent rounded-full animate-spin"></div>
                  Loading player...
                </div>
              </div>
            )}
            <iframe
              src={embedUrl}
              onLoad={() => setPlayerLoaded(true)}
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
              className="transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Credits Section */}
        <div className="mb-8">
          <button
            onClick={() => setCreditsExpanded(!creditsExpanded)}
            className="w-full flex items-center justify-between text-2xl font-bold mb-4 text-epk-cyan hover:text-epk-gold transition-colors duration-300 group"
          >
            <div className="flex items-center gap-3">
              <Users2 className="w-6 h-6" />
              Credits
            </div>
            {creditsExpanded ? (
              <ChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            )}
          </button>
          
          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              creditsExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className={spacingClass}>
              {credits.map((credit, index) => (
                <div 
                  key={index} 
                  className={`${sectionPadding} rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300 transform hover:scale-[1.02]`}
                >
                  <h4 className="text-lg font-semibold mb-2 text-epk-cyan">
                    {credit.title}
                  </h4>
                  {Array.isArray(credit.content) ? (
                    credit.content.map((line, lineIndex) => (
                      <p key={lineIndex} className="text-gray-300 text-sm leading-relaxed">
                        {line}
                        {lineIndex < credit.content.length - 1 && <br />}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-300 text-sm leading-relaxed">{credit.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Release Details Section */}
        <div>
          <button
            onClick={() => setReleaseDetailsExpanded(!releaseDetailsExpanded)}
            className="w-full flex items-center justify-between text-2xl font-bold mb-4 text-epk-cyan hover:text-epk-gold transition-colors duration-300 group"
          >
            <div className="flex items-center gap-3">
              <Music className="w-6 h-6" />
              Release Details
            </div>
            {releaseDetailsExpanded ? (
              <ChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            )}
          </button>
          
          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              releaseDetailsExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className={spacingClass}>
              {releaseDetails.map((detail, index) => (
                <div 
                  key={index} 
                  className={`${sectionPadding} rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300 transform hover:scale-[1.02]`}
                >
                  <h4 className="text-lg font-semibold mb-2 text-epk-cyan">
                    {detail.title}
                  </h4>
                  {detail.items.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-gray-300 text-sm leading-relaxed">
                      {item}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Optional: Quick Stats Summary */}
        {compact && (
          <div className="mt-6 pt-4 border-t border-epk-cyan/20">
            <div className="flex justify-between text-xs text-gray-400">
              <span>{credits.length} Credit{credits.length !== 1 ? 's' : ''}</span>
              <span>{releaseDetails.length} Detail{releaseDetails.length !== 1 ? 's' : ''}</span>
              <span className={`${playerLoaded ? 'text-green-400' : 'text-yellow-400'}`}>
                {playerLoaded ? 'Player Ready' : 'Loading...'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
