import { toast } from 'sonner';
import { ChatMessageProps } from '../components/ui/ChatMessage';

const YOUTUBE_API_KEY = "AIzaSyAIennrQtee01FbvvnoWUc1OM1YZfGWLhI"; // Replace with your API key
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

export interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: { url: string };
    };
  };
}

interface YouTubeResponse {
  items: YouTubeVideo[];
}

export const searchYouTubeVideosFromChat = async (
  messages: ChatMessageProps[],
  maxResults: number = 5
): Promise<YouTubeVideo[]> => {
  try {
    // Extract the latest user message as the search query
    const userMessage = messages
      .filter((msg) => msg.role === 'user')
      .pop()?.content;

    if (!userMessage) {
      throw new Error('No valid user message found for search.');
    }

    // Fetch videos based on the extracted query
    const response = await fetch(
      `${YOUTUBE_API_URL}?key=${YOUTUBE_API_KEY}&q=${encodeURIComponent(userMessage)}&part=snippet&maxResults=${maxResults}&type=video`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`YouTube API error: ${response.status} - ${errorText}`);
      throw new Error(`YouTube API request failed: ${response.status} - ${errorText}`);
    }

    const data: YouTubeResponse = await response.json();

    if (!data.items || data.items.length === 0) {
      throw new Error('No videos found for this query.');
    }

    return data.items;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    toast.error('Failed to fetch YouTube videos', {
      description: 'API error occurred. Please try again later.'
    });
    throw error;
  }
};
