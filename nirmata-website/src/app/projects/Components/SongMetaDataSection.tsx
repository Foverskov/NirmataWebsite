"use client";

import { ExternalLink } from "lucide-react";
import { memo, useState } from "react";
import { Modal } from "./Modal";
import AudioPlayer from "./wavPlayer";

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
  style?: React.CSSProperties;
  theme?: 'default' | 'fire';
}

const SongMetaDataSectionComponent = ({ 
  credits, 
  releaseDetails, 
  className = "",
  compact = false,
  maxHeight = "none",
  style = {},
  theme = "default"
}: SongMetaDataSectionProps) => {
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);
  const [releaseDetailsModalOpen, setReleaseDetailsModalOpen] = useState(false);
  const [playerLoaded, setPlayerLoaded] = useState(false);

  const cardClass = theme === 'fire' ? 'card-epk-fire' : 'card-epk';
  const accentColor = theme === 'fire' ? 'text-gradient-fire' : 'text-epk-cyan';
  const hoverColor = theme === 'fire' ? 'hover:text-red-400' : 'hover:text-epk-gold';
  const spinnerColor = theme === 'fire' ? 'border-red-400' : 'border-epk-cyan';

  return (
    <>
      <div 
        className={`w-full ${className}`}
        style={{ 
          maxHeight: maxHeight !== "none" ? maxHeight : undefined,
          ...style 
        }}
      >
        <div className={cardClass + " p-6 mb-10 "}>
          {/* Samply Player Section */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold mb-6 text-white">
              Listen Now
            </h3>
            <div className="relative">
              {!playerLoaded && (
                <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className={`w-4 h-4 border-2 ${spinnerColor} border-t-transparent rounded-full animate-spin`}></div>
                    Loading player...
                  </div>
                </div>
              )}
              <AudioPlayer 
                src="/audio/Inferno.mp3"
                title="Inferno - NIRMATA"
                preload="auto"
                className="epk-audio-player"
                enableStreaming={true}
                bufferSize={512 * 1024} // 512KB buffer for faster initial load
                onError={(error) => {
                  console.error('Audio error:', error);
                  setPlayerLoaded(true); // Hide loading spinner on error
                }}
                onLoadComplete={() => {
                  console.log('Audio loaded');
                  setPlayerLoaded(true);
                }}
                onLoadStart={() => setPlayerLoaded(false)}
              />
              {/* <iframe
                src={embedUrl}
                onLoad={() => setPlayerLoaded(true)}
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
                className="transition-opacity duration-300"
              /> */}
            </div>
          </div>

          {/* Credits Section */}
          <div className="mb-8">
            <button
              onClick={() => setCreditsModalOpen(true)}
              className={`w-full flex items-center justify-between text-2xl font-bold mb-4 text-white ${hoverColor} transition-colors duration-300 group`}
            >
              <div className="flex items-center gap-3">
                Credits
              </div>
              <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-current opacity-100" />
            </button>
          </div>

          {/* Release Details Section */}
          <div>
            <button
              onClick={() => setReleaseDetailsModalOpen(true)}
              className={`w-full flex items-center justify-between text-2xl font-bold mb-4 text-white ${hoverColor} transition-colors duration-300 group`}
            >
              <div className="flex items-center gap-3">
                Release Details
              </div>
              <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-current opacity-100" />
            </button>
          </div>

          {/* Optional: Quick Stats Summary*/}
          {compact && (
            <div className="mt-6 pt-4 border-t border-epk-cyan/20">
              {/* Stats content can go here */}
            </div>
          )} 
        </div>
      </div>

      {/* Credits Modal */}
      <Modal
        isOpen={creditsModalOpen}
        onClose={() => setCreditsModalOpen(false)}
        title="Credits"
        theme={theme}
      >
        <div className="space-y-6">
          {credits.map((credit, index) => (
            <div 
              key={index} 
              className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300"
            >
              <h4 className={`text-lg font-semibold mb-2 ${accentColor}`}>
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
      </Modal>

      {/* Release Details Modal */}
      <Modal
        isOpen={releaseDetailsModalOpen}
        onClose={() => setReleaseDetailsModalOpen(false)}
        title="Release Details"
        theme={theme}
      >
        <div className="space-y-6">
          {releaseDetails.map((detail, index) => (
            <div 
              key={index} 
              className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300"
            >
              <h4 className={`text-lg font-semibold mb-2 ${accentColor}`}>
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
      </Modal>
    </>
  );
};

export const SongMetaDataSection = memo(SongMetaDataSectionComponent);
