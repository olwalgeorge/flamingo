import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Organization } from '@/models/Organization';

export async function GET() {
  try {
    await connectDB();
    
    const organization = await Organization.findOne({ isActive: true });
    
    if (!organization) {
      return NextResponse.json({
        success: false,
        message: 'Organization not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: organization
    });
  } catch (error) {
    console.error('Error fetching organization:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch organization',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    
    const updateData = await request.json();
    
    const organization = await Organization.findOneAndUpdate(
      { isActive: true },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!organization) {
      return NextResponse.json({
        success: false,
        message: 'Organization not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: organization,
      message: 'Organization updated successfully'
    });
  } catch (error) {
    console.error('Error updating organization:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update organization',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
