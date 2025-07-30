"use client";

import { Instagram, Music } from "lucide-react";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface FloatingSocialLinksProps {
  instagramUrl?: string;
  spotifyUrl?: string;
  theme?: 'default' | 'fire';
  className?: string;
}

export function FloatingSocialLinks({ 
  instagramUrl = "#", 
  spotifyUrl = "#",
  theme = "default",
  className = ""
}: FloatingSocialLinksProps) {
  const socialLinks: SocialLink[] = [
    {
      name: "Instagram",
      href: instagramUrl,
      icon: <Instagram className="w-5 h-5" />
    },
    {
      name: "Spotify",
      href: spotifyUrl,
      icon: <Music className="w-5 h-5" />
    }
  ];

  const baseClasses = "fixed top-6 right-6 z-50 flex flex-col gap-3";
  const themeClasses = theme === 'fire' 
    ? "text-white" 
    : "text-white";

  return (
    <div className={`${baseClasses} ${themeClasses} ${className}`}>
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group relative flex items-center justify-center
            w-12 h-12 rounded-full backdrop-blur-md
            ${theme === 'fire' 
              ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 hover:from-red-500/30 hover:to-orange-500/30 hover:border-red-400/50' 
              : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-cyan-400/50'
            }
            transition-all duration-300 ease-out
            hover:scale-110 hover:shadow-lg
            ${theme === 'fire' 
              ? 'hover:shadow-red-500/25' 
              : 'hover:shadow-blue-500/25'
            }
          `}
          aria-label={`Visit ${link.name}`}
        >
          <span className={`
            transition-all duration-300
            ${theme === 'fire' 
              ? 'group-hover:text-red-300' 
              : 'group-hover:text-cyan-300'
            }
          `}>
            {link.icon}
          </span>
          
          {/* Tooltip */}
          <span className={`
            absolute right-14 top-1/2 -translate-y-1/2
            px-3 py-1 rounded-lg text-sm font-medium
            ${theme === 'fire' 
              ? 'bg-red-900/90 border border-red-500/30' 
              : 'bg-blue-900/90 border border-blue-500/30'
            }
            backdrop-blur-sm opacity-0 scale-95
            group-hover:opacity-100 group-hover:scale-100
            transition-all duration-300 ease-out
            pointer-events-none whitespace-nowrap
          `}>
            {link.name}
            <span className={`
              absolute left-full top-1/2 -translate-y-1/2
              border-4 border-transparent
              ${theme === 'fire' 
                ? 'border-l-red-900/90' 
                : 'border-l-blue-900/90'
              }
            `} />
          </span>
        </a>
      ))}
    </div>
  );
}
