"use client";

import { Users2 } from "lucide-react";

interface CreditItem {
  title: string;
  content: string | string[];
}

interface CreditsSectionProps {
  credits: CreditItem[];
  className?: string;
}

export function CreditsSection({ credits, className = "" }: CreditsSectionProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-black/20 to-transparent px-4 lg:px-12 ${className}`}>
      <div className="w-full max-w-2xl">
        <div className="card-epk p-8">
          <h3 className="text-3xl font-bold mb-8 text-epk-cyan flex items-center gap-3">
            <Users2 className="w-8 h-8" />
            Credits
          </h3>
          <div className="space-y-6">
            {credits.map((credit, index) => (
              <div key={index} className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300">
                <h4 className="text-lg font-semibold mb-3 text-epk-cyan">
                  {credit.title}
                </h4>
                {Array.isArray(credit.content) ? (
                  credit.content.map((line, lineIndex) => (
                    <p key={lineIndex} className="text-gray-300">
                      {line}
                      {lineIndex < credit.content.length - 1 && <br />}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-300">{credit.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}