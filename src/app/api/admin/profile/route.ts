import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Admin } from '@/models/Admin';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Get token from header or cookie
    const token = request.headers.get('authorization')?.replace('Bearer ', '') || 
                 request.cookies.get('admin-token')?.value;
    
    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Authentication required'
      }, { status: 401 });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-change-in-production') as {
      adminId: string;
    };
    
    // Find admin
    const admin = await Admin.findById(decoded.adminId).select('-password');
    if (!admin) {
      return NextResponse.json({
        success: false,
        message: 'Admin not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: admin
    });
    
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    // Get token from header or cookie
    const token = request.headers.get('authorization')?.replace('Bearer ', '') || 
                 request.cookies.get('admin-token')?.value;
    
    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Authentication required'
      }, { status: 401 });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-change-in-production') as {
      adminId: string;
    };
    
    const updateData = await request.json();
    
    // Remove sensitive fields that shouldn't be updated via this endpoint
    const sensitiveFields = ['password', 'email', 'username', 'role', 'permissions', 'isActive', 'createdBy', 'loginAttempts', 'isLocked', 'lockUntil', 'passwordResetToken', 'passwordResetExpires', 'twoFactorAuth', 'auditLog'];
    
    const allowedUpdates = Object.keys(updateData).reduce((acc, key) => {
      if (!sensitiveFields.includes(key)) {
        acc[key] = updateData[key];
      }
      return acc;
    }, {} as Record<string, unknown>);
    
    // Find and update admin
    const admin = await Admin.findByIdAndUpdate(
      decoded.adminId,
      allowedUpdates,
      { 
        new: true,
        runValidators: true,
        select: '-password'
      }
    );
    
    if (!admin) {
      return NextResponse.json({
        success: false,
        message: 'Admin not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: admin
    });
    
  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        message: 'Invalid data provided'
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}
