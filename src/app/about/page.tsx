import { Users, Target, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About CommunityConnect
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-blue-100">
              We are a passionate group of individuals dedicated to building stronger, 
              more connected communities through meaningful action and collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                To create lasting positive change in our communities by fostering connections, 
                organizing impactful events, and providing meaningful volunteer opportunities 
                that bring people together and make a real difference.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">Community Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
                  <div className="text-gray-600">Events Organized</div>
                </div>
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <Heart className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Compassion</div>
                      <div className="text-gray-600">We care deeply about our community and each other</div>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Users className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Collaboration</div>
                      <div className="text-gray-600">Together we achieve more than we ever could alone</div>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Target className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Impact</div>
                      <div className="text-gray-600">We focus on creating meaningful, lasting change</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated individuals who help guide our organization and community initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                AS
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Alex Smith</h3>
              <p className="text-blue-600 mb-4">Executive Director</p>
              <p className="text-gray-600">
                With over 10 years of community organizing experience, Alex leads our strategic initiatives 
                and community partnerships.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                MJ
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Maria Johnson</h3>
              <p className="text-blue-600 mb-4">Program Coordinator</p>
              <p className="text-gray-600">
                Maria oversees our volunteer programs and ensures every community member finds 
                meaningful ways to get involved.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                DC
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">David Chen</h3>
              <p className="text-blue-600 mb-4">Events Manager</p>
              <p className="text-gray-600">
                David brings creativity and organization to all our events, making sure every 
                gathering is memorable and impactful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  2020
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">The Beginning</h3>
                  <p className="text-gray-600">
                    Founded by a small group of neighbors who wanted to create stronger connections 
                    in our community during challenging times.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  2021
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Growing Impact</h3>
                  <p className="text-gray-600">
                    Expanded to include volunteer programs, organized our first major fundraising event, 
                    and reached 100 active members.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  2023
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Recognition</h3>
                  <p className="text-gray-600">
                    Received the &ldquo;Outstanding Community Service Award&rdquo; and launched our 
                    youth mentorship program.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  2025
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Today</h3>
                  <p className="text-gray-600">
                    Now serving over 500 community members with regular events, volunteer opportunities, 
                    and ongoing support programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
