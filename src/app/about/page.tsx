import { Users, Target, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About FLAMINGO CHAP CHAP CBO
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-green-100">
              A values-driven community organization working for environmental conservation, 
              community empowerment, and sustainable development in Kisumu County, Kenya.
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
                Our Mission & Vision
              </h2>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Vision</h3>
                <p className="text-lg text-gray-600 mb-6">
                  A values-driven society of people who consciously work for the continued improvement 
                  of their livelihoods and a greener, cleaner world. To be an accredited organization 
                  in promoting sustainable, healthy environmental communities, urban farming practices, 
                  waste management, and recycling activities around and beyond Kisumu County.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Mission</h3>
                <p className="text-lg text-gray-600 mb-6">
                  We strive for better environmental management, community empowerment, and livelihood 
                  improvement using tree planting, urban farming practices, waste management, and 
                  recycling activities as an entry point. To advocate for environmental preservation 
                  and provision of safe drinkable, fishable and swimmable water to communities around 
                  the shores of River Kibos and River Auji and Kisumu County at large.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
                  <div className="text-gray-600">Community Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-gray-600">Conservation Projects</div>
                </div>
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <Heart className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Love for Environmental Conservation</div>
                      <div className="text-gray-600">We are passionate about protecting our natural resources</div>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Users className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Self and Community Empowerment</div>
                      <div className="text-gray-600">Building capacity and empowering community members</div>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Target className="h-6 w-6 text-teal-500 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Volunteerism</div>
                      <div className="text-gray-600">Encouraging voluntary participation in community development</div>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Heart className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Accountability, Transparency, and Honesty</div>
                      <div className="text-gray-600">Maintaining integrity in all our operations</div>
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
              Meet the dedicated leaders who guide our environmental conservation and community empowerment initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                SW
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Samuel Weswa Khaukha</h3>
              <p className="text-green-600 mb-4">Chairman</p>
              <p className="text-gray-600">
                Leading our organization with a vision for environmental conservation and community development 
                in Kisumu County.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                GO
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">George Omondi Olwal</h3>
              <p className="text-green-600 mb-4">General Secretary</p>
              <p className="text-gray-600">
                Managing organizational records, correspondence, and ensuring effective communication 
                across all our programs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-teal-400 to-green-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                LC
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Len Chelimo Koskei</h3>
              <p className="text-green-600 mb-4">Treasurer</p>
              <p className="text-gray-600">
                Overseeing financial management, ensuring transparency and accountability in all 
                monetary transactions and projects.
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
