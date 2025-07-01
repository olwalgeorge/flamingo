import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: "River Kibos Clean-up Campaign",
      date: "July 15, 2025",
      time: "8:00 AM - 12:00 PM",
      location: "River Kibos Watershed, Kondele Ward",
      description: "Join us for our monthly river clean-up initiative to protect water sources and preserve aquatic ecosystems.",
      category: "environmental",
      attendees: 45,
      maxAttendees: 60,
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Quarterly General Meeting - Q3 2025",
      date: "July 20, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "FCC CBO Office, Flamingo Unit",
      description: "Mandatory quarterly meeting for all management committee members to discuss progress and plan future activities.",
      category: "meeting",
      attendees: 15,
      maxAttendees: 20,
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Tree Planting Workshop",
      date: "July 28, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Community Center, Kondele Ward",
      description: "Educational workshop on sustainable tree planting techniques and watershed conservation practices.",
      category: "educational",
      attendees: 30,
      maxAttendees: 40,
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "Urban Farming Training",
      date: "August 5, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "FCC CBO Training Grounds",
      description: "Hands-on training for community members on modern urban farming methods and sustainable agriculture.",
      category: "training",
      attendees: 25,
      maxAttendees: 35,
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Waste Management & Recycling Seminar",
      date: "August 12, 2025",
      time: "1:00 PM - 4:00 PM",
      location: "Kondele Community Hall",
      description: "Learn about eco-friendly waste management systems and recycling opportunities for community benefit.",
      category: "environmental",
      attendees: 40,
      maxAttendees: 50,
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "Women's Basket Weaving Workshop",
      date: "August 19, 2025",
      time: "2:00 PM - 6:00 PM",
      location: "FCC CBO Community Center",
      description: "Empowering women through traditional weaving skills and income-generating activities.",
      category: "skills",
      attendees: 20,
      maxAttendees: 25,
      image: "/api/placeholder/400/250"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environmental': return 'bg-green-100 text-green-800';
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'educational': return 'bg-purple-100 text-purple-800';
      case 'training': return 'bg-orange-100 text-orange-800';
      case 'skills': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0">
          <Image 
            src="/hero-events.svg" 
            alt="FCC CBO community members engaged in environmental conservation activities - river cleanup and tree planting in Kisumu County" 
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/40 to-blue-600/40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Events & Activities
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-blue-100">
              Join FCC CBO&apos;s environmental conservation activities, community meetings, and empowerment programs 
              in Kisumu County. 
              Create lasting memories, and make a positive impact.
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
                    <Link 
                      href={`/events/${event.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Join Event
                    </Link>
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
