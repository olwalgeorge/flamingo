import { NextRequest, NextResponse } from 'next/server';
import { MemberService } from '@/services/memberService';

// DELETE /api/members/[id]/committees/[committeeId] - Remove member from committee
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; committeeId: string }> }
) {
  const { id, committeeId } = await params;
  try {
    const body = await request.json();
    const { adminId, adminName } = body;
    
    const result = await MemberService.removeMemberFromCommittee(id, committeeId, adminId, adminName);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error removing member from committee:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to remove member from committee',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
