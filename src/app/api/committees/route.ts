import { NextRequest, NextResponse } from 'next/server';
import { MemberService } from '@/services/memberService';

// GET /api/committees - Get all committees
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await MemberService.getCommittees(page, limit);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching committees:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch committees',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST /api/committees - Create a new committee
export async function POST(request: NextRequest) {
  try {
    const committeeData = await request.json();
    const result = await MemberService.createCommittee(committeeData);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating committee:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create committee',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
