import { NextRequest, NextResponse } from 'next/server';
import { MemberService } from '@/services/memberService';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const statusUpdate = await request.json();
    const result = await MemberService.updateMemberStatus(id, statusUpdate);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating member status:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update member status',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
