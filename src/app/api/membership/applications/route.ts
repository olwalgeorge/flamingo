import { NextRequest, NextResponse } from 'next/server';
import { MemberService } from '@/services/memberService';
import { ApplicationStatus } from '@/types';

// GET /api/membership/applications - Get all membership applications
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status') as ApplicationStatus | null;

    const result = await MemberService.getMembershipApplications(page, limit, status || undefined);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching membership applications:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch membership applications',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST /api/membership/applications - Submit a new membership application
export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json();
    const result = await MemberService.submitMembershipApplication(applicationData);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error submitting membership application:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to submit membership application',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
