// src/hooks/useYouTubeApi.js
import { useState, useCallback } from 'react';
import YouTubeService from '@services/youtubeApi';

const useYouTubeApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchVideos = useCallback(async (query, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const videos = await YouTubeService.searchVideos(query, options);
      return videos;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getVideoDetails = useCallback(async (videoIds) => {
    setLoading(true);
    setError(null);
    
    try {
      const details = await YouTubeService.getVideoDetails(videoIds);
      return details;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    searchVideos,
    getVideoDetails,
    loading,
    error,
    clearError: () => setError(null)
  };
};

export default useYouTubeApi;