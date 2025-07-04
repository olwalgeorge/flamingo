import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Admin } from '@/models/Admin';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const role = searchParams.get('role');
    const department = searchParams.get('department');
    const isActive = searchParams.get('isActive');
    
    const skip = (page - 1) * limit;
    const query: Record<string, unknown> = {};
    
    // Apply filters
    if (role) {
      query.role = role;
    }
    if (department) {
      query.department = department;
    }
    if (isActive !== null) {
      query.isActive = isActive === 'true';
    }
    
    const admins = await Admin.find(query)
      .select('-password -passwordResetToken -twoFactorAuth.secret -auditLog')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Admin.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: {
        admins,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch admins',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const adminData = await request.json();
    
    // Check if admin with email already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: 'An admin with this email already exists'
      }, { status: 400 });
    }
    
    // Check if username already exists
    const existingUsername = await Admin.findOne({ username: adminData.username });
    if (existingUsername) {
      return NextResponse.json({
        success: false,
        message: 'This username is already taken'
      }, { status: 400 });
    }
    
    const admin = new Admin(adminData);
    await admin.save();
    
    // Remove sensitive data from response
    const adminResponse = admin.toObject();
    delete adminResponse.password;
    delete adminResponse.passwordResetToken;
    delete adminResponse.twoFactorAuth;
    
    return NextResponse.json({
      success: true,
      data: adminResponse,
      message: 'Admin created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create admin',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
