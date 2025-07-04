import { NextRequest, NextResponse } from 'next/server';
import { MemberService } from '@/services/memberService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    const result = await MemberService.getMemberActions(id, page, limit);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching member actions:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch member actions',
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
    const { actionType, description, adminId, adminName, effectiveDate, notes, metadata } = body;
    
    const result = await MemberService.createMembershipAction(
      id,
      actionType,
      description,
      adminId,
      adminName,
      effectiveDate,
      notes,
      metadata
    );
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating membership action:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create membership action',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
