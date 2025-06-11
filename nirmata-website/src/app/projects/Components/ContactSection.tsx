"use client";

import { Music, Users } from "lucide-react";

interface ContactInfo {
  title: string;
  icon: string;
  email?: string;
  phone?: string;
  website?: string;
}

interface SocialLink {
  name: string;
  icon: string;
  bgColor: string;
  hoverColor: string;
  href: string;
}

interface ContactSectionProps {
  contactInfo: ContactInfo[];
  streamingPlatforms: SocialLink[];
  socialMedia: SocialLink[];
  className?: string;
}

export function ContactSection({ 
  contactInfo, 
  streamingPlatforms, 
  socialMedia, 
  className = "" 
}: ContactSectionProps) {
  return (
    <div
      id="contact"
      className={`relative bg-gradient-to-b from-black/20 to-black py-20 backdrop-blur-sm overflow-hidden ${className}`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-epk-cyan rounded-full blur-3xl animate-glow"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-epk-gold rounded-full blur-3xl animate-glow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-nirmata-primary rounded-full blur-3xl animate-glow animation-delay-500"></div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="card-nirmata p-8 border-nirmata-primary/40 hover:border-nirmata-primary/60">
          <h3 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gradient-epk tracking-wider">
            CONTACT & CONNECT
          </h3>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h4 className="text-2xl font-bold text-epk-cyan mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-epk-cyan to-nirmata-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">📧</span>
                </div>
                Contact Information
              </h4>

              {contactInfo.map((contact, index) => (
                <div key={index} className="group p-6 rounded-2xl bg-gradient-to-br from-black/50 to-black/30 hover:from-epk-cyan/20 hover:to-nirmata-primary/20 transition-all duration-500 border border-epk-cyan/30 hover:border-epk-cyan/50 hover:shadow-xl hover:shadow-epk-cyan/20 transform hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-epk-cyan to-nirmata-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">{contact.icon}</span>
                    </div>
                    <h5 className="text-xl font-bold text-white group-hover:text-epk-cyan transition-colors duration-300">
                      {contact.title}
                    </h5>
                  </div>
                  <div className="space-y-2 pl-16">
                    {contact.email && (
                      <p className="text-gray-300 hover:text-epk-cyan transition-colors duration-300 flex items-center gap-2">
                        <span className="text-epk-cyan">✉️</span> {contact.email}
                      </p>
                    )}
                    {contact.phone && (
                      <p className="text-gray-300 hover:text-epk-cyan transition-colors duration-300 flex items-center gap-2">
                        <span className="text-epk-cyan">📱</span> {contact.phone}
                      </p>
                    )}
                    {contact.website && (
                      <p className="text-gray-300 hover:text-nirmata-primary transition-colors duration-300 flex items-center gap-2">
                        <span className="text-nirmata-primary">🌐</span> {contact.website}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media & Streaming */}
            <div className="space-y-8">
              <h4 className="text-2xl font-bold text-epk-cyan mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-epk-gold to-epk-cyan rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🌐</span>
                </div>
                Follow & Stream
              </h4>

              {/* Streaming Platforms */}
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-black/50 to-black/30 hover:from-green-900/20 hover:to-emerald-900/20 transition-all duration-500 border border-epk-cyan/30 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/20 transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">🎵</span>
                  </div>
                  <h5 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">
                    Streaming Platforms
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-4 pl-4">
                  {streamingPlatforms.map((platform, index) => (
                    <a
                      key={index}
                      href={platform.href}
                      className={`group/link flex items-center gap-3 p-3 rounded-xl bg-black/30 hover:${platform.hoverColor} transition-all duration-300 transform hover:scale-105`}
                    >
                      <div className={`w-8 h-8 ${platform.bgColor} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-sm">{platform.icon}</span>
                      </div>
                      <span className="text-gray-300 group-hover/link:text-green-300 font-medium">
                        {platform.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-black/50 to-black/30 hover:from-blue-900/20 hover:to-indigo-900/20 transition-all duration-500 border border-epk-cyan/30 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">📱</span>
                  </div>
                  <h5 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                    Social Media
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-4 pl-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`group/link flex items-center gap-3 p-3 rounded-xl bg-black/30 hover:${social.hoverColor} transition-all duration-300 transform hover:scale-105`}
                    >
                      <div className={`w-8 h-8 ${social.bgColor} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-sm">{social.icon}</span>
                      </div>
                      <span className="text-gray-300 group-hover/link:text-blue-300 font-medium">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-epk-cyan/30 via-nirmata-primary/30 to-epk-cyan/30 border border-epk-cyan/30">
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Stay connected for the latest updates on
              <span className="text-gradient-epk font-bold"> FACELESS </span>
              and upcoming releases!
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-20 h-1 bg-gradient-to-r from-epk-cyan to-epk-gold rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}