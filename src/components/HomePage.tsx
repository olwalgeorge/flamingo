import Link from 'next/link';
import { Users, Calendar, Heart, Handshake, ArrowRight, Star } from 'lucide-react';
import Hero from './Hero';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-gray-600">Community Members</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Conservation Projects</div>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-teal-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">5,000+</div>
              <div className="text-gray-600">Trees Planted</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">10+</div>
              <div className="text-gray-600">River Clean-ups</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Environmental Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Through environmental conservation, water protection, and community empowerment, we create sustainable change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Water Conservation</h3>
              <p className="text-gray-600 mb-6">
                Advocating against pollution of River Kibos and River Auji while improving water and sanitation practices in surrounding communities.
              </p>
              <Link href="/about" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Handshake className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Waste Management</h3>
              <p className="text-gray-600 mb-6">
                Promoting eco-friendly waste management systems, recycling activities, and sustainable practices.
              </p>
              <Link href="/volunteer" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                Get Involved <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-teal-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Urban Farming</h3>
              <p className="text-gray-600 mb-6">
                Encouraging modern farming methods, tree planting, and sustainable agricultural practices.
              </p>
              <Link href="/contact" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                Join Program <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Our Community Says
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                &ldquo;FCC CBO has transformed our community! The river cleanup campaigns have made River Kibos so much cleaner, and I&apos;ve learned so much about environmental conservation.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                  AG
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Akinyi Grace</div>
                  <div className="text-gray-600">Community Member</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                &ldquo;Through FCC CBO&apos;s tree planting workshops, I&apos;ve learned sustainable farming techniques that have improved my family&apos;s livelihood. The training programs are excellent!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                  JO
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">James Ochieng</div>
                  <div className="text-gray-600">Urban Farmer</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                &ldquo;The women&apos;s basket weaving workshops have empowered me to start my own business. FCC CBO truly cares about lifting up our community and protecting our environment.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                  MW
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Mary Wanjiku</div>
                  <div className="text-gray-600">Women&apos;s Group Leader</div>
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
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join our community today and be part of something bigger. Together, we can create positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/members" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Become a Member
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
