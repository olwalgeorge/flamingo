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

      {/* Environmental Programs Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-emerald-100 rounded-full px-6 py-3 mb-6">
              <span className="text-emerald-800 text-sm font-semibold">🌍 Our Environmental Impact</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent mb-6">
              Sustainable Solutions
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Through innovative environmental conservation, water protection, and community empowerment, 
              we create lasting change for a greener, more sustainable future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-emerald-200 hover:border-emerald-300">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">💧 Water Conservation</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Protecting River Kibos and River Auji from pollution while improving water access and sanitation 
                practices in surrounding communities through sustainable initiatives.
              </p>
              <Link href="/about" className="inline-flex items-center text-emerald-600 font-bold hover:text-emerald-700 group-hover:translate-x-2 transition-all">
                Dive Deeper <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-emerald-200 hover:border-emerald-300">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Handshake className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">♻️ Waste Management</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Implementing eco-friendly waste management systems, promoting recycling activities, 
                and fostering sustainable practices across communities.
              </p>
              <Link href="/volunteer" className="inline-flex items-center text-emerald-600 font-bold hover:text-emerald-700 group-hover:translate-x-2 transition-all">
                Get Involved <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-emerald-200 hover:border-emerald-300">
              <div className="bg-gradient-to-br from-teal-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">🌱 Urban Farming</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Promoting modern sustainable farming methods, community tree planting initiatives, 
                and climate-smart agricultural practices for food security.
              </p>
              <Link href="/contact" className="inline-flex items-center text-emerald-600 font-bold hover:text-emerald-700 group-hover:translate-x-2 transition-all">
                Join Program <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-emerald-900 to-green-900 text-white overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400/20 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-emerald-500/20 backdrop-blur-sm border border-emerald-300/30 rounded-full px-8 py-4 mb-8">
              <span className="text-emerald-200 text-lg font-semibold">🌍 Real Environmental Impact</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              <span className="block text-white">Making Nature</span>
              <span className="block bg-gradient-to-r from-emerald-300 to-green-200 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h2>
            <p className="text-xl text-emerald-100 max-w-4xl mx-auto leading-relaxed">
              Every action we take creates ripples of positive change across our ecosystem. 
              See how our community-driven initiatives are transforming the environment in Kisumu County.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-emerald-300/20 hover:border-emerald-300/40 transition-all duration-500 hover:transform hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-4">🌳</div>
                <div className="text-4xl font-bold text-emerald-300 mb-2">500+</div>
                <div className="text-emerald-100 font-medium">Trees Planted</div>
                <div className="text-sm text-emerald-200 mt-2">Carbon offset: 125 tons/year</div>
              </div>
            </div>

            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-emerald-300/20 hover:border-emerald-300/40 transition-all duration-500 hover:transform hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-4">💧</div>
                <div className="text-4xl font-bold text-blue-300 mb-2">15km</div>
                <div className="text-emerald-100 font-medium">Rivers Protected</div>
                <div className="text-sm text-emerald-200 mt-2">Serving 10,000+ families</div>
              </div>
            </div>

            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-emerald-300/20 hover:border-emerald-300/40 transition-all duration-500 hover:transform hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-4">♻️</div>
                <div className="text-4xl font-bold text-green-300 mb-2">85%</div>
                <div className="text-emerald-100 font-medium">Waste Recycled</div>
                <div className="text-sm text-emerald-200 mt-2">2 tons diverted monthly</div>
              </div>
            </div>

            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-emerald-300/20 hover:border-emerald-300/40 transition-all duration-500 hover:transform hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-4">🌱</div>
                <div className="text-4xl font-bold text-lime-300 mb-2">50+</div>
                <div className="text-emerald-100 font-medium">Green Projects</div>
                <div className="text-sm text-emerald-200 mt-2">Community-led initiatives</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="bg-emerald-500/20 backdrop-blur-sm rounded-2xl p-8 border border-emerald-300/30 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-emerald-200 mb-4">🎯 2025 Sustainability Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-emerald-100">
                <div>
                  <div className="text-3xl font-bold text-emerald-300">1,000</div>
                  <div className="text-sm">Trees to Plant</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-300">25km</div>
                  <div className="text-sm">River Conservation</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-300">100</div>
                  <div className="text-sm">New Green Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
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
