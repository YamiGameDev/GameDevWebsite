// src/services/youtubeApi.js
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || 'YOUR_API_KEY_HERE';
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

class YouTubeService {
  async searchVideos(query, options = {}) {
    const {
      maxResults = 6,
      order = 'relevance',
      videoDuration = 'medium', // short, medium, long
      channelId = null,
      publishedAfter = null
    } = options;

    try {
      const params = new URLSearchParams({
        part: 'snippet',
        type: 'video',
        q: query,
        maxResults: maxResults.toString(),
        order,
        videoDuration,
        key: YOUTUBE_API_KEY,
        safeSearch: 'strict',
        relevanceLanguage: 'en'
      });

      if (channelId) {
        params.append('channelId', channelId);
      }

      if (publishedAfter) {
        params.append('publishedAfter', publishedAfter);
      }

      const response = await fetch(`${YOUTUBE_API_BASE_URL}/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();
      return this.formatVideoData(data.items);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      return [];
    }
  }

  async getVideoDetails(videoIds) {
    try {
      const params = new URLSearchParams({
        part: 'contentDetails,statistics',
        id: videoIds.join(','),
        key: YOUTUBE_API_KEY
      });

      const response = await fetch(`${YOUTUBE_API_BASE_URL}/videos?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error fetching video details:', error);
      return [];
    }
  }

  formatVideoData(videos) {
    return videos.map(video => ({
      id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default.url,
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
      embedUrl: `https://www.youtube.com/embed/${video.id.videoId}`
    }));
  }

  parseDuration(duration) {
    // Parse ISO 8601 duration format (PT4M13S)
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] || '').replace('H', '') || '0';
    const minutes = (match[2] || '').replace('M', '') || '0';
    const seconds = (match[3] || '').replace('S', '') || '0';
    
    return { hours: parseInt(hours), minutes: parseInt(minutes), seconds: parseInt(seconds) };
  }

  formatDuration(duration) {
    const { hours, minutes, seconds } = this.parseDuration(duration);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

export default new YouTubeService();