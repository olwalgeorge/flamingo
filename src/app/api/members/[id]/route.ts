import { NextRequest, NextResponse } from 'next/server';
import { MemberService } from '@/services/memberService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const result = await MemberService.getMemberById(id);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching member:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch member',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const updateData = await request.json();
    const result = await MemberService.updateMember(id, updateData);
    
    if (!result.success) {
      return NextResponse.json(result, { status: result.error === 'Member not found' ? 404 : 400 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update member',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const result = await MemberService.deleteMember(id);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete member',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
