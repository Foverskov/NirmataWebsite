"use client";

import { Mail, ExternalLink } from "lucide-react";

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
  // Combine streaming and social media for simplified "Connect" section
  const allConnections = [
    ...streamingPlatforms.map(platform => ({ ...platform, type: 'streaming' })),
    ...socialMedia.map(social => ({ ...social, type: 'social' }))
  ];

  const cardClass = theme === 'fire' ? 'card-epk-fire' : 'card-epk';
  const accentColor = 'text-white' //theme === 'fire' ? 'text-gradient-fire' : 'text-epk-cyan';
  const linkHoverColor = theme === 'fire' ? 'hover:bg-red-500/20 hover:text-red-400' : 'hover:bg-epk-cyan/20 hover:text-epk-cyan';

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
              <h3 className={`text-xl font-semibold mb-4 ${accentColor}`}>
                Get In Touch
              </h3>
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

            {/* Right Column - Social Links */}
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${accentColor} flex items-center gap-2`}>
                {/* <ExternalLink className="w-5 h-5" /> */}
                Connect With Us
              </h3>
              <div className="p-6 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300">
                <div className="grid grid-cols-2 gap-3">
                  {allConnections.map((connection, index) => (
                    <a
                      key={index}
                      href={connection.href}
                      className={`flex items-center justify-center p-3 rounded-lg bg-black/30 ${linkHoverColor} transition-all duration-300 text-gray-300 text-sm font-medium hover:scale-105`}
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