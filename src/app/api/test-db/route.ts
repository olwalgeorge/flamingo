import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Member } from '@/models/Member';
import { Event } from '@/models/Event';

export async function GET() {
  try {
    // Test MongoDB connection
    await connectDB();
    
    // Test model access
    const memberCount = await Member.countDocuments();
    const eventCount = await Event.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful!',
      data: {
        memberCount,
        eventCount,
        timestamp: new Date().toISOString(),
      }
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
