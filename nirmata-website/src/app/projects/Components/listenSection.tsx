"use client";

interface ListenSectionProps {
  embedUrl: string;
  className?: string;
}

export function ListenSection({ embedUrl, className = "" }: ListenSectionProps) {
  return (
    <div
      id="listen"
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-transparent to-black/20 px-4 lg:px-12 ${className}`}
    >
      <div className="w-full max-w-2xl">
        <h3 className="text-3xl font-bold mb-8 text-left text-epk-cyan">
          Listen Now
        </h3>
        <iframe
          src={embedUrl}
          style={{
            width: "100%",
            height: "200px",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        />
      </div>
    </div>
  );
}