"use client";

import { Mail, ExternalLink, Copy, Check } from "lucide-react";
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
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Combine streaming and social media for simplified "Connect" section
  const allConnections = [
    ...streamingPlatforms.map(platform => ({ ...platform, type: 'streaming' })),
    ...socialMedia.map(social => ({ ...social, type: 'social' }))
  ];

  const cardClass = theme === 'fire' ? 'card-epk-fire' : 'card-epk';
  const accentColor = 'text-white' //theme === 'fire' ? 'text-gradient-fire' : 'text-epk-cyan';
  const linkHoverColor = theme === 'fire' ? 'hover:bg-red-500/20 hover:text-red-400' : 'hover:bg-epk-cyan/20 hover:text-epk-cyan';

  const copyToClipboard = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div
      id="contact"
      className={`w-full py-20 px-4 lg:px-12 ${className}`}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className={cardClass + " p-8"}>
          {/* Contact Header */}
          {/* <div className="mb-8">
            <h2 className={`text-2xl font-bold ${accentColor} flex items-center gap-3`}>
              <Mail className="w-6 h-6" />
              Contact
            </h2>
          </div> */}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Contact Information */}
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${accentColor} flex items-center gap-3`}>
                <Mail className="w-6 h-6" />
                Get In Touch
              </h3>
              <div className="space-y-6">
                {contactInfo.slice(0, 2).map((contact, index) => (
                  <div 
                    key={index} 
                    className="p-6 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-gray-700/30 hover:border-gray-600/50 hover:bg-gradient-to-br hover:from-black/50 hover:to-black/30 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    <h4 className={`text-xl font-bold mb-4 ${accentColor} tracking-wide`}>
                      {contact.title}
                    </h4>
                    <div className="space-y-3">
                      {contact.email && (
                        <div className="flex items-start">
                          <button
                            onClick={() => copyToClipboard(contact.email!)}
                            className="group flex items-center gap-3 text-gray-300 text-base hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none p-2 -m-2 rounded-lg"
                          >
                            <span className="group-hover:underline font-medium">{contact.email}</span>
                            {copiedEmail === contact.email ? (
                              <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                            ) : (
                              <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                            )}
                          </button>
                        </div>
                      )}
                      {contact.phone && (
                        <div className="flex items-center gap-3 text-gray-300 text-base p-2 -m-2">
                          <span className="font-medium">{contact.phone}</span>
                        </div>
                      )}
                      {contact.website && (
                        <div className="flex items-start">
                          <a
                            href={contact.website.startsWith('http') ? contact.website : `https://${contact.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 text-gray-300 text-base hover:text-white transition-colors duration-200 cursor-pointer p-2 -m-2 rounded-lg"
                          >
                            <span className="group-hover:underline font-medium">{contact.website}</span>
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Social Links */}
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${accentColor} flex items-center gap-3`}>
                <ExternalLink className="w-6 h-6" />
                Connect With Us
              </h3>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-gray-700/30 hover:border-gray-600/50 hover:bg-gradient-to-br hover:from-black/50 hover:to-black/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allConnections.map((connection, index) => (
                    <a
                      key={index}
                      href={connection.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-black/60 to-black/40 border border-gray-600/40 ${linkHoverColor} transition-all duration-300 text-gray-300 text-base font-semibold hover:scale-105 hover:shadow-lg hover:border-gray-400/60 cursor-pointer transform active:scale-95 min-h-[3.5rem]`}
                    >
                      <span className="group-hover:scale-110 transition-transform duration-200 text-center">
                        {connection.name}
                      </span>
                      <ExternalLink className="w-4 h-4 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
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