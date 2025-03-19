
import { ChatMessageProps } from '../components/ui/ChatMessage';
import { toast } from 'sonner';

const GEMINI_API_KEY = "AIzaSyB-UgW-MuVjBm-NBem3_SF_zUHNZ35hjT8";
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

interface GeminiMessage {
  role: string;
  parts: { text: string }[];
}

interface GeminiRequestBody {
  contents: GeminiMessage[];
  generationConfig: {
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
  };
}

interface GeminiResponsePart {
  text: string;
}

interface GeminiResponseContent {
  parts: GeminiResponsePart[];
  role: string;
}

interface GeminiResponse {
  candidates: {
    content: GeminiResponseContent;
  }[];
}

const formatMessages = (messages: ChatMessageProps[]): GeminiMessage[] => {
  return messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));
};

export const generateGeminiResponse = async (messages: ChatMessageProps[], language: string): Promise<string> => {
  try {
    // Include language context in the first message
    const contextualizedMessages = [...messages];
    if (contextualizedMessages.length > 0) {
      const firstMessage = contextualizedMessages[0];
      firstMessage.content = `You are an AI tutor specialized in ${language} programming. ${firstMessage.content}`;
    }
    
    const formattedMessages = formatMessages(contextualizedMessages);
    
    const requestBody: GeminiRequestBody = {
      contents: formattedMessages,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    };
    
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} - ${errorText}`);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }
    
    const responseData: GeminiResponse = await response.json();
    
    if (!responseData.candidates || responseData.candidates.length === 0) {
      throw new Error('No response from Gemini API');
    }
    
    return responseData.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    toast.error('Failed to generate AI response', {
      description: 'API error occurred. Please try again later.'
    });
    throw error;
  }
};
