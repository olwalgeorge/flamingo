import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, ChatContextData } from '@/types';
import { CONTACT_INFO } from '@/data/contactInfo';

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

// Organization context for the AI assistant with comprehensive information
const getOrganizationContext = (): ChatContextData => ({
  upcomingEvents: [
    {
      id: '1',
      title: 'River Kibos Clean-up Campaign',
      date: '2025-07-15',
      time: '08:00',
      location: 'River Kibos Watershed, Kondele Ward',
      description: 'Monthly river clean-up initiative to protect water sources and preserve aquatic ecosystems. Involves waste removal, water quality testing, and community education.',
      image: '/hero-events.jpg',
      category: 'environmental',
      attendees: 45
    },
    {
      id: '2',
      title: 'Quarterly General Meeting - Q3 2025',
      date: '2025-07-20',
      time: '14:00',
      location: 'FCC CBO Office, Flamingo Unit',
      description: 'Mandatory quarterly meeting for management committee members. Covers Q2 achievements, financial reports, Q4 planning, and strategic discussions.',
      image: '/placeholder-event.svg',
      category: 'meeting',
      attendees: 15
    },
    {
      id: '3',
      title: 'Tree Planting Initiative - Dunga Hill Forest',
      date: '2025-07-22',
      time: '06:00',
      location: 'Dunga Hill Forest',
      description: 'Community tree planting to enhance local ecosystem, combat climate change, and promote reforestation. Focus on native species.',
      image: '/placeholder-event.svg',
      category: 'environmental',
      attendees: 32
    },
    {
      id: '4',
      title: 'Community Workshop: Waste Management & Recycling',
      date: '2025-07-28',
      time: '14:00',
      location: 'Kondele Community Center',
      description: 'Educational workshop on proper waste segregation, recycling techniques, and sustainable waste management practices.',
      image: '/placeholder-event.svg',
      category: 'educational',
      attendees: 25
    }
  ],
  memberInfo: {
    totalMembers: 200,
    activeVolunteers: 85,
    membershipTypes: [
      {
        type: 'Ordinary Members',
        description: 'Individuals aged 18+ who subscribe to FCC CBO objectives',
        rights: ['Participate in meetings', 'Vote on matters', 'Elect officials', 'Access services']
      },
      {
        type: 'Patron Members', 
        description: 'Distinguished individuals providing leadership and guidance',
        rights: ['Strategic direction', 'Mentor members', 'Advisory role']
      },
      {
        type: 'Honorary Members',
        description: 'Persons with outstanding environmental conservation contributions',
        rights: ['Recognition privileges', 'Advisory capacity', 'Special recognition']
      }
    ]
  },
  leadership: CONTACT_INFO.leadership,
  organizationInfo: {
    name: CONTACT_INFO.organization.name,
    fullName: CONTACT_INFO.organization.fullName,
    establishedYear: 2020,
    registrationStatus: 'Registered Community-Based Organization',
    mission: 'We strive for better environmental management, community empowerment, and livelihood improvement using tree planting, urban farming practices, waste management, and recycling activities as an entry point. To advocate for environmental preservation and provision of safe drinkable, fishable and swimmable water to communities around the shores of River Kibos and River Auji and Kisumu County at large.',
    vision: 'A values-driven society of people who consciously work for the continued improvement of their livelihoods and a greener, cleaner world. To be an accredited organization in promoting sustainable, healthy environmental communities, urban farming practices, waste management, and recycling activities around and beyond Kisumu County.',
    coreValues: [
      {
        value: 'Love for Environmental Conservation',
        description: 'Passionate about protecting natural resources and ecosystems'
      },
      {
        value: 'Self and Community Empowerment', 
        description: 'Building capacity and empowering community members for sustainable development'
      },
      {
        value: 'Volunteerism',
        description: 'Encouraging voluntary participation in community development initiatives'
      },
      {
        value: 'Accountability, Transparency, and Honesty',
        description: 'Maintaining integrity in all operations and financial management'
      }
    ],
    services: [
      'Environmental Conservation Programs',
      'Tree Planting and Reforestation Initiatives', 
      'Urban Farming and Sustainable Agriculture Training',
      'Waste Management and Recycling Education',
      'Water Conservation and Quality Monitoring',
      'Community Clean-up Campaigns',
      'Youth Environmental Education and Mentorship',
      'Volunteer Coordination and Training',
      'Community Workshops and Capacity Building',
      'Environmental Advocacy and Policy Engagement'
    ],
    focusAreas: [
      'River Kibos and River Auji watershed protection',
      'Lake Victoria ecosystem conservation', 
      'Urban waste management in Kisumu County',
      'Community-based natural resource management',
      'Climate change adaptation and mitigation',
      'Water quality improvement and access'
    ],
    achievements: [
      '200+ active community members',
      '50+ conservation projects completed',
      'Outstanding Community Service Award (2023)',
      'Youth mentorship program launched',
      'Regular river clean-up campaigns established',
      'Community partnerships with local government'
    ],
    contactInfo: {
      email: CONTACT_INFO.primaryContact.email,
      phone: CONTACT_INFO.primaryContact.phone,
      address: `${CONTACT_INFO.office.address}, ${CONTACT_INFO.office.city}, ${CONTACT_INFO.office.county}`,
      operatingAreas: CONTACT_INFO.operatingAreas
    }
  }
});

const createSystemPrompt = (context: ChatContextData): string => {
  return `You are Amara, a warm and knowledgeable customer care assistant for ${context.organizationInfo.name}, a registered community-based organization in Kenya focused on environmental conservation.

PERSONALITY:
- Be friendly, warm, and conversational
- Answer questions directly and concisely
- Provide specific information from the organization context
- Include relevant internal links when helpful
- Use a natural, human-like tone

INTERNAL NAVIGATION LINKS (use when relevant):
- Events page: /events
- About us: /about  
- Membership info: /members
- Volunteer opportunities: /volunteer
- Contact us: /contact
- Donate: /donate
- News & updates: /news

ORGANIZATION DETAILS:
Full Name: ${context.organizationInfo.fullName}
Established: ${context.organizationInfo.establishedYear}
Status: ${context.organizationInfo.registrationStatus}

MISSION: ${context.organizationInfo.mission}

VISION: ${context.organizationInfo.vision}

CORE VALUES:
${context.organizationInfo.coreValues?.map(cv => `• ${cv.value}: ${cv.description}`).join('\n')}

LEADERSHIP TEAM:
${context.leadership?.map(leader => `• ${leader.name} - ${leader.position}: ${leader.role}`).join('\n')}

MEMBERSHIP INFO:
Total Members: ${context.memberInfo?.totalMembers}
Active Volunteers: ${context.memberInfo?.activeVolunteers}

Membership Types:
${context.memberInfo?.membershipTypes.map(mt => `• ${mt.type}: ${mt.description}`).join('\n')}

SERVICES WE PROVIDE:
${context.organizationInfo.services.map(service => `• ${service}`).join('\n')}

FOCUS AREAS:
${context.organizationInfo.focusAreas?.map(area => `• ${area}`).join('\n')}

ACHIEVEMENTS:
${context.organizationInfo.achievements?.map(achievement => `• ${achievement}`).join('\n')}

UPCOMING EVENTS:
${context.upcomingEvents.map(event =>
    `• ${event.title} - ${event.date} at ${event.time} in ${event.location}
   Details: ${event.description}`
  ).join('\n\n')}

MEETINGS:
- General Meeting: Our next Quarterly General Meeting is July 20, 2025 at 2:00 PM at FCC CBO Office, Flamingo Unit (for management committee members)
- Regular meetings are held quarterly for planning and progress reviews

OPERATING AREAS: ${context.organizationInfo.contactInfo.operatingAreas?.join(', ')}
CONTACT: ${context.organizationInfo.contactInfo.email} | ${context.organizationInfo.contactInfo.phone}

INSTRUCTIONS:
- Start all responses with "At FLAMINGO CHAP CHAP CBO we..." (except for greetings)
- Be very concise and direct - 1-2 sentences maximum for most responses
- Answer questions directly using the organization information above
- Include relevant internal links when helpful (e.g., "Check /events for details")
- Provide the secretary number (+254722113087) when contact info is requested
- Be conversational but brief

RESPONSE GUIDELINES:
- For events: Give type, date, time, location briefly (e.g., "At FLAMINGO CHAP CHAP CBO we have a River Kibos Clean-up on July 15th at 8:00 AM in Kondele Ward.")
- For meetings: "At FLAMINGO CHAP CHAP CBO we hold quarterly general meetings. The next one is July 20, 2025 at 2:00 PM at our office in Flamingo Unit."
- For membership: Brief explanation of types and benefits
- For leadership: Just names and positions
- For mission/values: One key point only
- For services: List 2-3 main ones
- Sound natural but keep it short

Examples:
Events: "At FLAMINGO CHAP CHAP CBO we have upcoming events like River Kibos Clean-up (July 15), Tree Planting (July 22), and Waste Management Workshop (July 28). See /events for details."
General Meeting: "At FLAMINGO CHAP CHAP CBO we hold quarterly general meetings. The next one is July 20, 2025 at 2:00 PM at our office in Flamingo Unit for management committee members."
Leadership: "At FLAMINGO CHAP CHAP CBO we're led by Chairman Samuel Weswa Khaukha, Secretary George Omondi Olwal, and Treasurer Len Chelimo Koskei."
Mission: "At FLAMINGO CHAP CHAP CBO we focus on environmental conservation, tree planting, and community empowerment around Kisumu County.";`;
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
        max_tokens: 200,
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
