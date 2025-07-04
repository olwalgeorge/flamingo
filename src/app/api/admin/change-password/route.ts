import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Admin } from '@/models/Admin';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { currentPassword, newPassword, confirmPassword } = await request.json();
    
    if (!newPassword || !confirmPassword) {
      return NextResponse.json({
        success: false,
        message: 'New password and confirmation are required'
      }, { status: 400 });
    }
    
    if (newPassword !== confirmPassword) {
      return NextResponse.json({
        success: false,
        message: 'New passwords do not match'
      }, { status: 400 });
    }
    
    // Password validation
    if (newPassword.length < 8) {
      return NextResponse.json({
        success: false,
        message: 'Password must be at least 8 characters long'
      }, { status: 400 });
    }
    
    // Check for password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(newPassword)) {
      return NextResponse.json({
        success: false,
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      }, { status: 400 });
    }
    
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
      email: string;
      role?: string;
      permissions?: unknown[];
      isTemporary?: boolean;
    };
    
    // Find admin
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return NextResponse.json({
        success: false,
        message: 'Admin not found'
      }, { status: 404 });
    }
    
    // For non-temporary tokens, verify current password is provided and correct
    if (!decoded.isTemporary) {
      if (!currentPassword) {
        return NextResponse.json({
          success: false,
          message: 'Current password is required'
        }, { status: 400 });
      }
      
      // Verify current password
      const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
      if (!isCurrentPasswordValid) {
        return NextResponse.json({
          success: false,
          message: 'Current password is incorrect'
        }, { status: 401 });
      }
    }
    
    // Check if new password is same as current
    const isSamePassword = await admin.comparePassword(newPassword);
    if (isSamePassword) {
      return NextResponse.json({
        success: false,
        message: 'New password must be different from current password'
      }, { status: 400 });
    }
    
    // Check if new password is a default password
    const defaultPasswords = ['SecureAdmin@2025', 'AdminPass123!', 'admin123', 'password123'];
    const isDefaultPassword = defaultPasswords.includes(newPassword);
    if (isDefaultPassword) {
      return NextResponse.json({
        success: false,
        message: 'New password cannot be a default password. Please choose a unique, secure password.'
      }, { status: 400 });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update admin password and reset first login flags
    await Admin.findByIdAndUpdate(admin._id, {
      password: hashedPassword,
      isFirstLogin: false,
      mustChangePassword: false,
      passwordResetToken: undefined,
      passwordResetExpires: undefined
    });
    
    // Create new full access token
    const newToken = jwt.sign(
      {
        adminId: admin._id,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions
      },
      process.env.JWT_SECRET || 'fallback-secret-change-in-production',
      { expiresIn: '8h' }
    );
    
    // Prepare admin data for response
    const adminData = {
      id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      username: admin.username,
      role: admin.role,
      department: admin.department,
      title: admin.title,
      permissions: admin.permissions,
      profileImage: admin.profileImage
    };
    
    const response = NextResponse.json({
      success: true,
      message: 'Password changed successfully',
      data: {
        admin: adminData,
        token: newToken
      }
    });
    
    // Set HTTP-only cookie
    response.cookies.set('admin-token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 // 8 hours
    });
    
    return response;
    
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}
