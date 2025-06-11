"use client";

interface BandMemberCardProps {
  name: string;
  instrument: string;
  isLast?: boolean;
  isMobile?: boolean;
}

export function BandMemberCard({ name, instrument, isLast = false, isMobile = false }: BandMemberCardProps) {
  const heightClass = isMobile ? "h-64" : "h-80";
  const widthClass = isMobile ? "w-20" : "w-24";
  const textSizeClass = isMobile ? "text-xs" : "text-sm";
  const nameSizeClass = isMobile ? "text-sm" : "text-lg";
  const bottomClass = isMobile ? "bottom-4" : "bottom-6";
  const marginClass = isMobile ? "mb-3" : "mb-4";

  return (
    <div className={`relative flex flex-col items-center justify-end ${heightClass} ${widthClass} bg-gradient-to-t from-black/60 to-transparent ${!isLast ? 'border-r border-epk-cyan/20' : ''} hover:from-epk-cyan/20 transition-all duration-500 group`}>
      <div className={`absolute ${bottomClass} flex flex-col items-center`}>
        <div className={`writing-mode-vertical text-gray-300 font-light ${textSizeClass} tracking-widest ${marginClass} group-hover:text-epk-cyan transition-colors duration-300`}>
          <span
            className="rotate-180"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            {instrument}
          </span>
        </div>
        <div className={`writing-mode-vertical text-white font-semibold ${nameSizeClass} tracking-wider group-hover:text-epk-cyan transition-colors duration-300`}>
          <span
            className="rotate-180"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            {name}
          </span>
        </div>
      </div>
    </div>
  );
}