import { Users, Star, MapPin, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Members() {
  const featuredMembers = [
    {
      id: 1,
      name: "Sarah Martinez",
      role: "Community Leader",
      joinDate: "2021",
      avatar: "SM",
      bio: "Sarah has been instrumental in organizing our annual community festival and leads our youth mentorship program.",
      skills: ["Event Planning", "Youth Mentoring", "Public Speaking"],
      achievements: ["Community Service Award 2023", "Event Organizer of the Year"]
    },
    {
      id: 2,
      name: "David Johnson",
      role: "Volunteer Coordinator",
      joinDate: "2020",
      avatar: "DJ",
      bio: "David coordinates our volunteer programs and ensures everyone finds meaningful ways to contribute to the community.",
      skills: ["Program Management", "Team Leadership", "Community Outreach"],
      achievements: ["Volunteer Excellence Award", "Leadership Recognition"]
    },
    {
      id: 3,
      name: "Emily Wong",
      role: "Events Specialist",
      joinDate: "2022",
      avatar: "EW",
      bio: "Emily brings creativity and organization to all our events, making sure every gathering is memorable and impactful.",
      skills: ["Event Management", "Creative Design", "Social Media"],
      achievements: ["Creative Excellence Award", "Social Media Impact Award"]
    },
    {
      id: 4,
      name: "Michael Rodriguez",
      role: "Fundraising Lead",
      joinDate: "2021",
      avatar: "MR",
      bio: "Michael leads our fundraising efforts and has helped raise over $30,000 for community programs this year.",
      skills: ["Fundraising", "Grant Writing", "Financial Planning"],
      achievements: ["Fundraising Champion", "Grant Success Award"]
    },
    {
      id: 5,
      name: "Lisa Chen",
      role: "Education Director",
      joinDate: "2020",
      avatar: "LC",
      bio: "Lisa oversees our educational programs and workshops, helping community members develop new skills.",
      skills: ["Education", "Workshop Development", "Curriculum Design"],
      achievements: ["Education Excellence Award", "Program Innovation"]
    },
    {
      id: 6,
      name: "James Thompson",
      role: "Community Outreach",
      joinDate: "2023",
      avatar: "JT",
      bio: "James connects with local businesses and organizations to build partnerships that benefit our community.",
      skills: ["Partnership Development", "Networking", "Business Relations"],
      achievements: ["Partnership Builder Award", "Newcomer of the Year"]
    }
  ];

  const memberBenefits = [
    {
      title: "Exclusive Events",
      description: "Access to member-only events and early registration for popular programs.",
      icon: Calendar
    },
    {
      title: "Skill Sharing",
      description: "Share your expertise and learn from other community members.",
      icon: Star
    },
    {
      title: "Leadership Opportunities",
      description: "Take on leadership roles and help shape community initiatives.",
      icon: Users
    },
    {
      title: "Local Network",
      description: "Build meaningful connections with neighbors and local leaders.",
      icon: MapPin
    }
  ];

  const getAvatarColors = (index: number) => {
    const colors = [
      'from-blue-400 to-purple-400',
      'from-green-400 to-blue-400',
      'from-purple-400 to-pink-400',
      'from-orange-400 to-red-400',
      'from-teal-400 to-green-400',
      'from-indigo-400 to-purple-400'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Our Community Members
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-blue-100">
              Meet the amazing individuals who make our community stronger through 
              their dedication, skills, and passion for positive change.
            </p>
          </div>
        </div>
      </section>

      {/* Member Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Team Leaders</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">25+</div>
              <div className="text-gray-600">Neighborhoods</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">5</div>
              <div className="text-gray-600">Years Active</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Members */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Featured Community Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These dedicated members go above and beyond to make our community a better place for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMembers.map((member, index) => (
              <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-r ${getAvatarColors(index)} rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4`}>
                      {member.avatar}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-gray-500">Member since {member.joinDate}</p>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-center">{member.bio}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Skills & Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Achievements</h4>
                    <div className="space-y-1">
                      {member.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <Star className="h-3 w-3 text-yellow-500 mr-2 flex-shrink-0" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Member Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Being a member of our community comes with many opportunities and benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {memberBenefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
              Become a member today and start making a difference in your community. 
              It&apos;s free to join and there are no obligations - just opportunities to connect and contribute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Become a Member
              </Link>
              <Link 
                href="/volunteer" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Start Volunteering
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Member Directory Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Looking for Someone Specific?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our full member directory is available to registered members. Contact us to get connected 
            with specific team leaders or find members with particular skills.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Mail className="mr-2 h-4 w-4" />
            Contact Us for Member Directory
          </Link>
        </div>
      </section>
    </div>
  );
}
