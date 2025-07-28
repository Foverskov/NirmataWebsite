"use client";

import { Mail, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ContactInfo {
  title: string;
  email?: string;
  phone?: string;
  website?: string;
}

interface SocialLink {
  name: string;
  href: string;
}

interface ContactSectionProps {
  contactInfo: ContactInfo[];
  streamingPlatforms: SocialLink[];
  socialMedia: SocialLink[];
  className?: string;
  theme?: 'default' | 'fire';
}

export function ContactSection({ 
  contactInfo, 
  streamingPlatforms, 
  socialMedia, 
  className = "",
  theme = "default"
}: ContactSectionProps) {
  const [contactExpanded, setContactExpanded] = useState(true);
  const [connectExpanded, setConnectExpanded] = useState(true);

  // Combine streaming and social media for simplified "Connect" section
  const allConnections = [
    ...streamingPlatforms.map(platform => ({ ...platform, type: 'streaming' })),
    ...socialMedia.map(social => ({ ...social, type: 'social' }))
  ];

  const cardClass = theme === 'fire' ? 'card-epk-fire' : 'card-epk';
  const accentColor = theme === 'fire' ? 'text-gradient-fire' : 'text-epk-cyan';
  const hoverColor = theme === 'fire' ? 'hover:text-red-400' : 'hover:text-epk-gold';
  const linkHoverColor = theme === 'fire' ? 'hover:bg-red-500/20 hover:text-red-400' : 'hover:bg-epk-cyan/20 hover:text-epk-cyan';

  return (
    <div
      id="contact"
      className={`w-full py-20 ${className}`}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className={cardClass + " p-6"}>
          {/* Contact Information Section */}
          <div className="mb-8">
            <button
              onClick={() => setContactExpanded(!contactExpanded)}
              className={`w-full flex items-center justify-between text-2xl font-bold mb-4 ${accentColor} ${hoverColor} transition-colors duration-300 group`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6" />
                Contact
              </div>
              {contactExpanded ? (
                <ChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <ChevronDown className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
            
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                contactExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-4">
                {contactInfo.slice(0, 2).map((contact, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <h4 className={`text-lg font-semibold mb-2 ${accentColor}`}>
                      {contact.title}
                    </h4>
                    <div className="space-y-1">
                      {contact.email && (
                        <p className="text-gray-300 text-sm">
                          {contact.email}
                        </p>
                      )}
                      {contact.phone && (
                        <p className="text-gray-300 text-sm">
                          {contact.phone}
                        </p>
                      )}
                      {contact.website && (
                        <p className="text-gray-300 text-sm">
                          {contact.website}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connect Section */}
          <div>
            <button
              onClick={() => setConnectExpanded(!connectExpanded)}
              className={`w-full flex items-center justify-between text-2xl font-bold mb-4 ${accentColor} ${hoverColor} transition-colors duration-300 group`}
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-6 h-6" />
                Connect
              </div>
              {connectExpanded ? (
                <ChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <ChevronDown className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
            
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                connectExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300 transform hover:scale-[1.02]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {allConnections.map((connection, index) => (
                    <a
                      key={index}
                      href={connection.href}
                      className={`flex items-center justify-center p-3 rounded-lg bg-black/30 ${linkHoverColor} transition-all duration-300 text-gray-300 text-sm font-medium`}
                    >
                      {connection.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}