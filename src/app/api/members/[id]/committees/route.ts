import { NextRequest, NextResponse } from 'next/server';
import { MemberService } from '@/services/memberService';

// POST /api/members/[id]/committees - Add member to committee
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { committeeId, role, adminId, adminName } = body;
    
    const result = await MemberService.addMemberToCommittee(id, committeeId, role, adminId, adminName);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error adding member to committee:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to add member to committee',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
