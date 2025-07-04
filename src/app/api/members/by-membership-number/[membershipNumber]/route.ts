import { NextRequest, NextResponse } from 'next/server';
import { MemberService } from '@/services/memberService';

// GET /api/members/by-membership-number/[membershipNumber] - Get member by membership number
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ membershipNumber: string }> }
) {
  const { membershipNumber } = await params;
  try {
    const result = await MemberService.getMemberByMembershipNumber(membershipNumber);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching member by membership number:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch member',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
