import { NextRequest, NextResponse } from 'next/server';
import { MemberService } from '@/services/memberService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const result = await MemberService.getMembershipApplicationById(id);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching membership application:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch membership application',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const reviewData = await request.json();
    const result = await MemberService.reviewMembershipApplication(id, reviewData);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error reviewing membership application:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to review membership application',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { adminId, adminName } = body;
    
    const result = await MemberService.approveMembershipApplication(id, adminId, adminName);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error approving membership application:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to approve membership application',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
