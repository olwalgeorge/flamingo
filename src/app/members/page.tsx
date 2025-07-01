import { Users, UserCheck, UserPlus, Shield, Award, Star } from 'lucide-react';

const membershipTypes = [
  {
    type: "Ordinary Members",
    description: "Individuals aged 18 years and above who subscribe to the objectives of FCC CBO and are accepted as members",
    icon: Users,
    color: "blue",
    rights: [
      "Participate in all meetings",
      "Vote on matters affecting the organization", 
      "Elect officials",
      "Access organization services"
    ]
  },
  {
    type: "Patron Members",
    description: "Distinguished individuals who provide leadership and guidance to the organization",
    icon: Award,
    color: "purple",
    rights: [
      "Provide strategic direction",
      "Mentor ordinary members",
      "Access to all meetings",
      "Special advisory role"
    ]
  },
  {
    type: "Honorary Members",
    description: "Persons who have made outstanding contributions to environmental conservation",
    icon: Star,
    color: "yellow",
    rights: [
      "Recognition for contributions",
      "Attend general meetings",
      "Advisory capacity",
      "Special recognition privileges"
    ]
  }
];

const memberRights = [
  "To participate in meetings of the organization",
  "To vote on all matters affecting the organization", 
  "To elect the officials of the organization",
  "To benefit from the services of the organization",
  "To access the records of the organization subject to the rules",
  "To participate in the activities of the organization",
  "To be treated fairly and with respect by all members"
];

const memberObligations = [
  "To pay the prescribed membership fees",
  "To attend meetings regularly",
  "To abide by the constitution and rules of the organization",
  "To work towards achieving the objectives of the organization",
  "To participate actively in organization activities",
  "To respect other members and maintain dignity",
  "To protect the reputation and interests of the organization"
];

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">FCC CBO Membership</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Join our community-based organization working for environmental conservation and community empowerment in Kisumu County
            </p>
          </div>
        </div>
      </section>

      {/* Membership Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Membership Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FCC CBO welcomes different types of members based on their commitment and contributions to our mission
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {membershipTypes.map((membership, index) => {
              const IconComponent = membership.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                  <div className={`bg-${membership.color}-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                    <IconComponent className={`h-8 w-8 text-${membership.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{membership.type}</h3>
                  <p className="text-gray-600 mb-6">{membership.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Rights & Benefits:</h4>
                    <ul className="text-gray-600 space-y-1">
                      {membership.rights.map((right, idx) => (
                        <li key={idx} className="flex items-center">
                          <UserCheck className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {right}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rights and Obligations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Member Rights */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Member Rights</h3>
              <div className="space-y-4">
                {memberRights.map((right, index) => (
                  <div key={index} className="flex items-start">
                    <Shield className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{right}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Member Obligations */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Member Obligations</h3>
              <div className="space-y-4">
                {memberObligations.map((obligation, index) => (
                  <div key={index} className="flex items-start">
                    <UserCheck className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{obligation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Growing Community</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15</div>
              <div className="text-gray-600">Leadership Team</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10</div>
              <div className="text-gray-600">Wards Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">5+</div>
              <div className="text-gray-600">Years Active</div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Application */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Become part of the FCC CBO community and contribute to environmental conservation and community development
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg">
              <UserPlus className="inline-block h-5 w-5 mr-2" />
              Apply for Membership
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}