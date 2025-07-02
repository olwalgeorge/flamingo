import { NextRequest, NextResponse } from 'next/server';

// This would typically come from a database
// For demo purposes, using in-memory storage
const chatSessions = new Map();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    // In a real application, you'd query your database here
    const sessions = Array.from(chatSessions.entries()).map(([id, messages]) => {
      const sessionMessages = Array.isArray(messages) ? messages : [];
      const firstMessage = sessionMessages.find(m => m.role === 'user');
      const lastMessage = sessionMessages[sessionMessages.length - 1];
      
      return {
        id,
        messageCount: sessionMessages.length,
        firstUserMessage: firstMessage?.content || 'No messages',
        lastActivity: lastMessage?.timestamp || new Date(),
        status: 'active', // In real app, this would be stored
        userInfo: {
          email: 'anonymous@user.com', // In real app, get from auth
          name: 'Anonymous User'
        }
      };
    })
    .filter(session => !statusFilter || session.status === statusFilter)
    .slice(0, limit);

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chat sessions' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { sessionId, status } = await request.json();
    
    if (!sessionId || !status) {
      return NextResponse.json(
        { error: 'Session ID and status are required' },
        { status: 400 }
      );
    }

    // In a real application, you'd update the database here
    // For now, just return success
    return NextResponse.json({ 
      success: true, 
      message: `Session ${sessionId} status updated to ${status}` 
    });
  } catch (error) {
    console.error('Error updating chat session:', error);
    return NextResponse.json(
      { error: 'Failed to update chat session' },
      { status: 500 }
    );
  }
}
