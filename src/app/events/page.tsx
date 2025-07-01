import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Community Garden Planting Day",
      date: "July 15, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Central Park Community Garden",
      description: "Join us for a morning of planting and beautifying our community garden. All ages welcome!",
      category: "volunteer",
      attendees: 24,
      maxAttendees: 30,
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Annual Summer Festival",
      date: "July 28, 2025",
      time: "12:00 PM - 8:00 PM",
      location: "Downtown Community Center",
      description: "Our biggest event of the year featuring local vendors, live music, games, and food trucks.",
      category: "community",
      attendees: 156,
      maxAttendees: 200,
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Youth Leadership Workshop",
      date: "August 5, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Community Center Room A",
      description: "Empowering young leaders with skills in communication, teamwork, and community engagement.",
      category: "educational",
      attendees: 12,
      maxAttendees: 20,
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Food Drive Collection",
      date: "August 12, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Various Collection Points",
      description: "Help us collect non-perishable food items for local families in need.",
      category: "fundraising",
      attendees: 45,
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Senior Citizens Technology Class",
      date: "August 19, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Public Library",
      description: "Free technology classes helping seniors navigate smartphones, tablets, and basic computer skills.",
      category: "educational",
      attendees: 8,
      maxAttendees: 15,
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "Neighborhood Cleanup Day",
      date: "August 26, 2025",
      time: "8:00 AM - 11:00 AM",
      location: "Meet at City Hall",
      description: "Let&apos;s work together to keep our neighborhoods clean and beautiful. Supplies provided.",
      category: "volunteer",
      attendees: 32,
      maxAttendees: 50,
      image: "/api/placeholder/400/250"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'community': return 'bg-blue-100 text-blue-800';
      case 'volunteer': return 'bg-green-100 text-green-800';
      case 'educational': return 'bg-purple-100 text-purple-800';
      case 'fundraising': return 'bg-orange-100 text-orange-800';
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
              Community Events
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-blue-100">
              Join us for exciting events that bring our community together, 
              create lasting memories, and make a positive impact.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
              <p className="text-lg text-gray-600">
                Discover upcoming opportunities to get involved and connect with your community.
              </p>
            </div>
            <div className="mt-6 lg:mt-0">
              <Link 
                href="/contact" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                Suggest an Event <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-white opacity-80" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                    {event.maxAttendees && (
                      <span className="text-sm text-gray-500">
                        {event.attendees}/{event.maxAttendees} attending
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">{event.attendees} attending</span>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Join Event
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Want to Host an Event?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Have an idea for a community event? We&apos;d love to help you make it happen. 
            Reach out to our events team to get started.
          </p>
          <Link 
            href="/contact" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center"
          >
            Contact Our Events Team <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
