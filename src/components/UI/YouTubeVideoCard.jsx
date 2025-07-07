// src/components/UI/YouTubeVideoCard.jsx
import React, { useState } from 'react';
import { Play, Clock, Eye, ExternalLink } from 'lucide-react';

const YouTubeVideoCard = ({ video, onPlay, showStats = true }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatViews = (views) => {
    if (!views) return '';
    const num = parseInt(views);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M views`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K views`;
    }
    return `${num} views`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPlay(video);
    }
  };

  return (
    <article className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group focus-within:ring-4 focus-within:ring-purple-500/50 overflow-hidden">
      {/* Video Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {!imageError ? (
          <img
            src={video.thumbnail}
            alt={`Thumbnail for ${video.title}`}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <Play className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => onPlay(video)}
            onKeyDown={handleKeyDown}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-500/50"
            aria-label={`Play video: ${video.title}`}
          >
            <Play className="w-6 h-6 fill-current" />
          </button>
        </div>

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {video.duration}
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h4 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {video.title}
        </h4>
        
        <p className="text-sm text-gray-400 mb-2">{video.channelTitle}</p>
        
        {showStats && (
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            {video.viewCount && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatViews(video.viewCount)}
              </div>
            )}
            <span>{formatDate(video.publishedAt)}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onPlay(video)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-500/50"
          >
            Watch Tutorial
          </button>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white/50"
            aria-label="Open video in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default YouTubeVideoCard;