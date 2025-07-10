// src/components/Sections/EnhancedResourcesSection.jsx
import React, { useState, useEffect, forwardRef } from 'react';
import { ChevronDown, ChevronUp, Play, Loader2, AlertCircle, RefreshCw, Download } from 'lucide-react';
import YouTubeVideoCard from '../UI/YouTubeVideoCard.jsx';
import YouTubeVideoModal from '../UI/YouTubeVideoModal.jsx';
import YouTubeService from '../../services/youtubeApi.js';
import { learningResources } from '../../data/learningResources.js';
import { youtubeQueries } from '../../data/youtubeQueries.js';

const EnhancedResourcesSection = forwardRef(({ loadedSections = new Set([5]), onResourceOpen }, ref) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set(['Programming']));
  const [videoData, setVideoData] = useState({});
  const [loadingVideos, setLoadingVideos] = useState({});
  const [videoErrors, setVideoErrors] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load videos for a specific category
  const loadCategoryVideos = async (category) => {
    if (videoData[category] || loadingVideos[category]) return;

    setLoadingVideos(prev => ({ ...prev, [category]: true }));
    setVideoErrors(prev => ({ ...prev, [category]: null }));

    try {
      const queries = youtubeQueries[category] || [];
      const categoryVideos = [];

      // Load videos for each query in the category
      for (const queryData of queries.slice(0, 2)) { // Limit to 2 queries per category
        const videos = await YouTubeService.searchVideos(queryData.query, {
          maxResults: 3,
          order: 'relevance',
          videoDuration: 'medium',
          channelId: queryData.channelIds?.[0],
          publishedAfter: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString() // Last year
        });

        if (videos.length > 0) {
          // Get video details for duration and stats
          const videoIds = videos.map(v => v.id);
          const videoDetails = await YouTubeService.getVideoDetails(videoIds);
          
          // Merge video details
          const videosWithDetails = videos.map(video => {
            const details = videoDetails.find(d => d.id === video.id);
            return {
              ...video,
              duration: details ? YouTubeService.formatDuration(details.contentDetails.duration) : null,
              viewCount: details?.statistics?.viewCount,
              likeCount: details?.statistics?.likeCount
            };
          });

          categoryVideos.push({
            title: queryData.title,
            description: queryData.description,
            videos: videosWithDetails
          });
        }
      }

      setVideoData(prev => ({ ...prev, [category]: categoryVideos }));
    } catch (error) {
      console.error(`Error loading videos for ${category}:`, error);
      setVideoErrors(prev => ({ 
        ...prev, 
        [category]: 'Failed to load videos. Please try again.' 
      }));
    } finally {
      setLoadingVideos(prev => ({ ...prev, [category]: false }));
    }
  };

  // Toggle category expansion
  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
      // Load videos when category is expanded
      loadCategoryVideos(category);
    }
    setExpandedCategories(newExpanded);
  };

  // Handle video play
  const handleVideoPlay = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  // Retry loading videos
  const retryLoadVideos = (category) => {
    setVideoErrors(prev => ({ ...prev, [category]: null }));
    loadCategoryVideos(category);
  };

  // Load initial videos for Programming category
  useEffect(() => {
    if (loadedSections.has(5)) {
      loadCategoryVideos('Programming');
    }
  }, [loadedSections]);

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <section ref={ref} className="relative z-10 py-20 px-4" aria-labelledby="resources-title">
      {loadedSections.has(5) && (
        <div className="max-w-6xl mx-auto">
          <h2 id="resources-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Essential Learning Resources
          </h2>
          
          {/* Resource Library CTA */}
          <div className="text-center mb-16">
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Access our comprehensive library of downloadable resources, templates, and assets to accelerate your learning.
            </p>
            <button
              onClick={() => onResourceOpen && onResourceOpen()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <Download className="w-5 h-5" />
              Browse All Resources
            </button>
          </div>
          
          <div className="space-y-8">
            {learningResources.map((category, index) => {
              const isExpanded = expandedCategories.has(category.category);
              const videos = videoData[category.category] || [];
              const isLoading = loadingVideos[category.category];
              const error = videoErrors[category.category];

              return (
                <article 
                  key={index} 
                  className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.category)}
                    onKeyDown={(e) => handleKeyDown(e, () => toggleCategory(category.category))}
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                    aria-expanded={isExpanded}
                    aria-controls={`category-content-${index}`}
                  >
                    <h3 className="text-2xl font-bold text-purple-400">{category.category}</h3>
                    <div className="flex items-center gap-2">
                      {isLoading && <Loader2 className="w-5 h-5 animate-spin text-gray-400" />}
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Category Content */}
                  {isExpanded && (
                    <div 
                      id={`category-content-${index}`}
                      className="px-8 pb-8 space-y-8"
                    >
                      {/* Traditional Resources */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-white">Recommended Resources</h4>
                          <button
                            onClick={() => onResourceOpen && onResourceOpen()}
                            className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1"
                          >
                            <Download className="w-4 h-4" />
                            Download Resources
                          </button>
                        </div>
                        <ul className="grid md:grid-cols-2 gap-3" role="list">
                          {category.resources.map((resource, resourceIndex) => (
                            <li key={resourceIndex} className="flex items-start gap-3" role="listitem">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" aria-hidden="true"></div>
                              <span className="text-gray-300">{resource}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Video Tutorials Section */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Play className="w-5 h-5 text-red-500" />
                            Video Tutorials
                          </h4>
                          {error && (
                            <button
                              onClick={() => retryLoadVideos(category.category)}
                              className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                            >
                              <RefreshCw className="w-4 h-4" />
                              Retry
                            </button>
                          )}
                        </div>

                        {/* Loading State */}
                        {isLoading && (
                          <div className="flex items-center justify-center py-12">
                            <div className="flex items-center gap-3 text-gray-400">
                              <Loader2 className="w-6 h-6 animate-spin" />
                              <span>Loading video tutorials...</span>
                            </div>
                          </div>
                        )}

                        {/* Error State */}
                        {error && (
                          <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                              <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                              <p className="text-red-400 mb-4">{error}</p>
                              <button
                                onClick={() => retryLoadVideos(category.category)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-red-500/50"
                              >
                                Try Again
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Videos Grid */}
                        {!isLoading && !error && videos.length > 0 && (
                          <div className="space-y-6">
                            {videos.map((videoGroup, groupIndex) => (
                              <div key={groupIndex}>
                                <h5 className="text-md font-medium text-gray-300 mb-3">
                                  {videoGroup.title}
                                </h5>
                                <p className="text-sm text-gray-400 mb-4">
                                  {videoGroup.description}
                                </p>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {videoGroup.videos.map((video, videoIndex) => (
                                    <YouTubeVideoCard
                                      key={videoIndex}
                                      video={video}
                                      onPlay={handleVideoPlay}
                                      showStats={true}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* No Videos Found */}
                        {!isLoading && !error && videos.length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-gray-400">
                              Video tutorials will be loaded when available.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* API Key Notice */}
          <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-blue-300 font-semibold mb-2">YouTube Integration</h4>
                <p className="text-blue-200 text-sm leading-relaxed">
                  To enable video tutorials, add your YouTube Data API v3 key to the environment variables. 
                  Videos are automatically curated from trusted educational channels and updated regularly.
                  <br />
                  <strong>Set REACT_APP_YOUTUBE_API_KEY in your .env file.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      <YouTubeVideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </section>
  );
});

EnhancedResourcesSection.displayName = 'EnhancedResourcesSection';
export default EnhancedResourcesSection;