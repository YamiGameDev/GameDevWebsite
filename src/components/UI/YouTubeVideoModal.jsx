// src/components/UI/YouTubeVideoModal.jsx
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const YouTubeVideoModal = ({ video, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      // Trap focus within modal
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
        
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements?.length) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-black rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 id="video-modal-title" className="text-lg font-semibold text-white line-clamp-1">
            {video.title}
          </h3>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-white/50"
            aria-label="Close video modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="aspect-video">
          <iframe
            src={`${video.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Info */}
        <div className="p-4">
          <p className="text-gray-300 text-sm mb-2">by {video.channelTitle}</p>
          <p className="text-gray-400 text-sm line-clamp-3">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideoModal;