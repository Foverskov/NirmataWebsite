"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  theme?: 'default' | 'fire';
  className?: string;
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  theme = "default",
  className = ""
}: ModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  // Theme-based styling
  const cardClass = theme === 'fire' ? 'card-epk-fire' : 'card-epk';
  const accentColor = theme === 'fire' ? 'text-gradient-fire' : 'text-epk-cyan';
  const hoverColor = theme === 'fire' ? 'hover:text-red-400' : 'hover:text-epk-gold';
  const backdropClass = theme === 'fire' 
    ? 'bg-black/80 backdrop-blur-sm' 
    : 'bg-black/70 backdrop-blur-sm';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 ${backdropClass} animate-modal-fade`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div 
        className={`
          relative w-full max-w-6xl max-h-[90vh] overflow-hidden
          animate-modal-in
          ${className}
        `}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <div className={`${cardClass} p-0 overflow-hidden`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <h2 
              id="modal-title"
              className={`text-2xl font-bold ${accentColor}`}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className={`
                p-2 rounded-lg transition-colors duration-300 
                text-gray-400 ${hoverColor}
                hover:bg-white/10
              `}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
