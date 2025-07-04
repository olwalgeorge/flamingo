import connectDB from '../src/lib/mongodb';
import { Admin } from '../src/models/Admin';

async function testDefaultPasswordDetection() {
  console.log('🔍 Testing Default Password Detection...\n');
  
  try {
    await connectDB();
    
    // Find an admin user
    const admin = await Admin.findOne({ email: 'admin@flamingocbo.org' });
    
    if (!admin) {
      console.log('❌ Admin user not found. Please run the seed script first.');
      return;
    }
    
    console.log('👤 Testing with admin:', admin.email);
    
    // Test 1: Check if admin is using default password
    console.log('\n📋 Test 1: Default Password Detection');
    const isUsingDefault = await admin.isUsingDefaultPassword();
    console.log(`   Is using default password: ${isUsingDefault ? '✅ YES' : '❌ NO'}`);
    
    // Test 2: Test password comparison with known default passwords
    console.log('\n📋 Test 2: Password Comparison Tests');
    const defaultPasswords = ['SecureAdmin@2025', 'AdminPass123!', 'admin123', 'password123'];
    
    for (const testPassword of defaultPasswords) {
      const isMatch = await admin.comparePassword(testPassword);
      console.log(`   Password "${testPassword}": ${isMatch ? '✅ MATCH' : '❌ NO MATCH'}`);
    }
    
    // Test 3: Check admin flags
    console.log('\n📋 Test 3: Admin Security Flags');
    console.log(`   isFirstLogin: ${admin.isFirstLogin ? '✅ YES' : '❌ NO'}`);
    console.log(`   mustChangePassword: ${admin.mustChangePassword ? '✅ YES' : '❌ NO'}`);
    console.log(`   isActive: ${admin.isActive ? '✅ YES' : '❌ NO'}`);
    console.log(`   isLocked: ${admin.isLocked ? '⚠️ LOCKED' : '✅ UNLOCKED'}`);
    
    // Test 4: Simulate login scenario
    console.log('\n📋 Test 4: Login Scenario Simulation');
    const shouldRequirePasswordChange = admin.isFirstLogin || admin.mustChangePassword || isUsingDefault;
    console.log(`   Should require password change: ${shouldRequirePasswordChange ? '✅ YES' : '❌ NO'}`);
    
    if (shouldRequirePasswordChange) {
      console.log('   🔄 This user will be redirected to password change page');
    } else {
      console.log('   ✅ This user can access the dashboard directly');
    }
    
    console.log('\n✅ Default password detection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testDefaultPasswordDetection().catch(console.error);
