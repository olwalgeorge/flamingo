import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Admin } from '@/models/Admin';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Email and password are required'
      }, { status: 400 });
    }
    
    // Find admin by email or username
    const admin = await Admin.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: email.toLowerCase() }
      ],
      isActive: true
    });
    
    if (!admin) {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials'
      }, { status: 401 });
    }
    
    // Check if account is locked
    if (admin.isLocked && admin.lockUntil && admin.lockUntil > Date.now()) {
      const lockTimeRemaining = Math.ceil((admin.lockUntil - Date.now()) / (1000 * 60));
      return NextResponse.json({
        success: false,
        message: `Account is locked. Try again in ${lockTimeRemaining} minutes.`
      }, { status: 423 });
    }
    
    // Compare password
    const isPasswordValid = await admin.comparePassword(password);
    
    if (!isPasswordValid) {
      // Increment login attempts
      await admin.incLoginAttempts();
      
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials'
      }, { status: 401 });
    }
    
    // Check if user is using default password
    const isDefaultPassword = await admin.isUsingDefaultPassword();
    
    // Reset login attempts on successful login
    const updateData: Record<string, unknown> = {
      lastLogin: new Date(),
      isLocked: false
    };
    
    if (admin.loginAttempts > 0) {
      updateData.$unset = { loginAttempts: 1, lockUntil: 1 };
    }
    
    await Admin.findByIdAndUpdate(admin._id, updateData);
    
    // Check if this is first login, password must be changed, or using default password
    if (admin.isFirstLogin || admin.mustChangePassword || isDefaultPassword) {
      // Create a temporary token for password change
      const tempToken = jwt.sign(
        {
          adminId: admin._id,
          email: admin.email,
          isTemporary: true,
          mustChangePassword: true
        },
        process.env.JWT_SECRET || 'fallback-secret-change-in-production',
        { expiresIn: '30m' }
      );
      
      return NextResponse.json({
        success: true,
        message: isDefaultPassword ? 'Default password detected. Please change your password.' : 'Password change required',
        requiresPasswordChange: true,
        data: {
          admin: {
            id: admin._id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            isFirstLogin: admin.isFirstLogin || isDefaultPassword
          },
          tempToken
        }
      });
    }
    
    // Create JWT token
    const token = jwt.sign(
      {
        adminId: admin._id,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions
      },
      process.env.JWT_SECRET || 'fallback-secret-change-in-production',
      { expiresIn: '8h' }
    );
    
    // Prepare admin data for response (excluding sensitive info)
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
      message: 'Login successful',
      data: {
        admin: adminData,
        token
      }
    });
    
    // Set HTTP-only cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8 // 8 hours
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
