import { Calendar, MapPin, Users, TrendingUp, Target, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { eventsData } from '../../../data/events';

export default function EventsGallery() {
  // Group events by category
  const eventsByCategory = eventsData.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = [];
    }
    acc[event.category].push(event);
    return acc;
  }, {} as Record<string, typeof eventsData>);

  const categoryColors = {
    'environmental': 'from-green-500 to-emerald-600',
    'meeting': 'from-blue-500 to-indigo-600',
    'educational': 'from-purple-500 to-violet-600',
    'community': 'from-orange-500 to-red-600',
    'fundraising': 'from-yellow-500 to-amber-600',
    'volunteer': 'from-teal-500 to-cyan-600'
  };

  const categoryIcons = {
    'environmental': '🌿',
    'meeting': '👥',
    'educational': '📚',
    'community': '🏘️',
    'fundraising': '💰',
    'volunteer': '🤝'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Events Gallery</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Explore our comprehensive collection of community events, from environmental initiatives 
              to educational workshops and community meetings.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{eventsData.length}</div>
                <div className="text-blue-100 text-sm">Total Events</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">
                  {Object.keys(eventsByCategory).length}
                </div>
                <div className="text-blue-100 text-sm">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">
                  {eventsData.reduce((sum, event) => sum + event.attendees, 0)}
                </div>
                <div className="text-blue-100 text-sm">Total Attendees</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">
                  ${eventsData.reduce((sum, event) => sum + (event.currentFunding || 0), 0).toLocaleString()}
                </div>
                <div className="text-blue-100 text-sm">Funds Raised</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events by Category */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(eventsByCategory).map(([category, events]) => (
            <div key={category} className="mb-16">
              {/* Category Header */}
              <div className="flex items-center mb-8">
                <div className={`bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors] || 'from-gray-500 to-gray-600'} 
                              rounded-full w-12 h-12 flex items-center justify-center text-white text-xl mr-4`}>
                  {categoryIcons[category as keyof typeof categoryIcons] || '📅'}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 capitalize">
                    {category} Events
                  </h2>
                  <p className="text-gray-600">
                    {events.length} event{events.length !== 1 ? 's' : ''} in this category
                  </p>
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <div key={event.id} className="group relative">
                    {/* Event Card */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                      {/* Event Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Category Badge */}
                        <div className={`absolute top-4 left-4 bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors] || 'from-gray-500 to-gray-600'} 
                                      text-white px-3 py-1 rounded-full text-sm font-medium`}>
                          {category}
                        </div>

                        {/* Funding Badge */}
                        {event.fundraisingGoal && event.currentFunding !== undefined && (
                          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {Math.round((event.currentFunding / event.fundraisingGoal) * 100)}% funded
                          </div>
                        )}

                        {/* Quick Actions */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Link
                            href={`/events/${event.id}`}
                            className="bg-white/90 backdrop-blur-sm text-gray-900 p-2 rounded-full hover:bg-white transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>

                      {/* Event Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          <Link href={`/events/${event.id}`} className="hover:underline">
                            {event.title}
                          </Link>
                        </h3>

                        {/* Event Details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            {event.date} at {event.time}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Users className="h-4 w-4 mr-2" />
                            {event.attendees}/{event.maxAttendees} attendees
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                          {event.description}
                        </p>

                        {/* Funding Progress */}
                        {event.fundraisingGoal && event.currentFunding !== undefined && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600">Funding Progress</span>
                              <span className="font-medium text-green-600">
                                ${event.currentFunding.toLocaleString()} / ${event.fundraisingGoal.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((event.currentFunding / event.fundraisingGoal) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Event Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              {Math.round((event.attendees / event.maxAttendees) * 100)}% full
                            </div>
                            {event.currentFunding && (
                              <div className="flex items-center">
                                <Target className="h-4 w-4 mr-1" />
                                ${event.currentFunding.toLocaleString()}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex space-x-2">
                            {event.fundraisingGoal && (
                              <Link
                                href={`/events/${event.id}/fundraiser`}
                                className="text-green-600 hover:text-green-700 font-medium text-sm"
                              >
                                Donate →
                              </Link>
                            )}
                            <Link
                              href={`/events/${event.id}`}
                              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                            >
                              Learn More →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Involved?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our community events and help make a positive impact in our local area.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/events"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse All Events
            </Link>
            <Link
              href="/volunteer"
              className="inline-flex items-center px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
