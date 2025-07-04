import { NextRequest, NextResponse } from 'next/server';
import { MemberService } from '@/services/memberService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status') as 'active' | 'inactive' | 'suspended' | null;
    const membershipType = searchParams.get('membershipType') as 'ordinary' | 'patron' | 'honorary' | null;
    const search = searchParams.get('search');

    const filters = {
      ...(status && { status }),
      ...(membershipType && { membershipType }),
      ...(search && { search }),
    };

    const result = await MemberService.getAllMembers(page, limit, filters);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch members',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const memberData = await request.json();
    const result = await MemberService.createMember(memberData);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create member',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
