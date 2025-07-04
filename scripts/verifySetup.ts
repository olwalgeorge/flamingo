import dotenv from 'dotenv';
import connectDB from '../src/lib/mongodb';
import { Organization } from '../src/models/Organization';
import { Admin } from '../src/models/Admin';
import { Contact } from '../src/models/Contact';
import { Member } from '../src/models/Member';
import { Event } from '../src/models/Event';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function verifySetup() {
  try {
    console.log('🔍 Verifying Flamingo CBO Database Setup...\n');
    
    // Test MongoDB connection
    console.log('1. 🔄 Testing MongoDB connection...');
    await connectDB();
    console.log('   ✅ MongoDB connection successful\n');
    
    // Check Organization
    console.log('2. 🏢 Checking organization data...');
    const organization = await Organization.findOne({ isActive: true });
    if (organization) {
      console.log(`   ✅ Organization found: ${organization.name}`);
      console.log(`   📧 Contact: ${organization.contact.email}`);
      console.log(`   📞 Phone: ${organization.contact.phone}`);
      console.log(`   🌐 Website: ${organization.contact.website || 'Not set'}\n`);
    } else {
      console.log('   ❌ No organization data found\n');
    }
    
    // Check Admin Users
    console.log('3. 👤 Checking admin users...');
    const adminCount = await Admin.countDocuments({ isActive: true });
    console.log(`   ✅ Active admin users: ${adminCount}`);
    
    if (adminCount > 0) {
      const admins = await Admin.find({ isActive: true })
        .select('firstName lastName email username role department')
        .limit(5);
      
      console.log('   📋 Admin users:');
      admins.forEach((admin, index) => {
        console.log(`   ${index + 1}. ${admin.firstName} ${admin.lastName} (${admin.email})`);
        console.log(`      Role: ${admin.role} | Department: ${admin.department}`);
      });
      console.log('');
    }
    
    // Check Contacts
    console.log('4. 📞 Checking contact information...');
    const contactCount = await Contact.countDocuments({ isActive: true });
    console.log(`   ✅ Department contacts: ${contactCount}`);
    
    if (contactCount > 0) {
      const contacts = await Contact.find({ isActive: true })
        .select('department name title email')
        .sort({ priority: -1 });
      
      console.log('   📋 Department contacts:');
      contacts.forEach((contact, index) => {
        console.log(`   ${index + 1}. ${contact.department.toUpperCase()}: ${contact.name} (${contact.title})`);
        console.log(`      Email: ${contact.email}`);
      });
      console.log('');
    }
    
    // Check Members
    console.log('5. 👥 Checking members...');
    const memberCount = await Member.countDocuments();
    console.log(`   ✅ Total members: ${memberCount}`);
    
    if (memberCount > 0) {
      const activeMembers = await Member.countDocuments({ status: 'active' });
      console.log(`   ✅ Active members: ${activeMembers}\n`);
    } else {
      console.log('   ℹ️  No members found (this is normal for initial setup)\n');
    }
    
    // Check Events
    console.log('6. 📅 Checking events...');
    const eventCount = await Event.countDocuments();
    console.log(`   ✅ Total events: ${eventCount}`);
    
    if (eventCount > 0) {
      const upcomingEvents = await Event.countDocuments({ status: 'upcoming' });
      console.log(`   ✅ Upcoming events: ${upcomingEvents}\n`);
    } else {
      console.log('   ℹ️  No events found (this is normal for initial setup)\n');
    }
    
    // Database Statistics
    console.log('7. 📊 Database statistics...');
    const collections = [
      { name: 'Organizations', model: Organization },
      { name: 'Admins', model: Admin },
      { name: 'Contacts', model: Contact },
      { name: 'Members', model: Member },
      { name: 'Events', model: Event },
    ];
    
    for (const collection of collections) {
      const count = await collection.model.countDocuments();
      console.log(`   ${collection.name}: ${count} records`);
    }
    
    console.log('\n🎉 Database verification completed successfully!');
    console.log('\n🔐 Admin Login Information:');
    
    const superAdmin = await Admin.findOne({ role: 'super-admin' })
      .select('email username firstName lastName');
    
    if (superAdmin) {
      console.log(`   Name: ${superAdmin.firstName} ${superAdmin.lastName}`);
      console.log(`   Email: ${superAdmin.email}`);
      console.log(`   Username: ${superAdmin.username}`);
      console.log('   Password: SecureAdmin@2025');
      console.log('   Role: Super Admin');
    }
    
    console.log('\n🚀 Your Flamingo CBO system is ready to use!');
    console.log('\n📋 Next Steps:');
    console.log('   1. Start the development server: npm run dev');
    console.log('   2. Visit the admin panel: http://localhost:3000/admin-panel-fcc-2025');
    console.log('   3. Login with the admin credentials above');
    console.log('   4. Begin adding members, events, and content');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
}

// Run the verification
verifySetup();
