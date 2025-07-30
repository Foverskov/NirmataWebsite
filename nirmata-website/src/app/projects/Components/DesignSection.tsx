"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Palette, Camera } from "lucide-react";

interface ColorPalette {
  name: string;
  hex: string;
  description?: string;
}

interface DesignAsset {
  src: string;
  alt: string;
  title: string;
  description?: string;
}

interface DesignSectionProps {
  colorPalette?: ColorPalette[];
  designAssets?: DesignAsset[];
  theme?: 'default' | 'fire';
  className?: string;
}

export function DesignSection({ 
  colorPalette,
  designAssets,
  theme = "default",
  className = ""
}: DesignSectionProps) {
  const [colorPaletteExpanded, setColorPaletteExpanded] = useState(true);
  const [designAssetsExpanded, setDesignAssetsExpanded] = useState(true);

  // Theme styling
  const cardClass = theme === 'fire' ? 'card-epk-fire' : 'card-epk';
  const accentColor = 'text-white'//theme === 'fire' ? 'text-gradient-fire' : 'text-epk-cyan';
  const hoverColor = theme === 'fire' ? 'hover:text-red-400' : 'hover:text-epk-gold';

  // Default fire theme color palette if none provided
  const defaultFirePalette: ColorPalette[] = [
    { name: "Fire Red", hex: "#DC2626", description: "Primary brand color" },
    { name: "Deep Red", hex: "#991B1B", description: "Secondary accent" },
    { name: "Fire Orange", hex: "#FF4500", description: "Highlight color" },
    { name: "Fire Yellow", hex: "#FBBF24", description: "Warm accent" },
    { name: "Black", hex: "#000000", description: "Background" },
    { name: "Dark Gray", hex: "#1A1A1A", description: "Secondary background" }
  ];

  const colors = colorPalette || (theme === 'fire' ? defaultFirePalette : []);

  return (
    <div 
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-black/20 to-transparent px-4 lg:px-12 ${className}`}
    >
      <div className="w-full max-w-6xl">
        <div className={`${cardClass} p-8`}>
          <h2 className={`text-3xl font-bold mb-8 ${accentColor}`}>
            Design Assets
          </h2>

        {/* Color Palette Section */}
        {colors.length > 0 && (
          <div className="mb-8">
            <button
              onClick={() => setColorPaletteExpanded(!colorPaletteExpanded)}
              className={`w-full flex items-center justify-between text-2xl font-bold mb-4 ${accentColor} ${hoverColor} transition-colors duration-300 group`}
            >
              <div className="flex items-center gap-3">
                <Palette className="w-6 h-6 text-current opacity-100" />
                Color Palette
              </div>
              {colorPaletteExpanded ? (
                <ChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-current opacity-100" />
              ) : (
                <ChevronDown className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-current opacity-100" />
              )}
            </button>
            
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                colorPaletteExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 rounded-xl bg-black/30">
                {colors.map((color, index) => (
                  <div 
                    key={index}
                    className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: color.hex }}
                  >
                    {/* Color name overlay on hover */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-2">
                      <span className="text-white text-xs font-medium text-center mb-1">
                        {color.name}
                      </span>
                      {color.description && (
                        <span className="text-gray-300 text-xs text-center">
                          {color.description}
                        </span>
                      )}
                    </div>
                    
                    {/* Hex code in bottom right */}
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded text-right">
                      {color.hex}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Design Assets Section */}
        {designAssets && designAssets.length > 0 && (
          <div>
            <button
              onClick={() => setDesignAssetsExpanded(!designAssetsExpanded)}
              className={`w-full flex items-center justify-between text-2xl font-bold mb-4 ${accentColor} ${hoverColor} transition-colors duration-300 group`}
            >
              <div className="flex items-center gap-3">
                <Camera className="w-6 h-6 text-current opacity-100" />
                Press Photos & Assets
              </div>
              {designAssetsExpanded ? (
                <ChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-current opacity-100" />
              ) : (
                <ChevronDown className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-current opacity-100" />
              )}
            </button>
            
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                designAssetsExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 rounded-xl bg-black/30">
                {designAssets.map((asset, index) => (
                  <div 
                    key={index}
                    className="group relative bg-black/50 rounded-lg overflow-hidden hover:bg-black/70 transition-all duration-300"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={asset.src}
                        alt={asset.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className={`font-semibold mb-2 ${accentColor}`}>
                        {asset.title}
                      </h4>
                      {asset.description && (
                        <p className="text-gray-300 text-sm">
                          {asset.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Info text if no assets provided */}
        {(!designAssets || designAssets.length === 0) && colors.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <Palette className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Design assets will be displayed here</p>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
