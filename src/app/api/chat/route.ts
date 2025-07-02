import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, ChatContextData } from '@/types';

// Together.ai client for DeepSeek models
async function getTogetherClient() {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    throw new Error('Together.ai API key is not configured');
  }

  const { default: OpenAI } = await import('openai');
  return new OpenAI({
    apiKey,
    baseURL: 'https://api.together.xyz/v1'
  });
}

// In-memory storage for demo (in production, use a database)
const chatSessions = new Map<string, ChatMessage[]>();

// Organization context for the AI assistant
const getOrganizationContext = (): ChatContextData => ({
  upcomingEvents: [
    {
      id: '1',
      title: 'Lake Victoria Cleanup Drive',
      date: '2025-07-15',
      time: '08:00',
      location: 'Kisumu Waterfront',
      description: 'Community cleanup activity at Lake Victoria shores',
      image: '/hero-events.jpg',
      category: 'community',
      attendees: 45
    },
    {
      id: '2',
      title: 'Tree Planting Initiative',
      date: '2025-07-22',
      time: '06:00',
      location: 'Dunga Hill Forest',
      description: 'Plant 1000 indigenous trees to restore forest cover',
      image: '/placeholder-event.svg',
      category: 'community',
      attendees: 30
    }
  ],
  organizationInfo: {
    name: 'FLAMINGO CHAP CHAP CBO',
    mission: 'Environmental conservation, water preservation, waste management, and community empowerment in Kisumu County, Kenya',
    services: [
      'Environmental conservation programs',
      'Community clean-up drives',
      'Tree planting initiatives',
      'Water conservation projects',
      'Waste management education',
      'Community empowerment workshops',
      'Volunteer coordination',
      'Educational outreach'
    ],
    contactInfo: {
      email: 'info@flamingochapchap.org',
      phone: '+254 xxx xxx xxx',
      address: 'Kisumu County, Kenya'
    }
  }
});

const createSystemPrompt = (context: ChatContextData): string => {
  return `You are a friendly customer care assistant for ${context.organizationInfo.name}, a community organization in Kenya focused on environmental conservation.

Mission: ${context.organizationInfo.mission}

Key Services:
${context.organizationInfo.services.map(service => `- ${service}`).join('\n')}

Upcoming Events:
${context.upcomingEvents.map(event =>
    `- ${event.title} on ${event.date} at ${event.time} in ${event.location}`
  ).join('\n')}

Contact: ${context.organizationInfo.contactInfo.email} | ${context.organizationInfo.contactInfo.phone}

IMPORTANT: Keep responses conversational and concise like a real human would speak. 
- For greetings: 1-2 sentences max
- For simple questions: 2-3 sentences 
- Only give detailed responses when specifically asked for details
- Be warm but brief
- Sound natural, not corporate
- Use everyday language, not formal business speak

Examples:
Greeting: "Hi there! I'm here to help with questions about our environmental programs. What can I tell you?"
Simple info: "We're based in Kisumu County and work on Lake Victoria conservation. Want to know about our upcoming cleanup event?"
Don't list everything unless asked for "all services" or "complete information"`;
};

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const currentSessionId = sessionId || uuidv4();

    // Get or create session messages
    if (!chatSessions.has(currentSessionId)) {
      chatSessions.set(currentSessionId, []);
    }

    const sessionMessages = chatSessions.get(currentSessionId)!;

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: message,
      role: 'user',
      timestamp: new Date(),
      sessionId: currentSessionId
    };

    sessionMessages.push(userMessage);

    // Get organization context
    const context = getOrganizationContext();
    const systemPrompt = createSystemPrompt(context);

    // Add system message to session
    const systemMessage: ChatMessage = {
      id: uuidv4(),
      content: systemPrompt,
      role: 'system',
      timestamp: new Date(),
      sessionId: currentSessionId
    };

    // Prepare messages with system context for AI
    const messagesWithContext = [systemMessage, ...sessionMessages.slice(-10)];

    // Try Together.ai with DeepSeek model (no fallback - testing mode)
    try {
      const togetherClient = await getTogetherClient();
      
      // Prepare messages for Together.ai (OpenAI format)
      const openaiMessages = messagesWithContext.map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content
      }));
      
      const completion = await togetherClient.chat.completions.create({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: openaiMessages,
        max_tokens: 100,
        temperature: 0.7,
      });

      const assistantContent = completion.choices[0]?.message?.content ||
        "I apologize, but I'm having trouble responding right now. Please try again or contact us directly.";

      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        content: assistantContent,
        role: 'assistant',
        timestamp: new Date(),
        sessionId: currentSessionId
      };

      sessionMessages.push(assistantMessage);

      return NextResponse.json({
        message: assistantMessage,
        sessionId: currentSessionId
      });

    } catch (error: unknown) {
      console.error('Together.ai API error:', error);

      // Simple fallback response when Together.ai is unavailable
      const fallbackMessage: ChatMessage = {
        id: uuidv4(),
        content: "I apologize, but I'm having trouble connecting to our AI service right now. Please try again in a moment, or contact us directly at info@flamingochapchap.org for immediate assistance with your environmental conservation questions.",
        role: 'assistant',
        timestamp: new Date(),
        sessionId: currentSessionId
      };

      sessionMessages.push(fallbackMessage);

      return NextResponse.json({
        message: fallbackMessage,
        sessionId: currentSessionId
      });
    }

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId || !chatSessions.has(sessionId)) {
    return NextResponse.json({ messages: [] });
  }

  const messages = chatSessions.get(sessionId) || [];
  return NextResponse.json({ messages });
}
