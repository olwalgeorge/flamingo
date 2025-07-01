import { Clock, MapPin, Heart, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Volunteer() {
  const volunteerOpportunities = [
    {
      id: 1,
      title: "Community Garden Maintenance",
      description: "Help maintain our community garden by weeding, watering, and harvesting produce for local food banks.",
      location: "Central Park Community Garden",
      duration: "2-4 hours/week",
      requirements: ["No experience needed", "Willingness to work outdoors", "Basic physical ability"],
      contact: "garden@communityconnect.org",
      category: "Environmental",
      timeCommitment: "Flexible"
    },
    {
      id: 2,
      title: "Youth Mentorship Program",
      description: "Mentor young people in our community, helping them with homework, life skills, and career guidance.",
      location: "Community Center & Schools",
      duration: "3-5 hours/week",
      requirements: ["Background check required", "Good communication skills", "Patience with children"],
      contact: "mentorship@communityconnect.org",
      category: "Education",
      timeCommitment: "Regular"
    },
    {
      id: 3,
      title: "Event Setup & Support",
      description: "Help set up and run community events, from small workshops to large festivals.",
      location: "Various event locations",
      duration: "4-8 hours per event",
      requirements: ["Physical ability to lift/move items", "Team player attitude", "Reliable transportation"],
      contact: "events@communityconnect.org",
      category: "Events",
      timeCommitment: "As needed"
    },
    {
      id: 4,
      title: "Senior Companion Program",
      description: "Provide companionship and assistance to senior community members through visits and activities.",
      location: "Senior homes & private residences",
      duration: "2-3 hours/week",
      requirements: ["Background check required", "Compassionate nature", "Good listening skills"],
      contact: "seniors@communityconnect.org",
      category: "Social Services",
      timeCommitment: "Regular"
    },
    {
      id: 5,
      title: "Food Distribution Support",
      description: "Help sort, pack, and distribute food to families in need through our food pantry program.",
      location: "Community Center Food Pantry",
      duration: "3-4 hours/week",
      requirements: ["Ability to lift 25+ lbs", "Attention to detail", "Respectful attitude"],
      contact: "foodpantry@communityconnect.org",
      category: "Social Services",
      timeCommitment: "Flexible"
    },
    {
      id: 6,
      title: "Digital Literacy Instructor",
      description: "Teach basic computer and smartphone skills to community members who need technology support.",
      location: "Public Library & Community Center",
      duration: "2-3 hours/week",
      requirements: ["Good technology skills", "Teaching experience preferred", "Patience and empathy"],
      contact: "digital@communityconnect.org",
      category: "Education",
      timeCommitment: "Regular"
    }
  ];

  const volunteerBenefits = [
    "Meaningful connections with community members",
    "Skill development and training opportunities",
    "Flexible scheduling to fit your lifestyle",
    "Recognition and appreciation events",
    "Reference letters and volunteer certificates",
    "Networking with like-minded individuals"
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Environmental': return 'bg-green-100 text-green-800';
      case 'Education': return 'bg-blue-100 text-blue-800';
      case 'Events': return 'bg-purple-100 text-purple-800';
      case 'Social Services': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeCommitmentColor = (commitment: string) => {
    switch (commitment) {
      case 'Flexible': return 'bg-green-100 text-green-800';
      case 'Regular': return 'bg-blue-100 text-blue-800';
      case 'As needed': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Volunteer With Us
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-blue-100">
              Make a meaningful difference in your community. Join our team of dedicated volunteers 
              and help create positive change that lasts.
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Impact Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">Active Volunteers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">1,000+</div>
              <div className="text-gray-600">Hours This Month</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">15</div>
              <div className="text-gray-600">Active Programs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">Lives Impacted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Current Volunteer Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect volunteer opportunity that matches your interests, skills, and schedule.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {volunteerOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(opportunity.category)}`}>
                      {opportunity.category}
                    </span>
                    <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getTimeCommitmentColor(opportunity.timeCommitment)}`}>
                      {opportunity.timeCommitment}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{opportunity.title}</h3>
                <p className="text-gray-600 mb-6">{opportunity.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">{opportunity.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">{opportunity.duration}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Requirements</h4>
                  <ul className="space-y-1">
                    {opportunity.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    Contact: {opportunity.contact}
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why Volunteer With Us?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Volunteering with CommunityConnect is more than just giving back – it&apos;s about 
                building connections, developing skills, and being part of something meaningful.
              </p>
              
              <div className="space-y-4">
                {volunteerBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Heart className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Getting Started is Easy</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Choose Your Opportunity</h4>
                    <p className="text-gray-600 text-sm">Browse our current volunteer opportunities and find one that matches your interests.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Apply & Get Oriented</h4>
                    <p className="text-gray-600 text-sm">Complete a simple application and attend a brief orientation session.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Start Making a Difference</h4>
                    <p className="text-gray-600 text-sm">Begin volunteering and see the positive impact you&apos;re making in your community.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Our Volunteers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <p className="text-gray-600 mb-6">
                &ldquo;Volunteering here has been one of the most rewarding experiences of my life. 
                I&apos;ve made amazing friends and feel like I&apos;m truly making a difference.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Jennifer Davis</div>
                  <div className="text-gray-600">Youth Mentor Volunteer</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <p className="text-gray-600 mb-6">
                &ldquo;The flexibility they offer makes it easy to volunteer around my work schedule. 
                Plus, the training and support are excellent.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                  RB
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Robert Brown</div>
                  <div className="text-gray-600">Event Support Volunteer</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <p className="text-gray-600 mb-6">
                &ldquo;Working in the community garden has taught me so much and connected me with 
                neighbors I never would have met otherwise.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                  AL
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Amanda Lee</div>
                  <div className="text-gray-600">Garden Maintenance Volunteer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Volunteering?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Take the first step towards making a meaningful impact in your community. 
            We have opportunities for every schedule and skill level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Apply to Volunteer
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Ask Questions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
